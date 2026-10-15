# Foto di Simon & Garfunkel — verifica del 7 ottobre 2026

## Provenienza e soggetto

- **Pagina d'uso proposta:** `/artista/simon-garfunkel/`.
- **Titolo originale:** “Simon and Garfunkel. Yes.”. **Autrice:** Alaina Buzas (account Flickr `alaina buzas`). I metadati EXIF del JPEG indicano Alaina Buzas anche come titolare del copyright; non emerge un titolare distinto.
- **Pagina originale:** https://www.flickr.com/photos/23132451@N03/4551381640/ — riaperta il 7 ottobre 2026 nel browser; espone titolo, autrice, data dello scatto (24 aprile 2010) e licenza CC BY 2.0. La foto aperta mostra Art Garfunkel a sinistra e Paul Simon a destra mentre cantano sul palco.
- **Scheda Wikimedia Commons:** https://commons.wikimedia.org/wiki/File:Simon_%26_Garfunkel,_Jazz_Fest_2010.jpg — conferma autrice, fonte Flickr e licenza CC BY 2.0; FlickreviewR la verificò il 17 dicembre 2014.
- **URL esatto del file usato:** https://upload.wikimedia.org/wikipedia/commons/1/19/Simon_%26_Garfunkel%2C_Jazz_Fest_2010.jpg
- **File locale:** `ritratti/simon-garfunkel-jazz-fest-2010.jpg`, JPEG 3008 × 2000, 433.881 byte. SHA-1 `0e6d1bac8ae9be34e9b8bd728726b6140e572a91`, identico al valore pubblicato da Commons. SHA-256 `653c8154c297df3bb8e446a8dbdf2bb936ae99e7e18bdf5854fe6bc759d3ddb1`.

## Licenza, modifiche e credito

La [licenza ufficiale CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) consente condivisione e adattamenti, anche commerciali. Richiede attribuzione, link alla licenza e indicazione delle modifiche. È stato copiato l'originale Commons senza ritaglio, ridimensionamento o ritocco locale; la pagina applica soltanto la scala CSS.

**Credito visibile:** “Foto di Alaina Buzas · Simon and Garfunkel. Yes. · CC BY 2.0 · originale senza modifiche locali”, con link alla pagina originale Flickr e alla licenza. **Alt:** “Art Garfunkel e Paul Simon cantano insieme sul palco al Jazz Fest del 2010”. Le informazioni sono registrate anche in `dati/ritratti.json`.

La foto documenta l'esibizione del 2010 e non una formazione attuale. Sul telefono i volti sono più piccoli, ma entrambi i protagonisti rimangono visibili. La provenienza e la licenza sono state verificate sulle pagine originali; questo non elimina eventuali contestazioni future sui diritti della fotografia.

## Verifiche e stato

- `node scripts/genera-sito.mjs`: 695 pagine più 404 e 48 ritratti copiati; pagina artista generata e pagina nella radice pubblicabile rese identiche.
- `node scripts/prova-ritratto-credito.mjs`: crediti, hash, alt e dimensioni superati. `node scripts/check-seo.mjs`: 696 HTML, zero problemi. `node scripts/check-coerenza.mjs`: 321 canzoni e 104 artisti, zero problemi. `node scripts/check-link.mjs`: zero problemi. `git diff --check`: superato.
- Anteprima locale nel browser: desktop e 390 × 844 px. Foto originale caricata (larghezza naturale 3008 px), entrambi i protagonisti visibili, credito e link alla fonte/licenza leggibili, canonical `https://www.dietroiltesto.it/artista/simon-garfunkel/`, nessuna fuoriuscita orizzontale e nessun errore di console.

La proposta resta nella copia separata `codex/ritratto-simon-garfunkel-2026-10-07`; non trasferita nel `main`, non inviata al remoto e non pubblicata. Per un'eventuale integrazione, aggiungere solo la voce `simon-garfunkel` al JSON condiviso, senza sovrascrivere le altre proposte.
