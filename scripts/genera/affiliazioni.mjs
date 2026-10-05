// Collegamenti commerciali: la configurazione resta vuota fino alla Fase 2.
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

export const AVVISO_AFFILIATO = 'Link affiliato: potremmo ricevere una commissione senza costi aggiuntivi per te';

/** Produce solo un link testuale già verificato. Con ID vuoto non produce HTML. */
export function collegamentoAmazon({ href, testo, origine } = {}) {
  if (!TRACKING_ID_AMAZON) return '';
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

  return `<aside class="link-affiliato" aria-label="Collegamento affiliato">
    <p class="link-affiliato-avviso">${esc(AVVISO_AFFILIATO)}</p>
    <a href="${esc(url.href)}" target="_blank" rel="sponsored nofollow noopener">${esc(testo.trim())}</a>
  </aside>`;
}
