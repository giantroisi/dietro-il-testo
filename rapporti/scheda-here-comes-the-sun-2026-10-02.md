# Here Comes the Sun — proposta di nuova scheda, 2 ottobre 2026

## Perimetro e freni

Una nuova scheda canzone dei Beatles, già raccontati nel sito. La registrazione entra nella pagina dell'artista e rende raggiungibile una pagina essenziale di *Abbey Road*, che resta `noindex` perché ha una sola canzone e nessun testo editoriale autonomo. Nessuna immagine aggiunta. `scripts/check-freno.mjs`, eseguito prima della scheda e dopo la generazione, dichiara **FRENO TOLTO**: 9 canzoni a fonte specifica unica, zero senza fonte o con la sola pagina album; la soglia F88 è 27. Il debito F67 ricalcolato è 27, sotto la soglia 50. La storia dell'artista era già presente.

## Fonti aperte e controllo delle affermazioni

Fonti riaperte il 2 ottobre 2026. `F` indica un fatto documentato; `I` una lettura del testo attribuita come interpretazione. Gli URL seguenti sono presenti anche nella scheda pubblicabile.

| Punto della scheda | Natura | Fonte e verifica |
| --- | --- | --- |
| Titolo, artista, autore Harrison, album e data del 26 settembre 1969; posizione all'inizio della seconda facciata | F | [The Beatles, pagina del brano](https://www.thebeatles.com/here-comes-sun), scheda ufficiale e scaletta. |
| Registrazione tra luglio e agosto 1969; produzione George Martin | F | [The Beatles, pagina del brano](https://www.thebeatles.com/here-comes-sun), cronologia e crediti. |
| Moog su questa canzone suonato da Harrison | F | [Abbey Road Studios, Cameron Colbeck](https://www.abbeyroad.com/news/the-genius-of-george-harrison-as-told-by-abbey-roads-cameron-colbeck-2737), passaggio dedicato al sintetizzatore. |
| Lettura dell'ottimismo e del sollievo, corpo 3 e frase iconica | I | [The Guardian, Jon Dennis](https://www.theguardian.com/music/musicblog/2014/oct/01/beatles-songs-cover-versions-10-of-the-best) legge il brano e gli altri contributi di Harrison ad *Abbey Road* in chiave ottimistica. La pagina dichiara esplicitamente che il sollievo è una lettura, senza attribuire intenzioni personali a Harrison e senza citare o tradurre versi. |
| Assolo ritrovato e non incluso nel disco, corpo 4 | F | [The Guardian, Sean Michaels](https://www.theguardian.com/music/2012/mar/28/new-george-harrison-guitar-solo), cronaca dell'ascolto dei nastri con George Martin, Giles Martin e Dhani Harrison. |
| Nuovo mix e Take 9 nell'edizione per il cinquantesimo anniversario, corpo 5 | F | [The Beatles, Abbey Road Remixed](https://www.thebeatles.com/abbey-road-remixed-2019), elenco ufficiale delle tracce. La Take 9 non viene confusa con il lettore della pagina. |
| Esecuzione al Concert for Bangladesh, data, luogo e Pete Ham, corpo 6 | F | [The Beatles, cronologia ufficiale](https://www.thebeatles.com/1st-august-1971-george-plays-here-comes-sun-sold-out-audience-concert-bangladesh). |
| ID del lettore e versione rimasterizzata 2009 | F | [Spotify, traccia dei Beatles](https://open.spotify.com/embed/track/6dGnYIeXmHdcikdzNNDMm2), verificata su titolo, artista e dicitura “Remastered 2009”. L'anno della composizione non è confuso con quello della rimasterizzazione. |
| Collegamento esterno al testo | F | [The Beatles, testo autorizzato](https://www.thebeatles.com/here-comes-sun), brano corretto; nessun verso è copiato nel sito. |
| Metadati, generi e descrizione SEO | F / scelta editoriale | Album, anno e autore dalla pagina ufficiale. Rock e pop sono categorie interne; la descrizione riassume solo i punti documentati sopra. Nessun numero di ascolti è stato inventato. |

## Prove e limiti

Generazione: 318 canzoni, 104 artisti, 252 pagine album; la pagina di *Abbey Road* resta `noindex`. `check-freno`, `check-seo` (690 pagine, zero problemi), `check-coerenza`, `check-link` e `check-nature` passano. La nuova pagina è stata aperta nell'anteprima a desktop e a 390 px: testo leggibile, nessuno scorrimento orizzontale, iframe Spotify presente, nessun errore di console. Il player è stato visto con titolo e artista dopo il caricamento; l'audio integrale non è stato provato.

Questo è un controllo editoriale delle affermazioni della nuova scheda, non una nuova revisione indipendente dell'intero catalogo. Il lotto resta nella copia `codex/scheda-here-comes-the-sun-2026-10-02`, separato dalle proposte *Nightswimming*, *Yesterday* e dai ritratti in revisione. Nessun trasferimento nella cartella principale, push o pubblicazione.
