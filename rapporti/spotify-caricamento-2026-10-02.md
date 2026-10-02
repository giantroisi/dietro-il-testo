# Lettore Spotify già caricato — proposta del 2 ottobre 2026

## Problema e modifica

Nelle schede canzone il lettore richiedeva «Carica il lettore». Su richiesta del proprietario, le 316 schede con un ID Spotify valido ora includono direttamente l'iframe del brano nell'HTML iniziale, con caricamento immediato. Il link esterno al brano resta disponibile. La scheda senza ID continua a mostrare il riquadro originale.

La pagina Privacy e la sua descrizione per i motori di ricerca dichiarano ora che l'apertura di una scheda con lettore contatta automaticamente Spotify. Questo può comunicare al servizio l'indirizzo IP del visitatore e consentirgli di impostare cookie, anche prima che venga premuto Riproduci. Il sito non riproduce automaticamente l'audio.

## Verifiche

- Generazione: 687 pagine più 404. L'avviso su 316 schede modificate corrisponde esattamente alle 316 schede dotate di ID Spotify. Sono cambiati anche Privacy, lo script condiviso e due sitemap.
- Controllo di tutte le 317 schede: un solo iframe immediato per ciascuna delle 316 con ID valido, zero per quella senza ID; nessuna conserva il pulsante di attivazione.
- Passano `check-seo` (688 pagine), `check-coerenza` (317 canzoni, 104 artisti), `check-link`, `check-filtri`, `check-nature` e `git diff --check`.
- Nell'anteprima locale `/canzone/aerials/` il lettore mostra copertina, titolo, artista e comando Play senza alcun clic precedente. Sul mobile a 390 px la pagina non scorre orizzontalmente; nessun errore di console. L'audio non è stato avviato in questa verifica.

## Limiti e stato

Il caricamento automatico comporta una richiesta a Spotify già quando si apre la pagina e può incidere sui tempi di caricamento. La descrizione Privacy è stata aggiornata per riflettere il nuovo comportamento; questo controllo non è una valutazione legale formale. La copia è pronta per la revisione del proprietario. Nessun trasferimento alla cartella principale, push o pubblicazione.
