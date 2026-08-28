#!/usr/bin/env node
// Genera il sito statico dai dati in dati/*.json.
// Applica il P9 della Costituzione: ogni numero visibile nasce dai dati.
//
// Uso: node scripts/genera-sito.mjs [--out sito]

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { SITO } from './genera/guscio.mjs';
import { paginaCanzone, paginaArtista, paginaAlbum, paginaHome, paginaArchivio, paginaMetodo, paginaErrore404 } from './genera/pagine.mjs';
import { generaRicerca } from './genera/ricerca.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const argOut = process.argv.indexOf('--out');
const OUT = join(ROOT, argOut > -1 ? process.argv[argOut + 1] : 'sito');

const canzoni = JSON.parse(readFileSync(join(ROOT, 'dati', 'canzoni.json'), 'utf8'));
const artisti = JSON.parse(readFileSync(join(ROOT, 'dati', 'artisti.json'), 'utf8'));

// ganci editoriali opzionali: { "slug-canzone": "una riga" }
let ganci = {};
const percorsoGanci = join(ROOT, 'dati', 'ganci.json');
if (existsSync(percorsoGanci)) ganci = JSON.parse(readFileSync(percorsoGanci, 'utf8'));
for (const c of canzoni) c.gancio = ganci[c.slug] || null;

// ------------------------------------------------------------- contesto

const canzoniPerSlug = new Map(canzoni.map((c) => [c.slug, c]));
const artistiPerSlug = new Map(artisti.map((a) => [a.slug, a]));

// ---------------------------------------------------- F50/F51/F53: album

// F55 usa la stessa estrazione: il primo gruppo di quattro cifre, mai un
// parsing posizionale su formati "singolo / album" non sempre nello stesso ordine.
const primoAnno = (annoRaw) => {
  const m = String(annoRaw || '').match(/\d{4}/);
  return m ? parseInt(m[0], 10) : null;
};

// F51: l'insieme degli album non nasce solo dalla discografia dichiarata
// dall'artista, ma dall'unione con gli album citati dalle canzoni raccontate.
// Prima di F51, 72 canzoni su 157 citavano un album assente dalla discografia:
// diventano voci sintetiche (solo titolo/anno/slug, mai una copertina o una
// nota inventata) così che ogni canzone abbia una destinazione raggiungibile.
const extraPerArtista = new Map(); // artistaSlug -> Map(slugOriginale -> voce sintetica)
for (const c of canzoni) {
  if (!c.albumSlug) continue;
  const a = artistiPerSlug.get(c.artistaSlug);
  if (!a) continue;
  const inDiscografia = a.album.some((d) => d.titolo && d.slug === c.albumSlug);
  if (inDiscografia) continue;
  if (!extraPerArtista.has(c.artistaSlug)) extraPerArtista.set(c.artistaSlug, new Map());
  const mappa = extraPerArtista.get(c.artistaSlug);
  if (!mappa.has(c.albumSlug)) {
    mappa.set(c.albumSlug, { titolo: c.album, anno: primoAnno(c.anno), nota: null, copertina: null, slug: c.albumSlug });
  }
}

// F53: due voci dello stesso artista collidono sullo stesso slug quando due
// album omonimi esistono davvero (es. "Korn" 1994 e "Korn" 2007, il secondo
// noto anche come "Untitled"): non si "toglie" un album, si disambigua lo
// slug. Il più vecchio conserva lo slug originale; i successivi ricevono
// "-{anno}". Deterministico per anno, mai per ordine nel file.
const albumPerArtista = new Map(); // artistaSlug -> [voci arricchite con slugPagina/slugOriginale]
for (const a of artisti) {
  const originali = a.album.filter((d) => d.titolo).map((d) => ({ ...d }));
  const extra = [...(extraPerArtista.get(a.slug)?.values() || [])];
  const gruppi = new Map();
  for (const d of [...originali, ...extra]) {
    if (!gruppi.has(d.slug)) gruppi.set(d.slug, []);
    gruppi.get(d.slug).push(d);
  }
  const arricchite = [];
  for (const [slugOriginale, voci] of gruppi) {
    const ordinate = voci.length > 1 ? [...voci].sort((x, y) => (primoAnno(x.anno) || 0) - (primoAnno(y.anno) || 0)) : voci;
    ordinate.forEach((d, i) => {
      const slugPagina = i === 0 ? slugOriginale : `${slugOriginale}-${primoAnno(d.anno) || i}`;
      arricchite.push({ ...d, slugOriginale, slugPagina });
    });
  }
  albumPerArtista.set(a.slug, arricchite);
}

// Abbina ogni canzone alla voce disambiguata giusta (per anno più vicino, nei
// rari casi di collisione) e ricorda il riferimento per i link della scheda.
function voceAlbumDi(c) {
  if (!c.albumSlug) return null;
  const voci = albumPerArtista.get(c.artistaSlug) || [];
  const candidate = voci.filter((v) => v.slugOriginale === c.albumSlug);
  if (candidate.length <= 1) return candidate[0] || null;
  const annoCanzone = primoAnno(c.anno) || 0;
  return [...candidate].sort((x, y) => Math.abs((primoAnno(x.anno) || 0) - annoCanzone) - Math.abs((primoAnno(y.anno) || 0) - annoCanzone))[0];
}
const canzoniPerVoce = new Map(); // "artistaSlug/slugPagina" -> [slug canzoni]
for (const c of canzoni) {
  const voce = voceAlbumDi(c);
  if (!voce) continue;
  c._albumSlugPagina = voce.slugPagina;
  const chiave = `${c.artistaSlug}/${voce.slugPagina}`;
  if (!canzoniPerVoce.has(chiave)) canzoniPerVoce.set(chiave, []);
  canzoniPerVoce.get(chiave).push(c.slug);
}

// F50: soglia di pubblicazione a due gradini (sezione 11.2 di ROADMAP.md).
// La pagina ESISTE se ha almeno una canzone raccontata o una copertina
// documentata; ENTRA NELL'INDICE solo con almeno tre canzoni o una copertina.
// Le altre restano voci di solo testo nella discografia, senza link: il
// lettore vede che il disco esiste senza finire in un vicolo cieco.
const album = [];
const albumRimossi = [];
for (const [artistaSlug, voci] of albumPerArtista) {
  for (const v of voci) {
    const chiave = `${artistaSlug}/${v.slugPagina}`;
    v.nCanzoni = (canzoniPerVoce.get(chiave) || []).length;
    const haCopertina = Boolean(v.copertina);
    v.esiste = v.nCanzoni >= 1 || haCopertina;
    v.indicizzabile = v.nCanzoni >= 3 || haCopertina;
    v.slug = v.slugPagina;
    v.artistaSlug = artistaSlug;
    if (!v.esiste) {
      albumRimossi.push({ artistaSlug, slug: v.slugPagina, titolo: v.titolo });
      continue;
    }
    album.push({
      ...v,
      colore: canzoni.find((c) => c.artistaSlug === artistaSlug && c._albumSlugPagina === v.slugPagina)?.colore || artistiPerSlug.get(artistaSlug)?.colore,
    });
  }
}
const albumPerSlug = new Map(album.map((al) => [`${al.artistaSlug}/${al.slug}`, al]));
writeFileSync(join(ROOT, 'dati', 'album-rimossi.json'), JSON.stringify(albumRimossi, null, 2) + '\n', 'utf8');

// F52: stessa soglia applicata agli artisti — indicizzabile con una storia
// scritta o almeno tre canzoni raccontate, non "più di una", che creerebbe
// una pagina indicizzabile bocciata appena una delle povere arrivasse alla
// seconda canzone invece che alla terza.
for (const a of artisti) {
  a._indicizzabile = Boolean(a.storia) || a.canzoni.length >= 3;
}

const dataRevisione = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

const ctx = {
  canzoni,
  artisti,
  album,
  canzoniPerSlug,
  artistiPerSlug,
  albumPerSlug,
  albumPerArtista,
  dataRevisione,
  totali: { canzoni: canzoni.length, artisti: artisti.length, album: album.length },
};

// ------------------------------------------------------------- scrittura

function scrivi(percorsoRelativo, contenuto) {
  const completo = join(OUT, percorsoRelativo);
  mkdirSync(dirname(completo), { recursive: true });
  writeFileSync(completo, contenuto, 'utf8');
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const htmlHome = paginaHome(ctx);
const htmlArchivio = paginaArchivio(ctx);
const htmlMetodo = paginaMetodo(ctx);
scrivi('index.html', htmlHome);
scrivi('archivio/index.html', htmlArchivio);
scrivi('metodo/index.html', htmlMetodo);
scrivi('404.html', paginaErrore404(ctx)); // F43: 404 del sito invece di quella generica di Vercel

const htmlCanzoni = new Map();
for (const c of canzoni) {
  const html = paginaCanzone(c, ctx);
  htmlCanzoni.set(c.slug, html);
  scrivi(`canzone/${c.slug}/index.html`, html);
}
const htmlArtisti = new Map();
for (const a of artisti) {
  const html = paginaArtista(a, ctx);
  htmlArtisti.set(a.slug, html);
  scrivi(`artista/${a.slug}/index.html`, html);
}
const htmlAlbum = new Map();
for (const al of album) {
  const html = paginaAlbum(al, ctx);
  htmlAlbum.set(`${al.artistaSlug}/${al.slug}`, html);
  scrivi(`album/${al.artistaSlug}/${al.slug}/index.html`, html);
}

scrivi('ricerca.js', generaRicerca(ctx));

// risorse statiche riusate dal sito attuale
for (const f of ['logo.png', 'favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png']) {
  if (existsSync(join(ROOT, f))) cpSync(join(ROOT, f), join(OUT, f));
}
// immagini di anteprima per la condivisione (F23), generate a parte da scripts/genera-og.py
if (existsSync(join(ROOT, 'og'))) cpSync(join(ROOT, 'og'), join(OUT, 'og'), { recursive: true });

// ------------------------------------------------------- sitemap e robots

const oggi = new Date().toISOString().slice(0, 10);

// F40: `lastmod` riflette una vera modifica di contenuto, non la data di build.
// Confronta l'HTML appena generato con quello già pubblicato in ROOT (l'ultima
// versione online, copiata lì dal rituale di pubblicazione) ignorando la sola
// riga "Ultima revisione" — l'unica che cambierebbe comunque ogni giorno anche
// a contenuto identico. Se il resto coincide, la pagina riusa il lastmod già
// presente nella sitemap precedente; altrimenti prende la data di oggi.
const RIGA_REVISIONE = /<span class="verifica">Ultima revisione.*?<\/span>/s;
const senzaRevisione = (html) => html.replace(RIGA_REVISIONE, '');

// F53: la sitemap è ora divisa in più file. I lastmod pregressi si leggono
// da qualunque file "sitemap*.xml" già pubblicato in ROOT — sia il vecchio
// formato monolitico (prima di questo intervento) sia i nuovi file divisi
// (dalle esecuzioni successive) — così F40 resta intatto in entrambi i casi.
const vecchiLastmod = new Map();
const prefissoBase = SITO.base + '/';
for (const nome of existsSync(ROOT) ? readdirSync(ROOT) : []) {
  if (!/^sitemap.*\.xml$/.test(nome)) continue;
  const contenuto = readFileSync(join(ROOT, nome), 'utf8');
  for (const m of contenuto.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)) {
    const percorso = m[1].startsWith(prefissoBase) ? m[1].slice(prefissoBase.length) : m[1];
    vecchiLastmod.set(percorso, m[2]);
  }
}

function lastmodDi(percorsoFile, percorsoUrl, contenutoNuovo) {
  const fileVecchio = join(ROOT, percorsoFile);
  if (existsSync(fileVecchio)) {
    const contenutoVecchio = readFileSync(fileVecchio, 'utf8');
    if (senzaRevisione(contenutoVecchio) === senzaRevisione(contenutoNuovo) && vecchiLastmod.has(percorsoUrl)) {
      return vecchiLastmod.get(percorsoUrl);
    }
  }
  return oggi;
}

// F53: niente più `priority` — Google dichiara di ignorarlo, tenerlo dava
// solo l'illusione di un controllo che non esiste.
const url = (p, lastmod) => `  <url><loc>${SITO.base}/${p}</loc><lastmod>${lastmod}</lastmod></url>`;

function urlset(righe) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${righe.join('\n')}\n</urlset>\n`;
}

const sitemapPagine = urlset([
  url('', lastmodDi('index.html', '', htmlHome)),
  url('archivio/', lastmodDi('archivio/index.html', 'archivio/', htmlArchivio)),
  url('metodo/', lastmodDi('metodo/index.html', 'metodo/', htmlMetodo)),
]);
const sitemapCanzoni = urlset(
  canzoni.map((c) => url(`canzone/${c.slug}/`, lastmodDi(`canzone/${c.slug}/index.html`, `canzone/${c.slug}/`, htmlCanzoni.get(c.slug))))
);
// F52: solo gli artisti indicizzabili entrano in sitemap.
const sitemapArtisti = urlset(
  artisti
    .filter((a) => a._indicizzabile)
    .map((a) => url(`artista/${a.slug}/`, lastmodDi(`artista/${a.slug}/index.html`, `artista/${a.slug}/`, htmlArtisti.get(a.slug))))
);
// F50: solo gli album indicizzabili entrano in sitemap.
const sitemapAlbum = urlset(
  album
    .filter((al) => al.indicizzabile)
    .map((al) =>
      url(`album/${al.artistaSlug}/${al.slug}/`, lastmodDi(`album/${al.artistaSlug}/${al.slug}/index.html`, `album/${al.artistaSlug}/${al.slug}/`, htmlAlbum.get(`${al.artistaSlug}/${al.slug}`)))
    )
);
// F54/F55 non ancora costruite: il file esiste già, vuoto, così la struttura
// non cambia quando le raccolte arriveranno.
const sitemapRaccolte = urlset([]);

scrivi('sitemap-pagine.xml', sitemapPagine);
scrivi('sitemap-canzoni.xml', sitemapCanzoni);
scrivi('sitemap-artisti.xml', sitemapArtisti);
scrivi('sitemap-album.xml', sitemapAlbum);
scrivi('sitemap-raccolte.xml', sitemapRaccolte);

const sitemapIndice = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITO.base}/sitemap-pagine.xml</loc></sitemap>
  <sitemap><loc>${SITO.base}/sitemap-canzoni.xml</loc></sitemap>
  <sitemap><loc>${SITO.base}/sitemap-artisti.xml</loc></sitemap>
  <sitemap><loc>${SITO.base}/sitemap-album.xml</loc></sitemap>
  <sitemap><loc>${SITO.base}/sitemap-raccolte.xml</loc></sitemap>
</sitemapindex>
`;
scrivi('sitemap.xml', sitemapIndice);
scrivi('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITO.base}/sitemap.xml\n`);

// -------------------------------------------------------------- vercel.json

// F63: un 301 permanente da ogni indirizzo album rimosso (F50) verso la
// pagina dell'artista corrispondente, generato da dati/album-rimossi.json —
// mai scritto a mano. Più gli header di cache: lunga durata e immutabile per
// le risorse che cambiano solo quando cambia il loro contenuto (il nome del
// file resta identico), breve durata per l'HTML che F40 aggiorna da solo.
const vercelJson = {
  // Con lo slash finale: è così che ogni link e la sitemap generano questi
  // indirizzi, ed è quindi la forma con cui arriva davvero il traffico da
  // reindirizzare (link già condivisi, cache di Google sulle vecchie pagine).
  redirects: albumRimossi.map((al) => ({
    source: `/album/${al.artistaSlug}/${al.slug}/`,
    destination: `/artista/${al.artistaSlug}/`,
    permanent: true,
  })),
  headers: [
    // Regola generale prima (HTML e tutto il resto, sempre rivalidato: F40
    // decide da solo quando una pagina è davvero cambiata, il browser non
    // deve indovinarlo con una cache lunga). Le eccezioni sotto, più
    // specifiche — un percorso esatto per file, non un'alternanza fra
    // parentesi che il matcher di Vercel potrebbe leggere diversamente —
    // la sovrascrivono per gli asset che non cambiano mai di nome.
    { source: '/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
    ...['/logo.png', '/favicon.ico', '/favicon-32.png', '/favicon-192.png', '/apple-touch-icon.png'].map((source) => ({
      source,
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    })),
    {
      source: '/og/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],
};
scrivi('vercel.json', JSON.stringify(vercelJson, null, 2) + '\n');

// -------------------------------------------------------------- riepilogo

const conGancio = canzoni.filter((c) => c.gancio).length;
const totale = 3 + canzoni.length + artisti.length + album.length;

console.log(`Pagine generate:   ${totale}`);
console.log(`  canzoni          ${canzoni.length}`);
console.log(`  artisti          ${artisti.length}`);
console.log(`  album            ${album.length}`);
console.log(`  fisse            3 (home, archivio, metodo)`);
console.log('');
console.log(`Ganci scritti:     ${conGancio}/${canzoni.length}`);
console.log(`Destinazione:      ${OUT.replace(ROOT + '/', '')}/`);
