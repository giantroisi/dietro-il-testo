# Pearl Jam — revisione del ritratto, 4 ottobre 2026

## Problema

La pagina `/artista/pearl-jam/` usa `pearl-jam.jpg` con alt «Foto di Pearl Jam». Il file locale mostra Eddie Vedder con Johnny Marr; anche il [titolo del file originale](https://commons.wikimedia.org/wiki/File:Eddie_Vedder_%26_Johnny_Marr,_Pearl_Jam,_BST_Hyde_Park_2022_%2852209161403%29.jpg) identifica i due. La fotografia e l'alt, così presentati, possono far scambiare Marr per un membro della band.

## Sostituzione proposta

| Campo | Verifica riaperta il 4 ottobre 2026 |
| --- | --- |
| Pagina originale e licenza | [Pearl Jam 2022.jpg su Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pearl_Jam_2022.jpg): Lugnuts dichiara opera propria e pubblica sotto [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). |
| Autore e titolare dichiarato | Lugnuts. |
| Soggetto e data | La pagina Commons descrive i Pearl Jam sul palco al BST Hyde Park di Londra il 9 luglio 2022. Il file locale è stato aperto e mostra un gruppo sul palco ripreso dalla platea. Non si identifica visivamente ogni singolo componente. |
| Derivazione e modifiche | [Foto originale](https://commons.wikimedia.org/wiki/File:PearlJam-London2022-02.jpg) di Lugnuts; la cronologia della [versione ritagliata](https://commons.wikimedia.org/wiki/File:Pearl_Jam_2022.jpg) attribuisce a 4TheWynne un taglio dell'11% in altezza. È stata preparata la miniatura Wikimedia 960 × 640 px, senza ulteriori modifiche locali. |
| File | `ritratti/pearl-jam-gruppo.jpg`, 115.798 byte, SHA-256 `db0f211ecb1df0f5764b9e7bb11465bb26c974a5e6d65825f1915593688ec3f2`; coincide col candidato isolato del 24 settembre. |
| Pagina d'uso e alt | `/artista/pearl-jam/`; «I Pearl Jam sul palco al BST Hyde Park di Londra nel 2022, visti dalla platea». |
| Credito visibile | «Foto di Lugnuts · CC BY-SA 4.0 · ritaglio Commons di 4TheWynne, versione ridimensionata», con link alla pagina del file e alla licenza. |

La nuova foto documenta il concerto e corregge l'attribuzione fuorviante. **Limite visivo:** l'inquadratura è ampia e i volti sono piccoli, anche a 280 px sul mobile. La vecchia foto resta nell'archivio sorgente ma non è più selezionata per la pagina.

## Controlli

`genera-sito` produce 694 pagine più 404 e copia 34 ritratti. Passano `prova-ritratto-credito` (file, hash, alt, link), `check-coerenza` (321 canzoni, 104 artisti), `check-seo` (695 pagine), `check-link` e `git diff --check`. Nell'anteprima del ramo la foto carica; credito e alt sono visibili nell'accessibilità. Verificati 1280 e 390 px: nessuna fuoriuscita orizzontale, nessun errore di console. Il file è stato osservato direttamente e confrontato con la descrizione Commons.

**Stato:** proposta isolata per la revisione del proprietario. Nessun trasferimento nel main, push o pubblicazione. L'esame di altri lotti indipendenti può continuare mentre questo attende una decisione.
