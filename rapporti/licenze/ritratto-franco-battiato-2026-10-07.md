# Ritratto di Franco Battiato — verifica del 7 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/franco-battiato/`.
- **Soggetto controllato visivamente:** Franco Battiato al microfono durante un concerto a Perugia nel 2016. Il volto è riconoscibile; la foto documenta quel concerto, non l'intera carriera.
- **Titolo:** “Franco Battiato.jpg”. **Autore e titolare dichiarato:** utente `SurrealReplicant`. La [pagina originale Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Franco_Battiato.jpg) attribuisce a tale utente uno scatto dichiarato «Own work» e pubblicato come titolare del copyright. Il caricamento proviene dall'utenza omonima di Wikipedia in italiano; non è dichiarato un titolare diverso.
- **URL del file originale:** https://upload.wikimedia.org/wikipedia/commons/7/73/Franco_Battiato.jpg. Il file è 798 × 1417 px, 338.340 byte; SHA-256 `c184e51948d3c378f53867d18a78d67c34270f3b1bc7b92fc6ca6a08e8eaa6f7`.
- **Data indicata dalla pagina:** 30 aprile 2016.

## Licenza e uso

La pagina del file espone **CC BY-SA 4.0 International**. La [pagina ufficiale della licenza](https://creativecommons.org/licenses/by-sa/4.0/deed.en), riaperta il 7 ottobre 2026, permette copia, redistribuzione e adattamento anche commerciale; richiede credito, link alla licenza, indicazione delle modifiche e stessa licenza per eventuali adattamenti. Il JPEG Commons è stato copiato senza ritagli, ridimensionamenti o ritocchi locali; il sito applica soltanto scala CSS.

**Credito visibile:** “Foto di SurrealReplicant · Franco Battiato.jpg · CC BY-SA 4.0 · originale senza modifiche locali”, con link alla fonte e alla licenza. **Alt:** “Franco Battiato al microfono durante un concerto a Perugia nel 2016”. Il JSON registra autore, titolare dichiarato, titolo, URL, diritti, data di verifica, pagina d'uso, modifiche, credito, alt, dimensioni e hash.

## Verifiche

- `node scripts/genera-sito.mjs`: 48 ritratti copiati e 695 pagine più 404 generate. La pagina pubblicabile coincide con quella generata.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 × 800 e 390 × 844 px: immagine caricata, credito visibile, canonical `https://www.dietroiltesto.it/artista/franco-battiato/`, nessuna fuoriuscita orizzontale né errori in console. In desktop il formato verticale occupa una colonna stretta ma il soggetto rimane leggibile.

**Stato:** proposta isolata nella copia `codex/ritratto-franco-battiato-2026-10-07`. Nessun trasferimento nel `main`, push o pubblicazione. L'integrazione futura deve aggiungere solo la voce `franco-battiato` al JSON condiviso e preservare le altre proposte in revisione.
