# Chiusura delle correzioni editoriali — 2 ottobre 2026

## Stato e perimetro

Questa è una proposta unica nella copia `codex/chiusura-correzioni-2026-10-02`, nata dal `main` locale `4e8fb35b`. Riunisce **12 schede** corrette in copie separate: Blind, Bohemian Rhapsody, Boulevard of Broken Dreams, Chop Suey!, Enter Sandman, In the End, Nothing Else Matters, Run to the Hills, Shape of You, The Sound of Silence (Disturbed), Sweet Child O' Mine e Paranoid. Highway to Hell era già stata trasferita nel `main` locale il 1° ottobre (§31 della Roadmap). Nessuna di queste nuove modifiche è stata trasferita nel `main`, inviata al remoto o pubblicata.

Le modifiche riguardano affermazioni eccessive o non sostenute, attribuzioni e interpretazioni presentate come fatti, traduzioni o parafrasi problematiche e, quando necessario, la frase iconica, la descrizione e l'immagine condivisibile. I dati strutturati e le pagine collegate sono stati rigenerati dai dati delle schede. Il numero delle schede, degli artisti e degli album resta 317/104/251. Il campo `ultimaVerifica` non è stato avanzato: queste correzioni mirate non equivalgono alla revisione frase per frase dell'intero archivio prevista dal §4B della Costituzione.

I rapporti dell'altra AI sono stati usati come segnalazioni; le fonti pertinenti sono state riaperte prima dell'integrazione. I dettagli, gli URL e le distinzioni tra fatto e interpretazione restano nei campi `fonti` e nei testi delle singole schede. Le copie e i file dell'altra AI non sono stati modificati. Le fonti ricontrollate per questo lotto comprendono [Metallica](https://www.metallica.com/songs/enter-sandman.html), [Official Charts](https://www.officialcharts.com/songs/queen-bohemian-rhapsody/), [Music Business Worldwide](https://www.musicbusinessworldwide.com/steve-mac-there-are-no-rules-to-pop-music-now-it-just-has-to-be-of-great-quality/), [Guitar World](https://www.guitarworld.com/gw-archive/archive-original-members-black-sabbath-look-back-30-plus-years-demonic-riffing-2001) e [American Songwriter](https://americansongwriter.com/the-anti-colonialist-message-in-the-meaning-behind-iron-maidens-run-to-the-hills/), insieme alle fonti specifiche indicate nelle schede. Alcune fonti esterne potrebbero cambiare in seguito.

## Immagini condivisibili e cache

Undici immagini OG aggiornate hanno ora un URL con versione legata all'hash del file; il generatore controlla che la versione corrisponda ai byte dell'immagine. La regola di cache per `/og/` richiede la rivalidazione. Questo evita di affidarsi al vecchio URL immutabile con cache di un anno quando cambia la frase in un'immagine. La scelta segue la [guida MDN a Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#immutable). La propagazione nei cache dei social non è verificabile dall'anteprima locale.

## Prove

- Generazione: 687 pagine più 404; i 1018 file generati in `sito/` sono stati copiati nella radice pubblicabile della copia.
- `check-seo`: 688 pagine, zero problemi; `check-coerenza`: 317 canzoni e 104 artisti, zero problemi; `check-link`: zero URL malformati o collegamenti interni rotti; `check-filtri`: 107 artisti italiani; `git diff --check`: pulito.
- `check-attribuzioni --tutte`: zero testate nominate senza una fonte nella rispettiva scheda; 30 avvisi informativi preesistenti su altre voci.
- Nel browser locale sono state aperte tutte e dodici le schede a 390 px: titolo, testo, URL canonico e immagine OG presenti, nessuna fuoriuscita orizzontale. Nessun errore registrato nella console. La scheda Paranoid è stata riaperta dopo la modifica della cache e mostra il nuovo URL OG versionato.

Questi controlli non sono un audit completo delle 317 schede. `check-completezza` rileva 316 schede con tutti i campi richiesti su 317; misura la presenza dei campi, non la verifica delle fonti. Restano avvisi generali su frasi iconiche ripetute e citazioni da riesaminare. Le nuove foto e le nuove pagine non rientrano in questo lotto.

## Revisione

Anteprima locale: `http://127.0.0.1:8802/canzone/paranoid/` e, sostituendo lo slug, le altre undici schede. Il server di anteprima è temporaneo. Dopo la revisione del proprietario, trasferire il lotto nella cartella principale, ripetere i controlli sulla versione consolidata e chiedere un'autorizzazione specifica per pubblicare. La conferma del 29 settembre riguardava il lotto precedente.
