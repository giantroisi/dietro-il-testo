#!/usr/bin/env node
// Il registro contro i controlli: una voce col bollino non deve far scattare
// nessun allarme automatico.
//
// PERCHE' ESISTE. Il 17 settembre 2026 ho trovato che `somebody-told-me`, voce
// che avevo verificato a mano il 16 e messo nel registro, faceva scattare
// `check-attribuzioni` — la scheda attribuisce una frase a Rolling Stone, che
// fra le sue fonti non c'e'. L'allarme suonava da giorni. Io ho riaperto le
// fonti a mano, ho trovato i fatti giusti, e **non ho lanciato i controlli che
// esistevano gia'**. Il bollino e' finito su una scheda che una macchina,
// gratis, sapeva gia' segnalare.
//
// Non e' un difetto della scheda soltanto: e' un difetto del mio metodo. Una
// verifica indipendente che non guarda quel che la macchina ha gia' visto e'
// una verifica che parte indietro rispetto a chi non verifica affatto.
//
// COSA FA. Chiede a ogni controllo che sappia rispondere `--slugs` l'elenco
// delle voci che segnala, e lo incrocia con `verifiche/indipendenti.json`.
// Se una voce del registro compare in quell'elenco, il bollino non e' valido:
// o si chiude la segnalazione, o si toglie la voce dal registro.
//
// COSA NON FA. Non giudica il contenuto: un controllo che segnala non dice che
// la scheda sia sbagliata (`check-attribuzioni` lo scrive a chiare lettere nella
// propria intestazione). Dice che c'e' qualcosa di aperto. Una voce con qualcosa
// di aperto non puo' mostrare al lettore che qualcuno l'ha chiusa.
//
// COME SI ESTENDE. Ogni controllo che voglia entrare qui deve imparare `--slugs`:
// una riga per voce segnalata, niente altro, uscita 0. Oggi ne parla uno solo, e
// va detto invece di lasciarlo intendere: **questo controllo copre una classe di
// difetti su tante.** Aggiungerne uno alla volta, quando serve.
//
// Uso: node scripts/check-registro.mjs

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

// I controlli che sanno rispondere --slugs. Uno per riga, con cosa segnalano.
const CONTROLLI = [
  ['check-attribuzioni.mjs', 'nomina una testata che non cita fra le proprie fonti'],
];

const reg = JSON.parse(fs.readFileSync(path.join(RADICE, 'verifiche/indipendenti.json'), 'utf8'));
const registrate = new Set([...Object.keys(reg.artisti || {}), ...Object.keys(reg.canzoni || {})]);

console.log('');
console.log('IL REGISTRO CONTRO I CONTROLLI.');
console.log(`Voci nel registro: ${registrate.size}. Controlli interrogati: ${CONTROLLI.length}.`);

let scontri = 0;

for (const [file, cosa] of CONTROLLI) {
  let uscita;
  try {
    uscita = execFileSync('node', [path.join(RADICE, 'scripts', file), '--slugs'], {
      encoding: 'utf8',
      cwd: RADICE,
    });
  } catch (e) {
    console.log(`\n  ${file}: non risponde a --slugs (${e.message.split('\n')[0]})`);
    continue;
  }
  const segnalate = uscita.split('\n').map((r) => r.trim()).filter(Boolean);
  const dentro = segnalate.filter((s) => registrate.has(s));
  console.log(`\n  ${file}: ${segnalate.length} segnalate, ${dentro.length} nel registro`);
  for (const s of dentro) {
    console.log(`     ${s} — ${cosa}`);
    scontri++;
  }
}

console.log('');
if (scontri === 0) {
  console.log('Nessuna voce del registro fa scattare un allarme automatico.');
  process.exit(0);
}

console.log(`${scontri} voci mostrano il bollino con una segnalazione aperta.`);
console.log('Due uscite, e vanno in quest\'ordine:');
console.log('  1. si chiude la segnalazione sulla scheda, e il bollino torna valido');
console.log('     con l\'impronta del testo corretto — non con quella di prima;');
console.log('  2. se non si chiude subito, la voce esce dal registro: il bollino');
console.log('     dice al lettore che qualcuno ha guardato, e qui qualcuno ha');
console.log('     guardato senza vedere.');
console.log('');
process.exit(1);
