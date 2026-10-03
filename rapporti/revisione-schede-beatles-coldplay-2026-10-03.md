# Revisione congiunta: Here Comes the Sun e The Scientist — 3 ottobre 2026

## Perimetro

Riunite due proposte già preparate in una copia di revisione basata sul `main` locale dopo l'integrazione di Nightswimming e Yesterday (§48). I due rami originali non sono stati modificati. Il catalogo passa da 319 a 321 canzoni; restano 104 artisti. Si aggiungono le pagine essenziali degli album *Abbey Road* e *A Rush of Blood to the Head*, entrambe `noindex` perché hanno una sola canzone raccontata e non contengono un testo editoriale autonomo. Nessuna immagine aggiunta.

## Verifica delle fonti

Le fonti pertinenti sono state riaperte nel corso di questa revisione e confrontate con i punti sostanziali delle schede. I dossier originali conservati in `rapporti/scheda-here-comes-the-sun-2026-10-02.md` e `rapporti/scheda-the-scientist-2026-10-02.md` riportano la corrispondenza frase per frase, la natura delle affermazioni e gli URL.

- **Here Comes the Sun:** [The Beatles, scheda ufficiale](https://www.thebeatles.com/here-comes-sun) per autore, data, album, scaletta, registrazione e produzione; [Abbey Road Studios](https://www.abbeyroad.com/news/the-genius-of-george-harrison-as-told-by-abbey-roads-cameron-colbeck-2737) per il Moog; [The Guardian, Jon Dennis](https://www.theguardian.com/music/musicblog/2014/oct/01/beatles-songs-cover-versions-10-of-the-best) per la lettura ottimistica attribuita; [The Guardian, Sean Michaels](https://www.theguardian.com/music/2012/mar/28/new-george-harrison-guitar-solo) per l'assolo escluso; [The Beatles, edizione 2019](https://www.thebeatles.com/abbey-road-remixed-2019) per la Take 9 distinta dalla traccia pubblicata; [The Beatles, Concert for Bangladesh](https://www.thebeatles.com/1st-august-1971-george-plays-here-comes-sun-sold-out-audience-concert-bangladesh) per l'esecuzione con Pete Ham.
- **The Scientist:** [Coldplay, album](https://www.coldplay.com/release/a-rush-of-blood-to-the-head/) e [singolo](https://www.coldplay.com/release/the-scientist/) per date e scalette; [Coldplay, pagina del brano](https://www.coldplay.com/song/the-scientist/) per il testo esterno autorizzato; [Rhino](https://www.rhino.com/article/single-stories-coldplay-the-scientist) per la genesi riportata; [Hotpress, intervista a Will Champion](https://www.hotpress.com/music/set-your-controls-for-the-heart-of-the-sun-2615786) per la dichiarazione sulla svolta del disco; [Qobuz](https://www.qobuz.com/us-en/album/the-scientist-coldplay/0724355164056) per autori, produzione e archi; [NPO 3FM, intervista ai Coldplay](https://www.npo3fm.nl/nieuws/3fm-nieuws/806508ac-c93c-4c4a-a688-1b084625e6cb/coldplay-aan-het-woord) per video e differenza dei singoli radiofonici. La lettura del testo è dichiarata interpretazione, senza attribuirle una vicenda biografica.

Le frasi iconiche sono parafrasi editoriali e non riproducono né traducono versi. Le date dell'album e del singolo Coldplay sono distinte. La versione Spotify dei Beatles è la rimasterizzazione 2009, non la Take 9. Le date `ultimaVerifica` delle schede restano al 2 ottobre 2026, quando sono state esaminate frase per frase.

## Prove

Prima dell'inserimento, `check-freno` sul main locale dichiarava **FRENO TOLTO**: 319 schede, 9 con una sola fonte specifica, zero prive di fonte o con la sola pagina album. Dopo l'unione: 321 schede, stessi contatori. Generazione: 694 pagine più 404. Passano `check-coerenza` (321 canzoni, 104 artisti), `check-completezza` (321/321), `check-link` (zero problemi), `check-seo` (695 pagine, zero problemi), `check-nature` (zero etichette rifiutate), `check-attribuzioni` (zero testate nominate senza fonte) e `git diff --check`. Il controllo delle attribuzioni segnala 30 avvisi informativi preesistenti su altre schede.

Nel browser locale, entrambe le pagine sono state aperte a 390 e 1280 px: titoli, momenti iconici, collegamenti agli artisti e agli album leggibili; larghezza del documento uguale alla viewport, quindi nessuna fuoriuscita orizzontale. I due iframe Spotify sono comparsi automaticamente e, dopo un breve caricamento, hanno mostrato titolo e artista corretti. Nessun errore di console rilevato. L'audio integrale non è stato provato.

## Stato e limiti

Lotto locale pronto per la revisione del proprietario. La pagina degli album è essenziale e `noindex`; questo lotto non espande la verifica delle altre 319 canzoni. Nessun trasferimento al main, invio al remoto o pubblicazione. Non costituisce un nuovo ciclo ordinario: riunisce due proposte già completate nei cicli precedenti.
