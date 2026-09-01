#!/usr/bin/env node
// F18 — cerca su Wikimedia Commons le foto degli artisti la cui licenza sia
// LIBERA E DIMOSTRABILE, e ne raccoglie la prova.
//
// Perche' uno script e non una ricerca a mano: la licenza di un file su Commons
// e' un dato strutturato (`extmetadata`), non una frase da interpretare. Farla
// leggere a qualcuno che "guarda la pagina" e' il modo piu' facile per prendere
// una foto promozionale non libera credendola libera. Qui la licenza si legge
// dal campo, e cio' che non e' esplicitamente accettato viene scartato.
//
// COSA ACCETTA: CC0, pubblico dominio, CC BY, CC BY-SA (qualsiasi versione).
// COSA RIFIUTA, sempre e senza eccezioni: qualunque licenza con NC (non
// commerciale) o ND (no derivate) — ridimensionare un'immagine e' gia' un'opera
// derivata —, i file "fair use", e tutto cio' che non dichiara una licenza
// riconosciuta. Nel dubbio scarta: per questo sito niente immagine e' meglio di
// un'immagine dubbia (P1 vale anche per le figure).
//
// SERVE LA RETE: non gira nella macchina del ponte. Va lanciato dal Mac.
//
// Uso:
//   node scripts/cerca-ritratti.mjs                 tutti gli artisti del sito
//   node scripts/cerca-ritratti.mjs slug1 slug2 …   solo questi
//   node scripts/cerca-ritratti.mjs --limite 20     i 20 artisti con piu' schede
//
// Scrive dati/ritratti-candidati.json e stampa un riepilogo. NON tocca i dati
// del sito: la scelta di quale candidato usare resta una decisione umana.

import { readFileSync, writeFileSync } from 'node:fs';

const UA = 'dietroiltesto-ritratti/1.0 (verifica licenze immagini; dietroiltesto.it)';
const API = 'https://commons.wikimedia.org/w/api.php';

const LICENZE_BUONE = [
  /^cc0/i, /^cc[- ]?by(?:[- ]?sa)?[- ]?\d/i, /^public domain/i, /^pd[- ]/i,
  /^attribution$/i, /^attribution[- ]sharealike/i,
];
const LICENZE_VIETATE = [/\bnc\b/i, /noncommercial/i, /\bnd\b/i, /noderiv/i, /fair use/i, /non-free/i];

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

function accettabile(m) {
  const testo = [m.LicenseShortName, m.UsageTerms, m.License].map((x) => pulisci(x && x.value)).join(' | ');
  if (!testo.trim()) return { ok: false, perche: 'nessuna licenza dichiarata' };
  if (LICENZE_VIETATE.some((r) => r.test(testo))) return { ok: false, perche: `licenza non usabile: ${testo}` };
  if (!LICENZE_BUONE.some((r) => r.test(pulisci(m.LicenseShortName && m.LicenseShortName.value)) ||
                                 r.test(pulisci(m.License && m.License.value))))
    return { ok: false, perche: `licenza non riconosciuta: ${testo}` };
  return { ok: true, testo };
}

async function cerca(nome) {
  const p = new URLSearchParams({
    action: 'query', format: 'json', origin: '*',
    generator: 'search', gsrsearch: `${nome} filetype:bitmap`, gsrnamespace: '6', gsrlimit: '25',
    prop: 'imageinfo', iiprop: 'url|size|extmetadata',
  });
  const r = await fetch(`${API}?${p}`, { headers: { 'user-agent': UA } });
  if (!r.ok) throw new Error(`Commons risponde ${r.status}`);
  const d = await r.json();
  return Object.values((d.query && d.query.pages) || {});
}

const esito = [];
for (const a of elenco) {
  process.stderr.write(`${a.nome}… `);
  let pagine = [];
  try { pagine = await cerca(a.nome); }
  catch (e) { process.stderr.write(`errore: ${e.message}\n`); esito.push({ slug: a.slug, nome: a.nome, errore: String(e.message), candidati: [] }); continue; }

  const buoni = [];
  for (const p of pagine) {
    const ii = (p.imageinfo || [])[0];
    if (!ii) continue;
    const m = ii.extmetadata || {};
    const giudizio = accettabile(m);
    if (!giudizio.ok) continue;
    // scarta il minuscolo e i formati che non sono foto
    if ((ii.width || 0) < 600) continue;
    if (!/\.(jpe?g|png)$/i.test(p.title)) continue;
    buoni.push({
      titolo: p.title,
      paginaFile: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title.replace(/ /g, '_'))}`,
      originale: ii.url,
      larghezza: ii.width, altezza: ii.height,
      autore: pulisci(m.Artist && m.Artist.value) || '(non indicato)',
      licenza: pulisci(m.LicenseShortName && m.LicenseShortName.value),
      licenzaUrl: pulisci(m.LicenseUrl && m.LicenseUrl.value),
      descrizione: pulisci(m.ImageDescription && m.ImageDescription.value).slice(0, 160),
      data: pulisci(m.DateTimeOriginal && m.DateTimeOriginal.value).slice(0, 40),
      prova: giudizio.testo,
    });
  }
  buoni.sort((x, y) => y.larghezza * y.altezza - x.larghezza * x.altezza);
  esito.push({ slug: a.slug, nome: a.nome, schede: quante[a.slug] || 0, candidati: buoni.slice(0, 5) });
  process.stderr.write(`${buoni.length} candidati liberi\n`);
  await new Promise((r) => setTimeout(r, 400)); // gentili con Commons
}

writeFileSync('dati/ritratti-candidati.json', JSON.stringify({ quando: new Date().toISOString(), esito }, null, 2));

const conCandidati = esito.filter((e) => e.candidati.length);
console.log(`\nArtisti esaminati: ${esito.length}`);
console.log(`Con almeno un'immagine libera e verificabile: ${conCandidati.length}`);
console.log(`Senza nessuna immagine libera: ${esito.length - conCandidati.length}`);
console.log('\nPrimo candidato per artista:');
for (const e of esito) {
  const c = e.candidati[0];
  console.log(c
    ? `  ${e.slug}\n      ${c.titolo}\n      ${c.licenza} — ${c.autore}\n      ${c.larghezza}x${c.altezza}  ${c.paginaFile}`
    : `  ${e.slug}\n      nessuna immagine libera trovata`);
}
console.log('\nScritto dati/ritratti-candidati.json. Nessun dato del sito e stato modificato:');
console.log('la scelta di quale candidato usare, e se usarlo, resta una decisione umana.');
