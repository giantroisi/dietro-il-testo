# Foto degli Evanescence — verifica del 6 ottobre 2026

## Soggetto e fonte

- **Pagina d'uso proposta:** `/artista/evanescence/`.
- **Soggetto:** Amy Lee con gli Evanescence sul palco del Wiltern Theatre a Los Angeles il 17 novembre 2015. L'immagine mostra la cantante e diversi musicisti, fra cui il batterista in parte coperto. La pagina Flickr e il JPEG locale sono stati confrontati visivamente. Documenta il concerto e la formazione di allora, non quella attuale.
- **Pagina originale Flickr:** https://www.flickr.com/photos/jus10h/22874677640/ — riaperta il 6 ottobre 2026. Titolo “Evanescence 11/17/2015 #2”, autore Justin Higuchi, data di scatto 17 novembre 2015; il riquadro delle informazioni espone CC BY 2.0.
- **Pagina del file Wikimedia Commons:** https://commons.wikimedia.org/wiki/File:Evanescence_at_The_Wiltern_theatre_in_Los_Angeles,_California_01.jpg — riaperta il 6 ottobre 2026. Collega la stessa foto Flickr; FlickreviewR confermò CC BY 2.0 il 27 marzo 2016. I metadati del file indicano “Copyright (c) 2015 Justin Higuchi”; non mostrano un altro titolare.
- **URL della versione web usata:** https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Evanescence_at_The_Wiltern_theatre_in_Los_Angeles%2C_California_01.jpg/1280px-Evanescence_at_The_Wiltern_theatre_in_Los_Angeles%2C_California_01.jpg

## Licenza, modifiche e credito

La [licenza ufficiale CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.it), riaperta il 6 ottobre 2026, consente riproduzione e modifiche anche per fini commerciali. Richiede attribuzione, link alla licenza e indicazione delle modifiche. La cronologia Commons registra la rimozione del watermark visibile nell'originale Flickr, prima della versione locale. La versione web Commons è stata ridimensionata a 1280 × 768 px; non è stato applicato altro ritaglio o ritocco locale. La pagina applica la sola scala CSS.

Il JPEG locale pesa 172.073 byte, SHA-256 `23b1b2c96e5e11acdc312e603774fd479cdd3ca1cbe84253baec9a1a4621e8d4`.

**Credito visibile:** “Foto di Justin Higuchi · Evanescence 11/17/2015 #2 · CC BY 2.0 · watermark rimosso su Commons, versione web ridimensionata”, con link alla foto Flickr e alla licenza. **Alt:** “Amy Lee e gli Evanescence sul palco del Wiltern Theatre di Los Angeles nel 2015”. La voce `evanescence` di `dati/ritratti.json` registra gli stessi dati, l'URL del file, l'uso e l'hash.

## Verifiche e limiti

- `node scripts/genera-sito.mjs`: 695 pagine più 404 e 48 ritratti copiati. Pagina generata e sitemap artisti identiche alle copie pubblicabili nella radice del worktree.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni, 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs`, `git diff --check`: superati.
- Anteprima locale a 1280 px e 390 × 844 px: immagine caricata, alt e credito presenti, canonical `https://www.dietroiltesto.it/artista/evanescence/`, nessuna fuoriuscita orizzontale o errore di console.
- La foto è di un concerto del 2015. Amy Lee è riconoscibile; gli altri componenti sono più piccoli e alcuni poco illuminati. Il proprietario potrà valutare questa scelta prima dell'integrazione.

**Stato:** proposta nel ramo `codex/ritratto-evanescence-2026-10-06`, in attesa di approvazione specifica. Nessun trasferimento nel `main`, push o pubblicazione. Per integrarla, fondere soltanto la voce `evanescence` in `dati/ritratti.json`, preservando gli altri lotti fotografici in revisione.
