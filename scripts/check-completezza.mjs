#!/usr/bin/env node
// F22 — report interno sullo standard 4A: non è più mostrato in pagina (l'etichetta
// "da integrare" parlava del processo, non del contenuto), ma resta utile per sapere
// dove intervenire. Non richiede rete: è un controllo puramente locale.
//
// Uso: node scripts/check-completezza.mjs

import { readFileSync } from 'node:fs';
import { dettagliCompletezza } from './genera/pagine.mjs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));

const risultati = canzoni.map((c) => ({ slug: c.slug, titolo: c.titolo, artista: c.artista, ...dettagliCompletezza(c) }));
const complete = risultati.filter((r) => r.completa);
const daIntegrare = risultati.filter((r) => !r.completa);

const conteggioPerCampo = {};
for (const r of daIntegrare) {
  for (const campo of r.manca) conteggioPerCampo[campo] = (conteggioPerCampo[campo] || 0) + 1;
}

console.log(`Schede complete (standard 4A): ${complete.length} / ${risultati.length}`);
console.log(`Da integrare: ${daIntegrare.length} / ${risultati.length}`);
console.log('\nCampi mancanti più diffusi:');
for (const [campo, n] of Object.entries(conteggioPerCampo).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${campo}: ${n}`);
}
if (process.argv.includes('--dettaglio')) {
  console.log('\nSchede da integrare:');
  daIntegrare.forEach((r) => console.log(`  ${r.slug} (${r.titolo} — ${r.artista}): manca ${r.manca.join(', ')}`));
}
