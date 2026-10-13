# Youngblood — due correzioni sostanziali, 13 ottobre 2026

## Osservazioni e precedenza

Letti Costituzione, Roadmap recente e stato reale di main e copie separate. La proposta Michael Jackson resta pulita al commit 017bad3e1 e non è approvata/integrata. Main/origin ancora f8ce08b0a. La copia dell’altra AI conserva i rapporti in lavorazione e non è stata modificata. Dodici vecchie copie in Vediamo non rispondono al controllo Git entro un secondo: lasciate intatte.

La ricerca fotografica del solo artista R.E.M. è stata interrotta dopo la lettura del rapporto `rapporti/orario/30-youngblood.md`/`DA-INTEGRARE.md` dell’altra AI. Due errori P1/P2 ancora online richiedono precedenza: Louis Bell omesso dagli autori; parafrasi del ritornello che attribuiva al brano un invito ad allontanarsi finché giovani. Il prelievo HTTPS del 13 ottobre coincide byte per byte con la pagina di main: SHA-256 `207945c982e5a6c1309b3a136b7859119cc271d3d2c86da8764d2acc25e46822`.

## Fonti riaperte e correzioni

1. [Qobuz — Youngblood, traccia 1](https://www.qobuz.com/us-en/album/youngblood-5-seconds-of-summer/wt7yyw4b1r1vc): crediti digitali riportano Luke Hemmings, Calum Hood, Ashton Irwin, Andrew Watt, Louis Bell e Ali Tamposi come ComposerLyricist. Copyright della registrazione One Mode Productions / Universal Music Operations.
2. [Shazam — Youngblood](https://www.shazam.com/en-us/song/1369109665/youngblood): sezione COMPOSITION & LYRICS conferma i sei Songwriter. Il testo del ritornello alterna richiesta di separazione e bisogno dell’altra persona: non contiene l’invito descritto nella vecchia parafrasi. Nessun verso o traduzione trascritto nel sito o nelle prove.
3. [Universal Music Italia](https://www.universalmusic.it/popular-music/album/youngblood_32554123219/), riaperta come contesto: contiene crediti di produzione, non la lista dei compositori usata per questa correzione. Non aggiunta alle fonti della scheda.

Aggiunto Louis Bell nel solo incipit del corpo; description, og:description, JSON-LD e testo di condivisione riallineati dal generatore. Due nuove fonti visibili nella sezione Sui crediti. Corretto soltanto il primo passaggio del momento iconico: «Il ritornello mette in scena un legame instabile: il desiderio di separarsi si alterna al bisogno dell’altra persona.» Il resto del momento iconico è preservato.

Rigenerata soltanto la cartolina Youngblood, controllata visivamente: 1200×630, nuova parafrasi, versione `f4b142e25ad7` negli URL OG/Twitter per evitare l’anteprima vecchia in cache. SHA-256 `f4b142e25ad7992eb1fc847e50d4389d8e783c335250cfb7c5738d5953d7f758`.

## File toccati e date

- `dati/canzoni.json`: unico record youngblood, campi corpo[0], fraseIconica e fonti.
- `dati/og-versioni.json`: sola chiave youngblood aggiunta.
- `og/youngblood.png` e `canzone/youngblood/index.html`.
- `sitemap-canzoni.xml`: sola voce Youngblood, lastmod 2 → 13 ottobre 2026, coerente con dateModified della pagina.
- Questo dossier, prove e ROADMAP §97.

DatePublished, title e canonical invariati; 695 altri HTML e cinque altre sitemap identici. Nessuna modifica a dati degli artisti, foto o affiliazioni. Nessuna modifica ai template: l’HTML mirato incorpora il minmax mobile già presente nel template vigente.

## Verifiche

Protezioni F40 lette prima di generare. Baseline da file tracciati, `genera-sito --solo-canzoni youngblood`, nessun build generale. `genera-og --slug youngblood`: una sola cartolina. Prima esecuzione Python priva di numpy; completata usando il runtime già incluso in Codex, senza installazioni.

SEO 696 pagine/zero problemi; link 321 canzoni e 104 artisti/zero problemi; affiliazioni 1.065 link/positivo; coerenza zero problemi; nature 71 valide, 250 assenti, zero rifiutate. Browser 1280×900, 390×1000 e 320×1000: testo e crediti corretti, fonti presenti, nessun overflow o errore/warning console. Screenshot e misure in [prove-youngblood-2026-10-13](prove-youngblood-2026-10-13/). Diff senza errori di spazio.

## Limiti e autorizzazioni

Non è una revisione integrale: restano fuori da questo lotto le citazioni dell’intervista, la distribuzione preorder, le classifiche e i record di ascolto segnalati nel rapporto. Nessuna nuova ultimaVerifica o attribuzione di verifica indipendente; avviso «non ancora verificata frase per frase» conservato. Le anteprime in altri HTML e l’indice di ricerca non sono rigenerati: possono conservare l’incipit precedente fino a un successivo intervento approvato. Non dichiarata alcuna verifica GSC.

**Proposta isolata da approvare**, copia `/Users/gianmicheletroisi/.codex/worktrees/youngblood-crediti-2026-10-13/dietro-il-testo`, ramo `codex/youngblood-crediti-2026-10-13`, base f8ce08b0a. Registrazione app impedita dal limite di 100 allegati, anche al tentativo di collegamento; checkout disponibile. Main, due documenti SEO non tracciati e loro hash preservati; copia dell’altra AI e lotti pendenti intatti.

Per integrare dopo approvazione, unire solo i campi del record youngblood e la chiave OG nel JSON, i due file pubblici, la sola voce sitemap e la nuova sezione §97 della Roadmap. Non sovrascrivere documenti interi: §96 della proposta Michael Jackson resta separata e richiede la propria approvazione. Non trasferito nel main, nessun push o deploy. Servono autorizzazioni specifiche per queste azioni.

Filone concluso: **correzione sostanziale circoscritta P1/P2**. Il successivo ciclo può riprendere la ricerca fotografica dei R.E.M.; nessun lotto fotografico R.E.M. è dichiarato concluso.
