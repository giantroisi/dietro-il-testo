# Due fasi separate — allineamento CSS e quattro prodotti Amazon

**26 ottobre 2026 — preparate e verificate, non applicate né pubblicate.**

## Base e isolamento

Worktree esclusivo: `/Users/gianmicheletroisi/.codex/worktrees/amazon-cinque-2026-10-25/dietro-il-testo`, ramo codex/amazon-cinque-2026-10-25. Base pubblica e8258f0ef1e6e0acae4169ab68e08522b27e10d9, ancora main GitHub all’ultimo controllo in sola lettura. Rilascio precedente già verificato Ready/domìni/29fileHTTP; non ripetuto dopo il mandato. Main concorrente e worktree precedente intatti, compresi22hash di file concorrenti. Baseline prima dei tentativi conservata: Git, date/hash delle pagine, sei sitemap con tutti gli URL/lastmod/conteggi e impronte.

**In questa copia Git cambiano solo documentazione e prove sotto rapporti/ e ROADMAP.** Le sorgenti operative, i dati Amazon, tutti gli HTML pubblici, date e sitemap rimangono byte-identici alla base. Le proposte seguenti sono sotto rapporti/prove-amazon-fasi-2026-10-26/, in due directory e due manifesti distinti. Nessun input è stato trasferito nei percorsi operativi.

## Fase A — sola sorgente della regola CSS

File futuro unico: `scripts/genera/stile.mjs`, riga415. Diff dedicato `fase-a/sorgente.diff`:

```diff
- grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
+ grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```

Riallinea la sorgente della regola divergente a quella degli artefatti del lotto commerciale. Nessun altro selettore, componente, template, dato, contenuto, data o baseline modificato. Amazon invariato108prodotti.

Due build complete da snapshot immutabile della base con la sola riga proposta: **Impatto SEO0/50**; **tutti i1129file pubblici prodotti identici byte per byte al commit e8258f0ef**, compresi696HTML, immagini/asset, ricerca e sei sitemap. Zero differenze inevitabili da accettare, nessun cambiamento visivo o editoriale. Impronte per ciascun file e determinismo conservati; gli scarti ereditati sono conservati dal gate esistente, senza aggiornare i34sigilli. Nessuna patch manuale sull’HTML.

Manifesto proposto della sola fase A: **11c0c24cad7cbc7ec16390b2a39970e02a981c23c3e7c55c2daddbe186b619a9**. Contenuti: zeroURL; unico file sorgente e sua impronta anche in strutturali; promozione pubblica vuota. È proposta di intervento tecnico, non autorizzazione né firma.

## Fase B — quattro prodotti, otto pagine

La fase B è stata ricostruita soltanto dopo il confronto positivo della fase A, usando quel suo codice nello snapshot di anteprima. File dati futuro unico: `dati/affiliazioni-prodotti.json`, quattrosole chiavi nuove,108record precedenti intatti, totale112. Nessuna scelta artista o componente cambiato.

| Prodotto | Formato | ASIN |
|---|---|---|
| Bollicine — Vasco Rossi | Vinile | B0C1P5J8MQ |
| Pino Daniele — Pino Daniele | Vinile | B00USIGLOI |
| Peace Sells... but Who’s Buying? — Megadeth | CD | B0002EXH54 |
| Powerage — AC/DC | Vinile | B0000CDLL0 |

TrackingIDdietroiltesto-21 invariato e link esatti del mandato. Provenienza Prime/venditore/speditore e ControlloLink: dossier autenticato dell’altraAI del25ottobre, senza attribuire a Codex una verifica Tracking non eseguita. Bollicine ricontrollato26; offerte degli altri prodotti da riaprire subito prima di un eventuale rilascio. Il CD Megadeth resta la scelta specifica del mandato; il dossier scarta il vinile per costo/importazione, non come prova di assenza di Prime. CTA già esistente «Acquista su Amazon», nessuna dicitura affiliazione nei pulsanti, informativa unica in fondo e nessun prezzo nei riquadri.

### Otto URL esatti

- /canzone/vita-spericolata/
- /album/vasco-rossi/bollicine/
- /canzone/je-so-pazzo/
- /album/pino-daniele/pino-daniele/
- /canzone/peace-sells/
- /album/megadeth/peace-sells-but-whos-buying/
- /canzone/rock-n-roll-damnation/
- /album/ac-dc/powerage/

La cura, L’imboscata e B000006SS1 esclusi completamente dalla fase B. Le due pagine sono identiche alla base; nessun ganci.json adottato. Tutti i tentativi precedenti restano prove non adottate, non parti di questi manifesti.

### Diff e date candidati

**Impatto SEO8/50**, senza deroghe. OttoHTML diversi e688byte-identici; testi editoriali di tutte696pagine, datePublished, title, description, canonical, homepage, ricerca, artisti e baseline storica intatti. Il confronto HTML stretto rimuove soltanto blocchi Amazon, informativa, CSS **esatto** del componente Amazon esistente, dateModified ammesse e righe vuote: tutte e otto le pagine risultano identiche alla base nel resto dell’HTML, senza driftCSSgenerale. Diff completo fase-b/lotto.diff e attestazione per pagina conservati.

Nella sola anteprima: quattro canzoni dateModified02→26ottobre; quattro album29settembre→26ottobre. Sei lastmod: quattro canzoni e album Bollicine/PeaceSells. Powerage/PinoDaniele restano fuori dalle sitemap come già in produzione. sitemap-canzoni321URL/quattrodate e sitemap-album130URL/duedate; quattro altre sitemap byte-identiche (artisti104, raccolte9, pagine7, indice5voci). Nessun nuovo URL o conteggio. Due generazioni della fase B,1129file identici, date/sitemap stabili.

Manifesto proposto fase B: **8b112ab64d920a92cdc6d144a4ccfd63d5ddff4a2156d099191a778d1595db34**, unico input dati e dieci artefatti candidati (ottoHTML+due sitemap), zero file strutturali. **Dipende dall’integrazione autorizzata della fase A**: non firmarlo o applicarlo direttamente sulla base attuale che contiene ancora la sorgente CSS divergente.

### Verifiche

- Controller esterno installato sulla base e8258f0ef: storia accettata, impattozero e file pubblici identici.
- Fasi A/B sono anteprime locali da snapshot immutabili; la build operativa col controller dei loro nuovi manifesti richiederà prima l’approvazione e le firme del proprietario secondo AGENTS. Non è stata aggirata questa distinzione.
- Validatore affiliazioni:1155link, tag/ASIN/formati/rel/dichiarazione e casi negativi esistenti positivi. SEO696pagine/zero problemi, contestuali7percorsi/10link positivi.
- Nuova verifica della fase B su tutte le otto pagine:16viste1280×900/390×844, tre riquadri visibili, disclosure unica, unaH1, zerooverflow e zeroerrori console; tutti i link mantengono tag/ASIN/target_blank/sponsored/nofollow/noopener. Screenshot desktop/mobile osservati, viewport ripristinato.
- Clic canzone→album→canzone e apertura della nuova scheda Amazon corretta già provati prima del solo riallineamento CSS; link/markup restano identici nella fase B finale. Nessun acquisto.

## Stato e limiti per il passaggio successivo

Solo documentazione locale, nessuna chiave privata letta/usata, nessuna firma o approvazione operativa A→C→P creata, nessun push, deploy, pubblicazione, IndexNow o GSC. Attendere l’approvazione specifica del proprietario per **entrambi** i manifesti e il nuovo uso circoscritto della chiave. Prima di pubblicare riaprire le offerte, considerare la data della futura generazione e le finestre di sicurezza previste dalle routine; non riutilizzare una firma su byte/digest diversi.

Il lotto L’imboscata resta separato. Nessun altro prodotto, immagine, URL o intervento avviato.
