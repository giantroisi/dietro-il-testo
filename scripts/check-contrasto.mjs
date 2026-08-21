#!/usr/bin/env node
// F1 — verifica il contrasto WCAG effettivamente prodotto dal CSS di index.html:
// titolo del brano (h2.song-title) e pulsante primario (.links a.primary),
// nei due temi, per tutte le <section class="song">.
//
// Uso: node scripts/check-contrasto.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

const BG_LIGHT = '#FDFCFF';
const BG_DARK = '#15121C';
const ON_ACCENT_FALLBACK = '#FFFFFF';
const MIN_RATIO = 4.5;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
}
// CSS color-mix(in srgb, A p1%, B p2%): blend diretto sui canali sRGB codificati.
function colorMixSrgb(hexA, pctA, hexB, pctB) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const fa = pctA / 100;
  const fb = pctB / 100;
  return rgbToHex(a.map((v, i) => v * fa + b[i] * fb));
}
function relLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(hexA, hexB) {
  const l1 = relLuminance(hexA);
  const l2 = relLuminance(hexB);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

// Stessa regola di index.html: --accent 70% + nero 30% (titolo, tema chiaro)
// e --accent 55% + bianco 45% (titolo e sfondo pulsante, tema scuro).
const TITLE_LIGHT_MIX = (accent) => colorMixSrgb(accent, 70, '#000000', 30);
const DARK_ACCENT_MIX = (accent) => colorMixSrgb(accent, 55, '#FFFFFF', 45);

const sectionRe =
  /<section class="song" id="([^"]+)" style="--accent:(#[0-9A-Fa-f]{6}); --accent-2:(#[0-9A-Fa-f]{6}); --btn-fg-light:(#[0-9A-Fa-f]{6}); --btn-fg-dark:(#[0-9A-Fa-f]{6});">/g;

const sections = [];
let m;
while ((m = sectionRe.exec(html))) {
  sections.push({ id: m[1], accent: m[2].toUpperCase(), btnFgLight: m[4].toUpperCase(), btnFgDark: m[5].toUpperCase() });
}

if (sections.length === 0) {
  console.error('Nessuna sezione trovata: pattern regex da aggiornare (mancano --btn-fg-light/--btn-fg-dark?)');
  process.exit(1);
}

let failures = [];

for (const s of sections) {
  const titleLightColor = TITLE_LIGHT_MIX(s.accent);
  const darkAccent = DARK_ACCENT_MIX(s.accent);

  const titleLight = contrast(titleLightColor, BG_LIGHT);
  const titleDark = contrast(darkAccent, BG_DARK); // sfondo scheda = BG_DARK in entrambi i temi scuri
  const btnLight = contrast(s.btnFgLight || ON_ACCENT_FALLBACK, s.accent);
  const btnDark = contrast(s.btnFgDark || ON_ACCENT_FALLBACK, darkAccent);

  if (titleLight < MIN_RATIO) failures.push({ id: s.id, what: 'song-title (chiaro)', ratio: titleLight, bg: BG_LIGHT, fg: titleLightColor });
  if (titleDark < MIN_RATIO) failures.push({ id: s.id, what: 'song-title (scuro)', ratio: titleDark, bg: BG_DARK, fg: darkAccent });
  if (btnLight < MIN_RATIO) failures.push({ id: s.id, what: 'pulsante primario (chiaro)', ratio: btnLight, bg: s.accent, fg: s.btnFgLight });
  if (btnDark < MIN_RATIO) failures.push({ id: s.id, what: 'pulsante primario (scuro)', ratio: btnDark, bg: darkAccent, fg: s.btnFgDark });
}

console.log(`Schede controllate: ${sections.length}`);
console.log(`Fallimenti (< ${MIN_RATIO}:1): ${failures.length}`);
if (failures.length) {
  console.log('');
  for (const f of failures) {
    console.log(`  ${f.id.padEnd(32)} ${f.what.padEnd(26)} ${f.ratio.toFixed(2)}:1  (fg ${f.fg} su bg ${f.bg})`);
  }
  process.exitCode = 1;
} else {
  console.log('Tutti i valori sono sopra soglia in entrambi i temi.');
}
