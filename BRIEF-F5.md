# Brief operativo — F5 (frasi iconiche mancanti)

Scritto il 28 agosto 2026. L'autore ha dato il via esplicito a completare il campo `fraseIconica` sulle 54 canzoni che ne sono prive, con lo stesso standard di rigore di F39, e con un'istruzione chiara: **se non ci sono prove, scarta e procedi** — nessuna frase iconica indovinata o inventata pur di far tornare il numero.

---

## 0. Prima di iniziare

**Leggi `COSTITUZIONE.md`.** Qui sono centrali **P1** (verità prima della quantità), **P2** (fonti visibili e pertinenti) e soprattutto **P3** (mai testi o traduzioni delle canzoni): la frase iconica **descrive o parafrasa**, non cita mai un verso originale, nemmeno tra virgolette.

### Stile di riferimento (dalle 103 già scritte)

Ogni `fraseIconica` esistente segue lo stesso schema in 2-4 frasi:

1. Identifica il passaggio (verso, ritornello, bridge) **più citato/discusso**, descrivendone il contenuto con parole originali — mai il testo.
2. Aggiunge un fatto verificato che spiega perché quel passaggio è diventato iconico: una dichiarazione dell'autore, un aneddoto documentato, un'interpretazione diffusa attribuita a una fonte nominata.

Esempio (Creep, Radiohead): *"Il verso più citato è l'auto-definizione del narratore come uno strano fuori posto, che vorrebbe essere speciale come la persona che osserva da lontano. Thom Yorke lo scrisse alla fine degli anni '80 da studente a Exeter, e in un'intervista del 1993 spiegò di aver avuto 'un vero problema a essere un uomo negli anni '90'..."*

## Standard di rigore (stesso di F39)

1. **Cerca, non ricordare.** Ogni frase iconica nasce da una ricerca reale (Songfacts, Genius — solo le annotazioni, mai il testo —, interviste, Wikipedia, testate musicali), non dalla memoria.
2. **Verifica prima di scrivere**: qual è davvero il passaggio più citato/discusso di questa canzone, secondo una fonte nominabile? Non un'impressione personale.
3. **Mai riprodurre il testo**, nemmeno un frammento tra virgolette. Solo parafrasi.
4. **Se non si trova una fonte che indichi chiaramente qual è il momento iconico**, il campo resta vuoto. Non è un fallimento del lavoro: è la scelta onesta prevista da P1.
5. **Aggiungi la fonte usata a `fonti[]`** se non è già presente una fonte equivalente (spesso Wikipedia/Songfacts sono già lì dal lavoro editoriale precedente e bastano).
6. **Un lotto per commit**, verificato e pubblicato prima di passare al successivo.

## Le 54 canzoni

```
darkside, antivist, chelsea-smile, doomed, follow-you, parasite-eve, lost, die4u,
riders-on-the-storm, personal-jesus, sono-solo-canzonette, shadow-moses,
wonderful-life, nihilist-blues, one, ace-of-spades, psychosocial,
symphony-of-destruction, sober, square-hammer, american-idiot,
boulevard-of-broken-dreams, fat-lip, in-too-deep, crawling, one-step-closer,
uprising, starlight, all-the-small-things, i-miss-you, she-looks-so-perfect,
still-waiting, whats-my-age-again, happy-song, ho-messo-via,
hanno-ucciso-luomo-ragno, wake-me-up, hypa-hypa, diventerai-una-star,
vieni-a-ballare-in-puglia, marmellata-25, get-lucky, shape-of-you,
sugar-were-goin-down, ragu, 21-guns, mr-brightside, cattiva, break-stuff,
my-exs-best-friend, welcome-to-the-black-parade, supermassive-black-hole,
dont-look-back-in-anger, ringo-starr
```

## Criterio di accettazione

- Ogni `fraseIconica` scritta ha una fonte verificabile dietro, non un'impressione.
- Zero versi o traduzioni riprodotti, nemmeno parziali.
- Le canzoni per cui non si trova una fonte chiara restano senza `fraseIconica` — dichiarate esplicitamente nel registro, non nascoste.
- Aggiornato `check-completezza.mjs` per misurare il progresso reale a ogni lotto.

## Rituale di pubblicazione

```
node scripts/genera-sito.mjs
node scripts/check-link.mjs
node scripts/check-coerenza.mjs
node scripts/check-testi.mjs
node scripts/check-contrasto-v2.mjs
```

Poi: verifica nel browser che il "Momento iconico" compaia correttamente (non più la dichiarazione di assenza), copia `sito/` sulla radice, aggiorna `ROADMAP.md`, committa con `F5: aggiunte N frasi iconiche (lotto X)`, push, conferma che il dominio serva la nuova versione.
