# Tre fotografie approvate — integrazione nella copia separata

**29 settembre 2026.** Il proprietario ha approvato «tutte e tre» le fotografie: Iron Maiden, System of a Down e Alice in Chains. L’approvazione segue la proposta di completare l’integrazione e mostrare il risultato senza pubblicare.

Copia dedicata: `/Users/gianmicheletroisi/.codex/worktrees/ritratti-approvati-2026-09-29/dietro-il-testo`. Base: `84e7bcfd`. Le copie precedenti conservano le altre candidature in attesa di revisione.

## Modifica

Le tre pagine usavano la grafica originale perché i file non erano ancora nel registro del sito. Le anteprime precedenti aggiungevano manualmente nell’HTML temporaneo descrizione e credito: questi dati sarebbero stati persi rigenerando il sito.

Ora `dati/ritratti.json` e `scripts/genera/pagine.mjs` producono direttamente foto, testo alternativo descrittivo, dimensioni e credito completo. Le parti del credito sono testo e URL, senza HTML nei dati; il generatore esegue l’escape e rifiuta i crediti personalizzati privi di autore, fonte o collegamento alla licenza, e gli URL con protocolli eseguibili. Il formato precedente resta identico per le 27 foto già registrate.

La scelta precedente degli Iron Maiden in `dati/ritratti-scelti.json` è aggiornata alla scena di concerto approvata. I tre JPEG sono copiati senza ulteriori modifiche dai file già controllati; gli SHA-256 coincidono con quelli documentati.

## Fonti, licenze e pagine d’uso

| Pagina | Autore / licenza | Fonte originale verificata | Credito visibile |
|---|---|---|---|
| `/artista/iron-maiden/` | Raph_PH / CC BY 2.0 | [Flickr, IronMaidenO2_270517-51](https://www.flickr.com/photos/69880995@N04/34145629044/) | IronMaidenO2_270517-51 · Foto di Raph_PH · CC BY 2.0 · ridimensionata da Wikimedia Commons |
| `/artista/system-of-a-down/` | madSec / CC BY 2.0 | [Flickr, SDIM0378_v2](https://www.flickr.com/photos/62263963@N07/9580921139/) | SDIM0378_v2 · Foto di madSec · CC BY 2.0 · ridimensionata da Wikimedia Commons |
| `/artista/alice-in-chains/` | Sven Mandel / CC BY-SA 4.0 | [Commons, Rock am Ring 2019](https://commons.wikimedia.org/wiki/File:Alice_in_Chains_-_2019158181303_2019-06-07_Rock_am_Ring_-_0198_-_5DSR0483.jpg) | © Sven Mandel / CC-BY-SA-4.0 · Rock am Ring, 2019 · ridimensionata da Wikimedia Commons |

La verifica delle pagine originali e delle condizioni è del 29 settembre 2026. Autore, titolare dichiarato, fonte, download, licenza e relativo URL, data di verifica, modifiche, pagina d’uso, testo alternativo, dimensioni, byte e impronta del file sono nel registro. I [dossier originali e i riscontri](candidature-2026-09-29/README.md) sono archiviati insieme a questo rapporto. Le licenze restano CC BY 2.0 per i primi due file e CC BY-SA 4.0 per Alice in Chains.

## Prove completate

- `prova-ritratto`, `prova-ritratto-proprio` e `prova-ritratto-credito`: passano; quest’ultimo controlla anche i crediti approvati, le impronte dei JPEG e i casi di attribuzione incompleta.
- Confronto delle 27 figure già registrate: HTML identico byte per byte.
- Generazione: 687 pagine, 317 canzoni, 104 artisti, 251 album. Il controllo SEO comprende anche la 404: zero problemi su 688 pagine. Coerenza e collegamenti: zero problemi.
- Confronto con la stessa rigenerazione della base: cambiano esclusivamente i tre HTML artista e i loro `dateModified` / `lastmod`. Le 317 date canzone rimangono quelle precedenti. La normale rotazione giornaliera della pillola in homepage esiste già nella base.
- Verifica visiva nel browser a 1280, 390 e 320 px per tutte le tre pagine: immagini caricate, proporzioni mantenute, crediti approvati e tre collegamenti corrispondenti, nessun elemento fuori larghezza, nessuna immagine rotta, nessun errore o avviso di console registrato.
- A 320 px la foto verticale di Alice in Chains richiede uno scorrimento per vedere tutto il credito: controllata e documentata anche quella vista.
- Dal logo della pagina mobile si ritorna alla home: contenuto e ricerca presenti, nessun errore.

I risultati, le misure e gli screenshot sono in [ritratti-approvati-2026-09-29/prove](ritratti-approvati-2026-09-29/prove). Il sito di anteprima è prodotto dal generatore, senza correzioni manuali dell’HTML dopo la generazione.

## Anteprima finale

- [Iron Maiden](http://127.0.0.1:8779/artista/iron-maiden/)
- [System of a Down](http://127.0.0.1:8779/artista/system-of-a-down/)
- [Alice in Chains](http://127.0.0.1:8779/artista/alice-in-chains/)

## Limiti e stato

Le prime due fotografie sono scene di concerto; quella di Alice in Chains ritrae un solo chitarrista, senza attribuirgli un nome non documentato dalla fonte. L’integrazione riguarda le immagini: le biografie non sono state riverificate in questo lotto e restano nel filone editoriale indipendente.

Cartella principale, suo file non tracciato e lavoro dell’altra AI conservati. Nessun trasferimento nella cartella principale, push o pubblicazione. I sorgenti sono pronti nella copia separata; `sito/` è l’anteprima generata e ignorata da Git.

**Lotto chiuso, in attesa della revisione finale del proprietario per eventuale trasferimento e pubblicazione.** Conservare questi file nelle prossime esecuzioni della routine e scegliere un intervento indipendente.
