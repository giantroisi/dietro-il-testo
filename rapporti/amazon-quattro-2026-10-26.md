> **Esito successivo:** il blocco CSS qui documentato è stato risolto nella proposta tecnica separata della fase A. Il risultato finale delle due fasi è in [amazon-fasi-2026-10-26.md](amazon-fasi-2026-10-26.md). Questo rapporto e i suoi manifesti rimangono prove storiche non adottate.

# Quattro prodotti Amazon — verificati, blocco sullo stile ereditato

**26 ottobre 2026. Stato: proposta non applicata e non pubblicabile.**

## Base e isolamento

Copia nuova `/Users/gianmicheletroisi/.codex/worktrees/amazon-cinque-2026-10-25/dietro-il-testo`, ramo codex/amazon-cinque-2026-10-25, dalla produzione e8258f0ef1e6e0acae4169ab68e08522b27e10d9. Il rilascio precedente è già stato confermato Ready, assegnato ai domini e identico su29fileHTTP; non è stato ripetuto dopo il mandato di ripresa. La base contiene108prodotti. Main concorrente e copia precedente rimasti intatti: riscontro di stato, HEAD e22hash dei file concorrenti in preservazione-finale.json. Le altre copie non sono state scritte né ripulite. Baseline iniziale con dieci URL, sei sitemap/lastmod/hash e stato Git conservata; l’ambito è poi stato ridotto a otto URL.

## Prodotti del mandato ridotto

| Album | Formato | ASIN | Canzone |
|---|---|---|---|
| Bollicine | Vinile | B0C1P5J8MQ | Vita spericolata |
| Pino Daniele | Vinile | B00USIGLOI | Je so’ pazzo |
| Peace Sells... but Who’s Buying? | CD | B0002EXH54 | Peace Sells |
| Powerage | Vinile | B0000CDLL0 | Rock ’n’ Roll Damnation |

Proposta108→112prodotti. TrackingIDdietroiltesto-21 e108record precedenti intatti; quattrosole chiavi nuove, nessuna scelta artista cambiata. URL identici al mandato, con origine formato-documentato-amazon, documentazione ufficiale ed esito ControlloLink positivo del25ottobre attribuiti al dossier autenticato dell’altraAI. Prime/venditore/speditore del25conservati come tali; solo Bollicine ricontrollato il26anche nel browser Codex. Nessun nuovo esito Tracking inventato. Offerte da riaprire prima della futura pubblicazione.

Il dossier scarta il vinile Megadeth per costo/importazione: il CD è la scelta specifica del mandato ridotto, non una prova di assenza del vinilePrime. Non è stata inventata una motivazione diversa. L’imboscata B000006SS1 è completamente esclusa dai dati di questa proposta; /canzone/la-cura/ e /album/franco-battiato/limboscata/ sono byte-identici alla base. Il primo tentativo di cinque prodotti e il mancato allineamento della sorgente sono conservati separatamente come prove non adottate.

## Otto URL

- /canzone/vita-spericolata/
- /album/vasco-rossi/bollicine/
- /canzone/je-so-pazzo/
- /album/pino-daniele/pino-daniele/
- /canzone/peace-sells/
- /album/megadeth/peace-sells-but-whos-buying/
- /canzone/rock-n-roll-damnation/
- /album/ac-dc/powerage/

## Date e sitemap candidate, soltanto nell’anteprima

Otto HTML diversi,688byte-identici. Per le quattro canzoni dateModified02→26ottobre; per i quattro album29settembre→26ottobre. Sei lastmod: quattro canzoni e i soli album Bollicine/PeaceSells già indicizzati. Gli altri due album conservano il loro stato e non entrano nelle sitemap. sitemap-canzoni321URL/quattrodate, sitemap-album130URL/duedate; sitemap-artisti104, raccolte9, pagine7 e indice5voci restano byte-identiche. Nessun URL/conteggio cambiato. DatePublished, title, description, canonical, testo editoriale delle696pagine, home, ricerca, artisti e baseline storica invariati. Nessun ganci.json adottato, nessuna revisione editoriale.

## Controlli positivi

- Base verificata dal controller esterno installato: impattoSEOzero,696HTML/seisitemap/ricerca identici alla base. Nessuna firma nuova e nessun uso della chiave privata.
- Anteprima da snapshot immutabile della stessa base, senza generatori del main concorrente: impattoSEO8/50, senza deroghe.
- Due generazioni della proposta:1129file identici, date/sitemap stabili.
- Validatore affiliazioni:1155link, ASIN/tag/rel/formati/dichiarazione coerenti, anche casi negativi esistenti. SEO696/zero problemi; contestuali7percorsi/10link positivi.
- Sediciviste browser: ognuna delle otto pagine a1280×900 e390×844, tre riquadri visibili, una informativa in fondo, unaH1, zerooverflow e zeroerrori console. CTA esatta Acquista su Amazon; target_blank e sponsored/nofollow/noopener.
- Clic canzone→album→canzone conserva lo stesso ASIN; clic Amazon apre una nuova scheda sul vinile Bollicine corretto con tagdietroiltesto-21. Nessun acquisto. Screenshot desktop/mobile osservati e conservati; viewport ripristinato.

## Gate finale negativo: CSS generale fuori richiesta

Il confronto più stretto rimuove soltanto blocchi Amazon, informativa, dateModified ammesse, righe vuote e il CSS **esatto** del componente Amazon esistente. Su tutte e otto le pagine resta una sola differenza generale:

```diff
- grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
+ grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
```

Il renderer della base già contiene questa regola, ma gli artefatti pubblicati delle otto pagine usano ancora la versione precedente. Aggiungere un prodotto fa riaffiorare anche questo scarto tecnico. Non è stato scritto nuovo CSS, ma pubblicare l’output cambierebbe comunque una regola del layout, vietato dal mandato. Il confronto per parole non lo vedeva perché escludeva i blocchi style: il gate stretto lo ha rilevato prima di qualunque applicazione. Differenza completa in diff-fuori-amazon.patch. Non è stata nascosta, ignorata né corretta manualmente nell’HTML.

## File effettivi e stato della proposta

Nel worktree cambiano soltanto ROADMAP e documentazione/prove sotto rapporti/. Il catalogo operativo, gli otto HTML, tutte le date e le sei sitemap restano intatti. Il catalogo proposto e i dieci artefatti candidati (otto HTML+duediverse sitemap) sono archiviati sotto proposta-non-pubblicabile/, **non nei percorsi operativi**.

Manifesto candidato f8d2247436368c967b14a9f022ad038323a22f817005f0a5650119de3e96f0ea, solo documentazione e non firmato: **non approvarlo né trasferirlo in lotti/** con il mandato attuale, perché le impronte includono il driftCSS. AGENTS richiede una nuova autorizzazione esplicita del proprietario prima di firmare qualsiasi futuro manifesto corretto. Nessuna firma, approvazione A, commit operativo C/P, push, deploy, pubblicazione, IndexNow o GSC.

## Decisione necessaria

Per completare il lotto serve risolvere il drift dello stile in un intervento tecnico separato oppure autorizzare espressamente la sola differenza CSS sulle otto pagine. Con il vincolo attuale non è possibile dichiarare il lotto pubblicabile. Non sono stati ampliati il perimetro o la baseline, né riaperti altri prodotti.
