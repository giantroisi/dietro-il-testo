# Ritratto David Bowie — verifica del 6 ottobre 2026

## Scelta e identità

- **Pagina d'uso proposta:** `/artista/david-bowie/`.
- **Titolo originale:** “David Bowie, as Ziggy Stardust, performing at the Santa Monica Civic Auditorium, Calif., 1972”.
- **Soggetto e data:** David Bowie nel personaggio di Ziggy Stardust, Santa Monica Civic Auditorium, 23 ottobre 1972. Il titolo, il soggetto, la data e la firma sono riportati nella [scheda originale UCLA Library](https://digital.library.ucla.edu/catalog/ark:/21198/zz0002nncj); il file è stato controllato visivamente: Bowie al microfono con chitarra, in abiti di scena, volto riconoscibile. La [scheda Wikimedia Commons](https://commons.wikimedia.org/wiki/File:David_Bowie,_as_Ziggy_Stardust,_performing_at_the_Santa_Monica_Civic_Auditorium.jpg) riconduce il medesimo file alla collezione UCLA.
- **Autore:** Boris Yaro. **Editore della fotografia:** Los Angeles Times. **Titolare indicato dalla fonte originale:** The Regents of the University of California.

## Diritti e attribuzione

La [scheda originale UCLA Library](https://digital.library.ucla.edu/catalog/ark:/21198/zz0002nncj) espone “Creative Commons BY Attribution 4.0 International” in “Access Condition”. La [licenza CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.it) permette riproduzione e modifiche anche commerciali, con attribuzione, collegamento alla licenza e indicazione delle modifiche. Non risultano condizioni NC o ND sulla scheda originale. Il credito visibile sulla pagina collega licenza e scheda originale: “Foto di Boris Yaro · Los Angeles Times, 1972 · CC BY 4.0 · originale UCLA Library, nessuna modifica locale”. Il nome del titolare resta tracciato nei dati. L'attribuzione non implica avallo del sito da parte dell'autore, dell'editore o dell'università.

- **Pagina originale:** https://digital.library.ucla.edu/catalog/ark:/21198/zz0002nncj
- **Pagina del file:** https://commons.wikimedia.org/wiki/File:David_Bowie,_as_Ziggy_Stardust,_performing_at_the_Santa_Monica_Civic_Auditorium.jpg
- **URL file originale:** https://upload.wikimedia.org/wikipedia/commons/6/61/David_Bowie%2C_as_Ziggy_Stardust%2C_performing_at_the_Santa_Monica_Civic_Auditorium.jpg
- **Licenza/versione:** CC BY 4.0, https://creativecommons.org/licenses/by/4.0/
- **Controllo delle fonti:** 6 ottobre 2026.

## Asset e pagina

- **File locale:** `ritratti/david-bowie-ziggy-santa-monica-1972.jpg`, JPEG, 2554 × 3850 pixel, 2.963.508 byte, SHA-256 `76d3fe2ac5366821c830cd373d146c21d8936d02c9e5e119ff8ff5330cfd5a7b`.
- **Modifiche:** nessun ritaglio, ridimensionamento o ritocco locale; il sito limita soltanto le dimensioni di visualizzazione con CSS.
- **Alt:** “David Bowie nei panni di Ziggy Stardust canta al microfono e suona la chitarra al Santa Monica Civic Auditorium nel 1972”.
- **Crediti:** immediatamente sotto la foto, visibili e cliccabili. La fotografia documenta una formazione/persona storica del 1972, non l'aspetto di Bowie in altre fasi della carriera.

## Verifiche locali

`node scripts/prova-ritratto-credito.mjs`, `check-seo` (696 HTML), `check-coerenza` (321 canzoni, 104 artisti), `check-link`, confronto della pagina generata con la radice e `git diff --check` superati. Nell'anteprima a 1280 px e a 390 px la foto si carica, mantiene le proporzioni ed è interamente visibile; il credito è leggibile, la canonical punta a `https://www.dietroiltesto.it/artista/david-bowie/`, non compare scorrimento orizzontale e non vi sono errori di console. La pubblicazione resta in attesa del proprietario.

**Integrazione futura:** i ritratti The Police, Depeche Mode e Coldplay sono proposte distinte. Unirli per singola voce in `dati/ritratti.json` e accodare le rispettive sezioni di Roadmap prima di rigenerare il sito; non sostituire l'intero JSON con una versione di un altro lotto.
