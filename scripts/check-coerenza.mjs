#!/usr/bin/env node
// F21 — verifica la coerenza incrociata tra dati/canzoni.json e dati/artisti.json:
// album citati da una canzone ma assenti dalla discografia del suo artista,
// canzoni elencate da un artista ma inesistenti, canzoni non elencate dal proprio
// artista, anno della canzone in conflitto con l'anno dell'album, campi
// strutturali mancanti. Non richiede rete: è un controllo puramente locale.
//
// Uso: node scripts/check-coerenza.mjs

import { readFileSync } from 'node:fs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));

const artistiPerSlug = new Map(artisti.map((a) => [a.slug, a]));
const canzoniPerSlug = new Map(canzoni.map((c) => [c.slug, c]));

const problemi = [];
const segnala = (tipo, dettaglio) => problemi.push({ tipo, dettaglio });

// 1. Campi strutturali mancanti
for (const c of canzoni) {
  for (const campo of ['slug', 'titolo', 'artista', 'artistaSlug', 'anno']) {
    if (!c[campo]) segnala('campo mancante (canzone)', `${c.slug || '???'}: manca "${campo}"`);
  }
}
for (const a of artisti) {
  for (const campo of ['slug', 'nome']) {
    if (!a[campo]) segnala('campo mancante (artista)', `${a.slug || '???'}: manca "${campo}"`);
  }
}

// 2. artistaSlug della canzone punta a un artista inesistente
for (const c of canzoni) {
  if (c.artistaSlug && !artistiPerSlug.has(c.artistaSlug)) {
    segnala('artista inesistente', `${c.slug}: artistaSlug "${c.artistaSlug}" non trovato in artisti.json`);
  }
}

// 3. coerenza bidirezionale canzoni <-> artista.canzoni[]
for (const c of canzoni) {
  const a = artistiPerSlug.get(c.artistaSlug);
  if (a && Array.isArray(a.canzoni) && !a.canzoni.includes(c.slug)) {
    segnala('canzone non elencata dall\'artista', `${c.slug}: l'artista "${a.slug}" non la elenca in canzoni[]`);
  }
}
for (const a of artisti) {
  if (!Array.isArray(a.canzoni)) continue;
  for (const slugCanzone of a.canzoni) {
    if (!canzoniPerSlug.has(slugCanzone)) {
      segnala('canzone inesistente elencata dall\'artista', `${a.slug} elenca "${slugCanzone}" ma non esiste in canzoni.json`);
      continue;
    }
    const c = canzoniPerSlug.get(slugCanzone);
    if (c.artistaSlug !== a.slug) {
      segnala('canzone elencata da un artista diverso', `${a.slug} elenca "${slugCanzone}" ma la scheda ha artistaSlug "${c.artistaSlug}"`);
    }
  }
}

// 4. album citato dalla canzone ma assente dalla discografia (solo se l'artista ha una discografia reale)
for (const c of canzoni) {
  if (!c.albumSlug) continue;
  const a = artistiPerSlug.get(c.artistaSlug);
  if (!a || !Array.isArray(a.album)) continue;
  const discografiaReale = a.album.filter((al) => al.slug); // scarta le voci solo-nota
  if (discografiaReale.length === 0) continue; // artista senza discografia verificata: non è un errore
  const trovato = discografiaReale.find((al) => al.slug === c.albumSlug);
  if (!trovato) {
    segnala('album orfano', `${c.slug}: cita l'album "${c.album}" (slug "${c.albumSlug}") ma "${a.slug}" non lo elenca in discografia`);
  } else if (trovato.anno && c.anno) {
    // c.anno può contenere due anni separati da "/" (es. "2018 / 2019" per singolo e album):
    // basta che uno dei due corrisponda all'anno dichiarato dalla discografia.
    const anniCanzone = String(c.anno).split('/').map((s) => s.trim());
    if (!anniCanzone.includes(String(trovato.anno).trim())) {
      segnala('anno incoerente', `${c.slug}: anno "${c.anno}" ma la discografia di "${a.slug}" data l'album "${c.album}" al "${trovato.anno}"`);
    }
  }
}

// 5. ruolo di una fonte fuori dai valori ammessi (F17)
const RUOLI_AMMESSI = ['storia', 'ascolti', 'crediti', 'curiosità'];
for (const c of canzoni) {
  for (const f of c.fonti || []) {
    if (f.ruolo && !RUOLI_AMMESSI.includes(f.ruolo)) {
      segnala('ruolo fonte non ammesso', `${c.slug}: la fonte "${f.nome}" ha ruolo "${f.ruolo}", non tra ${RUOLI_AMMESSI.join(', ')}`);
    }
  }
}

console.log(`Canzoni controllate: ${canzoni.length}`);
console.log(`Artisti controllati: ${artisti.length}`);
console.log(`Problemi trovati: ${problemi.length}`);
if (problemi.length) {
  const perTipo = {};
  for (const p of problemi) (perTipo[p.tipo] ??= []).push(p.dettaglio);
  for (const [tipo, dettagli] of Object.entries(perTipo)) {
    console.log(`\n${tipo} (${dettagli.length}):`);
    dettagli.forEach((d) => console.log(`  - ${d}`));
  }
  process.exitCode = 1;
}
