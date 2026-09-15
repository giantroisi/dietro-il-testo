#!/usr/bin/env node
// Citazioni nude nella FRASE ICONICA.
//
// Una citazione fra virgolette, dentro la frase iconica, puo' essere solo
// tre cose:
//   1. le parole di QUALCUNO   -> nella frase c'e' chi le ha dette
//   2. il nome di UN'OPERA     -> un album, un film, un libro, un titolo
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

// 1. qualcuno le ha dette: il verbo o la formula sta da qualche parte
//    NELLA STESSA FRASE, prima delle virgolette.
const DETTE = new RegExp(
  '(' +
    'dichiar\\w*|raccont\\w*|ricord\\w*|spieg\\w*|definit?\\w*|defin[iì]\\w*|descri\\w*|' +
    'commen\\w*|amme\\w*|conferm\\w*|sostien\\w*|dice|disse|detto|dicendo|' +
    'scriss\\w*|scritt\\w*|riport\\w*|second[oa]|parole di|' +
    'nelle parole\\w*|citazione\\w*|rivel\\w*|chiam\\w*|us[oò]|usa\\w*' +
  ')',
  'i'
);

// 2. e' il nome di un'opera: il sostantivo che la introduce sta poco prima.
//    Qui la finestra resta corta: «album» a inizio frase non regge una
//    citazione che arriva quaranta parole dopo.
const OPERA = new RegExp(
  '(' +
    'album|singolo|EP|disco|traccia|titolo|brano|canzone|pezzo|raccolta|' +
    'film|romanzo|libro|racconto|poema|documentario|serie|autobiografia|' +
    'memorie|biografia|rivista|programma|videoclip|video|colonna sonora|' +
    'tour|festival|rubrica|sigla|finale di|successo di|insieme a' +
  ')\\w*[^.!?]{0,45}$',
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

    // La finestra e' LA FRASE, non un numero fisso di caratteri. Il 15 settembre
    // 2026 questo controllo ha dato per nuda la citazione di `purple-rain`, che
    // invece era attribuita a Prince all'inizio della stessa frase, novanta
    // caratteri piu' indietro: con una finestra fissa a 80 il soggetto restava
    // fuori. Chi parla puo' stare in fondo alla frase o in cima: dentro la
    // frase si guarda tutta, oltre la frase non si guarda.
    const inizio = t.slice(0, m.index);
    const confine = Math.max(
      inizio.lastIndexOf('. '),
      inizio.lastIndexOf('! '),
      inizio.lastIndexOf('? ')
    );
    const frase = inizio.slice(confine + 1).replace(/\s+/g, ' ');

    if (DETTE.test(frase) || OPERA.test(frase)) continue;
    nude.push({ slug: c.slug, parole, prima: frase.slice(-58) });
  }
}

nude.sort((a, b) => b.parole - a.parole);

console.log('');
console.log('Citazioni NUDE nella frase iconica: nessuno le ha dette, nessun titolo le regge.');
console.log(`Citazioni di 3+ parole esaminate: ${totali} — nude: ${nude.length}`);
console.log('');
console.log("Le piu' lunghe per prime: piu' parole ci sono, piu' e' probabile che");
console.log('siano le parole della canzone e non un frammento innocuo.');
console.log('');
for (const n of nude) {
  console.log(`${String(n.parole).padStart(2)} parole  ${n.slug.padEnd(30)} …${n.prima}⟦?⟧`);
}
console.log('');
console.log('IL 15 SETTEMBRE 2026 QUESTE DODICI SONO STATE GUARDATE TUTTE.');
console.log('Undici sono titoli di opere che il filtro non riconosce — un quadro di');
console.log("Bacon, il ritornello che coincide col titolo, un film, un'altra canzone,");
console.log("una commedia teatrale — e una e' una parafrasi di tre parole (africa).");
console.log('NESSUNA ERA UN VERSO. Il buco della Sezione 3 nella frase iconica, dopo');
console.log('97 citazioni esaminate su 312 schede, non risulta aperto.');
console.log('');
console.log('Il valore di questo controllo non e\' il dodici: e\' che il dodici si muova.');
console.log('Se sale, la nuova non l\'ha guardata nessuno.');
console.log('');
console.log('Cosa farne, per ognuna: aprire la scheda e decidere.');
console.log('  - se sono parole di qualcuno   -> scrivere chi, nella stessa frase');
console.log("  - se e' un titolo              -> scrivere di che cosa e' il titolo");
console.log('  - se sono parole della canzone -> toglierle e raccontare cosa dicono');
console.log('');
process.exit(nude.length ? 1 : 0);
