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
//   node scripts/check-fonti.mjs --senza-registro   non scrive dati/fonti-stato.json
//                                             (di norma il registro si scrive sempre)
//   node scripts/check-fonti.mjs --tutte      include anche kworb.net (di norma
//                                             escluso: serve al dato ascolti,
//                                             non sostiene affermazioni)
// Esce con codice 1 se trova fonti irraggiungibili o disambiguazioni. Le pagine
// che rispondono 403 o 429 NON contano come morte: molte sono vive e bloccano
// solo i programmi. Finiscono in una classe a parte, da aprire in un browser
// vero prima di toccare la scheda — lezione del primo giro reale, 1 settembre.

import { readFileSync, writeFileSync } from 'node:fs';

const CONCORRENZA = 4;
const ATTESA_MS = 15000;
const UA = 'dietroiltesto-check-fonti/1.0 (verifica delle fonti citate; contatto: dietroiltesto.it)';

const soloTutte = process.argv.includes('--tutte');
// Il registro si scrive SEMPRE, salvo richiesta contraria: senza, i numeri di
// un giro non sono più ricostruibili il giorno dopo — ed è già successo.
const scriviJson = !process.argv.includes('--senza-registro');

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));

// --- raccolta degli URL unici, con le schede che li citano
const perUrl = new Map();
for (const c of canzoni) {
  for (const f of c.fonti || []) {
    const url = (f.url || '').trim();
    if (!url) continue;
    if (!soloTutte && url.includes('kworb.net')) continue;
    if (!perUrl.has(url)) perUrl.set(url, { url, nome: f.nome || '', ruolo: f.ruolo || '', schede: [] });
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
// Larga di proposito: la prima versione chiedeva "is a song" letterale e
// bocciava «"War Pigs" is an anti-war protest song», che è la voce giusta.
const RE_BRANO =
  /\bis (?:a|an|the)\b[^.]{0,80}?\b(song|single|track|instrumental|ballad)\b|\bè (?:un|uno|una|il|lo|la)\b[^.]{0,80}?\b(brano|singolo|canzone)\b/i;

// Prende i primi paragrafi veri della voce. Uno solo non basta: su `Non c'è`
// il primo utile parlava di una raccolta del 2001 e la voce veniva scambiata
// per quella di un album, mentre l'incipit («is a song by Laura Pausini») era
// più sotto. Tre paragrafi bastano a non sbagliare e restano pochi da leggere.
function paragrafi(html, quanti = 3) {
  // Niente tetto di lunghezza: la prima versione si fermava a 1500 caratteri
  // e i paragrafi piu' lunghi non venivano proprio riconosciuti. Su Wikipedia
  // l'incipit e' quasi sempre il paragrafo piu' lungo della voce: lo scartavo
  // in silenzio e leggevo il secondo, che parla d'altro. Il non-greedy si
  // ferma comunque al primo </p>.
  const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const out = [];
  for (const p of m) {
    const t = p
      .replace(/<[^>]+>/g, '')
      .replace(/&#\d+;|&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (t.length > 60) out.push(t);
    if (out.length >= quanti) break;
  }
  return out;
}

/* Ottantasei fonti su 559 tornavano «bloccata ai programmi», e ottanta di
 * quelle erano Wikipedia che risponde 429 a chi chiede 559 pagine HTML di
 * fila. Non erano fonti da guardare: era il controllo a bussare male. E il
 * costo non e' cosmetico — su quelle ottanta **non girava** la verifica che
 * conta davvero, cioe' se la voce citata parla del brano o dell'album.
 *
 * Wikipedia si interroga dalla sua API, che esiste apposta: una richiesta
 * dice in un colpo se la voce esiste, dove porta un eventuale rinvio, se e'
 * una disambigua (dichiarato nei pageprops, non indovinato da una frase) e
 * l'introduzione in testo semplice. Piu' leggera per loro e piu' precisa per
 * noi. */
function titoloWiki(u) {
  const x = new URL(u);
  const m = decodeURIComponent(x.pathname).match(/^\/wiki\/(.+)$/);
  return m ? m[1].replace(/_/g, ' ') : null;
}

async function controllaWikipedia(voce, esito, segnale) {
  const x = new URL(voce.url);
  const titolo = titoloWiki(voce.url);
  if (!titolo) return false;
  const p = new URLSearchParams({
    action: 'query', format: 'json', formatversion: '2', redirects: '1',
    titles: titolo, prop: 'extracts|pageprops', exintro: '1', explaintext: '1',
  });
  const r = await fetch(`https://${x.hostname}/w/api.php?${p}`, {
    signal: segnale, headers: { 'user-agent': UA, accept: 'application/json' },
  });
  esito.stato = r.status;
  if (!r.ok) return false;               // ripiego sul controllo HTML normale
  const d = await r.json();
  const pagina = ((d.query || {}).pages || [])[0];
  if (!pagina) return false;
  esito.finale = `https://${x.hostname}/wiki/${encodeURIComponent((pagina.title || titolo).replace(/ /g, '_'))}`;
  if (pagina.missing) {
    esito.classe = 'errore';
    esito.nota = 'la voce non esiste su Wikipedia';
    return true;
  }
  const rinvii = (d.query || {}).redirects || [];
  if (rinvii.length) {
    esito.classe = 'spostata';
    esito.nota = `la voce rinvia a «${pagina.title}»`;
  }
  if ((pagina.pageprops || {}).disambiguation !== undefined) {
    esito.classe = 'disambigua';
    esito.nota = 'pagina di disambiguazione: non contiene fatti sul brano';
    return true;
  }
  const testo = (pagina.extract || '').replace(/\s+/g, ' ').trim();
  if (voce.ruolo !== 'album' && testo && RE_ALBUM.test(testo) && !RE_BRANO.test(testo)) {
    esito.classe = 'altra-opera';
    esito.nota =
      `sembra la voce di un album, non del brano: «${testo.slice(0, 140)}…» ` +
      `— se è voluto, aggiungi "ruolo": "album" a questa fonte in dati/canzoni.json`;
  }
  return true;
}

async function controlla(voce) {
  const esito = { ...voce, stato: null, classe: 'ok', nota: '', finale: '' };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ATTESA_MS);
  try {
    let ospite = '';
    try { ospite = new URL(voce.url).hostname; } catch { /* url malformato: lo dira' il fetch */ }
    if (/(^|\.)wikipedia\.org$/.test(ospite)) {
      const fatto = await controllaWikipedia(voce, esito, ctrl.signal);
      if (fatto) return esito;
      // se l'API non risponde si prosegue col controllo HTML di sempre
    }
    const r = await fetch(voce.url, {
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': UA, accept: 'text/html,*/*' },
    });
    esito.stato = r.status;
    esito.finale = r.url;
    if (!r.ok) {
      // 401/403/406/429 quasi sempre non vogliono dire "morta": vogliono dire
      // "non sei un browser". Non sono un errore da correggere alla cieca.
      if ([401, 403, 406, 429].includes(r.status)) {
        esito.classe = 'bloccata';
        esito.nota = `risponde ${r.status}: probabile blocco anti-bot, da aprire in un browser prima di toccarla`;
      } else {
        esito.classe = 'errore';
        esito.nota = `risponde ${r.status}`;
      }
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
      const ps = paragrafi(html);
      const testo = ps.join(' ');
      if (voce.ruolo === 'album') {
        // scelta dichiarata nei dati: questa fonte È la voce dell'album, di
        // proposito (per esempio quando la scheda racconta la title track).
      } else if (testo && RE_ALBUM.test(testo) && !RE_BRANO.test(testo)) {
        esito.classe = 'altra-opera';
        esito.nota =
          `sembra la voce di un album, non del brano: «${(ps[0] || '').slice(0, 140)}…» ` +
          `— se è voluto, aggiungi "ruolo": "album" a questa fonte in dati/canzoni.json`;
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
const bloccate = per('bloccata');

console.log(`\nFonti controllate: ${risultati.length}`);
console.log(`  in ordine: ${per('ok').length}`);
console.log(`  irraggiungibili o in errore: ${errori.length}`);
console.log(`  che rispondono ma bloccano i programmi: ${bloccate.length}`);
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
stampa('Bloccate ai programmi — quasi sempre vive: aprile in un browser, non correggerle a occhi chiusi', bloccate, false);

/* SENZA RETE QUESTO CONTROLLO NON DICE NIENTE, E IL SILENZIO E' PEGGIO DEL
 * RUMORE. Lanciato da una macchina senza uscita di rete, ogni fetch fallisce e
 * ogni fonte finisce in 'errore': il risultato e' un elenco di 559 fonti
 * «morte» che in realta' non sono mai state interrogate. E' successo davvero,
 * due volte, e la seconda quel file falso e' stato anche committato,
 * cancellando l'ultima fotografia vera (414 ok su 417). Quindi: se TUTTE le
 * fonti falliscono, o se le prime fallite sono errori di rete e non risposte
 * HTTP, il controllo si dichiara non valido, non scrive niente e esce. */
const erroriDiRete = risultati.filter(
  (r) => r.classe === 'errore' && /fetch failed|EAI_AGAIN|ENOTFOUND|ECONNREFUSED|getaddrinfo|network/i.test(r.nota || '')
);
const senzaRete = risultati.length > 0 && erroriDiRete.length === risultati.length;
if (senzaRete) {
  console.error(`\nTutte e ${risultati.length} le fonti hanno fallito con un errore di rete.`);
  console.error('Non e un risultato: e l assenza di connessione. Non scrivo dati/fonti-stato.json');
  console.error('e non riporto nessun numero, perche sarebbe falso. Rilancia da una macchina con rete.');
  process.exit(2);
}

if (scriviJson) {
  writeFileSync('dati/fonti-stato.json', JSON.stringify({ quando: new Date().toISOString(), risultati }, null, 2));
  console.log('\nScritto dati/fonti-stato.json');
}

const gravi = errori.length + disambigue.length;
if (gravi) {
  console.log(`\n${gravi} fonti da sistemare prima di dire che il sito è "verificato su fonti citate".`);
  process.exit(1);
}
