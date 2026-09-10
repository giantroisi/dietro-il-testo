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

## 4B. Come si scrive una scheda nuova

La sezione 4A dice **cosa deve contenere** una scheda. Questa dice **come si scrive** perché il contenuto sia vero la prima volta.

**L'obiettivo è preciso: una scheda scritta seguendo questa sezione non si riapre più**, salvo che accada qualcosa di nuovo nel mondo (vedi «Quando una scheda si riapre»). Riaprire una scheda perché era stata scritta male costa più che scriverla bene, perché nel frattempo è stata pubblicata e letta.

Nessuna di queste regole è una precauzione teorica: ognuna corrisponde a un errore trovato più di una volta dalla verifica indipendente, su oltre duemila affermazioni riaperte una per una fra schede canzone e biografie. Ciò che cade quasi mai è una bugia: sono **dettagli plausibili aggiunti mentre si scriveva, che nessuna fonte contiene**.

### R1 — Si scrive dalla fonte, non si cerca la fonte per ciò che si è scritto

Prima si aprono e si leggono le fonti, poi si scrive. Ogni frase deve nascere da qualcosa che si ha davanti in quel momento.

Il gesto vietato è quello inverso: scrivere il racconto e poi cercare una pagina che lo sostenga. È da lì che entrano i dettagli che rendono la storia più bella e che nessuno ha mai letto da nessuna parte.

**È la regola più importante della sezione**: quasi tutte le altre servono a rimediare quando questa non viene rispettata.

### R2 — L'unità è la singola affermazione

Una data, un nome, un luogo, un ruolo, una cifra, un'attribuzione: ognuna è un'affermazione a sé e va sostenuta a sé. «Registrata nel 1991 allo studio X dal tecnico Y» sono tre affermazioni, non una.

Una scheda è verificata quando ogni singola affermazione ha superato il controllo, non quando «il senso generale» regge.

### R3 — Chi dice una cosa fa parte della cosa

Se una frase nomina una testata, un programma, un podcast o un'intervista, quella fonte **deve stare fra le fonti della scheda e contenere davvero ciò che le si attribuisce**. Se non è così, ci sono tre uscite legittime e una sola che non lo è:

1. si aggiunge la fonte vera;
2. si toglie il nome dalla frase;
3. si attribuisce a chi lo riporta («secondo Songfacts, che cita Rolling Stone nel 2006…»).

Lasciarlo com'è non è una di quelle tre. Vale anche al grado minimo — una descrizione scritta dal redattore di una fonte non diventa una dichiarazione dell'artista — e vale anche dentro il campo `nome` di una fonte, che è testo pubblicato come il resto.

### R4 — La frase iconica è testo come gli altri

Stesse regole di fonte del corpo. Serve una regola apposta perché le correzioni tendono a fermarsi dove il rilievo cita il testo, e l'affermazione sbagliata sopravvive lì. Ed è **la riga più esposta del sito**: finisce nell'immagine da condividere e nell'anteprima dei motori di ricerca. Le si applica anche il P3: si descrive o si parafrasa, non si riproduce il verso.

### R5 — Se le fonti non concordano, si dice

Scegliere è legittimo, tacere la scelta no: la scheda dice quale versione segue e che ne esiste un'altra. Il caso peggiore non è la divergenza fra due fonti, ma la fonte che dichiara essa stessa più versioni: riportarne una sola come certa è un'affermazione più forte di quella che la fonte sostiene.

### R6 — Cosa non si può scrivere senza una fonte di livello A o B

Rimandando alla sezione 5: intenzioni attribuite all'autore, fatti controversi, cifre di vendita e posizioni in classifica, spiegazioni di copertine, accuse personali.

**Una scheda nuova senza almeno una fonte di livello A o B non si pubblica.** Non è un limite alla crescita: è il limite che impedisce di crescere peggiorando.

### R7 — Ogni affermazione ha una delle tre nature

Fatto documentato, dichiarazione dell'artista, interpretazione accreditata. **Se mentre scrivi non sai dire quale delle tre sia, l'affermazione non è pronta.** È il controllo più economico che esista: costa una domanda e si fa prima di aver scritto la frase.

### R8 — Il dubbio si scrive, non si arrotonda

«Non risulta disponibile una spiegazione ufficiale verificabile» è una risposta legittima e pubblicabile. Una scheda più corta e vera vale più di una completa e fragile.

### R9 — Falsa continuità: chi c'era all'inizio, e chi è entrato o uscito

Quando si racconta un gruppo, si dice **chi c'era davvero quando è cominciato** e **cosa è cambiato dopo**: chi è uscito, chi è morto, chi è arrivato e quando. Se le fonti non lo documentano, si scrive che non è documentato.

Questa regola esiste perché la verifica indipendente ha trovato lo schema in **23 biografie di gruppo su 35** — il 66%: la formazione fondativa raccontata come se fosse quella di oggi, con un membro originale sparito. È l'errore più insidioso di tutti, perché **ogni singolo nome citato è vero: a mentire è l'omissione, non la frase.** Nessuna delle altre otto regole lo intercetta, perché tutte guardano cosa è scritto e questa guarda cosa manca.

Le sue varianti, tutte già viste: la fine della storia taciuta (il cantante morto, la band sciolta), l'ordine invertito (chi ha suonato su quel disco non è chi lo firma oggi), la continuità narrativa (un successo raccontato come progressione lineare quando fu un flop e una seconda occasione).

### Come si chiude una scheda

1. rileggerla frase per frase **con le fonti aperte a fianco**, compresa la frase iconica;
2. per ogni affermazione: quale fonte la sostiene, e con quale frase;
3. per i gruppi, il controllo di R9;
4. far passare i controlli automatici;
5. scrivere la **data di verifica** nel campo `ultimaVerifica`: è la data in cui una persona ha davvero riaperto le fonti, non quella in cui il sito è stato rigenerato.

### Quando una scheda si riapre

Una scheda chiusa così **non si rilavora**. Si riapre solo per una di queste ragioni, e in tutte e quattro il lavoro è un aggiornamento, non una riparazione:

- **è successo qualcosa**: l'artista è morto, la band si è sciolta o riunita, è uscita una nuova edizione, un record è stato superato;
- **è uscita una fonte migliore**: un'intervista, un documento, un archivio che prima non c'era, e che permette di sostituire una fonte debole o di chiudere un dubbio dichiarato;
- **una fonte citata è morta o ha cambiato indirizzo**;
- **qualcuno ha segnalato un errore**, o un campione di verifica indipendente ne ha trovato uno.

**Rilavorare una scheda perché era stata scritta senza seguire questa sezione non è un aggiornamento: è un debito che si paga.** È esattamente ciò che questa sezione serve a non contrarre più.

### Cosa costa, e cosa questa sezione non promette

**Costa tempo.** Una scheda scritta così richiede più tempo di una scritta a memoria e documentata dopo. È il prezzo per non doverla riaprire.

**Non promette che non si sbaglierà più.** La verifica indipendente ha trovato una data sbagliata dentro una scheda che il verificatore stesso aveva dichiarato a posto quattro giorni prima: chi controlla sbaglia come chi scrive. Questa procedura **riduce** gli errori, non li azzera — e per questo il campionamento indipendente non si sostituisce con una lista di controllo e non si interrompe quando i numeri migliorano.

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
