#!/usr/bin/env node
// F94 — misura il LIVELLO delle fonti, non il loro numero.
//
// Perche' esiste, e perche' non lo fa gia' nessun altro controllo.
// `check-freno.mjs` conta quante schede hanno una fonte sola. `check-garanti.mjs`
// trova le frasi che mettono una testata a garanzia di una lettura che non ha
// scritto. Nessuno dei due guarda la cosa che la sezione 5 della costituzione
// mette per iscritto: **che tipo di fonte e'**. Una scheda con tre fonti tutte
// di livello C passa entrambi i controlli e non prova niente.
//
// La domanda a cui risponde: quante schede non hanno nemmeno una fonte di
// livello A o B — cioe' quante, per statuto, non possono sostenere un fatto
// controverso, un'intenzione dell'artista o una cifra di vendita.
//
// Cosa NON fa: non giudica se una scheda sia vera. Una scheda su sola
// Wikipedia puo' essere corretta in ogni riga. Dice solo che, se qualcuno
// contestasse un'affermazione, il sito non avrebbe niente da mostrare.
//
// L'onesta' del numero sta in come tratta i domini che non conosce: **non li
// conta come buoni**. Restano «da classificare» e vengono stampati, cosi' il
// numero e' un pavimento certo, non una stima ottimista.
//
// IL FRENO (dal 4 settembre 2026, decisione dell'autore).
// Questo script non misura soltanto: **blocca**. La soglia qui sotto e' il
// numero di schede senza fonte A/B accertata nel giorno in cui il freno e'
// stato messo. Se il numero sale, il controllo fallisce.
//
// Il senso e' preciso: una scheda nuova documentata solo da Wikipedia e
// Songfacts fa salire il numero e fa fallire il controllo, quindi **non si
// aggiungono schede che non abbiano almeno una fonte di livello A o B**. Una
// scheda nuova ben documentata invece lascia il numero fermo e passa.
// Il freno non impedisce di crescere: impedisce di crescere peggiorando.
//
// La soglia si ABBASSA a mano, mai da sola, ogni volta che un lotto della coda
// e' chiuso: si rilancia questo controllo e si scrive il numero nuovo. Una
// soglia che si aggiorna da sola non e' un freno, e' un contatore.
//
// Uso:  node scripts/check-livelli.mjs [--elenco]
// Non serve rete.

// Schede senza fonte A/B accertata il 4 settembre 2026, su 282 schede:
// 115 con sole fonti C piu' 38 che dipendono da domini non ancora classificati.
const SOGLIA = 153;

import { readFileSync } from 'node:fs';

// ---------------------------------------------------------------- tabelle
// Le tre liste vengono dalla sezione 5 della costituzione. Si modificano qui,
// a mano, aggiungendo un dominio alla volta e sapendo perche'.

// Livello A — ufficiali: artista, etichetta, enti, istituzioni, archivi.
const A = new Set([
  'guinnessworldrecords.com', 'osservatoreromano.va', 'treccani.it',
  'zucchero.it', 'whitneyhouston.com', 'centurymedia.bandcamp.com',
  'archivio.astigiani.it', 'ceraunavolta.org',
]);

// Livello B — testate con firma e data, quotidiani, periodici con redazione.
const B = new Set([
  'americansongwriter.com', 'loudersound.com', 'loudwire.com', 'ultimateclassicrock.com',
  'faroutmagazine.co.uk', 'rollingstone.com', 'rollingstone.it', 'au.rollingstone.com',
  'nme.com', 'billboard.com', 'billboard.it', 'altpress.com', 'blabbermouth.net',
  'guitarplayer.com', 'udiscovermusic.com', 'radiox.co.uk', 'washingtonpost.com',
  'ilfattoquotidiano.it', 'agi.it', 'tg24.sky.it', 'ilrestodelcarlino.it',
  'bergamonews.it', 'rockol.it', 'rockit.it', 'ondarock.it', 'allmusicitalia.it',
  'music.fanpage.it', 'fanpage.it', 'today.com', 'parade.com', 'superdeluxeedition.com',
  'musicomh.com', 'rockcellarmagazine.com', 'theseconddisc.com', 'extrachill.com',
  'radioitalia.it', 'virginradio.it', 'notiziemusica.it', 'eurofestivalnews.com',
  'therockpit.net', 'primordialradio.com', 'electricity-club.co.uk',
]);

// Livello C — pista di ricerca, mai prova. La costituzione ne nomina due per
// nome (Wikipedia, Songfacts) e due categorie (database collaborativi, siti di
// interpretazione).
const C = new Set([
  'en.wikipedia.org', 'it.wikipedia.org', 'songfacts.com',
  'metal-archives.com', 'discogs.com', 'secondhandsongs.com', 'genius.com',
  'hitparadeitalia.it', 'antiwarsongs.org', 'storyofsong.com',
  // Aperti e guardati uno per uno il 4 settembre 2026, invece di giudicarli dal
  // nome: entrambi hanno data e, il primo, anche una firma e collegamenti a
  // testate vere. Sono siti di interpretazione — livello C — non pagine da
  // buttare. La differenza conta: una fonte C si puo' tenere come pista, una
  // vietata no.
  'songmeaningsandfacts.com',        // firmato Jessica Shelton, datato, con link a Rolling Stone, LA Times, Guardian
  'solobellecanzoni.altervista.org', // datato, senza firma, con una sezione «fonti»; l'analisi resta personale
]);
const C_SUFFISSI = ['.wikipedia.org', '.fandom.com', '.wikia.com'];

// Da non usare come prova: testi senza autore ne' data, pagine che si copiano
// fra loro, raccolte di citazioni che non dicono da quale intervista vengono.
// Queste NON sono un livello piu' basso: sono un errore, e il controllo esce
// con codice 1 finche' restano in catalogo.
// Ogni voce qui e' stata aperta e guardata prima di essere messa in lista: la
// motivazione dice cosa ho visto, non cosa sospettavo.
const VIETATI = new Map([
  ['songtell.com', 'nessun autore, nessuna data, nessuna fonte citata'],
  ['significatocanzone.it', 'interpretazioni scritte dai visitatori, senza firma e senza fonti'],
  ['le-citazioni.it', 'raccolta di citazioni che non indica da quale intervista vengano'],
]);

// ---------------------------------------------------------------- misura

function dominio(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
}

function livello(d) {
  if (d === null) return 'url-non-valido';
  if (VIETATI.has(d)) return 'vietato';
  if (A.has(d)) return 'A';
  if (B.has(d)) return 'B';
  if (C.has(d) || C_SUFFISSI.some((s) => d.endsWith(s))) return 'C';
  return 'ignoto';
}

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const elenco = process.argv.includes('--elenco');

const conteggi = { A: 0, B: 0, C: 0, vietato: 0, ignoto: 0, 'url-non-valido': 0 };
const ignoti = new Map();
const senzaAB = [];       // nessuna fonte A o B, e nessun dominio ignoto: pavimento certo
const soloIgnoti = [];    // nessuna A/B accertata, ma qualche dominio da classificare
const conVietati = [];

for (const c of canzoni) {
  const fonti = (c.fonti || []).filter((f) => f.ruolo !== 'ascolti');
  const livelli = fonti.map((f) => {
    const d = dominio(f.url);
    const l = livello(d);
    conteggi[l]++;
    if (l === 'ignoto') ignoti.set(d, (ignoti.get(d) || 0) + 1);
    return { d, l };
  });

  const vietate = livelli.filter((x) => x.l === 'vietato');
  if (vietate.length) conVietati.push({ slug: c.slug, domini: vietate.map((x) => x.d) });

  const haAB = livelli.some((x) => x.l === 'A' || x.l === 'B');
  const haIgnoti = livelli.some((x) => x.l === 'ignoto');
  if (!haAB && !haIgnoti) senzaAB.push(c.slug);
  else if (!haAB && haIgnoti) soloIgnoti.push(c.slug);
}

const tot = Object.values(conteggi).reduce((a, b) => a + b, 0);
const pc = (n) => `${n} (${Math.round((n / canzoni.length) * 100)}%)`;

console.log(`\nFonti narrative: ${tot} su ${canzoni.length} schede\n`);
console.log(`  livello A (ufficiali)      ${conteggi.A}`);
console.log(`  livello B (testate)        ${conteggi.B}`);
console.log(`  livello C (pista)          ${conteggi.C}`);
console.log(`  da non usare               ${conteggi.vietato}`);
console.log(`  da classificare            ${conteggi.ignoto}`);
if (conteggi['url-non-valido']) console.log(`  url non validi             ${conteggi['url-non-valido']}`);

console.log(`\nSchede senza NESSUNA fonte di livello A o B: ${pc(senzaAB.length)}`);
console.log('  Sono schede che, se qualcuno contestasse un’affermazione, non');
console.log('  avrebbero niente da mostrare: la sezione 5 esclude il livello C');
console.log('  come prova per intenzioni, cifre e fatti controversi.');
if (soloIgnoti.length) {
  console.log(`\nAltre ${soloIgnoti.length} schede dipendono da domini ancora da classificare:`);
  console.log('  potrebbero salire o restare dove sono. Il numero sopra e’ il pavimento.');
}

if (ignoti.size) {
  console.log(`\nDomini da classificare (${ignoti.size}), dal piu’ usato:`);
  for (const [d, n] of [...ignoti.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${d}`);
  }
}

if (conVietati.length) {
  console.log(`\nFONTI DA NON USARE, in ${conVietati.length} schede:`);
  for (const v of conVietati) {
    console.log(`  ${v.slug}  —  ${v.domini.map((d) => `${d}: ${VIETATI.get(d)}`).join('; ')}`);
  }
  console.log('\n  Vanno sostituite, non integrate: una fonte che non dice chi l’ha');
  console.log('  scritta non diventa valida perche’ accanto ce n’e’ un’altra.');
}

if (elenco && senzaAB.length) {
  console.log('\nElenco delle schede senza fonti A/B:');
  for (const s of senzaAB) console.log(`  ${s}`);
}

// ------------------------------------------------------------------ freno

const senzaABAccertata = senzaAB.length + soloIgnoti.length;
const sforato = senzaABAccertata > SOGLIA;

console.log('\n' + '—'.repeat(64));
console.log(`FRENO  ${senzaABAccertata} schede senza fonte A/B accertata, soglia ${SOGLIA}`);
if (sforato) {
  console.log(`\n  ATTIVO: sono ${senzaABAccertata - SOGLIA} sopra la soglia.`);
  console.log('  Una scheda nuova documentata solo da fonti di livello C fa salire');
  console.log('  questo numero. Finche’ e’ sopra la soglia non si aggiungono schede:');
  console.log('  si lavora la coda, oppure si aggiunge una fonte A/B alla scheda');
  console.log('  appena scritta. La soglia si abbassa a mano quando un lotto e’ chiuso.');
} else if (senzaABAccertata < SOGLIA) {
  console.log(`\n  Libero, e ${SOGLIA - senzaABAccertata} sotto la soglia:`);
  console.log(`  aggiorna SOGLIA a ${senzaABAccertata} in questo file, cosi’ il terreno`);
  console.log('  guadagnato non si puo’ perdere di nuovo in silenzio.');
} else {
  console.log('\n  Libero, esattamente in pari con la soglia.');
}

console.log('');
process.exit(conVietati.length || sforato ? 1 : 0);
