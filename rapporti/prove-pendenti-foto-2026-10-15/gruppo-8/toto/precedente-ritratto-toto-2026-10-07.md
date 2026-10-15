# Foto dei Toto — verifica del 7 ottobre 2026

## Provenienza e soggetto

- **Pagina d'uso proposta:** `/artista/toto/`.
- **Soggetto:** Steve Lukather alla chitarra e Joseph Williams al microfono durante un concerto dei Toto a New York il 27 agosto 2016. La [pagina originale del file su Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Toto_at_Town_Hall_In_New_York_City.jpg) identifica entrambi; l'immagine originale e la versione web sono state aperte e controllate visivamente. Non rappresenta l'intera formazione.
- **Titolo originale:** “Toto at Town Hall In New York City.jpg”. **Autore e titolare dichiarato:** Skhmusic; la pagina del caricamento dichiara “Own work” e la concessione diretta del titolare. Non è indicato un altro titolare.
- **Pagina originale e licenza:** https://commons.wikimedia.org/wiki/File:Toto_at_Town_Hall_In_New_York_City.jpg — opera propria, CC BY-SA 4.0, data e dimensioni dell'originale, riaperta il 7 ottobre 2026.
- **URL del file usato:** https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Toto_at_Town_Hall_In_New_York_City.jpg/960px-Toto_at_Town_Hall_In_New_York_City.jpg
- **File locale:** `ritratti/toto-town-hall-2016.jpg`, JPEG 960 × 1440, 280.253 byte, SHA-256 `056fe02b67a7242b9e85cece889ecf7863f1b75d855c6856cf4ce6d030df5211`.

## Licenza, modifiche e credito

La [licenza ufficiale CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) permette copia e adattamento, anche commerciale. Richiede attribuzione, link alla licenza, indicazione delle modifiche e condivisione di eventuali adattamenti sotto la stessa licenza. La versione usata è il ridimensionamento da 960 × 1440 px generato da Wikimedia Commons dall'originale 2040 × 3060 px. Nessun ritaglio o ritocco locale. Il file ridimensionato rimane distribuito sotto CC BY-SA 4.0.

**Credito visibile:** “Foto di Skhmusic · Toto at Town Hall In New York City.jpg · CC BY-SA 4.0 · versione web ridimensionata da Commons, nessun ritocco locale”, con link alla pagina dell'opera e alla licenza. **Alt:** “Steve Lukather alla chitarra e Joseph Williams al microfono con i Toto a New York nel 2016”. I campi sono registrati anche in `dati/ritratti.json`.

La foto offre due volti riconoscibili ma non documenta tutti i membri né la formazione attuale. Le luci del palco sono blu e viola. La dichiarazione di licenza del caricatore è documentata sulla pagina originale; non può escludere in assoluto future contestazioni sui diritti.

## Verifiche e stato

- `node scripts/genera-sito.mjs`: 695 pagine più 404, 48 ritratti copiati. Pagina generata e pagina nella radice pubblicabile identiche; foto copiata senza alterazioni.
- `node scripts/prova-ritratto-credito.mjs`: crediti, hash, alt e dimensioni superati. `node scripts/check-seo.mjs`: 696 HTML, zero problemi. `node scripts/check-coerenza.mjs`: 321 canzoni e 104 artisti, zero problemi. `node scripts/check-link.mjs`: zero problemi. `git diff --check`: superato.
- Anteprima locale desktop e a 390 × 844 px: foto caricata e soggetti riconoscibili, credito e link visibili, canonical `https://www.dietroiltesto.it/artista/toto/`, nessuna fuoriuscita orizzontale e nessun errore di console.

Proposta isolata nel ramo `codex/ritratto-toto-2026-10-07`; non trasferita nel `main`, non inviata al remoto e non pubblicata. Se approvata, fondere solo la voce `toto` in `dati/ritratti.json`, preservando la distinta proposta Simon & Garfunkel e altri lotti in revisione.
