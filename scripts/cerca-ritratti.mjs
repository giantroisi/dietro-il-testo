#!/usr/bin/env node
// F18 — cerca su Wikimedia Commons le foto degli artisti la cui licenza sia
// LIBERA E DIMOSTRABILE, e ne raccoglie la prova.
//
// Due controlli indipendenti, e servono entrambi.
//
// 1) LA LICENZA si legge dal campo strutturato di Commons (`extmetadata`), non
//    da una frase da interpretare. Accetta CC0, pubblico dominio, CC BY e
//    CC BY-SA; scarta SEMPRE tutto cio' che contiene NC o ND — ridimensionare
//    un'immagine e' gia' un'opera derivata —, i file «fair use» e qualunque
//    licenza non riconosciuta.
//
// 2) IL SOGGETTO si prende dalla CATEGORIA Commons dell'artista, non da una
//    ricerca a testo libero. Il primo giro reale (1 settembre) cercava per
//    nome e restituiva, con licenza impeccabile, un treno giapponese per gli
//    «883», un fungo del museo di Trento per i «Muse» e una via di San
//    Francisco per i «Green Day»: la ricerca testuale trova le parole, non le
//    persone. La categoria invece e' una dichiarazione fatta da un umano su
//    cosa c'e' dentro l'immagine. La categoria si ricava da Wikidata, non si
//    indovina dal nome.
//
// Restano segnalati, non scartati, i casi in cui la foto ritrae **un'opera di
// qualcun altro** — murales, statue, manifesti, copertine: li' la licenza del
// fotografo non basta, perche' sotto c'e' un secondo diritto d'autore. Vanno
// guardati da una persona.
//
// SERVE LA RETE: non gira nella macchina del ponte. Va lanciato dal Mac.
//
// Uso:
//   node scripts/cerca-ritratti.mjs                 tutti gli artisti
//   node scripts/cerca-ritratti.mjs slug1 slug2 …   solo questi
//   node scripts/cerca-ritratti.mjs --limite 20     i 20 con piu' schede
//
// Scrive dati/ritratti-candidati.json. NON tocca i dati del sito.

import { readFileSync, writeFileSync } from 'node:fs';

const UA = 'dietroiltesto-ritratti/1.1 (verifica licenze immagini; dietroiltesto.it)';
const COMMONS = 'https://commons.wikimedia.org/w/api.php';
const WIKIDATA = 'https://www.wikidata.org/w/api.php';
const PAUSA = 1500;

const LICENZE_BUONE = [/^cc0/i, /^cc[- ]?by(?:[- ]?sa)?[- ]?\d/i, /^public domain/i, /^pd[- ]/i, /^attribution/i];
const LICENZE_VIETATE = [/\bnc\b/i, /noncommercial/i, /\bnd\b/i, /noderiv/i, /fair use/i, /non-free/i];
// Non scartano: segnalano. Sotto la foto c'e' un'opera di qualcun altro, e la
// licenza del fotografo non copre quella.
const OPERA_ALTRUI = /\b(mural|murale|graffiti|street art|statue|statua|monument|monumento|poster|manifesto|cover|copertina|artwork|logo|billboard|cartellone|waxwork|madame tussauds)\b/i;
// Non e' una foto della band. Nelle categorie Commons finisce di tutto: un
// Boeing con la livrea GNAIR dentro «Guns N' Roses», un ponte dentro «Black
// Sabbath», un sergente omonimo dentro «Michael Jackson». Tutti veri, primo
// settembre, tutti in cima perche' erano le immagini piu' grandi.
const NON_E_LA_BAND = /\b(bridge|ponte|plaque|targa|sign|insegna|street|via|road|airport|aeroporto|boeing|airbus|aircraft|aereo|train|treno|station|stazione|museum|museo|mushroom|fungo|building|edificio|church|chiesa|stadium|stadio|arena|hotel|restaurant|map|mappa|flag|bandiera|coin|moneta|stamp|francobollo)\b/i;
// Non e' una FOTO: e' un oggetto che riguarda la band. Dischi, biglietti,
// vinili, cartonati pubblicitari, impronte delle mani, collage montati da piu'
// foto. Trovati tutti nel terzo giro: per i Deep Purple i primi tre candidati
// erano un disco, un biglietto del 1991 e una collezione di vinili.
const NON_E_UNA_FOTO = /\b(disc|disco|dischi|discos|record|records|vinyl|vinile|vinili|cole[cç][ãa]o|colecao|ticket|biglietto|jegy|collezione|collection|carton|cartonato|publicitaire|advertis|merchandis|memorabilia|gadget|handprint|impronte|footprint|montage|tribute|gedenk|memorial|shrine|grave|tomba|setlist|autograph|autografo|firma|signature)\b/i;
// Parole troppo distintive per aver bisogno dei confini di parola, e che nei
// nomi dei file arrivano spesso attaccate al resto: «IronMaidencollage.jpg» e
// «Metallica My Apocalypse waveform.png», entrambe prime in classifica il
// 1 settembre perche' `\bcollage\b` non trova «Maidencollage».
const NON_E_UNA_FOTO_ATTACCATA = /(collage|waveform|spectrogram|spettrogramma|sonogram|wordmark|screenshot|diagram|gedenk|denkmal)/i;
// La foto e' scattata al concerto di X, ma ritrae CHI APRIVA. Il nome della
// band e' nel titolo, quindi il punteggio sul nome la premiava: per Metallica
// i primi tre candidati erano Knocked Loose, Phil Anselmo e Rex Brown, tutti
// con «premiere partie de Metallica» nel titolo.
const NON_E_LORO = /(premi[eè]re partie|opening (?:act|for)|support(?:ing| act)|vorgruppe|telonero|apre per)/i;
// Un omonimo. Per «Michael Jackson» il primo candidato era un sergente
// dell'aeronautica americana con lo stesso nome, e la foto era la piu' grande
// di tutta la categoria.
const OMONIMO = /\b(air force|army|navy|sergeant|sgt|senior master|airman|regiment|squadron|politic|senator|deputy|professor|bishop)\b/i;
const MUSICALE = /(band|gruppo|musical|music|cantante|singer|rapper|dj|musicist|rock|pop|metal|duo|complesso)/i;

const args = process.argv.slice(2);
const iLim = args.indexOf('--limite');
const limite = iLim > -1 ? Number(args[iLim + 1]) : 0;
const slugRichiesti = args.filter((a, i) => !a.startsWith('--') && !(iLim > -1 && i === iLim + 1));

const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));
const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const quante = {};
for (const c of canzoni) quante[c.artistaSlug] = (quante[c.artistaSlug] || 0) + 1;

let elenco = artisti.slice();
if (slugRichiesti.length) elenco = elenco.filter((a) => slugRichiesti.includes(a.slug));
elenco.sort((a, b) => (quante[b.slug] || 0) - (quante[a.slug] || 0) || a.nome.localeCompare(b.nome, 'it'));
if (limite) elenco = elenco.slice(0, limite);

const pulisci = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const attesa = (ms) => new Promise((r) => setTimeout(r, ms));

async function json(url, tentativi = 5) {
  for (let i = 0; i < tentativi; i++) {
    const r = await fetch(url, { headers: { 'user-agent': UA } });
    // Attesa che raddoppia: 4s, 8s, 16s, 32s. Un limite di richieste non e' un
    // errore da segnalare, e' un'istruzione da rispettare.
    if (r.status === 429 || r.status === 503) { await attesa(4000 * 2 ** i); continue; }
    if (!r.ok) throw new Error(`risponde ${r.status}`);
    return r.json();
  }
  throw new Error('Commons continua a limitare le richieste anche rallentando');
}

// --- 1. dal nome dell'artista alla categoria Commons, passando da Wikidata
async function categoriaDi(nome) {
  const p = new URLSearchParams({ action: 'wbsearchentities', search: nome, language: 'it', uselang: 'it', type: 'item', limit: '8', format: 'json', origin: '*' });
  const d = await json(`${WIKIDATA}?${p}`);
  const scelte = (d.search || []).filter((x) => MUSICALE.test(`${x.description || ''} ${x.label || ''}`));
  const cand = (scelte.length ? scelte : d.search || []).slice(0, 3);
  for (const c of cand) {
    const p2 = new URLSearchParams({ action: 'wbgetentities', ids: c.id, props: 'claims|sitelinks|descriptions', format: 'json', origin: '*' });
    const e = await json(`${WIKIDATA}?${p2}`);
    const ent = e.entities && e.entities[c.id];
    if (!ent) continue;
    const p373 = ent.claims && ent.claims.P373 && ent.claims.P373[0];
    const daClaim = p373 && p373.mainsnak && p373.mainsnak.datavalue && p373.mainsnak.datavalue.value;
    const daSitelink = ent.sitelinks && ent.sitelinks.commonswiki && ent.sitelinks.commonswiki.title;
    const cat = daClaim ? `Category:${daClaim}` : (daSitelink && /^Category:/.test(daSitelink) ? daSitelink : null);
    const descr = (ent.descriptions && (ent.descriptions.it || ent.descriptions.en) || {}).value || c.description || '';
    if (cat) return { cat, id: c.id, descrizione: descr };
    await attesa(200);
  }
  return null;
}

// --- 2. i file della categoria, con licenza e misure, in UNA sola richiesta.
// Il giro precedente ne faceva otto per artista e Commons ha risposto 429 su
// dodici artisti su venti: `generator=categorymembers` unito a `prop=imageinfo`
// chiede la stessa cosa una volta sola.
async function fileDellaCategoria(cat) {
  const p = new URLSearchParams({
    action: 'query', format: 'json', origin: '*',
    generator: 'categorymembers', gcmtitle: cat, gcmtype: 'file', gcmlimit: '120',
    prop: 'imageinfo', iiprop: 'url|size|extmetadata',
  });
  const d = await json(`${COMMONS}?${p}`);
  return Object.values((d.query && d.query.pages) || {});
}

function licenzaOk(m) {
  const testo = [m.LicenseShortName, m.UsageTerms, m.License].map((x) => pulisci(x && x.value)).join(' | ');
  if (!testo.trim()) return { ok: false };
  if (LICENZE_VIETATE.some((r) => r.test(testo))) return { ok: false };
  const breve = pulisci(m.LicenseShortName && m.LicenseShortName.value);
  const codice = pulisci(m.License && m.License.value);
  if (!LICENZE_BUONE.some((r) => r.test(breve) || r.test(codice))) return { ok: false };
  return { ok: true, testo };
}

const esito = [];
for (const a of elenco) {
  process.stderr.write(`${a.nome}… `);
  try {
    const c = await categoriaDi(a.nome);
    if (!c) { process.stderr.write('nessuna categoria Commons\n'); esito.push({ slug: a.slug, nome: a.nome, schede: quante[a.slug] || 0, categoria: null, candidati: [] }); await attesa(PAUSA); continue; }
    await attesa(PAUSA);
    const pagine = (await fileDellaCategoria(c.cat)).filter((p) => /\.(jpe?g|png)$/i.test(p.title || ''));
    const buoni = [];
    for (const p of pagine) {
      const ii = (p.imageinfo || [])[0]; if (!ii) continue;
      const m = ii.extmetadata || {};
      const g = licenzaOk(m); if (!g.ok) continue;
      if ((ii.width || 0) < 700) continue;
      const testo = `${p.title} ${pulisci(m.ImageDescription && m.ImageDescription.value)}`;
      const parole = a.nome.toLowerCase().split(/[^a-z0-9à-ÿ]+/).filter((w) => w.length > 2);
      const minusc = testo.toLowerCase();
      const quanteParole = parole.filter((w) => minusc.includes(w)).length;
      // Il nome dell'artista nel titolo o nella descrizione vale piu' della
      // dimensione: ordinare per pixel metteva in cima l'aeroplano.
      let punti = parole.length ? (quanteParole / parole.length) * 4 : 0;
      if (NON_E_LA_BAND.test(testo)) punti -= 3;
      if (NON_E_UNA_FOTO.test(testo) || NON_E_UNA_FOTO_ATTACCATA.test(testo)) punti -= 3;
      if (NON_E_LORO.test(testo)) punti -= 5;   // il nome c'e' ma ritrae un altro
      if (OMONIMO.test(testo)) punti -= 5;
      if (OPERA_ALTRUI.test(testo)) punti -= 2;
      buoni.push({
        titolo: p.title,
        punti: Math.round(punti * 100) / 100,
        paginaFile: `https://commons.wikimedia.org/wiki/${p.title.replace(/ /g, '_')}`,
        originale: ii.url, larghezza: ii.width, altezza: ii.height,
        autore: pulisci(m.Artist && m.Artist.value) || '(non indicato)',
        licenza: pulisci(m.LicenseShortName && m.LicenseShortName.value),
        licenzaUrl: pulisci(m.LicenseUrl && m.LicenseUrl.value),
        descrizione: pulisci(m.ImageDescription && m.ImageDescription.value).slice(0, 180),
        prova: g.testo,
        attenzione:
          NON_E_LORO.test(testo) ? 'sembra la band che APRIVA il concerto, non quella del titolo'
          : OMONIMO.test(testo) ? 'sembra un omonimo, non il musicista'
          : OPERA_ALTRUI.test(testo) ? "ritrae un'opera di qualcun altro (murales, statua, manifesto): la licenza del fotografo non basta"
          : (NON_E_UNA_FOTO.test(testo) || NON_E_UNA_FOTO_ATTACCATA.test(testo)) ? "sembra un oggetto o un'immagine tecnica (disco, biglietto, collage, forma d'onda), non una foto della band"
          : NON_E_LA_BAND.test(testo) ? 'il titolo dice che potrebbe non essere una foto della band'
          : null,
      });
    }
    buoni.sort((x, y) => y.punti - x.punti || y.larghezza * y.altezza - x.larghezza * x.altezza);
    esito.push({ slug: a.slug, nome: a.nome, schede: quante[a.slug] || 0, categoria: c.cat, wikidata: c.id, descrizione: c.descrizione, candidati: buoni.slice(0, 12) });
    process.stderr.write(`${c.cat} → ${buoni.length} liberi\n`);
  } catch (e) {
    process.stderr.write(`errore: ${e.message}\n`);
    esito.push({ slug: a.slug, nome: a.nome, errore: String(e.message), candidati: [] });
  }
  await attesa(PAUSA);
}

writeFileSync('dati/ritratti-candidati.json', JSON.stringify({ quando: new Date().toISOString(), esito }, null, 2));

const con = esito.filter((e) => e.candidati.length);
console.log(`\nArtisti esaminati: ${esito.length}`);
console.log(`Con almeno un'immagine libera nella propria categoria: ${con.length}`);
console.log(`Senza: ${esito.length - con.length}`);
console.log('\nPrimo candidato per artista:');
for (const e of esito) {
  const c = e.candidati[0];
  if (!c) { console.log(`  ${e.slug}\n      nessuna immagine libera — ${e.errore || (e.categoria ? 'categoria senza file liberi' : 'nessuna categoria Commons')}`); continue; }
  console.log(`  ${e.slug}   [${e.categoria}]  ${e.candidati.length} candidati`);
  for (const x of e.candidati.slice(0, 3)) {
    console.log(`      ${x.titolo.replace(/^File:/, '')}`);
    console.log(`         ${x.licenza} — ${x.autore}   ${x.larghezza}x${x.altezza}${x.attenzione ? '   ⚠ ' + x.attenzione : ''}`);
  }
}
console.log('\nScritto dati/ritratti-candidati.json. Nessun dato del sito e stato modificato.');
