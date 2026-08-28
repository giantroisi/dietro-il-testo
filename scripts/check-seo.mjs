#!/usr/bin/env node
// F64: nessuno dei controlli precedenti guardava titoli, descrizioni,
// canonical, orfani o soglia di contenuto — gli errori corretti da F50 a F63
// rientrerebbero alla prima aggiunta di canzoni senza un controllo automatico.
// Le categorie di pagina (articolo/indice/servizio) sono assegnate dal
// generatore in dati/pagine-seo.json, mai indovinate qui dall'URL.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, posix } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'sito');
const SITO_BASE = 'https://www.dietroiltesto.it';

if (!existsSync(OUT)) {
  console.error('Manca sito/: esegui prima node scripts/genera-sito.mjs');
  process.exit(1);
}

const manifesto = JSON.parse(readFileSync(join(ROOT, 'dati', 'pagine-seo.json'), 'utf8'));
const manifestoPerPercorso = new Map(manifesto.map((v) => [v.percorso, v]));

function elencaFile(dir) {
  let risultato = [];
  for (const nome of readdirSync(dir)) {
    const percorso = join(dir, nome);
    if (statSync(percorso).isDirectory()) risultato = risultato.concat(elencaFile(percorso));
    else if (nome === 'index.html' || nome === '404.html') risultato.push(percorso);
  }
  return risultato;
}

function percorsoDi(fileAssoluto) {
  const rel = fileAssoluto.slice(OUT.length + 1).replace(/\\/g, '/');
  return rel === '404.html' ? '404.html' : rel.replace(/index\.html$/, '');
}

// F58/11.1: le entità HTML decodificate valgono un carattere, non sei —
// altrimenti due implementazioni della stessa soglia darebbero esiti diversi.
function decodificaEntita(s) {
  return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

const pagine = elencaFile(OUT).map((f) => ({ file: f, percorso: percorsoDi(f), html: readFileSync(f, 'utf8') }));
const percorsiGenerati = new Set(pagine.map((p) => p.percorso));

const problemi = [];
const segnala = (msg) => problemi.push(msg);

// -------------------------------------------------------------- <title>

const titoliVisti = new Map();
for (const p of pagine) {
  const m = p.html.match(/<title>([\s\S]*?)<\/title>/);
  const testo = m ? decodificaEntita(m[1]).trim() : '';
  if (!testo) segnala(`${p.percorso || '(home)'}: <title> vuoto o assente`);
  else if (testo.length > 65) segnala(`${p.percorso}: <title> di ${testo.length} caratteri (oltre 65): "${testo}"`);
  if (testo) {
    if (!titoliVisti.has(testo)) titoliVisti.set(testo, []);
    titoliVisti.get(testo).push(p.percorso);
  }
}
for (const [testo, elenco] of titoliVisti) {
  if (elenco.length > 1) segnala(`<title> duplicato su ${elenco.length} pagine ("${testo}"): ${elenco.join(', ')}`);
}

// -------------------------------------------------------- meta description

const descrizioniViste = new Map();
for (const p of pagine) {
  const m = p.html.match(/<meta name="description" content="([\s\S]*?)">/);
  const testo = m ? decodificaEntita(m[1]) : '';
  if (!testo) segnala(`${p.percorso || '(home)'}: meta description vuota o assente`);
  else {
    if (testo.length > 160) segnala(`${p.percorso}: meta description di ${testo.length} caratteri (oltre 160)`);
    if (testo.endsWith('…')) segnala(`${p.percorso}: meta description finisce con "…"`);
  }
  if (testo) {
    if (!descrizioniViste.has(testo)) descrizioniViste.set(testo, []);
    descrizioniViste.get(testo).push(p.percorso);
  }
}
for (const [testo, elenco] of descrizioniViste) {
  if (elenco.length > 1) segnala(`meta description duplicata su ${elenco.length} pagine: ${elenco.slice(0, 4).join(', ')}${elenco.length > 4 ? '…' : ''}`);
}

// -------------------------------------------------------------------- <h1>

for (const p of pagine) {
  const n = (p.html.match(/<h1[ >]/g) || []).length;
  if (n !== 1) segnala(`${p.percorso || '(home)'}: ${n} tag <h1> (deve essere esattamente 1)`);
}

// --------------------------------------------------------------- canonical

for (const p of pagine) {
  const noindexPuro = /<meta name="robots" content="noindex">/.test(p.html);
  const m = p.html.match(/<link rel="canonical" href="([^"]*)">/);
  if (noindexPuro) {
    if (m) segnala(`${p.percorso}: ha un canonical ma è noindex puro (F43 non ne prevede uno)`);
    continue;
  }
  if (!m) {
    segnala(`${p.percorso || '(home)'}: canonical assente`);
    continue;
  }
  const atteso = `${SITO_BASE}/${p.percorso}`;
  if (m[1] !== atteso) segnala(`${p.percorso}: canonical "${m[1]}" diverso dall'indirizzo reale "${atteso}"`);
}

// ------------------------------------------------------------------ sitemap

const FILE_SITEMAP = ['sitemap-pagine.xml', 'sitemap-canzoni.xml', 'sitemap-artisti.xml', 'sitemap-album.xml', 'sitemap-raccolte.xml'];
const prefissoBase = SITO_BASE + '/';
const locSitemap = [];
for (const nome of FILE_SITEMAP) {
  const percorsoFile = join(OUT, nome);
  if (!existsSync(percorsoFile)) {
    segnala(`sitemap: manca ${nome}`);
    continue;
  }
  const xml = readFileSync(percorsoFile, 'utf8');
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) locSitemap.push(m[1]);
}
const percorsiSitemap = locSitemap.map((l) => (l.startsWith(prefissoBase) ? l.slice(prefissoBase.length) : l));

const contatoreSitemap = new Map();
for (const p of percorsiSitemap) contatoreSitemap.set(p, (contatoreSitemap.get(p) || 0) + 1);
for (const [p, n] of contatoreSitemap) if (n > 1) segnala(`sitemap: indirizzo duplicato "${p}" (${n} volte)`);

for (const p of percorsiSitemap) {
  if (!percorsiGenerati.has(p)) segnala(`sitemap: indirizzo "${p}" non corrisponde a nessuna pagina generata`);
}
const setSitemap = new Set(percorsiSitemap);
for (const voce of manifesto) {
  if (voce.indicizzabile && !setSitemap.has(voce.percorso)) segnala(`sitemap: pagina indicizzabile "${voce.percorso || '(home)'}" assente dalla sitemap`);
}

// -------------------------------------------------- collegamenti interni

// Estrae solo gli href verso altre pagine del sito: esclude mailto:, URL
// esterni, ancore, asset statici (immagini, script, feed).
function hrefInterni(html) {
  const risultato = [];
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let h = m[1];
    if (h.startsWith('mailto:') || h.startsWith('http://') || h.startsWith('https://')) continue;
    h = h.split('#')[0]; // un'ancora dentro la stessa pagina (es. "archivio/#artisti") non è un collegamento a un'altra pagina
    if (!h) continue;
    if (/\.(png|jpg|jpeg|ico|js|xml|txt|json)(\?.*)?$/.test(h)) continue;
    risultato.push(h);
  }
  return risultato;
}

function risolviHref(percorsoPagina, href) {
  const base = percorsoPagina === '' || percorsoPagina === '404.html' ? '.' : percorsoPagina;
  let risolto = posix.normalize(posix.join(base, href));
  if (risolto === '.' || risolto === './') return '';
  risolto = risolto.replace(/^\.\//, '');
  if (!risolto.endsWith('/')) risolto += '/';
  return risolto;
}

const referentiPerPercorso = new Map(); // percorso destinazione -> Set di percorsi sorgente
for (const p of pagine) {
  for (const href of hrefInterni(p.html)) {
    const dest = risolviHref(p.percorso, href);
    if (!percorsiGenerati.has(dest)) {
      segnala(`${p.percorso || '(home)'}: collegamento rotto verso "${dest}" (da href="${href}")`);
      continue;
    }
    if (!referentiPerPercorso.has(dest)) referentiPerPercorso.set(dest, new Set());
    referentiPerPercorso.get(dest).add(p.percorso);
  }
}

// F56: nessuna pagina indicizzabile raggiungibile da meno di due collegamenti
// interni distinti. Le pagine noindex sono escluse: sono fuori dall'indice
// per scelta, non per errore.
for (const voce of manifesto) {
  if (!voce.indicizzabile) continue;
  const n = referentiPerPercorso.get(voce.percorso)?.size || 0;
  if (n < 2) segnala(`${voce.percorso || '(home)'}: raggiungibile da solo ${n} collegamento/i interno/i (minimo 2)`);
}

// ------------------------------------------------------ soglie di contenuto

function testoProprio(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) return '';
  let corpo = m[1].replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '');
  corpo = corpo.replace(/<[^>]+>/g, ' ');
  corpo = decodificaEntita(corpo);
  return corpo.replace(/\s+/g, ' ').trim();
}

const SOGLIA_ARTICOLO = 1200;
for (const p of pagine) {
  const voce = manifestoPerPercorso.get(p.percorso);
  if (!voce || voce.categoria !== 'articolo' || !voce.indicizzabile) continue;
  const n = testoProprio(p.html).length;
  if (n < SOGLIA_ARTICOLO) segnala(`${p.percorso}: pagina-articolo con ${n} caratteri di testo proprio (soglia ${SOGLIA_ARTICOLO})`);
}

// Pagina-indice: niente soglia in caratteri, ma serve o massa (>=3 canzoni)
// o testo editoriale proprio (storia/copertina) — altrimenti le 320 pagine
// album di F50 tornerebbero sotto un altro nome.
for (const voce of manifesto) {
  if (voce.categoria !== 'indice' || !voce.indicizzabile) continue;
  const massa = (voce.nCanzoni || 0) >= 3;
  const editoriale = Boolean(voce.haTestoEditoriale);
  if (!massa && !editoriale) segnala(`${voce.percorso}: pagina-indice indicizzabile senza massa (${voce.nCanzoni || 0} canzoni) né testo editoriale proprio`);
}

// ----------------------------------------------------------------- JSON-LD

function valoreVuoto(v) {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0;
  return false;
}
function campiVuoti(obj, percorsoCampo = '') {
  const trovati = [];
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => trovati.push(...campiVuoti(v, `${percorsoCampo}[${i}]`)));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const qui = percorsoCampo ? `${percorsoCampo}.${k}` : k;
      if (valoreVuoto(v)) trovati.push(qui);
      else trovati.push(...campiVuoti(v, qui));
    }
  }
  return trovati;
}
for (const p of pagine) {
  for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let dati;
    try {
      dati = JSON.parse(m[1]);
    } catch (e) {
      segnala(`${p.percorso || '(home)'}: JSON-LD non valido (${e.message})`);
      continue;
    }
    for (const campo of campiVuoti(dati)) segnala(`${p.percorso || '(home)'}: JSON-LD con campo vuoto "${campo}"`);
  }
}

// -------------------------------------------------------------- esito

console.log(`Pagine controllate: ${pagine.length}`);
console.log(`Problemi trovati: ${problemi.length}`);
if (problemi.length) {
  problemi.slice(0, 60).forEach((p) => console.log('  ' + p));
  if (problemi.length > 60) console.log(`  … e altri ${problemi.length - 60}`);
  process.exitCode = 1;
} else {
  console.log('Titoli, descrizioni, H1, canonical, sitemap, collegamenti, soglie di contenuto e JSON-LD: tutto pulito.');
}
