# Numb — correzione editoriale mirata (6 ottobre 2026)

## Problema e scelta

I rapporti indipendenti `LOTTO-04` e `LOTTO-05` hanno segnalato punti della scheda già online; sono stati trattati come piste, poi le fonti sono state riaperte. La formula «dodici settimane al numero 1 della classifica rock statunitense» non era falsa in ogni accezione: le dodici settimane appartengono alla **Modern Rock Tracks** di Billboard. Era però troppo vaga, perché altre classifiche rock hanno conteggi diversi. Ora la classifica è nominata. Sono stati corretti anche il formato di *Collision Course* (EP), l'attribuzione della dichiarazione di Shinoda, il contesto del missaggio e la fonte del numero di ascolti. Il momento iconico è stato riscritto senza un superlativo non provato, una parafrasi del ritornello o l'interpretazione psicologica non sostenuta.

## Fonti originali riaperte

| Fonte | Passaggio pertinente e portata |
| --- | --- |
| [Discografia ufficiale Linkin Park](https://meteora20desk.linkinpark.com/music) | L'elenco delle tracce di *Meteora* colloca «Numb» al numero 13, ultimo del disco. La [discografia ufficiale aggiornata](https://www.linkinpark.com/music) data *Meteora* al 2003. |
| [Metal Hammer, storia di Numb via Louder](https://www.loudersound.com/bands-artists/linkin-park-numb-story-jay-z) | Racconta che il brano prese forma una settimana prima delle sessioni agli NRG Studios, intorno al motivo di tastiera; riporta la spiegazione di Mike Shinoda a Shoutweb sul sentirsi svuotati dopo il tour di *Hybrid Theory*. Distingue la registrazione della voce di Chester Bennington dal missaggio **del resto** dell'album. Non data al marzo 2003 questa specifica spiegazione: la data nella vecchia scheda è stata tolta. |
| [Metal Hammer, A–Z dei Linkin Park](https://www.loudersound.com/features/the-a-z-of-linkin-park-chester-bennington-mike-shinoda) | Alla voce Numb nomina espressamente la **Modern Rock Tracks** e le dodici settimane al primo posto. Alla voce Jay Z definisce *Collision Course* un EP. |
| [Recording Academy, premio 2006](https://www.grammy.com/awards/categories/best-rap-sung-collaboration/2006/) e [racconto del discorso](https://live.grammy.com/videos/48th-annual-grammy-award-best-rapsung-collaboration) | Confermano vincitori e categoria per «Numb/Encore». Nel discorso Shinoda ringrazia Jay-Z per aver scelto il gruppo quando MTV gli propose l'iniziativa. La [storia della Recording Academy](https://www.grammy.com/news/jay-z-songs-albums-discography-collaborations-grammys-songbook/) conferma l'anno 2004 e il formato EP. |
| [Kworb, canzoni dei Linkin Park](https://kworb.net/spotify/artist/6XyY86QOPPrYVGvF9ch6wz_songs.html) | La riga «Numb» del 4 ottobre 2026 mostra più di 2,9 miliardi di ascolti e rimanda a [Spotify, traccia `1y1sChqjzdNWzwdHQADMrR`](https://open.spotify.com/track/1y1sChqjzdNWzwdHQADMrR), **lo stesso ID** del lettore nella scheda. L'indice generico citato prima non conteneva il numero. Si mantiene il valore prudente «oltre 2,8 mld», senza fingere che sia un contatore in tempo reale. |

Il rapporto indipendente citava anche Wikipedia e Songfacts come piste. I fatti mantenuti sono ora riconducibili alle fonti sopra. L'interpretazione genitoriale non è stata riportata: la sua diffusione non è dimostrata e la lettura di Songfacts non basta per scrivere «ampiamente letto». Il link esterno al testo è rimasto quello già presente; non è stato riesaminato in questo intervento. Nessun verso o traduzione è stato aggiunto.

## File e verifiche

- Modificato il solo oggetto `numb` in `dati/canzoni.json`, con corpo, frase iconica, dicitura degli ascolti e fonti. Rigenerati la pagina e i percorsi dipendenti, la ricerca, la sitemap e l'immagine OG. La modifica casuale della canzone in evidenza in homepage è stata scartata.
- `genera-sito` produce 695 pagine più 404, con 321 canzoni e 104 artisti. La radice pubblicabile coincide con `sito/` nel confronto con checksum.
- Passano `check-coerenza`, `check-completezza` (321/321), `check-link`, `check-seo` (696 HTML), `check-nature`, `check-freno` e `git diff --check`. `check-frase-iconica` segnala 32 schede precedenti, **non Numb**.
- Browser: desktop a 1280 px e mobile a 390 px, senza fuoriuscita orizzontale né errori di console. Canonical `/canzone/numb/`, cinque fonti visibili e lettore Spotify caricato con titolo e artista. L'immagine OG 1200 × 630 è stata vista: testo completo e leggibile.

## Limiti e stato

Non è stata provata la riproduzione integrale su Spotify. Il conteggio Kworb varia nel tempo; quello visibile è volutamente una soglia arrotondata, non un valore attuale esatto. Non è stata eseguita una nuova verifica completa §4A/4B e `ultimaVerifica` non è stata avanzata. Proposta isolata nel ramo `codex/correzione-numb-2026-10-06`, senza trasferimento nel main, push o pubblicazione.
