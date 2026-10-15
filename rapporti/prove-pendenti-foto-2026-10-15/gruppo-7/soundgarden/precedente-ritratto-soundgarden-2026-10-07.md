# Ritratto Soundgarden — verifica del 7 ottobre 2026

- **Pagina d'uso proposta:** `/artista/soundgarden/`.
- **Opera e soggetto:** `Soundgarden` nella [pagina Flickr originale](https://www.flickr.com/photos/45654212@N00/4908666471/); `Soundgarden Chicago.jpg` è il nome del file su Commons. Soundgarden suonano al Lollapalooza di Chicago l'8 agosto 2010. La descrizione della [scheda Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Soundgarden_Chicago.jpg) identifica da sinistra Chris Cornell, Matt Cameron e Ben Shepherd. La fotografia è stata aperta e ispezionata visivamente sia su Flickr sia su Commons: tre musicisti sul palco, con «SOUNDGARDEN» sulla grancassa. Kim Thayil non compare nell'inquadratura; l'alt nomina quindi soltanto i tre visibili.
- **Autore e titolare:** `musicisentropy`, account Flickr che pubblica la foto e mostra la licenza. Nessun titolare diverso è dichiarato. La pagina Commons registra anche la conferma della licenza Flickr da parte del bot FlickreviewR il 26 marzo 2011.
- **Licenza e obblighi:** la [pagina Flickr originale](https://www.flickr.com/photos/45654212@N00/4908666471/) indica `CC BY-SA 2.0` nella sezione «Ulteriori informazioni»; confermata sulla [pagina Commons](https://commons.wikimedia.org/wiki/File:Soundgarden_Chicago.jpg). La [licenza ufficiale CC BY-SA 2.0 Generic](https://creativecommons.org/licenses/by-sa/2.0/) consente copia, distribuzione e adattamento, anche commerciale, a condizione di attribuire autore e titolo, collegare opera e licenza, dichiarare le modifiche e distribuire l'adattamento fotografico alla stessa licenza. Nessun marchio o endorsement viene attribuito all'autore.
- **File originale:** https://upload.wikimedia.org/wikipedia/commons/9/9b/Soundgarden_Chicago.jpg (3456 × 2592 px).
- **Versione usata:** https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Soundgarden_Chicago.jpg/1280px-Soundgarden_Chicago.jpg ; 1280 × 960 px, 272225 byte, SHA-256 `c8a9fcf02becf34794b43107e003456883439a514f615719559f3cab1dd58ac3`.
- **Modifiche:** la versione web è ridimensionata da Wikimedia Commons; nessun ritaglio, ritocco o altra modifica locale. Il CSS ridimensiona la visualizzazione. La versione ridimensionata viene attribuita e condivisa con la stessa licenza CC BY-SA 2.0.
- **Credito visibile previsto:** «Foto di musicisentropy · Soundgarden · CC BY-SA 2.0 · versione web Wikimedia Commons, nessun ritocco locale», con link alla foto Flickr e alla licenza.
- **Alt previsto:** «Chris Cornell, Matt Cameron e Ben Shepherd dei Soundgarden suonano al Lollapalooza di Chicago nel 2010».
- **Limiti:** la foto raffigura tre membri della band nel 2010 e non l'intera formazione. I musicisti possono risultare piccoli su schermi stretti.

## Verifica della proposta

`node scripts/genera-sito.mjs` ha prodotto 695 pagine e copiato 48 ritratti. Passano `prova-ritratto-credito`, `check-seo` (696 file HTML), `check-coerenza` (321 canzoni, 104 artisti), `check-link`, il confronto byte per byte fra pagina generata e pagina pubblicabile e `git diff --check`. Nell'anteprima locale a 1280 e 390 px la foto si carica a 1280 px naturali, il credito è visibile, la canonical è `https://www.dietroiltesto.it/artista/soundgarden/`, non compare scorrimento orizzontale e la console non riporta errori o avvisi.

Stato: proposta isolata. Nessuna integrazione nel `main`, invio al remoto o pubblicazione.
