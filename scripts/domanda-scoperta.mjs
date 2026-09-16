// Dove la domanda non trova risposta. Serve a scegliere COSA aggiungere con un
// numero, non a intuito — la stessa regola con cui e' stata scelta la quinta
// infornata.
//
// Uso (nessuna rete): node scripts/domanda-scoperta.mjs
//
// ---------------------------------------------------------------------------
// PERCHE' COSI' E NON DALLE QUERY. Il primo tentativo cercava il nome di ogni
// artista dentro il testo delle query. **Usciva un artista solo su 104**: i
// nomi nelle ricerche sono scritti come capita — minuscole, senza accenti,
// abbreviati — e un confronto per sottostringa esatta non li trova. Era un
// risultato rotto, e l'ho buttato invece di usarlo.
// Qui l'aggancio passa dalle PAGINE: `canzone/<slug>` si mappa sulla scheda
// senza ambiguita', e dalla scheda si arriva all'artista. Nessun confronto fra
// stringhe scritte da persone diverse.
// ---------------------------------------------------------------------------

import { readFileSync } from 'node:fs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const pagine = JSON.parse(readFileSync('dati/rendimento-pagine.json', 'utf8'));
const query = JSON.parse(readFileSync('dati/rendimento-query.json', 'utf8'));
const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));

const perSlug = new Map(canzoni.map((c) => [c.slug, c]));
const schedePerArtista = new Map();
for (const c of canzoni) schedePerArtista.set(c.artistaSlug, (schedePerArtista.get(c.artistaSlug) || 0) + 1);

// 1) Domanda per artista, agganciata dalle pagine.
const impPerArtista = new Map();
const impPerSlug = new Map();
for (const p of pagine) {
  const m = /^canzone\/(.+)$/.exec(String(p.pagina || ''));
  if (!m) continue;
  const c = perSlug.get(m[1]);
  if (!c) continue;
  impPerSlug.set(c.slug, (impPerSlug.get(c.slug) || 0) + Number(p.impressioni || 0));
  impPerArtista.set(c.artistaSlug, (impPerArtista.get(c.artistaSlug) || 0) + Number(p.impressioni || 0));
}

const fila = [...impPerArtista.entries()]
  .map(([a, imp]) => ({ a, imp, schede: schedePerArtista.get(a) || 0 }))
  .map((x) => ({ ...x, per: x.imp / Math.max(1, x.schede) }))
  .filter((x) => x.imp >= 25)
  .sort((a, b) => b.per - a.per);

console.log('\nDOMANDA PER ARTISTA — quanta attenzione arriva, e su quante schede si divide.');
console.log('Un numero alto vuol dire: la gente cerca questo artista e trova poco.\n');
console.log('  ' + 'artista'.padEnd(26) + 'impressioni'.padEnd(13) + 'schede'.padEnd(9) + 'per scheda');
for (const x of fila.slice(0, 15)) {
  console.log('  ' + x.a.padEnd(26) + String(x.imp).padEnd(13) + String(x.schede).padEnd(9) + x.per.toFixed(0));
}

// 2) Query che non atterrano su nessuna scheda: la domanda che non serviamo.
//
// QUESTO PEZZO E' STATO SBAGLIATO CINQUE VOLTE, ed e' la parte che sceglie
// cosa scrivere: se e' rotto, si aggiungono canzoni a intuito credendo di
// seguire un numero.
//   1. nomi d'artista cercati per sottostringa: usciva 1 artista su 104;
//   2. l'apostrofo sostituito da uno spazio: la scheda piu' vista del sito
//      risultava domanda non servita;
//   3. contati i soli titoli, senza le pagine artista: 232 impressioni
//      contate come scoperte mentre atterravano su artista/...;
//   4. (16 settembre) l'articolo e il nome di battesimo: «white stripes» non
//      conteneva «the», «battiato canzoni» non conteneva «franco»;
//   5. (16 settembre, un'ora dopo) IL DIFETTO DI FONDO, che le prime quattro
//      toppe non toccavano: SI PRETENDEVA CHE LA RICERCA CONTENESSE TUTTE LE
//      PAROLE DEL TITOLO. Cosi' «rock and roll damnation» non serviva «Rock
//      'n' Roll Damnation» (che abbiamo), «long way to the top» non serviva
//      «It's a Long Way to the Top (If You Wanna Rock 'n' Roll)» (che
//      abbiamo), «when september ends significato» non serviva «Wake Me Up
//      When September Ends» (che abbiamo). Nessuno cerca un titolo per
//      intero, e i titoli lunghi non si agganciavano mai.
//      LA STESSA LEZIONE ERA GIA' SCRITTA IN check-frase-iconica.mjs: li' il
//      confronto per contenimento aveva dato 1 caso su 312 dove ce n'erano
//      38, e l'avevo sostituito con la SOVRAPPOSIZIONE. Non l'ho applicata
//      qui, e ho annunciato un elenco di «canzoni che non abbiamo» fatto di
//      quattro canzoni che abbiamo.
//
// Adesso si misura la sovrapposizione: quanta parte del titolo compare nella
// ricerca. Il sottotitolo fra parentesi non conta — non lo digita nessuno.
const ARTICOLI = new Set(['the', 'and', 'del', 'dei', 'della', 'delle', 'feat', 'che', 'con', 'per']);
function parole(s, unisciLettere) {
  const grezze = String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['\u2019`]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
  // «don t look» -> «dont look»: vale SOLO per le ricerche, dove l'apostrofo
  // viene scritto con uno spazio. Sui titoli no: «Rock 'n' Roll» diventerebbe
  // «rockn roll» e non si aggancerebbe piu' a «rock and roll».
  if (!unisciLettere) return grezze.filter((w) => w.length > 2);
  const unite = [];
  for (const w of grezze) {
    if (w.length === 1 && unite.length) unite[unite.length - 1] += w;
    else unite.push(w);
  }
  return unite.filter((w) => w.length > 2);
}
const radice = (w) => (w.length >= 5 && w.endsWith('s') ? w.slice(0, -1) : w);
const senzaParentesi = (s) => String(s).replace(/\([^)]*\)/g, ' ');
const utili = (s, u) => parole(s, u).map(radice).filter((w) => !ARTICOLI.has(w));

const voci = [
  ...canzoni.map((c) => ({ p: utili(senzaParentesi(c.titolo), false), coda: null })),
  ...artisti.map((a) => {
    const p = utili(a.nome, false);
    const ultima = p.length > 1 ? p[p.length - 1] : null;
    // la forma attaccata copre chi scrive «pearljam» o «acdc» senza spazi
    return { p, coda: ultima && ultima.length >= 6 ? ultima : null, compatto: p.join('') };
  }),
];

// Una ricerca serve una voce se ne contiene ABBASTANZA parole: almeno il 60%,
// e almeno due quando la voce ne ha piu' d'una. Il troncamento vale solo in
// appoggio a una parola piena («nov rain» -> November Rain), mai da solo.
function quanteCombaciano(p, rq) {
  let n = 0, piene = 0;
  for (const w of p) {
    if (rq.has(w)) { n++; piene++; continue; }
    for (const q of rq) if (q.length >= 3 && w.length > q.length && w.startsWith(q)) { n++; break; }
  }
  return { n, piene };
}

const orfane = [];
for (const q of query) {
  const rq = new Set(parole(q.query, true).map(radice));
  const cq = parole(q.query, true).join('');
  const servita = voci.some((v) => {
    if (!v.p.length) return false;
    if (v.coda && rq.has(v.coda)) return true;
    if (v.compatto && v.compatto.length >= 6 && cq.includes(v.compatto)) return true;
    const { n, piene } = quanteCombaciano(v.p, rq);
    if (!piene) return false;
    if (v.p.length === 1) return n === 1;
    return n >= 2 && n / v.p.length >= 0.6;
  });
  if (!servita) orfane.push(q);
}
orfane.sort((a, b) => Number(b.impressioni || 0) - Number(a.impressioni || 0));
const totOrfane = orfane.reduce((s, q) => s + Number(q.impressioni || 0), 0);
const totTutte = query.reduce((s, q) => s + Number(q.impressioni || 0), 0);

console.log(`\nDOMANDA CHE NON ATTERRA SU NESSUNA SCHEDA: ${orfane.length} ricerche su ${query.length}`);
console.log(`impressioni: ${totOrfane} su ${totTutte} (${Math.round((totOrfane / totTutte) * 100)}%)`);
console.log('Le venti piu' + '’' + ' cercate:\n');
for (const q of orfane.slice(0, 20)) {
  console.log(`  ${String(q.impressioni).padStart(4)}  ${q.query}`);
}
console.log(`
Le orfane NON sono tutte canzoni da aggiungere: molte sono ricerche generiche
o gia' coperte da una scheda che il confronto per titolo non riconosce. Sono
il posto da cui guardare, non un elenco da eseguire.
`);
