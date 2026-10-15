#!/usr/bin/env node
// Verifica i percorsi scelti nei dati e il loro posizionamento nell'HTML.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { COLLEGAMENTI_CONTESTUALI, collegamentiContestuali, collegamentoNelTesto } from './genera/collegamenti-contestuali.mjs';
const root = new URL('../', import.meta.url);
const songs = JSON.parse(readFileSync(new URL('dati/canzoni.json', root), 'utf8'));
const bySlug = new Map(songs.map(c => [c.slug, c]));
let links = 0;
for (const slug of Object.keys(COLLEGAMENTI_CONTESTUALI)) {
  const c = bySlug.get(slug);
  assert(c, `Sorgente inesistente: ${slug}`);
  const paragraph = collegamentiContestuali(c, bySlug, '../../');
  const html = readFileSync(new URL(`sito/canzone/${slug}/index.html`, root), 'utf8');
  const story = html.match(/<section class="blocco" id="storia">[\s\S]*?<\/section>/)?.[0];
  const scelta = COLLEGAMENTI_CONTESTUALI[slug];
  if (scelta.nelTesto) {
    const i = scelta.nelTesto.paragrafo;
    const testo = collegamentoNelTesto(c, c.corpo[i], i, bySlug, '../../');
    assert(story?.includes(`<p>${testo}</p>`), `${slug}: collegamento assente dalla prosa`);
    assert.equal(paragraph, '', `${slug}: paragrafo duplicato`);
  } else {
    assert(story?.includes(paragraph), `${slug}: percorso assente dalla storia`);
    assert.equal((html.match(/class="collegamenti-contestuali"/g) || []).length, 1, `${slug}: percorso duplicato`);
  }
  for (const target of COLLEGAMENTI_CONTESTUALI[slug].destinazioni) {
    readFileSync(new URL(`sito/canzone/${target}/index.html`, root));
    links++;
  }
}
console.log(`${Object.keys(COLLEGAMENTI_CONTESTUALI).length} percorsi contestuali, ${links} collegamenti: dati, destinazioni e posizione corretti.`);
