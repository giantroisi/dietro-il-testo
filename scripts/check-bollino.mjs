#!/usr/bin/env node
// Il bollino: chi lo porta, e chi se l'e' guadagnato.
//
// `ultimaVerifica` dice QUANDO, non CHI. Un ripasso di chi ha scritto la voce
// e una verifica fatta da una mano diversa lasciano lo stesso identico segno
// nei dati, e valgono cose diverse: sulle otto biografie riaperte da fuori il
// 32% delle affermazioni non reggeva, e quelle otto portavano tutte il bollino.
//
// ATTENZIONE A COSA QUESTO CONTROLLO NON DICE. Non dice che il lavoro non sia
// stato fatto. Il 9 settembre 2026 le biografie sono state ripassate a lotti
// di dieci, un commit per lotto, con i controlli dichiarati nel messaggio:
// e' lavoro vero e sta nella cronologia di git, che non si cancella. Quel che
// manca a quelle voci non e' la fatica: e' l'indipendenza.
//
// Uso: node scripts/check-bollino.mjs

import fs from 'node:fs';
import path from 'node:path';

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const leggi = (f) => JSON.parse(fs.readFileSync(path.join(RADICE, f), 'utf8'));
const elenco = (j) => (Array.isArray(j) ? j : j.artisti || j.canzoni || j.brani);

const artisti = elenco(leggi('dati/artisti.json'));
const canzoni = elenco(leggi('dati/canzoni.json'));
const reg = leggi('verifiche/indipendenti.json');

let scoperte = 0;

function esamina(nome, voci, registro) {
  const conBollino = voci.filter((v) => v.ultimaVerifica);
  const verificate = conBollino.filter((v) => registro[v.slug]);
  const senza = conBollino.filter((v) => !registro[v.slug]);
  const registrateSenzaBollino = Object.keys(registro).filter(
    (s) => !voci.some((v) => v.slug === s && v.ultimaVerifica)
  );

  console.log(`\n### ${nome}`);
  console.log(`  voci totali:                    ${voci.length}`);
  console.log(`  con il bollino:                 ${conBollino.length}`);
  console.log(`  di cui verificate da fuori:     ${verificate.length}`);
  console.log(`  con il bollino, mai verificate: ${senza.length}`);

  if (registrateSenzaBollino.length) {
    console.log(`  verificate ma SENZA bollino:    ${registrateSenzaBollino.length}` +
      `  (${registrateSenzaBollino.join(', ')})`);
  }

  // Le date condivise da molte voci non sono una colpa: sono un lotto. Servono
  // a ricordare che quel giorno la mano era una sola.
  const per = {};
  for (const v of conBollino) per[v.ultimaVerifica] = (per[v.ultimaVerifica] || 0) + 1;
  const lotti = Object.entries(per).filter(([, n]) => n >= 8).sort();
  if (lotti.length) {
    console.log('  date portate da otto voci o piu\' — ripassi a lotti, non verifiche una per una:');
    for (const [d, n] of lotti) console.log(`     ${d}  ${n} voci`);
  }

  scoperte += senza.length;
  return senza;
}

console.log('');
console.log('IL BOLLINO DI VERIFICA: chi lo porta, e chi se l\'e\' guadagnato.');
console.log('Il bollino dice al lettore che qualcuno ha riaperto le fonti di quella voce.');

esamina('Artisti', artisti, reg.artisti || {});
esamina('Canzoni', canzoni, reg.canzoni || {});

console.log('');
if (scoperte === 0) {
  console.log('Ogni voce che mostra il bollino e\' stata riaperta da una mano diversa da');
  console.log('quella che l\'ha scritta. E\' la condizione che il bollino promette.');
  process.exit(0);
}

console.log(`${scoperte} voci mostrano al lettore un bollino che nessuno, da fuori, ha`);
console.log('confermato. Non vuol dire che siano sbagliate: vuol dire che non lo sappiamo.');
console.log('');
console.log('Le tre uscite, e la prima e\' quella scelta dall\'autore il 16 settembre 2026:');
console.log('  1. togliere ultimaVerifica dove non c\'e\' stata una verifica indipendente,');
console.log('     e rimetterlo man mano che se lo guadagnano — cosi\' il numero qui sopra');
console.log('     e\' il conto del lavoro vero, e sale solo quando il lavoro e\' stato fatto;');
console.log('  2. verificarle tutte (settimane, col bollino non vero nel frattempo);');
console.log('  3. cambiare cio\' che il bollino dice, distinguendo il ripasso dalla verifica.');
console.log('');
process.exit(1);
