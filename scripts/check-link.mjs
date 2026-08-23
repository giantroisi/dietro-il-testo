#!/usr/bin/env node
// Verifica che ogni destinazione interna generata esista davvero come file,
// e che ogni URL esterno citato nelle fonti sia sintatticamente valido.
// Non fa richieste di rete (troppo lento su ~1400 link): controlla la
// coerenza interna, che è dove nascono i link rotti in un sito statico.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'sito');

const canzoni = JSON.parse(readFileSync(join(ROOT, 'dati', 'canzoni.json'), 'utf8'));
const artisti = JSON.parse(readFileSync(join(ROOT, 'dati', 'artisti.json'), 'utf8'));

let problemi = [];

// ogni canzone deve avere un artista che esiste
const artistiSlug = new Set(artisti.map((a) => a.slug));
for (const c of canzoni) {
  if (!artistiSlug.has(c.artistaSlug)) problemi.push(`${c.slug}: artistaSlug "${c.artistaSlug}" non trovato tra gli artisti`);
  if (!existsSync(join(OUT, 'canzone', c.slug, 'index.html'))) problemi.push(`${c.slug}: file di pagina mancante`);
}

// ogni canzone che l'artista dice di possedere deve esistere
const canzoniSlug = new Set(canzoni.map((c) => c.slug));
for (const a of artisti) {
  for (const s of a.canzoni) {
    if (!canzoniSlug.has(s)) problemi.push(`artista ${a.slug}: canzone "${s}" elencata ma non trovata`);
  }
  if (!existsSync(join(OUT, 'artista', a.slug, 'index.html'))) problemi.push(`${a.slug}: file di pagina artista mancante`);
}

// URL esterni: solo forma sintattica (http/https)
let urlNonValidi = 0;
for (const c of canzoni) {
  for (const f of c.fonti) {
    try { new URL(f.url); } catch { problemi.push(`${c.slug}: URL fonte non valido "${f.url}"`); urlNonValidi++; }
  }
  if (c.testoUrl) {
    try { new URL(c.testoUrl); } catch { problemi.push(`${c.slug}: testoUrl non valido`); urlNonValidi++; }
  }
}

console.log(`Canzoni: ${canzoni.length} — Artisti: ${artisti.length}`);
console.log(`Problemi trovati: ${problemi.length}`);
if (problemi.length) {
  problemi.slice(0, 40).forEach((p) => console.log('  ' + p));
  if (problemi.length > 40) console.log(`  … e altri ${problemi.length - 40}`);
  process.exitCode = 1;
} else {
  console.log('Nessun link interno rotto, nessun URL esterno malformato.');
}
