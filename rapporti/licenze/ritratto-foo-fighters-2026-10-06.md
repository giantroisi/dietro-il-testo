# Ritratto Foo Fighters — verifica del 6 ottobre 2026

## Provenienza, licenza e soggetto

- **Pagina d'uso proposta:** `/artista/foo-fighters/`.
- **Pagina originale del file:** [Dave Grohl.jpg](https://commons.wikimedia.org/wiki/File:Dave_Grohl.jpg), riaperta il 6 ottobre 2026. Descrive lo scatto al National Bowl di Milton Keynes il 3 luglio 2011; indica «Own work» e **Ryanw2313** come autore. Nella sezione licenza l'autore dichiara di essere titolare dei diritti e pubblica il file con licenza CC BY-SA 3.0. La pagina non nomina un titolare diverso dall'autore. L'hash SHA-1 dell'originale scaricato, `1939afdff9fc9bc0daf3d828ba61b42b526be40c`, coincide con il checksum della pagina Commons.
- **File originale:** [JPEG 3648 × 2736 px](https://upload.wikimedia.org/wikipedia/commons/c/cd/Dave_Grohl.jpg), 3.392.591 byte.
- **Licenza:** [CC BY-SA 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/), letta il 6 ottobre 2026. Consente riuso commerciale e modifiche; richiede attribuzione, link alla fonte e alla licenza, indicazione delle modifiche e distribuzione del materiale adattato sotto la stessa licenza o una compatibile. Il titolo originale è riportato nel credito.
- **Controllo visivo:** sia l'originale sulla pagina Commons sia la versione locale mostrano Dave Grohl sul palco. La pagina Commons identifica il soggetto anche nei dati strutturati. Sul sito la foto rappresenta **il frontman**, non l'intera formazione dei Foo Fighters. Sono state scartate foto di palco del gruppo del 2023 e 2024 perché i musicisti erano troppo piccoli nell'anteprima mobile.

## Asset e credito predisposti

- **File locale:** `ritratti/foo-fighters-dave-grohl-2011.jpg`, JPEG 1400 × 1050 px, 200.228 byte; SHA-256 `19e5d3cdfc6ec78d40151ad1949c0faae3f2e69f5453bc619f31f085ea31e618`.
- **Modifiche:** ridimensionamento proporzionale da 3648 × 2736 a 1400 × 1050 px e ricompressione JPEG al 78%; nessun ritaglio o ritocco. La versione derivata mantiene l'attribuzione e la licenza CC BY-SA 3.0.
- **Alt:** «Dave Grohl dei Foo Fighters durante un concerto al National Bowl nel 2011».
- **Credito visibile:** «Dave Grohl.jpg · foto di Ryanw2313 · CC BY-SA 3.0 · ridimensionata e ricompressa»; il titolo collega alla pagina originale e la licenza alla pagina Creative Commons.

## Prove e limiti

La generazione locale ha copiato 35 ritratti e prodotto 695 pagine più 404. Passano `prova-ritratto-credito` (anche hash, alt e dimensioni), `check-seo` (696 HTML, zero problemi), `check-coerenza` (321 canzoni, 104 artisti), `check-link`, confronto della pagina generata con quella pubblicabile e confronto byte per byte dell'immagine con la copia generata. Nell'anteprima desktop il soggetto e il credito sono leggibili. A 390 × 844 px la foto si carica a 280 × 210,5 px, il credito è visibile e la larghezza della pagina resta 390 px senza scorrimento orizzontale. Nessun errore di console della pagina locale; gli errori osservati appartengono alle pagine Wikimedia aperte in precedenza nella stessa scheda.

**Limiti:** lo scatto è del 2011 e mostra soltanto Dave Grohl. Non documenta la formazione attuale. La storia editoriale della pagina non è stata riverificata in questo lotto. Proposta isolata, senza trasferimento nel `main`, push o pubblicazione. L'integrazione futura dovrà unire la sola voce `foo-fighters` di `dati/ritratti.json` e la nuova sezione della Roadmap con le altre proposte fotografiche in attesa, evitando di sovrascrivere le rispettive voci del JSON.
