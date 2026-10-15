# Foto di Ozzy Osbourne — verifica del 7 ottobre 2026

## Provenienza e soggetto

- **Pagina d'uso proposta:** `/artista/ozzy-osbourne/`.
- **Soggetto:** ritratto di Ozzy Osbourne durante la firma della sua autobiografia *I Am Ozzy* a Filadelfia il 27 gennaio 2010. Ho aperto la foto originale su Flickr e il file web di Commons: il volto è riconoscibile. Una foto candidata del concerto *Back to the Beginning* del 2025 è stata esclusa perché Ozzy è minuscolo nell'inquadratura e non funziona come ritratto.
- **Titolo originale:** “Ozzy Osbourne in Philly”. **Autore:** Kevin Burkett, indicato dal suo account Flickr. La pagina non indica un titolare separato. Il caricamento su Commons attribuisce la foto allo stesso autore.
- **Pagina originale:** https://www.flickr.com/photos/24514780@N02/4311089266/ — titolo, autore, data dello scatto e licenza CC BY-SA 2.0 ricontrollati il 7 ottobre 2026.
- **Pagina Commons:** https://commons.wikimedia.org/wiki/File:Ozzy_Osbourne-2010.jpg — provenienza Flickr, autore, licenza CC BY-SA 2.0 e verifica Flickr da FlickreviewR il 21 febbraio 2010.
- **URL del file usato:** https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Ozzy_Osbourne-2010.jpg/960px-Ozzy_Osbourne-2010.jpg
- **File locale:** `ritratti/ozzy-osbourne-philadelphia-2010.jpg`, JPEG 960 × 1104 px, 380.108 byte, SHA-256 `e626756f3391076b2bc39a56572d5ebaaa8ebb3c2fa339cac68d661a0cd5c267`.

## Licenza, modifiche e credito

La [licenza ufficiale CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) consente copia, riuso commerciale e adattamenti con attribuzione e condivisione degli adattamenti sotto la stessa licenza. Richiede il nome dell'autore, il titolo fornito, il link alla fonte e alla licenza. Il sito usa la versione web generata da Commons, ridimensionata dall'originale 2015 × 2317 px a 960 × 1104 px. Non è stato fatto alcun ritaglio o ritocco locale; si applica soltanto la scala CSS.

**Credito visibile:** “Foto di Kevin Burkett · Ozzy Osbourne in Philly · CC BY-SA 2.0 · versione Commons ridimensionata, nessun ritocco locale”, con link alla foto Flickr e alla licenza. **Alt:** “Ozzy Osbourne a un incontro per la firma della sua autobiografia a Filadelfia nel 2010”. Gli stessi dati sono registrati in `dati/ritratti.json`.

La foto risale al 2010 e raffigura un incontro con i lettori, non un concerto né l'aspetto dell'artista negli ultimi anni di vita. La licenza dichiarata su Flickr e confermata dal revisore Commons fornisce una base documentata per il riuso; non elimina in assoluto possibili contestazioni di terzi.

## Verifiche e stato

- `node scripts/genera-sito.mjs`: 695 pagine più 404, 48 ritratti copiati. Pagina generata e pagina nella radice pubblicabile identiche; file locale invariato rispetto alla versione web Commons verificata.
- `node scripts/prova-ritratto-credito.mjs`: crediti, hash, alt e dimensioni superati. `node scripts/check-seo.mjs`: 696 HTML, zero problemi. `node scripts/check-coerenza.mjs`: 321 canzoni e 104 artisti, zero problemi. `node scripts/check-link.mjs`: zero problemi. `git diff --check`: superato.
- Anteprima locale desktop a 1280 px e mobile a 390 × 844 px: volto riconoscibile, immagine caricata, credito e link visibili, canonical `https://www.dietroiltesto.it/artista/ozzy-osbourne/`, nessuna fuoriuscita orizzontale e nessun errore di console.

Proposta isolata nel ramo `codex/ritratto-ozzy-osbourne-2026-10-07`; non trasferita nel `main`, non inviata al remoto e non pubblicata. Se approvata, fondere solo la voce `ozzy-osbourne` in `dati/ritratti.json`, preservando le proposte distinte Simon & Garfunkel, Toto e The White Stripes e gli eventuali altri lotti in revisione.
