// Guscio comune a tutte le pagine: testa HTML, testata, ricerca, piede.

import { STILE } from './stile.mjs';

export const SITO = {
  nome: 'Dietro il testo',
  descrizione: 'Cosa c’è dietro le canzoni che ami: contesto, significato e fonti verificate. Mai i testi.',
  base: 'https://dietro-il-testo.vercel.app',
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

function testata(r, { conRicerca = true } = {}) {
  return `
  <header class="testata">
    <div class="col testata-in">
      <a class="marchio" href="${r || './'}" aria-label="${esc(SITO.nome)} — home">
        <img src="${r}logo.png" alt="${esc(SITO.nome)}" width="1061" height="245">
      </a>
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
      <button class="tema" type="button" data-tema aria-label="Cambia tema chiaro o scuro" aria-pressed="false">
        <svg class="sole" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M5.9 5.9 4.4 4.4M19.6 19.6l-1.5-1.5M18.1 5.9l1.5-1.5M4.4 19.6l1.5-1.5"/></svg>
        <svg class="luna" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4Z"/></svg>
      </button>
    </div>
  </header>`;
}

function piede(r, totali) {
  return `
  <footer class="piede">
    <div class="col piede-in">
      <div>
        <strong style="color:var(--text)">${esc(SITO.nome)}</strong> — ${totali.canzoni} canzoni, ${totali.artisti} artisti.
        Ogni scheda è scritta con parole originali e verificata su fonti citate.
        <p class="legale">Non riproduciamo testi né traduzioni delle canzoni, nemmeno parziali:
        i momenti iconici sono descritti a parole nostre. Per leggere un testo per intero,
        ogni scheda rimanda a una fonte esterna che se ne assume la responsabilità.
        I colori richiamano l’immaginario visivo di band e album, non i loro loghi.</p>
      </div>
      <nav aria-label="Piede">
        <a href="${r}archivio/">Archivio completo</a>
        <a href="${r}metodo/">Metodo e fonti</a>
        <a href="mailto:g.prizio@icloud.com?subject=Dietro%20il%20testo%20%E2%80%94%20segnalazione">Segnala un errore</a>
      </nav>
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

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.titolo)} | ${esc(SITO.nome)}</title>
<script>${SCRIPT_TEMA}</script>
<meta name="description" content="${esc(o.descrizione)}">
<link rel="canonical" href="${SITO.base}/${o.percorso || ''}">
<link rel="icon" href="${r}favicon.ico" sizes="any">
<link rel="icon" href="${r}favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITO.nome)}">
<meta property="og:title" content="${esc(o.titolo)}">
<meta property="og:description" content="${esc(o.descrizione)}">
<meta property="og:url" content="${SITO.base}/${o.percorso || ''}">
<meta property="og:locale" content="it_IT">
<meta name="twitter:card" content="summary">
${o.datiStrutturati ? `<script type="application/ld+json">${JSON.stringify(o.datiStrutturati)}</script>` : ''}
<style>${STILE}</style>
${identita}
</head>
<body>
<a class="salta" href="#contenuto">Vai al contenuto</a>
${testata(r, { conRicerca: o.ricercaInTestata !== false })}
<main id="contenuto">
${o.corpo}
</main>
${piede(r, o.totali)}
<script src="${r}ricerca.js" defer></script>
</body>
</html>
`;
}
