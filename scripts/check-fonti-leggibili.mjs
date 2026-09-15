// `check-link` verifica che un collegamento RISPONDA. Non verifica che MOSTRI
// QUALCOSA. Sono due cose diverse, e la differenza la paga il lettore.
//
// Su `angel-of-death` una delle due fonti citate — una pagina di Rolling Stone
// — risponde regolarmente e poi scrive «non sei autorizzato»: il contenuto sta
// dietro un servizio a pagamento. Su `goodbye-malinconia` una delle due fonti
// e' una VIDEO-INTERVISTA, e a un video non si chiede una stringa. In sei
// schede del campione casuale ne ho trovate DUE cosi'. Per chi legge, una
// fonte che non si apre non e' una fonte: e' un indirizzo.
//
// Uso (richiede rete vera): node scripts/check-fonti-leggibili.mjs
//
// ---------------------------------------------------------------------------
// PERCHE' QUESTO CONTROLLO NON GIRA DOVE GIRANO GLI ALTRI.
// Provato dall'ambiente in cui lavoro io, ha risposto **403 su 967 fonti su
// 968**, da 169 domini diversi. Non e' un risultato: e' il proxy che rifiuta
// il tunnel, e infatti fallisce anche su Wikipedia. Un esito uniforme su 169
// domini e' sempre l'ambiente, mai il mondo — e se l'avessi scritto nel
// registro sarebbe stato l'errore di misura piu' grosso della settimana.
// Questo script va lanciato DAL TERMINALE VERO, dove la rete c'e'.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync } from 'node:fs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));

const fonti = [];
for (const c of canzoni) for (const f of c.fonti || []) fonti.push({ dove: `canzone/${c.slug}`, nome: f.nome || '', url: f.url || '' });
for (const a of artisti) for (const f of a.fonti || []) fonti.push({ dove: `artista/${a.slug}`, nome: f.nome || '', url: f.url || '' });

// kworb e Spotify non sono citazioni da leggere: sono fonti di dati d'ascolto.
const DATI = /kworb\.net|open\.spotify\.com/;
// Un video non si controlla per stringa, ne' da noi ne' dal lettore.
const VIDEO = /(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|tiktok\.com|instagram\.com\/(p|reel)|facebook\.com\/watch)/i;
// La pagina risponde e poi dice che non puoi leggerla.
const MURO = /(you are not authorized|valid tollbit token|subscribe to continue|abbonati per continuare|per continuare a leggere|contenuto riservato|registrati per leggere|paywall|access denied|403 forbidden|verify you are human|captcha)/i;

const daProvare = [...new Map(fonti.filter((f) => /^https?:/.test(f.url) && !DATI.test(f.url)).map((f) => [f.url, f])).values()];

async function prova(f) {
  if (VIDEO.test(f.url)) return { ...f, tipo: 'VIDEO' };
  try {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 20000);
    const r = await fetch(f.url, { signal: c.signal, redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' } });
    clearTimeout(t);
    const corpo = await r.text();
    const testo = corpo.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!r.ok) return { ...f, tipo: `STATO ${r.status}` };
    if (MURO.test(corpo)) return { ...f, tipo: 'MURO' };
    if (testo.length < 600) return { ...f, tipo: 'QUASI VUOTA' };
    return { ...f, tipo: 'ok' };
  } catch (e) {
    return { ...f, tipo: 'NON RAGGIUNTA' };
  }
}

const esito = [];
const coda = [...daProvare];
let n = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (coda.length) {
    esito.push(await prova(coda.shift()));
    if (++n % 50 === 0) process.stderr.write(`  ${n}/${daProvare.length}\n`);
  }
}));

const problemi = esito.filter((e) => e.tipo !== 'ok');
const per = {};
for (const e of esito) per[e.tipo] = (per[e.tipo] || 0) + 1;

console.log(`\nFonti citate da leggere: ${daProvare.length} (escluse ${fonti.length - daProvare.length} fra dati d'ascolto e duplicati)\n`);
for (const [k, v] of Object.entries(per).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);

const ok = per.ok || 0;
if (ok / daProvare.length < 0.5) {
  console.log(`\n⚠️  MENO DELLA META' DELLE FONTI RISULTA LEGGIBILE.`);
  console.log(`Prima di crederci: un esito cosi' uniforme e' quasi sempre la RETE DI CHI LANCIA,`);
  console.log(`non le fonti. Prova "curl -I https://en.wikipedia.org": se fallisce anche quello,`);
  console.log(`il numero qui sopra non dice niente sul sito.\n`);
} else {
  console.log(`\nDa guardare, una per una:\n`);
  for (const p of problemi.sort((a, b) => a.tipo.localeCompare(b.tipo))) {
    console.log(`  ${p.tipo.padEnd(14)} ${p.dove.padEnd(36)} ${p.url.slice(0, 70)}`);
  }
  console.log(`
Una fonte che non si apre non e' una fonte: e' un indirizzo. Per ciascuna,
o si trova una pagina leggibile che dica la stessa cosa, o l'affermazione che
ci poggia sopra va attenuata.
`);
}
writeFileSync('dati/fonti-leggibili.json', JSON.stringify(problemi, null, 1));
