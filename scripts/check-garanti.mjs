#!/usr/bin/env node
// F90 — trova le frasi in cui una TESTATA viene data come garante di
// un'affermazione: «Secondo Songfacts, il brano riflette su…».
//
// Perche' esiste. Il quinto campione di F71 ha trovato due schede che firmano
// con il nome di una testata una lettura scritta dalla redazione. Non e' una
// citazione sbagliata: e' una fonte usata come garante di una frase che non ha
// scritto, ed e' la forma piu' insidiosa, perche' **una frase firmata da una
// testata sembra gia' verificata** — il nome della fonte fa da prova al posto
// della prova. Le due controllate erano entrambe false.
//
// Cosa fa e cosa NON fa: segnala le occorrenze, non le giudica. Una frase
// firmata puo' benissimo essere giusta. Quello che il controllo impedisce e'
// che ne compaia una NUOVA senza che nessuno l'abbia aperta.
//
// Come si chiude una segnalazione: si apre la fonte, si decide fra i tre soli
// esiti ammessi (la testata lo dice davvero / lo dice qualcun altro dentro
// quella pagina, e allora si attribuisce a quella persona / non lo dice
// nessuno, e allora si toglie la firma o la frase), e si registra la chiave in
// `dati/garanti-verificati.json` con l'esito. Chi registra senza aver aperto la
// fonte non sta usando questo strumento: lo sta aggirando.
//
// Non richiede rete. Uso: node scripts/check-garanti.mjs [--chiavi]

import { readFileSync, existsSync } from 'node:fs';

const TESTATE = [
  'Songfacts', 'Wikipedia', 'Loudwire', 'Louder', 'Ultimate Classic Rock',
  'American Songwriter', 'Rolling Stone', 'Fanpage', 'Far Out', 'Rockol',
  'Billboard', 'NME', 'Kerrang', 'Metal Hammer', 'Guitar World', 'Radio X',
  'Genius', 'Treccani', 'Il Pitagora', 'Extra Chill', 'Songtell', 'Blitz Quotidiano',
  'Ondarock', 'Repubblica', 'Corriere', 'Il Post', 'Vanity Fair',
];
const T = TESTATE.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const PATTERN = new RegExp(
  `(secondo\\s+(?:${T})|come\\s+(?:riporta|scrive|racconta)\\s+(?:${T})|(?:${T})\\s+(?:riporta|scrive|racconta|definisce|descrive|sostiene))`,
  'gi'
);

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const verificate = existsSync('dati/garanti-verificati.json')
  ? JSON.parse(readFileSync('dati/garanti-verificati.json', 'utf8'))
  : {};

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9à-ÿ ]+/g, ' ').replace(/\s+/g, ' ').trim();

const trovate = [];
for (const c of canzoni) {
  const pezzi = [];
  for (const x of c.corpo || []) pezzi.push(['corpo', x]);
  if (c.fraseIconica) pezzi.push(['fraseIconica', c.fraseIconica]);
  for (const [dove, testo] of pezzi) {
    for (const m of testo.matchAll(PATTERN)) {
      const seguito = testo.slice(m.index + m[0].length, m.index + m[0].length + 70);
      const chiave = `${c.slug}|${norm(m[0])}|${norm(seguito).slice(0, 40)}`;
      trovate.push({ slug: c.slug, dove, firma: m[0], seguito: seguito.trim(), chiave });
    }
  }
}

const daControllare = trovate.filter((t) => !verificate[t.chiave]);
const gia = trovate.length - daControllare.length;

console.log(`Frasi firmate da una testata: ${trovate.length}  (in ${new Set(trovate.map((t) => t.slug)).size} schede)`);
console.log(`  gia controllate alla fonte: ${gia}`);
console.log(`  mai aperte:                 ${daControllare.length}`);

if (daControllare.length) {
  console.log('\nDa aprire una per una:');
  for (const t of daControllare) {
    console.log(`  ${t.slug} [${t.dove}] — «${t.firma}${t.seguito ? ' ' + t.seguito.replace(/^[,\s]+/, '').slice(0, 60) + '…' : ''}»`);
    if (process.argv.includes('--chiavi')) console.log(`      chiave: ${t.chiave}`);
  }
  console.log('\nUna frase firmata da una testata sembra gia verificata: e proprio per questo');
  console.log('che nessuno la controlla. Delle prime due aperte, due erano sbagliate.');
  process.exit(1);
}
console.log('\nOgni frase firmata da una testata e stata aperta alla fonte.');
