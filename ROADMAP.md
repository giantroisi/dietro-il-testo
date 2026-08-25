# Dietro il testo — Roadmap di prodotto e patto editoriale

Documento guida del progetto. Aggiornato il 25 agosto 2026 dopo la verifica del selettore chiaro/scuro nella testata.

Questo documento stabilisce **la direzione**, **l'ordine del lavoro** e soprattutto i principi che non possono essere sacrificati per aggiungere più contenuti o pubblicare più rapidamente.

## Stato del progetto

Questa sezione viene aggiornata a ogni intervento. Gli stati ammessi sono: `da fare`, `in corso`, `da verificare`, `completato`, `bloccato`.

| Intervento | Stato | Ultimo aggiornamento | Verifica / nota |
|---|---|---|---|
| F1 — Contrasto chiaro/scuro | completato | 21 agosto 2026 | 157 schede controllate automaticamente; zero valori sotto 4,5:1 |
| F2 — Generi e provenienza normalizzati | completato | 21 agosto 2026 | 157 schede allineate; conteggi e casi critici verificati automaticamente, desktop e mobile |
| F3 — Card, link e semantica corretti | completato | 21 agosto 2026 | 157 card convertite: titolo e artista sono azioni separate; zero controlli interattivi annidati |
| F4 — URL, cronologia e ritorno contestuale | in corso | 21 agosto 2026 | Prossimo intervento: rendere stato e posizione ripristinabili |
| F5 — Report di completezza editoriale | da fare | 21 agosto 2026 | Standard Everlong applicato come controllo a tutte le schede |
| F6 — Separazione dei dati dal documento HTML | completato | 23 agosto 2026 | 157 canzoni e 104 artisti estratti in `dati/*.json`; generatore in `scripts/genera-sito.mjs`, zero dipendenze |
| F7 — Pagine canzone e artista autonome | completato | 23 agosto 2026 | 157 pagine canzone + 104 pagine artista generate, URL propri, dati strutturati, verificate su desktop e mobile, chiaro e scuro |
| F8 — Pagine album e registro immagini | completato | 23 agosto 2026 | 389 pagine album; spiegazione copertina solo se documentata, altrimenti dichiarazione esplicita di assenza; nessuna immagine di terzi, riquadro identitario originale al suo posto |
| F9 — Homepage orientata a ricerca e scoperta | completato | 23 agosto 2026 | Ricerca come elemento dominante, pillola del giorno deterministica, tre artisti e ultime aggiunte; niente griglia integrale in home |
| F10 — Uniformazione del catalogo | completato | 24 agosto 2026 | Nuova architettura pubblicata sul dominio Vercel esistente; stato editoriale calcolato per ogni scheda; restano i ganci editoriali scritti a mano e i player Spotify mancanti sulle schede meno recenti (vedi registro) |
| F11 — Nuova architettura e pubblicazione su Sites | superato | 24 agosto 2026 | Il prototipo su Sites è restato un riferimento visivo esterno; la struttura approvata è stata ricostruita e pubblicata direttamente in questo repository (F6–F10) |
| F12 — Ricerca per intenzione e risultati prioritari | completato | 22 agosto 2026 | Sinonimi per canzone, artista e album; massimo sei risultati; contenuti con copertina documentata prioritari |
| F13 — Homepage orientata alla scoperta | completato | 22 agosto 2026 | I tre artisti vengono prima dell’esempio editoriale; ricerca e percorsi sono il primo contenuto operativo |
| F14 — Risposta prima della grafica su mobile | completato | 22 agosto 2026 | Grafica decorativa rimossa dalle pagine interne sotto 760 px; “In breve” interamente visibile a 390×844 |
| F15 — Pagine album complete e non ripetitive | in corso | 22 agosto 2026 | Formato compatto applicato; otto album hanno una copertina documentata con fonte specifica; estensione prudenziale ancora in corso |
| F16 — Pillole-curiosità autonome | da fare | 22 agosto 2026 | Copertine, frasi iconiche, premi, formazione e retroscena con URL condivisibile |
| F17 — Fonti collegate alle singole affermazioni | da fare | 22 agosto 2026 | Eliminare certificazioni generiche di interi blocchi e uniformare le date di verifica |
| F18 — Identità visiva autorizzata per artista | da fare | 22 agosto 2026 | Asset soltanto con licenza o autorizzazione registrata; alternativa grafica originale specifica |
| F19 — Selettore chiaro/scuro manuale | completato | 25 agosto 2026 | Preferenza del dispositivo rispettata, scelta persistente, stato e nome accessibile aggiornati senza ricaricare |
| F20 — Link al testo corretti e con fonte nominata | completato | 24 agosto 2026 | `scripts/check-testi.mjs`: 157/157 OK, 0 discordanti, 0 irraggiungibili. Campo `testoFonte` su tutte le schede; pulsante dice "Leggi il testo su [nome]" |
| F21 — Controlli di coerenza sui dati | completato | 25 agosto 2026 | `scripts/check-coerenza.mjs`: 0 problemi su 157 canzoni e 104 artisti. Aggiunti i due album mancanti (fonti verificate) e corretto l'anno di 4 canzoni al formato "singolo / album" |
| F22 — Etichetta "da integrare" fuori dalle pagine pubbliche | completato | 25 agosto 2026 | Strategia B: bollo pubblico rimosso, sostituito da dichiarazioni specifiche dove manca un dato. Report interno `scripts/check-completezza.mjs`: 73/157 complete, 84 da integrare (invariato, solo non più esposto) |
| F23 — Pillole condivisibili | completato | 25 agosto 2026 | Pulsante "Condividi" (`navigator.share` con ricaduta su copia link) su ogni canzone; `og:image` generata per tutte le 157 schede con `scripts/genera-og.py`, verificata 1200×630 |
| F24 — Identità visiva riconoscibile | da fare | 24 agosto 2026 | Il logo non è valorizzato; da costruire su apertura, tipografia e immagine condivisibile — non ingrandendolo |
| F25 — Selettore del tema a sinistra | completato | 25 agosto 2026 | Primo elemento della testata su tutte le 655 pagine; nessuna sovrapposizione su desktop e mobile |
| F26 — Costituzione separata dalla roadmap | in corso | 24 agosto 2026 | `COSTITUZIONE.md` estratto; resta da rimuovere le sezioni duplicate qui |

### Registro degli interventi

- **21 agosto 2026 — Audit iniziale:** analizzata la versione pubblicata su desktop e mobile; rilevati problemi di architettura, navigazione, semantica, accessibilità, SEO e uniformità editoriale.
- **21 agosto 2026 — F1 completato:** corretti i contrasti dei titoli e dei pulsanti primari nei due temi; aggiunto controllo automatico WCAG su tutte le 157 schede; modifica pubblicata e verificata online.
- **21 agosto 2026 — Roadmap creata:** definiti missione, principi non negoziabili, standard editoriale, gerarchia delle fonti, fasi di lavoro e policy prudenziale per immagini e copertine.
- **21 agosto 2026 — F2 completato:** assegnati generi normalizzati e provenienza esplicita a tutte le 157 card e schede; sostituito il filtro testuale con confronti esatti; “Artisti italiani” separato dai generi; ricerca limitata a titolo, artista, album, genere e momento iconico; aggiunti stato accessibile dei pulsanti e annuncio dei risultati. Verificati 74 rock, 52 metal, 58 pop, 17 punk, 4 rap/hip-hop, 9 elettroniche e 33 di artisti italiani. Nessun errore in console e nessuna fuoriuscita orizzontale su mobile.
- **21 agosto 2026 — F3 avviato:** iniziata la correzione della struttura delle card e dei collegamenti artista/canzone.
- **21 agosto 2026 — F3 completato:** convertite tutte le 157 card da collegamenti contenitori a elementi semantici; il titolo è ora il collegamento alla canzone e il nome dell'artista è un'azione indipendente. Eliminati tutti gli elementi interattivi annidati, aggiunti focus visibile e destinazioni distinguibili. Verificati click separati, filtro artista, apertura canzone e assenza di errori.
- **21 agosto 2026 — F4 avviato:** iniziato il lavoro su URL, cronologia e ripristino della posizione.
- **21 agosto 2026 — Ricerca artista unificata:** eliminato il menu separato “Artista”. La barra principale cerca già titolo, artista, album, genere e momento iconico; quando il nome digitato corrisponde esattamente a un artista, mostra anche storia e discografia disponibili. Il click sul nome di una band compila la stessa barra e filtra i suoi brani. Verificati ricerca diretta, ricerca parziale, click artista, chiusura della biografia, desktop e mobile. F4 resta in corso per URL e cronologia.
- **21 agosto 2026 — Nuova struttura approvata:** confermata la trasformazione da archivio in pagina unica a enciclopedia musicale tascabile, con homepage di ricerca/scoperta e pagine autonome per canzoni, artisti e album.
- **21 agosto 2026 — Prototipo Sites avviato:** creato un progetto parallelo per validare la nuova struttura senza interrompere il sito Vercel. Su indicazione dell'autore, il primo campione è dedicato ai Bring Me the Horizon: homepage, ricerca, Can You Feel My Heart, pagina artista, Sempiternal e Drown come seconda canzone di controllo.
- **21 agosto 2026 — Architettura del prototipo completata:** realizzate homepage editoriale, ricerca unica per tipologia, pagina artista con storia e discografia completa, pagina album con spiegazione della copertina, due pagine canzone allo standard Everlong e pagina del metodo. Navigazione e contenuti sono collegati tramite URL autonomi.
- **21 agosto 2026 — Immagini del prototipo conformi:** nessuna copertina o fotografia esterna è stata scaricata o ri-ospitata. Il logo è un file fornito dal titolare del progetto; le illustrazioni sono originali in CSS; la copertina di Sempiternal compare soltanto nel player ufficiale Spotify.
- **21 agosto 2026 — Prima validazione tecnica:** build di produzione superata per tutte le cinque tipologie di pagina; corretta la resa del logo nel tema scuro durante il controllo visivo. Restano controllo finale dei collegamenti, prova su versione pubblicata e valutazione del prototipo da parte dell'autore.
- **21 agosto 2026 — Prototipo pubblicato privatamente su Sites:** la prima versione è disponibile all'indirizzo `https://dietro-il-testo.g-prizio.chatgpt.site`. L'accesso richiede l'autenticazione ChatGPT del titolare. La versione Vercel resta invariata e online; nessuna migrazione del dominio è stata eseguita.
- **21 agosto 2026 — Prima revisione visuale dell'autore:** aumentata la presenza del logo e ridotta la scala della promessa “Capire una canzone”, ora disposta in una composizione più compatta che porta prima alla ricerca.
- **21 agosto 2026 — Revisione UX dopo prova reale:** il prototipo risultava ancora dispersivo e meccanico nell'accesso ai contenuti. La homepage è stata ricostruita attorno al tempo necessario per arrivare alla risposta: ricerca immediata con sintesi nei risultati, una spiegazione già leggibile senza click e tre soli accessi diretti. La ricerca è ora disponibile anche nell'intestazione di artista, album e canzone; le introduzioni delle pagine sono state compattate. La revisione è pubblicata come seconda versione privata su Sites.
- **21 agosto 2026 — Collegamenti del prototipo resi completi:** rimossi i segnaposto non navigabili dalla discografia Bring Me the Horizon. Tutti e sette gli album in studio aprono ora una pagina con contesto e rilevanza; la pagina artista collega cinque schede canzone complete: Can You Feel My Heart, Drown, Throne, MANTRA e Sleepwalking. La ricerca indicizza tutte queste destinazioni. Verificato nel browser il percorso artista → album e pagina interna → ricerca → canzone. Contestualmente il logo è stato aumentato a 340 px su desktop e 220 px su mobile.
- **21 agosto 2026 — Navigazione Sites resa nativa:** dopo la segnalazione che i click sulla versione pubblicata non producevano alcun cambio pagina, tutti i collegamenti interni del prototipo sono stati convertiti in normali collegamenti HTML con ricaricamento completo. Anche Invio nella ricerca usa una navigazione diretta. Eliminata così la dipendenza dal router client per i passaggi essenziali; build superata e quarta versione privata pubblicata.
- **21 agosto 2026 — Policy immagini rafforzata:** oltre a provenienza e verifica, ogni immagine deve avere un'autorizzazione, licenza o base d'uso documentata. Nel prototipo non verranno ospitate copertine o fotografie di terzi; si useranno grafica originale ed embed ufficiali.
- **21 agosto 2026 — Destinazione Sites approvata:** la nuova architettura verrà pubblicata su Sites; la versione Vercel non sarà rimossa finché contenuti, navigazione e indirizzi non saranno stati verificati.
- **22 agosto 2026 — Interfaccia resa più rapida:** aumentata ulteriormente la rilevanza del logo e ridotta la scala dei titoli in homepage, pagine canzone, artista, album e metodo. Accorciati spazi verticali, pannelli e blocchi editoriali per mostrare più informazioni nel primo colpo d'occhio, senza rimuovere contenuti o collegamenti. Principio adottato: la dimensione tipografica deve esprimere la gerarchia, non sostituire il contenuto né costringere l'utente a scorrere per comprenderla.
- **22 agosto 2026 — Pillole editoriali più compatte:** il logo è stato portato a una presenza dominante nell'intestazione; il blocco “Momento iconico” è stato trasformato da grande citazione a scheda orizzontale compatta, con etichetta, parafrasi e nota sul copyright leggibili insieme. Ridotti ancora spazi e dimensioni dei blocchi di approfondimento. Confermata la regola immagini: nessun file esterno entra nel sito senza autorizzazione o licenza registrata; gli embed ufficiali possono mostrare i materiali forniti direttamente dalla piattaforma.
- **22 agosto 2026 — Pagina artista orientata alla scansione:** aumentato ancora il logo e ricostruite evoluzione e discografia come sezioni dense a due colonne. Le tappe storiche mostrano anno, titolo e spiegazione su una sola riga editoriale; gli album occupano righe compatte con anno e accesso immediato. Ridotta anche l'altezza delle canzoni correlate. Principio UX aggiunto: una pagina di consultazione deve permettere di individuare l'informazione prima di invitare ad approfondirla.
- **22 agosto 2026 — Dall'articolo alla pillola:** ridotta l'apertura di tutte le pagine interne, ridimensionata la grafica decorativa e avvicinata la risposta iniziale al titolo. Approfondimento, momento iconico, ascolto, fonti e contenuti correlati usano ora moduli più bassi e testi più piccoli; timeline e discografia sono ulteriormente condensate. Il logo è stato aumentato e abbassato nell'intestazione. Principio UX aggiunto: una pillola non è un articolo rimpicciolito, ma un'unità autonoma che comunica un fatto verificato in pochi secondi e lascia l'approfondimento come scelta.
- **22 agosto 2026 — Pagina band a snodi:** sostituito il percorso lineare con una barra di accesso diretto a canzoni, album, storia e fonti, affiancata da quattro fatti essenziali immediatamente leggibili. Le canzoni vengono prima di discografia ed evoluzione; la storia è un approfondimento finale, non un passaggio obbligatorio. Il menu resta raggiungibile durante lo scorrimento e diventa orizzontale su mobile. Logo ulteriormente aumentato e abbassato. Principio UX aggiunto: chi cerca una band deve scegliere subito la propria domanda, senza attraversare informazioni corrette ma non ancora desiderate.
- **22 agosto 2026 — Album più facili da aprire:** nella discografia il titolo e la breve descrizione di ogni album formano ora un unico collegamento ampio, riconoscibile al passaggio e da tastiera. Il piccolo comando laterale resta un'indicazione visiva, evitando di confinare l'interazione in un bersaglio troppo ridotto.
- **22 agosto 2026 — Campione esteso a tre artisti:** aggiunte pagine complete per Linkin Park e Green Day con fatti essenziali, discografie in studio, sei tappe storiche, fonti e una canzone rappresentativa ciascuna (Numb e Basket Case). La homepage presenta ora tre accessi artista reali; ricerca e Invio privilegiano la pagina della band quando il nome digitato coincide esattamente. Aggiunte pagine interne per tutti gli album elencati, evitando collegamenti vuoti.
- **22 agosto 2026 — Audit UX critico sul campione a tre artisti:** verificati homepage, ricerca, pagina Linkin Park, Numb e Hybrid Theory su desktop e mobile. Confermati come problemi prioritari: ricerca troppo letterale e affollata, artisti sotto il contenuto editoriale in homepage, grafica decorativa prima della risposta su mobile, pagine album ripetitive e troppo superficiali, fonti non associate alle singole affermazioni e identità visiva troppo uniforme. Creati F12–F18; bloccata l'espansione massiva finché ricerca, homepage, mobile e album non superano la nuova verifica.
- **22 agosto 2026 — F12–F15, primo intervento verificato localmente:** la ricerca riconosce intenzioni come “copertina”, “significato”, “Grammy” e “formazione”, ordina prima le corrispondenze reali e limita l’elenco a sei risultati. La homepage porta subito ai tre artisti e sposta la pillola in evidenza dopo i percorsi. Su mobile la grafica originale non precede più la risposta: nella prova a 390×844 il blocco “In breve” è interamente visibile nel primo schermo. Le pagine album non ripetono più la stessa sintesi: mostrano artista, anno, posizione nella discografia, stato editoriale, contesto e brani raccontati. Hybrid Theory, Dookie e American Idiot includono una spiegazione documentata della copertina con collegamento diretto alla fonte; negli altri album l’assenza di una spiegazione non genera testo riempitivo. Build completata, collegamenti Dookie → Basket Case verificati, nessun errore in console e nessuna fuoriuscita orizzontale. Restano pubblicazione online, ampliamento delle copertine verificate, fonti associate alle singole affermazioni e pillole autonome.
- **22 agosto 2026 — Versione 12 pubblicata su Sites:** la stessa sorgente verificata è stata pubblicata privatamente su Sites con esito positivo. F12, F13 e F14 passano a completato. F15 resta in corso: il formato album è pronto e tre copertine sono documentate, ma ogni nuova spiegazione richiede una fonte specifica prima dell’estensione. Restano aperti F16 pillole autonome, F17 fonti vicine alle singole affermazioni e F18 identità visiva autorizzata per artista.
- **22 agosto 2026 — F15, secondo blocco avviato:** priorità agli album più rilevanti dei tre artisti campione. Per ciascuno vengono cercate fonti specifiche su copertina, produzione, titolo e riconoscimenti; entra nel sito soltanto ciò che può essere sostenuto direttamente. L’obiettivo non è riempire ogni pagina, ma distinguere album documentati da album per cui una spiegazione ufficiale non è disponibile.
- **22 agosto 2026 — F15, quattro nuove copertine verificate:** aggiunte spiegazioni documentate per That’s the Spirit, Meteora, Insomniac e 21st Century Breakdown, basate rispettivamente su dichiarazioni di Matt Kean, Mike Shinoda, Winston Smith e Sixten. Con Sempiternal, Hybrid Theory, Dookie e American Idiot, il campione comprende ora otto album con spiegazione e fonte specifica. Tutte le nuove pagine sono state controllate nel browser: collegamenti alle fonti presenti, nessuna fuoriuscita orizzontale e nessun errore in console. La ricerca “copertina” privilegia gli album realmente documentati. F15 resta in corso perché gli altri album verranno ampliati soltanto quando esiste una base verificabile adeguata.
- **22 agosto 2026 — Versione 13 pubblicata su Sites:** il secondo blocco F15 è online nella versione privata. Prossimo intervento previsto: continuare F15 sui soli album con documentazione adeguata; subito dopo avviare F16 trasformando copertine e altri retroscena verificati in pillole autonome e condivisibili.
- **22 agosto 2026 — F19 avviato:** su richiesta dell’autore viene aggiunto un selettore manuale chiaro/scuro in alto a sinistra. Deve rispettare inizialmente il tema del dispositivo, ricordare la scelta esplicita, aggiornare logo e colori senza ricaricare la pagina e restare accessibile da tastiera e tecnologie assistive.
- **23 agosto 2026 — Convergenza sul prototipo Sites, ricostruito in questo repository:** l’autore ha mostrato il prototipo pubblicato su Sites (tre artisti campione, autenticazione ChatGPT). Struttura approvata: ricerca come home page, pagina canzone con gancio e momento iconico in apertura, pagina artista a snodi, pagina album con copertina solo se documentata, riquadro identitario colorato al posto delle immagini non autorizzate. L’autore ha chiesto di realizzarla per l’intero catalogo in questo repository, mantenendo prioritari Costituzione e registro. Il prototipo Sites resta un riferimento visivo: non è raggiungibile da qui e non viene toccato.
- **23 agosto 2026 — F6 completato:** script `scripts/estrai-dati.mjs` estrae le 157 canzoni e le 104 biografie/discografie dall’`index.html` esistente in `dati/canzoni.json` e `dati/artisti.json`, senza perdite (verificato campo per campo). Nessun numero resterà più scritto a mano: il generatore li conta dai dati.
- **23 agosto 2026 — F7, F8, F9 completati insieme:** costruito `scripts/genera-sito.mjs` con moduli separati per stile, guscio di pagina, modelli e ricerca (`scripts/genera/`). Genera 653 pagine: home, archivio, metodo, 157 canzoni, 104 artisti, 389 album, più `sitemap.xml`, `robots.txt` e `ricerca.js` (indice client-side, senza rete). Ogni pagina canzone segue l’ordine approvato: metadati, titolo, sintesi, momento iconico, storia, ascolto, fonti, correlate. Ogni pagina album mostra la spiegazione della copertina solo se una fonte la documenta, altrimenti lo dichiara esplicitamente — verificato su Sempiternal (documentata) e Amo (non documentata). Il colore identitario per pagina è ricalcolato in chiaro e scuro con `color-mix` e verificato con un nuovo `scripts/check-contrasto-v2.mjs`: 261 colori su 157 canzoni + 104 artisti, zero sotto 4,5:1 dopo aver portato i mix rispettivamente a 70/30 (chiaro) e 56/44 (scuro). `scripts/check-link.mjs` conferma zero link interni rotti e zero URL esterni malformati su tutto il catalogo. Ricerca, filtri per genere/provenienza (stessi conteggi esatti verificati in F2: rap=4, elettronica=9, italiana=33), tema chiaro/scuro e “Sorprendimi” verificati nel browser, desktop e mobile (375px), nessun errore console.
- **23 agosto 2026 — Aperto, non ancora deciso:** chi scrive i 157 ganci editoriali (righe di richiamo sopra ogni scheda in home/archivio) e dove pubblicare questa versione durante la lavorazione (percorso separato sullo stesso dominio, sostituzione diretta, o solo locale finché non approvata). Finché il gancio manca, il generatore usa in automatico la prima frase verificata del corpo della scheda — mai testo inventato. Nessuna pubblicazione online è stata ancora fatta: il sito generato vive solo in locale, nella cartella `sito/` (non tracciata in git).
- **24 agosto 2026 — Decisioni prese dall'autore:** ganci editoriali ricavati automaticamente dalla prima frase verificata di ogni scheda (nessun testo nuovo inventato, correggibili in seguito con `dati/ganci.json`); pubblicazione diretta sul dominio Vercel esistente, come per ogni altra modifica del sito — nessun percorso separato. L'autore vuole poterla vedere lui stesso, non solo verificarla in locale.
- **24 agosto 2026 — Pubblicato sul dominio:** rigenerate le 653 pagine con `scripts/genera-sito.mjs`, verificate nel browser (home, canzone, artista, album, tema chiaro/scuro, mobile 375px, ricerca unificata, filtri archivio, "Sorprendimi", fallback su artisti/canzoni senza dati), copiate sulla radice del repository sostituendo il precedente `index.html` monolitico. `dati/canzoni.json` e `dati/artisti.json` restano l'unica fonte di verità; `sito/` è la cartella di build, non tracciata in git — si rigenera con `node scripts/genera-sito.mjs` e si ripubblica copiandone il contenuto sulla radice. F6–F10 passano a completato. Restano aperti: i 157 ganci scritti a mano (F16), fonti collegate alle singole affermazioni (F17), i player Spotify e i link ai testi mancanti sulle schede meno recenti (F5/F10), identità visiva autorizzata per artista (F18).
- **24 agosto 2026 — Prima prova dell'autore sulla nuova architettura, sette rilievi:** (1) i link "Leggi il testo" non portano al testo e non dicono dove portano; (2) la verifica dei dati non è abbastanza rigorosa — trovato a mano un album mancante; (3) l'etichetta "da integrare" non significa nulla per chi legge; (4) mancano del tutto la condivisione e le anteprime social, benché le pillole esistano per circolare; (5) il logo non è valorizzato e il sito non ha identità riconoscibile; (6) il selettore chiaro/scuro va spostato a sinistra; (7) servono Costituzione e roadmap come documenti distinti, in .md, aggiornati costantemente.
- **24 agosto 2026 — Rilievi verificati sui dati, non sulle impressioni:** i 53 link al testo sbagliati sono stati contati (45 puntano a en.wikipedia.org, 5 a it.wikipedia.org, 3 a pagine di commento); l'album mancante segnalato dall'autore è `POST HUMAN: Survival Horror` (2020) dei Bring Me the Horizon, dichiarato dalla scheda *Parasite Eve* ma assente dalla discografia, e un controllo automatico ne ha rivelato un secondo identico (`DallAmeriCaruso` di Lucio Dalla, dichiarato da *Caruso*); l'etichetta "da integrare" compare su 84 schede su 157; `og:image` non esiste in nessuna pagina, quindi ogni link condiviso produce un'anteprima spoglia.
- **24 agosto 2026 — `COSTITUZIONE.md` creato:** missione, principi P1–P9, diagnosi, architettura editoriale approvata, standard della scheda completa e gerarchia delle fonti sono stati estratti in un documento separato, che cambia solo per decisione esplicita dell'autore. `ROADMAP.md` resta il documento del lavoro corrente e si aggiorna a ogni intervento. Le sezioni duplicate qui verranno rimosse chiudendo F26.
- **24 agosto 2026 — `BRIEF-F20-F26.md` scritto:** ordine di lavoro dettagliato per i sette rilievi, con problema verificato, cosa fare e criterio di accettazione per ciascuno, più rituale di pubblicazione e lista di ciò che non va rotto. F24 (identità visiva) è indicata come direzione da proporre all'autore prima dell'esecuzione, non come specifica da eseguire di slancio.
- **24 agosto 2026 — F20 completato:** separati i campi `testoUrl` (solo siti di testi) e `testoFonte` (nome leggibile del sito). Verificate una per una le 53 schede il cui link puntava altrove (Wikipedia, Songfacts, blog di commento): per ognuna trovato e verificato un vero sito di testi, controllando che titolo e artista della pagina corrispondessero alla scheda prima di scrivere l'URL — nessun link costruito per analogia. Nessuna fonte persa: i vecchi URL erano già duplicati tra le `fonti`. Uniformati anche i due casi anomali segnalati dal brief (Raining Blood, Angel of Death di Slayer — letras.com non serve pagine per questo artista ai fetcher automatici, sostituiti con Dork, verificato). Scritto `scripts/check-testi.mjs`: scarica ogni pagina, confronta titolo/artista normalizzati con varianti legittime (The Eagles/Eagles, ecc.), distingue "discordante" da "irraggiungibile". Esito finale: **157/157 OK, 0 discordanti, 0 irraggiungibili**. Pulsante aggiornato in `scripts/genera/pagine.mjs`: "Leggi il testo su Letras/AngoloTesti/Dork/LyricsTranslate" invece di "(fonte esterna)". Verificato nel browser (Antivist → Letras, Cattiva → AngoloTesti), nessun errore console. `check-link.mjs` e `check-contrasto-v2.mjs` restano puliti. Pubblicato sul dominio, verificato che `/canzone/cattiva/` in produzione mostri "AngoloTesti" prima di dichiarare l'intervento chiuso.
- **25 agosto 2026 — F21 completato:** scritto `scripts/check-coerenza.mjs`, controllo locale (nessuna rete) che incrocia `canzoni.json` e `artisti.json`: campi strutturali mancanti, `artistaSlug` inesistenti, coerenza bidirezionale canzone↔artista, album citati da una canzone ma assenti dalla discografia (solo per artisti con discografia reale, non per i 72 artisti senza biografia — quello non è un errore), anno della canzone in conflitto con l'anno dell'album. Aggiunti i due album mancanti con fonti verificate: `POST HUMAN: Survival Horror` (Bring Me the Horizon, 30 ottobre 2020, EP/album dibattuto, oro UK e Polonia — [Wikipedia](https://en.wikipedia.org/wiki/Post_Human:_Survival_Horror)) e `DallAmeriCaruso` (Lucio Dalla, 10 ottobre 1986, album dal vivo con l'inedito in studio "Caruso" — [Wikipedia](https://it.wikipedia.org/wiki/DallAmeriCaruso)). Il primo run ha segnalato 12 falsi positivi su "anno incoerente": 8 usavano già il formato "singolo / album" e lo script confrontava l'intera stringa invece dei singoli anni; corretto lo script per confrontare ogni anno separatamente. I restanti 4 (`billie-jean`, `darkside`, `mantra`, `wonderful-life`) avevano davvero solo l'anno del singolo: verificata la data reale del singolo per ciascuno e portato il campo `anno` al formato "album / singolo" già in uso altrove. Provata la capacità di rilevamento rimuovendo temporaneamente `DallAmeriCaruso` dalla discografia: lo script lo ha segnalato correttamente come "album orfano"; dati ripristinati e verificati identici. Esito finale: **0 problemi su 157 canzoni e 104 artisti**. `check-link.mjs` e `check-contrasto-v2.mjs` restano puliti; `check-coerenza.mjs` aggiunto al rituale di pubblicazione. Rilievo aperto, non in scope: l'etichetta "Album in studio" in `scripts/genera/pagine.mjs` (righe 282 e 373) è testo fisso, quindi anche un album dal vivo come DallAmeriCaruso viene etichettato erroneamente — da correggere in un intervento dedicato, non qui.
- **25 agosto 2026 — F23 completato:** aggiunto un pulsante "Condividi" nella testata di ogni pagina canzone (vicino al momento iconico, sempre presente anche sulle 54 schede senza frase iconica): usa `navigator.share()` dove disponibile, con ricaduta su `navigator.clipboard.writeText()` e conferma visibile "Link copiato" quando l'API di condivisione nativa non c'è. Logica in `scripts/genera/ricerca.mjs`, attivata solo se il pulsante `[data-condividi]` esiste in pagina. Scritto `scripts/genera-og.py` (Python, usa Pillow e numpy già presenti sul sistema — nessuna dipendenza aggiunta al progetto Node, che resta a zero pacchetti): genera un'immagine 1200×630 per ogni canzone con titolo, artista, colore identitario (sfumatura diagonale tra `colore` e `colore2`), il logo del sito e il "momento iconico" — o, per le schede che ancora non ce l'hanno, un estratto della storia già scritta con parole nostre, mai il testo originale della canzone (P3). Le 157 immagini sono generate una volta e committate in `og/`, come `logo.png` e le favicon; `genera-sito.mjs` le copia in `sito/og/` insieme alle altre risorse statiche. Aggiunti a `scripts/genera/guscio.mjs`: `og:image`, `og:image:width/height`, `twitter:card` che passa da `summary` a `summary_large_image` quando l'immagine esiste. Verificato nel browser: meta tag corretti, immagine raggiungibile e 1200×630 reali, pulsante funzionante su desktop e mobile (375px), conferma di copia testata forzando un clipboard finto (l'ambiente di test nega il permesso reale, comportamento atteso fuori da un gesto utente in un browser vero). `check-link.mjs`, `check-coerenza.mjs` e `check-contrasto-v2.mjs` restano puliti.
- **25 agosto 2026 — F22 completato, strategia B:** il bollo pubblico "Scheda completa"/"Da integrare" (73/84 schede) è sparito da ogni pagina canzone — parlava del processo di redazione, non diceva a chi legge cosa manca davvero. Al suo posto, dichiarazioni specifiche esattamente dove manca un dato, nello stesso stile già usato per il player mancante: "Il momento iconico di questa canzone non è stato ancora individuato" quando manca `fraseIconica` (54 schede), "Il link a un testo verificato non è ancora stato collegato" per un eventuale `testoUrl` mancante (oggi 0, dopo F20). La sezione "momento iconico" ora è sempre presente strutturalmente, con la dichiarazione onesta al posto della frase quando non c'è, invece di sparire senza spiegazione — coerente con lo stile già usato per gli artisti senza biografia. Estratta la logica di completezza in `dettagliCompletezza()` (`scripts/genera/pagine.mjs`) e scritto `scripts/check-completezza.mjs`, report interno non collegato al sito pubblico: **73/157 complete, 84 da integrare** (stesso numero di prima, cambia solo che non è più esposto a chi legge; il campo che manca più spesso è `spotifyId`, su 82 schede). Verificato nel browser che la stringa "da integrare" non compaia più in nessuna delle 655 pagine generate, nessun errore console. `check-link.mjs`, `check-coerenza.mjs`, `check-contrasto-v2.mjs` e `check-testi.mjs` restano puliti. Prossimo: F25 (pulsante tema a sinistra).
- **25 agosto 2026 — F19 e F25 completati:** il selettore chiaro/scuro è ora il primo elemento della testata, in alto a sinistra, su tutte le 655 pagine generate. Conserva la preferenza esplicita dell’utente, al primo accesso rispetta il tema del dispositivo e aggiorna `aria-label` e `aria-pressed`. Verificati cambio immediato, persistenza dopo il ricaricamento, ordine pulsante → logo, desktop e mobile a 375 px, assenza di sovrapposizioni, overflow e errori console. Rigenerazione completa e controlli superati: 0 link rotti, 0 incoerenze su 157 canzoni e 104 artisti, 0 contrasti sotto 4,5:1.

### Regola di aggiornamento

Per ogni intervento eseguito devono essere registrati:

1. cosa è stato modificato;
2. perché è stato modificato;
3. quali verifiche sono state superate;
4. se la modifica è già online;
5. eventuali problemi rimasti aperti;
6. il prossimo intervento previsto.

Nessun punto passa a `completato` prima della verifica locale, mobile, accessibile e online prevista dalla sua definizione di fatto.

## 1. Missione

Dietro il testo deve diventare il luogo italiano più semplice e affidabile per capire cosa c'è dietro una canzone, un album e un artista.

Il sito non è un archivio di testi e non è un'enciclopedia generalista. Il suo valore è raccogliere in un solo posto pillole verificabili che normalmente sono disperse tra interviste, archivi, testate musicali e fonti ufficiali.

La promessa all'utente è:

> Trovi rapidamente una risposta interessante, capisci da dove arriva e puoi verificarla.

## 2. Principi non negoziabili

### P1 — La verità viene prima della quantità

- Nessuna informazione viene pubblicata perché “probabile”, ripetuta da molti siti o coerente con un'interpretazione diffusa.
- Se una tesi non è verificabile, viene presentata esplicitamente come interpretazione, ipotesi o racconto non confermato.
- È preferibile una scheda più corta a una scheda riempita con dettagli fragili.
- Una data, certificazione, citazione indiretta, attribuzione o spiegazione della copertina senza fonte affidabile non entra nel sito.
- Una nuova canzone non giustifica mai l'abbassamento dello standard delle schede già pubblicate.

### P2 — Le fonti devono essere visibili e pertinenti

- Ogni affermazione sostanziale deve essere riconducibile a una fonte che la supporti davvero.
- Una fonte generica sull'artista non prova automaticamente una tesi sulla singola canzone.
- Le fonti primarie hanno priorità: interviste dirette, siti ufficiali, crediti dell'album, enti di certificazione, archivi e premi ufficiali.
- Le fonti secondarie devono essere testate musicali riconoscibili o pubblicazioni con responsabilità editoriale.
- Wikipedia e Songfacts possono orientare la ricerca, ma le affermazioni delicate vanno incrociate.
- Le fonti devono essere chiamate per nome; non basta una lista anonima di URL.
- Ogni scheda mostra la data dell'ultima verifica e offre un modo semplice per segnalare un errore.

### P3 — Mai testi o traduzioni delle canzoni

- Non si riproducono versi, ritornelli o traduzioni, neppure parziali.
- La “frase iconica” viene descritta o parafrasata con parole originali.
- Se il valore del passaggio dipende dalla formulazione letterale, si rimanda a una fonte autorizzata senza copiarla.
- Il pulsante verso il testo integrale resta esterno e deve portare alla canzone corretta.

### P4 — Il premio arriva prima del contesto

Ogni pagina canzone deve rispondere entro pochi secondi a tre domande:

1. Perché questa canzone è interessante?
2. Qual è il suo momento o concetto iconico?
3. Come sappiamo che questa spiegazione è attendibile?

La struttura ideale è: **gancio → momento iconico → spiegazione → storia completa → ascolto → fonti**.

### P5 — Ogni click deve essere prevedibile e reversibile

- Titolo della canzone, artista, album e fonte sono destinazioni diverse e riconoscibili.
- Il tasto Indietro deve riportare al punto precedente, con ricerca e filtri intatti.
- Ricerca, artista, genere, ordinamento e pagina aperta devono avere uno stato condivisibile nell'URL.
- Un click sbagliato non deve costringere l'utente a ricominciare dall'alto.
- Nessun controllo interattivo può essere annidato dentro un altro controllo interattivo.

### P6 — La canzone è l'unità fondamentale

- Ogni canzone deve avere un proprio indirizzo, titolo pagina, descrizione e dati strutturati.
- Ogni artista deve avere una propria pagina generata anche quando non possiede ancora una biografia editoriale completa.
- Ogni album citato deve diventare una destinazione autonoma quando dispone di abbastanza dati verificati.
- La homepage serve a cercare e scoprire; non deve contenere integralmente tutte le pagine del sito.

### P7 — L'accessibilità è parte della qualità editoriale

- Contrasto minimo WCAG AA, navigazione completa da tastiera, focus visibile e struttura dei titoli corretta.
- Stato dei filtri e numero dei risultati vengono annunciati alle tecnologie assistive.
- L'interfaccia non dipende soltanto dal colore.
- Animazioni e caricamenti rispettano le preferenze dell'utente.

### P8 — Le immagini non sono decorazione gratuita

- Un'immagine viene usata solo se aggiunge informazione, riconoscibilità o contesto.
- Ogni immagine deve avere provenienza, titolare/licenza quando nota, attribuzione richiesta e testo alternativo.
- Se i diritti non sono chiari, l'immagine non viene ospitata dal sito.
- La disponibilità su Google, Wikipedia, social network o sito di una band non equivale a una licenza di riuso.

### P9 — La crescita deve essere sostenibile

- I dati editoriali devono essere separati dalla presentazione.
- Ogni nuova scheda deve essere validata automaticamente prima della pubblicazione.
- Gli automatismi possono proporre e preparare contenuti, ma non devono inventare né trasformare una fonte debole in certezza.
- Il numero totale delle schede deve essere generato dai dati, mai scritto manualmente in più punti.

## 3. Diagnosi della versione attuale

### Punti di forza da preservare

- Identità visiva riconoscibile e coerente con il pubblico rock/metal.
- Modalità chiara e scura ben impostate.
- Ricerca semplice da comprendere.
- Catalogo già significativo: 157 canzoni e oltre cento artisti.
- Schede migliori, come Everlong, con un buon livello di approfondimento.
- Collegamenti esterni aperti in sicurezza e player Spotify ufficiali.
- Colore specifico per artista/album: ottimo elemento identitario sulle pagine individuali.

### Problemi strutturali osservati

- Homepage e 157 schede complete convivono nello stesso documento: circa 149.000 pixel di altezza nella prova desktop.
- La pagina contiene oltre 1.400 link e 157 coppie di elementi interattivi annidati in modo non valido.
- Il click sull'artista mostra un filtro arricchito, non una vera pagina artista condivisibile.
- La biografia e la discografia occupano molto spazio senza indice interno o sezioni richiudibili.
- Ricerca, filtri e artista non sono ancora uno stato affidabile della cronologia e dell'URL.
- Le informazioni più gratificanti arrivano spesso dopo il player e dopo lunghi paragrafi.
- La descrizione per i motori di ricerca dichiara ancora 138 schede invece di 157.
- Mancano URL canonici e pagine indicizzabili per canzoni, artisti e album.
- Sono presenti 39 player Spotify: il caricamento può essere ulteriormente rimandato fino alla reale necessità.
- Il conteggio dei risultati non è ancora annunciato tramite `aria-live`.
- Qualità e completezza non sono uniformi: non tutte le schede raggiungono lo standard di Everlong.

## 4. Architettura editoriale approvata

La nuova versione non riproduce la struttura dell'archivio attuale. È organizzata intorno a tre entità collegate: **canzone**, **artista**, **album**.

### Homepage

- Logo riconoscibile, promessa breve e ricerca nella prima schermata.
- Il primo contenuto utile è già leggibile senza aprire una nuova pagina.
- La ricerca mostra titolo, tipo e una sintesi del contenuto prima del click; Invio apre il primo risultato pertinente.
- Non mostra l'intero catalogo e non moltiplica le categorie: propone una risposta in evidenza e tre accessi diretti ad artista, album e canzone.
- La stessa ricerca resta disponibile nelle pagine interne, evitando il ritorno obbligato alla homepage.
- Obiettivo misurabile: una risposta pertinente deve essere raggiungibile con una ricerca e un solo click, o con ricerca più Invio.

### Pagina canzone

Ordine approvato:

1. artista, anno, album e genere;
2. titolo e sintesi di 2–3 frasi;
3. blocco “In breve”;
4. momento iconico parafrasato;
5. nascita, significato, registrazione, curiosità e impatto;
6. Spotify e collegamento esterno autorizzato al testo;
7. fonti vicine alle affermazioni;
8. ultima verifica, stato editoriale e segnalazione errori;
9. canzoni, artista e album correlati.

### Pagina artista

- Presentazione sintetica.
- Cronologia visiva dell'evoluzione artistica.
- Storia completa, quando verificata.
- Discografia in studio organizzata per album.
- Canzoni raccontate sul sito.
- Momenti fondamentali, premi e riconoscimenti.
- Fonti e data di verifica.

La pagina viene generata per ogni artista anche quando la biografia estesa non è ancora pronta; in quel caso mostra dati verificati, cronologia e brani disponibili senza inventare contenuti mancanti.

### Pagina album

- Perché l'album è importante.
- Contesto nella carriera dell'artista.
- Registrazione e produzione.
- Significato del titolo.
- Spiegazione della copertina soltanto quando documentata.
- Premi, certificazioni e rilevanza.
- Tracce presenti nel sito e collegamenti correlati.
- Formula esplicita “Non risulta disponibile una spiegazione ufficiale verificabile” quando il significato della copertina non è documentato.

### Linguaggio visivo

- Impostazione da rivista musicale contemporanea, non da database tecnico.
- Cornice neutra e un solo colore identitario per pagina.
- Titoli serif espressivi, testo molto leggibile, metadati monospaziati.
- Meno riquadri e bordi, più spazio tra concetti.
- Card sintetiche; il colore completo dell'album vive sulla pagina individuale.
- Nessuna immagine decorativa senza autorizzazione.

### Segnali di attendibilità

Le informazioni possono essere accompagnate da una delle seguenti etichette:

- `Dichiarato dall'artista`;
- `Fatto documentato`;
- `Interpretazione accreditata`.

Queste etichette non sostituiscono le fonti: rendono immediatamente comprensibile la natura dell'affermazione.

### Prototipo di riferimento

Prima dell'importazione dell'intero catalogo devono essere approvati:

- nuova homepage;
- ricerca raggruppata;
- pagina Can You Feel My Heart;
- pagina Bring Me the Horizon;
- pagina Sempiternal;
- pagina Drown, come seconda canzone che dimostri la riutilizzabilità del modello.

Il prototipo diventa modello definitivo soltanto dopo verifica editoriale, visuale, mobile, accessibile e legale.

## 4A. Standard editoriale di una scheda completa

Una canzone è pubblicabile solo quando possiede:

1. Titolo, artista, anno, album e generi normalizzati.
2. Una sintesi iniziale originale di massimo 2–3 frasi.
3. Storia della composizione o della pubblicazione, se verificabile.
4. Spiegazione del significato, distinguendo fatti, dichiarazioni dell'artista e interpretazioni.
5. Momento o frase iconica descritta senza riprodurre il testo.
6. Almeno una curiosità concreta, se esiste e se è verificata.
7. Crediti essenziali: autori e produttore, quando reperibili.
8. Collegamento Spotify corretto e verificato.
9. Collegamento esterno al testo corretto e verificato.
10. Fonti pertinenti, nominate e associate alle affermazioni.
11. Data di ultima verifica.
12. Collegamento all'artista, all'album e alle canzoni correlate.
13. Stato editoriale: `completa`, `da integrare` o `da riverificare`.

Non si pubblica una scheda “completa” se manca la storia dell'artista richiesta dal formato, se il player riguarda una versione diversa non dichiarata o se una fonte non porta all'informazione citata.

## 5. Gerarchia delle fonti

### Livello A — Preferite

- Sito e canali ufficiali dell'artista o dell'etichetta.
- Interviste audio/video o testuali dirette.
- Libretti, crediti e comunicati ufficiali.
- Grammy, BRIT Awards, FIMI, RIAA, BPI e altri enti ufficiali.
- Archivi pubblici, biblioteche, musei e istituzioni.

### Livello B — Affidabili con attribuzione

- Testate musicali riconoscibili con firma e data.
- Quotidiani e periodici con controllo editoriale.
- Libri e documentari identificabili.

### Livello C — Solo come pista di ricerca

- Wikipedia, Songfacts e database collaborativi.
- Blog specialistici e siti di interpretazione.

Le fonti di livello C non bastano da sole per fatti controversi, intenzioni attribuite all'autore, spiegazioni di copertine, numeri di vendita o accuse personali.

### Fonti da non usare come prova

- Post social non verificati, forum, commenti, video senza provenienza, testi generati automaticamente, pagine che si copiano a vicenda e siti privi di autore/data.

## 6. Roadmap operativa

### Fase 0 — Protezione della qualità

Obiettivo: impedire nuovi errori mentre il sito viene ristrutturato.

- Congelare temporaneamente le aggiunte massive non revisionate.
- Correggere il conteggio 138/157 e generarlo automaticamente.
- Aggiungere a ogni scheda `ultimaVerifica`, stato editoriale e fonti strutturate.
- Creare un report automatico delle schede incomplete rispetto allo standard.
- Definire un registro delle correzioni editoriali.

**Completata quando:** una verifica automatica elenca con precisione ciò che manca a ciascuna delle 157 schede.

### Fase 1 — Riparare la navigazione attuale

Obiettivo: rendere l'esplorazione affidabile senza cambiare ancora architettura.

- Completare la normalizzazione dei generi con campi espliciti; separare “italiana” dalla categoria musicale.
- Correggere le card: titolo come link e artista come link separato, senza elementi annidati.
- Conservare ricerca, filtri, ordinamento, artista e posizione nell'URL e nella cronologia.
- Rendere il ritorno alla lista preciso e contestuale.
- Mostrare un vero stato attivo e un comando “Azzera tutto”.
- Aggiungere `aria-live`, debounce, focus visibile e verifica completa da tastiera.
- Rendere coerenti le etichette dei link esterni.
- Caricare Spotify soltanto quando serve.
- Aggiungere `content-visibility` alle aree ancora presenti nel documento unico.

**Completata quando:** da telefono e tastiera si può cercare, filtrare, aprire, tornare indietro e condividere lo stato senza perdere il contesto.

### Fase 2 — Separare dati e interfaccia

Obiettivo: smettere di mantenere manualmente un unico file di oltre mezzo megabyte.

- Estrarre canzoni, artisti, album e fonti in dati strutturati.
- Definire identificatori stabili e relazioni tra le entità.
- Generare automaticamente conteggi, menu, card e collegamenti.
- Separare CSS e JavaScript dal contenuto.
- Introdurre controlli per campi obbligatori, URL duplicati e incoerenze.
- Conservare tutti gli indirizzi esistenti con reindirizzamenti o compatibilità.

**Completata quando:** una nuova canzone si aggiunge modificando un solo record di dati e superando i controlli, senza duplicare HTML.

### Fase 3 — Pagine autonome

Obiettivo: trasformare l'archivio in un sito navigabile e indicizzabile.

- Pagina canzone con URL proprio, contenuto riordinato e fonti vicine alle affermazioni.
- Pagina artista per tutti gli artisti: storia opzionale, cronologia, discografia, brani presenti e fonti.
- Pagina album: copertina solo se utilizzabile, storia, contesto, riconoscimenti, spiegazione grafica verificata e brani collegati.
- Breadcrumb, contenuti correlati e ritorno contestuale.
- Titolo, descrizione, URL canonico, Open Graph e dati strutturati per ogni pagina.
- Sitemap e gestione delle pagine non ancora complete.

**Completata quando:** ogni canzone e artista si può aprire, condividere e trovare dai motori di ricerca senza attraversare l'intero archivio.

### Fase 4 — Homepage orientata ai due bisogni reali

Obiettivo: servire ricerca mirata e scoperta casuale.

- Ridurre l'introduzione a una promessa chiara e un link “Come lavoriamo”.
- Rendere la ricerca il primo elemento operativo.
- Aggiungere percorsi editoriali: “Storia sorprendente”, “Album iconico”, “Da dove nasce quella frase?”, “Metal essenziale”, “Appena verificato”.
- Mostrare una selezione limitata di card, non tutte le 157 insieme.
- Creare uno stato vuoto utile con suggerimenti alternativi.

**Completata quando:** un nuovo visitatore raggiunge un contenuto interessante entro due azioni e un visitatore mirato trova la canzone entro dieci secondi.

### Fase 5 — Uniformare il catalogo allo standard Everlong

Obiettivo: eliminare la differenza fra schede eccellenti e schede minime.

- Audit dei campi mancanti per tutte le canzoni.
- Completamento progressivo per artista, non casuale, così ogni nuova ricerca lascia una pagina artista coerente.
- Priorità ai brani più visitati e agli artisti con più schede.
- Revisione delle “frasi iconiche” affinché siano parafrasi, pertinenti e fontate.
- Controllo di player, versioni, date, album e link al testo.

**Completata quando:** il validatore editoriale non segnala schede incomplete e un controllo umano a campione conferma lo standard.

### Fase 6 — Fiducia visibile e manutenzione

Obiettivo: far percepire l'affidabilità senza chiedere all'utente di crederci sulla parola.

- Badge “Verificato il …” con spiegazione accessibile.
- Fonti visualizzate accanto ai singoli blocchi o tramite note numerate.
- Pagina “Metodo editoriale e correzioni”.
- Modulo o indirizzo dedicato per segnalazioni, con riferimento alla scheda.
- Revisione programmata dei dati mutevoli: ascolti, certificazioni, formazione e discografie.
- Cronologia delle modifiche sostanziali.

**Completata quando:** l'utente può capire chi sostiene una tesi, quando è stata controllata e come contestarla.

### Fase 7 — Migrazione controllata su Sites

Obiettivo: pubblicare la nuova architettura su Sites senza perdere contenuti, affidabilità o disponibilità del sito attuale.

- Preparare il progetto Sites soltanto dopo la separazione dei dati, così canzoni, artisti e album diventano vere pagine.
- Importare tutti i contenuti strutturati e preservare l'identità visiva, il tema chiaro/scuro e il logo.
- Verificare ricerca, filtri, URL, cronologia, accessibilità, metadati e resa mobile.
- Mantenere Vercel online durante tutta la costruzione e la verifica.
- Pubblicare inizialmente Sites come versione parallela e confrontare un campione rappresentativo di pagine.
- Spostare il dominio definitivo solo dopo controllo completo e piano di reindirizzamento degli URL esistenti.

**Completata quando:** la versione Sites contiene tutte le schede valide, supera i controlli editoriali e tecnici, preserva gli indirizzi o li reindirizza correttamente ed è stata approvata sul sito pubblicato.

## 7. Policy per copertine, fotografie e loghi

Questa policy è prudenziale e non sostituisce un parere legale professionale.

### Risposta breve

**Sì, copertine e fotografie sono normalmente protette dal diritto d'autore.** La fotografia è protetta come opera del fotografo; la copertina può incorporare fotografia, illustrazione, grafica e tipografia protette. Il fatto che rappresentino un album o una band non le rende libere. I loghi possono inoltre essere protetti come marchi e, se creativi, anche dal diritto d'autore.

### Usi consentiti dal progetto

Un'immagine può essere inserita solo se ricade in almeno una di queste condizioni documentate:

1. **Licenza o autorizzazione esplicita** del titolare, dell'etichetta, dell'artista, del fotografo o dell'agenzia.
2. **Licenza aperta compatibile** con il sito, per esempio Creative Commons, rispettando attribuzione, eventuale divieto di modifica e limiti commerciali.
3. **Pubblico dominio**, verificando l'opera specifica e non soltanto l'età del soggetto rappresentato.
4. **Embed ufficiale** offerto da Spotify, YouTube o altro servizio, rispettandone condizioni e modalità tecniche. Non si scarica e non si ri-ospita l'immagine estratta dall'embed.
5. **Press kit ufficiale**, ma solo quando le condizioni dichiarano chiaramente che l'immagine è riutilizzabile per attività editoriali come la nostra.
6. **Uso strettamente funzionale a critica o recensione della copertina**, valutato caso per caso: l'immagine deve essere già stata pubblicata lecitamente, direttamente necessaria al commento, attribuita e usata nella misura giustificata. Non è un permesso generale per riempire griglie o decorare pagine.

### Usi vietati senza ulteriore autorizzazione

- Scaricare copertine da Google Immagini, Wikipedia, Discogs, Amazon, social o siti delle band e ospitarle localmente senza verificare la licenza.
- Usare una fotografia promozionale soltanto perché definita “press photo” se mancano condizioni di riuso.
- Copiare automaticamente immagini dall'Open Graph di siti terzi.
- Usare la stessa immagine in homepage, card e pagine correlate oltre quanto necessario per un eventuale commento critico.
- Rimuovere watermark, firme o metadati.
- Presentare loghi o immagini in modo da suggerire affiliazione ufficiale.

### Scelta consigliata per Dietro il testo

- **Card e homepage:** niente copertine ospitate senza licenza. Usare colore, tipografia, simboli originali e miniature prodotte dal nostro sistema grafico.
- **Pagina canzone:** copertina tramite embed ufficiale Spotify; eventuale immagine separata soltanto con licenza registrata.
- **Pagina album con analisi della copertina:** valutare una miniatura proporzionata e attribuita solo quando l'analisi riguarda realmente quell'immagine e la base giuridica è stata registrata. Se il diritto non è chiaro, mostrare l'embed o un link alla fonte ufficiale.
- **Pagina artista:** fotografie solo da press kit con termini compatibili, archivi con licenza aperta o autorizzazione diretta. In alternativa, identità tipografica originale.

### Registro obbligatorio delle immagini

Per ogni immagine non originale conservare:

- URL della fonte lecita;
- autore/fotografo/designer;
- titolare dei diritti, se noto;
- tipo di licenza o base d'uso;
- testo esatto dell'attribuzione;
- data della verifica;
- pagine in cui viene usata;
- eventuali limiti di formato, territorio, durata o modifica.

Se uno di questi campi essenziali manca, l'immagine resta fuori dal sito.

## 8. Controlli automatici obbligatori

Prima di ogni pubblicazione devono passare:

- integrità dei dati e campi obbligatori;
- contrasto WCAG in entrambi i temi;
- validità HTML e assenza di elementi interattivi annidati;
- unicità di ID, URL e slug;
- corrispondenza fra card e pagina canzone;
- verifica dei collegamenti Spotify e al testo;
- verifica delle fonti raggiungibili e pertinenti;
- conteggi dei generi normalizzati;
- controllo che non siano presenti versi o traduzioni copiati;
- controllo delle licenze delle immagini;
- prova automatica di ricerca, filtro, apertura, Indietro e condivisione URL;
- test mobile e tastiera su un campione rappresentativo.

## 9. Definizione di “fatto”

Un intervento è concluso solo quando:

1. rispetta tutti i principi non negoziabili;
2. ha un criterio di accettazione verificabile;
3. supera i controlli automatici pertinenti;
4. è stato provato da utente su desktop e mobile;
5. non degrada tema chiaro, tema scuro, tastiera o cronologia;
6. è documentato e pubblicato con un commit piccolo e descrittivo;
7. la versione online è stata verificata dopo il deploy.

## 10. Ordine immediato consigliato

1. Completare la normalizzazione dei generi e della provenienza.
2. Correggere semantica e destinazioni delle card.
3. Rendere filtri, artista e posizione persistenti e reversibili.
4. Aggiungere il report automatico di completezza editoriale.
5. Separare i dati dal file HTML.
6. Creare pagine autonome per canzoni e artisti.
7. Riordinare la scheda con momento iconico e sintesi prima del player.
8. Creare pagine album e adottare il registro immagini.
9. Ridisegnare la homepage per ricerca e scoperta.
10. Portare progressivamente tutte le schede allo standard Everlong.

Fino al completamento dei primi quattro punti, nuove aggiunte massive aumenterebbero il debito editoriale e tecnico. Sono ammesse solo nuove schede complete e già conformi allo standard.
