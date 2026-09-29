#!/usr/bin/env node
// Controlla che i filtri dell'archivio riflettano i dati correnti.
// Uso: node scripts/genera-sito.mjs && node scripts/check-filtri.mjs

import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const canzoni = JSON.parse(readFileSync(new URL('dati/canzoni.json', root), 'utf8'));
const artisti = JSON.parse(readFileSync(new URL('dati/artisti.json', root), 'utf8'));
const perArtista = new Map(artisti.map((a) => [a.slug, a]));
const pagina = new URL('sito/archivio/index.html', root);

if (!existsSync(pagina)) {
  console.error('Manca sito/archivio/index.html: esegui prima node scripts/genera-sito.mjs');
  process.exit(1);
}

const html = readFileSync(pagina, 'utf8');
const problemi = [];
const attributo = (tag, nome) => tag.match(new RegExp(`\\b${nome}="([^"]*)"`))?.[1] ?? null;
const schede = new Map();

for (const match of html.matchAll(/<a class="scheda"[^>]*>/g)) {
  const tag = match[0];
  const slug = attributo(tag, 'href')?.match(/canzone\/([^/]+)\/$/)?.[1];
  if (!slug) { problemi.push('Scheda senza URL di canzone'); continue; }
  if (schede.has(slug)) problemi.push(`Scheda duplicata: ${slug}`);
  schede.set(slug, {
    generi: (attributo(tag, 'data-generi') || '').split(/\s+/).filter(Boolean),
    paese: attributo(tag, 'data-paese'),
    temi: (attributo(tag, 'data-temi') || '').split(/\s+/).filter(Boolean),
  });
}

if (!html.includes('data-paese="it"') || !html.includes('>Artisti italiani</button>')) {
  problemi.push('Manca il pulsante del filtro Artisti italiani');
}
if (schede.size !== canzoni.length) problemi.push(`Schede nell'archivio: ${schede.size}, nei dati: ${canzoni.length}`);

const slugs = new Set();
for (const c of canzoni) {
  if (slugs.has(c.slug)) problemi.push(`Slug duplicato nei dati: ${c.slug}`);
  slugs.add(c.slug);
  const artista = perArtista.get(c.artistaSlug);
  if (!artista) { problemi.push(`Artista mancante: ${c.slug}`); continue; }
  const paeseAtteso = artista.paese === 'it' ? 'it' : '';
  if ((c.paese || '') !== paeseAtteso) problemi.push(`${c.slug}: paese ${JSON.stringify(c.paese)}, atteso ${JSON.stringify(paeseAtteso)}`);

  const scheda = schede.get(c.slug);
  if (!scheda) { problemi.push(`Scheda assente dall'archivio: ${c.slug}`); continue; }
  if (scheda.paese !== paeseAtteso) problemi.push(`${c.slug}: data-paese ${JSON.stringify(scheda.paese)}, atteso ${JSON.stringify(paeseAtteso)}`);
  for (const campo of ['generi', 'temi']) {
    if (JSON.stringify(scheda[campo]) !== JSON.stringify(c[campo] || [])) {
      problemi.push(`${c.slug}: data-${campo} diverso dai dati`);
    }
  }
}
for (const slug of schede.keys()) if (!slugs.has(slug)) problemi.push(`Scheda non presente nei dati: ${slug}`);

const italiane = canzoni.filter((c) => c.paese === 'it').length;
console.log(`Schede controllate: ${canzoni.length}; artisti italiani nel filtro: ${italiane}`);
if (problemi.length) {
  problemi.slice(0, 30).forEach((p) => console.error(p));
  if (problemi.length > 30) console.error(`…e altri ${problemi.length - 30} problemi`);
  process.exit(1);
}
console.log('Filtri e attributi dell’archivio coerenti con i dati.');
