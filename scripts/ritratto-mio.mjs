#!/usr/bin/env node
// F18 — prepara e registra una foto SCATTATA DA NOI come ritratto di un artista.
//
// Perche' esiste, separato da scarica-ritratti.mjs. Quello serve a dimostrare
// la licenza di una foto altrui, e ha tre barriere per impedire di pubblicare
// un'immagine di cui non si puo' provare la provenienza. Qui la provenienza e'
// certa — l'ha scattata chi pubblica — e i problemi sono altri due:
//
//   1) I DATI NASCOSTI. Una foto da telefono porta dentro le coordinate GPS del
//      punto in cui e' stata scattata, il modello dell'apparecchio, a volte il
//      numero di serie. Pubblicare l'immagine pubblica anche quelli, e nessuno
//      se ne accorge perche' non si vedono. Qui vengono tolti tutti.
//
//   2) DOVE E QUANDO. Una foto propria non ha una licenza da mostrare, ma ha
//      qualcosa che vale di piu' per chi legge: il concerto e la data. Sono
//      obbligatori, e il generatore si rifiuta di pubblicare la foto se mancano.
//
// La data dichiarata viene confrontata con quella di scatto letta nell'EXIF:
// se non coincidono lo script lo dice e non prosegue, invece di scegliere lui
// quale delle due sia giusta.
//
// Uso:
//   node scripts/ritratto-mio.mjs <slug-artista> <file> "<concerto>" "<data>"
//   node scripts/ritratto-mio.mjs ligabue ~/foto/lig.jpg "Arena di Verona" "12 luglio 2024"
//   …aggiungi --forza per pubblicare anche se la data EXIF non coincide.
//
// Non serve rete.

import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename } from 'node:path';

const LATO_MAX = 1280;

// ---------------------------------------------------------------- lettura EXIF

/** Il segmento APP1 con dentro l'EXIF, se c'e'. Restituisce {inizio, fine} nel file. */
function trovaApp1Exif(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null; // non e' un JPEG
  let i = 2;
  while (i + 4 <= buf.length) {
    if (buf[i] !== 0xff) return null;
    const marcatore = buf[i + 1];
    if (marcatore === 0xda || marcatore === 0xd9) return null; // inizio immagine
    const lung = buf.readUInt16BE(i + 2);
    if (marcatore === 0xe1 && buf.slice(i + 4, i + 10).toString('latin1') === 'Exif\0\0') {
      return { inizio: i, fine: i + 2 + lung };
    }
    i += 2 + lung;
  }
  return null;
}

/** Legge dall'EXIF la data di scatto e se ci sono coordinate GPS. */
function leggiExif(buf) {
  const app1 = trovaApp1Exif(buf);
  if (!app1) return { data: null, gps: false, presente: false };
  const t = app1.inizio + 10; // inizio dell'header TIFF
  const ordine = buf.slice(t, t + 2).toString('latin1');
  if (ordine !== 'II' && ordine !== 'MM') return { data: null, gps: false, presente: true };
  const le = ordine === 'II';
  const u16 = (p) => (le ? buf.readUInt16LE(p) : buf.readUInt16BE(p));
  const u32 = (p) => (le ? buf.readUInt32LE(p) : buf.readUInt32BE(p));

  const voci = (offsetIfd) => {
    const p = t + offsetIfd;
    if (p + 2 > buf.length) return [];
    const n = u16(p);
    const out = [];
    for (let k = 0; k < n; k++) {
      const e = p + 2 + k * 12;
      if (e + 12 > buf.length) break;
      out.push({ tag: u16(e), tipo: u16(e + 2), conta: u32(e + 4), valore: u32(e + 8), pos: e + 8 });
    }
    return out;
  };
  const ascii = (v) => {
    const lunghezza = v.conta;
    const p = lunghezza > 4 ? t + v.valore : v.pos;
    return buf.slice(p, p + lunghezza).toString('latin1').replace(/\0.*$/, '').trim();
  };

  const ifd0 = voci(u32(t + 4));
  const gps = ifd0.some((v) => v.tag === 0x8825);
  const puntatoreExif = ifd0.find((v) => v.tag === 0x8769);
  let data = null;
  const cerca = (elenco) => {
    for (const tag of [0x9003, 0x9004, 0x0132]) {
      const v = elenco.find((x) => x.tag === tag && x.tipo === 2);
      if (v) return ascii(v);
    }
    return null;
  };
  data = cerca(ifd0);
  if (!data && puntatoreExif) data = cerca(voci(puntatoreExif.valore));
  return { data, gps, presente: true };
}

/** Riscrive il JPEG senza NESSUN segmento di metadati: EXIF, XMP, commenti. */
function togliMetadati(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return { buf, tolti: 0 };
  const pezzi = [buf.slice(0, 2)];
  let i = 2;
  let tolti = 0;
  while (i + 4 <= buf.length) {
    if (buf[i] !== 0xff) break;
    const m = buf[i + 1];
    if (m === 0xda) { pezzi.push(buf.slice(i)); i = buf.length; break; } // da qui in poi e' immagine
    if (m === 0xd9) { pezzi.push(buf.slice(i)); i = buf.length; break; }
    const lung = buf.readUInt16BE(i + 2);
    const daButtare = (m >= 0xe1 && m <= 0xef) || m === 0xfe; // APP1..APP15 e commenti
    if (daButtare) tolti++;
    else pezzi.push(buf.slice(i, i + 2 + lung));
    i += 2 + lung;
  }
  if (i < buf.length) pezzi.push(buf.slice(i));
  return { buf: Buffer.concat(pezzi), tolti };
}

// ------------------------------------------------------------------ date

const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

/** "12 luglio 2024" -> "2024-07-12"; null se non e' in quella forma. */
function dataItalianaISO(s) {
  const m = String(s).trim().toLowerCase().match(/^(\d{1,2})\s+([a-zà-ù]+)\s+(\d{4})$/);
  if (!m) return null;
  const mese = MESI.indexOf(m[2]);
  if (mese === -1) return null;
  return `${m[3]}-${String(mese + 1).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
}

/** "2024:07:12 21:14:03" -> "2024-07-12" */
function dataExifISO(s) {
  const m = String(s || '').match(/^(\d{4})[:-](\d{2})[:-](\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

// ------------------------------------------------------------------ corsa

const forza = process.argv.includes('--forza');
const args = process.argv.slice(2).filter((x) => x !== '--forza');
const [slug, percorso, concerto, dataDichiarata] = args;

if (args.length < 4) {
  console.error('Uso: node scripts/ritratto-mio.mjs <slug-artista> <file> "<concerto>" "<data>"');
  console.error('Esempio: node scripts/ritratto-mio.mjs ligabue ~/foto/lig.jpg "Arena di Verona" "12 luglio 2024"');
  process.exit(1);
}
if (!existsSync(percorso)) { console.error(`Il file non esiste: ${percorso}`); process.exit(1); }

const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));
const artista = artisti.find((a) => a.slug === slug);
if (!artista) {
  console.error(`Nessun artista con slug "${slug}". Controlla dati/artisti.json.`);
  process.exit(1);
}

const dataISO = dataItalianaISO(dataDichiarata);
if (!dataISO) {
  console.error(`La data "${dataDichiarata}" non e' nella forma "12 luglio 2024".`);
  process.exit(1);
}

let originale = readFileSync(percorso);
if (originale[0] !== 0xff || originale[1] !== 0xd8) {
  // Non e' un JPEG (tipico: HEIC dall'iPhone). Su Mac si converte senza installare nulla.
  const tmp = `/tmp/ritratto-${slug}.jpg`;
  try {
    execFileSync('sips', ['-s', 'format', 'jpeg', percorso, '--out', tmp], { stdio: 'ignore' });
    originale = readFileSync(tmp);
    console.log(`Convertito in JPEG (l'originale era ${basename(percorso)}).`);
  } catch {
    console.error('Il file non e un JPEG e non sono riuscito a convertirlo. Esportalo in JPEG e riprova.');
    process.exit(1);
  }
}

const exif = leggiExif(originale);
console.log(`\nFoto:      ${basename(percorso)}  (${Math.round(statSync(percorso).size / 1024)} kB)`);
console.log(`Artista:   ${artista.nome}`);
console.log(`Concerto:  ${concerto}`);
console.log(`Data:      ${dataDichiarata}  (${dataISO})`);
console.log(`EXIF:      ${exif.presente ? `data di scatto ${exif.data || 'assente'}${exif.gps ? ', CON coordinate GPS' : ', senza GPS'}` : 'nessun metadato'}`);

const dataScatto = dataExifISO(exif.data);
if (dataScatto && dataScatto !== dataISO) {
  console.error(`\nLa data dichiarata (${dataISO}) non coincide con quella di scatto (${dataScatto}).`);
  console.error('Non scelgo io quale sia giusta: correggi la data, o rilancia con --forza se sai perche differiscono.');
  if (!forza) process.exit(1);
  console.error('Proseguo perche hai messo --forza.\n');
}
if (!dataScatto) console.log('           (nessuna data di scatto nell EXIF: non ho potuto confrontarla)');

const nomeFile = `${slug}.jpg`;
mkdirSync('ritratti', { recursive: true });
const pulita = togliMetadati(originale);
writeFileSync(`ritratti/${nomeFile}`, pulita.buf);
console.log(`\nTolti ${pulita.tolti} segmenti di metadati (EXIF, GPS, commenti).`);

try {
  execFileSync('sips', ['-Z', String(LATO_MAX), `ritratti/${nomeFile}`], { stdio: 'ignore' });
  console.log(`Ridimensionata a ${LATO_MAX}px di lato massimo.`);
} catch {
  console.log('(sips non disponibile: immagine salvata intera, da ridimensionare a mano)');
}

// Controllo finale: dopo il ridimensionamento sips potrebbe aver riscritto un
// EXIF suo. Si rilegge il file che verra' pubblicato, non quello di partenza.
const finale = readFileSync(`ritratti/${nomeFile}`);
const exifFinale = leggiExif(finale);
if (exifFinale.gps) {
  const ripulita = togliMetadati(finale);
  writeFileSync(`ritratti/${nomeFile}`, ripulita.buf);
  console.log('Il ridimensionamento aveva rimesso dei metadati: tolti di nuovo.');
}
const controllo = leggiExif(readFileSync(`ritratti/${nomeFile}`));
console.log(`Verifica sul file pubblicato: ${controllo.gps ? 'ATTENZIONE, ci sono ancora coordinate GPS' : 'nessuna coordinata GPS'}.`);

const ritratti = existsSync('dati/ritratti.json') ? JSON.parse(readFileSync('dati/ritratti.json', 'utf8')) : {};
ritratti[slug] = { file: nomeFile, propria: true, concerto, data: dataDichiarata };
writeFileSync('dati/ritratti.json', JSON.stringify(ritratti, null, 2) + '\n');

console.log(`\nScritto dati/ritratti.json — ${slug}: "Foto di Dietro il testo ✕ ${concerto}, ${dataDichiarata}".`);
console.log('Ora rigenera il sito e guarda la pagina artista.');
