// Guscio comune a tutte le pagine: testa HTML, testata, ricerca, piede.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { STILE } from './stile.mjs';

const RADICE_PROGETTO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// F69: i codici di verifica per Search Console e Bing vivono in
// dati/verifiche.json, non nel codice. Quando l'autore ne riceve uno gli basta
// incollarlo lì e rigenerare: nessuna modifica a questo file, e un campo vuoto
// semplicemente non produce nessun tag (mai un meta con contenuto finto).
function leggiVerifiche() {
  const percorso = join(RADICE_PROGETTO, 'dati', 'verifiche.json');
  if (!existsSync(percorso)) return {};
  try {
    return JSON.parse(readFileSync(percorso, 'utf8'));
  } catch {
    return {};
  }
}
export const VERIFICHE = leggiVerifiche();

// F18: le foto degli artisti stanno in un file proprio e non dentro
// `artisti.json`, per la stessa ragione per cui ci stanno le verifiche: sono
// dati che nascono da un lavoro diverso, con un ciclo diverso, e tenerli
// separati evita che due mani lavorino sullo stesso file. Chiave: lo slug
// dell'artista.
function leggiRitratti() {
  const percorso = join(RADICE_PROGETTO, 'dati', 'ritratti.json');
  if (!existsSync(percorso)) return {};
  try {
    return JSON.parse(readFileSync(percorso, 'utf8'));
  } catch {
    return {};
  }
}
export const RITRATTI = leggiRitratti();

// F61: chi firma il sito. Stesso principio: un campo vuoto non produce un nome
// finto — le pagine sono scritte per reggere anche senza, e appena l'autore lo
// riempie compare ovunque, firma e dati strutturati compresi.
function leggiAutore() {
  const percorso = join(RADICE_PROGETTO, 'dati', 'autore.json');
  if (!existsSync(percorso)) return { nome: '', email: 'g.prizio@icloud.com', riga: '' };
  try {
    return JSON.parse(readFileSync(percorso, 'utf8'));
  } catch {
    return { nome: '', email: 'g.prizio@icloud.com', riga: '' };
  }
}
export const AUTORE = leggiAutore();

export const SITO = {
  nome: 'Dietro il testo',
  descrizione: 'Cosa c\'è dietro le canzoni che ami: contesto, significato e fonti verificate. Mai i testi.',
  base: 'https://www.dietroiltesto.it',
};

export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Percorso relativo dalla profondità della pagina alla radice del sito. */
export function radice(profondita) {
  return profondita === 0 ? '' : '../'.repeat(profondita);
}

const SCRIPT_TEMA = `
(function () {
  try {
    var s = localStorage.getItem('theme');
    if (s === 'dark' || s === 'light') document.documentElement.setAttribute('data-theme', s);
  } catch (e) {}
})();
`;

function testata(r, { conRicerca = true, conMarchio = true, marchioD = false } = {}) {
  return `
  <header class="testata${marchioD ? ' testata-scorrevole' : ''}">
    <div class="col testata-in">
      <button class="tema" type="button" data-tema aria-label="Cambia tema chiaro o scuro" aria-pressed="false">
        <svg class="sole" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M5.9 5.9 4.4 4.4M19.6 19.6l-1.5-1.5M18.1 5.9l1.5-1.5M4.4 19.6l1.5-1.5"/></svg>
        <svg class="luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z"/></svg>
      </button>
      ${
        marchioD
          ? `<a class="marchio-d" href="${r || './'}" aria-label="${esc(SITO.nome)} — home">
        <img src="${r}logo.png" alt="" width="1061" height="245">
      </a>`
          : ''
      }
      ${
        conMarchio
          ? `<a class="marchio" href="${r || './'}" aria-label="${esc(SITO.nome)} — home">
        <img src="${r}logo.png" alt="${esc(SITO.nome)}" width="1061" height="245">
      </a>`
          : ''
      }
      ${
        conRicerca
          ? `<div class="testata-cerca">
        <div class="cerca" data-cerca>
          <svg class="lente" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>
          <input type="search" placeholder="Canzone, artista o album…" aria-label="Cerca nel sito"
                 autocomplete="off" spellcheck="false" data-campo>
          <div class="esiti" hidden data-esiti role="listbox" aria-label="Risultati"></div>
        </div>
      </div>`
          : ''
      }
      <nav class="testata-nav" aria-label="Principale">
        <a href="${r}archivio/">Archivio</a>
        <a href="${r}metodo/">Metodo</a>
      </nav>
    </div>
  </header>`;
}

function piede(r, totali, raccolte = []) {
  return `
  <footer class="piede">
    <div class="col piede-in">
      <div>
        <strong style="color:var(--text)">${esc(SITO.nome)}</strong> — ${totali.canzoni} canzoni, ${totali.artisti} artisti.
        Ogni scheda è scritta con parole originali e verificata su fonti citate.
        <p class="legale">Non riproduciamo testi né traduzioni delle canzoni, nemmeno parziali:
        i momenti iconici sono descritti a parole nostre. Per leggere un testo per intero,
        ogni scheda rimanda a una fonte esterna che se ne assume la responsabilità.
        I colori richiamano l'immaginario visivo di band e album, non i loro loghi.</p>
      </div>
      <div class="piede-navi">
        <nav aria-labelledby="piede-raccolte">
          <p class="piede-titolo" id="piede-raccolte">Raccolte</p>
          <a href="${r}archivio/">Archivio completo</a>
          ${raccolte.map((x) => `<a href="${r}${x.percorso}">${esc(x.nome)}</a>`).join('\n          ')}
        </nav>
        <nav aria-labelledby="piede-sito">
          <p class="piede-titolo" id="piede-sito">Il sito</p>
          <a href="${r}metodo/">Metodo e fonti</a>
          <a href="${r}chi-siamo/">Chi c'è dietro</a>
          <a href="mailto:g.prizio@icloud.com?subject=Dietro%20il%20testo%20%E2%80%94%20segnalazione">Segnala un errore</a>
          <a href="mailto:g.prizio@icloud.com?subject=Dietro%20il%20testo%20%E2%80%94%20proponi%20una%20canzone">Proponi una canzone</a>
          <a href="${r}privacy/">Privacy</a>
          <a href="${r}note-legali/">Note legali</a>
        </nav>
      </div>
    </div>
  </footer>`;
}

/**
 * Compone una pagina completa.
 * @param {object} o
 * @param {number} o.profondita  quante cartelle sotto la radice
 * @param {string} o.titolo      <title> senza suffisso sito
 * @param {string} o.descrizione meta description
 * @param {string} o.corpo       HTML del <main>
 * @param {string} [o.identita]  colore identitario della pagina
 * @param {string} [o.percorso]  percorso canonico, es. "canzone/everlong/"
 */
export function pagina(o) {
  const r = radice(o.profondita);
  const identita = o.identita
    ? `<style>:root{--identita:${o.identita};--identita-testo:${o.identitaTesto || o.identita};--identita-contrasto:${o.identitaContrasto || '#FFFFFF'}}</style>`
    : '';

  // F57: il suffisso di marca si aggiunge solo se il risultato resta sotto i
  // 60 caratteri — oltre quella soglia Google lo taglia comunque, e il
  // marchio ruberebbe solo spazio alle parole che contano.
  const conSuffisso = `${o.titolo} | ${SITO.nome}`;
  const titoloCompleto = conSuffisso.length < 60 ? conSuffisso : o.titolo;

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titoloCompleto)}</title>
<script>${SCRIPT_TEMA}</script>
<meta name="description" content="${esc(o.descrizione)}">
${
  o.verifiche
    ? [
        VERIFICHE.google ? `<meta name="google-site-verification" content="${esc(VERIFICHE.google)}">` : '',
        VERIFICHE.bing ? `<meta name="msvalidate.01" content="${esc(VERIFICHE.bing)}">` : '',
      ]
        .filter(Boolean)
        .join('\n')
    : ''
}
${o.noindex ? '<meta name="robots" content="noindex">' : o.noindexFollow ? '<meta name="robots" content="noindex, follow">' : ''}
${o.noindex ? '' : `<link rel="canonical" href="${SITO.base}/${o.percorso || ''}">`}
<link rel="icon" href="${r}favicon.ico" sizes="any">
<link rel="icon" href="${r}favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
<meta property="og:type" content="${esc(o.ogType || 'website')}">
<meta property="og:site_name" content="${esc(SITO.nome)}">
<meta property="og:title" content="${esc(o.titolo)}">
<meta property="og:description" content="${esc(o.descrizione)}">
${o.noindex ? '' : `<meta property="og:url" content="${SITO.base}/${o.percorso || ''}">`}
<meta property="og:locale" content="it_IT">
${
  o.ogImage
    ? `<meta property="og:image" content="${SITO.base}/${o.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITO.base}/${o.ogImage}">`
    : `<meta name="twitter:card" content="summary">`
}
${o.datiStrutturati ? `<script type="application/ld+json">${JSON.stringify(o.datiStrutturati)}</script>` : ''}
<style>${STILE}</style>
${identita}
</head>
<body>
<a class="salta" href="#contenuto">Vai al contenuto</a>
${testata(r, { conRicerca: o.ricercaInTestata !== false, conMarchio: o.marchioInTestata !== false, marchioD: o.marchioDInTestata === true })}
<main id="contenuto">
${o.corpo}
</main>
${piede(r, o.totali, o.raccolte)}
<script src="${r}ricerca.js" defer></script>
</body>
</html>
`;
}
