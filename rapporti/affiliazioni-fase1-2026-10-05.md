# Affiliazioni Amazon Italia — Fase 1

Data: 5 ottobre 2026. Base: `origin/main` al commit `a99af868`; i commit successivi nel `main` locale restano esclusi da questo lotto.

## Intervento

- Creata `/affiliazioni/` con informativa al futuro, senza dichiarare un'adesione già avvenuta.
- Aggiunto il collegamento nel footer e aggiornate Privacy e Note legali.
- Creati configurazione centrale e componente per link testuali futuri. Il Tracking ID è vuoto e il componente non emette HTML finché resta vuoto. Richiede un URL HTTPS `www.amazon.it` con tag corrispondente e una verifica tramite strumenti ufficiali prima dell'uso. Mostra l'avviso accanto al link e applica `rel="sponsored nofollow noopener"`.
- Nessun link di prodotto, tag, prezzo, immagine, descrizione, recensione, marchio, widget o script Amazon attivo.

## Fonti di programma riaperte

- [Accordo operativo Amazon Italia](https://programma-affiliazione.amazon.it/help/operating/agreement?ac-ms-src=ac-nav), sezione 5: la dichiarazione «In qualità di Affiliato Amazon io ricevo un guadagno dagli acquisti idonei» riguarda l'adesione attiva; non è pubblicata nella fase preparatoria.
- [Indicazioni Amazon sulla disclosure](https://programma-affiliazione.amazon.it/help/node/topic/GHQNZAU6669EZS98): segnalazione chiara e vicina al link.
- [Amazon Link Checker](https://programma-affiliazione.amazon.it/help/node/topic/G6253GFSARDQENZR): controllo del tag e del collegamento futuro.
- L'accordo operativo rimanda all'[informativa sulla privacy Amazon.it](https://www.amazon.it/gp/help/customer/display.html?nodeId=200545460), collegata dalla pagina Privacy.

## Verifiche

- Generazione completa: 688 pagine pubbliche più 404; `check-seo` ha controllato 689 file HTML. Il catalogo contiene 317 canzoni e 104 artisti.
- `check-affiliazioni`, `check-seo`, `check-link`, `check-coerenza` e `git diff --check`: superati.
- Anteprima browser desktop e mobile (390 × 844): pagina, Privacy, Note legali, link footer e canonical verificati; nessuna fuoriuscita orizzontale o errore console nella pagina verificata.
- Le sitemap delle canzoni, artisti, album e raccolte non cambiano. La sitemap delle pagine include il nuovo URL.

## Limiti e passaggio alla Fase 2

Il programma non è ancora attivo per questo sito. Servono il Tracking ID comunicato dal proprietario e pochi URL testuali generati o verificati con gli strumenti ufficiali Amazon; prima dell'attivazione vanno aggiornate la dichiarazione richiesta, le informative e le singole pagine interessate. Questo lotto non richiede né aggiunge dati personali, fiscali o identificativi del titolare.
