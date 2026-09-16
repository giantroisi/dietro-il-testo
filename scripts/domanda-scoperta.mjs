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
// QUESTO PEZZO E' STATO SBAGLIATO QUATTRO VOLTE, ed e' la parte che sceglie
// cosa scrivere: se e' rotto, si aggiungono canzoni a intuito credendo di
// seguire un numero. I quattro errori, tutti della stessa famiglia — il
// confronto pretendeva che la ricerca contenesse ESATTAMENTE tutte le parole
// del titolo:
//   1. nomi d'artista cercati per sottostringa: usciva 1 artista su 104;
//   2. l'apostrofo sostituito da uno spazio: «What's My Age Again?» diventava
//      [what, age, again] e la scheda piu' vista del sito risultava non servita;
//   3. solo i titoli delle canzoni, senza le pagine artista: 232 impressioni
//      contate come domanda scoperta mentre atterravano su artista/...;
//   4. (16 settembre 2026) L'ARTICOLO E IL NOME DI BATTESIMO. «white stripes»
//      non conteneva «the» e «the-white-stripes» ESISTE, con una scheda;
//      «battiato canzoni» non conteneva «franco» e di Battiato ci sono SETTE
//      schede; «hot fuss killers» non conteneva «the»; «don t look back in
//      anger» si spezzava in [don, t] e non faceva «dont». Quattro voci su
//      cinque, in cima all'elenco delle orfane, erano roba che abbiamo gia'.
//
// Come regge adesso: le lettere sciolte si riattaccano alla parola prima
// (don t -> dont), la s finale cade da tutt'e due i lati (whats = what),
// gli articoli escono dai nomi, il cognome da solo basta se e' lungo, e la
// forma senza spazi copre chi scrive «pearljam» tutto attaccato.
const ARTICOLI = new Set(['the', 'and', 'del', 'dei', 'della', 'delle', 'feat']);
function parole(s) {
  const grezze = String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['\u2019`]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
  // «don t look» -> «dont look»: una lettera sola e' quasi sempre la coda di
  // un apostrofo scritto con lo spazio.
  const unite = [];
  for (const w of grezze) {
    if (w.length === 1 && unite.length) unite[unite.length - 1] += w;
    else unite.push(w);
  }
  return unite.filter((w) => w.length > 2);
}
// la s finale non distingue niente e rompe tutto: whats/what, songs/song
const radice = (w) => (w.length >= 5 && w.endsWith('s') ? w.slice(0, -1) : w);
const radici = (s) => parole(s).map(radice);
const compatto = (s) => parole(s).filter((w) => !ARTICOLI.has(w)).join('');

const voci = [
  ...canzoni.map((c) => ({ r: radici(c.titolo), c: compatto(c.titolo), coda: null })),
  ...artisti.map((a) => {
    const r = radici(a.nome).filter((w) => !ARTICOLI.has(w));
    // «battiato» da solo vale per Franco Battiato, «rose» da solo non vale per
    // Guns N' Roses: sotto le sei lettere un cognome non e' distintivo.
    const ultima = r.length > 1 ? r[r.length - 1] : null;
    return { r, c: compatto(a.nome), coda: ultima && ultima.length >= 6 ? ultima : null };
  }),
];

const orfane = [];
for (const q of query) {
  const rq = new Set(radici(q.query));
  const cq = parole(q.query).join('');
  const servita = voci.some((v) => {
    const senzaArticoli = v.r.filter((w) => !ARTICOLI.has(w));
    if (senzaArticoli.length && senzaArticoli.every((w) => rq.has(w))) return true;
    if (v.c.length >= 6 && cq.includes(v.c)) return true;
    if (v.coda && rq.has(v.coda)) return true;
    return false;
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
