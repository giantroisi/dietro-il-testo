# Dietro il testo — brief di intervento

Documento operativo per l'agente che esegue le modifiche. Scritto il 21 agosto 2026 a valle di un audit completo del sorgente.

**Repo:** `/Users/gianmicheletroisi/Claude/dietro-il-testo`
**File unico:** `index.html` — 530.946 byte, HTML+CSS+JS scritti a mano, nessun build step, deploy su Vercel.
**Contenuto:** 157 schede su canzoni reali, 104 artisti distinti, 567 collegamenti esterni.

---

# PARTE 0 — Direzione di progetto

Leggi questa parte prima delle altre. Gli interventi che seguono sono conseguenze di quanto scritto qui, non una lista scollegata: se in qualche punto un'istruzione operativa dovesse contraddire un principio di questa sezione, **prevale il principio** — segnalalo invece di eseguirlo alla lettera.

## La diagnosi

Il sito è costruito come un **catalogo**, e i cataloghi non li usa nessuno. Una griglia di 157 card risponde alla domanda «cosa avete?», che è la domanda che si fa chi ha costruito l'archivio, non chi ci arriva.

Chi ci arriva sta vivendo uno di due momenti, e non ce n'è un terzo:

- **La ricerca mirata.** «Ho questa canzone in testa, sta suonando adesso, l'ho appena sentita — cosa c'è dietro?» L'utente sa già il titolo. Vuole la risposta in dieci secondi. È anche il momento che porta traffico dai motori di ricerca («significato di…», «chi ha scritto…»).
- **Il vagabondaggio.** «Non sto cercando niente, stupiscimi.» L'utente vuole scoprire qualcosa che non sapeva su una canzone che ama già.

Oggi il sito serve male entrambi perché è ottimizzato per un terzo caso che non esiste. Quasi tutti i difetti elencati nelle fasi seguenti sono sintomi di questo.

## I sei principi

Applicali sempre, anche nei punti che il brief non copre esplicitamente.

**P1 — Il costo di un click sbagliato deve tendere a zero.**
È la leva più importante e non richiede di aggiungere funzioni. Oggi ogni gesto esplorativo si paga: apri una scheda e perdi il punto in cui eri, il tasto Indietro non ti riporta, clicchi il nome della band e il mondo si trasforma senza preavviso. Quando esplorare costa, la gente smette di esplorare dopo tre tentativi, e un archivio non esplorato è un archivio morto. Ogni gesto dev'essere reversibile, ogni stato indirizzabile, ogni posizione di lettura preservata.

**P2 — Il premio prima del contesto.**
La scheda oggi è una piramide rovesciata: duecento parole di prosa e poi, in fondo, la frase iconica — che è il punto in cui la promessa del sito («non ti diamo il testo, ti diciamo cosa c'è dietro») e il premio finalmente si incontrano. L'ordine va invertito: gancio, frase, contesto.

**P3 — L'unità del sito è la canzone, non l'archivio.**
Il sito promette «informazioni in pillole». Una pillola è qualcosa che si prende, si tiene e si passa a qualcuno. Una pillola che si può assumere solo scorrendo davanti alle altre centocinquantasei non è una pillola. Ogni canzone deve essere una cosa che esiste da sola, con un indirizzo proprio.

**P4 — La ricerca è la home page, non una sua funzione.**
Nel caso d'uso principale l'utente arriva già sapendo cosa cerca. Il campo di ricerca non è un elemento fra gli altri nella pagina: è l'elemento. Tutto il resto viene dopo, in ordine di quanto aiuta chi *non* sa cosa cercare.

**P5 — Il colore della band è identità su una pagina, rumore in una griglia.**
L'idea del colore per band/album è la migliore intuizione visiva del progetto e va difesa. Ma in una griglia di 157 colori scorrelati non veicola nessuna informazione: l'occhio non può leggerci un sistema. Sulla pagina di una singola canzone, invece, diventa l'identità di quella scheda — l'unica cosa che vedi. Quindi: colore pieno e protagonista sulla scheda, ridotto a un accento minimo nella griglia, e cornice dell'interfaccia rigorosamente neutra perché il colore variabile resti leggibile come segnale.

**P6 — La fiducia è una funzione dell'interfaccia, non una frase.**
«Informazioni verificate» oggi è affermato nell'introduzione e non dimostrato mai. Dimostrarlo significa elementi concreti in pagina: una firma, una data di ultima verifica, un modo visibile per segnalare un errore, fonti chiamate per nome. Fanno per la credibilità più di qualsiasi dichiarazione d'intenti.

## Regola per i casi non coperti

Quando il brief non dice cosa fare, chiediti **quale dei due momenti stai servendo** e ottimizza per quello. Se il dubbio resta, scegli l'opzione che rende più economico tornare indietro (P1).

---

## Come usare questo documento

Gli interventi sono in due fasi. **La Fase 1 si esegue su `index.html` così com'è** e ripara cose rotte: va completata e verificata prima di aprire la Fase 2. **La Fase 2 separa i dati dalla presentazione** e sblocca ciò che nella Fase 1 non è raggiungibile (pagine per canzone e per artista, SEO, controlli automatici).

Ogni intervento ha un **criterio di accettazione** verificabile. Non considerare fatto un punto finché il criterio non è soddisfatto. Se un criterio non è raggiungibile, fermati e segnalalo invece di aggirarlo.

L'ordine dentro ogni fase è per rapporto impatto/rischio: eseguilo in quell'ordine.

---

## Vincoli

- **Non introdurre framework né dipendenze** in Fase 1. Vanilla JS, come adesso.
- **Non riscrivere il contenuto editoriale delle schede.** I testi delle 157 schede sono lavoro d'autore: si toccano solo i punti indicati esplicitamente.
- **Lavora a piccoli commit**, uno per intervento, con il codice dell'intervento nel messaggio (es. `F3: riordina anche le section nell'ordinamento`).
- Il file è grande: usa modifiche mirate, non riscritture integrali.

## Cosa NON rompere

Queste cose funzionano già bene e vanno preservate esattamente come sono:

- `lang="it"`, viewport, charset, set completo di favicon.
- Lo script inline nel `<head>` che applica il tema salvato prima del rendering (evita lo sfarfallio). Va lasciato dov'è e com'è.
- La struttura a token del tema chiaro/scuro (`:root`, `@media (prefers-color-scheme: dark)` con guardia `:root:not([data-theme="light"])`, `:root[data-theme="dark"]`). È implementata correttamente.
- `target="_blank" rel="noopener"` su tutti i 567 link esterni. Nessuna eccezione, mantenerlo.
- `loading="lazy"` e l'attributo `title` su tutti gli iframe Spotify.
- L'ordine dei campi della scheda (artista, anno, album, genere, ascolti, corpo, frase iconica, curiosità, crediti, fonti). È la costanza che tiene insieme l'archivio.
- L'idea del colore per band/album. Va resa sicura, **non** eliminata.

## Decisioni già prese — non riaprirle

1. **Il pulsante «Leggi il testo» resta.** Non va rimosso. Va invece verificato che ogni atterraggio porti davvero al testo della canzone giusta, e vanno colmate le schede che oggi non ce l'hanno. Vedi F7.
2. **Fase 1 prima, Fase 2 dopo.** Non anticipare la separazione dei dati durante la Fase 1.
3. Il colore per band resta. Si corregge il contrasto, non si abbandona l'idea.

---

# FASE 1 — Riparazioni su `index.html`

## F1 · Contrasto in tema scuro

**Problema.** Il titolo di ogni brano usa il colore della band grezzo. Su 157 titoli, **148 sono sotto il rapporto di contrasto 4,5:1** contro lo sfondo scuro `#15121C`, e 8 sono a **1,06:1**, cioè invisibili (`Hurt`, `Paint It Black`, `Welcome to the Black Parade`, `Ace of Spades`, `Break Stuff`, `Closer`, `The Sound of Silence`, `Sober`). In tema chiaro ne falliscono 13. Il pulsante `.links a.primary` usa testo bianco fisso su colore band: 12 casi sotto soglia, il peggiore a 2,50:1.

**Dove.** Nel `<style>`: le regole `.song-title { … color: var(--accent); }` e `.links a.primary { background: var(--accent); … color: var(--on-accent); }`.

**Cosa fare.** Il rimedio è già presente altrove nel file — lo usi per `.meta-row .rank-badge` e `.artist-more a`:

```css
color: color-mix(in srgb, var(--accent) 55%, white 45%);
```

Estendi lo stesso trattamento, dentro i blocchi `:root:not([data-theme="light"])` e `:root[data-theme="dark"]`, a:

- `.song-title` — schiarisci `--accent` in tema scuro;
- `.links a.primary` — lo sfondo va schiarito in tema scuro e, in tema chiaro, il testo deve passare a nero quando `--accent` è troppo luminoso per il bianco.

Per il pulsante primario non basta il `color-mix`: serve una scelta di testo bianco/nero in base alla luminanza dello sfondo. Definisci `--on-accent` per scheda invece che globalmente, oppure usa `color: light-dark()` / una classe applicata alle sole schede interessate. Se scegli la strada della classe, i 12 brani interessati sono: Happy Song, Smells Like Teen Spirit, Sonne, Africa, Yellow, Diventerai una star, Get Lucky, Felicità, Fat Lip, Più bella cosa, All the Small Things, Questo piccolo grande amore.

**Criterio di accettazione.** Scrivi uno script che estragga i 157 `--accent` dagli attributi `style` delle `<section class="song">` e calcoli il contrasto WCAG del colore risolto (dopo `color-mix`) contro `#FDFCFF` e `#15121C`, e del testo del pulsante contro il proprio sfondo. **Zero valori sotto 4,5:1 in entrambi i temi.** Salva lo script nel repo come `scripts/check-contrasto.mjs`: servirà anche in Fase 2.

---

## F2 · Il filtro per genere non filtra per genere

**Problema.** In `runSearch()` ogni scheda è ridotta a `haystack = card.textContent + section.textContent`, cioè il testo integrale della scheda comprese le fonti. I chip cercano una **sottostringa** dentro quella massa. Non esiste da nessuna parte un campo genere su cui confrontare. Risultati verificati:

| Filtro | Restituisce a torto | Perché |
|---|---|---|
| RAP / HIP HOP | Bohemian Rhapsody | il testo dice «il **rap**porto complicato con Mary» |
| ELETTRONICA | Wish You Were Here | il testo dice «il **disco** dedicato a Syd Barrett» |
| ELETTRONICA | Bohemian Rhapsody | tra le fonti c'è u**Disco**verMusic |
| ITALIANA | Bohemian Rhapsody | il testo dice «frasi in **italian**o storpiato» |
| POP | Imagine, Hey Jude | «**pop**olarità» |

La parola chiave `disco`, in un archivio musicale italiano, compare quasi ovunque nel senso di «album».

**Cosa fare.**

1. Il genere dichiarato **esiste già** in ogni card, nello `<span class="card-genre">`. Ci sono però **78 stringhe distinte in testo libero**, con incoerenze da normalizzare: `Rock alternativo` / `Alternative rock`, `Pop italiana` / `Pop italiano`, `Rock / Nu-metal` / `Rock / Nu metal`, `Pop / R&amp;B` / `Pop / R&B / Soul`.
2. Costruisci una tabella di normalizzazione dalle 78 stringhe alle 6 categorie musicali dei chip (`rock`, `metal`, `pop`, `punk`, `rap`, `elettronica`). Un brano può appartenere a più categorie: `Rap metal` → `rap` **e** `metal`.
3. Scrivi il risultato come attributo esplicito su ogni `<section class="song">` e sulla card corrispondente: `data-generi="rap metal"`.
4. **`Italiana` non è un genere, è una provenienza.** Va su un attributo separato, `data-paese="it"`, e il chip corrispondente va spostato o etichettato come tale nell'interfaccia.
5. Riscrivi il confronto in `runSearch()`: i chip fanno **match esatto** contro i token di `data-generi` (o `data-paese`), mai ricerca testuale.
6. La ricerca libera resta full-text ma **su campi dichiarati** — titolo, artista, album, genere, frase iconica — non sul `textContent` dell'intera scheda. Oggi digitando «rolling» escono risultati perché fra le fonti c'è Rolling Stone: è rumore.

**Criterio di accettazione.** I conteggi per chip devono avvicinarsi a questi valori, calcolati dai generi dichiarati:

| Chip | Oggi | Atteso |
|---|---:|---:|
| ROCK | 83 | ~75 |
| METAL | 50 | ~52 |
| POP | 52 | ~59 |
| PUNK | 20 | ~17 |
| RAP / HIP HOP | 33 | **4** |
| ELETTRONICA | 33 | **9** |
| ITALIANA | 30 | ~24 |

Verifica puntuale: cliccando **RAP / HIP HOP** devono comparire esattamente *Killing in the Name*, *Lose Yourself*, *Vieni a ballare in Puglia*, *Bulls on Parade* — e nient'altro. Cliccando **ELETTRONICA** non deve comparire nessun brano dei Pink Floyd né dei Queen.

---

## F3 · L'ordinamento riordina l'indice ma non le schede

**Problema.** Il gestore di `sortSelect` esegue `sorted.forEach(entry => cardGrid.appendChild(entry.card))`: sposta solo le card. Le 157 `<section>` restano nell'ordine originale. Da quel momento indice e documento divergono, e i numeri `#1…#157` stampati sulle card sono numeri di posizione originale, quindi la sequenza appare scombinata.

**Cosa fare.** Nello stesso ciclo, riordina anche le `<section class="song">` dentro `<main>`, con lo stesso comparatore. Contestualmente applica **F10** (il numero sulla card non deve più leggersi come una classifica).

**Criterio di accettazione.** Dopo aver scelto «Ascolti Spotify»: l'ordine delle card nella griglia e l'ordine delle schede in `<main>` coincidono, verificato leggendo il DOM. Scorrendo dalla prima scheda in poi si incontrano i brani nello stesso ordine dell'indice.

---

## F4 · Il nome della band non porta alla band

**Problema.** È il difetto che l'autore percepisce come più fastidioso. Cliccando il nome dell'artista non parte nessuna navigazione: `selectArtistFilter()` imposta il menu artista, nasconde le altre 156 canzoni e sposta la vista. Non esiste nessuna pagina o sezione «Queen» dove arrivare. In dettaglio:

- **Atterraggio incoerente.** Se l'artista è tra i 32 con biografia scritta a mano nell'oggetto `artistBios`, si atterra sul riquadro `#artist-bio`; se è tra i 72 senza, si atterra sulla prima card della griglia filtrata. In termini di schede: **83 su 157 mostrano qualcosa sull'artista, 74 su 157 non mostrano nulla.**
- **`href` finto.** Tutte e 157 le occorrenze nella scheda sono `<a href="#filter-bar" class="artist" data-artist="…">`, con `preventDefault()`. Quindi: la barra di stato mostra `#filter-bar`; **Cmd+click e rotellina aprono l'archivio non filtrato**; «copia indirizzo link» produce un URL inservibile.
- **HTML non valido.** Nella griglia, tutte e 157 le card contengono `<a class="card">…<button class="card-artist">…</button>…</a>`. Le specifiche vietano contenuto interattivo dentro un `<a>`: la navigazione da tastiera diventa ambigua e il click «cade» in modo imprevedibile fra due bersagli adiacenti.
- **Nessuna cronologia.** `selectArtistFilter()` non chiama né `pushState` né `replaceState`: il tasto Indietro non annulla il filtro.
- Il riquadro `#artist-bio` sta in testa al documento, sopra la griglia: cliccando la band dalla scheda 90 si viene riportati all'inizio della pagina.

**Cosa fare.**

1. **Crea il luogo.** Una vista artista **generata dai dati che ci sono già** — nome, elenco dei brani in archivio con anno e ascolti, arco temporale, generi ricorrenti — così funziona per tutti e 104 gli artisti subito. La biografia scritta a mano diventa un blocco **opzionale** in cima quando esiste, non più la condizione che decide se la funzione fa qualcosa. In Fase 1 può essere una sezione ancorabile (`#artista/queen`); in Fase 2 diventa una pagina.
2. **Rendi il link un link.** `href` reale verso quel luogo, e togli il `preventDefault()`. Cmd+click, copia indirizzo e barra di stato tornano a dire la verità senza codice aggiuntivo.
3. **Sfila il pulsante dall'ancora.** Nella card, il nome dell'artista diventa un `<a>` fratello della card, non annidato dentro. Se resta dentro l'area della card, deve essere visivamente distinguibile (sottolineato o con icona) perché è un bersaglio diverso.
4. **`pushState`** quando si applica un filtro artista, così Indietro lo annulla.

**Criterio di accettazione.** Cliccando il nome della band da una qualsiasi delle 157 schede si arriva a una vista che mostra almeno: nome artista, elenco completo dei suoi brani in archivio, anni. Vale per tutti e 104 gli artisti, non per 32. Cmd+click apre la stessa vista in una nuova scheda. Il tasto Indietro riporta al punto di partenza. Il validatore W3C non segnala più contenuto interattivo annidato.

---

## F5 · Il tasto Indietro non funziona

**Problema.** I click sulle ancore chiamano `history.replaceState`, che *sostituisce* la voce di cronologia invece di aggiungerne una. Il tasto Indietro porta fuori dal sito anziché all'indice. Su un archivio si naviga per tentativi — guardo, apro, torno — e qui il gesto di ritorno più universale non funziona.

**Cosa fare.** `pushState` al posto di `replaceState` nel gestore dei link `a[href^="#"]`. Aggiungi un handler `popstate` che riporti alla posizione precedente. Il link «Torna all'indice» deve riportare **alla card di partenza**, non in cima alla pagina.

**Criterio di accettazione.** Apri una scheda dall'indice, premi Indietro: torni all'indice nella posizione da cui eri partito, con eventuali filtri attivi intatti.

---

## F6 · I link agli ascolti non portano al dato

**Problema.** Tutti e **68** i link etichettati `kworb.net (ascolti Spotify)` puntano allo stesso identico indirizzo, `https://kworb.net/spotify/`, che è l'indice generale del sito. Verificato: da lì il numero di ascolti di un singolo brano non è raggiungibile con una ricerca diretta. È la citazione del dato più controllabile della scheda, e non porta al dato.

**Cosa fare.** Una delle due, in ordine di preferenza:

1. Link diretto alla pagina del brano: `https://kworb.net/spotify/track/<spotify_id>.html`. Gli ID Spotify sono già nel repo, negli `src` dei 39 iframe; per gli altri vanno recuperati (vedi F11). **Verifica che la pagina risponda 200 prima di scriverla**: non tutti i brani hanno una pagina su kworb.
2. Dove la pagina per brano non esiste, togli il link e sostituiscilo con una datazione onesta: `3,2 mld ascolti (Spotify, rilevato ad agosto 2026)`.

**Criterio di accettazione.** Zero link a `kworb.net/spotify/` senza percorso. Ogni link kworb rimasto risponde 200 e riguarda il brano della sua scheda.

---

## F7 · I link ai testi: verificare gli atterraggi e colmare i buchi

**Il pulsante resta.** La decisione è presa: non va rimosso. Va reso affidabile.

**Situazione.** 102 schede hanno il pulsante `Leggi il testo (fonte esterna)` verso `letras.com`. **53 schede su 157 non ce l'hanno affatto**, pur essendo una funzione che l'introduzione presenta come parte del formato. Due schede usano fonti diverse dalle altre: *Raining Blood* → `lyricstranslate.com`, *Angel of Death* → `readdork.com`.

Molti URL di letras sono opachi, con ID numerici che non permettono di capire a occhio dove portano — per esempio `letras.com/nirvana/28494/`, `letras.com/michael-jackson/63736/`, `letras.com/battisti-lucio/579083/`. Un campione di 4 verificato a mano risulta corretto (In the End, Hotel California, Il mio canto libero, Felicità), quindi il tasso d'errore atteso è basso, ma **non è stato verificato sui restanti 98**.

**Cosa fare.**

1. **Verifica automatica di tutti i 102 atterraggi.** Script che, per ogni link, scarichi la pagina ed estragga titolo e artista dai metadati, confrontandoli con quelli della scheda. Normalizza prima del confronto (minuscole, senza accenti né punteggiatura) e tieni conto delle varianti legittime: `The Eagles` / `Eagles`, `Al Bano e Romina Power` / `Al Bano and Romina Power`, `Simon & Garfunkel` / `Simon e Garfunkel`. Produci un report con tre esiti: **ok**, **discordante**, **irraggiungibile**. Correggi i discordanti a mano.
2. **Colma le 53 schede senza il link.** Cerca il brano su letras.com e verifica l'atterraggio con lo stesso script prima di scrivere l'URL. Se per un brano il testo non esiste su letras, usa un'altra fonte — ma **dichiara quale** nell'etichetta del link (vedi F9), invece di lasciare il generico «Leggi il testo».
3. **Uniforma i due casi anomali** (*Raining Blood*, *Angel of Death*) allo stesso trattamento degli altri.

**Criterio di accettazione.** Tutte e 157 le schede hanno il pulsante. Lo script di verifica riporta 157 «ok» e zero «discordante»/«irraggiungibile». Salva lo script come `scripts/check-testi.mjs`.

> **Nota per l'autore, non per l'agente.** Resta aperta una questione che il codice non può risolvere: `letras.com` è una piattaforma collaborativa che non espone licenze con gli editori musicali, mentre l'introduzione del sito rivendica di non riprodurre i testi. La verifica tecnica richiesta qui rende i link affidabili, non risolve quella tensione. Se in futuro si volesse chiuderla, le strade sono una fonte licenziata (Musixmatch, sito ufficiale dell'artista) oppure una riformulazione della frase in home page che dica apertamente cosa fa il pulsante.

---

## F8 · Wikipedia italiana dove esiste

**Problema.** 134 schede linkano `en.wikipedia.org`, solo 16 `it.wikipedia.org`. Un lettore italiano finisce su un articolo in inglese nell'89% dei casi. Sette schede non hanno alcun link a Wikipedia, e **sei di queste sette sono italiane**: *La solitudine*, *Ma il cielo è sempre più blu*, *Sally*, *4 marzo 1943*, *Marmellata #25*, *Ragù* (la settima è *Don't Look Back in Anger*). Per almeno tre di esse l'articolo su Wikipedia in italiano esiste.

**Cosa fare.** Per ogni link a `en.wikipedia.org`, interroga l'API dei *langlinks* di Wikipedia per verificare se esiste la versione italiana; se esiste, sostituisci l'URL. Dove resta l'inglese, etichetta il link `Wikipedia (EN)` così il lettore lo sa prima di cliccare. Aggiungi il link mancante alle sette schede che ne sono prive.

**Criterio di accettazione.** Nessun link a `en.wikipedia.org` per cui esista la controparte italiana. Tutte e 157 le schede hanno un link a Wikipedia o una nota esplicita che spiega perché no.

---

## F9 · Testi dei link descrittivi

**Problema.** 150 link hanno il testo identico `Wikipedia`, 104 `Leggi il testo (fonte esterna)`, 53 `Approfondisci (fonte esterna)`. Chi naviga con screen reader può chiedere l'elenco dei link della pagina e ottiene 150 voci indistinguibili: è il criterio WCAG 2.4.4, e qui rende la pagina inutilizzabile in quella modalità. `Approfondisci` non dice se si finirà su Rolling Stone o su un blog, cioè toglie al lettore l'unica informazione con cui deciderebbe se fidarsi. `(fonte esterna)`, ripetuto 157 volte, è rumore che `target="_blank"` e un'icona comunicano meglio.

**Cosa fare.** Il testo del link nomina la fonte e il contesto: `Bohemian Rhapsody su Wikipedia`, `L'intervista a Brian May su Rolling Stone`. Togli `(fonte esterna)` ovunque, sostituendolo con un'icona più `aria-label`.

**Criterio di accettazione.** Nessun testo di link compare più di tre volte identico nell'intero documento. La stringa `(fonte esterna)` non compare più.

---

## F10 · Rifiniture dell'indice

Interventi piccoli, indipendenti fra loro, tutti visibili all'utente.

- **Contatore sempre visibile.** Oggi `runSearch()` azzera l'etichetta quando nessun filtro è attivo, quindi non si vede mai il totale e manca il termine di paragone. Mostra `157 brani` a riposo e `83 di 157` quando si filtra.
- **Chip «Tutti» per i generi.** Oggi l'unico modo di azzerare un genere è ricliccare il chip attivo, comportamento che nessuno scopre — mentre il menu «Artista» un «Tutti» ce l'ha. Due controlli affiancati che si azzerano in modi diversi. Aggiungi il chip e una «Azzera tutto», con i filtri attivi mostrati come etichette rimovibili.
- **Anno al posto del numero sulla card.** Il numero da 1 a 157 sta in posizione da classifica ma è l'ordine di inserimento; accanto agli ascolti, in un'interfaccia che permette di ordinare per ascolti, si legge inevitabilmente come un ranking. Toglilo (o rendilo `scheda 47`, piccolo e grigio) e metti l'anno, che è già un criterio di ordinamento e oggi sulla card non c'è.
- **Allineamento delle card.** Nella stessa riga della griglia, il numero di ascolti sta ad altezze diverse perché alcuni titoli vanno su due righe. `display:flex; flex-direction:column` sulla card e `margin-top:auto` sulla riga degli ascolti.
- **Debounce sulla ricerca** a 150 ms: oggi ogni tasto premuto scorre 157 voci e riscrive le classi di 314 elementi.
- **Stato vuoto utile.** Oggi è solo `Nessun risultato per x`. Proponi tre schede a caso o i generi disponibili: un vicolo cieco è dove si chiude la scheda del browser.
- **Meta description.** Dice ancora `138 schede`, l'archivio è a 157. Correggi, e in Fase 2 genera il numero automaticamente.

**Criterio di accettazione.** Ognuno dei punti verificato a mano nel browser, in entrambi i temi, a larghezza desktop e a 390 px.

---

## F11 · Player Spotify mancanti

**Problema.** Gli iframe sono **39 su 157 schede**. Le altre 118 non hanno il player. E poiché sono proprio le prime 39 in ordine di documento ad averlo, il sito sembra coerente finché non si scorre: chi arriva sui brani italiani, sui Bring Me the Horizon o sui Sum 41 trova schede mutilate rispetto a quelle viste prima.

**Cosa fare.** Recupera gli ID Spotify mancanti tramite l'API di ricerca di Spotify (richiede credenziali Client Credentials — chiedile all'autore) e aggiungi gli embed con gli stessi attributi di quelli esistenti: `loading="lazy"`, `title="<Titolo> su Spotify"`, stessa altezza. Se per un brano il player non esiste davvero, scrivilo nella scheda invece di lasciare un buco.

**Criterio di accettazione.** 157 schede con player, oppure con una nota esplicita che ne spiega l'assenza. Gli ID recuperati vanno salvati: servono anche a F6.

---

## F12 · Prima schermata e coerenza visiva

> Applica **P4**: la ricerca è la home page, non una sua funzione.

**Una home che mostra tutto non mostra niente.** Oggi la prima schermata è occupata quasi per intero dal logo disegnato a mano, seguito da un paragrafo la cui seconda metà è un disclaimer legale; sotto parte subito la griglia di 157 card. Vanno mostrate **tre cose, non centocinquantasette**:

1. Logo compresso a circa un terzo dell'altezza attuale — è buono e ha personalità, si comprime, non si sostituisce — una riga sola che dice cosa si trova sul sito, e **un campo di ricerca grande**, l'elemento dominante della pagina.
2. **La pillola del giorno**: una scheda per intero, scelta a rotazione, subito leggibile senza altri click.
3. **Due o tre collezioni curate** (in Fase 1 possono essere segnaposto statici; il meccanismo vero arriva in Fase 2) e un link **«Sfoglia tutto l'archivio»** che porta alla griglia completa.

La griglia di tutte le card smette di essere la home page e diventa una destinazione fra le altre.
- **Sposta il disclaimer** («mai copiando i testi originali… che potrebbero, a loro discrezione, riportare il testo») nel footer o in una pagina «Metodo e fonti». In prima posizione fa apparire il sito sulla difensiva prima di aver mostrato cosa sa fare.
- **Togli «Cerca o filtra per genere qui sotto».** Un'interfaccia che spiega come si usa ammette di non essere evidente; il segnaposto del campo di ricerca, che è già scritto bene, basta. Al suo posto una promessa: cosa trova il lettore.
- **Disciplina la palette.** Oggi nella prima schermata convivono quattro accenti scorrelati: sottotitolo verde, contorno di focus arancione, titolo del brano nel colore della band, logo nero pieno. Con 157 palette in arrivo dalle band, la cornice fissa deve essere neutra, altrimenti non si capisce quale colore stia dicendo qualcosa. Un solo accento di sistema per filtri, focus e controlli; il colore della band resta l'unico colore variabile.
- **Pulsante del tema.** Oggi è un cerchio fisso in alto a sinistra, fuori dalla colonna, senza etichetta, che su finestre strette rischia di sovrapporsi al testo. Portalo dentro l'intestazione accanto agli altri controlli, con `aria-label` e `aria-pressed`.

---

## F13 · Fonti deboli

**Problema.** «Informazioni verificate» è l'unica promessa distintiva del sito, e una catena vale quanto il suo anello più debole. Accanto a Rolling Stone, Washington Post, NME, Billboard e American Songwriter compaiono:

| Fonte | Usi | Problema |
|---|---:|---|
| `songtell.com` | 7 | Analisi senza metodologia dichiarata. Verificato: cita «Official Pantera Biography» come fonte, senza link. |
| `musicianwages.com` | 2 | Sito sui compensi dei musicisti che pubblica «the meaning behind the song X» in serie. |
| `helpmeiaminhell.fandom.com` | 1 | Wiki di fan, editabile da chiunque, senza revisione. |
| `donnaglamour.it` | 3 | Rotocalco di intrattenimento citato su significato di testi. |
| `tag24`, `wonderchannel`, `noidegli8090`, `ilpitagora` | 7 | Blog senza redazione musicale identificabile. |
| `washingtonpost.com` | 1 | Paywall: il lettore non può verificare. |

Inoltre: *Marmellata #25* linka **due volte lo stesso URL** di donnaglamour, una come «Approfondisci» e una come «Donna Glamour». E il link «Wikipedia» di *Cattiva* porta alla pagina dell'artista (`Naska (singer)`), non a quella della canzone.

**Cosa fare.** Non è un intervento di codice: è editoriale. **Segnala le ~20 schede interessate all'autore** con un elenco, senza modificarle di tua iniziativa. Correggi invece direttamente i due errori puntuali (link duplicato, Wikipedia di *Cattiva*).

---

## F14 · Controlli automatici

Prima di chiudere la Fase 1, aggiungi al repo tre script eseguibili a mano (e in Fase 2 in fase di build):

- `scripts/check-link.mjs` — verifica che ogni URL risponda 200, che non ci siano URL duplicati dentro la stessa scheda, e che ogni scheda abbia il set minimo di link previsto dal formato.
- `scripts/check-contrasto.mjs` — da F1.
- `scripts/check-testi.mjs` — da F7.

**Criterio di accettazione.** I tre script girano puliti.

---

## F15 · Invertire la struttura della scheda

> Applica **P2**: il premio prima del contesto.

**Problema.** Ogni scheda apre con 180-200 parole di prosa continua e mette la **frase iconica** al quarto posto, dopo il corpo. È la piramide rovesciata: la frase iconica più il suo perché sono il punto esatto in cui la promessa del sito e il premio si incontrano — è la cosa che uno fotograferebbe e manderebbe a un amico — e sta in fondo.

**Cosa fare.** Riordina i blocchi dentro `<section class="song">` in questo ordine:

1. riga di metadati (invariata);
2. titolo (invariato);
3. **gancio** — una o due righe, il fatto più sorprendente, in evidenza tipografica (vedi nota sotto);
4. **frase iconica** con la sua spiegazione, promossa qui dal fondo;
5. player Spotify;
6. corpo della scheda;
7. curiosità, crediti, fonti (invariati).

Lo spostamento della frase iconica è **meccanico** e va fatto in Fase 1 su tutte e 157 le schede.

Il **gancio** invece è testo nuovo e non va inventato dall'agente: le schede sono lavoro d'autore. Predisponi il contenitore (`<p class="hook">`) e la resa tipografica, lascialo vuoto o nascosto dove il testo manca, e consegna all'autore l'elenco delle 157 schede da riempire. Quando ci sarà, servirà anche come `meta description` e come testo dell'anteprima social in Fase 2: si scrive una volta e vale in tre posti.

**Criterio di accettazione.** In tutte e 157 le schede la frase iconica compare prima del corpo. Il contenitore del gancio esiste ovunque e, se vuoto, non lascia spazio bianco né bordi visibili.

---

## F16 · Un modo per farsi sorprendere

> Applica il secondo momento d'uso: «non sto cercando niente, stupiscimi».

**Problema.** Il sito offre solo strumenti per chi sa già cosa vuole — ricerca, filtri, ordinamenti. Chi non cerca niente non ha nessun appiglio, e il posizionamento stesso («informazioni in pillole») promette esattamente l'esperienza che manca.

**Cosa fare.**

- Un pulsante **«Sorprendimi»** vicino alla ricerca, che apre una scheda a caso. In Fase 1 è una manciata di righe di JS.
- La **pillola del giorno** in home (vedi F12): una scheda scelta in modo deterministico dalla data, così è la stessa per tutti nell'arco della giornata ed è un motivo per tornare.

**Criterio di accettazione.** Entrambi presenti e funzionanti; «Sorprendimi» non ripropone la stessa scheda due volte di seguito.

---

## F17 · Rendere visibile la fiducia

> Applica **P6**: la fiducia è una funzione dell'interfaccia, non una frase.

**Problema.** «Ogni scheda è scritta con parole nostre e verificata su fonti pubbliche» è l'unica promessa distintiva del sito, ed è solo asserita. Non si sa chi scrive, chi verifica, con quale metodo, quando è stata controllata l'ultima volta, né come segnalare un errore.

**Cosa fare, tutto in Fase 1.**

- Una pagina o sezione **«Metodo e fonti»**: chi c'è dietro, come si verifica un dato, quale gerarchia di fonti è ammessa (vedi F13), come si segnala un errore. Il testo è dell'autore: predisponi la pagina e chiedigli il contenuto.
- Una **firma** visibile nel footer.
- Un **«Segnala un errore»** in fondo a ogni scheda — un `mailto:` precompilato con titolo e slug della canzone è sufficiente e non richiede backend.
- Sposta qui il disclaimer sui testi che oggi occupa metà del paragrafo introduttivo in home page (vedi F12): in prima posizione fa apparire il sito sulla difensiva prima di aver mostrato cosa sa fare, mentre in una pagina sul metodo è esattamente dove chi vuole verificare lo cerca.
- La **data di ultima verifica per scheda** richiede un campo nei dati: rimandala alla Fase 2, ma tienine conto nello schema.

**Criterio di accettazione.** Da qualunque scheda si raggiunge in un click sia il metodo sia il modo di segnalare un errore.

---

# FASE 2 — Separare i dati dalla presentazione

Da aprire **solo dopo** che la Fase 1 è completa e verificata.

## Perché

Le 157 schede sono oggi HTML scritto a mano. Finché è così, ogni numero è scritto due volte (ed è già successo: la meta description dice 138), ogni controllo va fatto a occhio, e non è possibile avere né pagine per canzone né pagine per artista. Separando i dati, quasi tutto il resto diventa meccanico.

## Cosa fare

1. **Estrai le 157 schede in un file dati** — JSON o Markdown con front-matter — con campi normalizzati: `slug`, `titolo`, `artista`, `anno`, `album`, `generi` (lista, da F2), `paese`, `colore`, `ascolti`, `spotify_id`, `gancio` (da F15), `frase_iconica`, `corpo`, `curiosita`, `crediti`, `fonti` (lista tipizzata: tipo, url, etichetta), `temi` (lista, per le collezioni), `verificata_il` (data, da F17).
2. **Genera `index.html` da quei dati**, con un generatore minimo in Node. Nessun framework obbligatorio; se si vuole andare su Next.js o Astro, va bene, ma non è necessario.
3. **Una pagina per canzone**, `/canzone/<slug>`, generata staticamente.
4. **Una pagina per artista**, `/artista/<slug>`, dai dati aggregati — è la forma definitiva di F4.
5. **Metadati per pagina**: `<title>` del tipo `Bohemian Rhapsody – Queen, 1975 | Dietro il testo`, meta description **dal gancio** (F15), `canonical`, Open Graph (`og:title`, `og:description`, `og:image`) e JSON-LD `MusicRecording` collegato a `MusicGroup`. Oggi un link incollato in chat non produce nessuna anteprima.
6. **Collezioni curate** — `/collezione/<slug>` generate dal campo `temi`: «canzoni nate da una rottura», «brani scritti in mezz'ora», «pezzi che l'artista ha poi rinnegato». È ciò che trasforma un archivio in un posto dove si torna, e serve il secondo momento d'uso meglio di qualsiasi filtro. Il materiale è già dentro le schede: manca solo il tag. La lista dei temi la decide l'autore; tu predisponi il meccanismo e proponi una prima tassonomia leggendo i corpi delle schede.
7. **Immagine condivisibile della frase iconica** generata per ogni canzone (frase, artista, colore del disco, logo), usata come `og:image` e offerta in download. È l'unico elemento del progetto che può circolare da solo e riportare traffico.
8. **Data di ultima verifica** mostrata su ogni scheda, dal campo `verificata_il` (chiude F17).
9. **`robots.txt` e `sitemap.xml`** generati dai dati. Oggi entrambi restituiscono 404.
10. **Ogni numero visibile viene generato dai dati.** Nessun conteggio scritto a mano, mai più.
11. **I tre script di F14 entrano nella build** e la fanno fallire se un controllo non passa.

## Criterio di accettazione della Fase 2

- Ogni canzone ha un URL proprio, condivisibile, che produce un'anteprima corretta quando incollato in una chat.
- Ogni artista ha una pagina, tutti e 104.
- `sitemap.xml` elenca tutte le pagine; `robots.txt` risponde 200.
- Rigenerando il sito da zero si ottiene un output identico: nessun contenuto vive solo nell'HTML.

---

# Cosa serve dall'autore

Da chiedere prima o durante l'esecuzione, non da indovinare:

1. **Credenziali Spotify** (Client ID e Secret, flusso Client Credentials) per F11.
2. **Decisione sulle ~20 schede con fonti deboli** (F13): rifarle con fonti migliori, o rimuoverle dall'archivio.
3. **I 157 ganci** (F15): una o due righe per scheda, il fatto più sorprendente. È il testo che poi vale anche come meta description e come anteprima social. Consegnagli l'elenco delle schede con il primo paragrafo attuale a fianco, così ha il contesto sotto gli occhi mentre scrive.
4. **Il testo della pagina «Metodo e fonti»** e la firma (F17).
5. **Conferma sulla riformulazione della prima schermata** (F12): la riga di promessa che sostituisce «Cerca o filtra per genere qui sotto» è contenuto editoriale.
6. **La tassonomia dei temi** per le collezioni (Fase 2): proponi tu una prima lista leggendo le schede, ma la scelta finale è sua.

---

## Nota finale per l'agente

Le fasi qui descritte riparano e ricostruiscono, ma il contenuto editoriale delle 157 schede è la parte di valore del progetto e non è tua da riscrivere. Quando un intervento richiede parole nuove, **predisponi il contenitore e chiedi il testo** — non riempirlo di tuo. Quando invece un intervento è meccanico (spostare un blocco, normalizzare un attributo, correggere un URL), fallo per tutte e 157 le schede senza eccezioni: le incoerenze parziali sono il difetto che questo archivio ha già oggi, ed è quello che fa sembrare abbandonato un sito che non lo è.
