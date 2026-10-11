# Ripristino della sola CTA Amazon, 12 ottobre 2026

## Modifica

Richiesta: togliere la dicitura piccola «link affiliato» dai pulsanti Amazon, mantenere la sola CTA e l’informativa una volta in fondo alla pagina; verificare dopo pubblicazione.

Il template Amazon usa la variante senza dicitura del componente condiviso: sola CTA «Acquista su Amazon» e carrello decorativo, nome accessibile ripristinato con azione e prodotto. Ripristinati markup e spaziatura su una riga di prima dell’intervento dell’8 ottobre. Il componente per gli altri partner mantiene la variante con dicitura; fixture TicketOne invariata e positiva.

Aggiornati 929 pulsanti in 254 pagine (87 album, 127 canzoni, 40 artisti). Informativa footer preservata identica e unica in tutte. Cataloghi, URL, tag, Tracking ID, target e rel invariati; normali link esterni invariati. Restano tre riquadri visibili per album/canzoni e quattro negli artisti, nelle stesse posizioni.

Costituzione §6 aggiornata con la nuova richiesta Amazon. Affiliazioni, Privacy e Note legali descrivono ora correttamente l’informativa in fondo; il testo precedente diceva ancora «accanto al link». Nessuna modifica alle condizioni commerciali o alle altre dichiarazioni informative.

## Verifiche

- Generazione: 695 pagine più 404. Affiliazioni: 929 link verificati. SEO e link: zero problemi.
- Sedici prove negative e ID vuoto superati, compresa reintroduzione della dicitura nel pulsante Amazon e duplicazione dell’informativa nel footer.
- Confronto completo dei 929 pulsanti e dei normali link: destinazioni, target, rel e tracking invariati; footer identico e unico. Cataloghi commerciali immutati.
- Browser: nove pagine a 1280, 390 e 320 px, 27 verifiche positive. CTA unica, informativa unica sotto l’ultimo riquadro, tre/quattro riquadri previsti, nomi accessibili corretti, nessun overflow. Tre pagine informative controllate anche a 390 px. Screenshot desktop e mobile controllati visivamente.
- La rigenerazione delle pagine informative ha lasciato le 254 schede identiche ai file già verificati nel browser, confronto SHA-256 positivo.

## Percorso e limiti

Copia `/private/tmp/dit-cta-amazon-2026-10-12`, ramo `codex/cta-amazon-2026-10-12`, base `e958c76b2ca928f8f5259774e446ba7d170e55fd`. Solo 257 HTML interessati e voci sitemap pertinenti trasferiti. Main, copia altra AI, ricerca e file SEO non tracciati preservati. Routine sospesa. Nessuna nuova verifica delle offerte Prime o degli altri contenuti editoriali: questo intervento riguarda la presentazione dei collegamenti. Pubblicazione richiesta, verifica live da completare.


Pubblicazione confermata: commit `a0862635c` su origin/main, deploy `dpl_7iyRegL4uXhpz2sS7TdCn8mug6tN` READY in produzione, commit e alias www.dietroiltesto.it verificati; GitHub Vercel success. Tutte le 257 pagine HTTPS identiche byte per byte ai file controllati. Browser live Hotel California canzone/album ed Eagles artista a 1280 e 390 px: sei verifiche positive, sola CTA nei pulsanti, tre/quattro riquadri previsti, unica informativa in fondo e nessun overflow. Screenshot online mobile controllato visivamente. Main, cataloghi, ricerca e due file SEO non tracciati preservati; routine sospesa.
