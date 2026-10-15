# Due collegamenti nella prosa — lotto isolato del 15 ottobre 2026

**Stato: preparato e verificato, solo locale; da approvare prima di integrazione, push e pubblicazione.**

Copia: `/Users/gianmicheletroisi/.codex/worktrees/ritratto-nin-2026-10-15/dietro-il-testo`
Ramo: `codex/consolidamento-link-contestuali-2026-10-15`
Base: `e97f3d673`.

## Piano effettivo e motivazione

Due pagine sorgenti, due nuovi link: entro il limite di cinque sorgenti e quindici collegamenti del mandato. Sono trasformati in collegamenti soltanto titoli già presenti nella storia, senza aggiungere parole, paragrafi o elenchi.

| Sorgente | Titolo reso cliccabile → destinazione | Motivo documentato | Pagine distinte che collegano la destinazione |
|---|---|---|---|
| One Step Closer — Linkin Park, secondo paragrafo della storia | Killing in the Name → `/canzone/killing-in-the-name/` | Riferimento di Mike Shinoda al breakdown come modello per il bridge, già narrato nel testo | 10 → 11 |
| The Sound of Silence — Disturbed, primo paragrafo della storia | The Sound of Silence → `/canzone/the-sound-of-silence/` | Collegamento dalla reinterpretazione al brano originale di Simon & Garfunkel, già nominato | 8 → 9 |

Il conteggio riguarda il grafo locale di 698 file HTML tracciati, non dati GSC. Link interni nel DOM: 22.765 → 22.767; due nuove coppie sorgente/destinazione, nessun collegamento rimosso. Il controllo SEO copre invece 696 pagine secondo il proprio perimetro.

### Cluster prioritari esaminati

- Hot Fuss collega già Mr. Brightside e Somebody Told Me.
- Toxicity collega già Chop Suey!, Toxicity e Aerials.
- Rumours collega già Dreams e Go Your Own Way.
- Hotel California collega già la sua sola canzone presente nel catalogo.
- Come è profondo il mare non ha canzoni di quell’album nel catalogo attuale.

Non sono stati aggiunti duplicati per raggiungere il massimo numerico. Le pagine Chop Suey! e Mr. Brightside non cambiano.

## Evidenza GSC e limiti temporali

Baseline in `gsc-scansioni-2026-10-12`: il dato di indicizzazione è aggiornato **al 4 ottobre 2026**, non al giorno della preparazione. Nei CSV le due sorgenti risultano indicizzate; le due destinazioni risultano rilevate ma non indicizzate e non compaiono né fra le indicizzate né fra le scansionate escluse. Il valore 1970-01-01 dell’export è un segnaposto, non una scansione verificata.

Il registro locale, riletto il 15 ottobre, esclude le richieste dal 1 ottobre incluso: nessuna delle due destinazioni compare fra queste. Esclusi anche i quattro URL indicati nel mandato: Bring Me to Life, Nothing Else Matters, Starlight, Uprising. Fonti, percorsi, numero di righe e SHA-256 sono registrati in `prove-consolidamento-link-2026-10-15/ambito-grafo-gsc.json`.

Nessun accesso GSC live, nessuna richiesta di indicizzazione o IndexNow, nessuna modifica al registro. Il lotto non dimostra lo stato attuale di Google né garantisce una futura indicizzazione.

## Fonti musicali riaperte prima della modifica

Le fonti erano già elencate nelle rispettive pagine; non ne sono state aggiunte e non sono stati copiati versi.

1. Jason Lipshutz, estratto di *It Starts With One*, The Ringer, 1 ottobre 2024: [One Step Closer](https://www.theringer.com/2024/10/01/music/one-step-closer-linkin-park-it-starts-with-one-jason-lipshutz). Conferma il riferimento di Shinoda al breakdown dei Rage Against the Machine.
2. Nathan Wood, intervista a David Draiman, Music Feeds, 12 novembre 2015: [Disturbed Talk Breaking Their Hiatus & Their “Sound Of Silence” Cover](https://musicfeeds.com.au/features/disturbed-talk-breaking-hiatus-sound-silence-cover/). Conferma originale Simon & Garfunkel e scelta dell’arrangiamento.

È una verifica delle relazioni fra i brani, non una revisione editoriale integrale delle quattro schede.

## File modificati e riproducibilità

- `dati/collegamenti-contestuali.json`: due sole nuove voci, le cinque precedenti identiche. Ogni scelta dichiara artista sorgente, destinazione, artista destinatario, paragrafo e titolo esatto.
- `scripts/genera/collegamenti-contestuali.mjs`: supporto dei link su titoli esistenti; rifiuta destinazioni incoerenti, titoli assenti/ambigui e modalità testuali non supportate.
- `scripts/genera/pagine.mjs`: usa il supporto nella prosa ordinaria, mantenendo invariata l’escape del testo non selezionato.
- `scripts/check-collegamenti-contestuali.mjs`: controlla anche questa collocazione nella prosa.
- `canzone/one-step-closer/index.html`: un nuovo anchor, data già 15 ottobre e preservata.
- `canzone/sound-of-silence-disturbed/index.html`: un nuovo anchor e sua sola dateModified 12 → 15 ottobre.
- `sitemap-canzoni.xml`: unica variazione lastmod, Disturbed 12 → 15 ottobre.
- Questo dossier, ROADMAP §129 e prove dedicate.

**DatePublished, titoli, description e canonical sono invariati.** Altri HTML, dati canonici canzoni/pillole, ricerca, immagini e cinque altre sitemap identici alla base. Nessuna rigenerazione generale. Le cartoline restano ferme. Main, suoi due file non tracciati, copia dell’altra AI e lotti in revisione non modificati.

[Diff HTML](prove-consolidamento-link-2026-10-15/diff-html.patch) · [Diff completo dei sette file funzionali](prove-consolidamento-link-2026-10-15/diff-completo.patch).

## Verifiche effettuate

- SEO 696 pagine, coerenza/link 321 canzoni e 104 artisti, affiliazioni 1.065 link: zero problemi.
- Collegamenti contestuali: 7 percorsi e 10 link complessivi corretti, inclusi i due nuovi.
- Modello: due paragrafi con link, 668 altri paragrafi byte-identici; parole visibili invariate; casi titolo assente/ambiguo e artista errato respinti.
- Confronto di tutti i 698 HTML: solo i due anchor e la data prevista. Nessun altro cambiamento di contenuto.
- Browser locale autorizzato dal proprietario: sei percorsi, ciascuna sorgente a 1280, 390 e 320 px; clic reale, destinazione e titolo corretti, ritorno alla sorgente con posizione conservata entro 5 px, nessun overflow o errore console. Focus visibile controllato a 320 px.
- Due primi tentativi di clic dopo cambio formato avevano coordinate fuori viewport e non hanno attivato il link; ripetuti con riallineamento/focus, tutti i percorsi finali superati. Screenshot osservati e salvati.

Prove: `ambito-grafo-gsc.json`, `modello.json`, `controlli.json`, `browser.json`, sei PNG; script di confronto e modello conservati per ripetere le verifiche dalla radice della copia. Il diff HTML va letto insieme al diff dati/generatore, che rende persistente la scelta.

## Autorizzazioni e prossimo passo

Il proprietario ha autorizzato queste verifiche locali all’origine `http://127.0.0.1:8935`, per le sole quattro schede e desktop/mobile. Il mandato corrente copre la preparazione isolata e richiede di mostrare piano e diff prima del rilascio. Nessun push, deploy o pubblicazione eseguito. Dopo il commit locale, fermarsi e attendere l’approvazione di questi due link; nessun secondo lotto avviato.
