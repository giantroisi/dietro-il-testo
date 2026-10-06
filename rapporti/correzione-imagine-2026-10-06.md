# Correzione proposta: Imagine — 6 ottobre 2026

## Problema online

La scheda `/canzone/imagine/` indicava l'album *Imagine* (1971), ma il player incorporava l'ID Spotify `0OnzB7ZlwHIWKAnM8G2XZg`: la pagina Spotify aperta nel browser lo colloca nella raccolta *BBC Radio 2’s Tracks Of My Years With Ken Bruce* (2015, 3:23). Il dato «847 mila ascolti» non aveva una riga Kworb dello stesso ID a sostegno. La frase iconica traduceva da vicino un verso e presentava senza prova un «verso più citato»; nel corpo figuravano inoltre il 2018 per il riconoscimento a Yoko Ono, una sessione unica il 27 maggio e Nicky Hopkins fra i musicisti del mix pubblicato.

Il rapporto esterno `Claude outputs/LOTTO-01-2026-10-05.md` è stato usato come segnalazione. Le fonti pertinenti qui sotto sono state riaperte in questa sessione; nessuna modifica è stata fatta alla copia dell'altra AI.

## Fonti riaperte e cosa provano

| Fonte originale | Passaggio pertinente | Conclusione e limite |
| --- | --- | --- |
| [Spotify, ID precedente](https://open.spotify.com/track/0OnzB7ZlwHIWKAnM8G2XZg) | Nella pagina del brano: raccolta BBC Radio 2, anno 2015, 3:23, 1.144.993 riproduzioni al controllo. | Non è la traccia dell'album dichiarato dalla scheda. Il numero è mobile. |
| [Spotify, ID selezionato](https://open.spotify.com/track/7pKfPomDEeI4TPT6EOYjn9) | «Imagine – Remastered 2010», John Lennon, album *Imagine*, 1971, 3:07, 920.136.962 riproduzioni al controllo. | L'ID e l'album corrispondono alla versione dichiarata. Spotify non garantisce in questa pagina la riproduzione integrale per utenti anonimi. |
| [John Lennon, scheda ufficiale del singolo](https://www.johnlennon.com/music/singles/imagine/) | Crediti del brano: Lennon alla voce e al piano, White alla batteria, Voormann al basso, Flux Fiddlers agli archi; autore Lennon & Ono. | Sostiene i crediti del mix pubblicato e l'attuale attribuzione degli autori. |
| [John Lennon, *Imagine – The Ultimate Collection*](https://www.johnlennon.com/music/albums/imagine-the-ultimate-collection/) | La sezione degli outtake distingue la prima take con Hopkins al piano elettrico e senza archi dalle versioni pubblicate. | Evita di attribuire automaticamente a Hopkins una parte udibile nel mix pubblicato. |
| [MusicRadar, Neil Crossley](https://www.musicradar.com/artists/anti-religious-anti-nationalistic-anti-conventional-anti-capitalistic-but-because-it-is-sugarcoated-it-is-accepted-the-song-john-lennon-called-the-best-ive-ever-written-and-yoko-onos-uncredited-contribution) | La registrazione comincia il 27 maggio ad Ascot; gli archi sono aggiunti il 4 luglio al Record Plant. L'articolo dice che il piano elettrico di Hopkins non fu mantenuto nel mix e riporta l'intervista di Lennon ad Andy Peebles. | Sostiene la cronologia, il limite sui crediti e la dichiarazione di Lennon. L'articolo data erroneamente al 2018 il riconoscimento NMPA: per l'anno si usa la fonte dell'associazione. |
| [NMPA, annuncio ospitato sul sito dell'associazione](https://www.nmpa.org/yoko-ono-will-share-credit-for-john-lennons-imagine-ny-times/) | Pagina del 19 giugno 2017: riferisce l'annuncio di David Israelite alla cerimonia di giugno 2017 secondo cui Ono sarebbe stata aggiunta come autrice. | Sostiene l'anno dell'annuncio, senza attribuire alla pagina una data di effettiva registrazione dei diritti. È una ripubblicazione del New York Times ospitata dalla NMPA, non un verbale tecnico dei crediti. |

## Modifica preparata

- Player spostato all'ID Spotify della traccia nell'album *Imagine*.
- Ascolti numerici e fonte Kworb generica rimossi. Un dato in continua variazione richiederebbe un controllo periodico della riga e dell'ID; il confronto fatto qui non giustifica mantenere «847 mila».
- Corpo aggiornato per distinguere sessione di base e archi successivi, crediti del mix finale e intervento preliminare di Hopkins. Il riferimento al 2018 è sostituito con l'annuncio NMPA del giugno 2017; la scheda ufficiale Lennon è citata per i crediti attuali.
- Frase iconica riscritta come osservazione sull'arrangiamento, senza tradurre versi. Rimossi superlativo e aneddoto religioso non necessari. Rigenerata l'immagine condivisibile.
- Aggiornate pagina canzone, indici, ricerche, percorsi di album/artista e sitemap che dipendono dalla scheda.

## Prove e limiti

Generazione: 695 pagine più 404. Passano coerenza (321 canzoni), completezza (321/321), link, SEO (696 pagine), nature, freno, affiliazioni, attribuzioni e `git diff --check`; il controllo delle frasi iconiche non segnala Imagine (restano 32 rilievi preesistenti su altre schede). Il confronto con checksum fra `sito/` e radice pubblicabile non mostra differenze. Nel browser locale a 1280 e 390 px la canonical è quella pubblica prevista, il lettore mostra «Imagine – Remastered 2010» e John Lennon, il testo corretto è visibile, non c'è «847 mila», né fuoriuscita orizzontale o errori di console. L'immagine OG è stata aperta a risoluzione originale e risulta leggibile.

Il controllo riguarda i rilievi sopra elencati, non una verifica ex novo di ogni frase della scheda. L'audio integrale del lettore non è stato provato. Nessun trasferimento al main, push o pubblicazione.
