# Ricerca: annuncio accessibile dei risultati — 5 ottobre 2026

## Problema

La ricerca globale aggiorna il pannello mentre si digita, ma non comunica il numero degli esiti alle tecnologie assistive. Questo lascia incompleto il requisito P7 della Costituzione. Il problema riguarda la ricerca presente nelle pagine del sito, non i filtri dell'archivio.

## Modifica

`scripts/genera/ricerca.mjs` aggiunge una regione `role="status"` a ogni ricerca. Annuncia il numero degli esiti, l'assenza di risultati con il collegamento alternativo all'archivio, oppure le raccolte suggerite quando il campo è vuoto. Alla chiusura del pannello cancella l'annuncio. `scripts/genera/stile.mjs` nasconde visivamente la regione senza rimuoverla dall'albero accessibile. Non cambia l'ordine o il contenuto dei risultati.

## Prove

- Generazione: 694 pagine, 321 canzoni, 104 artisti, 254 album e 34 ritratti.
- `node scripts/check-seo.mjs`: passato su 695 pagine. `node scripts/check-link.mjs` e `git diff --check`: passati.
- Browser sull'anteprima locale `/archivio/`: cercando “coldplay” appaiono cinque esiti e il ruolo `status` contiene “5 risultati disponibili.”; con “zzzz-no-match” compare il collegamento all'archivio e l'annuncio dell'assenza di risultati; svuotando il campo appaiono nove raccolte e il collegamento all'archivio, con il relativo annuncio.
- Freccia giù dal campo di ricerca porta il focus al primo risultato. A 390 × 844 px il pannello resta dentro la viewport (larghezza documento 390 px), senza scorrimento orizzontale. L'anteprima desktop e quella mobile non mostrano alterazioni visive. Nessun errore nella console del browser.

## Limiti e stato

La presenza del ruolo e del testo è stata controllata nel browser, ma non è stato eseguito un test con uno screen reader reale. Il lotto resta nella copia separata `codex/ricerca-esiti-accessibili-2026-10-05`, in attesa di revisione: nessun trasferimento al `main`, push o pubblicazione.
