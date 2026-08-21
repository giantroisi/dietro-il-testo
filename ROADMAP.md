# Dietro il testo — Roadmap di prodotto e patto editoriale

Documento guida del progetto. Aggiornato il 21 agosto 2026 dopo un audit della versione pubblicata e del sorgente.

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
| F6 — Separazione dei dati dal documento HTML | da fare | 21 agosto 2026 | Prerequisito per pagine autonome e manutenzione sostenibile |
| F7 — Pagine canzone e artista autonome | da fare | 21 agosto 2026 | URL condivisibili, SEO, navigazione e fonti contestuali |
| F8 — Pagine album e registro immagini | da fare | 21 agosto 2026 | Nessuna immagine senza base d'uso documentata |
| F9 — Homepage orientata a ricerca e scoperta | da fare | 21 agosto 2026 | Ridurre introduzione e griglia iniziale |
| F10 — Uniformazione del catalogo | da fare | 21 agosto 2026 | Portare tutte le schede allo standard editoriale completo |
| F11 — Migrazione e pubblicazione su Sites | da fare | 21 agosto 2026 | Avverrà dopo la separazione dei dati e le pagine autonome; Vercel resta online fino alla verifica finale |

### Registro degli interventi

- **21 agosto 2026 — Audit iniziale:** analizzata la versione pubblicata su desktop e mobile; rilevati problemi di architettura, navigazione, semantica, accessibilità, SEO e uniformità editoriale.
- **21 agosto 2026 — F1 completato:** corretti i contrasti dei titoli e dei pulsanti primari nei due temi; aggiunto controllo automatico WCAG su tutte le 157 schede; modifica pubblicata e verificata online.
- **21 agosto 2026 — Roadmap creata:** definiti missione, principi non negoziabili, standard editoriale, gerarchia delle fonti, fasi di lavoro e policy prudenziale per immagini e copertine.
- **21 agosto 2026 — F2 completato:** assegnati generi normalizzati e provenienza esplicita a tutte le 157 card e schede; sostituito il filtro testuale con confronti esatti; “Artisti italiani” separato dai generi; ricerca limitata a titolo, artista, album, genere e momento iconico; aggiunti stato accessibile dei pulsanti e annuncio dei risultati. Verificati 74 rock, 52 metal, 58 pop, 17 punk, 4 rap/hip-hop, 9 elettroniche e 33 di artisti italiani. Nessun errore in console e nessuna fuoriuscita orizzontale su mobile.
- **21 agosto 2026 — F3 avviato:** iniziata la correzione della struttura delle card e dei collegamenti artista/canzone.
- **21 agosto 2026 — F3 completato:** convertite tutte le 157 card da collegamenti contenitori a elementi semantici; il titolo è ora il collegamento alla canzone e il nome dell'artista è un'azione indipendente. Eliminati tutti gli elementi interattivi annidati, aggiunti focus visibile e destinazioni distinguibili. Verificati click separati, filtro artista, apertura canzone e assenza di errori.
- **21 agosto 2026 — F4 avviato:** iniziato il lavoro su URL, cronologia e ripristino della posizione.
- **21 agosto 2026 — Ricerca artista unificata:** eliminato il menu separato “Artista”. La barra principale cerca già titolo, artista, album, genere e momento iconico; quando il nome digitato corrisponde esattamente a un artista, mostra anche storia e discografia disponibili. Il click sul nome di una band compila la stessa barra e filtra i suoi brani. Verificati ricerca diretta, ricerca parziale, click artista, chiusura della biografia, desktop e mobile. F4 resta in corso per URL e cronologia.
- **21 agosto 2026 — Destinazione Sites approvata:** la nuova architettura verrà pubblicata su Sites; la versione Vercel non sarà rimossa finché contenuti, navigazione e indirizzi non saranno stati verificati.

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

## 4. Standard editoriale di una scheda completa

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
