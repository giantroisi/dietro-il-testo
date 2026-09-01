#!/usr/bin/env node
// F75 — la metà automatica: non giudica se una fonte SOSTIENE ciò che la scheda
// le fa dire (quello richiede lettura, e resta a mano), ma verifica le tre cose
// che una macchina può vedere da sola:
//   1. la fonte risponde davvero;
//   2. non è finita altrove (redirect verso un'altra pagina);
//   3. su Wikipedia, non è una pagina di disambiguazione e non è la pagina di
//      un ALBUM citata come se fosse quella del brano.
// Nasce da due casi reali: `wish-you-were-here`, che citava una disambiguazione,
// e il sospetto (rivelatosi infondato) su `hotel-california`. Il terzo controllo
// legge la prima frase della voce, non l'indirizzo: `Hotel_California` è la
// pagina del brano pur senza "(song)" nel titolo.
//
// SERVE LA RETE. Non gira nella macchina del ponte, che non ce l'ha: va lanciato
// dal Mac (`node scripts/check-fonti.mjs`) o da una CI.
//
// Uso:
//   node scripts/check-fonti.mjs              report a schermo
//   node scripts/check-fonti.mjs --json       scrive anche dati/fonti-stato.json
//   node scripts/check-fonti.mjs --tutte      include anche kworb.net (di norma
//                                             escluso: serve al dato ascolti,
//                                             non sostiene affermazioni)
// Esce con codice 1 se trova fonti irraggiungibili o disambiguazioni.

import { readFileSync, writeFileSync } from 'node:fs';

const CONCORRENZA = 4;
const ATTESA_MS = 15000;
const UA = 'dietroiltesto-check-fonti/1.0 (verifica delle fonti citate; contatto: dietroiltesto.it)';

const soloTutte = process.argv.includes('--tutte');
const scriviJson = process.argv.includes('--json');

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));

// --- raccolta degli URL unici, con le schede che li citano
const perUrl = new Map();
for (const c of canzoni) {
  for (const f of c.fonti || []) {
    const url = (f.url || '').trim();
    if (!url) continue;
    if (!soloTutte && url.includes('kworb.net')) continue;
    if (!perUrl.has(url)) perUrl.set(url, { url, nome: f.nome || '', schede: [] });
    perUrl.get(url).schede.push(c.slug);
  }
}
const elenco = [...perUrl.values()];

// --- normalizzazione, per non chiamare "spostata" una fonte che è solo passata
// da http a https o ha perso una barra finale
function chiave(u) {
  try {
    const x = new URL(u);
    return (
      x.hostname.replace(/^www\./, '') +
      decodeURIComponent(x.pathname).replace(/\/$/, '').toLowerCase()
    );
  } catch {
    return u;
  }
}

const RE_DISAMBIGUA =
  /(may refer to:|might refer to:|<link[^>]+disambiguation|disambiguation pages|pagina di disambiguazione|puÃ² riferirsi a|può riferirsi a)/i;
// "è il terzo album in studio", "is the second studio album", "is an EP by"
const RE_ALBUM =
  /\bis (?:the |a |an |their )?[^.]{0,60}?(studio album|live album|compilation album|extended play|\bEP\b)\b|\bè (?:il|un|lo|la|una) [^.]{0,60}?(album (?:in studio|dal vivo)|EP)\b/i;
const RE_BRANO = /\bis a (?:\d{4} )?song\b|\bis a (?:\d{4} )?single\b|\bè un (?:brano|singolo)\b/i;

function primaFrase(html) {
  // prende il primo paragrafo del corpo voce, ripulito dai tag
  const m = html.match(/<p[^>]*>([\s\S]{0,1200}?)<\/p>/gi) || [];
  for (const p of m) {
    const t = p
      .replace(/<[^>]+>/g, '')
      .replace(/&#\d+;|&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (t.length > 60) return t.slice(0, 400);
  }
  return '';
}

async function controlla(voce) {
  const esito = { ...voce, stato: null, classe: 'ok', nota: '', finale: '' };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ATTESA_MS);
  try {
    const r = await fetch(voce.url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: 'text/html,*/*' },
    });
    esito.stato = r.status;
    esito.finale = r.url;
    if (!r.ok) {
      esito.classe = 'errore';
      esito.nota = `risponde ${r.status}`;
      return esito;
    }
    if (chiave(r.url) !== chiave(voce.url)) {
      esito.classe = 'spostata';
      esito.nota = `porta a ${r.url}`;
    }
    const html = (await r.text()).slice(0, 400000);
    const wiki = /(^|\.)wikipedia\.org$/.test(new URL(r.url).hostname);
    if (wiki) {
      if (RE_DISAMBIGUA.test(html)) {
        esito.classe = 'disambigua';
        esito.nota = 'pagina di disambiguazione: non contiene fatti sul brano';
        return esito;
      }
      const p = primaFrase(html);
      if (p && RE_ALBUM.test(p) && !RE_BRANO.test(p)) {
        esito.classe = 'altra-opera';
        esito.nota = `sembra la voce di un album, non del brano: «${p.slice(0, 140)}…»`;
      }
    }
  } catch (e) {
    esito.classe = 'errore';
    esito.nota = e.name === 'AbortError' ? `nessuna risposta in ${ATTESA_MS / 1000}s` : String(e.message || e);
  } finally {
    clearTimeout(t);
  }
  return esito;
}

// --- esecuzione a piccoli gruppi, per non martellare i server
const risultati = [];
let i = 0;
async function operaio() {
  while (i < elenco.length) {
    const mio = elenco[i++];
    risultati.push(await controlla(mio));
    if (risultati.length % 25 === 0) process.stderr.write(`  ${risultati.length}/${elenco.length}\n`);
  }
}
process.stderr.write(`Controllo ${elenco.length} fonti citate (${canzoni.length} schede)…\n`);
await Promise.all(Array.from({ length: CONCORRENZA }, operaio));

// --- report
const per = (cl) => risultati.filter((r) => r.classe === cl).sort((a, b) => a.url.localeCompare(b.url));
const errori = per('errore');
const disambigue = per('disambigua');
const altraOpera = per('altra-opera');
const spostate = per('spostata');

console.log(`\nFonti controllate: ${risultati.length}`);
console.log(`  in ordine: ${per('ok').length}`);
console.log(`  irraggiungibili o in errore: ${errori.length}`);
console.log(`  disambiguazioni: ${disambigue.length}`);
console.log(`  forse la voce di un'altra opera: ${altraOpera.length}`);
console.log(`  spostate altrove: ${spostate.length}`);

function stampa(titolo, elenco, grave) {
  if (!elenco.length) return;
  console.log(`\n${grave ? '✗' : '·'} ${titolo}`);
  for (const r of elenco) {
    console.log(`  ${r.url}`);
    console.log(`    ${r.nota}`);
    console.log(`    citata da: ${r.schede.join(', ')}`);
  }
}
stampa('Fonti che non rispondono — una scheda che le cita non ha quella fonte', errori, true);
stampa('Pagine di disambiguazione — non contengono fatti sul brano', disambigue, true);
stampa("Forse la voce di un'altra opera — da guardare, non da correggere a occhi chiusi", altraOpera, false);
stampa('Fonti spostate — l\'indirizzo citato non è più quello finale', spostate, false);

if (scriviJson) {
  writeFileSync('dati/fonti-stato.json', JSON.stringify({ quando: new Date().toISOString(), risultati }, null, 2));
  console.log('\nScritto dati/fonti-stato.json');
}

const gravi = errori.length + disambigue.length;
if (gravi) {
  console.log(`\n${gravi} fonti da sistemare prima di dire che il sito è "verificato su fonti citate".`);
  process.exit(1);
}
