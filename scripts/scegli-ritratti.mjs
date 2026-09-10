// Pagina per SCEGLIERE i ritratti guardandoli, invece che leggendo i titoli.
//
// Uso, dalla radice del progetto:
//   node scripts/scegli-ritratti.mjs            (solo gli artisti senza ritratto)
//   node scripts/scegli-ritratti.mjs --tutti    (anche quelli che ce l'hanno gia')
//   node scripts/scegli-ritratti.mjs --quanti 6 (piu' candidati per artista)
//
// Poi si apre `ritratti/anteprime/scelta.html` nel browser.
//
// PERCHE' ESISTE. Nel registro c'e' gia' scritto, con i numeri: scelte fatte
// leggendo i titoli, quattro su quattro sbagliate il 5 settembre, due da
// buttare su cinque il 6; scelte fatte guardando le anteprime, cinque su
// cinque giuste. Il difetto tipico e' invisibile a ogni controllo automatico —
// licenza impeccabile, autore noto, soggetto giusto, e l'artista e' una sagoma
// lontana in una panoramica di palco — perche' **nessun controllo guarda
// l'immagine**.
//
// `scarica-ritratti.mjs --anteprime` risolveva la stessa cosa scaricando tre
// file per artista. Con 77 artisti sono oltre duecento richieste a Commons, che
// risponde 429 gia' al settimo file di fila. Questa pagina non scarica niente:
// chiede le miniature direttamente a Wikimedia **dal browser**, una per
// riquadro, mentre si guarda. Costa zero al progetto e zero al terminale.
//
// Non scrive niente in `dati/`: la scelta resta un gesto di una persona, e il
// file `dati/ritratti-scelti.json` continua a scriverlo lei. La pagina si
// limita a preparare le righe da incollarci dentro.
//
// Esce in `ritratti/anteprime/`, che e' in `.gitignore` e che il generatore non
// copia nel sito: e' un banco di lavoro, non una pagina pubblicata.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';

const QUANTI = (() => {
  const i = process.argv.indexOf('--quanti');
  return i > -1 ? Math.max(1, Number(process.argv[i + 1]) || 4) : 4;
})();
const TUTTI = process.argv.includes('--tutti');
const USCITA = 'ritratti/anteprime/scelta.html';

if (!existsSync('dati/ritratti-candidati.json')) {
  console.error('Manca dati/ritratti-candidati.json. Lancia prima: node scripts/cerca-ritratti.mjs');
  process.exit(1);
}

const { quando, esito } = JSON.parse(readFileSync('dati/ritratti-candidati.json', 'utf8'));

// Chi ha gia' un ritratto pubblicato: i file in cima a ritratti/.
const gia = new Set(
  existsSync('ritratti')
    ? readdirSync('ritratti')
        .filter((n) => /\.(jpe?g|png|webp)$/i.test(n))
        .map((n) => n.replace(/\.[^.]+$/, ''))
    : []
);

// La miniatura si costruisce dall'indirizzo originale, senza chiedere niente a
// nessuno: .../commons/3/36/Nome.jpg diventa .../commons/thumb/3/36/Nome.jpg/480px-Nome.jpg
function miniatura(originale, lato = 480) {
  const pulito = String(originale || '').split('?')[0];
  const i = pulito.indexOf('/commons/');
  if (i === -1) return null;
  const coda = pulito.slice(i + '/commons/'.length);
  const nome = coda.split('/').pop();
  if (!nome) return null;
  // Un SVG non si ridimensiona in SVG: Wikimedia ne serve un PNG.
  const nomeMin = /\.svg$/i.test(nome) ? nome + '.png' : nome;
  return pulito.slice(0, i) + '/commons/thumb/' + coda + '/' + lato + 'px-' + nomeMin;
}

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const daGuardare = esito
  .filter((a) => TUTTI || !gia.has(a.slug))
  .filter((a) => (a.candidati || []).length);
const senza = esito.filter((a) => TUTTI || !gia.has(a.slug)).filter((a) => !(a.candidati || []).length);

const blocchi = daGuardare
  .map((a) => {
    const carte = (a.candidati || [])
      .slice()
      .sort((x, y) => (y.punti || 0) - (x.punti || 0))
      .slice(0, QUANTI)
      .map((c) => {
        const min = miniatura(c.originale);
        const rapporto = c.larghezza && c.altezza ? c.larghezza / c.altezza : 0;
        // Il difetto che nessun controllo automatico vede: la panoramica di
        // palco in cui l'artista e' una sagoma. Un'immagine molto piu' larga
        // che alta ne e' spesso una. E' un sospetto, non un verdetto.
        const largo = rapporto > 2.1;
        const riga = `  "${a.slug}": "${c.titolo}",`;
        return `
      <figure class="carta${largo ? ' larga' : ''}">
        ${min ? `<img loading="lazy" src="${esc(min)}" alt="">` : '<div class="vuoto">nessuna miniatura</div>'}
        <div class="vuoto2" hidden>immagine non caricata<br>apri la pagina su Commons per guardarla</div>
        <figcaption>
          <b>${c.punti || 0} punti</b>${largo ? ' · <span class="avviso">molto panoramica: guarda se il soggetto sia riconoscibile</span>' : ''}<br>
          ${esc(c.larghezza || '?')}&times;${esc(c.altezza || '?')} · ${esc(c.licenza || 'licenza non dichiarata')}<br>
          autore: ${esc(c.autore || 'non dichiarato')}<br>
          <a href="${esc(c.paginaFile || '#')}" target="_blank" rel="noopener">pagina su Commons</a>
        </figcaption>
        <button type="button" data-riga="${esc(riga)}">scelgo questa</button>
      </figure>`;
      })
      .join('');
    return `
    <section class="artista">
      <h2>${esc(a.nome)} <small>${esc(a.slug)} · ${a.schede || 0} schede${gia.has(a.slug) ? ' · ha un ritratto' : ''}</small></h2>
      <div class="fila">${carte}</div>
    </section>`;
  })
  .join('');

const pagina = `<!doctype html>
<html lang="it"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Scelta ritratti — banco di lavoro</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; padding: 24px 24px 220px; font: 15px/1.5 system-ui, sans-serif; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  .intro { max-width: 70ch; color: #666; margin: 0 0 28px; }
  .artista { border-top: 1px solid #ccc; padding-top: 18px; margin-top: 24px; }
  h2 { font-size: 18px; margin: 0 0 12px; }
  h2 small { font-weight: normal; color: #777; font-size: 13px; }
  .fila { display: flex; flex-wrap: wrap; gap: 16px; }
  .carta { margin: 0; width: 260px; border: 1px solid #ddd; border-radius: 8px; padding: 8px; }
  .carta.scelta { outline: 3px solid #2a7; }
  .carta img { width: 100%; height: 200px; object-fit: contain; background: #f2f2f2; display: block; }
  .vuoto { height: 200px; display: grid; place-items: center; background: #f2f2f2; color: #999; }
  /* Un riquadro vuoto non deve poter essere scambiato per una brutta foto: se
     la miniatura non arriva, la carta lo dice a lettere. */
  .carta.rotta img { display: none; }
  .carta.rotta .vuoto2 { height: 200px; display: grid; place-items: center; text-align: center;
    background: #fff4f4; color: #b04; font-size: 12px; padding: 8px; }
  figcaption { font-size: 12px; line-height: 1.45; margin: 8px 0; color: #555; }
  .avviso { color: #b04; }
  .carta.larga { border-color: #e5b; }
  button { width: 100%; padding: 7px; cursor: pointer; }
  #cesto { position: fixed; left: 0; right: 0; bottom: 0; background: #111; color: #eee; padding: 10px 16px; }
  #cesto textarea { width: 100%; height: 110px; font: 12px/1.4 ui-monospace, monospace; }
  .senza { color: #777; font-size: 13px; }
</style></head><body>
<h1>Scelta ritratti</h1>
<p class="intro">Candidati cercati il ${esc(quando || 'n.d.')} · ${daGuardare.length} artisti da guardare, fino a ${QUANTI} candidati ciascuno.
Le miniature arrivano da Wikimedia mentre scorri: niente viene scaricato sul disco.
Clicca <b>scelgo questa</b> sotto l'immagine giusta; in fondo alla pagina si accumulano le righe da incollare in <code>dati/ritratti-scelti.json</code>.
<b>Guarda l'immagine, non il punteggio</b>: il punteggio non sa se l'artista e' riconoscibile.</p>
${blocchi}
${senza.length ? `<section class="artista"><h2>Senza nessun candidato <small>${senza.length}</small></h2>
<p class="senza">${senza.map((a) => esc(a.nome) + (a.errore ? ' (errore: ' + esc(a.errore) + ')' : '')).join(' · ')}</p>
<p class="senza">Per questi la risposta puo' essere il riquadro grafico: non tutte le band hanno una foto libera, e dirlo e' meglio che pubblicare la foto di qualcun altro.</p></section>` : ''}
<div id="cesto">
  <div style="display:flex;gap:12px;align-items:center;margin-bottom:6px">
    <b>Righe scelte</b> <span id="conta">0</span>
    <button type="button" id="copia" style="width:auto;padding:4px 10px">seleziona tutto</button>
    <button type="button" id="svuota" style="width:auto;padding:4px 10px">svuota</button>
  </div>
  <textarea id="righe" spellcheck="false" placeholder="le righe compaiono qui"></textarea>
</div>
<script>
  // Se una miniatura non arriva (rete, file rimosso da Commons), la carta lo
  // dichiara invece di restare bianca: un riquadro vuoto verrebbe letto come
  // "foto brutta" e scarterebbe un candidato buono senza che nessuno lo sappia.
  Array.prototype.forEach.call(document.querySelectorAll('.carta img'), function (im) {
    im.addEventListener('error', function () {
      var c = im.closest('.carta');
      c.classList.add('rotta');
      c.querySelector('.vuoto2').hidden = false;
    });
  });
  var scelte = {};
  function ridisegna() {
    var v = Object.keys(scelte).map(function (k) { return scelte[k]; }).join('\\n');
    document.getElementById('righe').value = v;
    document.getElementById('conta').textContent = Object.keys(scelte).length;
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-riga]');
    if (!b) return;
    var riga = b.getAttribute('data-riga');
    var slug = riga.split('"')[1];
    var carta = b.closest('.carta');
    var fila = carta.parentNode;
    Array.prototype.forEach.call(fila.querySelectorAll('.carta'), function (c) { c.classList.remove('scelta'); });
    if (scelte[slug] === riga) { delete scelte[slug]; } else { scelte[slug] = riga; carta.classList.add('scelta'); }
    ridisegna();
  });
  document.getElementById('copia').addEventListener('click', function () {
    var t = document.getElementById('righe'); t.focus(); t.select();
    try { document.execCommand('copy'); } catch (err) {}
  });
  document.getElementById('svuota').addEventListener('click', function () {
    scelte = {};
    Array.prototype.forEach.call(document.querySelectorAll('.carta.scelta'), function (c) { c.classList.remove('scelta'); });
    ridisegna();
  });
</script>
</body></html>`;

mkdirSync('ritratti/anteprime', { recursive: true });
writeFileSync(USCITA, pagina);
console.log(`Scritto ${USCITA}`);
console.log(`  ${daGuardare.length} artisti con candidati da guardare, fino a ${QUANTI} ciascuno`);
console.log(`  ${senza.length} senza nessun candidato`);
console.log(`  ${gia.size} artisti hanno gia' un ritratto${TUTTI ? ' (inclusi lo stesso, --tutti)' : ' (esclusi)'}`);
console.log('\nAprila nel browser, guarda le immagini, e incolla le righe scelte in dati/ritratti-scelti.json.');
