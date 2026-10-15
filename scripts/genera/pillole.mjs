// Cartoline ricavate dal momento iconico della scheda, identiche alla condivisione Storia.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { esc } from './guscio.mjs';
export const PILLOLE = JSON.parse(readFileSync(new URL('../../dati/pillole.json', import.meta.url), 'utf8'));
export const STILE_PILLOLE = `
.pillola-editoriale { margin: 2.75rem 0; }
.pillola-editoriale .pillola-immagini { width: min(100%, 22rem); margin: 0 auto; border-radius: 4px; overflow: hidden; }
.pillola-editoriale img { display: block; width: 100%; height: auto; aspect-ratio: 9 / 16; }
.pillola-editoriale figcaption { margin: .85rem auto 0; max-width: 44ch; color: var(--text); text-align: center; font-size: 13px; line-height: 1.5; }
@media print { .pillola-editoriale { display: none; } }
`;
export function urlPillola(c, r) {
  const p = PILLOLE[c.slug];
  if (!p) return '';
  if (p.artistaSlug !== c.artistaSlug || p.testo !== c.fraseIconica || p.dopoParagrafo !== 0 || c.corpo.length < 2 || !c.fonti.some(f => f.url === p.fonte) || p.file !== `${c.slug}-storia.jpg`) {
    throw new Error(`Cartolina non coerente con la scheda: ${c.slug}`);
  }
  if (p.cartolina && (p.cartolina.versione !== 2 || p.cartolina.sezioni.length !== 2 || p.cartolina.sezioni.some(s => !s.titolo || !s.testo || !s.nomeFonte || !c.fonti.some(f => f.url === s.fonte)) || p.cartolina.fontiAnagrafica.some(url => !c.fonti.some(f => f.url === url)))) {
    throw new Error(`Sintesi della cartolina non verificabile: ${c.slug}`);
  }
  const bytes = readFileSync(new URL(`../../pillole/${p.file}`, import.meta.url));
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (hash !== p.sha256) throw new Error(`Cartolina modificata senza verifica: ${p.file}`);
  return `${r}pillole/${p.file}?v=${hash.slice(0,12)}`;
}
export function pillolaEditoriale(c, r) {
  const src = urlPillola(c,r);
  if (!src) return '';
  const p = PILLOLE[c.slug];
  return `<figure class="pillola-editoriale"><div class="pillola-immagini"><img src="${src}" width="1080" height="1920" loading="lazy" decoding="async" alt="${esc(`Cartolina di condivisione di ${c.titolo}: ${p.testoGrafica}`)}"></div><figcaption>${p.cartolina ? 'Storia e curiosità raccontate con parole nostre' : 'Momento iconico descritto con parole nostre'} · <a href="#fonti">Fonti della scheda</a></figcaption></figure>`;
}
