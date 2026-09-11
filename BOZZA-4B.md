# Bozza — nuova sezione della COSTITUZIONE

**Non è ancora dentro la costituzione.** La costituzione dice di sé stessa che cambia solo per decisione esplicita dell'autore: questa è una proposta da leggere, correggere o rifiutare. Se una regola non convince, è meglio scoprirlo adesso che dopo trenta schede scritte seguendola.

Va inserita dopo la sezione **4A** (standard editoriale) e prima della **5** (gerarchia delle fonti).

---

## 4B. Come si scrive una scheda nuova

La sezione 4A dice **cosa deve contenere** una scheda. Questa dice **come si scrive** perché il contenuto sia vero la prima volta, senza doverla riaprire dopo.

Non è una lista di precauzioni teoriche. Ognuna di queste regole corrisponde a un errore trovato più di una volta dalla verifica indipendente: sono otto campioni, oltre novecento affermazioni riaperte una per una, e ciò che cade non sono quasi mai bugie — sono **dettagli plausibili aggiunti mentre si scriveva, che nessuna fonte contiene**.

### R1 — Si scrive dalla fonte, non si cerca la fonte per ciò che si è scritto

Prima si aprono e si leggono le fonti, poi si scrive. Ogni frase deve nascere da qualcosa che si ha davanti in quel momento.

Il gesto vietato è quello inverso: scrivere il racconto e poi cercare una pagina che lo sostenga. È da lì che entrano i dettagli che rendono la storia più bella e che nessuno ha mai letto da nessuna parte — un aneddoto raccontato come accertato, una donna «sulla trentina» dove la fonte parla di un locale pieno di gente, un campo «della Bassa emiliana» dove la fonte dice solo «un campo».

**La direzione del lavoro è la regola più importante di questa sezione**: quasi tutte le altre servono a rimediare quando questa non viene rispettata.

### R2 — L'unità è la singola affermazione

Una data, un nome, un luogo, un ruolo, una cifra, un'attribuzione: ognuna è un'affermazione a sé e va sostenuta a sé.

«Registrata nel 1991 allo studio X dal tecnico Y» sono **tre** affermazioni, non una. Una scheda è verificata quando ogni singola affermazione ha superato il controllo, non quando «il senso generale» regge: un controllo che raggruppa quattro affermazioni in una domanda sola non è un controllo debole, è **un controllo che risponde a una domanda diversa**.

### R3 — Chi dice una cosa fa parte della cosa

Se una frase nomina una testata, un programma, un podcast o un'intervista, quella fonte **deve stare fra le fonti della scheda e deve contenere davvero ciò che le si attribuisce**.

Se non è così, ci sono tre uscite legittime, e una sola che non lo è:

1. si aggiunge la fonte vera fra le fonti della scheda;
2. si toglie il nome dalla frase;
3. si attribuisce a chi lo riporta («secondo Songfacts, che cita Rolling Stone nel 2006…»).

Lasciarlo com'è non è una di quelle tre.

Due precisazioni, entrambe nate da errori reali:

- **vale anche al grado minimo.** Una descrizione scritta dal redattore di una fonte non diventa una dichiarazione dell'artista. «Songfacts spiega che il brano è uno sfogo» e «l'artista ha descritto il brano come uno sfogo» sono due affermazioni diverse, e solo la prima è vera;
- **vale anche nel nome della fonte.** Scrivere «Wikipedia (riporta il podcast *X* con Tizio)» è un'attribuzione come le altre: se quella pagina il podcast non lo nomina, il nome va tolto. Il campo `nome` non è un'etichetta libera, è testo pubblicato.

### R4 — La frase iconica è testo come gli altri

Stesse regole di fonte del corpo. Non è un riassunto poetico esentato dalla verifica.

Va detto perché serve una regola apposta: **le correzioni tendono a fermarsi dove il rilievo cita il testo**, cioè nel corpo, e l'affermazione sbagliata sopravvive nella frase iconica — è successo almeno tre volte, e una volta un'affermazione tolta dal corpo è ricomparsa lì. Ed è **la riga più esposta del sito**: finisce nell'immagine da condividere e nell'anteprima dei motori di ricerca.

Alla frase iconica continua ad applicarsi anche il P3: si descrive o si parafrasa, non si riproduce il verso.

### R5 — Se le fonti non concordano, si dice

Quando due fonti danno date, ordini o versioni diverse, **scegliere è legittimo, tacere la scelta no**: la scheda dice quale ha seguito e che ne esiste un'altra.

Il caso peggiore non è la divergenza fra due fonti, ma la **fonte che dichiara essa stessa più versioni** («l'artista ha raccontato la cosa in modi diversi»): riportarne una sola come certa è un'affermazione più forte di quella che la fonte sostiene.

### R6 — Cosa non si può scrivere senza una fonte di livello A o B

Rimandando alla sezione 5: intenzioni attribuite all'autore, fatti controversi, cifre di vendita e posizioni in classifica, spiegazioni di copertine, accuse personali.

**Una scheda nuova senza almeno una fonte di livello A o B non si pubblica.** Non è un limite alla crescita: è il limite che impedisce di crescere peggiorando, ed è già applicato automaticamente dal freno di `check-livelli.mjs`.

### R7 — Ogni affermazione ha una delle tre nature

Fatto documentato, dichiarazione dell'artista, interpretazione accreditata (le tre etichette previste dalla sezione 4).

Non è una formalità: **se mentre scrivi non sai dire quale delle tre sia, l'affermazione non è pronta.** È il controllo più economico che esista, perché costa una domanda e si fa prima di aver scritto la frase.

### R8 — Il dubbio si scrive, non si arrotonda

«Non risulta disponibile una spiegazione ufficiale verificabile» è una risposta legittima e pubblicabile. Una scheda più corta e vera vale più di una completa e fragile: è già il P1, qui vale come istruzione operativa quotidiana.

### Come si chiude una scheda

1. rileggerla frase per frase **con le fonti aperte a fianco**, compresa la frase iconica;
2. per ogni affermazione: quale fonte la sostiene, e con quale frase;
3. far passare i controlli automatici (`check-livelli`, `check-attribuzioni`, `check-coerenza`, `check-completezza`, `check-link`, `check-testi`);
4. scrivere la data di verifica.

### Cosa costa, e cosa questa sezione non promette

**Costa tempo.** Una scheda scritta così richiede più tempo di una scritta a memoria e documentata dopo. È il prezzo per non doverla riaprire — e riaprirla costa di più, perché nel frattempo è stata pubblicata.

**Non promette che non si sbaglierà più.** La verifica indipendente ha trovato una data sbagliata dentro una scheda che il verificatore stesso aveva dichiarato a posto quattro giorni prima: chi controlla sbaglia come chi scrive. Questa procedura **riduce** gli errori, non li azzera. Per questo il campionamento indipendente non si sostituisce con una checklist e non si interrompe quando i numeri migliorano.

---

## Nota fuori dalla costituzione — due cose che la costituzione già impone e il sito non fa

Non fanno parte della bozza, ma vanno decise insieme a essa, perché R7 e il punto 4 della chiusura dipendono da loro:

1. **La data di ultima verifica.** Il P2 e il punto 11 dello standard 4A la richiedono su ogni scheda. Il campo **non esiste su nessuna delle 282 schede**, né nei dati né nelle pagine.
2. **Le tre etichette** `Dichiarato dall'artista` / `Fatto documentato` / `Interpretazione accreditata`, previste dalla sezione 4, **non sono mai state realizzate**. Sono lo strumento che rende R7 visibile al lettore invece che solo mentale per chi scrive.

Entrambe richiedono un campo nuovo nei dati (colonna di Sonnet) e la visualizzazione nel generatore (mia): vanno fatte in un passaggio coordinato, non mentre lui sta riscrivendo le stesse schede.
