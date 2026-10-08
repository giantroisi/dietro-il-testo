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
const canzoni = JSON.parse(readFileSync(join(dirname(configPath), 'canzoni.json'), 'utf8'));
const canzoniPerSlug = new Map(canzoni.map(c => [c.slug, c]));
// Un solo prodotto per album: le canzoni ereditano la destinazione del disco.
// L'artista fa parte della chiave per distinguere album omonimi.
export function prodottoAmazonPerScheda(scheda) {
  if (typeof scheda === 'string' && scheda.startsWith('album/')) return PRODOTTI_AMAZON[scheda];
  const c = typeof scheda === 'string' ? canzoniPerSlug.get(scheda) : scheda;
  return c ? PRODOTTI_AMAZON[`album/${c.artistaSlug}/${c._albumSlugPagina || c.albumSlug}`] : undefined;
}
export function amazonPerScheda(slug) {
  const prodotto = prodottoAmazonPerScheda(slug);
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
  return `<aside class="acquisto-affiliato" aria-label="${esc(titolo)} su Amazon" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:18px 24px;padding:20px 22px;border:1px solid var(--border);border-radius:12px;background:var(--surface);margin-top:20px">
    <div style="flex:1 1 100%;min-width:0">
      <p style="margin:0 0 6px;font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted)">Il disco</p>
      <p style="margin:0;font-family:var(--font-display);font-size:24px;line-height:1.2;font-style:italic">${esc(titolo)}</p>
      <p style="margin:7px 0 0;font-size:14px;color:var(--text-muted)">${esc(artista)} <span aria-hidden="true">·</span> ${esc(formato)}</p>
    </div>
    <a class="bottone pieno" href="${esc(url.href)}" aria-label="Acquista su Amazon — ${esc(testo.trim())}" target="_blank" rel="sponsored nofollow noopener" style="flex:none"><svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6H19v-2H9.4l-.4-2h9.8L22 6H6.7l-.6-3H2z"/><circle cx="10" cy="20" r="1.8"/><circle cx="18" cy="20" r="1.8"/></svg>Acquista su Amazon</a>
  </aside>`;
}

export function informativaAmazonPerScheda(slug, radice = '../../') {
  return TRACKING_ID_AMAZON && prodottoAmazonPerScheda(slug)
    ? `<p class="nota-affiliazioni">${esc(DICHIARAZIONE_AMAZON)}. ${esc(AVVISO_AFFILIATO)}. <a href="${esc(radice)}affiliazioni/">Informazioni sulle affiliazioni</a>.</p>`
    : '';
}

// Alterna il richiamo sotto Spotify su mobile e sotto il momento su desktop.
export const STILE_AMAZON_MOBILE = `.acquisto-affiliato .bottone {
 display:inline-flex;align-items:center;justify-content:center;gap:10px;
 font-family:var(--font-body);font-size:16px;line-height:1.25;text-transform:none;letter-spacing:0;
 color:#111;background:linear-gradient(#f7dfa5,#f0c14b);border:1px solid #a88734;border-radius:5px;
 padding:12px 18px;text-decoration:none;
}
.acquisto-affiliato .bottone:hover { color:#111;border-color:#846a29;background:linear-gradient(#f5d78e,#eeb933);opacity:1; }
.acquisto-mobile { display:none !important; }
.acquisto-desktop { display:flex !important; }
@media (max-width:760px) {
 .acquisto-mobile { display:flex !important; }
 .acquisto-desktop { display:none !important; }
}`;
export function amazonMobilePerScheda(slug) {
  const html = amazonPerScheda(slug);
  return html
    .replace('class="acquisto-affiliato"', 'class="acquisto-affiliato acquisto-mobile"')
    .replace('gap:18px 24px;padding:20px 22px', 'gap:10px 16px;padding:12px 14px')
    .replace('margin-top:20px', 'margin-top:12px')
    .replace('flex:1 1 100%', 'flex:1 1 160px')
    .replace('justify-content:flex-start', 'justify-content:space-between')
    .replace(/      <p[^>]*>Il disco<\/p>\n/, '')
    .replace('font-size:24px', 'font-size:18px')
    .replace('class="bottone pieno"', 'class="bottone"');
}

export function amazonCompattoPerScheda(slug, soloDesktop = false) {
  return amazonMobilePerScheda(slug).replace('acquisto-affiliato acquisto-mobile', soloDesktop ? 'acquisto-affiliato acquisto-desktop' : 'acquisto-affiliato');
}
