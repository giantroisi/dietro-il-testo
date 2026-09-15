// Il numero che manca. Le schede riaperte finora sono state scelte PER
// IMPRESSIONI: misurano le pagine piu' lette, non il sito. Per dire com'e' la
// qualita' media serve un campione CASUALE, e va estratto in modo che chiunque
// possa rifare l'estrazione e ottenere gli stessi slug — altrimenti «a caso»
// vuol dire «scelti da me» e non conta niente.
//
// Uso: node scripts/campione-casuale.mjs [--seme <n>] [--quante <n>]
//
// La popolazione sono le schede MAI RIAPERTE DA FUORI (senza ultimaVerifica):
// e' esattamente cio' che non sappiamo. Le 49 gia' riaperte sono state anche
// corrette, quindi includerle abbasserebbe il tasso d'errore per costruzione.

import { readFileSync } from 'node:fs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const args = process.argv.slice(2);
const val = (nome, pre) => { const i = args.indexOf(nome); return i > -1 ? Number(args[i + 1]) : pre; };
const SEME = val('--seme', 20260915);
const QUANTE = val('--quante', 10);

// Generatore deterministico (mulberry32): stesso seme, stessa estrazione,
// su qualunque macchina e in qualunque momento. Non si usa Math.random.
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

const popolazione = canzoni.filter((c) => !c.ultimaVerifica).map((c) => c.slug).sort();
const rnd = generatore(SEME);
const estratti = [];
const disponibili = [...popolazione];
for (let i = 0; i < QUANTE && disponibili.length; i++) {
  estratti.push(disponibili.splice(Math.floor(rnd() * disponibili.length), 1)[0]);
}

console.log(`\nCampione casuale — seme ${SEME}, ${QUANTE} schede`);
console.log(`Popolazione: le ${popolazione.length} schede mai riaperte da fuori (su ${canzoni.length}).\n`);
for (const s of estratti) {
  const c = canzoni.find((x) => x.slug === s);
  const frasi = [...(c.corpo || []), c.fraseIconica || ''].join(' ').split(/(?<=[.!?])\s+/).filter(Boolean).length;
  console.log(`  ${s.padEnd(34)} ${String((c.fonti || []).length).padStart(2)} fonti   ~${String(frasi).padStart(2)} frasi   ${c.artista}`);
}
console.log(`
Rifare l'estrazione con lo stesso seme da' gli stessi slug: e' il motivo per
cui il seme sta scritto qui e nel registro. Cambiare seme dopo aver visto i
risultati sarebbe scegliere il campione, non estrarlo.
`);
