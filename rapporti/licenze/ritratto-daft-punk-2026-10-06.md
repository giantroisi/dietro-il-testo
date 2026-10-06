# Foto dei Daft Punk — verifica del 6 ottobre 2026

## Soggetto e provenienza

- **Pagina d'uso proposta:** `/artista/daft-punk/`.
- **Soggetto:** i due Daft Punk con caschi e costumi illuminati nella scena finale dell'esibizione NeverEverLand di Sydney del 22 dicembre 2007. Ho aperto la foto originale e il ritaglio: il file derivato mostra entrambi i musicisti. È una foto storica di palco, non una rappresentazione della formazione attuale.
- **Autore e titolare dichiarato:** `Bonsaichop` di English Wikipedia. La [pagina della foto originale](https://commons.wikimedia.org/wiki/File:DaftPunk_NeverEverLand_Sydney_2007.JPG) indica «Own work» e dice che l'autore, titolare del copyright, pubblica l'opera con le licenze elencate. Il registro conserva il caricamento originale del 23 dicembre 2007.
- **Pagina del ritaglio già pubblicato su Commons:** https://commons.wikimedia.org/wiki/File:DaftPunk_NeverEverLand_Sydney_2007_(cropped).JPG — caricamento di `RTSthestardust` del 30 aprile 2026. La cronologia dichiara un ritaglio del 65% in larghezza, 67% in altezza, 89% in superficie rispetto all'originale. Fonte, autore e licenza dell'opera originale sono espliciti anche qui.
- **URL esatto del file usato:** https://upload.wikimedia.org/wikipedia/commons/2/28/DaftPunk_NeverEverLand_Sydney_2007_%28cropped%29.JPG — 1117 × 778 px, 382.828 byte, SHA-256 `79e67155d71a3eb92aeeefd7ca4c024a77f91570639106509978339f5ed6e9d7`.

## Licenza e uso

Le due pagine Wikimedia Commons sono state riaperte il **6 ottobre 2026**. Offrono scelta fra GFDL e Creative Commons BY-SA nelle versioni 3.0, 2.5, 2.0 e 1.0. Per questa versione si sceglie **CC BY-SA 3.0**. L'[atto ufficiale](https://creativecommons.org/licenses/by-sa/3.0/) consente copia, distribuzione e adattamento anche commerciale, con credito, link alla licenza, indicazione delle modifiche e condivisione della versione modificata alla stessa licenza. Non è indicata una limitazione NonCommercial o di solo uso editoriale.

Il file locale `ritratti/daft-punk-sydney-2007.jpg` coincide con il ritaglio Commons; nessun ulteriore intervento sui pixel. La pagina del sito indica il ritaglio precedente nel credito. **Credito visibile:** «Foto di Bonsaichop · DaftPunk NeverEverLand Sydney 2007, ritaglio di RTSthestardust · CC BY-SA 3.0», con link alla pagina del file e alla licenza. **Alt:** «I due Daft Punk in costumi luminosi sul palco a Sydney nel 2007».

**Limite:** è una fotografia di spettacolo molto scura e mostra i caschi, non i volti. La documentazione Commons identifica il duo e la scena; il controllo visivo conferma due figure ma non può identificare i volti coperti. L'uso è descrittivo della performance, senza implicare approvazione da parte dei musicisti.

## Verifiche

- `node scripts/genera-sito.mjs`: 695 pagine più 404, 48 ritratti copiati. La pagina Daft Punk e la sitemap artisti nella radice pubblicabile coincidono byte per byte con la generazione.
- `node scripts/prova-ritratto-credito.mjs`: hash, credito, alt e dimensioni verificati.
- `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni e 104 artisti), `node scripts/check-link.mjs`, `node scripts/check-completezza.mjs`, `node scripts/check-affiliazioni.mjs` e `git diff --check`: superati.
- Anteprima locale desktop e mobile 390 × 844 px: le due figure sono visibili, credito e link licenza leggibili, JPEG caricato, canonical `https://www.dietroiltesto.it/artista/daft-punk/`, nessuna fuoriuscita orizzontale o errore di console.

**Stato:** proposta preparata e verificata nella copia `codex/ritratto-daft-punk-2026-10-06`, in attesa di approvazione specifica. Nessun trasferimento nel `main`, push o pubblicazione. In una futura integrazione aggiungere soltanto la voce `daft-punk` nel JSON condiviso, preservando quella Bon Jovi e le altre proposte in revisione.
