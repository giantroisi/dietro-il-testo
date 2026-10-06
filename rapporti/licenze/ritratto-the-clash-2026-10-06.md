# Foto dei Clash — verifica del 6 ottobre 2026

## Uso e soggetto

- **Pagina d'uso proposta:** `/artista/the-clash/`.
- **Soggetto:** Joe Strummer, Mick Jones e Paul Simonon dei Clash in concerto al Chateau Neuf di Oslo il 21 maggio 1980, secondo la descrizione e le didascalie della pagina originale. Il file è stato aperto e ispezionato visivamente: mostra tre musicisti sul palco, con il soggetto centrale nitido; non mostra l'intera formazione e non viene presentato come tale.
- **Titolo del file:** “Clash 21051980 12 800.jpg”. **Autore e titolare dichiarato:** Helge Øverås. L'uploader `Helwik` ha pubblicato il file come proprio lavoro e ha dichiarato di esserne il titolare dei diritti; non è indicato un titolare diverso.
- **Pagina originale e licenza del file:** https://commons.wikimedia.org/wiki/File:Clash_21051980_12_800.jpg
- **URL del file originale:** https://upload.wikimedia.org/wikipedia/commons/3/34/Clash_21051980_12_800.jpg
- **Sito del fotografo indicato nella prima versione della pagina:** http://www.helgeoveras.com/clash.shtml (non raggiungibile durante questo controllo). La prima revisione Commons del 1° aprile 2007, caricata da `Helwik`, dichiarava già licenze libere oltre alla nota storica “Contact photographer”; la licenza attuale è stata ricontrollata sulla pagina del file e nella cronologia. La nota storica non è usata come autorizzazione.

## Diritti e trasformazioni

La pagina Commons indica **CC BY-SA 4.0** con dichiarazione del titolare dei diritti. La [licenza ufficiale](https://creativecommons.org/licenses/by-sa/4.0/deed.en), riaperta il 6 ottobre 2026, consente riproduzione e adattamento anche commerciali, richiede attribuzione, link alla licenza, indicazione delle modifiche e stessa licenza per eventuali adattamenti. Il file locale è **l'originale senza modifiche locali**: 800 × 468 px, 65.937 byte; SHA-1 `a66d2ab2350fa92d12a1ab026c4c6e967f59f232`, coincidente con il valore Commons; SHA-256 `62f70178df4e18db7f87a5f57657fbf3ab11e8f86ce74230a2fc2120049ee5e6`. La pagina lo scala tramite CSS, senza creare un altro file.

**Credito visibile:** “Foto di Helge Øverås · Clash 21051980 12 800.jpg · CC BY-SA 4.0 · originale senza modifiche locali”, con link al file e alla licenza. **Alt:** “Joe Strummer, Mick Jones e Paul Simonon dei Clash sul palco a Oslo nel 1980”. Autore, titolare dichiarato, titolo, provenienza, data di verifica, pagina d'uso, modifiche, credito e alt sono registrati in `dati/ritratti.json`.

## Verifiche della proposta

- `node scripts/genera-sito.mjs`: 35 ritratti copiati, 695 pagine più 404; pagina artista generata e copia nella radice identiche.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni, 104 artisti), `node scripts/check-link.mjs` e `git diff --check`: superati.
- Anteprima locale `/artista/the-clash/` su desktop a 1280 px e su mobile a 390 × 844 px: foto caricata, credito leggibile, canonical corretta, nessuna fuoriuscita orizzontale né errore di console. La foto è piccola e in bianco e nero; il musicista a destra è poco illuminato.

**Stato:** proposta isolata nella copia `codex/ritratto-the-clash-2026-10-06`. Nessun trasferimento nel `main`, push o pubblicazione. L'integrazione futura dovrà aggiungere solo la voce `the-clash` al JSON condiviso, oltre al file immagine, alla pagina generata e alla documentazione, preservando le voci distinte degli altri lotti in revisione.
