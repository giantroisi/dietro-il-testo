# Tre pillole in formato Storia — pilot del 13 ottobre 2026

## Problema e intervento
Una sintesi grafica originale dentro tre schede, come richiesto nella chat «Analizza report GSC e pianifica». Preparato solo dopo pubblicazione e verifica produzione di Youngblood. Una figura per Hotel California, Caruso, Azzurro, fra primo e secondo paragrafo della storia: dopo la spiegazione principale, separata dagli acquisti da prosa editoriale. Nessuna nuova pagina, frase di canzone, traduzione o citazione inventata.

## Modello identificato e provenienza
Sottolineature `assets/share.js`, `tools/social-images/render.cjs`, `assets/quote-social.css`, letti senza modificare quella copia; hash originali in prove/modello-originale.json. Portata la funzione canvas deterministica: misure, cornice, margini sicuri, palette, font serif e algoritmo identici. Adattamenti espliciti: logo.png di Dietro il testo e relativo dominio; nota musicale invece di virgolette; dicitura «Pillola editoriale» invece dell'attribuzione a un autore. Impedisce di scambiare la sintesi per una frase dell'artista. Font di sistema usati per il rendering, non distribuiti. Nessuna immagine esterna, copertina o generazione AI.

Tre testi in dati/pillole.json; contenuti di Dietro il testo, sintesi originali. Hotel California: dichiarazione indiretta attribuita a Henley; CBS News riaperta. Caruso: lettura editoriale del rapporto fra memoria e amore, coerente col primo paragrafo e Fanpage riaperta; nessuna nuova asserzione biografica. Azzurro: marcetta e ricezione fuori moda, dalla dichiarazione di Conte riportata da Rockol riaperta. Fonti visibili sotto ogni figura; le fonti e le date di verifica preesistenti delle schede sono preservate, nessun nuovo bollino. Questa non è una revisione integrale delle schede.

## File, formato e resa
- dati/pillole.json: tre voci e hash delle due varianti.
- scripts/pillole/modello.js e render.cjs: adattamento deterministico del modello identificato.
- scripts/genera/pillole.mjs: composizione HTML, controllo coerenza e hash; inerte per le altre 318 canzoni.
- scripts/genera/pagine.mjs: un inserimento condizionale dopo il paragrafo scelto e CSS limitato alle tre schede.
- scripts/genera-sito.mjs: copia statica degli asset; modalità mirata copia soltanto gli slug richiesti.
- sei WebP in pillole/: 1080×1920, 61.074–71.166 byte, circa 60–70 KiB. Una figura visibile per pagina, immagine chiara o scura secondo il tema della pagina; solo la variante visibile viene caricata inizialmente nell'anteprima osservata. La seconda può caricarsi quando cambia il tema.
- tre HTML e tre voci in sitemap-canzoni.xml; dossier, prove e Roadmap §98.

Rapporto 9:16, larghezza massima 352px centrata, 342px a viewport390 e 272px a320. width/height e aspect-ratio riservano spazio; caricamento lazy e decoding async. Alt riporta la sintesi completa; didascalia a13px con fonte leggibile. Entrambe le varianti superano AA per corpo e metadati; oro decorativo e dominio del marchio conservati dal modello. Nessun dato di CLS sul campo dichiarato: controllo strutturale dello spazio riservato, non misurazione GSC.

## Date e isolamento
Base 4404e4098, comprendente Youngblood pubblicata e la sua documentazione locale non ancora inviata. Prima del build lette protezioni F40; solo genera-sito --solo-canzoni hotel-california,caruso,azzurro, ripetuto per verificare persistenza. Nessuna generazione completa o modifica datePublished. Title, description, og:description, canonical, H1 e CTA affiliate preservati. dateModified e lastmod al13ottobre soltanto nei tre URL; prima/dopo e hash in ambito-date.json. Gli altri 693 HTML e cinque sitemap identici. L'HTML dei tre include anche la protezione mobile minmax già nel template vigente; nessuna modifica allo stile condiviso.

## Prove e limiti
SEO696, link321/104, coerenza e affiliazioni1065 positivi; nature71valide/250assenti/0rifiutate. Nove controlli browser1280×900,390×844,320×568: una figura, una variante visibile1080×1920, niente overflow. Tre ulteriori verifiche tema chiaro390px, nessun errore console. Screenshot mobile e misure archiviati. Controllo render: testo completo entro cornice; dimensioni corrette. Negativi: artista discordante, meno di due paragrafi e hash alterato respinti. Seconda generazione mirata identica per le tre pagine e date stabili.

Copia /Users/gianmicheletroisi/.codex/worktrees/pillole-storia-pilot-2026-10-13/dietro-il-testo, ramo codex/pillole-storia-pilot-2026-10-13. Main e documenti non tracciati preservati; Michael Jackson e copia dell'altra AI intatti. Nessun accesso GSC, IndexNow, integrazione, push o pubblicazione del pilot. Pronto da presentare per approvazione specifica. La pubblicazione includerebbe anche la documentazione locale Youngblood 4404e4098, il cui secondo push è stato rifiutato dall'auto-review: va autorizzata esplicitamente insieme al pilot. Michael Jackson viene dopo la verifica produzione del pilot.

Per rigenerare, runtime Node con @napi-rs/canvas disponibile e font di sistema; passare prove/pillole-input.json a scripts/pillole/render.cjs. Se cambia un WebP aggiornare dati/pillole.json con SHA256 dopo controllo visivo; il generatore rifiuta hash diversi. Non cambiare i tre testi automaticamente.

Filone concluso nella copia: pillole editoriali, pilot verificato; pubblicazione in attesa.
