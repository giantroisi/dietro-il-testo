# Dietro il testo — Costituzione

Documento dei principi. Stabilisce **cosa non può essere sacrificato** per aggiungere più contenuti o pubblicare più in fretta.

Questo file cambia raramente e solo per decisione esplicita dell'autore. Il lavoro corrente, lo stato degli interventi e il registro delle modifiche vivono invece in `ROADMAP.md`, che si aggiorna a ogni intervento.

**Se un'istruzione operativa contraddice un principio di questo documento, prevale il principio.** Va segnalato, non aggirato.

---

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

Post social non verificati, forum, commenti, video senza provenienza, testi generati automaticamente, pagine che si copiano a vicenda e siti privi di autore/data.
