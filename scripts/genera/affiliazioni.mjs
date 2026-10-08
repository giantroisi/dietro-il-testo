// Collegamenti commerciali: il Tracking ID e i prodotti sono centralizzati.
// Non costruire URL o tag a mano: `href` dovrà arrivare da uno strumento
// ufficiale Amazon ed essere verificato prima di inserirlo nei contenuti.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { esc } from './guscio.mjs';

const configPath = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dati', 'affiliazioni.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
if (typeof config.trackingId !== 'string') throw new Error('Tracking ID non valido');
export const TRACKING_ID_AMAZON = config.trackingId.trim();

export const DICHIARAZIONE_AMAZON = 'In qualità di Affiliato Amazon io ricevo un guadagno dagli acquisti idonei';
export const PRODOTTI_AMAZON = JSON.parse(readFileSync(join(dirname(configPath), 'affiliazioni-prodotti.json'), 'utf8'));
export function amazonPerScheda(slug) {
  const prodotto = PRODOTTI_AMAZON[slug];
  return prodotto ? collegamentoAmazon(prodotto) : '';
}

export const AVVISO_AFFILIATO = 'Link affiliato: potremmo ricevere una commissione senza costi aggiuntivi per te';

/** Produce solo un link testuale già verificato. Con ID vuoto non produce HTML. */
export function collegamentoAmazon({ href, testo, origine, titolo, artista, formato } = {}) {
  if (!TRACKING_ID_AMAZON || !href) return '';
  if (origine !== 'strumento-ufficiale-amazon') throw new Error('Link Amazon privo di verifica ufficiale');
  if (typeof testo !== 'string' || !testo.trim()) throw new Error('Testo del link Amazon assente');

  let url;
  try { url = new URL(href); } catch { throw new Error('URL Amazon non valido'); }
  if (url.protocol !== 'https:' || url.hostname !== 'www.amazon.it' || url.username || url.password || url.port) {
    throw new Error('Il link deve usare HTTPS su www.amazon.it');
  }
  if (url.searchParams.getAll('tag').length !== 1 || url.searchParams.get('tag') !== TRACKING_ID_AMAZON) {
    throw new Error('Tracking ID del link Amazon non corrispondente alla configurazione');
  }

  if (![titolo, artista, formato].every(v => typeof v === 'string' && v.trim())) throw new Error('Identità del prodotto incompleta');
  return `<aside class="acquisto-affiliato" aria-label="${esc(titolo)} su Amazon" style="display:flex;flex-wrap:wrap;align-items:center;gap:18px;padding:18px;border:1px solid var(--border);border-radius:8px;background:var(--surface);margin-top:16px">
    <svg aria-hidden="true" focusable="false" width="96" height="96" viewBox="0 0 96 96" style="flex:none"><circle cx="48" cy="48" r="46" fill="var(--text)"/><circle cx="48" cy="48" r="35" fill="none" stroke="var(--surface)" opacity=".3"/><circle cx="48" cy="48" r="29" fill="none" stroke="var(--surface)" opacity=".3"/><circle cx="48" cy="48" r="16" fill="var(--surface)"/><circle cx="48" cy="48" r="3" fill="var(--text)"/></svg>
    <div style="flex:1 1 180px;min-width:0">
      <p style="margin:0;font-weight:700">${esc(titolo)}</p>
      <p style="margin:4px 0 12px">${esc(artista)} · ${esc(formato)}</p>
      <a class="bottone" href="${esc(url.href)}" aria-label="Acquista su Amazon — ${esc(testo.trim())}" target="_blank" rel="sponsored nofollow noopener">Acquista su Amazon</a>
    </div>
  </aside>`;
}

export function informativaAmazonPerScheda(slug) {
  return TRACKING_ID_AMAZON && PRODOTTI_AMAZON[slug]
    ? `<p class="nota-affiliazioni">${esc(DICHIARAZIONE_AMAZON)}. ${esc(AVVISO_AFFILIATO)}. <a href="../../affiliazioni/">Informazioni sulle affiliazioni</a>.</p>`
    : '';
}
