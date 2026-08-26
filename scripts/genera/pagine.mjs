// Modelli delle pagine. L'ordine dei blocchi segue l'architettura editoriale
// approvata nella Costituzione (ROADMAP.md, sezione 4).

import { pagina, esc, radice, SITO } from './guscio.mjs';

// ------------------------------------------------------------- utilità

// Segno tipografico ripreso dalle righe musicali del logo (F24): due tratti
// di penna, non una nota disegnata. Sostituisce il punto medio come
// separatore tra i metadati e come marcatore prima dei suggerimenti — così
// che una pagina si riconosca anche ritagliata, senza il logo in vista.
const SEGNO = '<svg class="segno" viewBox="0 0 11 13" aria-hidden="true"><path d="M2 11.5 4.3 1.8M6.7 11.5 9 1.8"/></svg>';

/** Unisce pezzi di metadato col segno tipografico, invece del punto medio. Esegue l'escape internamente: passare testo grezzo, non già escapato. */
function conSegno(parti) {
  return parti
    .filter(Boolean)
    .map((p) => esc(p))
    .join(` ${SEGNO} `);
}

function hexToRgb(h) {
  const s = h.replace('#', '');
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function luminanza(h) {
  const [r, g, b] = hexToRgb(h).map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrasto(a, b) {
  const l1 = luminanza(a), l2 = luminanza(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}
/** Bianco o nero, quello che si legge meglio sul colore dato. */
export function suColore(hex) {
  return contrasto('#FFFFFF', hex) >= contrasto('#000000', hex) ? '#FFFFFF' : '#000000';
}

/** Iniziali per il riquadro identitario (spazio previsto per immagini autorizzate). */
function sigla(nome) {
  const parole = String(nome)
    .replace(/["'’(),.]/g, '')
    .split(/\s+/)
    .filter((p) => p.length > 1 && !/^(the|of|and|a|di|il|la|le|e|in|to|for|my|me)$/i.test(p));
  const scelte = parole.length ? parole : String(nome).split(/\s+/);
  return scelte.slice(0, 3).map((p) => p[0].toUpperCase()).join('');
}

function riquadroVisivo(nome, nota = 'Spazio immagine') {
  return `<div class="visivo" role="img" aria-label="${esc(nome)}">
        <span class="sigla" aria-hidden="true">${esc(sigla(nome))}</span>
        <span class="nota" aria-hidden="true">${esc(nota)}</span>
      </div>`;
}

/** Taglia a una frase intera, senza mai spezzare una parola. */
function primaFrase(testo, max = 130) {
  if (!testo) return '';
  const t = String(testo).trim();
  const fine = t.search(/[.!?](\s|$)/);
  let s = fine > 0 && fine < max ? t.slice(0, fine + 1) : t;
  if (s.length > max) {
    s = s.slice(0, max);
    s = s.slice(0, s.lastIndexOf(' ')) + '…';
  }
  return s;
}

/**
 * Riga di richiamo mostrata sulle schede.
 * Usa il gancio scritto a mano quando c'è; altrimenti l'apertura verificata
 * della scheda — un estratto, non un testo inventato.
 */
export function richiamo(c) {
  if (c.gancio) return c.gancio;
  return primaFrase(c.corpo[0] || '', 118);
}

/**
 * Cosa manca per lo standard 4A della Costituzione, scheda per scheda.
 * Uso interno (scripts/check-completezza.mjs): non è più mostrato in pagina —
 * un lettore non deve vedere un giudizio sul processo editoriale, solo,
 * dove serve, la dichiarazione onesta di cosa manca (F22).
 */
export function dettagliCompletezza(c) {
  const manca = [];
  if (!c.fraseIconica) manca.push('fraseIconica');
  if (!c.spotifyId) manca.push('spotifyId');
  if (!c.testoUrl) manca.push('testoUrl');
  if ((c.fonti || []).length < 2) manca.push('fonti (almeno 2)');
  if ((c.corpo || []).length < 2) manca.push('corpo (almeno 2 paragrafi)');
  return { completa: manca.length === 0, manca };
}

function annoDi(c) {
  return String(c.anno || '').match(/\d{4}/)?.[0] || c.anno || '';
}

// --------------------------------------------------------- pagina canzone

export function paginaCanzone(c, ctx) {
  const r = radice(2);
  const artista = ctx.artistiPerSlug.get(c.artistaSlug);
  const altre = (artista?.canzoni || []).filter((s) => s !== c.slug).slice(0, 6).map((s) => ctx.canzoniPerSlug.get(s));
  const albumNoto = c.albumSlug && ctx.albumPerSlug.has(`${c.artistaSlug}/${c.albumSlug}`);

  const corpoHtml = c.corpo.map((p) => `<p>${esc(p)}</p>`).join('\n        ');

  const extra = (c.sezioniExtra || [])
    .map((s) => {
      const par = s.paragrafi.map((p) => `<p>${esc(p)}</p>`).join('\n        ');
      const dl = s.coppie.length
        ? `<dl class="crediti">${s.coppie
            .map((k) => `<dt>${esc(k.etichetta)}</dt><dd>${esc(k.valore)}</dd>`)
            .join('')}</dl>`
        : '';
      return `<section class="blocco"><h2>${esc(s.titolo)}</h2><div class="prosa">${par}${dl}</div></section>`;
    })
    .join('\n      ');

  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso">
      <a href="${r}">Home</a><span>/</span>
      <a href="${r}artista/${c.artistaSlug}/">${esc(c.artista)}</a><span>/</span>
      ${esc(c.titolo)}
    </nav>

    <header class="intestazione testa-doppia">
      <div>
        <p class="sopratitolo">${conSegno([c.artista, annoDi(c), c.album])}</p>
        <h1>${esc(c.titolo)}</h1>
        ${richiamo(c) ? `<p class="sintesi">${esc(richiamo(c))}</p>` : ''}
        <div class="affidabilita">
          <span class="verifica">Ultima revisione ${SEGNO} ${esc(ctx.dataRevisione)}</span>
        </div>
        <div class="condividi">
          <button type="button" class="bottone pieno" data-condividi
            data-titolo="${esc(`${c.titolo} — ${c.artista}`)}"
            data-testo="${esc(richiamo(c) || `${c.titolo} di ${c.artista}: cosa c'è dietro questa canzone.`)}"
            data-url="${SITO.base}/canzone/${c.slug}/">Condividi</button>
          <a class="bottone" href="${r}og/${c.slug}.png" download>Scarica l'immagine</a>
          <span class="conferma" data-condividi-conferma hidden aria-live="polite">Link copiato</span>
        </div>
      </div>
      ${riquadroVisivo(c.titolo)}
    </header>

    <section class="blocco" id="momento" style="border-top:0;padding-top:0">
      ${
        c.fraseIconica
          ? `<figure class="momento">
        <span class="etichetta">Momento iconico</span>
        <p>${esc(c.fraseIconica)}</p>
        <span class="cautela">Descritto con parole nostre: non riproduciamo il testo della canzone.</span>
      </figure>`
          : `<p class="vuoto">Il momento iconico di questa canzone non è stato ancora individuato.</p>`
      }
    </section>

    <section class="blocco" id="storia">
      <h2>La storia</h2>
      <div class="prosa">
        ${corpoHtml}
      </div>
    </section>

    ${extra}

    <section class="blocco" id="ascolta">
      <h2>Ascolta</h2>
      <div class="ascolto">
        ${
          c.spotifyId
            ? `<iframe src="https://open.spotify.com/embed/track/${esc(c.spotifyId)}?utm_source=generator" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="${esc(c.titolo)} su Spotify"></iframe>`
            : `<p class="assente">Il player ufficiale per questo brano non è ancora stato collegato.</p>`
        }
        ${c.testoUrl ? '' : `<p class="assente">Il link a un testo verificato non è ancora stato collegato.</p>`}
      </div>
      <div class="azioni">
        ${c.testoUrl ? `<a class="bottone pieno" href="${esc(c.testoUrl)}" target="_blank" rel="noopener">Leggi il testo su ${esc(c.testoFonte || 'fonte esterna')}</a>` : ''}
        <a class="bottone" href="${r}artista/${c.artistaSlug}/">Tutto su ${esc(c.artista)}</a>
        ${albumNoto ? `<a class="bottone" href="${r}album/${c.artistaSlug}/${c.albumSlug}/">L'album ${esc(c.album)}</a>` : ''}
      </div>
    </section>

    <section class="blocco" id="fonti">
      <h2>Fonti</h2>
      ${
        c.fonti.length
          ? `<ol class="fonti">${c.fonti
              .map((f, i) => `<li><span class="num">${String(i + 1).padStart(2, '0')}</span><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.nome)}</a></li>`)
              .join('')}</ol>`
          : `<p class="vuoto">Fonti da collegare.</p>`
      }
      <div class="azioni" style="margin-top:22px">
        <a class="bottone" href="${r}metodo/">Come verifichiamo</a>
        <a class="bottone" href="mailto:g.prizio@icloud.com?subject=${encodeURIComponent(`Dietro il testo — correzione: ${c.titolo}`)}">Segnala un errore</a>
      </div>
    </section>

    ${
      altre.length
        ? `<section class="blocco" id="correlate">
      <h2>Altre canzoni di ${esc(c.artista)}</h2>
      <div class="griglia">
        ${altre.map((x) => schedaCanzone(x, r)).join('\n        ')}
      </div>
    </section>`
        : ''
    }
  </div>`;

  const descr = richiamo(c) || `${c.titolo} di ${c.artista}: contesto, significato e fonti verificate.`;

  return pagina({
    profondita: 2,
    percorso: `canzone/${c.slug}/`,
    titolo: `${c.titolo} — ${c.artista}`,
    descrizione: descr,
    identita: c.colore || undefined,
    identitaContrasto: c.colore ? suColore(c.colore) : undefined,
    ogImage: `og/${c.slug}.png`,
    totali: ctx.totali,
    corpo,
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@type': 'MusicRecording',
      name: c.titolo,
      byArtist: { '@type': 'MusicGroup', name: c.artista, url: `${SITO.base}/artista/${c.artistaSlug}/` },
      ...(c.album ? { inAlbum: { '@type': 'MusicAlbum', name: c.album } } : {}),
      ...(annoDi(c) ? { datePublished: annoDi(c) } : {}),
      url: `${SITO.base}/canzone/${c.slug}/`,
      description: descr,
    },
  });
}

// ------------------------------------------------------------ schede/righe

export function schedaCanzone(c, r) {
  if (!c) return '';
  return `<a class="scheda" href="${r}canzone/${c.slug}/" style="--identita:${c.colore || 'var(--sistema)'}">
          <span class="sopra">${conSegno([c.album, annoDi(c)])}</span>
          <span class="titolo">${esc(c.titolo)}</span>
          ${richiamo(c) ? `<span class="gancio">${esc(richiamo(c))}</span>` : ''}
        </a>`;
}

function rigaArtista(a, r) {
  const conta = conSegno([
    `${a.canzoni.length} ${a.canzoni.length === 1 ? 'canzone' : 'canzoni'}`,
    a.album.length ? `${a.album.filter((x) => x.titolo).length} album` : null,
  ]);
  const meta = conSegno([a.generi[0], a.paese === 'it' ? 'Italia' : null]);
  return `<a class="riga" href="${r}artista/${a.slug}/">
        <span class="meta">${meta || '—'}</span>
        <span class="nome">${esc(a.nome)}</span>
        <span class="conta">${conta} →</span>
      </a>`;
}

// --------------------------------------------------------- pagina artista

export function paginaArtista(a, ctx) {
  const r = radice(2);
  const brani = a.canzoni.map((s) => ctx.canzoniPerSlug.get(s)).filter(Boolean);
  const albumVeri = a.album.filter((x) => x.titolo);
  const note = a.album.filter((x) => !x.titolo && x.nota);

  const arco = a.annoPrimo ? (a.annoPrimo === a.annoUltimo ? `${a.annoPrimo}` : `${a.annoPrimo}–${a.annoUltimo}`) : '—';

  const snodi = [
    { id: 'canzoni', nome: 'Canzoni', n: brani.length },
    albumVeri.length ? { id: 'dischi', nome: 'Album', n: albumVeri.length } : null,
    a.storia ? { id: 'storia', nome: 'Storia', n: '' } : null,
  ].filter(Boolean);

  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso">
      <a href="${r}">Home</a><span>/</span>
      <a href="${r}archivio/">Archivio</a><span>/</span>
      ${esc(a.nome)}
    </nav>

    <header class="intestazione testa-doppia">
      <div>
        <p class="sopratitolo">${conSegno([a.paese === 'it' ? 'Italia' : 'Artista', a.annoPrimo ? `brani dal ${a.annoPrimo}` : null])}</p>
        <h1>${esc(a.nome)}</h1>
        ${a.storia ? `<p class="sintesi">${esc(primaFrase(a.storia, 210))}</p>` : `<p class="sintesi">${brani.length} ${brani.length === 1 ? 'canzone raccontata' : 'canzoni raccontate'} su questo sito.</p>`}
        <div class="affidabilita">
          <span class="bollo${a.storia ? '' : ' attesa'}">${a.storia ? 'Storia documentata' : 'Storia da scrivere'}</span>
          <span class="verifica">Ultima revisione ${SEGNO} ${esc(ctx.dataRevisione)}</span>
        </div>
      </div>
      ${riquadroVisivo(a.nome)}
    </header>

    <nav class="snodi" aria-label="Sezioni della pagina">
      ${snodi.map((s) => `<a class="voce" href="#${s.id}">${esc(s.nome)} ${s.n !== '' ? `<b>${s.n}</b>` : ''}</a>`).join('\n      ')}
    </nav>

    <dl class="fatti">
      <div class="fatto"><dt>Canzoni sul sito</dt><dd>${brani.length}</dd></div>
      <div class="fatto"><dt>Arco temporale</dt><dd>${esc(arco)}</dd></div>
      <div class="fatto"><dt>Album in studio</dt><dd>${albumVeri.length || '—'}</dd></div>
      <div class="fatto"><dt>Generi</dt><dd>${esc(a.generi.length ? a.generi.join(', ') : '—')}</dd></div>
    </dl>

    <section class="blocco" id="canzoni" style="border-top:0;padding-top:0">
      <h2>Parti da una canzone</h2>
      <div class="griglia">
        ${brani.map((b) => schedaCanzone(b, r)).join('\n        ')}
      </div>
    </section>

    ${
      albumVeri.length
        ? `<section class="blocco" id="dischi">
      <h2>Discografia in studio</h2>
      <div class="dischi">
        ${albumVeri
          .map(
            (d, i) => `<a class="disco" href="${r}album/${a.slug}/${d.slug}/">
          <span class="indice">${String(i + 1).padStart(2, '0')}</span>
          <span><span class="titolo">${esc(d.titolo)}</span>${d.nota ? `<span class="nota">${esc(d.nota)}</span>` : ''}</span>
          <span class="anno">${esc(d.anno || '')}</span>
        </a>`
          )
          .join('\n        ')}
      </div>
      ${note.length ? `<p class="vuoto" style="margin-top:18px">${note.map((n) => esc(n.nota)).join(` ${SEGNO} `)}</p>` : ''}
    </section>`
        : ''
    }

    ${
      a.storia
        ? `<section class="blocco" id="storia">
      <h2>La storia del gruppo</h2>
      <div class="prosa"><p>${esc(a.storia)}</p></div>
    </section>`
        : `<section class="blocco" id="storia">
      <h2>La storia del gruppo</h2>
      <p class="vuoto">Non abbiamo ancora una storia verificata per ${esc(a.nome)}: preferiamo lasciarla vuota piuttosto che riempirla con notizie non controllate.</p>
    </section>`
    }

    <section class="blocco">
      <div class="azioni">
        <a class="bottone" href="${r}archivio/">Sfoglia tutto l'archivio</a>
        <a class="bottone" href="mailto:g.prizio@icloud.com?subject=${encodeURIComponent(`Dietro il testo — ${a.nome}`)}">Segnala un errore</a>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 2,
    percorso: `artista/${a.slug}/`,
    titolo: `${a.nome} — storia, album e canzoni`,
    descrizione: a.storia
      ? primaFrase(a.storia, 155)
      : `${a.nome}: le ${brani.length} canzoni raccontate su Dietro il testo, con contesto e fonti verificate.`,
    identita: a.colore || undefined,
    identitaContrasto: a.colore ? suColore(a.colore) : undefined,
    totali: ctx.totali,
    corpo,
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: a.nome,
      url: `${SITO.base}/artista/${a.slug}/`,
      ...(a.storia ? { description: primaFrase(a.storia, 300) } : {}),
    },
  });
}

// ----------------------------------------------------------- pagina album

export function paginaAlbum(al, ctx) {
  const r = radice(3);
  const a = ctx.artistiPerSlug.get(al.artistaSlug);
  const brani = (a?.canzoni || [])
    .map((s) => ctx.canzoniPerSlug.get(s))
    .filter((c) => c && c.albumSlug === al.slug);

  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso">
      <a href="${r}">Home</a><span>/</span>
      <a href="${r}artista/${al.artistaSlug}/">${esc(a?.nome || '')}</a><span>/</span>
      ${esc(al.titolo)}
    </nav>

    <header class="intestazione testa-doppia">
      <div>
        <p class="sopratitolo">${conSegno([a?.nome, al.anno])} ${SEGNO} Album in studio</p>
        <h1>${esc(al.titolo)}</h1>
        ${al.nota ? `<p class="sintesi">${esc(al.nota[0].toUpperCase() + al.nota.slice(1))}.</p>` : ''}
        <div class="affidabilita">
          <span class="bollo${al.copertina ? '' : ' attesa'}">${al.copertina ? 'Copertina documentata' : 'Copertina non documentata'}</span>
          <span class="verifica">Ultima revisione ${SEGNO} ${esc(ctx.dataRevisione)}</span>
        </div>
      </div>
      ${riquadroVisivo(al.titolo)}
    </header>

    <section class="blocco" id="copertina" style="border-top:0;padding-top:0">
      <h2>La copertina</h2>
      ${
        al.copertina
          ? `<figure class="momento"><span class="etichetta">Cosa raffigura</span><p>${esc(al.copertina)}</p></figure>`
          : `<p class="vuoto">Non risulta disponibile una spiegazione ufficiale verificabile della copertina di questo album. Quando la troveremo, la aggiungeremo con la fonte.</p>`
      }
    </section>

    ${
      brani.length
        ? `<section class="blocco" id="tracce">
      <h2>${brani.length === 1 ? 'Una canzone raccontata' : 'Canzoni raccontate'} da questo album</h2>
      <div class="griglia">
        ${brani.map((b) => schedaCanzone(b, r)).join('\n        ')}
      </div>
    </section>`
        : `<section class="blocco" id="tracce">
      <h2>Canzoni da questo album</h2>
      <p class="vuoto">Nessuna canzone di questo album è ancora raccontata sul sito.</p>
    </section>`
    }

    <section class="blocco">
      <div class="azioni">
        <a class="bottone pieno" href="${r}artista/${al.artistaSlug}/">Torna a ${esc(a?.nome || 'artista')}</a>
        <a class="bottone" href="mailto:g.prizio@icloud.com?subject=${encodeURIComponent(`Dietro il testo — ${al.titolo}`)}">Segnala un errore</a>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 3,
    percorso: `album/${al.artistaSlug}/${al.slug}/`,
    titolo: `${al.titolo} — ${a?.nome || ''}`,
    descrizione: al.nota
      ? `${al.titolo} di ${a?.nome}${al.anno ? ` (${al.anno})` : ''}: ${al.nota}.`
      : `${al.titolo} di ${a?.nome}${al.anno ? ` (${al.anno})` : ''} su Dietro il testo.`,
    identita: al.colore || undefined,
    identitaContrasto: al.colore ? suColore(al.colore) : undefined,
    totali: ctx.totali,
    corpo,
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@type': 'MusicAlbum',
      name: al.titolo,
      byArtist: { '@type': 'MusicGroup', name: a?.nome, url: `${SITO.base}/artista/${al.artistaSlug}/` },
      ...(al.anno ? { datePublished: String(al.anno) } : {}),
      url: `${SITO.base}/album/${al.artistaSlug}/${al.slug}/`,
    },
  });
}

// ------------------------------------------------------------------ home

export function paginaHome(ctx) {
  const r = radice(0);
  const { canzoni, artisti } = ctx;

  // Pillola del giorno: scelta deterministica dalla data, uguale per tutti nella giornata.
  const giorno = Math.floor(Date.now() / 86400000);
  const candidate = canzoni.filter((c) => c.fraseIconica);
  const inEvidenza = candidate[giorno % candidate.length];

  const artistiRicchi = [...artisti]
    .filter((a) => a.storia)
    .sort((x, y) => y.canzoni.length - x.canzoni.length || x.nome.localeCompare(y.nome, 'it'))
    .slice(0, 6);

  const recenti = [...canzoni].slice(-6).reverse();

  const corpo = `
  <div class="col apertura-riga">
    <div class="apertura">
      <a class="marchio-apertura" href="${r || './'}" aria-label="${esc(SITO.nome)} — home">
        <img src="${r}logo.png" alt="${esc(SITO.nome)}" width="1061" height="245">
      </a>
      <p class="occhiello">Un solo posto ${SEGNO} fonti verificabili</p>
      <p class="promessa">Cerca una canzone, un album o una band: arrivi subito a cosa c'è dietro, con le fonti sotto mano.</p>

      <div class="cerca grande" data-cerca>
        <svg class="lente" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>
        <input type="search" placeholder="Canzone, artista o album…" aria-label="Cerca nel sito"
               autocomplete="off" spellcheck="false" data-campo>
        <div class="esiti" hidden data-esiti role="listbox" aria-label="Risultati"></div>
      </div>

      <div class="suggerimenti">
        <span class="etichetta">Prova</span>
        ${['Bohemian Rhapsody', 'Metallica', 'Nirvana', 'Vasco Rossi']
          .map((q) => `<button type="button" data-esempio="${esc(q)}">${SEGNO} ${esc(q)}</button>`)
          .join('\n        ')}
        <button type="button" data-sorprendimi>Sorprendimi ✦</button>
      </div>
    </div>

    ${
      inEvidenza
        ? `<div class="pillola-riquadro">
      <p class="occhiello">La pillola di oggi</p>
      <article class="pillola" style="--identita:${inEvidenza.colore || 'var(--sistema)'}">
        <p class="occhiello" style="color:var(--identita-testo)">${conSegno([inEvidenza.artista, annoDi(inEvidenza)])}</p>
        <p class="gancio">${esc(inEvidenza.titolo)}</p>
        <p class="estratto">${esc(primaFrase(inEvidenza.fraseIconica, 260))}</p>
        <div class="azioni">
          <a class="bottone pieno" href="${r}canzone/${inEvidenza.slug}/">Leggi la scheda</a>
          <a class="bottone" href="${r}artista/${inEvidenza.artistaSlug}/">${esc(inEvidenza.artista)}</a>
        </div>
      </article>
    </div>`
        : ''
    }
  </div>

  <div class="col sezione">
    <div class="sezione-testa">
      <div>
        <p class="occhiello">Artisti da esplorare</p>
        <h2>Storia, dischi e canzoni.</h2>
      </div>
      <a class="vedi-tutto" href="${r}archivio/#artisti">Tutti i ${artisti.length} artisti →</a>
    </div>
    <div class="righe">
      ${artistiRicchi.map((a) => rigaArtista(a, r)).join('\n      ')}
    </div>
  </div>

  <div class="col sezione">
    <div class="sezione-testa">
      <div>
        <p class="occhiello">Ultime aggiunte</p>
        <h2>Appena raccontate.</h2>
      </div>
      <a class="vedi-tutto" href="${r}archivio/">Tutte le ${canzoni.length} canzoni →</a>
    </div>
    <div class="griglia">
      ${recenti.map((c) => schedaCanzone(c, r)).join('\n      ')}
    </div>
  </div>`;

  return pagina({
    profondita: 0,
    percorso: '',
    titolo: 'Cerca una canzone, un album o una band',
    descrizione: `${canzoni.length} canzoni e ${artisti.length} artisti: contesto, significato e fonti verificate. Mai i testi.`,
    totali: ctx.totali,
    ricercaInTestata: false,
    marchioInTestata: false,
    corpo,
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITO.nome,
      url: SITO.base + '/',
      description: SITO.descrizione,
    },
  });
}

// -------------------------------------------------------------- archivio

export function paginaArchivio(ctx) {
  const r = radice(1);
  const { canzoni, artisti } = ctx;

  const generi = [
    ['rock', 'Rock'],
    ['metal', 'Metal'],
    ['pop', 'Pop'],
    ['punk', 'Punk'],
    ['rap', 'Rap / Hip hop'],
    ['elettronica', 'Elettronica'],
  ];

  const ordinate = [...canzoni].sort((a, b) => a.titolo.localeCompare(b.titolo, 'it'));

  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso"><a href="${r}">Home</a><span>/</span>Archivio</nav>

    <header class="intestazione">
      <p class="sopratitolo">Tutto quello che c'è</p>
      <h1>L'archivio completo.</h1>
      <p class="sintesi">${canzoni.length} canzoni e ${artisti.length} artisti. Filtra per genere o cerca direttamente.</p>
    </header>

    <section class="blocco" id="canzoni" style="border-top:0;padding-top:0">
      <div class="filtri" role="group" aria-label="Filtra per genere">
        <button class="filtro" type="button" data-genere="" aria-pressed="true">Tutti</button>
        ${generi.map(([k, n]) => `<button class="filtro" type="button" data-genere="${k}" aria-pressed="false">${esc(n)}</button>`).join('\n        ')}
        <button class="filtro" type="button" data-paese="it" aria-pressed="false">Artisti italiani</button>
      </div>
      <p class="conteggio" data-conteggio aria-live="polite">${canzoni.length} canzoni</p>
      <div class="griglia" data-elenco>
        ${ordinate
          .map(
            (c) =>
              `<a class="scheda" href="${r}canzone/${c.slug}/" style="--identita:${c.colore || 'var(--sistema)'}" data-generi="${esc(c.generi.join(' '))}" data-paese="${esc(c.paese || '')}">
          <span class="sopra">${conSegno([c.artista, annoDi(c)])}</span>
          <span class="titolo">${esc(c.titolo)}</span>
          ${richiamo(c) ? `<span class="gancio">${esc(richiamo(c))}</span>` : ''}
        </a>`
          )
          .join('\n        ')}
      </div>
    </section>

    <section class="blocco" id="artisti">
      <h2>Tutti gli artisti</h2>
      <div class="righe">
        ${artisti.map((a) => rigaArtista(a, r)).join('\n        ')}
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 1,
    percorso: 'archivio/',
    titolo: 'Archivio completo',
    descrizione: `Tutte le ${canzoni.length} canzoni e i ${artisti.length} artisti raccontati su Dietro il testo.`,
    totali: ctx.totali,
    corpo,
  });
}

// ---------------------------------------------------------------- metodo

export function paginaMetodo(ctx) {
  const r = radice(1);
  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso"><a href="${r}">Home</a><span>/</span>Metodo</nav>

    <header class="intestazione">
      <p class="sopratitolo">Come lavoriamo</p>
      <h1>Metodo e fonti.</h1>
      <p class="sintesi">Questo sito esiste per una ragione sola: dire cosa c'è dietro una canzone senza inventare nulla. Ecco come.</p>
    </header>

    <section class="blocco" style="border-top:0;padding-top:0">
      <h2>Cosa pubblichiamo</h2>
      <div class="prosa">
        <p>Pubblichiamo un fatto solo se è riconducibile a una fonte che lo sostenga davvero: un'intervista all'artista, i crediti di un disco, un ente di certificazione, un archivio ufficiale o una testata musicale con responsabilità editoriale.</p>
        <p>Quando una spiegazione è un'interpretazione diffusa ma non confermata dall'autore, lo scriviamo. Quando non troviamo una fonte affidabile, non riempiamo lo spazio: preferiamo una scheda più corta a una scheda più fragile. È il motivo per cui alcune pagine dicono apertamente che una spiegazione non risulta documentata.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Perché non trovi i testi</h2>
      <div class="prosa">
        <p>Non riproduciamo versi, ritornelli o traduzioni, nemmeno parziali. Il "momento iconico" di ogni scheda è descritto con parole nostre: raccontiamo cosa dice quel passaggio e da dove nasce, senza copiarlo.</p>
        <p>Per leggere un testo per intero ogni scheda rimanda a una fonte esterna, che se ne assume la responsabilità editoriale. Prima di pubblicare un collegamento verifichiamo che porti davvero alla canzone giusta.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Le immagini</h2>
      <div class="prosa">
        <p>Non ospitiamo copertine, fotografie o loghi di cui non abbiamo una licenza o un'autorizzazione documentata: il fatto che un'immagine sia reperibile online non la rende riutilizzabile. Gli spazi colorati che vedi nelle pagine sono grafica originale, e restano pronti ad accogliere un'immagine il giorno in cui i diritti saranno chiari.</p>
        <p>I colori di ogni pagina richiamano l'immaginario visivo di una band o di un album; non riproducono i loro marchi.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Gerarchia delle fonti</h2>
      <div class="prosa">
        <p><strong>Preferite:</strong> canali ufficiali dell'artista o dell'etichetta, interviste dirette, libretti e crediti, enti come Grammy, FIMI, RIAA e BPI, archivi e istituzioni pubbliche.</p>
        <p><strong>Affidabili con attribuzione:</strong> testate musicali riconoscibili con firma e data, quotidiani e periodici con controllo editoriale, libri e documentari identificabili.</p>
        <p><strong>Solo come pista di ricerca:</strong> Wikipedia, database collaborativi e siti di interpretazione. Da soli non bastano per fatti controversi, intenzioni attribuite all'autore, spiegazioni di copertine o numeri di vendita.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Hai trovato un errore?</h2>
      <div class="prosa">
        <p>Segnalacelo: correggiamo volentieri, e una correzione vale più di una scheda in più.</p>
      </div>
      <div class="azioni">
        <a class="bottone pieno" href="mailto:g.prizio@icloud.com?subject=Dietro%20il%20testo%20%E2%80%94%20segnalazione">Scrivici</a>
        <a class="bottone" href="${r}archivio/">Torna all'archivio</a>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 1,
    percorso: 'metodo/',
    titolo: 'Metodo e fonti',
    descrizione: 'Come verifichiamo le informazioni, perché non pubblichiamo i testi delle canzoni e quali fonti consideriamo attendibili.',
    totali: ctx.totali,
    corpo,
  });
}
