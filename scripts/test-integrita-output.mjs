#!/usr/bin/env node
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { controllaImmaginiOG } from './check-og.mjs';
import { controllaURLInterni } from './check-url-interni.mjs';

function fixture(html, run) {
  const root = mkdtempSync(join(tmpdir(), 'dit-integrita-test-'));
  mkdirSync(join(root, 'og'));
  writeFileSync(join(root, 'og', 'valida.png'), Buffer.from([137, 80, 78, 71]));
  writeFileSync(join(root, 'index.html'), html);
  try { run(root); } finally { rmSync(root, { recursive: true, force: true }); }
}

for (const content of ['https://www.dietroiltesto.it/og/valida.png?v=123&amp;x=1#foto', '/og/valida.png', 'og/valida.png']) {
  test(`OG esistente: ${content}`, () => fixture(`<meta content='${content}' property='og:image'>`, root => {
    assert.equal(controllaImmaginiOG(root).immaginiLocali, 1);
  }));
}
for (const content of ['/og/mancante.png', '/og/valida%ZZ.png', '', '/og/']) {
  test(`OG rifiutata: ${content}`, () => fixture(`<meta property="og:image" content="${content}">`, root => {
    assert.throws(() => controllaImmaginiOG(root), /Open Graph/);
  }));
}
test('OG esterna e commento non sono file locali', () => fixture('<meta property="og:image" content="https://example.org/foto.png"><!-- <meta property="og:image" content="/manca.png"> -->', root => {
  assert.equal(controllaImmaginiOG(root).immaginiLocali, 0);
}));
test('OG: un file vuoto fallisce', () => fixture('<meta property="og:image" content="/og/vuota.png">', root => {
  writeFileSync(join(root, 'og', 'vuota.png'), '');
  assert.throws(() => controllaImmaginiOG(root), /Open Graph/);
}));
test('OG: symlink esterno fallisce', () => fixture('<meta property="og:image" content="/og/fuori.png">', root => {
  symlinkSync('/etc/hosts', join(root, 'og', 'fuori.png'));
  assert.throws(() => controllaImmaginiOG(root), /Symlink/);
}));
for (const origin of ['http://dietroiltesto.it', 'http://www.dietroiltesto.it', 'https://dietroiltesto.it', 'HTTP://WWW.DIETROILTESTO.IT']) {
  test(`URL non canonico: ${origin}`, () => fixture(`<a href="${origin}/canzone/esempio/">Esempio</a>`, root => {
    assert.throws(() => controllaURLInterni(root), /non canonico/);
  }));
}
test('URL canonici, relativi, esterni e nomi simili passano', () => fixture('<a href="https://www.dietroiltesto.it/">Home</a><a href="../">Su</a><a href="https://example.org/">Fonte</a><a href="https://dietroiltesto.it.example.org/">Altro dominio</a>', root => {
  assert.equal(controllaURLInterni(root).problemi, 0);
}));
test('URL non canonico in dati strutturati fallisce', () => fixture('<script type="application/ld+json">{"url":"https://dietroiltesto.it/"}</script>', root => {
  assert.throws(() => controllaURLInterni(root), /non canonico/);
}));
test('URL con entità numerica fallisce', () => fixture('<a href="&#104;ttp://www.dietroiltesto.it/">Home</a>', root => {
  assert.throws(() => controllaURLInterni(root), /non canonico/);
}));
test('Una sottopagina non viene ignorata', () => fixture('<p>Home</p>', root => {
  mkdirSync(join(root, 'canzone'));
  writeFileSync(join(root, 'canzone', 'index.html'), '<meta property="og:image" content="/manca.png"><a href="http://dietroiltesto.it/">Home</a>');
  assert.throws(() => controllaImmaginiOG(root), /canzone/);
  assert.throws(() => controllaURLInterni(root), /canzone/);
}));
