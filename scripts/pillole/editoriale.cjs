'use strict';
// Composizione editoriale: un JPEG unico per pagina e condivisione Storia.
const { createCanvas } = require('@napi-rs/canvas');
const SERIF = '"Iowan Old Style", Georgia, serif';
const SANS = '"Helvetica", Arial, sans-serif';
const MONO = 'Menlo, monospace';
const C = { testo: '#F8F4EB', secondo: '#C7D6CD', accento: '#B7D7C4' };
function righe(ctx, testo, larghezza) {
  let risultato = [], linea = '';
  for (const parola of testo.split(/\s+/)) {
    if (ctx.measureText(parola).width > larghezza) throw Error('Parola fuori margine');
    const prova = linea ? linea + ' ' + parola : parola;
    if (ctx.measureText(prova).width > larghezza) { risultato.push(linea); linea = parola; }
    else linea = prova;
  }
  if (linea) risultato.push(linea);
  return risultato;
}
function bilancia(ctx, testo, larghezza) {
  const n = righe(ctx, testo, larghezza).length;
  let a = larghezza * .55, b = larghezza;
  for (let i = 0; i < 24; i++) {
    const m = (a + b) / 2;
    if (righe(ctx, testo, m).length > n) a = m; else b = m;
  }
  const risultato = righe(ctx, testo, Math.min(larghezza, b + 10));
  if (risultato.length !== n || risultato.at(-1).split(/\s+/).length < 2) throw Error('A capo da curare');
  if (risultato.join(' ') !== testo) throw Error('Testo incompleto');
  return risultato;
}
function renderEditoriale(canzone, contenuto, logo) {
  if (contenuto.versione !== 2 || contenuto.sezioni.length !== 2) throw Error('Servono due sintesi curate');
  const canvas = createCanvas(1080, 1920), ctx = canvas.getContext('2d');
  const testi = [], sezioni = [], x = 88, w = 904;
  let gruppo = '';
  const fondo = ctx.createLinearGradient(0, 0, 740, 1920);
  fondo.addColorStop(0, '#193E33'); fondo.addColorStop(.6, '#122B25'); fondo.addColorStop(1, '#101C1A');
  ctx.fillStyle = fondo; ctx.fillRect(0, 0, 1080, 1920);
  function scrivi(t, y, font, colore = C.testo, sx = x) {
    ctx.font = font; ctx.fillStyle = colore;
    const m = ctx.measureText(t);
    const b = { gruppo, testo: t, font, sinistra: sx, destra: sx + m.width, alto: y - m.actualBoundingBoxAscent, basso: y + m.actualBoundingBoxDescent };
    if (b.sinistra < 88 || b.destra > 992 || b.alto < 200 || b.basso > 1660) throw Error('Fuori zona sicura: ' + JSON.stringify(b));
    testi.push(b); ctx.fillText(t, sx, y);
  }
  function linea(y, alpha = .25) { ctx.fillStyle = 'rgba(183,215,196,' + alpha + ')'; ctx.fillRect(x, y, w, 1); }
  // Il marchio originale rimane piccolo e autonomo rispetto al titolo.
  const lc = createCanvas(logo.width, logo.height), lx = lc.getContext('2d'); lx.drawImage(logo, 0, 0);
  const rgba = lx.getImageData(0, 0, logo.width, logo.height).data;
  let sx = logo.width, sy = logo.height, dx = 0, dy = 0;
  for (let yy = 0; yy < logo.height; yy++) for (let xx = 0; xx < logo.width; xx++) if (rgba[(yy * logo.width + xx) * 4 + 3] > 8) { sx = Math.min(sx, xx); sy = Math.min(sy, yy); dx = Math.max(dx, xx); dy = Math.max(dy, yy); }
  const mw = 246, mh = Math.round(mw * (dy - sy + 1) / (dx - sx + 1));
  const mark = createCanvas(mw, mh), mx = mark.getContext('2d');
  mx.drawImage(logo, sx, sy, dx - sx + 1, dy - sy + 1, 0, 0, mw, mh); mx.globalCompositeOperation = 'source-in'; mx.fillStyle = C.testo; mx.fillRect(0, 0, mw, mh);
  ctx.drawImage(mark, x, 220);
  gruppo = 'artista'; scrivi(canzone.artista, 350, '44px ' + SANS, C.accento);
  gruppo = 'anno'; ctx.font = '36px ' + MONO; scrivi(canzone.anno, 350, ctx.font, C.secondo, 992 - ctx.measureText(canzone.anno).width);
  const titoloPx = contenuto.titoloPx ?? 82;
  if (!Number.isInteger(titoloPx) || titoloPx < 52 || titoloPx > 82) throw Error('Dimensione titolo non valida');
  gruppo = 'titolo'; const fontTitolo = '700 ' + titoloPx + 'px ' + SERIF;
  ctx.font = fontTitolo;
  if (ctx.measureText(canzone.titolo).width > w) throw Error('Titolo da impaginare individualmente');
  scrivi(canzone.titolo, 448, fontTitolo);
  gruppo = 'album'; scrivi('Album · ' + canzone.album, 513, '38px ' + SANS, C.secondo);
  linea(555, .4);
  for (const [i, s] of contenuto.sezioni.entries()) {
    const top = i === 0 ? 630 : 1140;
    gruppo = 'sezione-' + i + '-etichetta'; scrivi('0' + (i + 1) + ' / ' + s.etichetta, top, '29px ' + MONO, C.accento);
    gruppo = 'sezione-' + i + '-titolo'; ctx.font = '700 52px ' + SERIF;
    if (ctx.measureText(s.titolo).width > w) throw Error('Sottotitolo da curare');
    scrivi(s.titolo, top + 65, ctx.font);
    gruppo = 'sezione-' + i + '-testo'; ctx.font = '60px ' + SANS;
    const body = bilancia(ctx, s.testo, w);
    if (body.length > 4) throw Error('Sintesi da rivedere, senza ridurre il corpo');
    body.forEach((t, n) => scrivi(t, top + 141 + 78 * n, '60px ' + SANS));
    sezioni.push({ titolo: s.titolo, righe: body.length, testoCompleto: body.join(' ') });
    if (i === 0) linea(1070, .16);
  }
  linea(1585, .28);
  gruppo = 'sito'; scrivi('dietroiltesto.it', 1640, '32px ' + MONO, C.accento);
  return { canvas, testi, sezioni, titolo: { dimensione: titoloPx, righe: 1 }, modello: 'scripts/pillole/editoriale.cjs' };
}
module.exports = { renderEditoriale };
