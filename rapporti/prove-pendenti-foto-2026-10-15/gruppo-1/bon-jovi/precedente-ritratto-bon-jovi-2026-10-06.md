# Foto dei Bon Jovi — verifica del 6 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/bon-jovi/`.
- **Soggetto:** i Bon Jovi sul palco di Hyde Park, Londra, il 5 luglio 2013. La pagina Flickr chiama la foto «BJB 008» e la scheda Wikimedia Commons identifica il concerto. L'immagine è stata aperta a piena risoluzione: ritrae il cantante al centro e altri musicisti sul palco. Non viene usata per rappresentare la formazione attuale.
- **Autore e titolare dichiarato:** Mark Kent, account Flickr `flamesworddragon`; non compare un titolare diverso.
- **Pagina originale Flickr, riaperta il 6 ottobre 2026:** https://www.flickr.com/photos/flamesworddragon/9243557962/ — autore, titolo, data dello scatto e licenza visibile **CC BY-SA 2.0**.
- **Pagina del file Wikimedia Commons, riaperta il 6 ottobre 2026:** https://commons.wikimedia.org/wiki/File:Bonjoviband2013.png — fonte Flickr, autore, data, licenza **CC BY 2.0** verificata da un revisore il 6 marzo 2019. Il file attuale da 1855 × 960 px è un ritaglio pubblicato da FMSky nel 2025.
- **URL esatto del PNG usato come sorgente:** https://upload.wikimedia.org/wikipedia/commons/e/e5/Bonjoviband2013.png — 1855 × 960 px; SHA-256 `78dcb41942fbe719dea792c4e8c9627c328b6cb8e100920fcdab59735c6a8077`.

## Licenza e versione locale

La pagina originale Flickr mostra oggi **CC BY-SA 2.0**, mentre Commons conserva la verifica storica **CC BY 2.0**. Per questa proposta si adottano gli obblighi più restrittivi attualmente visibili sulla pagina del fotografo. L'[atto ufficiale CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/deed.it), riaperto il 6 ottobre 2026, permette riuso e modifiche anche commerciali e richiede attribuzione, collegamento alla licenza, indicazione delle modifiche e condivisione della versione modificata con la stessa licenza. Nessuna limitazione NonCommercial o «solo editoriale» è indicata.

Il PNG di Commons è già un ritaglio dell'immagine Flickr. La versione per il sito è stata ridimensionata a **1280 × 662 px** e convertita in JPEG qualità 82, senza altri ritagli o ritocchi: `ritratti/bon-jovi-hyde-park-2013.jpg`, **201.475 byte**, SHA-256 `fa4d997bc08ef7094591cb254394cd283c6cc8599bdf691fdce233046a866b79`. La versione locale è distribuita sotto **CC BY-SA 2.0**.

**Credito visibile:** «Foto di Mark Kent · BJB 008 · ritaglio Commons di FMSky, versione JPEG ridimensionata · CC BY-SA 2.0», con collegamenti alla pagina Flickr, alla pagina Commons e alla licenza. **Alt:** «I Bon Jovi si esibiscono sul palco di Hyde Park a Londra nel 2013». I volti dei musicisti ai lati restano piccoli, soprattutto su mobile.

## Verifiche

La pagina originale, la licenza, il file e il soggetto sono stati controllati separatamente. I dati di provenienza, licenza, file, modifiche, credito, alt, data di controllo e pagina d'uso sono in `dati/ritratti.json`.

- `node scripts/genera-sito.mjs`: 695 pagine più 404 e 48 ritratti copiati; la pagina Bon Jovi e la sitemap artisti nella radice pubblicabile coincidono con la generazione.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni, 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs` e `git diff --check`: superati.
- Anteprima locale desktop e mobile a 390 × 844 px: JPEG caricato, alt e credito presenti, canonical corretta, nessuno scorrimento orizzontale e nessun errore di console riferito alla pagina locale.

**Stato:** proposta preparata e verificata nella copia `codex/ritratto-bon-jovi-2026-10-06`, in attesa di approvazione specifica. Nessun trasferimento nel `main`, push o pubblicazione. In futuro aggiungere solo la voce `bon-jovi` al JSON condiviso, senza sovrascrivere altre proposte.
