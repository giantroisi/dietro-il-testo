// Collegamenti editoriali scelti, separati dalle liste automatiche F60.
// Nessuna voce per una canzone: HTML invariato.
import { readFileSync } from 'node:fs';
import { esc } from './guscio.mjs';

export const COLLEGAMENTI_CONTESTUALI = JSON.parse(readFileSync(
  new URL('../../dati/collegamenti-contestuali.json', import.meta.url), 'utf8'
));

export function collegamentiContestuali(c, canzoniPerSlug, radice) {
  const scelta = COLLEGAMENTI_CONTESTUALI[c.slug];
  if (!scelta) return '';
  if (scelta.artistaSlug !== c.artistaSlug || !scelta.destinazioni?.length) {
    throw new Error(`${c.slug}: collegamenti contestuali senza artista coerente o destinazioni`);
  }
  const visti = new Set([c.slug]);
  const link = scelta.destinazioni.map(slug => {
    const destinazione = canzoniPerSlug.get(slug);
    if (!destinazione || destinazione.artistaSlug !== c.artistaSlug || visti.has(slug)) {
      throw new Error(`${c.slug}: destinazione contestuale assente, duplicata o di altro artista: ${slug}`);
    }
    visti.add(slug);
    return `<a href="${radice}canzone/${esc(slug)}/">${esc(destinazione.titolo)}</a>`;
  });
  return `<p class="collegamenti-contestuali">Continua fra le canzoni di ${esc(c.artista)}: ${link.join(' e ')}.</p>`;
}
