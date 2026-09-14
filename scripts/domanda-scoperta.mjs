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
// L'aggancio e' per parole del titolo, non per nome d'artista: i titoli nelle
// ricerche si scrivono quasi sempre per esteso, i nomi no.
// L'APOSTROFO VA TOLTO, NON SOSTITUITO CON UNO SPAZIO, e ci sono cascato:
// «What's My Age Again?» diventava [what, age, again] mentre chi cerca scrive
// «whats my age again» -> [whats, age, again]. «what» non e' «whats», e la
// scheda piu' vista del sito risultava DOMANDA NON SERVITA. Le due ricerche in
// cima all'elenco delle orfane erano due schede che abbiamo gia'.
function parole(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((p) => p.length > 2);
}
// NON BASTANO I TITOLI DELLE CANZONI, e anche qui mi ero fermato troppo presto.
// Le pagine `artista/...` prendono 232 impressioni — `artista/franco-battiato`
// da sola 77 — quindi «canzoni di franco battiato» NON e' domanda non servita:
// atterra, solo non su una scheda di canzone. Contando i soli titoli, quelle
// ricerche risultavano orfane e il totale era gonfiato.
const titoli = [
  ...canzoni.map((c) => ({ p: parole(c.titolo) })),
  ...artisti.map((a) => ({ p: parole(a.nome) })),
];

const orfane = [];
for (const q of query) {
  const pq = new Set(parole(q.query));
  const servita = titoli.some((t) => t.p.length && t.p.every((w) => pq.has(w)));
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
