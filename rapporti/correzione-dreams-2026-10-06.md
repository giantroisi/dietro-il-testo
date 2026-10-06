# Dreams — correzione circoscritta, 6 ottobre 2026

## Problema nella scheda online

- La frase iconica iniziava con «Il verso più citato» senza una misura o fonte e rendeva quasi letteralmente un passaggio del ritornello, poi presentava una lettura redazionale come se fosse attestata. Rischio P3 e P1.
- Il corpo scambiava il divorzio di John e Christine McVie con la separazione di Mick Fleetwood. Aggiungeva «una sera», «su sua insistenza» e «prima demo» senza supporto nelle fonti primarie riaperte.
- Il lettore incorpora la versione `0ofHAoxe9vBkTCp2UQIavz`, **Dreams – 2004 Remaster**, nell'edizione *Rumours (Super Deluxe)*, mentre la scheda non precisava l'edizione. L'album originale del brano resta *Rumours*.
- Il numero «2,9 mld ascolti» era associato a Kworb, ma la riga *Dreams* su Kworb punta a `1lbXEepatjRVjoG8pZMtdp`, non all'ID incorporato. Il conteggio varia nel tempo. La coincidenza dei numeri mostrati oggi da Spotify non rende gli ID intercambiabili.

## Fonti originali riaperte

1. [Rhino, 18 giugno 2014](https://www.rhino.com/article/once-upon-a-time-in-the-top-spot-fleetwood-mac-dreams): nelle righe sul periodo di *Rumours* distingue la fine del matrimonio dei McVie dal divorzio di Fleetwood; riporta il racconto di Nicks a *Blender* sul Fender Rhodes e sui circa dieci minuti; dice che la band registrò il brano il giorno seguente e che raggiunse il primo posto della Billboard Hot 100. È una fonte dell'etichetta, ma la testimonianza di Nicks è riportata da un'intervista precedente.
2. [Rhino, 18 giugno 2019](https://www.rhino.com/article/once-upon-a-time-in-the-top-spot-fleetwood-mac-dreams-0): riporta i ricordi di Christine McVie sul primo ascolto, il lavoro di Buckingham sull'arrangiamento e il racconto di Nicks, attribuito al *Daily Mail*, della cassetta consegnata a Buckingham. Documenta la relazione fra i due e il concetto proposto per il momento iconico.
3. [Discografia ufficiale Fleetwood Mac, *Rumours*](https://www.fleetwoodmacofficial.com/album/rumours): tracklist originale, *Dreams* al numero 2 e Stevie Nicks come autrice. La pagina mostra 1977, ma il suo campo data grezzo è 1 gennaio: si usa soltanto l'anno, non il giorno.
4. [Spotify, brano incorporato](https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz): nel browser il titolo è *Dreams – 2004 Remaster* e l'album collegato è *Rumours (Super Deluxe)*. Il lettore della nostra anteprima usa lo stesso ID.
5. [Kworb, brani Fleetwood Mac](https://kworb.net/spotify/artist/08GQAI4eElDnROBrJRGE0X_songs.html): il link della riga *Dreams* apre `1lbXEepatjRVjoG8pZMtdp`. È stato riaperto per controllare la discordanza, non è più una fonte visibile della scheda perché il numero è stato rimosso.

## Modifica

Riscritti corpo e momento iconico senza versi o traduzioni, distinguendo ciò che Rhino documenta dall'interpretazione precedente non documentata. Corretto il contesto delle due separazioni e specificata l'edizione del lettore. Rimosso il conteggio statico e la fonte Kworb, mantenendo l'ID Spotify effettivamente incorporato. Le fonti ora visibili sono Rhino, la discografia ufficiale e Spotify. Rigenerati pagina, collegamenti e sintesi che la riprendono, indici, ricerca, sitemap canzoni e immagine OG con versione `7b46d2e83bca`. Non aggiornata la data di ultima verifica: questo è un intervento mirato, non la revisione completa di tutti i campi secondo §4B.

## Verifiche

`check-coerenza` (321 canzoni, 104 artisti), `check-completezza` (321/321), `check-link`, `check-seo` (696 pagine), `check-nature`, `check-freno` e `git diff --check` passano. Pagina controllata nel browser a 1280 e 390 px: frase e lettore leggibili, larghezza documento uguale alla viewport, canonical corretta, iframe sull'ID atteso. Immagine OG ispezionata a 1200 × 630: testo completo, nessun taglio. Gli errori di console osservati provengono dal JavaScript di Spotify; nessun errore del sito è emerso. Riproduzione integrale dell'audio non verificata.

**Stato:** proposta in copia separata, in attesa di revisione; nessun trasferimento al main, push o pubblicazione. La scheda online resta com'era finché non viene approvata e distribuita. L'archivio JSON è condiviso con altre proposte isolate: un'eventuale integrazione dovrà unire il solo oggetto `dreams` ai dati correnti e rigenerare le pagine derivate.
