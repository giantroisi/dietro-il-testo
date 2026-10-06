# Foto degli Eagles — verifica del 6 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/eagles/`.
- **Soggetto:** gli Eagles sul palco durante il tour *Long Road out of Eden* nel 2008. La pagina Commons nomina Glenn Frey, Don Henley, Joe Walsh e Timothy B. Schmit; la fotografia è stata controllata visivamente sulla pagina Flickr originale e nel file locale. È un'immagine storica, non della formazione attuale.
- **Titolo sulla pagina originale:** “Eagles”. **Autore:** Steve Alexander. La pagina Flickr mostra il suo account e la licenza CC BY-SA 2.0; non indica un altro titolare separato dall'autore.
- **Pagina Flickr originale con licenza esposta:** https://www.flickr.com/photos/10724473@N03/3077147093/ — riaperta il 6 ottobre 2026; riporta titolo, autore, data di scatto e caricamento (2 dicembre 2008), visibilità pubblica e “CC BY-SA 2.0”.
- **Pagina del file su Wikimedia Commons:** https://commons.wikimedia.org/wiki/File:The_Eagles_in_performance,_2008.jpg — descrizione, provenienza Flickr, autore, licenza e dimensioni. Il controllo del bot Flickr del 12 maggio 2009 confermò la stessa licenza al trasferimento.
- **URL del file originale usato:** https://upload.wikimedia.org/wikipedia/commons/1/11/The_Eagles_in_performance%2C_2008.jpg

## Licenza, file e credito

La [licenza ufficiale CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/deed.it), riaperta il 6 ottobre 2026, permette condivisione e modifiche anche commerciali. Richiede attribuzione, link alla licenza e indicazione delle modifiche; per opere derivate richiede distribuzione con la stessa licenza o una compatibile. La versione locale è il file Commons da 1000 × 667 px derivato dall'immagine Flickr; non sono stati fatti ritagli, ridimensionamenti o ritocchi locali. Il CSS la scala nella pagina.

Il JPEG locale pesa 346.305 byte. SHA-1 `779d34b8e09077bd98720812c2ca70d89d8ea168`, uguale al checksum indicato da Commons; SHA-256 `b36b79557023b55e586981f6e8fe288510577d41b7ec7e1c0cfad8cb751c6069`.

**Credito visibile:** “Foto di Steve Alexander · Eagles · CC BY-SA 2.0 · originale Commons senza modifiche locali”, con link alla pagina Flickr e alla licenza. **Alt:** “Gli Eagles si esibiscono sul palco durante il tour Long Road out of Eden nel 2008”. La voce `eagles` di `dati/ritratti.json` registra autore, titolare se noto, titolo, fonte originale, URL del file, licenza, data, pagina d'uso, modifiche, credito, alt, dimensioni e hash.

## Verifiche e limiti

- `node scripts/genera-sito.mjs`: 695 pagine più 404 e 48 ritratti copiati. La pagina generata e la sitemap artisti coincidono con le copie pubblicabili nella radice di questo worktree.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 px e 390 × 844 px: file caricato, alt e credito leggibili, canonical `https://www.dietroiltesto.it/artista/eagles/`, nessuna fuoriuscita orizzontale o errore di console.
- La foto documenta il gruppo nel 2008; non va presentata come ritratto della formazione attuale. Su mobile i volti sono più piccoli, ma riconoscibili nell'immagine di palco.

**Stato:** proposta isolata nel ramo `codex/ritratto-eagles-2026-10-06`, in attesa della revisione specifica del proprietario. Nessun trasferimento nel `main`, push o pubblicazione. Per integrarla, fondere soltanto la voce `eagles` in `dati/ritratti.json`, preservando Bon Jovi, Daft Punk, Deep Purple e altri lotti ancora in revisione.
