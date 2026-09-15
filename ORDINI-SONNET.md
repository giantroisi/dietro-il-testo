# Ordini in attesa per Sonnet

File di passaggio, non documentazione. Contiene i comandi pronti che l'autore
non ha ancora potuto consegnare perche' Sonnet stava lavorando ad altro.
**Quando un ordine viene consegnato, si cancella da qui**: un elenco che
accumula ordini vecchi diventa un elenco che nessuno legge.

---

(Nessun ordine in attesa. L'arretrato del 15 settembre 2026 — tredici capitoli,
da `yes-i-know-my-way` a `would`/`live-forever` — e' stato lavorato tutto:
dettagli nel registro, voce per voce, con i commit corrispondenti.)

---

(Le prime tre schede del campione casuale — `for-those-about-to-rock`,
`iron-man`, `angel-of-death` — sono state corrette il 15 settembre 2026, un
commit per scheda. Dettagli nel registro, inclusa una scoperta che riguarda
tutto il sito e non solo `angel-of-death`: `rollingstone.com` e
`billboard.com` sono gated su tutto il dominio, `washingtonpost.com` blocca
l'accesso — dieci schede/artisti toccati, elenco completo nel registro.)

---

(`goodbye-malinconia`, quarta del campione casuale, corretta il 15 settembre
2026 — un commit. Dettagli nel registro: non apriva l'album, il nesso con
Giovanna d'Arco/Galileo/Savonarola non reggeva, la frase iconica diceva il
contrario di quel che dice l'artista, e la fonte video di Rockol è stata
sostituita con un articolo testuale dello stesso dominio.)

---

(`gli-uomini-e-le-donne-sono-uguali`, quinta del campione casuale, corretta
il 15 settembre 2026 — un commit. Il titolo/slug NON è cambiato: verificato
con due fonti ufficiali indipendenti (sito di Cremonini + Discogs) che
l'ordine attuale è quello giusto. Corretti debutto in classifica, le
settimane scambiate fra classifica italiana e Nielsen, e documentata la
data dell'album. Dettagli nel registro.)

---

(`back-in-black`, sesta del campione casuale: tredici affermazioni su tredici
reggevano, nessuna correzione — impostati solo naturaCorpo e ultimaVerifica
il 15 settembre 2026, un commit. Dettagli nel registro.)

---

(`hard-as-a-rock` e `albachiara`, settima e ottava del campione casuale,
corrette il 15 settembre 2026 — un commit ciascuna. Dettagli nel registro,
incluse le due divergenze fra fonti di hard-as-a-rock — dichiarate nel testo,
non sciolte a caso — e l'aggiunta su Alan Taylor in albachiara.)

---

(`feeling-this`, nona del campione casuale, corretta il 15 settembre 2026 —
un commit. Superlativo spostato dove la fonte lo mette davvero, durata e
anno inventati tolti, aggiunta l'omissione che spiega il brano — traccia
d'apertura scelta come primo singolo. Dettagli nel registro.)

---

(`giovani-wannabe`, decima e ultima del campione casuale, corretta il 15
settembre 2026 — un commit. Frase iconica riscritta sul contenuto vero di
Vanity Fair, tolto un confronto non sostenuto, aggiunto il videoclip. Con
questa le dieci schede del campione casuale sono tutte corrette: dettagli e
numero finale — 24%, contro il 14% delle schede riaperte per impressioni —
nel registro.)

---

(`sleepwalking`, `antivist`, `shadow-moses`: fonte disallineata corretta il
15 settembre 2026 — un commit. Il blog citato non attribuiva a nessuno il
testo di Metal Hammer che riproduceva; sostituito con l'originale
metalhammer.co.uk archiviato su Wayback Machine. Solo la fonte, nessuna
modifica al contenuto. Dettagli nel registro.)

---

(Le 34 promesse rimaste nei nomi delle fonti — comprese hey-jude e le altre
segnalate individualmente da Opus — sono state riscritte tutte insieme il 15
settembre 2026, un commit solo: tenuto il nome della testata e cosa contiene,
tolti anni, tipi di documento e attribuzioni non verificabili aprendo la
pagina. Lasciate intatte le tre già confermate reggere — seven-nation-army,
nihilist-blues, uprising. Dettagli e le 15 schede toccate nel registro.)

---

## 15 settembre 2026 — campione biografie: le prime quattro, corrette

```
CAMPIONE CASUALE SULLE BIOGRAFIE (seme 20260915, 8 voci). Ne ho aperte quattro
e riaperto ogni fonte che citano, affermazione per affermazione. Queste sono
le correzioni verificate. Le altre quattro arrivano dopo.

REGOLA UNICA, la stessa delle promesse: SE LA FONTE NON LO DICE, NON CI VA.
Dove il fatto ti risulta vero ma la fonte citata non lo contiene, hai due
strade, e sono tutt'e due buone: TROVI UNA FONTE CHE LO DICA e la aggiungi,
oppure TOGLI IL DETTAGLIO. Quello che non si puo' fare e' lasciarlo li'.

Tutto in dati/artisti.json. Un commit per voce, messaggio da file
(git commit -F), e non lanciare git diff.

--- 1) adele — 1 fonte sola (Britannica), 3 affermazioni su 10 non reggono

  a) "si diplomo' alla BRIT School nel 2006"
     Britannica NON nomina la BRIT School: scrive "una scuola secondaria
     statale per le arti dello spettacolo". E per l'anno dice che firmo' con
     la XL "diversi mesi dopo il diploma", nel 2006 — quindi il diploma puo'
     essere del 2005. Due dettagli, nessuno dei due sulla pagina.
  b) "oltre 120 milioni di copie"
     Cifra ASSENTE. Britannica da' 20 milioni per 21 e oltre 20 per 25, e
     nessun totale di carriera. E' il difetto tipico: la cifra tonda messa
     per chiudere il paragrafo.
  c) La biografia si ferma a 25 (2015), ma la stessa fonte racconta anche
     30 (2021) e "Easy on Me". Non e' un errore, e' un'occasione: la fonte
     che hai gia' aperto contiene un pezzo di storia che manca.

--- 2) finley — 1 fonte sola (Rockol), 9 affermazioni su 13 non reggono

  REGGONO: Legnano; tutta la formazione con nomi, strumenti e soprannomi;
  Ivan Moro subentrato a Stefano Mantegazza; le oltre 300.000 copie fra
  album e singoli. Queste non toccarle: la fonte le dice per davvero.

  NON REGGONO (nessuna e' sulla pagina di Rockol):
     - la fondazione nel 2002
     - il nome precedente "Junkies"
     - "da un gruppo di amici di scuola"
     - il cambio di nome l'anno successivo
     - l'origine del nome dal cestista NBA Michael Finley
     - "presenti sin dal 2002"
     - "subentrato nel 2011"
     - i sei album in studio
     - i due Best Italian Act agli MTV Europe Music Awards (2006 e 2008)

  Nove dettagli su tredici appesi a una fonte che non li contiene. Questa
  voce ha bisogno di una SECONDA FONTE vera, non di una sforbiciata: se
  togli tutto quello che Rockol non dice, resta mezza riga.

--- 3) a-ha — 2 fonti, 5 affermazioni su 11 non reggono

  NON CONFERMATE su nessuna delle due:
     - i ruoli "chitarrista" (Waaktaar) e "tastierista" (Furuholmen)
     - l'aver fatto ascoltare a Harket una prima versione di "Take on Me"
       prima di chiamarlo nel gruppo
     - il nome del gruppo trovato per caso nel quaderno di appunti di Waaktaar
     - lo scioglimento ANNUNCIATO nel 2009
     - l'ultimo concerto a Oslo nel dicembre 2010
  AllMusic dice soltanto che si sciolsero nel 2010. The Electricity Club
  conferma che a-ha nacque ufficialmente nel settembre 1982, il giorno del
  23esimo compleanno di Harket: questo si', ed e' piu' preciso di quel che
  hai scritto.

--- 4) fulminacci — 2 fonti, 4 su 9 non reggono, e UNA E' CONTRADDETTA

  CONTRADDETTA: "Esordisce nella musica nel 2019 con il singolo
  'Borghese in borghese'". Inside Music — la fonte che citi tu — scrive che
  "La vita veramente" fu anticipato dal brano "Una sera" e POI dai singoli
  "La vita veramente" e "Borghese in borghese". L'esordio non e' quello.
  Questa va corretta, non attenuata.

  NON CONFERMATE:
     - nato nel 1997 (Quotidiano.net dice "28 anni" a febbraio 2026: puo'
       essere 1997 o 1998)
     - "comincia a scrivere canzoni da autodidatta fin da ragazzo"
     - il terzo album "Infinito +1" del 2023

--- E UNA COSA CHE VALE PER TUTT'E QUATTRO

Tutte e quattro portano ultimaVerifica 2026-09-08, cioe' dicono al lettore
di essere state verificate. Finley lo dice con nove affermazioni su tredici
che la sua unica fonte non contiene.
QUANDO CORREGGI UNA VOCE, RIMETTI ultimaVerifica ALLA DATA DI OGGI. Se una
voce non riesci a sistemarla tutta, TOGLI ultimaVerifica invece di lasciarla
vecchia: nessun bollino e' meglio di un bollino che non e' vero.

--- IL FILO, perche' e' sempre lo stesso

Guarda cosa cade: il nome della scuola, il cognome del cestista, la cifra
tonda di copie, l'anno esatto dello scioglimento. Nessuno di questi
dettagli serviva. Sono tutti dettagli AGGIUNTI PER DARE SOLIDITA', ed e'
esattamente lo stesso difetto delle 37 promesse e delle dieci schede del
campione casuale. Non e' distrazione: e' un'abitudine di scrittura.
```
