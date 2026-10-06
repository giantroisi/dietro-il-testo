# Foto dei Deep Purple — verifica del 6 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/deep-purple/`.
- **Soggetto:** Roger Glover e Steve Morse dei Deep Purple sul palco dell'Oslo Spektrum, Norvegia, nel 2009. La descrizione e le categorie della pagina originale indicano luogo, anno e i due musicisti; il file è stato aperto e i due uomini con i rispettivi strumenti sono stati controllati visivamente. L'immagine non mostra l'intero gruppo né la formazione attuale.
- **Titolo originale:** “Deep Purple.jpg”. **Autore e titolare dichiarato:** Rockman. Sulla pagina Commons l'autore dichiara “Own work” e di essere il titolare del copyright che concede la licenza. Non è indicato un altro titolare.
- **Pagina originale con dichiarazione di licenza:** https://commons.wikimedia.org/wiki/File:Deep_Purple.jpg — riaperta il 6 ottobre 2026.
- **URL del file originale usato:** https://upload.wikimedia.org/wikipedia/commons/d/de/Deep_Purple.jpg
- **Data dello scatto:** 2009; il giorno preciso non è documentato dalla pagina originale.

## Licenza, file e credito

La [licenza ufficiale CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), riaperta il 6 ottobre 2026, consente copia, distribuzione e modifiche anche per uso commerciale. Richiede credito adeguato, collegamento alla licenza e indicazione delle modifiche; non permette restrizioni aggiuntive. Il titolo del file originale è incluso nel credito. La foto viene copiata senza ritaglio, ridimensionamento o ritocco locale; il CSS la scala nella pagina.

Il file locale è un JPEG da 1116 × 744 px, 75.538 byte. SHA-1 `7dfd5a397900b2d66d03173f6ed22436c582c8d6`, coincidente con il checksum esposto da Commons; SHA-256 `534949a8cfd5f15aafa43b4f11e7656cfae93c5cbd0d49fc581f7289221bfdbb`.

**Credito visibile:** “Foto di Rockman · Deep Purple.jpg · CC BY 3.0 · originale senza modifiche locali”, con link alla pagina originale e alla licenza. **Alt:** “Roger Glover e Steve Morse dei Deep Purple suonano a Oslo nel 2009”. La voce `deep-purple` in `dati/ritratti.json` registra autore, titolare dichiarato, file, fonte, licenza, data del controllo, pagina d'uso, modifiche, credito e alt.

## Verifiche e limiti

- `node scripts/genera-sito.mjs`: 695 pagine più 404, 48 ritratti copiati. La pagina generata e la sitemap artisti coincidono con le copie pubblicabili nella radice di questo worktree.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 px e a 390 × 844 px: file caricato, alt e credito leggibili, canonical `https://www.dietroiltesto.it/artista/deep-purple/`, nessuna fuoriuscita orizzontale o errore di console.
- La fotografia risale al 2009 e mostra solo due membri della band. Il testo alternativo li identifica esplicitamente; non va usata come immagine della formazione completa o attuale.

**Stato:** proposta isolata nel ramo `codex/ritratto-deep-purple-2026-10-06`, in attesa della revisione specifica del proprietario. Nessun trasferimento nel `main`, push o pubblicazione. Per integrarla, aggiungere la sola voce `deep-purple` al JSON condiviso preservando le voci di Bon Jovi, Daft Punk e di altri lotti ancora in revisione.
