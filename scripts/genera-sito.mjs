#!/usr/bin/env node
// Genera il sito statico dai dati in dati/*.json.
// Applica il P9 della Costituzione: ogni numero visibile nasce dai dati.
//
// Uso: node scripts/genera-sito.mjs [--out sito]

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { SITO } from './genera/guscio.mjs';
import { paginaCanzone, paginaArtista, paginaAlbum, paginaHome, paginaArchivio, paginaMetodo } from './genera/pagine.mjs';
import { generaRicerca } from './genera/ricerca.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const argOut = process.argv.indexOf('--out');
const OUT = join(ROOT, argOut > -1 ? process.argv[argOut + 1] : 'sito');

const canzoni = JSON.parse(readFileSync(join(ROOT, 'dati', 'canzoni.json'), 'utf8'));
const artisti = JSON.parse(readFileSync(join(ROOT, 'dati', 'artisti.json'), 'utf8'));

// ganci editoriali opzionali: { "slug-canzone": "una riga" }
let ganci = {};
const percorsoGanci = join(ROOT, 'dati', 'ganci.json');
if (existsSync(percorsoGanci)) ganci = JSON.parse(readFileSync(percorsoGanci, 'utf8'));
for (const c of canzoni) c.gancio = ganci[c.slug] || null;

// ------------------------------------------------------------- contesto

const canzoniPerSlug = new Map(canzoni.map((c) => [c.slug, c]));
const artistiPerSlug = new Map(artisti.map((a) => [a.slug, a]));

// Un album diventa destinazione solo se l'artista ne ha una discografia verificata.
const album = [];
for (const a of artisti) {
  for (const d of a.album) {
    if (!d.titolo) continue;
    album.push({
      ...d,
      artistaSlug: a.slug,
      colore: canzoni.find((c) => c.artistaSlug === a.slug && c.albumSlug === d.slug)?.colore || a.colore,
    });
  }
}
const albumPerSlug = new Map(album.map((al) => [`${al.artistaSlug}/${al.slug}`, al]));

const dataRevisione = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

const ctx = {
  canzoni,
  artisti,
  album,
  canzoniPerSlug,
  artistiPerSlug,
  albumPerSlug,
  dataRevisione,
  totali: { canzoni: canzoni.length, artisti: artisti.length, album: album.length },
};

// ------------------------------------------------------------- scrittura

function scrivi(percorsoRelativo, contenuto) {
  const completo = join(OUT, percorsoRelativo);
  mkdirSync(dirname(completo), { recursive: true });
  writeFileSync(completo, contenuto, 'utf8');
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

scrivi('index.html', paginaHome(ctx));
scrivi('archivio/index.html', paginaArchivio(ctx));
scrivi('metodo/index.html', paginaMetodo(ctx));

for (const c of canzoni) scrivi(`canzone/${c.slug}/index.html`, paginaCanzone(c, ctx));
for (const a of artisti) scrivi(`artista/${a.slug}/index.html`, paginaArtista(a, ctx));
for (const al of album) scrivi(`album/${al.artistaSlug}/${al.slug}/index.html`, paginaAlbum(al, ctx));

scrivi('ricerca.js', generaRicerca(ctx));

// risorse statiche riusate dal sito attuale
for (const f of ['logo.png', 'favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png']) {
  if (existsSync(join(ROOT, f))) cpSync(join(ROOT, f), join(OUT, f));
}
// immagini di anteprima per la condivisione (F23), generate a parte da scripts/genera-og.py
if (existsSync(join(ROOT, 'og'))) cpSync(join(ROOT, 'og'), join(OUT, 'og'), { recursive: true });

// ------------------------------------------------------- sitemap e robots

const oggi = new Date().toISOString().slice(0, 10);
const url = (p, priorita) =>
  `  <url><loc>${SITO.base}/${p}</loc><lastmod>${oggi}</lastmod><priority>${priorita}</priority></url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${url('', '1.0')}
${url('archivio/', '0.8')}
${url('metodo/', '0.5')}
${canzoni.map((c) => url(`canzone/${c.slug}/`, '0.9')).join('\n')}
${artisti.map((a) => url(`artista/${a.slug}/`, '0.7')).join('\n')}
${album.map((al) => url(`album/${al.artistaSlug}/${al.slug}/`, '0.6')).join('\n')}
</urlset>
`;
scrivi('sitemap.xml', sitemap);
scrivi('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITO.base}/sitemap.xml\n`);

// -------------------------------------------------------------- riepilogo

const conGancio = canzoni.filter((c) => c.gancio).length;
const totale = 3 + canzoni.length + artisti.length + album.length;

console.log(`Pagine generate:   ${totale}`);
console.log(`  canzoni          ${canzoni.length}`);
console.log(`  artisti          ${artisti.length}`);
console.log(`  album            ${album.length}`);
console.log(`  fisse            3 (home, archivio, metodo)`);
console.log('');
console.log(`Ganci scritti:     ${conGancio}/${canzoni.length}`);
console.log(`Destinazione:      ${OUT.replace(ROOT + '/', '')}/`);
