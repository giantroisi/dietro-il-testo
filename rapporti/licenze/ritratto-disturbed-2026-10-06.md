# Foto dei Disturbed — verifica del 6 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/disturbed/`.
- **Soggetto:** David Draiman, cantante dei Disturbed, con le braccia alzate durante il Nova Rock del 10 giugno 2016. La pagina Commons lo classifica sotto David Draiman e Disturbed; il file è stato ispezionato visivamente. La foto mostra il frontman, non la formazione completa né quella attuale.
- **Pagina originale del file e della licenza:** https://commons.wikimedia.org/wiki/File:Disturbed_-_Novarock_-_2016-06-10-17-23-45.jpg — riaperta il 6 ottobre 2026. L'utente Biha dichiara “Own work” e “I, the copyright holder of this work” prima della licenza CC BY-SA 4.0. Non è indicato un titolare diverso. La pagina riferisce che il fotografo aveva l'accreditamento necessario per scattare e concedere una licenza libera, con prova conservata presso il sistema VRTS di Wikimedia; precisa anche che l'accreditamento non prova di per sé il copyright.
- **Titolo del file:** “Disturbed - Novarock - 2016-06-10-17-23-45.jpg”. **Autore e titolare dichiarato:** Biha. **Data dello scatto:** 10 giugno 2016.
- **URL della versione web usata:** https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Disturbed_-_Novarock_-_2016-06-10-17-23-45.jpg/1280px-Disturbed_-_Novarock_-_2016-06-10-17-23-45.jpg

## Licenza, file e credito

La [licenza ufficiale CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.it), riaperta il 6 ottobre 2026, permette riproduzione e modifiche anche commerciali. Richiede attribuzione, link alla licenza e indicazione delle modifiche; gli adattamenti devono essere distribuiti alla stessa licenza o a una compatibile. È stata usata la versione web Commons da 1280 × 853 px, ridimensionata dall'originale 5184 × 3456 px; nessun ritaglio o ritocco locale. La pagina la scala con CSS.

Il JPEG locale pesa 175.566 byte, SHA-256 `fbdaeb29859e07edccceb98bf5d542b75c1f968e12555b6e3bd3b203a686bdb0`.

**Credito visibile:** “Foto di Biha · Disturbed, Nova Rock 2016 · CC BY-SA 4.0 · versione web ridimensionata, nessun ritocco locale”, con link alla pagina originale e alla licenza. **Alt:** “David Draiman dei Disturbed sul palco del Nova Rock nel 2016, con le braccia alzate”. La voce `disturbed` di `dati/ritratti.json` registra file, autore, titolare dichiarato, fonte, licenza, data, uso, modifiche, credito, alt, dimensioni e hash.

## Verifiche e limiti

- `node scripts/genera-sito.mjs`: 695 pagine più 404 e 48 ritratti copiati. La pagina generata e la sitemap artisti coincidono con le copie pubblicabili nella radice di questo worktree.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni, 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 e 390 × 844 px: foto caricata, alt e credito visibili, canonical `https://www.dietroiltesto.it/artista/disturbed/`, nessuna fuoriuscita orizzontale o errore di console.
- Commons segnala che eventuali diritti della persona ritratta possono imporre limiti ad alcuni riusi. L'impiego previsto è informativo, sulla scheda della band, senza suggerire un'approvazione del sito da parte dell'artista. Questa è una foto del cantante, non del gruppo completo.

**Stato:** proposta isolata nel ramo `codex/ritratto-disturbed-2026-10-06`, in attesa di approvazione specifica. Nessun trasferimento nel `main`, push o pubblicazione. All'integrazione fondere soltanto la voce `disturbed` in `dati/ritratti.json`, preservando gli altri lotti fotografici in revisione.
