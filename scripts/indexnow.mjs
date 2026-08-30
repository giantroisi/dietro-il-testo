#!/usr/bin/env node
// F68 — Segnala a IndexNow (Bing, Yandex, Seznam, Naver) gli indirizzi cambiati.
//
// Google NON usa IndexNow: per Google restano sitemap e Search Console. Questo
// script serve a farsi indicizzare in ore invece che in settimane sugli altri
// motori — e Bing alimenta anche gli assistenti che rispondono citando fonti.
//
// Va lanciato DOPO la pubblicazione, non prima: IndexNow verifica che gli
// indirizzi segnalati rispondano davvero, e segnalarne uno non ancora online
// è un errore che costa credibilità al dominio.
//
// Uso:
//   node scripts/indexnow.mjs            solo gli indirizzi con lastmod di oggi
//   node scripts/indexnow.mjs --tutti    tutti gli indirizzi (primo invio)
//   node scripts/indexnow.mjs --prova    mostra cosa invierebbe, senza inviare

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.dietroiltesto.it';
const HOST = 'www.dietroiltesto.it';

const tutti = process.argv.includes('--tutti');
const prova = process.argv.includes('--prova');

// La chiave sta in un posto solo (P9): di lì nasce sia il file pubblicato sia
// questa segnalazione, così non possono divergere.
const percorsoChiave = join(ROOT, 'dati', 'indexnow.json');
if (!existsSync(percorsoChiave)) {
  console.error('Manca dati/indexnow.json: nessuna chiave IndexNow configurata.');
  process.exit(1);
}
const chiave = JSON.parse(readFileSync(percorsoChiave, 'utf8')).indexnow;
if (!chiave) {
  console.error('dati/indexnow.json non contiene nessuna chiave.');
  process.exit(1);
}

// Il file di proprietà deve esistere nella radice pubblicata, altrimenti la
// segnalazione viene rifiutata: meglio accorgersene qui che dal registro di Bing.
if (!existsSync(join(ROOT, `${chiave}.txt`))) {
  console.error(`Manca ${chiave}.txt nella radice del sito: rigenera e ripubblica prima di segnalare.`);
  process.exit(1);
}

const SITEMAP = ['sitemap-pagine.xml', 'sitemap-canzoni.xml', 'sitemap-artisti.xml', 'sitemap-album.xml', 'sitemap-raccolte.xml'];
const oggi = new Date().toISOString().slice(0, 10);

const indirizzi = [];
for (const nome of SITEMAP) {
  const percorso = join(ROOT, nome);
  if (!existsSync(percorso)) {
    console.error(`Manca ${nome} nella radice: pubblica prima di segnalare.`);
    process.exit(1);
  }
  const xml = readFileSync(percorso, 'utf8');
  for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
    if (tutti || m[2].trim() === oggi) indirizzi.push(m[1].trim());
  }
}

if (indirizzi.length === 0) {
  console.log(`Nessun indirizzo con lastmod ${oggi}: niente da segnalare.`);
  console.log('(Usa --tutti per il primo invio, quando nessuna pagina è ancora nota ai motori.)');
  process.exit(0);
}

console.log(`Indirizzi da segnalare: ${indirizzi.length}${tutti ? ' (tutti)' : ` (modificati il ${oggi})`}`);
console.log(`Chiave: ${chiave}`);
console.log(`Primi cinque:\n  ${indirizzi.slice(0, 5).join('\n  ')}`);

if (prova) {
  console.log('\n--prova: nessuna richiesta inviata.');
  process.exit(0);
}

// IndexNow accetta fino a 10.000 indirizzi per richiesta; restiamo sotto con
// lotti da 1.000, che è anche più facile da leggere in caso di errore.
const LOTTO = 1000;
let inviati = 0;
for (let i = 0; i < indirizzi.length; i += LOTTO) {
  const urlList = indirizzi.slice(i, i + LOTTO);
  const risposta = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: chiave, keyLocation: `${BASE}/${chiave}.txt`, urlList }),
  });
  // 200 = accettati, 202 = accettati ma chiave ancora da verificare: entrambi
  // vanno bene. Qualunque altro codice è un problema da leggere, non da ignorare.
  if (risposta.status === 200 || risposta.status === 202) {
    inviati += urlList.length;
    console.log(`  lotto ${i / LOTTO + 1}: ${urlList.length} indirizzi accettati (HTTP ${risposta.status})`);
  } else {
    const corpo = await risposta.text();
    // 403 SiteVerificationNotCompleted non è un fallimento: è IndexNow che non
    // ha ancora letto il file della chiave sul sito. Succede sempre al primo
    // invio con una chiave appena pubblicata, e si risolve da solo aspettando.
    // Trattarlo come errore secco farebbe pensare a un problema che non c'è.
    if (risposta.status === 403 && corpo.includes('SiteVerificationNotCompleted')) {
      console.log('');
      console.log('IndexNow non ha ancora verificato la chiave sul sito.');
      console.log(`Il file esiste (${BASE}/${chiave}.txt): manca solo che IndexNow vada a leggerlo.`);
      console.log('Succede sempre al primo invio con una chiave appena pubblicata.');
      console.log('Non c\'è niente da correggere: riprova fra un\'ora con lo stesso comando.');
      process.exit(0);
    }
    console.error(`  lotto ${i / LOTTO + 1}: RIFIUTATO — HTTP ${risposta.status} ${corpo}`);
    process.exit(1);
  }
}
console.log(`\nSegnalati ${inviati} indirizzi a IndexNow.`);
