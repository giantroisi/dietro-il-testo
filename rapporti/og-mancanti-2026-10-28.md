# Ripristino dei 39 asset Open Graph mancanti — proposta del 28 ottobre 2026

**Preparato e verificato, solo locale. Nessuna pubblicazione, firma o chiave privata usata.**

## Base autorevole e isolamento

Base pubblicata e main remoto verificato in sola lettura: `ced9465e7e714d8fc648a8c6317cfea047a8682c`. Copia separata `/Users/gianmicheletroisi/.codex/worktrees/og-assets-integrita-2026-10-27/dietro-il-testo`, ramo `codex/og-assets-integrita-2026-10-27`. La precedente copia Amazon è stata rimossa dal disco dopo il rilascio, ma commit e proposte sono recuperabili dalla storia Git: non ricostruita né copiata dal main sporco. La nuova copia già creata il27è stata ripresa dal disco, senza duplicarla. Registrazione nell’app fallita per il limite100allegati; cartella, ramo e commit restano utilizzabili.

COSTITUZIONE e AGENTS riletti. Il mandato specifico di riprendere il lavoro tecnico autorizza la preparazione; **non autorizza pubblicazione o uso della chiave**. Main `/Users/gianmicheletroisi/Claude/dietro-il-testo` e copia Amazon precedente preservati, con stato/hash di22file concorrenti invariati. Prima di scrivere salvati statoGit,1129hash pubblici, date di696HTML e sei sitemap con URL/date/conteggi.

## Causa verificata

`paginaCanzone` in scripts/genera/pagine.mjs:914costruisce sempre il riferimento `og/<slug>.png` quando non usa una pillola. I PNG sono prodotti separatamente da scripts/genera-og.py e devono essere committati; genera-sito.mjs si limita a copiare la cartella esistente. Mancavano proprio39file nel commit pubblicato, e la copia degli asset non controllava l’esistenza di quelli dichiarati nelle pagine. La build protetta originale passava comunque con impatto0: difetto di controllo confermato, senza attribuirlo al lotto Amazon del27.

Il28ottobre ricontrollati i39URL originali con richiesteHTTPHEAD: **39risposte404**. L’HTML locale pubblicato dichiara esattamente questi39nomi. Prima del ripristino il nuovo controlloOGfallisce con39errori; il controllo URL già passa. La scansione delle571URL riferita dalla chat centrale resta attribuita a quel rapporto; qui il controllo offline copre tutte696pagine generate, comprese le non indicizzate.

## Correzione minima proposta

- Solo39PNGnuovi nei percorsi attesi,1200×630RGB, ottenuti dal renderer e logo già presenti nel repository; nessun ritratto esterno, nuova cartolina editoriale o variazione di layout delle pagine.
- Non richiamato il main del generatoreOG, perché aggiornerebbe og-versioni e di conseguenza URL/metadati. Usata soltanto genera_immagine sulle39schede mancanti: immagini preesistenti, registroversioni e tutti i dati rimangono intatti.
- I testi delle immagini derivano dal momento iconico già nei dati; nessuna nuova affermazione o verifica editoriale inventata. Per rispettareP3, nei soli render di StopCryingYourHeartOut, JeSoPazzo e FellInLoveWithAGirl sono omessi tre incisi letterali ridondanti. Le formulazioni complete/input sono nel fascicolo: HTML e dati originali non modificati. Non è una revisione editoriale integrale delle schede.
- Due controlli indipendenti alla fine della build completa: `check-og.mjs` fallisce per og:image locali mancanti, vuote, non regolari o fuorioutput; query e frammenti vengono ignorati per risolvere il file. `check-url-interni.mjs` fallisce sui tre tipi di origine non canonica richiesti, anche nei dati strutturati, con gestione delle entitàHTML. Nessun URL è stato sostituito alla cieca.
- Modulo comune per lettura output e due comandi separati;18casi di regressione. Il controllo non effettua rete. La modalità mirata preesistente resta un frammento non pubblicabile autonomamente e non è modificata: il controller di rilascio usa la build completa, che comprende entrambi i nuovi gate.

## Verifiche e prove negative

Due build complete consecutive dell’esatta proposta, senza deroga quantitativa: **impattoSEO0/50 entrambe,1168file identici fra i due output**. Tutti1129file pubblici preesistenti sono byte-identici alla base; le sole differenze sono39PNGnuovi. Tutti696HTML, title/description/canonical/URL, datePublished/dateModified, homepage, ricerca, prodotti e CTAAmazon, sei sitemap e lastmod sono identici; conteggi321canzoni/130album/104artisti/9raccolte/7pagine/5vociindice invariati. Nessuna modifica a CSS, templateHTML, contenuti, registroOG o baseline34sigilli.

Nuovi check:696HTML,375riferimenti localiOGvalidi, zeroerrori.18fixture positive/negative superate: file mancanti/vuoti/directory/query/frammenti/percorso malformato/symlink, URLhttp/bare/case/entità/JSON-LD, dominio simile esterno e sottopagina. Due esperimenti di **build completa** nel solo snapshot, poi ripristinati esattamente: rimozione di un PNGsorgente blocca la build; inserimento di un linkhttpnon canonico nell’HTML di una fixture blocca la build. I rispettivi output negativi non sono nella proposta.

Controlli esistenti superati: SEO696/zero, affiliazioni1155link, contestuali7percorsi/10link.39PNGverificati conPillow, firmaPNG/dimensioniRGB e titoli completi, senza tagli silenziosi. Tre tavole di tutte39immagini osservate visivamente. Corrispondenza tra manifesti/nomi/provenienza e asset di output verificata. Nessun test di pubblicazione completato, perché gli asset non sono online.

## File operativi futuri esatti — 44

- `og/another-one-bites-the-dust.png` — nuovo
- `og/bandiera-bianca.png` — nuovo
- `og/bocca-di-rosa.png` — nuovo
- `og/centro-di-gravita-permanente.png` — nuovo
- `og/come-as-you-are.png` — nuovo
- `og/comfortably-numb.png` — nuovo
- `og/dammit.png` — nuovo
- `og/dubbi-non-ho.png` — nuovo
- `og/e-ti-vengo-a-cercare.png` — nuovo
- `og/enjoy-the-silence.png` — nuovo
- `og/everybody-hurts.png` — nuovo
- `og/fell-in-love-with-a-girl.png` — nuovo
- `og/first-date.png` — nuovo
- `og/go-your-own-way.png` — nuovo
- `og/here-comes-the-sun.png` — nuovo
- `og/je-so-pazzo.png` — nuovo
- `og/kashmir.png` — nuovo
- `og/l-era-del-cinghiale-bianco.png` — nuovo
- `og/la-canzone-del-sole.png` — nuovo
- `og/life-on-mars.png` — nuovo
- `og/live-forever.png` — nuovo
- `og/man-in-the-mirror.png` — nuovo
- `og/nightswimming.png` — nuovo
- `og/nutshell.png` — nuovo
- `og/povera-patria.png` — nuovo
- `og/prospettiva-nevski.png` — nuovo
- `og/roxanne.png` — nuovo
- `og/somebody-told-me.png` — nuovo
- `og/stand-by-me.png` — nuovo
- `og/stop-crying-your-heart-out.png` — nuovo
- `og/sympathy-for-the-devil.png` — nuovo
- `og/take-it-easy.png` — nuovo
- `og/the-scientist.png` — nuovo
- `og/vita-spericolata.png` — nuovo
- `og/wanted-dead-or-alive.png` — nuovo
- `og/when-doves-cry.png` — nuovo
- `og/would.png` — nuovo
- `og/yesterday.png` — nuovo
- `og/your-song.png` — nuovo
- `scripts/check-og.mjs` — nuovo
- `scripts/check-url-interni.mjs` — nuovo
- `scripts/genera-sito.mjs` — modifica
- `scripts/genera/integrita-output.mjs` — nuovo
- `scripts/test-integrita-output.mjs` — nuovo

Un solo file preesistente modificato (`genera-sito.mjs`), quattro fileJSdi supporto/check/test nuovi e39PNGnuovi. Tutti i file di dati, affiliazioni, client e HTML restano intatti.

## Stato Git, autorità e passaggio successivo

**I44file non sono applicati nei percorsi operativi della copia.** Sono conservati sotto `rapporti/prove-og-mancanti-2026-10-28/proposta/`, con diff, hash e manifestov2non firmato **c0243a42d4de1bcb7e7203d8d6577a44a85ef189ac2ec51de2cbed2dcaf72bf5**. In Git cambiano soltanto ROADMAP e rapporti/prove, in un commit isolato recuperabile. Le build della nuova proposta sono anteprime da snapshot immutabile, non rilascio operativo: nessuna autoapprovazione o deroga al controller.

La base è stata verificata tramite il controller esterno originale. La sua funzione pura di confronto promozione, applicata all’output, conferma zero differenzeHTML/sitemap/ricerca/baseline. Nel futuro percorso firmato i39asset statici sono input espliciti del commitC, insieme ai5filedi codice; nessuna promozioneHTMLè prevista, quindi promozione.files èvuoto. Tutti44percorsi rientrano nella policy protetta e sono elencati anche in strutturali. **Prima del rilascio servono nuova autorizzazione specifica del proprietario alla firma esatta e alla pubblicazione, e build/promozione A→C→P tramite il controller installato.** Nessun aggiornamento del controller esterno, della radice di fiducia o dei34sigilli è proposto.

Finestre registrate dal rilascio precedente:48ore almeno fino29ottobre15:27:17ora italiana;7giorni per interventi strutturali/estesi almeno fino3novembre15:27:17. Questo lotto modifica il generatore per introdurre verifiche e quindi richiede, se pubblicato prima, un’eccezione esplicita del proprietario; non dedotta dal mandato di sola preparazione. Non avviato un secondo lotto. Nessun push, deploy, IndexNow, GSC, chiave privata o nuova affiliazione.

Prove: baseline.json; verifica-live-39.json; prima-check-og/URL; build1/2; determinismo-perimetro.json; buildnegativi;18fixture; testSEO/Amazon/contestuali; hash39PNG; inputrender; tre tavole; proposta esatta e preservazione concorrenti.


## Esito — rilascio autorizzato e verificato il 28 ottobre 2026

Il proprietario ha approvato esplicitamente firma, rilascio ed eccezione alle due pause per questo solo lotto. Manifesto c0243a42d4de1bcb7e7203d8d6577a44a85ef189ac2ec51de2cbed2dcaf72bf5 firmato esclusivamente sul Mac con la chiave esistente, senza trasferimento della chiave. Sequenza protetta: A `c16bd5c09d6e439da59a6e4fcb9447342f8e6c44`, C `e2c458806d4df1880aa496e4a74591736755e414`, P `30e6c074120c03aa2daefa0b555351dc4d7fcd2f`. Controller/ancora/runtime invariati; promozione senza HTML o sitemap. Integrazione lineare diretta sul ramo remoto, senza modificare il main locale divergente.

Build protetta del commit P pulito: impatto SEO **0/50**, 1168 file. Confronto con la baseline pubblicata: tutti **1129 file preesistenti identici**, solo39PNGnuovi con impronte esatte;696HTML e6sitemap identici, dunque datePublished/dateModified/lastmod e conteggi invariati. Dati/Amazon/home/client/baseline invariati. Ripetuti18test e controlliSEO696/zero, affiliazioni1155 e contestuali7percorsi/10link. Il controller ha verificato la storia firmata; checkout pulito prima del push. Le22impronte dei file concorrenti e la copia precedente sono identiche alla baseline.

Vercel `dpl_GKKLeYhA6yHYYq7kkvTZYTSaEqgK`, production **READY**, commit P esatto, dominio www assegnato; pronto alle **23:19:20 CET** (22:19:20.717UTC), durata14,75secondi. Sul dominio pubblico verificati86file: **39/39 PNG con HTTP200, image/png,1200×630 e SHA256 esatto**;39schede interessate più homepage,6sitemap e ricerca identiche alla baseline. Zero404 negli asset interessati. Elenco completo URL/esiti/impronte in `prove-og-mancanti-2026-10-28/rilascio/verifica-pubblica.json`.

Audit collegamenti: zerooriginiHTTP o dominio senzaWWW in tutti696HTML; nelle sorgenti scripts/dati le6occorrenze residue sono esclusivamente fixture negative del test. Non sono link di navigazione né canonical/redirect da correggere. Le fonti esterne e la configurazione del dominio non sono state modificate. Nessun secondo lotto o sostituzione URL.

Limite della verificaUI: il browser CUA non è partito per una radice di lavoro con componente symlink non supportata. Non modificata la configurazione del Mac e nessun controllo desktop/mobile nuovo dichiarato. Il risultato pubblicato è verificato tramite byte/hash/tipo/dimensioni; tutti gli HTML restano identici e le39immagini erano già state osservate nella preparazione.

**Blocco tecnico completato.** Nessun GSC, IndexNow, nuova immagine oltre39, contenuto, affiliazione o data modificati. Prove di rilascio nella sottocartella `rilascio/`. Per prudenza, le nuove finestre ripartono dal successivo Ready della sola documentazione conclusiva, da registrare nel riscontro finale:48ore solo monitoraggio/regressioni;7giorni senza altri interventi estesi.
