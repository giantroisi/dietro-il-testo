# Brief operativo — F17

Scritto il 25 agosto 2026, dopo la chiusura del brief F20-F27 e il riesame dei punti aperti dalle sessioni pre-ricostruzione (21-22 agosto). F17 è l'unico di quei punti rimasto un gap reale e allo stesso tempo realistico da chiudere con un intervento — a differenza di F18 (identità visiva autorizzata), che richiede licenze vere e non è nelle mie possibilità.

---

## 0. Prima di iniziare

**Leggi `COSTITUZIONE.md`.** Contiene missione, i nove principi non negoziabili, l'architettura editoriale approvata e la gerarchia delle fonti. Se questo brief contraddice un principio, **prevale il principio**: segnalalo invece di eseguirlo alla lettera.

**Aggiorna `ROADMAP.md` a ogni intervento**, come impone la sua "Regola di aggiornamento": cosa è cambiato, perché, quali verifiche sono state superate, se è online, cosa resta aperto, qual è il prossimo passo.

### Come funziona il sito adesso

- **Fonte di verità:** `dati/canzoni.json` (157 schede) e `dati/artisti.json` (104 artisti). Nessun contenuto vive solo nell'HTML (P9).
- **Generatore:** `node scripts/genera-sito.mjs` produce 655 pagine in `sito/` (cartella di build, non tracciata in git).
- **Pubblicazione:** si copia il contenuto di `sito/` sulla radice del repository, si committa e si fa push. Vercel distribuisce da `main` su `dietroiltesto.it` (canonico) e `dietro-il-testo.vercel.app`.
- **Moduli del generatore:** `scripts/genera/stile.mjs` (CSS), `guscio.mjs` (testa HTML, testata, piede), `pagine.mjs` (modelli delle pagine), `ricerca.mjs` (indice e comportamenti client).
- **Controlli disponibili:** `scripts/check-link.mjs`, `scripts/check-coerenza.mjs`, `scripts/check-testi.mjs`, `scripts/check-contrasto-v2.mjs`, `scripts/check-completezza.mjs` (report interno, non gate).

### Vincoli

- **Nessun framework, nessuna dipendenza Node.** Vanilla JS e CSS scritti a mano. (`scripts/genera-og.py` usa Python/Pillow solo per il build locale delle immagini di anteprima: non è una dipendenza del sito.)
- **Non riscrivere il contenuto editoriale delle schede.** I testi delle 157 schede sono lavoro d'autore: si toccano solo i punti indicati qui.
- **Mai testi o traduzioni di canzoni** sul sito (P3), nemmeno nelle anteprime social.
- **Un intervento per commit**, con il codice dell'intervento nel messaggio (es. `F17: raggruppa le fonti per ruolo`).
- **Verifica nel browser prima di pubblicare**: desktop e mobile (375px), tema chiaro e scuro, console senza errori.
- **Conferma che il dominio serva davvero la nuova versione** prima di dire che è fatto.

---

## F17 · Le fonti sono un mazzo unico, non agganciate a cosa dicono

### Problema, verificato

Ogni pagina canzone ha una sola sezione "Fonti" in fondo, con un elenco numerato che si presenta come se sostenesse ugualmente ogni affermazione della scheda — la storia, il momento iconico, il numero di ascolti, gli eventuali crediti.

Numeri reali, contati su `dati/canzoni.json`:

- 0 schede senza fonti; 3 con una sola fonte; 55 con due; **99 con tre o più.**
- La quasi totalità delle schede con il numero di ascolti include **`kworb.net (ascolti Spotify)`** tra le fonti — ma quella fonte serve solo a sostenere il numero di ascolti, non la storia o il momento iconico. Chi legge non ha modo di saperlo: nell'elenco appare alla pari delle altre.
- Le 4 schede con `sezioniExtra` (crediti di produzione) mescolano le fonti dei crediti con quelle della storia, nello stesso elenco.

Non è un problema di quantità di fonti (ce ne sono, e sono pertinenti) — è che **non dicono cosa sostengono**, violando lo spirito di P2 ("le fonti devono essere visibili e pertinenti", che oggi sono visibili ma non chiaramente pertinenti a una frase specifica).

### Cosa fare

Due strade. Scegline una — non fare un ibrido a metà.

**A — consigliata.** Non è realistico riverificare quale fonte sostiene quale singola frase su 157 schede: significherebbe rifare la ricerca editoriale da capo, non etichettarla. È realistico invece **classificare per ruolo** le fonti già presenti, che nella maggior parte dei casi è già ovvio dal contesto (`kworb.net` è sempre e solo per gli ascolti).

1. Aggiungi un campo opzionale `ruolo` a ogni oggetto di `fonti[]` in `dati/canzoni.json`: valori ammessi `storia`, `ascolti`, `crediti`, `curiosità`. Dove manca, il default resta `storia` (nessuna scheda peggiora rispetto a oggi).
2. Passa in rassegna le 157 schede e assegna il ruolo — per la maggioranza è pattern-matching meccanico (`kworb.net` → `ascolti`; fonti citate solo dentro `sezioniExtra` → `crediti`), non richiede riaprire ogni articolo.
3. In `scripts/genera/pagine.mjs`, raggruppa la sezione "Fonti" per ruolo invece di un elenco unico — per esempio "Sulla storia", "Sugli ascolti", "Sui crediti" — così chi legge sa cosa ogni fonte sostiene senza doverlo indovinare.
4. Aggiungi il controllo in `scripts/check-coerenza.mjs`: ogni `ruolo` presente deve essere tra i valori ammessi.

**B — citazione per singola affermazione.** Un rimando numerico accanto a ogni frase della storia, come una nota a piè di pagina. Corretto in teoria, ma richiede riaprire e riverificare ogni fonte di ogni scheda per stabilire esattamente quale frase sostiene — è ricerca editoriale da rifare su 157 schede, non un intervento di codice. Se la si sceglie, **non tentarla come intervento unico**: va dichiarata esplicitamente come lavoro continuo (come F15 per le copertine album), da applicare gradualmente sulle schede nuove o quando una scheda viene comunque riaperta per altri motivi.

### Criterio di accettazione

- Se scegli **A**: ogni fonte in `dati/canzoni.json` ha un `ruolo` esplicito o il default `storia`; la pagina canzone mostra le fonti raggruppate, non più un elenco indistinto; `check-coerenza.mjs` segnala un `ruolo` fuori dai valori ammessi; verificato che le 157 schede risultino coerenti.
- Se scegli **B**: F17 **non** passa a `completato` finché non è vero su tutte le 157 schede — passa a `lavoro editoriale continuo`, con lo stesso stato onesto già usato per F15.

---

## Rituale di pubblicazione

```
node scripts/genera-sito.mjs
node scripts/check-link.mjs
node scripts/check-coerenza.mjs
node scripts/check-testi.mjs
node scripts/check-contrasto-v2.mjs
```

Poi: verifica nel browser (desktop, 375px, chiaro, scuro, console pulita), copia `sito/` sulla radice, aggiorna `ROADMAP.md`, committa con `F17: ...`, push, e conferma che il dominio serva davvero la nuova versione.

## Cosa non rompere

- Gli URL già pubblicati (`canzone/<slug>/`, `artista/<slug>/`, `album/<artista>/<album>/`).
- `dati/*.json` come unica fonte di verità.
- Il comportamento delle pagine dove i dati mancano: dichiarare l'assenza, mai riempirla.
- Contrasto WCAG AA su tutti i colori identitari, in entrambi i temi.
- Il pulsante "Condividi" e le immagini di anteprima (F23): non cambiano con questo intervento.
