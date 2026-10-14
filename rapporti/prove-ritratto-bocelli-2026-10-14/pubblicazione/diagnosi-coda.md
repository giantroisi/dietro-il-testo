# Coda Vercel — 14 ottobre 2026

Dopo il login del proprietario, il pannello del deployment Bocelli mostra «Another build is in progress». L’elenco filtrato Building/Queued dell’account individua una sola pubblicazione in build: Ora torna, preview ChA7JJJ9VW3TP7mdbGt9L27kD6iu, commit 1d44964f2cba7f59fe2725bd263970f3f021662f, ramo codex/ora-torna-routine-20261005, circa 30 minuti. Il dettaglio la indica Stale. Due nuovi deployment di Ora torna per commit 50c0076 sono già in coda, insieme a Bocelli 132ab77dc e a un altro progetto.

Proposta concreta: annullare esclusivamente il vecchio build di preview indicato Stale, senza modificare il sito di produzione, i nuovi deployment, il codice o le impostazioni del piano. È stata chiesta autorizzazione perché interviene su Ora torna, progetto diverso da Dietro il testo. Nessuna cancellazione eseguita in assenza di risposta. Nessun acquisto o upgrade Pro.

Prove: build-bloccante.txt e build-bloccante.png. Bocelli resta già integrato e su GitHub; non reintegrarlo e non effettuare un altro push. Dopo sblocco, controllare deployment corretto e confrontare sito pubblico con il commit approvato, quindi verificare desktop/mobile.
