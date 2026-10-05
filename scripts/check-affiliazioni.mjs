#!/usr/bin/env node
// Fase 1: configurazione vuota, componente silente, disclosure pubblica e
// nessuna integrazione Amazon caricata dal sito generato.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { TRACKING_ID_AMAZON, collegamentoAmazon } from './genera/affiliazioni.mjs';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'sito');
const leggi = (p) => readFileSync(join(out, p), 'utf8');
const errori = [];
if (TRACKING_ID_AMAZON) errori.push('Tracking ID già presente nella Fase 1');
if (collegamentoAmazon() !== '') errori.push('Componente attivo senza Tracking ID');
const pagina = leggi('affiliazioni/index.html');
if (!pagina.includes('potranno contenere link affiliati')) errori.push('Informativa futura assente');
if (pagina.includes('In qualità di Affiliato Amazon io ricevo un guadagno dagli acquisti idonei')) errori.push('Dichiarazione di Fase 2 pubblicata prima dell’adesione');
for (const file of ['index.html', 'privacy/index.html', 'note-legali/index.html', 'canzone/aerials/index.html']) {
  if (!/href="(?:\.\.\/)*affiliazioni\/"/.test(leggi(file))) errori.push(`Link footer assente in ${file}`);
}
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.html')) {
      const html = readFileSync(full, 'utf8');
      if (html.includes('class="link-affiliato"') || /<a[^>]+href="https:\/\/www\.amazon\.it\/[^"]*(?:\?|&amp;)tag=/i.test(html)) {
        errori.push(`Link affiliato Amazon attivo in ${full.slice(out.length + 1)}`);
      }
    }
  }
}
walk(out);
if (errori.length) { for (const e of errori) console.error(e); process.exit(1); }
console.log('OK: Fase 1 senza Tracking ID, link Amazon o dichiarazione di affiliazione attiva.');
