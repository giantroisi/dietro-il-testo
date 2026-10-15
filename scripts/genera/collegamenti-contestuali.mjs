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
  if (scelta.nelTesto) {
    const i = scelta.nelTesto.paragrafo;
    collegamentoNelTesto(c, c.corpo[i], i, canzoniPerSlug, radice);
    return '';
  }
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
  if (scelta.prima !== undefined || scelta.dopo !== undefined) {
    if (link.length !== 1 || typeof scelta.prima !== 'string' || typeof scelta.dopo !== 'string' || !Number.isInteger(scelta.dopoParagrafo) || scelta.dopoParagrafo < 0 || scelta.dopoParagrafo >= c.corpo.length) {
      throw new Error(`${c.slug}: contesto o posizione del collegamento non validi`);
    }
    return `<p class="collegamenti-contestuali">${esc(scelta.prima)}${link[0]}${esc(scelta.dopo)}</p>`;
  }
  return `<p class="collegamenti-contestuali">Continua fra le canzoni di ${esc(c.artista)}: ${link.join(' e ')}.</p>`;
}

// Trasforma un titolo già presente nella prosa in un link, senza cambiare le parole.
// Le scelte fra artisti diversi dichiarano e verificano anche l’artista destinatario.
export function collegamentoNelTesto(c, testo, indice, canzoniPerSlug, radice) {
  const scelta = COLLEGAMENTI_CONTESTUALI[c.slug];
  const dato = scelta?.nelTesto;
  if (!dato) return esc(testo);
  const destinazione = canzoniPerSlug.get(scelta.destinazioni?.[0]);
  if (scelta.artistaSlug !== c.artistaSlug || scelta.destinazioni?.length !== 1 ||
      !Number.isInteger(dato.paragrafo) || dato.paragrafo < 0 || dato.paragrafo >= c.corpo.length ||
      !destinazione || destinazione.slug === c.slug ||
      destinazione.artistaSlug !== dato.artistaDestinazioneSlug ||
      dato.anchor !== destinazione.titolo || c.naturaCorpo?.length) {
    throw new Error(`${c.slug}: collegamento nel testo non coerente`);
  }
  if (indice !== dato.paragrafo) return esc(testo);
  const parti = testo.split(dato.anchor);
  if (parti.length !== 2) throw new Error(`${c.slug}: titolo nel paragrafo assente o ambiguo`);
  return `${esc(parti[0])}<a href="${radice}canzone/${esc(destinazione.slug)}/">${esc(dato.anchor)}</a>${esc(parti[1])}`;
}
