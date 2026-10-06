# Wonderwall — correzione circoscritta, 6 ottobre 2026

**Stato:** proposta nella copia `codex/correzione-wonderwall-2026-10-06`, da sottoporre al proprietario. Non trasferita nel `main`, non inviata al remoto, non pubblicata. Il rapporto esterno `LOTTO-06-2026-10-06.md` è stato usato come segnalazione, non come prova.

## Problema

La scheda online collocava nel 2025 il superamento di un miliardo di ascolti Spotify, mentre Sony Music Japan lo annunciava già il **15 ottobre 2020**. Mostrava anche «1,2 mld ascolti» senza data o versione verificata: l'unica fonte numerica, la home generica di Kworb, non documentava quel valore. Nella tabella Oasis di Kworb, la riga «Wonderwall - Remastered» aggiornata il 4 ottobre 2026 porta al track ID `5qqabIl2vWzo9ApSC317sa`, mentre il lettore incorporato usa `7ygpwy2qP3NbrxVkHvUhXY`. Il titolo coincide, l'ID no: non si possono attribuire gli ascolti di quella riga al player della scheda.

Il corpo e la frase iconica presentavano inoltre la spiegazione dell'«amico immaginario» come versione definitiva successiva al divorzio, trattavano un'ipotesi sull'origine del titolo come fatto e contenevano il cognome errato «Mathews». L'articolo riaperto di Radio X riporta invece due dichiarazioni attribuite a Noel Gallagher, «Matthews» e un legame con il film introdotto come ipotesi. La frase iconica ripeteva la storia anziché descrivere il momento della canzone.

## Fonti riaperte e portata

| Fonte | Passaggio controllato | Uso |
|---|---|---|
| [Sony Music Japan, comunicato Oasis](https://www.sonymusic.co.jp/artist/Oasis/info/522989), 15 ottobre 2020 | Titolo, data e paragrafo su «Wonderwall»: primo brano degli anni Novanta oltre un miliardo di stream Spotify prima del 25° anniversario; singolo uscito il 30 ottobre 1995. | Fonte ufficiale A per data del traguardo, data del singolo e appartenenza all'album. È un dato storico della canzone, non il conteggio corrente dell'ID incorporato. |
| [Radio X, Jenny Mensah](https://www.radiox.co.uk/artists/oasis/who-was-wonderwall-written-about/), 11 luglio 2026 | Apertura: data e album; sezione «meaning»: NME 1995 secondo Radio X, spiegazione su Meg **Matthews** e azienda fallita; sezione successiva: Radio X attribuisce alla BBC 2002 la spiegazione dell'amico immaginario; sezione sul titolo: l'ispirazione dal film *Wonderwall* è presentata come riportata, non accertata. | Fonte B per le dichiarazioni con attribuzione a chi le riporta e per il dubbio sul titolo. L'originale NME e la pagina BBC del 2002 non sono stati letti direttamente; la scheda non finge di averli aperti. |
| [Official Charts, Wonderwall](https://www.officialcharts.com/songs/oasis-wonderwall/) | «Official Singles Chart», «Peak position 2». | Archivio primario per la posizione britannica. |
| [Billboard, Wonderwall](https://ca.billboard.com/music/rock/oasis-wonderwall-team-england-world-cup-anthem-1236293831/) | L'articolo riporta il picco n. 8 nella Billboard Hot 100. | Testata della classifica per la posizione statunitense; non viene mantenuta l'inferenza sull'“apertura” del mercato pop americano. |
| [Kworb, classifica tracce Oasis](https://kworb.net/spotify/artist/2DaxqgrOhkeH0fpeiQq2f4_songs.html) → [riga Wonderwall](https://open.spotify.com/track/5qqabIl2vWzo9ApSC317sa), confrontata con [player della scheda](https://open.spotify.com/track/7ygpwy2qP3NbrxVkHvUhXY) | La riga Kworb del 4 ottobre 2026 rimanda all'ID `5qq…`, il player all'ID `7yg…`; entrambi si chiamano «Wonderwall - Remastered». | Prova della **non corrispondenza** delle registrazioni per il conteggio. Nessuna cifra nuova viene dedotta dal solo titolo. Il player è mantenuto perché il browser mostra titolo e artista corretti; l'audio integrale non è stato provato. |

La trascrizione su Blogspot che si dichiarava proveniente da NME e Wikipedia sono state tolte dalle fonti pubblicate: non sono necessarie alle affermazioni rimaste. Non si è usata Google Search Console.

## Modifica

- In `dati/canzoni.json` corretti corpo, frase iconica, fonti, ascolti e tema. Eliminato il conteggio «1,2 mld», corretta la data del traguardo, attribuite entrambe le spiegazioni a Radio X, indicata come ipotetica l'origine del titolo e corretto «Matthews».
- Il tema `amore` è stato rimosso: le spiegazioni discordanti dell'autore non consentono di imporre una sola lettura del destinatario. La frase iconica descrive il ritornello con parole originali, senza versi o traduzioni.
- Rigenerate la pagina, l'immagine di condivisione, le schede contestuali, la ricerca e le sitemap interessate. La scelta casuale della home e il suo `lastmod` sono stati ripristinati perché estranei al lotto.
- `ultimaVerifica` non è stata avanzata: questa è una correzione mirata, non un controllo integrale della pagina, del testo esterno e della registrazione Spotify. L'avviso di verifica parziale resta visibile.

## Controlli e limiti

La generazione produce 695 pagine più 404. Passano `check-coerenza` (321 canzoni, 104 artisti), `check-completezza` (321/321), `check-link`, `check-seo` (696 HTML), `check-nature`, `check-freno` e `check-affiliazioni`. `check-frase-iconica` segnala 31 altre schede pregresse, **non** Wonderwall. L'immagine OG è stata aperta: la nuova frase è leggibile per intero.

Nel browser locale, su desktop a 1280 px e mobile a 390 × 844 px, il testo e le fonti sono visibili, il documento non supera la larghezza della viewport, la canonical è `https://www.dietroiltesto.it/canzone/wonderwall/` e non risultano errori di console. Il lettore Spotify ha mostrato «Wonderwall - Remastered» e Oasis. La riproduzione integrale non è stata provata.

La correzione interessa lo stesso `dati/canzoni.json` di altre proposte isolate: l'eventuale integrazione richiede di portare la sola voce `wonderwall` e i suoi file generati, senza sovrascrivere le altre voci. Il sito online conserva la versione precedente finché il proprietario non approva la proposta e il lotto non viene pubblicato.
