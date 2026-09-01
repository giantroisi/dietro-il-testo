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
const PAUSA = 700;

const LICENZE_BUONE = [/^cc0/i, /^cc[- ]?by(?:[- ]?sa)?[- ]?\d/i, /^public domain/i, /^pd[- ]/i, /^attribution/i];
const LICENZE_VIETATE = [/\bnc\b/i, /noncommercial/i, /\bnd\b/i, /noderiv/i, /fair use/i, /non-free/i];
// Non scartano: segnalano. Sotto la foto c'e' un'opera di qualcun altro.
const OPERA_ALTRUI = /\b(mural|murale|graffiti|street art|statue|statua|monument|monumento|poster|manifesto|cover|copertina|artwork|logo|billboard|cartellone|waxwork|madame tussauds)\b/i;
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

async function json(url, tentativi = 3) {
  for (let i = 0; i < tentativi; i++) {
    const r = await fetch(url, { headers: { 'user-agent': UA } });
    if (r.status === 429) { await attesa(3000 * (i + 1)); continue; }
    if (!r.ok) throw new Error(`risponde ${r.status}`);
    return r.json();
  }
  throw new Error('429 ripetuto: Commons sta limitando le richieste');
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

// --- 2. i file dentro quella categoria (e un livello di sottocategorie)
async function fileDellaCategoria(cat) {
  const titoli = new Set();
  const sotto = [];
  const p = new URLSearchParams({ action: 'query', format: 'json', origin: '*', list: 'categorymembers', cmtitle: cat, cmlimit: '200', cmtype: 'file|subcat' });
  const d = await json(`${COMMONS}?${p}`);
  for (const m of (d.query && d.query.categorymembers) || []) {
    if (m.ns === 6) titoli.add(m.title);
    else if (m.ns === 14) sotto.push(m.title);
  }
  for (const sc of sotto.slice(0, 4)) {
    await attesa(PAUSA);
    const p2 = new URLSearchParams({ action: 'query', format: 'json', origin: '*', list: 'categorymembers', cmtitle: sc, cmlimit: '120', cmtype: 'file' });
    const d2 = await json(`${COMMONS}?${p2}`);
    for (const m of (d2.query && d2.query.categorymembers) || []) titoli.add(m.title);
  }
  return [...titoli];
}

async function informazioni(titoli) {
  const fuori = [];
  for (let i = 0; i < titoli.length; i += 40) {
    const lotto = titoli.slice(i, i + 40);
    const p = new URLSearchParams({ action: 'query', format: 'json', origin: '*', titles: lotto.join('|'), prop: 'imageinfo', iiprop: 'url|size|extmetadata' });
    const d = await json(`${COMMONS}?${p}`);
    fuori.push(...Object.values((d.query && d.query.pages) || {}));
    await attesa(PAUSA);
  }
  return fuori;
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
    const titoli = await fileDellaCategoria(c.cat);
    const pagine = await informazioni(titoli.filter((t) => /\.(jpe?g|png)$/i.test(t)).slice(0, 160));
    const buoni = [];
    for (const p of pagine) {
      const ii = (p.imageinfo || [])[0]; if (!ii) continue;
      const m = ii.extmetadata || {};
      const g = licenzaOk(m); if (!g.ok) continue;
      if ((ii.width || 0) < 700) continue;
      const testo = `${p.title} ${pulisci(m.ImageDescription && m.ImageDescription.value)}`;
      buoni.push({
        titolo: p.title,
        paginaFile: `https://commons.wikimedia.org/wiki/${p.title.replace(/ /g, '_')}`,
        originale: ii.url, larghezza: ii.width, altezza: ii.height,
        autore: pulisci(m.Artist && m.Artist.value) || '(non indicato)',
        licenza: pulisci(m.LicenseShortName && m.LicenseShortName.value),
        licenzaUrl: pulisci(m.LicenseUrl && m.LicenseUrl.value),
        descrizione: pulisci(m.ImageDescription && m.ImageDescription.value).slice(0, 180),
        prova: g.testo,
        attenzione: OPERA_ALTRUI.test(testo) ? "ritrae un'opera di qualcun altro (murales, statua, manifesto): la licenza del fotografo non basta" : null,
      });
    }
    buoni.sort((x, y) => (x.attenzione ? 1 : 0) - (y.attenzione ? 1 : 0) || y.larghezza * y.altezza - x.larghezza * x.altezza);
    esito.push({ slug: a.slug, nome: a.nome, schede: quante[a.slug] || 0, categoria: c.cat, wikidata: c.id, descrizione: c.descrizione, candidati: buoni.slice(0, 6) });
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
  console.log(`  ${e.slug}   [${e.categoria}]`);
  console.log(`      ${c.titolo}`);
  console.log(`      ${c.licenza} — ${c.autore}   ${c.larghezza}x${c.altezza}`);
  if (c.attenzione) console.log(`      ATTENZIONE: ${c.attenzione}`);
}
console.log('\nScritto dati/ritratti-candidati.json. Nessun dato del sito e stato modificato.');
