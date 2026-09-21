# Rapporto di verifica indipendente — 20 schede canzone di «Dietro il testo»

**Data:** 21 settembre 2026 · **Ramo:** `verifica/venti-schede-2026-09-21` (worktree `/Users/gianmicheletroisi/Claude/dit-verifica-venti`, base `main` @ `0a703abe`) · **Stato:** nessuna modifica a pagine, dati o script del sito; nessun push, nessuna pubblicazione. Questo è l'unico file consegnato.

**Destinatari:** chi integra le correzioni (Codex, dopo esame) e chi ne risponde editorialmente. Le «correzioni proposte» sono bozze da esaminare, non modifiche applicate.

---

## 1. Sintesi

**Cosa è stato fatto.** Venti schede canzone, scelte tra le 309 su 317 che la loro stessa pagina dichiara «non ancora verificate frase per frase», sono state riaperte affermazione per affermazione contro le fonti che citano: **511 affermazioni** esaminate. Ogni affermazione ha: pagina, testo dell'affermazione, fonte precisa (URL, punto, data vera), esito, correzione proposta (dettaglio nell'Allegato A).

| Esito | n. | % |
|---|---:|---:|
| CONFERMATA | 276 | 54% |
| CONFERMATA CON RISERVA (regge nella sostanza, formulazione più forte o imprecisa) | 172 | 34% |
| NON CONFERMATA (nessuna fonte citata la contiene) | 57 | 11% |
| CONTRADDETTA (una fonte attendibile dice altro) | 4 | 1% |
| NON DOCUMENTABILE (fonte non leggibile: dichiarato, non indovinato) | 2 | <1% |

**Lettura in sei punti.**

1. **I fatti «duri» reggono quasi sempre; cade il contorno.** Date, autori, album, classifiche sono in gran parte confermati. Ciò che cade sono le aggiunte: superlativi, nessi causali, dettagli di scena, interpretazioni presentate come fatti. È lo stesso schema descritto in COSTITUZIONE §4B («dettagli plausibili aggiunti mentre si scriveva, che nessuna fonte contiene»).
2. **Quattro affermazioni contraddette da una fonte, tutte e quattro ricontrollate di persona:** «Conte arrangiò *Azzurro*» (Rockol attribuisce l'arrangiamento a Nando De Luca); Hoppus «non strettamente autobiografico» (nel 1999 disse a Billboard «assolutamente autobiografica», riportato da The Ringer); Sweet Children nati «esattamente sette anni» dopo la morte del padre di Armstrong (Wikipedia: band fondata nel 1987, padre morto il 10 settembre 1982 = cinque anni; Songfacts sostiene i sette senza fonte); *Vivo per lei* «primo estratto» dall'album *Bocelli* (la voce Wikipedia dell'album la elenca fra «altri due singoli» estratti dopo *Con te partirò*, mentre la voce del brano dice «primo estratto»: fonti in conflitto, R5).
3. **Il difetto più esteso non sta in una scheda ma nel modello: il superlativo «il verso/momento/ritornello più citato (o ricordato)».** Nelle venti schede compare in 11, e **in tutte e 11 nessuna fonte citata lo contiene** (altre 4 schede hanno superlativi analoghi: «più famoso», «più amate», «più toccante», «più iconici»). Nell'intero archivio la formula è presente nella frase iconica di **158 schede su 317** (138 la usano come apertura): quasi certamente un modello di scrittura. Vedi §4.1: è la correzione col miglior rapporto costo/beneficio.
4. **Frase iconica troppo vicina ai versi (regola P3, la sola senza eccezioni).** In 4 schede la frase iconica rende in traduzione quasi letterale il contenuto di uno o due versi (`aerials`, `november-rain`, `hotel-california` lieve, `la-regola-dell-amico` per un frammento di due parole); in altre 6 è una parafrasi molto aderente (`urlando-contro-il-cielo`, `man-in-the-box`, `yes-i-know-my-way`, `all-the-small-things`, `war-pigs`, `azzurro`). Vedi §4.2.
5. **Attribuzioni (R3): chi disse cosa, a chi, dove.** Ricorre in 12 schede: notizie che riportano un podcast trattate come interviste, fotogallery che citano un'intervista altrui, note scritte sul sito ufficiale presentate come racconti orali, un video-rubrica GQ presentato come intervista, virgolette attribuite a una testata che non contiene quelle parole (`vieni-a-ballare-in-puglia`, «Puglia da cartolina»). Vedi §4.3.
6. **Ascolti Spotify: dato variabile citato con una fonte che non lo contiene.** 12 schede su 20 citano l'indice `kworb.net/spotify/` (pagina di classifica generica) come fonte degli ascolti; 9 pubblicano un numero già superato o calcolato su un altro ID Spotify. Vedi §4.5: qui serve una soluzione di codice, non di redazione.

**Due segnalazioni di metodo da tenere presenti.** (a) Alcuni agenti hanno scritto che «manca la meta description»: **è falso** — tutte le 317 pagine hanno una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non c'è (verificato sull'HTML generato). Le voci sbagliate nell'Allegato A sono state marcate. (b) L'unica meta description scritta a mano nel campione (`whats-my-age-again`) è anche uno dei difetti più gravi (A27).

---

## 2. Perimetro e metodo

### 2.1 Selezione delle 20 schede
- **Dichiarate non verificate:** una scheda è «verificata frase per frase» solo se ha il campo `ultimaVerifica`. Ce l'hanno 8 su 317 (`giovani-wannabe`, `goodbye-malinconia`, `back-in-black`, `hard-as-a-rock`, `fell-in-love-with-a-girl`, `dubbi-non-ho`, `stand-by-me`, `dammit`); le altre 309 mostrano in pagina «Questa scheda non è ancora stata verificata frase per frase». Le 8 verificate sono escluse: la precedenza è alle non verificate.
- **«Più importanti»:** criterio del progetto stesso, `dati/coda-verifica.json` («ordine in cui riaprire le schede, deciso sul traffico vero»): impressioni Search Console, ultimi 3 mesi al 11/09/2026. Ho rieseguito l'ordinamento sulle sole schede oggi non verificate (2 della coda originale, `back-in-black` e `goodbye-malinconia`, nel frattempo sono state verificate) e ho preso le **prime 20**. Cumulano **1.148 delle 1.551 impressioni** finite su schede non verificate (74%). «Importante» qui significa quindi *visibile su Google*, non *più ascoltata*: `hotel-california` è nel campione con 31 impressioni a posizione media 32,5.
- Alcune schede del campione erano già state lavorate in questi giorni per altri motivi (`urlando-contro-il-cielo`, `dont-look-back-in-anger`, `fuori-dal-tunnel`, `aerials`, `black-pearl-jam`): restano «non verificate» per il sito, e sono state riaperte da zero.

### 2.2 Come è stata fatta la verifica
- Per ogni scheda un pacchetto con il testo esatto pubblicato (P1, P2, frase iconica, descrizione SEO, metadati, fonti citate). Il testo è scomposto in **affermazioni sostanziali** (R2: una data, un nome, un ruolo, una cifra, un'attribuzione, un ordine, un nesso causale, una dichiarazione, una citazione, un dettaglio di video/classifica sono voci a sé).
- Ogni voce è stata confrontata con le **fonti citate dalla scheda, aperte di persona** (non riassunti di motori di ricerca); se la fonte citata non contiene l'affermazione ma un'altra sì, è indicata come *fonte alternativa* con livello (A/B/C, COSTITUZIONE §5). Controlli obbligatori: R3 (genere della pagina: intervista → dice a chi; profilo/recensione/notizia → «secondo X»), trappola delle date Future plc, R2-bis (soggetto e documento dei numeri), R4/P3 (versi nella frase iconica), R9 (formazione), metadati (anno, album, ascolti, Spotify, testo, link).
- **Chi ha fatto cosa.** 19 schede: agenti indipendenti in parallelo, con un protocollo comune. **`dont-look-back-in-anger`: fatta a mano da me**, perché due agenti sono stati bloccati da un filtro sui contenuti (probabile causa: pagine che citano righe della canzone); da quel momento il protocollo vieta di trascrivere righe di canzone, e nessun esito di questo rapporto ne contiene.
- **Cosa ho ricontrollato di persona** (pagina aperta, frase riletta) tra i difetti più gravi segnalati dagli agenti: `whats-my-age-again` A17; `dont-look-back-in-anger` (tutta); `la-regola-dell-amico` (frammento di verso: confermato che il ritornello contiene la forma coniugata); `urlando-contro-il-cielo` (oro/platino nella voce Wikipedia); `yes-i-know-my-way` (nota sul sito ufficiale); `vieni-a-ballare-in-puglia` (virgolette e firma Rockol); `vivo-per-lei` (voce Wikipedia); `wake-me-up-when-september-ends` (Songfacts); `black-pearl-jam` (video GQ, trascrizione); `azzurro` (Rockol, arrangiamento); più i controlli meccanici uniformi dell'Allegato B (stato dei link, oEmbed Spotify, pagina del testo). **Tutto il resto è riportato dagli agenti e non l'ho ricontrollato:** dove decidere una correzione delicata, riaprire la fonte citata nella voce.
- **Errori degli agenti trovati durante il lavoro:** la falsa segnalazione sulla meta description (§1); nell'esito 02, scritto da me, totali e numerazione erano sbagliati e sono stati corretti prima di consegnare.

### 2.3 Cosa questo rapporto NON fa
- Non assegna né propone `ultimaVerifica`: il bollino spetta a chi, dopo aver integrato le correzioni, riapre le fonti (COSTITUZIONE §4B, «Come si chiude una scheda»). Nessuna delle 20 schede va considerata verificata per effetto di questo rapporto.
- Non modifica dati, pagine o script; non pubblica; non ha toccato `verifiche/*` né `COSTITUZIONE.md`.
- Non giudica la qualità della prosa né lo stile, salvo dove uno stile crea un'affermazione.

### 2.4 Limiti dichiarati
Fonti non lette (elenco per scheda in §6): libri (Mick Wall, Marc Eliot, Bertoncelli, Minervini, *Pearl Jam Twenty*, *Unadimille*), riviste cartacee (Kerrang!, Q, Guitar World 2002, Uncut 2007 nell'originale), podcast e video non ascoltati (episodio DeMakes, Howard Stern, MuchMusic), database FIMI e Discogs (403), pagine bloccate da paywall. Per Wikipedia si è letta la versione corrente al 21/09/2026: può differire da quella su cui la scheda fu scritta. Le fonti Wikipedia/Songfacts sono trattate come livello C (§5).


---

## 3. Le venti schede in una tabella

Ordine = coda di verifica (impressioni Search Console, 3 mesi al 11/09/2026). «Voci» = affermazioni esaminate. Colonne: C confermata · R con riserva · N non confermata · X contraddetta · D non documentabile. Nell'ultima colonna, il difetto più grave secondo l'esito.

| # | Scheda | Impr. | Voci | C | R | N | X | D | Difetto più grave |
|--:|---|--:|--:|--:|--:|--:|--:|--:|---|
| 1 | `whats-my-age-again` | 159 | 31 | 13 | 15 | 2 | 1 | 0 | A17 «non strettamente autobiografico» contraddetto (Billboard 1999); A27 meta description senza fonte |
| 2 | `dont-look-back-in-anger` | 149 | 20 | 11 | 7 | 2 | 0 | 0 | A9 «Sally Cinnamon» attribuita a Gallagher: è una credenza dei fan; A8 strip club → nome è ipotesi di Radio X |
| 3 | `fuori-dal-tunnel` | 107 | 29 | 18 | 9 | 2 | 0 | 0 | A22 «resta il brano più famoso» senza fonte; A19 superlativo; comunicato e «non risuonarlo» non datati |
| 4 | `la-regola-dell-amico` | 85 | 23 | 12 | 8 | 3 | 0 | 0 | A15 frammento di verso fra virgolette; fonti che contengono solo l'elenco del Festivalbar; anno «1998» senza fonte |
| 5 | `hey-brother` | 79 | 25 | 13 | 9 | 2 | 0 | 1 | A6 lettura interpretativa senza fonte; A16 «la voce che apre» non documentabile; R3 (profilo, non intervista) |
| 6 | `urlando-contro-il-cielo` | 61 | 22 | 13 | 8 | 1 | 0 | 0 | A22 parafrasi quasi alla lettera di un verso; A15 oro vs platino; racconto del campo non attribuito |
| 7 | `vivo-per-lei` | 57 | 28 | 14 | 10 | 3 | 1 | 0 | A10 «primo estratto» e A9 «25 agosto 1995»: fonti in conflitto; A13 attribuzione a Sky TG24 (cita il Corriere) |
| 8 | `man-in-the-box` | 47 | 26 | 18 | 6 | 2 | 0 | 0 | A19 superlativo; A7 «per tutta la loro breve vita»; A3/A22 «dirigenti» |
| 9 | `yes-i-know-my-way` | 43 | 30 | 17 | 9 | 4 | 0 | 0 | A26 soggetto ribaltato (l'album porta Daniele in Europa); «prima raccolta curata personalmente» senza fonte |
| 10 | `all-the-small-things` | 41 | 20 | 13 | 6 | 1 | 0 | 0 | A15 «dopo le registrazioni dell'album» cambia il senso; A12 superlativo; R3 su DeLonge |
| 11 | `ho-messo-via` | 37 | 22 | 16 | 4 | 1 | 0 | 1 | ascolti su un altro ID; F3 «ballate più amate» senza fonte; aderenza a Wikipedia |
| 12 | `vieni-a-ballare-in-puglia` | 36 | 26 | 14 | 9 | 3 | 0 | 0 | A24 virgolette attribuite a Rockol che Rockol non contiene; A20 «ballare = morire nel gergo»; firma Rockol |
| 13 | `aerials` | 36 | 21 | 9 | 8 | 4 | 0 | 0 | A21 «in sala prove» inventato; sospetto verso in frase iconica; interpretazione = contributo di un lettore |
| 14 | `november-rain` | 36 | 34 | 20 | 12 | 2 | 0 | 0 | A28 sospetto verso; A10 causa invertita; A3 versioni 18/10 minuti; MusicRadar ripubblicata |
| 15 | `war-pigs` | 31 | 27 | 15 | 9 | 3 | 0 | 0 | A12 proteste UK non documentate; R3 Butler/Popoff; A19 superlativo |
| 16 | `wake-me-up-when-september-ends` | 31 | 24 | 11 | 10 | 2 | 1 | 0 | A20 «esattamente sette anni» contraddetto; R3 (Howard Stern via American Songwriter) |
| 17 | `hotel-california` | 31 | 25 | 12 | 8 | 5 | 0 | 0 | interpretazione della frase iconica senza fonte (A18, A21, A22); A10 «ovunque»; A15 «nonostante» |
| 18 | `black-pearl-jam` | 29 | 31 | 19 | 11 | 1 | 0 | 0 | A22/A26 Rodman: nomina la band, non il brano; GQ è un video-rubrica; R3 su Vedder |
| 19 | `rock-n-roll-damnation` | 27 | 24 | 13 | 7 | 4 | 0 | 0 | P1 tutta su Wikipedia (la fonte UCR parla dell'album); A20 «scelta commerciale»; A19 superlativo |
| 20 | `azzurro` | 26 | 23 | 5 | 7 | 10 | 1 | 0 | A18 «Conte la arrangiò» contraddetto (De Luca); «tre mandolini» inventato; A15 «domenica» |
| | **Totale** | **1148** | **511** | **276** | **172** | **57** | **4** | **2** | |


---

## 4. Problemi che si ripetono (da correggere una volta sola, non venti)

Gli ID (A1, A2…) rimandano alle voci dell'Allegato A, sezione della scheda indicata.

### 4.1 Il superlativo «più citato / più ricordato» — un difetto di modello
- **Dove:** nel campione compare in 11 schede: `fuori-dal-tunnel` (A19), `la-regola-dell-amico` (A14), `vivo-per-lei` (A19), `man-in-the-box` (A19), `yes-i-know-my-way` (A20), `all-the-small-things` (A12), `aerials` (A17, «più ricordato»), `november-rain` (A27), `war-pigs` (A19), `rock-n-roll-damnation` (A19, «più ricordato»), `azzurro` (A12). In **tutte** l'esito è NON CONFERMATA: nessuna fonte citata dice che quel verso/momento/ritornello sia «il più citato». Superlativi analoghi non sostenuti: `fuori-dal-tunnel` («resta il brano più famoso di Caparezza», A22), `black-pearl-jam` («il momento più toccante», A25), `ho-messo-via` («una delle ballate più amate», F3), `whats-my-age-again` («più iconici», A24, con riserva), `urlando-contro-il-cielo` («più amate», A13, con riserva).
- **Estensione:** nell'archivio la formula «più citato/ricordato» sta nella frase iconica di **158 schede su 317**, in **138** come parola d'apertura della frase. Con un campione di 11 su 11 senza fonte è ragionevole ritenerla un'abitudine di scrittura e non un dato.
- **Proposta:** (a) togliere il superlativo o trasformarlo in una descrizione della posizione del passo nel brano («il ritornello», «l'apertura») senza giudizio di ricezione, oppure attribuirlo a una fonte che lo dica davvero; (b) un controllo automatico che segnali `più (citat|ricordat)\w+` nella frase iconica, nello stile di `check-nature.mjs`/`check-riportate.mjs`, prima di riaprire le altre 138 una a una. Non ho verificato le altre 138: la stima si regge sul campione.

### 4.2 Frase iconica troppo vicina ai versi (regola P3 / R4)
La regola vieta versi, traduzioni e parafrasi che ne restino un calco; l'errore ricorrente è la frase che *non* ha virgolette ma riassume in ordine, con le stesse immagini, due o tre versi consecutivi. Verificato dal testo (Letras, `testoUrl`), senza riportarlo qui.

| Scheda | Voce | Gravità | Cosa |
|---|---|---|---|
| `aerials` | A17, A18 | **sospetto verso (sì)** | il ritornello riassunto in tre elementi consecutivi, quasi in traduzione |
| `november-rain` | A28 | **sospetto verso (sì)** | due versi vicini resi con parole quasi coincidenti con la traduzione letterale |
| `hotel-california` | A16–A17 | sospetto verso (lieve) | le ultime due righe rese in discorso indiretto, quasi parola per parola |
| `la-regola-dell-amico` | A15 | frammento | «combinare niente» fra virgolette: infinito del verbo che nel ritornello ricorre coniugato (verificato da me: nel ritornello ricorre la forma coniugata dello stesso verbo, con una negazione); rischio medio-basso, ma è un verso spezzato fra virgolette |
| `urlando-contro-il-cielo` | A22 | parafrasi molto aderente | la clausola «non arrendersi finché il cuore continua a battere» rende quasi alla lettera un verso d'attacco; inoltre l'interlocutore del testo è un compagno di viaggio, non «chi ascolta» |
| `war-pigs` | A20 | parafrasi molto aderente | tre versi consecutivi condensati (apertura, streghe, distruzione) nell'ordine originale |
| `azzurro` | A13 | parafrasi molto aderente | due versi descritti con «tutto l'anno», «estate», «improvviso» |
| `man-in-the-box`, `yes-i-know-my-way`, `all-the-small-things` | frase iconica | parafrasi molto aderente | riga dopo riga, con le stesse immagini (occhi cuciti; strada dritta/inciampare; rose sulle scale) |

**Proposta:** riscrivere queste frasi a livello di *funzione* del passo nel brano (cosa fa, dove sta, perché conta secondo una fonte) e non di *contenuto* riga per riga. Dove serve la formulazione, rimandare al `testoUrl` esterno (P3, terzo punto). Ogni esito dà un testo sostitutivo.

### 4.3 Chi ha detto cosa, a chi, dove (R3)
La regola nuova (genere della pagina): intervista → dice a chi; profilo, recensione, rubrica, notizia su un podcast, fotogallery, video-rubrica → «secondo X».

| Scheda | Voce | Problema |
|---|---|---|
| `whats-my-age-again` | A1, A17, A18 | NME e Billboard (2020) sono **notizie** che riportano un podcast (DeMakes), non un'intervista; la dichiarazione sull'autobiografico è del 1999 (Billboard) e la scheda non lo dice; la citazione «adolescente idiota» è un adattamento dell'originale inglese |
| `dont-look-back-in-anger` | A6, A8, A9 | Radio X riporta un'intervista NPR World Cafe (2018) — che è un'intervista, quindi «a NPR» è ammesso — ma l'ipotesi «strip club → nome» è di Radio X e «Sally Cinnamon» è una credenza dei fan (vedi esito) |
| `hey-brother` | A7, A20 | «Tyminski ha raccontato» viene da un profilo (Bluegrass Today, 27/02/2014), non da un'intervista dichiarata; le parole di Avicii sono una e-mail |
| `urlando-contro-il-cielo` | A9, A11 | l'episodio del campo è un racconto di Ligabue, dato come fatto senza attribuzione |
| `vivo-per-lei` | A13, A7 | la dichiarazione di Panceri è attribuita a Sky TG24, ma la pagina è una **fotogallery che cita un'intervista al Corriere della Sera** (Barbara Gerosa); in quell'intervista Panceri dice «Era il 1996» |
| `yes-i-know-my-way` | A11, A19 | sono **note scritte** sul sito ufficiale («Pino's note»), non racconti orali; una citazione del 1998 riguarda il brano ma è presentata come detta «della raccolta» |
| `all-the-small-things` | A8, A4 | «DeLonge ha raccontato» regge solo su Songfacts, senza dire dove/a chi; la lamentela della fidanzata è di Songfacts, anonima |
| `vieni-a-ballare-in-puglia` | A24, A23 | **virgolette attribuite a Rockol («Puglia da cartolina») che Rockol non contiene** (scrive «Puglia virtuale»); scheda tratta dal libro *Unadimille*: autore Vincenzo Rossini, non Franco Zanetti (che firma la rubrica) |
| `november-rain` | A8 | «Charlton raccontò a Malcolm Dome» viene da una feature MusicRadar; l'intervista vera è in Louder (8/7/2022), non fra le fonti; la pagina MusicRadar mostra 12/06/2026 ma è ripubblicazione (Yahoo l'ha al 07/01/2026) |
| `war-pigs` | A9, A15, A23 | le parole di Butler su «il grande Satana» sono di un'intervista a Noisecreep (2010), senza destinatario; la citazione sui «politici e ricchi» è di Popoff (2006) via Wikipedia |
| `wake-me-up-when-september-ends` | A14–A16 | le parole di Armstrong vengono dall'Howard Stern Show, riportate da American Songwriter («Behind the Song»); la scheda non dice né a chi né tramite quale fonte |
| `black-pearl-jam` | A16, A21–A26 | la citazione di Vedder è di Rolling Stone (Crowe, 28/10/1993) e la scheda non lo dice; la storia di Rodman viene da un **video-rubrica GQ** (18/11/2021), non da un'intervista, e Rodman dice che i Pearl Jam lo salvarono, «not the sole reason, but a main reason» |

**Nota sensibile (`black-pearl-jam`, A21–A26).** La frase «l'ascolto di *Black* lo fermò da un tentativo di suicidio» attribuisce a un brano e a una singola causa ciò che l'interessato dice della band e come una fra più cause. Anche dopo la correzione, decisione editoriale: mantenere il riferimento a un tentativo di suicidio in una scheda su una canzone richiede cautela; lo segnalo, non lo decido.

### 4.4 La fonte citata non contiene l'affermazione (COSTITUZIONE §4A: «una fonte non porta all'informazione citata»)
- `la-regola-dell-amico`: Rockol (2025) e Recensiamo Musica (2026) contengono **solo l'elenco dei concorrenti del Festivalbar 1997**; sigla, produzione, tema poggiano su Wikipedia.
- `rock-n-roll-damnation`: la fonte Ultimate Classic Rock citata parla **solo dell'album**; l'intera P1 poggia sulla voce Wikipedia (banner «needs more citations», che rimanda al libro di Mick Wall, 2013, non letto).
- `whats-my-age-again`: NME e Billboard coprono solo il riff di *J.A.R.*; volgarità, «goliardica», «cinque minuti», «salotto» stanno in iHeart (20/10/2020, **non citata**) e Wikipedia. Aggiungere iHeart come fonte (livello B) e attribuire.
- `dont-look-back-in-anger`: mancano fra le fonti l'intervista NPR World Cafe e la classifica Official Charts, che sono le fonti più vicine ai fatti citati.
- `ho-messo-via`: P1, P2 e frase iconica seguono molto da vicino la voce Wikipedia (struttura, termini, sequenza dei tre strumentisti): rischio di aderenza a un testo CC BY-SA, contro il principio «parole originali».
- Schede con **una sola fonte di prosa e Wikipedia** (`hey-brother`, `vivo-per-lei`, `man-in-the-box`, `hotel-california`, `black-pearl-jam`…): quando la fonte non dice il fatto, l'esito lo segna e la correzione indica se serve una fonte alternativa (A/B) trovata o da cercare.
- **Wikipedia ha «ruolo: nessuno» nelle fonti** e in più schede è l'unica a reggere fatti importanti: è «livello C» (§5), non basta per intenzioni, fatti controversi, cifre di vendita e posizioni in classifica; questi ultimi vanno portati a una fonte A/B (Official Charts, FIMI, Billboard).

### 4.5 Ascolti Spotify (`ascoltiTesto`): un dato che invecchia, citato con una pagina che non lo contiene
- **Fonte citata sbagliata:** 12 schede su 20 elencano come fonte degli ascolti `https://kworb.net/spotify/` (l'indice, senza il dato): `fuori-dal-tunnel`, `la-regola-dell-amico`, `urlando-contro-il-cielo`, `man-in-the-box`, `aerials`, `november-rain`, `war-pigs`, `wake-me-up-when-september-ends`, `hotel-california`, `black-pearl-jam`, `rock-n-roll-damnation`, `azzurro`. Le altre 8 citano la pagina artista (che contiene il dato) o non citano nulla; 3 schede (`vivo-per-lei`, `yes-i-know-my-way`, `vieni-a-ballare-in-puglia`) non mostrano alcun numero.
- **Valori letti il 21/09/2026 su kworb (dati al 14–20/09):**

| Scheda | Pubblicato | Kworb | Esito |
|---|---|---|---|
| `whats-my-age-again` | 1,0 mld | 1,029 mld | regge |
| `dont-look-back-in-anger` | 1,5 mld | 1,466 mld (riga «Remastered») | regge |
| `fuori-dal-tunnel` | 26 mln | 25,67 mln (aggiornato 11/09) | regge |
| `la-regola-dell-amico` | 22 mln | 21,63 mln **su un altro ID** (quello della scheda non è in kworb) | arrotondato per eccesso |
| `hey-brother` | 1,3 mld | 1,349 mld | regge |
| `urlando-contro-il-cielo` | 22,9 mln | 23,04 mln (versione «Remastred», ID diverso; l'ID della scheda non è in elenco) | non regge |
| `man-in-the-box` | 691 mln | 703,3 mln | superato |
| `all-the-small-things` | 1,6 mld | 1,627 mld | regge |
| `ho-messo-via` | 36,1 mln | 36,32 mln **su un altro ID** («Primo tempo»; l'ID della scheda è la versione dall'album) | non documentabile per la traccia indicata |
| `aerials` | 1 mld | 1,032 mld | regge |
| `november-rain` | 1,39 mld | 1,4175 mld | superato (cinque settimane) |
| `war-pigs` | 512 mln | 520,08 mln (ID diverso da quello incorporato) | superato |
| `wake-me-up-when-september-ends` | 1,1 mld | 1,129 mld | regge |
| `hotel-california` | 2,2 mld | 2,338 mld | non regge (2,3) |
| `black-pearl-jam` | 793 mln | 805,98 mln | superato |
| `rock-n-roll-damnation` | 40 mln | 40,58 mln | regge solo come troncamento (41) |
| `azzurro` | 78,4 mln | 81,95 mln (traccia «Remastered» non elencata a sé) | non regge |

- **Proposta (di codice, non di redazione):** calcolare `ascoltiTesto` da kworb usando lo `spotifyId` della scheda (o scrivere una data di lettura accanto al numero), citare la pagina artista e non l'indice, e segnalare i casi in cui l'ID non compare in kworb (versioni remaster/live). Nel repository non c'è oggi uno script di aggiornamento degli ascolti.

### 4.6 Altre incoerenze minori ma ricorrenti
- **Anno = anno dell'album, non del singolo** (`dont-look-back-in-anger` 1995 vs singolo 19/02/1996; `man-in-the-box` 1990 vs singolo gennaio 1991; `la-regola-dell-amico` «1998» senza fonte, solo data Spotify di una ristampa): coerente o no con la convenzione del sito, il lettore vede una data in testata diversa da quella nel testo.
- **Formulazioni più forti della fonte:** «ha precisato / ha ammesso», «nonostante», «comunque», «per la prima volta», «curata personalmente», «per tutta la loro breve vita», «in sala prove», «dirigenti»: ciascuna aggiunge un dettaglio o una promozione di ruolo che la fonte non ha (esiti voce per voce).
- **Fonti in conflitto non dichiarate (R5):** `vivo-per-lei` (data e ordine del singolo), `november-rain` (versione da 10/18 minuti; 18 vs 24 febbraio 1992 e paese), `la-regola-dell-amico` (produzione dell'album fra le due voci Wikipedia), `whats-my-age-again` («Peter Pan Complex» in Ringer/Wikipedia/iHeart vs «Peter Pan Syndrome» in Billboard 2020; posizione in Italia 3 o 4).
- **Meta description:** tutte le pagine ce l'hanno, generata dalla prima frase di P1. Quindi *ogni correzione a P1 va riletta come correzione alla meta description e all'anteprima social*. (L'affermazione contraria in alcuni esiti è errata, vedi §1.)


---

## 5. Correzioni per scheda, in ordine di priorità

Criterio: **1** = errore di fatto o di attribuzione documentato contro la fonte (correggere per primo); **2** = affermazione senza fonte o più forte della fonte, che cambia il senso; **3** = imprecisione, ridondanza, dato variabile. L'elenco è una guida: il testo sostitutivo esatto, con la fonte, è nell'esito della scheda (Allegato A). Gli ID sono quelli dell'esito.

### Priorità 1 — errore documentato
| Scheda | Voce | Difetto | Correzione (sintesi) |
|---|---|---|---|
| `azzurro` | A18 | «Conte la arrangiò»: Rockol e it.wikipedia attribuiscono l'arrangiamento a **Nando De Luca** (ricontrollato) | «musica di Paolo Conte, arrangiamento di Nando De Luca» |
| `azzurro` | A19, A20 | «tre mandolini», «suono rurale e assolato»: nessuna fonte, citata o cercata | togliere |
| `azzurro` | A15 | «domenica» in frase iconica contraddice il «pomeriggio» di P1 e non è nel testo né nelle fonti | allineare a P1 o togliere |
| `azzurro` | A21–A23 | resistenza di «critica e radio» per il tono malinconico: Conte parla di «levata di scudi» perché il pezzo andava controcorrente (una marcetta) | riformulare su Rockol («sostiene Conte»); data/sede delle parole di Conte non documentate |
| `whats-my-age-again` | A17 | «non strettamente autobiografico, ha precisato Hoppus»: nel 1999 disse a Billboard «assolutamente autobiografica»; nel 2020 elude la domanda (ricontrollato) | dichiarare entrambe le versioni (R5) |
| `whats-my-age-again` | A27 (meta description) | «nacque dopo che diverse persone gli fecero notare quanto fosse immaturo»: nessuna fonte; contraddice l'origine documentata (riff sbagliato dei Green Day) | sostituire con testo proposto in esito |
| `dont-look-back-in-anger` | A9 | «Gallagher ha ricondotto l'ispirazione a *Sally Cinnamon*»: Radio X lo attribuisce ai **fan** (ricontrollato) | attribuire ai fan; Gallagher parla della canzone come svolta della sua carriera |
| `dont-look-back-in-anger` | A8 | «il nome gli rimase impresso… strip club»: Gallagher dice solo di averla scritta dopo essere uscito da uno strip club; il nesso col nome è ipotesi di Radio X | attribuire l'ipotesi a Radio X |
| `vieni-a-ballare-in-puglia` | A24 | «Puglia da cartolina» fra virgolette come parole di Rockol: Rockol scrive «Puglia virtuale» (ricontrollato) | togliere le virgolette o citare correttamente |
| `vieni-a-ballare-in-puglia` | A20, A16 | «nel gergo pugliese ballare = morire» e «ballato nei locali»: non documentati; Rockol dà a «venire a ballare» altro significato | togliere / riformulare |
| `yes-i-know-my-way` | A26 | «album che portò Daniele per la prima volta in Europa»: la nota ufficiale dice che il **brano portò l'album in Europa** (ricontrollato) | ripristinare il soggetto; togliere «per la prima volta» |
| `yes-i-know-my-way` | A17, A18, A27 | «prima raccolta di successi curata personalmente»: nessuna fonte; esistono raccolte precedenti (*Tra musica e magia*, 1990) | togliere «prima» e «curata personalmente» |
| `black-pearl-jam` | A22, A26, A21 | Rodman nomina i **Pearl Jam**, non *Black*, e «non l'unico motivo»; GQ è un video-rubrica, non un'intervista | riscrivere con cautela (§4.3, nota sensibile) |
| `november-rain` | A10 | «la band scelse comunque un'altra ballata» inverte la causa: per Charlton (Louder) il brano non era finito e Axl lo teneva per il disco dopo | riscrivere su Louder (intervista, 8/7/2022) |
| `november-rain` | A3, A19 | versioni da 18 e da 10 minuti mescolate; 24 febbraio 1992 è la data UK (uDiscover: 18 febbraio) | separare le versioni, dichiarare il paese |
| `wake-me-up-when-september-ends` | A20 | «esattamente sette anni»: Green Day fondati nel 1987, padre morto il 10/09/1982 = cinque anni; Songfacts lo sostiene senza fonte (ricontrollato) | togliere (con A19) |
| `wake-me-up-when-september-ends` | A14–A16, A22, A24 | R3 (Howard Stern via American Songwriter); «bambino» (età) e «lasciarlo in pace fino alla fine di quel mese» senza fonte | riformulare / togliere |
| `vivo-per-lei` | A10, A9 | «primo estratto» e «25 agosto 1995»: la voce IT del brano lo dice, la voce IT dell'album lo elenca fra «altri due singoli» dopo *Con te partirò*, Wikipedia EN e infobox dicono 1996; nessuna fonte primaria letta (Fanpage 403) | dichiarare il conflitto (R5) o togliere «primo» e la data |
| `vivo-per-lei` | A13, A7 | dichiarazione di Panceri attribuita a Sky TG24 (fotogallery che cita il Corriere) e anno: Panceri dice «Era il 1996» | attribuire al Corriere; dichiarare la divergenza |
| `all-the-small-things` | A15 | «dopo le registrazioni dell'album» cambia il senso: le fonti dicono una lunga notte in studio | correggere |
| `aerials` | A21 | «in sala prove»: dettaglio che nessuna fonte contiene | togliere |
| `man-in-the-box` | A3, A22 | «dirigenti»: le fonti dicono «Columbia Records people»/«staffers» | «alcune persone della Columbia» |
| `war-pigs` | A12 | «proteste contro la guerra in Vietnam nel Regno Unito»: né Wikipedia né Primordial le dicono (solo Songfacts, che cita Mojo 2017, non letto) | togliere o attribuire |
| `hotel-california` | A10, A15, A5 | «applicabile ovunque» (Henley dice «America»); «nonostante i sei minuti e mezzo» (nesso non in fonte); «ammise di non riuscire a spiegarlo» (troppo forte) | riformulare |
| `hey-brother` | A6, A9, A11 | «per estensione, il bisogno di esserci…»: lettura che nessuna fonte citata contiene; «già completato»/«convinse del tutto»: più forte di Bluegrass Today | attribuire o togliere |

### Priorità 2 — senza fonte o più forte della fonte
| Scheda | Voce | Difetto |
|---|---|---|
| tutte le 11 con superlativo | vedi §4.1 | «più citato/ricordato» senza fonte |
| `aerials`, `november-rain`, `hotel-california`, `la-regola-dell-amico` | frase iconica | possibile violazione P3 (§4.2) |
| `hotel-california` | A18, A21, A22 | intera lettura interpretativa della frase iconica non sostenuta da nessuna fonte citata |
| `rock-n-roll-damnation` | A20, A19, A21, A5 | «scelta commerciale» (l'assenza dell'assolo), «momento più ricordato», «con gli anni tratto distintivo»; P1 tutta su Wikipedia; «casa discografica americana» non nelle fonti |
| `fuori-dal-tunnel` | A22, A19, A14, A16, A9/A23 | «resta il brano più famoso» (le fonti: «uno dei più celebri»); comunicato sul sito ufficiale dato in voce propria (18/02/2004) e «non risuonarlo per diversi anni» (era in scaletta nel 2018); «per la prima volta» all'attenzione del pubblico |
| `ho-messo-via` | F3, A6/F1, A2/F2 | «una delle ballate più amate» senza fonte; «non una persona in particolare» ambiguo (contraddice la frase iconica); «secondo estratto» solo su Wikipedia (singolo promo) |
| `la-regola-dell-amico` | A13, A14, A5, A21 | «ritratto realistico… fra adolescenti», «ritornello più citato»; produzione dell'album divergente fra le due voci Wikipedia; anno «1998» senza fonte |
| `urlando-contro-il-cielo` | A15, A9/A11, A16/A19, A22 | «disco d'oro»: la stessa voce Wikipedia ha infobox «platino» (FIMI, 100.000+); «da solo»; «quasi interamente dal pubblico»; frase iconica (P3) |
| `dont-look-back-in-anger` | A7, A11, A17, A18, A20 | «risposte diverse sull'identità», «influenza dichiarata ed esplicita»; racconto del soundcheck più forte della fonte (cantando/suonando; frase con il nome; «scrisse le parole», non «riscrisse») |
| `man-in-the-box` | A7, A19, A21 | «per tutta la loro breve vita»; superlativo; l'immagine degli occhi cuciti come lettura della scheda |
| `hey-brother` | A16, A25, A14 | «la voce che apre il brano» non documentabile; «Folk house» senza fonte; «oltre dieci paesi europei» (mix di classifiche) |
| `black-pearl-jam` | A13–A15, A6 | «si rifiutò sempre», «troppo personale», «benzinaio» (RS 1993: compagnia petrolifera) |
| `war-pigs` | A15, A19, A22, A9, A23 | R3; superlativo; «non come semplice provocazione»; «male assoluto» più forte di «evil» |
| `all-the-small-things` | A12, A8, A4, A11, A16 | superlativo; R3; «consacrare il pop punk» (Wikipedia: merito «attribuito»); «coro finale» |
| `aerials` | A6, A7, A19, A16, A5 | interpretazione sull'identità attribuita a Songfacts ma è un contributo di lettore; «angst» reso «rabbia»; «comunque» smentito da Songfacts; «interamente» scritto da (dubbio su SecondHandSongs, non aperta) |
| `vieni-a-ballare-in-puglia` | A14, A15, A23 | «tormentone», «ritmo incalzante», «ritornello orecchiabile» più forti delle fonti; firma Rockol |
| `whats-my-age-again` | A4–A8, A11–A12, A20 | P1 e P2 su fonti che non le contengono (§4.4); ruolo di MCA solo su Wikipedia |
| `vivo-per-lei` | A19, A20, A22, A24, A5 | «momento più citato», «a metà brano», ambiguità «per tutto il brano» in contraddizione con la rivelazione a metà; «scritta dal gruppo O.R.O.» contro P1; *Un disco per l'estate* vs *Sanremo Giovani* |

### Priorità 3 — dati variabili e imprecisioni
Ascolti (§4.5); anno album/singolo (§4.6); «21 in Belgio» (`rock-n-roll-damnation` A13: classifica fiamminga); posizione in classifica in Italia 3 o 4 (`whats-my-age-again` A16); fonti Wikipedia senza ruolo; stato dei link (Allegato B: nessuna fonte morta; CBS 406/403 a curl, `eHabitat` 500 → 200 al secondo tentativo).


---

## 6. Cosa non sono riuscito a documentare

Elenco per scheda, riportato dagli esiti (nulla è stato arrotondato a «confermata»). In sintesi per categoria:
- **Fonti a stampa o audio-video non consultabili:** libri (Mick Wall 2013; Marc Eliot 2004; Bertoncelli; Minervini; *Pearl Jam Twenty*; *Unadimille*; libretto *Buon compleanno Elvis*), riviste (Kerrang! 2005/2015, Q 1993/2007, Total Guitar 2006, Guitar World 2002, Uncut agosto 2007 nell'originale), podcast/video (DeMakes ep. 21, Howard Stern, MuchMusic 1991, CBS come video).
- **Database o pagine bloccate (403/402/paywall):** FIMI (certificazione di `urlando-contro-il-cielo`), Discogs, SecondHandSongs, Fanpage (nota su *Vivo per lei*), italiancharts.com, Rolling Stone dal sito originale (letta via web.archive.org), Billboard (classifica Mainstream Rock di `aerials`).
- **Dati che vivono in una sola fonte e restano tali:** data di uscita 11/06/2002 di *Aerials* (solo infobox Wikipedia); data del singolo `la-regola-dell-amico` e `vivo-per-lei`; «marzo 1978» di *Rock 'n' Roll Damnation* (solo Wikipedia); data di scrittura delle note di Pino Daniele; data e sede delle parole di Conte su *Azzurro*.

**Per scheda (dagli esiti):**

- `whats-my-age-again`: l'episodio del podcast (Chris DeMakes A Podcast, ep. 21, 19/10/2020) non è stato ascoltato né trascritto: le parole di Hoppus sono verificate solo tramite NME, Billboard, iHeart e la scheda Wikipedia, che lo cita. Non ho aperto Kerrang! 2015 («Inside Enema»), l'intervista a Billboard 1999 è stata letta di persona (PDF su worldradiohistory), ma le fonti italiane di classifica (Hit Parade Italia / FIMI) no.
- `dont-look-back-in-anger`: l'intervista a Uncut (agosto 2007) non è stata aperta nell'originale, è letta solo attraverso Songfacts (livello C); l'intervista d'archivio in cui Gallagher parla di *Sally Cinnamon*, citata da Radio X senza testata né data, non è identificata.
- `fuori-dal-tunnel`: la data del 13 giugno 2003 dell'album l'ho letta solo su Wikipedia (pagina album, infobox e testo); non ho aperto una fonte primaria (FIMI/etichetta; Discogs blocca con 403). Il pezzo «per circa trenta settimane in classifica» è in Wikipedia (rimanda a una fonte del Corriere 2018 che non ho aperto). Non ho trovato da nessuna parte chi abbia definito la canzone «parodia delle hit da festa» oltre a LaScimmiaPensa (è interpretazione del giornalista, non dell'artista: la scheda lo attribuisce correttamente).
- `la-regola-dell-amico`: la sigla di «Un disco per l'estate» al di fuori di Wikipedia; i crediti di produzione dell'album su fonte primaria (Discogs risponde 403; libretto non consultato); la data di uscita esatta del singolo (nessuna fonte la dà); quale sia l'album dello spotifyId della scheda.
- `hey-brother`: che la voce di Tyminski apra il brano (A16); la lettura «legame fra fratelli… per estensione» dalle fonti citate (A5 in parte, A6); «Folk house» (A25). Non ho potuto aprire SecondHandSongs (403) né Genius (bloccato).
- `urlando-contro-il-cielo`: il valore attuale della certificazione FIMI (database non leggibile); il libretto «Buon compleanno Elvis – Extra booklet» (2008) su cui Wikipedia fonda la storia della versione live (nessuna riga verificata di persona); il dato per l'ID Spotify esatto della scheda su kworb (l'ID non compare nell'elenco kworb).
- `vivo-per-lei`: la data di uscita del singolo italiano (Discogs 403, Fanpage 403, SecondHandSongs 403; musicbrainz non ha il singolo italiano); la ripartizione degli autori originali (SIAE non aperta, solo la voce Wikipedia IT); il testo originale dell'intervista al Corriere della Sera (non aperto: Sky e Il Fatto lo riportano); il momento esatto in cui, nel brano audio, compare la parola «musica» (ho solo la trascrizione Letras).
- `man-in-the-box`: Niente di bloccante. Note di metodo: (a) la pagina di Rolling Stone dal sito originale risponde con un reindirizzamento a un servizio di accesso a pagamento (tollbit): non l'ho seguito; l'ho letta nella copia web.archive.org linkata da Wikipedia (cattura 28/07/2017), che riporta la data 26/11/1992. (b) Non ho aperto l'intervista MuchMusic 1991 (video); ne ho letto solo il resoconto in American Songwriter e Wikipedia.
- `yes-i-know-my-way`: che il disco del 1998 sia la prima raccolta «curata personalmente» dall'artista (nessuna fonte); che il ritornello sia «il momento più citato»; la data di scrittura delle due note di Daniele sul sito (le pagine non la riportano); quali fossero i contenuti/curatela delle raccolte precedenti (la pagina Rockit di «Tra musica e magia» non ha dettagli).
- `all-the-small-things`: la fonte primaria della lamentela della fidanzata e della dichiarazione sui Ramones (Wikipedia le rimanda a Kerrang! 2005/2015, Total Guitar 2006, programma ufficiale 2000 di MCA: non li ho aperti; rockband.fandom.com risponde 402). La frase di DeLonge riportata da un motore di ricerca («dovevo scriverle una canzone…») è nei risultati di ricerca, non l'ho letta su una pagina aperta: non conta come documentata.
- `ho-messo-via`: la data precisa di uscita del singolo promo e il suo ordine («secondo») da una fonte primaria o indipendente (Discogs bloccato, Wikipedia senza note); il numero di stream della traccia 4xyp77VPg90ezi7N1p99a5 in particolare; la nota Tgcom (25/11/2010) citata da Wikipedia a sostegno della cover di Elisa (non l'ho aperta; l'ho però riscontrata sulla voce Wikipedia di «Ivy»).
- `vieni-a-ballare-in-puglia`: nessuna affermazione è rimasta senza pagina letta. Non ho aperto una fonte primaria per la data di uscita (Wikipedia la deriva da una pagina iTunes archiviata) né per l'identificazione dell'incidente di Molfetta (A7).
- `aerials`: - Il #1 in Mainstream Rock di Billboard alla data del 28/09/2002: la pagina Billboard non ha restituito il dato (ho letto solo la classifica Alternative del 05/10/2002). La data viene solo da Songfacts. - La data della dichiarazione di Dolmayan a MTV (Songfacts non la dà; non ho trovato l'articolo MTV originale). - La data di uscita 11/06/2002: appare solo nell'infobox di Wikipedia (senza nota che io abbia trovato). - Se i crediti di autore registrati (editoria) includano anche Dolmayan e Odadjian: un risultato di ricerca di SecondHandSongs, che NON ho potuto aprire (403), sembra elencarli. Non lo uso come prova, ma tiene aperto un dubbio su «interamente» (A5).
- `november-rain`: la dichiarazione di Slash a MTV 1992 alla fonte (esiste solo la citazione di MusicRadar; il clip è su Facebook/YouTube, non aperto); la data vera di MusicRadar (vedi sotto); la data della prima uscita del singolo negli Stati Uniti (fonti in conflitto); la fonte primaria della cifra «circa un milione» (uDiscoverMusic la dà senza documento).
- `war-pigs`: i testi originali di Popoff (2006) e di Clerk (2002), l'intervista di Reesman (2014), l'intervista a Mojo (2017): li ho solo trovati riportati da Wikipedia, Primordial e Songfacts. Il dettaglio «chi ha chiesto il cambio di titolo era Vertigo» sta solo in Primordial (fonte di livello C, con parti romanzate).
- `wake-me-up-when-september-ends`: la data e il testo primario dell'intervista a Howard Stern (AS non ne indica la data; Wikipedia cita una puntata del 16/10/2019 ma non ho visto/ascoltato il video, quindi non posso dire che sia quella). Nessuna fonte primaria di Armstrong sull'aneddoto della camera/titolo (ricostruzione ripresa da AS/Songfacts/Wikipedia, tutte secondarie).
- `hotel-california`: nulla è rimasto illeggibile. Non ho aperto le fonti secondarie a cui rimanda Wikipedia (libro di Marc Eliot 2004 p.131, BBC Radio 2, MusicRadar) né una fonte primaria del Grammy (grammy.com risponde 404 sulle pagine provate): per il Grammy e per la vicenda della durata mi fermo a Wikipedia (livello B). Il video del segmento CBS non l'ho guardato; ho letto il testo scritto dell'articolo, che riporta le parole di Henley.
- `black-pearl-jam`: (fonti primarie non lette): Guitar World, dicembre 2002 («Black Days», N. Pearlman — su cui Wikipedia fonda «1990», la composizione di E Ballad e il testo scritto durante il viaggio); Q, novembre 1993 (M. Snow — telefonate ai direttori radio); Pearl Jam Twenty p. 68 (Google Books non mostra il testo). Tutte queste affermazioni poggiano quindi sul solo Wikipedia (fonte citata dalla scheda), che le riporta.
- `rock-n-roll-damnation`: la data «marzo 1978» da una seconda fonte indipendente (Wikipedia la dà come marzo 1978 per il brano e «febbraio–marzo 1978» per le sessioni dell'album; Louder dice che le sessioni iniziarono a gennaio 1978). Il libro di Wall e quello di Engleheart non li ho letti. Non ho potuto ascoltare il brano per verificare di persona l'assenza di qualunque assolo.
- `azzurro`: i tre mandolini e il «suono rurale e assolato»; la data e la sede in cui Conte disse le parole riportate da Rockol (Rockol non le data né dice a chi furono dette); il conteggio di stream della specifica traccia «Azzurro - Remastered» (kworb non la elenca separatamente).

---

## 7. Ordine di lavoro suggerito per chi integra

1. **Prima le correzioni di priorità 1** (§5): sono errori documentati, alcune su pagine con molte impressioni (`whats-my-age-again` 159, `dont-look-back-in-anger` 149, `fuori-dal-tunnel` 107).
2. **Ogni correzione a P1 è anche una correzione alla meta description e all'anteprima social** (generate dalla prima frase di P1): rileggerle insieme. `whats-my-age-again` ha inoltre una `descrizioneSeo` scritta a mano, difettosa (A27).
3. **Il superlativo «più citato/ricordato» (§4.1):** togliere nei casi del campione (11) e far girare un controllo sulle altre 138 frasi iconiche prima di riaprirle. Rapporto costo/beneficio migliore di ogni altro intervento.
4. **Frase iconica e P3 (§4.2):** riscrivere le 10 schede indicate a livello di funzione del passo, rileggendole contro `testoUrl`. Nota: `scripts/check-frase-iconica.mjs` misura solo quanto la frase iconica *ricopia il corpo* (ridondanza), non la vicinanza ai versi; `check-citazioni-nude` e `check-virgolette` guardano le virgolette. **Nessun controllo automatico oggi confronta la frase iconica con il testo della canzone**: la vicinanza ai versi resta un controllo umano.
5. **Ascolti (§4.5):** decisione di codice (calcolo da `spotifyId`, data di lettura, pagina artista come fonte) prima di correggere a mano i 9 numeri superati.
6. **Dopo l'integrazione: riaprire le fonti e scrivere `ultimaVerifica`** (COSTITUZIONE §4B), con una verifica *indipendente* da chi ha applicato le correzioni: il bollino dice che una mano diversa da chi ha scritto ha riaperto le fonti.
7. **Coda successiva:** le prossime dieci per impressioni (dopo le 20 di questo rapporto) sono `sound-of-silence-disturbed` (24), `la-mia-parte-intollerante` (23), `someone-like-you` (23), `caruso` (22), `highway-to-hell` (20), `shape-of-you` (20), `sonne` (18), `follow-you` (17), `exuvia` (16), `boulevard-of-broken-dreams` (13).
8. **Punti che non si chiudono senza una fonte primaria** (§6): le decisioni su questi sono editoriali (togliere o dichiarare il dubbio, R8), non tecniche.


---

# Allegato A — Dettaglio per scheda (tutte le affermazioni)

Ogni sezione è l'esito integrale di una scheda: riepilogo, poi una voce per affermazione con **pagina, affermazione, fonte precisa (URL, punto, data vera), estratto, esito, correzione proposta**. Le pagine sono `https://www.dietroiltesto.it/canzone/<slug>/`. Nei punti in cui un esito segnala che «manca la meta description» la voce è stata sostituita da una nota del coordinatore (segnalazione errata, §1).


---

## A.1 — What's My Age Again? (Blink-182) · `canzone/whats-my-age-again/`

### Esito — What's My Age Again? (Blink-182)
Pagina: canzone/whats-my-age-again/ — verificata il 21/09/2026 — priorità: 159 impressioni (Search Console, 3 mesi al 11/09/2026), posizione media 11,0

#### Riepilogo
- Affermazioni esaminate: 31 — CONFERMATA 13, CON RISERVA 15, NON CONFERMATA 2, CONTRADDETTA 1, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A17 (P2) — CONTRADDETTA: «non strettamente autobiografico, ha precisato lo stesso Hoppus». Nel 1999 Hoppus disse a Billboard l'opposto («assolutamente autobiografica»); The Ringer lo riporta. La formula «non strettamente» è la voce di Wikipedia, non di Hoppus. Anche la citazione «adolescente idiota» (A18) viene da quella stessa dichiarazione del 1999, che la scheda non nomina.
  2. A27 (SEO) — NON CONFERMATA: «nacque dopo che diverse persone gli fecero notare quanto fosse immaturo». Nessuna fonte lo dice; contraddice l'origine documentata (errore su un riff dei Green Day, canzone scherzosa) e sembra confondere il narratore del testo con la storia di scrittura. La SEO è il testo più esposto (meta description e dati strutturati).
  3. A4–A8 (P1) — le parti di P1 su «più volgare», «goliardica per il gruppo», «riscrisse», «cinque minuti», «salotto» NON stanno in NME né in Billboard (le uniche fonti «storia» che riportano il podcast). Sono vere, ma stanno in iHeart (20/10/2020, non citata) e in Wikipedia; A5 non è in nessuna fonte citata. Inoltre «riscrisse in cinque minuti» deforma «scrisse la maggior parte del brano in cinque minuti».
  4. A11–A12, A20 — il ruolo di MCA nel cambio di titolo sta solo in Wikipedia (fonte senza ruolo), non in NME, Billboard, The Ringer; e Billboard 2020 chiama il titolo di lavorazione «Peter Pan Syndrome» (divergenza da dichiarare).
  5. A16 — «primi cinque in Italia»: regge, ma la posizione massima è incerta (Wikipedia EN: 3 nel testo, 4 nella tabella; Wikipedia IT: 4). Fonte primaria non aperta (italiancharts 403).
- Cosa non sono riuscito a documentare: l'episodio del podcast (Chris DeMakes A Podcast, ep. 21, 19/10/2020) non è stato ascoltato né trascritto: le parole di Hoppus sono verificate solo tramite NME, Billboard, iHeart e la scheda Wikipedia, che lo cita. Non ho aperto Kerrang! 2015 («Inside Enema»), l'intervista a Billboard 1999 è stata letta di persona (PDF su worldradiohistory), ma le fonti italiane di classifica (Hit Parade Italia / FIMI) no.
- Sospetto verso nella frase iconica: no. L'unico testo fra virgolette è il titolo di lavorazione «Peter Pan Complex» (titolo, non verso; Wikipedia nota che non compare nel testo). Il resto della frase è parafrasi.

#### Nota di metodo sulle fonti
- NME (news, Sam Moore, 21 ottobre 2020): NON è Future plc, data vera. Genere: NOTIZIA che riporta un podcast. Letto integralmente (HTTP 200).
- Billboard (news, Rania Aniftos, 20/10/2020 — la pagina mostra 10/20/2020): NOTIZIA che riporta lo stesso podcast. Letto integralmente via curl (HTTP 200). Si noti che la scheda Wikipedia cita questo articolo con data 10/10/2020, probabile refuso.
- The Ringer (Alan Siegel, 31/07/2019): saggio/monografia sull'album, non intervista. Letto integralmente (HTTP 200).
- Wikipedia EN (letta il 21/09/2026, versione corrente, modificata di recente: cita fonti datate fino ad agosto 2026): nella scheda ha «ruolo: nessuno». L'ho trattata come fonte che contiene o no l'affermazione, ma è una fonte terziaria; per ogni voce indico da quale fonte primaria essa rimanda.
- Fonte alternativa trovata (non citata dalla scheda): iHeart, «Mark Hoppus Says 'What's My Age Again?' Riff Was Inspired by Green Day», 20/10/2020 — https://www.iheart.com/content/2020-10-20-mark-hoppus-says-whats-my-age-again-riff-was-inspired-by-green-day/ — notizia che riporta il podcast, con citazione diretta di Hoppus (livello B).
- Fonte primaria letta: Billboard, 14/08/1999, Carrie Bell, «The Modern Age», p. 99 — https://worldradiohistory.com/Archive-Billboard/90s/1999/BB-1999-08-14.pdf (pagina 83 del PDF, testo OCR).

#### Affermazioni

##### A1 — P1
- Affermazione: «Mark Hoppus ha raccontato, ospite del podcast di Chris DeMakes, che…»
- Fonte precisa: NME — https://www.nme.com/news/music/mark-hoppus-green-day-inspired-intro-to-blink-182-whats-my-age-again-2793676 — occhiello e primo capoverso — data vera 21/10/2020. Billboard — URL citato — secondo capoverso — 20/10/2020.
- Estratto: NME: «speaking to Less Than Jake co-frontman Chris Demakes on the latest episode of his Chris Demakes A Podcast». Billboard: «In the latest episode of Less Than Jake's Chris DeMakes's podcast, Mark Hoppus talks through writing the track».
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: sono notizie che riportano il podcast (R3), non un'intervista. Scrivere: «Come riportano NME e Billboard, Mark Hoppus, ospite del podcast di Chris DeMakes nell'ottobre 2020, ha raccontato che…». Non ho ascoltato l'episodio.

##### A2 — P1
- Affermazione: «stava provando a imparare l'intro di basso di "J.A.R." dei Green Day»
- Fonte precisa: NME, capoverso con la citazione; Billboard, terzo capoverso — 2020.
- Estratto: NME: «it starts off with this bass intro that's really rad… I was messing around on the guitar trying to learn that.»
- Esito: CONFERMATA (sfumatura: l'intro di J.A.R. è di basso, ma Hoppus la provava sulla chitarra; la scheda non lo dice, ma non è un errore)
- Correzione proposta: —

##### A3 — P1
- Affermazione: «il riff d'apertura nacque per errore… lo eseguì sbagliato, e il risultato gli piacque abbastanza da diventare la base del nuovo brano»
- Fonte precisa: NME, seconda citazione; Billboard, quarto capoverso — 2020.
- Estratto: NME: «That was the basis for the opening riff of [the song]: me trying to learn how to play "J.A.R."… messing it up».
- Esito: CONFERMATA CON RISERVA (la fonte dice che fu la base del RIFF d'apertura, non «del nuovo brano»)
- Correzione proposta: «…il risultato gli piacque abbastanza da diventare la base del riff d'apertura del brano.»

##### A4 — P1
- Affermazione: «Il testo, ha raccontato ancora Hoppus, nacque come una canzoncina scherzosa e molto più volgare della versione finale»
- Fonte precisa: NME: «he "was just writing a funny song"» (nessun cenno a volgarità). Billboard: «originally meant as a "joke song"» (parole della cronista, non di Hoppus; nessuna volgarità). Wikipedia EN, sezione «Writing»: «Though he initially developed it as a vulgar joke song» — nota a Kerrang! 2015 (non aperta), non al podcast.
- Estratto: Wikipedia: «Though he initially developed it as a vulgar joke song, he felt it had potential as a regular tune.»
- Esito: CONFERMATA CON RISERVA (solo in Wikipedia e senza il confronto «più volgare della versione finale»; NME e Billboard non lo contengono)
- Fonte alternativa (livello B): iHeart 20/10/2020, citazione diretta di Hoppus: «a joke song that was really vulgar, a lot more vulgar than the final song».
- Correzione proposta: aggiungere iHeart fra le fonti; testo invariato, con «secondo iHeart, che riporta il podcast,…».

##### A5 — P1
- Affermazione: «che pensava comunque di registrare come traccia goliardica per il gruppo»
- Fonte precisa: nessuna delle fonti citate (NME, Billboard, The Ringer, Wikipedia: cercata in tutte). Wikipedia dice solo che «later presented the song to the band».
- Estratto: non letto in nessuna fonte citata.
- Esito: NON CONFERMATA
- Fonte alternativa (livello B): iHeart 20/10/2020: «I was going to record it as a joke song for blink».
- Correzione proposta: aggiungere iHeart e attribuire: «secondo iHeart, che riporta il podcast, Hoppus pensava di registrarla come brano scherzoso per i Blink-182».

##### A6 — P1
- Affermazione: «solo in un secondo momento, rendendosi conto che aveva del potenziale, la riscrisse»
- Fonte precisa: Wikipedia EN, «Writing» («he felt it had potential as a regular tune»). Il «riscrisse» sta solo in iHeart: «I changed the lyrics and began writing it».
- Estratto: Wikipedia: «he felt it had potential as a regular tune».
- Esito: CONFERMATA CON RISERVA (potenziale in Wikipedia; «cambiò il testo» solo nella fonte alternativa non citata)
- Correzione proposta: come A4 (aggiungere iHeart).

##### A7 — P1
- Affermazione: «la riscrisse in circa cinque minuti»
- Fonte precisa: Wikipedia EN: «Hoppus claims it took him five minutes to write» (senza nota). iHeart: «basically wrote the majority of the song in five minutes».
- Estratto: iHeart: «basically wrote the majority of the song in five minutes».
- Esito: CONFERMATA CON RISERVA (la fonte dice che scrisse la MAGGIOR PARTE del brano in cinque minuti; non che «riscrisse» tutto in cinque minuti)
- Correzione proposta: «…e ne scrisse la maggior parte in circa cinque minuti, a suo dire.»

##### A8 — P1
- Affermazione: «nel proprio salotto»
- Fonte precisa: Wikipedia EN, «Writing»: sviluppò il brano «sitting on the floor and playing guitar in his kitchen/living room» (nota al podcast di DeMakes). Assente in NME, Billboard, Ringer, iHeart.
- Estratto: Wikipedia: «sitting on the floor and playing guitar in his kitchen/living room».
- Esito: CONFERMATA CON RISERVA (luogo dello sviluppo del brano da seduto sul pavimento, cucina/soggiorno; la scheda lo lega alla riscrittura; fonte solo Wikipedia)
- Correzione proposta: «…seduto sul pavimento della cucina-soggiorno di casa sua, con la chitarra in mano (così Wikipedia, che rimanda al podcast).» Oppure togliere il dettaglio.

##### A9 — P2
- Affermazione: «Il titolo di lavorazione era "Peter Pan Complex"»
- Fonte precisa: The Ringer, sezione sull'album — 31/07/2019; Wikipedia EN, «Title»; iHeart.
- Estratto: Ringer: «Naturally, the track's original title was "Peter Pan Complex."»
- Esito: CONFERMATA (avvertenza: Billboard 2020 scrive «Peter Pan Syndrome»: divergenza fra le fonti, prevale «Complex» in Ringer, Wikipedia, iHeart)
- Correzione proposta: —

##### A10 — P2
- Affermazione: «diretto riferimento al rifiuto di crescere»
- Fonte precisa: Wikipedia EN, «Title»: il concetto pop-psicologico di adulto socialmente immaturo. The Ringer: «ode to arrested development» (sul brano).
- Estratto: Wikipedia: «referencing the popular psychology concept of an adult who is socially immature».
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P2
- Affermazione: «l'etichetta MCA Records lo giudicò un riferimento troppo poco chiaro per il grande pubblico, suggerendo di cambiarlo»
- Fonte precisa: Wikipedia EN, «Title»; assente in NME, Billboard, The Ringer.
- Estratto: Wikipedia: «Executives at MCA Records were uncertain that listeners would connect with the title».
- Esito: CONFERMATA CON RISERVA (solo Wikipedia; fonte terziaria. Wikipedia aggiunge il timore di cause della Disney, che la scheda omette)
- Fonte alternativa (livello B): iHeart 20/10/2020: «the band's label convinced them to change it».
- Correzione proposta: «…secondo Wikipedia, i dirigenti MCA temevano che il pubblico non ne cogliesse il senso (e che la Disney, titolare dei diritti su Peter Pan, potesse obiettare)».

##### A12 — P2
- Affermazione: «la band, inizialmente contraria, finì per acconsentire»
- Fonte precisa: Wikipedia EN, «Title».
- Estratto: Wikipedia: «The band disliked the suggestion, but… agreed to the change.»
- Esito: CONFERMATA CON RISERVA (solo Wikipedia)
- Correzione proposta: come A11.

##### A13 — P2
- Affermazione: «Pubblicata nell'aprile 1999»
- Fonte precisa: Wikipedia EN, incipit e «Release»: «released in April 1999»; «first serviced to radio in April 1999». The Ringer: «In the spring, … was released as a single.»
- Estratto: Wikipedia: «It was released in April 1999 as the lead single».
- Esito: CONFERMATA CON RISERVA (aprile è la messa in onda radiofonica; la data commerciale precisa non l'ho trovata; Ringer dice solo «primavera»)
- Correzione proposta: «Uscita in primavera (aprile 1999, alle radio)» oppure lasciare «aprile 1999».

##### A14 — P2
- Affermazione: «singolo di lancio di "Enema of the State"»
- Fonte precisa: The Ringer: «the first single off of Blink-182's third studio album»; Wikipedia EN: «lead single».
- Estratto: Ringer: «the first single off of Blink-182's third studio album».
- Esito: CONFERMATA
- Correzione proposta: —

##### A15 — P2
- Affermazione: «scalò le classifiche in diversi paesi»
- Fonte precisa: Wikipedia EN, «Commercial performance» e tabella: Modern Rock USA n. 2, Hot 100 n. 58, Regno Unito n. 17 (ripubblicazione 2000), Italia, Scozia n. 12, ecc.
- Estratto: Wikipedia: «peaking at number two on the U.S. Billboard Modern Rock Tracks chart for 10 weeks».
- Esito: CONFERMATA (fonte terziaria; «scalò» un po' enfatico: Hot 100 solo n. 58)
- Correzione proposta: —

##### A16 — P2
- Affermazione: «arrivando fra i primi cinque in Italia»
- Fonte precisa: Wikipedia EN: incipit «number three in Italy»; sezione classifiche «top five in Italy»; tabella «Italy (FIMI) 4». Wikipedia IT: «alla posizione numero 4 della classifica singoli». Fonte primaria (italiancharts.com) 403, non letta.
- Estratto: Wikipedia IT: «arrivando alla posizione numero 4 della classifica singoli».
- Esito: CONFERMATA CON RISERVA (top five regge in tutte le versioni; posizione esatta 3 o 4 non risolta)
- Correzione proposta: lasciare «fra i primi cinque in Italia» e non indicare la posizione; oppure dichiarare: «(3ª o 4ª posizione, a seconda delle fonti)».

##### A17 — P2
- Affermazione: «Il testo non è strettamente autobiografico, ha precisato lo stesso Hoppus»
- Fonte precisa: The Ringer, sezione sull'album: «In 1999, he told Billboard that the song is about him being a 20-something "and acting like a jackass teenager. It is absolutely autobiographical."» Verificato di persona sul PDF di Billboard del 14/08/1999 (Carrie Bell, «The Modern Age», p. 99, pagina 83 del PDF): stesse parole di Hoppus. Billboard 20/10/2020: alla domanda di DeMakes se fosse autobiografica, Hoppus rispose «I was just writing a funny song». Wikipedia EN, «Writing»: «The story in the song is not strictly autobiographical» — voce della redazione, non citazione di Hoppus.
- Estratto: Ringer: «It is absolutely autobiographical.» (Hoppus, Billboard 1999)
- Esito: CONTRADDETTA (la dichiarazione documentata di Hoppus è l'opposto; nel 2020 elude la domanda con «una canzone divertente»; «non strettamente» è di Wikipedia)
- Correzione proposta: «Nel 1999 Hoppus disse a Billboard che il brano parlava di lui, ventenne che si comportava da adolescente idiota, e lo definì "assolutamente autobiografico"; oltre vent'anni dopo, a DeMakes, che gli chiedeva se lo fosse, rispose di aver soltanto scritto una canzone divertente.» (R5: dichiarare le due versioni.)

##### A18 — P2
- Affermazione: «ha ammesso di essersi comportato, con le sue stesse parole, "come un adolescente idiota" per buona parte dei suoi vent'anni»
- Fonte precisa: The Ringer (cita Billboard 1999); Billboard 14/08/1999 p. 99; Wikipedia EN: «spent his twenties by his own admission "acting like a jackass teenager"».
- Estratto: Billboard 1999: «It's about being in my 20s and acting like a jackass teenager.»
- Esito: CONFERMATA CON RISERVA (la frase originale è inglese, «jackass» è più forte di «idiota»; è una traduzione, non «le sue stesse parole»; «buona parte» è di Wikipedia; data della dichiarazione, 1999, e testata non indicate)
- Correzione proposta: «…ha ammesso, in un'intervista a Billboard del 1999, di essersi comportato da "adolescente" un po' cretino nei suoi vent'anni (nell'originale, "acting like a jackass teenager")». Attenzione: se si mantiene la virgoletta italiana, dire che è una traduzione.

##### A19 — Frase iconica
- Affermazione: «Il titolo originale del brano era "Peter Pan Complex"»
- Fonte precisa: come A9.
- Esito: CONFERMATA
- Correzione proposta: —

##### A20 — Frase iconica
- Affermazione: «poi cambiato dall'etichetta perché ritenuto poco comprensibile per il pubblico»
- Fonte precisa: solo Wikipedia EN («label MCA found the reference obscure and adjusted the title»); iHeart.
- Estratto: Wikipedia: «label MCA found the reference obscure and adjusted the title».
- Esito: CONFERMATA CON RISERVA (come A11)
- Correzione proposta: come A11.

##### A21 — Frase iconica
- Affermazione: «il testo affronta con ironia il tema dell'immaturità»
- Fonte precisa: The Ringer: «ode to arrested development»; Wikipedia: «Lyrically, the song is about immaturity».
- Esito: CONFERMATA
- Correzione proposta: —

##### A22 — Frase iconica
- Affermazione: «si chiude con il protagonista che sceglie di prendersela comoda nel crescere, senza curarsi troppo del giudizio altrui»
- Fonte precisa: Wikipedia EN, «Lyrics»: il protagonista «embraces his immaturity, dismissing the pressure to "act my age" in favor of taking his time growing up». Testo letto su Letras (testoUrl): l'ultima sezione ribadisce che non vuole comportarsi da adulto e prende le distanze dal «mettersi in riga» (parafrasi mia).
- Estratto: Wikipedia: «taking his time growing up».
- Esito: CONFERMATA
- Correzione proposta: —

##### A23 — Frase iconica
- Affermazione: «Il celebre video, con la band che corre per le strade di Los Angeles quasi del tutto nuda»
- Fonte precisa: The Ringer: «sprinting through Los Angeles in skin-colored Speedos»; Wikipedia EN, «Music video».
- Estratto: Ringer: «sprinting through Los Angeles in skin-colored Speedos».
- Esito: CONFERMATA
- Correzione proposta: —

##### A24 — Frase iconica
- Affermazione: «contribuì non poco a renderlo uno dei brani più iconici della loro discografia»
- Fonte precisa: Wikipedia EN: «The video gave the band a reputation for nudity»; video «signature»; brano «among the band's most popular songs». Nessuna fonte collega esplicitamente il video al carattere «iconico».
- Estratto: Wikipedia: «signature music video famously features the band running nude».
- Esito: CONFERMATA CON RISERVA (giudizio non attribuito; il nesso causale video-fama è plausibile ma non affermato da una fonte)
- Correzione proposta: «Il video, con la band che corre nuda per Los Angeles, divenne il tratto più riconoscibile del brano (Wikipedia: “signature music video”).» Oppure togliere il nesso causale.

##### A25 — SEO
- Affermazione: «Scritta da Mark Hoppus»
- Fonte precisa: Wikipedia EN: crediti «Mark Hoppus, Tom DeLonge»; «Hoppus was the primary composer».
- Estratto: Wikipedia: «shares writing credits between… Tom DeLonge and… Mark Hoppus, but Hoppus was the primary composer».
- Esito: CONFERMATA CON RISERVA (credito ufficiale Hoppus/DeLonge; Hoppus compositore principale)
- Correzione proposta: «Scritta soprattutto da Mark Hoppus (con Tom DeLonge fra gli autori)».

##### A26 — SEO
- Affermazione: «in circa cinque minuti»
- Fonte precisa: come A7.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «di cui, a suo dire, scrisse la maggior parte in circa cinque minuti».

##### A27 — SEO
- Affermazione: «nacque dopo che diverse persone gli fecero notare quanto fosse immaturo per la sua età»
- Fonte precisa: cercata in NME, Billboard, The Ringer, Wikipedia (EN e IT), iHeart. Nessuna la contiene. Le fonti dicono che il brano nacque da un errore di esecuzione su un riff di J.A.R. e da una canzone scherzosa. Nel testo del brano, una riga attribuisce agli amici del protagonista l'invito a comportarsi da adulto: è una scelta narrativa del narratore, non un racconto di scrittura di Hoppus (parafrasi mia; nessun verso riprodotto).
- Estratto: «non letto: affermazione non presente in nessuna fonte».
- Esito: NON CONFERMATA (con ogni probabilità derivata dal testo del brano, confondendo narratore e autore; in contrasto con l'origine documentata)
- Correzione proposta (SEO, ~150 caratteri): «Nata da un errore su un riff dei Green Day, Mark Hoppus scrisse la canzone sull'immaturità, a suo dire, in circa cinque minuti.» Alternativa: «La storia di "What's My Age Again?" dei Blink-182: un riff sbagliato dei Green Day, un titolo cambiato dall'etichetta e il video nudo per Los Angeles.»

##### A28 — Metadati
- Affermazione: anno «1999»
- Fonte precisa: Wikipedia EN: singolo aprile 1999; album 1999.
- Esito: CONFERMATA (singolo e album sono entrambi del 1999)
- Correzione proposta: —

##### A29 — Metadati
- Affermazione: album «Enema of the State»
- Fonte precisa: Wikipedia EN; Letras (pagina del brano: album «Enema Of The State», 1999, MCA); Ringer.
- Esito: CONFERMATA (album originale, non raccolta)
- Correzione proposta: —

##### A30 — Metadati
- Affermazione: ascoltiTesto «1,0 mld ascolti»
- Fonte precisa: kworb — https://kworb.net/spotify/artist/6FBDaR13swtiWwGhX1WQsP_songs.html — riga «What's My Age Again?» (link al track ID 4LJhJ6DQS7NwE7UKtvcM52) — pagina aggiornata 2026/09/20, letta il 21/09/2026.
- Estratto: «What's My Age Again? 1,029,212,930» (stream totali; ~382.000 al giorno).
- Esito: CONFERMATA (1,029 mld: l'arrotondamento «1,0 mld» regge; dato variabile, supererà 1,03 mld a breve)
- Correzione proposta: —

##### A31 — Metadati
- Affermazione: genereTesto «Pop punk»
- Fonte precisa: Wikipedia EN, infobox: «Pop-punk; alternative rock».
- Esito: CONFERMATA
- Correzione proposta: —

#### Controlli sui metadati e sui link
- anno 1999: ok (singolo aprile 1999, album 1999).
- album: Enema of the State, album originale; ok.
- ascoltiTesto: kworb 1.029.212.930 stream al 20/09/2026 (lettura 21/09/2026); «1,0 mld» ok.
- spotifyId 4LJhJ6DQS7NwE7UKtvcM52: oEmbed risponde HTTP 200, titolo «What's My Age Again?»; e nella pagina kworb lo stesso ID è collegato alla riga del brano. Ok.
- testoUrl https://www.letras.com/blink-182/79537/: HTTP 200; è la pagina «What's My Age Again?» di blink-182, album Enema of the State. Ok.
- Stato HTTP delle fonti: NME 200; Billboard 200 (con curl; WebFetch dà un redirect a tollbit.billboard.com); The Ringer 200; Wikipedia EN 200; kworb 200; Letras 200; PDF Billboard 14/08/1999 200. Nessuna morta o bloccata. italiancharts.com e hitparade.ch: 403 (non citate dalla scheda).
- Date vere: NME 21/10/2020, Billboard 20/10/2020, The Ringer 31/07/2019, podcast ep. 21 del 19/10/2020 (data da Wikipedia). NME non è Future plc: nessun problema di ristampa.

#### Omissioni rilevanti (solo se cambiano il senso)
- L'unica fonte «storia» sulla frase «è autobiografico» è ambivalente: nel 1999 Hoppus lo dichiarò tale, nel 2020 evitò la domanda. Se la scheda tocca il tema, deve riportare entrambe le dichiarazioni (R5), non una sola con «ha precisato».
- Il timore di cause della Disney sul titolo «Peter Pan» è il secondo motivo del cambio dell'etichetta secondo Wikipedia (fonte terziaria, il cui rimando non ho aperto).
- Le fonti «storia» citate (NME, Billboard) coprono solo il riff di J.A.R.; il resto di P1 (volgarità, goliardia, cinque minuti, riscrittura) è in iHeart, che andrebbe aggiunta fra le fonti, oppure va attribuito a Wikipedia.


---

## A.2 — Don't Look Back in Anger (Oasis) · `canzone/dont-look-back-in-anger/`

### Esito — Don't Look Back in Anger (Oasis)
Pagina: canzone/dont-look-back-in-anger/ — verificata il 21/09/2026 — priorità: 149 impressioni (2º posto della coda)
Nota di metodo: due agenti incaricati di questa scheda sono stati bloccati da un filtro contenuti (probabile causa: pagine che citano versi della canzone). La verifica è stata fatta a mano da chi firma il rapporto, con le pagine aperte una per una; nessun verso è riportato in questo esito.

#### Riepilogo
- Affermazioni esaminate: 20 — CONFERMATA 11, CON RISERVA 7, NON CONFERMATA 2, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. **A9 (NON CONFERMATA, attribuzione)** — la scheda dice che Gallagher «ha ricondotto l'ispirazione a "Sally Cinnamon"». Radio X scrive che è **una credenza di alcuni fan**; di Gallagher riporta solo che quella canzone gli fece capire «il suo destino». Songfacts riporta solo il commento di un lettore.
  2. **A8 (NON CONFERMATA come formulata)** — «ha lasciato intendere che il nome gli fosse rimasto impresso… appena uscito da uno strip club». Gallagher (NPR World Cafe, 2018) dice solo di aver scritto la canzone dopo essere uscito da uno strip club; il legame col nome è **un'ipotesi di Radio X** («So perhaps Sally was the name of a stripper…»).
  3. **A17/A18/A20 (CON RISERVA, frase iconica)** — il racconto del soundcheck è più forte/diverso della fonte: Liam chiede cosa stia *cantando* (non suonando) e se sta cantando *una certa frase* con il nome Sally, non se «nel testo compaia il nome della protagonista»; Noel *scrive le parole* in camerino e suona il brano la sera stessa, non «la riscrive».
  4. **A7/A11 (CON RISERVA)** — «risposte diverse sulla sua identità» e «influenza dichiarata ed esplicita» sono formule più forti di ciò che le fonti dicono.
- Non documentabile: nessuna affermazione; ma **l'intervista a Uncut (agosto 2007) non è stata aperta nell'originale**: è letta solo attraverso Songfacts (livello C). L'intervista «throwback» in cui Gallagher parla di Sally Cinnamon, citata da Radio X senza testata né data, **non è identificata**.
- Sospetto verso nella frase iconica: **no** (compare solo il nome «Sally», che è un nome proprio).

#### Affermazioni
##### A1 — P1
- Affermazione: «Scritta da Noel Gallagher»
- Fonte precisa: Radio X — Jenny Mensah — https://www.radiox.co.uk/artists/oasis/dont-look-back-in-anger-single-story-meaning-lyrics/ — riquadro «Radio X Song Profile» — pagina del 15/05/2025 (aggiornata lo stesso giorno)
- Estratto: «Written by: Noel Gallagher»
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «uscì come singolo il 19 febbraio 1996»
- Fonte precisa: Radio X (stessa pagina), riquadro e testo; riscontro: Official Charts, classifica dei singoli del 25/02/1996 (https://www.officialcharts.com/charts/singles-chart/19960225/7501/) dove il brano entra («New»)
- Estratto: «Single release date: 19th February 1996»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «è il quinto estratto dall'album del 1995 "(What's the Story) Morning Glory?"»
- Fonte precisa: Radio X (stessa pagina), testo
- Estratto: «the fifth track to be taken from the band's 1995 (What's the Story) Morning Glory? album»
- Esito: CONFERMATA (album uscito il 2 ottobre 1995 secondo il riquadro Radio X)
- Correzione proposta: —

##### A4 — P1
- Affermazione: «raggiunse la prima posizione della classifica britannica»
- Fonte precisa: Radio X (riquadro: «Highest chart position: 1», senza nominare la classifica) + Official Charts (settimana 25/02–02/03/1996: Number 1, New, Peak 1)
- Estratto: «Highest chart position: 1»
- Esito: CONFERMATA. Consiglio: aggiungere Official Charts fra le fonti (livello A/B) perché Radio X non nomina la classifica.
- Correzione proposta: — (aggiungere fonte: https://www.officialcharts.com/charts/singles-chart/19960225/7501/)

##### A5 — P2
- Affermazione: «Il testo racconta la storia di una donna, Sally, che guarda alla propria vita senza rimpianti»
- Fonte precisa: Radio X (testo: «it tells the story of a woman called "Sally" who looks back on her life without regret») e NPR World Cafe, 15/03/2018, intervista di Talia Schlanger a Gallagher (https://www.npr.org/sections/world-cafe/2018/03/15/593476549/noel-gallagher-on-world-cafe)
- Estratto (NPR, parole di Gallagher): «She's metaphorically seeing the diary of her life pass by… "I have no regrets."»
- Esito: CONFERMATA. Natura: dichiarazione dell'artista (2018) più lettura di Radio X.
- Correzione proposta: — (facoltativo: dire che è Gallagher a descriverla così, a NPR nel 2018)

##### A6 — P2
- Affermazione: «secondo Radio X, che riporta una sua intervista a NPR»
- Fonte precisa: Radio X; NPR World Cafe (la pagina NPR è un'intervista: «Noel Gallagher On World Cafe», 15/03/2018, Talia Schlanger, Kimberly Junod)
- Estratto: Radio X: «Speaking in an interview with NPR…»
- Esito: CONFERMATA (l'intervista esiste, è a NPR World Cafe, ed è un'intervista: qui «a NPR» sarebbe corretto). L'intervista NPR non è tra le fonti della scheda.
- Correzione proposta: aggiungere fra le fonti https://www.npr.org/sections/world-cafe/2018/03/15/593476549/noel-gallagher-on-world-cafe (livello B) e riscrivere «a NPR World Cafe nel 2018».

##### A7 — P2
- Affermazione: «Sulla sua identità Gallagher ha dato nel tempo risposte diverse»
- Fonte precisa: Songfacts (Uncut, agosto 2007) e NPR World Cafe (2018) — due racconti diversi sulla genesi del brano; nessuna delle due fonti presenta una risposta sull'*identità* di Sally
- Estratto: —
- Esito: CON RISERVA. Le due versioni esistono, ma riguardano *come nacque il brano/il nome*, non «chi sia Sally»; e la scheda non dice che una è stata detta a Uncut nel 2007 e l'altra a NPR nel 2018.
- Correzione proposta: «Sulla genesi del brano Gallagher ha dato versioni diverse: a Uncut (2007) raccontò del soundcheck (vedi sotto); a NPR World Cafe (2018)…»

##### A8 — P2
- Affermazione: «il cantante ha lasciato intendere che il nome gli fosse rimasto impresso la sera in cui scrisse la canzone, appena uscito da uno strip club»
- Fonte precisa: Radio X (stessa pagina) e NPR World Cafe (pagina originale letta)
- Estratto (NPR, Gallagher): «I wrote it after I came out of a strip club. There you go.» — in risposta alla giornalista che ricorda di aver letto che il brano «nacque da un testo senza senso»
- Estratto (Radio X, commento della testata): «So perhaps Sally was the name of a stripper he encountered on that fateful night?»
- Esito: NON CONFERMATA come formulata. Gallagher non parla del nome di Sally nell'intervista NPR (la parola «Sally» non compare nella pagina); l'ipotesi «il nome gli rimase impresso» è **di Radio X**, in forma dubitativa, non una sua dichiarazione.
- Correzione proposta: «A NPR World Cafe (2018), a una domanda su un testo nato quasi come nonsense, Gallagher rispose di averla scritta dopo essere uscito da uno strip club; Radio X ne ricava, come ipotesi, che Sally fosse il nome di una ballerina, ma nessuna fonte lo conferma.»

##### A9 — P2
- Affermazione: «in altre occasioni ha ricondotto l'ispirazione a "Sally Cinnamon" degli Stone Roses»
- Fonte precisa: Radio X (stessa pagina); Songfacts (commento di un lettore)
- Estratto (Radio X): «some fans believe that it was The Stone Roses' Sally Cinnamon track which truly gave Gallagher the inspiration for his character»
- Esito: NON CONFERMATA (attribuzione sbagliata). Radio X attribuisce la tesi ai **fan**, non a Gallagher. Su Songfacts la tesi compare solo in un commento di lettore («Alan from Cambridge»). Nessuna fonte letta riporta Gallagher che collega il personaggio a quella canzone.
- Correzione proposta: «Radio X ricorda che alcuni fan collegano il nome a "Sally Cinnamon" degli Stone Roses, una canzone che Gallagher ha detto aver deciso la sua strada.»

##### A10 — P2
- Affermazione: «il gruppo a cui ha attribuito la scoperta della propria vocazione musicale»
- Fonte precisa: Radio X (stessa pagina), sezione sul nome Sally
- Estratto: «it's no secret that he's previously credited Sally Cinnamon with being responsible for his entire career.» Citazione riportata: «When I heard Sally Cinnamon for the first time, I knew what my destiny was.» («In a throwback interview»)
- Esito: CON RISERVA. Regge la sostanza (Gallagher lega la propria vocazione a *quella canzone*, non genericamente al gruppo). La frase citata è introdotta da Radio X con «in un'intervista d'archivio» senza testata né data: **fonte originale non identificata** (R3: non si può dire a chi l'abbia detta).
- Correzione proposta: «una canzone del gruppo (Sally Cinnamon) che, secondo quanto Radio X riporta da un'intervista d'archivio, gli fece capire la propria strada»; oppure cercare l'originale.

##### A11 — P2
- Affermazione: «L'influenza dei Beatles e di John Lennon resta comunque dichiarata ed esplicita»
- Fonte precisa: Songfacts — https://www.songfacts.com/facts/oasis/dont-look-back-in-anger
- Estratto: «The Beatles… were a huge influence on Oasis, and that influence is perhaps most apparent in this song.» (voce redazionale/di lettore, non dichiarazione di Gallagher)
- Esito: CON RISERVA. Songfacts riporta una dichiarazione diretta solo su un'altra cosa: Gallagher disse a Daniel Rachel (libro *The Art of Noise*) di aver preso in prestito una frase dagli appunti registrati di Lennon. Per l'introduzione e per il verso «sul letto» la fonte parla di riferimenti, non di dichiarazioni.
- Correzione proposta: «L'influenza di Lennon è evidente: secondo Songfacts, che cita Daniel Rachel, Gallagher ammise di aver preso in prestito una frase dagli appunti registrati di Lennon; l'introduzione al pianoforte richiama "Imagine"…» — livello C: cercare fonte A/B.

##### A12 — P2
- Affermazione: «l'introduzione al pianoforte richiama "Imagine"»
- Fonte precisa: Songfacts
- Estratto: «The piano intro was taken from Lennon's "Imagine,"»
- Esito: CONFERMATA (livello C; la fonte dice «taken from», più forte del «richiama» della scheda)
- Correzione proposta: — (aggiungere fonte A/B se disponibile)

##### A13 — P2
- Affermazione: «uno dei versi del ritornello evoca, senza nominarla, la protesta a letto per la pace organizzata da Lennon e Yoko Ono»
- Fonte precisa: Songfacts («a reference to the singer, who staged a famous "bed-in" to promote peace») e Radio X («Evoking imagery of… John Lennon and Yoko Ono's iconic bed protest»)
- Esito: CONFERMATA. È una lettura accreditata (interpretazione), non una dichiarazione di Gallagher; la scheda la presenta come tale («evoca»).
- Correzione proposta: —

##### A14 — Frase iconica
- Affermazione: «Nacque quasi per caso durante un soundcheck a Parigi»
- Fonte precisa: Songfacts, che cita l'intervista di Gallagher a Uncut, agosto 2007
- Estratto: «We were in Paris playing with The Verve, and I had the chords for that song and started writing it.» (poi: soundcheck)
- Esito: CON RISERVA. Gallagher dice di avere già gli accordi e di aver **iniziato a scriverla** prima del soundcheck; al soundcheck arriva la frase con il nome Sally, poi scrive le parole in camerino. «Nacque durante un soundcheck» semplifica; «quasi per caso» è interpretazione (lui dice «I was just making it up»).
- Correzione proposta: «Prese forma durante un soundcheck a Parigi: Gallagher aveva già gli accordi e stava improvvisando quando…»

##### A15 — Frase iconica
- Affermazione: «due giorni prima del primo grande concerto della band in un palazzetto, a Sheffield»
- Fonte precisa: Songfacts / Uncut 2007
- Estratto: «We were due to play two days later. Our first-ever big arena gig…»
- Esito: CONFERMATA (Songfacts nota che la sala «oggi si chiama Sheffield Arena»)
- Correzione proposta: —

##### A16 — Frase iconica
- Affermazione: «secondo quanto riportato da Songfacts, che cita un'intervista di Gallagher a Uncut del 2007»
- Fonte precisa: Songfacts
- Estratto: «Noel Gallagher told the story behind this song in an interview with Uncut magazine, August 2007»
- Esito: CONFERMATA (R3 rispettata: è un'intervista; attribuzione a chi la riporta). L'originale di Uncut non è stato aperto.
- Correzione proposta: — (facoltativo: «agosto 2007»)

##### A17 — Frase iconica
- Affermazione: «mentre suonava gli accordi senza cantare, il fratello Liam gli chiese cosa stesse suonando»
- Fonte precisa: Songfacts / Uncut 2007
- Estratto: Liam: «What's that you're singin?» — Noel: «I wasn't singing anyway, I was just making it up.»
- Esito: CON RISERVA. Liam gli chiese cosa stesse *cantando*; Noel precisa che in realtà non cantava (improvvisava).
- Correzione proposta: «il fratello Liam gli chiese cosa stesse cantando; lui, che non cantava affatto, stava improvvisando…»

##### A18 — Frase iconica
- Affermazione: «e poi se nel testo comparisse il nome della protagonista che sarebbe diventata "Sally"»
- Fonte precisa: Songfacts / Uncut 2007
- Estratto: Liam gli chiede se sta cantando una frase precisa che contiene il nome (non riportata qui perché verso della canzone)
- Esito: CON RISERVA. Liam propone/sente *una frase completa* del ritornello con quel nome; nella fonte non c'è alcuna «protagonista» né domanda «se nel testo compaia il nome».
- Correzione proposta: «e poi se stesse cantando una certa frase che conteneva il nome Sally: a Noel parve un'idea geniale.»

##### A19 — Frase iconica
- Affermazione: «un'intuizione che a Noel sembrò subito perfetta»
- Fonte precisa: Songfacts / Uncut 2007
- Estratto: «that's genius!»
- Esito: CONFERMATA
- Correzione proposta: —

##### A20 — Frase iconica
- Affermazione: «al punto da riscriverla quella sera stessa in camerino»
- Fonte precisa: Songfacts / Uncut 2007
- Estratto: «going back to the dressing room and writing it out… we actually played it that night, in front of 18,000 other people.»
- Esito: CON RISERVA. «Riscriverla» non è ciò che dice la fonte: scrisse le parole in camerino e la suonarono quella sera (davanti a 18.000 persone, acustica).
- Correzione proposta: «al punto da scriverne le parole quella sera stessa in camerino e da suonarla dal vivo la sera stessa.»

#### Controlli sui metadati e sui link
- anno «1995»: è l'anno dell'album (2 ottobre 1995); il singolo è del 19 febbraio 1996 (dichiarato in P1). Coerente con la convenzione del sito (anno dell'album), ma il lettore può leggere una contraddizione fra «1995» nella testata e «1996» in P1: valutare.
- album «(What's the Story) Morning Glory?»: corretto.
- ascoltiTesto «1,5 mld ascolti»: kworb (pagina citata, artista Oasis), letta il 21/09/2026: riga «Don't Look Back in Anger - Remastered» = 1.465.915.004 stream. Arrotondamento 1,5 mld regge; nota: la riga è la versione «Remastered» (l'ID Spotify della scheda restituisce il titolo «Don't Look Back In Anger»).
- spotifyId 7ppPZa3TRUSGKaks9wH7VT: oEmbed restituisce «Don't Look Back In Anger» (corretto).
- testoUrl (letras.com): 200, «DON'T LOOK BACK IN ANGER - Oasis».
- Fonti: Songfacts 200; Radio X 200 (pagina aggiornata 15/05/2025); kworb 200.

#### Omissioni rilevanti
- Nessuna che cambi il senso. Si segnala solo che le due fonti della scheda sono di livello C (Songfacts) e B (Radio X, testata commerciale): l'intervista NPR World Cafe (B) e la classifica Official Charts (A/B) sono più vicine ai fatti citati e mancano fra le fonti.


---

## A.3 — Fuori dal tunnel (Caparezza) · `canzone/fuori-dal-tunnel/`

### Esito — Fuori dal tunnel (Caparezza)
Pagina: canzone/fuori-dal-tunnel/ — verificata il 21/09/2026 — priorità: 107 impressioni Search Console (ultimi 3 mesi al 11/09/2026), posizione media 8,9

Nota di metodo: tutte le fonti citate sono state aperte di persona (HTTP 200, testo integrale letto; nessun paywall). In più ho letto la pagina Wikipedia della *canzone* (non citata dalla scheda; cita la sola pagina dell'album) e la copia archiviata (web.archive.org) del sito ufficiale dell'artista, che è la fonte primaria del comunicato del 2004 riportato da Rockol.

#### Riepilogo
- Affermazioni esaminate: 29 — CONFERMATA 18, CON RISERVA 9, NON CONFERMATA 2, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A22 — «resta il brano più famoso di Caparezza»: superlativo assoluto che nessuna fonte contiene; le fonti dicono «uno dei più celebri» (Wikipedia, LaScimmiaPensa, che lo affianca a «Vengo dalla luna»); su Spotify il brano è quarto (25,7 mln contro 37–44 mln di altri tre brani).
  2. A19 — «Il verso più citato è la dichiarazione del titolo»: «più citato» non documentato da nessuna fonte; inoltre la frase chiama «verso» ciò che fra virgolette è solo il titolo.
  3. A14/A16 — comunicato sul sito ufficiale e «non risuonarlo dal vivo per diversi anni» dati in voce propria della scheda: il comunicato è del 18/02/2004 (data omessa; il sito non è tra le fonti, lo riporta Rockol), e il periodo in cui non lo suonava è indeterminato (nel tour estivo 2018 era in scaletta, Sky TG24). Il nesso «al punto da» è della scheda.
  4. A9/A23 — «per la prima volta» all'attenzione del grande pubblico: le fonti dicono «notorietà nazionale» / «successo nazionalpopolare», non «per la prima volta»; Rockol ricorda pure la partecipazione a Sanremo come Mikimix.
  5. A6 — «attività più semplici e autentiche»: interpretazione della scheda, nessuna fonte lo dice.
- Cosa non sono riuscito a documentare: la data del 13 giugno 2003 dell'album l'ho letta solo su Wikipedia (pagina album, infobox e testo); non ho aperto una fonte primaria (FIMI/etichetta; Discogs blocca con 403). Il pezzo «per circa trenta settimane in classifica» è in Wikipedia (rimanda a una fonte del Corriere 2018 che non ho aperto). Non ho trovato da nessuna parte chi abbia definito la canzone «parodia delle hit da festa» oltre a LaScimmiaPensa (è interpretazione del giornalista, non dell'artista: la scheda lo attribuisce correttamente).
- Sospetto verso nella frase iconica: no. Le uniche parole fra virgolette («fuori dal tunnel») sono il titolo, che coincide con le prime parole del ritornello ma è solo il titolo; niente versi riprodotti. Da correggere solo la dicitura «il verso più citato» (vedi A19).

#### Affermazioni

##### A1 — P1
- Affermazione: «Terzo singolo estratto dal secondo album in studio, "Verità supposte"» (la parte «terzo singolo»)
- Fonte precisa: Wikipedia, pagina album — https://it.wikipedia.org/wiki/Verit%C3%A0_supposte — infobox (singolo 3 = Fuori dal tunnel) e introduzione — pagina viva, letta il 21/09/2026
- Estratto: «grazie al terzo singolo estratto Fuori dal tunnel»
- Fonte alternativa letta: Wikipedia, pagina della canzone (https://it.wikipedia.org/wiki/Fuori_dal_tunnel), incipit: «pubblicato il 16 ottobre 2003 come terzo estratto» dall'album.
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «secondo album in studio, "Verità supposte"»
- Fonte precisa: Wikipedia, pagina album — introduzione — data: pagina viva
- Estratto: «Verità supposte è il secondo album in studio del rapper italiano Caparezza»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «pubblicato il 13 giugno 2003»
- Fonte precisa: Wikipedia, pagina album — infobox «Pubblicazione» e introduzione
- Estratto: «pubblicato il 13 giugno 2003 dalla Extra e dalla Labels»
- Esito: CONFERMATA (unica fonte aperta: Wikipedia; nessuna fonte primaria letta)
- Correzione proposta: — (facoltativo: aggiungere una fonte primaria per la data, non l'ho trovata accessibile)

##### A4 — P1
- Affermazione: «il brano uscì come singolo il 16 ottobre dello stesso anno»
- Fonte precisa: Wikipedia, pagina album (infobox, «data singolo3») e pagina canzone (incipit) — pagina viva
- Estratto: «pubblicato il 16 ottobre 2003 come terzo estratto» (pagina canzone)
- Riscontro primario letto (non citato dalla scheda): comunicato del sito ufficiale dell'artista, 05/10/2003, copia archiviata, http://www.okkio.net/capa/news/news_item.asp?NewsID=31 (via web.archive.org/web/20040127091352/…): «Il cd sarà nei negozi dal 16 ottobre (giorno più, giorno meno)».
- Esito: CONFERMATA (la data primaria è approssimativa, «giorno più, giorno meno»; Wikipedia la dà come esatta)
- Correzione proposta: —

##### A5 — P1
- Affermazione: «È una critica ironica al divertimento imposto e standardizzato della vita notturna»
- Fonte precisa: LaScimmiaPensa — https://www.lascimmiapensa.com/2021/08/12/caparezza-fuori-dal-tunnel-significato/ — paragrafi 3–4 — data vera 12/08/2021 (Andrea Campana). OndaRock — https://www.ondarock.it/interviste/caparezza/ — risposta sulle «gabbie» — 13/12/2018
- Estratto: LSP: «intende criticare il bisogno di divertirsi a tutti i costi: la cultura del party». OndaRock (Caparezza): «la gabbia della movida, del divertimento forzato»
- Esito: CONFERMATA CON RISERVA (regge; «standardizzato» ≈ «stereotipato e scontato» in LSP; «vita notturna» è la sintesi della scheda di «party/movida/discoteca»)
- Correzione proposta: nessuna necessaria; se si vuole più aderenza: «È una critica ironica al bisogno di divertirsi a tutti i costi e alla cultura del party e della movida».

##### A6 — P1
- Affermazione: «con il protagonista che si dichiara "fuori dal tunnel" del divertimento a tutti i costi, preferendogli attività più semplici e autentiche»
- Fonte precisa: LaScimmiaPensa — parafrasi del testo, paragrafi 5–14 — 12/08/2021
- Estratto: LSP: «gli è impossibile divertirsi in maniera stereotipata e scontata»; descrive la sosta in auto, un pasto frugale e conversazioni «tra nerd» (Jeeg Robot ecc.).
- Esito: CONFERMATA CON RISERVA — che il protagonista si dichiari fuori dal tunnel e rifiuti il divertimento stereotipato è nelle fonti; «attività più semplici e autentiche» è un giudizio della scheda che nessuna fonte formula (nel testo, per LSP, il protagonista preferisce restare ai margini e annoiarsi).
- Correzione proposta: «…con il protagonista che si dichiara "fuori dal tunnel" del divertimento a tutti i costi e rivendica un modo più appartato di stare fuori: la noia dichiarata, una sosta in auto, chiacchiere da appassionati di fumetti, cartoni e telefilm.»

##### A7 — P1 (citazione)
- Affermazione: «"Quella era la gabbia della movida, del divertimento forzato: un tunnel, una imposizione"»
- Fonte precisa: OndaRock, «Caparezza - Fuori dal tunnel del rap», intervista di Claudio Fabretti — https://www.ondarock.it/interviste/caparezza/ — risposta alla domanda sulle «gabbie» — data vera 13/12/2018 (in calce alla pagina)
- Estratto: «Quella era la gabbia della movida, del divertimento forzato: un tunnel, una imposizione.»
- Esito: CONFERMATA (letterale, attribuita alla persona giusta; risposta di Caparezza)
- Correzione proposta: —

##### A8 — P1 (attribuzione)
- Affermazione: «l'ha definita lo stesso Caparezza in un'intervista a OndaRock del 2018»
- Fonte precisa: OndaRock — pagina di genere INTERVISTA («ci racconta in un'intervista ad ampio raggio», Fabretti) — 13/12/2018; l'intervista è legata al box «Prisoner 709 Live» (Universal, 2018)
- Estratto: «ci racconta in un'intervista ad ampio raggio»
- Esito: CONFERMATA (parla Caparezza; testata, anno e genere giusti; l'espressione «gabbia della movida» riguarda la canzone, richiamata dall'intervistatore)
- Correzione proposta: —

##### A9 — P2
- Affermazione: «Fu il singolo che portò per la prima volta Caparezza all'attenzione del grande pubblico»
- Fonte precisa: Rockol, 29/06/2022, Mattia Marzi — https://www.rockol.it/news-730993/caparezza-fuori-dal-tunnel-non-l-ho-cantata-per-anni — incipit. Wikipedia pagina canzone — sezione «Descrizione»
- Estratto: Rockol: «spalanca all'artista le porte del successo nazionalpopolare dopo una lunga gavetta». Wikipedia: «il brano che ha portato il rapper pugliese alla notorietà nazionale»
- Esito: CONFERMATA CON RISERVA — «notorietà nazionale» sì; «per la prima volta» no: Rockol ricorda che aveva già partecipato a Sanremo come Mikimix, e LSP attribuisce il grande successo anche a «Vengo dalla luna». Nota: la pagina Wikipedia della canzone non è fra le fonti citate.
- Correzione proposta: «Fu il singolo che lo portò alla notorietà nazionale, contribuendo a tenere l'album in classifica per circa trenta settimane.»

##### A10 — P2
- Affermazione: «contribuendo a tenere l'album in classifica per circa trenta settimane»
- Fonte precisa: Wikipedia pagina album — introduzione
- Estratto: «che permise al disco stesso di rimanere in classifica per una trentina di settimane»
- Esito: CONFERMATA (non ho verificato la fonte a monte, la nota rimanda a Corriere 2018; non ho aperto FIMI)
- Correzione proposta: —

##### A11 — P2
- Affermazione: «Secondo LaScimmiaPensa, nacque come una parodia delle hit "da festa"»
- Fonte precisa: LaScimmiaPensa — attacco dell'articolo (secondo paragrafo) — 12/08/2021
- Estratto: «una canzone pensata come parodia delle hit "da festa"»
- Esito: CONFERMATA (attribuzione corretta: è lettura del giornalista, non dichiarazione dell'artista)
- Correzione proposta: —

##### A12 — P2
- Affermazione: «grazie al ritmo trascinante diventò a sua volta un tormentone ballato proprio nei contesti che intendeva criticare»
- Fonte precisa: LaScimmiaPensa (stesso paragrafo) per «ritmo trascinante» e «tormentone da party»; Rockol/comunicato del 2004 per «ballato nei luoghi… bersaglio»
- Estratto: LSP: «grazie al ritmo trascinante… diventa, però, tormentone da party a sua volta»
- Esito: CONFERMATA
- Correzione proposta: —

##### A13 — P2
- Affermazione: «Fu un paradosso che Caparezza visse a lungo con fastidio»
- Fonte precisa: comunicato del 18/02/2004 (via Rockol) e dichiarazione dal palco 2022 (Rockol)
- Estratto: Rockol: «Per diversi anni non l'ho fatto, ci ho quasi litigato.»; il comunicato 2004 parla di «frustrazione ed imbarazzo»
- Esito: CONFERMATA CON RISERVA — il disagio è documentato nel 2004 e la riconciliazione nel 2022, ma «visse a lungo» è deduzione (nessuna fonte misura la durata) e il disagio dichiarato non è solo per il paradosso del ballo, ma per l'equivoco sul testo e lo sfruttamento televisivo/suonerie.
- Correzione proposta: «Fu un paradosso che Caparezza visse con disagio già nel 2004, tanto che nel 2022 disse dal palco di aver quasi litigato con il pezzo.»

##### A14 — P2 (dichiarazione)
- Affermazione: «sul proprio sito ufficiale si disse infastidito nel sapere che il brano venisse "gioiosamente ballato nei luoghi che sono l'esatto bersaglio del testo"»
- Fonte precisa: Rockol, 29/06/2022 — paragrafo 3 («si sfogò il rapper sul suo sito web ufficiale»). Primario letto (non citato): messaggio «L'imbarazzo e la scelta», sito ufficiale caparezza.it (ex okkio.net), 18/02/2004, copia archiviata https://web.archive.org/web/20040225174612/http://www.okkio.net/capa/news/news_item.asp?NewsID=34 . Anche Wikipedia, pagina canzone, che lo cita.
- Estratto: «alimentando in me frustrazione ed imbarazzo. Immaginate… quanto sia contento di sapere che fuori dal tunnel venga gioiosamente ballato»
- Esito: CONFERMATA CON RISERVA — citazione fedele; ma (a) la frase è ironica: la parola dell'artista è «frustrazione ed imbarazzo», non «infastidito»; (b) manca la data (18 febbraio 2004) e il sito ufficiale non è fra le fonti (la frase è nota a Rockol); (c) R3: la scheda la presenta in voce propria, mentre la fonte citata è un articolo che la riporta.
- Correzione proposta: «Nel febbraio 2004, in un messaggio sul proprio sito ufficiale (che Rockol ricorda), Caparezza scrisse di provare frustrazione e imbarazzo al pensiero che il brano fosse "gioiosamente ballato nei luoghi che sono l'esatto bersaglio del testo".» Aggiungere fra le fonti: caparezza.it (copia archiviata), livello A (fonte primaria).

##### A15 — P2 (citazione)
- Affermazione: «"gioiosamente ballato nei luoghi che sono l'esatto bersaglio del testo"»
- Fonte precisa: Rockol, paragrafo 3; e primario 2004 (sopra)
- Estratto: «venga gioiosamente ballato nei luoghi che sono l'esatto bersaglio del testo»
- Esito: CONFERMATA (letterale)
- Correzione proposta: —

##### A16 — P2
- Affermazione: «al punto da non risuonarlo dal vivo per diversi anni»
- Fonte precisa: Rockol, paragrafo 2 (titolo: «Non l'ho cantata per anni»)
- Estratto: «Per diversi anni non l'ho fatto, ci ho quasi litigato. Ma oggi gli voglio bene»
- Esito: CONFERMATA CON RISERVA — (a) il nesso causale «al punto da» è della scheda (la fonte parla di «rapporto tormentato» e riporta la frase dal palco); (b) il periodo non è indicato: Sky TG24, 30/08/2018 (https://tg24.sky.it/spettacolo/musica/2018/08/30/caparezza-prisoner-709-tour-scaletta, letta) elenca il brano nella scaletta del tour estivo 2018; quindi non è affatto uno stop ininterrotto fino al 2022; (c) è dichiarazione di Caparezza, non fatto documentato in voce propria.
- Correzione proposta: «Lui stesso raccontò dal palco, nel 2022, di non averlo suonato per diversi anni e di averci quasi litigato — salvo poi fare pace col pezzo: secondo Rockol, lo disse presentandolo dal vivo, "oggi gli voglio bene".» (togliere «al punto da», togliere ogni indicazione di durata precisa).

##### A17 — P2 (attribuzione «secondo Rockol… dal palco… 2022»)
- Affermazione: «secondo Rockol, lo disse dal palco presentandolo dal vivo nel 2022»
- Fonte precisa: Rockol, 29/06/2022, Mattia Marzi (rubrica «Magazine – Aneddoti», cronaca di concerto) — paragrafo 2: concerto di apertura del tour di «Exuvia», Sequoie Music Park, Bologna, «lo scorso lunedì» (cioè lunedì 27/06/2022)
- Estratto: «ha chiuso il concerto proprio sulle note della canzone… ha detto il rapper, presentando il brano»
- Esito: CONFERMATA (genere corretto: la scheda scrive «secondo Rockol»; testata e anno giusti)
- Correzione proposta: —

##### A18 — P2 (citazione)
- Affermazione: «"oggi gli voglio bene"»
- Fonte precisa: Rockol, stesso paragrafo
- Estratto: «Ma oggi gli voglio bene, a questo pezzo.»
- Esito: CONFERMATA (frammento fedele)
- Correzione proposta: —

##### A19 — Frase iconica
- Affermazione: «Il verso più citato è la dichiarazione del titolo»
- Fonte precisa: nessuna fonte citata dice che sia il «più citato»; le fonti nemmeno usano quel superlativo.
- Estratto: non letto: nessuna occorrenza (cercate in LSP, Rockol, OndaRock, Wikipedia album e canzone)
- Esito: NON CONFERMATA
- Correzione proposta: sostituire l'attacco con «Il titolo, ripetuto come un mantra, è la dichiarazione che regge il brano: essere fuori dal tunnel del divertimento obbligatorio e omologato.» (evita anche di qualificare come «verso» il titolo)

##### A20 — Frase iconica
- Affermazione: «ripetuta come un mantra»
- Fonte precisa: Letras (testoUrl) https://www.letras.com/caparezza/413833/ — testo, ritornello ripetuto più volte (sei occorrenze dell'apertura del ritornello nel testo pubblicato)
- Estratto: non riporto il verso (regola P3); la ripetizione è visibile nel testo
- Esito: CONFERMATA (fatto ricavato dal testo della canzone)
- Correzione proposta: —

##### A21 — Frase iconica
- Affermazione: «Terzo singolo di "Verità supposte" (2003)»
- Fonte precisa: come A1/A4
- Esito: CONFERMATA
- Correzione proposta: —

##### A22 — Frase iconica
- Affermazione: «resta il brano più famoso di Caparezza»
- Fonte precisa: nessuna fonte citata. Wikipedia pagina canzone: «uno dei più celebri della sua carriera». LSP: «Uno dei suoi brani più celebri, nonché quello, assieme a Vengo Dalla Luna, che lo ha consegnato al grande successo nazionale».
- Estratto: «Uno dei suoi brani più celebri» (LSP). Dati Spotify (kworb, aggiornati al 11/09/2026): Ti Fa Stare Bene 44,3 mln; Vieni A Ballare In Puglia 42,4 mln; Vengo Dalla Luna 37,5 mln; Fuori Dal Tunnel 25,7 mln (4° posto). La fama non si misura solo con gli stream, ma il dato non sostiene il superlativo.
- Esito: NON CONFERMATA (le fonti dicono «uno dei più celebri», non «il più famoso»; i dati disponibili vanno nella direzione opposta)
- Correzione proposta: «Terzo singolo di "Verità supposte" (2003), resta uno dei brani più celebri di Caparezza e quello che lo portò alla notorietà nazionale…»

##### A23 — Frase iconica
- Affermazione: «quello che lo portò all'attenzione del grande pubblico»
- Fonte precisa: come A9
- Esito: CONFERMATA CON RISERVA (come A9: il punto è «notorietà nazionale», non «per la prima volta»; qui la formula non ha «per la prima volta», quindi il difetto è minore)
- Correzione proposta: usare «alla notorietà nazionale» (vedi A22).

##### A24 — Frase iconica
- Affermazione: «un paradosso che lo stesso Caparezza ha definito motivo di frustrazione e imbarazzo»
- Fonte precisa: comunicato del 18/02/2004 (via Rockol; primario archiviato)
- Estratto: «alimentando in me frustrazione ed imbarazzo»
- Esito: CONFERMATA CON RISERVA — le parole sono sue, ma il soggetto di «frustrazione ed imbarazzo» è l'equivoco sul testo e gli effetti collaterali della popolarità (sfruttamento televisivo, suonerie); il «ballato nei luoghi bersaglio» è uno degli esempi. È accettabile come sintesi; manca la data.
- Correzione proposta: «…non senza un paradosso di cui Caparezza scrisse nel 2004 che gli causava frustrazione e imbarazzo: nato, secondo LaScimmiaPensa, come parodia…»

##### A25 — Frase iconica
- Affermazione: «nato, secondo LaScimmiaPensa, come parodia delle hit "da festa"»
- Fonte precisa: come A11
- Esito: CONFERMATA
- Correzione proposta: —

##### A26 — Frase iconica
- Affermazione: «è diventato lui stesso un tormentone da locali notturni»
- Fonte precisa: LaScimmiaPensa — «tormentone da party»; comunicato 2004 — «ballato nei luoghi… bersaglio»
- Estratto: «diventa, però, tormentone da party a sua volta»
- Esito: CONFERMATA CON RISERVA («locali notturni» è specificazione della scheda; «party»/«luoghi bersaglio del testo» sono le espressioni delle fonti)
- Correzione proposta: «…è diventato lui stesso un tormentone da party.» (oppure lasciare com'è)

##### A27 — Metadati: anno
- Affermazione: anno: 2003
- Fonte precisa: Wikipedia album e canzone; kworb non ne parla
- Esito: CONFERMATA (2003 è l'anno sia dell'album — 13/06 — sia del singolo — 16/10)
- Correzione proposta: —

##### A28 — Metadati: album
- Affermazione: album: Verità supposte
- Fonte precisa: Wikipedia canzone («album di provenienza: Verità supposte»); Spotify oEmbed non dà l'album
- Esito: CONFERMATA (album originale in studio, non raccolta)
- Correzione proposta: —

##### A29 — Metadati: ascoltiTesto
- Affermazione: «26 mln ascolti»
- Fonte precisa: kworb.net — la pagina citata è la sola indice (https://kworb.net/spotify/), che non contiene il dato; il dato è in https://kworb.net/spotify/artist/4l0PmbNvFq3m5JaUuAPbcB_songs.html («Caparezza – Spotify Top Songs», ultimo aggiornamento 11/09/2026, letta il 21/09/2026)
- Estratto: «Fuori Dal Tunnel 25,668,715» (giornalieri: 11,255)
- Esito: CONFERMATA (25,67 mln → 26 mln: l'arrotondamento regge; dato variabile, ~11.000 al giorno)
- Correzione proposta: sostituire l'URL della fonte con quello della pagina dell'artista su kworb.

#### Controlli sui metadati e sui link
- anno 2003: ok (album 13/06/2003; singolo 16/10/2003).
- album «Verità supposte»: ok, album originale.
- ascoltiTesto: kworb, pagina artista Caparezza, aggiornata 11/09/2026, letta 21/09/2026: 25.668.715 stream (quarto brano dell'artista). «26 mln» regge.
- spotifyId 2oBXn8htpoyjRqrkIGGm0a: oEmbed risponde, titolo restituito «Fuori Dal Tunnel»; la pagina embed indica come artista l'ID 4l0PmbNvFq3m5JaUuAPbcB, presente nella pagina kworb «Caparezza».
- testoUrl https://www.letras.com/caparezza/413833/: pagina esiste (HTTP 200), titolo «FUORI DAL TUNNEL - Caparezza - LETRAS.COM», canonical coincidente.
- Stato HTTP delle fonti (lette il 21/09/2026 con un normale user-agent): Wikipedia album 200; LaScimmiaPensa 200; Rockol 200 (nessun paywall); OndaRock 200; kworb.net/spotify/ 200 (pagina indice, non contiene il dato); Letras 200; oEmbed 200.
- Date vere delle pagine: LaScimmiaPensa 12/08/2021; Rockol 29/06/2022; OndaRock 13/12/2018. (Nessuna è Future plc.) Nota: la scheda scrive «Rockol, 29 giugno 2022»; corretto.
- Nota: la fonte «Wikipedia» è la pagina dell'album; la pagina della canzone (https://it.wikipedia.org/wiki/Fuori_dal_tunnel) contiene informazioni utili non citate (comunicato del 2004, «notorietà nazionale», Disco d'oro FIMI) e andrebbe aggiunta fra le fonti.

#### Omissioni rilevanti (solo se cambiano il senso)
- Dai dati sulla pagina Wikipedia della canzone (fonte secondaria, non verificata a monte): posizione massima 40 nella classifica italiana dei singoli nel 2004 (FIMI). Non cambia il senso, ma è un dato che ridimensiona il superlativo «brano più famoso» (A22).
- Il comunicato del 18/02/2004 è anche un caso in cui Caparezza definisce la canzone «socialmente rivoluzionaria» e parla di suonerie e televisione; la scheda ne usa solo una frase. Non cambia il senso, ma la datazione (2004) va detta, perché senza data il lettore lo legge insieme al racconto del 2022 come un disagio ininterrotto.


---

## A.4 — La regola dell'amico (883) · `canzone/la-regola-dell-amico/`

### Esito — La regola dell'amico (883)
Pagina: canzone/la-regola-dell-amico/ — verificata il 21/09/2026 — priorità: 85 impressioni (posizione media 9.2)

#### Riepilogo
- Affermazioni esaminate: 23 — CONFERMATA 12, CON RISERVA 8, NON CONFERMATA 3, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A15 / R4-P3: nella frase iconica «combinare niente» fra virgolette è un frammento del verso del ritornello (forma modificata all'infinito, ma riconoscibile). Da togliere le virgolette e riformulare.
  2. A13 e A14: due giudizi senza fonte — «ritratto ... realistico delle relazioni fra adolescenti» (A13) e «il ritornello più citato» (A14, superlativo non documentato).
  3. A21: il «1998» nel campo anno («1997 / 1998») non ha alcuna fonte; tutte le fonti leggibili danno 1997 per singolo e album. Il 1998 compare solo come data di rilascio delle voci Spotify (1998-01-01 per lo spotifyId della scheda), che è una ristampa/raccolta non identificata, non la data del brano.
  4. A5: «album prodotto da Cecchetto insieme a Peroni e Guarnerio»: la voce Wikipedia del SINGOLO dà i tre produttori, la voce dell'ALBUM (pure citata) dà solo Peroni e Guarnerio. Le fonti citate divergono (R5) e la scheda sceglie una versione senza dirlo.
  5. A8: «sigla di Un disco per l'estate» regge solo su Wikipedia (frase senza nota); non l'ho trovata in nessuna fonte indipendente.
  6. A23: il «22 mln» è calcolato sull'ID Spotify sbagliato (vedi Controlli).
  7. Le fonti Rockol (2025) e Recensiamo Musica (2026) contengono SOLO l'elenco dei concorrenti del Festivalbar 1997: non sostengono nulla di Telegatto, sigla, produzione, tema. Tutto il resto poggia su Wikipedia.
- Cosa non sono riuscito a documentare: la sigla di «Un disco per l'estate» al di fuori di Wikipedia; i crediti di produzione dell'album su fonte primaria (Discogs risponde 403; libretto non consultato); la data di uscita esatta del singolo (nessuna fonte la dà); quale sia l'album dello spotifyId della scheda.
- Sospetto verso nella frase iconica: sì — «combinare niente» fra virgolette corrisponde a una parte del verso centrale del ritornello (là in forma coniugata); è un frammento di due parole, ma è un verso spezzato e messo fra virgolette.

Nota R3: la scheda non contiene dichiarazioni del tipo «X ha raccontato…»; il controllo non si applica. Nessuna delle pagine lette conteneva frasi rivolte a me.

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritta da Max Pezzali»
- Fonte precisa: Wikipedia, voce del brano — https://it.wikipedia.org/wiki/La_regola_dell%27amico — sezione «Tracce», campo Autore testi e musiche — letto da wikitesto grezzo il 21/09/2026 (voce non datata)
- Estratto: «Autore testi e musiche = Max Pezzali»
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «fu pubblicata nel 1997»
- Fonte precisa: Wikipedia, voce del brano — incipit — stessa pagina
- Estratto: «pubblicato nel 1997 come secondo estratto dall'album La dura legge del gol!»
- Esito: CONFERMATA (solo l'anno; nessuna fonte dà il giorno del singolo)
- Correzione proposta: —

##### A3 — P1
- Affermazione: «come secondo singolo»
- Fonte precisa: Wikipedia, voce del brano (incipit) e voce dell'album (campi singolo1 = «Un giorno così», singolo2 = «La regola dell'amico»)
- Estratto: «come secondo estratto dall'album»
- Esito: CONFERMATA
- Correzione proposta: —

##### A4 — P1
- Affermazione: «dall'album "La dura legge del gol!"»
- Fonte precisa: Wikipedia, voce del brano e voce dell'album — infobox (seconda traccia dell'album)
- Estratto: «album di provenienza = La dura legge del gol!»
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «album ... prodotto da Claudio Cecchetto insieme a Pierpaolo Peroni e Marco Guarnerio»
- Fonte precisa: Wikipedia, voce del brano (infobox) — dice: produttori Peroni, Guarnerio, Cecchetto (riferito al singolo). Wikipedia, voce dell'album (infobox) — dice: produttore solo Peroni e Guarnerio; Cecchetto compare solo come coautore del testo della title track.
- Estratto: brano: «produttore = Pier Paolo Peroni, Marco Guarnerio, Claudio Cecchetto»; album: «produttore = Pier Paolo Peroni, Marco Guarnerio»
- Alternativa: sito fan maxpezzali.jimdofree.com/la-dura-legge-del-gol/ (livello C, dice di riprodurre i crediti del libretto): «Claudio Cecchetto, Marco Guarnerio e Pierapolo Peroni» come produttori dell'album. Non ho potuto verificare il libretto/Discogs (403).
- Esito: CONFERMATA CON RISERVA (le due voci Wikipedia citate divergono; la scheda attribuisce all'ALBUM il credito che la fonte del singolo dà al SINGOLO)
- Correzione proposta: dichiarare il dubbio (R8): «Prodotto da Pier Paolo Peroni e Marco Guarnerio, con Claudio Cecchetto accreditato come produttore del singolo (le fonti non concordano sui crediti dell'album)»; oppure, se si vuole restare sul singolo: «Il singolo fu prodotto da Claudio Cecchetto insieme a Pier Paolo Peroni e Marco Guarnerio, che ne curarono anche gli arrangiamenti.» Ortografia: «Pier Paolo» nelle voci, non «Pierpaolo».

##### A6 — P1
- Affermazione: «che ne curarono anche l'arrangiamento»
- Fonte precisa: Wikipedia, voce del brano — infobox
- Estratto: «arrangiamenti = Pier Paolo Peroni, Marco Guarnerio»
- Esito: CONFERMATA (per il singolo; il sito fan citato sopra lo dà anche per l'album)
- Correzione proposta: —

##### A7 — P1
- Affermazione: «Divenne quell'estate il tormentone nazionale»
- Fonte precisa: Wikipedia, voce dell'album — introduzione (non la voce del brano)
- Estratto: «La regola dell'amico fu il tormentone dell'estate 1997»
- Esito: CONFERMATA CON RISERVA («nazionale» non è nella fonte; la frase sta nella voce dell'album, non del brano)
- Correzione proposta: «Fu il tormentone dell'estate del 1997.»

##### A8 — P1
- Affermazione: «fu la sigla di "Un disco per l'estate"»
- Fonte precisa: Wikipedia, voce del brano — sezione «Descrizione» — la frase non ha nota. Cercata conferma indipendente: non trovata (ricerche web restituiscono solo Wikipedia). La voce Wikipedia della manifestazione non l'ho potuta aprire (404 sul titolo provato).
- Estratto: «è stato usato quell'anno come sigla di Un disco per l'estate»
- Esito: CONFERMATA CON RISERVA (unica fonte Wikipedia senza nota; livello C)
- Correzione proposta: mantenere ma con fonte migliore se la si trova (Rai/stampa 1997); in mancanza: «Secondo Wikipedia fu usata come sigla di "Un disco per l'estate" di quell'anno» oppure togliere.

##### A9 — P1
- Affermazione: «portata anche al Festivalbar»
- Fonte precisa: (1) Rockol, Franco Zanetti — https://www.rockol.it/news-715988/pino-daniele-vince-il-festivalbar-1997 — elenco «Erano in gara anche» — data vera del pezzo: 22/08/2025 (retrospettiva); (2) Recensiamo Musica, Nico Donvito — elenco cantanti in gara — 18/08/2026; (3) Wikipedia, voce del brano e «Festivalbar 1997»
- Estratto: elenco «883 - La regola dell'amico» fra i concorrenti (Rockol); «gli 883 con “La regola dell’amico”» (Recensiamo)
- Esito: CONFERMATA (partecipazione al Festivalbar 1997; nessuna delle due pagine dice altro sul brano)
- Correzione proposta: — (nota: «in gara al» è più esatto di «portata», ma non serve correggere)

##### A10 — P1
- Affermazione: «vinse il Telegatto di "Vota la voce" come canzone dell'estate»
- Fonte precisa: Wikipedia, voce del brano, sezione «Descrizione»; conferma in Wikipedia «Vota la voce 1997» (883 - «miglior canzone dell'estate», con La regola dell'amico fra i brani in gara). Riscontro contemporaneo non citato dalla scheda: Rockol, 20/09/1997, https://www.rockol.it/news-2718/baglioni-patty-pravo-e-i-pooh-vincono-vota-la-voce — attribuisce il Telegatto agli 883 come «migliore canzone dell'estate», senza nominare il titolo.
- Estratto: «il brano è stato premiato con il Telegatto di Vota la voce come "Canzone dell'estate"»
- Esito: CONFERMATA (il premio va al brano: fonte Wikipedia; il titolo non è nominato dalla stampa dell'epoca, che parla del gruppo)
- Correzione proposta: — (aggiungere in fonti il Rockol del 20/09/1997 come riscontro)

##### A11 — P2
- Affermazione: «Il testo racconta un gruppo di amici legati alla stessa ragazza»
- Fonte precisa: nessuna fonte citata nei paragrafi. Riscontro nel testo stesso (testoUrl, Letras https://www.letras.com/883/14132/, letto integralmente): gli amici del narratore si affollano intorno a una ragazza; il narratore stesso è fra loro. Wikipedia, voce dell'album, descrive il tema in modo più generico.
- Estratto: Wikipedia album: «l'amicizia tra uomo e donna e la difficoltà per essa di trasformarsi in una relazione amorosa» (verso non riprodotto)
- Esito: CONFERMATA CON RISERVA (regge sul testo, non su una fonte citata; «legati» è ambiguo: sono amici della ragazza, non "legati" a lei; il narratore è parte del gruppo)
- Correzione proposta: «Il testo racconta di un gruppo di amici che gravitano attorno alla stessa ragazza, narratore compreso...» e citare fra le fonti Wikipedia (album, «Descrizione»).

##### A12 — P2
- Affermazione: «ognuno con il secondo fine di trasformare l'amicizia in qualcosa di più»
- Fonte precisa: testo (Letras, come sopra): i personaggi sperano che l'amicizia con lei diventi altro; nel finale la ragazza arriva con un altro. Wikipedia album (stessa frase di A11).
- Estratto: non riportato (verso); Wikipedia: «la difficoltà per essa di trasformarsi in una relazione amorosa»
- Esito: CONFERMATA CON RISERVA («ognuno» generalizza; «secondo fine» è formulazione della scheda)
- Correzione proposta: «... e tutti sperano che l'amicizia con lei diventi qualcosa di più». Nota: si tace il finale (la ragazza sceglie un altro), che è la conferma della "regola".

##### A13 — P2
- Affermazione: «un ritratto scherzoso e realistico delle relazioni fra adolescenti»
- Fonte precisa: nessuna delle fonti citate. Il testo non indica l'età dei personaggi. Unico riscontro trovato: Ceraunavolta.org (Giuseppe Castelli, non datata; blog, livello C) https://www.ceraunavolta.org/la-regola-dellamico/ parla di dinamiche adolescenziali e ritratto autentico dei rapporti fra giovani (riassunto della pagina, non letto integralmente).
- Estratto: non letto letteralmente
- Esito: NON CONFERMATA
- Correzione proposta: togliere «e realistico delle relazioni fra adolescenti»; lasciare un tono descrittivo: «Il tono è scherzoso». Se si vuole tenere l'idea: «secondo il blog Ceraunavolta.org (Giuseppe Castelli), ritrae con ironia i rapporti fra giovani» (livello C).

##### A14 — Frase iconica
- Affermazione: «Il ritornello più citato»
- Fonte precisa: nessuna. Nessuna fonte citata dice che sia il ritornello più citato (né esiste un dato); la canzone ha un solo ritornello principale.
- Estratto: non letto: dato inesistente
- Esito: NON CONFERMATA
- Correzione proposta: «Il ritornello riassume in una regola amara il tema del brano...» (togliere «più citato»).

##### A15 — Frase iconica
- Affermazione: «essere amico di una donna significa, per definizione, non riuscire mai a "combinare niente" con lei»
- Fonte precisa: contenuto: testo (Letras https://www.letras.com/883/14132/, ritornello, letto integralmente); Wikipedia album lo descrive in generale. Le parole fra virgolette sono un frammento del verso centrale del ritornello, in forma coniugata nel testo.
- Estratto: non riportato (verso)
- Esito: CONFERMATA CON RISERVA (sostanza corretta; violazione R4/P3 per il frammento fra virgolette)
- Correzione proposta: togliere le virgolette e parafrasare: «... essere amico di una donna significa, per come funziona la regola, non concludere mai nulla di sentimentale con lei.» Poi togliere anche «per definizione» se si vuole fedeltà: il testo dà come ragione il fatto stesso di essere amici.

##### A16 — Frase iconica
- Affermazione: «Pubblicata nel 1997 dall'album "La dura legge del gol!"»
- Fonte precisa: come A2-A4
- Esito: CONFERMATA
- Correzione proposta: — (nota: la frase iconica ripete quasi parola per parola i fatti di P1; non è un problema di verità ma di ridondanza)

##### A17 — Frase iconica
- Affermazione: «divenne il tormentone dell'estate»
- Fonte precisa: Wikipedia album (come A7)
- Estratto: «fu il tormentone dell'estate 1997»
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — Frase iconica
- Affermazione: «sigla di "Un disco per l'estate"»
- Fonte precisa: come A8 (solo Wikipedia)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: come A8.

##### A19 — Frase iconica
- Affermazione: «vincitrice del Telegatto di "Vota la voce" come canzone dell'estate»
- Fonte precisa: come A10
- Esito: CONFERMATA
- Correzione proposta: —

##### SEO
[Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

##### A20 — Metadati (anno, parte 1997)
- Affermazione: anno «1997»
- Fonte precisa: Wikipedia, voce del brano («pubblicato nel 1997») e voce dell'album (uscita 18 giugno 1997; un'altra fonte, Tag43, dà il 6 giugno 1997)
- Estratto: «pubblicato nel [[1997]] come secondo estratto»
- Esito: CONFERMATA (anno di singolo e di album coincidono)
- Correzione proposta: —

##### A21 — Metadati (anno, parte 1998)
- Affermazione: anno «1997 / 1998» (il «1998»)
- Fonte precisa: nessuna fonte citata dà il 1998. Spotify (embed/oEmbed): lo spotifyId della scheda ha data di rilascio 1998-01-01; la versione elencata da kworb (ID diverso) ha 1998-07-01. Sono voci di ristampe/raccolte non identificate, non la data del brano.
- Estratto: «releaseDate: 1998-01-01T00:00:00Z» (embed Spotify letto il 21/09/2026)
- Esito: NON CONFERMATA
- Correzione proposta: anno: 1997 (se si vuole segnalare il dato: «nel 1998 uscì nelle raccolte e su Spotify risulta con quell'anno», ma va documentato).

##### A22 — Metadati (album)
- Affermazione: album «La dura legge del gol!»
- Fonte precisa: Wikipedia, voce del brano e voce dell'album
- Esito: CONFERMATA (album originale, non raccolta)
- Correzione proposta: —

##### A23 — Metadati (ascolti)
- Affermazione: ascoltiTesto «22 mln ascolti»
- Fonte precisa: kworb.net — la pagina citata (https://kworb.net/spotify/) è solo l'indice e non contiene il brano; il dato sta in https://kworb.net/spotify/artist/6bMul6rmRS03x38tWKYifO_songs.html (ID artista ricavato dall'embed Spotify), «Last updated: 2026/09/14», letto il 21/09/2026.
- Estratto: riga «La regola dell'amico | 21,630,313 | 8,465 (giornalieri)»; altra riga: «La regola dell'amico - Silver Mix | 195,009»
- Esito: CONFERMATA CON RISERVA (21,63 mln arrotondato per eccesso a 22: regge come «circa 22 mln» ma non come «22»; soprattutto, la riga kworb è per l'ID spotify:track:0lbZIMto3kWCiJQUxhqhmH, diverso dallo spotifyId della scheda 2ITCAQv2kjkynej77nx15r, che kworb non elenca — la pagina traccia kworb dell'ID della scheda risponde 404)
- Correzione proposta: «oltre 21 mln ascolti» (dato al 14/09/2026, versione principale) e verificare quale ID Spotify vada incorporato.

#### Controlli sui metadati e sui link
- anno: vedi A20/A21 — l'anno del singolo e dell'album è 1997; il 1998 è un dato Spotify, non del brano.
- album: giusto (originale).
- ascoltiTesto: kworb 21.630.313 stream (aggiornamento kworb 14/09/2026, letto 21/09/2026) sull'ID 0lbZIMto3kWCiJQUxhqhmH; per lo spotifyId della scheda, nessun dato kworb. 22 mln = arrotondamento per eccesso.
- spotifyId 2ITCAQv2kjkynej77nx15r: oEmbed risponde (HTTP 200), titolo «La regola dell'amico»; l'embed dà artista 883, durata 4:05, data di rilascio 1998-01-01 (probabilmente non l'album originale; album non identificato). È un titolo giusto ma una release da verificare.
- testoUrl https://www.letras.com/883/14132/: HTTP 200; il titolo della pagina è «LA REGOLLA DELL'AMICO - 883 - LETRAS.COM» (refuso del sito) ma il contenuto è il testo della canzone giusta, letto per intero.
- Stato HTTP delle fonti citate: Rockol news-715988 200 (pubblicata 22/08/2025); Recensiamo Musica 200 (18/08/2026); Wikipedia (brano) 200; Wikipedia (album) 200; kworb.net/spotify/ 200 (solo indice, senza il brano). Nessun paywall.
- Rockol news-2718 (1997), non citata dalla scheda: 200, 20/09/1997.
- Non riuscito: Discogs (403); pagina Wikipedia «Un disco per l'estate 1997» (404 sul titolo provato).

#### Omissioni rilevanti (solo se cambiano il senso)
- Il finale del testo (la ragazza arriva con un altro) è il punto della canzone e non è nel testo della scheda; non cambia la verità di P2 ma aiuta a spiegare la «regola». Da valutare, non obbligatorio.
- Fonti: la sezione fonti attribuisce alle pagine Rockol e Recensiamo Musica un ruolo di «storia», ma sostengono solo la presenza al Festivalbar. Suggerito riportare come fonte del Telegatto il Rockol del 20/09/1997 (news-2718) accanto a Wikipedia.


---

## A.5 — Hey Brother (Avicii) · `canzone/hey-brother/`

### Esito — Hey Brother (Avicii)
Pagina: canzone/hey-brother/ — verificata il 21/09/2026 — priorità: 79 impressioni (Search Console, 3 mesi al 11/09/2026), posizione media 9,2

#### Riepilogo
- Affermazioni esaminate: 25 — CONFERMATA 13, CON RISERVA 9, NON CONFERMATA 2, CONTRADDETTA 0, NON DOCUMENTABILE 1
- Difetti in ordine di gravità:
  1. A6 — «per estensione, il bisogno di esserci per le persone a cui si vuole bene»: nessuna delle due fonti citate lo contiene (è una lettura interpretativa; l'ho trovata solo su Newsweek, non citata).
  2. A16 — «la voce che apre il brano» è quella di Tyminski: dettaglio della frase iconica che nessuna fonte contiene; non l'ho potuto documentare.
  3. A9 / A11 — «il brano già completato» e la figlia che lo «convinse del tutto»: Bluegrass Today dice che la base era pronta ma la parte vocale no (Avicii: «quasi finita»), e che Tyminski aveva già una seconda reazione positiva prima di sentire la figlia.
  4. A7 (R3) — «Tyminski ha raccontato…» è un articolo-profilo di Bluegrass Today (27/02/2014), non un'intervista riportata come tale: va attribuito alla testata. Stessa cosa per le parole di Avicii (via e-mail, a Harris) in A20.
  5. A14 — «oltre dieci paesi europei… classifiche pop»: regge, ma alcune sono classifiche radiofoniche/vendite/dance e la Scozia non è un paese a sé nelle classifiche pop.
  6. A25 — genereTesto «Dance / Folk house»: «folk house» non compare in nessuna fonte; Wikipedia scrive «progressive house, country pop».
- Cosa non sono riuscito a documentare: che la voce di Tyminski apra il brano (A16); la lettura «legame fra fratelli… per estensione» dalle fonti citate (A5 in parte, A6); «Folk house» (A25). Non ho potuto aprire SecondHandSongs (403) né Genius (bloccato).
- Sospetto verso nella frase iconica: no. Fra virgolette c'è solo «terroso», traduzione di una parola di Avicii («earthy tone»), non un verso; «Fratello, dove sei?» è il titolo italiano del film (verificato su it.wikipedia). Nessun verso, nemmeno parziale.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritta da Tim Bergling (Avicii)»
- Fonte precisa: Bluegrass Today — https://bluegrasstoday.com/hey-brother-takes-tyminski-to-edm-charts/ — 3° paragrafo e paragrafo di Avicii sulla scrittura — data vera 27/02/2014 (sito non Future plc)
- Estratto: «Tim Bergling. Avicii, as Bergling is known»; «about the process of writing the song with co-writers Vincent Pontare and Salem Al Fakir»
- Esito: CONFERMATA (Wikipedia: Avicii fra gli autori)
- Correzione proposta: —

##### A2 — P1
- Affermazione: «insieme a Salem Al Fakir, Veronica Maggio, Vincent Pontare e Ash Pournouri»
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/Hey_Brother — incipit — letta il 21/09/2026 (testo corrente)
- Estratto: «It was written by Avicii, Ash Pournouri, Salem Al Fakir, Vincent Pontare and Veronica Maggio.»
- Esito: CONFERMATA. Bluegrass Today nomina solo Pontare e Al Fakir. Il resto dipende dal solo Wikipedia (i titoli di SecondHandSongs nei risultati di ricerca elencano gli stessi cinque, ma non ho potuto aprire la pagina: 403).
- Correzione proposta: — (facoltativo: aggiungere una fonte primaria sui crediti, es. BMI/ASCAP/STIM)

##### A3 — P1
- Affermazione: «il brano unisce sonorità dance a un'anima bluegrass»
- Fonte precisa: Bluegrass Today — corpo dell'articolo, paragrafo su «driving, tight beat» — 27/02/2014
- Estratto: «also has enough acoustic guitar and Americana tinge»; Avicii: «helped create the bluegrass elements on the track»
- Esito: CONFERMATA CON RISERVA — la fonte parla di «elementi bluegrass» e di «Americana tinge», non di un'«anima» bluegrass; Wikipedia classifica il genere come «progressive house, country pop».
- Correzione proposta: «il brano unisce un ritmo dance a elementi bluegrass, con chitarra acustica e un’impronta americana».

##### A4 — P1
- Affermazione: «insolita per la musica elettronica»
- Fonte precisa: Bluegrass Today — stesso paragrafo — 27/02/2014
- Estratto: «many fans and critics… were nonplussed»; «the unlikely pairing»
- Esito: CONFERMATA CON RISERVA — regge come impressione di novità (fonte: «Avicii’s decision to add a rustic edge»); il giudizio «insolita» è della fonte solo per i fan/critici presenti a Miami, e Bluegrass Today è una testata bluegrass.
- Correzione proposta: «una scelta che, alla prima esibizione a Miami, lasciò perplessi molti fan e critici (Bluegrass Today)» oppure lasciare la frase attribuendola («secondo Bluegrass Today, un accostamento insolito per l’EDM»).

##### A5 — P1
- Affermazione: «Esplora il legame fra fratelli»
- Fonte precisa: Wikipedia — incipit — letta il 21/09/2026
- Estratto: «"Hey Brother" sees Avicii giving his brother advice.»
- Esito: CONFERMATA CON RISERVA — Wikipedia dice «consiglio di Avicii al fratello» (senza fonte sua che io abbia aperto: [3]), non un tema generale sul «legame fra fratelli»; Bluegrass Today non dice nulla sul testo.
- Correzione proposta: «Secondo Wikipedia, il testo è un consiglio che Avicii rivolge al fratello» oppure dichiarare che è una lettura del testo (R8).

##### A6 — P1
- Affermazione: «e, per estensione, il bisogno di esserci per le persone a cui si vuole bene»
- Fonte precisa: nessuna delle fonti citate. Fonte alternativa (livello C, giornalismo interpretativo): Newsweek, Jessica Kwong, 20/04/2018 — https://www.newsweek.com/what-do-avicii-songs-wake-me-and-hey-brother-mean-896018
- Estratto: «settles on the importance of being there for a brother, a sister, and by extension, other human beings»
- Esito: NON CONFERMATA (da Bluegrass Today e Wikipedia). Nota: la formula è quasi identica a quella di Newsweek («by extension»), quindi va attribuita o riscritta.
- Correzione proposta: «Secondo Newsweek, il testo insiste sull’importanza di esserci per un fratello, una sorella e, per estensione, per gli altri esseri umani.» (aggiungere Newsweek fra le fonti) — oppure togliere la frase.

##### A7 — P2
- Affermazione: «Tyminski ha raccontato di essere stato…»
- Fonte precisa: Bluegrass Today — articolo di Aaron Keith Harris — 27/02/2014
- Estratto: «“I’m always flattered when someone wants to work with me,” said Tyminski»
- Esito: CONFERMATA CON RISERVA — R3: il genere è un profilo/notizia («Hey Brother takes Tyminski to EDM charts»), non un'intervista dichiarata; le parole sono riportate in forma di «said Tyminski», senza dire esplicitamente a chi (con ogni probabilità a Harris, ma non è scritto). Le altre dichiarazioni di A8–A12 dipendono da questa fonte.
- Correzione proposta: «Secondo un articolo di Bluegrass Today (febbraio 2014), Tyminski ha raccontato di essere stato inizialmente titubante…» (evitare «ha raccontato» senza testata).

##### A8 — P2
- Affermazione: «inizialmente titubante, temendo che il genere fosse troppo lontano dal suo»
- Fonte precisa: Bluegrass Today — paragrafo «It all started with a phone call…» — 27/02/2014
- Estratto: «great, but this may be a little too far out of my genre»
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P2
- Affermazione: «di essersi convinto ascoltando il brano già completato»
- Fonte precisa: Bluegrass Today — stesso paragrafo e paragrafo successivo (Avicii) — 27/02/2014
- Estratto: «the basic track was done, so Tyminski listened to it»; Avicii: «his participation wasn’t locked down until after the track was almost finished»
- Esito: CONFERMATA CON RISERVA — la fonte dice «basic track was done» (base fatta), non «brano completato»; Avicii dice che l'ingaggio è stato deciso quando il pezzo era «quasi finito». Le voci (24 tracce) le registrò Tyminski dopo, in meno di un mese.
- Correzione proposta: «ascoltando la base del brano, già pronta»

##### A10 — P2
- Affermazione: «trovandolo nella tonalità perfetta per la propria voce»
- Fonte precisa: Bluegrass Today — stesso paragrafo — 27/02/2014
- Estratto: «“It was in the perfect key for me,”»
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P2
- Affermazione: «fu poi sua figlia… a convincerlo del tutto con il proprio entusiasmo»
- Fonte precisa: Bluegrass Today — paragrafo «After texting his daughter Kathryn, 20…» — 27/02/2014
- Estratto: «“She just went crazy. Her level of excitement raised my interest dramatically.”»
- Esito: CONFERMATA CON RISERVA — l'ordine è giusto (dopo aver sentito la base), ma la fonte dice che l'entusiasmo della figlia «aumentò moltissimo il suo interesse» dopo un messaggio in cui le chiedeva se conoscesse Avicii; «convincerlo del tutto» è più forte. Tyminski aveva già avuto una seconda reazione positiva («Am I crazy, or is this something that seems like it would work?»).
- Correzione proposta: «e a farlo decidere contribuì l’entusiasmo della figlia, a cui aveva chiesto se conoscesse Avicii»

##### A12 — P2
- Affermazione: «sua figlia, allora ventenne»
- Fonte precisa: Bluegrass Today — stesso paragrafo — 27/02/2014
- Estratto: «his daughter Kathryn, 20»
- Esito: CONFERMATA (età alla data dell'articolo, febbraio 2014; il contatto con Avicii è di prima, ma «allora» regge).
- Correzione proposta: —

##### A13 — P2
- Affermazione: «uscito come singolo nell'ottobre 2013»
- Fonte precisa: Bluegrass Today — paragrafo sulle classifiche; Wikipedia — sezione lead
- Estratto: «released as a single in October 2013»; Wikipedia: «released to Australian radio on 9 October 2013… 28 October in Germany, Switzerland and Austria»
- Esito: CONFERMATA (nota: le date variano per paese; «ottobre 2013» è corretto in entrambe le fonti).
- Correzione proposta: —

##### A14 — P2
- Affermazione: «raggiunse il primo posto delle classifiche pop in oltre dieci paesi europei»
- Fonte precisa: Bluegrass Today — paragrafo sulle classifiche — 27/02/2014; Wikipedia — tabella «Weekly charts»
- Estratto: «hit number one on the pop charts in Austria, Belgium, the Czech Republic, Finland, Germany, Hungary…» (14 voci, Scozia inclusa)
- Esito: CONFERMATA CON RISERVA — il numero (14 secondo la fonte; nella tabella di Wikipedia, che include anche Francia e Slovenia, i numeri uno sono più di quindici) supera «oltre dieci». Riserve: alcune sono classifiche radiofoniche (Rep. Ceca, Polonia, Slovacchia), la Scozia è una classifica di vendite, il Belgio è la sola Vallonia (in Fiandre fu terzo); in Italia arrivò terzo. «Classifiche pop» è la formula dell'articolo.
- Correzione proposta: «raggiunse il primo posto in classifiche di oltre dieci paesi europei (fra cui Germania, Spagna, Svezia, Austria e Svizzera)» — oppure lasciare com'è attribuendo: «secondo Bluegrass Today».

##### A15 — P2
- Affermazione: «oltre a quella dance in Regno Unito e Stati Uniti»
- Fonte precisa: Bluegrass Today — stesso paragrafo; Wikipedia — tabella (UK Dance; US Dance Club Songs; US Hot Dance/Electronic Songs)
- Estratto: «as well as topping the dance charts in the United Kingdom and the United States»; Wikipedia: «peaked at the top of the UK Dance Chart»
- Esito: CONFERMATA (Wikipedia: 6 settimane al primo posto nella UK Dance Chart; negli USA primo sia in Dance Club Songs sia in Hot Dance/Electronic Songs).
- Correzione proposta: —

##### A16 — Frase iconica
- Affermazione: «la voce che apre il brano: quella del cantante bluegrass Dan Tyminski»
- Fonte precisa: nessuna delle fonti citate dice che Tyminski apra il brano.
- Estratto: «non letto: dettaglio non presente in Bluegrass Today né in Wikipedia; non ho potuto ascoltare o trovare uno spartito/una descrizione dell'attacco»
- Esito: NON DOCUMENTABILE
- Correzione proposta: «il dettaglio più sorprendente riguarda la voce solista: quella del cantante bluegrass Dan Tyminski…» (togliere «che apre il brano», salvo verifica all'ascolto documentata con una fonte).

##### A17 — Frase iconica
- Affermazione: «il cantante bluegrass Dan Tyminski»
- Fonte precisa: Bluegrass Today — incipit — 27/02/2014
- Estratto: «the most recognizable male bluegrass voice on the planet today»
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — Frase iconica
- Affermazione: «già noto per aver doppiato George Clooney nel film "Fratello, dove sei?"»
- Fonte precisa: Bluegrass Today — incipit — 27/02/2014; it.wikipedia «Fratello, dove sei?» (non fra le fonti citate)
- Estratto: «his turn as George Clooney’s stunt singer in O Brother, Where Art Thou?»; it.wikipedia: «Le voci dei Soggy Bottom Boys furono fornite da Dan Tyminski (voce solista in Man of Constant Sorrow)»
- Esito: CONFERMATA CON RISERVA — «doppiato» è impreciso: la fonte dice «stunt singer» (cantò al posto suo); più corretto «prestato la voce cantata a George Clooney». Il titolo italiano del film è corretto ma non sta nelle fonti citate.
- Correzione proposta: «già noto per aver prestato la voce cantata a George Clooney in "Fratello, dove sei?"» (aggiungere it.wikipedia come fonte del titolo italiano).

##### A19 — Frase iconica
- Affermazione: «Avicii lo volle»
- Fonte precisa: Bluegrass Today — paragrafo «It all started with a phone call…» e paragrafo di Avicii — 27/02/2014
- Estratto: «Avicii… wanted Tyminski as lead vocalist»; Avicii: «I had Dan in mind»
- Esito: CONFERMATA (Songfacts, non citata e livello C, dice invece che Avicii avrebbe provato sei cantanti prima di scegliere Tyminski: non ho potuto verificare; non contraddice ma è da tener presente).
- Correzione proposta: —

##### A20 — Frase iconica
- Affermazione: «per il timbro "terroso" della sua voce»
- Fonte precisa: Bluegrass Today — paragrafo di Avicii (e-mail a Harris) — 27/02/2014
- Estratto: «Dan has this earthy tone to his voice, that’s what helped create the bluegrass elements on the track.»
- Esito: CONFERMATA CON RISERVA — le parole sono di Avicii (risposta via e-mail, come dice l'articolo), «earthy» tradotto in «terroso» fra virgolette; il nesso «lo volle *per*» è un'interpretazione: Avicii dice che il timbro «ha contribuito a creare» gli elementi bluegrass. La parola «terroso» è tra virgolette come citazione tradotta: accettabile, ma meglio attribuita.
- Correzione proposta: «Avicii ha spiegato a Bluegrass Today che il timbro “terroso” della voce di Tyminski aveva contribuito a creare gli elementi bluegrass del pezzo.»

##### A21 — Frase iconica
- Affermazione: «capace di dare al pezzo l'elemento bluegrass»
- Fonte precisa: Bluegrass Today — stessa citazione di Avicii — 27/02/2014
- Estratto: «that’s what helped create the bluegrass elements on the track»
- Esito: CONFERMATA (sfumatura: «helped create» = «contribuì a creare», non «diede da solo»)
- Correzione proposta: — (facoltativo: «contribuì a dare»)

##### A22 — Metadati
- Affermazione: anno «2013»
- Fonte precisa: Wikipedia; Bluegrass Today
- Estratto: «from his debut studio album, True (2013)»; «released as a single in October 2013»
- Esito: CONFERMATA (anno del singolo e dell'album coincidono)
- Correzione proposta: —

##### A23 — Metadati
- Affermazione: album «True»
- Fonte precisa: Wikipedia — incipit; Letras.com
- Estratto: «from his debut studio album, True (2013)»
- Esito: CONFERMATA (album originale; Wikipedia segnala inoltre la versione di remix in True (Avicii by Avicii), 2014, non quella della scheda)
- Correzione proposta: —

##### A24 — Metadati
- Affermazione: ascoltiTesto «1,3 mld ascolti»
- Fonte precisa: kworb — https://kworb.net/spotify/artist/1vCWHaC5f2uS3yhpwWbIA6_songs.html (pagina Avicii, non citata dalla scheda) — riga «Hey Brother» con ID 4lhqb6JvbHId48OUJGwymk — aggiornata 20/09/2026, letta il 21/09/2026
- Estratto: «Hey Brother … 1,349,837,060»
- Esito: CONFERMATA — 1,349 mld arrotonda a 1,3 mld (stream Spotify, versione originale; le altre versioni sono voci separate).
- Correzione proposta: —

##### A25 — Metadati
- Affermazione: genereTesto «Dance / Folk house»
- Fonte precisa: Wikipedia — infobox — 21/09/2026
- Estratto: «Genre: Progressive house, country pop»; «is a dance song»
- Esito: NON CONFERMATA — «Folk house» non compare nelle fonti citate né in quelle che ho letto.
- Correzione proposta: «Dance / Country pop» oppure «Dance / Progressive house» (Wikipedia) — o «Dance / Bluegrass» in linea con la scheda.

#### Controlli sui metadati e sui link
- anno: 2013 (singolo e album) — ok.
- album: True (originale, non raccolta) — ok.
- ascoltiTesto: kworb (Avicii, aggiornato 20/09/2026, letto 21/09/2026): 1.349.837.060 per «Hey Brother»; «1,3 mld» regge. La scheda non cita kworb fra le fonti.
- spotifyId 4lhqb6JvbHId48OUJGwymk: oEmbed risponde 200, titolo «Hey Brother» — ok (l'ID è lo stesso della riga kworb con 1,35 mld).
- testoUrl https://www.letras.com/avicii/hey-brother/: 200, pagina «HEY BROTHER - Avicii - LETRAS.COM», album True — ok.
- Fonti citate: Bluegrass Today 200 (aperta e letta per intero il 21/09/2026, testo sorgente via curl); Wikipedia 200 (letta).
- Fonti non citate consultate: Newsweek (letta, 20/04/2018), it.wikipedia «Fratello, dove sei?» (letta), en.wikipedia «Dan Tyminski» (letta), Songfacts (letta), SecondHandSongs (403), Genius (bloccata).
- Nota: nessuna fonte è di Future plc, quindi nessun problema di data in cima alla pagina.

#### Omissioni rilevanti (solo se cambiano il senso)
- Nessuna che cambi il senso. Solo osservazione: l'articolo di Bluegrass Today dice che Tyminski e il produttore Neal Cappellino registrarono a distanza 24 tracce di melodia e armonia; e che nel Regno Unito il singolo arrivò secondo (non primo) nella classifica dei singoli, dietro Lily Allen (Wikipedia): non c'è contraddizione con la scheda, che parla di classifiche dance per il Regno Unito.


---

## A.6 — Urlando contro il cielo (Ligabue) · `canzone/urlando-contro-il-cielo/`

### Esito — Urlando contro il cielo (Ligabue)
Pagina: canzone/urlando-contro-il-cielo/ — verificata il 21/09/2026 — priorità: 61 impressioni (posizione media 13,4)

Fonti aperte di persona (scaricate e lette il 21/09/2026, HTTP 200): Wikipedia voce del brano (ultima modifica 13/03/2025), Wikipedia voce dell'album (ultima modifica 17/08/2026), OndaRock monografia Ligabue (di Federico Piccioni; pubblicata 02/02/2025, aggiornata 26/05/2026 secondo i dati strutturati), Sky TG24 fotogallery (data visibile in pagina 11/03/2020; i dati strutturati riportano 21/09/2023), Solo Belle Canzoni (pubblicata 14/01/2026, modificata 27/02/2026), kworb (pagina citata + pagina artista), Letras. Fonti extra lette: Wikipedia voce di «A che ora è la fine del mondo?»; Il Cittadino di Monza e Brianza (20/08/2016); commenti di Ligabue alle canzoni dell'album, via Wayback (snapshot 14/03/2016) del sito digilander «tuttosuliga» (originale morto, 410). Non riuscito ad aprire: database FIMI (pagina JS/form, nessun dato leggibile).

#### Riepilogo
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]
- Difetti in ordine di gravità:
  1. A22 (frase iconica) — «il narratore invita chi ascolta a non arrendersi finché il cuore continua a battere» è una lettura del testo che nessuna fonte contiene; nel testo l'interlocutore è un compagno di viaggio, non l'ascoltatore; la clausola è una parafrasi molto ravvicinata di un verso dell'attacco.
  2. A15 — «ottenne il disco d'oro»: la stessa voce Wikipedia, nella scheda (fonte FIMI, consultata 27/12/2023), dà il singolo come disco di PLATINO (100.000+); solo il corpo del testo, senza nota, dice «oro». Dato probabilmente superato.
  3. A9 / A11 — l'episodio nel campo è un racconto di Ligabue stesso, ma la scheda lo dà come fatto senza attribuzione (R3); «da solo» sta solo in Solo Belle Canzoni (che a sua volta cita solo Wikipedia), non nelle parole di Ligabue né in Wikipedia.
  4. A16 / A19 — «quasi interamente dal pubblico» e «ufficiale» sono formulazioni di Solo Belle Canzoni; Wikipedia dice «cantata dal pubblico» e «primo brano dal vivo inciso».
  5. A3 — «22,9 mln» non corrisponde a nessun dato che ho trovato su kworb per l'ID indicato.
- Cosa non sono riuscito a documentare: il valore attuale della certificazione FIMI (database non leggibile); il libretto «Buon compleanno Elvis – Extra booklet» (2008) su cui Wikipedia fonda la storia della versione live (nessuna riga verificata di persona); il dato per l'ID Spotify esatto della scheda su kworb (l'ID non compare nell'elenco kworb).
- Sospetto verso nella frase iconica: no per citazioni (nessuna virgoletta, il titolo non è citato come verso). Riserva: l'ultima clausola («non arrendersi finché il cuore continua a battere») rende quasi alla lettera un verso dell'attacco del brano (verificato su Letras): è parafrasi, non citazione, ma molto vicina; conviene sostituirla (vedi A22).

#### Affermazioni

##### A1 — Metadati (anno)
- Affermazione: anno «1991»
- Fonte precisa: Wikipedia (voce del brano) — https://it.wikipedia.org/wiki/Urlando_contro_il_cielo — scheda «Pubblicazione» — data pagina 13/03/2025; Il Cittadino MB 20/08/2016 (alternativa)
- Estratto: «Pubblicazione 1991»; «Album di provenienza Lambrusco coltelli rose & pop corn»
- Esito: CONFERMATA (anno dell'album, 20/09/1991, e del singolo coincidono; il singolo era un 7" promo)
- Correzione proposta: —

##### A2 — Metadati (album)
- Affermazione: album «Lambrusco coltelli rose & pop corn»
- Fonte precisa: Wikipedia voce del brano e voce dell'album — https://it.wikipedia.org/wiki/Lambrusco_coltelli_rose_%26_pop_corn — scheda — data pagina 17/08/2026
- Estratto: «pubblicato come quarto singolo estratto dall'album Lambrusco coltelli rose & pop corn del 1991»
- Esito: CONFERMATA (album originale, non raccolta)
- Correzione proposta: —

##### A3 — Metadati (ascoltiTesto)
- Affermazione: «22,9 mln ascolti»
- Fonte precisa: kworb — pagina citata https://kworb.net/spotify/ (classifiche generali: NON contiene il dato); pagina artista https://kworb.net/spotify/artist/7H8ZC8uHJMPZGLMApRRNIz_songs.html — «Updated: 2026/09/14», letta il 21/09/2026
- Estratto: riga «Urlando contro il cielo - Remastred» (ID 1TmAn3b66famBG9nTx6W99): 23,040,739 stream; «- Live» 4,417,577; «Live; Remastered» 1,036,773
- Esito: CON RISERVA. L'ID della scheda (1wx5hbovwZoPeTUom8cuQ4) NON compare nell'elenco kworb (341 brani sopra 100.000 stream). La versione più vicina (Remastred) è a 23,04 mln il 14/09/2026, cioè oggi si arrotonderebbe a «23,0 mln», non «22,9». Con circa 13.000 stream/giorno il 22,9 era probabilmente vero una decina di giorni prima (deduzione, non letta).
- Correzione proposta: aggiornare a «23 mln ascolti» (fonte: kworb, pagina artista Ligabue, agg. 14/09/2026, versione «Remastred»), oppure dichiarare che il dato è quello della versione remaster e cambia nel tempo. Come fonte, puntare all'URL della pagina artista kworb, non a https://kworb.net/spotify/.

##### A4 — P1
- Affermazione: «Quarto singolo estratto da Lambrusco coltelli rose & pop corn»
- Fonte precisa: Wikipedia voce del brano (incipit) e voce dell'album (sezione «Singoli» in scheda: 1 Intro/Libera nos a malo, 2 Lambrusco & pop corn, 3 Sarà un bel souvenir, 4 Urlando contro il cielo, 5 Salviamoci la pelle!!!!, …); riscontro indipendente: Il Cittadino di Monza e Brianza, 20/08/2016, https://www.ilcittadinomb.it/news/cultura-e-tempo-libero/ligabue-verso-monza-con-il-25esimo-di-urlando-contro-il-cielo-il-video-registrato-a-desio-nel-1991/
- Estratto: «pubblicato come quarto singolo estratto dall'album»; Il Cittadino: «Pubblicato poi come quarto singolo del disco»
- Esito: CONFERMATA (nota: secondo Wikipedia è un 7" promo per jukebox, WEA Italiana PROMO 445; nessuna data precisa del singolo)
- Correzione proposta: —

##### A5 — P1
- Affermazione: «il secondo album di Ligabue»
- Fonte precisa: Wikipedia voce dell'album — incipit
- Estratto: «è il secondo album in studio del cantante italiano Luciano Ligabue, pubblicato dalla WEA Italiana nel 1991»
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: album «uscito nel 1991»
- Fonte precisa: Wikipedia voce dell'album — scheda; OndaRock monografia — sezione sul secondo album
- Estratto: «Pubblicazione 20 settembre 1991»; OndaRock: «esce nel settembre del 1991»
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: «Il brano era già stato scritto ai tempi del primo disco»
- Fonte precisa: Wikipedia voce del brano, sezione «Descrizione»; OndaRock, sezione sul secondo album
- Estratto: «Nonostante fosse stata composta già nell'anno del primo album»; OndaRock: «già pronto nel 1990»
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P1
- Affermazione: «Ligabue scelse di tenerlo da parte e pubblicarlo solo l'anno successivo»
- Fonte precisa: Wikipedia voce del brano, «Descrizione» (senza nota); OndaRock dice altro sul perché
- Estratto: «Ligabue decise di non pubblicarla in esso, ma la pubblicò l'anno successivo»; OndaRock: «misteriosamente escluso dal debutto discografico»
- Esito: CONFERMATA (il «perché» non è noto: OndaRock lo definisce misterioso; la scheda non dà un motivo, va bene così)
- Correzione proposta: —

##### A9 — P1
- Affermazione: «Il titolo nacque da un episodio autobiografico»
- Fonte precisa: Sky TG24 (fotogallery, scheda 3/15, data visibile 11/03/2020); Wikipedia voce del brano, sezione «Il testo»; primario: commenti di Ligabue alle canzoni dell'album (https://web.archive.org/web/20160314033358/http://digilander.libero.it/tuttosuliga/commento2.html)
- Estratto: Sky: «prende spunto da un'esperienza personale: un momento di sfogo che colse il cantante in un campo isolato»; Ligabue: «parla di una cosa che ho fatto veramente, fisicamente»
- Esito: CON RISERVA. (a) Le fonti parlano della canzone/del testo, non del «titolo» in sé. (b) R3: l'episodio è noto solo perché lo racconta Ligabue stesso (commento alle canzoni, senza data né testata verificabile: pagina di fan); la scheda lo dà come fatto senza attribuzione. Sky e Wikipedia lo riportano senza dire dove Ligabue l'abbia detto.
- Correzione proposta: «Il brano nasce, per il racconto di Ligabue stesso, da un episodio autobiografico:» (poi la frase su A10–A12). Fonte da aggiungere (livello C, trascrizione di fan dei commenti dell'artista): il link Wayback sopra.

##### A10 — P1
- Affermazione: «in un periodo di forte tensione»
- Fonte precisa: Solo Belle Canzoni (paragrafo «La canzone nasce da un'esperienza vera») — https://solobellecanzoni.altervista.org/urlando-contro-il-cielo-ligabue/ — data 14/01/2026; Wikipedia «Il testo»; primario Ligabue (Wayback)
- Estratto: SBC: «in un periodo di forte stress e inquietudine»; Wikipedia: «scaricare tutta la sua tensione interiore»; Ligabue: «In un momento di ingorgo emotivo, di pressioni che sentivo dentro»
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P1
- Affermazione: «si fermò da solo in mezzo a un campo isolato»
- Fonte precisa: Wikipedia «Il testo» («fermatosi in mezzo ad un campo isolato», senza «da solo»); Solo Belle Canzoni («fermatosi da solo in un campo della Bassa emiliana»); primario Ligabue: «mi sono fermato in un campo»
- Estratto: Ligabue: «mi sono fermato in un campo, e mi sono messo a cacciare un urlo bestiale»
- Esito: CON RISERVA. «Da solo» compare solo in Solo Belle Canzoni (blog, che cita come unica fonte Wikipedia, dove non c'è); Ligabue dice che girava in auto «nelle strade della bassa» e si fermò in un campo, senza dire «da solo» né «isolato»; «isolato» è di Wikipedia.
- Correzione proposta: «si fermò in un campo della Bassa emiliana e cominciò a urlare, per sfogarsi» (tolto «da solo», «isolato»; «Bassa» dal commento di Ligabue).

##### A12 — P1
- Affermazione: «iniziò spontaneamente a urlare contro il cielo per sfogarsi»
- Fonte precisa: Wikipedia «Il testo»; primario Ligabue
- Estratto: Wikipedia: «ha iniziato spontaneamente ad "urlare contro il cielo" per dare sfogo»; Ligabue: «Una cosa terapeutica, liberatoria»
- Esito: CONFERMATA
- Correzione proposta: —

##### A13 — P2
- Affermazione: «Diventata una delle canzoni più amate della sua carriera»
- Fonte precisa: Wikipedia «Descrizione»; Sky; Solo Belle Canzoni
- Estratto: Wikipedia: «È uno dei brani più conosciuti del cantautore»; Sky: «Il brano da stadio per eccellenza della discografia di Ligabue»; SBC: «una delle sue canzoni più famose e amate»
- Esito: CON RISERVA. «Più amate» sta solo in Solo Belle Canzoni (opinione di blog); Wikipedia dice «più conosciuti», Sky «brano da stadio».
- Correzione proposta: «Una delle canzoni più conosciute di Ligabue, il suo brano da stadio per eccellenza secondo Sky TG24» oppure «una delle più conosciute della sua carriera».

##### A14 — P2
- Affermazione: «un pezzo fisso dei concerti»
- Fonte precisa: Wikipedia voce del brano — «Versione dal vivo» e incipit
- Estratto: «secondo il quale questo pezzo non può mancare nei suoi concerti»; «suonato sia all'apertura che alla chiusura dei concerti del Liga Rock Park»
- Esito: CONFERMATA
- Correzione proposta: —

##### A15 — P2
- Affermazione: «ottenne il disco d'oro in Italia»
- Fonte precisa: Wikipedia voce del brano — «Descrizione» (senza nota) vs scheda informativa
- Estratto: testo: «È uno dei brani più conosciuti del cantautore, diventato anche disco d'oro»; scheda della stessa pagina: «Certificazioni FIMI (dal 2009) Dischi di platino Italia (vendite: 100 000+)», nota FIMI consultata 27/12/2023; categoria «Singoli certificati disco di platino in Italia»
- Esito: CON RISERVA. La frase sull'oro è nel corpo, non sostenuta da nota e più vecchia; la scheda della stessa voce, con nota al database FIMI (id 11834), dà il platino. Non sono riuscito ad aprire il database FIMI (pagina non leggibile), quindi non so quale sia il dato ufficiale oggi. Solo Belle Canzoni ripete «oro» e cita come fonte Wikipedia: non è indipendente.
- Correzione proposta: dichiarare il dubbio (R8) / riportare entrambe (R5): «Secondo la voce di Wikipedia è certificato in Italia: disco d'oro nel testo, disco di platino (100.000 unità) nella scheda che rinvia al database FIMI.» Meglio ancora: verificare a mano il record FIMI e scrivere solo quello; se non verificabile, togliere «ottenne il disco d'oro» o usare «risulta certificato dalla FIMI».

##### A16 — P2
- Affermazione: esecuzione dal vivo «cantata quasi interamente dal pubblico»
- Fonte precisa: Wikipedia voce del brano — «Versione dal vivo»; Solo Belle Canzoni — paragrafo sul live
- Estratto: Wikipedia: «La versione live cantata dal pubblico»; SBC: «Una versione cantata quasi interamente dal pubblico»
- Esito: CON RISERVA. «Quasi interamente» è solo di Solo Belle Canzoni (che a sua volta cita solo Wikipedia). La fonte di base (libretto Minervini, non letto) è citata da Wikipedia per l'insieme.
- Correzione proposta: «una versione dal vivo cantata dal pubblico» (togliere «quasi interamente»).

##### A17 — P2
- Affermazione: registrata «durante il Neverending Tour del 1991»
- Fonte precisa: Wikipedia voce del brano — «Versione dal vivo»; riscontro: voce «A che ora è la fine del mondo?» e Il Cittadino MB (video girato il 03/10/1991 a Desio, «105ª tappa del Neverending Tour», citando la pagina di Ligabue)
- Estratto: «registrata nel 1991 durante il Neverending Tour»
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — P2
- Affermazione: «pubblicata nel 1994 nell'album A che ora è la fine del mondo?»
- Fonte precisa: Wikipedia voce del brano — «Versione dal vivo»; OndaRock — sezione sul disco («Urlando contro il cielo, qui riproposta in versione live»); Wikipedia voce dell'album: uscito 28/10/1994, traccia 8 «Urlando contro il cielo (live)»
- Estratto: «contenuta nell'album A che ora è la fine del mondo? del 1994»
- Esito: CONFERMATA
- Correzione proposta: —

##### A19 — P2
- Affermazione: «come primo brano live ufficiale di Ligabue»
- Fonte precisa: Wikipedia voce del brano — «Versione dal vivo» (nota al libretto Minervini, «Buon compleanno Elvis – Extra booklet», 2008); Solo Belle Canzoni
- Estratto: Wikipedia: «è il primo brano dal vivo inciso da Ligabue»; SBC: «la prima registrazione live ufficiale di Ligabue»
- Esito: CON RISERVA. Superlativo («primo») documentato solo da Wikipedia con un libretto che non ho potuto leggere; «ufficiale» è di Solo Belle Canzoni, non di Wikipedia. Non ho trovato una terza fonte.
- Correzione proposta: «che, secondo Wikipedia, è il primo brano dal vivo inciso da Ligabue» (attribuire; togliere «ufficiale»), oppure togliere il «primo».

##### A20 — Frase iconica
- Affermazione: «Il titolo racconta il bisogno di liberarsi da una tensione interiore urlando verso il cielo»
- Fonte precisa: Wikipedia «Il testo»; primario Ligabue («Una cosa terapeutica, liberatoria»)
- Estratto: «per dare sfogo e scaricare tutta la sua tensione interiore»
- Esito: CONFERMATA (vedi però A9 sull'attribuzione)
- Correzione proposta: —

##### A21 — Frase iconica
- Affermazione: «un gesto di sfogo e resistenza più che di rabbia»
- Fonte precisa: Solo Belle Canzoni (secondo paragrafo); primario Ligabue (Wayback)
- Estratto: SBC: «non era una bestemmia o una rabbia cieca, ma un modo per dire "ci siamo anche noi"»; Ligabue: «Non soltanto un'imprecazione, anche la voglia di sfogarsi e di far sentire la propria presenza»
- Esito: CON RISERVA. Ligabue dice «non soltanto» un'imprecazione, non «più che rabbia»; «resistenza» è interpretazione di Solo Belle Canzoni, non parola di Ligabue.
- Correzione proposta: «un gesto di sfogo e di affermazione di sé, non soltanto un'imprecazione, come lo ha descritto Ligabue.»

##### A22 — Frase iconica
- Affermazione: «con cui il narratore invita chi ascolta a non arrendersi finché il cuore continua a battere»
- Fonte precisa: nessuna fonte citata lo contiene. Solo Belle Canzoni riassume il senso («voglia di resistere e andare avanti comunque», «voglia di non arrendersi mai») senza «invita chi ascolta» né «cuore». Riscontro sul testo (Letras https://www.letras.com/ligabue-luciano/22892/): la clausola coincide con un verso dell'attacco, e chi parla si rivolge a un «tu» compagno di viaggio, non a chi ascolta.
- Estratto: non applicabile (interpretazione)
- Esito: NON CONFERMATA (e sospetto parafrasi ravvicinata di un verso)
- Correzione proposta: sostituire con: «con cui il narratore, in viaggio con qualcuno, rivendica la voglia di andare avanti nonostante giorni vuoti e un futuro incerto (lettura di Solo Belle Canzoni).» oppure togliere la clausola dopo «rabbia».

#### Controlli sui metadati e sui link
- anno 1991: singolo e album 1991 (album 20/09/1991). Ok.
- album: originale del 1991, non raccolta. Ok.
- ascoltiTesto: vedi A3. Letto il 21/09/2026: pagina kworb aggiornata al 14/09/2026, «Remastred» 23,040,739; l'arrotondamento «22,9 mln» non regge oggi.
- spotifyId 1wx5hbovwZoPeTUom8cuQ4: oEmbed risponde 200, titolo «Urlando contro il cielo» (titolo giusto). Nota: esistono più versioni; kworb registra la versione «Remastred» con ID diverso (1TmAn3b66famBG9nTx6W99, oEmbed: «Urlando contro il cielo - Remastred»); l'ID della scheda non è nell'elenco kworb.
- testoUrl https://www.letras.com/ligabue-luciano/22892/: 200; è la pagina del testo di «Urlando Contro Il Cielo», album Lambrusco Coltelli Rose & Popcorn 1991.
- Stato HTTP fonti citate (tutte lette con user-agent normale): Sky TG24 200; OndaRock 200; Wikipedia brano 200; Wikipedia album 200; Solo Belle Canzoni 200; kworb/spotify/ 200 (ma non contiene il dato). Nessun paywall.
- Fonti citate e uso: Sky TG24 sostiene solo l'origine autobiografica (A9, A11 in parte); OndaRock sostiene A6, A7, A18; le due voci Wikipedia sostengono quasi tutto il resto; Solo Belle Canzoni sostiene A10, A11 («da solo»), A13, A16, A19 con formulazioni proprie.

#### Omissioni rilevanti (solo se cambiano il senso)
- Certificazione: la stessa voce Wikipedia riporta anche il platino (vedi A15): se confermato dal database FIMI, «disco d'oro» sottostima il dato.
- Il «singolo» è un 7" promo per jukebox (WEA Italiana, PROMO 445), non un'uscita commerciale (voce Wikipedia, sezione «Tracce»): «quarto singolo estratto» regge, ma il lettore potrebbe intendere un'uscita in negozio. Il Cittadino MB dice semplicemente «quarto singolo del disco».
- Vicinanza a Solo Belle Canzoni (segnalazione per il redattore, non un'affermazione): P1 e P2 ricalcano da vicino la struttura e alcune scelte lessicali di quella pagina (scritta prima del primo disco, «tenerla da parte», «da solo», «quasi interamente dal pubblico», «prima registrazione live ufficiale», «disco d'oro»), e quella pagina cita come unica fonte Wikipedia. Per il principio di indipendenza (R5) Solo Belle Canzoni non conta come conferma autonoma di ciò che Wikipedia dice.
- La fonte primaria migliore trovata (commenti di Ligabue alle canzoni dell'album, via Wayback: https://web.archive.org/web/20160314033358/http://digilander.libero.it/tuttosuliga/commento2.html) non è tra le fonti della scheda; è livello C (trascrizione di fan, senza data né sede originale dichiarata), ma chiarisce il senso dell'episodio.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]


---

## A.7 — Vivo per lei (Andrea Bocelli e Giorgia) · `canzone/vivo-per-lei/`

### Esito — Vivo per lei (Andrea Bocelli e Giorgia)
Pagina: canzone/vivo-per-lei/ — verificata il 21/09/2026 — priorità: 57 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 13,5

#### Riepilogo
- Affermazioni esaminate: 28 — CONFERMATA 14, CON RISERVA 10, NON CONFERMATA 3, CONTRADDETTA 1, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A10 — «primo estratto» dall'album «Bocelli»: CONTRADDETTA (la stessa Wikipedia IT, alla voce dell'album, dice che «Con te partirò» e «Per amore» erano già usciti; Wikipedia EN mette «Per amore» 1995 prima di «Vivo per lei» 1996).
  2. A9 — «pubblicato il 25 agosto 1995»: data presente solo nella voce IT (con nota a Fanpage, che non ho potuto aprire: 403); l'album da cui sarebbe estratto uscì il 13/11/1995; Wikipedia EN e Discogs indicano il 1996; anche l'infobox della voce IT dice 1996. Non documentata.
  3. A19/A20 — frase iconica: «il momento più citato» non ha alcuna fonte; «a metà brano» non regge (nella trascrizione Letras la prima menzione esplicita della musica arriva verso l'80% del testo).
  4. A13 (R3) — la dichiarazione di Panceri è attribuita a «Sky TG24», ma la pagina Sky è una fotogallery che cita un'intervista al Corriere della Sera (Barbara Gerosa): la scheda non dice a chi Panceri ha parlato.
  5. A7 — «Nello stesso anno» (1995): Panceri stesso, al Corriere (riportato da Il Fatto Quotidiano, 21/01/2025), dice «Era il 1996»; le fonti divergono e la scheda non lo dichiara.
  6. A5 — «Un disco per l'estate»: sostenuto dalla voce IT e da Tgcom24, ma la voce O.R.O. (fra le fonti citate) e la voce «Sanremo Giovani 1995» dicono Sanremo Giovani (7-8/11/1995); la scheda non lo menziona.
  7. A24/A22 — frase iconica: «ambiguità per tutto il brano» contraddice la «rivelazione a metà brano» della stessa frase; «scritta dal gruppo O.R.O.» contraddice P1 (testo di Alibani, non del gruppo).
- Cosa non sono riuscito a documentare: la data di uscita del singolo italiano (Discogs 403, Fanpage 403, SecondHandSongs 403; musicbrainz non ha il singolo italiano); la ripartizione degli autori originali (SIAE non aperta, solo la voce Wikipedia IT); il testo originale dell'intervista al Corriere della Sera (non aperto: Sky e Il Fatto lo riportano); il momento esatto in cui, nel brano audio, compare la parola «musica» (ho solo la trascrizione Letras).
- Sospetto verso nella frase iconica: no (tra virgolette c'è solo la parola «lei», pronome del titolo, e i titoli «Bocelli»; nessun verso).

#### Affermazioni

##### A1 — P1
- Affermazione: «Nasce nel 1995 come "Vivo per..."»
- Fonte precisa: Wikipedia IT — https://it.wikipedia.org/wiki/Vivo_per_lei — incipit e sezione «Vivo per...» — pagina wiki viva, letta il 21/09/2026 (wikitext grezzo). Conferma anche Wikipedia EN, sezione «Song information»
- Estratto: «Nel 1995 la band italiana O.R.O. partecipò con questa canzone alla manifestazione Un disco per l'estate»; EN: «originally written by the group O.R.O. ... in 1995»
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «le musiche di Mario Manzani, Valerio Zelli e Mauro Mengali»
- Fonte precisa: Wikipedia IT (Vivo per lei), incipit («le musiche invariate sono state composte da Mario Manzani, Valerio Zelli e Mauro Mengali», con nota SIAE ISWC T-005.004.984-7 che non ho aperto). Wikipedia EN: «Manzani – Mengalli – Zelli». Donna Glamour (citata), 03/05/2023: «Scritto da Mauro Mengali, Valerio Zelli e Annamaria Alibani» (senza Manzani). Bigodino 20/05/2020: musica e testo di Mengali e Zelli.
- Estratto: «le musiche invariate sono state composte da Mario Manzani, Valerio Zelli e Mauro Mengali»
- Esito: CONFERMATA CON RISERVA — regge sulla sola voce IT (livello C); l'altra fonte citata (Donna Glamour) elenca gli autori in modo diverso e nessuna fonte primaria (SIAE) è stata aperta.
- Correzione proposta: dichiarare il dubbio (R8): «con musiche attribuite a Mario Manzani, Valerio Zelli e Mauro Mengali (secondo Wikipedia; altre fonti danno elenchi di autori diversi)». Fonte da aprire: repertorio SIAE, ISWC T-005.004.984-7 (livello A).

##### A3 — P1
- Affermazione: «il testo di Anna Maria Alibani»
- Fonte precisa: Wikipedia IT (Vivo per lei), incipit («rimaneggiamento del testo di Anna Maria Alibani») e sezione «Vivo per...» («scritto da Anna Maria Alibani sulle musiche di Mario Manzani...»). Donna Glamour: «Annamaria Alibani» fra gli autori. Wikipedia EN non la nomina; Bigodino la ignora.
- Estratto: «rimaneggiamento del testo di Anna Maria Alibani del brano Vivo per...»
- Esito: CONFERMATA CON RISERVA — nome sostenuto solo da Wikipedia IT e (fra gli autori) da Donna Glamour; nessun documento primario.
- Correzione proposta: come A2 (attribuire: «secondo Wikipedia, il testo originale era di Anna Maria Alibani»).

##### A4 — P1
- Affermazione: «presentato dal gruppo O.R.O. (Onde Radio Ovest)»
- Fonte precisa: Wikipedia IT «O.R.O.» — incipit: «(acronimo di Onde Radio Ovest)»; e voce Vivo per lei
- Estratto: «Gli O.R.O. (acronimo di Onde Radio Ovest) sono un gruppo musicale italiano originario di Firenze»
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «al concorso "Un disco per l'estate"»
- Fonte precisa: Wikipedia IT (Vivo per lei), sezione «Antefatti»: «partecipò con questa canzone alla manifestazione Un disco per l'estate». Donna Glamour: «Con questa canzone il gruppo partecipò a Un disco per l'estate». Alternativa: Tgcom24, 17/09/2021 (https://www.tgcom24.mediaset.it/rubriche/speciale-amarcord/correva-lanno-1995-gli-oro-cantavano-vivo-per-lei-a-non-e-la-rai_36017454-202102k.shtml): «gli Oro parteciparono alla manifestazione "Un disco per l'estate"». Ma: Wikipedia IT «O.R.O.» (citata): «partecipò a Sanremo Giovani 1995 presentando proprio il brano Vivo per..., che si piazzò al primo posto»; Wikipedia IT «Sanremo Giovani 1995» (7-8/11/1995) elenca «Vivo per...» degli O.R.O. al primo posto della prima serata; AllMusicItalia, 05/12/2014: «Nel 1995 parteciparono a Sanremo Giovani»; Bigodino, 20/05/2020: «vincere Sanremo Giovani e un Disco per l'Estate»; Wikipedia EN: «won the "Disco per l'estate"». L'elenco 1995 di «Un disco per l'estate» su Wikipedia IT non cita gli O.R.O. (elenco parziale).
- Estratto: «Nel 1995 parteciparono a Sanremo Giovani con una canzone intitolata Vivo per…» (AllMusicItalia)
- Esito: CONFERMATA CON RISERVA — la partecipazione è attestata, ma la scheda tace su Sanremo Giovani (che una fonte citata, la voce O.R.O., dà come vittoria) e sul fatto che le fonti divergono su esito e concorso.
- Correzione proposta: «presentato dal gruppo O.R.O. (Onde Radio Ovest) a "Un disco per l'estate" e, nel novembre 1995, a Sanremo Giovani, che secondo Wikipedia il gruppo vinse; il brano non ebbe però un successo commerciale immediato».

##### A6 — P1
- Affermazione: «senza un successo immediato»
- Fonte precisa: Wikipedia IT (Vivo per lei), sezione «Antefatti»; Donna Glamour
- Estratto: «il brano non ebbe immediatamente la grande popolarità che avrebbe avuto nei mesi successivi»
- Esito: CONFERMATA
- Correzione proposta: — (vedi A5 per il contesto)

##### A7 — P1
- Affermazione: «Nello stesso anno, sulla stessa musica, il paroliere Gatto Panceri scrisse un nuovo testo»
- Fonte precisa: Wikipedia IT (Vivo per lei), sezione «Antefatti»: «nel corso dello stesso anno, partendo sempre dalla musica di Manzani, Mengali e Zelli, ... Panceri scrisse un nuovo testo»; Wikipedia EN: «During the same year, the lyrics ... were rewritten». Ma: Il Fatto Quotidiano, 21/01/2025 (https://www.ilfattoquotidiano.it/2025/01/21/ho-scritto-io-la-seconda-canzone-italiana-piu-famosa-nel-mondo-...), pagina di cronaca che riporta l'intervista di Panceri al Corriere della Sera: «L'ho composta mentre ero in auto. Era il 1996».
- Estratto: «L'ho composta mentre ero in auto. Era il 1996, collaboravo già con Giorgia»
- Esito: CONFERMATA CON RISERVA — 1995 è la data delle voci Wikipedia (coerente con l'album del 13/11/1995), ma l'autore stesso colloca la scrittura nel 1996 e la scheda non lo segnala (R5/R8).
- Correzione proposta: dichiarare il dubbio: «Nel corso del 1995 (secondo Wikipedia; Panceri stesso, ricordando l'episodio al Corriere della Sera, parla del 1996) il paroliere Gatto Panceri scrisse sulla stessa musica un nuovo testo».

##### A8 — P1
- Affermazione: «cambiando il titolo in "Vivo per lei"»
- Fonte precisa: Wikipedia IT (Vivo per lei), «Antefatti»: «Panceri cambiò il titolo da Vivo per... a Vivo per lei»
- Estratto: «Panceri cambiò il titolo da Vivo per... a Vivo per lei»
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «il brano fu pubblicato il 25 agosto 1995»
- Fonte precisa: Wikipedia IT (Vivo per lei), primo paragrafo: «pubblicato il 25 agosto 1995 come primo estratto» (nota Fanpage.it 21/07/2024, 403: non letta). Contro-indizi letti: (a) Wikipedia IT, voce «Bocelli (album)»: album uscito il 13 novembre 1995; (b) l'infobox della stessa voce IT ha «anno = 1996»; (c) Wikipedia EN (Vivo per lei), infobox: «released 1996 (Italian and Spanish versions)», «recorded 1995»; (d) Wikipedia EN (Bocelli): album del 13/11/1995. Discogs (risultati di ricerca, pagine 403): singolo Bocelli feat. Giorgia catalogato «1995» e promo Bocelli & Giorgia «1996» — non aperte. MusicBrainz: risulta solo il singolo tedesco (Judy Weiss) del 1995.
- Estratto: IT: «pubblicato il 25 agosto 1995 come primo estratto dal secondo album del tenore»; EN: «released 1996 (Italian and Spanish versions)»
- Esito: NON CONFERMATA — la data esatta compare in un'unica fonte (Wikipedia IT, la cui nota di supporto non ho potuto aprire), in contrasto con Wikipedia EN e con la cronologia dell'album. Non ho trovato alcuna fonte primaria.
- Correzione proposta: togliere il giorno e dichiarare il dubbio (R5): «Il brano uscì in duetto con Giorgia nell'album «Bocelli» (13 novembre 1995) e fu pubblicato come singolo fra il 1995 e il 1996 (le fonti non concordano sulla data: Wikipedia IT indica il 25 agosto 1995, Wikipedia EN il 1996)».

##### A10 — P1
- Affermazione: «primo estratto dal secondo album di Andrea Bocelli, "Bocelli"»
- Fonte precisa: Wikipedia IT (Vivo per lei), incipit («come primo estratto»), contraddetta da Wikipedia IT (Bocelli (album)), sezione «Descrizione»: «Oltre al brano Con te partirò, presentato al Festival di Sanremo 1995, dall'album sono stati estratti altri due singoli: Vivo per lei ... e Per amore». Wikipedia EN (Vivo per lei), cronologia singoli Bocelli: «Per amore» (1995) → «Vivo per lei» (1996).
- Estratto: «dall'album sono stati estratti altri due singoli: Vivo per lei in duetto con Giorgia e Per amore»
- Esito: CONTRADDETTA — «Con te partirò» (Sanremo 1995) è il primo brano/singolo dall'album, e «Per amore» precede «Vivo per lei» nella cronologia EN. Il superlativo «primo» non è documentabile (R2-bis).
- Correzione proposta: togliere «come primo estratto»; scrivere «uno dei singoli tratti dal secondo album di Andrea Bocelli, «Bocelli» (1995)».

##### A11 — P1
- Affermazione: «secondo album di Andrea Bocelli, "Bocelli"»
- Fonte precisa: Wikipedia IT (Bocelli (album)), incipit: «Bocelli è il secondo album del tenore italiano Andrea Bocelli, pubblicato nel 1995» (precedente: «Il mare calmo della sera», 1994)
- Estratto: «Bocelli è il secondo album del tenore italiano Andrea Bocelli, pubblicato nel 1995»
- Esito: CONFERMATA (la voce IT «Vivo per lei» dice lo stesso; la voce album non è tra le fonti citate ma coincide)
- Correzione proposta: —

##### A12 — P1 (e P2, «duettata con Giorgia»)
- Affermazione: «interpretato in duetto con Giorgia»
- Fonte precisa: Wikipedia IT e EN (Vivo per lei), incipit
- Estratto: «singolo del cantante italiano Andrea Bocelli e della cantante italiana Giorgia»
- Esito: CONFERMATA
- Correzione proposta: —

##### A13 — P1
- Affermazione: «Secondo Sky TG24, lo stesso Panceri ha raccontato di aver ripensato al proprio amore per la musica nello scrivere il nuovo testo»
- Fonte precisa: Sky TG24, 22 gennaio 2025 (data vera, dato dalla pagina e dal markup; non è Future plc) — https://tg24.sky.it/spettacolo/musica/2025/01/22/gatto-panceri — genere: FOTOGALLERY di 10 foto, non intervista — foto 3/10. Il Fatto Quotidiano 21/01/2025 (fonte alternativa, letta): cronaca dell'intervista di Panceri al Corriere della Sera.
- Estratto: «Intervistato da Barbara Gerosa del Corriere della sera, l'artista ha raccontato: "Ho pensato al mio amore per la musica ed è nata Vivo per lei"»
- Esito: CONFERMATA CON RISERVA — R3: le parole non sono state dette a Sky TG24 ma al Corriere della Sera (Barbara Gerosa); la scheda omette a chi. Inoltre nell'intervista Panceri dice «L'ho composta» (senza parlare di una musica preesistente) e racconta che il manager gli chiese un brano adatto alla voce lirica del giovane cantante; «ripensato... nello scrivere il nuovo testo» è una lettura della scheda, non parole sue.
- Correzione proposta: «Intervistato dal Corriere della sera (Barbara Gerosa), come riporta Sky TG24 il 22 gennaio 2025, Panceri ha raccontato di aver pensato al proprio amore per la musica: "Ho pensato al mio amore per la musica ed è nata Vivo per lei"». Aggiungere fra le fonti Il Fatto Quotidiano (21/01/2025) o, se aperto, l'originale del Corriere (non letto da me).

##### A14 — P1
- Affermazione: citazione «Ho pensato al mio amore per la musica ed è nata Vivo per lei»
- Fonte precisa: Sky TG24 (foto 3/10); identica in Il Fatto Quotidiano (dove il titolo è scritto «Vivo per Lei»)
- Estratto: «Ho pensato al mio amore per la musica ed è nata Vivo per lei»
- Esito: CONFERMATA (fedele, attribuita alla persona giusta)
- Correzione proposta: — (v. A13 per l'attribuzione)

##### A15 — P2
- Affermazione: «il "lei" del titolo non è più una persona ma la musica stessa»
- Fonte precisa: Wikipedia IT (Vivo per lei), «Antefatti»; Wikipedia EN, «Song information»; Donna Glamour
- Estratto: «identificando nel pronome «lei» una figura immaginaria... che è, in realtà, la musica»
- Esito: CONFERMATA
- Correzione proposta: —

##### A16 — P2
- Affermazione: «intesa come arte e passione che dà senso alla vita di chi la fa»
- Fonte precisa: Wikipedia IT: «una figura immaginaria a cui chi canta dichiara di dedicare la propria vita»; Donna Glamour: «un vero e proprio inno alla musica. Un amore immenso». EN, «Meaning»: «the tenor's attachment to music as the pillar and love of his life» (sezione con «citation needed»).
- Estratto: «a cui chi canta dichiara di dedicare la propria vita e che è, in realtà, la musica»
- Esito: CONFERMATA CON RISERVA — glossa interpretativa; le fonti dicono dedicare la propria vita alla musica, non «arte e passione che dà senso».
- Correzione proposta: «la musica, a cui chi canta dichiara di dedicare la propria vita».

##### A17 — P2
- Affermazione: «Diventò uno standard della canzone italiana»
- Fonte precisa: Wikipedia IT (Vivo per lei), «Antefatti»: «diventando un vero e proprio brano simbolo della musica italiana moderna»; incipit sezione classifiche: «la seconda canzone italiana più venduta nel mondo dopo Nel blu dipinto di blu» (al 2024, nota Il Fatto Quotidiano); Donna Glamour: «un must della musica italiana»
- Estratto: «brano simbolo della musica italiana moderna, che otterrà riconoscimenti in tutto il mondo»
- Esito: CONFERMATA CON RISERVA — la parola «standard» non è in nessuna fonte; «brano simbolo» sì.
- Correzione proposta: «Diventò un brano simbolo della musica italiana moderna».

##### A18 — P2
- Affermazione: «conosciuto anche a livello internazionale»
- Fonte precisa: Wikipedia IT: versioni in altre lingue, prime posizioni in Belgio, Francia e Svizzera
- Estratto: «ottenendo molto successo in numerose classifiche europee, tra cui la prima posizione delle classifiche di Belgio, Francia e Svizzera»
- Esito: CONFERMATA
- Correzione proposta: —

##### A19 — Frase iconica
- Affermazione: «Il momento più citato è la rivelazione...»
- Fonte precisa: nessuna delle cinque fonti citate parla di «momento più citato»; non trovato altrove.
- Estratto: non letto: affermazione assente nelle fonti
- Esito: NON CONFERMATA
- Correzione proposta: «Il momento chiave è la rivelazione che quella "lei"...» oppure togliere «più citato».

##### A20 — Frase iconica
- Affermazione: «a metà brano»
- Fonte precisa: Wikipedia EN, «Meaning of the song» (nota «citation needed»): «Eventually, Bocelli sings ... revealing that the true meaning of the song is about music». Trascrizione Letras (testoUrl): la prima menzione esplicita della musica arriva verso l'80% delle righe del testo (riga 48 su circa 58), dopo tutti i ritornelli; il momento esatto nell'audio non l'ho verificato.
- Estratto: EN: «Eventually, Bocelli sings ... revealing that the true meaning of the song is about music»
- Esito: NON CONFERMATA — «a metà» non è in alcuna fonte e la trascrizione lo smentisce (la rivelazione è nella parte finale).
- Correzione proposta: «verso la fine del brano» (dopo verifica sull'audio) oppure togliere «a metà brano».

##### A21 — Frase iconica
- Affermazione: «quella "lei" ... non è una donna ma la musica stessa»
- Fonte precisa: Wikipedia EN, «Meaning of the song»; Wikipedia IT «Antefatti»
- Estratto: «the true meaning of the song is about music and how musicians devote their lives to music»
- Esito: CONFERMATA
- Correzione proposta: —

##### A22 — Frase iconica
- Affermazione: «Scritta originariamente nel 1995 dal gruppo O.R.O.»
- Fonte precisa: Wikipedia EN, «Song information»: «originally written by the group O.R.O. (Manzani – Mengalli – Zelli) in 1995». Wikipedia IT: testo di Anna Maria Alibani (non membro; formazione O.R.O. nella voce «O.R.O.»: Zelli, Mengali, Manzani, Chiodo, Golino, Zucchetti).
- Estratto: «originally written by the group O.R.O. (Manzani – Mengalli – Zelli) in 1995»
- Esito: CONFERMATA CON RISERVA — incoerente con P1, che dà il testo ad Alibani.
- Correzione proposta: «Scritta nel 1995 per gli O.R.O., con musica di membri del gruppo, fu riscritta...».

##### A23 — Frase iconica
- Affermazione: «fu riscritta dal paroliere Gatto Panceri trasformandola da dedica romantica a omaggio alla musica»
- Fonte precisa: Wikipedia IT «Antefatti»; Donna Glamour («mentre prima era dedicato ad una donna, Andrea l'ha indirizzato alla musica»)
- Estratto: «mentre prima era dedicato ad una donna, Andrea l'ha indirizzato alla musica»
- Esito: CONFERMATA
- Correzione proposta: —

##### A24 — Frase iconica
- Affermazione: «sfruttando il genere femminile della parola italiana per mantenere l'ambiguità tra donna e musica per tutto il brano»
- Fonte precisa: Wikipedia EN, «Meaning of the song»: «they retain their ambiguity due to the possibility that the feminine pronoun may refer to a woman» (sezione con «citation needed»; commento redazionale, non dichiarazione di Panceri). Nessuna fonte attribuisce l'intenzione a Panceri.
- Estratto: «the feminine pronoun may refer to a woman or a girl, or any inanimate object»
- Esito: CONFERMATA CON RISERVA — il meccanismo linguistico è descritto (livello C, senza fonte), ma non l'intenzione d'autore; «per tutto il brano» contraddice la stessa frase («rivelazione a metà brano»).
- Correzione proposta: «Il pronome femminile italiano lascia aperta a lungo l'ambiguità tra una donna e la musica, finché il testo non la scioglie».

##### A25 — Frase iconica
- Affermazione: «Bocelli la incise in duetto con Giorgia per l'album "Bocelli" del 1995»
- Fonte precisa: Wikipedia EN, incipit: «a 1995 song recorded by ... Bocelli as a duet with ... Giorgia, released on his album Bocelli»; album del 13/11/1995
- Estratto: «released on his album Bocelli»
- Esito: CONFERMATA
- Correzione proposta: —

##### A26 — Frase iconica
- Affermazione: «fu poi reincisa in più lingue con altre partner (Marta Sánchez, Hélène Ségara, Judy Weiss)»
- Fonte precisa: Wikipedia IT «Antefatti» (elenco partner: Judy Weiss, Ségara, Sánchez, Sandy, Sharon Grand); Wikipedia EN incipit
- Estratto: «in tedesco con Judy Weiss, in francese con Hélène Ségara, in spagnolo con Marta Sánchez»
- Esito: CONFERMATA (nota: la versione tedesca con Weiss era già nel CD singolo italiano e MusicBrainz la data 1995: «poi» è approssimato ma non scorretto)
- Correzione proposta: —

##### A27 — Metadati (anno)
- Affermazione: anno «1995»
- Fonte precisa: album «Bocelli» 13/11/1995 (Wikipedia IT ed EN); singolo italiano 1996 secondo Wikipedia EN, Discogs (promo 1996) e infobox IT; 25/08/1995 solo nel testo IT
- Estratto: EN: «is a 1995 song ... released on his album Bocelli»
- Esito: CONFERMATA CON RISERVA — 1995 è l'anno dell'album e della registrazione, non certo del singolo italiano
- Correzione proposta: mantenere 1995 (anno dell'album) ma non scrivere che è l'anno del singolo, oppure dichiarare «1995 (album); singolo 1995-96».

##### A28 — Metadati (album)
- Affermazione: album «Bocelli (album)»
- Fonte precisa: Wikipedia IT (Bocelli (album)): il brano è la traccia 7; è l'album originale, non una raccolta («Romanza» è del 1997)
- Estratto: «Titolo7 = Vivo per lei (duetto con Giorgia)»
- Esito: CONFERMATA
- Correzione proposta: —

##### Descrizione SEO
Assente (nessuna affermazione da verificare).

#### Controlli sui metadati e sui link
- Anno: v. A27. Album: v. A28.
- ascoltiTesto: None sulla scheda, e fra le fonti citate non c'è nessuna pagina kworb. Ho comunque letto kworb il 21/09/2026: la voce «Vivo per lei» nella pagina artista di Andrea Bocelli (track 52KPq9UBxTkvktnNDNKQSN) ha 224.041.853 stream; la voce con lo spotifyId della scheda (6cPLCU7hKjgjvLWzCevl7R), che kworb elenca sotto Giorgia, ne ha 222.972.989. Sono due pubblicazioni distinte dello stesso brano; se si volesse pubblicare un dato, sceglierne una e dirlo (es. «oltre 220 milioni su Spotify»). Esiste anche «Vivo per lei - Italian - Spanish Version» (Marta Sánchez), 64.006.496 stream.
- spotifyId 6cPLCU7hKjgjvLWzCevl7R: oEmbed risponde 200, titolo «Vivo per lei»; la pagina Spotify ha titolo «Vivo per lei - song and lyrics by Andrea Bocelli, Giorgia». Corretto come brano; è però la pubblicazione non principale del catalogo Bocelli (v. sopra).
- testoUrl https://www.letras.com/andrea-bocelli/4862/: 200, pagina «VIVO PER LEI (PART. GIORGIA) - Andrea Bocelli - LETRAS.COM», è la canzone giusta (interfaccia in spagnolo).
- Stato HTTP delle fonti (lette il 21/09/2026): Wikipedia EN ok; Wikipedia IT «Vivo per lei» ok; Wikipedia IT «O.R.O.» ok; Sky TG24 ok (200, fotogallery, 22/01/2025, nessuna data errata); Donna Glamour ok (200, data vera 03/05/2023, autrice Fabrizia Volponi). Non fra le fonti citate ma provate: Fanpage 403, Discogs 403, SecondHandSongs 403.
- Nota di metodo: ho letto direttamente il wikitesto delle voci Wikipedia; sono fonti di livello C. Per i dati che contano (autori, data del singolo, classifiche) servono fonti A/B (SIAE, FIMI, Ultratop, crediti fisici del disco).

#### Omissioni rilevanti (solo se cambiano il senso)
- Sanremo Giovani 1995 (7-8 novembre): il brano degli O.R.O. vi fu presentato e, secondo la voce «O.R.O.» (fonte citata), vinse. Dire «senza un successo immediato» e citare solo «Un disco per l'estate» dà una storia diversa da quella riportata da due delle fonti (AllMusicItalia; Wikipedia «Sanremo Giovani 1995»).
- La versione di Panceri sull'origine (Corriere della Sera, riportata da Il Fatto Quotidiano 21/01/2025): il manager gli chiese un brano per un giovane cantante con repertorio lirico; egli dice «l'ho composta», non «ho riscritto un testo». La scheda descrive invece un rifacimento su musica esistente (sostenuto da Wikipedia IT e da Donna Glamour, che parla di una proposta del produttore di Bocelli). Le due ricostruzioni non sono del tutto coerenti: conviene dirlo.
- Le pagine web lette non contenevano frasi rivolte a me.


---

## A.8 — Man in the Box (Alice in Chains) · `canzone/man-in-the-box/`

### Esito — Man in the Box (Alice in Chains)
Pagina: canzone/man-in-the-box/ — verificata il 21/09/2026 — priorità: 47 impressioni (Search Console, 3 mesi al 11/09/2026), posizione media 5.7

#### Riepilogo
- Affermazioni esaminate: 26 — CONFERMATA 18, CON RISERVA 6, NON CONFERMATA 2, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Ripartizione per voce: CONFERMATA = A1, A2, A4, A5, A6, A8, A9, A10, A11, A12, A13, A14, A15, A16, A17, A18, A24, A26; CON RISERVA = A3, A20, A21, A22, A23, A25; NON CONFERMATA = A7, A19.

##### Difetti in ordine di gravità
1. A19 (frase iconica) — «il verso più citato»: superlativo che nessuna fonte contiene. NON CONFERMATA. Togliere o riformulare senza superlativo.
2. A7 (P1) — «per tutta la loro breve vita»: dettaglio aggiunto, assente da Rolling Stone, Wikipedia e American Songwriter. NON CONFERMATA. Togliere.
3. A3 / A22 (P1 e frase iconica) — «dirigenti» (e «dirigenti discografici»): le fonti dicono «Columbia Records people» / «vegetarian staffers», non dirigenti. Promozione di ruolo non documentata. Sostituire con «alcune persone della Columbia Records».
4. A21 (frase iconica) — l'immagine degli occhi cuciti che «fonde» censura e vitello è una lettura della scheda, non della fonte (American Songwriter dice che Staley unì i due temi «nella canzone», non in quell'immagine). Attribuire o attenuare.
5. A25 (ascoltiTesto) — «691 mln»: kworb oggi riporta 703,3 mln; il dato pubblicato è invecchiato (circa 12 mln sotto).
6. A23 (anno) — 1990 è l'anno dell'album; il singolo è del gennaio 1991. Da dichiarare coerente con la convenzione del sito.

##### Cosa non sono riuscito a documentare
Niente di bloccante. Note di metodo: (a) la pagina di Rolling Stone dal sito originale risponde con un reindirizzamento a un servizio di accesso a pagamento (tollbit): non l'ho seguito; l'ho letta nella copia web.archive.org linkata da Wikipedia (cattura 28/07/2017), che riporta la data 26/11/1992. (b) Non ho aperto l'intervista MuchMusic 1991 (video); ne ho letto solo il resoconto in American Songwriter e Wikipedia.

##### Sospetto verso nella frase iconica: no
Nessuna parola tra virgolette, quindi nessun verso riprodotto. Ma la frase è una parafrasi molto aderente al verso sugli occhi cuciti (identificabile dal testo su Letras e dalle citazioni di Wikipedia): non viola P3 così com'è, ma non va avvicinata ulteriormente al testo originale.

#### Affermazioni

##### A1 — P1
- Affermazione: «Layne Staley iniziò a scrivere il testo pensando alla censura»
- Fonte precisa: Rolling Stone, Jeffrey Ressner, «Alice in Chains: Through the Looking Glass» (copia archive.org linkata da Wikipedia, nota 13) — https://web.archive.org/web/20170728124745/http://www.rollingstone.com/music/news/alice-in-chains-through-the-looking-glass-19921126 — paragrafo su Facelift — data vera 26/11/1992 (metadato della pagina; Wikipedia scrive 28/11/1992). Riportata anche da Wikipedia, sezione «Lyrics».
- Estratto: «"I started writing about censorship," explains Staley.»
- Esito: CONFERMATA
- Correzione proposta: — (vedi nota in A3 sul fatto che l'intera catena è il racconto di Staley)

##### A2 — P1
- Affermazione: «l'idea prese una piega diversa durante una cena»
- Fonte precisa: Rolling Stone 1992 (come sopra); Wikipedia, «Lyrics»; American Songwriter, sezione «A Hybrid Inspiration» — data vera AS 27/11/2023
- Estratto: «Around the same time, we went out for dinner with some Columbia Records people who were vegetarians.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «con alcuni dirigenti della Columbia Records»
- Fonte precisa: Rolling Stone 1992 / Wikipedia «Lyrics»; American Songwriter «A Hybrid Inspiration»
- Estratto: «some Columbia Records people who were vegetarians» (RS/Wikipedia); «vegetarian staffers at Columbia Records» (AS)
- Esito: CONFERMATA CON RISERVA — le fonti dicono «persone»/«staffers» (personale, dipendenti), mai dirigenti/executives. Ruolo non documentato.
- Correzione proposta: «durante una cena con alcune persone della Columbia Records, vegetariane, che gli raccontarono…». Nota aggiuntiva: tutta la catena (cena, vegetariani, vitelli) è il racconto di Staley del 1992, ripreso da American Songwriter; la prima frase di P1 lo dà come fatto nella voce della scheda. Suggerimento: «Secondo il racconto di Staley a Rolling Stone, iniziò a scrivere il testo pensando alla censura, ma…».

##### A4 — P1
- Affermazione: «vegetariani» (le persone della Columbia)
- Fonte precisa: Rolling Stone 1992; Wikipedia; American Songwriter
- Estratto: «Columbia Records people who were vegetarians»
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «che gli raccontarono come venivano allevati i vitelli destinati alla carne»
- Fonte precisa: Rolling Stone 1992
- Estratto: «They told me how veal was made from calves raised in these small boxes»
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: «chiusi in piccole casse»
- Fonte precisa: Rolling Stone 1992 («small boxes»); American Songwriter («small crates that restricted mobility»)
- Estratto: «calves raised in these small boxes»
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: «per tutta la loro breve vita»
- Fonte precisa: nessuna. Letti per intero Rolling Stone 1992 (copia archive), Wikipedia, American Songwriter: nessuno dice che i vitelli restassero nelle casse per tutta la vita (AS parla di casse che limitano il movimento «to cut down on chewy muscle»).
- Estratto: non presente
- Esito: NON CONFERMATA
- Correzione proposta: togliere il segmento: «…chiusi in piccole casse. Quell'immagine gli rimase impressa: …». Se si vuole un dettaglio, da American Songwriter: «in casse così strette da limitarne i movimenti».

##### A8 — P1
- Affermazione: «Quell'immagine gli rimase impressa»
- Fonte precisa: Rolling Stone 1992; Wikipedia «Lyrics»
- Estratto: «that image stuck in my head»
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «secondo Wikipedia, che riporta una dichiarazione di Staley a Rolling Stone del 1992»
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/Man_in_the_Box — sezione «Lyrics», nota 13 (Ressner, Rolling Stone, 28/11/1992); pagina letta il 21/09/2026. Verificata alla fonte nella copia archive.org (data pagina 26/11/1992).
- Estratto: Wikipedia: «In a 1992 interview with Rolling Stone, Layne Staley explained the origins of the song's lyrics»
- Esito: CONFERMATA. Nota R3: la pagina originale è un profilo/feature di Ressner («Through the Looking Glass»), non un'intervista in forma di domanda-risposta; Staley «explains» in discorso diretto, quindi «dichiarazione a Rolling Stone» è difendibile e l'attribuzione a Wikipedia è corretta.
- Correzione proposta: — (facoltativo: citare direttamente Rolling Stone, novembre 1992, come fonte primaria, invece della sola Wikipedia)

##### A10 — P1
- Affermazione: «tornato a casa scrisse un brano»
- Fonte precisa: Rolling Stone 1992; Wikipedia «Lyrics»
- Estratto: «So I went home and wrote about government censorship and eating meat»
- Esito: CONFERMATA (Staley scrisse il testo; la musica è di Cantrell, Wikipedia: «Composer Jerry Cantrell, Lyricist Layne Staley»; «brano» in senso lato regge)
- Correzione proposta: — (più preciso: «scrisse il testo»)

##### A11 — P1
- Affermazione: «sulla censura governativa e sul consumo di carne»
- Fonte precisa: come A10
- Estratto: «wrote about government censorship and eating meat»
- Esito: CONFERMATA
- Correzione proposta: —

##### A12 — P1
- Affermazione: «visto attraverso gli occhi di un vitello destinato al macello»
- Fonte precisa: come A10
- Estratto: «as seen through the eyes of a doomed calf»
- Esito: CONFERMATA
- Correzione proposta: —

##### A13 — P2
- Affermazione: «Secondo singolo»
- Fonte precisa: American Songwriter — https://americansongwriter.com/the-peta-approved-meaning-behind-alice-in-chains-man-in-the-box/ — paragrafo introduttivo — data vera 27/11/2023. Concorda la cronologia dei singoli nel riquadro di Wikipedia (We Die Young 1990, poi Man in the Box 1991, poi Bleed the Freak).
- Estratto: «"Man in the Box," the second single from their 1990 debut album, Facelift»
- Esito: CONFERMATA
- Correzione proposta: —

##### A14 — P2
- Affermazione: «del disco di debutto "Facelift"»
- Fonte precisa: Wikipedia, lead: «debut studio album, Facelift (1990)»; American Songwriter, stesso passo
- Estratto: «the group's debut studio album, Facelift (1990)»
- Esito: CONFERMATA
- Correzione proposta: —

##### A15 — P2
- Affermazione: «(1990)» (anno del disco)
- Fonte precisa: American Songwriter, sezione «Making Their Mark»; Wikipedia lead
- Estratto: «Facelift was released in August 1990»
- Esito: CONFERMATA
- Correzione proposta: —

##### A16 — P2
- Affermazione: «contribuì a cambiare le sorti commerciali della band»
- Fonte precisa: American Songwriter — paragrafo introduttivo e «Making Their Mark» — data vera 27/11/2023
- Estratto: «the song to turn the tide on their initially middling fortunes»
- Esito: CONFERMATA (valutazione di American Songwriter, che la sostanzia con vendite di 40.000 copie in sei mesi e ripresa dopo la rotazione MTV). Facoltativo: attribuire («secondo American Songwriter»).
- Correzione proposta: —

##### A17 — P2
- Affermazione: «fu anche l'ultimo brano suonato dal vivo da Staley con gli Alice in Chains»
- Fonte precisa: Wikipedia, sezione «Live performances» (frase senza nota di riferimento nella pagina). Riscontri indipendenti che ho letto: setlist.fm (concerto Kemper Arena, Kansas City, 03/07/1996; «Man in the Box» ultimo brano della scaletta; nota «Last show with Layne Staley»; livello C, contributi di utenti); Rolling Stone «Flashback» (pubblicato 05/04/2016); Diffuser.fm (pubblicato 03/07/2016), entrambi livello B.
- Estratto: Wikipedia: «last concert with Staley on July 3, 1996, they closed with "Man in the Box"». RS: «wrapping up with a ferocious "Man in the Box."»
- Esito: CONFERMATA
- Correzione proposta: — (facoltativo: aggiungere Rolling Stone o Diffuser come fonte, perché la frase di Wikipedia non ha nota)

##### A18 — P2
- Affermazione: «il 3 luglio 1996»
- Fonte precisa: Wikipedia «Live performances»; setlist.fm; Rolling Stone Flashback; Diffuser.fm (come A17)
- Estratto: RS: «wrapping up their mini-tour on July 3rd, 1996 at the Kemper Arena in Kansas City»
- Esito: CONFERMATA
- Correzione proposta: —

##### A19 — Frase iconica
- Affermazione: «Il verso più citato è quello in cui il narratore… chiede che gli vengano cuciti gli occhi»
- Fonte precisa: nessuna delle tre fonti dice che sia il verso «più citato». Wikipedia riporta il verso tra i «portentous lines» citati da una recensione (nota 12), insieme ad altri due; American Songwriter cita invece la riga sul narratore nella scatola.
- Estratto: non presente
- Esito: NON CONFERMATA (superlativo)
- Correzione proposta: «Tra le immagini più inquietanti del testo c'è quella del narratore, chiuso nella sua scatola, che parla di occhi cuciti: …» oppure togliere il superlativo: «Nel testo, il narratore chiuso nella sua scatola evoca degli occhi cuciti — …».

##### A20 — Frase iconica
- Affermazione: «il narratore, chiuso nella sua scatola, chiede che gli vengano cuciti gli occhi»
- Fonte precisa: testo della canzone su Letras (https://www.letras.com/alice-in-chains/man-in-the-box/, HTTP 200, titolo pagina corretto) e riga citata da Wikipedia («Composition and music», nota 12). Nel testo la formula è una domanda cantata a botta e risposta, e nel bridge diventa «ormai cuciti».
- Estratto: non riporto il verso (regola P3); riscontrato in entrambe le fonti.
- Esito: CONFERMATA CON RISERVA — il contenuto regge; «chiede» è una lettura (è una domanda, e più avanti gli occhi risultano già cuciti). Nessun rischio di verso.
- Correzione proposta: opzionale: «il narratore, chiuso nella sua scatola, parla di occhi cuciti».

##### A21 — Frase iconica
- Affermazione: «un'immagine di cecità forzata che fonde il tema originario della censura con la metafora del vitello rinchiuso»
- Fonte precisa: American Songwriter, «A Hybrid Inspiration»: dice che Staley «combined the two topics into one song». Nessuna fonte attribuisce questa funzione simbolica all'immagine degli occhi cuciti (Wikipedia la collega al video; Cantrell, nel passo citato da Wikipedia e AS, legge la scatola come controllo di governo e media sul pubblico).
- Estratto: «Staley combined the two topics into one song»
- Esito: CONFERMATA CON RISERVA — la fusione dei due temi è documentata a livello di canzone; l'esegesi «occhi cuciti = cecità forzata» è della scheda.
- Correzione proposta: «un'immagine di cecità forzata, che ben si presta a tenere insieme il tema della censura e la metafora del vitello», oppure attribuire: «secondo American Songwriter, Staley fuse in un'unica canzone censura e allevamento dei vitelli».

##### A22 — Frase iconica
- Affermazione: «la metafora del vitello rinchiuso raccontata a Staley da alcuni dirigenti discografici vegetariani»
- Fonte precisa: come A3
- Estratto: «some Columbia Records people who were vegetarians»
- Esito: CONFERMATA CON RISERVA — «dirigenti discografici» non documentato; per il resto vale A5.
- Correzione proposta: «raccontata a Staley da alcune persone vegetariane della Columbia Records».

##### A23 — Metadati (anno)
- Affermazione: «anno: 1990»
- Fonte precisa: Wikipedia, riquadro e lead: singolo uscito a gennaio 1991; album Facelift 1990
- Estratto: «It was released as a single in January 1991 after being featured on the group's debut studio album, Facelift (1990).»
- Esito: CONFERMATA CON RISERVA — 1990 è l'anno dell'album; l'anno del singolo (e del video, candidato agli MTV VMA 1991) è il 1991. Coerente con P2 solo se la convenzione del sito è l'anno dell'album.
- Correzione proposta: mantenere 1990 solo se la convenzione del sito è l'anno dell'album; in P2 va bene perché indica l'anno del disco. Altrimenti 1991.

##### A24 — Metadati (album)
- Affermazione: «album: Facelift»
- Fonte precisa: Wikipedia, lead e riquadro
- Estratto: «debut studio album, Facelift (1990)»
- Esito: CONFERMATA (album originale, non una raccolta)
- Correzione proposta: —

##### A25 — Metadati (ascoltiTesto)
- Affermazione: «691 mln ascolti»
- Fonte precisa: kworb.net — pagina citata https://kworb.net/spotify/ (indice, senza dati per brano); dati alla pagina artista https://kworb.net/spotify/artist/64tNsm6TnZe2zpcMVMOoHL_songs.html (aggiornata 17/09/2026 secondo la pagina), letta il 21/09/2026
- Estratto: riga «Man in the Box» — 703,259,632 stream totali
- Esito: CONFERMATA CON RISERVA — dato variabile; oggi 703 mln, quindi «691 mln» è sotto di circa 12 mln (lo si sarebbe arrotondato a «700 mln»). Non è sbagliato per la data in cui fu letto, ma è vecchio.
- Correzione proposta: aggiornare a «703 mln» (o «oltre 700 mln»). Correggere anche il link fonte: l'indice /spotify/ non contiene il dato; meglio la pagina artista sopra.

##### A26 — Metadati (genere)
- Affermazione: «genereTesto: Grunge»
- Fonte precisa: Wikipedia, riquadro («Genre: Grunge, alternative metal, hard rock, alternative rock»)
- Estratto: «Grunge / alternative metal / hard rock / alternative rock»
- Esito: CONFERMATA
- Correzione proposta: —

##### SEO
[Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Controlli sui metadati e sui link
- anno: 1990 = album (singolo: gennaio 1991) — vedi A23.
- album: Facelift, corretto (originale, non raccolta).
- ascoltiTesto: kworb, pagina artista Alice in Chains, letta il 21/09/2026 (pagina aggiornata 17/09/2026): «Man in the Box» 703.259.632 stream. Il valore pubblicato (691 mln) è approssimato per difetto: non regge più.
- spotifyId 6gZVQvQZOFpzIy3HblJ20F: l'oEmbed di Spotify risponde e restituisce il titolo «Man in the Box» (brano corretto). Non ho verificato che sia la versione album piuttosto che una live/remaster, ma il conteggio kworb per il titolo principale è coerente.
- testoUrl https://www.letras.com/alice-in-chains/man-in-the-box/: HTTP 200 con reindirizzamento a /alice-in-chains/1140/; il titolo della pagina è «MAN IN THE BOX - Alice In Chains - LETRAS.COM». Ok.
- Stato delle fonti: Wikipedia 200; American Songwriter 200 (non è un'intervista: articolo di Bryan Reesman del 27/11/2023 che riporta citazioni di interviste passate); kworb.net/spotify/ 200 (solo indice, senza dati per brano); Rolling Stone (URL originale) reindirizzato a un servizio di accesso a pagamento, letta nella copia web.archive.org (200). Nessuna delle pagine lette conteneva istruzioni rivolte a me.

#### Omissioni rilevanti (solo se cambiano il senso)
- American Songwriter e Wikipedia riportano che, in un'intervista MuchMusic del 1991, Staley disse che il testo era «vagamente basato sulla censura dei media» e ammise di essere «molto fatto» quando lo scrisse (quindi il significato per lui era allora diverso), mentre il batterista Sean Kinney disse che parlava di vitelli; Jerry Cantrell lo legge come controllo di governo e media sul pubblico. La scheda presenta il racconto di Staley del 1992 come la genesi del testo senza segnalare che le versioni dei membri divergono. Il racconto resta attribuito a Staley nella seconda frase di P1, ma sarebbe più onesto (R5/R8) aggiungere una riga: «Le versioni dei membri della band non coincidono: nel 1991 Kinney disse che il testo parlava di vitelli, mentre Cantrell lo legge come una metafora del controllo esercitato da governo e media».


---

## A.9 — Yes I Know My Way (Pino Daniele) · `canzone/yes-i-know-my-way/`

### Esito — Yes I Know My Way (Pino Daniele)
Pagina: canzone/yes-i-know-my-way/ — verificata il 21/09/2026 — priorità: 43 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 12.1

#### Riepilogo
- Affermazioni esaminate: 30 — CONFERMATA 17, CON RISERVA 9, NON CONFERMATA 4, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A17 + A18 + A27 — «prima raccolta di successi curata personalmente» (P2 e frase iconica): nessuna delle tre fonti dice «prima» né «curata personalmente»; esistono raccolte precedenti (es. «Tra musica e magia», EMI 1990). Nella frase iconica compare anche «talmente identificata con lui», non documentato.
  2. A26 — frase iconica: «album che portò Daniele per la prima volta in Europa». Il sito ufficiale dice un'altra cosa: è la canzone che, secondo Daniele, portò l'album in Europa. «Per la prima volta» e «portò Daniele» non stanno in nessuna fonte.
  3. A20 — «il momento più citato è il ritornello»: superlativo senza fonte. A11 e A19 (R3): sono note scritte sul sito ufficiale, non racconti orali; la citazione del 1998 è riferita al brano, ma la scheda la presenta come detta «della raccolta».
  4. A23 — «disposto a inciampare»: la glossa ufficiale della riga corrispondente dice altro («m'arrangio»).
- Cosa non sono riuscito a documentare: che il disco del 1998 sia la prima raccolta «curata personalmente» dall'artista (nessuna fonte); che il ritornello sia «il momento più citato»; la data di scrittura delle due note di Daniele sul sito (le pagine non la riportano); quali fossero i contenuti/curatela delle raccolte precedenti (la pagina Rockit di «Tra musica e magia» non ha dettagli).
- Sospetto verso nella frase iconica: no per copia letterale (nessuna virgoletta, nessun verso riprodotto). Rilievo: la parte «contrapposto all'immagine di chi cammina dritto mentre lui resta indietro, disposto a inciampare» segue da vicino, per struttura e successione di immagini, le due righe consecutive della prima strofa del brano (quelle con le glosse 3 e 4 sul sito ufficiale). Non è una citazione, ma è una parafrasi molto aderente: se ne consiglia l'alleggerimento (vedi A22-A23).

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritta … da Pino Daniele»
- Fonte precisa: Sito ufficiale, «Vai mo' (1981)», https://www.pinodaniele.com/music/vai-mo-1981/ — scheda 02 nella sezione testi; Wikipedia it, voce del brano, infobox — data vera: Wikipedia ultima modifica 23/06/2026; sito ufficiale senza data (footer © 2022)
- Estratto: «Music & Lyrics: PINO DANIELE» (sito ufficiale, sotto il testo del brano); Wikipedia: «Autore/i: Pino Daniele»
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «… e interpretata da Pino Daniele»
- Fonte precisa: Wikipedia it (infobox «Artista»); sito ufficiale «Vai mo'» (crediti)
- Estratto: «Guitar and vocal: Pino Daniele»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «uscì nel 1981»
- Fonte precisa: Wikipedia it, voce del brano, incipit — data vera: pagina modificata 23/06/2026. Verifica aggiuntiva: it.wikipedia «Vai mo'» (pubblicazione giugno 1981, EMI Italiana)
- Estratto: «è un brano musicale di Pino Daniele del 1981, presente nel suo quarto album Vai mo'»
- Esito: CONFERMATA
- Correzione proposta: —

##### A4 — P1
- Affermazione: «nell'album "Vai mo'"»
- Fonte precisa: Wikipedia it, incipit; sito ufficiale (tracklist: traccia 02)
- Estratto: «02. YES I KNOW MY WAY» (tracklist di Vai mo', sito ufficiale)
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «il quarto della sua carriera»
- Fonte precisa: Wikipedia it, voce del brano, incipit («nel suo quarto album»). Conferma alternativa (non citata): it.wikipedia «Vai mo'»: «è il quarto album in studio del cantautore»
- Estratto: «presente nel suo quarto album Vai mo'»
- Esito: CONFERMATA
- Correzione proposta: — (facoltativo: «quarto album in studio»; gli album precedenti sono tutti in studio)

##### A6 — P1
- Affermazione: «fonde blues, funk e fusion»
- Fonte precisa: Wikipedia it, sezione «Descrizione»; infobox «Genere: Blues, Funk, Fusion»
- Estratto: «la melodia e il testo hanno influenze blues, fusion e funk»
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: «con il napoletano cantato»
- Fonte precisa: Wikipedia it, sezione «Descrizione»
- Estratto: «alcune espressioni in lingua inglese in un cantato in napoletano»
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P1
- Affermazione: «intervallato da alcune espressioni in inglese»
- Fonte precisa: Wikipedia it, sezione «Descrizione» (stesso passo di A7)
- Estratto: «alcune espressioni in lingua inglese in un cantato in napoletano»
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «espressioni in inglese che danno il titolo alla canzone»
- Fonte precisa: Wikipedia it dice solo che ci sono espressioni inglesi; che il titolo sia una di esse si vede dal testo pubblicato sul sito ufficiale (il titolo ricorre nel brano). Nessuna fonte lo afferma in forma di frase.
- Estratto: non applicabile (dedotto da testo e titolo, non da una frase di fonte)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «intervallato da alcune espressioni in inglese, tra cui la frase che dà il titolo alla canzone»

##### A10 — P1
- Affermazione: citazione «Finalmente ero riuscito a creare una band forte, tutti solisti con alle spalle un passato di contaminazioni musicali»
- Fonte precisa: Sito ufficiale, «Vai mo' (1981)», https://www.pinodaniele.com/music/vai-mo-1981/ — riquadro «Pino's note», prima frase — data vera: non indicata
- Estratto: «Finalmente ero riuscito a creare una band forte, tutti solisti con alle spalle un passato di contaminazioni musicali»
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P1 (attribuzione «ha raccontato lo stesso Daniele sul proprio sito ufficiale»)
- Affermazione: «ha raccontato lo stesso Daniele sul proprio sito ufficiale»
- Fonte precisa: stessa pagina; genere della pagina: scheda dell'album con «Pino's note», firmata «(P.D.)», con traduzioni in inglese e francese. Non è un'intervista né un racconto orale; la data della nota non è indicata.
- Estratto: «Pino's note:» seguito dal testo firmato «(P.D.)»
- Esito: CONFERMATA CON RISERVA (verbo e attribuzione: è una nota scritta, ma la scheda dice giustamente «sul proprio sito ufficiale», quindi il contesto è dichiarato; «raccontato» è più forte di «scritto»)
- Correzione proposta: «ha scritto lo stesso Daniele in una nota sul proprio sito ufficiale»

##### A12 — P1
- Affermazione: citazione «'Yes I know my way' portò l'album in Europa [...] Quest'album per me fu molto importante e diede alla mia musica una nuova direzione»
- Fonte precisa: stessa pagina, stessa nota (la parte centrale, omessa con [...], parla di «Sulo pe' parlà» e della ricerca sulla melodia)
- Estratto: «"Yes I know my way" portò l'album in Europa e canzoni come "Sulo pe' parlà"…» / «Quest'album per me fu molto importante e diede alla mia musica una nuova direzione»
- Esito: CONFERMATA (fedele; l'ellissi non altera il senso. La versione inglese sul sito rende «portò in Europa» con «diffused the album in Europe»: significa diffusione dell'album, non primo approdo dell'artista; vedi A26)
- Correzione proposta: —

##### A13 — P2
- Affermazione: «Il testo è una rivendicazione di indipendenza»
- Fonte precisa: Sito ufficiale «Vai mo'», testo con glosse dell'autore/curatore (glosse 1-10). Lettura interpretativa coerente con le glosse («non è dove mi hai portato tu», «ora non mi freghi più», «per la tua strada, io resto a piedi»). Nessuna fonte critica formula questa interpretazione.
- Estratto: non riporto (sono versi/glosse del testo)
- Esito: CONFERMATA CON RISERVA (interpretazione coerente col testo, non attribuita a una fonte)
- Correzione proposta: «Il testo si legge come una rivendicazione di indipendenza» (o lasciare così, essendo lettura del testo, non fatto)

##### A14 — P2
- Affermazione: «il narratore ribadisce di conoscere la propria strada e di non volersene lasciar distogliere da chi gli suggerisce un percorso diverso»
- Fonte precisa: testo con glosse sul sito ufficiale (strofe e ritornello; la seconda parte del brano contiene esortazioni a non dare retta a nessuno)
- Estratto: non riporto
- Esito: CONFERMATA CON RISERVA (regge come parafrasi; «chi gli suggerisce» è una lettura: nel testo c'è un «tu» che va per la sua strada, non necessariamente uno che suggerisce)
- Correzione proposta: «il narratore ribadisce di conoscere la propria strada, diversa da quella a cui qualcun altro lo ha condotto, e di non volersi far portare altrove»

##### A15 — P2
- Affermazione: «Il verso del titolo diede poi il nome … alla … raccolta»
- Fonte precisa: Sito ufficiale, «Yes I know my way – The Best of | 1998», https://www.pinodaniele.com/music/yes-i-know-my-way-the-best-of-1998/ (titolo della pagina). Conferma non citata: it.wikipedia «Yes I Know My Way» (raccolta): «Prende il nome dall'omonima canzone del 1981»
- Estratto: «Yes I know my way – The Best of | 1998» (titolo)
- Esito: CONFERMATA
- Correzione proposta: — (nota: «verso del titolo» va bene, è il titolo; nessun verso riprodotto)

##### A16 — P2
- Affermazione: «nel 1998»
- Fonte precisa: sito ufficiale, titolo della pagina («1998»); it.wikipedia raccolta: «Pubblicazione aprile 1998»
- Estratto: «raccolta discografica di Pino Daniele, uscita nel 1998» (it.wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A17 — P2 e Frase iconica
- Affermazione: «prima raccolta di successi»
- Fonte precisa: nessuna delle tre fonti citate. Sito ufficiale 1998: nessun «prima». Wikipedia (voce del brano): non parla della raccolta. Contro-indizio letto: il modello di navigazione delle voci it.wikipedia elenca, prima di «Yes I Know My Way», le raccolte «Musica musica», «Tra musica e magia», «Passa 'o tiempo e che fa – I primi anni», «Voglio 'o mare». Una ricerca web indica «Tra musica e magia» come doppio LP EMI del 1990 di successi rivisitati (Amazon.it, Rockit: solo anno, etichetta, genere; non ho potuto leggere dettagli sulla curatela).
- Estratto: «non letto: nessuna fonte citata contiene "prima"»
- Esito: NON CONFERMATA
- Correzione proposta: togliere «prima»: «alla raccolta di successi uscita nel 1998»

##### A18 — P2 e Frase iconica
- Affermazione: «curata personalmente dall'artista»
- Fonte precisa: sito ufficiale 1998, crediti: indicano «Produced and arranged by Pino Daniele» per le tracce e «Mastered by Antonio Baglio and Pino Daniele». La pagina non dice che la selezione sia stata da lui curata. it.wikipedia raccolta (non citata): «i successi dei suoi primi 20 anni di carriera riarrangiati e tre inediti».
- Estratto: «Produced and arranged by Pino Daniele» (crediti); «Contenente i successi dei suoi primi 20 anni di carriera riarrangiati e tre inediti» (it.wikipedia)
- Esito: CONFERMATA CON RISERVA (prodotta e arrangiata da lui: sì; «curata personalmente» come scelta/curatela della selezione: non documentata)
- Correzione proposta: «alla raccolta del 1998, prodotta e arrangiata da Daniele stesso, con i successi dei suoi primi vent'anni in nuove versioni» (fonti: crediti sul sito ufficiale, livello A; it.wikipedia raccolta, livello C)

##### A19 — P2
- Affermazione: «di cui Daniele stesso disse: "'Yes I know my way' resta sempre un pezzo storico della mia carriera"»
- Fonte precisa: Sito ufficiale 1998, nota in apertura, firmata «(P.D.)». Genere della pagina: nota dell'artista sul disco, non intervista; data non indicata. Il testo completo confronta il brano storico con il rifacimento «Senza peccato» (con i Simple Minds), citato come il pezzo «interessante» della raccolta.
- Estratto: «"Yes I know my way" resta sempre un pezzo storico della mia carriera»
- Esito: CONFERMATA CON RISERVA (citazione fedele; ma «di cui … disse» la fa sembrare un giudizio sulla raccolta, mentre è sul brano; è una nota scritta, non una dichiarazione orale)
- Correzione proposta: «Nella nota sul sito ufficiale dedicata alla raccolta, Daniele scrive: "'Yes I know my way' resta sempre un pezzo storico della mia carriera"»

##### A20 — Frase iconica
- Affermazione: «Il momento più citato è il ritornello del titolo»
- Fonte precisa: nessuna delle fonti citate; nessuna misura di «citazione». Che la frase del titolo ricorra come ritornello è verificabile dal testo sul sito ufficiale, ma «più citato» no.
- Estratto: «non letto: nessuna fonte»
- Esito: NON CONFERMATA
- Correzione proposta: «Il ritornello, costruito sulla frase del titolo, è il cuore della canzone: il narratore afferma…» (o «dichiarare il dubbio»: non presentare «più citato» come fatto)

##### A21 — Frase iconica
- Affermazione: «il narratore afferma di conoscere la propria strada e di non volersi far deviare su quella di qualcun altro»
- Fonte precisa: testo con glosse, sito ufficiale (vedi A14)
- Estratto: non riporto
- Esito: CONFERMATA CON RISERVA (parafrasi ragionevole, lettura del testo)
- Correzione proposta: come A14 (facoltativa)

##### A22 — Frase iconica
- Affermazione: «contrapposto all'immagine di chi cammina dritto mentre lui resta indietro»
- Fonte precisa: testo con glosse sul sito ufficiale: una delle due glosse dice che l'altro va per la sua strada mentre il narratore resta a piedi. «Resta indietro» è più forte di «a piedi».
- Estratto: non riporto
- Esito: CONFERMATA CON RISERVA (regge, ma è parafrasi molto vicina alla riga della strofa; vedi rilievo sul verso nel riepilogo)
- Correzione proposta: rendere più astratto: «contrapposto a un “tu” che procede per la sua strada mentre lui si ferma o si arrangia altrimenti»

##### A23 — Frase iconica
- Affermazione: «disposto a inciampare pur di restare fedele al proprio percorso»
- Fonte precisa: testo con glosse del sito ufficiale. La glossa della riga corrispondente rende con «io m'arrangio» (cioè «me la cavo da solo»); un'altra glossa dice che accetta il rischio solo se ne vale la pena. «Inciampare» e «pur di restare fedele» non compaiono in nessuna glossa.
- Estratto: non riporto
- Esito: CONFERMATA CON RISERVA (lettura personale più drammatica della glossa ufficiale)
- Correzione proposta: «disposto a cavarsela da solo e a correre il rischio, se ne vale la pena»

##### A24 — Frase iconica
- Affermazione: «Scritta in un misto di napoletano e inglese»
- Fonte precisa: Wikipedia it, «Descrizione» (vedi A7-A8)
- Estratto: «alcune espressioni in lingua inglese in un cantato in napoletano»
- Esito: CONFERMATA
- Correzione proposta: —

##### A25 — Frase iconica
- Affermazione: «uscita nel 1981 nell'album "Vai mo'"»
- Fonte precisa: Wikipedia it, incipit
- Estratto: «del 1981, presente nel suo quarto album Vai mo'»
- Esito: CONFERMATA
- Correzione proposta: —

##### A26 — Frase iconica
- Affermazione: «"Vai mo'", che portò Daniele per la prima volta in Europa»
- Fonte precisa: la sola fonte pertinente è la nota sul sito ufficiale (A12), che dice altro: è il brano «Yes I know my way» a portare l'album in Europa (versione inglese: «diffused the album in Europe», francese: album «distribué en Europe»). Il soggetto è cambiato (l'album invece del brano; Daniele invece dell'album) e «per la prima volta» non compare in nessuna fonte letta.
- Estratto: «"Yes I know my way" portò l'album in Europa»
- Esito: NON CONFERMATA
- Correzione proposta: «uscita nel 1981 nell'album "Vai mo'", che, secondo lo stesso Daniele, fu portato in Europa proprio da questo brano»

##### A27 — Frase iconica
- Affermazione: «la canzone divenne talmente identificata con lui da dare il nome, nel 1998, alla sua prima raccolta»
- Fonte precisa: che il titolo sia stato dato alla raccolta è confermato (A15); il nesso causale «talmente identificata con lui» non è in nessuna fonte. «Prima raccolta … curata personalmente»: vedi A17-A18.
- Estratto: «non letto: nessuna fonte contiene il nesso causale»
- Esito: NON CONFERMATA
- Correzione proposta: «il brano diede poi il titolo alla raccolta di successi del 1998, in cui Daniele ne ripropose una nuova versione, "Senza peccato", con Jim Kerr dei Simple Minds» (fonte: it.wikipedia raccolta, sezione «Descrizione» e tracce; livello C; sito ufficiale 1998 per la citazione di Daniele su «Senza peccato», livello A)

##### A28 — Metadati
- Affermazione: «anno: 1981»
- Fonte precisa: Wikipedia it (brano e album); è l'anno dell'album e del brano (non fu singolo autonomo secondo le fonti lette; non verificato con fonti di catalogo)
- Estratto: «del 1981»
- Esito: CONFERMATA
- Correzione proposta: —

##### A29 — Metadati
- Affermazione: «album: Vai mo'»
- Fonte precisa: Wikipedia it; sito ufficiale (tracklist). È l'album originale del 1981 (non una raccolta). Lo spotifyId punta però alla ristampa «Vai mo' (2021 Remaster)» (vedi controlli), coerente con l'album.
- Estratto: «02. YES I KNOW MY WAY»
- Esito: CONFERMATA
- Correzione proposta: —

##### A30 — Metadati
- Affermazione: «genereTesto: Blues / Funk / Napoletano»
- Fonte precisa: Wikipedia it, infobox «Genere: Blues, Funk, Fusion»; «Napoletano» è la lingua, non un genere (ma coerente con «cantato in napoletano»).
- Estratto: «Genere: Blues, Funk, Fusion»
- Esito: CONFERMATA
- Correzione proposta: — (facoltativo: «Blues / Funk / Fusion, in napoletano»)

##### SEO
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Controlli sui metadati e sui link
- Anno / album: vedi A28-A29. Album di provenienza: «Vai mo'», giugno 1981, EMI Italiana (it.wikipedia «Vai mo'», letto il 21/09/2026).
- ascoltiTesto: valore pubblicato «None» (nessun numero mostrato). Nessuna pagina kworb è tra le fonti citate. Per riferimento, letta il 21/09/2026 la pagina kworb dell'artista (https://kworb.net/spotify/artist/2eFv7NVs8R6Go7msuqikeg_songs.html): la riga «Yes I Know My Way - 2021 Remaster» (stesso ID Spotify della scheda) riporta 23.565.032 stream totali (14.107 giornalieri). Altre versioni sullo stesso artista: «Special Remix del 1983» 1.485.554; «Live» 1.202.671. Un'eventuale cifra pubblicata dovrà indicare che si riferisce alla sola versione 2021 Remaster.
- spotifyId 0HVvtZhPgnuR2Nia1x8zUX: oEmbed risponde 200, titolo «Yes I Know My Way - 2021 Remaster»; la pagina open.spotify.com/track indica «Pino Daniele · Vai mo' (2021 Remaster) · Song · 1981». Brano giusto.
- testoUrl https://www.letras.com/pino-daniele/yes-i-know-my-way/: HTTP 200, titolo pagina «YES I KNOW MY WAY - Pino Daniele - LETRAS.COM». Pagina giusta.
- Stato HTTP delle fonti citate (lette con curl, 21/09/2026): it.wikipedia voce del brano 200 (ultima modifica 23/06/2026; la voce porta l'avviso «non cita le fonti necessarie»: fonte debole, livello C); pinodaniele.com «Vai mo' (1981)» 200; pinodaniele.com «Yes I know my way – The Best of (1998)» 200. Nessuna fonte bloccata o paywall. Le pagine del sito ufficiale non riportano data di pubblicazione delle note.
- Nota di R2-bis: Wikipedia (voce del brano) dice che la canzone ha il disco d'oro FIMI (50.000+), certificazione digitale: la scheda non lo dichiara, quindi nessun rischio.
- Nessuna pagina letta conteneva frasi rivolte a me.

#### Omissioni rilevanti (solo se cambiano il senso)
- La citazione del 1998 (A19) non riguarda tanto la raccolta quanto il rapporto fra il brano e il suo rifacimento «Senza peccato», che Daniele definisce il pezzo «interessante» della raccolta, con i Simple Minds. Presentarla come giudizio sulla raccolta la sposta di senso. La scheda potrebbe dirlo (fonte: sito ufficiale 1998, livello A; it.wikipedia raccolta per «Senza peccato» come nuova versione del brano, livello C).
- La raccolta del 1998 è in gran parte riarrangiata/rimessa in incisione (it.wikipedia raccolta): è un dettaglio che spiega «curata» meglio di quanto faccia la scheda.


---

## A.10 — All the Small Things (Blink-182) · `canzone/all-the-small-things/`

### Esito — All the Small Things (Blink-182)
Pagina: canzone/all-the-small-things/ — verificata il 21/09/2026 — priorità: 41 impressioni (Search Console, 3 mesi al 11/09/2026), posizione media 12.1

#### Riepilogo
- Affermazioni esaminate: 20 — CONFERMATA 13, CON RISERVA 6, NON CONFERMATA 1, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A12 (frase iconica) — «il verso più citato»: superlativo che nessuna fonte contiene (NON CONFERMATA).
  2. A15 (frase iconica) — «dopo le registrazioni dell'album»: le fonti dicono «dopo una lunga notte in studio / tornato a casa tardi dalle registrazioni»; l'episodio è una serata, non la fine delle registrazioni dell'album. Cambia il senso.
  3. A8 (P2) — «DeLonge ha raccontato…» (R3): l'unica fonte che attribuisce la frase a DeLonge come dichiarazione è Songfacts, che non dice dove/a chi l'abbia detta; le altre due fonti (Wikipedia, American Songwriter) descrivono il fatto senza riportare parole sue. Scheda senza attribuzione né destinatario.
  4. A4 (P1) — la lamentela della fidanzata («scriveva sempre di altre ragazze») compare solo su Songfacts, senza fonte a monte e senza nome; il nome (Jenkins) viene da altre due fonti. Fusione non dichiarata.
  5. A11 (P2) — «aiutando a consacrare il pop punk come mainstream a cavallo del nuovo millennio»: Wikipedia lo presenta come merito «attribuito» (nota a un articolo di Entertainment Tonight non aperto), la scheda lo dà come fatto.
  6. A16 (frase iconica) — «coro finale»: nessuna fonte parla di «finale».
- Cosa non sono riuscito a documentare: la fonte primaria della lamentela della fidanzata e della dichiarazione sui Ramones (Wikipedia le rimanda a Kerrang! 2005/2015, Total Guitar 2006, programma ufficiale 2000 di MCA: non li ho aperti; rockband.fandom.com risponde 402). La frase di DeLonge riportata da un motore di ricerca («dovevo scriverle una canzone…») è nei risultati di ricerca, non l'ho letta su una pagina aperta: non conta come documentata.
- Sospetto verso nella frase iconica: no. Non ci sono virgolette. Nota di cautela minima: «rose lasciate sulle scale» descrive il contenuto di un verso in forma molto vicina al testo originale; è una parafrasi dell'episodio (lo stesso episodio è raccontato da tutte e tre le fonti in prosa), non una traduzione fra virgolette. Non lo considero violazione, ma è il punto più vicino al limite.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritta principalmente da Tom DeLonge»
- Fonte precisa: American Songwriter — https://americansongwriter.com/meaning-all-the-small-things-blink-182-song-lyrics/ — sezione «The meaning of song lyrics», primo capoverso — articolo «Behind the Song» di Catherine Walthall, 16 agosto 2022 (non è un'intervista)
- Estratto: «Tom DeLonge is credited as the main songwriter on the track»
- Conferma anche Wikipedia (incipit: «written primarily by guitarist Tom DeLonge»), letta oggi.
- Esito: CONFERMATA
- Correzione proposta: — (nota: i crediti ufficiali sono DeLonge e Hoppus, vedi Omissioni)

##### A2 — P1
- Affermazione: «verso la fine delle session di scrittura di "Enema of the State"»
- Fonte precisa: American Songwriter — stesso URL — sezione «The Surprising Simplicity» — 16/08/2022
- Estratto: «written at the end of the songwriting process for Blink-182's popular album, Enema of the State (1999)»
- Wikipedia (Background) dice cose compatibili: quando il pezzo fu abbozzato «most of the tracks» erano già scritte; e una citazione dice che fu «one of the last songs we recorded».
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «"Enema of the State" (1999)»
- Fonte precisa: Songfacts — https://www.songfacts.com/facts/blink-182/all-the-small-things — intestazione della scheda (pagina non datata) — e American Songwriter (sopra)
- Estratto: «Album: Enema Of The State ( 1999 )»
- Esito: CONFERMATA
- Correzione proposta: —

##### A4 — P1
- Affermazione: «nacque come risposta alla fidanzata dell'epoca … che si era lamentata del fatto che scrivesse sempre canzoni dedicate ad altre ragazze»
- Fonte precisa: Songfacts — https://www.songfacts.com/facts/blink-182/all-the-small-things — primo paragrafo (pagina non datata; contiene riferimenti a Total Guitar 2006 e NME 2014) — genere: scheda di curiosità, non intervista
- Estratto: «wrote "All The Small Things" for his girlfriend after she complained that he always writes songs about other girls»
- Note: Songfacts non nomina la fidanzata e non cita la fonte di questa frase. Wikipedia e American Songwriter confermano che il brano è per la fidanzata Jennifer Jenkins ma NON riportano la lamentela (letto: nessuna delle due la contiene). La scheda unisce le due cose. Il dettaglio è plausibile e molto diffuso in rete, ma nelle fonti citate poggia su una sola pagina non sorgivata.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Secondo Songfacts, nacque come risposta alla fidanzata dell'epoca, Jennifer Jenkins, che si era lamentata del fatto che lui scrivesse sempre canzoni dedicate ad altre ragazze.» (oppure, senza attribuzione, solo se si aggiunge una fonte primaria: l'intervista a DeLonge da cui la frase deriva; non l'ho aperta, quindi non la indico.)

##### A5 — P1
- Affermazione: «la fidanzata dell'epoca, Jennifer Jenkins»
- Fonte precisa: American Songwriter — sezione «The meaning of song lyrics» — 16/08/2022; Wikipedia — Background
- Estratto: «written it for his girlfriend at the time, Jennifer Jenkins»
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: «Il secondo verso si ispira a un gesto romantico della stessa Jenkins»
- Fonte precisa: American Songwriter — sezione «The meaning of song lyrics» — 16/08/2022
- Estratto: «DeLonge previously explained that the second verse was inspired by a romantic gesture from Jenkins»
- Verifica di struttura: sulla pagina Letras la strofa con le rose è la quinta delle nove sezioni del testo, dopo la prima strofa e un ritornello: coerente con «secondo verso».
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: «una notte lasciò delle rose sulle scale dopo che DeLonge era rimasto a registrare fino a tardi»
- Fonte precisa: American Songwriter — stessa sezione; Songfacts — primo paragrafo; Wikipedia — Background
- Estratto: «left roses on the stairs for DeLonge after he had been recording late into the night» (AS); «based on a time Jenkins did just that after DeLonge returned home late from recording» (Wikipedia)
- Note: «una notte» è lettura ragionevole di «late into the night» / «a long night in the studio».
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P2
- Affermazione: «DeLonge ha raccontato di essersi ispirato ai Ramones per l'uso dei cori "na na"»
- Fonte precisa: Songfacts — stesso URL — paragrafo che segue la nota sul titolo originale — pagina non datata, genere: scheda di curiosità (non intervista). Wikipedia — Background: «DeLonge had wanted to write a track including "na na na's" as an ode to one of his favorite bands, the Ramones». American Songwriter — «Surprising Simplicity»: «a straightforward homage to one of DeLonge's favorite bands the Ramones».
- Estratto: «DeLonge said he incorporated the "na na na's" in the lyrics as a nod to the Ramones»
- Note (R3): il fatto è confermato da tre fonti; ma la forma «ha raccontato» richiede una dichiarazione con destinatario. Songfacts riferisce «said» senza dire a chi né quando; Wikipedia e AS non riportano parole di DeLonge. Songfacts aggiunge un dettaglio che la scheda omette: la scelta serviva anche perché DeLonge «couldn't think of any other words» (letto).
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «I cori "na na" sono un omaggio ai Ramones, uno dei gruppi preferiti di DeLonge, che lo ha dichiarato (secondo Songfacts, senza indicare la sede).» Oppure, più sobrio: «DeLonge voleva inserire dei cori "na na" come omaggio ai Ramones.»

##### A9 — P2
- Affermazione: «volendo unire un omaggio al punk più classico a un ritornello pensato per la radio»
- Fonte precisa: Wikipedia — Background; Songfacts — penultimo blocco (citazione da Total Guitar 2006: «It was obvious from the beginning it would fit that format»); American Songwriter — «looking to make the song catchy for radio»
- Estratto: «The label's gonna want a song for the radio – so here's one» (DeLonge, riportato da Wikipedia)
- Note: i due elementi (omaggio ai Ramones; pezzo da radio) sono ciascuno documentati; nessuna fonte li presenta come un'unica intenzione di «unire» due cose, né qualifica i Ramones come «punk più classico». È una sintesi interpretativa.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Voleva un pezzo semplice e adatto alla radio, e vi inserì i cori "na na" come omaggio ai Ramones.»

##### A10 — P2
- Affermazione: «Il brano divenne uno dei maggiori successi della band»
- Fonte precisa: Wikipedia — incipit e «Commercial performance»; American Songwriter — «The Surprising Simplicity»
- Estratto: «the band's highest-charting single in the United States, peaking at number six on the Billboard Hot 100» (Wikipedia); «arguably Blink-182's most recognizable song» (AS)
- Anche kworb (21/09/2026): è il brano più ascoltato su Spotify del gruppo (1,63 mld contro 1,13 mld del secondo).
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P2
- Affermazione: «aiutando a consacrare il pop punk come genere mainstream a cavallo del nuovo millennio»
- Fonte precisa: Wikipedia — sezione «Legacy» — pagina live, letta il 21/09/2026
- Estratto: «It has been credited with popularizing pop-punk in the mainstream.» (Wikipedia; nota riconducibile, per come sono numerate, a un articolo Entertainment Tonight del 2015, che non ho aperto)
- Note: nessuna fonte parla di «consacrare» né di «a cavallo del nuovo millennio». Songfacts e American Songwriter non trattano il tema. Si tratta di un giudizio («viene accreditato»), non di un fatto.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Al brano viene attribuito il merito di aver contribuito a portare il pop punk al grande pubblico (Wikipedia).»

##### A12 — Frase iconica
- Affermazione: «Il verso più citato racconta di rose lasciate sulle scale come sorpresa»
- Fonte precisa: nessuna delle fonti citate. Wikipedia e American Songwriter riportano quel passaggio del testo e lo commentano, ma nessuna (né Songfacts) lo dice «il più citato».
- Estratto: «non letto: non esiste»
- Esito: NON CONFERMATA
- Correzione proposta: «Le rose lasciate sulle scale come sorpresa, nel secondo verso, raccontano un episodio davvero accaduto a Tom DeLonge.» (toglie il superlativo)

##### A13 — Frase iconica
- Affermazione: «un episodio realmente accaduto a Tom DeLonge»
- Fonte precisa: Songfacts — primo paragrafo; Wikipedia — Background
- Estratto: «According to DeLonge, the lyrics are true.» (Songfacts)
- Esito: CONFERMATA
- Correzione proposta: —

##### A14 — Frase iconica
- Affermazione: «che trovò dei fiori lasciati dalla sua ragazza dell'epoca al suo ritorno a casa»
- Fonte precisa: Wikipedia — Background
- Estratto: «based on a time Jenkins did just that after DeLonge returned home late from recording»
- Esito: CONFERMATA
- Correzione proposta: —

##### A15 — Frase iconica
- Affermazione: «dopo le registrazioni dell'album»
- Fonte precisa: Songfacts — «after a long night in the studio»; American Songwriter — «after he had been recording late into the night»; Wikipedia — «returned home late from recording»
- Estratto: «His girlfriend really did leave him roses by the stairs after a long night in the studio.» (Songfacts)
- Note: le fonti parlano di una sera di registrazione, non della conclusione delle registrazioni dell'album. Formulazione più forte e diversa dalla fonte; incoerente anche con P1 («rimasto a registrare fino a tardi»).
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: sostituire con «al suo ritorno a casa dopo una lunga notte in studio».

##### A16 — Frase iconica
- Affermazione: «Il coro finale è un omaggio dichiarato ai Ramones»
- Fonte precisa: Songfacts — «as a nod to the Ramones»; Wikipedia; American Songwriter — «the chorus of na-nas was a straightforward homage»
- Estratto: «the chorus of na-nas was a straightforward homage to one of DeLonge's favorite bands the Ramones» (AS)
- Note: «omaggio dichiarato» regge (vedi A8 per la riserva sul «dichiarato»). «Finale» non sta in nessuna fonte; le fonti dicono «ritornello»/«cori». Dalla struttura del testo su Letras i «na na» compaiono in più sezioni, non solo alla fine.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «I cori "na na" del ritornello sono un omaggio dichiarato ai Ramones, tra i gruppi preferiti di DeLonge.»

##### A17 — Frase iconica
- Affermazione: «tra i gruppi preferiti di DeLonge»
- Fonte precisa: Wikipedia — Background («one of his favorite bands, the Ramones»); American Songwriter — «Surprising Simplicity»
- Estratto: «one of DeLonge's favorite bands the Ramones»
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — Metadati (anno: 1999)
- Fonte precisa: Wikipedia — infobox: singolo uscito il 28/09/1999 (secondo singolo dall'album); Songfacts — «Enema Of The State ( 1999 )». Anno coerente sia per l'album sia per il singolo (l'uscita del singolo è di settembre 1999, letta su Wikipedia; la data di uscita dell'album, giugno 1999, è nella mia memoria e non l'ho letta oggi).
- Esito: CONFERMATA
- Correzione proposta: —

##### A19 — Metadati (album: Enema of the State)
- Fonte precisa: Wikipedia (incipit) — «second single from the band's third studio album, Enema of the State»; Songfacts. È l'album originale, non una raccolta.
- Esito: CONFERMATA
- Correzione proposta: —

##### A20 — Metadati (ascoltiTesto: 1,6 mld ascolti)
- Fonte precisa: kworb.net — https://kworb.net/spotify/artist/6FBDaR13swtiWwGhX1WQsP_songs.html — tabella «blink-182 – Spotify Top Songs», riga «All The Small Things» — letta il 21/09/2026
- Estratto: «1,627,143,756» stream totali (giornalieri: 707.312)
- Esito: CONFERMATA (l'arrotondamento «1,6 mld» regge; dato variabile, cresce di circa 0,7 milioni al giorno)
- Correzione proposta: —

#### Controlli sui metadati e sui link
- anno: 1999 (singolo e album). Regge (A18).
- album: Enema of the State, originale (A19).
- genereTesto «Pop punk»: coerente con Wikipedia («pop-punk, punk rock, and power pop») e American Songwriter.
- ascoltiTesto: kworb 1.627.143.756 stream il 21/09/2026: «1,6 mld» regge.
- spotifyId 2m1hi0nfMR9vdGC8UcrnwU: oEmbed risponde 200, titolo restituito «All The Small Things» (corretto). Non ho verificato l'artista (oEmbed non lo restituisce): non ho aperto la pagina della traccia.
- testoUrl https://www.letras.com/blink-182/all-the-small-things/: HTTP 200, titolo pagina «ALL THE SMALL THINGS – blink-182 – LETRAS.COM». Pagina corretta.
- Stato HTTP delle fonti (curl con user agent da browser, 21/09/2026): Wikipedia 200; Songfacts 200 (contenuto completo, non datato); American Songwriter 200 (datata 16/08/2022); kworb 200. Nessuna paywall/blocco riscontrato. rockband.fandom.com (non citata dalla scheda, aperta per cercare la fonte primaria): 402.
- Le pagine lette non contenevano frasi rivolte a me.

#### Omissioni rilevanti (solo se cambiano il senso)
- Crediti: il brano è accreditato a Tom DeLonge e Mark Hoppus (Wikipedia, sezione «Composition»). «Scritta principalmente da DeLonge» è corretto, ma la scheda non dice che il credito ufficiale è condiviso con Hoppus. Aggiunta suggerita: «accreditata a DeLonge e Hoppus».
- Le fonti citano un dettaglio che la scheda omette e che dà forza al P2: DeLonge voleva un pezzo «really catchy and basic» perché il resto dell'album era già scritto (Wikipedia, Background); non cambia il senso, solo un arricchimento.


---

## A.11 — Ho messo via (Ligabue) · `canzone/ho-messo-via/`

### Esito — Ho messo via (Ligabue)
Pagina: canzone/ho-messo-via/ — verificata il 21/09/2026 — priorità: 37 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 9.5

Metodo: ho scaricato e letto di persona (curl, testo estratto dall'HTML) Wikipedia «Ho messo via» (ultima modifica della pagina: 4 luglio 2026, dalla pagina stessa e dall'API), OndaRock monografia Ligabue, kworb, Letras, oEmbed Spotify. In più ho letto la voce Wikipedia dell'album, la voce Wikipedia di «Ivy», due articoli RDS e la pagina Spotify dei due ID. Discogs mi ha bloccato (Cloudflare 403): di quella fonte ho visto solo il titolo di un risultato di ricerca, non la pagina, quindi non la uso come prova.

#### Riepilogo
- Affermazioni esaminate: 22 — CONFERMATA 16, CON RISERVA 4, NON CONFERMATA 1, CONTRADDETTA 0, NON DOCUMENTABILE 1
- Difetti in ordine di gravità:
  1. M3/M4 — Il dato «36,1 mln ascolti» non appartiene alla traccia Spotify indicata in spotifyId: kworb (letto il 21/09/2026, aggiornamento 14/09/2026) assegna 36.322.626 stream a un altro ID (versione dalla raccolta «Primo tempo»), non a 4xyp77VPg90ezi7N1p99a5 (versione dall'album, «2009 Remaster»), che nella lista kworb non compare. In più il valore è già superato (oggi arrotonderebbe a 36,3).
  2. F3 — «resta una delle ballate più amate del repertorio di Ligabue»: nessuna delle tre fonti citate lo dice; è un giudizio di valore non attribuito.
  3. A6 vs F1 — P1 dice «ma non una persona in particolare», formula ambigua che si legge come il contrario del senso voluto (e contraddice la frase iconica, che dice «una persona in particolare»).
  4. A2/F2 — «secondo estratto» e 1993 poggiano solo su Wikipedia (voce che si segnala da sola come priva di fonti) e la scheda omette che il singolo fu solo promozionale (CD promo a una traccia).
  5. Forma — P1, P2 e la frase iconica seguono molto da vicino le frasi della voce Wikipedia (stessa struttura, stessi termini, stessa sequenza di tre strumentisti): rischio di aderenza eccessiva a un testo CC BY-SA e non in «parole originali».
  6. [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]
- Cosa non sono riuscito a documentare: la data precisa di uscita del singolo promo e il suo ordine («secondo») da una fonte primaria o indipendente (Discogs bloccato, Wikipedia senza note); il numero di stream della traccia 4xyp77VPg90ezi7N1p99a5 in particolare; la nota Tgcom (25/11/2010) citata da Wikipedia a sostegno della cover di Elisa (non l'ho aperta; l'ho però riscontrata sulla voce Wikipedia di «Ivy»).
- Sospetto verso nella frase iconica: no. La frase parafrasa il contenuto del testo senza virgolette e senza riprodurre righe. Unica osservazione: in P1 le virgolette su «mettere via» racchiudono il titolo/locuzione ricorrente (2 parole, come fa Wikipedia): accettabile.

Nota di conteggio: le 22 voci sono A1–A13, F1–F3, M1–M6. CONFERMATA 16 (A1, A3, A4, A5, A7, A8, A9, A10, A11, A12, A13, F1, M1, M2, M5, M6), CON RISERVA 4 (A2, A6, F2, M3), NON CONFERMATA 1 (F3), NON DOCUMENTABILE 1 (M4: stream della traccia indicata).

#### Affermazioni

##### A1 — P1 (anno del singolo)
- Affermazione: «Pubblicata nel 1993»
- Fonte precisa: Wikipedia «Ho messo via» — https://it.wikipedia.org/wiki/Ho_messo_via — incipit e infobox («Pubblicazione 1993»); anche voce «Sopravvissuti e sopravviventi», riquadro Singoli — data pagina: modifica 04/07/2026
- Estratto: «pubblicato nel 1993 come secondo estratto dall'album Sopravvissuti e sopravviventi»
- Esito: CONFERMATA
- Correzione proposta: — (l'album è uscito il 22/01/1993 secondo la voce Wikipedia dell'album, che cita il Corriere della Sera del 16/01/1993, e secondo RDS 21/01/2022; la data esatta del singolo non è documentata)

##### A2 — P1 (ordine: secondo estratto)
- Affermazione: «come secondo estratto dall'album»
- Fonte precisa: Wikipedia «Ho messo via» (incipit; riquadro «Singolo precedente: Ancora in piedi / successivo: Quando tocca a te»); Wikipedia album (elenco singoli: Ancora in piedi, Ho messo via, Quando tocca a te/I duri hanno due cuori...)
- Estratto: «singolo promozionale ... pubblicato nel 1993 come secondo estratto dall'album»
- Esito: CONFERMATA CON RISERVA — due motivi: (1) l'unica fonte è Wikipedia, e la voce porta l'avviso «non cita le fonti necessarie»; l'ordine non è riscontrato altrove (RDS dice solo che è un singolo dell'album); (2) la voce lo definisce «singolo promozionale» (CD single a una traccia, WEA, cat. PROMO 467), non un singolo commerciale, e la scheda non lo dice. OndaRock non dice nulla sull'ordine dei singoli di questo brano (dice solo che «Ancora in piedi» fu il singolo di lancio).
- Correzione proposta: «Uscita nel 1993 come singolo promozionale, secondo estratto dall'album "Sopravvissuti e sopravviventi" secondo Wikipedia, ...» oppure, più asciutto: «Uscita nel 1993 come singolo promozionale tratto dall'album "Sopravvissuti e sopravviventi", dopo "Ancora in piedi".» Livello: Wikipedia = C; per salire a B servirebbe Discogs (r8789003, CD single promo 1993, non aperto: 403) o il sito ufficiale.

##### A3 — P1 (album di provenienza)
- Affermazione: «dall'album "Sopravvissuti e sopravviventi"»
- Fonte precisa: Wikipedia «Ho messo via», infobox «Album di provenienza»; OndaRock, sezione discografia («Sopravvissuti e sopravviventi (WEA, 1993)») e corpo del testo («la perla dell'album, "Ho messo via"»)
- Estratto: «la perla dell'album, "Ho messo via", mette insieme...» (OndaRock)
- Esito: CONFERMATA
- Correzione proposta: —

##### A4 — P1 (è una ballata)
- Affermazione: «la ballata»
- Fonte precisa: Wikipedia «Ho messo via», sezione Descrizione
- Estratto: «La title track è una ballata romantica»
- Esito: CONFERMATA (nota: Wikipedia la classifica anche come «power ballad / soft rock»; OndaRock parla di «blues», vedi A13: non è una contraddizione, sono due descrizioni)
- Correzione proposta: —

##### A5 — P1 (ripercorre la propria vita e supera vari aspetti)
- Affermazione: «vede Ligabue ripercorrere la propria vita, riconoscendo di essere riuscito a "mettere via" — cioè superare — molte fasi ed esperienze del passato»
- Fonte precisa: Wikipedia «Ho messo via», Descrizione; riscontro nel testo su Letras (letto: il testo elenca cose «messe via»: rumori, illusioni, consigli, ferite, foto, ecc.)
- Estratto: «Ligabue guarda la propria vita, accorgendosi di essere riuscito a "mettere via", cioè a superare, più o meno bene, vari aspetti»
- Esito: CONFERMATA (la scheda dice «molte fasi ed esperienze del passato» dove Wikipedia dice «vari aspetti della sua vita»: leggera amplificazione, regge; Wikipedia precisa «più o meno bene», che la scheda omette)
- Correzione proposta: — (facoltativo: sostituire «molte fasi ed esperienze del passato» con «vari aspetti della propria vita»)

##### A6 — P1 (la persona non messa via, mai nominata)
- Affermazione: «ma non una persona in particolare, mai nominata esplicitamente nel testo»
- Fonte precisa: Wikipedia «Ho messo via», Descrizione; Letras (testo letto: il destinatario è sempre un «tu», mai un nome)
- Estratto: «di non essere riuscito a "mettere via" una persona, non specificata, quasi certamente un amore finito»
- Esito: CONFERMATA CON RISERVA — il contenuto è giusto, ma la formulazione «non una persona in particolare» si legge male: può voler dire «non si riferisce a nessuna persona precisa», il contrario del senso della canzone (una persona precisa, non nominata, che non riesce a togliersi). Contraddice la frase iconica, che dice correttamente «una persona in particolare».
- Correzione proposta: «...molte fasi ed esperienze del passato, ma non una persona, che nel testo non viene mai nominata.»

##### A7 — P2 (tromba)
- Affermazione: «assolo di tromba di Demo Morselli»
- Fonte precisa: Wikipedia «Ho messo via», Descrizione; Wikipedia album, crediti («Demo Morselli - tromba in Ho messo via»); OndaRock, sezione album 1993
- Estratto: «un intenso assolo di tromba di Demo Morselli» (OndaRock)
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P2 (introduzione al pianoforte)
- Affermazione: «un'introduzione al pianoforte di Gianfranco Fornaciari»
- Fonte precisa: Wikipedia «Ho messo via», Descrizione; OndaRock cita «il pianoforte da soffitta di Fornaciari» (senza dire «introduzione»)
- Estratto: «una introduzione al pianoforte di Gianfranco Fornaciari» (Wikipedia)
- Esito: CONFERMATA (il dettaglio «introduzione» è solo su Wikipedia; il ruolo di Fornaciari al pianoforte è riscontrato anche da OndaRock)
- Correzione proposta: —

##### A9 — P2 (bottleneck)
- Affermazione: «un riff di chitarra con bottleneck di Max Cottafavi»
- Fonte precisa: Wikipedia «Ho messo via», Descrizione; OndaRock, sezione album 1993
- Estratto: «i riff di Cottafavi con bottleneck» (OndaRock)
- Esito: CONFERMATA
- Correzione proposta: —

##### A10 — P2 (2010, Elisa)
- Affermazione: «Nel 2010 è stato reinterpretato da Elisa»
- Fonte precisa: Wikipedia «Ho messo via», sezione Cover (nota: Tgcom 25/11/2010, non aperta); riscontro sulla voce Wikipedia «Ivy (album)»: uscita 30 novembre 2010; tra le quattro cover c'è «Ho messo via di Ligabue» (3:50)
- Estratto: «Nel 2010 la canzone è stata reinterpretata da Elisa ed inclusa nel suo album Ivy.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P2 (album «Ivy»)
- Affermazione: «nell'album "Ivy"»
- Fonte precisa: come A10 (Wikipedia «Ivy (album)», tracklist e sezione sui contenuti)
- Estratto: «quattro cover (1979 ..., Pour Que l'Amour Me Quitte ..., Ho messo via di Ligabue e I Never Came...)»
- Esito: CONFERMATA
- Correzione proposta: —

##### A12 — P2 (OndaRock: «la perla dell'album»)
- Affermazione: «OndaRock ha definito il brano «la perla dell'album»»
- Fonte precisa: OndaRock — https://www.ondarock.it/monografie/ligabue/ — monografia su Ligabue, paragrafo dopo il commento a «Quando tocca a te», sezione su «Sopravvissuti e sopravviventi» — data vera: pubblicata 02/02/2025, modificata 26/05/2026 (dal markup della pagina); autore non individuato nei dati che ho letto. Genere: monografia critica (la frase è un giudizio del testo stesso, quindi «ha definito» è corretto).
- Estratto: «la perla dell'album, "Ho messo via", mette insieme»
- Esito: CONFERMATA (citazione fedele; il testo dice «perla dell'album» con l'apostrofo tipografico)
- Correzione proposta: — (facoltativo: «nella sua monografia su Ligabue, OndaRock definisce...»)

##### A13 — P2 (come mette insieme gli elementi; «come un carillon»)
- Affermazione: «per come mette insieme i riff con bottleneck di Cottafavi, il pianoforte di Fornaciari e l'assolo di tromba dentro un blues che gira «come un carillon»»
- Fonte precisa: OndaRock, stesso paragrafo di A12
- Estratto: «all'interno di un blues che gira come un carillon»
- Esito: CONFERMATA (citazione fedele; la scheda omette «da soffitta» e «intenso», nessun cambio di senso)
- Correzione proposta: —

##### F1 — Frase iconica (nucleo del testo)
- Affermazione: «Il nucleo del testo è l'ammissione di non riuscire a spiegarsi perché, pur avendo messo da parte tanti aspetti della propria vita, non si riesca a fare lo stesso con una persona in particolare, mai nominata esplicitamente nel testo.»
- Fonte precisa: testo della canzone su Letras (testoUrl) — letto; Wikipedia, Descrizione, per la lettura generale
- Estratto: non riporto parole cantate; la pagina contiene, nella parte del ritornello, un passaggio in cui l'io lirico dice di non spiegarsi il motivo della propria incapacità.
- Esito: CONFERMATA (parafrasi corretta e senza virgolette; nessun verso riprodotto). Nota: ripete P1 quasi parola per parola («persona in particolare, mai nominata esplicitamente nel testo»), ridondanza da evitare.
- Correzione proposta: — (facoltativo, per non ripetere P1: «Al centro c'è un'ammissione di impotenza: tante cose sono state sistemate e messe da parte, una persona no, e chi canta non sa spiegarsi il perché.»)

##### F2 — Frase iconica (secondo singolo, 1993)
- Affermazione: «Secondo singolo estratto dall'album "Sopravvissuti e sopravviventi" (1993)»
- Fonte precisa: come A1/A2
- Esito: CONFERMATA CON RISERVA (stesse riserve di A2: solo Wikipedia, singolo promozionale)
- Correzione proposta: come A2, o togliere, perché ripete P1.

##### F3 — Frase iconica (una delle ballate più amate)
- Affermazione: «resta una delle ballate più amate del repertorio di Ligabue»
- Fonte precisa: né Wikipedia «Ho messo via» né OndaRock né kworb contengono il giudizio (ho cercato «amat» nel testo di Wikipedia e di OndaRock: nessuna occorrenza riferita al brano; OndaRock la elogia come «perla dell'album» ma non parla di repertorio né di popolarità).
- Estratto: non letto nelle fonti citate. Fonte alternativa: RDS (https://www.rds.it/scopri/magazine/musica/storia-della-musica/compie-gli-anni-ho-messo-via-ballata-romantica-di-luciano-ligabue), pubblicato 21/01/2022, rubrica di anniversario di una radio (livello C): «E' stato il brano più amato estratto dall'album» e «amatissimo dai fan del Liga». Dato di riscontro (non prova di gradimento): kworb, aggiornato 14/09/2026, la mostra come quinta traccia più ascoltata di Ligabue su Spotify (dopo Certe notti, Piccola stella senza cielo, Gli ostacoli del cuore [come ospite] e Non è tempo per noi), ma il conteggio riguarda la versione da «Primo tempo» (vedi M3).
- Esito: NON CONFERMATA
- Correzione proposta: «Secondo RDS, è stato il brano più amato tra quelli estratti dall'album; su Spotify è tra le tracce più ascoltate di Ligabue (kworb, settembre 2026).» Se non si vuole aggiungere RDS come fonte: togliere la frase.

#### Metadati

##### M1 — anno
- Affermazione: «1993»
- Fonte: Wikipedia (singolo e album), RDS 21/01/2022 (album uscito 22/01/1993)
- Esito: CONFERMATA. L'anno coincide per singolo e album (album: 22/01/1993; il singolo è datato solo «1993»).

##### M2 — album
- Affermazione: «Sopravvissuti e sopravviventi»
- Fonte: Wikipedia; OndaRock; Wikipedia album (traccia 4, crediti). È l'album originale, non una raccolta.
- Esito: CONFERMATA

##### M3 — ascoltiTesto («36,1 mln ascolti»)
- Fonte precisa: kworb.net, artista Ligabue, pagina brani Spotify — https://kworb.net/spotify/artist/7H8ZC8uHJMPZGLMApRRNIz_songs.html — letta il 21/09/2026 (la pagina riporta «Last updated: 2026/09/14»)
- Estratto (dato): riga «Ho messo via - Remastred»: 36.322.626 stream totali, 19.279 al giorno
- Esito: CON RISERVA (cifra superata: oggi arrotonderebbe a 36,3 mln, non 36,1; il valore pubblicato era esatto in una data anteriore) e con un problema più grave di soggetto: il link Spotify di quella riga è l'ID 4IFF1JvAClZvWwJqmnI9I9, che la pagina Spotify (letta) indica come «Primo tempo [Deluxe Album], 2007». La scheda incorpora invece 4xyp77VPg90ezi7N1p99a5 (vedi M4). Le altre righe kworb «Ho messo via» sono versioni live/acustica, con 0,3–1,4 mln.
- Correzione proposta: aggiornare a «36,3 mln ascolti» indicando la fonte e la data (kworb, 14/09/2026), precisando che si tratta della versione remaster da «Primo tempo»; oppure sostituire lo spotifyId con 4IFF1JvAClZvWwJqmnI9I9 in modo che dato e traccia coincidano.

##### M4 — spotifyId (e stream della traccia indicata)
- Controllo: https://open.spotify.com/oembed?url=https://open.spotify.com/track/4xyp77VPg90ezi7N1p99a5 risponde HTTP 200, titolo «Ho messo via». La pagina Spotify della traccia dice: «Ligabue · Sopravvissuti e sopravviventi (2009 Remaster) · Song · 1993». Il brano è quindi giusto (versione dall'album originale, rimasterizzata).
- Il numero di stream di questo ID specifico non compare nella lista kworb dell'artista (nessuna occorrenza dell'ID; la pagina kworb della traccia risponde 404): non lo posso documentare.
- Esito: NON DOCUMENTABILE (per gli stream della traccia indicata); l'ID è corretto come brano.

##### M5 — testoUrl / testoFonte
- https://www.letras.com/ligabue-luciano/22855/ — HTTP 200; titolo pagina «HO MESSO VIA - Luciano Ligabue - LETRAS.COM»; è il testo giusto della canzone. Esito: CONFERMATA

##### M6 — genereTesto «Rock italiano»
- Etichetta generica; Wikipedia indica «Power ballad, soft rock», OndaRock colloca il disco nel filone rock d'autore. Non contraddetto. Esito: CONFERMATA

#### Controlli sui link (stato HTTP, 21/09/2026)
- Wikipedia «Ho messo via»: 200 (pagina con avviso di fonti insufficienti; ultima modifica 04/07/2026)
- OndaRock monografia Ligabue: 200 (con user agent da browser)
- kworb (Ligabue, brani Spotify): 200, aggiornamento 14/09/2026
- Letras: 200
- oEmbed Spotify: 200, titolo corretto
- Discogs (usato solo come tentativo di riscontro): 403 Cloudflare, non letto

#### Omissioni rilevanti (solo se cambiano il senso)
- Il brano è definito da Wikipedia «singolo promozionale» (nessuna uscita commerciale documentata): la scheda dice solo «pubblicata come secondo estratto». Vedi A2.
- Wikipedia riporta anche che il brano è certificato disco di platino FIMI (dal 2009, 50.000+ unità) e che nel 2007 raggiunse la posizione 36 della classifica FIMI dei singoli (settimana 48/2007): dati che la scheda non usa. Non li ho riverificati alla fonte primaria (FIMI): li segnalo solo come possibile arricchimento, con la cautela «secondo Wikipedia».
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]


---

## A.12 — Vieni a ballare in Puglia (Caparezza) · `canzone/vieni-a-ballare-in-puglia/`

### Esito — Vieni a ballare in Puglia (Caparezza)
Pagina: canzone/vieni-a-ballare-in-puglia/ — verificata il 21/09/2026 — priorità: 36 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 9.1

Metodo: le tre fonti citate sono state scaricate e lette nel testo integrale (HTML convertito in testo), non tramite riassunti. eHabitat, che al primo controllo dava HTTP 500, ha risposto 200. Ciò che segue è LETTO, salvo dove scrivo esplicitamente «ricordo» o «snippet di ricerca».

#### Riepilogo
- Affermazioni esaminate: 26 — CONFERMATA 14, CON RISERVA 9, NON CONFERMATA 3, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A24 — «Puglia da cartolina» è messo tra virgolette e attribuito a Rockol, ma l'espressione non compare in Rockol (che scrive «Puglia virtuale»); non è nemmeno un verso (assente dal testo su Letras).
  2. A20 — «nel gergo pugliese "ballare" sta per "morire"»: nessuna fonte parla di gergo pugliese per questo significato; Rockol dice invece che nel gergo locale «venire a ballare» vale un'altra cosa (un insulto volgare). Il significato «ballare = morire» è confermato solo come metafora interna alla canzone (Wikipedia, eHabitat).
  3. A16 — «ballato nei locali»: nessuna fonte lo dice; probabile fraintendimento di Rockol, dove «i locali» sono gli abitanti che nel video danzano una danza di morte, non le discoteche.
  4. A15 e A14 — «tormentone estivo», «ritmo incalzante», «ritornello orecchiabile»: le fonti citate dicono solo che il brano «ha tutti i numeri della hit estiva» e ha un ritmo «coinvolgente»; Rockol descrive anzi un andamento pesante, da marcia funebre.
  5. A23 — l'autore del testo su Rockol è Vincenzo Rossini (scheda tratta dal libro «Unadimille»), non Franco Zanetti; la scheda indica «Rockol — Franco Zanetti».
- Cosa non sono riuscito a documentare: nessuna affermazione è rimasta senza pagina letta. Non ho aperto una fonte primaria per la data di uscita (Wikipedia la deriva da una pagina iTunes archiviata) né per l'identificazione dell'incidente di Molfetta (A7).
- Sospetto verso nella frase iconica: no. Fra virgolette ci sono la parola «ballare» (titolo/parola singola) e l'espressione «Puglia da cartolina», che non è un verso (assente dal testo su Letras e da tutte le fonti), ma neppure una parola di Rockol (vedi A24).
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Affermazioni

##### A1 — P1
- Affermazione: «Pubblicata il 18 luglio 2008»
- Fonte precisa: Wikipedia — https://it.wikipedia.org/wiki/Vieni_a_ballare_in_Puglia — incipit e infobox (Pubblicazione 18 luglio 2008); stessa data nella voce dell'album — pagina modificata il 10/11/2025
- Estratto: «pubblicato il 18 luglio 2008 come secondo estratto dal quarto album in studio Le dimensioni del mio caos»
- Esito: CONFERMATA (fonte terziaria: Wikipedia rimanda a una pagina iTunes archiviata; non ho trovato una fonte primaria più solida)
- Correzione proposta: —

##### A2 — P1
- Affermazione: «come secondo estratto dall'album»
- Fonte precisa: Wikipedia (stessa pagina, incipit e navbox singoli: precedente «Eroe», successivo «Abiura di me»); voce dell'album https://it.wikipedia.org/wiki/Le_dimensioni_del_mio_caos, elenco singoli: Eroe 28/03/2008, Vieni a ballare in Puglia 18/07/2008
- Estratto: «pubblicato il 18 luglio 2008 come secondo estratto»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «album "Le dimensioni del mio caos"»
- Fonte precisa: Wikipedia (incipit); Rockol («da "Le dimensioni del mio caos", EMI, 2008»)
- Estratto: «"Vieni a ballare in Puglia" di Caparezza, da "Le dimensioni del mio caos", EMI, 2008»
- Esito: CONFERMATA
- Correzione proposta: —

##### A4 — P1
- Affermazione: «la canzone nasce come una dura denuncia dei problemi sociali e ambientali della Puglia»
- Fonte precisa: eHabitat (Alberto Pinto, 28/08/2015, recensione/commento) — https://www.ehabitat.it/2015/08/28/vieni-a-ballare-in-puglia-caparezza-canta-luci-e-ombre-della-sua-terra/ — quarto e quinto capoverso; Wikipedia, sezione Descrizione
- Estratto: «la denuncia di Caparezza è forte e diretta contro quelle fabbriche» (eHabitat); Wikipedia: «Il titolo è una dura provocazione»
- Esito: CONFERMATA CON RISERVA — che sia una denuncia è documentato; «nasce come» attribuisce un'intenzione originaria che nessuna fonte citata riporta (nessuna dichiarazione dell'autore). «Dura» in Wikipedia riguarda il titolo.
- Correzione proposta: «la canzone è una dura denuncia dei problemi sociali e ambientali della Puglia, terra d'origine dell'artista:» (togliere «nasce come»)

##### A5 — P1
- Affermazione: «Puglia, terra d'origine dell'artista»
- Fonte precisa: Wikipedia (canzone), Descrizione: «regione del rapper»; Wikipedia, voce Caparezza: «Molfetta, 9 ottobre 1973»
- Estratto: «altri temi di attualità della regione del rapper»
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: «dalle morti sul lavoro»
- Fonte precisa: Wikipedia, Descrizione; Rockol
- Estratto: «La canzone affronta il tema delicato delle morti bianche, in particolare in Puglia» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: «con un velato riferimento a un grave incidente avvenuto pochi mesi prima a Molfetta»
- Fonte precisa: Wikipedia, Descrizione (unica fonte citata che lo dice; eHabitat non nomina Molfetta, Rockol neppure)
- Estratto: «con un velato riferimento a un grave incidente avvenuto alcuni mesi prima a Molfetta, città del rapper»
- Esito: CONFERMATA CON RISERVA — è l'affermazione di Wikipedia, che nel punto non cita fonti; «pochi» vs «alcuni» è irrilevante. Non ho trovato una fonte che colleghi esplicitamente il brano a un incidente preciso (da snippet di ricerca, non aperti: il 3 marzo 2008 a Molfetta morirono cinque operai in una cisterna, ma nessuna fonte citata lo collega alla canzone).
- Correzione proposta: attribuire: «secondo Wikipedia, con un velato riferimento a un grave incidente avvenuto alcuni mesi prima a Molfetta, città del rapper». Non aggiungere il caso Truck Center senza una fonte che lo colleghi alla canzone.

##### A8 — P1
- Affermazione: «Molfetta, città natale di Caparezza»
- Fonte precisa: la fonte citata (Wikipedia, canzone) dice solo «città del rapper»; la nascita a Molfetta è in Wikipedia, voce Caparezza — https://it.wikipedia.org/wiki/Caparezza — incipit
- Estratto: «Caparezza, pseudonimo di Michele Salvemini (Molfetta, 9 ottobre 1973)»
- Esito: CONFERMATA CON RISERVA (fonte alternativa, livello C; la pagina citata non dice «natale»)
- Correzione proposta: «Molfetta, città di Caparezza» oppure aggiungere la voce Wikipedia «Caparezza» fra le fonti.

##### A9 — P1
- Affermazione: «agli incendi del Gargano del 2007»
- Fonte precisa: Wikipedia, Descrizione; eHabitat (cita gli incendi del Gargano, senza anno)
- Estratto: «gli incendi nel Gargano del 2007» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A10 — P1
- Affermazione: «all'inquinamento legato all'area industriale di Taranto»
- Fonte precisa: Wikipedia, Descrizione; eHabitat (ILVA di Taranto tra i responsabili dell'inquinamento)
- Estratto: «la grave situazione di inquinamento ambientale nella città di Taranto» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P1
- Affermazione: «allo sfruttamento dei lavoratori stranieri nei campi»
- Fonte precisa: Wikipedia, Descrizione («il caporalato degli extracomunitari nei campi»); eHabitat («immigrati maltrattati e sfruttati nei campi»)
- Estratto: «il caporalato degli extracomunitari nei campi»
- Esito: CONFERMATA
- Correzione proposta: —

##### A12 — P2
- Affermazione: «La versione pubblicata come singolo, e il relativo video, vedono la partecipazione vocale di Al Bano»
- Fonte precisa: Wikipedia, Descrizione e infobox (Featuring Al Bano)
- Estratto: «La versione pubblicata come singolo e il video inoltre hanno visto la partecipazione vocale di Al Bano»
- Esito: CONFERMATA (nota: nell'elenco tracce di Wikipedia la durata del singolo è 3:46, quella dell'album 3:59; non ho verificato se la versione dell'album contenga Al Bano, la scheda non lo dice)
- Correzione proposta: —

##### A13 — P2
- Affermazione: «che apre il brano cantandone le prime strofe»
- Fonte precisa: Wikipedia, Descrizione («canta l'introduzione») e Video musicale («inizia a cantare le prime strofe della canzone»); eHabitat («intro»); Rockol («incipit»)
- Estratto: «Al Bano, che canta l'introduzione» (Wikipedia)
- Esito: CONFERMATA CON RISERVA — «prime strofe» è la formula usata da Wikipedia per il video; le altre fonti parlano di introduzione/incipit.
- Correzione proposta: «che apre il brano cantandone l'introduzione»

##### A14 — P2
- Affermazione: «Il ritmo incalzante e il ritornello orecchiabile»
- Fonte precisa: eHabitat, secondo capoverso: «al ritmo verace e coinvolgente»; Rockol descrive un «incedere pesante» affine a «una marcia funebre». Sul ritornello nessuna delle tre fonti citate dice «orecchiabile». (Fonte non citata, Unadimille di Vincenzo Rossini, 03/09/2017, letta su web.archive.org: «il ritornello è irresistibile», «cantabile e memorabile».)
- Estratto: «al ritmo verace e coinvolgente si accompagna un testo incisivo e icastico» (eHabitat)
- Esito: CONFERMATA CON RISERVA — «incalzante» non è nelle fonti (e Rockol descrive un andamento pesante); «orecchiabile» è confermato solo da una fonte non citata.
- Correzione proposta: «Il ritmo coinvolgente e il ritornello facile da cantare» e aggiungere Unadimille (https://unadimille.it/2017/09/03/caparezza-vieni-a-ballare-in-puglia/) fra le fonti, oppure togliere l'aggettivo.

##### A15 — P2
- Affermazione: «hanno comunque trasformato il pezzo in un tormentone estivo»
- Fonte precisa: eHabitat, secondo capoverso: «ha tutti i numeri della hit estiva» (giudizio potenziale, non fatto accertato). Wikipedia: 19ª posizione in Italia nel 2008 (cita italiancharts.com), disco di platino FIMI dal 2009 (50 000+, non aperta la fonte FIMI).
- Estratto: «Il brano, pubblicato nel 2008, ha tutti i numeri della hit estiva» (eHabitat)
- Esito: CONFERMATA CON RISERVA — «tormentone» come fatto compiuto non è in nessuna fonte citata; l'unico riscontro è un giudizio di eHabitat più i dati di classifica.
- Correzione proposta: «Il ritmo coinvolgente ne ha fatto, secondo eHabitat, una canzone con "tutti i numeri della hit estiva"; in Italia raggiunse la 19ª posizione e in seguito il disco di platino (Wikipedia)».

##### A16 — P2
- Affermazione: «ballato nei locali»
- Fonte precisa: nessuna delle tre fonti. Sospetto fraintendimento di Rockol, dove «i locali» sono gli abitanti che nel video danzano come zombi («tutto attorno i locali danzano una danza di morte»).
- Estratto: «non letto: non presente in nessuna delle fonti citate»
- Esito: NON CONFERMATA
- Correzione proposta: togliere «ballato nei locali» (eventualmente: «un tormentone estivo da ballare», solo se A15 viene sostenuto).

##### A17 — P2
- Affermazione: «il testo resti, a tutti gli effetti, una denuncia sociale»
- Fonte precisa: Wikipedia (sezione Descrizione: morti bianche, inquinamento, caporalato); Rockol («è un affronto»); eHabitat («denuncia di Caparezza è forte e diretta»)
- Estratto: «la denuncia di Caparezza è forte e diretta» (eHabitat)
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — Frase iconica
- Affermazione: «Il titolo è una provocazione nascosta»
- Fonte precisa: Wikipedia, Descrizione: «Il titolo è una dura provocazione»
- Estratto: «Il titolo è una dura provocazione: il termine "ballare" indica in realtà "morire"»
- Esito: CONFERMATA CON RISERVA — «dura» diventa «nascosta»: sfumatura diversa, non presente nella fonte.
- Correzione proposta: «Il titolo è una dura provocazione:»

##### A19 — Frase iconica
- Affermazione: «"ballare" sta in realtà per "morire"»
- Fonte precisa: Wikipedia (canzone), Descrizione; Wikipedia (album), sezione sul brano; eHabitat, quarto capoverso
- Estratto: «"Ballare" sta per "morire", come si può dedurre dall'intro del pezzo» (eHabitat)
- Esito: CONFERMATA (come significato metaforico nella canzone; vedi A20 per «gergo»)
- Correzione proposta: —

##### A20 — Frase iconica
- Affermazione: «nel gergo pugliese "ballare" sta in realtà per "morire"»
- Fonte precisa: nessuna fonte dice che sia gergo pugliese. Wikipedia: «il termine "ballare" indica in realtà "morire"» (senza dire gergo); eHabitat lo deduce dall'introduzione della canzone. Rockol: l'invito «venire a ballare», «nel gergo locale», equivale a un insulto volgare, tutt'altro significato.
- Estratto: «(che, nel gergo locale, equivale a qualcosa come dire "vieni a fotterti")» (Rockol, sul solo invito «venire a ballare»)
- Esito: NON CONFERMATA — l'attribuzione al «gergo pugliese» è un dettaglio aggiunto; una fonte citata dà un uso gergale diverso.
- Correzione proposta: «nel testo "ballare" sta in realtà per "morire", un doppio senso che...» (togliere «nel gergo pugliese»). Se si vuole usare il dato di Rockol: «Rockol ricorda che nel gergo locale l'invito "venire a ballare" ha un significato volgare, l'opposto dell'invito turistico».

##### A21 — Frase iconica
- Affermazione: «un doppio senso che ribalta il senso apparentemente scherzoso del ritornello»
- Fonte precisa: eHabitat («L'intero brano è un gioco di dualità… non rinuncia all'ironia»); Rockol («sarcasmo»)
- Estratto: «L'intero brano è un gioco di dualità, così come il video» (eHabitat)
- Esito: CONFERMATA CON RISERVA — interpretazione ragionevole, ma la formula «ribalta il senso scherzoso del ritornello» non è di nessuna fonte.
- Correzione proposta: «un doppio senso: il brano è, secondo eHabitat, un gioco di dualità, con un ritmo festoso e un testo che non rinuncia all'ironia».

##### A22 — Frase iconica
- Affermazione: «Caparezza invita il turista a "ballare" proprio mentre denuncia le morti sul lavoro, gli incendi, l'inquinamento e lo sfruttamento della sua terra»
- Fonte precisa: Wikipedia (temi); Rockol (il turista ricordato «sardonicamente»); eHabitat (il video: guida turistica che nasconde i morti)
- Estratto: «il rapper veste i panni di una guida turistica» (eHabitat, sul video)
- Esito: CONFERMATA
- Correzione proposta: —

##### A23 — Frase iconica
- Affermazione: «un paradosso che Rockol ha descritto come un affronto sardonico»
- Fonte precisa: Rockol — https://www.rockol.it/news-714124/canzoni-italiane-da-2000-al-2020-storia-vieni-ballare-puglia-caparezza — genere: scheda di approfondimento (non un'intervista), rubrica «Canzoni italiane dal 2000 al 2020» del 28/06/2021, firmata «Di Franco Zanetti» in testata ma testo firmato «(Vincenzo Rossini)» e «tratto da "Unadimille – 1000 canzoni italiane dal 2000, raccontate", Arcana»
- Estratto: «"Vieni a ballare in Puglia" è un affronto, perché ricorda sardonicamente al turista medio»
- Esito: CONFERMATA CON RISERVA — la valutazione è nel testo, ma è di Vincenzo Rossini, pubblicata da Rockol; «chi si accontenta» è una forzatura di «turista medio in foia da pizzicata e pasticciotti». Anche l'elenco fonti «Rockol — Franco Zanetti» attribuisce il pezzo alla persona sbagliata (Wikipedia stessa lo cita come Zanetti).
- Correzione proposta: «un paradosso che, nella scheda di Vincenzo Rossini pubblicata da Rockol, è descritto come un affronto sardonico rivolto al turista medio» e correggere la fonte in «Rockol — Vincenzo Rossini (da Unadimille), a cura di Franco Zanetti».

##### A24 — Frase iconica
- Affermazione: «la "Puglia da cartolina"»
- Fonte precisa: nessuna. Rockol scrive «Puglia virtuale» (tra virgolette singole); «cartolina» non compare in Wikipedia, eHabitat, Rockol né nel testo su Letras (ricerca sul testo HTML).
- Estratto: «una costruita 'Puglia virtuale'» (Rockol)
- Esito: NON CONFERMATA (parole tra virgolette non presenti nella fonte a cui sono implicitamente attribuite; non è un verso)
- Correzione proposta: sostituire con «la sua costruita "Puglia virtuale"» oppure togliere le virgolette («chi si accontenta di una Puglia da cartolina») e attribuire solo il concetto.

##### A25 — Metadati (anno)
- Affermazione: «anno: 2008»
- Fonte precisa: Wikipedia (singolo 18/07/2008; album 11/04/2008)
- Estratto: «Pubblicazione 18 luglio 2008»
- Esito: CONFERMATA (anno del singolo e dell'album coincidono)
- Correzione proposta: —

##### A26 — Metadati (album)
- Affermazione: «album: Le dimensioni del mio caos»
- Fonte precisa: Wikipedia (album originale, quarto in studio, non una raccolta)
- Estratto: «Album di provenienza Le dimensioni del mio caos»
- Esito: CONFERMATA
- Correzione proposta: —

#### Controlli sui metadati e sui link
- ascoltiTesto: valore pubblicato «None» (nessun numero mostrato). Kworb non è fra le fonti citate; ho letto la pagina degli ascolti dell'artista (https://kworb.net/spotify/artist/4l0PmbNvFq3m5JaUuAPbcB_songs.html, titolo «Caparezza - Spotify Top Songs», aggiornata al 11/09/2026, letta il 21/09/2026): il brano con quell'ID risulta a 42.406.067 stream totali (la versione live, a parte, a 434.721). Se si volesse pubblicare un dato, «oltre 42 milioni» regge.
- spotifyId 7IBGw13AbUorsu133u6Q0Z: oEmbed risponde, titolo «Vieni A Ballare In Puglia»; kworb lo attribuisce a Caparezza. Segnalo (da snippet di ricerca, non aperto) che esiste un altro ID Spotify, 65EHFWLmIgTHepERCBNaOv, con lo stesso titolo (oEmbed conferma il titolo) e crediti «Caparezza, Al Bano»: potrebbe essere la versione con Al Bano. La scheda parla proprio di quella versione: da controllare quale dei due ID sia il singolo.
- testoUrl (Letras): https://www.letras.com/caparezza/vieni-a-ballare-in-puglia/ risponde 200 con reindirizzamento a https://www.letras.com/caparezza/1564743/; la pagina si intitola «VIENI A BALLARE IN PUGLIA - Caparezza - LETRAS.COM»: è la canzone giusta.
- Stato HTTP delle fonti citate: Wikipedia 200 (modificata il 10/11/2025); eHabitat 200 (data pagina 28/08/2015, autore Alberto Pinto; il 500 iniziale non si è ripresentato); Rockol 200 (data 28/06/2021).
- Data vera delle pagine: eHabitat 28/08/2015; Rockol 28/06/2021 (la scheda originale di Rossini su unadimille.it è del 03/09/2017); nessuna trappola Future plc.
- Nota di genere (R3): nessuna delle tre fonti è un'intervista e la scheda non riporta dichiarazioni di Caparezza «raccontate»; non ci sono problemi R3 di questo tipo. Il problema è solo di attribuzione dell'autore (A23).

#### Omissioni rilevanti (solo se cambiano il senso)
- Rockol riporta che nel gergo locale l'invito «venire a ballare» ha un significato volgare: è un dato che cambia la lettura del titolo e potrebbe sostituire il «gergo pugliese» inventato (A20).
- La scheda non riporta il dato oggettivo di successo (19ª posizione in Italia nel 2008, disco di platino secondo Wikipedia): sarebbe il modo verificabile per sostenere il «tormentone» (A15).


---

## A.13 — Aerials (System of a Down) · `canzone/aerials/`

### Esito — Aerials (System of a Down)
Pagina: canzone/aerials/ — verificata il 21/09/2026 — priorità: 36 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 17.0

Fonti aperte di persona (HTML scaricato e letto): Wikipedia (voce del brano e voce dell'album Toxicity), Songfacts (pagina del brano), Loudwire (lista del 21/08/2012), kworb (pagina artista), Billboard (pagina della classifica Alternative Airplay del 05/10/2002), Letras (solo per confrontare la frase iconica), Spotify oEmbed. Non aperta: SecondHandSongs (403).

#### Riepilogo
- Affermazioni esaminate: 21 — CONFERMATA 9, CON RISERVA 8, NON CONFERMATA 4, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A21 — «in sala prove»: nessuna fonte dice dove nacque il brano. Dettaglio inventato. Togliere.
  2. A18 / A17 — la frase iconica descrive il ritornello con una condensazione molto vicina a una traduzione del testo (sospetto verso, P3), e aggiunge una lettura («come un'antenna», «il momento più ricordato») che nessuna fonte citata contiene.
  3. A6 / A7 — l'interpretazione «identità persa» che la scheda attribuisce a «Songfacts» è, sulla pagina, un contributo di un lettore («Suggestion credit») e non una spiegazione della band. Va dichiarato (R8).
  4. A19 — la dichiarazione di Dolmayan traduce «angst» con «rabbia» (angoscia, non rabbia). Il perimetro della fonte (Songfacts che cita MTV, senza data) è invece attribuito correttamente.
  5. A16 — «comunque» nella frase sulle classifiche insinua un contrasto (terzo singolo = meno successo) che Songfacts smentisce: dice che il terzo singolo «did even better» del secondo.
  6. A11, A13, A5, A9, A1 — formulazioni più forti o meno precise delle fonti (vedi voci).
- Cosa non sono riuscito a documentare:
  - Il #1 in Mainstream Rock di Billboard alla data del 28/09/2002: la pagina Billboard non ha restituito il dato (ho letto solo la classifica Alternative del 05/10/2002). La data viene solo da Songfacts.
  - La data della dichiarazione di Dolmayan a MTV (Songfacts non la dà; non ho trovato l'articolo MTV originale).
  - La data di uscita 11/06/2002: appare solo nell'infobox di Wikipedia (senza nota che io abbia trovato).
  - Se i crediti di autore registrati (editoria) includano anche Dolmayan e Odadjian: un risultato di ricerca di SecondHandSongs, che NON ho potuto aprire (403), sembra elencarli. Non lo uso come prova, ma tiene aperto un dubbio su «interamente» (A5).
- Sospetto verso nella frase iconica: SÌ (A18). Non c'è nulla fra virgolette che sia un verso; la frase però riassume in sequenza tre elementi del ritornello (il cielo/l'altezza, la piccolezza della mente che si perde, la vita che si libera) in italiano, quasi in traduzione. Non è la riproduzione di un verso, ma è troppo aderente. Meglio parafrasare a livello di tema.

#### Affermazioni

##### A1 — Metadati (anno)
- Affermazione: anno «2001»
- Fonte precisa: Wikipedia, voce del brano, incipit e infobox — https://en.wikipedia.org/wiki/Aerials_(song) — data pagina: non riportata (lettura del 21/09/2026); Songfacts, testata della pagina («Album: Toxicity (2001)»)
- Estratto: «released in 2002 as the third single from their second album Toxicity (2001)»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: 2001 è l'anno dell'album (4 settembre 2001); il singolo è del 2002. Se il campo «anno» del sito indica l'anno del brano/album va bene; se indica quello del singolo va messo 2002. Il corpo (P2) dice giustamente 2002 per il singolo: rendere coerente la convenzione o specificare («dall'album del 2001»).

##### A2 — Metadati (album)
- Affermazione: album «Toxicity»
- Fonte precisa: Wikipedia (voce del brano) e Songfacts (testata) — Toxicity è l'album originale (non una raccolta); «Aerials» è l'ultima traccia (Songfacts)
- Estratto: «"Aerials" is the last track on the Toxicity album.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — Metadati (ascoltiTesto)
- Affermazione: «1 mld ascolti»
- Fonte precisa: kworb — https://kworb.net/spotify/artist/5eAWCfyUhZtHHtBdNk56l1_songs.html (pagina artista; la scheda cita solo l'indice https://kworb.net/spotify/, che non contiene il dato) — «Last updated: 2026/09/20»
- Estratto: riga «Aerials 1,032,441,795 729,478» (stream totali e giornalieri)
- Esito: CONFERMATA (letto il 21/09/2026: 1.032.441.795; l'arrotondamento a «1 mld» regge, per difetto)
- Correzione proposta: — (facoltativo: citare la pagina artista invece dell'indice generale)

##### A4 — P1
- Affermazione: «Testo scritto dal chitarrista Daron Malakian insieme al cantante Serj Tankian»
- Fonte precisa: Songfacts, testo di apertura del blocco storico; Wikipedia, infobox («Lyricists Serj Tankian, Daron Malakian»)
- Estratto: «The lyrics were written by guitarist Daron Malakian and lead singer Serj Tankian; Malakian wrote the music.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «con la musica composta interamente da Malakian»
- Fonte precisa: Songfacts (stessa frase di A4); Wikipedia, infobox («Composer Daron Malakian») e tabella tracce
- Estratto: «Malakian wrote the music.»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: togliere «interamente»: «con la musica composta da Malakian». Le fonti dicono solo che la musica è sua, non «interamente»; inoltre un elenco di crediti (SecondHandSongs, non aperto) sembra citare tutti e quattro i membri come autori.

##### A6 — P1
- Affermazione: «Secondo Songfacts, il brano racconta di come le persone possano perdere la propria identità, finendo per assomigliarsi tutte»
- Fonte precisa: Songfacts — https://www.songfacts.com/facts/system-of-a-down/aerials — primo blocco della pagina, seguito da «Suggestion credit: Joe – Visa, CA». Pagina non datata (lettura 21/09/2026)
- Estratto: «This song is about how people can lose their identities and become just like everyone else.»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: dichiarare la natura della fonte (R8): «Secondo l'interpretazione riportata da Songfacts (un contributo di lettori, non una spiegazione della band), il brano parla di come le persone possano perdere la propria identità e finire per assomigliarsi tutte.» Tra i commenti dei lettori sulla stessa pagina si legge che i membri avrebbero detto che il brano non parla di niente, ma sono commenti non verificati: non usarli come fatto.

##### A7 — P1
- Affermazione: «attraverso l'immagine di un fiume in cui ci si perde per poi ritrovarsi»
- Fonte precisa: Songfacts, sezione «Some lyric analysis» (stesso blocco di A6, contributo di lettore)
- Estratto: «We all start off the same and we all end up the same.» (commento del contributore all'immagine dell'acqua)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: l'immagine dell'acqua c'è nel testo e nell'analisi, ma «perdersi per poi ritrovarsi» è la lettura letterale di una riga del testo, mentre l'analisi di Songfacts dà a quella riga il senso opposto (dimenticare chi si è davvero). Riformulare: «attraverso l'immagine dell'acqua, una cascata e un fiume, in cui tutti partono e finiscono allo stesso modo».

##### A8 — P2
- Affermazione: «Il videoclip, diretto da David Slade»
- Fonte precisa: Wikipedia, sezione «Music video»; IMVDb (https://imvdb.com/video/system-of-a-down/aerials, letta via WebFetch, non archiviata) elenca gli stessi due registi; Songfacts («the British director David Slade»)
- Estratto: «The music video was directed by Shavo Odadjian and David Slade.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P2
- Affermazione: «in collaborazione con il bassista Shavo Odadjian»
- Fonte precisa: Songfacts, paragrafo sul videoclip; Wikipedia, sezione «Music video»
- Estratto: «The music video was a joint effort between the group's bass player, Shavo Odadjian, and the British director David Slade.»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: Wikipedia e IMVDb mettono Odadjian e Slade alla pari come registi; «in collaborazione con» lo mette in secondo piano. Testo: «Il videoclip, diretto da David Slade insieme al bassista Shavo Odadjian, …». (Che Odadjian sia il bassista: confermato da Songfacts.)

##### A10 — P2
- Affermazione: «segue un ragazzo dall'aspetto in parte alieno»
- Fonte precisa: Wikipedia, «Music video»; Songfacts, paragrafo sul videoclip
- Estratto: «The video features an alien-like, disfigured boy» (Wikipedia); Songfacts: «at least part Klingon»
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P2
- Affermazione: «in un ambiente che critica la superficialità della cultura delle celebrità»
- Fonte precisa: Wikipedia, «Music video» (il ragazzo è adorato e coccolato come una celebrità); Songfacts (la band guarda alla cultura di Hollywood «as if peering into a fun house mirror»; il ragazzo sembra «a bona fide celebrity»)
- Estratto: «adored and pampered like a celebrity» (Wikipedia)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: nessuna fonte usa «critica» né «superficialità». Testo: «… in cui è adorato e coccolato come una celebrità; secondo Songfacts, la band guarda alla cultura di Hollywood come in uno specchio deformante.»

##### A12 — P2
- Affermazione: «Uscito come terzo singolo dell'album»
- Fonte precisa: Wikipedia, incipit; Songfacts («issued a few months later as the third single»); voce Toxicity (singoli: 13/08/2001, 22/01/2002, 11/06/2002)
- Estratto: «released in 2002 as the third single from their second album Toxicity»
- Esito: CONFERMATA
- Correzione proposta: —

##### A13 — P2
- Affermazione: «l'11 giugno 2002»
- Fonte precisa: Wikipedia, infobox del brano e del disco Toxicity («Released June 11, 2002»). Nessuna nota di fonte trovata accanto alla data. Songfacts dà solo «a few months later» rispetto a gennaio 2002. Riscontro indiretto: Billboard mostra il debutto in Alternative Airplay con data 15/06/2002.
- Estratto: «Released June 11, 2002»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: la data è documentata solo da Wikipedia (uscita radiofonica/singolo negli USA, non precisato). Tenerla con «negli Stati Uniti», oppure «nel giugno 2002» (il debutto in classifica il 15 giugno 2002, letto su Billboard, la rende coerente).

##### A14 — P2
- Affermazione: «il brano raggiunse … il primo posto sia nella classifica rock mainstream sia in quella alternative di Billboard»
- Fonte precisa: Wikipedia, tabella classifiche («US Alternative Airplay 1; US Mainstream Rock 1»); Loudwire (n. 3 della lista, 21/08/2012, non Future plc: data vera); Billboard, pagina Alternative Airplay del 05/10/2002 (letta)
- Estratto: «helped make the song the band's first No. 1 hit on both the mainstream and alternative rock charts» (Loudwire)
- Esito: CONFERMATA
- Correzione proposta: — (aggiungere Billboard come fonte per la parte Alternative; per Mainstream Rock la fonte è Songfacts con la data 28/09/2002, non ho potuto verificarla su Billboard)

##### A15 — P2
- Affermazione: «nell'autunno del 2002»
- Fonte precisa: Songfacts, blocco storico («#1 on the Mainstream Rock chart September 28 … On October 5, it topped the Alternative Songs chart»); Billboard, pagina Alternative Airplay del 05/10/2002: «Peak Position 1, Peak Chart Date 10/05/02, Weeks 17»
- Estratto: «It made #1 on the Mainstream Rock chart September 28, over a year after the album was issued.»
- Esito: CONFERMATA
- Correzione proposta: — (più preciso: «tra fine settembre e inizio ottobre 2002»)

##### A16 — P2
- Affermazione: «il brano raggiunse comunque il primo posto»
- Fonte precisa: Songfacts, blocco storico
- Estratto: «"Aerials" was issued a few months later as the third single and did even better.»
- Esito: NON CONFERMATA
- Correzione proposta: togliere «comunque». Il connettivo suggerisce che essere il terzo singolo o il tono del video fosse un ostacolo; nessuna fonte lo dice, e Songfacts dice anzi che il terzo singolo andò meglio del secondo. Testo: «Uscito come terzo singolo dell'album l'11 giugno 2002, il brano arrivò al primo posto sia nella classifica rock mainstream sia in quella alternative di Billboard nell'autunno del 2002, oltre un anno dopo l'uscita dell'album.»

##### A17 — Frase iconica
- Affermazione: «Il momento più ricordato è l'invocazione ripetuta…»
- Fonte precisa: nessuna fonte citata (né Loudwire, né Wikipedia, né Songfacts) dice quale sia il «momento più ricordato»
- Estratto: non letto: assente in tutte le fonti
- Esito: NON CONFERMATA
- Correzione proposta: togliere la formula («più ricordato» è un superlativo senza fonte), oppure dichiararla come impressione: «Il ritornello ripete più volte la parola del titolo».

##### A18 — Frase iconica
- Affermazione: «invocazione ripetuta a librarsi in alto, come un'antenna verso il cielo, che perde piccolezza e si libera»
- Fonte precisa: solo confronto con il testo (Letras, https://www.letras.com/system-of-a-down/39427/, pagina 200). Non è tra virgolette. Il paragone con l'antenna compare solo in un commento di un lettore su Songfacts, non nella sintesi né nell'analisi.
- Estratto: non letto: nessuna fonte contiene questa descrizione
- Esito: NON CONFERMATA
- Correzione proposta: sospetto verso (P3/R4): la frase rende in italiano, in sequenza, gli elementi del ritornello (il cielo, l'altezza, la piccolezza della mente, la vita che si libera) quasi come una traduzione. Inoltre il ritornello non contiene un'«invocazione a librarsi»: la parola del titolo è un sostantivo. Sostituire con una descrizione neutra del tema e senza sequenza di immagini, per esempio: «Il ritornello, ripetuto più volte, è costruito attorno alla parola del titolo (in inglese anche "antenna") e a un'idea di elevazione e di liberazione dalla mentalità ristretta.» La nota sull'antenna va tenuta solo come fatto lessicale (dizionario), non attribuita al brano.

##### A19 — Frase iconica
- Affermazione: «Il batterista John Dolmayan ha descritto il brano, in una dichiarazione riportata da Songfacts, come "una canzone delicata che porta con sé anche molta rabbia"»
- Fonte precisa: Songfacts, blocco storico (non è un'intervista: Songfacts riporta «told MTV»; data della dichiarazione non indicata; articolo MTV non trovato)
- Estratto: «It's a gentle song, but at the same time, it has a lot of angst coming out.»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: l'attribuzione è corretta (R3: dichiarazione riportata da Songfacts, detta a MTV). Difetto: «angst» = angoscia/inquietudine, non «rabbia». Testo: «Il batterista John Dolmayan ha descritto il brano, a MTV (come riporta Songfacts), come "una canzone delicata che però ha dentro molta angoscia"».

##### A20 — Frase iconica
- Affermazione: «nata quasi di getto»
- Fonte precisa: Songfacts, stessa dichiarazione di Dolmayan
- Estratto: «It was one of those things where it was just instant. We all felt it. It came together real fast»
- Esito: CONFERMATA
- Correzione proposta: —

##### A21 — Frase iconica
- Affermazione: «in sala prove»
- Fonte precisa: nessuna. Songfacts parla solo di un brano messo insieme in fretta «that day», senza dire dove; Rolling Stone Australia (03/09/2021, aperta) non dà aneddoti sulla scrittura, solo le sessioni al Cello Studio (marzo–luglio 2001) per l'album
- Estratto: non letto: assente
- Esito: NON CONFERMATA
- Correzione proposta: togliere «in sala prove»: «… nata quasi di getto, messa insieme in fretta e in un solo giorno.» («it came together real fast, like it was meant to be put together that day» permette «in fretta» e «in giornata», non un luogo.)

##### SEO
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Controlli sui metadati e sui link
- anno: 2001 = anno dell'album; il singolo è del 2002 (vedi A1).
- album: Toxicity, originale, corretto.
- ascoltiTesto: kworb pagina artista, aggiornata 20/09/2026, letta il 21/09/2026: 1.032.441.795 stream Spotify per Aerials. «1 mld» regge (arrotondamento per difetto). La fonte citata nella scheda (indice /spotify/) è HTTP 200 ma non contiene il dato.
- spotifyId 4e9eGQYsOiBcftrWXwsVco: oEmbed risponde 200, titolo «Aerials»: corretto.
- testoUrl https://www.letras.com/system-of-a-down/39427/: HTTP 200, titolo pagina «AERIALS – System Of A Down – LETRAS.COM»: è la canzone giusta.
- Stato HTTP delle fonti citate: Loudwire 200 (data vera 21/08/2012, autore Spencer Kaufman; Townsquare, non Future plc, nessuna trappola delle date); Wikipedia 200; Songfacts 200 (pagina non datata); kworb 200; Billboard (non citata nella scheda) 200 sulla classifica Alternative. SecondHandSongs (non citata) 403.
- Ruoli delle fonti: Songfacts non ha «ruolo» assegnato ma sostiene molte affermazioni (A4–A7, A9, A11, A15, A19–A20): assegnargli ruolo «storia». Loudwire sostiene solo A14 (posizione in classifica) e non i dettagli sulla scrittura o il video.

#### Omissioni rilevanti (solo se cambiano il senso)
- Il brano fu il primo n. 1 della band sia in Mainstream Rock sia in Alternative (Wikipedia e Loudwire): un dato più forte e documentato, che può sostituire «comunque».
- L'interpretazione sull'identità riportata da Songfacts è un contributo di lettori; i commenti alla stessa pagina riportano che i membri hanno detto che il brano «non parla di nulla». Non documentato da una fonte primaria: se la scheda vuole mantenere l'interpretazione, deve dichiararla come lettura (A6).


---

## A.14 — November Rain (Guns N' Roses) · `canzone/november-rain/`

### Esito — November Rain (Guns N' Roses)
Pagina: canzone/november-rain/ — verificata il 21/09/2026 — priorità: 36 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 29,9

Nota di metodo: ho scaricato e letto in HTML grezzo le quattro fonti citate (MusicRadar, uDiscoverMusic, Wikipedia, kworb) e in più tre fonti esterne (Louder, Rock Hall, Consequence). Non ho potuto aprire: il clip MTV 1992 di Slash, l'intervista originale di Malcolm Dome oltre alla versione Louder, la pagina NPR del 2018 (URL non trovato, 404), Kerrang! 1990. Web Archive era offline: nessuna copia storica di MusicRadar consultabile.

#### Riepilogo
- Affermazioni esaminate: 34 — CONFERMATA 20, CON RISERVA 12, NON CONFERMATA 2, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A28 (frase iconica): la seconda metà della frase traduce quasi alla lettera la seconda metà di un verso, e la prima ne parafrasa stretta l'altra metà. Viola R4/P3 pur senza virgolette.
  2. A10: «La band scelse comunque un'altra ballata» inverte la causalità. Secondo Charlton (Louder, intervista di Malcolm Dome) fu Axl a dire che il brano era ben lontano dall'essere finito e lo teneva per il disco dopo; all'epoca «Sweet Child O' Mine» non era ancora stata scritta. MusicRadar dice solo che la band «non ne aveva bisogno» perché aveva un'altra ballata.
  3. A27 e A30 (frase iconica): «il verso più citato» e «ha probabilmente contribuito a legare il brano… a entrambe le cerimonie» non hanno alcuna fonte.
  4. A3: «una versione da 18 minuti, di cui una da 10 fu registrata» mescola due dati. Wikipedia (che cita Slash) dice che la versione da 18 minuti fu registrata con Charlton nel 1986; MusicRadar e uDiscoverMusic parlano di una versione da 10 minuti registrata ai Sound City. «Di cui» non ha senso logico.
  5. A19: 24 febbraio 1992 è la data UK (tabella di Wikipedia). uDiscoverMusic dà 18 febbraio 1992, Wikipedia dà 2 giugno 1992 per gli Stati Uniti e 9 marzo per l'Australia. La scheda non dichiara il paese.
  6. A8 (R3): «Charlton raccontò al giornalista Malcolm Dome» viene da MusicRadar, che è una feature e non riporta data né sede dell'intervista. L'intervista vera è in Louder (8/7/2022), non fra le fonti.
  7. A2: «un primo abbozzo… 1986» ignora che uDiscoverMusic (fonte citata) riporta Tracii Guns, secondo cui Axl lavorava al brano già dal 1983.
  8. A16, A14, A13, M3: sfumature (vedi voci).
- Cosa non sono riuscito a documentare: la dichiarazione di Slash a MTV 1992 alla fonte (esiste solo la citazione di MusicRadar; il clip è su Facebook/YouTube, non aperto); la data vera di MusicRadar (vedi sotto); la data della prima uscita del singolo negli Stati Uniti (fonti in conflitto); la fonte primaria della cifra «circa un milione» (uDiscoverMusic la dà senza documento).
- Sospetto verso nella frase iconica: SÌ. Non ci sono virgolette, ma la frase descrive il contenuto di due versi vicini con parole quasi coincidenti con la traduzione letterale. Ho confrontato con il testo su Letras (pagina testoUrl): entrambe le espressioni corrispondono al passo che contiene il titolo. Dettaglio in A28.

Data vera di MusicRadar (trappola Future plc): la pagina porta «Published: 12 giugno 2026» (meta article:published_time e JSON-LD datePublished/dateModified: 2026-06-12T12:36:16Z). L'URL citato dalla scheda fa redirect a un URL più corto («…/how-axl-rose-took-inspiration-from-elton-john-to-create-a-classic-guns-n-roses-ballad-that-was-years-in-the-making») e l'articolo è già sindacato da Yahoo con datePublished 2026-01-07T12:16:24Z. Quindi la data del 12/06/2026 è di ripubblicazione/spostamento, e la pubblicazione originale è almeno del 7 gennaio 2026, forse più vecchia (non ho trovato una data precedente; Web Archive offline). Non è comunque un'intervista: è una feature di Amit Sharma (nessun «originally appeared in» nella pagina) che riporta parole dette altrove (Slash a MTV 1992, Charlton a Dome, Rose a Kerrang! 1990 e nel documento video sui videoclip).

#### Affermazioni

##### M1 — Metadati (anno)
- Affermazione: anno: 1991
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/November_Rain — infobox e introduzione — pagina ultima modifica 26/06/2026; uDiscoverMusic — sezione «The Use Your Illusion I version»
- Estratto: «released in February 1992, by Geffen Records, as the third single from the band's third studio album, Use Your Illusion I (1991)» (Wikipedia)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: 1991 è l'anno dell'album (17 settembre 1991 secondo uDiscoverMusic); il singolo è del 1992. Va bene se la convenzione del sito è l'anno dell'album, ma il corpo della scheda dice giustamente febbraio 1992 per il singolo. Nessuna modifica obbligatoria; verificare la convenzione con le altre schede.

##### M2 — Metadati (album)
- Affermazione: album: Use Your Illusion I
- Fonte precisa: Wikipedia — infobox «from the album Use Your Illusion I»; uDiscoverMusic — «centerpiece to Use Your Illusion I»
- Estratto: «featured as the centerpiece to Use Your Illusion I» (uDiscoverMusic)
- Esito: CONFERMATA
- Correzione proposta: —

##### M3 — Metadati (ascoltiTesto)
- Affermazione: ascoltiTesto: 1,39 mld ascolti
- Fonte precisa: kworb.net — https://kworb.net/spotify/artist/3qm84nBOXUEQ2vnTfUTTFC_songs.html (pagina artista, riga della traccia 3YRCqOhFifThpSRFJ1VWFM), «Last updated: 2026/09/20». La pagina citata dalla scheda (https://kworb.net/spotify/) è solo un indice di classifiche e non contiene il dato.
- Estratto: riga «November Rain» totale 1.417.505.785 stream, giornalieri 717.886 (letta il 21/09/2026, aggiornamento del 20/09/2026)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: il valore attuale è 1,42 mld (1,4175 mld); 1,39 mld regge come dato di circa 5 settimane fa (a 718.000 al giorno, servono circa 38 giorni per la differenza) ma oggi è arrotondato per difetto di 0,03 mld. Aggiornare a «1,42 mld» oppure lasciare il meccanismo di aggiornamento automatico. Cambiare la fonte citata in ruolo «ascolti» sulla pagina artista (o sulla pagina traccia https://kworb.net/spotify/track/3YRCqOhFifThpSRFJ1VWFM.html, che ha lo storico di classifica ma non ho letto il totale lì).

##### M4 — Metadati (genereTesto)
- Affermazione: genere: Hard rock
- Fonte precisa: Wikipedia — introduzione — «song by American hard rock band Guns N' Roses… the power ballad»
- Estratto: «the power ballad was released in February 1992, by Geffen Records» (Wikipedia)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: l'etichetta è quella della band; la canzone è definita «power ballad» da Wikipedia e da MusicRadar («one of the greatest power ballads of all time»). Suggerito «Power ballad / hard rock». Dato di poca importanza.

##### A1 — P1
- Affermazione: «Axl Rose scrisse il brano da solo»
- Fonte precisa: MusicRadar — https://www.musicradar.com/artists/how-axl-rose-took-inspiration-from-elton-john-… (URL dopo redirect) — 4º paragrafo dell'articolo — data vera: 12/06/2026 come ripubblicazione, originale ≥ 07/01/2026; Wikipedia — introduzione
- Estratto: «Written by Rose alone, November Rain is nearly nine minutes of piano-driven brilliance» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «Un primo abbozzo esisteva già nel 1986, un anno prima della pubblicazione di "Appetite for Destruction"»
- Fonte precisa: MusicRadar — 5º paragrafo («In Slash's official autobiography…»); uDiscoverMusic — https://www.udiscovermusic.com/stories/november-rain-story-guns-n-roses/ — paragrafo introduttivo — data pagina 18/02/2026 (verosimilmente ripubblicazione: parla di edizioni «recent» di Appetite del 2018)
- Estratto: «the song originally came into existence back in 1986, a whole year before the release of the band's seminal debut» (MusicRadar, che cita Slash 2007); uDiscoverMusic: Tracii Guns ricorda che Axl lavorava al brano «in 1983»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Secondo l'autobiografia di Slash (2007), il brano prese forma nel 1986, un anno prima di "Appetite for Destruction"; Tracii Guns, ex compagno di Rose, ricorda invece che Axl ci lavorava già dal 1983 (uDiscoverMusic).» (R5: due fonti divergono; «primo abbozzo» non è più sostenibile.)

##### A3 — P1
- Affermazione: «una versione da 18 minuti, di cui una da 10 fu registrata»
- Fonte precisa: MusicRadar — paragrafo dopo la citazione di Slash; Wikipedia — sezione «Background»; uDiscoverMusic — sezione «The November Rain piano demo»
- Estratto: «An early version of November Rain clocked in at 18 minutes. A 10-minute version was recorded at Sound City Studios» (MusicRadar); Wikipedia: Slash dice che la versione da 18 minuti fu registrata nel 1986 con Manny Charlton
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Una prima versione durava, secondo MusicRadar, 18 minuti; la registrazione fatta nel 1986 ai Sound City Studios di Los Angeles con il produttore Manny Charlton dura circa 10 minuti.» Se si vuole restare aderenti a Wikipedia: «Slash scrive nella sua autobiografia che la versione registrata con Charlton durava 18 minuti; la traccia poi pubblicata nel 2018 ne dura 10.» (R5: le fonti divergono sulla durata della registrazione con Charlton.)

##### A4 — P1
- Affermazione: «registrata ai Sound City Studios di Los Angeles»
- Fonte precisa: MusicRadar — stesso paragrafo; uDiscoverMusic — «Captured at the 1986 Sound City sessions»; Louder (esterna, 8/7/2022) — «We spent a day and a half in Sound City»
- Estratto: «A 10-minute version was recorded at Sound City Studios in LA» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «con il produttore Manny Charlton, chitarrista dei Nazareth»
- Fonte precisa: MusicRadar — stesso paragrafo; Wikipedia — «Background»
- Estratto: «with producer Manny Charlton, the guitarist for Scottish hard rock band Nazareth» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: «scelto perché la band amava il suono del suo "Hair of the Dog" del 1975»
- Fonte precisa: MusicRadar — stesso paragrafo; Louder (esterna) — Charlton: la band voleva chi aveva prodotto «Hair Of The Dog» «as they loved the sound it had»
- Estratto: «chosen because the group loved the sound of his band's Hair Of The Dog album of 1975» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (facoltativo: specificare «album dei Nazareth», poiché nella scheda «Hair of the Dog» non dice di che opera si tratti).

##### A7 — P1
- Affermazione: «quella versione fu inclusa nella super-deluxe edition di "Appetite for Destruction" del 2018»
- Fonte precisa: MusicRadar — paragrafo successivo; uDiscoverMusic — introduzione («recent super deluxe… editions»)
- Estratto: «included in the super-deluxe edition reissue of Appetite For Destruction, released in 2018» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P1
- Affermazione: «Charlton stesso raccontò al giornalista Malcolm Dome»
- Fonte precisa: MusicRadar — paragrafo «In an interview with music journalist Malcolm Dome…»; pagina di genere feature, non intervista. Riscontro esterno: Louder, «The story of Manny Charlton and the birth of Appetite For Destruction» — https://www.loudersound.com/features/the-story-of-manny-charlton-and-the-birth-of-appetite-for-destruction — data 08/07/2022, di Malcolm Dome (morto nel 2021, quindi pubblicato dopo la morte; intervista di data ignota, Charlton parla «from his home in Spain»).
- Estratto: «In an interview with music journalist Malcolm Dome, Manny Charlton recalled his reaction» (MusicRadar)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Manny Charlton, in un'intervista con il giornalista Malcolm Dome citata da MusicRadar e pubblicata da Louder, ricordò…» e aggiungere Louder fra le fonti (livello B, stampa musicale). La scheda oggi attribuisce la frase a Dome senza dire dove. R3: MusicRadar è una feature che riporta parole dette altrove.

##### A9 — P1
- Affermazione: «pensato, ascoltando Axl suonarla al piano, che sarebbe dovuta finire già nel primo album — un errore, secondo lui, lasciarla fuori»
- Fonte precisa: MusicRadar — stesso blocco; Louder — stessa citazione
- Estratto: «I believed it should have been on the first album… told Axl it would be a mistake not to include it» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (Charlton lo disse ad Axl allora, e lo racconta a Dome in seguito.)

##### A10 — P1
- Affermazione: «La band scelse comunque un'altra ballata, "Sweet Child O' Mine", che arrivò comunque al numero 1.» (parte 1: la scelta)
- Fonte precisa: MusicRadar — «And the band didn't need November Rain for that album. They had another ballad»; Louder (esterna) — parole di Charlton: Axl gli disse che il brano «was far from finished» e lo teneva per il disco successivo.
- Estratto: «Remember, this was before they'd written Sweet Child O'Mine.» (Charlton, in Louder)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Il brano non entrò nel primo album: secondo Charlton, Axl gli spiegò che era ancora lontano dall'essere finito e lo teneva per il disco successivo (Louder). A quel punto "Sweet Child O' Mine", che Charlton dice non essere stata ancora scritta durante quelle sessioni del 1986, fece da ballata di "Appetite for Destruction".» Se non si aggiunge Louder: «La band non ne ebbe bisogno per il primo album: aveva già un'altra ballata, "Sweet Child O' Mine" (MusicRadar).» Togliere «scelse comunque», che è un'inferenza della scheda.

##### A11 — P1
- Affermazione: «"Sweet Child O' Mine"… arrivò comunque al numero 1»
- Fonte precisa: MusicRadar — «it went all the way to No.1 on the US chart in 1988»
- Estratto: «it went all the way to No.1 on the US chart in 1988» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (facoltativo: «negli Stati Uniti nel 1988»; la scheda non dice il paese.) Non ho aperto Billboard sul singolo.

##### A12 — P1
- Affermazione: «Secondo MusicRadar, in un'intervista del 1992 con l'emittente musicale MTV, Slash scherzò sulla lunga gestazione»
- Fonte precisa: MusicRadar — paragrafo «Speaking to MTV in 1992, Slash said of November Rain…»
- Estratto: «Speaking to MTV in 1992, Slash said of November Rain» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (attribuzione a MusicRadar corretta; «intervista» è lieve inferenza da «speaking to MTV». Non ho potuto aprire il clip MTV originale.)

##### A13 — P1
- Affermazione: la citazione tra virgolette di Slash, in italiano («Ci abbiamo giocherellato per anni… una volta era lungo tipo 25 minuti!»)
- Fonte precisa: MusicRadar — stesso paragrafo
- Estratto: «We'd been dicking around with it for years» e, separato, «It used to be, like, 25 minutes long!» (MusicRadar)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: la traduzione attenua il registro e i puntini uniscono due frasi separate («while also joking»). Proposta: «Ci stavamo sbattendo su da anni… una volta durava tipo 25 minuti!», oppure tenere due virgolette separate. Il «25 minuti» è una battuta di Slash: MusicRadar la commenta («wasn't a huge exaggeration») ma la durata reale documentata è 18 minuti.

##### A14 — P2
- Affermazione: «Fra le principali ispirazioni di Rose ci fu Elton John, in particolare l'undici minuti "Funeral for a Friend/Love Lies Bleeding" che apre "Goodbye Yellow Brick Road" (1973)»
- Fonte precisa: MusicRadar — primo paragrafo; Wikipedia — sezione «Writing and composition» («influenced by Elton John's 1973 opus…»)
- Estratto: «Elton's 11-minute masterpiece… is widely considered to be a key inspiration for November Rain» (MusicRadar)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: MusicRadar dice «widely considered»: è un'attribuzione generale, non una dichiarazione di Rose sul brano. Proposta: «Elton John, e in particolare l'undici minuti "Funeral for a Friend/Love Lies Bleeding" che apre "Goodbye Yellow Brick Road" (1973), è indicato come una delle principali ispirazioni del brano.» Dati su durata e ruolo di apertura: confermati da MusicRadar.

##### A15 — P2
- Affermazione: «i due si sarebbero poi esibiti insieme dal vivo su "November Rain" agli MTV Music Awards del 1992, con John al piano»
- Fonte precisa: MusicRadar — primo blocco («At the MTV Music Awards in 1992»); Wikipedia — «the 1992 VMAs ceremony»
- Estratto: «performed November Rain with Elton as guest star playing piano opposite Rose» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (lo stesso evento è chiamato dalla scheda «MTV Music Awards»; il nome ufficiale è MTV Video Music Awards.)

##### A16 — P2
- Affermazione: «Rose lo avrebbe definito, nel discorso di introduzione alla Rock and Roll Hall of Fame nel 1994, la sua più grande fonte d'ispirazione»
- Fonte precisa: MusicRadar — paragrafo «when Axl was asked to induct his hero…»; Rock Hall — https://rockhall.com/inductees/elton-john/ — pagina Elton John, anno 1994, presentatore Axl Rose (Guns N' Roses), sezione «Impact»
- Estratto: «For myself as well as others, no one has been there more for inspiration than Elton John.» (MusicRadar; stessa frase in forma abbreviata su Rock Hall)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: la frase dice che nessuno è stato fonte d'ispirazione più di Elton, «per me e per altri», non che sia la sua più grande. Proposta: «Nel discorso con cui lo introdusse nella Rock and Roll Hall of Fame nel 1994, Rose disse che, per lui e per molti altri, nessuno era stato più di Elton John fonte d'ispirazione.» (dichiarazione fatta in pubblico durante la cerimonia; fonte Rock Hall e MusicRadar).

##### A17 — P2
- Affermazione: «Rose descrisse il brano come una canzone "sul non voler restare in uno stato di amore non corrisposto"»
- Fonte precisa: MusicRadar — paragrafo su «Estranged»
- Estratto: «November Rain is a song about not wanting to be in a state of unrequited love» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (MusicRadar precisa che la frase viene da una delle videocassette che documentano i videoclip di quel periodo; la traduzione è fedele.)

##### A18 — P2
- Affermazione: «Registrata definitivamente nel 1990 con il produttore Mike Clink»
- Fonte precisa: MusicRadar — «eventually recorded to Rose's satisfaction in 1990 with Clink again in the producer's chair»
- Estratto: «November Rain was eventually recorded to Rose's satisfaction in 1990 with Clink again in the producer's chair.» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — (fonte unica; Wikipedia dice solo «produced by Mike Clink and Guns N' Roses», registrato in più studi. La data 1990 si regge su MusicRadar.)

##### A19 — P2
- Affermazione: «uscita il 24 febbraio 1992»
- Fonte precisa: Wikipedia — infobox «Released February 24, 1992» e tabella «Release history»: Regno Unito 24/02/1992, Australia 09/03/1992, Giappone 21/04/1992, Stati Uniti 02/06/1992; uDiscoverMusic — «On February 18, 1992, "November Rain" was released as the album's third and final single»
- Estratto: «On February 18, 1992, "November Rain" was released as the album's third and final single.» (uDiscoverMusic)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: le fonti divergono (R5). Proposta: «uscita come singolo nel febbraio 1992» (senza giorno), oppure «il 24 febbraio 1992 nel Regno Unito (Wikipedia); uDiscoverMusic indica il 18 febbraio». MusicRadar dice solo «a year later».

##### A20 — P2
- Affermazione: «nell'album "Use Your Illusion I" (1991)»
- Fonte precisa: Wikipedia; uDiscoverMusic — «September 17, 1991»
- Estratto: «"November Rain" finally saw the light of day on September 17, 1991» (uDiscoverMusic)
- Esito: CONFERMATA
- Correzione proposta: —

##### A21 — P2
- Affermazione: «con quasi 9 minuti di durata»
- Fonte precisa: uDiscoverMusic — «Clocking in at 8.58»; MusicRadar — «nearly nine minutes»
- Estratto: «Clocking in at 8.58, the final version» (uDiscoverMusic)
- Esito: CONFERMATA
- Correzione proposta: —

##### A22 — P2
- Affermazione: «divenne all'epoca la canzone più lunga a entrare nella top 10 della Billboard Hot 100»
- Fonte precisa: MusicRadar — «making history as the longest song to enter the American top 10 at that time»; Wikipedia — introduzione (e nota: superata nel novembre 2021 da "All Too Well")
- Estratto: «making history as the longest song to enter the American top 10 at that time» (MusicRadar)
- Esito: CONFERMATA
- Correzione proposta: — («all'epoca» rende il dato corretto; picco n. 3 sulla Hot 100 confermato anche da uDiscoverMusic.)

##### A23 — P2 / frase iconica
- Affermazione: «Il video, diretto da Andy Morahan» (compare due volte)
- Fonte precisa: Wikipedia — introduzione e sezione video («directed by British director Andy Morahan»). uDiscoverMusic e MusicRadar non nominano il regista.
- Estratto: «directed by British director Andy Morahan» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: — (la ripetizione nella frase iconica è ridondante: una sola volta basta.) Livello A non raggiunto: fonte Wikipedia (livello C). Un riscontro primario (crediti del video) non l'ho cercato.

##### A24 — P2
- Affermazione: «costato circa un milione di dollari»
- Fonte precisa: uDiscoverMusic — sezione «The November Rain video»
- Estratto: «With a budget totaling around $1 million, the "November Rain" video ranks among the most expensive music promos» (uDiscoverMusic)
- Esito: CONFERMATA
- Correzione proposta: — (Wikipedia non dà la cifra; uDiscoverMusic è l'unica fonte citata che la contiene.)

##### A25 — P2
- Affermazione: «è stato tra i primi video pre-YouTube a superare il miliardo di visualizzazioni (2018)»
- Fonte precisa: Wikipedia — sezione video («In July 2018, the music video became the first video created prior to YouTube to surpass one billion views»); uDiscoverMusic — «on 14 July, officially hit one billion views on YouTube» (senza anno)
- Estratto: «the first video created prior to YouTube to surpass one billion views» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: — (la scheda è più cauta della fonte: «tra i primi» invece di «il primo». Si può tenere; la fonte citata da Wikipedia è NPR 18/07/2018, che non ho aperto: l'URL che ho tentato era 404.)

##### A26 — P2
- Affermazione: «e poi i due miliardi (2023)»
- Fonte precisa: Wikipedia — «In February 2023, the music video reached another milestone after it surpassed two billion views»; Consequence (esterna) — https://consequence.net/2023/02/guns-n-roses-november-rain-2-billion-youtube-views/ — data 15/02/2023
- Estratto: «the first full-on rock music video to hit 2 billion views on YouTube» (Consequence)
- Esito: CONFERMATA
- Correzione proposta: —

##### A27 — Frase iconica
- Affermazione: «Il verso più citato è quello sull'impossibilità che…»
- Fonte precisa: nessuna delle fonti citate; nessuna delle pagine lette classifica i versi per frequenza di citazione
- Estratto: non letto: nessuna fonte lo dice
- Esito: NON CONFERMATA
- Correzione proposta: togliere «il più citato»; formula alternativa senza superlativo (vedi A28).

##### A28 — Frase iconica (contenuto del verso; controllo R4/P3)
- Affermazione: la descrizione del verso in italiano, tutta nella prima frase della frase iconica (l'impermanenza; l'immagine della pioggia di novembre legata al titolo)
- Fonte precisa: Letras (testoUrl) — https://www.letras.com/guns-n-roses/13382/ — pagina esistente (200, titolo «NOVEMBER RAIN - Guns N' Roses - LETRAS.COM»), il testo contiene il passo descritto
- Estratto: non riportabile (versi)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: il contenuto è vero, ma la formulazione rende quasi alla lettera un passo del testo: la parte dopo la virgola coincide, in italiano, con la seconda metà del verso, e la prima parte ne segue il senso quasi parola per parola. Non è fra virgolette, ma R4 vieta anche la traduzione. Sostituire con una descrizione: «Il testo è una meditazione malinconica sulla fine di un amore e sulla fragilità di ciò che sembra durare: un'accettazione dell'impermanenza.» (nessuna traduzione di verso).
- Sospetto verso: sì.

##### A29 — Frase iconica
- Affermazione: «Il videoclip… racconta la storia di un matrimonio seguito da un funerale»
- Fonte precisa: Wikipedia — sezione video: «The next scene shows a funeral at the same church» dopo il matrimonio; uDiscoverMusic — «the couple's doomed wedding»
- Estratto: «The next scene shows a funeral at the same church.» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: — (uDiscoverMusic non nomina il funerale; la conferma viene da Wikipedia. Volendo un riscontro primario, si guarda il video stesso.)

##### A30 — Frase iconica
- Affermazione: «un espediente narrativo che ha probabilmente contribuito a legare il brano, nell'immaginario popolare, a entrambe le cerimonie»
- Fonte precisa: nessuna delle fonti citate; nessuna documenta un'associazione popolare del brano a matrimoni e funerali né un nesso causale con il video
- Estratto: non letto: nessuna fonte lo dice (Wikipedia riporta solo l'esecuzione di Rose al servizio funebre di Lisa Marie Presley nel gennaio 2023, senza legarla al video)
- Esito: NON CONFERMATA
- Correzione proposta: togliere la frase. Se si vuole tenere un'ipotesi, dichiararla (R8): «È un'ipotesi nostra, non documentata da una fonte, che la trama abbia contribuito a far associare il brano a entrambe le cerimonie.»

##### SEO
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]
- Esito: nessuna affermazione da verificare
- Correzione proposta: [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Controlli sui metadati e sui link
- anno: 1991 = anno dell'album; il singolo è del 1992 (vedi M1).
- album: giusto (Use Your Illusion I, originale, non raccolta).
- ascoltiTesto: kworb, letto il 21/09/2026 (dati aggiornati al 20/09/2026): 1.417.505.785 stream per la traccia 3YRCqOhFifThpSRFJ1VWFM, 717.886 al giorno. La scheda dice 1,39 mld: in ritardo di circa 5 settimane; oggi 1,42 mld. Le altre versioni sono tracce separate («2022 Version» 34,5 mln, «Live» 17,5 mln, «Piano Version» 2,4 mln): il dato della scheda si riferisce alla traccia originale.
- spotifyId: oEmbed risponde, titolo «November Rain» (verificato 21/09/2026); coincide con la riga «November Rain» su kworb.
- testoUrl: https://www.letras.com/guns-n-roses/13382/ risponde 200, canonical identico, titolo «NOVEMBER RAIN - Guns N' Roses - LETRAS.COM».
- Stato HTTP delle fonti: MusicRadar 200 dopo redirect a URL più corto (aggiornare l'URL citato); uDiscoverMusic 200 (data in pagina 18/02/2026, ripubblicazione; esiste anche una pagina «…/november-rain-guns-n-roses-song-feature/» con contenuto affine, non letta); Wikipedia 200 (ultima modifica 26/06/2026); kworb 200 ma la pagina citata non contiene il dato del brano (URL da correggere sulla pagina artista).
- Fonti esterne usate: Louder 200 (08/07/2022), Rock Hall 200, Consequence 200 (15/02/2023). NPR 2018: non aperta (404 all'URL tentato). Web Archive: offline.

#### Omissioni rilevanti (solo se cambiano il senso)
- Il motivo dell'esclusione dal primo album, secondo Charlton (Louder): Axl disse che il brano non era finito e lo teneva per il disco successivo. Senza questo la scheda suggerisce una scelta tra due ballate; vedi A10.
- Nascita del brano nel 1983 secondo Tracii Guns (uDiscoverMusic, fonte già citata): cambia il senso di «gestazione lunghissima» e del «primo abbozzo» (vedi A2).
- La discrepanza fra le date di uscita del singolo per paese (vedi A19).


---

## A.15 — War Pigs (Black Sabbath) · `canzone/war-pigs/`

### Esito — War Pigs (Black Sabbath)
Pagina: canzone/war-pigs/ — verificata il 21/09/2026 — priorità: 31 impressioni (Search Console, ultimi 3 mesi al 11/09/2026), posizione media 8.9

Fonti aperte di persona (tutte via curl, testo integrale letto): Wikipedia en «War Pigs» (versione viva al 21/09/2026), Primordial Radio (pubblicata 30 giu 2025), kworb (pagina artista Black Sabbath, aggiornata 2026/09/20), Letras (pagina della canzone). Aperte in più, non citate dalla scheda: intervista Noisecreep di Jon Wiederhorn (30 lug 2010, formato domanda-risposta), Guitar World (intervista a Butler e Iommi), Songfacts, Rock and Roll Garage, Antiwar Songs. Fandom: HTTP 403, non letta.

#### Riepilogo
- Affermazioni esaminate: 27 — CONFERMATA 15, CON RISERVA 9, NON CONFERMATA 3, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A12 — «clima di proteste contro la guerra del Vietnam nel Regno Unito»: né Wikipedia né Primordial parlano di proteste nel Regno Unito (dicono che i giovani temevano la chiamata alle armi). Fonte alternativa solo di livello B/C (Songfacts che cita Mojo 2017, non letto).
  2. A15 — la citazione «politici e ricchi che iniziano le guerre…» sta solo in Wikipedia (che cita il libro di Popoff del 2006, che non ho letto), non in Primordial. Nella scheda manca «guerra del Vietnam», che nel testo originale è il bersaglio dichiarato: così il «invece» sul contrasto con Ozzy si indebolisce. Manca anche l'attribuzione (R3).
  3. A19 e A22 — «il verso più citato» e «non come semplice provocazione» non stanno in nessuna fonte: sono aggiunte della scheda.
  4. A9/A23 — le parole di Butler sul «grande Satana» vengono da un'intervista a Noisecreep (2010): la scheda non dice a chi le ha dette (R3). «Il male assoluto / in persona» è più forte dell'originale, che dice solo «evil» (l'espressione «Evil itself» è la versione riportata da Wikipedia, non quella di Noisecreep).
  5. A27 — il dato «512 mln» non corrisponde più (kworb oggi: 520.082.762) e nella pagina kworb quel dato appartiene a un ID Spotify diverso da quello incorporato nella scheda.
  6. Tensione interna tra P1 e P2 (vedi «Omissioni»).
- Cosa non sono riuscito a documentare: i testi originali di Popoff (2006) e di Clerk (2002), l'intervista di Reesman (2014), l'intervista a Mojo (2017): li ho solo trovati riportati da Wikipedia, Primordial e Songfacts. Il dettaglio «chi ha chiesto il cambio di titolo era Vertigo» sta solo in Primordial (fonte di livello C, con parti romanzate).
- Sospetto verso nella frase iconica: no. Non ci sono virgolette attorno a parole cantate: le sole parole fra virgolette («il grande Satana») sono di Butler in un'intervista sulla canzone, non un verso. Cautela: la parafrasi «generali riuniti a pianificare la distruzione a streghe radunate per un rito oscuro» fonde tre versi consecutivi (l'apertura, il paragone con le streghe, la riga sulla distruzione) restando molto vicina all'ordine e alle immagini del testo. Non è una riproduzione, ma è la parafrasi più aderente possibile: valutare se accorciare (vedi A20).
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritta da Tony Iommi, Ozzy Osbourne, Geezer Butler e Bill Ward»
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/War_Pigs — infobox, campo Songwriter — pagina viva, riletta il 21/09/2026
- Estratto: «Songwriter: Tony Iommi · Ozzy Osbourne · Geezer Butler · Bill Ward»
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «con il testo firmato dal bassista Butler»
- Fonte precisa: Wikipedia — sezione Overview — 1° paragrafo
- Estratto: «said bassist and lyricist Geezer Butler»
- Esito: CONFERMATA CON RISERVA — Butler è indicato come autore del testo, ma i crediti ufficiali sono dei quattro; «firmato» fa pensare a un credito a suo solo nome.
- Correzione proposta: «con il testo scritto dal bassista Butler».

##### A3 — P1
- Affermazione: «il brano nacque con il titolo "Walpurgis"»
- Fonte precisa: Wikipedia — Overview, 1° paragrafo; Primordial — https://primordialradio.com/black-sabbath-war-pigs-lyrics-meaning/ (30/06/2025), sezione «War Pigs Origins»; riscontro nell'intervista Noisecreep (30/07/2010)
- Estratto: «The original title of "War Pigs" was "Walpurgis"» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A4 — P1
- Affermazione: «una festa legata al sabba delle streghe»
- Fonte precisa: Wikipedia — Overview, 1° paragrafo; Noisecreep (intervista, 30/07/2010) — risposta sul titolo originale
- Estratto: «dealing with the Witches' Sabbath» (Wikipedia); Butler: «Walpurgis is sort of like Christmas for Satanists» (Noisecreep)
- Esito: CONFERMATA CON RISERVA — Wikipedia dice che il titolo «trattava del sabba», Butler paragona Walpurgis al Natale dei satanisti; «festa» e «legata alle streghe» sono una sintesi, plausibile ma non scritta così da nessuna fonte.
- Correzione proposta: «una ricorrenza legata al sabba delle streghe, che Butler ha paragonato a un "Natale per i satanisti"» — con attribuzione: «ha detto Butler a Noisecreep nel 2010».

##### A5 — P1
- Affermazione: «poi rinominato "War Pigs"»
- Fonte precisa: Wikipedia — Overview; Primordial — «War Pigs Origins»
- Estratto: «that's when we turned it into 'War Pigs'» (Butler, citato in Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: «su richiesta dell'etichetta Vertigo»
- Fonte precisa: Primordial — «War Pigs Origins»; Wikipedia — infobox (Label: Vertigo); Noisecreep
- Estratto: «Their record label, Vertigo, baulked at the occult flavour» (Primordial). Butler (Noisecreep): «they thought 'Walpurgis' sounded too Satanic»
- Esito: CONFERMATA CON RISERVA — Butler parla di «record company» senza nome e senza parlare di una richiesta; il nome Vertigo compare solo in Primordial (livello C), l'infobox di Wikipedia dà Vertigo come etichetta della canzone. «Su richiesta» è un'interpretazione ragionevole.
- Correzione proposta: «su suggerimento della casa discografica (la Vertigo)», oppure lasciare com'è aggiungendo che Butler parla di «casa discografica» senza nome.

##### A7 — P1
- Affermazione: «preoccupata dalle connotazioni sataniche del titolo»
- Fonte precisa: Wikipedia — Overview; Noisecreep
- Estratto: «they thought 'Walpurgis' sounded too Satanic»
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P1
- Affermazione: «il testo restò invariato»
- Fonte precisa: Wikipedia — Overview; Noisecreep
- Estratto: «we didn't change the lyrics, because they were already finished»
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «Butler ha raccontato che per lui la guerra era "il grande Satana", il male assoluto, non semplicemente un tema di politica o di governo»
- Fonte precisa: Noisecreep (Jon Wiederhorn, 30/07/2010) — https://noisecreep.com/black-sabbath-bassist-geezer-butler-gets-paranoid/ — risposta sul titolo originale (pagina di genere INTERVISTA; non tra le fonti citate dalla scheda). Wikipedia e Primordial riportano lo stesso brano citando Noisecreep.
- Estratto: «to me, war was the big Satan. It wasn't about politics or government or anything. It was evil.»
- Esito: CONFERMATA CON RISERVA — (a) R3: la scheda non dice a chi ha parlato (a Noisecreep, 2010) e Noisecreep non è fra le fonti citate, mentre è nominata in Primordial; (b) «il male assoluto» è più forte di «evil»: «Evil itself» è la versione di Wikipedia, che non coincide con l'originale letto.
- Correzione proposta: «Butler ha raccontato a Noisecreep, nel 2010, che per lui la guerra era "il grande Satana": non una questione di politica o di governo, ma il male». Aggiungere Noisecreep fra le fonti (URL sopra).

##### A10 — P1
- Affermazione: «non semplicemente un tema di politica o di governo»
- Fonte precisa: Noisecreep (intervista, 2010); Wikipedia — Overview
- Estratto: «It wasn't about politics or government or anything.»
- Esito: CONFERMATA
- Correzione proposta: — (vedi «Omissioni» per la tensione con P2)

##### A11 — P1
- Affermazione: «fu per rendere quell'equivalenza che scelse di paragonare i generali a streghe riunite per un rito oscuro»
- Fonte precisa: Noisecreep; Wikipedia — Overview
- Estratto: Butler dice di aver usato il paragone tra i generali e le streghe alle messe nere «to make an analogy» (il passo cita il verso; non lo riporto).
- Esito: CONFERMATA
- Correzione proposta: —

##### A12 — P2
- Affermazione: «nacque nel clima di proteste contro la guerra del Vietnam nel Regno Unito di fine anni '60»
- Fonte precisa: Wikipedia — Overview, 2° paragrafo; Primordial — «War Pigs Origins». Nessuna delle due parla di proteste.
- Estratto: «with the Vietnam War still ongoing, many young men feared they would be conscripted» (Wikipedia); «the Vietnam War dominated the headlines» (Primordial)
- Esito: NON CONFERMATA — le fonti citate dicono che la guerra era in primo piano e che si temeva la chiamata alle armi, non che ci fossero proteste nel Regno Unito. Fonte alternativa (livello B/C): Songfacts — https://www.songfacts.com/facts/black-sabbath/war-pigs — riporta parole di Butler a Mojo nel 2017: «there was protests in the street, all kinds of anti-Vietnam things going on». Mojo non l'ho letto; testimonianza ricordata a distanza di quasi cinquant'anni.
- Correzione proposta: (a) versione sicura: «Il pezzo nacque negli anni in cui la guerra del Vietnam dominava le notizie e in Gran Bretagna molti giovani temevano di essere chiamati alle armi» (regge con Wikipedia e Primordial); (b) se si vogliono le proteste: «Butler ha ricordato a Mojo, nel 2017, che in strada c'erano proteste contro la guerra» e aggiungere Songfacts come fonte (livello C, cita Mojo).

##### A13 — P2
- Affermazione: «Butler temeva di essere richiamato»
- Fonte precisa: Wikipedia — Overview, 2° paragrafo (cita Reesman, 27/03/2014); Primordial — «War Pigs Origins»; intervista Noisecreep (2010): «we'd be called up to drop in to the Vietnam War»
- Estratto: «I was dreading being called up» (Wikipedia, Butler)
- Esito: CONFERMATA (intervista di Reesman non aperta; riscontrata dalle due fonti citate e da Noisecreep)
- Correzione proposta: — (facoltativo: «ha ricordato a Bryan Reesman nel 2014»)

##### A14 — P2
- Affermazione: «nonostante la leva obbligatoria fosse stata abolita»
- Fonte precisa: Wikipedia — Overview, 2° paragrafo; Primordial
- Estratto: «National service had ended in 1963 in the United Kingdom» (Wikipedia); «Great Britain had ended mandatory national service» (Primordial)
- Esito: CONFERMATA
- Correzione proposta: —

##### A15 — P2
- Affermazione: «Il bassista ha definito il brano un'accusa diretta contro "politici e ricchi che iniziano le guerre a proprio vantaggio e mandano i poveri a morire per loro"»
- Fonte precisa: Wikipedia — Overview, 3° paragrafo (nota [10] = Martin Popoff, Black Sabbath: Doom Let Loose, 2006, p. 33: libro, non aperto). Non presente in Primordial.
- Estratto: «totally against the Vietnam War, about how these rich politicians and rich people start all the wars for their benefit»
- Esito: CONFERMATA CON RISERVA — (a) la frase originale è «totalmente contro la guerra del Vietnam», e la scheda omette Vietnam, poi contrappone Ozzy con «invece»: così il contrasto reale (Butler: contro il Vietnam; Ozzy: non ne sapevamo nulla) si perde; (b) fonte secondaria (Wikipedia che cita un libro), non nominata; (c) la traduzione è fedele nel senso ma «politici e ricchi» perde «ricchi politici».
- Correzione proposta: «Secondo il libro di Martin Popoff (2006), citato da Wikipedia, Butler ha detto che il brano è "totalmente contro la guerra del Vietnam", contro i ricchi politici e i ricchi che iniziano le guerre a proprio vantaggio e mandano i poveri a morire per loro». Aggiungere Popoff come fonte, oppure togliere la citazione tra virgolette e parafrasare.

##### A16 — P2
- Affermazione: «Ozzy Osbourne ha invece dichiarato che la band "non sapeva nulla del Vietnam"»
- Fonte precisa: Wikipedia — Overview, 3° paragrafo (nota [11] = Carol Clerk, Diary of a Madman, 2002, p. 25); Primordial — «War Pigs Origins»
- Estratto: «knew nothing about Vietnam. It's just an anti-war song.» (Wikipedia); Primordial: «Ozzy admitted to Carol Clerk»
- Esito: CONFERMATA CON RISERVA — attribuzione a Ozzy corretta e nelle due fonti; ma la frase sta in un libro di Clerk (2002, non letto), non in un'intervista rilasciata a una testata: la scheda non nomina né il libro né la data.
- Correzione proposta: «Ozzy Osbourne, nel libro di Carol Clerk (2002), ha dichiarato che la band "non sapeva nulla del Vietnam"».

##### A17 — P2
- Affermazione: «descrivendolo più genericamente come un pezzo contro la guerra»
- Fonte precisa: Wikipedia; Primordial
- Estratto: «It's just an anti-war song.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — Frase iconica
- Affermazione: «Il verso più citato è quello d'apertura»  [parte: quello d'apertura]
- Fonte precisa: Letras — https://www.letras.com/black-sabbath/4252/ — testo della canzone, prima riga
- Estratto: non riporto: verificato che la prima riga del testo è quella sui generali riuniti, seguita dal paragone con le streghe (riga 2) e dalla riga sulla distruzione (riga 3).
- Esito: CONFERMATA (per «d'apertura»)
- Correzione proposta: —

##### A19 — Frase iconica
- Affermazione: «Il verso più citato»  [parte: superlativo]
- Fonte precisa: nessuna. Primordial e Wikipedia lo riportano ma non lo dicono il più citato.
- Estratto: non letto in nessuna fonte
- Esito: NON CONFERMATA
- Correzione proposta: «Il verso d'apertura è tra i più noti» è ancora un superlativo relativo non documentato: meglio «Il verso d'apertura paragona…». Togliere «più citato».

##### A20 — Frase iconica
- Affermazione: «paragona i generali riuniti a pianificare la distruzione a streghe radunate per un rito oscuro»
- Fonte precisa: Letras — righe 1, 2 e 3 del testo; Wikipedia e Noisecreep per il paragone generali/streghe
- Estratto: non riporto (parafrasi di versi)
- Esito: CONFERMATA CON RISERVA — il paragone generali/streghe sta nelle prime due righe; il «pianificare la distruzione» viene dalla terza. La scheda le fonde in un solo «verso d'apertura» e la parafrasi è molto aderente ai versi (vedi cautela nel Riepilogo).
- Correzione proposta: «Il verso d'apertura paragona i generali riuniti alle streghe radunate per un rito oscuro» (senza la parte sulla distruzione, che è il verso successivo).

##### A21 — Frase iconica
- Affermazione: «un'immagine che Geezer Butler ha detto di aver scelto» (come paragone)
- Fonte precisa: Noisecreep (intervista, 2010) — risposta sul titolo; Wikipedia
- Estratto: «to make an analogy»
- Esito: CONFERMATA (senza dire a chi l'ha detto: R3, vedi A9)
- Correzione proposta: aggiungere «a Noisecreep nel 2010».

##### A22 — Frase iconica
- Affermazione: «non come semplice provocazione»
- Fonte precisa: nessuna. Butler parla di «analogy»; nessuna fonte letta lo mette in contrapposizione con una provocazione.
- Estratto: non letto
- Esito: NON CONFERMATA
- Correzione proposta: togliere «non come semplice provocazione, ma»: «…un'immagine che Butler ha detto di aver scelto perché per lui la guerra era il "grande Satana"».

##### A23 — Frase iconica
- Affermazione: «per lui la guerra era davvero "il grande Satana", il male assoluto in persona»
- Fonte precisa: Noisecreep (2010); Wikipedia
- Estratto: «war was the big Satan… It was evil.» (Noisecreep)
- Esito: CONFERMATA CON RISERVA — «davvero», «assoluto» e «in persona» sono rafforzativi assenti nell'originale (Wikipedia riporta «Evil itself», che non coincide col testo di Noisecreep).
- Correzione proposta: «perché per lui la guerra era il "grande Satana", cioè il male».

##### A24 — Metadati: anno
- Affermazione: «anno: 1970»
- Fonte precisa: Wikipedia — infobox: Released 18 September 1970 (dalla traccia d'apertura di Paranoid); Spotify pagina traccia: «Paranoid · Song · 1970»
- Estratto: «Released 18 September 1970»
- Esito: CONFERMATA (anno dell'album; la canzone non è uscita come singolo)
- Correzione proposta: —

##### A25 — Metadati: album
- Affermazione: «album: Paranoid»
- Fonte precisa: Wikipedia — incipit: «the opening track from the band's second studio album, Paranoid»
- Estratto: «the opening track from the band's second studio album, Paranoid (released in 1970)»
- Esito: CONFERMATA
- Correzione proposta: —

##### A26 — Metadati: genere
- Affermazione: «genereTesto: Heavy metal»
- Fonte precisa: Wikipedia — infobox, Genre: Heavy metal, stoner rock
- Estratto: «Genre: Heavy metal»
- Esito: CONFERMATA
- Correzione proposta: —

##### A27 — Metadati: ascolti
- Affermazione: «ascoltiTesto: 512 mln ascolti»
- Fonte precisa: kworb — https://kworb.net/spotify/ (la pagina citata è l'indice e non contiene dati di brano); dato trovato in https://kworb.net/spotify/artist/5M52tdBnJaKSvOpJGz8mfZ_songs.html, aggiornata 2026/09/20, letta il 21/09/2026
- Estratto: riga «War Pigs — 520,082,762 stream — 316,471 al giorno»
- Esito: CONFERMATA CON RISERVA — il valore attuale è 520.082.762; 512 mln è inferiore di circa 8 milioni (circa 25 giorni a 316 mila al giorno): compatibile con una lettura di fine agosto, ma oggi non regge più. Inoltre la riga di kworb è l'ID 0HVQuuXGAcQ2P5mBN521ae (album The Ultimate Collection, 2017), non l'ID 1mnXT8zNssefzrRkeuD8Ov (album Paranoid, 1970) usato sulla pagina, che non compare nell'elenco di kworb.
- Correzione proposta: aggiornare a «520 mln ascolti» e indicare l'URL della pagina artista come fonte; segnalare che il conteggio è quello della versione «The Ultimate Collection» (o cambiare spotifyId in 0HVQuuXGAcQ2P5mBN521ae per far coincidere brano e conteggio).

#### Controlli sui metadati e sui link
- anno: 1970 = anno dell'album Paranoid (il brano non è un singolo).
- album: Paranoid (originale, non raccolta).
- ascolti kworb: 520.082.762 (aggiornamento kworb 2026/09/20, letto il 21/09/2026); il valore pubblicato «512 mln» non è più aggiornato. ID nella riga kworb diverso da quello incorporato.
- spotifyId 1mnXT8zNssefzrRkeuD8Ov: oEmbed risponde, titolo «War Pigs»; pagina traccia: Black Sabbath · Paranoid · 1970. Corretto per titolo e album.
- testoUrl https://www.letras.com/black-sabbath/4252/: HTTP 200, titolo «WAR PIGS - Black Sabbath - LETRAS.COM», canonical coincidente: è la pagina giusta.
- Stato HTTP delle fonti citate: Wikipedia 200 ok; Primordial 200 ok (30/06/2025; presenta un incipit romanzato, fonte di livello C); kworb.net/spotify/ 200 ma è l'indice, senza dato del brano.
- Fonti non citate, ma usate: Noisecreep 200 (30/07/2010), Songfacts 200, Guitar World 200, Rock and Roll Garage 200 (13/10/2020), Antiwar Songs 200 (riprende Wikipedia); Fandom 403.

#### Omissioni rilevanti (solo se cambiano il senso)
- P1 dice che per Butler la guerra «non era un tema di politica o di governo», P2 lo presenta come un'accusa diretta a politici e ricchi. Sono due dichiarazioni diverse (Noisecreep 2010 e libro di Popoff 2006) e nella scheda sembrano contraddirsi senza spiegazione. Suggerimento: dire che si tratta di due momenti/fonti distinti, oppure ricordare che a Mojo (2017, via Songfacts) Butler ha detto che i politici sono «i veri satanisti»: questo unisce le due letture (livello C, Mojo non letto).
- Nel testo originale di Butler citato da Wikipedia il bersaglio è esplicitamente la guerra del Vietnam: la scheda lo cancella (A15) e presenta come contrasto con Ozzy ciò che è in parte una divergenza sul bersaglio.


---

## A.16 — Wake Me Up When September Ends (Green Day) · `canzone/wake-me-up-when-september-ends/`

### Esito — Wake Me Up When September Ends (Green Day)
Pagina: canzone/wake-me-up-when-september-ends/ — verificata il 21/09/2026 — priorità: 31 impressioni (Search Console, 3 mesi al 11/09/2026), posizione media 11.0

Fonti aperte di persona il 21/09/2026 (HTTP 200 per tutte): American Songwriter (AS), Songfacts (SF), kworb.net (pagina indice + pagina artista), Letras. In più, come fonti alternative: Wikipedia EN (voci della canzone, di Green Day, di Billie Joe Armstrong), Radio X, Find a Grave, SurvivorNet.

#### Riepilogo
- Affermazioni esaminate: 24 — CONFERMATA 11, CON RISERVA 10, NON CONFERMATA 2, CONTRADDETTA 1, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A20 — «nacquero esattamente sette anni dopo la morte del padre»: CONTRADDETTA. Songfacts lo dice, ma è un'interpretazione non attribuita a nessuno; la band (Sweet Children) nasce nel 1986/1987 (4-5 anni dopo il 1982); il nome Green Day arriva nel 1989. La formulazione «esattamente» è più forte della fonte.
  2. A14/A15/A16 — R3: le parole di Armstrong («ha raccontato…») vengono da un'intervista all'Howard Stern Show (riportata da AS, pagina «Behind the Song», non intervista); la scheda non dice a chi le disse né che le riporta AS. In più «quando si è sentito pronto» riguarda l'incisione (non la scrittura) ed è parafrasi del giornalista, non citazione.
  3. A24 — frase iconica: «lasciarlo in pace fino alla fine di quel mese» non è nelle fonti (riportano solo la richiesta di essere svegliato a settembre finito; incoerente con P1). A22: «bambino» (età) non è in nessuna fonte citata.
  4. A19 — «un passaggio del testo allude a…»: interpretazione presente solo in Songfacts, non firmata né attribuita ad Armstrong; va attribuita o tolta.
  5. A11-A13, A21 — l'aneddoto della camera è riportato da AS con «reportedly»; Songfacts lo dà come fatto; la scheda lo dà come fatto certo e aggiunge dettagli («per vedere come stava», «quel mese doloroso») assenti nelle fonti citate.
- Cosa non sono riuscito a documentare: la data e il testo primario dell'intervista a Howard Stern (AS non ne indica la data; Wikipedia cita una puntata del 16/10/2019 ma non ho visto/ascoltato il video, quindi non posso dire che sia quella). Nessuna fonte primaria di Armstrong sull'aneddoto della camera/titolo (ricostruzione ripresa da AS/Songfacts/Wikipedia, tutte secondarie).
- Sospetto verso nella frase iconica: no. La frase iconica non riporta parole cantate; le parole pronunciate dal bambino coincidono con il titolo e la scheda non le cita. Nessun verso, neppure parziale, nel corpo (il rimando al «passaggio del testo» in P2 è descrittivo).

#### Affermazioni

##### A1 — Metadati (anno)
- Affermazione: anno «2004»
- Fonte precisa: American Songwriter — https://americansongwriter.com/the-meaning-behind-wake-me-up-when-september-ends-by-green-day/ — primo paragrafo — data vera 07/06/2022 (datePublished nel markup)
- Estratto: «In 2004, Green Day released its eighth studio album American Idiot.»
- Esito: CONFERMATA CON RISERVA
- Riserva: 2004 è l'anno dell'ALBUM (uscito 21/09/2004, Wikipedia EN, voce della canzone). Il singolo «Wake Me Up When September Ends» uscì il 13/06/2005 (stessa voce Wikipedia, livello B; non l'ho verificato su fonte primaria). AS non dà l'anno del singolo.
- Correzione proposta: lasciare 2004 solo se il campo «anno» è per convenzione l'anno dell'album; altrimenti 2005 (singolo) o dichiarare «album 2004; singolo 2005». Da decidere secondo la convenzione del sito.

##### A2 — Metadati (album)
- Affermazione: album «American Idiot»
- Fonte precisa: American Songwriter — stesso primo paragrafo; Letras — https://www.letras.com/green-day/105396/ (markup: album «American Idiot (Deluxe)», 2004)
- Estratto: «Among the tracklist is the somber offering, "Wake Me Up When September Ends"»
- Esito: CONFERMATA (l'album originale è American Idiot; Letras usa l'edizione Deluxe, non è un errore della scheda)
- Correzione proposta: —

##### A3 — Metadati (genereTesto)
- Affermazione: «Punk rock»
- Fonte precisa: Letras — markup della pagina — data: pagina attuale
- Estratto: «non letto come frase; il markup Letras riporta genere "Punk Rock" (di artista/brano)»
- Esito: CONFERMATA CON RISERVA
- Riserva: è l'etichetta di Letras per l'artista; Wikipedia EN descrive il brano come «rock ballad». Etichetta corretta per la band, meno per il brano.
- Correzione proposta: nessuna obbligatoria; se si vuole precisione, «Rock» o «Ballata rock» (Wikipedia EN, voce della canzone, livello B).

##### A4 — Metadati (ascoltiTesto)
- Affermazione: «1,1 mld ascolti»
- Fonte precisa: kworb.net — pagina artista https://kworb.net/spotify/artist/7oPftvlwr6VrsViSDV7fJY_songs.html (la pagina citata https://kworb.net/spotify/ è solo un indice, senza il dato del brano) — riga del brano, ID spotify corrispondente — pagina aggiornata 20/09/2026, letta 21/09/2026
- Estratto: «Wake Me up When September Ends 1,129,350,268» (totale stream; 685.708 al giorno)
- Esito: CONFERMATA (1.129.350.268 arrotondato a 1,1 mld regge)
- Correzione proposta: — (suggerimento: nelle fonti mettere l'URL della pagina artista, non l'indice)

##### A5 — P1
- Affermazione: «Scritta da Billie Joe Armstrong»
- Fonte precisa: American Songwriter — paragrafo 2 — data vera 07/06/2022
- Estratto: «written by frontman Billie Joe Armstrong as an ode to his late father»
- Esito: CONFERMATA
- Correzione proposta: —

##### A6 — P1
- Affermazione: «come omaggio al padre»
- Fonte precisa: American Songwriter (stessa frase di A5); Songfacts — https://www.songfacts.com/facts/green-day/wake-me-up-when-september-ends — primo paragrafo (pagina non datata)
- Estratto: «wrote this song about his father, who died of cancer»
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: padre «morto di cancro»
- Fonte precisa: Songfacts — primo paragrafo. (AS nel corpo non nomina la malattia: compare solo nel tweet di un fan incorporato.)
- Estratto: «his father, who died of cancer on September 1, 1982»
- Esito: CONFERMATA (fonte: Songfacts; per il tipo di cancro, esofageo, vedi Wikipedia EN voce Billie Joe Armstrong, livello B)
- Correzione proposta: —

##### A8 — P1
- Affermazione: morto «nel settembre del 1982»
- Fonte precisa: Songfacts (1° settembre 1982) e AS, «Behind The Lyrics» (10 settembre 1982)
- Estratto: «his father's death on September 10, 1982» (AS)
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «le fonti citate non concordano sul giorno esatto, il 10 secondo American Songwriter e l'1 secondo Songfacts»
- Fonte precisa: AS, «Behind The Lyrics»; Songfacts, primo paragrafo (letti entrambi)
- Estratto: AS «September 10, 1982»; SF «September 1, 1982»
- Esito: CONFERMATA (attribuzione corretta e dubbio dichiarato)
- Correzione proposta: — (facoltativo: due altre fonti che ho letto divergono ancora: Wikipedia EN, voce Billie Joe Armstrong, dà il 10 settembre; Find a Grave https://www.findagrave.com/memorial/233886416/ riporta il 16 settembre 1982, ma è contenuto di utenti, livello C. Il dubbio resta aperto: mantenere la dicitura attuale.)

##### A10 — P1
- Affermazione: «Dopo il funerale, Armstrong corse a casa e si chiuse in camera»
- Fonte precisa: AS, «Behind The Lyrics»; Songfacts, primo paragrafo
- Estratto: «At the funeral, Armstrong cried, ran home, and locked himself in his room.» (AS)
- Esito: CONFERMATA (le fonti dicono «at the funeral»; Wikipedia: «on the day of his father's funeral»; «dopo» è compatibile)
- Correzione proposta: — (opzionale: «Il giorno del funerale…»)

##### A11 — P1
- Affermazione: «quando la madre bussò alla porta per vedere come stava»
- Fonte precisa: AS e Songfacts
- Estratto: «When his mother got home and knocked on the door to his room» (AS)
- Esito: CONFERMATA CON RISERVA — «per vedere come stava» non è nelle fonti citate (lo dice Wikipedia EN, «came to check on him», livello B). Le fonti dicono che la madre rientrò a casa e bussò.
- Correzione proposta: «quando la madre, rientrata a casa, bussò alla porta della sua camera»

##### A12 — P1
- Affermazione: «rispose semplicemente chiedendole di svegliarlo soltanto quando quel mese doloroso fosse passato»
- Fonte precisa: AS («he simply said…»), Songfacts («Billie simply said…»)
- Estratto: «non riportabile qui: sono le parole del titolo, riferite come battuta detta alla madre»
- Esito: CONFERMATA CON RISERVA — le fonti riportano solo che pronunciò le parole che sono il titolo; «soltanto» e «quel mese doloroso» sono un'esplicitazione di chi scrive. AS aggiunge «reportedly» (riferito, non verificato); Songfacts e Wikipedia («reportedly») no/sì in modo diverso: l'aneddoto è ripreso, non documentato da fonte primaria.
- Correzione proposta: «rispose, stando al racconto che circola, con la frase che sarebbe poi diventata il titolo del brano (American Songwriter parla di ricostruzione riferita, «reportedly»)». Oppure lasciare com'è ma togliere «soltanto» e «doloroso».

##### A13 — P1
- Affermazione: «una frase che, quasi identica, sarebbe diventata il titolo del brano»
- Fonte precisa: AS («reportedly coming up with the title then and there»); Songfacts («hence the title»)
- Estratto: «reportedly coming up with the title then and there» (AS)
- Esito: CONFERMATA CON RISERVA — per le fonti la frase è IDENTICA al titolo, non «quasi identica»; inoltre AS la dà come «reportedly». Wikipedia EN aggiunge che il titolo fu «tenuto» per diversi anni prima del brano.
- Correzione proposta: «la stessa frase, secondo il racconto, sarebbe poi diventata il titolo del brano»

##### A14 — P2
- Affermazione: «Armstrong ha raccontato di aver evitato per anni di scrivere di quella perdita»
- Fonte precisa: American Songwriter — «Behind The Lyrics» — data vera 07/06/2022. GENERE: pagina della rubrica «Behind The Song», non intervista: riporta un'intervista all'Howard Stern Show; la data dell'intervista non è indicata. Songfacts riporta anche una dichiarazione a People (data non indicata).
- Estratto: «In an interview with the Howard Stern Show, Armstrong said the lyrics were inspired by the grief he now feels every time the month rolls around.» (AS, prosa del giornalista)
- Esito: CONFERMATA CON RISERVA (R3): il contenuto c'è, l'attribuzione no. La scheda non dice a chi lo disse né che lo riporta AS.
- Correzione proposta: «Armstrong ha raccontato all'Howard Stern Show, come riporta American Songwriter, di aver evitato per anni di scrivere di quella perdita»

##### A15 — P2
- Affermazione: «e di averla affrontata solo circa vent'anni dopo, quando si è sentito pronto»
- Fonte precisa: AS — paragrafo dopo la citazione di Stern — data vera 07/06/2022; Songfacts — primo paragrafo e ultimo capoverso (pagina non datata)
- Estratto: «it had been close to 20 years since his father's death when the band got around to recording the track» (AS, prosa del giornalista)
- Esito: CONFERMATA CON RISERVA — (a) «circa vent'anni» regge per AS («close to 20»); (b) «quando si è sentito pronto» è parafrasi di AS («it took him a while to become emotionally ready»), non una citazione di Armstrong; in Songfacts è l'incisione del 2002 che fu rimandata perché non si sentiva pronto (il brano era destinato a Shenanigans, poi tenuto per American Idiot); (c) le fonti divergono su cosa siano i «vent'anni»: AS = tempo fino alla registrazione («written earlier»), Songfacts = fino alla scrittura. La scheda li fonde.
- Correzione proposta: «Secondo American Songwriter, passarono quasi vent'anni dalla morte del padre prima che la band incidesse il brano, e Armstrong avrebbe avuto bisogno di tempo per essere emotivamente pronto a cantarlo».

##### A16 — P2 (citazione)
- Affermazione: «"Avevo evitato di scriverne per molti anni, e poi finalmente avere una svolta come quella mi ha fatto stare bene."»
- Fonte precisa: American Songwriter — «Behind The Lyrics» — citazione attribuita a Stern Show
- Estratto: «I kinda avoided writing about him for many years, and then finally having a breakthrough like that felt good.» (parole di Armstrong, riportate da AS)
- Esito: CONFERMATA CON RISERVA — traduzione fedele nel senso; omesso «kinda» («più o meno»); resa «felt good» → «mi ha fatto stare bene» accettabile; manca l'avviso che è tradotta e da chi/a chi è stata detta. Nota: AS scrive «Armstrong told Stern», non «al podcast».
- Correzione proposta: «"Avevo più o meno evitato di scrivere di lui per molti anni, e poi finalmente avere una svolta come quella è stata una bella sensazione", disse Armstrong a Howard Stern (nella traduzione di American Songwriter, rubrica «Behind The Song», 2022)» — formulare come traduzione di chi scrive.

##### A17 — P2
- Affermazione: «Il brano fu inciso solo dopo quella lunga distanza di tempo dalla morte del padre.»
- Fonte precisa: AS (stesso paragrafo di A15); Songfacts, ultimo capoverso
- Estratto: «close to 20 years since his father's death when the band got around to recording the track»
- Esito: CONFERMATA
- Correzione proposta: —

##### A18 — P2
- Affermazione: «Sweet Children, la band che si sarebbe poi trasformata nei Green Day»
- Fonte precisa: Songfacts — primo paragrafo, terza riga; Wikipedia EN (voce Green Day): la band prese il nome Green Day nel 1989
- Estratto: «Sweet Children (which would morph into Green Day)» (SF)
- Esito: CONFERMATA
- Correzione proposta: —

##### A19 — P2
- Affermazione: «Un passaggio del testo, quando accenna al tempo ormai trascorso, allude al fatto che gli Sweet Children…»
- Fonte precisa: Songfacts — primo paragrafo — unica fonte. Non firmata; non attribuita ad Armstrong. AS e Wikipedia leggono il riferimento come semplice tempo trascorso dalla morte del padre.
- Estratto: «is a reference to how Billie Joe Armstrong and Mike Dirnt's band Sweet Children» (SF, prosa)
- Esito: CONFERMATA CON RISERVA — è un'interpretazione di Songfacts, non una dichiarazione degli autori né confermata da altre fonti; la scheda la presenta come fatto.
- Correzione proposta: «togliere la frase» (preferibile: vedi A20). In alternativa: «secondo Songfacts, un passaggio del testo riferirebbe (interpretazione non confermata da Armstrong) alla nascita degli Sweet Children».

##### A20 — P2
- Affermazione: gli Sweet Children «nacquero esattamente sette anni dopo la morte del padre di Armstrong»
- Fonte precisa: Songfacts la contiene («formed seven years after»). Fonti alternative lette: Wikipedia EN, voce Green Day — «In 1987» Armstrong e Dirnt (15 anni) formarono la band; Sweet Children è il nome preso «a few months later»; primo concerto 17/10/1987; nome Green Day dall'aprile 1989. Radio X (https://www.radiox.co.uk/artists/green-day/what-story-meaning-behind-name/) — «formed as Sweet Children in 1986».
- Estratto: «formed seven years after Armstrong's father died» (SF); «In 1987, guitarist friends Billie Joe Armstrong and Mike Dirnt» (Wikipedia, voce Green Day)
- Esito: CONTRADDETTA — la data di fondazione più documentata (1986/1987) dista 4-5 anni dal settembre 1982, non 7; i 7 anni tornano solo per il cambio di nome in Green Day (1989). «Esattamente» è più forte di Songfacts.
- Correzione proposta: «togliere la frase» (e togliere anche A19). Se si vuole mantenere il dettaglio: «Songfacts sostiene che il riferimento sia alla nascita degli Sweet Children, ma altre fonti datano la fondazione della band al 1986-87, quindi l'interpretazione non è provata».

##### A21 — Frase iconica
- Affermazione: «Il titolo stesso nasce da un momento privato e reale»
- Fonte precisa: AS («reportedly coming up with the title then and there»); Songfacts («hence the title»); Wikipedia EN («held onto the song title for several years after»)
- Estratto: «reportedly coming up with the title then and there» (AS)
- Esito: CONFERMATA CON RISERVA — riferito («reportedly»), non da fonte primaria; la scheda lo afferma senza riserva.
- Correzione proposta: «Il titolo, secondo il racconto riportato da American Songwriter e Songfacts, nasce da un momento privato e reale:»

##### A22 — Frase iconica
- Affermazione: «pronunciata da un Armstrong bambino»
- Fonte precisa: nessuna delle fonti citate dà l'età di Armstrong. Fonte alternativa (livello B): Wikipedia EN, voce Billie Joe Armstrong — nato il 17/02/1972, padre morto quando aveva 10 anni («when Armstrong was 10 years old»).
- Estratto: «non letto nelle fonti citate»
- Esito: NON CONFERMATA (vera con fonte alternativa B)
- Correzione proposta: aggiungere una fonte (Wikipedia EN, voce Billie Joe Armstrong, o SurvivorNet https://www.survivornet.com/articles/green-day-wake-me-up-when-september-ends-billie-joe-armstrong-dad-cancer/, che scrive «was only 10 years old»), oppure «un Armstrong di dieci anni» con quella fonte.

##### A23 — Frase iconica
- Affermazione: «chiuso in camera dopo il funerale del padre»
- Fonte precisa: come A10
- Esito: CONFERMATA
- Correzione proposta: —

##### A24 — Frase iconica
- Affermazione: «che chiedeva alla madre di lasciarlo in pace fino alla fine di quel mese doloroso»
- Fonte precisa: AS/Songfacts riportano solo che disse le parole che sono il titolo alla madre che bussava; non che chiese di essere lasciato in pace. P1 stessa dice «di svegliarlo»: la frase iconica è incoerente con P1.
- Estratto: «non letto: le fonti non contengono "lasciarlo in pace"»
- Esito: NON CONFERMATA
- Correzione proposta: «…che alla madre chiedeva di svegliarlo solo a settembre finito.» (senza citare le parole) e con formula di cautela «secondo il racconto».

#### Controlli sui metadati e sui link
- anno: 2004 = anno dell'album (21/09/2004); singolo uscito il 13/06/2005 (Wikipedia EN, livello B).
- album: American Idiot (album originale); Letras indica l'edizione «Deluxe».
- ascoltiTesto: 1.129.350.268 stream Spotify (kworb, pagina artista Green Day, aggiornata 20/09/2026, letto 21/09/2026) → «1,1 mld» regge. La pagina citata (kworb.net/spotify/) è l'indice, non contiene il dato.
- spotifyId 3ZffCQKLFLUvYM59XKLbVm: oEmbed risponde, titolo «Wake Me up When September Ends»; l'ID compare anche nella riga del brano su kworb. OK.
- testoUrl https://www.letras.com/green-day/105396/: esiste (200), è la pagina del brano (titolo, Green Day, album American Idiot Deluxe). OK.
- Stato HTTP fonti: American Songwriter 200 (pagina del 07/06/2022, autrice Alex Hopper), Songfacts 200 (non datata), kworb 200, Letras 200.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Omissioni rilevanti (solo se cambiano il senso)
- Songfacts riporta che il brano era destinato a Shenanigans (2002), fu tenuto da parte perché Armstrong non si sentiva emotivamente pronto e poi finì su American Idiot: spiega l'«inciso solo dopo» meglio della formula attuale (A15/A17).
- La scheda non dice mai che l'intero racconto della camera è una ricostruzione riferita da fonti secondarie («reportedly» in AS e Wikipedia). Da segnalare (R8).
- Nota di metodo: le fonti divergono sul giorno della morte in tre modi (1, 10, 16 settembre); la scheda ne cita due e dichiara il dubbio: corretto.


---

## A.17 — Hotel California (Eagles) · `canzone/hotel-california/`

### Esito — Hotel California (Eagles)
Pagina: canzone/hotel-california/ — verificata il 21/09/2026 — priorità: 31 impressioni Search Console (posizione media 32,5)

#### Riepilogo
- Affermazioni esaminate: 25 — CONFERMATA 12, CON RISERVA 8, NON CONFERMATA 5, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A22, A18, A21 — tutta la parte interpretativa della frase iconica (svolta/trappola, «libertà solo apparente», «fama» nella California del Sud) non è sostenuta da nessuna delle tre fonti citate: è lettura dell'autore della scheda presentata come fatto.
  2. A10 — «per lo stesso autore è applicabile ovunque»: Henley dice «America», non «ovunque». Attribuzione più forte della fonte.
  3. A15 — «nonostante i suoi sei minuti e mezzo»: il nesso concessivo non è in nessuna fonte. La durata fu un ostacolo per il singolo alla radio, non per la scaletta dal vivo.
  4. A5 — «ammise di non riuscire a spiegarne il senso in poche frasi»: Henley risponde ridendo «non in due frasi» e poi lo spiega comunque; «ammise di non riuscire» è troppo forte.
  5. A25 — ascoltiTesto «2,2 mld»: oggi kworb dà 2.338.068.173 (aggiornamento 20/09/2026), cioè 2,3 mld; inoltre l'URL citato (kworb.net/spotify/) è solo un indice e non contiene il dato.
  6. A16–A17 — la frase iconica, senza virgolette, rende in discorso indiretto e in traduzione quasi letterale il contenuto delle ultime due righe della canzone (vedi sospetto verso). Nessuna fonte citata contiene i versi: il riscontro è sulla pagina del testo (testoUrl).
- Cosa non sono riuscito a documentare: nulla è rimasto illeggibile. Non ho aperto le fonti secondarie a cui rimanda Wikipedia (libro di Marc Eliot 2004 p.131, BBC Radio 2, MusicRadar) né una fonte primaria del Grammy (grammy.com risponde 404 sulle pagine provate): per il Grammy e per la vicenda della durata mi fermo a Wikipedia (livello B). Il video del segmento CBS non l'ho guardato; ho letto il testo scritto dell'articolo, che riporta le parole di Henley.
- Sospetto verso nella frase iconica: SÌ, lieve. Nessun frammento è tra virgolette, ma la frase traduce quasi parola per parola il contenuto delle ultime due righe della canzone (chi parla, cosa dice dell'uscita). Meglio descrivere la funzione narrativa del finale senza riformularne il contenuto riga per riga (proposta in A17).

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritto da Don Felder (musica)»
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/Hotel_California — infobox (writer) e sezione «Writing and inspiration»; letta via wikitext raw il 21/09/2026 — data: pagina in continuo aggiornamento
- Estratto: «Don Felder composed the melody for "Hotel California".» (didascalia foto)
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «con Don Henley e Glenn Frey (testo)»
- Fonte precisa: Wikipedia — stessa pagina — didascalia foto e sezione sulla scrittura
- Estratto: «Don Henley wrote the lyrics to "Hotel California" with Frey.» (didascalia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «nel 2016 in un'intervista a CBS Mornings»
- Fonte precisa: CBS News — https://www.cbsnews.com/news/don-henley-the-eagles-glenn-frey-kennedy-center-honor-hotel-california/ — testo dell'articolo. Genere della pagina: articolo che rende conto di un servizio CBS Mornings con intervista; contiene domande e risposte dirette con l'intervistatore (indicato solo come «King»). Letta da copia web.archive.org (snapshot con footer 2024) e controllata con WebFetch; la richiesta diretta con curl dà HTTP 406.
- Data vera: «First published on December 8, 2016»; in testa compare «December 27, 2016 / 9:47 AM EST»; «This piece originally aired December 8, 2016.»
- Estratto: «This piece originally aired December 8, 2016.»
- Esito: CONFERMATA
- Correzione proposta: — (R3 rispettata: la pagina è di genere intervista, le parole sono dette a chi conduce il servizio di CBS Mornings)

##### A4 — P1
- Affermazione: «nel 2016»
- Fonte precisa: CBS News — stessa pagina — data di messa in onda 8 dicembre 2016
- Estratto: «First published on December 8, 2016 / 1:01 PM EST»
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: Henley «ammise di non riuscire a spiegarne il senso in poche frasi»
- Fonte precisa: CBS News — stesso articolo — scambio con l'intervistatore prima della spiegazione
- Estratto: «"Not in two sentences, no," Henley said, laughing.» (alla richiesta di spiegarlo in due frasi; poco prima: «I have some idea»)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: sostituire «ammise di non riuscire a spiegarne il senso in poche frasi» con «che, invitato a spiegarne il senso in due frasi, rispose ridendo che non ci sarebbe riuscito, e poi ne diede comunque questa sintesi»
- Nota: in due frasi no, ma le risposte che seguono sono tre-quattro frasi; «ammise di non riuscire» suggerisce un'incapacità che la fonte non dice (dice «ho qualche idea»).

##### A6 — P1
- Affermazione: «un viaggio dall'innocenza all'esperienza» nelle parole dello stesso Henley
- Fonte precisa: CBS News — stesso articolo — risposta di Henley. Riscontro indipendente: Wikipedia (sezione sul significato) attribuisce la stessa espressione a Henley nel documentario «History of the Eagles» (2013).
- Estratto: «Well, I always say, it's a journey from innocence to experience.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A7 — P1
- Affermazione: «"Non parla davvero della California, parla dell'America", disse Henley»
- Fonte precisa: CBS News — stessa risposta
- Estratto: «It's not really about California; it's about America.»
- Esito: CONFERMATA
- Correzione proposta: — (traduzione fedele)

##### A8 — P1
- Affermazione: «Parla del lato oscuro del sogno americano, di eccesso, di narcisismo, dell'industria musicale... può avere un milione di interpretazioni.»
- Fonte precisa: CBS News — stessa risposta
- Estratto: «It's about the dark underbelly of the American dream. It's about excess, it's about narcissism. It's about the music business.»
- Esito: CONFERMATA
- Correzione proposta: — (fedele; «un milione di interpretazioni» corrisponde a «a million interpretations»; nella fonte il passo è interrotto da «It's about a lot of different…», reso correttamente dai puntini)

##### A9 — P1
- Affermazione: «La California è lo scenario»
- Fonte precisa: né CBS né Wikipedia lo dicono in questi termini. Wikipedia (sezione sulla scrittura) riporta il ricordo di Felder del viaggio notturno verso Los Angeles e Henley che definisce il pezzo «our interpretation of the high life in Los Angeles»; nell'infobox/sezione su Henley il Beverly Hills Hotel come «focal point».
- Estratto: «our interpretation of the high life in Los Angeles» (Wikipedia, citando Rolling Stone 2003; non riaperto RS)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «La California è il punto di partenza — Henley la descrisse come "la nostra interpretazione della bella vita a Los Angeles" — ma il significato…» (fonte: Wikipedia che cita Rolling Stone; livello B; non ho letto Rolling Stone). Oppure lasciare «scenario» e legarlo a Wikipedia.

##### A10 — P1
- Affermazione: «il significato, per lo stesso autore, è applicabile ovunque»
- Fonte precisa: CBS News — Henley dice «about America», non ovunque. Wikipedia: «a symbolic piece about America in general».
- Estratto: «It's not really about California; it's about America.»
- Esito: NON CONFERMATA
- Correzione proposta: «ma il significato, per lo stesso autore, riguarda l'America intera, non solo lo Stato.»

##### A11 — P2
- Affermazione: «Vinse il Grammy Award come Record of the Year»
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/Hotel_California — introduzione e sezione «Recognition»
- Estratto: «The Eagles won the 1977 Grammy Award for Record of the Year for "Hotel California"»
- Esito: CONFERMATA
- Correzione proposta: — (nota: il premio non l'ho riscontrato su fonte primaria grammy.com: le pagine provate danno 404; Wikipedia rimanda a un link grammy.com archiviato)

##### A12 — P2
- Affermazione: «nel 1978»
- Fonte precisa: Wikipedia — stessa sezione
- Estratto: «at the 20th Grammy Awards in 1978»
- Esito: CONFERMATA
- Correzione proposta: — (1978 è l'anno della cerimonia; il premio è per la produzione del 1977. Se si vuole precisione: «ai Grammy del 1978»)

##### A13 — P2
- Affermazione: «è rimasta nella scaletta dal vivo della band per decenni»
- Fonte precisa: Wikipedia — sezioni introduttiva e «Live performances»/«Live recordings»
- Estratto: «The Eagles have performed "Hotel California" more over a thousand times live» (introduzione); «1,233 performances of the song by Eagles» (sezione live, dato setlist.fm a giugno 2026)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «è rimasta un pilastro dei concerti della band, che l'ha eseguita dal vivo più di mille volte» (fonte: Wikipedia, che rimanda a setlist.fm; livello B/C). «Per decenni» è deduzione dalle registrazioni live del 1976, 1980, 1994 e dal tour del 2010 riportate su Wikipedia: non c'è una frase che lo dica.

##### A14 — P2
- Affermazione: «i suoi sei minuti e mezzo di durata»
- Fonte precisa: Wikipedia — infobox
- Estratto: «6:30 (album version) / 6:08 (single version)»
- Esito: CONFERMATA
- Correzione proposta: — (vale per la versione dell'album; il singolo dura 6:08)

##### A15 — P2
- Affermazione: «nonostante» la durata (nesso tra durata e permanenza in scaletta)
- Fonte precisa: Wikipedia — sezione sulla registrazione/pubblicazione: la durata fece esitare la casa discografica sul singolo (dato radiofonico), non sulla scaletta dal vivo. Il nesso «nonostante» non è in nessuna fonte.
- Estratto: «the record company was reluctant to release it because, at over six minutes, its duration far exceeded» (Wikipedia; fonti sotto: MusicRadar, BBC, Eliot 2004: non aperte)
- Esito: NON CONFERMATA
- Correzione proposta: «Vinse il Grammy Award come Record of the Year nel 1978 ed è rimasta un pilastro dei concerti della band. La durata, oltre i sei minuti, aveva fatto esitare la casa discografica sull'uscita come singolo, ma il gruppo rifiutò di accorciarla.» (fonte: Wikipedia, che cita Eliot 2004 p.131; livello B, non ho verificato Eliot) — oppure togliere «nonostante… durata».

##### A16 — Frase iconica
- Affermazione: «la battuta del portiere di notte» pronunciata nel verso finale
- Fonte precisa: nessuna delle fonti citate commenta il testo. Riscontro sulla pagina del testo (testoUrl, letras.com, HTTP 200): il «night man» compare a poche righe dalla fine e pronuncia le ultime righe. Le ultime DUE righe, non «il verso finale».
- Estratto: non letto sulle fonti citate; riscontro solo sulla pagina testo (non riporto righe)
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: sostituire «Il verso finale è» con «Il finale è» e vedere A17

##### A17 — Frase iconica
- Affermazione: la battuta dice agli ospiti che si può fare il check-out quando si vuole ma non si potrà mai davvero andarsene
- Fonte precisa: idem A16 (pagina del testo, non fonte citata). Contenuto coerente con le ultime due righe.
- Estratto: non letto sulle fonti citate; nessun riporto di versi
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: descrivere la funzione senza ricalcare le righe: «Il finale ribalta il tono di ospitalità: è la rassicurazione del portiere di notte a rivelare che dall'hotel non si esce.» (sospetto verso lieve: la formulazione attuale traduce il contenuto delle ultime righe)

##### A18 — Frase iconica
- Affermazione: «la svolta che rivela come l'"hotel" sia in realtà una trappola senza uscita»
- Fonte precisa: nessuna fonte citata. Interpretazione dell'autore della scheda.
- Estratto: non letto: assente dalle fonti
- Esito: NON CONFERMATA
- Correzione proposta: attribuire o attenuare: «Secondo molte letture, il finale svela l'hotel come un luogo da cui non si esce» (senza «in realtà») — oppure dichiarare (R8): «lettura dell'autore della scheda». Se si vuole una fonte: Wikipedia riporta Henley, che parla del «sottile confine tra sogno americano e incubo americano» (dal documentario History of the Eagles, 2013): è la sola base citabile, e va attribuita a lui.

##### A19 — Frase iconica
- Affermazione: «Fan e critica ne discutono da decenni»
- Fonte precisa: Wikipedia — introduzione
- Estratto: «Fans and critics have discussed the meaning of the lyrics.»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: togliere «da decenni» (non è nella fonte): «Fan e critica ne discutono il significato».

##### A20 — Frase iconica
- Affermazione: «una delle letture più diffuse lo interpreta come una metafora degli eccessi seducenti ma distruttivi dell'industria musicale»
- Fonte precisa: Wikipedia — sezione «Meaning»/interpretazioni, che cita DeMain 2006 (Performing Songwriter), non aperto
- Estratto: «interpreted as an allegory about hedonism, self-destruction, and greed in the music industry of the late 1970s.»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «Secondo un'interpretazione riportata da Wikipedia (Bill DeMain), il brano è un'allegoria di edonismo, autodistruzione e avidità nell'industria musicale della fine degli anni '70.» «Una delle più diffuse» è un giudizio di frequenza non documentato: usare «una delle letture proposte».

##### A21 — Frase iconica
- Affermazione: metafora «della fama nella California del Sud degli anni '70»
- Fonte precisa: la «fama» non compare in nessuna fonte letta. La «California del Sud» compare in una dichiarazione di Henley citata da Wikipedia (documentario 2013): «myth-making of Southern California». Gli anni '70 compaiono nella riga su DeMain (industria musicale, fine anni '70).
- Estratto: «the hotel itself could be taken as a metaphor not only for the myth-making of Southern California» (Henley, dal doc. History of the Eagles 2013, via Wikipedia)
- Esito: NON CONFERMATA
- Correzione proposta: togliere «della fama»; se si vuole tenere la California del Sud: «lo stesso Henley ha detto che l'hotel può essere letto come metafora della mitologia della California del Sud e del sogno americano (documentario "History of the Eagles", 2013, riportato da Wikipedia)».

##### A22 — Frase iconica
- Affermazione: «dove una libertà solo apparente nasconde l'impossibilità di uscirne una volta entrati»
- Fonte precisa: nessuna
- Estratto: non letto: assente dalle fonti
- Esito: NON CONFERMATA
- Correzione proposta: togliere la frase, oppure presentarla come lettura personale.

##### A23 — Metadati (anno)
- Affermazione: anno «1976 / 1977»
- Fonte precisa: Wikipedia — pagina del brano (singolo 22/02/1977, secondo singolo dell'album) e pagina dell'album (uscita 8/12/1976, Asylum, quinto album)
- Estratto: «released as the second single of their 1976 album Hotel California on February 22, 1977.»
- Esito: CONFERMATA
- Correzione proposta: — (album 1976, singolo 1977; scelta di formato da verificare rispetto al resto del sito)

##### A24 — Metadati (album)
- Affermazione: album «Hotel California»
- Fonte precisa: Wikipedia — stessa pagina (album originale, non raccolta)
- Estratto: «released as the second single of their 1976 album Hotel California»
- Esito: CONFERMATA
- Correzione proposta: —

##### A25 — Metadati (ascoltiTesto)
- Affermazione: «2,2 mld ascolti»
- Fonte precisa: kworb.net — pagina citata https://kworb.net/spotify/ è solo un indice di classifiche (nessun conteggio per brano). Dato letto su https://kworb.net/spotify/artist/0ECwFtbIWEVNwjlrfc6xoL_songs.html (pagina artista, «Last updated: 2026/09/20») per «Hotel California - 2013 Remaster».
- Estratto: «Hotel California - 2013 Remaster 2,338,068,173»
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: aggiornare a «2,3 mld ascolti» e citare l'URL della pagina artista/brano invece dell'indice. (Il dato è variabile; la pagina brano https://kworb.net/spotify/track/40riOy7x9W7GXjyGp4pjAv.html risponde 200. Le versioni live hanno conteggi separati: la somma dei brani «Hotel California» nella pagina artista non è quella del brano registrato in studio.)

#### Controlli sui metadati e sui link
- Anno / album: vedi A23–A24. Album originale, non raccolta.
- Ascolti kworb: 2.338.068.173 il 20/09/2026 (letto il 21/09/2026) per l'ID 40riOy7x9W7GXjyGp4pjAv; «2,2 mld» non regge oggi (2,3).
- spotifyId 40riOy7x9W7GXjyGp4pjAv: oEmbed risponde, titolo «Hotel California - 2013 Remaster». Corretto.
- testoUrl https://www.letras.com/the-eagles/63266/: HTTP 200, titolo pagina «HOTEL CALIFORNIA - Eagles - LETRAS.COM». È la canzone giusta.
- Stato HTTP delle fonti citate: CBS News — bloccata con curl (406), leggibile con WebFetch e via web.archive.org; Wikipedia — ok; kworb.net/spotify/ — ok ma è un indice senza il dato.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]
- Ricerca del genere/ruolo: la fonte CBS è indicata con ruolo «storia» e contiene solo le dichiarazioni di Henley: non contiene nulla sull'anno, sul Grammy o sulla durata.

#### Omissioni rilevanti (solo se cambiano il senso)
- La scheda presenta il significato come definito da Henley, ma Wikipedia elenca spiegazioni diverse dello stesso autore in sedi diverse («sociopolitical statement», «loss of innocence», «our interpretation of the high life in Los Angeles»); la spiegazione data alla CBS è una delle sue formule. Formulare come «una delle spiegazioni di Henley» eviterebbe di suggerire che sia l'unica. Pagina Wikipedia, sezione sul significato (livello B).
- Nessuna fonte citata sostiene la parte sul testo della canzone (P3): la scheda non cita la pagina del testo fra le fonti; se si mantiene una descrizione del finale, aggiungere la pagina Letras (o il disco) come fonte.


---

## A.18 — Black (Pearl Jam) · `canzone/black-pearl-jam/`

### Esito — Black (Pearl Jam)
Pagina: canzone/black-pearl-jam/ — verificata il 21/09/2026 — priorità: 29 impressioni Search Console (3 mesi al 11/09/2026), posizione media 17.8

#### Riepilogo
- Affermazioni esaminate: 31 — CONFERMATA 19, CON RISERVA 11, NON CONFERMATA 1, CONTRADDETTA 0, NON DOCUMENTABILE 0
  [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]
- Punto di attenzione del committente: la pagina GQ «10 Things Dennis Rodman Can't Live Without» NON è estranea. L'ho aperta e letta (HTML con trascrizione completa e sottotitoli): Rodman parla di Pearl Jam e di un tentativo di suicidio nel 1993. Però sostiene MENO di ciò che la scheda dice (vedi A21–A24, A26).
- Difetti in ordine di gravità:
  1. A22/A26 — La scheda dice che fu «l'ascolto di Black» a fermarlo. Nel video Rodman nomina la BAND («Pearl Jam»), non il brano come causa, e precisa che non è stato «l'unico motivo». Su un tema come il suicidio l'attribuzione va resa esatta.
  2. A21/A26 — «ha raccontato alla rivista GQ»: la fonte è un video-rubrica di GQ («10 Essentials»), non un'intervista né un articolo di rivista; l'articolo scritto di GQ (quello che cita Wikipedia) parla di Pearl Jam ma non di «Black» e non dice che la musica lo fermò.
  3. A16 — La citazione di Vedder è reale (Rolling Stone, 28/10/1993, Cameron Crowe) ma la scheda non dice a chi/dove/quando fu detta (R3) e traduce «the business» con «mercato».
  4. A13/A14/A15 — «si rifiutò sempre», «troppo personale», «temendo che il peso emotivo…» sono formulazioni di Wikipedia senza fonte primaria nel testo; «sempre» non è in nessuna fonte.
  5. A6 — «benzinaio»: Wikipedia dice gas station attendant, ma la fonte primaria letta (Rolling Stone 1993) dice che lavorava di giorno per una compagnia petrolifera.
  6. A30 — ascolti: 793 mln pubblicati, kworb oggi 805.975.937 (806 mln). Inoltre la fonte citata (kworb.net/spotify/) è la pagina indice, che non contiene il dato.
- Cosa non sono riuscito a documentare (fonti primarie non lette): Guitar World, dicembre 2002 («Black Days», N. Pearlman — su cui Wikipedia fonda «1990», la composizione di E Ballad e il testo scritto durante il viaggio); Q, novembre 1993 (M. Snow — telefonate ai direttori radio); Pearl Jam Twenty p. 68 (Google Books non mostra il testo). Tutte queste affermazioni poggiano quindi sul solo Wikipedia (fonte citata dalla scheda), che le riporta.
- Sospetto verso nella frase iconica: NO. Le virgolette contengono solo il titolo del brano e del libro. Nessuna riga di canzone.

#### Affermazioni

##### A1 — P1
- Affermazione: «Il brano nacque da uno strumentale demo intitolato "E Ballad"»
- Fonte precisa: Wikipedia — https://en.wikipedia.org/wiki/Black_(Pearl_Jam_song) — sezione «Origin» — pagina letta il 21/09/2026 (wikitesto grezzo)
- Estratto: «The song originated as an instrumental demo under the name "E Ballad»
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «scritto dal chitarrista Stone Gossard»
- Fonte precisa: Wikipedia, stessa pagina, sezione Origin e incipit
- Estratto: «features lyrics written by vocalist Eddie Vedder and music written by guitarist Stone Gossard»
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «nel 1990»
- Fonte precisa: Wikipedia, sezione Origin (cita Guitar World, dic. 2002, non letta). Rolling Stone 1993 parla dei «demo del '91» (titolo del nastro), non contraddice.
- Estratto: «instrumental demo under the name "E Ballad" that was written by guitarist Stone Gossard in 1990»
- Esito: CONFERMATA (solo via Wikipedia; fonte primaria non letta)
- Correzione proposta: —

##### A4 — P1
- Affermazione: «incluso in un nastro fatto circolare per trovare un cantante e un batterista per la band»
- Fonte precisa: Wikipedia, sezione Origin
- Estratto: «circulated in the hopes of finding a singer and drummer for Pearl Jam»
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «Fu proprio quel nastro a raggiungere Eddie Vedder»
- Fonte precisa: Wikipedia, Origin; conferma nel merito Rolling Stone 28/10/1993 (Crowe), «Five Against the World» (letta su web.archive.org e su theuncool.com), che aggiunge il passaggio: il nastro gli fu dato da Jack Irons.
- Estratto: «Irons passed along Gossard's tape.»
- Esito: CONFERMATA
- Correzione proposta: — (facoltativo: aggiungere «tramite l'ex batterista dei Red Hot Chili Peppers Jack Irons», fonte Rolling Stone 1993)

##### A6 — P1
- Affermazione: «allora benzinaio a San Diego»
- Fonte precisa: Wikipedia, Origin (letto). Rolling Stone 1993, stesso articolo, descrive altro.
- Estratto: Wikipedia: «who was working as a San Diego gas station attendant at the time»; Rolling Stone: «laboring days at a petroleum company»
- Esito: CONFERMATA CON RISERVA (Wikipedia sì, la fonte primaria letta descrive il lavoro diversamente: compagnia petrolifera; la voce Wikipedia «Ten» non menziona alcun lavoro)
- Correzione proposta: «allora impiegato a San Diego (Wikipedia lo dice benzinaio; Rolling Stone, 1993, parla di un lavoro diurno in una compagnia petrolifera)», oppure più semplicemente «allora un giovane cantante di San Diego che lavorava di giorno per mantenersi».

##### A7 — P1
- Affermazione: «Vedder registrò la voce su tre dei brani proposti»
- Fonte precisa: Wikipedia, Origin; Rolling Stone 1993 («taped himself singing over three of the instrumentals»)
- Estratto: «Vedder taped himself singing over three of the instrumentals.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P1
- Affermazione: «e lo rispedì a Seattle»
- Fonte precisa: Wikipedia, Origin («mailed the tape back to Seattle»); Rolling Stone: Ament ascolta il nastro a Seattle
- Estratto: «mailed the tape back to Seattle» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «venendo così invitato a raggiungere il gruppo»
- Fonte precisa: Wikipedia, Origin; Rolling Stone (Ament: «Stone, you better get over here»)
- Estratto: «Upon hearing the tape, the band invited Vedder to come to Seattle.» (Wikipedia)
- Esito: CONFERMATA
- Correzione proposta: —

##### A10 — P1
- Affermazione: «durante il viaggio scrisse il testo per "E Ballad"»
- Fonte precisa: Wikipedia, Origin (cita Guitar World 2002, NON letta). Rolling Stone 1993 dice solo che il testo esisteva all'arrivo.
- Estratto: Wikipedia: «On his way to Seattle, Vedder wrote lyrics for "E Ballad"»; Rolling Stone: «By the time Vedder arrived in Seattle, he'd already written "Black."»
- Esito: CONFERMATA CON RISERVA (regge su una sola fonte secondaria; l'unica fonte primaria letta dice solo «prima dell'arrivo»)
- Correzione proposta: «e il testo era già scritto quando Vedder arrivò a Seattle (secondo Wikipedia lo compose durante il viaggio)».

##### A11 — P1
- Affermazione: «ribattezzandolo "Black"»
- Fonte precisa: Wikipedia, Origin
- Estratto: «Vedder wrote lyrics for "E Ballad", which he called "Black"»
- Esito: CONFERMATA
- Correzione proposta: —

##### A12 — P2
- Affermazione: «pressioni dell'etichetta Epic Records per farne un singolo»
- Fonte precisa: Wikipedia, incipit e sezione «Release»/«Legacy»: la pressione è dopo il successo di Ten nel 1992. Rolling Stone 1993 parla di «corporate coaching» senza nominare Epic.
- Estratto: «Epic Records urged the group to release the song as a single.»
- Esito: CONFERMATA (Wikipedia; nessun riscontro primario letto)
- Correzione proposta: —

##### A13 — P2
- Affermazione: «la band si rifiutò sempre di pubblicarlo come tale»
- Fonte precisa: Wikipedia; voce «Ten (Pearl Jam album)»: «never released as a commercial single». Nessuna fonte contiene «sempre».
- Estratto: «The band refused, citing the song's personal nature.»
- Esito: CONFERMATA CON RISERVA («sempre» è più forte delle fonti; non ho verificato uscite promozionali o estere)
- Correzione proposta: togliere «sempre»: «la band si rifiutò di pubblicarlo come singolo».

##### A14 — P2
- Affermazione: «ritenendolo troppo personale»
- Fonte precisa: Wikipedia (frase senza nota inline). Rolling Stone 1993 lo definisce «fragile song», non «troppo personale».
- Estratto: «citing it as too personal» (Wikipedia)
- Esito: CONFERMATA CON RISERVA (motivazione riportata solo da Wikipedia, senza fonte primaria; con parole diverse in Rolling Stone)
- Correzione proposta: «ritenendolo, in sostanza, una canzone troppo fragile per essere esposta al mercato (Vedder a Rolling Stone, 1993)», oppure attribuire: «secondo Wikipedia, perché lo giudicava troppo personale».

##### A15 — P2
- Affermazione: «temendo che il suo peso emotivo sarebbe stato distrutto da un videoclip»
- Fonte precisa: Wikipedia (nessuna nota inline); Rolling Stone 1993: Vedder rifiutò di farne un video, ma non parla di «peso emotivo».
- Estratto: Wikipedia: «expressing fear that its emotional weight would be destroyed in a music video»; Rolling Stone: «Eddie Vedder refused to turn the song into a video»
- Esito: CONFERMATA CON RISERVA (il timore è formulazione di Wikipedia; la fonte primaria dice che rifiutò il video)
- Correzione proposta: «e rifiutando di farne un videoclip (Wikipedia riporta il timore che il suo peso emotivo ne uscisse distrutto)».

##### A16 — P2
- Affermazione: «Vedder ha spiegato quella scelta dicendo che "le canzoni fragili vengono schiacciate dal mercato. Io non voglio farne parte. Non credo che la band voglia farne parte"»
- Fonte precisa: Rolling Stone n. 668, 28 ottobre 1993, Cameron Crowe, «Five Against the World» — web.archive.org/web/20070619084803/http://www.rollingstone.com/news/story/10560431/five_against_the_world e http://www.theuncool.com/journalism/rs668-pearl-jam/ — data vera 28/10/1993. GENERE: cover story-profilo con dichiarazioni dirette di Vedder a Crowe. Wikipedia lo riporta (l'articolo non è tra le fonti citate dalla scheda, solo tramite Wikipedia).
- Estratto: «But those fragile songs get crushed by the business. I don't want to be a part of it.»
- Esito: CONFERMATA CON RISERVA (parole reali e attribuite alla persona giusta; ma R3: manca a chi e quando; «the business» = il music business, reso con «mercato»; nell'originale la frase segue un'altra sul non far passare una canzone «tra il singolo n. 2 e il n. 3»)
- Correzione proposta: «il cantante Eddie Vedder spiegò a Rolling Stone, nel 1993, che "le canzoni fragili vengono schiacciate dal music business. Io non voglio farne parte. Non credo che la band voglia farne parte" (traduzione nostra)».

##### A17 — P2
- Affermazione: «arrivando a chiamare personalmente i direttori di alcune radio per assicurarsi che l'etichetta non lo pubblicasse contro la sua volontà»
- Fonte precisa: Wikipedia, sezione Release (cita Q, novembre 1993, Mat Snow — NON letta)
- Estratto: «Vedder personally called radio station managers to make sure Epic had not released the song»
- Esito: CONFERMATA (solo via Wikipedia; «alcune» aggiunto ma innocuo; fonte primaria non letta)
- Correzione proposta: — (facoltativo: «secondo Q, novembre 1993, riportato da Wikipedia»)

##### A18 — P2
- Affermazione: «Nel libro "Pearl Jam Twenty" (2011)»
- Fonte precisa: Wikipedia, sezione Meaning — nota bibliografica: Jonathan Cohen, Pearl Jam Twenty, Simon & Schuster, 13/09/2011, p. 68
- Estratto: «In the 2011 book Pearl Jam Twenty, Vedder said about the meaning of the song»
- Esito: CONFERMATA (Wikipedia; il testo di p. 68 non è visibile su Google Books, quindi non letto)
- Correzione proposta: —

##### A19 — P2
- Affermazione: «Vedder ha raccontato che il brano parla delle prime relazioni e della capacità di lasciar andare»
- Fonte precisa: Wikipedia, sezione Meaning (citazione da Pearl Jam Twenty, p. 68). GENERE: libro corale/oral history: parole raccolte per il libro o riprese da altre occasioni, non verificabili.
- Estratto: «It's about first relationships. The song is about letting go.»
- Esito: CONFERMATA
- Correzione proposta: — (R3: meglio «nel libro Pearl Jam Twenty, Vedder è citato mentre dice…»)

##### A20 — P2
- Affermazione: «definendo raro che un rapporto sopravviva alla naturale evoluzione delle persone»
- Fonte precisa: Wikipedia, stessa citazione
- Estratto: «It's very rare for a relationship to withstand the Earth's gravitational pull»
- Esito: CONFERMATA (parafrasi fedele: «gravitational pull» reso come «evoluzione naturale»; la frase originale continua con «how they're going to grow»)
- Correzione proposta: —

##### A21 — P2
- Affermazione: «Nel 2021 il cestista Dennis Rodman ha raccontato alla rivista GQ»
- Fonte precisa: GQ — https://www.gq.com/video/watch/10-essentials-10-things-dennis-rodman-cant-live-without — pagina aperta (HTTP 200). Titolo: «10 Things Dennis Rodman Can't Live Without | 10 Essentials | GQ»; «Released on 11/18/2021» (data vera). GENERE: video-rubrica «10 Essentials» di GQ; Rodman parla in camera mostrando oggetti che ama (sigari, Pearl Jam, piercing, occhiali…). Non è un'intervista né un articolo di rivista. Trascrizione completa sulla pagina.
- Estratto: «Released on 11/18/2021»; «Pearl Jam, God, I got hooked to these guys in 1991» (parole di Rodman)
- Esito: CONFERMATA CON RISERVA (anno e canale corretti; «alla rivista» impreciso: è un video pubblicato da GQ)
- Correzione proposta: «Nel 2021, in un video della serie "10 Essentials" pubblicato da GQ, il cestista Dennis Rodman ha detto che…»

##### A22 — P2
- Affermazione: «fu proprio l'ascolto di "Black" a fermarlo»
- Fonte precisa: GQ video (trascrizione, sezione dei primi minuti). Rodman cita «Black» come brano che ama («This song here, 'Black'…»), poi passa a parlare della band, poi del 1993 e del tentativo di suicidio. Attribuisce la salvezza ai Pearl Jam, non a un ascolto di «Black» in quel momento, e la limita.
- Estratto: «They saved my life, man.»; «it was Pearl Jam.»; «not the sole reason, but it was a main reason.»
- Esito: CONFERMATA CON RISERVA (la sostanza «la musica dei Pearl Jam lo aiutò» regge; «fu proprio… Black… a fermarlo» è molto più forte e specifico. Nel video non dice che «Black» fosse il brano in ascolto quella notte né che «fermò» il gesto). Anche l'articolo scritto GQ (https://www.gq.com/story/dennis-rodman-style-icon-of-the-year-2021, letto; data 18/11/2021 secondo la nota di Wikipedia, non verificata sulla pagina) racconta solo che si addormentò con un fucile in grembo «listening to Pearl Jam» e si svegliò quando la polizia bussò al finestrino: non nomina «Black».
- Correzione proposta: «Nel 2021, in un video di GQ, Dennis Rodman ha detto che i Pearl Jam gli hanno "salvato la vita" in una notte del 1993 in cui tentò il suicidio, precisando che non fu l'unica ragione ma una delle principali; nello stesso video cita "Black" tra i brani che ama.» (Se si vuole conservare il nesso diretto con "Black": «secondo Wikipedia, Rodman ha detto che "Black" lo fermò, ma nel video GQ nomina la band, non il brano».)

##### A23 — P2
- Affermazione: «un tentativo di suicidio»
- Fonte precisa: GQ video, trascrizione
- Estratto: «I tried to commit suicide.»
- Esito: CONFERMATA
- Correzione proposta: — (nota: tema sensibile; valutare una riga con riferimenti di aiuto secondo la linea editoriale del sito)

##### A24 — P2
- Affermazione: «nel 1993»
- Fonte precisa: GQ video, trascrizione; articolo GQ («By 1993…»)
- Estratto: «I had a bit of an issue in 1993.»
- Esito: CONFERMATA
- Correzione proposta: —

##### A25 — Frase iconica
- Affermazione: «Il momento più toccante legato al brano riguarda una testimonianza esterna»
- Fonte precisa: nessuna; giudizio editoriale con superlativo
- Estratto: non applicabile
- Esito: NON CONFERMATA (superlativo soggettivo che non può essere documentato; la frase iconica lo presenta come dato)
- Correzione proposta: «Tra le testimonianze legate al brano c'è quella, del 2021, del cestista Dennis Rodman: in un video di GQ ha detto che i Pearl Jam gli hanno salvato la vita in una notte del 1993, aggiungendo che non fu l'unico motivo.»

##### A26 — Frase iconica
- Affermazione: «nel 2021 il cestista Dennis Rodman ha raccontato a GQ che fu l'ascolto di "Black" a fermarlo da un tentativo di suicidio nel 1993»
- Fonte precisa: come A21–A24
- Estratto: «not the sole reason, but it was a main reason.»
- Esito: CONFERMATA CON RISERVA (stesso difetto di A21–A22: «a GQ» va bene solo come «in un video di GQ»; il brano non è la causa dichiarata)
- Correzione proposta: usare il testo di A25, che sostituisce l'intera frase.

##### A27 — Frase iconica
- Affermazione: «Lo stesso Eddie Vedder, nel libro "Pearl Jam Twenty" (2011), ha descritto il brano come una riflessione sulle prime relazioni e sulla rara capacità di un amore di sopravvivere alla naturale evoluzione delle persone»
- Fonte precisa: Wikipedia (citazione da Pearl Jam Twenty p. 68)
- Estratto: «It's very rare for a relationship to withstand the Earth's gravitational pull»
- Esito: CONFERMATA CON RISERVA (Vedder parla di «relationship» (rapporto) e dice che è raro che regga; «capacità» e «amore» sono aggiunte; nel corpo A19–A20 il testo è più preciso)
- Correzione proposta: «ha descritto il brano come una canzone sulle prime relazioni e sul lasciar andare, ricordando quanto sia raro che un rapporto resista a come le persone cambiano».

##### A28 — Metadati
- Affermazione: «anno: 1991»
- Fonte precisa: Wikipedia, infobox: album Ten uscito il 27/08/1991; il brano non uscì come singolo.
- Estratto: «released = August 27, 1991»
- Esito: CONFERMATA (è l'anno dell'album; la canzone è nella classifica Mainstream Rock nel 1993, se serve chiarirlo)
- Correzione proposta: —

##### A29 — Metadati
- Affermazione: «album: Ten»
- Fonte precisa: Wikipedia, incipit («fifth track on their 1991 debut album, Ten»)
- Estratto: «The song is the fifth track on their 1991 debut album, Ten»
- Esito: CONFERMATA
- Correzione proposta: —

##### A30 — Metadati (ascoltiTesto)
- Affermazione: «793 mln ascolti»
- Fonte precisa: kworb.net — la pagina citata (https://kworb.net/spotify/) è solo un indice, senza il dato. Pagina utile: https://kworb.net/spotify/artist/1w5Kfo2jwwIPruYS2UWh56_songs.html, aggiornata «2026/09/19», riga Black con l'ID 5Xak5fmy089t0FYmh3VJiY.
- Estratto: «Black … 805,975,937» (letto il 21/09/2026)
- Esito: CONFERMATA CON RISERVA (dato variabile ma obsoleto: oggi 806 mln; 793 mln non regge come arrotondamento attuale)
- Correzione proposta: aggiornare a «806 mln ascolti» (lettura kworb del 19/09/2026) e citare l'URL della pagina degli artisti.

##### A31 — Metadati (titolo)
- Affermazione: «titolo: Black»
- Fonte precisa: Wikipedia (titolo «Black (Pearl Jam song)»), Spotify oEmbed («Spotify Embed: Black»), Letras («BLACK - Pearl Jam»)
- Estratto: «"Black" is a song by American rock band Pearl Jam.»
- Esito: CONFERMATA (il titolo del campo «Black» coincide con il titolo del brano nei dati e su Spotify)
- Correzione proposta: —

#### Controlli sui metadati e sui link
- anno 1991 = anno dell'album (27/08/1991), non del singolo (non ne esiste uno commerciale). Album «Ten» = originale, non raccolta.
- genereTesto «Grunge»: coerente con l'infobox Wikipedia (genere: grunge, ballad).
- ascoltiTesto: 793 mln pubblicato; kworb (artist songs, aggiornata 2026/09/19, letta il 21/09/2026): 805.975.937. Discrepanza -13 mln (circa 1,6%). Il numero è variabile: aggiornare.
- spotifyId 5Xak5fmy089t0FYmh3VJiY: oEmbed HTTP 200, titolo «Black»; la pagina embed indica artista Pearl Jam; ID presente anche nella tabella kworb del brano. OK. (Non ho controllato l'album a cui l'ID appartiene.)
- testoUrl https://www.letras.com/pearl-jam/30319/: HTTP 200, pagina «BLACK - Pearl Jam - LETRAS.COM». OK (non riporto il testo).
- Stato HTTP delle fonti: Wikipedia OK (200, wikitesto letto); GQ video OK (200, letto con trascrizione); kworb.net/spotify/ OK (200, ma pagina indice senza dato); Rolling Stone 1993 (non citata, ma verificata): OK via web.archive.org; il link originale rollingstone.com è morto (Wikipedia lo segna «dead»).
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]
- Altra nota: la scheda non riporta fonti per «Pearl Jam Twenty», «Rolling Stone» e «Q», tutte raggiunte solo attraverso Wikipedia; l'unica fonte primaria verificata di persona (Rolling Stone 1993) è oggi raggiungibile via https://www.theuncool.com/journalism/rs668-pearl-jam/ ed è consigliabile aggiungerla.

#### Omissioni rilevanti (solo se cambiano il senso)
- L'articolo scritto di GQ (https://www.gq.com/story/dennis-rodman-style-icon-of-the-year-2021), che è quello effettivamente citato da Wikipedia per la storia di Rodman, racconta la scena: parcheggio del Palace di Auburn Hills, un fucile in grembo, addormentato mentre ascoltava Pearl Jam e svegliato dalla polizia. Non nomina «Black». Se si vuole tenere il legame con "Black", la fonte da citare è il video (dove il brano è nominato ma non come causa), con la riserva di A22; se si vuole la scena, la fonte è l'articolo.
- Il filo narrativo di Rolling Stone 1993 («la linea fu tracciata su Black», rifiuto del video, i «consigli aziendali» che volevano trasformarlo in un hit) è la fonte primaria che manca alla scheda per A12–A16.


---

## A.19 — Rock 'n' Roll Damnation (AC/DC) · `canzone/rock-n-roll-damnation/`

### Esito — Rock 'n' Roll Damnation (AC/DC)
Pagina: canzone/rock-n-roll-damnation/ — verificata il 21/09/2026 — priorità: 27 impressioni (Search Console, 3 mesi al 11/09/2026), posizione media 42,3

#### Riepilogo
- Affermazioni esaminate: 24 — CONFERMATA 13, CON RISERVA 7, NON CONFERMATA 4, CONTRADDETTA 0, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A19 — «il momento più ricordato» è un superlativo di ricezione che nessuna fonte contiene (frase iconica).
  2. A21 — «diventata, con gli anni, uno dei tratti distintivi del pezzo»: giudizio di ricezione nel tempo senza fonte (frase iconica).
  3. A20 — «una scelta commerciale»: nessuna fonte dice che l'assenza dell'assolo fu una scelta commerciale. Sono documentati solo il carattere commerciale del brano nel suo insieme e la sua genesi su richiesta dell'etichetta.
  4. A5 — «casa discografica americana»: la voce Wikipedia citata dice solo «the record company»; che fosse Atlantic USA sta in altre pagine (vera, ma non nelle fonti citate).
  5. A17 — «singolo di grande impatto commerciale» rende in modo troppo forte «standout single» di Ultimate Classic Rock.
  6. A13 — «21 in Belgio» è la classifica fiamminga (Ultratop 50 Flanders), non il Belgio intero.
  7. A24 — kworb dà 40.576.063 stream: «40 mln» regge solo come troncamento; arrotondato sarebbe 41.
- Fonti citate: la fonte Ultimate Classic Rock citata (`acdc-powerage`) parla solo dell'album e non contiene nulla della genesi del singolo. Tutta la storia di P1 (etichetta che chiede un singolo radiofonico, ultimo brano inciso, marzo 1978, Sydney) poggia sulla sola voce Wikipedia del brano, che porta il banner «needs more citations» e rimanda al libro di Mick Wall (2013), che non ho letto. Sul punto ho trovato conferme in altre pagine aperte (vedi A2, A5, A6, A9).
- Cosa non sono riuscito a documentare: la data «marzo 1978» da una seconda fonte indipendente (Wikipedia la dà come marzo 1978 per il brano e «febbraio–marzo 1978» per le sessioni dell'album; Louder dice che le sessioni iniziarono a gennaio 1978). Il libro di Wall e quello di Engleheart non li ho letti. Non ho potuto ascoltare il brano per verificare di persona l'assenza di qualunque assolo.
- Sospetto verso nella frase iconica: no. La frase non contiene virgolette e non riprende parole del testo: descrive la struttura musicale del brano.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]

#### Affermazioni

##### A1 — P1
- Affermazione: «Scritta da Angus Young, Malcolm Young e Bon Scott»
- Fonte precisa: Wikipedia (voce del brano) — https://en.wikipedia.org/wiki/Rock_%27n%27_Roll_Damnation — sezione «Song details» e infobox (Songwriters) — pagina viva, letta il 21/09/2026
- Estratto: «Written by Angus Young, Malcolm Young and Bon Scott»
- Riscontro indipendente: Ultratop/Dutchcharts (via Wayback) indicano gli stessi tre autori e come produttori Harry Vanda e George Young; la pagina Progrography (recensione del singolo) riporta gli stessi tre autori.
- Esito: CONFERMATA
- Correzione proposta: —

##### A2 — P1
- Affermazione: «fu l'ultimo brano inciso per "Powerage"»
- Fonte precisa: Wikipedia (voce del brano) — sezione «Song details», secondo capoverso (rimanda a Wall 2013, che non ho letto)
- Estratto: «the final track recorded during the Powerage sessions»
- Riscontro: la voce Wikipedia di Powerage dice che la band «complied and recorded» il brano quando le prime stampe UK erano già pronte (rimanda a Engleheart 2008, non letto). La stessa voce annota che la prima stampa UK non conteneva il brano.
- Esito: CONFERMATA
- Correzione proposta: —

##### A3 — P1
- Affermazione: «nel marzo 1978»
- Fonte precisa: Wikipedia (voce del brano) — infobox, campo «Recorded», nota che rimanda a Wall (2013), non letto
- Estratto: «Recorded March 1978»
- Riserva: dato di una sola fonte terziaria con banner «needs more citations». Wikipedia (voce Powerage) dà per l'album «February – March 1978» e per le sessioni «about eight weeks» da gennaio 1978; Louder (Brannigan) dice che le sessioni iniziarono a gennaio 1978. Non contraddice il marzo, ma non lo conferma in modo indipendente.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: mantenere, oppure attribuire: «secondo la voce di Wikipedia, che si basa sulla biografia di Mick Wall, fu incisa nel marzo 1978». Se si vuole più prudenza: togliere il mese e scrivere «nel 1978, a sessioni dell'album già concluse».

##### A4 — P1
- Affermazione: «agli Albert Studios di Sydney»
- Fonte precisa: Wikipedia (voce del brano) — infobox, campo «Studio»
- Estratto: «Albert (Sydney)»
- Riscontro: Ultimate Classic Rock (Martin Kielty, 11/06/2023, https://ultimateclassicrock.com/ac-dc-rock-and-roll-damnation/) riporta Cliff Williams che parla degli Albert Studios di Sydney per le sessioni dell'album. Il luogo specifico dell'ultimo brano resta quello dell'infobox.
- Esito: CONFERMATA
- Correzione proposta: —

##### A5 — P1
- Affermazione: «La casa discografica americana»
- Fonte precisa: Wikipedia (voce del brano) — «Song details» — dice solo «the record company»; non specifica che fosse americana né nomina Atlantic.
- Estratto: «after the record company persuaded the band to go back into the studio»
- Esito: NON CONFERMATA (per le fonti citate). Vera per fonti alternative che ho aperto: Wikipedia, voce Powerage (https://en.wikipedia.org/wiki/Powerage): «Atlantic Records executives in the United States complained that the album did not contain a radio-friendly single». Louder (Paul Brannigan, https://www.loudersound.com/bands-artists/the-story-of-powerage-the-ac-dc-album-that-true-ac-dc-fans-love-best — la pagina è datata 9/04/2026 in cima, ma è una ripubblicazione: la voce Wikipedia la cita con data 5/08/2022): «a compromise, a nakedly transparent attempt to hand Atlantic a hit single». Ultimate Classic Rock (Kielty, 11/06/2023) dice che Atlantic non fu entusiasta della consegna dell'album e chiese di «sistemarlo» con un pezzo radiofonico.
- Correzione proposta: aggiungere fra le fonti la voce Wikipedia di Powerage e/o l'articolo di Kielty su Ultimate Classic Rock (ruolo: storia) e scrivere «La Atlantic Records, casa discografica americana della band, …»

##### A6 — P1
- Affermazione: «giudicando l'album privo di un pezzo adatto alla radio»
- Fonte precisa: Wikipedia (voce del brano) — dice che la casa discografica convinse la band a scrivere un singolo «radio-friendly»; il giudizio sull'album manca.
- Estratto: «come up with a radio-friendly single that could garner some airplay»
- Riscontro: la voce Powerage porta il giudizio esplicito («complained that the album did not contain a radio-friendly single»).
- Esito: CONFERMATA CON RISERVA (regge, ma nella fonte citata è implicito; il testo esplicito è in un'altra voce)
- Correzione proposta: citare la voce Powerage o l'articolo di Kielty. Nel testo va bene tenere la frase così com'è.

##### A7 — P1
- Affermazione: «convinse la band a tornare in studio per scrivere qualcosa di più orecchiabile»
- Fonte precisa: Wikipedia (voce del brano) — «Song details»
- Estratto: «persuaded the band to go back into the studio and come up with a radio-friendly single»
- Esito: CONFERMATA
- Correzione proposta: —

##### A8 — P1
- Affermazione: «battiti di mani e maracas» (presenti nel brano)
- Fonte precisa: Wikipedia (voce del brano) — «Song details»
- Estratto: «The song features handclaps and maracas and does not have a traditional guitar solo, unlike most other AC/DC songs.»
- Riscontro: Kielty (UCR 2023) riporta il tour manager Ian Jeffery che parla di tamburelli, maracas e shuffle.
- Esito: CONFERMATA
- Correzione proposta: —

##### A9 — P1
- Affermazione: «insolito nel catalogo di AC/DC — battiti di mani e maracas al posto del consueto assolo di chitarra, che qui manca del tutto»
- Fonte precisa: Wikipedia (voce del brano) — stesso capoverso; Kielty (UCR 2023) come fonte alternativa per «manca del tutto»
- Estratto: Wikipedia: «does not have a traditional guitar solo». Kielty: «a track that didn't even feature a guitar solo»
- Riserva: la fonte citata dice «traditional guitar solo» (attenuato) e non dice che le percussioni siano state messe «al posto» dell'assolo. «Manca del tutto» è sostenuto solo da Kielty, non citato. Non ho ascoltato il brano.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «il risultato è insolito nel catalogo di AC/DC: battiti di mani e maracas e, a differenza della maggior parte dei loro pezzi, nessun assolo di chitarra tradizionale».

##### A10 — P2
- Affermazione: «Fu il primo singolo della band a entrare in classifica nel Regno Unito»
- Fonte precisa: Wikipedia (voce del brano) — «Song details»
- Estratto: «giving the band its first charting single in the UK where it peaked at #24»
- Riscontro primario: Official Charts, pagina artista AC/DC (https://www.officialcharts.com/artist/16970/ac-dc/): la lista «AC/DC Hits» parte da questo titolo, prima entrata 10/06/1978, picco 24, 9 settimane. Seguono Highway to Hell (1979) e Touch Too Much (1980). Il titolo è indicizzato con grafia «Rock and Roll Damnation».
- Esito: CONFERMATA
- Correzione proposta: —

##### A11 — P2
- Affermazione: «raggiunse la posizione numero 24»
- Fonte precisa: Wikipedia (tabella Charts, «UK Singles (Official Charts) 24»); verificato su Official Charts: classifica del 9–15/07/1978, posizione 24 (settimana precedente 30, «Peak: 24, Weeks: 6»); pagina canzone: «Peak position 24», label Atlantic.
- Esito: CONFERMATA
- Correzione proposta: —

##### A12 — P2
- Affermazione: «18 nei Paesi Bassi»
- Fonte precisa: Wikipedia (tabella Charts, «Netherlands (Single Top 100) 18»); verificato su dutchcharts.nl (archivio Wayback 2023): entrata 14/10/1978 al 22, picco 18 il 21/10/1978, 7 settimane.
- Esito: CONFERMATA
- Correzione proposta: —

##### A13 — P2
- Affermazione: «21 in Belgio»
- Fonte precisa: Wikipedia (tabella Charts): «Belgium (Ultratop 50 Flanders) 21». Ultratop.be (archivio Wayback): picco 21 (1 settimana), entrata 21/10/1978 al 28, 3 settimane; il dato è marcato «(V)» cioè fiammingo.
- Riserva: è la classifica delle Fiandre, non del Belgio; non risulta una posizione in quella vallona.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «21 nelle Fiandre (Belgio)»

##### A14 — P2
- Affermazione: «Ultimate Classic Rock ha descritto l'intero album "Powerage" come un disco di transizione tra "Let There Be Rock" e "Highway to Hell"»
- Fonte precisa: Ultimate Classic Rock — https://ultimateclassicrock.com/acdc-powerage/ — ultimo capoverso. Autore Sterling Whitaker. Pagina della testata Townsquare (non Future plc). La data in cima è «Updated: May 25, 2023» (datePublished 25/05/2023), ma la versione originale è del 25/05/2013, titolo «35 Years Ago: AC/DC's 'Powerage' Album Released» (letta su Wayback, snapshot 8/06/2013). Il testo rilevante è identico nelle due versioni.
- Estratto: «perhaps most significant as the transitional record between Let There Be Rock and Highway to Hell»
- Esito: CONFERMATA
- Correzione proposta: — (se si riporta la data, è 2013; il titolo attuale è «Why AC/DC's Transitional 'Powerage' LP has Grown in Stature»)

##### A15 — P2
- Affermazione: «elogiato nel tempo da musicisti come Keith Richards ed Eddie Van Halen»
- Fonte precisa: Ultimate Classic Rock (stesso articolo) — ultimo capoverso
- Estratto: «its legend has grown over time, with rockers from Keith Richards to Eddie Van Halen praising it»
- Note: è un'affermazione della testata, senza rimando a interviste. Riscontri indipendenti che ho aperto: Wikipedia, voce Powerage: «Eddie Van Halen and Keith Richards have stated that Powerage remains their favourite AC/DC record». Far Out Magazine (faroutmagazine.co.uk/the-ac-dc-song-that-eddie-van-halen-loved/) riporta Van Halen su Powerage e un suo commento del 2015 a Billboard su un altro brano dell'album. Non ho aperto la fonte primaria di Richards.
- Esito: CONFERMATA
- Correzione proposta: —

##### A16 — P2
- Affermazione: «che lo hanno indicato fra i loro AC/DC preferiti»
- Fonte precisa: Ultimate Classic Rock (stesso articolo)
- Estratto: «praising it as one of their favorite AC/DC outings»
- Esito: CONFERMATA
- Correzione proposta: —

##### A17 — P2
- Affermazione: «pur non contenendo un singolo di grande impatto commerciale»
- Fonte precisa: Ultimate Classic Rock (stesso articolo), secondo capoverso
- Estratto: «it doesn't have a standout single»
- Riserva: «standout single» è «un singolo che spicca», non «di grande impatto commerciale». La formulazione della scheda è più forte e di significato diverso. Inoltre convive con A10-A11, dove il disco ha un singolo entrato in classifica: non è contraddittorio, ma il lettore può inciampare.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «pur non contenendo, secondo la testata, un singolo che si staccasse dal resto»

##### A18 — Frase iconica
- Affermazione: «l'assenza dell'assolo di chitarra atteso in un brano AC/DC, sostituito da battiti di mani e maracas»
- Fonte precisa: come A9 (Wikipedia; Kielty UCR 2023)
- Estratto: «does not have a traditional guitar solo, unlike most other AC/DC songs»
- Riserva: come A9: «sostituito da» è un'inferenza, la fonte elenca soltanto le due caratteristiche.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: vedi sotto (testo sostitutivo della frase iconica).

##### A19 — Frase iconica
- Affermazione: «Il momento più ricordato è proprio l'assenza dell'assolo»
- Fonte precisa: nessuna fonte citata né trovata. Nessuna pagina che ho letto dice che questo sia «il momento più ricordato» del brano. Wikipedia si limita a dire che il brano non ha un assolo tradizionale.
- Estratto: non letto: l'affermazione non compare da nessuna parte.
- Esito: NON CONFERMATA
- Correzione proposta: togliere il superlativo (vedi testo sostitutivo).

##### A20 — Frase iconica
- Affermazione: «una scelta commerciale»
- Fonte precisa: nessuna fonte dice che l'assenza dell'assolo (o le percussioni) fu una scelta commerciale. È documentato che il brano nel suo insieme nacque per dare un singolo radiofonico all'etichetta: Louder, «a compromise, a nakedly transparent attempt to hand Atlantic a hit single»; Wikipedia, «radio-friendly single». Il giudizio del tour manager Ian Jeffery su tamburelli e maracas (Kielty, UCR) è un parere negativo, non una spiegazione della scelta.
- Esito: NON CONFERMATA
- Correzione proposta: togliere il nesso causale sull'assolo; tenere il carattere commerciale del brano (documentato).

##### A21 — Frase iconica
- Affermazione: «diventata, con gli anni, uno dei tratti distintivi del pezzo»
- Fonte precisa: nessuna. Nessuna pagina letta descrive l'assenza dell'assolo come tratto distintivo né ricostruisce una rivalutazione nel tempo del brano. La rivalutazione nel tempo riguarda, in UCR, l'album («its legend has grown over time»).
- Esito: NON CONFERMATA
- Correzione proposta: togliere (vedi testo sostitutivo).

**Testo sostitutivo proposto per la frase iconica (nessun verso, solo fatti documentati):**
«Il tratto più insolito del brano è l'assenza di un assolo di chitarra tradizionale, rara in un pezzo di AC/DC, con battiti di mani e maracas a caratterizzarne il suono: un singolo nato su richiesta dell'etichetta per portare la band alla radio.»
(Fonti: Wikipedia voce del brano per assolo, mani e maracas; Wikipedia voce Powerage / Louder per la richiesta di Atlantic.)

##### A22 — Metadati
- Affermazione: anno 1978
- Fonte precisa: Wikipedia (voce del brano): singolo uscito il 26/05/1978 (UK); Official Charts: prima entrata il 10/06/1978; Wikipedia Powerage: album uscito 5/05/1978 (UK) e 25/05/1978 (USA); UCR dà il 25/05/1978.
- Esito: CONFERMATA (singolo e album sono entrambi del 1978)
- Correzione proposta: —

##### A23 — Metadati
- Affermazione: album «Powerage»
- Fonte precisa: Wikipedia (voce del brano) — «from the album Powerage», prima traccia dell'album standard. È l'album originale (non una raccolta). Nota: la prima stampa UK non conteneva il brano; entrò nelle stampe successive (Wikipedia).
- Esito: CONFERMATA
- Correzione proposta: —

##### A24 — Metadati (ascoltiTesto)
- Affermazione: «40 mln ascolti»
- Fonte precisa: kworb.net — la pagina citata (https://kworb.net/spotify/) è la home generica, che non contiene il dato. Ho letto la pagina artista https://kworb.net/spotify/artist/711MCceyCBcFnzjGY4Q7Un_songs.html («AC/DC - Spotify Top Songs», «Last updated: 2026/09/20»): riga con link al track ID 2308VPPaMh7Q3AX1Zap99A.
- Estratto: non testo: valore letto 40.576.063 stream totali, 12.759 giornalieri (20/09/2026).
- Riserva: 40,58 mln arrotondato sarebbe 41 mln; «40 mln» regge solo come troncamento. La versione «Live at the Apollo» è una riga separata (3,2 mln) e non è inclusa.
- Esito: CONFERMATA CON RISERVA
- Correzione proposta: «oltre 40 mln ascolti» (regge anche a crescita del dato); e citare fra le fonti la pagina artista di kworb invece della home.

#### Controlli sui metadati e sui link
- anno: 1978 — vale sia per l'album sia per il singolo (26/05/1978 UK).
- album: Powerage — corretto (album originale).
- ascolti kworb: 40.576.063 letti il 21/09/2026 (dato aggiornato al 20/09/2026), vedi A24.
- spotifyId 2308VPPaMh7Q3AX1Zap99A: oEmbed risponde, titolo «Rock 'N' Roll Damnation». L'oEmbed non dà artista/album, ma lo stesso ID è la riga AC/DC su kworb: coerente.
- testoUrl https://www.letras.com/ac-dc/97697/: HTTP 200, titolo pagina «ROCK 'N' ROLL DAMNATION - AC/DC - LETRAS.COM»: è la canzone giusta. Non ne ho letto il testo.
- Stato HTTP fonti citate: Wikipedia 200; Ultimate Classic Rock (`acdc-powerage`) 200; kworb.net/spotify/ 200 (home generica, senza il dato del brano).
- Altre pagine aperte per il controllo: Official Charts (200), Wayback di dutchcharts.nl e ultratop.be (200; gli originali danno 403), Louder (200), UCR «Why AC/DC Had to Add…» (200), Wikipedia Powerage (200).
- Trappola delle date: la fonte UCR citata non è Future plc ma Townsquare; la data in cima (25/05/2023) è di aggiornamento, l'originale è del 25/05/2013. Louder, invece, è Future plc: la data in cima (9/04/2026) è di ripubblicazione (originale citato: 5/08/2022).
- R9: formazione all'epoca (Wikipedia, voce del brano, Personnel): Bon Scott, Angus Young, Malcolm Young, Cliff Williams, Phil Rudd; produttori Harry Vanda e George Young (infobox; Ultratop). La scheda non nomina formazione né produttori: nessun errore.

#### Omissioni rilevanti (solo se cambiano il senso)
- La storia raccontata in P1 è sostenuta soltanto dalla voce Wikipedia. Esiste un articolo di Ultimate Classic Rock molto più preciso su questo punto, che potrebbe sostituire il rimando generico ad A14: Martin Kielty, «Why AC/DC Had to Add 'Rock 'n' Roll Damnation' to 'Powerage'», 11/06/2023, https://ultimateclassicrock.com/ac-dc-rock-and-roll-damnation/ (dice fra l'altro che il brano portò AC/DC alla prima entrata in classifica il 10/06/1978; attribuisce a Ian Jeffery, tour manager, il ricordo che la band cedette ad Atlantic solo due volte; riporta Malcolm Young nel 1992 su quel brano in classifica). Nota: quell'articolo chiama Powerage «fourth album», ma è il quinto disco internazionale (Wikipedia): non citarlo per questo.
- Il brano venne aggiunto quando le prime stampe UK dell'album erano già pronte (Wikipedia, voce Powerage): spiega perché non era nella prima stampa UK. Non cambia il senso della scheda ma chiarisce «ultimo brano inciso».


---

## A.20 — Azzurro (Adriano Celentano) · `canzone/azzurro/`

### Esito — Azzurro (Adriano Celentano)
Pagina: canzone/azzurro/ — verificata il 21/09/2026 — priorità: 26 impressioni (posizione media 13,7)

#### Riepilogo
- Affermazioni esaminate: 23 — CONFERMATA 5, CON RISERVA 7, NON CONFERMATA 10, CONTRADDETTA 1, NON DOCUMENTABILE 0
- Difetti in ordine di gravità:
  1. A18 — «Conte la arrangiò»: CONTRADDETTA. Rockol e Wikipedia italiana attribuiscono l'arrangiamento a Nando De Luca; Conte è l'autore della musica.
  2. A19/A20 — «tre mandolini per evocare un suono rurale e assolato»: nessuna fonte (citata o cercata altrove) lo contiene. Dettaglio inventato o non documentabile.
  3. A22/A23 (con A21) — «resistenza da critica e radio per il suo carattere malinconico»: Rockol riporta parole di Conte che parlano di «levata di scudi» perché il pezzo andava controcorrente rispetto ai ritmi dell'epoca (una marcetta). Non parla di critica, né di radio, né di malinconia come causa.
  4. A15 — «domenica d'estate» nella frase iconica: contraddice il «pomeriggio d'estate» di P1 e non compare nel testo (Letras, zero occorrenze) né nelle fonti citate.
  5. A11 — «singolo più venduto dell'anno»: nessuna fonte citata lo dice (Rockol: n.1 a settembre, un milione di copie dichiarato da Celentano). Vero secondo la classifica annuale di Hit Parade Italia (fonte alternativa).
  6. A6, A16, A17 — trama (amata partita, ricordi d'infanzia all'oratorio): nessuna delle tre fonti citate la contiene; sono supportate solo dal testo stesso (Letras).
  7. A12 — «il verso più citato»: superlativo senza fonte.
- Cosa non sono riuscito a documentare: i tre mandolini e il «suono rurale e assolato»; la data e la sede in cui Conte disse le parole riportate da Rockol (Rockol non le data né dice a chi furono dette); il conteggio di stream della specifica traccia «Azzurro - Remastered» (kworb non la elenca separatamente).
- Sospetto verso nella frase iconica: no, nessun verso riprodotto fra virgolette. Riserva: la frase descrive due versi (uno sul cercare l'estate tutto l'anno, uno con «improvviso») con parole molto vicine a quelle del testo («tutto l'anno», «estate», «improvviso»). È una parafrasi troppo aderente: conviene allontanarla (vedi A13).

#### Affermazioni

##### A1 — Metadati (anno)
- Affermazione: anno 1968
- Fonte precisa: Wikipedia (en) — https://en.wikipedia.org/wiki/Azzurro — infobox — pagina viva (ultimo riferimento del 2025); Rockol — riga di apertura dell'articolo, data vera 05/09/2021
- Estratto: «Released May 1968» (Wikipedia en, infobox); Rockol: «“Azzurro”: 1968, V.Pallavicini-P.Conte, Ed. Clan»
- Esito: CONFERMATA (anno del singolo e dell'album originale, maggio 1968; it.wikipedia «Azzurro/Una carezza in un pugno» concorda)
- Correzione proposta: —

##### A2 — Metadati (album)
- Affermazione: album «Azzurro / Una carezza in un pugno»
- Fonte precisa: Wikipedia en (infobox: «Una carezza in un pugno – Azzurro»); it.wikipedia https://it.wikipedia.org/wiki/Azzurro/Una_carezza_in_un_pugno (album omonimo dello stesso anno, oltre al 45 giri)
- Estratto: «non letto» come citazione: dato di infobox. it.wiki: singolo e album omonimo «pubblicato nello stesso anno»
- Esito: CONFERMATA (l'ordine dei due titoli varia da una fonte all'altra; l'album è l'originale, non una raccolta)
- Correzione proposta: —

##### A3 — Metadati (ascoltiTesto)
- Affermazione: «78,4 mln ascolti»
- Fonte precisa: kworb.net — pagina artista https://kworb.net/spotify/artist/1yq9UuPp5DIb5w6eswGbKV_songs.html (l'URL citato, https://kworb.net/spotify/, è solo l'indice generale) — letta il 21/09/2026, aggiornata al 20/09/2026
- Estratto: riga «Azzurro» = 81.948.754 stream totali, 42.748 al giorno (traccia 4ojJW6Uc3jiy20tMb8OVBV)
- Esito: CONFERMATA CON RISERVA. Il dato pubblicato (78,4 M) è inferiore di circa 3,5 M al valore di oggi (a 42 mila al giorno sono circa 80 giorni: coerente con una lettura più vecchia). Inoltre la riga kworb è una traccia diversa dallo spotifyId della scheda («Azzurro - Remastered»), che nella pagina artista di kworb non compare separatamente. Il numero non è riferibile con certezza a quell'ID.
- Correzione proposta: aggiornare a «circa 82 mln ascolti» (20/09/2026) e, se l'ID resta quello della versione remastered, dichiarare la fonte del dato oppure passare all'ID 4ojJW6Uc3jiy20tMb8OVBV che kworb elenca. Cambiare il link della fonte con la pagina artista.

##### A4 — P1
- Affermazione: «Scritta da Paolo Conte (musica) e Vito Pallavicini (testo)»
- Fonte precisa: Rockol — riga di apertura («V.Pallavicini-P.Conte», senza ripartizione); Wikipedia en — incipit: compositori Conte, Pallavicini e Michele Virano; it.wikipedia «Azzurro/Una carezza in un pugno», tracce: testo Pallavicini, musica Conte e Virano (nota: presso la SIAE Virano non risulta firmatario)
- Estratto: Wikipedia en: «composed by Paolo Conte, Vito Pallavicini and Michele Virano»
- Esito: CONFERMATA CON RISERVA. Le due fonti citate non attribuiscono musica a Conte e testo a Pallavicini; la ripartizione è solo in it.wikipedia (non citata). Wikipedia en cita anche Virano. Le fonti divergono sui crediti (R5).
- Correzione proposta: «Scritta da Vito Pallavicini (testo) e Paolo Conte (musica); alcune fonti, come Wikipedia, citano anche Michele Virano tra gli autori della musica.» Aggiungere it.wikipedia fra le fonti, oppure scrivere solo «Scritta da Paolo Conte e Vito Pallavicini».

##### A5 — P1
- Affermazione: «racconta la malinconia di un uomo che osserva il mondo dalla propria solitudine ... lasciandolo solo in città durante ... d'estate»
- Fonte precisa: Rockol — 2º paragrafo del corpo; Wikipedia en — sezione principale
- Estratto: Rockol: «un brano che parla d'estate, ma non al mare: in città, dove si aggira un uomo»; Wikipedia en: «describes a lonely summer in the city»
- Esito: CONFERMATA CON RISERVA. Uomo solo in città in estate: confermato. «Malinconia» e «osserva il mondo dalla propria solitudine» sono interpretazione della scheda; Rockol parla di un uomo che vorrebbe evadere, frustrato da desideri e pensieri.
- Correzione proposta: nessuna obbligatoria; per prudenza: «racconta un uomo rimasto solo in città d'estate, frustrato e con la testa altrove».

##### A6 — P1
- Affermazione: «la persona amata è partita per il mare»
- Fonte precisa: nessuna delle fonti citate. Rockol dice soltanto «non al mare: in città». Wikipedia en: «lonely summer in the city». Il testo (Letras, https://www.letras.com/adriano-celentano/azzurro/ , che redirige a /7266/) contiene un verso in cui si dice che lei è andata via per la villeggiatura (non la parola «mare», assente in tutto il testo).
- Estratto: non letto: le fonti citate non lo contengono
- Esito: NON CONFERMATA (dalle fonti citate). Fonte alternativa: testo su Letras (livello C: primo materiale, ma solo la canzone stessa).
- Correzione proposta: «dopo che la persona amata è partita per le vacanze estive» e aggiungere Letras/testo come fonte di questo dettaglio; oppure togliere il dettaglio.

##### A7 — P1
- Affermazione: «durante un pomeriggio d'estate»
- Fonte precisa: Wikipedia en — sezione «Lyrics», riporta l'attacco del ritornello che contiene la parola «pomeriggio»; testo su Letras (la parola compare più volte)
- Estratto: non riportato (sono parole cantate)
- Esito: CONFERMATA (dal testo)
- Correzione proposta: — (ma vedi A15: la frase iconica dice «domenica»)

##### A8 — P2
- Affermazione: «Nonostante la scarsa promozione iniziale»
- Fonte precisa: Rockol — paragrafo 3 — data vera 05/09/2021
- Estratto: «Nonostante la mancanza di promozione, il 15 giugno 1968 il disco entra in classifica»
- Esito: CONFERMATA CON RISERVA. Rockol dice «mancanza di promozione» per tutta l'estate (Celentano impegnato nelle riprese di «Serafino» di Germi, assente da Disco per l'estate e Cantagiro), non una promozione scarsa «iniziale».
- Correzione proposta: «Nonostante la mancanza di promozione (Celentano passò l'estate sul set del film «Serafino»),»

##### A9 — P2
- Affermazione: «entrò in classifica il 15 giugno 1968»
- Fonte precisa: Rockol — paragrafo 3; riscontro: it.wikipedia «Azzurro/Una carezza in un pugno», tabella dalla classifica settimanale di Hit Parade Italia (15 giugno: posizione 9)
- Estratto: «il 15 giugno 1968 il disco entra in classifica»
- Esito: CONFERMATA
- Correzione proposta: —

##### A10 — P2
- Affermazione: «vi rimase per tutta l'estate»
- Fonte precisa: Rockol — paragrafo 3
- Estratto: «per tutta l'estate rimarrà nelle prime dieci posizioni»
- Esito: CONFERMATA (Rockol: n.1 a settembre, in vetta fino al 5 ottobre, fuori dai primi dieci il 16 novembre; it.wiki: 22 settimane, 4 al primo posto)
- Correzione proposta: — (facoltativo: precisare «nella top ten»)

##### A11 — P2
- Affermazione: «risultando il singolo più venduto dell'anno in Italia»
- Fonte precisa: nessuna delle fonti citate. Rockol: arrivò al n.1 e Celentano dichiarò un milione di copie; Wikipedia en: solo «Italy #1». Fonte alternativa letta: Hit Parade Italia, «Top Annuale Singoli 1968», https://www.hitparadeitalia.it/hp_yends/hpe1968.htm (livello B: ricostruzione annuale da classifiche settimanali, non cifre di vendita); ripresa da it.wikipedia («Alla fine del 1968 sarà il singolo più venduto dell'anno»).
- Estratto: Hit Parade Italia: prima riga dell'elenco «Azzurro - Adriano Celentano [#1, 1968/69]»
- Esito: NON CONFERMATA (dalle fonti citate); confermata dalla fonte alternativa.
- Correzione proposta: «e nella classifica annuale del 1968 di Hit Parade Italia risulta il singolo più venduto dell'anno in Italia» e aggiungere la fonte https://www.hitparadeitalia.it/hp_yends/hpe1968.htm. Per la cifra, attribuire: «Celentano dichiarò all'epoca che aveva già raggiunto il milione di copie (secondo Rockol)».

##### A12 — Frase iconica
- Affermazione: «Il verso più citato è quello in cui il narratore ammette di passare tutto l'anno a inseguire la sensazione dell'estate»
- Fonte precisa: nessuna. Wikipedia en cita come verso emblematico l'attacco del ritornello, non questo.
- Estratto: non letto: nessuna fonte
- Esito: NON CONFERMATA («più citato» non ha fonte; il ritornello è di fatto la parte più nota)
- Correzione proposta: togliere «più citato» e sostituire con una descrizione neutra: «In un verso l'uomo dice di cercare l'estate per un anno intero, e di ritrovarsela a un tratto» (meglio ancora: descrivere il ritornello, con la sua sensazione di pomeriggio lungo e azzurro, senza citarlo).

##### A13 — Frase iconica
- Affermazione: il narratore «passa tutto l'anno a inseguire la sensazione dell'estate, che arriva all'improvviso e inaspettata»
- Fonte precisa: testo su Letras (testoFonte): esistono due versi, uno con «estate» e «tutto l'anno», uno con «improvviso».
- Estratto: non riportato (parole cantate)
- Esito: CONFERMATA CON RISERVA (contenuto fedele al testo; «inaspettata» è un'aggiunta; parafrasi troppo vicina alle parole originali)
- Correzione proposta: allontanare la parafrasi: «Il tratto più riconoscibile è la sua idea fissa: l'estate, cercata senza sosta, sembra concedersi solo di sorpresa.» Nessun verso citato.

##### A14 — Frase iconica
- Affermazione: «Scritta da Paolo Conte (musica) e Vito Pallavicini (testo)»
- Fonte precisa: vedi A4
- Estratto: vedi A4
- Esito: CONFERMATA CON RISERVA (stessa riserva di A4)
- Correzione proposta: come A4.

##### A15 — Frase iconica
- Affermazione: «un uomo solo in città in una domenica d'estate»
- Fonte precisa: Rockol e Wikipedia en confermano «solo in città d'estate». «Domenica»: nelle fonti citate non compare; nel testo (Letras) la parola «domenica» ha zero occorrenze.
- Estratto: non letto: assente
- Esito: NON CONFERMATA («domenica»). In più contraddice il «pomeriggio d'estate» di P1.
- Correzione proposta: «un uomo solo in città in un pomeriggio d'estate».

##### A16 — Frase iconica
- Affermazione: «che pensa all'amata lontana»
- Fonte precisa: nessuna delle fonti citate. Fonte alternativa: testo (Letras): un verso dice che lei è partita.
- Estratto: non letto: le fonti citate non lo contengono
- Esito: NON CONFERMATA
- Correzione proposta: aggiungere il testo come fonte del dato, oppure attribuire a ACfans (https://www.acfans.it/blog/news-e-segnalazioni/68-azzurro-di-celentano-il-45-giri-piu-venduto/, livello C, blog di fan): «secondo ACfans, la ragazza è partita per le vacanze».

##### A17 — Frase iconica
- Affermazione: «scivola in ricordi nostalgici d'infanzia trascorsa all'oratorio»
- Fonte precisa: nessuna delle fonti citate. Testo (Letras): un verso contiene «oratorio». ACfans (non citato, livello C) parla dei «tempi dell'oratorio».
- Estratto: non letto: le fonti citate non lo contengono
- Esito: NON CONFERMATA (dalle fonti citate); il riferimento all'oratorio è nel testo
- Correzione proposta: «e nella memoria affiorano i tempi dell'oratorio» con il testo come fonte; togliere «nostalgici d'infanzia» o attribuire.

##### A18 — Frase iconica
- Affermazione: «Conte la arrangiò»
- Fonte precisa: Rockol — riga in apertura e paragrafo 4; it.wikipedia «Azzurro/Una carezza in un pugno» (scheda tracce: «Arrangiamento, orchestra e direzione d'orchestra di Nando de Luca»); it.wikipedia «Azzurro (brano musicale)»
- Estratto: Rockol: «un arrangiamento migliore di quello di Nando De Luca (ex batterista di Luigi Tenco)»; it.wiki: «arrangiamento orchestrale di Nando de Luca originale e moderno»
- Esito: CONTRADDETTA (Conte compose la musica; l'arrangiamento del 1968 è di Nando De Luca. Conte fece un arrangiamento pianistico ed essenziale solo nella versione in studio del 1998, secondo Rockol)
- Correzione proposta: «L'arrangiamento orchestrale di Nando De Luca ...» oppure togliere la frase.

##### A19 — Frase iconica
- Affermazione: «con tre mandolini»
- Fonte precisa: nessuna. Cercati Rockol, Wikipedia en, it.wikipedia (voce del brano e del singolo), ACfans, Discogs, InsideMusic e due ricerche web: nessuna menzione di mandolini.
- Estratto: non letto: assente in ogni fonte cercata
- Esito: NON CONFERMATA
- Correzione proposta: togliere la frase. Se si vuole descrivere il suono, usare la testimonianza di Conte riportata da Rockol: «una marcetta» («una specie di marcetta», it.wikipedia).

##### A20 — Frase iconica
- Affermazione: «per evocare un suono rurale e assolato»
- Fonte precisa: nessuna
- Estratto: non letto: assente
- Esito: NON CONFERMATA (attribuzione di un'intenzione artistica non documentata)
- Correzione proposta: togliere.

##### A21 — Frase iconica
- Affermazione: «incontrò inizialmente resistenza»
- Fonte precisa: Rockol — ultimi paragrafi — data vera 05/09/2021; il genere è una rubrica «L'approfondimento» (non un'intervista): le parole di Conte sono riportate senza dire dove né a chi furono dette.
- Estratto: Conte: «Quando uscì ... ci fu una levata di scudi perché andava controcorrente rispetto ai ritmi dell'epoca»
- Esito: CONFERMATA CON RISERVA (è un ricordo di Conte, non un fatto documentato; nella scheda è scritto come fatto; Conte aggiunge che il pubblico lo capì)
- Correzione proposta: «Secondo Paolo Conte, che ne parla in un ricordo riportato da Rockol, all'uscita ci fu una levata di scudi perché il pezzo andava controcorrente rispetto ai ritmi dell'epoca; il pubblico però lo capì.»

##### A22 — Frase iconica
- Affermazione: «resistenza da critica e radio»
- Fonte precisa: Rockol (stesso passo di A21)
- Estratto: Conte: «Sogghignarono in molti» (nessun accenno a critica o radio)
- Esito: NON CONFERMATA (Rockol non nomina né la critica né la radio)
- Correzione proposta: togliere «da critica e radio»; scrivere «da parte di molti».

##### A23 — Frase iconica
- Affermazione: «proprio per il suo carattere malinconico, lontano dalle tendenze pop allegre dell'epoca»
- Fonte precisa: Rockol (stesso passo)
- Estratto: Conte: «andava controcorrente rispetto ai ritmi dell'epoca»; il pezzo è per lui «una marcetta»
- Esito: NON CONFERMATA (la causa indicata da Conte è il ritmo/genere controcorrente, non la malinconia; «pop allegre» non c'è)
- Correzione proposta: «perché, per il suo ritmo di marcetta, andava controcorrente rispetto ai suoni dell'epoca».

#### Controlli sui metadati e sui link
- anno: 1968 = anno del singolo (maggio 1968). OK.
- album: album originale del 1968; la traccia Spotify indicata è però la «Remastered» (pagina Spotify: 2015), su un'altra pubblicazione. Non un problema per «anno/album» della scheda, ma i due dati riguardano versioni diverse.
- ascoltiTesto: kworb, riga «Azzurro» (traccia 4ojJW6Uc3jiy20tMb8OVBV): 81.948.754, letto il 21/09/2026 (aggiornamento kworb 20/09/2026). Il 78,4 M pubblicato non regge oggi (vedi A3); la traccia della scheda non è elencata da kworb come riga a sé.
- spotifyId 1P0ssjuKbd4vxmtpomTJtQ: oEmbed risponde; titolo restituito «Azzurro - Remastered». Brano giusto.
- testoUrl https://www.letras.com/adriano-celentano/azzurro/: 307 verso /adriano-celentano/7266/, poi 200; pagina del testo di «Azzurro» (autori indicati: Vito Pallavicini, Paolo Conte). OK.
- Stato HTTP delle fonti: Wikipedia en 200 (ok); Rockol 200 (ok, data 05/09/2021, autore Franco Zanetti); kworb.net/spotify/ 200 (ok, ma è un indice: non contiene il dato per «Azzurro»).

#### Omissioni rilevanti (solo se cambiano il senso)
- L'arrangiamento del 1968 è di Nando De Luca (Rockol; it.wikipedia). Se la scheda parla di arrangiamento va detto.
- Michele Virano è accreditato fra gli autori della musica da Wikipedia en e it.wikipedia (ma non risulta alla SIAE): i crediti sono discussi (vedi A4).
- Il contesto di Rockol spiega perché il successo fu sorprendente: Celentano non presentò il pezzo né al Disco per l'estate né al Cantagiro ed era sul set di «Serafino». La scheda lo tocca solo in modo vago in P2. Nessuna delle fonti afferma una partecipazione a Sanremo: la scheda non ne parla, correttamente.
- [Nota del coordinatore: segnalazione errata dell'agente. Ogni pagina ha una meta description, generata dalla prima frase di P1 quando `descrizioneSeo` non è compilata; nessun difetto. Scrivere `descrizioneSeo` a mano è facoltativo.]


---

# Allegato B — Controlli meccanici uniformi (eseguiti il 21/09/2026)

Stato HTTP di ogni fonte citata (GET con user agent da browser, redirect seguiti), risposta oEmbed di Spotify per lo `spotifyId` e pagina del testo (`testoUrl`). Uno stato ≠ 200 non significa pagina morta: molti siti rispondono 403/406 a richieste automatiche (vedi note degli esiti, che hanno riprovato con browser o web.archive.org).


**1. `whats-my-age-again`** — Spotify `4LJhJ6DQS7NwE7UKtvcM52` → oEmbed 200, titolo «What's My Age Again?»; testo: 200, «WHAT'S MY AGE AGAIN? - blink-182 - LETRAS.COM»
- 200 · NME · `https://www.nme.com/news/music/mark-hoppus-green-day-inspired-intro-to-blink-182-whats-my-age-again-2793676`
- 200 · Billboard · `https://www.billboard.com/music/rock/blink-182-green-day-song-inspired-whats-my-age-again-9469620/`
- 200 · The Ringer · `https://www.theringer.com/2019/07/31/music/blink-182-enema-of-the-state`
- 200 · Wikipedia (EN) — scheda del singolo · `https://en.wikipedia.org/wiki/What's_My_Age_Again%3F`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/artist/6FBDaR13swtiWwGhX1WQsP_songs.html`

**2. `dont-look-back-in-anger`** — Spotify `7ppPZa3TRUSGKaks9wH7VT` → oEmbed 200, titolo «Don't Look Back In Anger»; testo: 200, «DON'T LOOK BACK IN ANGER - Oasis - LETRAS.COM»
- 200 · Songfacts (cita un'intervista di Gallagher a Uncut) · `https://www.songfacts.com/facts/oasis/dont-look-back-in-anger`
- 200 · Radio X — Jenny Mensah (cita un'intervista di Gallagher a NP · `https://www.radiox.co.uk/artists/oasis/dont-look-back-in-anger-single-story-meaning-lyrics/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/artist/2DaxqgrOhkeH0fpeiQq2f4_songs.html`

**3. `fuori-dal-tunnel`** — Spotify `2oBXn8htpoyjRqrkIGGm0a` → oEmbed 200, titolo «Fuori Dal Tunnel»; testo: 200, «FUORI DAL TUNNEL - Caparezza - LETRAS.COM»
- 200 · Wikipedia · `https://it.wikipedia.org/wiki/Verit%C3%A0_supposte`
- 200 · LaScimmiaPensa · `https://www.lascimmiapensa.com/2021/08/12/caparezza-fuori-dal-tunnel-significato/`
- 200 · Rockol, 29 giugno 2022, di Mattia Marzi · `https://www.rockol.it/news-730993/caparezza-fuori-dal-tunnel-non-l-ho-cantata-per-anni`
- 200 · OndaRock, intervista di Claudio Fabretti, 13 dicembre 2018 · `https://www.ondarock.it/interviste/caparezza/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**4. `la-regola-dell-amico`** — Spotify `2ITCAQv2kjkynej77nx15r` → oEmbed 200, titolo «La regola dell'amico»; testo: 200, «LA REGOLLA DELL'AMICO - 883 - LETRAS.COM»
- 200 · Rockol — Franco Zanetti · `https://www.rockol.it/news-715988/pino-daniele-vince-il-festivalbar-1997`
- 200 · Recensiamo Musica — Nico Donvito, 18 agosto 2026 · `https://recensiamomusica.com/festivalbar-1997-i-protagonisti-e-le-canzoni-della-trentaquattresima-edizione/`
- 200 · Wikipedia (voce del brano) · `https://it.wikipedia.org/wiki/La_regola_dell%27amico`
- 200 · Wikipedia (voce dell'album) · `https://it.wikipedia.org/wiki/La_dura_legge_del_gol!`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**5. `hey-brother`** — Spotify `4lhqb6JvbHId48OUJGwymk` → oEmbed 200, titolo «Hey Brother»; testo: 200, «HEY BROTHER - Avicii - LETRAS.COM»
- 200 · Bluegrass Today, 27 febbraio 2014, di Aaron Keith Harris · `https://bluegrasstoday.com/hey-brother-takes-tyminski-to-edm-charts/`
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/Hey_Brother`

**6. `urlando-contro-il-cielo`** — Spotify `1wx5hbovwZoPeTUom8cuQ4` → oEmbed 200, titolo «Urlando contro il cielo»; testo: 200, «URLANDO CONTRO IL CIELO - Luciano Ligabue - LETRAS.COM»
- 200 · Sky TG24 · `https://tg24.sky.it/spettacolo/approfondimenti/ligabue-canzoni-foto`
- 200 · OndaRock · `https://www.ondarock.it/monografie/ligabue/`
- 200 · Wikipedia (voce del brano) · `https://it.wikipedia.org/wiki/Urlando_contro_il_cielo`
- 200 · Wikipedia (voce dell'album) · `https://it.wikipedia.org/wiki/Lambrusco_coltelli_rose_%26_pop_corn`
- 200 · Solo Belle Canzoni · `https://solobellecanzoni.altervista.org/urlando-contro-il-cielo-ligabue/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**7. `vivo-per-lei`** — Spotify `6cPLCU7hKjgjvLWzCevl7R` → oEmbed 200, titolo «Vivo per lei»; testo: 200, «VIVO PER LEI (PART. GIORGIA) - Andrea Bocelli - LETRAS.COM»
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/Vivo_per_lei`
- 200 · Wikipedia (IT) · `https://it.wikipedia.org/wiki/Vivo_per_lei`
- 200 · Wikipedia (voce O.R.O.) · `https://it.wikipedia.org/wiki/O.R.O.`
- 200 · Sky TG24, 22 gennaio 2025 · `https://tg24.sky.it/spettacolo/musica/2025/01/22/gatto-panceri`
- 200 · Donna Glamour · `https://www.donnaglamour.it/vivo-per-lei-andrea-bocelli-significato/lifestyle/`

**8. `man-in-the-box`** — Spotify `6gZVQvQZOFpzIy3HblJ20F` → oEmbed 200, titolo «Man in the Box»; testo: 200, «MAN IN THE BOX - Alice In Chains - LETRAS.COM»
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/Man_in_the_Box`
- 200 · American Songwriter · `https://americansongwriter.com/the-peta-approved-meaning-behind-alice-in-chains-man-in-the-box/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**9. `yes-i-know-my-way`** — Spotify `0HVvtZhPgnuR2Nia1x8zUX` → oEmbed 200, titolo «Yes I Know My Way - 2021 Remaster»; testo: 200, «YES I KNOW MY WAY - Pino Daniele - LETRAS.COM»
- 200 · Wikipedia · `https://it.wikipedia.org/wiki/Yes_I_Know_My_Way_(brano_musicale)`
- 200 · Sito ufficiale di Pino Daniele — "Vai mo'" (1981) · `https://www.pinodaniele.com/music/vai-mo-1981/`
- 200 · Sito ufficiale di Pino Daniele — "Yes I know my way - The Be · `https://www.pinodaniele.com/music/yes-i-know-my-way-the-best-of-1998/`

**10. `all-the-small-things`** — Spotify `2m1hi0nfMR9vdGC8UcrnwU` → oEmbed 200, titolo «All The Small Things»; testo: 200, «ALL THE SMALL THINGS - blink-182 - LETRAS.COM»
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/All_the_Small_Things`
- 200 · Songfacts · `https://www.songfacts.com/facts/blink-182/all-the-small-things`
- 200 · American Songwriter · `https://americansongwriter.com/meaning-all-the-small-things-blink-182-song-lyrics/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/artist/6FBDaR13swtiWwGhX1WQsP_songs.html`

**11. `ho-messo-via`** — Spotify `4xyp77VPg90ezi7N1p99a5` → oEmbed 200, titolo «Ho messo via»; testo: 200, «HO MESSO VIA - Luciano Ligabue - LETRAS.COM»
- 200 · Wikipedia · `https://it.wikipedia.org/wiki/Ho_messo_via`
- 200 · OndaRock · `https://www.ondarock.it/monografie/ligabue/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/artist/7H8ZC8uHJMPZGLMApRRNIz_songs.html`

**12. `vieni-a-ballare-in-puglia`** — Spotify `7IBGw13AbUorsu133u6Q0Z` → oEmbed 200, titolo «Vieni A Ballare In Puglia»; testo: 200, «VIENI A BALLARE IN PUGLIA - Caparezza - LETRAS.COM»
- 200 · Wikipedia · `https://it.wikipedia.org/wiki/Vieni_a_ballare_in_Puglia`
- 500 **⚠** · eHabitat · `https://www.ehabitat.it/2015/08/28/vieni-a-ballare-in-puglia-caparezza-canta-luci-e-ombre-della-sua-terra/`
- 200 · Rockol — Franco Zanetti · `https://www.rockol.it/news-714124/canzoni-italiane-da-2000-al-2020-storia-vieni-ballare-puglia-caparezza`

**13. `aerials`** — Spotify `4e9eGQYsOiBcftrWXwsVco` → oEmbed 200, titolo «Aerials»; testo: 200, «AERIALS - System Of A Down - LETRAS.COM»
- 200 · Loudwire — Spencer Kaufman, 21 agosto 2012 · `https://loudwire.com/best-system-of-a-down-songs/`
- 200 · Wikipedia (voce del brano) · `https://en.wikipedia.org/wiki/Aerials_(song)`
- 200 · Songfacts (riporta una dichiarazione di John Dolmayan a MTV) · `https://www.songfacts.com/facts/system-of-a-down/aerials`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**14. `november-rain`** — Spotify `3YRCqOhFifThpSRFJ1VWFM` → oEmbed 200, titolo «November Rain»; testo: 200, «NOVEMBER RAIN - Guns N' Roses - LETRAS.COM»
- 200 · MusicRadar — Amit Sharma · `https://www.musicradar.com/artists/it-used-to-be-like-25-minutes-long-how-axl-rose-took-inspiration-from-elton` → redirect a `https://www.musicradar.com/artists/how-axl-rose-took-inspiration-from-elton-john-to-create`
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/November_Rain`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`
- 200 · uDiscoverMusic — Jason Draper · `https://www.udiscovermusic.com/stories/november-rain-story-guns-n-roses/`

**15. `war-pigs`** — Spotify `1mnXT8zNssefzrRkeuD8Ov` → oEmbed 200, titolo «War Pigs»; testo: 200, «WAR PIGS - Black Sabbath - LETRAS.COM»
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/War_Pigs`
- 200 · Primordial Radio · `https://primordialradio.com/black-sabbath-war-pigs-lyrics-meaning/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**16. `wake-me-up-when-september-ends`** — Spotify `3ZffCQKLFLUvYM59XKLbVm` → oEmbed 200, titolo «Wake Me up When September Ends»; testo: 200, «WAKE ME UP WHEN SEPTEMBER ENDS - Green Day - LETRAS.COM»
- 200 · American Songwriter · `https://americansongwriter.com/the-meaning-behind-wake-me-up-when-september-ends-by-green-day/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`
- 200 · Songfacts · `https://www.songfacts.com/facts/green-day/wake-me-up-when-september-ends`

**17. `hotel-california`** — Spotify `40riOy7x9W7GXjyGp4pjAv` → oEmbed 200, titolo «Hotel California - 2013 Remaster»; testo: 200, «HOTEL CALIFORNIA - Eagles - LETRAS.COM»
- 406 **⚠** · CBS News — CBS Mornings · `https://www.cbsnews.com/news/don-henley-the-eagles-glenn-frey-kennedy-center-honor-hotel-california/`
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/Hotel_California`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**18. `black-pearl-jam`** — Spotify `5Xak5fmy089t0FYmh3VJiY` → oEmbed 200, titolo «Black»; testo: 200, «BLACK - Pearl Jam - LETRAS.COM»
- 200 · Wikipedia (riporta il libro "Pearl Jam Twenty" e l'intervist · `https://en.wikipedia.org/wiki/Black_(Pearl_Jam_song)`
- 200 · GQ — video "10 Things Dennis Rodman Can't Live Without", 18  · `https://www.gq.com/video/watch/10-essentials-10-things-dennis-rodman-cant-live-without`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**19. `rock-n-roll-damnation`** — Spotify `2308VPPaMh7Q3AX1Zap99A` → oEmbed 200, titolo «Rock 'N' Roll Damnation»; testo: 200, «ROCK 'N' ROLL DAMNATION - AC/DC - LETRAS.COM»
- 200 · Wikipedia (voce del brano) · `https://en.wikipedia.org/wiki/Rock_%27n%27_Roll_Damnation`
- 200 · Ultimate Classic Rock · `https://ultimateclassicrock.com/acdc-powerage/`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`

**20. `azzurro`** — Spotify `1P0ssjuKbd4vxmtpomTJtQ` → oEmbed 200, titolo «Azzurro - Remastered»; testo: 200, «AZZURRO - Adriano Celentano - LETRAS.COM»
- 200 · Wikipedia · `https://en.wikipedia.org/wiki/Azzurro`
- 200 · Rockol · `https://www.rockol.it/news-715123/adriano-celentano-paolo-conte-la-storia-della-canzone-azzurro`
- 200 · kworb.net (ascolti Spotify) · `https://kworb.net/spotify/`


---

# Allegato C — Schede escluse e coda successiva

**Già verificate (campo `ultimaVerifica`), escluse per la regola di precedenza:** `giovani-wannabe`, `goodbye-malinconia`, `back-in-black`, `hard-as-a-rock`, `fell-in-love-with-a-girl`, `dubbi-non-ho`, `stand-by-me`, `dammit`.

**Fuori dalle prime venti, per impressioni (11–30 della coda ricalcolata):** `sound-of-silence-disturbed` (24), `la-mia-parte-intollerante` (23), `someone-like-you` (23), `caruso` (22), `highway-to-hell` (20), `shape-of-you` (20), `sonne` (18), `follow-you` (17), `exuvia` (16), `boulevard-of-broken-dreams` (13).

**Metodo di ricalcolo:** `dati/coda-verifica.json` (esportazione Search Console dell'11/09/2026) filtrato sulle schede senza `ultimaVerifica`; ordine per impressioni.
