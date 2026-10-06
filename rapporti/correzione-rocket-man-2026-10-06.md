# Rocket Man — correzione circoscritta, 6 ottobre 2026

**Stato:** proposta locale nel ramo `codex/correzione-rocket-man-2026-10-06`. Nessun trasferimento nel `main`, push o pubblicazione. La scheda online conserva il testo precedente fino a un'eventuale approvazione e integrazione.

## Problema e decisione

La pagina pubblicata descrive il racconto di Ray Bradbury come un futuro in cui l'astronauta sarebbe diventato «un mestiere come un altro». Attribuisce così al racconto una formulazione che Bernie Taupin usa per spiegare **la propria idea** per la canzone. Il testo ufficiale dell'artista riporta che Taupin pensò, durante il viaggio in auto, alla fatica ordinaria di quel lavoro; il riassunto del racconto consultato come controllo racconta invece il conflitto fra viaggio e famiglia. Non avendo letto il racconto integrale, la correzione elimina la descrizione controversa della trama anziché sostituirla con una nuova trama.

Nella stessa scheda, la frase iconica iniziava con un superlativo non documentato e rendeva fra virgolette una parola del verso in italiano. Ripeteva inoltre dettagli già nel corpo e presentava come lettura diffusa una metafora biografica su Elton John che le fonti aperte non attestano. La proposta descrive il contrasto narrativo con parole originali, accorcia la ripetizione e distingue la lettura redazionale dai fatti.

## Fonti riaperte e portata delle prove

| Fonte | Passaggio controllato | Uso nella proposta |
|---|---|---|
| [Sito ufficiale di Elton John, *Rocket Man: The Lifetime of a Song*](https://www.eltonjohn.com/stories/rocket-man-the-lifetime-of-a-song), 21 marzo 2023, §§ iniziali e “Rocket Man on the Charts” | Riporta la testimonianza di Taupin pubblicata dal *Wall Street Journal* nel 2018: durante il viaggio verso i genitori nel Lincolnshire pensò al racconto di Bradbury, al brano del 1970 di Tom Rapp e alla fatica del mestiere; gli venne in mente la prima strofa. Documenta l'uscita del singolo il 31 marzo 1972 e il suo ruolo di primo singolo di *Honky Château*. | Fonte di livello A per testimonianza ripubblicata dall'artista, ispirazioni, scena della scrittura e dati discografici. L'intervista originale del *Wall Street Journal* non è stata aperta. |
| [Hello Rayo, intervista a Elton John e Bernie Taupin riportata da Anna Sky Magliola](https://www.hellorayo.co.uk/greatest-hits/entertainment/music/elton-john-rocket-man-inspiration), 22 marzo 2023, apertura | Taupin dice di avere preso dal racconto l'idea dell'astronauta come lavoro quotidiano. È la sua spiegazione, non una verifica indipendente del contenuto letterario. | Corrobora l'attribuzione a Taupin e motiva la rimozione della descrizione attribuita direttamente a Bradbury. |
| [*The Illustrated Man*, sezione “The Rocket Man”](https://en.wikipedia.org/wiki/The_Illustrated_Man#The_Rocket_Man), consultata come pista | Riassume il conflitto del padre astronauta fra vita sulla Terra e missioni, raccontato dal figlio. | Fonte di livello C, solo controllo della divergenza: non sostiene un'affermazione nuova nella scheda. Il racconto originale non è stato riaperto. |
| [*Rocket Man* (song)](https://en.wikipedia.org/wiki/Rocket_Man_(song)), sezione “Background” | Descrive il protagonista astronauta diviso fra lavoro e Terra e riporta il collegamento a Bradbury e Pearls Before Swine. | Fonte di livello C, controllo incrociato. Le fonti pubblicate nella proposta sono il sito ufficiale e Hello Rayo. |

Il rapporto indipendente `LOTTO-05-2026-10-06.md` ha segnalato il problema; questa proposta è stata scritta solo dopo la riapertura delle pagine indicate e la ricerca della pagina ufficiale. Non è stata usata Google Search Console.

## Modifiche

- `dati/canzoni.json`: corretti corpo, frase iconica, fonti e tema. L'idea della routine dell'astronauta è ora attribuita a Taupin; i «primi versi» sostituiscono «il testo»; tolti il superlativo, il frammento tradotto, il riferimento non provato ai tour e a Elton John come protagonista della metafora, e il tema `industria-musicale` che dipendeva da quella lettura.
- Rigenerati la pagina Rocket Man, la sua immagine condivisibile e i collegamenti contestuali che mostravano il vecchio incipit. Aggiornato l'hash dell'immagine in `dati/og-versioni.json`. L'home casuale è stata ripristinata perché estranea alla correzione; la sua data in sitemap rimane invariata.
- Il numero di ascolti resta assente. L'ID Spotify e il link esterno al testo restano quelli già presenti: in questo lotto non è stata svolta una nuova verifica del loro contenuto.
- `ultimaVerifica` non è stata avanzata: si tratta di una correzione mirata, non della revisione integrale richiesta dal §4B della Costituzione. La pagina continua a dichiarare il proprio stato di verifica parziale.

## Verifiche e limiti

La generazione produce 695 pagine più 404. Passano `check-coerenza` (321 canzoni, 104 artisti), `check-completezza` (321/321), `check-link`, `check-seo` (696 HTML), `check-nature`, `check-freno` e `check-affiliazioni`. `check-frase-iconica` segnala 32 schede pregresse ma **non** Rocket Man. L'immagine OG è stata aperta e il testo è interamente leggibile.

Nel browser locale la pagina presenta testo e fonti corretti a 1280 px e a 390 × 844 px; la larghezza del documento coincide con la viewport in entrambi i casi, la canonical è `https://www.dietroiltesto.it/canzone/rocket-man/`, e non risultano errori di console. Il lettore Spotify carica titolo e artista; l'audio integrale non è stato provato. Il racconto di Bradbury, il testo autorizzato su Letras e la registrazione Spotify non sono stati rivalutati integralmente: questa proposta non rende l'intera scheda verificata frase per frase.

Questa correzione modifica lo stesso archivio JSON di altre proposte isolate; un'eventuale integrazione va fatta per voce Rocket Man, preservando le modifiche agli altri brani.
