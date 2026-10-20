# Autorità dei lotti, promozione baseline e IndexNow — 20 ottobre 2026

## Stato e limite operativo

**Preparazione verificata, solo locale, sul ramo `codex/generatore-perimetro-2026-10-20`, a partire da97af497b3.** Non integrata, non inviata a GitHub, non distribuita. Nessun IndexNow reale o GSC eseguito. La copia principale, le modifiche concorrenti e tutte le prove precedenti sono intatte.

**Il bootstrap del proprietario non è stato eseguito.** Sul Mac manca l’ancora reale: non è stata inventata una chiave del proprietario né creata un’approvazione a suo nome. I20casi usano chiavi effimere e repository effimeri, eliminati. Per l’esercizio serve una copia fidata del controller, immutabile rispetto alla routine, e una chiave pubblica autentica configurata fuori dal repository. Questo è un prerequisito di integrazione, non una protezione già attiva nel main.

Un verificatore caricato dal medesimo ramo modificabile potrebbe essere eliminato insieme al controllo: non costituisce una radice di fiducia. Il controller deve partire da un’installazione del proprietario/ambiente di rilascio protetto e da un runtime e ambiente controllati. Non basta aggiungere questi file al repository. Il renderer diretto rimane uno strumento per **anteprime non autorizzate al rilascio**; il percorso operativo della routine e il punto di promozione devono passare dal controller fidato. Arbitraria esecuzione di codice con gli stessi privilegi del proprietario, o modifiche al controller/configurazione esterni, sono fuori da questa barriera e vanno impedite dall’installazione. Nessuna garanzia assoluta contro un processo che controlli lo stesso account e il sistema operativo.

## File del lotto

| File | Modifica |
|---|---|
| scripts/genera/autorita.mjs | verifica firme, storia, commit-base, perimetro dei file, snapshot immutabile, promozione e consenso IndexNow |
| scripts/lotto-sicuro.mjs | entrypoint da installare nella copia fidata; non legge autorità da variabili o manifesti |
| dati/policy-lotti.json | policy da leggere nel commit iniziale fidato: tutti gli script, baseline, policy/manifesti/ricevute, CI, configurazioni sensibili e artefatti pubblicati usati come base protetti |
| scripts/indexnow.mjs | rete disabilitata per impostazione predefinita; invio esplicito con consenso firmato e pubblicazione attestata |
| scripts/test-autorita-lotti.mjs |20prove con firme reali di fixture e veri commit/checkout temporanei |
| scripts/test-generatore-perimetro.mjs | stessi13casi precedenti; caso14adattato al nuovo IndexNow tramite API e trasporto simulato |
| ROADMAP e dossier/prove | solo stato, risultati, impronte e procedura |

Non cambiati: modello delle cinque interpolazioni, home/client verificati, perimetro originale, baseline attuale con34casi storici, canzoni, album, artisti, cartoline/immagini, sei sitemap e artefatti pubblici. La nuova promozione è stata eseguita soltanto nelle fixture.

## 1. Ciclo della baseline

`propostaPromozione` è una funzione senza scritture: da un output completo e verificato produce le impronte degli artefatti modificati e della futura baseline. Non approva, non promuove, non ricava un’autorizzazione da un errore. Il proprietario deve approvare quelle impronte **prima** del lotto operativo.

La promozione autorizzata:

- ricontrolla input, artefatti, datePublished, canonical, URL sitemap e lastmod fuori perimetro;
- confronta esattamente il risultato con la sezione `promozione.files` del manifesto già firmato;
- aggiorna solo le impronte delle cartoline/immagini dichiarate, preservando le34coppie storiche;
- copia soltanto gli artefatti approvati nel checkout locale e scrive una ricevuta;
- **non pubblica e non invia IndexNow**.

Il commit successivo con artefatti e baseline promossi diventa la base ordinaria: un nuovo checkout pulito può generare senza ridichiarare la vecchia cartolina. Per un collegamento il nuovo HTML e il suo lastmod diventano la base; non resta un lotto pendente per sempre.

## 2. Radice di fiducia e approvazione precedente

La chiave pubblica e il commit iniziale vengono letti da un percorso fisso del profilo di sistema, usando `os.userInfo()`, non daHOME, flag di consenso o variabili del manifesto:

`~/.config/dietro-il-testo/autorita.json`

Il file contiene versione1, digest completo del commit iniziale fidato e chiave pubblicaEd25519in formatoSPKI/PEM. **Non contiene una chiave privata.** La firma deve essere prodotta fuori dalla routine, con una chiave privata custodita dal proprietario fuori dalla sua disponibilità.

Il manifesto operativo ha versione2 e contiene `contenuti` (listaURL/cartoline versione1), `files` con impronteSHA256esatte degli input, `strutturali` e `promozione.files`. Il percorso riconosciuto è solo `lotti/<digest-SHA256-del-file>.json`; un altroJSON non conferisce autorità.

L’approvazione viene conservata in `approvazioni-lotti/<digest>.json`. La firmaEd25519copre i bytesUTF-8di `JSON.stringify(payload)`, con payload comprendente versione1, digest del manifesto, digest del genitore del commit di approvazione e azioni concesse. `build` e `promuovi` sono per il singolo lotto; `struttura` serve in più per modificare baseline/gate/policy fuori dalla promozione deterministica. Un valore `approvato:true` non ha alcun ruolo.

Sequenza verificata:

1. **B**: base ordinaria già fidata.
2. **A**: commit-base del lotto, aggiunge solo manifesto e approvazione firmata (più eventuale documentazione). La firma si lega aB. Non può cambiare nello stesso commit i file che pretende di autorizzare.
3. **C**: input esatti approvati e ricevuta di preparazione, dopo build riuscito e confronto delle impronte. Un file strutturale richiede la relativa azione firmata già inA. HTML/sitemap/client pubblicati non possono essere trattati come input editoriali ordinari: il loro aggiornamento passa dalla promozione approvata.
4. **P**: soli artefatti/baseline approvati e ricevuta di promozione. Nessuna pubblicazione automatica.
5. Nuovo checkout suP: build vuoto riuscito; un secondo lotto editoriale segue un nuovoA specifico, **senza riapprovazione globale della policy**.

Il controller controlla la storia dal commit iniziale fidato, non soltanto lo stato finale. Un’approvazione aggiunta insieme alla modifica resta invalida anche scegliendo quel commit come `--base`. Firme con un’altra chiave, manifesti riscritti, ricevute discordanti e modifiche protette senza consenso precedente bloccano.

Git usa binario di sistema, ambiente ridotto, oggetti senzareplace e configurazione globale esclusa. Il confronto legge realmente i file rispetto agli oggetti Git: `assume-unchanged` non nasconde una modifica. Il build avviene da uno snapshot del commit-base con sovrapposti i soli bytes approvati, non caricando codice dal ramo modificabile; preload e moduli scelti dall’ambiente non vengono propagati. Gli input di build della base devono essere file regolari, non symlink. Output nuovi, esterni al checkout; snapshot rimossi anche in errore.

L’installazione iniziale del controller e la sua sostituzione non possono essere autoapprovate dal ramo. Le merge vengono fermate: per questo protocollo si usa una sequenza lineare. Cambio della base o cherry-pick che cambia il genitoreA richiede ricalcolo e nuova firma, non riuso della vecchia autorità.

## 3. IndexNow

- Senza `--invia`: nessuna rete, nessuna lettura della chiave, nessun invio per lastmod odierno.
- `--tutti` vietato; `--prova` insieme a `--invia` rifiutato.
- Serve un consenso **separato**, firmato dal proprietario dopo aver attestato la pubblicazione reale diP, già in un commit-base successivo.
- Il consenso lega manifesto/digest, commit pubblicato, host, digest della listaURLesatta e nonce. Una ricevuta locale di promozione da sola non prova che il sito sia online.
- Gli URL sono solo quelli del manifesto firmato, massimo50; non vengono selezionati dalle sitemap per data.
- Il checkout deve essere pulito e la sua storia autorizzata. Il consenso viene consumato una sola volta prima della rete; nessun retry automatico se la richiesta fallisce.
- Stato dei nonce in un percorso fisso esterno (`~/.local/state/dietro-il-testo/indexnow/`), da proteggere dalla routine insieme al controller e alla configurazione. La routine non deve poter cancellarlo per riusare un consenso.

Il controller di build/promozione non chiama IndexNow. Il comando di invio va eseguito dalla copia fidata, in un passaggio separato e autorizzato del proprietario. Non esiste un’opzione del manifesto che autorizzi la rete e non è stata creata un’approvazione reale in questo lotto.

## Risultati

20casiE2Epassati: cartolina approvata→promozione→clonepulito→buildvuoto; successivo collegamento senza residui; cinque manomissioni ai file richiesti; modifica nascosta allo statusGit; digest manifesto; autoapprovazione nello stesso commit; firma estranea; consenso editoriale insufficiente per struttura; consenso strutturale precedente valido; defaultIndexNowsenza rete; invio simulato dei soliURLesatti; nonce monouso; rete bloccata con checkout manomesso.

Nel test di invio l’unico URL è **/canzone/basket-case/**. La cartolina **/canzone/21-guns/**, che aveva anch’essa una modifica recente, non viene inviata. Il trasporto è una funzione simulata: rete reale0. La pubblicazione attestata, le firme e i commit sono tutti di fixture, non del sito.

Regressione14/14passata:1124file deterministici,696HTML invariati, datePublished/dateModified/lastmod/canonical/inventario571URL invariati e sei sitemap byte-identiche. Homepage e rotazione restano quelle già verificate in97af; relativo codice e prove precedenti byte-identici. Tutte le fixture/snapshot eliminati. Prove nuove in `rapporti/prove-autorita-lotti-2026-10-20/`.

## Procedura di integrazione sicura — soltanto dopo nuova approvazione

1. Rileggere Git/ROADMAP del main e tutte le modifiche concorrenti. Preparare una copia d’integrazione pulita. Non sovrascrivere i due script e i fileSEO ancora non committati. La sequenza locale è8eda33649→97af497b3→questo lotto;8eda è uno snapshot delle dipendenze, **non** un permesso a integrarle alla cieca.
2. Mostrare il diff completo da integrare e ottenere una nuova approvazione specifica. Questa preparazione non la sostituisce. Nel primo rilascio tecnico allineare soltanto il client già verificato in97af, se espressamente approvato; HTML/date/sitemap devono rimanere invariati.
3. Il proprietario sceglie e verifica il commit inizialeS dopo la revisione. Installa daS una copia del controller e della sua libreria fuori dai rami modificabili, con runtime/ambiente fissi, configura l’ancora con la sua chiave pubblica autentica e protegge installazione/configurazione/stato dalla routine. Nessuna chiave privata al modello o al repository. L’accesso alla promozione/pubblicazione deve essere riservato a questo percorso: eseguire il renderer diretto non dà alcun permesso di rilascio.
4. Per il futuro lotto preparare un’anteprima isolata e una proposta con impronte esatte, senza promuovere. Il proprietario firma il manifesto revisionato inA, prima diC. Dal controller installato eseguire `--repo <copia> --base <A-completo> --lotto lotti/<digest>.json --out <nuova-cartella-temporanea> --sigilla`.
5. SalvareC, quindi eseguire dal controller fidato la promozione con gli stessi repo/base/manifesto/output e `--promuovi`. Verificare che il diff corrisponda al manifesto, salvareP e verificare un checkout pulito con `--base <P>` senza manifesto. Nessun nuovo contenuto viene approvato da questo passaggio tecnico.
6. Solo dopo separata autorizzazione al rilascio: integrazione/push/deploy e riscontro online del commit esatto. Se si vuoleIndexNow, il proprietario attesta allora la pubblicazione e firma un consenso distinto inI; solo dopo si può usare la copia fidata diIndexNowcon `--invia --repo <copia-pulita> --base <I> --consenso consensi-indexnow/<nonce>.json`.

**Fermo qui:** main non modificato, nessun push/deploy/installazione/IndexNow/GSC. Serve approvazione del pacchetto tecnico e bootstrap autentico prima di renderlo operativo; non risultano acquisiti da una variabile, da un manifesto o da questo referto.
