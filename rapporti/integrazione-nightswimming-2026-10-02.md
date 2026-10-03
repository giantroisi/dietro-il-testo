# Nightswimming — integrazione proposta, 2 ottobre 2026

## Ambito

Il candidato del 29 settembre è stato inserito in `dati/canzoni.json` e nell’elenco dei brani R.E.M. di `dati/artisti.json`. Il [dossier originale](scheda-nightswimming-2026-09-29.md) e il [JSON del candidato](scheda-nightswimming-2026-09-29.json) sono conservati qui come prove storiche; i loro riferimenti alla vecchia copia temporanea descrivono la preparazione, non lo stato di questa integrazione. Artista e album esistevano già. Nessuna fotografia o copertina aggiunta.

## Riapertura delle fonti

Il 2 ottobre sono stati riaperti i riferimenti decisivi, verificando le affermazioni della scheda contro le pagine, senza usare il dossier come unica prova:

- [R.E.M.HQ](https://remhq.com/music/automatic-for-the-people/): Nightswimming è la traccia 11; i crediti riportano Berry, Buck, Mills e Stipe, produzione Scott Litt e R.E.M., arrangiamento orchestrale di John Paul Jones per il brano.
- [NPR / WUWM](https://www.wuwm.com/arts-culture/arts-culture/2017-11-02/r-e-m-reflects-on-25-years-of-automatic-for-the-people): Mills racconta il giro di pianoforte, il contributo di Stipe, l’introduzione e le riprese aggiunte; non ricorda quale pianoforte usò per comporre.
- [ABC / Double J](https://www.abc.net.au/listen/programs/the-j-files/rem/10274428): Buck ricorda che il brano nacque alla fine del missaggio di Out of Time e la decisione di conservarlo per il disco successivo.
- [American Songwriter, Jim Beviglia](https://americansongwriter.com/lyric-week-r-e-m-nightswimming/): la lettura della fotografia, del passato, della routine e del rapporto personale è attribuita al critico, non presentata come intenzione dichiarata dalla band.
- [Salon, intervista a Scott Litt](https://www.salon.com/2017/11/18/scott-litt-on-r-e-m-s-automatic-for-the-people-an-album-that-captured-a-moment-in-time/): Litt racconta l’uso, in Florida, del pianoforte già impiegato per Layla e dei cavi fra le sale. Questo riguarda la registrazione, non il pianoforte su cui Mills compose.
- [Apple Music](https://music.apple.com/us/album/automatic-for-the-people/1440949853): album e anno 1992. [Vagalume](https://www.vagalume.com.br/r-e-m/nightswimming.html): destinazione esterna del testo corrispondente a titolo e artista, non prova per anno o album originale.

La data editoriale `ultimaVerifica` resta 29 settembre 2026, quando fu svolta la verifica completa frase per frase documentata nel dossier. La riapertura del 2 ottobre ha controllato l’integrazione senza attribuire una nuova revisione indipendente all’altra AI.

## Controlli nella nuova copia

`node scripts/check-freno.mjs` prima dell’aggiunta: 317 schede, 9 a fonte unica, 0 con sola fonte album, 0 senza fonte del brano, freno tolto. Dopo: 318 schede, stessi contatori. Il generatore ha prodotto 688 pagine; `check-coerenza` (318 schede), `check-seo` (689 pagine inclusa 404), `check-link` e `check-nature` hanno dato zero problemi. `check-completezza`: 318/318 complete.

Nel browser locale `http://127.0.0.1:8810/canzone/nightswimming/`, la scheda mostra titolo, momento iconico, fonti e il lettore Spotify già caricato con il titolo Nightswimming, R.E.M. e la copertina di Automatic for the People. La pagina artista elenca tre canzoni e l’album rimanda alla nuova scheda. A 390 e 320 px, larghezza del documento pari alla finestra; Archivio e Metodo misurano 44 px in altezza. Non è stata provata la riproduzione audio integrale.

**Stato:** proposta in copia separata `/Users/gianmicheletroisi/.codex/worktrees/scheda-nightswimming-2026-10-02/dietro-il-testo`. Nessun trasferimento alla cartella principale, invio al remoto o pubblicazione. Il prossimo ciclo ordinario, dopo questo risultato verificato, è immagini.
