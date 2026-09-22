# Indice — Verifica editoriale oraria (Dietro il testo)

Routine automatica avviata il 22/09/2026 (~16:14, Europa/Roma), un ciclo ogni 60 minuti, job CronCreate `2bf7c12c` — vive solo in questa sessione Claude, scade comunque dopo 7 giorni, si ferma se la sessione finisce.

**Dove lavora:** worktree `/Users/gianmicheletroisi/Claude/dit-verifica-venti`, branch `verifica/venti-schede-2026-09-21`. Nessuna modifica al repo principale, nessun push, nessuna pubblicazione: solo report in `rapporti/`.

**Cosa fa a ogni ciclo:** rilegge COSTITUZIONE.md e questo indice, sceglie la prossima scheda canzone non ancora coperta, riapre di persona le fonti citate, verifica ogni affermazione (R2 della Costituzione: un'affermazione per riga), scrive un file di dettaglio in `rapporti/orario/`, aggiorna il log qui sotto, fa un commit locale.

**Non tocca mai:** `dati/canzoni.json` (sola lettura), `scripts/`, `COSTITUZIONE.md`, `verifiche/indipendenti.json`, `verifiche/campione-dieci-2026-09-22/` (lavoro di un'altra sessione Claude — Opus — in corso in parallelo su questo stesso branch).

**Schede escluse dalla coda di questa routine (per non sovrapporsi ad altro lavoro già fatto o in corso):**
- Tutte le schede con `ultimaVerifica` valorizzato in `dati/canzoni.json`.
- Le 20 schede già coperte in `rapporti/RAPPORTO-VERIFICA-20-SCHEDE-2026-09-21.md` (e nel seguito `rapporti/VERIFICA-4-SCHEDE-2026-09-22.md`): whats-my-age-again, dont-look-back-in-anger, fuori-dal-tunnel, la-regola-dell-amico, hey-brother, urlando-contro-il-cielo, vivo-per-lei, man-in-the-box, yes-i-know-my-way, all-the-small-things, ho-messo-via, vieni-a-ballare-in-puglia, aerials, november-rain, war-pigs, wake-me-up-when-september-ends, hotel-california, black-pearl-jam, rock-n-roll-damnation, azzurro.
- Le 10 schede del sorteggio di Opus (`verifiche/campione-dieci-2026-09-22/_SORTEGGIO.txt`): stairway-to-heaven, bocca-di-rosa, my-immortal, ragu, overkill, cielo-stanza, paint-it-black, creep, marinella, bandiera-bianca.

**Coda:** costruita da `dati/coda-verifica.json` (ordine per impressioni Search Console), al netto delle esclusioni sopra; esaurita quella, si passa alle altre schede canzone senza `ultimaVerifica`.

## Log

- 2026-09-22 ~16:14 — `sound-of-silence-disturbed` — 17 affermazioni: 8 confermate, 4 con riserva, 5 non confermate, 0 contraddette — file: [rapporti/orario/01-sound-of-silence-disturbed.md](orario/01-sound-of-silence-disturbed.md) — difetto principale: l'intera frase iconica (scarto vocale, "riscoperta" del testo, fedeltà del testo) è senza copertura nelle due fonti citate.
