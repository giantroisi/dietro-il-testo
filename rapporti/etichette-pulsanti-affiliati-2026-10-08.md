# Dicitura nei pulsanti affiliati, 8 ottobre 2026

## Modifica

Ogni pulsante Amazon mantiene «Acquista su Amazon» e mostra «link affiliato» su una seconda riga al suo interno. Dicitura a 12 px, stesso colore scuro del testo principale, nome accessibile con «link affiliato». Carrello decorativo, dimensioni compatte adattate a desktop e mobile. Componente `pulsanteAcquistoAffiliato` e stili condivisi esportati per tutti i partner.

Inventario attuale: 929 pulsanti Amazon in 254 pagine (87 album, 127 canzoni, 40 artisti). Nessun pulsante TicketOne attivo nei sorgenti, cataloghi o HTML; componente verificato con etichetta TicketOne e URL fittizio example.test, senza creare prodotti o URL affiliati non autorizzati. Il controllo dei pulsanti sponsored è indipendente dal dominio.

Costituzione §6 aggiornata con dicitura aggiuntiva, leggibilità e nome accessibile. Informative generali preservate. Nessuna nuova scheda o modifica del catalogo.

## Prove

- Confronto di tutti i 929 pulsanti prima/dopo: href, target, rel, tag e Tracking ID invariati; tutti i normali collegamenti e disclosure nel footer invariati.
- Generazione: 695 pagine più 404. Affiliazioni: 929 link; SEO e link interni: zero problemi.
- Sedici prove negative e ID vuoto superati, incluse rimozione della dicitura nel pulsante e nel nome accessibile; componente altri partner verificato.
- Browser: nove pagine rappresentative album/canzone/artista a 1280, 390 e 320 px, tre pagine anche in tema scuro a 1280 e 320 px: 33 verifiche positive. Sempre tre riquadri in album/canzoni, quattro nelle band. Seconda riga contenuta nel pulsante, font 12 px, aria-label corretto, nessun overflow; compresi titoli lunghi e CD.
- Contrasto testo #111 con estremi del gradiente normale e hover: minimo 10.45:1, identico in tema chiaro e scuro.
- Screenshot mobile controllato visivamente; nessuna riduzione del testo a dimensioni microscopiche.

## Percorso e limiti

Copia `/private/tmp/dit-pulsante-amazon-2026-10-08`, ramo `codex/etichette-pulsanti-affiliati-2026-10-08`, base `21354405b`. Copiati solo 254 HTML interessati e voci sitemap pertinenti; main, altra AI, ricerca e file non tracciati preservati. Routine sospesa. La dicitura segnala direttamente l’affiliazione, senza attestare una verifica legale completa delle altre condizioni del programma. Pubblicazione richiesta, esito live da completare.
