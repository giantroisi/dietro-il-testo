# Fase 2 Amazon — 8 ottobre 2026

Autorizzazione del proprietario in questa chat: «pubblica il lavoro che hai fatto e procedi con l'incarico»; successiva scelta «scegli i vinili». Tracking ID verificato nell'account e in SiteStripe: dietroiltesto-21. Nessun dato personale, bancario o fiscale aggiunto al sito.

## Implementazione

Configurazione in dati/affiliazioni.json; catalogo centralizzato dati/affiliazioni-prodotti.json. Il componente resta silente con Tracking ID vuoto. Aggiornate Affiliazioni, Privacy, Note legali e Chi siamo. Formula esatta visibile nella pagina Affiliazioni e presso il prodotto: «In qualità di Affiliato Amazon io ricevo un guadagno dagli acquisti idonei». Restano dichiarati indipendenza editoriale, pertinenza e trattamento separato su Amazon dopo il clic; nessun cookie o risorsa Amazon viene caricata direttamente dalle nostre pagine tramite il link.

Prima scheda monetizzata: /canzone/hotel-california/. Un link testuale, dopo le fonti: «Hotel California degli Eagles in vinile su Amazon». Nessun altro prodotto iniziale. Avviso evidente «Link affiliato: potremmo ricevere una commissione senza costi aggiuntivi per te» e rel="sponsored nofollow noopener". Nessun prezzo, disponibilità, immagine, recensione, marchio o descrizione commerciale Amazon nel sito. Nessun banner, widget o script aggiunto.

Prodotto verificato direttamente su Amazon.it in Chrome: https://www.amazon.it/Hotel-California-Eagles/dp/B00OJ43HFI — titolo «Hotel California», artista Eagles, formato «Vinile». ASIN B00OJ43HFI letto nell'URL, non inventato. In SiteStripe risultano ID negozio e ID monitoraggio dietroiltesto-21. Selezionato link completo e copiato dallo strumento ufficiale senza modificarlo; URL integrale conservato in dati/affiliazioni-prodotti.json (contiene linkCode=ll2, tag corretto, linkId e ref_=as_li_ss_tl). Il formato in vinile è stato scelto dopo l'indicazione del proprietario, sostituendo il candidato CD iniziale.

Fonte delle regole riaperta: https://programma-affiliazione.amazon.it/help/operating/agreement — sezioni 1 (Special Links in formato fornito) e 5 (disclosure chiara e prominente). Il servizio web restituisce la versione inglese; nessuna pretesa di verifica fiscale o giuridica completa.

## Prove

Generazione 695 pagine più 404, 51 ritratti. Controlli affiliazioni, SEO (696 HTML, zero rilievi), collegamenti, coerenza, completezza e crediti delle fotografie superati. check-contrasto-v2: 425 combinazioni identitarie, zero valori sotto 4,5:1. Il vecchio check-contrasto non riconosce più il CSS e non viene considerato prova positiva. Contrasto effettivo del link controllato nei due temi: sopra 4,5:1.

prova-affiliazioni.mjs modifica temporaneamente l'HTML generato e ne verifica il rifiuto per tag errato, tag assente, rel incompleto, avviso assente, dichiarazione assente e link non dichiarato; ripristina sempre il file. Prova separata della configurazione vuota: il componente non mostra il prodotto. HTML finale conforme.

Browser locale: desktop 1280×900 e mobile 390×844; avviso e link leggibili, nessun overflow. Tema chiaro/scuro, navigazione dal footer a Affiliazioni, Privacy e Note legali; canonical corrette. Collegamento accessibile da tastiera, nome che descrive la destinazione, nessun elemento interattivo annidato. Nessun errore di console nell'anteprima. Verifica circoscritta, non un audit completo WCAG.

Copiate nella radice soltanto le cinque pagine interessate, tutte identiche alla generazione. Sitemap aggiornate solo per modifiche effettive; riallineate anche le date delle quattro fotografie approvate e della correzione Should I Stay già pubblicate. Nessun cambio a title, description, fonte o data editoriale di Hotel California.

## Pubblicazione precedente e limiti

Commit fotografico f76d02c67 inviato su origin/main dopo approvazione nominativa dei cinque interventi. Confrontati sul dominio dieci file (quattro pagine artista, canzone Should I Stay, tre JPEG, immagine OG e ricerca.js): tutti identici ai locali. Copie originali, file non tracciati SEO e copia dell'altra AI preservati.

Il connettore Vercel restituisce 403 per il team giantroisi1; il sito pubblica comunque da Git e l'esito viene verificato sul dominio. Non si dichiara un ID deploy o un'ispezione dei log Vercel non disponibili. La ricerca immagini riprende dopo questo incarico; l'automazione non riceve un'autorizzazione permanente ad aggiungere altri prodotti.

## Esito live

Commit Fase 2: 3a0035585, integrato in main con fast-forward e inviato su origin/main. Pubblicazione da Git confermata sul dominio https://www.dietroiltesto.it/. Confronto byte per byte di Affiliazioni, Privacy, Note legali, Chi siamo, Hotel California e tre sitemap: otto file identici ai locali. In una prima richiesta tre informative erano ancora precedenti; la richiesta successiva le ha trovate tutte aggiornate.

Browser live: Hotel California e Affiliazioni a 1280 px e 390 px; formula, avviso, rel, canonical, link footer e assenza overflow confermati; nessun errore di console rilevato. Apertura dell'URL estratto dal link live in Chrome: Amazon mostra Hotel California, Eagles, formato Vinile, canonical B00OJ43HFI e tag dietroiltesto-21. Nessun acquisto effettuato.

File Fase 2: dati/affiliazioni.json, dati/affiliazioni-prodotti.json, scripts/genera/affiliazioni.mjs, scripts/genera/pagine.mjs, scripts/check-affiliazioni.mjs, scripts/prova-affiliazioni.mjs; HTML Affiliazioni, Privacy, Note legali, Chi siamo e Hotel California; sitemap-pagine.xml, sitemap-canzoni.xml e sitemap-artisti.xml; ROADMAP.md e questo rapporto. Il sito non richiede altre informazioni personali per questa attivazione.
