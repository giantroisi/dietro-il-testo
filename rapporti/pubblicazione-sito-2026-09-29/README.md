# Pubblicazione autorizzata — 29 settembre 2026

## Risultato

Il proprietario ha scritto «Confermo la pubblicazione». Pubblicato il lotto cumulativo già approvato e trasferito nella cartella principale, commit **02f952a473d53b8c35180a6eb43220850515ba0c**.

- Sito pubblico: https://www.dietroiltesto.it/
- Ambiente: produzione, progetto Vercel `dietro-il-testo`, sito statico (Framework Other).
- Pubblicazione: `dpl_EqEhqpspk5yv3YB2pbyqtkMXXa5v`, stato **READY**, domini assegnati.
- URL della versione: https://dietro-il-testo-1mrhzh0pn-giantroisi1.vercel.app/
- Tempo di costruzione riportato dalla piattaforma: circa 15 secondi; dalla creazione alla disponibilità, circa 18 secondi.
- Metodo: invio del commit approvato al ramo `main` del repository GitHub già collegato alla produzione. Il collegamento Vercel dell'app non aveva autorizzazione; utilizzato il programma Vercel già installato e autenticato per verificare progetto, ramo e risultato, senza cambiare gli accessi.
- Cartella principale: `/Users/gianmicheletroisi/Claude/dietro-il-testo`.
- Copia cumulativa conservata: `/Users/gianmicheletroisi/.codex/worktrees/integrazione-sito-2026-09-29/dietro-il-testo`.

Sono online ricerca da tastiera e stato senza risultati, filtro italiano normalizzato, grafica originale degli album, lettore Spotify su attivazione, correzione dell'accesso Basic opzionale e foto approvate di Iron Maiden, System of a Down e Alice in Chains. Catalogo invariato: **317 canzoni, 104 artisti, 251 album**. Testi e verifica editoriale delle canzoni non modificati in questa pubblicazione.

## Controlli prima dell'invio

Passano `check-filtri`, `check-seo` (688 pagine), `check-coerenza`, `check-link`, `prova-ritratto-credito` e `git diff --check`. Il controllo dei collegamenti alle fonti resta sintattico. Tutti i 1018 file del pacchetto generato coincidono con la radice pubblicabile. Preservato il file non tracciato `SEO-LASTMOD-2026-09-21.md`, con SHA-256 `60c097924257c6c028c2ac2bbed8970fc73c8da25770cee2f03210c0eeeac45b`.

## Controlli sul dominio pubblico

- **13 risorse previste rispondono HTTP 200 e sono identiche byte per byte alla versione approvata:** homepage, archivio, Aerials, album Toxicity, tre pagine artista, tre foto, `ricerca.js`, `robots.txt`, `sitemap.xml`. Esiti e SHA-256 in `prove/confronto-online.json`.
- Una richiesta iniziale aggiuntiva a `/ricerca.json` ha restituito 404: il file non esiste neppure nella versione locale, non è tracciato e non è richiesto dal sito. L'indice di ricerca è incorporato in `ricerca.js`; questa richiesta errata del controllo non è una regressione. Il primo tentativo di confronto con Python aveva un problema locale di certificati: completato il confronto con curl mantenendo la validazione TLS.
- Ricerca: stringa inesistente mostra il messaggio e il collegamento all'archivio; «Aerials» propone il brano giusto; Freccia giù e Invio aprono la scheda corretta. Stati in `prove/ricerca-vuota.txt` e `prove/ricerca-tastiera.txt`.
- Navigazione mobile: il collegamento della testata apre l'archivio. A **390 × 844** il filtro «Artisti italiani» è selezionato, aggiorna l'URL a `?paese=it` e annuncia **107 di 317 canzoni**. Il pulsante è alto **44 px**, la larghezza della pagina è **390 px**, senza fuoriuscita orizzontale. Dimensioni ordinarie ripristinate al termine.
- Tre foto: caricamento completo, testo alternativo e crediti con autore e licenza presenti sul dominio pubblico. Screenshot e misure salvati dopo il completamento delle immagini.
- Album Toxicity: la grafica originale è presente nella pagina pubblica; stato in `prove/album-online.txt`.
- Il browser interno non registra avvisi o errori di console nelle pagine del sito visitate (`prove/console-online.json`).

## Spotify e limiti delle prove

Nella scheda pubblica di Aerials si passa da zero iframe a un solo iframe dopo l'attivazione, con titolo e ID attesi. Il browser interno continua a mostrare il contenuto Spotify vuoto: **riproduzione audio sulla produzione non verificata in questo browser**. Il precedente controllo della stessa versione in Chrome, prima della pubblicazione, documenta caricamento e progressione dell'anteprima da 7 a 24 secondi; vedere `../trasferimento-sito-2026-09-29/README.md`. Non è stata verificata la riproduzione integrale né misurata l'uscita acustica.

La verifica HTTP è un campione mirato di risorse, non un controllo di rete di tutte le pagine o delle fonti esterne. Non sono stati usati dati GSC. Le candidature fotografiche recenti, le nuove schede e le proposte editoriali dell'altra AI restano separate e non sono comprese nell'autorizzazione per questo lotto. Nessun file dell'altra AI è stato modificato.

Questo rapporto e l'aggiornamento della Roadmap sono registrati localmente dopo la pubblicazione; non richiedono un secondo invio o una nuova distribuzione. Il riferimento della versione in produzione resta `02f952a4`.
