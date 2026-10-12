# Amazon — altre dieci canzoni — 12 ottobre 2026

## Problema e intervento
Dieci canzoni esistenti non avevano un prodotto Amazon configurato. Preparati quattro prodotti verificati, condivisi con le rispettive quattro pagine album e quattro band: 18 pagine in totale.

| Artista | Album / prodotto | Canzoni coperte | Formato |
|---|---|---|---|
| Deep Purple | Machine Head, B016AAL1XI | Smoke on the Water; Highway Star; Space Truckin' | Vinile Prime |
| Sum 41 | All Killer No Filler, 25th Anniversary, B0H3M16NSJ | Fat Lip; In Too Deep; Motivation | Vinile Prime |
| Fleetwood Mac | Rumours, black LP, B0DSJTCRH2 | Dreams; Go Your Own Way | Vinile Prime |
| Disturbed | Immortalized, B0106US03M | The Sound of Silence; The Light | CD Prime |

## Prove e metodo
Originali Amazon riaperti in Chrome il 2026-10-12: titolo, artista, formato, ASIN e tracce pertinenti. Badge prime nell’offerta nuova selezionata, Speditore / Venditore Amazon. Per Sum 41 disponibilità indicata di due copie, ulteriori in arrivo. Per Disturbed il vinile B0106US0UA non mostra il badge, soltanto consegna gratuita per membri Prime; scelto il CD Prime dello stesso album dopo la ricerca documentata.

Tracking ID `dietroiltesto-21`. SiteStripe su Machine Head conferma copia del link completo, ma la clipboard del browser restituisce vuoto. Usato il formato per link testuali della guida ufficiale Amazon italiana riaperta: `https://www.amazon.it/dp/ASIN/ref=nosim?tag=dietroiltesto-21`. Tutti e quattro verificati nello strumento autenticato Controllo Link con esito positivo. Nessuna lettura della clipboard di sistema.

Fonti aggiuntive riaperte: [uDiscover Music, edizione 25° anniversario Sum 41](https://shop.udiscovermusic.com/collections/dads/products/sum-41-all-killer-no-filler-25th-anniversary-alternate-cover-silver-2lp), [Disturbed, annuncio e tracklist Immortalized](https://disturbed1.com/the-hiatus-is-over-new-album-immortalized/), [guida Amazon ai link testuali](https://programma-affiliazione.amazon.it/help/node/topic/GP38PJ6EUR6PFBEC). Il prodotto Amazon Sum 41 indica grigio opaco; il negozio ufficiale presenta la variante silver: conferma delle canzoni nell’album anniversario, senza equiparare le due varianti. La numerazione Disco 1–3 della tracklist Amazon non viene riprodotta nel sito. Per Disturbed l’etichetta secondaria Best Of di Amazon è incompatibile con la tracklist completa di Immortalized 2015: abbinamento verificato con titolo, artista, ASIN e sequenza ufficiale di 13 brani.

## Layout e controlli
- Tre riquadri visibili per canzone/album; quattro per band nelle posizioni costituzionali. Ogni band dispone, in questo lotto, di un solo prodotto verificato, ripetuto nei quattro punti.
- CTA “Acquista su Amazon”; informativa una volta in fondo; nessun prezzo o immagine Amazon copiati.
- Generazione: 695 pagine. SEO: 696 HTML, zero problemi. Affiliazioni: 1.065 link DOM verificati. Link interni: zero problemi. Tre percorsi Ligabue e sei link contestuali preservati.
- 40 verifiche browser: tutte le 18 pagine a 1.280 e 390 px; quattro campioni a 320 px. Quantità riquadri, destinazione esatta, CTA e informativa corrette; nessun overflow.
- Otto percorsi realmente effettuati band → album → canzone: quattro desktop e quattro mobile.
- Quattro pulsanti cliccati fino al prodotto Amazon corretto con Tracking ID presente.
- Nessun errore console nell’anteprima. Paragrafi editoriali, fonti, titoli, meta description e stato di verifica invariati.

Screenshot: `prove-amazon-altre-dieci-2026-10-12/desktop.jpg` e `mobile.jpg`. Prove strutturate: `prove-amazon-altre-dieci-2026-10-12.json`.

## Stato e limiti
Preparato e verificato nella copia `/private/tmp/dit-amazon-dieci-2026-10-12`, branch `codex/amazon-altre-dieci-2026-10-12`, base `342a5f52a5436a97bdd4ae5e14d1a0ba27cd8290`. Main, file non tracciati e copia dell’altra AI preservati. Il proprietario ha approvato specificamente questo lotto; integrato in main con fast-forward, inviato al remoto e pubblicato.

Prime e disponibilità sono verifiche puntuali, non garanzie future. Il controllo commerciale non costituisce una revisione editoriale delle schede. La routine rimane sospesa; nessun dato GSC utilizzato.

Integrazione futura: aggiungere solo le quattro nuove chiavi in `dati/affiliazioni-prodotti.json` e le quattro nuove band in `dati/affiliazioni-artisti.json`; integrare i 18 HTML e solo le voci sitemap pertinenti. Gli altri prodotti e percorsi restano invariati.

## Pubblicazione verificata
Commit contenuti `0cfdf96c0e175dcfc3d13ee785c2389cc629c1a2`, deployment `dpl_HCcfgaU2LiWN6Be9brfcc56NWmxT` READY in produzione. Team giantroisi1, progetto dietro-il-testo, SHA e alias www.dietroiltesto.it verificati con dashboard autenticata e metadata Vercel; build 16 secondi. Ripetuti generazione, affiliazioni, SEO, link interni, collegamenti contestuali e diff dopo l’integrazione: positivi.

18 HTML e tre sitemap HTTPS identici byte per byte ai file approvati. Dodici verifiche browser live (sei pagine a 1280 e 390 px) positive: tre/quattro riquadri, sola CTA, unica informativa, prodotti corretti e nessun overflow. Percorso Disturbed → Immortalized → The Sound of Silence realmente effettuato su mobile. Screenshot online controllato visivamente; zero errori console. Main e due documenti SEO non tracciati preservati, routine sospesa.
