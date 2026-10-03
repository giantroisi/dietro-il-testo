# The Scientist — proposta di nuova scheda, 2 ottobre 2026

## Perimetro e freni

Una nuova canzone per i Coldplay, artista la cui storia era già presente. La pagina essenziale dell'album *A Rush of Blood to the Head* resta `noindex`: contiene una sola canzone raccontata e non ha ancora un articolo autonomo. Nessuna immagine aggiunta. `scripts/check-freno.mjs`, eseguito prima e dopo l'aggiunta, dichiara **FRENO TOLTO**: 9 schede con una sola fonte specifica, nessuna senza fonte o con la sola fonte di album (soglia F88: 27). `scripts/lacune.mjs` ricalcola il debito F67 a **27**, sotto la soglia 50; il suo archivio generato non è stato incluso nel lotto perché produce cambiamenti estranei.

## Fonti aperte e controllo delle affermazioni

Riapertura il 2 ottobre 2026. `F`: fatto documentato; `D`: dichiarazione di un membro del gruppo; `I`: lettura editoriale dichiarata come interpretazione. Nessun verso è riprodotto o tradotto.

| Punto della scheda | Natura | Prova |
| --- | --- | --- |
| Traccia 4, album e 26 agosto 2002 | F | [Coldplay, pagina ufficiale dell'album](https://www.coldplay.com/release/a-rush-of-blood-to-the-head/), data e scaletta; [pagina della canzone](https://www.coldplay.com/song/the-scientist/) per il legame con il disco. |
| Singolo del 4 novembre 2002 con *1.36* e *I Ran Away* | F | [Coldplay, pagina ufficiale del singolo](https://www.coldplay.com/release/the-scientist/). La data dell'album non viene confusa con quella del singolo. |
| Genesi dopo l'ascolto di George Harrison, tentativo di suonare *Isn't It a Pity* e progressione del brano | F | [Rhino, etichetta del gruppo](https://www.rhino.com/article/single-stories-coldplay-the-scientist), passaggio sulla composizione a Liverpool. |
| La scrittura del brano come svolta del disco | D | [Hotpress, intervista originale di Peter Murphy a Will Champion](https://www.hotpress.com/music/set-your-controls-for-the-heart-of-the-sun-2615786), 9 ottobre 2002, dichiarazione di Champion. |
| Lettura del testo come richiesta di scusa, ritorno all'inizio, contrasto fra calcolo e sentimento; frase iconica | I | [Testo approvato sul sito Coldplay](https://www.coldplay.com/song/the-scientist/). È una lettura del testo, non una ricostruzione biografica della relazione di Martin. |
| Quattro autori, produzione di Coldplay e Ken Nelson, arrangiamento degli archi di Audrey Riley | F | [Qobuz, crediti della traccia](https://www.qobuz.com/us-en/album/the-scientist-coldplay/0724355164056), riga della traccia 1. Il 28 febbraio 2003 mostrato da Qobuz è la data del catalogo di quel mercato; per l'uscita originale segue la pagina ufficiale Coldplay del 2002. |
| Video narrato al contrario, idea di Jamie Thraves e mimica al contrario di Martin | F / D | [NPO 3FM, intervista diretta al gruppo](https://www.npo3fm.nl/nieuws/3fm-nieuws/806508ac-c93c-4c4a-a688-1b084625e6cb/coldplay-aan-het-woord), 20 novembre 2002, domande e risposte sul video; [video ufficiale Coldplay](https://www.coldplay.com/video/the-scientist/). |
| Differenza fra *The Scientist* e *Clocks* come singoli radiofonici in Europa e negli Stati Uniti | D | Stessa [intervista NPO 3FM](https://www.npo3fm.nl/nieuws/3fm-nieuws/806508ac-c93c-4c4a-a688-1b084625e6cb/coldplay-aan-het-woord), risposta di Jonny Buckland. |
| Lettore Spotify, titolo e artista | F | [Embed Spotify della traccia](https://open.spotify.com/embed/track/75JFxkI2RXiU7L9VXzMkle), verificato anche nell'anteprima caricata. Il player non dichiara un'edizione successiva; l'audio integrale non è stato ascoltato. |
| Testo esterno autorizzato | F | [Coldplay, pagina ufficiale del brano](https://www.coldplay.com/song/the-scientist/); il sito rimanda lì. |
| Genere, descrizione SEO, metadati | F / scelta editoriale | Qobuz classifica il singolo fra pop e rock; sono le categorie normalizzate interne. La descrizione riassume solo i punti precedenti. Nessun dato di ascolto è stato inventato. |

## Verifiche e limiti

Generazione: 318 canzoni, 104 artisti, 252 pagine album. Passano `check-freno`, `check-seo` (690 pagine, zero problemi), `check-coerenza`, `check-link` e `check-nature`. Anteprima desktop e 390 px: titolo, crediti e collegamenti leggibili, player Spotify caricato senza azione dell'utente, nessuno scorrimento orizzontale né errore di console. Non è stato verificato l'ascolto integrale, che dipende da Spotify.

È una verifica delle affermazioni della nuova scheda, non una revisione indipendente del catalogo. La proposta resta nel ramo `codex/scheda-the-scientist-2026-10-02`, separata dai lotti già in revisione. Nessun trasferimento nella cartella principale, push o pubblicazione.
