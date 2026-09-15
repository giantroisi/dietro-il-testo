#!/usr/bin/env node
// Citazioni nude nella FRASE ICONICA.
//
// Una citazione fra virgolette, dentro la frase iconica, puo' essere solo
// tre cose:
//   1. le parole di QUALCUNO  -> prima delle virgolette c'e' chi le ha dette
//   2. il nome di UN'OPERA    -> un album, un film, un libro, un titolo
//   3. le parole della CANZONE -> e allora e' un verso, e la Sezione 3 lo vieta
//
// Questo controllo non sa distinguere la 3 dalle altre due: sa dire quando
// NON si vede ne' la 1 ne' la 2. Quelle sono le citazioni nude, e vanno
// guardate a mano.
//
// NON STAMPA MAI IL TESTO FRA VIRGOLETTE. Stampa solo lo slug, quante parole
// sono e le parole che le precedono. Il motivo e' pratico: se il verso finisce
// nell'output, finisce anche nella sessione di chi deve correggerlo, e quella
// sessione si blocca. Chi corregge apre la scheda e lo legge li'.

import fs from 'node:fs';
import path from 'node:path';

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const canzoni = JSON.parse(fs.readFileSync(path.join(RADICE, 'dati/canzoni.json'), 'utf8'));
const elenco = Array.isArray(canzoni) ? canzoni : canzoni.canzoni || canzoni.brani;

const VIRGOLETTE = /[“«"]([^”»"]{2,400})[”»"]/g;

// 1. qualcuno le ha dette: il verbo o la formula sta subito prima
const DETTE = new RegExp(
  '(' +
    'dichiar\\w*|raccont\\w*|ricord\\w*|spieg\\w*|definit?\\w*|defin[iì]\\w*|descri\\w*|' +
    'commen\\w*|amme\\w*|conferm\\w*|sostien\\w*|dice|disse|detto|dicendo|' +
    'scriss\\w*|scritt\\w*|riport\\w*|second[oa]|parole di|' +
    'nelle parole\\w*|citazione\\w*|rivel\\w*|chiam\\w*|us[oò]|usa\\w*' +
  ')[^.!?]{0,70}$',
  'i'
);

// 2. e' il nome di un'opera: il sostantivo che la introduce sta subito prima
const OPERA = new RegExp(
  '(' +
    'album|singolo|EP|disco|traccia|titolo|brano|canzone|pezzo|raccolta|' +
    'film|romanzo|libro|racconto|poema|documentario|serie|autobiografia|' +
    'memorie|biografia|rivista|programma|videoclip|video|colonna sonora|' +
    'tour|festival|rubrica|sigla' +
  ')\\w*[^.!?]{0,40}$',
  'i'
);

const nude = [];
let totali = 0;

for (const c of elenco) {
  const t = c.fraseIconica;
  if (!t) continue;
  let m;
  VIRGOLETTE.lastIndex = 0;
  while ((m = VIRGOLETTE.exec(t))) {
    const parole = m[1].trim().split(/\s+/).length;
    // 1-2 parole: un nome proprio, una parola sola, un soprannome. Troppo poco
    // per essere un verso e troppo rumore per essere utile.
    if (parole < 3 || parole > 25) continue;
    totali++;
    const prima = t.slice(Math.max(0, m.index - 80), m.index).replace(/\s+/g, ' ');
    if (DETTE.test(prima) || OPERA.test(prima)) continue;
    nude.push({ slug: c.slug, parole, prima: prima.slice(-58) });
  }
}

nude.sort((a, b) => b.parole - a.parole);

console.log('');
console.log('Citazioni NUDE nella frase iconica: nessuno le ha dette, nessun titolo le regge.');
console.log(`Citazioni di 3+ parole esaminate: ${totali} — nude: ${nude.length}`);
console.log('');
console.log('Le piu\' lunghe per prime: piu\' parole ci sono, piu\' e\' probabile che');
console.log('siano le parole della canzone e non un frammento innocuo.');
console.log('');
for (const n of nude) {
  console.log(`${String(n.parole).padStart(2)} parole  ${n.slug.padEnd(30)} …${n.prima}⟦?⟧`);
}
console.log('');
console.log('Cosa farne, per ognuna: aprire la scheda e decidere.');
console.log('  - se sono parole di qualcuno -> scrivere chi, davanti alle virgolette');
console.log('  - se e\' un titolo           -> scrivere di che cosa e\' il titolo');
console.log('  - se sono parole della canzone -> toglierle e raccontare cosa dicono');
console.log('');
process.exit(nude.length ? 1 : 0);
