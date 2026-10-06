# Ritratto Adele — verifica del 6 ottobre 2026

## Uso e soggetto

- **Pagina d'uso proposta:** `/artista/adele/`.
- **Soggetto:** Adele sul palco della SSE Hydro di Glasgow, 26 marzo 2016. Il viso, il microfono e l'abito nella foto originale su Flickr coincidono con il ritaglio su Commons. Controllati visivamente sia la pagina originale sia il file locale.
- **Titolo originale:** “Adele 3”. **Autore:** Marc E. (`marcen27`). La pagina non dichiara un diverso titolare dei diritti.
- **Pagina originale dell'autore:** https://www.flickr.com/photos/marcen27/26102821816/
- **Pagina del ritaglio usato:** https://commons.wikimedia.org/wiki/File:Adele_2016.jpg
- **URL del file Commons:** https://upload.wikimedia.org/wikipedia/commons/7/7c/Adele_2016.jpg

## Diritti e trasformazioni

La pagina Flickr originale indica **CC BY 2.0**. Anche Commons indica CC BY 2.0 e registra il controllo FlickrReviewR del 30 marzo 2016. La [licenza CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.it), riaperta il 6 ottobre 2026, permette con attribuzione il riuso commerciale e le modifiche. Richiede il nome dell'autore, il titolo, il collegamento alla licenza e l'indicazione delle modifiche.

Il file di Commons è un ritaglio dell'originale Flickr attribuito nella cronologia Commons a `ThiefOfBagdad`. Il file Commons scaricato misura 1607 × 2134 px; il suo SHA-1 `491b2ae1ce018dbba1b7758c92e99ae49332e8a8` coincide con quello pubblicato da Commons. La versione locale è stata ridimensionata proporzionalmente a 903 × 1200 px e ricompressa in JPEG all'80%, senza ulteriori ritagli o ritocchi. Occupa 240929 byte; SHA-256 `94c3b7eadf0f743f2f12a22d0a2727250d311812d5e9e6ef77bb4a86abcb36f4`.

**Credito visibile:** “Adele 3 · foto di Marc E. (marcen27) · ritaglio Commons di ThiefOfBagdad · CC BY 2.0 · ridimensionata e ricompressa”. Il titolo rimanda a Flickr, il ritaglio a Commons e la licenza alla sua pagina ufficiale. **Alt:** “Adele sorride sul palco della SSE Hydro di Glasgow nel 2016”. La provenienza, le modifiche, la data di verifica e la pagina d'uso sono registrate anche in `dati/ritratti.json`.

## Verifiche della proposta

- `node scripts/genera-sito.mjs`: 35 ritratti copiati, 695 pagine più 404; la pagina generata e la copia nella radice coincidono.
- `node scripts/prova-ritratto-credito.mjs`, `node scripts/check-seo.mjs` (696 HTML), `node scripts/check-coerenza.mjs` (321 canzoni, 104 artisti) e `node scripts/check-link.mjs`: superati.
- Anteprima locale di `/artista/adele/` su desktop e a 390 × 844 px: ritratto caricato, credito visibile, nessuna fuoriuscita orizzontale sul mobile e nessun errore di console. La larghezza del documento sul mobile è 390 px.

**Stato:** proposta isolata nella copia `codex/ritratto-adele-2026-10-06`. Nessun trasferimento nel `main`, push o pubblicazione. La futura integrazione dovrà aggiungere la sola voce `adele` al JSON condiviso, oltre al file immagine, alla pagina generata e a questa documentazione, preservando le altre proposte fotografiche.
