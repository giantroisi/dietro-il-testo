#!/usr/bin/env node
// Chi ha RICEVUTO la frase, e chi la RIPORTA soltanto.
//
// PERCHE' ESISTE. Il 17 settembre 2026 un campione su dodici schede ha aperto
// le citazioni fra virgolette una per una: **cinque su dieci non reggevano**, e
// tre sbagliavano nello stesso identico modo — la testata che RIPORTA una
// frase scritta come la testata che l'ha RICEVUTA.
//
//   `drown`    — «definito da Sykes a Metal Hammer». Metal Hammer scrive
//                «Oli recently described the album as...»: riporta una frase
//                detta altrove, e poi gli chiede che cosa significhi.
//   `toxicity` — «ha spiegato in un'intervista a NME». Tankian l'ha detto al
//                podcast Soul Boom; NME lo riporta, e lo scrive.
//   `feeling-this` — la frase detta a NME attribuita alla diretta Twitch.
//
// **Nessun controllo automatico puo' trovarli.** `check-attribuzioni` cerca le
// testate NON citate fra le fonti; qui la testata e' citata, ed e' proprio
// questo che rende l'errore invisibile: la fonte c'e', il collegamento
// funziona, la frase e' vera. Sbagliato e' solo **a chi e' stata detta**.
//
// COSA FA. Elenca i punti in cui una scheda mette una citazione fra virgolette
// e dichiara, nella stessa frase, che e' stata detta A UNA DELLE SUE FONTI.
// Sono i candidati: o la fonte l'ha ricevuta davvero — e allora va bene — o la
// sta riportando da un'altra parte, e allora serve la R3, uscita 3.
//
// COSA NON FA. **Non dice che sia sbagliato.** La meta' dei casi sara' giusta:
// `darkside` scrive «Parlando dell'album con NME» ed e' esatto, perche' NME
// scrive «Talking about the upcoming album with NME». Questo controllo non
// sa distinguere, e non ci prova: nomina, come `check-attribuzioni`.
// Si chiude una segnalazione solo aprendo la pagina e guardando se la fonte
// dice «ci ha detto» oppure «ha detto» — che e' tutta la differenza.
//
// NON STAMPA IL TESTO FRA VIRGOLETTE, per la stessa ragione di
// `check-citazioni-nude`: stampa dove guardare, non cosa c'e' scritto.
//
// Uso: node scripts/check-riportate.mjs [--tutte]

import { readFileSync } from 'node:fs';
import path from 'node:path';

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const leggi = (f) => JSON.parse(readFileSync(path.join(RADICE, f), 'utf8'));
const elenco = (j, ...k) => (Array.isArray(j) ? j : k.map((x) => j[x]).find(Boolean));

const canzoni = elenco(leggi('dati/canzoni.json'), 'canzoni', 'brani');
const artisti = elenco(leggi('dati/artisti.json'), 'artisti');
const tutte = process.argv.includes('--tutte');
const soloSlug = process.argv.includes('--slugs');

const VIRGOLETTE = /[“«"]([^”»"]{2,400})[”»"]/g;

// Un verbo di dire nella stessa frase: senza, «il secondo posto nella
// classifica di Billboard» diventerebbe un'attribuzione.
const DIRE = /(raccont|dichiar|spieg|amme|ha detto|disse|detto|afferm|ricord|defin|descri|precis|confess|rivel|comment|rispos|sostien|sosten|aggiun|conclud|intervist|parlando|parl[òo])/i;

// «a NME», «al Guardian», «alla rivista Mojo», «con NME», «in un'intervista a X»
const destinatario = (n) =>
  new RegExp(`\\b(?:a|ad|al|allo|alla|agli|alle|con|su|sul|sulla)\\s+(?:rivista\\s+|testata\\s+|podcast\\s+)?${n}\\b`, 'iu');

const nomePrincipale = (nome) => String(nome || '').split(/[(\[—–,;|]/)[0].trim();

function testoDi(v) {
  const p = [];
  if (Array.isArray(v.corpo)) p.push(...v.corpo);
  else if (v.corpo) p.push(v.corpo);
  if (v.fraseIconica) p.push(v.fraseIconica);
  if (typeof v.storia === 'string') p.push(v.storia);
  else if (Array.isArray(v.storia)) p.push(...v.storia);
  return p.join(' ');
}

const segnalazioni = [];

for (const v of [...canzoni, ...artisti]) {
  const fonti = (v.fonti || [])
    .map((f) => nomePrincipale(f.nome))
    // «Wikipedia» e gli aggregatori di dati non ricevono interviste: nominarli
    // come destinatari non succede, e includerli produrrebbe solo rumore.
    .filter((n) => n.length >= 3 && !/^(wikipedia|kworb|discogs|genius|spotify|secondhandsongs)/i.test(n));
  if (!fonti.length) continue;

  const t = testoDi(v);
  if (!t) continue;

  const visti = new Set();
  VIRGOLETTE.lastIndex = 0;
  let m;
  while ((m = VIRGOLETTE.exec(t))) {
    if (m[1].trim().split(/\s+/).length < 4) continue; // meno di 4 parole: di solito un titolo
    const inizio = t.slice(0, m.index);
    const confine = Math.max(inizio.lastIndexOf('. '), inizio.lastIndexOf('! '), inizio.lastIndexOf('? '));
    const frase = inizio.slice(confine + 1).replace(/\s+/g, ' ');
    if (!DIRE.test(frase)) continue;

    for (const nome of fonti) {
      const n = nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!destinatario(n).test(frase)) continue;
      const chiave = `${v.slug}|${nome}`;
      if (visti.has(chiave)) break;
      visti.add(chiave);
      segnalazioni.push({ slug: v.slug, fonte: nome, prima: frase.slice(-70) });
      break;
    }
  }
}

if (soloSlug) {
  for (const s of segnalazioni) console.log(s.slug);
  process.exit(0);
}

console.log('');
console.log('CHI HA RICEVUTO LA FRASE, E CHI LA RIPORTA SOLTANTO.');
console.log('');
console.log(`Punti in cui una scheda dichiara che una citazione e' stata detta`);
console.log(`a una delle sue fonti: ${segnalazioni.length}`);
console.log('');
console.log("Non sono errori. Sono i punti dove l'errore, quando c'e', e' invisibile:");
console.log("la fonte e' citata, il collegamento funziona, la frase e' vera — e");
console.log("sbagliato e' solo a chi e' stata detta. Nel campione del 17 settembre");
console.log('tre casi su dieci erano cosi\'.');
console.log('');

const daMostrare = tutte ? segnalazioni : segnalazioni.slice(0, 30);
for (const s of daMostrare) {
  console.log(`${s.slug.padEnd(32)} ${s.fonte}`);
  console.log(`   …${s.prima}⟦citazione⟧`);
}
if (!tutte && segnalazioni.length > daMostrare.length) {
  console.log(`\n… e altre ${segnalazioni.length - daMostrare.length}. Usa --tutte.`);
}

console.log('');
console.log('Come si chiude una segnalazione: si apre la pagina e si guarda se la');
console.log("fonte scrive «ci ha detto» oppure «ha detto». E' tutta la differenza.");
console.log('  - l\'ha ricevuta lei  -> la scheda e\' gia\' giusta, non si tocca');
console.log('  - la riporta e basta -> R3 uscita 3: «secondo X, che riporta…»');
console.log('');
process.exit(0);
