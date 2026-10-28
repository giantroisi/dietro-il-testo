#!/usr/bin/env node
import { decodificaHTML, leggiHTML, fallisci, eseguiCLI } from './genera/integrita-output.mjs';

export function controllaURLInterni(out) {
  const pages = leggiHTML(out);
  const problemi = [];
  for (const p of pages) {
    const html = decodificaHTML(p.html);
    // Confine del dominio: dietroiltesto.it.example.org non è il nostro sito.
    const re = /https?:\/\/(?:www\.)?dietroiltesto\.it(?=[:/?#"'<>\s]|$)/gi;
    const errati = new Set([...html.matchAll(re)].map(m => m[0]).filter(url => url.toLowerCase() !== 'https://www.dietroiltesto.it'));
    for (const url of errati) problemi.push(`${p.percorso}: URL interno non canonico ${url}`);
  }
  fallisci('URL interni assoluti http o senza www', problemi);
  return { controllo: 'URL interni', pagine: pages.length, problemi: 0 };
}

eseguiCLI(import.meta.url, controllaURLInterni);
