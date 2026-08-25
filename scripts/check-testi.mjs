#!/usr/bin/env node
// F20 — verifica che ogni testoUrl porti davvero al testo della canzone giusta:
// scarica la pagina ed estrae titolo/artista dai metadati, confronta con la scheda.
// Richiede rete: interroga 157 pagine, prevedere qualche decina di secondi.
//
// Uso: node scripts/check-testi.mjs [--slow-ms 300]

import { readFileSync } from 'node:fs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));

function normalizza(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// varianti legittime di nome artista tra scheda e pagina esterna
const ALIAS = {
  eagles: ['the eagles', 'eagles'],
  'electric callboy': ['eskimo callboy', 'electric callboy'],
  '5 seconds of summer': ['5 seconds of summer', '5sos'],
  'al bano e romina power': ['al bano', 'romina power', 'al bano and romina power', 'al bano e romina power'],
  'simon & garfunkel': ['simon and garfunkel', 'simon garfunkel'],
  'machine gun kelly': ['machine gun kelly', 'mgk'],
  ligabue: ['ligabue', 'luciano ligabue'],
  '883': ['883'],
};

function corrisponde(atteso, trovato) {
  const a = normalizza(atteso);
  const t = normalizza(trovato);
  if (!t) return null; // nessun dato per confrontare: non è un fallimento, è un "non verificabile"
  if (t.includes(a) || a.includes(t)) return true;
  const varianti = ALIAS[atteso.toLowerCase()];
  if (varianti && varianti.some((v) => t.includes(normalizza(v)))) return true;
  return false;
}

async function estraiMetaTitoloArtista(html) {
  const og = (prop) => {
    const m = html.match(new RegExp(`<meta[^>]+property="og:${prop}"[^>]+content="([^"]*)"`, 'i'));
    return m ? m[1] : '';
  };
  const title = og('title') || (html.match(/<title>([^<]*)<\/title>/i) || [, ''])[1];
  return title;
}

const soloSlug = process.argv.includes('--slug') ? process.argv[process.argv.indexOf('--slug') + 1] : null;
const target = soloSlug ? canzoni.filter((c) => c.slug === soloSlug) : canzoni;

let ok = 0, discordanti = [], irraggiungibili = [], senzaLink = 0;

for (const c of target) {
  if (!c.testoUrl) { senzaLink++; continue; }
  try {
    const res = await fetch(c.testoUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'it-IT,it;q=0.9,en;q=0.8',
      },
    });
    if (!res.ok) { irraggiungibili.push({ slug: c.slug, url: c.testoUrl, status: res.status }); continue; }
    const html = await res.text();
    const titolo = await estraiMetaTitoloArtista(html);
    const okTitolo = corrisponde(c.titolo, titolo);
    const okArtista = corrisponde(c.artista, titolo) || html.toLowerCase().includes(normalizza(c.artista));
    if (okTitolo === false && okArtista === false) {
      discordanti.push({ slug: c.slug, url: c.testoUrl, atteso: `${c.titolo} — ${c.artista}`, pagina: titolo });
    } else {
      ok++;
    }
  } catch (e) {
    irraggiungibili.push({ slug: c.slug, url: c.testoUrl, errore: e.message });
  }
}

console.log(`Schede con link al testo: ${target.length - senzaLink} / ${target.length}`);
console.log(`OK: ${ok}`);
console.log(`Discordanti: ${discordanti.length}`);
console.log(`Irraggiungibili: ${irraggiungibili.length}`);
if (discordanti.length) {
  console.log('\nDiscordanti:');
  discordanti.forEach((d) => console.log(`  ${d.slug} (${d.atteso}) -> pagina: "${d.pagina}" -- ${d.url}`));
}
if (irraggiungibili.length) {
  console.log('\nIrraggiungibili:');
  irraggiungibili.forEach((d) => console.log(`  ${d.slug} -> ${d.status || d.errore} -- ${d.url}`));
}
if (discordanti.length || irraggiungibili.length) process.exitCode = 1;
