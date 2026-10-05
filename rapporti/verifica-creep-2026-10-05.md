# Verifica indipendente: «Creep» (Radiohead) — 5 ottobre 2026

**Ambito:** `/canzone/creep/`, scheda presente nel sito generato. Ho confrontato `dati/canzoni.json` con la pagina HTML e riaperto le fonti indicate sotto. Questo è un rapporto di rilievi, non una correzione applicata. Non ho modificato `dit-verifica-venti`, né usato dati Google Search Console.

## Rilievi

### 1. Distanza tra singolo e album errata — certezza alta, P1

- **Testo pubblicato:** «Uscito come singolo il 21 settembre 1992, un anno prima dell'album d'esordio “Pablo Honey”.»
- **Problema:** tra settembre 1992 e febbraio 1993 trascorrono circa cinque mesi, non un anno. Il testo può confondere l'uscita originale con il ritorno in classifica del 1993.
- **Fonte aperta e passaggio:** [Rhino, *Happy Anniversary: Radiohead, Pablo Honey*](https://www.rhino.com/article/happy-anniversary-radiohead-pablo-honey), 22 febbraio 2016: ricorda l'uscita dell'album ventitré anni prima e colloca il singolo nel settembre 1992 (paragrafi 2–3). [ABC News, *How Radiohead single Creep became a 90s classic*](https://www.abc.net.au/news/2023-01-14/radiohead-creep-30-years-how-it-became-a-hit-intially-flopped/101837232), 14 gennaio 2023: indica 21 settembre 1992 per il singolo (paragrafo dopo l'immagine della copertina). La [scheda dell'etichetta XL](https://shop.xlrecordings.com/release/346538-radiohead-pablo-honey?lang=en_US) mostra nell'anteprima consultabile 22 febbraio 1993 per l'album; l'apertura diretta ha restituito 403, quindi la prova riaperta è Rhino.
- **Correzione proposta:** «Pubblicato come singolo il 21 settembre 1992, entrò poi in *Pablo Honey*, uscito il 22 febbraio 1993.» Distinguere eventualmente la ristampa britannica del settembre 1993.

### 2. Origine autobiografica presentata come certa — certezza alta sulla discordanza, P1/P2

- **Testo pubblicato:** «…ispirandosi a una cotta non ricambiata per una ragazza che, per sua stessa ammissione, aveva seguito per la città in modo eccessivo.» La `fraseIconica` ribadisce: «…un'immagine nata da una cotta reale e non ricambiata che Thom Yorke visse da studente a Exeter.»
- **Problema:** l'articolo citato di Louder presenta l'ispirazione come racconto ipotetico, non come ammissione di Yorke. Inoltre Yorke, intervistato nel 1993, descrisse il pezzo come osservazione di un personaggio, non come racconto diretto dei propri sentimenti. Un racconto di Jonny Greenwood sulla presenza di una donna a un concerto non prova i dettagli psicologici né l'ammissione attribuita a Yorke.
- **Fonte aperta e passaggio:** [Louder, David McLaughlin, 27 marzo 2026](https://www.loudersound.com/bands-artists/the-story-behind-radiohead-creep), paragrafi che iniziano con «Supposedly» e citano l'intervista di Greenwood. [Los Angeles Times, Steve Hochman, 15 agosto 1993](https://www.latimes.com/archives/la-xpm-1993-08-15-ca-23925-story.html), ultimo tratto dell'intervista: Yorke distingue il personaggio del brano dal proprio stato d'animo. [Louder, Niall Doherty, 4 maggio 2023](https://www.loudersound.com/features/thom-yorke-radiohead-creep-interview), ricostruzione di un'intervista diretta del 1992: alla domanda su una persona reale Yorke evita una conferma netta.
- **Correzione proposta:** eliminare «per sua stessa ammissione» e i dettagli di inseguimento non attribuiti. Presentare l'aneddoto come racconto riportato da Greenwood, affiancandolo alla diversa spiegazione data da Yorke nel 1993. Riscrivere anche la `fraseIconica` senza dichiarare autobiografica la scena.

### 3. «Bandito dalla BBC» più forte della prova disponibile — certezza media, P2

- **Testo pubblicato:** «Alla sua uscita nel 1992 il brano fu inizialmente bandito dalla BBC perché giudicato “troppo deprimente”…»
- **Problema:** il fatto meglio attestato è che BBC Radio 1 non lo inserì in programmazione; il termine «bandito dalla BBC» implica una proibizione formale dell'intera emittente. Le fonti raccontano l'episodio con formulazioni differenti.
- **Fonte aperta e passaggio:** [ABC News, 14 gennaio 2023](https://www.abc.net.au/news/2023-01-14/radiohead-creep-30-years-how-it-became-a-hit-intially-flopped/101837232), attribuisce a *Melody Maker* il rifiuto di Radio 1. [Official Charts, *Radiohead's Official Top 10 biggest selling singles*](https://www.officialcharts.com/chart-news/radioheads-official-top-10-biggest-selling-singles__15023/), sezione «1. Creep», parla di teorie e del mancato passaggio su Radio 1. [Louder, David McLaughlin](https://www.loudersound.com/bands-artists/the-story-behind-radiohead-creep) usa invece «banned», ma il collegamento al riepilogo BBC non è stato apribile per blocco `robots.txt`.
- **Correzione proposta:** «Secondo *Melody Maker*, citato da ABC, BBC Radio 1 non volle trasmetterla perché la riteneva troppo deprimente.» Evitare «bandito» finché non si riapre una fonte che documenti il provvedimento formale.

### 4. Ascolti Spotify: la riga Kworb non corrisponde al lettore — certezza alta sul disallineamento, P2

- **Testo e dati pubblicati:** «2,8 mld ascolti» (`ascolti: 2800000000`, `ascoltiTesto: "2,8 mld ascolti"`); il lettore incorpora l'ID Spotify `3HfB5hBU0dmBt8T0iCmH42`. La fonte indicata nella scheda è la sola pagina iniziale di Kworb, senza riga né data.
- **Fonte aperta e passaggio:** [Kworb, *Radiohead – Spotify Top Songs*](https://kworb.net/spotify/artist/4Z8W4fKeB5YxbusRsdQVPb_songs.html), aggiornato il 4 ottobre 2026: riga «Creep», 3.169.735.440 ascolti, collegata all'ID Spotify `70LcF31zb1H0PyJoS1Sx1r`. I due [lettori Spotify della riga Kworb](https://open.spotify.com/embed/track/70LcF31zb1H0PyJoS1Sx1r) e [della scheda](https://open.spotify.com/embed/track/3HfB5hBU0dmBt8T0iCmH42) mostrano entrambi «Creep» dei Radiohead, ma hanno ID differenti.
- **Cosa prova:** Kworb prova il conteggio della sua riga e il suo ID, non quello della registrazione incorporata dalla scheda. Il titolo uguale non risolve la discrepanza; non è stato trovato un totale verificabile per l'ID `3HfB5hBU0dmBt8T0iCmH42`.
- **Correzione proposta:** togliere temporaneamente il numero di ascolti (`ascolti` e `ascoltiTesto` nulli), oppure ricavarlo da una riga verificabile collegata esattamente all'ID incorporato. Non sostituire automaticamente il player con quello di Kworb: prima verificare che edizione e audio siano quelli desiderati.

### 5. Campi editoriali e crediti essenziali incompleti — certezza alta, 4A/4B

- **Dati presenti:** la voce `creep` in `dati/canzoni.json` non contiene `ultimaVerifica`, `statoEditoriale` o `descrizioneSeo`; nel corpo non nomina i produttori. La fonte di storia è Louder; le altre sono Wikipedia e la home di Kworb.
- **Problema:** 4A richiede data di verifica e stato editoriale, oltre ai crediti essenziali quando reperibili. La presenza degli URL non equivale alla verifica della scheda.
- **Fonte aperta e passaggio:** [Rhino, 22 febbraio 2016](https://www.rhino.com/article/happy-anniversary-radiohead-pablo-honey), attribuisce a Paul Q. Kolderie e Sean Slade la produzione del disco e descrive la loro collaborazione iniziale su «Creep». [Louder, 27 marzo 2026](https://www.loudersound.com/bands-artists/the-story-behind-radiohead-creep) cita Kolderie come coproduttore e documenta i crediti aggiunti a Hammond e Hazlewood dopo l'accordo sul brano.
- **Correzione proposta:** completare prima la revisione frase per frase; poi inserire data effettiva e stato editoriale. Aggiungere crediti di autori e produzione con fonte specifica e distinguere i crediti originari da quelli aggiunti in seguito. Verificare separatamente il link al testo: il lettore web non è riuscito ad aprire `https://www.letras.com/radiohead/creep/`, quindi qui non lo dichiaro corretto o errato.

## Controlli e limite della verifica

La `fraseIconica` è una parafrasi e non riproduce un verso: non ho riscontrato una violazione P3 in quella riga. Le attribuzioni «Pixies» e il rifiuto di eseguire il brano dal vivo richiedono maggiore precisione delle fonti se conservate; non le tratto qui come fatti falsi. La verifica riguarda una sola scheda, non il catalogo. Nessuna correzione è stata applicata al sito o ai dati.
