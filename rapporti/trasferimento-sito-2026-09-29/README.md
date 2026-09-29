# Trasferimento nella cartella principale — 29 settembre 2026

## Autorizzazione e risultato

Il proprietario ha scritto «confermo il trasferimento» e ha collegato l'estensione Chrome. È stato trasferito il lotto cumulativo `4608d9bc` nella cartella principale, con avanzamento diretto della storia da `84e7bcfd`. Successivamente è stato rigenerato il sito e sono stati aggiornati nella radice **693 file generati nuovi o modificati**.

- Cartella principale: `/Users/gianmicheletroisi/Claude/dietro-il-testo`
- Anteprima della cartella principale: http://127.0.0.1:8781/
- Copia cumulativa conservata: `/Users/gianmicheletroisi/.codex/worktrees/integrazione-sito-2026-09-29/dietro-il-testo`
- Stato: trasferimento completato e controllato; **nessun push o pubblicazione effettuati in questo intervento**. L'autorizzazione ricevuta nomina il trasferimento.

Il catalogo resta di 317 canzoni, 104 artisti e 251 pagine album. Sono presenti le tre foto approvate, ricerca da tastiera e gestione dei risultati mancanti, filtro italiano corretto, grafica originale degli album, lettore Spotify attivato su richiesta, correzione Basic opzionale e selezione delle immagini copiate. Il [rapporto cumulativo](../integrazione-sito-2026-09-29/README.md) documenta le singole modifiche e le licenze.

## Spotify: controllo aggiuntivo in Chrome

Sull'anteprima cumulativa di Aerials, il browser Chrome collegato tramite l'estensione mostra la copertina, il titolo corretto e l'artista nel lettore ufficiale. Prima dell'attivazione non ci sono iframe; dopo il comando compare il solo iframe atteso, con ID `4e9eGQYsOiBcftrWXwsVco`.

Dopo aver premuto Play è stato osservato il pulsante **Pause** e l'avanzamento indicato dal lettore da **7 a 24 secondi**. Il file `prove/spotify-chrome.json` registra queste osservazioni. La successiva schermata mostra nuovamente Play dopo il termine dell'anteprima. Un secondo tentativo apre l'invito del servizio «Listen to the full track and millions more on Spotify», chiuso senza accedere ad alcun account.

Il riquadro vuoto del browser interno non si riproduce in Chrome. È quindi verificato il caricamento del lettore e l'avvio dell'anteprima con progressione visibile. **Non è stata verificata la riproduzione integrale del brano, né effettuata una misurazione acustica dell'uscita audio.** Nel DOM del frame non risultano elementi `<audio>` interrogabili: la prova si basa sugli stati e sull'avanzamento del lettore ufficiale. Le segnalazioni di console osservate provengono da un'altra estensione Chrome, non dal sito; non sono state modificate o disabilitate estensioni.

Screenshot e stato DOM sono in `prove/spotify-chrome.png`, `.txt` e `spotify-chrome-limite-anteprima.txt`. Il documento cumulativo conserva il precedente esito del browser interno come prova storica.

## Verifica del trasferimento

- Confrontati **1018 file** del pacchetto generato con quelli nella radice: contenuto identico per ogni file.
- Preservato il file non tracciato `SEO-LASTMOD-2026-09-21.md`, verificando lo stesso SHA-256 prima e dopo.
- Testi, fonti, stato editoriale e `ultimaVerifica` delle 317 canzoni identici alla base del 22 settembre; cambiano solo i 47 campi paese già approvati nel lotto.
- `check-filtri`, `check-seo`, `check-coerenza`, `check-link` e `prova-ritratto-credito`: tutti passano nella cartella principale. Il controllo dei link esterni resta sintattico, senza richieste HTTP alle fonti.
- `git diff --check`: nessun problema.
- Homepage servita dalla cartella principale: contenuto e ricerca presenti, navigazione all'archivio funzionante, nessuna schermata di errore.
- Archivio a **390 × 844** in Chrome: **107 di 317 canzoni**, 107 schede visibili, pulsante italiano premuto e alto 44 px, larghezza pagina 390 px senza fuoriuscite. Ripristinata la dimensione ordinaria del browser.

Le date di modifica delle 316 pagine canzone con Spotify, delle 251 pagine album e dei tre artisti seguono i cambiamenti visibili già documentati nel lotto cumulativo; `ultimaVerifica` editoriale non è stata aggiornata dalla rigenerazione.

## Coda conservata

Non sono state importate le altre candidature fotografiche o le nuove schede Galway Girl e Nightswimming. I 45 rapporti editoriali dell'altra AI restano nel suo ramo, con proposte da applicare e verificare in interventi dedicati. Nessun file dell'altra AI è stato modificato; nessun dato GSC utilizzato.

Il passo successivo per cambiare la versione pubblica è la pubblicazione del lotto trasferito, con controllo effettivo delle pagine online. Questo rapporto attesta soltanto il trasferimento e i controlli locali.
