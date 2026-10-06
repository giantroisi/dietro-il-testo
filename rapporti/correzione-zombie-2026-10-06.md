# Zombie — correzione circoscritta, 6 ottobre 2026

**Stato:** proposta locale nel ramo `codex/correzione-zombie-2026-10-06`. Nessun trasferimento nel `main`, push o pubblicazione. Il rapporto indipendente `LOTTO-06-2026-10-06.md` è stato usato come segnalazione; tutte le fonti pertinenti sono state riaperte.

## Problema

La scheda già online univa in una sola frase la visione televisiva dell'attentato durante il tour inglese e la composizione nell'appartamento di Limerick, aggiungendo «nella primavera» senza prova diretta. Scriveva «Jonathan» anziché **Johnathan** Ball e non distingueva che Tim Parry morì cinque giorni dopo l'esplosione. Attribuiva direttamente a *Vox* una dichiarazione conosciuta attraverso *TIME* e, nella frase iconica, presentava come parole di O'Riordan una lettura del riferimento al 1916 non documentata dalle interviste riaperte. La stessa frase traduceva fra virgolette un frammento del ritornello, in contrasto con P3.

Il contatore «1,8 mld ascolti» citava solo l'indice generico di Kworb. Nella pagina specifica dei Cranberries, la riga numerica «Zombie - 2025 Remastered» rimanda al track ID Spotify `3gjHnylel3PTRpjS44ocqr`; il player incorporato usa `2IZZqH4K02UIYg5EohpNHF`, che Spotify chiama semplicemente «Zombie». Il numero non è attribuibile all'ID mostrato dal sito.

## Fonti riaperte e portata delle prove

| Fonte | Passaggio controllato | Uso |
|---|---|---|
| [TIME, Flora Carr](https://time.com/5104514/cranberries-history-zombie-dolores-oriordan/), 16 gennaio 2018 | Paragrafi finali: notizia vista durante il tour inglese; dichiarazione a *Vox* riportata da TIME; scrittura su chitarra acustica a Limerick; successiva trasformazione sonora; ricordo di Colin Parry raccolto a *BBC Breakfast Ulster*. | Fonte B per contesto e testimonianze attribuite. L'originale di *Vox* e la trasmissione BBC non sono stati aperti direttamente. TIME scrive il nome del bambino come Johnathan, in accordo con la fondazione. |
| [Fondazione Tim Parry Johnathan Ball](https://timparryjohnathanballfoundation.org.uk/), «Foundation Journey», 20 e 25 marzo 1993 | Due bombe dell'IRA il 20 marzo; Johnathan, tre anni, morì quel giorno; Tim, dodici anni, il 25 marzo. | Fonte istituzionale A per nome, età e cronologia delle vittime. La fondazione conta 51 altri feriti; la nuova scheda evita cifre sui feriti perché le fonti secondarie divergono. |
| [MusicRadar, intervista a Noel Hogan](https://www.musicradar.com/artists/the-way-she-delivered-it-was-more-important-than-the-actual-subject-matter-her-delivery-of-that-chorus-is-so-powerful-how-the-cranberries-created-the-monster-hit-zombie), 29 agosto 2025 | Hogan ricorda la prima versione acustica alle prove, la richiesta di O'Riordan di riflettere la rabbia con un suono più pesante, le chitarre distorte, Stephen Street come produttore e il secondo album *No Need to Argue*. | Intervista diretta riportata da una testata musicale B per musica, produzione e album. Non documenta una dichiarazione di O'Riordan sul 1916. |
| [Kworb, classifica Cranberries](https://kworb.net/spotify/artist/7t0rwkOPGlDPEhaOcVtOt9_songs.html) → [riga conteggiata](https://open.spotify.com/track/3gjHnylel3PTRpjS44ocqr), confrontata con [player della scheda](https://open.spotify.com/track/2IZZqH4K02UIYg5EohpNHF) | La riga aggiornata il 3 ottobre 2026 riguarda la rimasterizzazione 2025; gli ID sono diversi. | Prova della non corrispondenza del contatore. Il player è mantenuto perché il browser mostra «Zombie» e The Cranberries; l'audio integrale non è stato verificato. |

Wikipedia è stata rimossa dalle fonti della pagina: i fatti mantenuti hanno sostegno nelle tre fonti nominative sopra. Non è stata usata Google Search Console.

## Modifiche

- `dati/canzoni.json`: separati i due luoghi della storia senza inventare una sequenza precisa; corretti nome e tempi delle vittime; attribuiti a TIME i riferimenti a Vox e BBC; riscritta la descrizione sonora con la testimonianza di Hogan. Rimossi data precisa del singolo, studio di registrazione, etichetta «dream pop» e superlativo non necessari alla correzione e non verificati nelle fonti B aperte.
- La frase iconica descrive voce e chitarre del ritornello con parole originali. Spariscono la traduzione virgolettata del verso, il superlativo «più citato» e la falsa attribuzione all'autrice della lettura sul 1916.
- Eliminati `ascolti`, `ascoltiTesto` e la fonte Kworb generica; l'ID Spotify e il collegamento Letras restano quelli già presenti. L'eventuale uso futuro di un contatore richiede il controllo dello **stesso track ID**.
- Rigenerate la pagina, l'immagine condivisibile, i richiami contestuali, la ricerca e la sitemap delle canzoni. La home casuale e la sua data in sitemap sono state ripristinate perché estranee al lotto. `ultimaVerifica` non è stata avanzata: il controllo non copre l'intera scheda né il testo esterno.

## Prove e limiti

La generazione produce 695 pagine più 404. Passano `check-coerenza` (321 canzoni, 104 artisti), `check-completezza` (321/321), `check-link`, `check-seo` (696 HTML), `check-nature`, `check-freno` e `check-affiliazioni`. `check-frase-iconica` segnala altre 32 schede pregresse, **non** Zombie. L'immagine OG è stata aperta e la nuova frase è interamente leggibile.

Nel browser locale la scheda corretta è stata vista a 1280 px e 390 × 844 px: testo e fonti corretti, lettore Spotify con titolo e artista, nessuna fuoriuscita orizzontale, canonical `https://www.dietroiltesto.it/canzone/zombie-cranberries/`, nessun errore di console. L'audio integrale, il collegamento Letras e l'intera verifica editoriale della scheda restano fuori da questo lotto.

La proposta modifica lo stesso `dati/canzoni.json` di altre copie isolate. L'integrazione futura deve conservare le altre voci e recepire solo `zombie-cranberries` più i file generati interessati.
