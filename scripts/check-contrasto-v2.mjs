#!/usr/bin/env node
// Verifica il contrasto WCAG del sito generato (P7 della Costituzione):
// --identita-testo su sfondo chiaro/scuro, --identita-contrasto sul bottone pieno.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const canzoni = JSON.parse(readFileSync(join(ROOT, 'dati', 'canzoni.json'), 'utf8'));
const artisti = JSON.parse(readFileSync(join(ROOT, 'dati', 'artisti.json'), 'utf8'));

const BG_LIGHT = '#FDFCFF';
const BG_DARK = '#131019';
const MIN = 4.5;

function hexToRgb(h) { const s = h.replace('#',''); return [parseInt(s.slice(0,2),16),parseInt(s.slice(2,4),16),parseInt(s.slice(4,6),16)]; }
function rgbToHex([r,g,b]) { return '#'+[r,g,b].map(v=>Math.round(v).toString(16).padStart(2,'0')).join('').toUpperCase(); }
function mix(a,pa,b,pb) { const A=hexToRgb(a),B=hexToRgb(b); return rgbToHex(A.map((v,i)=>v*pa/100+B[i]*pb/100)); }
function lum(h) { const [r,g,b]=hexToRgb(h).map(c=>{const s=c/255; return s<=0.03928?s/12.92:Math.pow((s+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; }
function contrast(a,b) { const l1=lum(a),l2=lum(b); const [hi,lo]=l1>l2?[l1,l2]:[l2,l1]; return (hi+0.05)/(lo+0.05); }
function suColore(hex) { return contrast('#FFFFFF',hex) >= contrast('#000000',hex) ? '#FFFFFF' : '#000000'; }

const colori = new Map();
for (const c of canzoni) if (c.colore) colori.set(`canzone:${c.slug}`, c.colore);
for (const a of artisti) if (a.colore) colori.set(`artista:${a.slug}`, a.colore);

let fail = [];
for (const [id, accent] of colori) {
  const testoChiaro = mix(accent, 70, '#000000', 30);
  const testoScuro = mix(accent, 56, '#FFFFFF', 44);
  const cChiaro = contrast(testoChiaro, BG_LIGHT);
  const cScuro = contrast(testoScuro, BG_DARK);
  const contrastoBottone = contrast(suColore(accent), accent);
  if (cChiaro < MIN) fail.push({ id, cosa: 'sopratitolo (chiaro)', v: cChiaro });
  if (cScuro < MIN) fail.push({ id, cosa: 'sopratitolo (scuro)', v: cScuro });
  if (contrastoBottone < MIN) fail.push({ id, cosa: 'bottone pieno', v: contrastoBottone });
}

console.log(`Pagine con colore identitario: ${colori.size}`);
console.log(`Fallimenti (< ${MIN}:1): ${fail.length}`);
if (fail.length) {
  fail.forEach(f => console.log(`  ${f.id.padEnd(40)} ${f.cosa.padEnd(22)} ${f.v.toFixed(2)}:1`));
  process.exitCode = 1;
} else {
  console.log('Tutti i valori sono sopra soglia.');
}
