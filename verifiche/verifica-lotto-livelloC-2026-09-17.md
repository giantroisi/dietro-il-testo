# Verifica del lotto «livello C» (12 commit su 15)

**17 settembre 2026.** Sonnet sta sostituendo le fonti di livello C con fonti
di livello A/B su quindici schede. Ho riaperto nel browser le fonti nuove di
sei commit, scelti perché sono quelli che **cambiano un'affermazione**, non
solo l'indirizzo: sostituire una fonte è l'operazione più rischiosa che
esista, perché può spezzare in silenzio il legame fra quel che la scheda dice
e quel che la fonte sostiene.

## Il movimento è quello giusto

**Schede senza nessuna fonte di livello A o B: da 46 a 23 (il 7%).** E le
sostituzioni migliori sono vere escalation, non scambi di indirizzo:
- `4-marzo-1943`: via Soundsblog e Tag24, dentro **Treccani** e
  un'**intervista di Avvenire a Paola Pallottino**, che il testo l'ha scritto.
  Si risale all'autrice: è il massimo che si possa fare.
- `marinella`: via Sololibri, dentro **OndaRock** e **La Stampa** (ed. Asti,
  Carlo Francesco Conti, 31 dicembre 2012), cioè il cronista che la storia
  vera l'ha ricostruita.
- `certe-notti`: via Il Giunco, dentro **Open**, **Gazzetta di Reggio** e
  l'**albo d'oro del Club Tenco** — quest'ultimo è la fonte ufficiale del
  premio, livello A.

E due discipline nuove, che vanno segnalate perché sono il contrario di un
difetto:
- `bello-impossibile`: **tolta una citazione che nessuna fonte tracciava**
  («un uomo bello ma dall'odore sgradevole»). Togliere è più difficile che
  aggiungere.
- `cielo-blu`: «è letto **dalla** critica» diventa «è letto **da parte della**
  critica», e la scheda aggiunge il contrappeso — Gaetano che in vita deviava
  sempre le letture politiche. **La citazione l'ho verificata su Rolling Stone
  Italia ed è esatta, e il taglio è segnato con i puntini**: «Prendete le mie
  solo come canzoni d'amore… non faccio commenti politici». È esattamente la
  disciplina che a `sweet-home-alabama` manca.

## `certe-notti` — regge tutto

Verificato su Open (Chiara Piselli, 11 luglio 2020): Mario Zanni, «Bar Mario»
a San Martino in Rio vicino Correggio, e il saluto di Ligabue alla sua morte,
«Ciao Marietto» — parola per parola.

## Tre difetti, e due sono regressioni

### 1. `cielo-blu` — la fonte nominata dice il contrario del numero

La scheda scrive: «**come ha notato Rolling Stone Italia**, le vendite iniziali
furono modeste (**60-70 mila copie**)». Rolling Stone Italia, nell'articolo
citato, scrive: «**Centomila copie vendute.**»

Il numero non solo non viene da lì: **è contraddetto dalla fonte a cui è
attribuito**. Ho cercato «60», «70», «copie» anche sulla monografia OndaRock e
su R3M, le altre due fonti nuove: non c'è in nessuna delle tre. E nemmeno la
seconda metà della frase — «diventò davvero il suo brano simbolo solo più
avanti, anche dopo la sua morte» — sta in una delle tre.

È il difetto più grave del lotto, perché nominare una testata accanto a un
numero è la cosa che più fa sembrare il numero verificato.

### 2. `bello-impossibile` — le certificazioni sono del brano, non dell'album

Wikipedia, fonte citata, dice: «**The single** peaked at second place on the
Italian hit parade, being certified double platinum. It was also certified
platinum in Austria and Switzerland, and gold in Germany.»

La scheda riscritta dice: «Il brano fu la punta di diamante dell'album: **grazie
a lui "Profumo" ottenne** due dischi di platino in Italia, uno in Austria e
Svizzera, e un disco d'oro in Germania.» **Le certificazioni sono state
trasferite dal singolo all'album.**

E nella stessa riscrittura è stato **tolto** dalla frase iconica «Raggiunse il
secondo posto in classifica», che invece è vero e sta nella fonte, con dietro
un libro (Dario Salvatori, *Storia dell'Hit Parade*, 1989: livello B).

**La versione vecchia era giusta su entrambi i punti. Questa è una regressione**,
ed è il rischio proprio di questo lavoro: si riscrive per migliorare la fonte e
si perde per strada il fatto.

### 3. `generale` — il numero corretto non ha una fonte

Il commit dice «un errore vero — secondo posto era quarto». La scheda ora
scrive: «arrivò al **quarto posto** nella hit parade del 1978, mentre l'album
raggiunse l'**ottava posizione** fra i più venduti dell'anno».

- **L'ottava posizione dell'album: verificata.** Su HitParadeItalia, Top Album
  1978, «DE GREGORI — Francesco De Gregori (RCA Italiana, PL 31366)» è al
  numero 8. Esatto.
- **Il quarto posto del singolo: non verificato da nessuna delle due fonti
  nuove.** La pagina di HitParadeItalia citata è `lpe1978.html`, cioè la
  classifica **degli album**; il singolo lì non c'è. E la monografia OndaRock
  di Zuffanti **non nomina nessuna classifica**: ho cercato «classifica» e
  «quarto», zero occorrenze.

Non dico che sia falso: dico che **il numero vecchio era sbagliato e quello
nuovo non è sorretto**. Un errore corretto con un'affermazione senza fonte non
è corretto: è spostato. E vale anche per il messaggio di commit — *«secondo
posto era quarto»* è un'affermazione come tutte le altre, e ha bisogno di una
fonte come tutte le altre.

## La regolarità del lotto

Nessuno dei tre difetti riguarda la fonte scelta: le fonti nuove sono migliori
di quelle vecchie, sempre. **Tutti e tre nascono nel momento in cui si riscrive
la frase per adattarla alla fonte nuova** — un numero che si sposta di soggetto,
un numero che si sposta di documento, un fatto vero che cade. È lo stesso
rischio del `fulminacci` di ieri e di `feeling-this` di stamattina: **la
correzione è il momento più pericoloso, non quello più sicuro.**
