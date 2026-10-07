# Foto Prince — verifica del 7 ottobre 2026

- **Pagina d'uso proposta:** `/artista/prince/`.
- **Opera e soggetto:** [«Prince (cropped).jpg»](https://commons.wikimedia.org/wiki/File:Prince_(cropped).jpg), estratta da [«Levi & Prince.jpg»](https://commons.wikimedia.org/wiki/File:Levi_%26_Prince.jpg). L'immagine è stata controllata visivamente su Commons: ritrae Prince con una chitarra elettrica, in bianco e nero, ripreso dal basso. La pagina del ritaglio lo identifica come Prince in concerto.
- **Provenienza e titolarità dichiarata:** la pagina del file di partenza indica «Own work», Levi Seacer come autore e la dichiarazione del titolare di pubblicare l'opera sotto CC BY-SA 4.0. La cronologia mostra il suo caricamento del 2014; Magnolia677 ha poi ritagliato e corretto il contrasto della versione del file di partenza, dalla quale Damian Vo ha estratto il ritratto di Prince. L'attribuzione è quella dichiarata su Commons: non è disponibile un'identificazione indipendente di chi azionò la macchina fotografica.
- **Licenza:** [CC BY-SA 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/), riaperta sulla pagina ufficiale. Consente riuso commerciale e adattamenti con attribuzione, link alla licenza e indicazione delle modifiche; gli adattamenti devono essere condivisi sotto la stessa licenza o una compatibile. Non attribuiamo al musicista o al licenziante un sostegno al sito.
- **URL del file usato:** https://upload.wikimedia.org/wikipedia/commons/3/34/Prince_%28cropped%29.jpg
- **File locale:** copia identica del file Commons, 289 × 407 px, 81.070 byte, SHA-256 `939e47dca0228f026e52d739364d86d2fc1b39c00d6268e823daa6169fdce851`.
- **Modifiche:** le modifiche antecedenti al riuso sono descritte sopra. Nessun ritaglio o ritocco locale; il CSS ridimensiona soltanto la visualizzazione.
- **Credito visibile:** «Immagine attribuita a Levi Seacer su Commons · ritaglio di Damian Vo da versione ritoccata da Magnolia677 · Prince dal vivo · CC BY-SA 4.0 · nessun ritocco locale», con collegamenti alla pagina file e alla licenza.
- **Alt:** «Prince suona una chitarra elettrica sul palco in una fotografia in bianco e nero ripresa dal basso».
- **Limiti:** la pagina di partenza riporta il 26 agosto 2014 ma l'immagine sembra appartenere a un periodo anteriore; non usiamo questa data come data dello scatto. Il ritaglio è a bassa risoluzione, pur essendo leggibile nella dimensione prevista. Due alternative Flickr sono state escluse perché i rispettivi link originali restituiscono 404; una fotografia Commons del concerto londinese del 2007 è stata scartata perché Prince è troppo piccolo nell'inquadratura.

## Verifica della proposta

`genera-sito` produce 695 pagine più 404 e copia 49 ritratti. Passano `prova-ritratto-credito`, `check-seo` (696 HTML, zero rilievi), `check-coerenza` (321 canzoni e 104 artisti, zero rilievi), `check-link`, confronto byte per byte tra pagina generata e copia nella radice e `git diff --check`. Nell'anteprima locale a 1280 e 390 px la foto si carica, il credito è leggibile, la canonical è `https://www.dietroiltesto.it/artista/prince/`, non c'è fuoriuscita orizzontale e la console non segnala errori o avvisi.

**Stato:** proposta isolata; nessuna integrazione nel `main`, push o pubblicazione. In caso di approvazione andrà aggiunta la sola voce `prince` a `dati/ritratti.json`, conservando le altre voci.
