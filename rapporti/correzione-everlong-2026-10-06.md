# Everlong — correzione editoriale mirata (6 ottobre 2026)

## Problema e decisione

Il rapporto indipendente `LOTTO-05-2026-10-06.md` è stato usato come segnalazione, non come prova. La scheda già online attribuiva a Louise Post l'idea della parte vocale senza parole, mentre nel suo racconto fu Dave Grohl a chiederle di cantarla. Presentava inoltre una ripresa in cima alle classifiche di tutto il mondo dopo la morte di Taylor Hawkins, dati biografici e di produzione senza supporto, un conteggio di ascolti riferito a un altro ID Spotify e una parafrasi del ritornello troppo vicina al testo.

La correzione accorcia il racconto ai fatti sostenuti dalle fonti riaperte. La frase iconica ora descrive la collaborazione con Post senza riprodurre versi. Il conteggio di ascolti è stato rimosso, mentre resta il lettore della registrazione già incorporata: nessuna cifra viene attribuita a un ID diverso. Non sono stati alterati `ultimaVerifica` né lo stato editoriale: questa non è una revisione completa ai sensi del §4B.

## Fonti riaperte e affermazioni sostenute

| Fonte originale aperta | Passaggio pertinente e portata della prova |
| --- | --- |
| [Stereogum, con la dichiarazione di Louise Post](https://stereogum.com/2153963/veruca-salt-louise-post-foo-fighters-everlong/music) | Post racconta di avere cantato i cori al telefono da Chicago mentre Grohl registrava a Los Angeles; scrive che **lui le chiese** la parte vocale senza parole, ispirata a «Shimmer Like a Girl», e che **lei aggiunse** un'armonia al ritornello. È la testimonianza diretta decisiva per l'attribuzione. |
| [The Guardian, intervista a Dave Grohl](https://www.theguardian.com/music/2019/aug/16/dave-grohl-i-never-imagined-myself-to-be-freddie-mercury) | Grohl colloca la scrittura nel Natale 1996 in Virginia, mentre il matrimonio attraversava una crisi; racconta di dormire da un amico in un sacco a pelo e collega il brano a Louise Post. Non prova le affermazioni rimosse sul conto bancario o su altri membri della band. |
| [American Songwriter, storia di Everlong](https://americansongwriter.com/behind-lettermans-favorite-song-everlong/) | Riferisce che Grohl scrisse **la canzone** in circa 45 minuti, non il solo testo, e riporta la sua spiegazione dell'intesa fisica e spirituale. |
| [MusicRadar, ricostruzione con dichiarazioni di Grohl](https://www.musicradar.com/artists/every-time-i-sing-if-everything-could-feel-this-real-forever-and-everyone-else-is-singing-it-in-time-thats-pretty-powerful-how-dave-grohl-created-the-cathartic-rock-anthem-that-became-the-foo-fighters-signature-song) | Descrive il riff nato durante una pausa dalle sessioni di «Monkey Wrench», il video di Michel Gondry con riferimenti a *The Evil Dead*, e l'esecuzione solitaria di Grohl al concerto tributo a Hawkins del 2022. |
| [Kworb, elenco delle canzoni Foo Fighters](https://kworb.net/spotify/artist/7jy3rLJdDQY21OgRLCZ9sD_songs.html) | La riga «Everlong» mostra un conteggio ma il [suo collegamento Spotify](https://open.spotify.com/track/07q6QTQXyPRCf7GbLakRPr) ha ID `07q6QTQXyPRCf7GbLakRPr`; il lettore della scheda incorpora `5UWwZ5lm5PKu6eKsHAGxOk`. Titolo e artista uguali non allineano i due dati. La vecchia fonte era la homepage generica di Kworb. |

Il rapporto indipendente definiva falsa in assoluto la ripresa al numero uno nel 2022. La frase pubblicata parlava però di classifiche **in tutto il mondo**, cosa non dimostrata. Una [ricostruzione di Uproxx](https://uproxx.com/music/foo-fighters-billboard-rock-charts-taylor-hawkins/) riferisce un effettivo primo posto nella specifica classifica statunitense *Hot Hard Rock Songs*. Perciò la correzione elimina l'affermazione globale senza sostituirla con una negazione altrettanto larga. Non è stato usato Wikipedia come fonte esposta nella scheda.

Il racconto di Post sul sussurro e altre ricostruzioni della traccia finale non coincidono chiaramente; entrambe le descrizioni sono state omesse. Sono stati omessi anche i dettagli non sostenuti sul conto bancario, sull'intenzione di altri componenti di lasciare il gruppo, sul sogno del regista, il conteggio delle esecuzioni dal vivo e il superlativo sul «verso più citato». Il collegamento esterno al testo non è stato cambiato in questo lotto.

## Modifiche e controlli

- Modificati solo l'oggetto `everlong` in `dati/canzoni.json`, i file statici dipendenti, la sua immagine OG e questo dossier. I cambiamenti su archivio, ricerca, artista, album, genere e sitemap derivano dalla rimozione del conteggio.
- `node scripts/genera-sito.mjs`: 695 pagine più 404; 321 canzoni e 104 artisti. `scripts/genera-og.py --slug everlong` ha aggiornato l'immagine sociale e la relativa versione nell'URL.
- Passati `check-coerenza`, `check-completezza` (321/321), `check-link`, `check-seo` (696 HTML), `check-nature`, `check-freno` e `git diff --check`. Il confronto con checksum fra `sito/` e la radice pubblicabile non rileva differenze. Il controllo delle frasi iconiche segnala 32 altre schede già presenti, non Everlong.
- Anteprima locale verificata nel browser a 1280 e 390 px: testo e quattro fonti visibili, lettore Spotify caricato, canonical `/canzone/everlong/`, nessuna fuoriuscita orizzontale o errore di console. L'immagine OG 1200 × 630 è stata ispezionata visivamente.

## Limiti e stato

La riproduzione audio integrale di Spotify non è stata provata. L'ID incorporato mostra titolo e artista corretti ma non è stato ricondotto in questo lotto alla stessa pubblicazione della riga Kworb; per questo non si pubblica alcun conteggio. Il resto della scheda non ha ricevuto una nuova verifica completa §4A/4B. Lotto locale isolato in `codex/correzione-everlong-2026-10-06`, in attesa di revisione del proprietario: nessun trasferimento nel `main`, push o pubblicazione.
