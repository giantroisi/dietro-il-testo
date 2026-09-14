// La frase iconica e' la riga piu' esposta del sito: sta in cima alla scheda,
// finisce nelle anteprime, ed e' la sola cosa che molti lettori leggono per
// intero. **Deve dire qualcosa che il corpo non dice.** Quando invece ricopia
// una frase del corpo, il lettore legge due volte la stessa cosa nella stessa
// pagina e la riga piu' preziosa del sito non porta niente.
//
// Uso, dalla radice del progetto (nessuna rete):
//   node scripts/check-frase-iconica.mjs            (il quadro + l'elenco)
//   node scripts/check-frase-iconica.mjs --soglia 0.8
//
// ---------------------------------------------------------------------------
// TARATURA, e va scritta perche' la prima misura era sbagliata.
//
// Il 13 settembre avevo misurato questa stessa cosa e riportato **un caso su
// 312**, concludendo che «un caso solo non merita un controllo nuovo». Era
// falso. Confrontavo le frasi normalizzate pretendendo che una **contenesse**
// l'altra: bastava «alla rivista GQ» diventato «a GQ» perche' il confronto
// fallisse. Le riscritture non sono copie letterali — si cambia una
// preposizione, si gira una subordinata — e il confronto per contenimento non
// le vede.
//
// Col confronto giusto (quante parole piene condividono, rapportate alla frase
// piu' corta) i casi sono **38 su 312**, e otto ricopiano la frase iconica per
// intero. Il numero che avevo dato all'autore era piu' pulito del vero, ed e'
// il tipo di errore peggiore in un lavoro di verifica: una misura troppo
// stretta non segnala niente e sembra una buona notizia.
// Stesso inciampo di `check-virgolette` alla prima stesura, che non trovava
// nessuno dei quattro casi per cui era stato scritto.
// ---------------------------------------------------------------------------

import { readFileSync } from 'node:fs';
import { inFrasi } from './genera/frasi.mjs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const args = process.argv.slice(2);
const iSoglia = args.indexOf('--soglia');
const SOGLIA = iSoglia > -1 ? Number(args[iSoglia + 1]) : 0.7;

function normalizza(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Solo le parole piene: articoli, preposizioni e congiunzioni sono uguali in
// tutte le frasi italiane e falserebbero il conto verso l'alto.
function paroleUtili(s) {
  return new Set(normalizza(s).split(' ').filter((p) => p.length > 3));
}

// Quante parole piene hanno in comune, sul totale della frase piu' corta.
// Rapportare alla piu' corta e' voluto: una frase iconica breve ricavata
// tagliando una frase lunga del corpo resta una ricopiatura.
function somiglianza(a, b) {
  const A = paroleUtili(a);
  const B = paroleUtili(b);
  if (A.size < 5 || B.size < 5) return 0; // frasi troppo brevi: il caso e' rumore
  let comuni = 0;
  for (const p of A) if (B.has(p)) comuni++;
  return comuni / Math.min(A.size, B.size);
}

const trovate = [];
for (const c of canzoni) {
  if (!c.fraseIconica || !c.corpo?.length) continue;
  const frasiCorpo = c.corpo.flatMap((p) => inFrasi(p));
  const frasiIconica = inFrasi(c.fraseIconica);
  let ripetute = 0;
  let massimo = 0;
  for (const f of frasiIconica) {
    let best = 0;
    for (const p of frasiCorpo) best = Math.max(best, somiglianza(f, p));
    if (best > massimo) massimo = best;
    if (best >= SOGLIA) ripetute++;
  }
  if (ripetute) {
    trovate.push({ slug: c.slug, ripetute, totali: frasiIconica.length, massimo, ver: !!c.ultimaVerifica });
  }
}

const intere = trovate.filter((x) => x.ripetute === x.totali);
trovate.sort((a, b) => b.ripetute / b.totali - a.ripetute / a.totali || b.massimo - a.massimo);

console.log(`\nFrasi iconiche che ricopiano il corpo (soglia ${SOGLIA}): ${trovate.length} schede su ${canzoni.length}`);
console.log(`  di cui RICOPIATE PER INTERO, cioe' la frase iconica non aggiunge nulla: ${intere.length}`);
console.log(`  di cui con il bollino di verifica: ${trovate.filter((x) => x.ver).length}\n`);

for (const x of trovate) {
  const marchio = x.ripetute === x.totali ? 'INTERA ' : 'parziale';
  console.log(`  ${x.ver ? '[bollino] ' : '          '}${marchio}  ${x.slug.padEnd(34)} ${x.ripetute}/${x.totali} frasi`);
}

console.log(`
Questo controllo non dice che la scheda sia sbagliata: le informazioni possono
essere giuste. Dice che la riga piu' esposta del sito sta spendendo lo spazio
per ripetere, invece che per dare al lettore il motivo di restare.
`);
