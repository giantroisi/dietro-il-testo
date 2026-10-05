# Blackbird — dossier della nuova scheda, 5 ottobre 2026

## Perimetro

Una sola nuova scheda, `/canzone/blackbird/`, e i suoi collegamenti alla pagina dei Beatles e alla pagina essenziale dell'album *The Beatles*. Nessuna immagine aggiunta. L'album compare con grafica originale e resta `noindex`, poiché ha una sola canzone raccontata e non ha un testo editoriale autonomo. La scheda non è stata trasferita al `main`, inviata al remoto o pubblicata.

Prima dell'aggiunta, `node scripts/check-freno.mjs` sul catalogo di partenza ha dichiarato **FRENO TOLTO**: 321 canzoni, 9 con una sola fonte specifica, zero prive di fonte e zero con la sola pagina album. Il controllo dopo l'aggiunta conserva gli stessi contatori di debito su 322 canzoni.

## Controllo frase per frase

Le pagine indicate sono state riaperte il 5 ottobre 2026 prima e durante la stesura. Le indicazioni dei passaggi sono parafrasi e non riproducono il testo della canzone.

| Punto della scheda | Natura | Fonte originale aperta e passaggio pertinente | Portata della prova |
| --- | --- | --- | --- |
| Anno, uscita il 22 novembre 1968, album *The Beatles* e carattere di doppio LP | F | [The Beatles, Blackbird](https://www.thebeatles.com/blackbird): data e album nella scheda del brano; [The Beatles, The Beatles](https://www.thebeatles.com/beatles-0): uscita del disco e descrizione del doppio album | Prova l'anagrafica usata; non viene attribuita al brano un'uscita autonoma come singolo |
| Paul McCartney autore del brano; credito editoriale Lennon–McCartney; George Martin produttore; registrazione l'11 giugno 1968 | F | [The Beatles, Blackbird](https://www.thebeatles.com/blackbird): scheda, crediti e nota sull'autore | Distingue composizione dichiarata e credito ufficiale |
| Etichetta musicale “Folk” e collocazione nel catalogo rock | F / classificazione editoriale | [The Beatles, Blackbird](https://www.thebeatles.com/blackbird): genere Folk; il gruppo è già collocato nella raccolta rock del sito | “Folk” è il dato della fonte; “rock” è la raccolta interna, non un ulteriore genere attribuito alla registrazione |
| Bach, la bourrée suonata con George Harrison e l'idea dell'intreccio fra basso e melodia | D | [Paul McCartney, conversazione con Lily Cole](https://www.paulmccartney.com/news/paul-and-lily-cole-discuss-hope-for-the-future-full-transcript): McCartney ricorda l'esercizio alla chitarra con Harrison e l'adattamento dei due movimenti | Racconto retrospettivo dell'autore, attribuito come tale; non si afferma che il brano sia una trascrizione di Bach |
| Incontro con due donne dei Little Rock Nine e intenzione di incoraggiare persone nelle lotte per i diritti civili | D | [Paul McCartney, Q&A 2016](https://www.paulmccartney.com/news/new-qanda-paul-on-2016): risposta sulla canzone e sull'incontro | È una spiegazione successiva di McCartney; la scheda non dice che compose il brano per quelle due donne o per un episodio preciso |
| Immagini dell'uccello e del volo, senza una lotta politica nominata espressamente nel testo; collegamento retrospettivo ai diritti civili | F / D | [The Beatles, Blackbird](https://www.thebeatles.com/blackbird): testo esterno autorizzato letto senza riprodurlo; [McCartney, Q&A 2016](https://www.paulmccartney.com/news/new-qanda-paul-on-2016): intenzione dichiarata | Distingue ciò che si legge nel testo dalla spiegazione dell'autore; non presenta un'interpretazione redazionale come fatto o come lettura accreditata |
| Ristampa 2018 con *Blackbird Take 28*, diversa dalla traccia ordinaria dell'album | F | [The Beatles, edizione anniversario 2018](https://www.thebeatles.com/beatles-white-album-special-anniversary-releases-2018): elenco degli outtake/sessioni con Take 28 separato dalla scaletta principale | Curiosità su una versione alternativa, senza attribuirla al lettore in pagina |
| Lettore Spotify: `5jgFfDIR6FR0gvlA56Nakr`, “Blackbird - Remastered 2009”, The Beatles | F | [Spotify, embed del brano](https://open.spotify.com/embed/track/5jgFfDIR6FR0gvlA56Nakr): titolo e artista visibili nel lettore; stessa identità riletta nell'iframe dell'anteprima | Verifica l'ID della versione incorporata; non sono stati usati conteggi di ascolti né si è provato l'audio integrale |

La frase iconica è introdotta da “Nel nostro ascolto”: descrive con parole nostre una possibilità di libertà nell'immagine del volo e attribuisce esplicitamente a McCartney il nesso con i diritti civili. Non cita né traduce versi. La descrizione SEO resta limitata agli stessi elementi documentati. Il pulsante del testo porta alla pagina ufficiale del brano, non a una ricerca o a una pagina dell'album. Nessuna affermazione sulla biografia dei Beatles è stata aggiunta o ri-verificata in questo lotto.

## Prove tecniche e visive

La generazione produce 696 pagine più 404: 322 canzoni, 104 artisti e 255 album. `check-freno`, `check-coerenza`, `check-completezza`, `check-nature`, `check-seo`, `check-link`, `check-attribuzioni --tutte` e `git diff --check` sono passati; il controllo attribuzioni conserva 30 avvisi informativi preesistenti su altre schede. Sono stati verificati la pagina canzone su desktop e a 390 × 844 px, il lettore caricato automaticamente con titolo/artista corretti, i link verso artista e album, le fonti e il link al testo; nessuna fuoriuscita orizzontale o errore di console nella pagina canzone. L'album ha la grafica originale in assenza di copertina riutilizzabile documentata. `check-frase-iconica` non segnala Blackbird, ma riporta 32 schede precedenti come indicazione editoriale. `check-testi` è risultato indeterminato: dall'ambiente di esecuzione nessuno dei 322 URL esterni era raggiungibile; il link Blackbird è stato aperto separatamente con lo strumento Web e risulta la pagina ufficiale giusta. La riproduzione audio integrale non è stata verificata.

## Stato

Proposta completa e isolata nella copia `codex/scheda-blackbird-2026-10-05`, da rivedere prima di un eventuale trasferimento. Il file non tracciato della cartella principale è rimasto intatto. Questa è una nuova pagina della rotazione ordinaria; il prossimo ciclo conclusivo da preparare è **immagini**.
