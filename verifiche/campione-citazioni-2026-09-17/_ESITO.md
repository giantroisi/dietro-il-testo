# Campione sulle citazioni dichiarate — esito

**17 settembre 2026.** Dodici schede sorteggiate, tutte le fonti riaperte nel
browser. La previsione è in `_PREVISIONE.md` e non è stata toccata.

## Il numero

Delle dodici sorteggiate, **due non contenevano una vera citazione**: il
campionatore ha preso per citazione il titolo di un podcast (`get-lucky`,
«Go with Elmo Lovano») e il titolo di una canzone (`il-ragazzo-della-via-gluck`,
«La risposta al ragazzo della via Gluck»), perché stanno fra virgolette accanto
a un verbo di dire. **È un difetto del mio campionatore, non delle schede**, e
va detto subito perché ha una conseguenza: **il totale di 262 citazioni
dichiarate è gonfiato dai titoli.** Il numero vero è più basso, e non lo so.

Restano **dieci schede con citazioni vere. Cinque non reggono: il 50%.**

| scheda | esito |
|---|---|
| `youve-got-another-thing-comin` | regge |
| `sally` | regge (tre citazioni, tutte alla lettera) |
| `overkill` | regge (due citazioni) |
| `goodbye-malinconia` | regge |
| `heatseeker` | regge |
| `drown` | **non regge** — attribuzione |
| `toxicity` | **non regge** — attribuzione (due citazioni) |
| `sweet-home-alabama` | **non regge** — due difetti su cinque citazioni |
| `darkside` | **non regge** — una frase virgolettata che nella fonte non c'è |
| `bohemian-rhapsody` | **non regge** — la citazione non è in nessuna delle due fonti |

Per confronto: il 24% delle affermazioni in generale, l'11% alla rilettura del
campione casuale corretto. **Le virgolette sono messe peggio del testo che le
circonda**, ed è coerente con quello che sono: la promessa più forte è anche
quella che costa di più mantenere.

## Le tre previsioni

**1) «Da 3 a 5 su 12 non reggeranno, le parole più dell'attribuzione.»**
Il numero è dentro — cinque — ma su una base di dieci, non di dodici: **la
percentuale è peggiore di quel che mi aspettavo.** E la seconda metà è
sbagliata: **a rompersi è l'attribuzione, non le parole.** Dove la citazione è
presente nella fonte, la traduzione italiana è quasi sempre fedele; il lavoro di
chi traduce regge. Quello che non regge è **da chi e a chi**.

**2) «Almeno una citazione non sarà affatto nella pagina citata.»**
Confermata, e due volte:
- `bohemian-rhapsody`: «rime casuali senza senso», attribuita a Mercury nella
  frase iconica, **non compare né sulla Wikipedia inglese né su uDiscoverMusic**,
  le due fonti della scheda. (La frase esiste ed è di Mercury, ma il sito deve
  citare la pagina che la porta, e nessuna delle sue la porta.)
- `darkside`: «timore di scivolare in un luogo più buio», virgolettato e
  attribuito a NME. NME scrive un'altra cosa: «insomnia, heartbreak and
  depression». La scheda ha virgolettato una frase propria e ha perso
  «heartbreak», che invece c'era.

**3) «Le due in frase iconica reggeranno, perché l'attenzione ci è già passata.»**
**Sbagliata su entrambe.** Le due in frase iconica sono `drown` e
`bohemian-rhapsody`, e sono le due messe peggio del campione. **La riga più
esposta del sito non è la meglio protetta.** I tre controlli che guardano la
frase iconica cercano il ricopiato, le citazioni nude e i versi: **nessuno
guarda se la citazione sia nella fonte.**

## Il difetto sistematico

Tre dei cinque sono lo stesso errore, e con `feiling-this` corretto stamattina
fanno quattro in un giorno: **la testata che RIPORTA una frase viene scritta
come la testata che l'ha RICEVUTA.**

- `drown`: «definito da Sykes a Metal Hammer». Metal Hammer scrive: «Oli
  **recently described** the new album as "a celebration of depression"» — cioè
  riporta una frase detta altrove, e poi gli chiede che cosa significhi.
- `toxicity`: «ha spiegato in un'intervista a NME». Tankian l'ha detto al
  podcast **Soul Boom** di Rainn Wilson; NME lo riporta, e lo scrive.
- `feeling-this` (fuori campione, corretto oggi): la frase detta a NME
  attribuita alla diretta Twitch.

Non è un difetto sparso: è uno solo, ripetuto. E la Costituzione lo copre già —
R3, uscita 3: «secondo X, che cita Y». **Quando la scheda applica quella regola,
funziona**: `darkside` scrive «Parlando dell'album con NME» ed è esatto, perché
NME scrive «Talking about the upcoming album with NME». Il sito sa fare la cosa
giusta quando la fonte gliela dice in faccia; sbaglia quando deve accorgersi da
solo che la fonte sta citando qualcun altro.

## Gli altri due

- **`sweet-home-alabama`**, due difetti su cinque citazioni:
  1. dentro le virgolette di Rossington manca un inciso della fonte — «and we
     thought it was great» — **tagliato senza puntini**. Dentro le virgolette un
     taglio si vede, o non è un taglio: è un'altra frase.
  2. «la indossava perché lo amava» è virgolettata **senza nessuno che l'abbia
     detta**: l'ha detta Rossington a Classic Rock nel 2012. `check-citazioni-nude`
     non poteva vederla, perché guarda solo la frase iconica.
  Inoltre la scheda nomina **Rolling Stone** e **Classic Rock**, che fra le sue
  fonti non ci sono (c'è MusicRadar, che le riporta entrambe). È di nuovo R3
  uscita 3 — e `check-attribuzioni` **non l'ha segnalato**: vedi sotto.

## Due buchi negli strumenti, trovati da questo campione

**1) `check-attribuzioni` vede «X ha detto», non vede «detto A X».**
Le sue forme cercano la testata come *soggetto* («Rolling Stone ha definito») o
introdotta da «da». Ma la forma più idiomatica di questo sito — e quella che la
R3 incoraggia — è **la testata come destinatario**: «A Rolling Stone, nel 1974,
Van Zant spiegò…», «ha spiegato in un'intervista a NME». Il controllo è cieco
proprio sul caso più comune. Da correggere: è mia, la cartella `scripts/`.

**2) La data di Louder non è la data dell'intervista.**
`drown` dice «a Metal Hammer nel 2016». La pagina Louder dice «Published 20
November 2016», ma l'articolo è di quando usciva *That's The Spirit* — 2015 — e
in fondo scrive «This article originally appeared in Metal Hammer #275».
Lo stesso schema l'ho visto oggi su `iron-man` («Published 14 February 2026»,
originale *Classic Rock* 149, agosto 2010) e su `for-those-about-to-rock`
(«Published 23 November 2021», originale *Classic Rock* 162, agosto 2011).
**Contate: 56 voci del sito citano Louder/Metal Hammer/Classic Rock, e 17 di
queste nominano la testata insieme a un anno nel testo.** Quelle diciassette
sono le esposte. Non è un controllo automatizzabile — la data vera sta in fondo
alla pagina, in una riga di testo libero — ma è un elenco chiuso di diciassette.

## Cosa NON dice questo campione

Dieci schede su 163 non danno una percentuale del sito, e il 50% su dieci ha un
margine largo. Dice due cose che il numero non dice, e valgono di più:
**quale** errore è quello vero (l'attribuzione, non le parole), e **dove** si
concentra (la frase iconica, che credevo protetta).
