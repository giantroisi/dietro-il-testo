# Foto dei Fleetwood Mac — verifica del 6 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/fleetwood-mac/`.
- **Soggetto:** i Fleetwood Mac sul palco a Sacramento il 24 novembre 2014. La descrizione e le annotazioni della pagina Commons identificano John McVie, Christine McVie, Stevie Nicks, Mick Fleetwood e Lindsey Buckingham. La pagina Flickr originale e il file locale sono stati aperti e confrontati visivamente. È la formazione del 2014, non quella attuale.
- **Titolo sulla pagina Flickr:** “Fleetwood Mac”. **Autore:** Steffane Lui, il cui account Flickr è mostrato come Steff. La pagina Flickr espone CC BY 2.0; non indica un titolare separato dall'autore.
- **Pagina Flickr originale con licenza esposta:** https://www.flickr.com/photos/steffanelui/15883204261/ — riaperta il 6 ottobre 2026; riporta titolo, autore, data di scatto (24 novembre 2014), visibilità pubblica e “CC BY 2.0”.
- **Pagina del file su Wikimedia Commons:** https://commons.wikimedia.org/wiki/File:Fleetwood_Mac_November_2014.jpg — conferma la fonte Flickr, l'autore, la licenza e le dimensioni; il controllo FlickreviewR del 7 maggio 2018 confermò CC BY 2.0 al trasferimento.
- **URL del file originale usato:** https://upload.wikimedia.org/wikipedia/commons/8/83/Fleetwood_Mac_November_2014.jpg

## Licenza, file e credito

La [licenza ufficiale CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.it), riaperta il 6 ottobre 2026, permette condivisione e modifiche anche commerciali. Richiede credito adeguato, collegamento alla licenza e indicazione delle modifiche. La versione locale è il file Commons da 1607 × 894 px proveniente dalla foto Flickr; nessun ritaglio, ridimensionamento o ritocco locale. Il CSS la scala nella pagina.

Il JPEG locale pesa 647.977 byte. SHA-1 `e4c1bd63398029df3fb21f3d66802993d20b4e53`, uguale al checksum pubblicato da Commons; SHA-256 `3b196afb65c08828279f09b99a3dfa1d4dd6de21c61fe5fa101ea98e026123c8`.

**Credito visibile:** “Foto di Steffane Lui (Steff su Flickr) · Fleetwood Mac · CC BY 2.0 · originale Commons senza modifiche locali”, con link alla pagina Flickr e alla licenza. **Alt:** “I Fleetwood Mac si esibiscono sul palco a Sacramento nel 2014”. La voce `fleetwood-mac` di `dati/ritratti.json` registra autore, titolare se noto, titolo, fonte, URL del file, licenza, data, pagina d'uso, modifiche, credito, alt, dimensioni e hash.

## Verifiche e limiti

- `node scripts/genera-sito.mjs`: 695 pagine più 404 e 48 ritratti copiati. La pagina generata e la sitemap artisti coincidono con le copie pubblicabili nella radice di questo worktree.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 px e 390 × 844 px: file caricato, alt e credito leggibili, canonical `https://www.dietroiltesto.it/artista/fleetwood-mac/`, nessuna fuoriuscita orizzontale o errore di console.
- È una foto di palco ampia e piuttosto scura: a 280–300 px i volti sono piccoli. Offre il contesto e la formazione del 2014, ma non va presentata come ritratto ravvicinato o della formazione attuale. La scelta visiva resta soggetta alla revisione del proprietario.

**Stato:** proposta isolata nel ramo `codex/ritratto-fleetwood-mac-2026-10-06`, in attesa di approvazione specifica. Nessun trasferimento nel `main`, push o pubblicazione. Per integrarla, fondere solo la voce `fleetwood-mac` in `dati/ritratti.json`, preservando gli altri lotti fotografici in revisione.
