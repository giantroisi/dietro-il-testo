# Ritratto Whitney Houston — verifica del 6 ottobre 2026

## Origine, identità e licenza

- **Pagina d'uso proposta:** `/artista/whitney-houston/`.
- **Titolo dato dall'autore:** “WHITNEY HUSTON”, con questa grafia su [Flickr](https://www.flickr.com/photos/kingkongphoto/5112487951/). La pagina Commons nomina il file [Whitney Houston 2000.jpg](https://commons.wikimedia.org/wiki/File:Whitney_Houston_2000.jpg).
- **Autore indicato:** John Mathew Smith & www.celebrity-photos.com. Non è indicato un titolare diverso dall'autore sulla pagina originale.
- **File originale ospitato da Commons:** https://upload.wikimedia.org/wikipedia/commons/3/33/Whitney_Houston_2000.jpg
- **Identificazione visiva:** la fotografia su Flickr e quella su Commons coincidono e mostrano Whitney Houston sorridente, con occhiali ovali scuri e giacca nera. Il file locale è stato confrontato con la fotografia mostrata sulle due pagine.

La pagina Flickr originale espone **CC BY-SA 2.0** nella propria sezione Licenza. Commons indica la stessa licenza e registra la conferma di FlickreviewR 2 del 14 gennaio 2019. La [licenza ufficiale](https://creativecommons.org/licenses/by-sa/2.0/deed.it), riaperta il 6 ottobre 2026, consente il riuso commerciale e le modifiche con attribuzione; le versioni derivate richiedono la stessa licenza. Si conservano titolo originale, nome dell'autore, collegamenti alla fonte e alla licenza. Il file usato non è stato modificato localmente.

**Data dello scatto:** non attestata con certezza. Commons descrive un contesto del 2000, mentre la pagina Flickr mostra una data di scatto automatica del 24 ottobre 2010. Nessuna delle due viene usata nell'alt o nel credito.

## File e attribuzione nel sito

Il JPEG locale è il file Commons da 1560 × 2276 px, 190427 byte, SHA-256 `bec82b4ce555e413aa8e55b02f02f461630b60ee6fe7c1cf0648f279b712df4c`. Nessun ritaglio, ridimensionamento o ritocco locale; la pagina lo visualizza alle dimensioni responsive del sito.

**Credito visibile:** “WHITNEY HUSTON (titolo originale) · foto di John Mathew Smith & www.celebrity-photos.com · file Wikimedia Commons · CC BY-SA 2.0 · nessuna modifica locale”. Titolo, file Commons e licenza sono collegamenti alle rispettive pagine. **Alt:** “Whitney Houston sorride con occhiali ovali scuri e una giacca nera”. Il registro `dati/ritratti.json` conserva autore, fonte, file, licenza, data del controllo, pagina d'uso, modifiche e hash.

## Verifiche e stato

- `node scripts/genera-sito.mjs`: 35 ritratti copiati, 695 pagine più 404; la pagina generata coincide con quella nella radice della copia.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs` e `git diff --check`: superati.
- Anteprima desktop e mobile a 390 × 844 px: foto caricata e riconoscibile, credito visibile e leggibile, larghezza del documento pari a 390 px, nessun errore di console.

**Stato:** proposta isolata nella copia `codex/ritratto-whitney-houston-2026-10-06`. Nessun trasferimento nel `main`, push o pubblicazione. L'integrazione successiva dovrà aggiungere soltanto la voce `whitney-houston` al JSON condiviso, oltre al file, alla pagina generata e al dossier, preservando le voci degli altri lotti in revisione.
