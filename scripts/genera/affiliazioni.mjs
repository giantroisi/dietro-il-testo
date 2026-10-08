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
  return `<aside class="acquisto-affiliato" aria-label="${esc(titolo)} su Amazon" style="display:flex;flex-wrap:wrap;align-items:center;gap:18px 24px;padding:22px 24px;border:1px solid var(--border);border-radius:12px;background:var(--surface);margin-top:20px">
    <div style="flex:1 1 240px;min-width:0">
      <p style="margin:0 0 6px;font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted)">Il disco</p>
      <p style="margin:0;font-family:var(--font-display);font-size:24px;line-height:1.2;font-style:italic">${esc(titolo)}</p>
      <p style="margin:7px 0 0;font-size:14px;color:var(--text-muted)">${esc(artista)} <span aria-hidden="true">·</span> ${esc(formato)}</p>
    </div>
    <a class="bottone pieno" href="${esc(url.href)}" aria-label="Vedi su Amazon — ${esc(testo.trim())}" target="_blank" rel="sponsored nofollow noopener" style="flex:none">Vedi su Amazon <span aria-hidden="true">↗</span></a>
  </aside>`;
}

export function informativaAmazonPerScheda(slug) {
  return TRACKING_ID_AMAZON && PRODOTTI_AMAZON[slug]
    ? `<p class="nota-affiliazioni">${esc(DICHIARAZIONE_AMAZON)}. ${esc(AVVISO_AFFILIATO)}. <a href="../../affiliazioni/">Informazioni sulle affiliazioni</a>.</p>`
    : '';
}
