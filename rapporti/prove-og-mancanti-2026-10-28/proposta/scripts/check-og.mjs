#!/usr/bin/env node
import { statSync, realpathSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { ORIGINE, HOST_INTERNI, attributi, leggiHTML, fallisci, eseguiCLI } from './genera/integrita-output.mjs';

export function controllaImmaginiOG(out) {
  const root = realpathSync(out);
  const pages = leggiHTML(root);
  const problemi = [];
  let locali = 0;
  for (const p of pages) {
    for (const tag of p.html.match(/<meta\b[^>]*>/gi) || []) {
      const a = attributi(tag);
      if (!['og:image', 'og:image:secure_url'].includes((a.property || '').toLowerCase())) continue;
      try {
        if (!a.content?.trim()) throw new Error('content vuoto');
        const url = new URL(a.content.trim(), `${ORIGINE}/${p.percorso}`);
        if (!HOST_INTERNI.has(url.hostname)) continue;
        locali++;
        const file = resolve(root, '.' + decodeURIComponent(url.pathname));
        if (!file.startsWith(root + sep)) throw new Error('percorso fuori dall’output');
        const reale = realpathSync(file);
        if (!reale.startsWith(root + sep)) throw new Error('symlink fuori dall’output');
        if (!statSync(reale).isFile() || !statSync(reale).size) throw new Error('non è un file regolare non vuoto');
      } catch (error) {
        problemi.push(`${p.percorso}: ${a.content || '(vuoto)'} — ${error.message}`);
      }
    }
  }
  fallisci('Immagini Open Graph mancanti o non valide', problemi);
  return { controllo: 'og:image', pagine: pages.length, immaginiLocali: locali, problemi: 0 };
}

eseguiCLI(import.meta.url, controllaImmaginiOG);
