#!/usr/bin/env node
// F18 — scarica le foto scelte, le ritaglia in quadrato e scrive dati/ritratti.json
// con l'attribuzione completa presa dai metadati di Commons.
//
// La scelta NON e' automatica e non lo sara': questo script esegue una scelta
// gia' fatta da una persona. La si dichiara in `dati/ritratti-scelti.json`, un
// oggetto che associa lo slug dell'artista al titolo del file scelto fra i
// candidati, per esempio:
//
//   {
//     "caparezza": "File:Caparezza Ippodromo di San Siro 2022-002.jpg",
//     "green-day": "File:Green Day on 3 Jun 2022.jpg"
//   }
//
// Lo script rifiuta un file che non compaia fra i candidati di quell'artista:
// serve a impedire che qualcuno incolli un indirizzo trovato altrove saltando
// il controllo sulla licenza, che e' l'unica cosa che tiene in piedi tutto.
//
// SERVE LA RETE e va lanciato dal Mac. Il ritaglio usa `sips`, che su macOS c'e'
// gia'; se manca, l'immagine viene salvata intera e lo script lo dice.
//
// Uso, dalla radice del progetto:
//   node scripts/cerca-ritratti.mjs --limite 20     (prima: produce i candidati)
//   …si sceglie a mano scrivendo dati/ritratti-scelti.json…
//   node scripts/scarica-ritratti.mjs               (poi: scarica e scrive)
//   node scripts/scarica-ritratti.mjs --prova       (dice cosa farebbe, senza fare)
//   node scripts/scarica-ritratti.mjs --anteprime   (scarica i primi tre candidati di
//                                                    ogni artista, piccoli, in
//                                                    ritratti/anteprime/, per poterli
//                                                    GUARDARE prima di scegliere)
//
// Perche' esiste `--anteprime`. Il primo giro ha pubblicato una foto con licenza
// impeccabile, soggetto giusto e autore noto, in cui l'artista era una sagoma
// lontana in una panoramica di palco: irriconoscibile. Nessun controllo
// automatico poteva accorgersene, perche' **nessuno di quei controlli guarda
// l'immagine**. Le anteprime servono a guardarla prima, non dopo.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const LATO = 640;
const UA = 'dietroiltesto-ritratti/1.1 (dietroiltesto.it)';
const prova = process.argv.includes('--prova');
const anteprime = process.argv.includes('--anteprime');

if (!existsSync('dati/ritratti-candidati.json')) {
  console.error('Manca dati/ritratti-candidati.json. Lancia prima: node scripts/cerca-ritratti.mjs --limite 20');
  process.exit(1);
}
if (!existsSync('dati/ritratti-scelti.json')) {
  console.error('Manca dati/ritratti-scelti.json: e il file in cui si dichiara QUALE candidato usare per ogni artista.');
  console.error('Esempio:  { "caparezza": "File:Caparezza Ippodromo di San Siro 2022-002.jpg" }');
  process.exit(1);
}

const candidati = JSON.parse(readFileSync('dati/ritratti-candidati.json', 'utf8')).esito;
const scelti = JSON.parse(readFileSync('dati/ritratti-scelti.json', 'utf8'));
const ritratti = existsSync('dati/ritratti.json') ? JSON.parse(readFileSync('dati/ritratti.json', 'utf8')) : {};

// --- modalita' anteprime.
// Prima versione: scaricava gli ORIGINALI, cioe' file da cinque o dieci
// megabyte l'uno, sessanta di fila. Commons ha risposto 429 a 57 su 60, e
// rallentare non e' servito: non era la frequenza, era la mole. Chiedere
// l'originale per poi rimpicciolirlo e' scortese oltre che inutile.
// Ora si chiedono le MINIATURE, che Commons genera e serve apposta: una sola
// domanda all'API per quaranta file (`iiurlwidth`), e poi immagini da qualche
// decina di kilobyte. Meno banda per loro, meno attesa per noi, stessa cosa
// da guardare.
if (anteprime) {
  mkdirSync('ritratti/anteprime', { recursive: true });
  const voluti = [];
  for (const voce of candidati) {
    for (const [i, c] of (voce.candidati || []).slice(0, 3).entries()) {
      if (c.titolo) voluti.push({ nome: `${voce.slug}-${i + 1}.jpg`, titolo: c.titolo });
    }
  }
  const miniature = new Map();
  for (let i = 0; i < voluti.length; i += 40) {
    const lotto = voluti.slice(i, i + 40);
    const p = new URLSearchParams({
      action: 'query', format: 'json', origin: '*',
      titles: lotto.map((x) => x.titolo).join('|'),
      prop: 'imageinfo', iiprop: 'url', iiurlwidth: '420',
    });
    const r = await fetch(`https://commons.wikimedia.org/w/api.php?${p}`, { headers: { 'user-agent': UA } });
    if (!r.ok) { console.log(`  l'API risponde ${r.status}`); continue; }
    const d = await r.json();
    for (const pag of Object.values((d.query && d.query.pages) || {})) {
      const ii = (pag.imageinfo || [])[0];
      if (ii && (ii.thumburl || ii.url)) miniature.set(pag.title, ii.thumburl || ii.url);
    }
    await new Promise((x) => setTimeout(x, 1200));
  }

  let n = 0, persi = 0;
  for (const v of voluti) {
    const indirizzo = miniature.get(v.titolo);
    if (!indirizzo) { console.log(`  ${v.nome}: nessuna miniatura`); persi++; continue; }
    try {
      let r;
      for (let t = 0; t < 4; t++) {
        r = await fetch(indirizzo, { headers: { 'user-agent': UA, accept: 'image/*' } });
        if (r.status !== 429 && r.status !== 503) break;
        await new Promise((x) => setTimeout(x, 3000 * 2 ** t));
      }
      if (!r.ok) { console.log(`  ${v.nome}: risponde ${r.status}`); persi++; continue; }
      writeFileSync(`ritratti/anteprime/${v.nome}`, Buffer.from(await r.arrayBuffer()));
      n++;
    } catch (e) { console.log(`  ${v.nome}: ${e.message}`); persi++; }
    await new Promise((x) => setTimeout(x, 250));
  }
  console.log(`\n${n} anteprime scaricate, ${persi} mancate. Sono immagini di lavoro: non vanno pubblicate.`);
  process.exit(0);
}

let ok = 0, rifiutati = 0;
for (const [slug, titolo] of Object.entries(scelti)) {
  const voce = candidati.find((e) => e.slug === slug);
  if (!voce) { console.error(`✗ ${slug}: non e fra gli artisti esaminati da cerca-ritratti.mjs`); rifiutati++; continue; }
  const c = (voce.candidati || []).find((x) => x.titolo === titolo);
  if (!c) {
    console.error(`✗ ${slug}: "${titolo}" non e fra i candidati verificati di questo artista.`);
    console.error(`   I candidati sono: ${(voce.candidati || []).map((x) => x.titolo).join(' | ') || '(nessuno)'}`);
    rifiutati++; continue;
  }
  // Seconda cintura: i campi dell'attribuzione devono esserci tutti, qui e non
  // solo nel generatore. Se manca qualcosa il file non viene nemmeno scaricato.
  const manca = ['autore', 'licenza', 'licenzaUrl', 'paginaFile', 'originale'].filter((k) => !c[k]);
  if (manca.length) { console.error(`✗ ${slug}: attribuzione incompleta, manca ${manca.join(', ')}`); rifiutati++; continue; }

  // L'API di Commons aggiunge una coda di tracciamento all'indirizzo del file
  // (`?utm_source=…`). Va tolta per due motivi: l'estensione si legge dal
  // percorso e non dall'indirizzo intero — altrimenti un .png finisce salvato
  // come .jpg — e alcune richieste con quella coda vengono respinte.
  const indirizzo = c.originale.split('?')[0];
  const estensione = (indirizzo.match(/\.(jpe?g|png)$/i) || ['.jpg'])[0].toLowerCase().replace('jpeg', 'jpg');
  const nomeFile = `${slug}${estensione}`;
  console.log(`${prova ? '(prova) ' : ''}${slug} ← ${c.titolo}`);
  console.log(`         ${c.licenza} — ${c.autore}`);
  if (c.attenzione) console.log(`         ATTENZIONE: ${c.attenzione}`);
  if (prova) { ok++; continue; }

  mkdirSync('ritratti', { recursive: true });
  let r = await fetch(indirizzo, { headers: { 'user-agent': UA, accept: 'image/*' } });
  if (!r.ok) {
    // Un solo secondo tentativo, dopo una pausa: se e' un limite di richieste
    // basta; se e' un 404 fallisce di nuovo e lo diciamo con l'indirizzo, cosi'
    // si puo' aprire a mano invece di indovinare.
    await new Promise((x) => setTimeout(x, 2500));
    r = await fetch(indirizzo, { headers: { 'user-agent': UA, accept: 'image/*' } });
  }
  if (!r.ok) {
    console.error(`✗ ${slug}: lo scarico risponde ${r.status}`);
    console.error(`   ${indirizzo}`);
    rifiutati++; continue;
  }
  writeFileSync(`ritratti/${nomeFile}`, Buffer.from(await r.arrayBuffer()));

  try {
    execFileSync('sips', ['-Z', String(LATO * 2), `ritratti/${nomeFile}`], { stdio: 'ignore' });
  } catch {
    console.log(`         (sips non disponibile: immagine salvata intera, da ridimensionare a mano)`);
  }

  ritratti[slug] = {
    file: nomeFile,
    autore: c.autore,
    licenza: c.licenza,
    licenzaUrl: c.licenzaUrl,
    fonte: c.paginaFile,
    titoloOriginale: c.titolo,
  };
  ok++;
}

if (!prova && ok) {
  writeFileSync('dati/ritratti.json', JSON.stringify(ritratti, null, 2) + '\n');
  console.log(`\nScritto dati/ritratti.json — ${Object.keys(ritratti).length} ritratti con attribuzione completa.`);
  console.log('Ora rigenera il sito e guarda le pagine artista: senza uno dei cinque campi la foto non esce.');
}
console.log(`\n${ok} pronti, ${rifiutati} rifiutati.`);
process.exit(rifiutati ? 1 : 0);
