# Foto dei White Stripes — verifica del 7 ottobre 2026

## Provenienza e soggetto

- **Pagina d'uso proposta:** `/artista/the-white-stripes/`.
- **Soggetto:** Meg White e Jack White insieme sul palco al Primavera Sound di Barcellona il 1º giugno 2007. Ho aperto e controllato visivamente la foto originale su Flickr e il file scaricato da Commons; la pagina Commons identifica entrambi. È un'immagine storica del duo, non una foto attuale.
- **Titolo originale:** “the white stripes”. **Autore:** Michael Morel. L'account Flickr attribuisce a lui la foto e mostra CC BY 2.0; non indica un titolare separato. La versione su Commons segnala una modifica di anetode.
- **Pagina originale:** https://www.flickr.com/photos/21026676@N00/524697139/ — titolo, autore, data 1º giugno 2007 e licenza CC BY 2.0 ricontrollati sulla pagina Flickr il 7 ottobre 2026.
- **Pagina Commons:** https://commons.wikimedia.org/wiki/File:Meg_%26_Jack,_The_White_Stripes.jpg — autore Michael Morel, modifica di anetode, CC BY 2.0, revisione della licenza Flickr da parte di riana_dzasta il 16 agosto 2007.
- **URL del file usato:** https://upload.wikimedia.org/wikipedia/commons/9/92/Meg_%26_Jack%2C_The_White_Stripes.jpg
- **File locale:** `ritratti/white-stripes-primavera-2007.jpg`, JPEG 1112 × 1032 px, 104.942 byte, SHA-1 `672d5673b303f0a0c231bb3d509efc87922592c0`, SHA-256 `1efd2888844d36edc957c5352df12b4936167069ec3072296e39dc7cae7d578a`. Lo SHA-1 coincide con quello pubblicato da Commons.

## Licenza, modifiche e credito

La [licenza ufficiale CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) permette la copia, il riuso commerciale e gli adattamenti. Richiede attribuzione, collegamento alla licenza e indicazione delle modifiche. La versione Commons è dichiarata modificata da anetode rispetto alla foto Flickr di Michael Morel. Il file Commons è stato copiato senza ritaglio, ridimensionamento o ritocco locale; il sito applica solo la scala CSS. Non è indicato un altro titolare del copyright sulla pagina Flickr.

**Credito visibile:** “Foto di Michael Morel · the white stripes · CC BY 2.0 · versione Commons modificata da anetode, nessuna modifica locale”, con link alla foto Flickr e alla licenza. **Alt:** “Meg White e Jack White insieme sul palco al Primavera Sound di Barcellona nel 2007”. La provenienza e gli obblighi sono registrati anche in `dati/ritratti.json`.

La foto documenta il duo nel 2007: luce e angolazione sono quelle di una ripresa di concerto, perciò va valutata nell'anteprima mobile. La dichiarazione della licenza e la verifica Commons documentano la provenienza, ma non possono escludere in assoluto contestazioni future sui diritti.

## Verifiche e stato

- `node scripts/genera-sito.mjs`: 695 pagine più 404, 48 ritratti copiati. Pagina generata e pagina nella radice pubblicabile identiche; file locale invariato rispetto alla copia Commons verificata.
- `node scripts/prova-ritratto-credito.mjs`: crediti, hash, alt e dimensioni superati. `node scripts/check-seo.mjs`: 696 HTML, zero problemi. `node scripts/check-coerenza.mjs`: 321 canzoni e 104 artisti, zero problemi. `node scripts/check-link.mjs`: zero problemi. `git diff --check`: superato.
- Anteprima locale desktop a 1280 px e mobile a 390 × 844 px: Meg e Jack riconoscibili, immagine caricata, credito e link visibili, canonical `https://www.dietroiltesto.it/artista/the-white-stripes/`, nessuna fuoriuscita orizzontale e nessun errore di console.

Proposta isolata nel ramo `codex/ritratto-white-stripes-2026-10-07`; non trasferita nel `main`, non inviata al remoto e non pubblicata. Se approvata, fondere solo la voce `the-white-stripes` in `dati/ritratti.json`, preservando le proposte distinte Simon & Garfunkel e Toto e gli eventuali altri lotti in revisione.
