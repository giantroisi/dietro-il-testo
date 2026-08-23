#!/usr/bin/env node
// Estrae le 157 schede da index.html verso dati/canzoni.json e dati/artisti.json.
// Applica il P9 della Costituzione: i dati editoriali vivono separati dalla presentazione.
//
// Uso: node scripts/estrai-dati.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// ---------------------------------------------------------------- utilità

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, '')).trim();
}

function slugify(s) {
  return decodeEntities(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ------------------------------------------------------- schede canzone

// Ogni <section class="song"> va dalla sua apertura fino al </section> successivo.
const sectionStarts = [...html.matchAll(/<section class="song" id="([^"]+)"([^>]*)>/g)];

const canzoni = [];

for (let i = 0; i < sectionStarts.length; i++) {
  const m = sectionStarts[i];
  const start = m.index;
  const end = html.indexOf('</section>', start);
  const blocco = html.slice(start, end);
  const attrs = m[2];

  const slug = m[1];

  const accent = (attrs.match(/--accent:(#[0-9A-Fa-f]{6})/) || [])[1] || null;
  const accent2 = (attrs.match(/--accent-2:(#[0-9A-Fa-f]{6})/) || [])[1] || null;
  const generi = ((attrs.match(/data-generi="([^"]*)"/) || [])[1] || '').split(/\s+/).filter(Boolean);
  const paese = (attrs.match(/data-paese="([^"]*)"/) || [])[1] || null;

  const metaRow = (blocco.match(/<div class="meta-row">([\s\S]*?)<\/div>/) || [])[1] || '';
  const artista = decodeEntities((metaRow.match(/data-artist="([^"]+)"/) || [])[1] || '');
  const metaSpans = [...metaRow.matchAll(/<span[^>]*>([^<]*)<\/span>/g)].map((x) => stripTags(x[1]));
  // il primo span è il rank-badge (#123), poi anno, album, genere
  const senzaRank = metaSpans.filter((s) => !/^#\d+$/.test(s));
  const anno = senzaRank[0] || null;
  const album = senzaRank[1] || null;
  const genereTesto = senzaRank[2] || null;

  const titolo = stripTags((blocco.match(/<h2 class="song-title">([\s\S]*?)<\/h2>/) || [])[1] || '');

  const ascoltiTesto = stripTags(
    ((blocco.match(/<p class="streams">([\s\S]*?)<\/p>/) || [])[1] || '')
      .replace(/<span class="note">[\s\S]*?<\/span>/, '')
      .replace(/Spotify\s*·\s*/, '')
  ) || null;

  // La card corrispondente porta data-streams; il link al brano sta dentro la card,
  // quindi si risale dall'href alla <article> che lo contiene.
  const ascoltiNum = (() => {
    const idx = html.indexOf(`class="card-title" href="#${slug}"`);
    if (idx === -1) return null;
    const aperturaCard = html.lastIndexOf('<article class="card"', idx);
    if (aperturaCard === -1) return null;
    const tag = html.slice(aperturaCard, html.indexOf('>', aperturaCard));
    const mm = tag.match(/data-streams="(\d+)"/);
    return mm ? Number(mm[1]) : null;
  })();

  const spotifyId = (blocco.match(/open\.spotify\.com\/embed\/track\/([A-Za-z0-9]+)/) || [])[1] || null;

  // corpo: i <p> diretti dentro .song-body, esclusi quelli dentro .iconic-line
  const bodyBlock = (blocco.match(/<div class="song-body">([\s\S]*?)\n      <\/div>/) || [])[1] || '';
  const iconicBlock = (bodyBlock.match(/<div class="iconic-line">([\s\S]*?)<\/div>/) || [])[1] || '';
  const fraseIconica = iconicBlock ? stripTags((iconicBlock.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || '') : null;

  const bodySenzaIconic = bodyBlock.replace(/<div class="iconic-line">[\s\S]*?<\/div>/, '');
  // separa i paragrafi di racconto dagli eventuali blocchi <h3> (Crediti, Curiosità)
  const primoH3 = bodySenzaIconic.indexOf('<h3>');
  const parteRacconto = primoH3 === -1 ? bodySenzaIconic : bodySenzaIconic.slice(0, primoH3);
  const parteExtra = primoH3 === -1 ? '' : bodySenzaIconic.slice(primoH3);

  const corpo = [...parteRacconto.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((x) => stripTags(x[1])).filter(Boolean);

  const sezioniExtra = [];
  if (parteExtra) {
    const parti = parteExtra.split(/<h3>/).filter(Boolean);
    for (const p of parti) {
      const titoloSez = stripTags((p.match(/^([\s\S]*?)<\/h3>/) || [])[1] || '');
      const resto = p.replace(/^[\s\S]*?<\/h3>/, '');
      const paragrafi = [...resto.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((x) => stripTags(x[1])).filter(Boolean);
      const dl = (resto.match(/<dl[\s\S]*?<\/dl>/) || [])[0] || null;
      const coppie = dl
        ? [...dl.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt><dd[^>]*>([\s\S]*?)<\/dd>/g)].map((x) => ({
            etichetta: stripTags(x[1]),
            valore: stripTags(x[2]),
          }))
        : [];
      if (titoloSez) sezioniExtra.push({ titolo: titoloSez, paragrafi, coppie });
    }
  }

  const testoUrl =
    (blocco.match(/<a class="primary" href="([^"]+)"[^>]*>[^<]*(?:Leggi il testo|Approfondisci)[^<]*<\/a>/) || [])[1] || null;

  const sourcesBlock = (blocco.match(/<p class="sources">([\s\S]*?)<\/p>/) || [])[1] || '';
  const fonti = [...sourcesBlock.matchAll(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((x) => ({
    url: x[1],
    nome: stripTags(x[2]),
  }));

  canzoni.push({
    slug,
    titolo,
    artista,
    artistaSlug: slugify(artista),
    anno,
    album,
    albumSlug: album ? slugify(album) : null,
    genereTesto,
    generi,
    paese,
    colore: accent,
    colore2: accent2,
    ascolti: ascoltiNum,
    ascoltiTesto,
    spotifyId,
    corpo,
    fraseIconica,
    sezioniExtra,
    testoUrl,
    fonti,
  });
}

// ------------------------------------------------------ biografie artista

// L'oggetto artistBios vive nello script inline; lo si valuta in un contesto isolato.
const biosStart = html.indexOf('var artistBios = {');
const biosEnd = html.indexOf('var artistBioBox', biosStart);
const biosSrc = html.slice(biosStart, biosEnd).trim().replace(/;$/, '');

let artistBios = {};
try {
  // eslint-disable-next-line no-new-func
  artistBios = new Function(`${biosSrc}; return artistBios;`)();
} catch (e) {
  console.error('Impossibile leggere artistBios:', e.message);
  process.exit(1);
}

// ---------------------------------------------------- aggregazione artisti

const perArtista = new Map();
for (const c of canzoni) {
  if (!perArtista.has(c.artista)) perArtista.set(c.artista, []);
  perArtista.get(c.artista).push(c);
}

const artisti = [];
for (const [nome, brani] of perArtista) {
  const bio = artistBios[nome] || null;
  const anni = brani.map((b) => parseInt(String(b.anno).match(/\d{4}/)?.[0] || '0', 10)).filter(Boolean);
  const generiRicorrenti = [...new Set(brani.flatMap((b) => b.generi))];

  artisti.push({
    slug: slugify(nome),
    nome,
    storia: bio ? bio.story : null,
    album: bio
      ? bio.albums.map((a) =>
          a.length === 1
            ? { nota: a[0] }
            : { titolo: a[0], anno: a[1], nota: a[2] || null, copertina: a[3] || null, slug: slugify(a[0]) }
        )
      : [],
    canzoni: brani.map((b) => b.slug),
    annoPrimo: anni.length ? Math.min(...anni) : null,
    annoUltimo: anni.length ? Math.max(...anni) : null,
    generi: generiRicorrenti,
    paese: brani.find((b) => b.paese)?.paese || null,
    colore: brani[0]?.colore || null,
  });
}

artisti.sort((a, b) => a.nome.localeCompare(b.nome, 'it'));

// ------------------------------------------------------------- scrittura

mkdirSync(join(ROOT, 'dati'), { recursive: true });
writeFileSync(join(ROOT, 'dati', 'canzoni.json'), JSON.stringify(canzoni, null, 2) + '\n', 'utf8');
writeFileSync(join(ROOT, 'dati', 'artisti.json'), JSON.stringify(artisti, null, 2) + '\n', 'utf8');

// -------------------------------------------------------------- riepilogo

const senzaFrase = canzoni.filter((c) => !c.fraseIconica).length;
const senzaSpotify = canzoni.filter((c) => !c.spotifyId).length;
const senzaTesto = canzoni.filter((c) => !c.testoUrl).length;
const conBio = artisti.filter((a) => a.storia).length;

console.log(`Canzoni estratte:      ${canzoni.length}`);
console.log(`Artisti aggregati:     ${artisti.length} (con storia: ${conBio})`);
console.log('');
console.log(`Senza frase iconica:   ${senzaFrase}`);
console.log(`Senza player Spotify:  ${senzaSpotify}`);
console.log(`Senza link al testo:   ${senzaTesto}`);

const problemi = canzoni.filter((c) => !c.titolo || !c.artista || !c.corpo.length);
if (problemi.length) {
  console.log('');
  console.log('ATTENZIONE — schede con campi essenziali mancanti:');
  for (const p of problemi) console.log(`  ${p.slug}: titolo="${p.titolo}" artista="${p.artista}" paragrafi=${p.corpo.length}`);
  process.exitCode = 1;
}
