// Modelli delle pagine. L'ordine dei blocchi segue l'architettura editoriale
// approvata nella Costituzione (ROADMAP.md, sezione 4).

import { pagina, esc, radice, SITO, AUTORE } from './guscio.mjs';

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

// F54/F56: nomi leggibili dei generi, unica fonte per archivio, schede e
// raccolte — un genere futuro senza voce qui usa lo slug capitalizzato,
// non blocca la pubblicazione automatica quando supera la soglia.
export const NOMI_GENERE = {
  rock: 'Rock',
  metal: 'Metal',
  pop: 'Pop',
  punk: 'Punk',
  rap: 'Rap / Hip hop',
  elettronica: 'Elettronica',
};
export function nomeGenere(slug) {
  return NOMI_GENERE[slug] || slug[0].toUpperCase() + slug.slice(1);
}

// F55: formulazione italiana dei decenni, usata in h1, briciole e chip —
// mai inventata caso per caso. Le chiavi sono l'anno iniziale come stringa
// (coerente con lo slug di pagina "/anni/1990/").
export const NOMI_DECENNIO = {
  1950: 'anni Cinquanta',
  1960: 'anni Sessanta',
  1970: 'anni Settanta',
  1980: 'anni Ottanta',
  1990: 'anni Novanta',
  2000: 'anni Duemila',
  2010: 'anni Duemiladieci',
  2020: 'anni Venti',
};

// F17: valori ammessi per il ruolo di una fonte, e come si etichetta ogni
// gruppo in pagina. Una fonte senza `ruolo` esplicito resta "storia" — non
// peggiora nulla rispetto a prima, si limita a dire cosa già si sapeva.
const RUOLI_FONTE = {
  storia: 'Sulla storia',
  ascolti: 'Sugli ascolti',
  crediti: 'Sui crediti',
  curiosità: 'Sulle curiosità',
};

/** Raggruppa le fonti per ruolo invece di un elenco unico indistinto (F17). */
function gruppiFonti(fonti) {
  const gruppi = new Map();
  for (const f of fonti) {
    const ruolo = RUOLI_FONTE[f.ruolo] ? f.ruolo : 'storia';
    if (!gruppi.has(ruolo)) gruppi.set(ruolo, []);
    gruppi.get(ruolo).push(f);
  }
  return Object.keys(RUOLI_FONTE)
    .filter((ruolo) => gruppi.has(ruolo))
    .map((ruolo) => {
      const elenco = gruppi
        .get(ruolo)
        .map((f, i) => `<li><span class="num">${String(i + 1).padStart(2, '0')}</span><a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.nome)}</a></li>`)
        .join('');
      return `<div class="fonti-gruppo">
        <span class="fonti-etichetta">${esc(RUOLI_FONTE[ruolo])}</span>
        <ol class="fonti">${elenco}</ol>
      </div>`;
    })
    .join('\n      ');
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

/** F34: il player Spotify in apertura, al posto del segnaposto, quando c'è un ID verificato. */
function playerIntestazione(c) {
  return `<div class="player-intestazione">
        <iframe src="https://open.spotify.com/embed/track/${esc(c.spotifyId)}?utm_source=generator" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="${esc(c.titolo)} su Spotify"></iframe>
      </div>`;
}

// F58: parole che non possono mai essere l'ultima di una descrizione tagliata
// — congiunzioni, preposizioni, pronomi relativi — perché lasciano la frase
// evidentemente a metà anche quando non tagliano una parola a metà.
const PAROLE_DEBOLI = new Set(
  'che cui chi quando mentre dove come se perché poiché affinché sebbene benché nonostante e ed o od ma però quindi dunque anche ancora già non di a da in con su per tra fra il lo la i gli le un uno una suo sua suoi sue del dello della dei degli delle al allo alla ai agli alle dal dallo dalla dai dagli dalle nel nello nella nei negli nelle col coi'.split(
    ' '
  )
);

/** L'ultima parola di una stringa, o null se la stringa non finisce con una lettera vera (es. un'iniziale puntata come "K."). */
function ultimaParolaValida(s) {
  const m = s.match(/([A-Za-zÀ-ÖØ-öø-ÿ']+)$/);
  return m ? m[1].toLowerCase() : null;
}

function virgoletteBilanciate(s) {
  return (s.match(/"/g) || []).length % 2 === 0;
}

/** Un punto preceduto da una sigla puntata ("E.", "K.K.") non è mai fine frase. */
function eIniziale(testo, posPunto) {
  let inizio = posPunto;
  while (inizio > 0 && !/\s/.test(testo[inizio - 1])) inizio--;
  const token = testo.slice(inizio, posPunto);
  return /^[A-Z](\.[A-Z])*$/.test(token);
}

/**
 * F58: spezza un testo in frasi intere, ignorando la punteggiatura dentro le
 * virgolette (un titolo come "Vivo per..." o "Infected?" non deve rompere la
 * frase) e le sigle puntate. Usata sia per costruire le descrizioni sia,
 * indirettamente, per capire dove si può tagliare senza spezzare un pensiero.
 */
function frasiComplete(testo) {
  const frasi = [];
  let start = 0;
  let dentroVirgolette = false;
  let i = 0;
  const n = testo.length;
  while (i < n) {
    const ch = testo[i];
    if (ch === '"') dentroVirgolette = !dentroVirgolette;
    if (!dentroVirgolette && '.!?'.includes(ch)) {
      if (ch === '.' && eIniziale(testo, i)) {
        i++;
        continue;
      }
      let j = i + 1;
      while (j < n && '.!?'.includes(testo[j])) j++;
      if (j < n && testo[j] === '"') j++;
      if (j >= n || /\s/.test(testo[j])) {
        frasi.push(testo.slice(start, j).trim());
        start = j;
        i = j;
        continue;
      }
    }
    i++;
  }
  if (start < n) {
    const resto = testo.slice(start).trim();
    if (resto) frasi.push(resto);
  }
  return frasi.filter(Boolean);
}

/**
 * F58: la meta description si costruisce da frasi intere finché si sta sotto
 * `max` caratteri, chiudendo sempre col punto della frase — mai "…", mai a
 * metà parola. Quando la prima frase da sola supera già `max` (la norma in
 * questo corpus, non l'eccezione: verificato che succede per 103 canzoni su
 * 157), si scende di livello: si taglia all'ultima clausola (virgola) la cui
 * parola finale non è una congiunzione/preposizione debole, e in ultima
 * istanza all'ultima parola intera con la stessa regola. Non produce mai un
 * frammento evidentemente monco per un motivo meccanico (parola spezzata,
 * virgolette sbilanciate): i pochi casi che restano comunque incompleti nel
 * senso (non nella forma) si risolvono col campo editoriale `descrizioneSeo`.
 */
export function costruisciDescrizione(testo, max = 155) {
  const pulito = String(testo || '').trim();
  if (!pulito) return '';
  const frasi = frasiComplete(pulito).length ? frasiComplete(pulito) : [pulito];
  let acc = '';
  for (const f of frasi) {
    const candidato = acc ? `${acc} ${f}` : f;
    if (candidato.length <= max) acc = candidato;
    else break;
  }
  if (acc) return acc;

  const prima = frasi[0];
  const posizioni = [...prima.matchAll(/[,;]/g)].map((m) => m.index);
  for (let k = posizioni.length - 1; k >= 0; k--) {
    const cand = prima.slice(0, posizioni[k]).trim();
    if (cand.length + 1 > max) continue;
    const uv = ultimaParolaValida(cand);
    if (uv !== null && !PAROLE_DEBOLI.has(uv) && virgoletteBilanciate(cand)) return `${cand}.`;
  }

  let tagliato = prima.slice(0, max - 1);
  while (true) {
    const ultimoSpazio = tagliato.lastIndexOf(' ');
    if (ultimoSpazio <= 0) break;
    tagliato = tagliato.slice(0, ultimoSpazio);
    const uv = ultimaParolaValida(tagliato);
    if (uv !== null && !PAROLE_DEBOLI.has(uv) && virgoletteBilanciate(tagliato)) return `${tagliato.trim()}.`;
  }
  return `${prima.slice(0, max - 1).trim()}.`;
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

/** F53/F55: il primo gruppo di quattro cifre, mai un parsing posizionale su
 * formati "singolo / album" che non sono sempre nello stesso ordine. */
function primoAnno(annoRaw) {
  const m = String(annoRaw || '').match(/\d{4}/);
  return m ? parseInt(m[0], 10) : null;
}

/** F57: la prima forma che sta entro 65 caratteri, mai la forma piena a occhio — verificato che senza ripiego 5 titoli canzone superano il limite (fino a 71 caratteri). */
function titoloConRipiego(forme) {
  for (const f of forme) if (f.length <= 65) return f;
  return forme[forme.length - 1];
}

/** F45: unisce l'entità principale della pagina ai dati strutturati BreadcrumbList,
 * nello stesso ordine del percorso visibile (`nav.briciole`). */
function conBreadcrumb(entita, voci, extra = []) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      entita,
      {
        '@type': 'BreadcrumbList',
        itemListElement: voci.map((v, i) => ({ '@type': 'ListItem', position: i + 1, name: v.nome, item: v.url })),
      },
      ...extra,
    ],
  };
}

// F59: segnaposto per `dateModified`, sostituito col vero valore da
// `genera-sito.mjs` DOPO che il lastmod di F40 è stato calcolato — è la
// stessa identica data della sitemap, non può divergere per costruzione.
export const SEGNAPOSTO_DATA_MODIFICA = '__DATA_MODIFICA__';

// --------------------------------------------------------- pagina canzone

export function paginaCanzone(c, ctx) {
  const r = radice(2);
  const artista = ctx.artistiPerSlug.get(c.artistaSlug);
  const altre = (artista?.canzoni || []).filter((s) => s !== c.slug).slice(0, 6).map((s) => ctx.canzoniPerSlug.get(s));
  // F60: esattamente quattro collegamenti orizzontali, scelti da una regola
  // deterministica per affinità (album, artista, genere+decennio, genere,
  // decennio) e riequilibrati perché nessuna scheda resti isolata.
  const collegate = (c._collegamenti || []).map((s) => ctx.canzoniPerSlug.get(s)).filter(Boolean);
  // F51: il link usa lo slug di pagina disambiguato (F53), non lo slug
  // originale della canzone — nei rari casi di collisione non sono lo stesso.
  const albumSlugPagina = c._albumSlugPagina;
  const albumNoto = albumSlugPagina && ctx.albumPerSlug.has(`${c.artistaSlug}/${albumSlugPagina}`);

  // F56: le briciole passano dall'artista al genere principale — il primo
  // genere della canzone che sia anche una raccolta pubblicata. Senza un
  // genere pubblicato ricadono sull'archivio, mai su un genere sotto soglia
  // che porterebbe a un collegamento verso una pagina inesistente.
  const generePrincipale = c._generePrincipale;
  const briciolaMedia = generePrincipale
    ? { nome: nomeGenere(generePrincipale), percorso: `genere/${generePrincipale}/` }
    : { nome: 'Archivio', percorso: 'archivio/' };

  const etichette = generePrincipale || c._decennioPubblicato
    ? `<div class="suggerimenti">
          <span class="etichetta">Raccolte</span>
          ${generePrincipale ? `<a href="${r}genere/${generePrincipale}/">${esc(nomeGenere(generePrincipale))}</a>` : ''}
          ${c._decennioPubblicato ? `<a href="${r}anni/${c._decennioPubblicato}/">${esc(NOMI_DECENNIO[c._decennioPubblicato] || `anni ${c._decennioPubblicato}`)}</a>` : ''}
        </div>`
    : '';

  const corpoHtml = c.corpo.map((p) => `<p>${esc(p)}</p>`).join('\n        ');

  const extra = (c.sezioniExtra || [])
    .map((s, i) => {
      const par = s.paragrafi.map((p) => `<p>${esc(p)}</p>`).join('\n        ');
      const dl = s.coppie.length
        ? `<dl class="crediti">${s.coppie
            .map((k) => `<dt>${esc(k.etichetta)}</dt><dd>${esc(k.valore)}</dd>`)
            .join('')}</dl>`
        : '';
      return `<section class="blocco" id="extra-${i}"><h2>${esc(s.titolo)}</h2><div class="prosa">${par}${dl}</div></section>`;
    })
    .join('\n      ');

  // F29: un sommario cliccabile solo sulle schede con sezioniExtra — sono le
  // uniche significativamente più lunghe delle altre (che hanno quasi tutte
  // lo stesso numero di paragrafi). Sulle schede normali sarebbe rumore, non
  // un aiuto: niente indice se non c'è davvero un percorso lungo da saltare.
  const snodi = (c.sezioniExtra || []).length
    ? [
        { id: 'momento', nome: 'Momento iconico' },
        { id: 'storia', nome: 'La storia' },
        ...c.sezioniExtra.map((s, i) => ({ id: `extra-${i}`, nome: s.titolo })),
        { id: 'ascolta', nome: c.spotifyId ? 'Continua' : 'Ascolta' },
        { id: 'fonti', nome: 'Fonti' },
      ]
    : [];
  const indiceHtml = snodi.length
    ? `<nav class="snodi" aria-label="Sezioni della pagina">
      ${snodi.map((s) => `<a class="voce" href="#${s.id}">${esc(s.nome)}</a>`).join('\n      ')}
    </nav>`
    : '';

  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso">
      <a href="${r}">Home</a><span>/</span>
      <a href="${r}${briciolaMedia.percorso}">${esc(briciolaMedia.nome)}</a><span>/</span>
      ${esc(c.titolo)}
    </nav>

    <header class="intestazione testa-doppia">
      <div>
        <p class="sopratitolo">${conSegno([c.artista, annoDi(c), c.album])}</p>
        <h1>${esc(c.titolo)}</h1>
        ${etichette}
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
      ${c.spotifyId ? playerIntestazione(c) : riquadroVisivo(c.titolo)}
    </header>

    ${indiceHtml}

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
      <h2>${c.spotifyId ? 'Continua' : 'Ascolta'}</h2>
      <div class="ascolto">
        ${c.spotifyId ? '' : `<p class="assente">Il player ufficiale per questo brano non è ancora stato collegato.</p>`}
        ${c.testoUrl ? '' : `<p class="assente">Il link a un testo verificato non è ancora stato collegato.</p>`}
      </div>
      <div class="azioni">
        ${c.testoUrl ? `<a class="bottone pieno" href="${esc(c.testoUrl)}" target="_blank" rel="noopener">Leggi il testo su ${esc(c.testoFonte || 'fonte esterna')}</a>` : ''}
        <a class="bottone" href="${r}artista/${c.artistaSlug}/">Tutto su ${esc(c.artista)}</a>
        ${albumNoto ? `<a class="bottone" href="${r}album/${c.artistaSlug}/${albumSlugPagina}/">L'album ${esc(c.album)}</a>` : ''}
      </div>
    </section>

    ${
      collegate.length
        ? `<section class="blocco" id="continua">
      <h2>Continua da qui</h2>
      <div class="griglia">
        ${collegate.map((x) => schedaCanzone(x, r, { conArtista: true })).join('\n        ')}
      </div>
    </section>`
        : ''
    }

    <section class="blocco" id="fonti">
      <h2>Fonti</h2>
      ${c.fonti.length ? gruppiFonti(c.fonti) : `<p class="vuoto">Fonti da collegare.</p>`}
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

  // F58: mai il primo pezzo del corpo tagliato a lunghezza fissa — frasi
  // intere finché si sta sotto soglia, e solo dove serve (`descrizioneSeo`,
  // §11.7) una descrizione scritta a mano perché quella automatica non regge.
  const descr = c.descrizioneSeo || costruisciDescrizione(c.corpo.join(' '), 155) || `${c.titolo} di ${c.artista}: contesto, significato e fonti verificate.`;

  return pagina({
    profondita: 2,
    percorso: `canzone/${c.slug}/`,
    // F57: la domanda che si digita in italiano è "{titolo} significato", non
    // il nome dell'artista da solo — il ripiego scende a soli 5 titoli su 157.
    titolo: titoloConRipiego([`${c.titolo} (${c.artista}): significato e storia`, `${c.titolo}: significato e storia`]),
    descrizione: descr,
    identita: c.colore || undefined,
    identitaContrasto: c.colore ? suColore(c.colore) : undefined,
    ogImage: `og/${c.slug}.png`,
    ogType: 'music.song',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    corpo,
    datiStrutturati: conBreadcrumb(
      {
        '@type': 'MusicRecording',
        '@id': `${SITO.base}/canzone/${c.slug}/#brano`,
        name: c.titolo,
        byArtist: { '@type': 'MusicGroup', name: c.artista, url: `${SITO.base}/artista/${c.artistaSlug}/` },
        ...(c.album ? { inAlbum: { '@type': 'MusicAlbum', name: c.album } } : {}),
        ...(annoDi(c) ? { datePublished: annoDi(c) } : {}),
        url: `${SITO.base}/canzone/${c.slug}/`,
        description: descr,
      },
      [
        { nome: 'Home', url: `${SITO.base}/` },
        { nome: briciolaMedia.nome, url: `${SITO.base}/${briciolaMedia.percorso}` },
        { nome: c.titolo, url: `${SITO.base}/canzone/${c.slug}/` },
      ],
      // F59: la scheda è un articolo che parla di un MusicRecording, non il
      // MusicRecording stesso — da qui `about`, non un doppione delle stesse proprietà.
      [
        {
          '@type': 'Article',
          headline: c.titolo,
          about: { '@id': `${SITO.base}/canzone/${c.slug}/#brano` },
          isPartOf: { '@id': `${SITO.base}/#sito` },
          // F59/F61: l'autore è il sito stesso — scelta dell'autore, che firma
          // col nome del dominio invece che con un nome personale. Definito per
          // esteso qui e non solo per riferimento, così il grafo di questa
          // pagina si regge da solo; `publisher` richiama la stessa entità.
          author: {
            '@type': 'Organization',
            '@id': `${SITO.base}/#editore`,
            name: SITO.nome,
            url: `${SITO.base}/`,
          },
          publisher: { '@id': `${SITO.base}/#editore` },
          url: `${SITO.base}/canzone/${c.slug}/`,
          dateModified: SEGNAPOSTO_DATA_MODIFICA,
        },
      ]
    ),
  });
}

// ------------------------------------------------------------ schede/righe

// F60: il testo del collegamento è sempre titolo e artista, mai "leggi di
// più" — `conArtista` mostra l'artista al posto dell'album, utile dove
// l'album sarebbe ambiguo o assente (i collegamenti fra artisti diversi).
export function schedaCanzone(c, r, { conArtista = false } = {}) {
  if (!c) return '';
  return `<a class="scheda" href="${r}canzone/${c.slug}/" style="--identita:${c.colore || 'var(--sistema)'}">
          <span class="sopra">${conSegno(conArtista ? [c.artista, annoDi(c)] : [c.album, annoDi(c)])}</span>
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
  // F50/F51: la discografia mostra tutte le voci (originali + quelle emerse
  // dalle canzoni raccontate), ordinate per anno; quelle senza pagina restano
  // testo semplice invece di un link morto — il disco esiste, la pagina no.
  const albumVeri = [...(ctx.albumPerArtista.get(a.slug) || [])].sort((x, y) => (primoAnno(x.anno) || 0) - (primoAnno(y.anno) || 0));
  const riconoscimenti = a.riconoscimenti || [];

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
        ${a.storia ? '' : `<p class="sintesi">${brani.length} ${brani.length === 1 ? 'canzone raccontata' : 'canzoni raccontate'} su questo sito.</p>`}
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
          .map((d, i) => {
            const interno = `
          <span class="indice">${String(i + 1).padStart(2, '0')}</span>
          <span><span class="titolo">${esc(d.titolo)}</span>${d.nota ? `<span class="nota">${esc(d.nota)}</span>` : ''}</span>
          <span class="anno">${esc(d.anno || '')}</span>`;
            // F50: senza pagina propria il disco resta testo, non un link morto.
            return d.esiste
              ? `<a class="disco" href="${r}album/${a.slug}/${d.slug}/">${interno}</a>`
              : `<div class="disco disco-assente">${interno}</div>`;
          })
          .join('\n        ')}
      </div>
      ${riconoscimenti.length ? `<p class="vuoto" style="margin-top:18px">${riconoscimenti.map((n) => esc(n)).join(` ${SEGNO} `)}</p>` : ''}
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
    titolo: titoloConRipiego([`${a.nome}: le canzoni raccontate e la storia`, `${a.nome}: le canzoni raccontate`]),
    descrizione: a.storia
      ? costruisciDescrizione(a.storia, 155)
      : `${a.nome}: le ${brani.length} canzoni raccontate su Dietro il testo, con contesto e fonti verificate.`,
    identita: a.colore || undefined,
    identitaContrasto: a.colore ? suColore(a.colore) : undefined,
    ogType: 'profile',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    // F52: senza storia e con meno di tre canzoni raccontate, la pagina resta
    // pubblicata (P6 impone che esista) ma fuori dall'indice dei motori.
    noindexFollow: !a._indicizzabile,
    corpo,
    datiStrutturati: conBreadcrumb(
      {
        '@type': 'MusicGroup',
        name: a.nome,
        url: `${SITO.base}/artista/${a.slug}/`,
        dateModified: SEGNAPOSTO_DATA_MODIFICA,
        ...(a.storia ? { description: costruisciDescrizione(a.storia, 300) } : {}),
      },
      [
        { nome: 'Home', url: `${SITO.base}/` },
        { nome: 'Archivio', url: `${SITO.base}/archivio/` },
        { nome: a.nome, url: `${SITO.base}/artista/${a.slug}/` },
      ]
    ),
  });
}

// ----------------------------------------------------------- pagina album

export function paginaAlbum(al, ctx) {
  const r = radice(3);
  const a = ctx.artistiPerSlug.get(al.artistaSlug);
  // F53: confronta lo slug di pagina disambiguato, non lo slug originale della
  // canzone — nel caso di due album omonimi (es. Korn 1994/2007) i due slug
  // divergono per tutte le voci tranne la più vecchia, che li conserva uguali.
  const brani = (a?.canzoni || [])
    .map((s) => ctx.canzoniPerSlug.get(s))
    .filter((c) => c && c._albumSlugPagina === al.slug);
  // F64: senza questo, un album con copertina documentata ma zero canzoni
  // raccontate resta raggiungibile da un solo collegamento (la discografia
  // dell'artista) — sotto la soglia di due richiesta per le pagine indicizzabili.
  const altriAlbum = (ctx.albumPerArtista.get(al.artistaSlug) || [])
    .filter((d) => d.esiste && d.slug !== al.slug)
    .sort((x, y) => (primoAnno(x.anno) || 0) - (primoAnno(y.anno) || 0));

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

    ${
      altriAlbum.length
        ? `<section class="blocco" id="altri-album">
      <h2>Altri album di ${esc(a?.nome || '')}</h2>
      <div class="dischi">
        ${altriAlbum
          .map(
            (d) => `<a class="disco" href="${r}album/${al.artistaSlug}/${d.slug}/">
          <span><span class="titolo">${esc(d.titolo)}</span></span>
          <span class="anno">${esc(d.anno || '')}</span>
        </a>`
          )
          .join('\n        ')}
      </div>
    </section>`
        : ''
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
    // F48: la forma piena resta distinta da quella della canzone omonima
    // (es. Paranoid il brano vs Paranoid l'album) perché il testo dopo i due
    // punti è sempre diverso; i ripieghi mantengono "(album" esplicito per lo
    // stesso motivo, verificato sul caso peggiore (*Wednesday Morning, 3
    // A.M. / Sounds of Silence*, che serve il terzo gradino per stare sotto 65).
    titolo: titoloConRipiego([
      `${al.titolo} (${a?.nome || ''}): l'album e le canzoni raccontate`,
      `${al.titolo} (album, ${a?.nome || ''})`,
      `${al.titolo} (album)`,
    ]),
    // F58: il prefisso (titolo, artista, anno) è fisso e breve; solo la
    // nota — a volte lunga oltre 200 caratteri — passa dal costruttore di
    // frasi intere, col budget ridotto di quanto il prefisso ha già usato.
    descrizione: al.nota
      ? (() => {
          const prefisso = `${al.titolo} di ${a?.nome || ''}${al.anno ? ` (${al.anno})` : ''}: `;
          return `${prefisso}${costruisciDescrizione(`${al.nota}.`, Math.max(155 - prefisso.length, 40))}`;
        })()
      : `${al.titolo} di ${a?.nome}${al.anno ? ` (${al.anno})` : ''} su Dietro il testo.`,
    identita: al.colore || undefined,
    identitaContrasto: al.colore ? suColore(al.colore) : undefined,
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    // F50: con meno di tre canzoni raccontate e nessuna copertina documentata,
    // la pagina esiste (chi ha il link diretto la trova) ma resta fuori
    // dall'indice dei motori.
    noindexFollow: !al.indicizzabile,
    corpo,
    datiStrutturati: conBreadcrumb(
      {
        '@type': 'MusicAlbum',
        name: al.titolo,
        byArtist: { '@type': 'MusicGroup', name: a?.nome, url: `${SITO.base}/artista/${al.artistaSlug}/` },
        ...(al.anno ? { datePublished: String(al.anno) } : {}),
        url: `${SITO.base}/album/${al.artistaSlug}/${al.slug}/`,
        dateModified: SEGNAPOSTO_DATA_MODIFICA,
      },
      [
        { nome: 'Home', url: `${SITO.base}/` },
        { nome: a?.nome || '', url: `${SITO.base}/artista/${al.artistaSlug}/` },
        { nome: al.titolo, url: `${SITO.base}/album/${al.artistaSlug}/${al.slug}/` },
      ]
    ),
  });
}

// -------------------------------------------------------- pagina raccolta

/**
 * F54/F55: pagina di genere o decennio. Pubblicata solo quando la raccolta
 * supera la soglia definita in genera-sito.mjs (≥12 canzoni) e ha
 * un'introduzione approvata in dati/raccolte.json — mai una pagina vuota o
 * con un testo generico non verificato.
 */
export function paginaRaccolta(rac, ctx) {
  const r = radice(2);
  const brani = rac.canzoni.map((s) => ctx.canzoniPerSlug.get(s)).filter(Boolean);
  // I decenni si leggono meglio in ordine cronologico; i generi, troppo
  // numerosi per un ordine naturale, in ordine alfabetico di titolo.
  const ordinate =
    rac.tipo === 'decennio'
      ? [...brani].sort((x, y) => (primoAnno(x.anno) || 0) - (primoAnno(y.anno) || 0) || x.titolo.localeCompare(y.titolo, 'it'))
      : [...brani].sort((x, y) => x.titolo.localeCompare(y.titolo, 'it'));

  const altre = ctx.raccolte.filter((x) => x.percorso !== rac.percorso);

  const corpo = `
  <div class="col">
    <nav class="briciole" aria-label="Percorso">
      <a href="${r}">Home</a><span>/</span>
      <a href="${r}archivio/">Archivio</a><span>/</span>
      ${esc(rac.nome)}
    </nav>

    <header class="intestazione">
      <p class="sopratitolo">${rac.tipo === 'genere' ? 'Raccolta per genere' : 'Raccolta per decennio'}</p>
      <h1>${esc(rac.titoloH1)}</h1>
      <p class="sintesi">${brani.length} ${brani.length === 1 ? 'canzone raccontata' : 'canzoni raccontate'} su questo sito.</p>
    </header>

    <section class="blocco" style="border-top:0;padding-top:0">
      <div class="prosa"><p>${esc(rac.introduzione)}</p></div>
    </section>

    <section class="blocco" id="canzoni">
      <h2>${esc(rac.titoloH1)}</h2>
      <div class="griglia">
        ${ordinate.map((b) => schedaCanzone(b, r)).join('\n        ')}
      </div>
    </section>

    ${
      altre.length
        ? `<section class="blocco">
      <div class="suggerimenti">
        <span class="etichetta">Altre raccolte</span>
        ${altre.map((x) => `<a href="${r}${x.percorso}">${esc(x.nome)}</a>`).join('\n        ')}
      </div>
    </section>`
        : ''
    }

    <section class="blocco">
      <div class="azioni">
        <a class="bottone" href="${r}archivio/">Sfoglia tutto l'archivio</a>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 2,
    percorso: rac.percorso,
    titolo: rac.titoloSeo,
    descrizione: costruisciDescrizione(rac.introduzione, 155),
    ogType: 'article',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    corpo,
    datiStrutturati: conBreadcrumb(
      {
        '@type': 'CollectionPage',
        name: rac.titoloH1,
        url: `${SITO.base}/${rac.percorso}`,
        description: costruisciDescrizione(rac.introduzione, 300),
        dateModified: SEGNAPOSTO_DATA_MODIFICA,
        // F59: le canzoni contenute, non solo il conteggio — coerente col
        // conteggio già mostrato in pagina, non un numero scritto due volte a mano.
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: ordinate.length,
          itemListElement: ordinate.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITO.base}/canzone/${b.slug}/`,
            name: b.titolo,
          })),
        },
      },
      [
        { nome: 'Home', url: `${SITO.base}/` },
        { nome: 'Archivio', url: `${SITO.base}/archivio/` },
        { nome: rac.nome, url: `${SITO.base}/${rac.percorso}` },
      ]
    ),
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
      <h1 class="promessa">Cerca una canzone, un album o una band: arrivi subito a cosa c'è dietro, con le fonti sotto mano.</h1>

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
      <article class="pillola" data-pillola style="--identita:${inEvidenza.colore || 'var(--sistema)'}">
        <p class="occhiello" style="color:var(--identita-testo)" data-pillola-meta>${conSegno([inEvidenza.artista, annoDi(inEvidenza)])}</p>
        <p class="gancio" data-pillola-titolo>${esc(inEvidenza.titolo)}</p>
        <p class="estratto" data-pillola-estratto>${esc(primaFrase(inEvidenza.fraseIconica, 260))}</p>
        <div class="azioni">
          <a class="bottone pieno" href="${r}canzone/${inEvidenza.slug}/" data-pillola-link>Leggi la scheda</a>
          <a class="bottone" href="${r}artista/${inEvidenza.artistaSlug}/" data-pillola-artista>${esc(inEvidenza.artista)}</a>
          <button type="button" class="bottone" data-altra-pillola>Un'altra canzone ${SEGNO}</button>
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
    // F69: i meta di verifica stanno solo qui — entrambi i motori verificano
    // dalla home, e appesantire 422 pagine non servirebbe a nulla.
    verifiche: true,
    titolo: 'Cerca una canzone, un album o una band',
    descrizione: `${canzoni.length} canzoni e ${artisti.length} artisti: contesto, significato e fonti verificate. Mai i testi.`,
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    ricercaInTestata: false,
    marchioInTestata: false,
    ogImage: 'og/home.png',
    corpo,
    // F49: WebSite e Organization collegati via @id, così un motore di ricerca
    // può attribuire il sito a un editore invece che a un'entità isolata.
    // Nessun potentialAction/SearchAction: il sito non ha una vera pagina di
    // risultati raggiungibile da URL, solo una ricerca lato client — dichiararne
    // una finta violerebbe il principio "verità prima della quantità" (P1).
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITO.base}/#sito`,
          name: SITO.nome,
          url: SITO.base + '/',
          description: SITO.descrizione,
          publisher: { '@id': `${SITO.base}/#editore` },
        },
        {
          '@type': 'Organization',
          '@id': `${SITO.base}/#editore`,
          name: SITO.nome,
          url: SITO.base + '/',
          logo: { '@type': 'ImageObject', url: `${SITO.base}/logo.png` },
        },
      ],
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

    ${
      ctx.raccolte.length
        ? `<section class="blocco" style="border-top:0;padding-top:0">
      <div class="suggerimenti">
        <span class="etichetta">Sfoglia le raccolte</span>
        ${ctx.raccolte.map((x) => `<a href="${r}${x.percorso}">${esc(x.nome)} <b>${x.canzoni.length}</b></a>`).join('\n        ')}
      </div>
    </section>`
        : ''
    }

    <section class="blocco" id="canzoni" style="${ctx.raccolte.length ? '' : 'border-top:0;padding-top:0'}">
      <div class="filtri" role="group" aria-label="Filtra per genere">
        <button class="filtro" type="button" data-genere="" aria-pressed="true">Tutti</button>
        ${generi.map(([k, n]) => `<button class="filtro" type="button" data-genere="${k}" aria-pressed="false">${esc(n)}</button>`).join('\n        ')}
        <button class="filtro" type="button" data-paese="it" aria-pressed="false">Artisti italiani</button>
      </div>
      ${
        ctx.temi.length
          ? `<div class="filtri" role="group" aria-label="Filtra per tema" style="margin-top:10px">
        <button class="filtro" type="button" data-tema="" aria-pressed="true">Ogni tema</button>
        ${ctx.temi.map((t) => `<button class="filtro" type="button" data-tema="${t.slug}" aria-pressed="false">${esc(t.nome)}</button>`).join('\n        ')}
      </div>`
          : ''
      }
      <p class="conteggio" data-conteggio aria-live="polite">${canzoni.length} canzoni</p>
      <div class="griglia" data-elenco>
        ${ordinate
          .map(
            (c) =>
              `<a class="scheda" href="${r}canzone/${c.slug}/" style="--identita:${c.colore || 'var(--sistema)'}" data-generi="${esc(c.generi.join(' '))}" data-paese="${esc(c.paese || '')}" data-temi="${esc((c.temi || []).join(' '))}">
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
    raccolte: ctx.raccolte,
    ogImage: 'og/archivio.png',
    corpo,
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITO.base}/` },
        { '@type': 'ListItem', position: 2, name: 'Archivio', item: `${SITO.base}/archivio/` },
      ],
    },
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
    raccolte: ctx.raccolte,
    ogImage: 'og/metodo.png',
    corpo,
    datiStrutturati: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITO.base}/` },
        { '@type': 'ListItem', position: 2, name: 'Metodo', item: `${SITO.base}/metodo/` },
      ],
    },
  });
}

// ------------------------------------------------------------ errore 404

/** F43: pagina 404 del sito invece di quella generica di Vercel. `noindex`
 * perché una pagina d'errore non è un contenuto da posizionare. */
// ------------------------------------------------- F61/F62: pagine di servizio

/** Briciole + intestazione comuni alle pagine di servizio. */
function apertura(r, nome, sopratitolo, titolo, sintesi) {
  return `
    <nav class="briciole" aria-label="Percorso"><a href="${r}">Home</a><span>/</span>${esc(nome)}</nav>

    <header class="intestazione">
      <p class="sopratitolo">${esc(sopratitolo)}</p>
      <h1>${esc(titolo)}</h1>
      <p class="sintesi">${sintesi}</p>
    </header>`;
}

function briciole(nome, percorso) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITO.base}/` },
      { '@type': 'ListItem', position: 2, name: nome, item: `${SITO.base}/${percorso}` },
    ],
  };
}

// F61 — Chi c'è dietro. Include i contatti invece di dedicarci una pagina a
// parte: una pagina "contatti" con dentro solo un indirizzo email non
// risponderebbe a nessuna domanda a cui questa non risponda già, e la soglia
// di pubblicazione (ROADMAP 11.2) vale anche per le pagine nostre.
export function paginaChiSiamo(ctx) {
  const r = radice(1);
  const { nome, email, riga } = AUTORE;
  const firma = nome
    ? `<p>Questo sito lo scrive <strong>${esc(nome)}</strong>.${riga ? ' ' + esc(riga) : ''}</p>`
    : `<p>Questo sito lo scrive una persona sola, che sceglie di firmarsi con il nome del sito: <strong>dietroiltesto.it</strong>. Non è una redazione, non c'è un "noi" dietro le schede: c'è qualcuno che legge le fonti una per una e scrive quello che ha trovato.</p>
       <p>Firmarsi col nome del sito non è un modo per nascondersi: quello che si legge qui è verificabile una fonte alla volta, e ogni scheda porta in fondo gli indirizzi per andare a controllare. La responsabilità di quello che c'è scritto è di chi tiene questo sito, e resta la stessa che porti un nome o l'altro.</p>`;

  const corpo = `
  <div class="col">
    ${apertura(r, 'Chi c\'è dietro', 'Chi risponde di quello che leggi', 'Chi c\'è dietro.', 'Un sito che dice di verificare le fonti dovrebbe dire anche chi lo garantisce.')}

    <section class="blocco" style="border-top:0;padding-top:0">
      <h2>Chi scrive</h2>
      <div class="prosa">
        ${firma}
        <p>Oggi il sito raccoglie ${ctx.totali.canzoni} canzoni e ${ctx.totali.artisti} artisti. Ogni scheda nasce dalla stessa procedura: si cerca la fonte, si legge, e si scrive solo quello che la fonte sostiene davvero. Quando non si trova, la scheda lo dice invece di riempire lo spazio — è il motivo per cui alcune pagine ammettono apertamente di non sapere.</p>
        <p>Non è un lavoro veloce e non vuole esserlo. Aggiungere una canzone in più conta meno che tenere in piedi quelle che ci sono già.</p>
      </div>
      <div class="azioni">
        <a class="bottone" href="${r}metodo/">Come verifichiamo</a>
      </div>
    </section>

    <section class="blocco">
      <h2>Cosa questo sito non è</h2>
      <div class="prosa">
        <p>Non è un archivio di testi: non ne pubblichiamo nemmeno un verso. Non è una rivista musicale, non recensisce e non dà voti. Non vende niente e non ospita pubblicità.</p>
        <p>Non è nemmeno una fonte primaria: quello che leggi qui è il risultato di una lettura di altre fonti, sempre citate in fondo a ogni scheda. Se un fatto ti interessa davvero, il collegamento per andare a controllare è lì.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Scrivimi</h2>
      <div class="prosa">
        <p>Se trovi un errore, segnalalo: viene corretto. Una correzione vale più di una scheda in più, e le segnalazioni sono il modo più veloce che ho per accorgermi di uno sbaglio.</p>
        <p>Vale anche per il contrario: se conosci una fonte migliore di quella che ho usato, o hai una canzone da proporre, scrivi pure.</p>
      </div>
      <div class="azioni">
        <a class="bottone pieno" href="mailto:${esc(email)}?subject=Dietro%20il%20testo%20%E2%80%94%20correzione">Segnala un errore</a>
        <a class="bottone" href="mailto:${esc(email)}?subject=Dietro%20il%20testo%20%E2%80%94%20proponi%20una%20canzone">Proponi una canzone</a>
      </div>
    </section>
  </div>`;

  const dati = [briciole('Chi c\'è dietro', 'chi-siamo/')];
  // F59: la Person entra nei dati strutturati solo se ha un nome vero. Un
  // `Person` senza `name` è una dichiarazione vuota, e dichiarare più di
  // quello che si ha è la versione tecnica della bugia che P1 vieta.
  if (nome) {
    dati.push({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${SITO.base}/chi-siamo/#autore`,
      name: nome,
      url: `${SITO.base}/chi-siamo/`,
    });
  }

  return pagina({
    profondita: 1,
    percorso: 'chi-siamo/',
    titolo: 'Chi c\'è dietro',
    descrizione: 'Chi scrive Dietro il testo, con quale metodo, e come segnalare un errore in una scheda.',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    corpo,
    datiStrutturati: dati.length === 1 ? dati[0] : dati,
  });
}

// F62 — Informativa privacy. Scritta sui fatti verificati del sito, non su un
// modello generico: nessun analytics, nessun cookie nostro, un solo elemento
// di terze parti (il player Spotify). Dire il falso qui sarebbe grave quanto
// dirlo in una scheda.
export function paginaPrivacy(ctx) {
  const r = radice(1);
  const { nome, email } = AUTORE;
  const titolare = nome ? `<strong>${esc(nome)}</strong>, raggiungibile a` : 'La persona che cura questo sito, raggiungibile a';

  const corpo = `
  <div class="col">
    ${apertura(r, 'Privacy', 'Cosa succede ai tuoi dati', 'Privacy.', 'Versione breve: questo sito non ti misura e non ti profila. C\'è un\'eccezione, ed è scritta qui sotto.')}

    <section class="blocco" style="border-top:0;padding-top:0">
      <h2>Quello che non facciamo</h2>
      <div class="prosa">
        <p>Non c'è nessuno strumento di statistica: né Google Analytics né alternative. Non sappiamo quante persone visitano il sito, da dove arrivano o cosa leggono. Non ci sono cookie di profilazione, non ci sono pixel di tracciamento, non c'è pubblicità e non vendiamo niente a nessuno.</p>
        <p>Non ci sono moduli da compilare, quindi non raccogliamo nomi, indirizzi o password: non esiste un account da creare.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Il player Spotify, che è l'eccezione</h2>
      <div class="prosa">
        <p>Quasi tutte le schede canzone incorporano il lettore di Spotify, perché poter ascoltare il brano mentre si legge è metà del senso di questo sito. Quel lettore però è un contenuto di Spotify, non nostro: quando la pagina si apre, il tuo browser si collega ai server di Spotify, che possono impostare cookie propri e conoscere il tuo indirizzo IP e la pagina che stai leggendo.</p>
        <p>Su quei dati non abbiamo nessun controllo e non li vediamo: il trattamento è di Spotify e segue la sua informativa. Se preferisci evitarlo, un blocco dei cookie di terze parti nel browser impedisce al lettore di caricarsi, e il resto della pagina continua a funzionare.</p>
      </div>
      <div class="azioni">
        <a class="bottone" href="https://www.spotify.com/it/legal/privacy-policy/" target="_blank" rel="noopener">Informativa di Spotify</a>
      </div>
    </section>

    <section class="blocco">
      <h2>La preferenza del tema</h2>
      <div class="prosa">
        <p>Se scegli il tema chiaro o scuro, la scelta viene salvata nella memoria locale del tuo browser (una voce che si chiama <code>theme</code>). Resta sul tuo dispositivo, non raggiunge nessun server e non serve a riconoscerti: serve solo a non farti ripetere la scelta a ogni pagina. Puoi cancellarla svuotando i dati del sito dal browser.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>I registri del server</h2>
      <div class="prosa">
        <p>Il sito è ospitato su Vercel. Come qualunque server web, registra le richieste che riceve — indirizzo IP, momento, pagina richiesta, tipo di browser — per far funzionare il servizio e difenderlo da abusi. È una necessità tecnica dell'hosting, non una nostra raccolta: non colleghiamo quei registri a nessuna persona e non li usiamo per analisi.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Se ci scrivi</h2>
      <div class="prosa">
        <p>Gli indirizzi email di questo sito aprono il tuo programma di posta. Se scrivi, riceviamo quello che mandi — indirizzo compreso — e lo usiamo solo per risponderti o per correggere quello che hai segnalato. Non finisce in nessuna lista e non viene passato a nessuno.</p>
        <p>Puoi chiedere in qualunque momento di sapere cosa conserviamo, di farlo correggere o cancellare: basta scrivere allo stesso indirizzo.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Titolare e contatti</h2>
      <div class="prosa">
        <p>${titolare} <a href="mailto:${esc(email)}">${esc(email)}</a>.</p>
        <p class="legale">Questa pagina descrive con precisione quello che il sito fa, verificato sul codice che lo genera. Non è un parere legale e non è stata scritta da un avvocato: se ti serve una valutazione formale, rivolgiti a un professionista.</p>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 1,
    percorso: 'privacy/',
    titolo: 'Privacy',
    descrizione: 'Nessuna statistica, nessun cookie di profilazione, nessuna pubblicità. L\'unica eccezione è il lettore Spotify incorporato nelle schede: qui è spiegata.',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    corpo,
    datiStrutturati: briciole('Privacy', 'privacy/'),
  });
}

// F62 — Note legali: la posizione già presa in `metodo` su testi e immagini,
// detta anche in forma di responsabilità e non solo editoriale.
export function paginaNoteLegali(ctx) {
  const r = radice(1);
  const { email } = AUTORE;

  const corpo = `
  <div class="col">
    ${apertura(r, 'Note legali', 'Diritti, fonti e responsabilità', 'Note legali.', 'Cosa è nostro, cosa non lo è, e cosa succede se qualcosa non va.')}

    <section class="blocco" style="border-top:0;padding-top:0">
      <h2>I testi delle canzoni</h2>
      <div class="prosa">
        <p>Non pubblichiamo versi, ritornelli o traduzioni, nemmeno parziali. Il "momento iconico" di ogni scheda è una descrizione scritta con parole nostre: racconta cosa dice un passaggio e da dove nasce, senza riprodurlo. È una scelta presa prima di scrivere la prima scheda, e vale anche quando riprodurre due righe sarebbe più comodo.</p>
        <p>Per leggere un testo per intero ogni scheda rimanda a un sito esterno che se ne assume la responsabilità editoriale. Quei siti non sono nostri e non rispondiamo di quello che pubblicano.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Immagini, copertine e marchi</h2>
      <div class="prosa">
        <p>Non ospitiamo copertine, fotografie o loghi di cui non abbiamo una licenza o un'autorizzazione documentata: il fatto che un'immagine sia reperibile online non la rende riutilizzabile. Gli spazi colorati delle pagine sono grafica originale.</p>
        <p>I nomi di artisti, band, album ed etichette appartengono ai rispettivi titolari e sono citati per identificare le opere di cui parliamo. I colori di ogni pagina richiamano un immaginario visivo; non riproducono marchi registrati.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Quello che scriviamo noi</h2>
      <div class="prosa">
        <p>Le schede, le introduzioni e le descrizioni di questo sito sono testi originali. Se vuoi riprenderne una parte, citala e collega la pagina: è quello che chiediamo alle fonti che usiamo, e vale anche per noi.</p>
      </div>
    </section>

    <section class="blocco">
      <h2>Se qualcosa è sbagliato</h2>
      <div class="prosa">
        <p>Le informazioni sono verificate su fonti citate, ma un errore è sempre possibile: una fonte può sbagliare, e possiamo sbagliare noi a leggerla. Le schede non sono una verità definitiva e non sostituiscono le fonti a cui rimandano.</p>
        <p>Se un contenuto ti riguarda, contiene un errore o viola un diritto, scrivi: verifichiamo e, se la segnalazione è fondata, correggiamo o rimuoviamo. Non serve una diffida formale per farci correggere una cosa sbagliata.</p>
      </div>
      <div class="azioni">
        <a class="bottone pieno" href="mailto:${esc(email)}?subject=Dietro%20il%20testo%20%E2%80%94%20segnalazione">Scrivici</a>
        <a class="bottone" href="${r}metodo/">Metodo e fonti</a>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 1,
    percorso: 'note-legali/',
    titolo: 'Note legali',
    descrizione: 'Perché non pubblichiamo i testi delle canzoni, come trattiamo immagini e marchi, e come segnalare un contenuto da correggere o rimuovere.',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    corpo,
    datiStrutturati: briciole('Note legali', 'note-legali/'),
  });
}

export function paginaErrore404(ctx) {
  const r = radice(0);
  const corpo = `
  <div class="col">
    <header class="intestazione" style="border-top:0;padding-top:0">
      <p class="sopratitolo">Errore 404</p>
      <h1>Questa pagina non esiste.</h1>
      <p class="sintesi">Il collegamento è sbagliato o la scheda non c'è più. Cerca quello che ti serve, o torna all'archivio.</p>
    </header>

    <section class="blocco" style="border-top:0;padding-top:0">
      <div class="cerca grande" data-cerca>
        <svg class="lente" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>
        <input type="search" placeholder="Canzone, artista o band…" aria-label="Cerca nel sito"
               autocomplete="off" spellcheck="false" data-campo>
        <div class="esiti" hidden data-esiti role="listbox" aria-label="Risultati"></div>
      </div>
      <div class="azioni" style="margin-top:22px">
        <a class="bottone pieno" href="${r}">Torna alla home</a>
        <a class="bottone" href="${r}archivio/">Sfoglia l'archivio</a>
      </div>
    </section>
  </div>`;

  return pagina({
    profondita: 0,
    titolo: 'Pagina non trovata',
    descrizione: 'La pagina che cerchi non esiste su Dietro il testo. Cerca una canzone, un artista o un album, oppure torna alla home.',
    totali: ctx.totali,
    raccolte: ctx.raccolte,
    noindex: true,
    ricercaInTestata: false,
    corpo,
  });
}
