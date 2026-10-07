# Foto dei Queen — verifica del 7 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/queen/`.
- **Soggetto controllato visivamente:** i Queen in concerto a Francoforte nel 1984. Freddie Mercury è al microfono, Roger Taylor alla batteria, John Deacon a sinistra e Brian May in primo piano a destra. I volti restano piccoli, specialmente su mobile; la didascalia non suggerisce che la foto mostri la formazione attuale.
- **Titolo:** “Queen 1984 011.jpg”. **Fotografo e titolare dichiarato:** Thomas Steffan. La [pagina originale su Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Queen_1984_011.jpg) dichiara opera propria, attribuisce lo scatto a Steffan e segnala l'autorizzazione confermata dal Volunteer Response Team nel ticket 2006050910012003. L'email è conservata nell'archivio Wikimedia, accessibile ai volontari autorizzati.
- **File esatto:** https://upload.wikimedia.org/wikipedia/commons/d/d4/Queen_1984_011.jpg. La versione corrente è 871 × 689 px, 625.991 byte; SHA-256 `1446a1fbeb98736f1bb0aa27afc8d2976c825496f62164b468ba6128d86efe9f`.

## Licenza e uso

La pagina Commons offre anche **CC BY-SA 3.0 Unported**. La [pagina ufficiale della licenza](https://creativecommons.org/licenses/by-sa/3.0/deed.en), riaperta il 7 ottobre 2026, consente copia, redistribuzione e adattamento anche commerciale. Richiede credito, titolo (se fornito), link alla licenza, indicazione delle modifiche e stessa licenza per eventuali adattamenti. Il file corrente Commons è stato copiato senza ritagli o ritocchi locali; la cronologia Commons riporta una versione successiva caricata nel 2006. Il sito applica soltanto la scala CSS.

**Credito visibile:** “Foto di Thomas Steffan · Queen 1984 011.jpg · CC BY-SA 3.0 · nessuna modifica locale”, con link alla pagina del file e alla licenza. **Alt:** “I Queen in concerto a Francoforte nel 1984, con Freddie Mercury al microfono”. Il JSON registra fotografo, titolare dichiarato, titolo, URL, licenza, verifica, pagina d'uso, modifiche, credito, alt, dimensioni e hash.

Una fotografia di palco dei Queen a Oakland del 1980, pure attribuita e licenziata, è stata scartata perché i musicisti risultano troppo piccoli. Sono stati esclusi statue, dipinti, tribute band e file privi di prova dei diritti.

## Verifiche

- `node scripts/genera-sito.mjs`: 48 ritratti copiati e 695 pagine più 404 generate. La pagina pubblicabile è identica a quella generata.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 × 800 e 390 × 844 px: foto caricata, credito leggibile, canonical `https://www.dietroiltesto.it/artista/queen/`, nessuna fuoriuscita orizzontale e nessun errore in console.

**Stato:** proposta verificata e isolata nella copia `codex/ritratto-queen-2026-10-07`. Nessun trasferimento nel `main`, push o pubblicazione. Nell'eventuale integrazione, aggiungere soltanto la voce `queen` a `dati/ritratti.json`, preservando le altre proposte in revisione.
