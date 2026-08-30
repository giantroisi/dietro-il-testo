#!/usr/bin/env node
// Genera il sito statico dai dati in dati/*.json.
// Applica il P9 della Costituzione: ogni numero visibile nasce dai dati.
//
// Uso: node scripts/genera-sito.mjs [--out sito]

import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { SITO } from './genera/guscio.mjs';
import { paginaCanzone, paginaArtista, paginaAlbum, paginaRaccolta, paginaHome, paginaArchivio, paginaMetodo, paginaChiSiamo, paginaPrivacy, paginaNoteLegali, paginaErrore404, nomeGenere, NOMI_DECENNIO, SEGNAPOSTO_DATA_MODIFICA } from './genera/pagine.mjs';
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
    mappa.set(c.albumSlug, { titolo: c.album, anno: primoAnno(c.anno), nota: null, copertina: null, slug: c.albumSlug, sintetico: true });
  }
}

// F53: due voci dello stesso artista collidono sullo stesso slug quando due
// album omonimi esistono davvero (es. "Korn" 1994 e "Korn" 2007, il secondo
// noto anche come "Untitled"): non si "toglie" un album, si disambigua lo
// slug. Il più vecchio conserva lo slug originale; i successivi ricevono
// "-{anno}". Deterministico per anno, mai per ordine nel file.
const albumPerArtista = new Map(); // artistaSlug -> [voci arricchite con slugPagina/slugOriginale]
for (const a of artisti) {
  const originali = a.album.filter((d) => d.titolo).map((d) => ({ ...d, sintetico: false }));
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
// F65: ogni voce disambiguata (esistente o no), con `nCanzoni` già calcolato —
// così lacune.mjs non deve reimplementare la disambiguazione di F51/F53 per
// sapere quante canzoni sblocca ciascuna copertina mancante.
const albumComputati = [];
for (const [artistaSlug, voci] of albumPerArtista) {
  for (const v of voci) {
    const chiave = `${artistaSlug}/${v.slugPagina}`;
    v.nCanzoni = (canzoniPerVoce.get(chiave) || []).length;
    const haCopertina = Boolean(v.copertina);
    v.esiste = v.nCanzoni >= 1 || haCopertina;
    v.indicizzabile = v.nCanzoni >= 3 || haCopertina;
    v.slug = v.slugPagina;
    v.artistaSlug = artistaSlug;
    albumComputati.push({
      artistaSlug,
      slug: v.slugPagina,
      titolo: v.titolo,
      anno: v.anno,
      copertina: haCopertina,
      nCanzoni: v.nCanzoni,
      esiste: v.esiste,
      indicizzabile: v.indicizzabile,
      // F65/C4: una voce sintetica (nata solo perché una canzone citava un
      // album assente dalla discografia dichiarata, F51) non ha ancora una
      // vera identità di album — cercarne la copertina è prematuro finché
      // C3 non completa la discografia reale dell'artista.
      sintetico: Boolean(v.sintetico),
    });
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
writeFileSync(join(ROOT, 'dati', 'album-computati.json'), JSON.stringify(albumComputati, null, 2) + '\n', 'utf8');

// F52: stessa soglia applicata agli artisti — indicizzabile con una storia
// scritta o almeno tre canzoni raccontate, non "più di una", che creerebbe
// una pagina indicizzabile bocciata appena una delle povere arrivasse alla
// seconda canzone invece che alla terza.
for (const a of artisti) {
  a._indicizzabile = Boolean(a.storia) || a.canzoni.length >= 3;
}

// ------------------------------------------------- F54/F55: generi e decenni

const raccolteTesti = JSON.parse(readFileSync(join(ROOT, 'dati', 'raccolte.json'), 'utf8'));

// La soglia nasce dal codice, non da un elenco fisso di generi o decenni:
// una raccolta futura che superi undici canzoni e abbia un'introduzione
// approvata in dati/raccolte.json si pubblica da sola, senza toccare questo file.
const SOGLIA_RACCOLTA = 12;

const canzoniPerGenere = new Map();
for (const c of canzoni) {
  for (const g of c.generi || []) {
    if (!canzoniPerGenere.has(g)) canzoniPerGenere.set(g, []);
    canzoniPerGenere.get(g).push(c.slug);
  }
}
const generiPubblicati = [...canzoniPerGenere.entries()]
  .filter(([slug, elenco]) => elenco.length >= SOGLIA_RACCOLTA && raccolteTesti.generi?.[slug])
  .map(([slug, elenco]) => ({
    tipo: 'genere',
    slug,
    percorso: `genere/${slug}/`,
    nome: nomeGenere(slug),
    titoloH1: `Canzoni ${nomeGenere(slug).toLowerCase()}`,
    // F57: formula fissa per il <title>, distinta dall'h1 — qui conta la
    // domanda digitata su Google, non la formulazione naturale in pagina.
    titoloSeo: `Canzoni ${nomeGenere(slug).toLowerCase()}: significato e storia dei testi`,
    introduzione: raccolteTesti.generi[slug],
    canzoni: elenco,
  }));

// F55: decennio = il primo gruppo di quattro cifre nel campo anno, mai un
// parsing posizionale — 18 canzoni hanno un formato doppio anno non sempre
// nello stesso ordine.
function decennioDi(annoRaw) {
  const anno = primoAnno(annoRaw);
  return anno === null ? null : Math.floor(anno / 10) * 10;
}
const canzoniPerDecennio = new Map();
for (const c of canzoni) {
  const d = decennioDi(c.anno);
  c._decennioNumero = d;
  if (d === null) continue;
  if (!canzoniPerDecennio.has(d)) canzoniPerDecennio.set(d, []);
  canzoniPerDecennio.get(d).push(c.slug);
}
const decenniPubblicati = [...canzoniPerDecennio.entries()]
  .filter(([d, elenco]) => elenco.length >= SOGLIA_RACCOLTA && raccolteTesti.decenni?.[String(d)])
  .map(([d, elenco]) => ({
    tipo: 'decennio',
    slug: String(d),
    percorso: `anni/${d}/`,
    nome: NOMI_DECENNIO[d] || `anni ${d}`,
    titoloH1: `Canzoni degli ${NOMI_DECENNIO[d] || `anni ${d}`}`,
    titoloSeo: `Canzoni ${NOMI_DECENNIO[d] || `anni ${d}`}: significato e storia dei testi`,
    introduzione: raccolteTesti.decenni[String(d)],
    canzoni: elenco,
  }));

const raccolte = [...generiPubblicati, ...decenniPubblicati];
const generiPubblicatiSlug = new Set(generiPubblicati.map((g) => g.slug));
const decenniPubblicatiSlug = new Set(decenniPubblicati.map((d) => d.slug));

// F56: il genere principale è il primo genere della canzone che sia anche
// una raccolta pubblicata — mai il primo genere in assoluto, altrimenti si
// linkerebbe una raccolta inesistente (es. "rap" o "elettronica", sotto
// soglia). Stesso principio per il decennio.
for (const c of canzoni) {
  c._generePrincipale = (c.generi || []).find((g) => generiPubblicatiSlug.has(g)) || null;
  c._decennioPubblicato = c._decennioNumero !== null && decenniPubblicatiSlug.has(String(c._decennioNumero)) ? String(c._decennioNumero) : null;
}

// -------------------------------------------------------- F60: la rete

// Cinque livelli di affinità decrescente (ROADMAP.md, sezione 11.8): stesso
// album, poi stesso artista, poi genere e decennio insieme, poi solo genere,
// poi solo decennio. L'ordine non è arbitrario — è quello che rende la scelta
// deterministica e riproducibile a ogni rigenerazione, mai a discrezione.
function livelloAffinita(a, b) {
  if (a.artistaSlug === b.artistaSlug && a._albumSlugPagina && a._albumSlugPagina === b._albumSlugPagina) return 1;
  if (a.artistaSlug === b.artistaSlug) return 2;
  const genereComune = (a.generi || []).some((g) => (b.generi || []).includes(g));
  const stessoDecennio = a._decennioNumero !== null && a._decennioNumero === b._decennioNumero;
  if (genereComune && stessoDecennio) return 3;
  if (genereComune) return 4;
  if (stessoDecennio) return 5;
  return null; // nessuna affinità: non diventa mai un candidato
}

const canzoniOrdinateSlug = [...canzoni].sort((a, b) => a.slug.localeCompare(b.slug, 'it'));
const inboundCount = new Map(canzoni.map((c) => [c.slug, 0]));
const collegamentiPerSlug = new Map(canzoni.map((c) => [c.slug, []]));

// Dentro ogni livello, i candidati si ordinano per collegamenti in entrata
// già assegnati (crescente) e a parità per slug — è il meccanismo che
// distribuisce gli ingressi, non solo le uscite: senza questa regola metà
// del catalogo resterebbe con zero collegamenti in entrata (provato).
function candidatiOrdinati(c) {
  const perLivello = [[], [], [], [], []];
  for (const altra of canzoni) {
    if (altra.slug === c.slug) continue;
    const lvl = livelloAffinita(c, altra);
    if (lvl === null) continue;
    perLivello[lvl - 1].push(altra);
  }
  const risultato = [];
  for (const gruppo of perLivello) {
    gruppo.sort((x, y) => inboundCount.get(x.slug) - inboundCount.get(y.slug) || x.slug.localeCompare(y.slug, 'it'));
    risultato.push(...gruppo);
  }
  return risultato;
}

// Assegnazione iniziale: si scorrono le canzoni in ordine alfabetico di slug,
// prendendo i primi quattro candidati liberi da duplicati.
for (const c of canzoniOrdinateSlug) {
  const scelti = [];
  const esclusi = new Set();
  for (const candidato of candidatiOrdinati(c)) {
    if (scelti.length >= 4) break;
    if (esclusi.has(candidato.slug)) continue;
    scelti.push(candidato.slug);
    esclusi.add(candidato.slug);
    inboundCount.set(candidato.slug, inboundCount.get(candidato.slug) + 1);
  }
  collegamentiPerSlug.set(c.slug, scelti);
}

// Passata di riequilibrio: ogni scheda rimasta sotto due collegamenti in
// entrata viene inserita nel blocco del suo candidato più affine, al posto
// del bersaglio con più collegamenti in entrata di quel blocco — solo se
// quel bersaglio ne resta con almeno due dopo la rimozione. Aumentare i
// posti non risolve (provato a 5/6/7): il problema è strutturale (`volare`
// è l'unica canzone degli anni '50, rap ha solo quattro brani in tutto).
let cambiato = true;
while (cambiato) {
  cambiato = false;
  for (const s of canzoniOrdinateSlug) {
    if (inboundCount.get(s.slug) >= 2) continue;
    for (const x of candidatiOrdinati(s)) {
      const bloccoX = collegamentiPerSlug.get(x.slug);
      if (bloccoX.includes(s.slug)) continue;
      let bersaglio = null;
      for (const t of bloccoX) {
        if (!bersaglio || inboundCount.get(t) > inboundCount.get(bersaglio)) bersaglio = t;
      }
      if (bersaglio && inboundCount.get(bersaglio) >= 3) {
        bloccoX[bloccoX.indexOf(bersaglio)] = s.slug;
        inboundCount.set(bersaglio, inboundCount.get(bersaglio) - 1);
        inboundCount.set(s.slug, inboundCount.get(s.slug) + 1);
        cambiato = true;
        break;
      }
    }
    if (inboundCount.get(s.slug) >= 2) continue;
  }
}

for (const c of canzoni) c._collegamenti = collegamentiPerSlug.get(c.slug);

// ------------------------------------------------------------------ F30

// Tassonomia derivata dai dati reali (frase iconica di ogni canzone), non
// da un elenco di mood astratto: solo i temi con almeno una canzone
// compaiono come filtro, l'ordine segue la diffusione reale nel catalogo.
const temiTesti = JSON.parse(readFileSync(join(ROOT, 'dati', 'temi.json'), 'utf8'));
const temi = Object.entries(temiTesti)
  .map(([slug, info]) => ({ slug, nome: info.nome, n: canzoni.filter((c) => (c.temi || []).includes(slug)).length }))
  .filter((t) => t.n > 0)
  .sort((a, b) => b.n - a.n || a.nome.localeCompare(b.nome, 'it'));

const dataRevisione = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

const ctx = {
  canzoni,
  artisti,
  album,
  raccolte,
  temi,
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

const oggi = new Date().toISOString().slice(0, 10);

// F40: `lastmod` riflette una vera modifica di contenuto, non la data di build.
// Confronta l'HTML appena generato con quello già pubblicato in ROOT (l'ultima
// versione online, copiata lì dal rituale di pubblicazione) ignorando la riga
// "Ultima revisione" e il campo `dateModified` (F59) — gli unici due che
// cambierebbero comunque ogni giorno anche a contenuto identico, il secondo
// proprio perché DEVE valere quanto il lastmod che stiamo ancora calcolando.
// Se il resto coincide, la pagina riusa il lastmod già presente nella sitemap
// precedente; altrimenti prende la data di oggi.
const RIGA_REVISIONE = /<span class="verifica">Ultima revisione.*?<\/span>/s;
const RIGA_DATA_MODIFICA = /,?"dateModified":"[^"]*"/g;
const normalizza = (html) => html.replace(RIGA_REVISIONE, '').replace(RIGA_DATA_MODIFICA, '');
// Cattura (non rimuove) il dateModified già scritto in una pagina — serve da
// F65/C3 in poi: una pagina "esiste" ma non "indicizzabile" (F50, nCanzoni
// 1-2, senza copertina) non entra mai in nessuna sitemap, quindi il lastmod
// pregresso letto sopra non la copre mai e il suo lastmod si "congelava" a
// oggi a ogni rigenerazione anche a contenuto identico. Trovato controllando
// perché *tutte* le pagine sembravano cambiate dopo aver scritto 8 nuove
// discografie in un solo lotto — solo poche decine erano toccate davvero.
const DATA_MODIFICA_CATTURA = /"dateModified":"([^"]*)"/;

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
    if (normalizza(contenutoVecchio) === normalizza(contenutoNuovo)) {
      const precedente = vecchiLastmod.get(percorsoUrl) || contenutoVecchio.match(DATA_MODIFICA_CATTURA)?.[1];
      if (precedente) return precedente;
    }
  }
  return oggi;
}

// F59: la pagina viene generata con un segnaposto al posto di `dateModified`
// (il vero lastmod non è ancora noto: dipende dal confronto qui sopra, che a
// sua volta ha bisogno dell'HTML già generato). Calcolato il lastmod, lo si
// sostituisce nella stringa già in memoria prima di scriverla — mai due
// generazioni della stessa pagina, un solo confronto, la stessa identica data.
function scriviConLastmod(percorsoFile, percorsoUrl, html) {
  const lastmod = lastmodDi(percorsoFile, percorsoUrl, html);
  const finale = html.includes(SEGNAPOSTO_DATA_MODIFICA) ? html.replaceAll(SEGNAPOSTO_DATA_MODIFICA, lastmod) : html;
  scrivi(percorsoFile, finale);
  return { html: finale, lastmod };
}

// F64: le tre categorie di pagina si assegnano qui, dal generatore che sa
// davvero cos'è ogni pagina — mai indovinate dallo script di controllo a
// partire dall'URL, che potrebbe disallinearsi dalla struttura reale.
const manifestoPagine = [];

const htmlHome = paginaHome(ctx);
const htmlArchivio = paginaArchivio(ctx);
const htmlMetodo = paginaMetodo(ctx);
const lastmodHome = scriviConLastmod('index.html', '', htmlHome).lastmod;
const lastmodArchivio = scriviConLastmod('archivio/index.html', 'archivio/', htmlArchivio).lastmod;
const lastmodMetodo = scriviConLastmod('metodo/index.html', 'metodo/', htmlMetodo).lastmod;
// F61/F62: chi c'è dietro, privacy e note legali. Sono pagine di servizio —
// brevi per natura, senza soglia di contenuto (ROADMAP 11.2) — ma indicizzabili
// e in sitemap: sono pagine vere, non scarti.
const lastmodChiSiamo = scriviConLastmod('chi-siamo/index.html', 'chi-siamo/', paginaChiSiamo(ctx)).lastmod;
const lastmodPrivacy = scriviConLastmod('privacy/index.html', 'privacy/', paginaPrivacy(ctx)).lastmod;
const lastmodNoteLegali = scriviConLastmod('note-legali/index.html', 'note-legali/', paginaNoteLegali(ctx)).lastmod;
scrivi('404.html', paginaErrore404(ctx)); // F43: 404 del sito invece di quella generica di Vercel
manifestoPagine.push(
  { percorso: '', categoria: 'servizio', indicizzabile: true },
  // L'archivio raccoglie sempre tutte le canzoni: la massa non è mai il problema.
  { percorso: 'archivio/', categoria: 'indice', indicizzabile: true, nCanzoni: canzoni.length, haTestoEditoriale: true },
  { percorso: 'metodo/', categoria: 'servizio', indicizzabile: true },
  { percorso: 'chi-siamo/', categoria: 'servizio', indicizzabile: true },
  { percorso: 'privacy/', categoria: 'servizio', indicizzabile: true },
  { percorso: 'note-legali/', categoria: 'servizio', indicizzabile: true },
  { percorso: '404.html', categoria: 'servizio', indicizzabile: false }
);

const lastmodCanzoni = new Map();
for (const c of canzoni) {
  const html = paginaCanzone(c, ctx);
  const { lastmod } = scriviConLastmod(`canzone/${c.slug}/index.html`, `canzone/${c.slug}/`, html);
  lastmodCanzoni.set(c.slug, lastmod);
  manifestoPagine.push({ percorso: `canzone/${c.slug}/`, categoria: 'articolo', indicizzabile: true });
}
const lastmodArtisti = new Map();
for (const a of artisti) {
  const html = paginaArtista(a, ctx);
  const { lastmod } = scriviConLastmod(`artista/${a.slug}/index.html`, `artista/${a.slug}/`, html);
  lastmodArtisti.set(a.slug, lastmod);
  manifestoPagine.push({
    percorso: `artista/${a.slug}/`,
    categoria: 'indice',
    indicizzabile: a._indicizzabile,
    nCanzoni: a.canzoni.length,
    haTestoEditoriale: Boolean(a.storia),
  });
}
const lastmodAlbum = new Map();
for (const al of album) {
  const html = paginaAlbum(al, ctx);
  const { lastmod } = scriviConLastmod(`album/${al.artistaSlug}/${al.slug}/index.html`, `album/${al.artistaSlug}/${al.slug}/`, html);
  lastmodAlbum.set(`${al.artistaSlug}/${al.slug}`, lastmod);
  manifestoPagine.push({
    percorso: `album/${al.artistaSlug}/${al.slug}/`,
    categoria: 'indice',
    indicizzabile: al.indicizzabile,
    nCanzoni: al.nCanzoni,
    haTestoEditoriale: Boolean(al.copertina),
  });
}
const lastmodRaccolte = new Map();
for (const rac of raccolte) {
  const html = paginaRaccolta(rac, ctx);
  const { lastmod } = scriviConLastmod(`${rac.percorso}index.html`, rac.percorso, html);
  lastmodRaccolte.set(rac.percorso, lastmod);
  manifestoPagine.push({
    percorso: rac.percorso,
    categoria: 'indice',
    indicizzabile: true,
    nCanzoni: rac.canzoni.length,
    haTestoEditoriale: Boolean(rac.introduzione),
  });
}
writeFileSync(join(ROOT, 'dati', 'pagine-seo.json'), JSON.stringify(manifestoPagine, null, 2) + '\n', 'utf8');

scrivi('ricerca.js', generaRicerca(ctx));

// risorse statiche riusate dal sito attuale
for (const f of ['logo.png', 'favicon.ico', 'favicon-32.png', 'favicon-192.png', 'apple-touch-icon.png']) {
  if (existsSync(join(ROOT, f))) cpSync(join(ROOT, f), join(OUT, f));
}
// F68: il file di proprietà IndexNow. Deve chiamarsi come la chiave e contenere
// la chiave: è così che Bing verifica che chi segnala gli URL possieda il sito.
// Il nome sta in dati/indexnow.json, mai scritto a mano in due posti (P9).
if (existsSync(join(ROOT, 'dati', 'indexnow.json'))) {
  const chiaveIndexNow = JSON.parse(readFileSync(join(ROOT, 'dati', 'indexnow.json'), 'utf8')).indexnow;
  if (chiaveIndexNow) writeFileSync(join(OUT, `${chiaveIndexNow}.txt`), chiaveIndexNow, 'utf8');
}
// immagini di anteprima per la condivisione (F23), generate a parte da scripts/genera-og.py
if (existsSync(join(ROOT, 'og'))) cpSync(join(ROOT, 'og'), join(OUT, 'og'), { recursive: true });

// ------------------------------------------------------- sitemap e robots

// F53: niente più `priority` — Google dichiara di ignorarlo, tenerlo dava
// solo l'illusione di un controllo che non esiste.
const url = (p, lastmod) => `  <url><loc>${SITO.base}/${p}</loc><lastmod>${lastmod}</lastmod></url>`;

function urlset(righe) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${righe.join('\n')}\n</urlset>\n`;
}

// F59: gli stessi lastmod già calcolati sopra, non un secondo confronto —
// è esattamente il valore scritto nel `dateModified` di ogni pagina.
const sitemapPagine = urlset([
  url('', lastmodHome),
  url('archivio/', lastmodArchivio),
  url('metodo/', lastmodMetodo),
  url('chi-siamo/', lastmodChiSiamo),
  url('privacy/', lastmodPrivacy),
  url('note-legali/', lastmodNoteLegali),
]);
const sitemapCanzoni = urlset(canzoni.map((c) => url(`canzone/${c.slug}/`, lastmodCanzoni.get(c.slug))));
// F52: solo gli artisti indicizzabili entrano in sitemap.
const sitemapArtisti = urlset(artisti.filter((a) => a._indicizzabile).map((a) => url(`artista/${a.slug}/`, lastmodArtisti.get(a.slug))));
// F50: solo gli album indicizzabili entrano in sitemap.
const sitemapAlbum = urlset(
  album.filter((al) => al.indicizzabile).map((al) => url(`album/${al.artistaSlug}/${al.slug}/`, lastmodAlbum.get(`${al.artistaSlug}/${al.slug}`)))
);
// F54/F55: solo le raccolte che hanno superato la soglia entrano in sitemap.
const sitemapRaccolte = urlset(raccolte.map((rac) => url(rac.percorso, lastmodRaccolte.get(rac.percorso))));

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

// F66/C3: quando una canzone smette di citare un album segnaposto ("Singolo")
// per puntare all'album reale appena documentato, la vecchia pagina sintetica
// non finisce in `albumRimossi` — semplicemente non viene più generata da
// nessuna voce, quindi F63 non la vedrebbe mai. Va dichiarata qui a mano,
// una volta per tutte: non è un caso che si ripeta spesso, non merita un
// meccanismo generico.
const REDIRECT_STORICI = [
  { da: '/album/adriano-celentano/singolo/', a: '/album/adriano-celentano/azzurro-una-carezza-in-un-pugno/' },
  { da: '/album/al-bano-e-romina-power/singolo/', a: '/album/al-bano-e-romina-power/felicita/' },
  { da: '/album/mina/singolo-scritta-da-gino-paoli-1959/', a: '/album/mina/il-cielo-in-una-stanza/' },
  { da: '/album/toto-cutugno/singolo/', a: '/album/toto-cutugno/l-italiano/' },
];

// F63: un 301 permanente da ogni indirizzo album rimosso (F50) verso la
// pagina dell'artista corrispondente, generato da dati/album-rimossi.json —
// mai scritto a mano. Più gli header di cache: lunga durata e immutabile per
// le risorse che cambiano solo quando cambia il loro contenuto (il nome del
// file resta identico), breve durata per l'HTML che F40 aggiorna da solo.
const vercelJson = {
  // Con lo slash finale: è così che ogni link e la sitemap generano questi
  // indirizzi, ed è quindi la forma con cui arriva davvero il traffico da
  // reindirizzare (link già condivisi, cache di Google sulle vecchie pagine).
  redirects: [
    ...albumRimossi.map((al) => ({
      source: `/album/${al.artistaSlug}/${al.slug}/`,
      destination: `/artista/${al.artistaSlug}/`,
      permanent: true,
    })),
    ...REDIRECT_STORICI.map((r) => ({ source: r.da, destination: r.a, permanent: true })),
  ],
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
// F61/F62: sei pagine fisse, non più tre — il numero nasce da qui e da nessun
// altro posto (P9).
const PAGINE_FISSE = ['', 'archivio/', 'metodo/', 'chi-siamo/', 'privacy/', 'note-legali/'];
const totale = PAGINE_FISSE.length + canzoni.length + artisti.length + album.length + raccolte.length;

console.log(`Pagine generate:   ${totale}`);
console.log(`  canzoni          ${canzoni.length}`);
console.log(`  artisti          ${artisti.length}`);
console.log(`  album            ${album.length}`);
console.log(`  raccolte         ${raccolte.length} (${generiPubblicati.length} generi, ${decenniPubblicati.length} decenni)`);
console.log(`  fisse            ${PAGINE_FISSE.length} (home, archivio, metodo, chi c'è dietro, privacy, note legali)`);
console.log('');
console.log(`Ganci scritti:     ${conGancio}/${canzoni.length}`);
console.log(`Destinazione:      ${OUT.replace(ROOT + '/', '')}/`);
