# Diagnosi delle 353 variazioni — 20 ottobre 2026

## Esito e perimetro

**Rigenerazione generale non pubblicabile. Nessuna correzione applicata.** Riprodotto esattamente il blocco 353/50 con lo stesso generatore concorrente presente sul disco, senza opzioni di deroga, senza cambiare soglie o disabilitare controlli. Arresto prima delle sitemap. Esaminati 696 HTML della generazione contro gli artefatti pubblicati conservati nel repository, base ad9091a5101f1b50228583217aa3b90257a9d966. Non è stata eseguita una nuova verifica HTTP della produzione.

Normalizzazione: quella F40 originale, che esclude CSS, footer, dateModified, riga revisione e dettagli tecnici/estratti correlati previsti dal codice; nessuna nuova esclusione aggiunta. Confronto supplementare sulle sole righe non vuote: per tutte le 353 pagine le righe residue sono byte-identiche. Questa prova NON sostituisce il controllo del generatore e non autorizza un collasso generale degli spazi.

663 HTML diversi a livello di byte; 354 dopo F40: 298 canzoni, 55 artisti e una homepage esclusa dal conteggio editoriale del gate. 254 album e nove raccolte restano identici dopo F40. Le 23 canzoni con cartolina e gli altri 49 artisti non presentano differenze F40.

## Cause e azioni

I gruppi tecnici/estratti si sovrappongono tra loro e alle 353 pagine: non sommare le righe della tabella.

| Causa | Pagine | Responsabile riscontrato | Intenzionale / rischio SEO | Azione proposta | Pubblicabile ora |
|---|---:|---|---|---|---|
| Riga vuota nel contenitore condivisione quando manca la cartolina | 298 canzoni | pagine.mjs:786, commit 783486b3b2 del 13/10 | attributo opzionale intenzionale; differenza vuota anomala per F40. 298 date false, bloccante | eliminare solo il newline del ramo vuoto nel modello, previa approvazione | No |
| Quattro righe vuote per componenti acquisto/informativa assenti | 55 artisti | pagine.mjs:1074/1098/1123/1131; 0614bcbfd5 e 45066822e4 dell’8/10 | nessuna variazione prodotti/CTA. Tutti i 55 artisti non hanno scelte nel registro. 55 date false, bloccante | evitare newline solo per stringhe vuote; nessuna modifica dati Amazon | No |
| Rotazione del contenuto iniziale della homepage basata su Date.now | 1 home | pagine.mjs:1434–1436, 47a0387b61/F37 06d6b733e7 | comportamento storico intenzionale, ma scarto significativo di contenuto fuori gate: un lastmod automatico in più | separare decisione su stabilità del contenuto iniziale; preservare home nel lotto minimo | No, non inclusa nel mandato |
| Regola condivisa per griglia mobile | 625 | stile.mjs:415, 6ddf6ec272 del 12/10 | correzione intenzionale già presente nel modello; diffusione differita. F40 la esclude correttamente dalle date | nessuna correzione editoriale; non propagare con un build di massa | Non come lotto autonomo qui |
| Stili cartolina spostati fra due blocchi style | 10 | composizione stileExtra in pagine.mjs:920, 27a9cfabfd e successive preparazioni mirate | tecnici; nessuna dichiarazione nuova rispetto all’insieme delle righe CSS, salvo regola mobile precedente. Ordine non verificato visualmente | lasciare le cartoline ferme; nessun cambiamento date | No |
| Anteprime di tre schede già corrette: Youngblood, La cura, Vengo dalla Luna | 33 (36 estratti: 12+11+13) | dati approvati 4dca93460 e 6ddf6ec27, componente gancio correlati | aggiornamento derivato intenzionale, non modifica dell’articolo sorgente. F40 lo esclude correttamente dalle date | nessuna nuova correzione contenutistica; eventuale propagazione separata | Non in questa diagnosi |

626 pagine cambiano uno o più blocchi style: unione dei 625 casi griglia e delle dieci ricollocazioni. Tutti i 663 scarti di byte sono spiegati dall’unione dei gruppi sopra e dalle date conseguenti; nessun gruppo residuo non classificato.

## Contenuto, collegamenti, immagini e dati strutturati

- Nelle 353 pagine bloccate: zero variazioni di contenuto proprio, href, immagini, titoli, description, canonical o JSON-LD eccetto dateModified. Nessun prodotto o CTA Amazon modificato. Rimangono soltanto righe vuote dopo F40; gli estratti correlati esclusi sono censiti separatamente.
- Nell’intero insieme di 696: cambia la sequenza href soltanto nella home (due collegamenti della canzone in evidenza); immagini, title, description e JSON-LD senza dateModified restano identici. Footer invariati.
- Nessuna pagina nuova/rimossa nel confronto dei percorsi generati. Il conteggio è dei 696 HTML del sito, non degli eventuali documenti HTML presenti nei rapporti.

## Date, canonical e sitemap

| Controllo | Cambiamenti |
|---|---:|
| datePublished | 0 |
| dateModified negli HTML temporanei | **353: 298 canzoni + 55 artisti**, tutti al 2026-10-20 |
| canonical | 0 |
| URL sitemap aggiunti / rimossi | **0 / 0**, inventario 571 identico |
| lastmod candidati se il flusso proseguisse | **354: 298 canzoni + 55 artisti + home** |
| sitemap effettivamente scritte dal build | **0**, controllo arrestato prima |
| date/sitemap modificate nel repository pubblico da questa diagnosi | **0** |

I 354 lastmod sono una proiezione diagnostica: eseguite in sola lettura le funzioni F40 originali sui file già emessi, senza continuare il build, senza scrivere sitemap e senza superare il gate. Inventario URL ricostruito indipendentemente con le stesse soglie dai dati canzoni/artisti/album/raccolte, identico ai 571 URL pubblicati. Le 353 date causate da formattazione sono **non motivate e bloccanti**. La homepage non ha dateModified nello schema, ma acquisirebbe un nuovo lastmod per la rotazione.

## Lotto minimo sicuro proposto

**Zero pagine pubbliche.** Solo correzione circoscritta dei cinque punti di emissione nel modello `scripts/genera/pagine.mjs` (una interpolazione canzone e quattro artista), evitando newline quando il componente opzionale è vuoto. Proposta in `prove-diagnosi-rigenerazione-2026-10-20/proposta-non-applicata.patch`, non applicata nemmeno alla copia temporanea. Il componente esistente e le scelte Amazon restano invariati. Nessuna modifica a F40, gate o soglie.

Dopo approvazione della sola correzione: applicare in copia separata; controllare output dei rami presenti/assenti, preservare le 23 cartoline; confrontare date e URL; eseguire due rendering deterministici e un caso negativo con modifica reale oltre soglia. Preservare la home o chiedere separatamente una decisione sul seed giornaliero: non nasconderne il testo significativo nella normalizzazione. Non è stato eseguito alcun build con il patch proposto e non si dichiara già risolto il gate.

Le modifiche concorrenti a genera-sito.mjs e indexnow.mjs restano fuori da questo lotto. Nessun commit, push, deploy, richiesta GSC, IndexNow o aggiornamento commerciale; nessun browser o test visivo necessario alla diagnosi applicato come prova di un rilascio. Cartoline e ritratti non modificati.

## Esempi con primo scarto concreto

Le righe citate sono quelle del confronto F40. L’inventario JSON contiene tutti i 354 URL, differenze complete per ogni pagina normalizzata e date prima/dopo. I gruppi tecnici sotto riportano cinque esempi ciascuno; per home esiste un solo URL.

### 298 canzoni: una riga vuota
- [canzone/21-guns](https://www.dietroiltesto.it/canzone/21-guns/): normalizzato riga 113, `data-titolo="21 Guns"` → riga vuota.
- [canzone/24000-baci](https://www.dietroiltesto.it/canzone/24000-baci/): normalizzato riga 113, `data-titolo="24.000 baci"` → riga vuota.
- [canzone/4-marzo-1943](https://www.dietroiltesto.it/canzone/4-marzo-1943/): normalizzato riga 113, `data-titolo="4 marzo 1943"` → riga vuota.
- [canzone/a-che-ora-e-la-fine-del-mondo](https://www.dietroiltesto.it/canzone/a-che-ora-e-la-fine-del-mondo/): normalizzato riga 113, `data-titolo="A che ora è la fine del mondo?"` → riga vuota.
- [canzone/ace-of-spades](https://www.dietroiltesto.it/canzone/ace-of-spades/): normalizzato riga 113, `data-titolo="Ace of Spades"` → riga vuota.
### 55 artisti: quattro righe vuote
- [artista/5-seconds-of-summer](https://www.dietroiltesto.it/artista/5-seconds-of-summer/): normalizzato riga 143, `<section class="blocco" id="dischi">` → riga vuota.
- [artista/adele](https://www.dietroiltesto.it/artista/adele/): normalizzato riga 126, `<section class="blocco" id="dischi">` → riga vuota.
- [artista/al-bano-e-romina-power](https://www.dietroiltesto.it/artista/al-bano-e-romina-power/): normalizzato riga 120, `<section class="blocco" id="dischi">` → riga vuota.
- [artista/andrea-bocelli-e-giorgia](https://www.dietroiltesto.it/artista/andrea-bocelli-e-giorgia/): normalizzato riga 115, `<section class="blocco" id="dischi">` → riga vuota.
- [artista/avicii](https://www.dietroiltesto.it/artista/avicii/): normalizzato riga 128, `<section class="blocco" id="dischi">` → riga vuota.

### 625 pagine: regola griglia mobile
- [404.html](https://www.dietroiltesto.it/404.html): `minmax(300px, 1fr)` → `minmax(min(300px, 100%), 1fr)`.
- [affiliazioni](https://www.dietroiltesto.it/affiliazioni/): `minmax(300px, 1fr)` → `minmax(min(300px, 100%), 1fr)`.
- [album/5-seconds-of-summer/5-seconds-of-summer](https://www.dietroiltesto.it/album/5-seconds-of-summer/5-seconds-of-summer/): `minmax(300px, 1fr)` → `minmax(min(300px, 100%), 1fr)`.
- [album/5-seconds-of-summer/5sos5](https://www.dietroiltesto.it/album/5-seconds-of-summer/5sos5/): `minmax(300px, 1fr)` → `minmax(min(300px, 100%), 1fr)`.
- [album/5-seconds-of-summer/calm](https://www.dietroiltesto.it/album/5-seconds-of-summer/calm/): `minmax(300px, 1fr)` → `minmax(min(300px, 100%), 1fr)`.

### 10 canzoni: collocazione degli stili cartolina
- [canzone/chop-suey](https://www.dietroiltesto.it/canzone/chop-suey/): blocco `.pillola-editoriale` dal primo `<style>` al secondo; righe CSS presenti in entrambi.
- [canzone/crawling](https://www.dietroiltesto.it/canzone/crawling/): blocco `.pillola-editoriale` dal primo `<style>` al secondo; righe CSS presenti in entrambi.
- [canzone/doomed](https://www.dietroiltesto.it/canzone/doomed/): blocco `.pillola-editoriale` dal primo `<style>` al secondo; righe CSS presenti in entrambi.
- [canzone/happy-song](https://www.dietroiltesto.it/canzone/happy-song/): blocco `.pillola-editoriale` dal primo `<style>` al secondo; righe CSS presenti in entrambi.
- [canzone/in-the-end](https://www.dietroiltesto.it/canzone/in-the-end/): blocco `.pillola-editoriale` dal primo `<style>` al secondo; righe CSS presenti in entrambi.

### 33 pagine: estratti correlati aggiornati
- [album/5-seconds-of-summer/youngblood](https://www.dietroiltesto.it/album/5-seconds-of-summer/youngblood/): `Scritta da Calum Hood, Ali Tamposi, Andrew Watt, Ashton Irwin e Luke Hemmings, fu pubblicata come si` → `Scritta da Calum Hood, Ali Tamposi, Andrew Watt, Ashton Irwin, Luke Hemmings e Louis Bell, fu pubbli` (estratti abbreviati qui; confronto completo nelle prove).
- [album/caparezza/verita-supposte](https://www.dietroiltesto.it/album/caparezza/verita-supposte/): `Scritta da Michele Salvemini (Caparezza) insieme a Diego Perrone, frontman dei I Medusa che presta l` → `Vengo dalla Luna è la sesta traccia di Verità supposte, secondo album di Caparezza uscito nel 2003.` (estratti abbreviati qui; confronto completo nelle prove).
- [album/franco-battiato/limboscata](https://www.dietroiltesto.it/album/franco-battiato/limboscata/): `Scritta insieme al filosofo Manlio Sgalambro per l'album L'imboscata, resta uno dei brani più discus` → `La cura è la terza traccia di L'imboscata, pubblicato da Polygram nell'autunno del 1996.` (estratti abbreviati qui; confronto completo nelle prove).
- [anni/1990](https://www.dietroiltesto.it/anni/1990/): `Scritta insieme al filosofo Manlio Sgalambro per l'album L'imboscata, resta uno dei brani più discus` → `La cura è la terza traccia di L'imboscata, pubblicato da Polygram nell'autunno del 1996.` (estratti abbreviati qui; confronto completo nelle prove).
- [anni/2000](https://www.dietroiltesto.it/anni/2000/): `Scritta da Michele Salvemini (Caparezza) insieme a Diego Perrone, frontman dei I Medusa che presta l` → `Vengo dalla Luna è la sesta traccia di Verità supposte, secondo album di Caparezza uscito nel 2003.` (estratti abbreviati qui; confronto completo nelle prove).

### Homepage: un solo URL disponibile

- [Home](https://www.dietroiltesto.it/): «My Immortal»/Evanescence → «Fuori dall’Hype»/Pinguini Tattici Nucleari, con relativa sintesi, colore e due href canzone/artista. Non esistono cinque esempi per un gruppo di un URL.

## Prove e preservazione

Prove in `rapporti/prove-diagnosi-rigenerazione-2026-10-20/`: log blocco, inventario completo JSON, conteggi, date candidate, copie dei sorgenti esaminati, strumenti diagnostici e proposta diff non applicata. Snapshot iniziale di tutti i file tracciati e dei due SEO non tracciati: contenuti invariati prima della sola scrittura del referto/ROADMAP. HEAD invariato; generatori concorrenti conservati. Output di generazione creati esclusivamente sotto `/private/tmp/dit-diagnosi-2026-10-20/` e rimossi al termine dopo salvataggio delle prove leggere. Nessun asset del sito copiato nelle prove.

Prossimo passo: approvare la sola correzione del modello in una copia separata; nessuna autorizzazione di pubblicazione richiesta o presunta da questo referto.
