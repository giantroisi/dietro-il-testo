# Integrazione cumulativa — Dietro il testo, 29 settembre 2026

## Stato e problema osservato

La cartella principale è al commit `84e7bcfd` del 22 settembre 2026. Gli interventi successivi sono rimasti in copie separate: le loro anteprime non rappresentavano una versione cumulativa del sito. Il 29 settembre la pagina pubblica degli Iron Maiden mostrava ancora la grafica originale, senza la fotografia approvata. Il riscontro è conservato in `prove/confronto-online.json`; non equivale a una verifica dell'intero sito pubblico o del commit effettivamente distribuito.

È stata creata e verificata una copia cumulativa dalla base della cartella principale. Non sono stati trasferiti file nella cartella principale, eseguiti push o effettuate pubblicazioni.

- **Copia:** `/Users/gianmicheletroisi/.codex/worktrees/integrazione-sito-2026-09-29/dietro-il-testo`
- **Anteprima cumulativa:** http://127.0.0.1:8780/
- **Archivio italiano:** http://127.0.0.1:8780/archivio/?paese=it
- **Album di esempio:** http://127.0.0.1:8780/album/bring-me-the-horizon/sempiternal/
- **Tre foto approvate:** `/artista/iron-maiden/`, `/artista/system-of-a-down/`, `/artista/alice-in-chains/` sulla stessa anteprima.
- **Stato:** verificata localmente e in attesa della decisione sulla pubblicazione; la riproduzione Spotify ha il limite descritto sotto.

Le anteprime restano locali e richiedono il processo di anteprima attivo su questo computer.

## Lavori riuniti

Sono state applicate solo le parti pertinenti dei commit, senza importare interi rami editoriali o HTML prodotti da altre basi. `lotti-integrati.json` registra i percorsi recuperati.

| Intervento | Provenienza | Risultato nella copia |
|---|---|---|
| Ricerca senza risultati e grafica originale degli album | `ec87f791` | Messaggio utile e collegamento all'archivio; grafica tipografica al posto del riquadro «Spazio immagine». Non è una copertina commerciale riprodotta. |
| Spotify attivato su richiesta | `ede07a3c` | Nessun iframe prima dell'attivazione; pulsante accessibile e collegamento esterno alla traccia. |
| Ricerca da tastiera | `053cc067` | Frecce per i suggerimenti, collegamenti reali, Esc torna al campo, Tab per uscire; etichetta della regione di ricerca corretta. |
| Filtro artisti italiani | `a5e62db5` | Normalizzati 47 campi `paese`, usando la classificazione già presente negli artisti. Il filtro passa da 60 a 107 canzoni su 317. |
| Accesso Basic opzionale | `5f0fb84e` | Credenziali malformate rifiutate senza eccezione; password con due punti gestite correttamente. Nessuna configurazione di accesso attivata. |
| Foto approvate di Iron Maiden, System of a Down e Alice in Chains | `955a60af` | Tre file controllati, testo alternativo e crediti visibili completi. |
| Copia delle sole immagini selezionate e attribuite | Parte di `6bd18a80`, adattata ai crediti compositi | Nel sito generato entrano 30 immagini realmente usate. I file precedenti `ac-dc.jpg` e `system-of-a-down.jpg` restano nelle sorgenti, senza essere copiati nel pacchetto generato. |

Il catalogo resta di **317 canzoni, 104 artisti e 251 album**. Non sono state aggiunte schede. Nei dati delle canzoni cambiano soltanto i 47 campi `paese`: testi, fonti, stato editoriale e `ultimaVerifica` sono identici alla base. Le variazioni sono elencate in `paesi-normalizzati.json`.

## Foto approvate e licenze

L'approvazione «tutte e tre» è stata applicata alle tre foto. Non è stata estesa alle altre candidature o alla pubblicazione del sito.

| Soggetto | Autore e licenza | File |
|---|---|---|
| Iron Maiden, O2 2017 | Raph_PH · CC BY 2.0 | `ritratti/iron-maiden-o2-2017.jpg`, 960 × 539 |
| System of a Down, concerto 2013 | madSec · CC BY 2.0 | `ritratti/system-of-a-down-concerto-2013.jpg`, 960 × 649 |
| Alice in Chains, Rock am Ring 2019 | Sven Mandel · CC BY-SA 4.0 | `ritratti/alice-in-chains-rock-am-ring-2019.jpg`, 960 × 1440 |

Le pagine mostrano autore, fonte e collegamento alla licenza; la riduzione delle dimensioni è dichiarata. I dossier originali, le prove di licenza e le verifiche visive sono conservati in `../licenze/candidature-2026-09-29/`. Il rapporto `../licenze/integrazione-ritratti-approvati-2026-09-29.md` documenta il lotto fotografico precedente, con la sua copia e il suo indirizzo di anteprima: il presente documento descrive invece la versione cumulativa.

`prova-ritratto-credito.mjs` verifica integrità dei tre file, dimensioni, crediti, alternative testuali e rifiuto di attribuzioni incomplete o URL non HTTP(S). La selezione degli asset usa la stessa guardia del rendering del ritratto, compresi i crediti compositi.

## Controlli completati

| Prova | Esito e limite |
|---|---|
| Generazione | 687 pagine più 404; conteggio SEO di 688 pagine. |
| `check-filtri` | Passa su 317 canzoni; filtro italiano 107. |
| `check-seo` | Zero problemi su 688 pagine. |
| `check-coerenza` | Zero problemi sui dati di canzoni e artisti. |
| `check-link` | Zero problemi nei collegamenti interni e negli URL esterni; controllo locale e sintattico, senza verifica HTTP delle fonti. |
| `prova-ritratto` e `prova-ritratto-credito` | Passano le guardie delle immagini e i casi dei tre ritratti approvati. |
| Sintassi dei moduli modificati | Controllata con `node --check`. |
| Accesso Basic opzionale | Otto casi locali: disattivato, assente, Base64 malformato, schema diverso, password errata, password con due punti, utente errato, separatore assente. Passano. Nessuna prova sulla configurazione Vercel effettiva. |
| Git | Controllo delle differenze completato senza errori di spaziatura o marcatori di conflitto. |

Gli esiti dei cinque controlli finali sono in `prove/controlli.json` e nei rispettivi file `.txt`. La prova del ritratto precedente è in `prove/prova-ritratto.txt`. La prova Basic è stata eseguita localmente con ambiente simulato e senza leggere credenziali reali; non è disponibile un file separato della sua esecuzione.

### Verifica effettiva nel browser

- **Ricerca:** «bohemian» restituisce il collegamento atteso; Freccia giù porta il focus sul collegamento, Esc lo riporta al campo. Una ricerca senza risultati offre l'archivio, raggiungibile con Tab e Invio.
- **Archivio a 390 × 844:** il pulsante «Artisti italiani» cambia l'URL, ha `aria-pressed=true` e mostra 107 risultati visibili su 317; pulsanti alti 44 px, nessuno scorrimento orizzontale.
- **Album Sempiternal a 390 × 844:** grafica originale visibile, decorativa per i lettori di schermo, dimensioni coerenti con il contenitore. Nessun segnaposto «Spazio immagine».
- **Tre ritratti a larghezze reali di 390 e 320 px:** file caricati, alternative testuali e crediti presenti, nessuna fuoriuscita orizzontale. Il precedente lotto fotografico conserva inoltre le prove a 1280 px.
- **Console:** nessun errore o avviso rilevato nelle prove locali sopra.

Screenshot e osservazioni sono nella cartella `prove/`. L'immagine `archivio-desktop.png` mostra il totale aggiornato del filtro; `album-mobile.png` mostra la nuova grafica degli album.

### Limite reale di Spotify

Su Aerials a 390 px, l'attivazione da tastiera crea un solo iframe con l'ID atteso `4e9eGQYsOiBcftrWXwsVco`; prima del comando gli iframe sono zero. Il collegamento esterno alla traccia resta disponibile. Nel browser interno il contenuto dell'iframe resta vuoto: **la riproduzione audio non è stata verificata**. `prove/spotify-mobile.json` e `.png` documentano esattamente questo esito. Serve ancora un controllo in un browser ordinario prima di dichiarare verificata la riproduzione del lettore incorporato.

### Date di modifica

La generazione segnala che **316 canzoni su 317 risultano modificate**. È una conseguenza dell'intervento visibile sul lettore delle 316 schede con `spotifyId`, non una nuova verifica editoriale. Sono stati confrontati gli insiemi: coincidono esattamente; The Sound of Silence, senza ID, conserva la data precedente.

Cambiano inoltre le date di modifica delle 251 pagine album per la nuova grafica e delle tre pagine artista per le foto approvate. `prove/date-modifica.json` conserva i confronti prima/dopo. `ultimaVerifica` non è stato modificato. L'avviso del generatore è conservato in `prove/generazione.txt`, non ignorato o soppresso.

## Lavori ancora separati

L'inventario `prove/arretrato.json` distingue preparazione, revisione e integrazione:

1. **Altre immagini:** 19 candidature con dossier separati e una precedente preparazione per Ed Sheeran. L'approvazione delle tre foto non autorizza automaticamente queste altre immagini.
2. **Nuove schede:** Galway Girl e Nightswimming sono preparazioni separate, non aggiunte al catalogo di questa versione. La loro integrazione richiede chiusura editoriale, controllo del freno e prove pertinenti secondo Costituzione e F67/F88; Nightswimming conserva anche il limite del lettore nel browser interno.
3. **Altra AI:** i rapporti coprono 45 schede. Le proposte di correzione non equivalgono a 45 schede già aggiornate. Servono integrazioni mirate e verifica delle singole affermazioni. Il ramo e i file dell'altra AI non sono stati modificati.

Nessun dato di Google Search Console è stato utilizzato.

## Decisione finale e prosecuzione

Il proprietario aveva chiesto di vedere le modifiche prima di pubblicare. Questa copia e l'anteprima riuniscono ora il lotto tecnico e le tre foto approvate. È ancora necessaria la decisione sulla pubblicazione della versione cumulativa; il limite Spotify va considerato esplicitamente. Fino a tale decisione il lotto resta chiuso alla modifica degli stessi file da parte della routine.

Quando autorizzata, l'integrazione dovrà trasferire solo il lotto approvato, rigenerare e controllare l'output, preservare il file non tracciato `SEO-LASTMOD-2026-09-21.md` e ogni altra variazione intervenuta nella cartella principale, poi verificare la distribuzione pubblica. Gli HTML di anteprima in `sito/` sono output ignorato da Git, rigenerabile dai dati e dai moduli registrati nel commit locale. Il rapporto non attesta una pubblicazione avvenuta.
