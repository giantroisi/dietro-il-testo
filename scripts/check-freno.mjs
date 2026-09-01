#!/usr/bin/env node
// F88 — il freno di F67 rimesso, e reso misurabile.
//
// Il freno non è un'opinione: è una soglia che si legge dai dati. Questo script
// dice se è ancora attivo, e non serve rete, così può lanciarlo chiunque —
// l'autore, Sonnet, o Opus dal ponte — e ottenere lo stesso numero.
//
// Regola in vigore dal 1 settembre 2026 (decisione dell'autore):
//   - non si aggiungono schede nuove finché il freno è attivo;
//   - si lavora alla coda di F87: una seconda fonte indipendente per ogni scheda
//     che ne ha una sola;
//   - il freno si toglie quando la coda è DIMEZZATA rispetto al giorno in cui è
//     stato messo (54 schede su 219 → 27) E nessuna scheda ha come unica fonte
//     la pagina di un album.
//
// La soglia è dimezzata e non azzerata di proposito: non sappiamo quante schede
// abbiano davvero una seconda fonte reperibile, e fissare uno zero che nessuno
// può raggiungere è il modo migliore per far ignorare la regola. Una scheda per
// cui la seconda fonte è stata cercata e non esiste si dichiara nei dati con
// `"fonteUnicaAccertata": true` — stesso spirito dello stato `accertato-assente`
// di F66 — e smette di contare, ma solo dopo una ricerca registrata.
//
// Uso: node scripts/check-freno.mjs [--elenco]

import { readFileSync } from 'node:fs';

const BASE = 54;        // schede a fonte unica il giorno in cui il freno è stato messo
const BASE_SU = 219;    // schede totali quel giorno, per memoria
const SOGLIA = Math.floor(BASE / 2);

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));

// kworb serve al dato ascolti: non sostiene affermazioni, non conta come fonte
const utili = (c) => (c.fonti || []).filter((f) => !(f.url || '').includes('kworb'));

const fonteUnica = [];
const soloAlbum = [];
const accertate = [];
for (const c of canzoni) {
  const fu = utili(c);
  if (fu.length && fu.every((f) => f.ruolo === 'album')) soloAlbum.push(c.slug);
  if (fu.length > 1) continue;
  if (c.fonteUnicaAccertata) accertate.push(c.slug);
  else fonteUnica.push(c.slug);
}

const attivo = fonteUnica.length > SOGLIA || soloAlbum.length > 0;

console.log(`Schede in catalogo: ${canzoni.length}`);
console.log(`Con una sola fonte utile: ${fonteUnica.length}  (soglia per togliere il freno: ${SOGLIA})`);
console.log(`  di cui dichiarate senza seconda fonte reperibile: ${accertate.length} (non contano)`);
console.log(`Con la SOLA fonte che è la pagina di un album: ${soloAlbum.length}  (deve essere 0)`);
console.log(`Partenza del 1 settembre 2026: ${BASE} su ${BASE_SU}`);
console.log('');
if (attivo) {
  const mancano = Math.max(0, fonteUnica.length - SOGLIA);
  console.log('FRENO ATTIVO — non si aggiungono schede nuove.');
  if (mancano) console.log(`  Mancano ${mancano} schede da dotare di una seconda fonte.`);
  if (soloAlbum.length) console.log(`  Da sistemare per prime, la fonte parla di un'altra opera: ${soloAlbum.join(', ')}`);
} else {
  console.log('FRENO TOLTO — la coda è rientrata: si può tornare ad aggiungere.');
}
if (process.argv.includes('--elenco') && fonteUnica.length) {
  console.log('\nSchede con una sola fonte utile:');
  for (const s of fonteUnica) console.log(`  ${s}`);
}
