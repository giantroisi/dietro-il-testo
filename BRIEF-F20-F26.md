# Brief operativo — interventi F20–F26

Ordine di lavoro scritto il 24 agosto 2026 dopo la prima prova dell'autore sulla nuova architettura pubblicata.
Ogni problema elencato qui è stato **verificato sui dati reali**, non supposto: dove c'è un numero, quel numero è stato contato.

---

## 0. Prima di iniziare

**Leggi `COSTITUZIONE.md`.** Contiene missione, i nove principi non negoziabili, l'architettura editoriale approvata e la gerarchia delle fonti. Se un'istruzione di questo brief contraddice un principio, **prevale il principio**: segnalalo invece di eseguirlo alla lettera.

**Aggiorna `ROADMAP.md` a ogni intervento**, come impone la sua "Regola di aggiornamento": cosa è cambiato, perché, quali verifiche sono state superate, se è online, cosa resta aperto, qual è il prossimo passo. Non è burocrazia: è l'unico posto dove si vede lo stato reale del progetto.

### Come funziona il sito adesso

- **Fonte di verità:** `dati/canzoni.json` (157 schede) e `dati/artisti.json` (104 artisti). Nessun contenuto vive solo nell'HTML (P9).
- **Generatore:** `node scripts/genera-sito.mjs` produce 653 pagine in `sito/` (cartella di build, non tracciata in git).
- **Pubblicazione:** si copia il contenuto di `sito/` sulla radice del repository, si committa e si fa push. Vercel distribuisce da `main` su `dietro-il-testo.vercel.app`.
- **Moduli del generatore:** `scripts/genera/stile.mjs` (CSS), `guscio.mjs` (testa HTML, testata, piede), `pagine.mjs` (modelli delle sei tipologie), `ricerca.mjs` (indice e comportamenti client).
- **Controlli disponibili:** `scripts/check-link.mjs`, `scripts/check-contrasto-v2.mjs`, `scripts/estrai-dati.mjs`.

### Vincoli

- **Nessun framework, nessuna dipendenza.** Vanilla JS e CSS scritti a mano, come adesso.
- **Non riscrivere il contenuto editoriale delle schede.** I testi delle 157 schede sono lavoro d'autore: si toccano solo i punti indicati qui.
- **Nessuna immagine di terzi** senza licenza o autorizzazione documentata (P8). I riquadri colorati con la sigla restano segnaposto legittimi.
- **Mai testi o traduzioni di canzoni** sul sito (P3). Nemmeno parziali, nemmeno nelle anteprime social.
- **Un intervento per commit**, con il codice dell'intervento nel messaggio (es. `F21: nomina la fonte nel pulsante del testo`).
- **Verifica nel browser prima di pubblicare**: desktop e mobile (375px), tema chiaro e scuro, console senza errori.

---

## F20 · I link al testo non portano al testo — e non dicono dove portano

**Priorità massima.** È il difetto che tradisce la promessa del sito.

### Problema, verificato

Su 157 schede il pulsante dice **"Leggi il testo (fonte esterna)"**. Ma:

| Destinazione | Schede | Problema |
|---|---:|---|
| `letras.com` | 102 | corretto: è un sito di testi |
| `en.wikipedia.org` | 45 | **Wikipedia non contiene i testi delle canzoni** |
| `it.wikipedia.org` | 5 | idem |
| `donnaglamour.it`, `allmusicitalia.it`, `songfacts.com` | 3 | pagine di commento, non testi |
| `lyricstranslate.com`, `readdork.com` | 2 | accettabili ma incoerenti col resto |

**53 schede su 157 promettono un testo e consegnano altro.** È l'errore che l'autore aveva già segnalato nella versione precedente e che è stato trascinato dentro i dati durante la migrazione: i vecchi link "Approfondisci" sono finiti nel campo `testoUrl`.

Inoltre l'etichetta è generica: `(fonte esterna)` non dice al lettore dove sta per andare, e questo gli toglie l'unica informazione con cui deciderebbe se fidarsi.

### Cosa fare

1. **Separa i due campi nei dati.** `testoUrl` deve contenere **solo** link a siti di testi. Le pagine di approfondimento (Wikipedia, Songfacts, testate) appartengono già alle `fonti`: se un URL è finito in `testoUrl` per errore, spostalo tra le fonti se non c'è già, altrimenti rimuovilo.
2. **Aggiungi il campo `testoFonte`** con il nome leggibile del sito (`"AngoloTesti"`, `"Letras"`, `"Genius"`), e usa quello nell'etichetta del pulsante: **"Leggi il testo su AngoloTesti"**, non "Leggi il testo (fonte esterna)". Il nome si ricava dal dominio con una tabella esplicita, non indovinato.
3. **Colma le 53 schede rimaste senza un vero link al testo.** Cerca il brano su un sito di testi e **verifica l'atterraggio prima di scrivere l'URL**: apri la pagina e controlla che titolo e artista corrispondano davvero alla scheda. Non costruire URL per analogia — è così che nascono i link sbagliati.
4. **Dove un testo non è reperibile su una fonte accettabile**, non inventare un link: ometti il pulsante. Una scheda senza pulsante è meglio di un pulsante che mente.

> **Nota per l'autore, non per l'agente.** Resta aperta una questione che il codice non risolve: i siti di testi collaborativi non espongono licenze con gli editori musicali. La verifica richiesta qui rende i link affidabili, non risolve quel punto. Se in futuro si volesse chiuderlo, le strade sono una fonte licenziata (Musixmatch, sito ufficiale dell'artista) oppure una formulazione che dichiari apertamente cosa fa il pulsante.

### Criterio di accettazione

Uno script `scripts/check-testi.mjs` che, per ogni scheda con `testoUrl`, scarichi la pagina e confronti titolo e artista con quelli della scheda (normalizzati: minuscole, senza accenti né punteggiatura, tenendo conto delle varianti legittime tipo `The Eagles`/`Eagles`). Deve riportare **zero discordanti e zero irraggiungibili**. Nessun `testoUrl` punta più a Wikipedia. Ogni pulsante presente nomina la propria fonte.

---

## F21 · La verifica dei dati non è abbastanza rigorosa

**L'autore ha trovato a mano un album mancante. Un controllo automatico avrebbe dovuto trovarlo prima.**

### Problema, verificato

`POST HUMAN: Survival Horror` (2020) dei Bring Me the Horizon **non è nella loro discografia**, che salta da *Amo* (2019) a *Post Human: Nex Gen* (2024) — nonostante una scheda del sito, *Parasite Eve*, dichiari proprio quell'album. Stessa cosa per `DallAmeriCaruso` di Lucio Dalla, dichiarato da *Caruso*.

Sono **2 buchi reali** su artisti che una discografia ce l'hanno. (Ci sono altri 72 casi analoghi, ma riguardano artisti per cui non è ancora stata inserita alcuna discografia: non sono errori, sono lavoro non ancora fatto.)

La radice del problema non sono i due album: è che **nessun controllo verificava la coerenza tra ciò che una scheda dichiara e ciò che la discografia contiene**.

### Cosa fare

1. **Scrivi `scripts/check-coerenza.mjs`** che, come minimo, segnali:
   - album citati da una canzone ma assenti dalla discografia di un artista **che una discografia ce l'ha** (il caso Survival Horror);
   - canzoni elencate da un artista che non esistono, e viceversa;
   - anni incoerenti (canzone precedente all'album che la contiene, album fuori dall'arco di attività dichiarato);
   - campi obbligatori mancanti rispetto allo standard editoriale della Costituzione (sezione 4A).
2. **Correggi i due buchi trovati**, con fonte verificata per anno e certificazioni, come per ogni altro album già presente.
3. **Rendi il controllo parte del rituale di pubblicazione**: va eseguito e deve passare prima di ogni push.

### Criterio di accettazione

`node scripts/check-coerenza.mjs` gira pulito. I due album mancanti sono presenti con la loro fonte. Un test deliberato (rimuovi temporaneamente un album e rilancia) dimostra che lo script **avrebbe intercettato** il caso Survival Horror.

---

## F22 · "Da integrare" non significa niente per chi legge

### Problema, verificato

Ogni pagina canzone mostra un'etichetta calcolata così: è `completa` se ha frase iconica, player Spotify, link al testo, almeno due fonti e almeno due paragrafi; altrimenti `da integrare`. Oggi: **73 complete, 84 da integrare**.

L'etichetta è onesta ma **è scritta per chi costruisce il sito, non per chi lo legge**. Un lettore che arriva su una scheda e vede "da integrare" non capisce se il contenuto è inaffidabile, incompleto o provvisorio — e nel dubbio si fida meno di quanto dovrebbe, perché il testo che ha davanti è comunque verificato.

Va anche detto che l'etichetta è poco informativa persino internamente: non dice *cosa* manca.

### Cosa fare

Scegli **una** delle due strade e applicala ovunque:

- **A (consigliata).** L'etichetta pubblica comunica l'**affidabilità di ciò che c'è**, non la completezza del formato. Usa i segnali già previsti dalla Costituzione (sezione "Segnali di attendibilità"): `Fatto documentato`, `Dichiarato dall'artista`, `Interpretazione accreditata`. Lo stato di completezza resta, ma diventa **un report interno** (`scripts/check-completezza.mjs`, che chiude anche F5 della vecchia numerazione), non un bollo in pagina.
- **B.** Mantieni il bollo pubblico ma rendilo utile e non ansiogeno: invece di "da integrare", dichiara la cosa specifica che manca, accanto al punto in cui manca — per esempio, dove non c'è il player, la riga già presente "Il player ufficiale per questo brano non è ancora stato collegato" basta da sola.

In entrambi i casi: **"da integrare" sparisce dalle pagine pubbliche.**

### Criterio di accettazione

Nessuna pagina mostra più un'etichetta che parli del processo interno invece che del contenuto. Se scegli A, esiste il report interno e il suo output è citato in `ROADMAP.md`.

---

## F23 · Le pillole non si possono condividere

**È il punto con il maggior potenziale di crescita del progetto, e oggi è semplicemente assente.**

### Problema, verificato

Non esiste **nessun** pulsante di condivisione in tutto il sito (zero occorrenze di `share` o `navigator.share` nei modelli). E soprattutto: **non esiste `og:image`**. Le pagine hanno `og:title`, `og:description` e `og:url`, ma nessuna immagine — quindi un link incollato in una chat o su un social produce un'anteprima spoglia, che nessuno apre.

Una pillola che non può circolare non è una pillola: è una pagina d'archivio.

### Cosa fare

1. **Pulsante "Condividi" su ogni pagina canzone**, vicino al momento iconico (è quello il premio, ed è quello che si vuole mandare a un amico). Usa `navigator.share()` dove disponibile — su mobile apre direttamente chat, storie e social — con **ricaduta su "copia link"** dove l'API non c'è, e conferma visibile dell'avvenuta copia.
2. **Genera un'immagine di anteprima per ogni canzone**, da usare come `og:image` e offrire in download. Deve contenere: titolo, artista, **la parafrasi del momento iconico** (mai il testo originale — P3), il colore identitario della scheda e il logo. Si genera in fase di build come SVG convertito in PNG, oppure come SVG statico servito direttamente: nessuna dipendenza esterna, nessun servizio a runtime.
3. **Completa i metadati**: `og:image`, `og:image:width`, `og:image:height`, `twitter:card` a `summary_large_image`.
4. **Verifica l'anteprima reale**, non solo la presenza del tag: controlla che l'immagine risponda 200 dall'URL assoluto e che le dimensioni siano quelle dichiarate.

### Criterio di accettazione

Da una pagina canzone si condivide in un gesto su mobile e in un click su desktop. Un URL di canzone incollato in una chat mostra un'anteprima con titolo, artista e immagine dedicata. L'immagine non contiene **nessun verso** della canzone.

---

## F24 · Il logo non è valorizzato, il sito non ha identità

> *«Dietro il testo deve essere un nome da punto di riferimento.»*

### Problema

Il logo è un'immagine disegnata a mano, con personalità, e oggi vive come una riga da 168 pixel nell'angolo in alto a sinistra della testata, indistinguibile da qualsiasi altro sito. La homepage apre con un titolo in serif corsivo che non ha nessuna relazione visiva col logo. Il risultato è che **il marchio non si imprime**: si legge il contenuto e non si ricorda dove lo si è letto.

Attenzione: il problema **non si risolve ingrandendo il logo**. Nel prototipo precedente il logo era stato portato a occupare un terzo di ogni schermata e il risultato era peggiore — spingeva sotto la piega la risposta che l'utente cercava, violando il principio del premio prima del contesto (P4).

### Cosa fare

L'identità va costruita su tre livelli, non su una dimensione:

1. **Un'apertura di homepage che sia un manifesto, non un'intestazione.** Il logo può avere presenza reale nella prima schermata della home — dove il compito *è* dire chi siamo — a patto che la ricerca resti immediatamente raggiungibile e visibile senza scorrere. Nelle pagine interne resta compatto: lì il compito è portare alla risposta.
2. **Un carattere e un ritmo tipografico riconoscibili.** Il logo è disegnato con note musicali: quel tratto va ripreso dal sistema tipografico e dai dettagli (il segno che separa i metadati, i bollini, i marcatori di elenco), così che una pagina sia riconoscibile anche ritagliata senza logo.
3. **Un'immagine condivisibile marchiata** (vedi F23): è l'unico elemento del progetto che circola da solo. Se porta il marchio, lavora per la riconoscibilità ogni volta che qualcuno condivide una pillola.

Non inventare un nuovo logo e non alterare quello esistente: è un file fornito dall'autore. Lavora su spazio, contesto e coerenza.

### Criterio di accettazione

Un ritaglio di una pagina interna, senza logo visibile, è riconoscibile come "Dietro il testo". Sulla home la ricerca resta raggiungibile senza scorrere, a 1280px e a 375px. Il logo non supera in altezza la promessa testuale che lo accompagna.

---

## F25 · Il selettore chiaro/scuro va a sinistra

### Problema

Il pulsante del tema è oggi in fondo alla testata, a destra, dopo la navigazione. L'autore lo vuole **a sinistra**.

### Cosa fare

Spostalo all'estremità sinistra della testata. Va deciso con attenzione il rapporto con il marchio, che oggi occupa quella posizione: valuta se il tema debba precedere il logo o stargli accanto, senza che i due si disturbino a larghezza ridotta.

Mantieni ciò che già funziona: `aria-label` che cambia con lo stato, `aria-pressed`, scelta persistita in `localStorage`, preferenza di sistema come valore iniziale, nessun risveglio a pagina bianca (lo script inline nel `<head>` va lasciato dov'è).

### Criterio di accettazione

Il pulsante è a sinistra su tutte le pagine, raggiungibile da tastiera, con stato annunciato correttamente. A 375px non si sovrappone né al marchio né alla ricerca.

---

## F26 · Separazione dei documenti guida

### Cosa è già stato fatto

`COSTITUZIONE.md` è stato estratto da `ROADMAP.md` il 24 agosto 2026: contiene missione, principi P1–P9, diagnosi, architettura editoriale approvata, standard editoriale della scheda e gerarchia delle fonti. `ROADMAP.md` conserva stato degli interventi, registro cronologico e fasi operative.

### Cosa fare

- Rimuovi da `ROADMAP.md` le sezioni ora duplicate in `COSTITUZIONE.md`, lasciando un rimando esplicito.
- Verifica che i riferimenti incrociati funzionino e che nessun principio sia andato perso nel taglio.
- Da qui in avanti: **la Costituzione cambia solo per decisione esplicita dell'autore; la roadmap si aggiorna a ogni intervento.**

### Criterio di accettazione

I due file non si sovrappongono. `ROADMAP.md` rimanda alla Costituzione per i principi. Nessuna sezione è sparita nel passaggio.

---

## Ordine consigliato

1. **F20** — i link al testo (rompe una promessa esplicita del sito)
2. **F21** — i controlli di coerenza (impedisce che errori simili tornino)
3. **F23** — condivisione e anteprime (il maggior potenziale inespresso)
4. **F22** — l'etichetta "da integrare" (piccolo, visibile, rapido)
5. **F25** — il selettore del tema (piccolo, richiesto esplicitamente)
6. **F24** — identità visiva (il più aperto: procedi per proposte, non di slancio)
7. **F26** — pulizia dei documenti guida

F20, F21, F22 e F25 hanno criteri oggettivi: falli e verificali. F24 è una direzione, non una specifica: **proponi all'autore prima di riscrivere mezzo sito**, mostrando come cambia una pagina.

---

## Rituale di pubblicazione

```
node scripts/estrai-dati.mjs      # solo se hai toccato index.html legacy
node scripts/genera-sito.mjs
node scripts/check-link.mjs
node scripts/check-coerenza.mjs   # da scrivere in F21
node scripts/check-testi.mjs      # da scrivere in F20
node scripts/check-contrasto-v2.mjs
```

Poi: verifica nel browser (desktop, 375px, chiaro, scuro, console pulita), copia `sito/` sulla radice, aggiorna `ROADMAP.md`, committa con il codice dell'intervento, push, e **conferma che il dominio serva davvero la nuova versione** prima di dire che è fatto.

---

## Cosa non rompere

- I 653 URL già pubblicati: `canzone/<slug>/`, `artista/<slug>/`, `album/<artista>/<album>/`. Se uno slug deve cambiare, serve un reindirizzamento.
- `dati/*.json` come unica fonte di verità: nessun numero scritto a mano da nessuna parte.
- La ricerca unificata che copre canzoni, artisti e album, disponibile in testata su ogni pagina.
- Il comportamento delle pagine dove i dati mancano: dichiarare l'assenza, mai riempirla. È il principio P1 reso visibile — la pagina di Queen che dice "non abbiamo ancora una storia verificata" vale più di una biografia inventata.
- Contrasto WCAG AA su tutti i colori identitari, in entrambi i temi (`check-contrasto-v2.mjs`).
- `target="_blank" rel="noopener"` su ogni link esterno, `loading="lazy"` su ogni iframe.
