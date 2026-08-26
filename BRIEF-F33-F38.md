# Brief operativo — interventi F33–F38

Ordine di lavoro scritto il 26 agosto 2026, dopo la prova dell'autore sul sito pubblicato con l'apertura "Frontespizio" (F24).
Ogni problema elencato qui è stato **verificato nel codice reale**, non supposto: dove c'è un numero, quel numero è stato contato.

---

## 0. Prima di iniziare

**Leggi `COSTITUZIONE.md`.** Contiene missione, i nove principi non negoziabili, l'architettura editoriale approvata e la gerarchia delle fonti. Se un'istruzione di questo brief contraddice un principio, **prevale il principio**: segnalalo invece di eseguirlo alla lettera. Due interventi di questo brief (F33 e F35) toccano davvero dei principi: sono segnalati apertamente al loro posto, con la scelta lasciata all'autore.

**Aggiorna `ROADMAP.md` a ogni intervento**, come impone la sua "Regola di aggiornamento": cosa è cambiato, perché, quali verifiche sono state superate, se è online, cosa resta aperto, qual è il prossimo passo.

### Come funziona il sito adesso

- **Fonte di verità:** `dati/canzoni.json` (157 schede) e `dati/artisti.json` (104 artisti). Nessun contenuto vive solo nell'HTML (P9).
- **Generatore:** `node scripts/genera-sito.mjs` produce 655 pagine in `sito/` (cartella di build, non tracciata in git).
- **Pubblicazione:** si copia il contenuto di `sito/` sulla radice del repository, si committa e si fa push. Vercel distribuisce da `main` su `www.dietroiltesto.it` (canonico) e `dietro-il-testo.vercel.app`.
- **Moduli del generatore:** `scripts/genera/stile.mjs` (CSS), `guscio.mjs` (testa HTML, testata, piede), `pagine.mjs` (modelli delle pagine), `ricerca.mjs` (indice e comportamenti client). `scripts/genera-og.py` genera a parte le 157 immagini condivisibili in `og/`.
- **Controlli:** `check-link.mjs`, `check-coerenza.mjs`, `check-testi.mjs`, `check-contrasto-v2.mjs`, `check-completezza.mjs`.

### Vincoli

- **Nessun framework, nessuna dipendenza Node.** Vanilla JS e CSS scritti a mano. (`genera-og.py` usa Pillow/numpy solo per il build locale: non è una dipendenza del sito.)
- **Non riscrivere il contenuto editoriale delle schede.** I testi delle 157 schede sono lavoro d'autore.
- **Mai testi o traduzioni di canzoni** (P3), nemmeno nelle anteprime social.
- **Un intervento per commit**, col codice nel messaggio (es. `F34: porta il player Spotify in cima alla scheda`).
- **Verifica nel browser prima di pubblicare:** desktop e 375px, tema chiaro e scuro, console senza errori.
- **Conferma che il dominio serva davvero la nuova versione** prima di dire che è fatto.

---

## F33 · Il logo è ancora troppo piccolo

> L'autore cita **Sottolineature** come esempio della presenza che il marchio dovrebbe avere.

### Problema, verificato

Dimensioni attuali in `scripts/genera/stile.mjs`:

- testata, tutte le pagine: `.marchio img { width: 168px }` (riga 103), che scende a `128px` sotto 820px (riga 146);
- apertura della homepage: `.marchio-apertura img { width: clamp(190px, 24vw, 300px) }` (riga 200).

### Attenzione: questo riapre una decisione già presa

F24 concludeva esplicitamente che **ingrandire il logo non è la soluzione**, perché nel prototipo scartato occupava un terzo dello schermo e spingeva la ricerca sotto la piega, violando P4 (il premio prima del contesto). L'autore ha ora chiesto il contrario, ed è una sua decisione legittima: **eseguila**. Ma il criterio di accettazione di F24 resta e va rispettato: la ricerca deve restare raggiungibile **senza scorrere**, a 1280px e a 375px.

Se le due cose entrano in conflitto — cioè se il logo abbastanza grande da soddisfare l'autore spinge giù la ricerca — **non scegliere da solo**: mostra all'autore le due versioni e falla decidere a lui.

### Cosa fare

1. Aumenta il logo dell'apertura homepage e quello della testata. Punto di partenza ragionevole, da tarare guardando il risultato: apertura `clamp(240px, 32vw, 420px)`, testata `210px` (`150px` sotto 820px). Non sono numeri sacri: falli tuoi guardando la pagina.
2. Rivedi i margini intorno: un logo più grande con gli stessi margini sembra soffocato, non più importante. Vedi anche **F37**, che è lo stesso lavoro visto da un'altra angolazione — conviene farli insieme.
3. Il logo resta il file dell'autore: **non ridisegnarlo, non alterarne il tratto, non ricrearlo in SVG.** Si tocca solo la dimensione a cui viene mostrato.

### Criterio di accettazione

Il logo ha presenza reale in apertura. **Verificato in browser** che a 1280px e a 375px il campo di ricerca sia interamente visibile senza scorrere — misuralo, non stimarlo a occhio:

```js
const c = document.querySelector('[data-campo]').getBoundingClientRect();
c.bottom < window.innerHeight   // deve essere true
```

---

## F34 · Al posto dello "spazio immagine", il player Spotify

> «Riempie la pagina ed è più immediato.»

### Problema, verificato

In cima a ogni scheda canzone c'è un riquadro colorato con le iniziali del titolo e la scritta "SPAZIO IMMAGINE" (`riquadroVisivo`, `scripts/genera/pagine.mjs` riga 53, usato a riga 150). È un segnaposto legittimo per P8, ma occupa la posizione più preziosa della pagina senza dare niente al lettore. Il player Spotify esiste già, ma vive più in basso nella sezione "Ascolta" (riga ~179).

**Numero che decide l'intervento: solo 75 canzoni su 157 hanno `spotifyId`. Le altre 82 non ce l'hanno.** Qualunque soluzione deve reggere il caso in cui il player non c'è, senza lasciare un buco in cima alla pagina.

### Cosa fare

1. Nell'intestazione della scheda canzone, **al posto di `riquadroVisivo(c.titolo)`**: se `c.spotifyId` esiste, metti lì l'iframe di Spotify; **se non esiste, lascia `riquadroVisivo` com'è oggi** — le 82 schede senza player non devono peggiorare.
2. **Non duplicare il player.** Se sale in cima, va tolto dalla sezione "Ascolta", che resta con i pulsanti ("Leggi il testo su…", "Tutto su…", "L'album…"). Se in "Ascolta" non resta abbastanza da giustificare una sezione, valuta di fonderla con le azioni — ma non lasciare due player nella stessa pagina.
3. La riga già esistente «Il player ufficiale per questo brano non è ancora stato collegato» va conservata dove serve: è la dichiarazione onesta di assenza che F22 ha reso lo standard del sito.
4. `loading="lazy"` sull'iframe è un vincolo del progetto e resta. Sappi però che in cima alla pagina il lazy loading serve a poco: se noti un ritardo visibile nel primo caricamento, segnalalo invece di rimuovere l'attributo di tua iniziativa.
5. **Solo pagine canzone.** Le pagine artista (riga 301) e album (riga 410) usano lo stesso `riquadroVisivo`, ma per loro non abbiamo ID Spotify di artista o album nei dati: **lasciale come sono** e non inventare embed che non abbiamo modo di verificare.

### Criterio di accettazione

Su una scheda con `spotifyId` il player è la prima cosa visibile accanto al titolo e si può premere play senza scorrere. Su una delle 82 schede senza `spotifyId` la pagina resta ordinata, col riquadro identitario al suo posto e nessun buco. Nessuna pagina contiene due player. Verificato su entrambi i casi, desktop e 375px.

---

## F35 · "La storia" va tutta sotto il titolo

### Problema, verificato — e la sua causa vera

Oggi l'ordine della scheda canzone è: titolo → **sintesi** → momento iconico → **La storia**.

La "sintesi" sotto il titolo è prodotta da `richiamo(c)` (`pagine.mjs` riga 78), che funziona così: usa il gancio scritto a mano se c'è, **altrimenti tronca a 118 caratteri il primo paragrafo di `corpo`**. E i ganci scritti a mano sono **0 su 157** — `dati/ganci.json` non esiste. Risultato: su tutte le schede, la prima frase della storia compare **due volte**: mozzata sotto il titolo, e intera poco più sotto.

Questo è il difetto reale dietro la richiesta dell'autore, ed è oggettivo.

### Attenzione: la soluzione tocca un principio

La Costituzione fissa l'ordine della pagina canzone (sezione "Pagina canzone") e P4 lo motiva: **gancio → momento iconico → spiegazione → storia completa → ascolto → fonti**. Il momento iconico viene prima della storia perché è il premio, la ragione per cui il lettore è arrivato.

Spostare "La storia" sopra il momento iconico **cambia quell'ordine**. Non farlo di iniziativa: l'autore ha chiesto "tutta sotto il titolo", ma esistono due letture, e cambiano cose diverse.

- **Lettura A — elimina solo la duplicazione (non tocca nessun principio).** Togli la "sintesi" troncata sotto il titolo. L'ordine resta quello approvato: titolo → momento iconico → La storia. La frase non compare più due volte, e la storia è la prima prosa lunga della pagina.
- **Lettura B — sposta davvero la storia in cima (richiede una modifica alla Costituzione).** Titolo → La storia completa → momento iconico. Se l'autore conferma questa, **va aggiornata anche `COSTITUZIONE.md`**, sezione "Pagina canzone" e P4: non si lascia il documento a dire una cosa e il sito a farne un'altra.

**Chiedi all'autore quale delle due intende, mostrandogli le due pagine.** Non scegliere al posto suo: una è un ritocco, l'altra cambia la tesi editoriale del sito.

### Terza strada, che risolve la causa invece del sintomo

I ganci esistono nel generatore ma non sono mai stati scritti: `genera-sito.mjs` legge `dati/ganci.json` se c'è (riga ~26) e stampa "Ganci scritti: 0/157" a ogni build. Scrivere ganci veri — una riga editoriale per canzone, non un troncamento — eliminerebbe la duplicazione **e** manterrebbe l'ordine approvato. È lavoro editoriale su 157 schede, quindi non è questo intervento: ma vale la pena dirlo all'autore, perché è la soluzione che il sistema aveva previsto fin dall'inizio.

### Criterio di accettazione

Su nessuna scheda la stessa frase compare due volte. L'ordine scelto è quello che l'autore ha confermato esplicitamente. Se è stata scelta la lettura B, `COSTITUZIONE.md` è stato aggiornato di conseguenza e il registro di `ROADMAP.md` lo dice.

---

## F36 · "Se hai un minuto" non cambia mai

### Problema, verificato

In `pagine.mjs` (riga ~472) la pillola del giorno è scelta così:

```js
const giorno = Math.floor(Date.now() / 86400000);
const inEvidenza = candidate[giorno % candidate.length];
```

L'intenzione era giusta, ma `Date.now()` viene eseguito **quando genero il sito**, non quando il lettore apre la pagina. Il sito è statico: quella scelta viene congelata nell'HTML. **La "pillola di oggi" cambia solo quando ripubblico il sito** — se non pubblico per una settimana, resta la stessa per una settimana. È esattamente ciò che l'autore ha notato.

Le candidate sono le canzoni con `fraseIconica`: **103 su 157** (le altre 54 non ce l'hanno e sono giustamente escluse).

### Cosa fare

1. **La rotazione va fatta nel browser, non in fase di build.** In `scripts/genera/ricerca.mjs` esiste già l'indice generato lato server e passato al client: aggiungi allo stesso modo un array di candidate con i soli campi che servono a disegnare il blocco (`slug`, `titolo`, `artista`, anno, `colore`, e la frase già troncata lato server con `primaFrase` — **non** mandare al client testo che non serve).
2. Al caricamento, calcola l'indice del giorno con la stessa formula, ma **eseguita nel browser**, e riscrivi il contenuto del blocco pillola.
3. **Lascia nell'HTML la pillola calcolata a build time come contenuto iniziale.** Chi ha JavaScript disattivato deve comunque vedere una pillola valida, non un riquadro vuoto: il JS la aggiorna, non la crea da zero.
4. Aggiungi il pulsante **"Un'altra canzone"** accanto alla pillola: ne mostra un'altra a caso tra le candidate, senza ricaricare la pagina. Evita di ripescare quella già mostrata (in `ricerca.mjs` c'è già `data-sorprendimi`, che usa `sessionStorage` per non ripetersi: riusa quella logica invece di scriverne una nuova).
5. Il colore identitario del blocco (`--identita`) cambia con la canzone: aggiornalo insieme al testo, altrimenti resta quello della canzone precedente.

### Criterio di accettazione

Aprendo la home in due giorni diversi **senza ripubblicare il sito** la pillola è diversa (verificabile falsificando la data nel browser). Il pulsante mostra un'altra canzone al primo click, senza ricaricare e senza ripescare quella appena vista. Con JavaScript disattivato la pillola è comunque presente e sensata. Nessun errore in console.

---

## F37 · Gli spazi, soprattutto in apertura

### Problema

L'autore segnala che la spaziatura va migliorata, in particolare nella schermata iniziale. Valori attuali in `stile.mjs`: `.apertura { padding: 56px 0 12px }` (riga 198), `.sezione { padding: 54px 0 }` (riga 224), `.suggerimenti { margin-top: 14px }` (riga 212).

Questo è l'unico punto del brief senza un numero che dica cosa è sbagliato: è un giudizio visivo, e va trattato come tale.

### Cosa fare

Non applicare valori a caso. **Guarda la pagina, cambia, riguarda.** Alcune direzioni sensate:

1. Il ritmo verticale in apertura oggi è compresso rispetto al logo ingrandito di F33: logo, occhiello, promessa e ricerca vanno respirati come quattro passi, non impaccati.
2. Lo stacco tra l'apertura e la prima sezione ("La pillola di oggi") deve dire "qui finisce la presentazione e comincia il sito".
3. Sotto 820px gli stessi margini di desktop sono quasi sempre troppi: controlla il risultato a 375px, non solo su schermo grande.
4. **F33 e F37 sono lo stesso lavoro visto da due lati**: falli e verificali insieme, altrimenti tari due volte le stesse misure.

### Criterio di accettazione

L'apertura respira senza spingere la ricerca sotto la piega (stesso controllo di F33). Verificato a 1280px e 375px, tema chiaro e scuro, senza scorrimento orizzontale.

---

## F38 · Il logo nelle immagini condivisibili si vede male

### Problema, verificato

Le 157 immagini di anteprima sono generate da `scripts/genera-og.py`. Nella composizione attuale:

- il logo è disegnato a **228px** di larghezza su una tela di 1200×630 (riga 151), ricolorato di bianco tenendo l'alpha originale (`logo_tinto`, riga 73): a quella scala i righi musicali che danno personalità al marchio si assottigliano e si perdono, soprattutto sui colori identitari chiari;
- il nome del sito è la scritta `dietroiltesto.it` in mono 18px, in basso a destra, con opacità 200/255 (righe 181-184): sta in un angolo, staccato dal logo e dal resto della composizione.

L'autore chiede: logo più leggibile e con più personalità, e nome del sito riposizionato e più uniforme alla scheda.

### Cosa fare

1. **Dai peso al logo:** più grande, e valuta l'opacità piena invece del bianco pieno su fondo chiaro, dove oggi si impasta. Ricorda che l'immagine viene vista soprattutto piccola, dentro una chat: quello che non si legge a 400px di larghezza non serve.
2. **Rivedi dove sta il nome del sito.** Oggi logo (in alto a sinistra) e dominio (in basso a destra) sono due elementi scollegati che dicono la stessa cosa. Valuta di unirli in un unico blocco di marchio, o di togliere la ripetizione: se il logo si legge, il dominio in un angolo aggiunge poco.
3. **Mantieni il vincolo di P3:** nell'immagine non entra mai un verso della canzone, solo la parafrasi già presente nei dati.
4. Il logo è il file dell'autore: si cambia scala e posizione, **non il disegno**.
5. Dopo le modifiche rigenera **tutte** le 157 immagini (`python3 scripts/genera-og.py`) e ricopiale nel sito: `genera-sito.mjs` copia `og/` in `sito/og/` da solo.
6. **Guarda i risultati su fondi diversi** prima di dire che è fatto: i colori identitari vanno dal quasi nero (`#1A1A1A`) al giallo chiaro (`#B3A61F`), e ciò che si legge su uno può sparire sull'altro.

### Criterio di accettazione

Aperta a dimensione reale e rimpicciolita a ~400px, l'immagine mostra un marchio riconoscibile. Verificato su almeno tre schede con colori identitari molto diversi (per esempio `hurt` quasi nero, `happy-song` giallo chiaro, `caruso` blu). Le 157 immagini sono state rigenerate e sono ancora 1200×630. Nessun verso di canzone compare nell'immagine.

---

## Ordine consigliato

1. **F36** — la pillola ferma è un difetto funzionale, ed è isolato: chiudilo per primo.
2. **F34** — il player in cima cambia la pagina più importante del sito.
3. **F33 + F37 insieme** — logo e spazi sono la stessa taratura.
4. **F38** — le immagini condivisibili, indipendenti dal resto.
5. **F35 per ultimo**, perché prima serve una risposta dell'autore: senza quella, non si tocca.

---

## Rituale di pubblicazione

```
node scripts/genera-sito.mjs
node scripts/check-link.mjs
node scripts/check-coerenza.mjs
node scripts/check-testi.mjs
node scripts/check-contrasto-v2.mjs
```

Poi: verifica nel browser (desktop, 375px, chiaro, scuro, console pulita), copia `sito/` sulla radice, aggiorna `ROADMAP.md`, committa con `F<N>: ...`, push, e **conferma che il dominio serva davvero la nuova versione** prima di dire che è fatto.

## Cosa non rompere

- Gli URL già pubblicati: `canzone/<slug>/`, `artista/<slug>/`, `album/<artista>/<album>/`.
- `dati/*.json` come unica fonte di verità: nessun numero scritto a mano.
- La ricerca unificata in testata su ogni pagina, e i filtri archivio nell'URL (`?genere=`, `?paese=`, F4).
- Il comportamento delle pagine dove i dati mancano: **dichiarare l'assenza, mai riempirla**. Vale in particolare per le 82 schede senza Spotify in F34.
- Contrasto WCAG AA su tutti i colori identitari, in entrambi i temi.
- `target="_blank" rel="noopener"` su ogni link esterno, `loading="lazy"` su ogni iframe.
- Il pulsante "Condividi" e le immagini di anteprima (F23), il selettore tema a sinistra (F25), il segno tipografico sui metadati (F24).
