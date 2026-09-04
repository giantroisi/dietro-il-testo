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

  // Le raccolte servono al client per la proposta a campo vuoto: sul telefono
  // la navigazione dell'intestazione e' nascosta e queste pagine vivono solo
  // nel piede, a 3200px dall'inizio. Il campo di ricerca e' l'unico elemento
  // che l'utente ha gia' sotto il pollice: quando e' vuoto, propone.
  const raccolteClient = (ctx.raccolte || []).map((x) => ({
    n: x.nome,
    s: x.percorso,
    d: `${x.canzoni.length} ${x.canzoni.length === 1 ? 'canzone' : 'canzoni'}`,
    g: x.tipo === 'genere' ? 0 : 1,
  }));

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
  var RACCOLTE = ${JSON.stringify(raccolteClient)};
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

    /* Campo vuoto: invece di non fare niente, il pannello propone le raccolte.
       Sono link veri dentro lo stesso elenco dei risultati, quindi funzionano
       con le frecce e con Invio come tutto il resto. */
    function proponi() {
      if (!RACCOLTE.length) { chiudi(); return; }
      correnti = [];
      attivo = -1;
      var html = '<p class="esiti-gruppo">Sfoglia per genere</p>';
      var decenniAperti = false;
      RACCOLTE.forEach(function (x) {
        if (x.g === 1 && !decenniAperti) { html += '<p class="esiti-gruppo">Sfoglia per decennio</p>'; decenniAperti = true; }
        html += '<a class="esito" href="' + RADICE + x.s + '"><b>' + x.n + '</b><span>' + x.d + '</span></a>';
      });
      html += '<p class="esiti-gruppo">Tutto il catalogo</p>';
      html += '<a class="esito" href="' + RADICE + 'archivio/"><b>Archivio completo</b><span>tutte le canzoni, filtrabili</span></a>';
      box.innerHTML = html;
      box.hidden = false;
      correnti = [];
    }

    campo.addEventListener('input', function () {
      var q = campo.value;
      if (!q.trim().length) { proponi(); return; }
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
      else if (!campo.value.trim().length) proponi();
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

    // F37: prima era la canzone del giorno, uguale per tutti fino a mezzanotte.
    // Ora cambia a ogni caricamento. Nell'HTML resta scritta la scelta del
    // giorno, che e' quella che vedono i motori e chi non ha JavaScript: qui la
    // si sostituisce subito, e si evita di ripescare proprio quella.
    var primaScelta = Math.floor(Math.random() * PILLOLE.length);
    var giroDelGiorno = Math.floor(Date.now() / 86400000) % PILLOLE.length;
    if (PILLOLE.length > 1 && primaScelta === giroDelGiorno) {
      primaScelta = (primaScelta + 1) % PILLOLE.length;
    }
    mostraPillola(primaScelta);
    try { sessionStorage.setItem('ultimaPillola', PILLOLE[primaScelta].s); } catch (e) {}

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

  // F37: in home la ricerca della testata resta nascosta finche' il campo
  // grande e' in vista, e compare appena esce. Cosi' si puo' cercare in
  // qualunque punto della pagina senza avere due campi uguali uno sotto l'altro.
  var testataScorrevole = document.querySelector('.testata-scorrevole');
  var campoGrande = document.querySelector('.cerca.grande');
  if (testataScorrevole && campoGrande) {
    var mostraTestata = function (mostra) {
      testataScorrevole.classList.toggle('scorso', mostra);
    };
    if (typeof IntersectionObserver === 'function') {
      new IntersectionObserver(function (voci) {
        mostraTestata(!voci[0].isIntersecting);
      }, { rootMargin: '-8px 0px 0px 0px' }).observe(campoGrande);
    } else {
      // Senza IntersectionObserver la barra resta visibile: meglio averla
      // sempre che non averla mai.
      mostraTestata(true);
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

  /* ------------------------------------------- cartolina per Instagram */
  /* Instagram non ha un indirizzo di condivisione dal web: nessun sito puo'
     aprire una storia o un post gia' compilati, e un bottone che finge di
     farlo mentirebbe. L'unica strada vera e' preparare l'immagine nel
     formato giusto e passarla al sistema: sul telefono si apre il foglio di
     condivisione, dove Instagram compare fra le app e si sceglie li' se
     farne una storia o un post; sul computer, dove quel foglio non esiste,
     il file viene scaricato.
     L'immagine e' disegnata qui e non presa da og/: cosi' vale per tutte le
     schede, comprese quelle senza anteprima social gia' generata, e resta
     sempre allineata ai dati. Usa solo cose nostre - titolo, artista, anno,
     momento iconico gia' parafrasato - mai un verso della canzone (P3). */
  var cartolina = document.querySelector('[data-cartolina]');
  if (cartolina) {
    /* Le due misure che Instagram vuole: 9:16 per la storia, 4:5 per il post
       (il formato verticale del feed, non il quadrato: occupa piu' schermo).
       "alto" e "basso" sono le fasce che l'interfaccia di Instagram copre nella
       storia - profilo in cima, campo di risposta in fondo - e dentro cui non
       va messo niente. */
    var FORMATI = {
      storia: { w: 1080, h: 1920, alto: 330, basso: 330, righeTitolo: 3, righeFrase: 8, dimMax: 96, dimMin: 54, logo: 520, dimFrase: 40 },
      post: { w: 1080, h: 1350, alto: 110, basso: 110, righeTitolo: 3, righeFrase: 7, dimMax: 88, dimMin: 50, logo: 470, dimFrase: 38 }
    };
    var SERIF = '"Iowan Old Style", Georgia, "Times New Roman", serif';
    var MONO = 'ui-monospace, "SF Mono", Menlo, monospace';

    var logo = new Image();
    var logoPronto = false;
    var ritaglio = null;
    logo.onload = function () { logoPronto = true; ritaglio = misuraRitaglio(); };
    logo.src = cartolina.getAttribute('data-logo') || 'logo.png';

    /* Il file logo.png ha 24px di trasparente su tutti i lati: sui 245px di
       altezza sono un quinto, e disegnandolo intero il marchio esce piccolo e
       staccato dal resto, con un vuoto che sembra un errore di impaginazione.
       Qui si misura il riquadro dei pixel davvero disegnati e si usa quello.
       Si misura invece di scriverlo a mano perche' il giorno che il logo cambia
       il numero scritto a mano resterebbe li' a sbagliare in silenzio. */
    function misuraRitaglio() {
      var l = logo.naturalWidth, a = logo.naturalHeight;
      var intero = { x: 0, y: 0, w: l, h: a };
      try {
        var c = document.createElement('canvas');
        c.width = l; c.height = a;
        var x = c.getContext('2d');
        x.drawImage(logo, 0, 0);
        var d = x.getImageData(0, 0, l, a).data;
        var sx = l, sy = a, dx = -1, dy = -1;
        for (var j = 0; j < a; j++) {
          for (var i = 0; i < l; i++) {
            if (d[(j * l + i) * 4 + 3] < 8) continue;
            if (i < sx) sx = i;
            if (i > dx) dx = i;
            if (j < sy) sy = j;
            if (j > dy) dy = j;
          }
        }
        if (dx < sx || dy < sy) return intero;
        return { x: sx, y: sy, w: dx - sx + 1, h: dy - sy + 1 };
      } catch (e) {
        return intero; /* niente pixel leggibili: meglio il logo intero che nessun logo */
      }
    }

    var apri = cartolina.querySelector('[data-instagram]');
    var pannello = cartolina.querySelector('[data-formati]');
    var nota = cartolina.querySelector('[data-cartolina-nota]');

    if (apri && pannello) {
      apri.addEventListener('click', function () {
        var eraAperto = !pannello.hidden;
        pannello.hidden = eraAperto;
        apri.setAttribute('aria-expanded', eraAperto ? 'false' : 'true');
      });
    }

    function dice(messaggio) { if (nota) nota.textContent = messaggio; }

    function avvolgi(x, testo, largh) {
      var parole = String(testo || '').split(/\\s+/);
      var righe = [];
      var riga = '';
      for (var i = 0; i < parole.length; i++) {
        if (!parole[i]) continue;
        var prova = riga ? riga + ' ' + parole[i] : parole[i];
        if (!riga || x.measureText(prova).width <= largh) riga = prova;
        else { righe.push(riga); riga = parole[i]; }
      }
      if (riga) righe.push(riga);
      return righe;
    }

    function tronca(righe, max) {
      if (righe.length <= max) return righe;
      var t = righe.slice(0, max);
      t[max - 1] = t[max - 1].replace(/[ .,;:]+$/, '') + '…';
      return t;
    }

    /* Stessa regola dell'H1: si rimpicciolisce finche' il titolo sta nelle
       righe previste, invece di lasciarlo traboccare. */
    function adatta(x, testo, largh, maxRighe, dimMax, dimMin) {
      for (var d = dimMax; d >= dimMin; d -= 2) {
        x.font = '700 ' + d + 'px ' + SERIF;
        var r = avvolgi(x, testo, largh);
        if (r.length <= maxRighe) return { dim: d, righe: r };
      }
      x.font = '700 ' + dimMin + 'px ' + SERIF;
      return { dim: dimMin, righe: tronca(avvolgi(x, testo, largh), maxRighe) };
    }

    function altezzaLogo(largh) {
      var r = ritaglio || { w: logo.naturalWidth, h: logo.naturalHeight };
      return Math.round(largh * (r.h / r.w));
    }

    /* Il marchio e' disegnato a tratto sottile, con le righe di pentagramma
       dentro le lettere. Tinto di bianco e rimpicciolito diventa una griglia
       chiara che da lontano si dissolve: ingrandirlo e basta non bastava, e
       infatti la prima versione piu' grande sembrava identica. Qui i tratti
       vengono ispessiti ricomponendo la sagoma su se stessa spostata di pochi
       pixel negli otto versi — le righe interne si chiudono e il marchio si
       legge pieno — e sotto viene messa un'ombra, che e' cio' che lo stacca
       davvero dai colori chiari. */
    function logoBianco(largh) {
      var r = ritaglio || { x: 0, y: 0, w: logo.naturalWidth, h: logo.naturalHeight };
      var h = altezzaLogo(largh);
      var sagoma = document.createElement('canvas');
      sagoma.width = largh; sagoma.height = h;
      var s = sagoma.getContext('2d');
      s.drawImage(logo, r.x, r.y, r.w, r.h, 0, 0, largh, h);
      s.globalCompositeOperation = 'source-in';
      s.fillStyle = '#FFFFFF';
      s.fillRect(0, 0, largh, h);

      var d = Math.max(1, Math.round(largh / 240)); // ispessimento, in pixel
      var c = document.createElement('canvas');
      c.width = largh + d * 2; c.height = h + d * 2;
      var x = c.getContext('2d');
      var versi = [[0, 0], [d, 0], [-d, 0], [0, d], [0, -d], [d, d], [-d, -d], [d, -d], [-d, d]];
      for (var i = 0; i < versi.length; i++) {
        x.drawImage(sagoma, d + versi[i][0], d + versi[i][1]);
      }
      return c;
    }

    function disegna(chiave) {
      var f = FORMATI[chiave];
      var cv = document.createElement('canvas');
      cv.width = f.w; cv.height = f.h;
      var x = cv.getContext('2d');

      var g = x.createLinearGradient(0, 0, f.w, f.h);
      g.addColorStop(0, cartolina.getAttribute('data-colore') || '#333333');
      g.addColorStop(1, cartolina.getAttribute('data-colore2') || '#333333');
      x.fillStyle = g;
      x.fillRect(0, 0, f.w, f.h);

      /* velatura scura crescente: il testo resta leggibile qualunque sia il
         colore dell'artista, compresi i gialli e i bianchi */
      var v = x.createLinearGradient(0, f.h * 0.28, 0, f.h);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, 'rgba(0,0,0,0.68)');
      x.fillStyle = v;
      x.fillRect(0, 0, f.w, f.h);

      var marg = 84;
      var largh = f.w - marg * 2;
      var altLogo = logoPronto ? altezzaLogo(f.logo) : 0;

      var sopra = [];
      var art = cartolina.getAttribute('data-artista');
      var anno = cartolina.getAttribute('data-anno');
      if (art) sopra.push(art.toUpperCase());
      if (anno) sopra.push(anno);

      var t = adatta(x, cartolina.getAttribute('data-titolo') || '', largh, f.righeTitolo, f.dimMax, f.dimMin);
      var passoTitolo = Math.round(t.dim * 1.12);

      x.font = 'italic ' + f.dimFrase + 'px ' + SERIF;
      var interlinea = Math.round(f.dimFrase * 1.42);

      /* Prima si misura tutto, poi si disegna: e' l'unico modo per centrare il
         blocco nella fascia sicura invece di lasciarlo appeso in alto con un
         terzo di immagine vuoto sotto. */
      var fissa = (altLogo ? altLogo + 22 : 0) + 30 + 58 + (sopra.length ? 54 : 0) + t.righe.length * passoTitolo + 52 + 56;
      var utile = f.h - f.alto - f.basso - 70;
      var possibili = Math.max(2, Math.min(f.righeFrase, Math.floor((utile - fissa) / interlinea)));
      var righeFrase = tronca(avvolgi(x, cartolina.getAttribute('data-frase') || '', largh), possibili);
      var totale = fissa + righeFrase.length * interlinea;
      var y = f.alto + Math.max(0, Math.round((utile - totale) / 2));

      if (altLogo) {
        var marchio = logoBianco(f.logo);
        x.save();
        x.shadowColor = 'rgba(0,0,0,0.5)';
        x.shadowBlur = Math.round(f.logo * 0.045);
        x.shadowOffsetY = Math.round(f.logo * 0.012);
        x.drawImage(marchio, marg - Math.round(f.logo / 240), y);
        x.restore();
        y += altLogo + 22;
      }
      x.font = '26px ' + MONO;
      x.fillStyle = 'rgba(255,255,255,0.78)';
      x.fillText(cartolina.getAttribute('data-sito') || 'dietroiltesto.it', marg, y + 22);
      y += 88;

      if (sopra.length) {
        x.font = '28px ' + MONO;
        x.fillStyle = 'rgba(255,255,255,0.92)';
        x.fillText(sopra.join('  ·  '), marg, y);
        y += 54;
      }

      x.fillStyle = '#FFFFFF';
      x.font = '700 ' + t.dim + 'px ' + SERIF;
      for (var i = 0; i < t.righe.length; i++) {
        y += passoTitolo;
        x.fillText(t.righe[i], marg, y);
      }

      y += 52;
      x.font = 'italic 34px ' + SERIF;
      x.fillStyle = 'rgba(255,255,255,0.72)';
      x.fillText('♪', marg, y);
      y += 56;

      x.font = 'italic ' + f.dimFrase + 'px ' + SERIF;
      x.fillStyle = 'rgba(255,255,255,0.94)';
      for (var k = 0; k < righeFrase.length; k++) {
        y += interlinea;
        x.fillText(righeFrase[k], marg, y);
      }

      /* la stessa promessa che sta sulla pagina: l'immagine gira da sola, e
         senza questa riga sembrerebbe una citazione del testo */
      x.font = '22px ' + MONO;
      x.fillStyle = 'rgba(255,255,255,0.62)';
      x.fillText('Momento iconico descritto con parole nostre', marg, f.h - f.basso - 16);

      return cv;
    }

    /* Il file si costruisce senza attese: su iOS la condivisione va chiamata
       nello stesso gesto del dito, e un solo await in mezzo la fa fallire.
       Per questo toDataURL (sincrono) invece di toBlob. */
    function inFile(cv, chiave) {
      var dati = cv.toDataURL('image/jpeg', 0.92);
      var bin = atob(dati.split(',')[1]);
      var byte = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) byte[i] = bin.charCodeAt(i);
      var nome = (cartolina.getAttribute('data-slug') || 'dietroiltesto') + '-' + chiave + '.jpg';
      try { return new File([byte], nome, { type: 'image/jpeg' }); } catch (e) { return null; }
    }

    function scarica(cv, chiave) {
      var a = document.createElement('a');
      a.href = cv.toDataURL('image/jpeg', 0.92);
      a.download = (cartolina.getAttribute('data-slug') || 'dietroiltesto') + '-' + chiave + '.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    Array.prototype.slice.call(cartolina.querySelectorAll('[data-formato]')).forEach(function (b) {
      b.addEventListener('click', function () {
        var chiave = b.getAttribute('data-formato');
        if (!FORMATI[chiave]) return;
        if (!logoPronto) { dice('Sto ancora caricando il logo: riprova fra un istante.'); return; }
        var cv;
        try { cv = disegna(chiave); } catch (e) { dice('Non sono riuscito a preparare l’immagine su questo browser.'); return; }
        var file = inFile(cv, chiave);
        var etichetta = chiave === 'storia' ? 'Storia' : 'Post';
        if (file && navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: cartolina.getAttribute('data-titolo') || '' }).then(function () {
            dice('Fatto. In Instagram scegli ' + etichetta + '.');
          }).catch(function () { dice('Condivisione annullata.'); });
          return;
        }
        scarica(cv, chiave);
        dice('Immagine scaricata (' + FORMATI[chiave].w + '×' + FORMATI[chiave].h + '): caricala su Instagram come ' + etichetta.toLowerCase() + '.');
      });
    });
  }

  /* ------------------------------------------------------ filtri archivio */

  var elenco = document.querySelector('[data-elenco]');
  if (elenco) {
    var schede = Array.prototype.slice.call(elenco.children);
    var conteggio = document.querySelector('[data-conteggio]');
    var bottoni = Array.prototype.slice.call(document.querySelectorAll('.filtro'));

    function filtra(genere, paese, tema) {
      var visibili = 0;
      schede.forEach(function (s) {
        var gen = (s.getAttribute('data-generi') || '').split(/\\s+/);
        var pae = s.getAttribute('data-paese') || '';
        var tem = (s.getAttribute('data-temi') || '').split(/\\s+/);
        var ok = true;
        if (genere) ok = gen.indexOf(genere) !== -1;
        if (ok && paese) ok = pae === paese;
        if (ok && tema) ok = tem.indexOf(tema) !== -1;
        s.classList.toggle('is-nascosto', !ok);
        if (ok) visibili++;
      });
      if (conteggio) {
        conteggio.textContent = (genere || paese || tema)
          ? visibili + ' di ' + schede.length + ' canzoni'
          : schede.length + ' canzoni';
      }
    }

    // F4/F30: il filtro attivo vive nell'URL (?genere= / ?paese= / ?tema=),
    // così ricaricare, tornare indietro o condividere il link restituisce
    // la stessa vista. Genere e tema sono due gruppi indipendenti (ognuno
    // ha il proprio "Tutti"/"Ogni tema"), combinabili fra loro e con paese.
    var statoGenere = '';
    var statoPaese = '';
    var statoTema = '';

    function applicaFiltro(genere, paese, tema, aggiornaUrl) {
      statoGenere = genere;
      statoPaese = paese;
      statoTema = tema;
      filtra(genere, paese, tema);
      bottoni.forEach(function (b) {
        var attivo = b.hasAttribute('data-tema')
          ? (b.getAttribute('data-tema') || '') === tema
          : (b.getAttribute('data-genere') || '') === genere && (b.getAttribute('data-paese') || '') === paese;
        b.setAttribute('aria-pressed', attivo ? 'true' : 'false');
      });
      if (aggiornaUrl) {
        var url = new URL(location.href);
        url.searchParams.delete('genere');
        url.searchParams.delete('paese');
        url.searchParams.delete('tema');
        if (genere) url.searchParams.set('genere', genere);
        if (paese) url.searchParams.set('paese', paese);
        if (tema) url.searchParams.set('tema', tema);
        history.replaceState(null, '', url.pathname + url.search);
      }
    }

    bottoni.forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.hasAttribute('data-tema')) {
          applicaFiltro(statoGenere, statoPaese, b.getAttribute('data-tema') || '', true);
        } else {
          applicaFiltro(b.getAttribute('data-genere') || '', b.getAttribute('data-paese') || '', statoTema, true);
        }
      });
    });

    var parametriIniziali = new URLSearchParams(location.search);
    var genereIniziale = parametriIniziali.get('genere') || '';
    var paeseIniziale = parametriIniziali.get('paese') || '';
    var temaIniziale = parametriIniziali.get('tema') || '';
    if (genereIniziale || paeseIniziale || temaIniziale) applicaFiltro(genereIniziale, paeseIniziale, temaIniziale, false);
  }
})();
`;
}
