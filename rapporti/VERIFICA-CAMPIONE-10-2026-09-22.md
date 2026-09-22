# Verifica indipendente: campione casuale di 10 schede canzone

**Data:** 22 settembre 2026 · **Chi:** Opus (verificatore; le schede le ha scritte un'altra mano)
**Copia di lavoro:** worktree `dit-verifica-venti`, ramo `verifica/venti-schede-2026-09-21`, allineato a `main` @ `84e7bcfd` prima di cominciare.
**Cosa non ho fatto:** nessuna modifica a pagine, ricerca o pagine album; niente rigenerazione del sito; niente push, niente pubblicazione. **Nessun `ultimaVerifica` compilato** (il perché è nel §5).

Dettaglio voce per voce, con fonte e punto per ogni esito: `verifiche/campione-dieci-2026-09-22/01-…md` … `10-…md`.

---

## 1. Il sorteggio, registrato prima di aprire le fonti

- **Seme:** `2026-09-22-campione-dieci`. **Metodo:** si ordinano le candidate per `sha256(seme + ":" + slug)` e si prendono le prime 10 (`scripts/campione-dieci.mjs`). Stesso seme e stessi dati danno lo stesso campione.
- **Escluse:** le schede già verificate, cioè con `ultimaVerifica` (28) o presenti nel registro `verifiche/indipendenti.json` (14): in tutto 34. **Candidate:** 283 su 317.
- **Registrato** in `verifiche/campione-dieci-2026-09-22/_SORTEGGIO.txt`, con le impronte del testo, e messo in un commit (`99ac5e1c`) **prima** di aprire qualsiasi fonte.

| # | Scheda |
|--:|---|
| 1 | `stairway-to-heaven` — Led Zeppelin |
| 2 | `bocca-di-rosa` — Fabrizio De André |
| 3 | `my-immortal` — Evanescence |
| 4 | `ragu` — Fulminacci |
| 5 | `overkill` — Motörhead |
| 6 | `cielo-stanza` — Mina |
| 7 | `paint-it-black` — The Rolling Stones |
| 8 | `creep` — Radiohead |
| 9 | `marinella` — Fabrizio De André |
| 10 | `bandiera-bianca` — Franco Battiato |

## 2. Metodo

- Per ogni scheda ho confrontato **frase per frase** il corpo, i dati (anno, album, genere, ID Spotify, ascolti, link al testo), la frase iconica e la descrizione per i motori di ricerca con le fonti che la scheda cita. **Tutte le fonti le ho aperte di persona** nel browser il 22/09/2026, 29 pagine in tutto; nessuna è stata letta tramite riassunti.
- **Testi delle canzoni:** li ho letti su Letras solo per confrontarli con le parafrasi (regola P3). Né il rapporto né i file di dettaglio ne trascrivono una riga.
- **Ascolti:** per ogni numero ho confrontato l'**ID Spotify incorporato nella pagina** (`canzone/<slug>/index.html`) con l'ID del **link della riga Kworb** nella pagina artista. Il titolo da solo non l'ho mai considerato una prova. Ho aperto anche la pagina Spotify di ogni ID coinvolto.
- **Esiti possibili:** confermata · confermata con riserva (regge, ma la fonte dice qualcosa di meno o di diverso) · non confermata (nessuna fonte citata la contiene) · contraddetta (una fonte dice altro), oppure dato errato.

## 3. Risultati aggregati

154 affermazioni esaminate (le 10 descrizioni, che ripetono la prima frase del corpo, sono contate a parte).

| Scheda | Voci | Confermate | Con riserva | Non confermate | Contraddette / dato errato | Violazioni P3 |
|---|--:|--:|--:|--:|--:|--:|
| `stairway-to-heaven` | 16 | 4 | 2 | 9 | 1 | 1 |
| `bocca-di-rosa` | 15 | 11 | 3 | 0 | 1 | 0 |
| `my-immortal` | 18 | 8 | 5 | 4 | 1 | 1 |
| `ragu` | 13 | 6 | 2 | 4 | 1 | 0 |
| `overkill` | 14 | 7 | 4 | 2 | 1 | 0 |
| `cielo-stanza` | 16 | 4 | 4 | 5 | 3 | 1 |
| `paint-it-black` | 15 | 10 | 2 | 2 | 1 | 1 |
| `creep` | 19 | 8 | 6 | 3 | 2 | 1 |
| `marinella` | 15 | 6 | 5 | 3 | 1 | 1 |
| `bandiera-bianca` | 13 | 9 | 3 | 0 | 1 | 0 |
| **Totale** | **154** | **73 (47%)** | **36 (23%)** | **32 (21%)** | **13 (8%)** | **6** |

- **Descrizioni:** 3 confermate, 7 da cambiare, perché ripetono una frase del corpo che non regge.
- **Nessuna delle 10 schede era pulita.** Le più solide sono `bocca-di-rosa` e `bandiera-bianca`: nessuna affermazione non confermata e una sola contraddetta ciascuna. La più fragile è `stairway-to-heaven`: 9 affermazioni non confermate su 16.
- Conteggio riproducibile: `node verifiche/campione-dieci-2026-09-22/conta.mjs`.

### Ascolti e ID Spotify

| Scheda | ID incorporato | Riga Kworb con lo stesso ID? | Esito |
|---|---|---|---|
| `stairway-to-heaven` | raccolta *An Introduction to Led Zeppelin* (2018) | no | **versione diversa non dichiarata**; con l'ID dell'album: 1.375.551.831 |
| `bocca-di-rosa` | Volume 1 (1967) | no (la riga col titolo ha un altro ID) | la scheda cita la pagina Spotify, che corrisponde: confermato, numero aggiornato |
| `my-immortal` | Fallen (2003) | **sì** | ID giusto, numero superato (680 → 686 mln) |
| `overkill` | ***Coverkill*, del gruppo Overkill** (1999): una cover | no | **artista sbagliato nel player**; il numero (90 mln) non era di quell'ID |
| `cielo-stanza` | raccolta *Rarity Collection* (2012) | no | **il numero (14,3 mln) era di un altro ID** (*Briciole di baci*); l'ID della scheda ha 6,4 mln |
| `creep` | *Pablo Honey (Collector's Edition)* | no | con l'ID dell'album originale: 3.142.679.429 |
| `marinella` | raccolta di vari artisti *70's Hits It's Party Time* (2022) | no | **il numero era di un altro ID** (quello di *Volume 3*); l'ID della scheda ha 2,2 mln |
| `bandiera-bianca` | La Voce Del Padrone (Remastered 2021) | **sì** | confermato |

In **5 casi su 8** il numero e l'ID del player non appartengono allo stesso brano. È esattamente il difetto che il controllo per ID serve a trovare. In 3 di questi casi il player stesso fa ascoltare un'altra cosa: una cover di un altro gruppo, o una raccolta.

## 4. Cosa è emerso, per tipo

1. **Il superlativo «il verso/momento più citato»:** 7 frasi iconiche su 10 (tutte tranne `bocca-di-rosa`, `overkill` e `bandiera-bianca`), **mai sostenuto da una fonte**. È lo stesso schema del rapporto del 21/09.
2. **Frase iconica troppo vicina ai versi (P3):** 6 schede (`stairway-to-heaven`, `my-immortal`, `cielo-stanza`, `paint-it-black`, `creep`, `marinella`). In `stairway-to-heaven`, `cielo-stanza` e `paint-it-black` si tratta di una traduzione quasi letterale.
3. **Attribuzioni sbagliate (R3):**
   - `paint-it-black` dava come **parole di Jagger** una frase che è della redazione di Songfacts.
   - `marinella` citava senza autore, e cambiata, una frase di **don Luigi Ciotti**.
   - `ragu` metteva fra virgolette «concentrato di identità diverse», un'espressione che **nessuna fonte contiene**.
   - `cielo-stanza` faceva lo stesso con «entrare il cielo nella stanza».
4. **Numeri e date contraddetti:**
   - `cielo-stanza`: 11 settimane al n. 1 (Wikipedia dice 14) e «8 milioni di copie» (Wikipedia: poco meno di 2).
   - `creep`: «un anno prima» dell'album (erano 5 mesi) e il successo in Israele «l'anno dopo» (fu già nel 1992).
   - `ragu`: «terza traccia» (è la quarta).
   - `my-immortal`: incluso nell'EP del 1998 (fu registrato per l'EP ma tolto).
5. **Senso rovesciato:**
   - `bandiera-bianca`: la scheda diceva «più vicino alla lotta che alla rassegnazione», mentre Rolling Stone Italia dice che il brano dichiara la resa.
   - `bocca-di-rosa`: la scheda diceva che la comunità «finisce per accoglierla», mentre nella canzone la fanno allontanare e poi la salutano commossi.
6. **Dubbio arrotondato in certezza (R8):**
   - `bocca-di-rosa`: nella fonte Liliana Tassio è introdotta da «pare», la scheda la dava per certa.
   - `creep`: la fonte dice «supposedly», la scheda diceva «per sua stessa ammissione».
7. **Fonti:**
   - Il link a La Stampa di `marinella` dà **404**; l'ho letto dalla copia su web.archive.org.
   - Il Discogs di `bandiera-bianca` è la **stampa olandese**, non l'LP originale che il nome della fonte promette.

## 5. Le correzioni applicate nella copia, e perché non c'è nessun `ultimaVerifica`

**Applicate** in `dati/canzoni.json` della copia, e solo dove una fonte riaperta le sostiene. Lo script è `verifiche/campione-dieci-2026-09-22/applica-correzioni.mjs`, rieseguibile. In sintesi:

- tolte le affermazioni senza fonte, invece di cercare fonti nuove per sostenerle;
- corretti numeri, date e attribuzioni;
- riscritte le 10 frasi iconiche partendo da ciò che le fonti documentano, senza rendere i versi;
- 4 ID Spotify cambiati con quelli dell'album (`stairway-to-heaven`, `overkill`, `creep`, `marinella`);
- 8 numeri di ascolto riallineati all'ID;
- l'indice `kworb.net/spotify/` sostituito con la pagina artista o con la pagina Spotify del brano;
- La Stampa sostituita con la copia d'archivio.

Sono cambiate solo quelle 10 schede: l'ho controllato confrontando ogni scheda prima e dopo.

**Registrate** in `dati/garanti-verificati.json` 14 frasi «secondo [testata]», nuove o riformulate, dopo averle rilette sulla fonte aperta, con esito e nota.

**Controlli automatici dopo le correzioni:**
- `check-attribuzioni`, `check-citazioni-nude`, `check-nature`, `check-frase-iconica`, `check-registro`, `check-riportate`, `check-livelli`, `check-coerenza` e `check-completezza` non segnalano nulla sulle 10 schede.
- `check-garanti` non segnala più nessuna di queste schede. Esce ancora con errore per altre schede, come prima.
- Non ho eseguito `check-fonti`, `check-testi` e `check-link`, che richiedono la rete dalla macchina. Gli URL nuovi però li ho aperti tutti a mano.

**Perché non ho compilato `ultimaVerifica`.** Il bollino dice al lettore che la scheda «è stata riaperta da una mano diversa da quella che l'ha scritta», e il registro esiste proprio per garantirlo. Le frasi corrette adesso **le ho scritte io**. Se mettessi il bollino sul mio stesso testo, verificherei me stesso: è esattamente la cosa che il bollino promette di non fare. Due casi restano inoltre aperti anche nel merito:

- in `cielo-stanza` nessuna fonte dice quale ID Spotify corrisponda all'incisione del 1960 (R8);
- in `my-immortal` l'EP «Mystary» e il 1997 sono stati tolti perché nessuna fonte li riporta, non perché siano stati smentiti.

**Per chiudere le 10 schede:** un'altra mano (Sonnet) riapre le mie correzioni con le stesse fonti. Poi, dove reggono, si registrano le impronte e si compila `ultimaVerifica`.

## 6. Un allarme che non riguarda il campione, ma che va detto

`check-bollino`, eseguito sulla copia allineata a `main`, dice: **«20 voci mostrano al lettore un bollino che nessuno, da fuori, ha confermato»**. Sono le 20 schede del rapporto del 21/09. Su `main` hanno ricevuto `ultimaVerifica: 2026-09-22` quando le correzioni sono state integrate, ma non sono nel registro delle verifiche indipendenti.

Ho controllato a campione le quattro schede verificate ieri (`vieni-a-ballare-in-puglia`, `november-rain`, `yes-i-know-my-way`, `urlando-contro-il-cielo`): le correzioni che avevo proposto risultano integrate. Il testo integrato però **nessuno l'ha riletto da fuori**. Il 16 settembre l'autore aveva scelto di togliere `ultimaVerifica` dove manca la verifica indipendente e di rimetterlo solo dopo. **Prima di pubblicare `main` va presa questa decisione.** Io non ho toccato `main`.

## 7. Limiti dichiarati

- **Fonti di livello C:** Wikipedia, Songfacts e Discogs, lette nella versione del 22/09/2026. Dove una scheda si reggeva solo su di loro, l'ho segnalato come riserva.
- **Date delle pagine Future plc** (Louder, Classic Rock, MusicRadar): sono quelle della pagina, non delle dichiarazioni citate. Le schede non le usano come date.
- **Numeri di ascolto:** sono istantanee. Pagine artista Kworb aggiornate fra il 12 e il 21/09, pagine Spotify lette il 22/09.
- **Non aperti:** i libri citati dalle fonti (Pistone, Zuffanti, Argenta) e le interviste originali (MTV 2003, Kerrang! 2023, Chicago Sun-Times 1993, Denver Post 1995). Dove la scheda ne riporta il contenuto, lo attribuisce alla testata che le cita.
