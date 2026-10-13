// Tre pillole editoriali scelte; nessuna generazione automatica di contenuti.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { esc } from './guscio.mjs';
export const PILLOLE = JSON.parse(readFileSync(new URL('../../dati/pillole.json', import.meta.url), 'utf8'));
export const STILE_PILLOLE = `
.pillola-editoriale { margin: 2.75rem 0; }
.pillola-editoriale .pillola-immagini { width: min(100%, 22rem); margin: 0 auto; border-radius: 4px; overflow: hidden; }
.pillola-editoriale img { display: block; width: 100%; height: auto; aspect-ratio: 9 / 16; }
.pillola-editoriale .pillola-scuro { display: none; }
:root[data-theme="dark"] .pillola-chiaro { display: none; }
:root[data-theme="dark"] .pillola-scuro { display: block; }
@media (prefers-color-scheme: dark) {
:root:not([data-theme="light"]) .pillola-chiaro { display: none; }
:root:not([data-theme="light"]) .pillola-scuro { display: block; }
}
.pillola-editoriale figcaption { margin: .85rem auto 0; max-width: 44ch; color: var(--text); text-align: center; font-size: 13px; line-height: 1.5; }
@media print { .pillola-editoriale { display: none; } }
`;
export function pillolaEditoriale(c, r) {
  const p = PILLOLE[c.slug];
  if (!p) return '';
  if (p.artistaSlug !== c.artistaSlug || !p.testo || p.dopoParagrafo !== 0 || c.corpo.length < 2 || !c.fonti.some(f => f.url === p.fonte)) {
    throw new Error(`Pillola non coerente con la scheda: ${c.slug}`);
  }
  const immagini = ['chiaro','scuro'].map(v => {
    const nome = `${c.slug}-${v}.webp`;
    const bytes = readFileSync(new URL(`../../pillole/${nome}`, import.meta.url));
    const hash = createHash('sha256').update(bytes).digest('hex');
    if (hash !== p.varianti[v]) throw new Error(`Immagine pillola modificata senza verifica: ${nome}`);
    return `<img class="pillola-${v}" src="${r}pillole/${nome}?v=${hash.slice(0,12)}" width="1080" height="1920" loading="lazy" decoding="async" alt="${esc(`Pillola editoriale su ${c.titolo}: ${p.testo}`)}">`;
  }).join('');
  return `<figure class="pillola-editoriale"><div class="pillola-immagini">${immagini}</div><figcaption>Sintesi originale di Dietro il testo · <a href="${esc(p.fonte)}" target="_blank" rel="noopener noreferrer">${esc(p.nomeFonte)}</a></figcaption></figure>`;
}
