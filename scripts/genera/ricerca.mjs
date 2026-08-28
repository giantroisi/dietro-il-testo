// Genera ricerca.js: indice compatto + comportamento di ricerca, tema e archivio.
// Nessuna dipendenza esterna, nessuna richiesta di rete.

// Stesso segno tipografico di scripts/genera/pagine.mjs (F24): duplicato qui
// perché ricerca.js è un modulo a sé, servito come script statico separato.
const SEGNO = '<svg class="segno" viewBox="0 0 11 13" aria-hidden="true"><path d="M2 11.5 4.3 1.8M6.7 11.5 9 1.8"/></svg>';

export function generaRicerca(ctx) {
  const indice = [
    ...ctx.canzoni.map((c) => ({
      t: 0, // canzone
      n: c.titolo,
      s: `canzone/${c.slug}/`,
      d: [c.artista, String(c.anno || '').match(/\d{4}/)?.[0]].filter(Boolean).join(` ${SEGNO} `),
      // F28: include anche la frase iconica (già una parafrasi originale, mai
      // il testo della canzone — coerente con P3) così un verso ricordato a
      // memoria e riformulato dall'utente può comunque portare alla scheda.
      k: [c.titolo, c.artista, c.album, c.genereTesto, c.fraseIconica].filter(Boolean).join(' ').toLowerCase(),
    })),
    ...ctx.artisti.map((a) => ({
      t: 1, // artista
      n: a.nome,
      s: `artista/${a.slug}/`,
      d: `${a.canzoni.length} ${a.canzoni.length === 1 ? 'canzone' : 'canzoni'}`,
      k: a.nome.toLowerCase(),
    })),
    ...ctx.album.map((al) => ({
      t: 2, // album
      n: al.titolo,
      s: `album/${al.artistaSlug}/${al.slug}/`,
      d: [ctx.artistiPerSlug.get(al.artistaSlug)?.nome, al.anno].filter(Boolean).join(` ${SEGNO} `),
      k: [al.titolo, ctx.artistiPerSlug.get(al.artistaSlug)?.nome].filter(Boolean).join(' ').toLowerCase(),
    })),
  ];

  const percorsiCanzoni = ctx.canzoni.map((c) => `canzone/${c.slug}/`);

  // F36: la pillola del giorno ruota nel browser, non in fase di build — la
  // formula (giorno % candidate.length) resta identica a quella server-side
  // in pagine.mjs, così la scelta del giorno corrente coincide con quella già
  // renderizzata e non "salta" al primo caricamento. Stesso ordine dei
  // candidati di paginaHome (ctx.canzoni con fraseIconica), stesso motivo per
  // cui l'estratto è già troncato qui: mai testo non parafrasato al client.
  function primaFraseBuild(testo, max) {
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
  const pillole = ctx.canzoni
    .filter((c) => c.fraseIconica)
    .map((c) => ({
      s: c.slug,
      a: c.artistaSlug,
      t: c.titolo,
      n: c.artista,
      y: String(c.anno || '').match(/\d{4}/)?.[0] || '',
      c: c.colore || '',
      e: primaFraseBuild(c.fraseIconica, 260),
    }));

  return `/* Generato da scripts/genera-sito.mjs — non modificare a mano. */
(function () {
  'use strict';

  var INDICE = ${JSON.stringify(indice)};
  var CANZONI = ${JSON.stringify(percorsiCanzoni)};
  var PILLOLE = ${JSON.stringify(pillole)};
  var GRUPPI = ['Canzoni', 'Artisti', 'Album'];

  /* Radice del sito calcolata dalla profondità della pagina corrente. */
  var parti = location.pathname.replace(/^\\/|\\/$/g, '').split('/').filter(Boolean);
  var ultimo = parti[parti.length - 1] || '';
  if (/\\.html?$/.test(ultimo)) parti.pop();
  var RADICE = parti.length ? new Array(parti.length + 1).join('../') : './';

  function senzaAccenti(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  }

  /* F28: due parole sono "vicine" se differiscono per al massimo un refuso
   * (un carattere sbagliato, uno in più o uno mancante). Basta per tollerare
   * un errore di battitura senza aprire un vero motore fuzzy. */
  function vicine(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (la === lb) {
      var diff = 0;
      for (var i = 0; i < la; i++) { if (a[i] !== b[i]) diff++; if (diff > 1) return false; }
      return diff <= 1;
    }
    if (Math.abs(la - lb) !== 1) return false;
    var corta = la < lb ? a : b, lunga = la < lb ? b : a;
    var i = 0, j = 0, salti = 0;
    while (i < corta.length && j < lunga.length) {
      if (corta[i] === lunga[j]) { i++; j++; continue; }
      if (salti > 0) return false;
      salti++; j++;
    }
    return true;
  }

  /* Un termine trova corrispondenza tollerante se una parola della chiave gli
   * è "vicina" (vedi sopra) — solo da 4 caratteri in su, per non generare
   * falsi positivi su termini troppo corti come "il" o "un". */
  function corrispondeApprox(termine, chiave) {
    if (termine.length < 4) return false;
    var parole = chiave.split(/\\s+/);
    for (var i = 0; i < parole.length; i++) {
      if (Math.abs(parole[i].length - termine.length) <= 1 && vicine(termine, parole[i])) return true;
    }
    return false;
  }

  /* ------------------------------------------------------------- tema */

  function applicaTema() {
    var esplicito = document.documentElement.getAttribute('data-theme');
    var scuro = esplicito
      ? esplicito === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    Array.prototype.forEach.call(document.querySelectorAll('[data-tema]'), function (b) {
      b.setAttribute('aria-pressed', scuro ? 'true' : 'false');
      b.setAttribute('aria-label', scuro ? 'Passa al tema chiaro' : 'Passa al tema scuro');
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-tema]'), function (b) {
    b.addEventListener('click', function () {
      var esplicito = document.documentElement.getAttribute('data-theme');
      var scuro = esplicito
        ? esplicito === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var nuovo = scuro ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nuovo);
      try { localStorage.setItem('theme', nuovo); } catch (e) {}
      applicaTema();
    });
  });
  applicaTema();

  /* ---------------------------------------------------------- ricerca */

  function cerca(q) {
    var n = senzaAccenti(q).trim();
    if (n.length < 2) return [];
    var termini = n.split(/\\s+/);
    var esiti = [];
    for (var i = 0; i < INDICE.length; i++) {
      var v = INDICE[i];
      var chiave = senzaAccenti(v.k);
      var ok = true;
      var approssimato = false;
      for (var j = 0; j < termini.length; j++) {
        if (chiave.indexOf(termini[j]) !== -1) continue;
        // F28: un termine non trovato alla lettera può comunque corrispondere
        // a un refuso di una parola della chiave — un solo carattere di
        // differenza, non un vero motore di ricerca fuzzy.
        if (corrispondeApprox(termini[j], chiave)) { approssimato = true; continue; }
        ok = false;
        break;
      }
      if (!ok) continue;
      var nome = senzaAccenti(v.n);
      /* esatto > inizia con > contiene > approssimato; a parità gli artisti vengono prima */
      var punti = approssimato ? 4 : nome === n ? 0 : nome.indexOf(n) === 0 ? 1 : chiave.indexOf(n) === 0 ? 2 : 3;
      esiti.push({ v: v, p: punti * 10 + (v.t === 1 ? 0 : v.t === 0 ? 1 : 2) });
    }
    esiti.sort(function (a, b) { return a.p - b.p || a.v.n.localeCompare(b.v.n, 'it'); });
    return esiti.slice(0, 8).map(function (e) { return e.v; });
  }

  function montaRicerca(radice) {
    var campo = radice.querySelector('[data-campo]');
    var box = radice.querySelector('[data-esiti]');
    if (!campo || !box) return;
    var correnti = [];
    var attivo = -1;

    function chiudi() { box.hidden = true; attivo = -1; }

    function evidenzia() {
      var voci = box.querySelectorAll('.esito');
      Array.prototype.forEach.call(voci, function (el, i) {
        el.classList.toggle('attivo', i === attivo);
        if (i === attivo && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
      });
    }

    function disegna(lista) {
      correnti = lista;
      attivo = -1;
      if (!lista.length) {
        box.innerHTML = '<p class="esiti-vuoto">Nessun risultato. Prova con il nome della band o il titolo esatto.</p>';
        box.hidden = false;
        return;
      }
      var html = '';
      var gruppoPrec = null;
      lista.forEach(function (v) {
        if (v.t !== gruppoPrec) {
          html += '<p class="esiti-gruppo">' + GRUPPI[v.t] + '</p>';
          gruppoPrec = v.t;
        }
        html += '<a class="esito" href="' + RADICE + v.s + '"><b>' + v.n + '</b><span>' + v.d + '</span></a>';
      });
      box.innerHTML = html;
      box.hidden = false;
    }

    campo.addEventListener('input', function () {
      var q = campo.value;
      if (q.trim().length < 2) { chiudi(); return; }
      disegna(cerca(q));
    });

    campo.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { chiudi(); campo.blur(); return; }
      if (!correnti.length || box.hidden) {
        if (e.key === 'Enter' && campo.value.trim().length >= 2) {
          var primi = cerca(campo.value);
          if (primi.length) { e.preventDefault(); location.href = RADICE + primi[0].s; }
        }
        return;
      }
      if (e.key === 'ArrowDown') { e.preventDefault(); attivo = Math.min(attivo + 1, correnti.length - 1); evidenzia(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); attivo = Math.max(attivo - 1, -1); evidenzia(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var scelto = attivo >= 0 ? correnti[attivo] : correnti[0];
        if (scelto) location.href = RADICE + scelto.s;
      }
    });

    campo.addEventListener('focus', function () {
      if (campo.value.trim().length >= 2) disegna(cerca(campo.value));
    });

    document.addEventListener('click', function (e) {
      if (!radice.contains(e.target)) chiudi();
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-cerca]'), montaRicerca);

  /* --------------------------------------------------- scorciatoie home */

  Array.prototype.forEach.call(document.querySelectorAll('[data-esempio]'), function (b) {
    b.addEventListener('click', function () {
      var campo = document.querySelector('[data-campo]');
      if (!campo) return;
      campo.value = b.getAttribute('data-esempio');
      campo.focus();
      campo.dispatchEvent(new Event('input'));
    });
  });

  /* --------------------------------------------------- pillola del giorno */

  var elementoPillola = document.querySelector('[data-pillola]');
  if (elementoPillola && PILLOLE.length) {
    var mostraPillola = function (indice) {
      var p = PILLOLE[indice];
      elementoPillola.style.setProperty('--identita', p.c || 'var(--sistema)');
      var meta = elementoPillola.querySelector('[data-pillola-meta]');
      if (meta) meta.innerHTML = p.y ? (p.n + ' ${SEGNO} ' + p.y) : p.n;
      var titolo = elementoPillola.querySelector('[data-pillola-titolo]');
      if (titolo) titolo.textContent = p.t;
      var estratto = elementoPillola.querySelector('[data-pillola-estratto]');
      if (estratto) estratto.textContent = p.e;
      var link = elementoPillola.querySelector('[data-pillola-link]');
      if (link) link.href = RADICE + 'canzone/' + p.s + '/';
      var artistaLink = elementoPillola.querySelector('[data-pillola-artista]');
      if (artistaLink) { artistaLink.href = RADICE + 'artista/' + p.a + '/'; artistaLink.textContent = p.n; }
    };

    mostraPillola(Math.floor(Date.now() / 86400000) % PILLOLE.length);

    var bottoneAltraPillola = elementoPillola.querySelector('[data-altra-pillola]');
    if (bottoneAltraPillola) {
      bottoneAltraPillola.addEventListener('click', function () {
        var attuale = null;
        try { attuale = sessionStorage.getItem('ultimaPillola'); } catch (e) {}
        var indice = Math.floor(Math.random() * PILLOLE.length);
        var tentativi = 0;
        while (PILLOLE[indice].s === attuale && tentativi < 8) {
          indice = Math.floor(Math.random() * PILLOLE.length);
          tentativi++;
        }
        mostraPillola(indice);
        try { sessionStorage.setItem('ultimaPillola', PILLOLE[indice].s); } catch (e) {}
      });
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-sorprendimi]'), function (b) {
    b.addEventListener('click', function () {
      var precedente = null;
      try { precedente = sessionStorage.getItem('ultimaSorpresa'); } catch (e) {}
      var scelta = CANZONI[Math.floor(Math.random() * CANZONI.length)];
      var tentativi = 0;
      while (scelta === precedente && tentativi < 8) {
        scelta = CANZONI[Math.floor(Math.random() * CANZONI.length)];
        tentativi++;
      }
      try { sessionStorage.setItem('ultimaSorpresa', scelta); } catch (e) {}
      location.href = RADICE + scelta;
    });
  });

  /* ------------------------------------------------------------ condividi */

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-condividi]');
    if (!b) return;
    var dati = { title: b.getAttribute('data-titolo') || document.title, url: b.getAttribute('data-url') || location.href };
    var testo = b.getAttribute('data-testo');
    if (testo) dati.text = testo;
    if (navigator.share) {
      navigator.share(dati).catch(function () {});
      return;
    }
    var conferma = b.parentElement && b.parentElement.querySelector('[data-condividi-conferma]');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dati.url).then(function () {
        if (!conferma) return;
        conferma.hidden = false;
        clearTimeout(b._condividiTimer);
        b._condividiTimer = setTimeout(function () { conferma.hidden = true; }, 2500);
      }).catch(function () {});
    }
  });

  /* ------------------------------------------------------ filtri archivio */

  var elenco = document.querySelector('[data-elenco]');
  if (elenco) {
    var schede = Array.prototype.slice.call(elenco.children);
    var conteggio = document.querySelector('[data-conteggio]');
    var bottoni = Array.prototype.slice.call(document.querySelectorAll('.filtro'));

    function filtra(genere, paese) {
      var visibili = 0;
      schede.forEach(function (s) {
        var gen = (s.getAttribute('data-generi') || '').split(/\\s+/);
        var pae = s.getAttribute('data-paese') || '';
        var ok = true;
        if (genere) ok = gen.indexOf(genere) !== -1;
        if (ok && paese) ok = pae === paese;
        s.classList.toggle('is-nascosto', !ok);
        if (ok) visibili++;
      });
      if (conteggio) {
        conteggio.textContent = (genere || paese)
          ? visibili + ' di ' + schede.length + ' canzoni'
          : schede.length + ' canzoni';
      }
    }

    // F4: il filtro attivo vive nell'URL (?genere= / ?paese=), così ricaricare,
    // tornare indietro o condividere il link restituisce la stessa vista.
    function applicaFiltro(genere, paese, aggiornaUrl) {
      filtra(genere, paese);
      bottoni.forEach(function (b) {
        var attivo = (b.getAttribute('data-genere') || '') === genere && (b.getAttribute('data-paese') || '') === paese;
        b.setAttribute('aria-pressed', attivo ? 'true' : 'false');
      });
      if (aggiornaUrl) {
        var url = new URL(location.href);
        url.searchParams.delete('genere');
        url.searchParams.delete('paese');
        if (genere) url.searchParams.set('genere', genere);
        if (paese) url.searchParams.set('paese', paese);
        history.replaceState(null, '', url.pathname + url.search);
      }
    }

    bottoni.forEach(function (b) {
      b.addEventListener('click', function () {
        applicaFiltro(b.getAttribute('data-genere') || '', b.getAttribute('data-paese') || '', true);
      });
    });

    var parametriIniziali = new URLSearchParams(location.search);
    var genereIniziale = parametriIniziali.get('genere') || '';
    var paeseIniziale = parametriIniziali.get('paese') || '';
    if (genereIniziale || paeseIniziale) applicaFiltro(genereIniziale, paeseIniziale, false);
  }
})();
`;
}
