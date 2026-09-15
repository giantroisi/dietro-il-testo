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

(`adele`, `finley`, `a-ha`, `fulminacci` — prime quattro del campione
biografie, corrette il 15 settembre 2026, un commit ciascuna. `finley`
richiedeva una seconda fonte vera, trovata; `fulminacci` aveva una frase
contraddetta dalla propria fonte, corretta trovandole una fonte che la
sostenga davvero, non attenuata. Dettagli nel registro. Restano quattro
voci del campione — evanescence, judas-priest, fleetwood-mac,
al-bano-e-romina-power — non ancora assegnate.)

---

## 15 settembre 2026 — campione biografie: evanescence e judas-priest

```
Altre due voci del campione aperte, tutte le fonti citate riaperte.
Stessa regola di prima: SE LA FONTE NON LO DICE, NON CI VA — o trovi una
fonte che lo dica e la aggiungi, o togli il dettaglio.
dati/artisti.json, un commit per voce, messaggio da file, niente git diff.

--- 5) evanescence — 2 fonti, 4 affermazioni su 11 non reggono

  CONTRADDETTA: "lei tredicenne". La Encyclopedia of Arkansas — fonte tua —
  dice che Amy Lee aveva DODICI anni quando la famiglia si trasferi' in
  Arkansas nel 1994, l'anno in cui conobbe Moody. Va corretta, non attenuata.

  NON CONFERMATE:
   - l'incontro "a Little Rock": le due fonti dicono "in Arkansas", e la
     famiglia Lee si trasferi' a MAUMELLE, non a Little Rock. Little Rock e'
     la citta' da cui i due fondatori "provengono", non il luogo del campo.
   - "lui quattordicenne": l'eta' di Ben Moody non e' in nessuna delle due.
   - "con un'etichetta indipendente" per Origin: nessuna delle due lo dice.
     Encyclopedia of Arkansas dice il contrario del senso: fu Origin a
     PORTARE al contratto discografico, dopo.

  REGGONO e non si toccano: l'incontro nel 1994; il campo estivo; l'aver
  iniziato subito a scrivere insieme; la fondazione nel 1995 (Kerrang! la
  dice esplicitamente); Childish Intentions e Stricken; il significato del
  nome; il demo Origin del 2000.

  TRAPPOLA DA SAPERE, non un errore di oggi: le tue due fonti NON concordano
  sull'anno del contratto con la Wind-up — Encyclopedia of Arkansas dice
  2001, Kerrang! dice 2002. La scheda oggi non scrive quell'anno, e va bene
  cosi'. Se un giorno vuoi aggiungerlo, NON SCEGLIERE FRA LE DUE: vale la
  R2-bis, si sale di livello e si cerca una fonte che risolva.

--- 6) judas-priest — 3 fonti, 4 affermazioni su 14 non reggono

  Questa voce e' complicata — due formazioni, un nome riusato, sei
  musicisti — e REGGE QUASI TUTTA, riga per riga. Cade solo il contorno:

   - "a Birmingham": Blabbermouth dice soltanto che la prima formazione nacque
     nel 1969. Di Birmingham, sulla pagina, e' Ernie Chataway.
   - "settembre" 1969: il mese non c'e'.
   - "nell'aprile 1974" per l'ingresso di Glenn Tipton: in nessuna delle tre.
     Loudwire conferma le due chitarre soliste Tipton/Downing, ma non la data.
   - "Ian Hill e' il membro rimasto ininterrottamente in formazione piu' a
     lungo": nessuna fonte lo afferma. Che sia entrato nel 1970 con i Freight
     si', quello Blabbermouth lo dice.

  Un luogo, due mesi e un primato. Quattro dettagli che nessun lettore
  chiedeva e che reggono su niente, in una voce per il resto solida.

--- SEMPRE: ultimaVerifica alla data di oggi sulle voci che correggi, e
  tolta del tutto su quelle che non riesci a chiudere.
```
