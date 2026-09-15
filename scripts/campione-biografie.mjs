// Il campione casuale sulle BIOGRAFIE. Stessa regola del campione sulle
// canzoni: seme deterministico scritto nel registro PRIMA dei risultati, cosi'
// chiunque puo' rifare l'estrazione e ottenere gli stessi slug.
//
// Uso: node scripts/campione-biografie.mjs [--seme <n>] [--quante <n>]
//
// PERCHE' LE BIOGRAFIE E PERCHE' ADESSO. Portano il bollino «verificata frase
// per frase» TUTTE E 104, e da fuori ne sono state riaperte DUE: una dava il
// 46% di affermazioni non sostenute, l'altra il 33%. Sulle canzoni il campione
// casuale ha dato il 24%. **E' il punto del sito in cui il bollino e' meno
// guadagnato**, ed e' rimasto l'ultimo grande buco non misurato.

import { readFileSync } from 'node:fs';

const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));
const args = process.argv.slice(2);
const val = (nome, pre) => { const i = args.indexOf(nome); return i > -1 ? Number(args[i + 1]) : pre; };
const SEME = val('--seme', 20260915);
const QUANTE = val('--quante', 8);

function generatore(seme) {
  let a = seme >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// La popolazione e' TUTTE le biografie tranne quella gia' riaperta da fuori
// (franco-battiato): non si estrae da un sacco in cui si e' gia' guardato.
const GIA = new Set(['franco-battiato']);
const popolazione = artisti.filter((a) => a.storia && !GIA.has(a.slug)).map((a) => a.slug).sort();
const rnd = generatore(SEME);
const estratti = [];
const disponibili = [...popolazione];
for (let i = 0; i < QUANTE && disponibili.length; i++) {
  estratti.push(disponibili.splice(Math.floor(rnd() * disponibili.length), 1)[0]);
}

console.log(`\nCampione casuale sulle biografie — seme ${SEME}, ${QUANTE} voci`);
console.log(`Popolazione: le ${popolazione.length} biografie con una storia scritta, esclusa quella gia' riaperta.\n`);
for (const s of estratti) {
  const a = artisti.find((x) => x.slug === s);
  const testo = (Array.isArray(a.storia) ? a.storia.join(' ') : String(a.storia || ''));
  const frasi = testo.split(/(?<=[.!?])\s+/).filter(Boolean).length;
  console.log(`  ${s.padEnd(28)} ${String((a.fonti || []).length).padStart(2)} fonti   ~${String(frasi).padStart(2)} frasi   bollino: ${a.ultimaVerifica || '—'}`);
}
console.log(`
Stesso seme, stessi slug. Cambiarlo dopo aver visto i risultati sarebbe
scegliere il campione invece di estrarlo.
`);
