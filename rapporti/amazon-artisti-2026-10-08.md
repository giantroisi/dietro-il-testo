# Amazon anche nelle pagine artista — 8 ottobre 2026

## Richiesta e intervento

Il proprietario richiede tre collegamenti anche nelle pagine della band: vicino all’immagine, sotto la storia, sotto gli album pubblicati. Sempre vinili, diversi quando disponibili. Aggiornate le **nove pagine artista** che hanno prodotti già verificati: Eagles, Blink-182, Bring Me the Horizon, Oasis, Alice in Chains, Caparezza, Cesare Cremonini, 883 e Limp Bizkit. Nessuna ricerca editoriale o nuova scheda.

Il primo riquadro sta subito sotto la foto e il suo credito, nella stessa colonna dell’immagine su desktop; su mobile segue la foto. Se l’artista usa la grafica originale, segue quella. I due richiami compatti sono subito dopo le sezioni storia e discografia; l’ordine di quelle sezioni resta quello della pagina. Il pulsante giallo «Acquista su Amazon» è adattato allo spazio. Informativa unica in fondo.

## Scelte

`dati/affiliazioni-artisti.json` registra tre chiavi del catalogo album nell’ordine immagine, storia, discografia. Nessun URL o prova Prime duplicati: ogni riquadro recupera il prodotto da `dati/affiliazioni-prodotti.json`. Sono ammessi solo vinili con prova Prime e chiave dell’artista corrispondente. Resta attivo il controllo di origine ufficiale, ASIN, tag e attributi del link.

| Artista | Vicino all’immagine | Sotto la storia | Sotto la discografia |
|---|---|---|---|
| [Eagles](https://www.dietroiltesto.it/artista/eagles/) | Hotel California | Hotel California | Hotel California |
| [Blink-182](https://www.dietroiltesto.it/artista/blink-182/) | Enema of the State | Take Off Your Pants and Jacket | Enema of the State |
| [Bring Me The Horizon](https://www.dietroiltesto.it/artista/bring-me-the-horizon/) | Sempiternal | POST HUMAN: NeX GEn | That's the Spirit |
| [Oasis](https://www.dietroiltesto.it/artista/oasis/) | Heathen Chemistry | (What's the Story) Morning Glory? — 30th Anniversary Deluxe | Heathen Chemistry |
| [Alice in Chains](https://www.dietroiltesto.it/artista/alice-in-chains/) | Facelift | Facelift | Facelift |
| [Caparezza](https://www.dietroiltesto.it/artista/caparezza/) | Il sogno eretico | Il sogno eretico | Il sogno eretico |
| [Cesare Cremonini](https://www.dietroiltesto.it/artista/cesare-cremonini/) | Bagùs | Maggese | Bagùs |
| [883](https://www.dietroiltesto.it/artista/883/) | La dura legge del gol! — vinile cristallo | La dura legge del gol! — vinile cristallo | La dura legge del gol! — vinile cristallo |
| [Limp Bizkit](https://www.dietroiltesto.it/artista/limp-bizkit/) | Significant Other | Significant Other | Significant Other |

Tre vinili diversi per BMTH; due alternati per Blink-182, Oasis e Cremonini. Negli altri cinque casi c’è un solo vinile verificato, ripetuto nelle tre posizioni. Non sono introdotte edizioni aggiuntive prive di prova. I prodotti sono i vinili Prime già verificati direttamente oggi, con fonti e URL ufficiali registrati nei dossier precedenti (`amazon-blink-enema`, `amazon-sempiternal`, `amazon-bmth-altri-album`, `amazon-richieste`, tutti del 2026-10-08, e attivazione Amazon per Eagles). Nessun CD autonomo, prezzo, immagine di prodotto copiata o promessa Prime caricata sul sito. Il vinile That’s the Spirit comprende un CD nell’edizione già verificata, ma il prodotto selezionato è il vinile.

## Verifiche

- Generazione: 695 pagine più 404; passano affiliazioni (**210 link DOM**, 27 aggiunti agli artisti), SEO su 696 HTML e collegamenti.
- Nove prove negative: le sei preesistenti più vinile di un altro artista, album corretto nella posizione sbagliata e posizione artista duplicata. Tutte bloccate; ID vuoto disattiva anche tutti i riquadri artista e l’informativa.
- Tutte le nove pagine controllate in browser a 1280×900 e 390×844: tre riquadri visibili, vicino alla foto, subito dopo storia e discografia, pulsanti dentro il riquadro, link informativa /affiliazioni/, nessun overflow.
- BMTH, Oasis, Cremonini e 883 controllati anche a 320×844, stesso esito. BMTH controllato visivamente nei temi chiaro e scuro.
- Le 50 pagine album/canzone già pubblicate sono identiche byte per byte all’output successivo alla modifica: la funzione per i riquadri compatti è stata riusata senza cambiare la loro presentazione.
- Copiati solo i nove HTML artista e le relative voci sitemap; foto, crediti e contenuti editoriali conservati.

## Stato e limiti

Copia `/private/tmp/dit-pulsante-amazon-2026-10-08`, ramo `codex/amazon-artisti-2026-10-08`. Main, file non tracciati e copia dell’altra AI preservati. Routine ancora sospesa. Totale: **17 prodotti su 59 pagine** (17 album, 33 canzoni, 9 artisti), 177 riquadri visibili per disposizione. Non tutte le 104 pagine artista hanno un prodotto verificato: questo lotto riguarda i nove artisti del catalogo Amazon attuale. La verifica Prime è dell’offerta del giorno e può cambiare. Rimane il limite sull’informativa a fondo pagina comunicato nel §70 della Roadmap; non viene attestata conformità di quel posizionamento. Pubblicazione richiesta: registrare la verifica live dopo integrazione e push.
