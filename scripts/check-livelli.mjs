#!/usr/bin/env node
// F94 — misura il LIVELLO delle fonti, non il loro numero.
//
// Perche' esiste, e perche' non lo fa gia' nessun altro controllo.
// `check-freno.mjs` conta quante schede hanno una fonte sola. `check-garanti.mjs`
// trova le frasi che mettono una testata a garanzia di una lettura che non ha
// scritto. Nessuno dei due guarda la cosa che la sezione 5 della costituzione
// mette per iscritto: **che tipo di fonte e'**. Una scheda con tre fonti tutte
// di livello C passa entrambi i controlli e non prova niente.
//
// La domanda a cui risponde: quante schede non hanno nemmeno una fonte di
// livello A o B — cioe' quante, per statuto, non possono sostenere un fatto
// controverso, un'intenzione dell'artista o una cifra di vendita.
//
// Cosa NON fa: non giudica se una scheda sia vera. Una scheda su sola
// Wikipedia puo' essere corretta in ogni riga. Dice solo che, se qualcuno
// contestasse un'affermazione, il sito non avrebbe niente da mostrare.
//
// L'onesta' del numero sta in come tratta i domini che non conosce: **non li
// conta come buoni**. Restano «da classificare» e vengono stampati, cosi' il
// numero e' un pavimento certo, non una stima ottimista.
//
// IL FRENO (dal 4 settembre 2026, decisione dell'autore).
// Questo script non misura soltanto: **blocca**. La soglia qui sotto e' il
// numero di schede senza fonte A/B accertata nel giorno in cui il freno e'
// stato messo. Se il numero sale, il controllo fallisce.
//
// Il senso e' preciso: una scheda nuova documentata solo da Wikipedia e
// Songfacts fa salire il numero e fa fallire il controllo, quindi **non si
// aggiungono schede che non abbiano almeno una fonte di livello A o B**. Una
// scheda nuova ben documentata invece lascia il numero fermo e passa.
// Il freno non impedisce di crescere: impedisce di crescere peggiorando.
//
// La soglia si ABBASSA a mano, mai da sola, ogni volta che un lotto della coda
// e' chiuso: si rilancia questo controllo e si scrive il numero nuovo. Una
// soglia che si aggiorna da sola non e' un freno, e' un contatore.
//
// Uso:  node scripts/check-livelli.mjs [--elenco]
// Non serve rete.

// Schede senza fonte A/B accertata, su 282 schede. La soglia scende a mano a
// ogni lotto chiuso, mai da sola.
//   4 settembre: 153 (115 con sole fonti C + 38 su domini non classificati)
//   8 settembre: 101 (22 con sole fonti C + 79 su domini non classificati)
//   8 settembre, dopo la classificazione dei domini: 79 (21 + 58).
//   Attenzione a come si legge: il primo addendo SALE da 11 a 21 mentre il
//   totale scende da 93 a 79. Non e' un peggioramento — e' che classificare un
//   dominio sposta le sue schede da «non si sa» a «si sa», e alcune atterrano
//   sul lato brutto. Il numero da guardare e' il totale.
// Il primo dei due numeri e' crollato da 115 a 22 in quattro giorni. Il secondo
// e' cresciuto perche' la coda ha portato dentro molti domini nuovi che nessuno
// ha ancora classificato: **non sono un debito peggiore, sono un debito di
// natura diversa** — li' non manca la fonte, manca il giudizio su di essa.
//   8 settembre, sera, dopo la classificazione di 50 domini: 57 (53 + 4).
//   E' il salto piu' grande della settimana e **non viene da nessuna scheda
//   arricchita**: viene dall'aver guardato i domini. Il debito «di giudizio»
//   e' quasi finito (4 riferimenti su 618); quello vero — schede che non hanno
//   una fonte A/B e basta — adesso si vede tutto, ed e' 53.
//   8 settembre, sera tardi: 56. `una-vita-da-mediano` ha perso la fonte
//   vietata e guadagnato la sua prima fonte A (Ligachannel).
// **11 settembre 2026: la soglia SALE, per la prima volta da quando esiste.**
// Non perche' sia stata aggiunta una scheda scoperta — quello il freno deve
// fermarlo — ma perche' `ceraunavolta.org` e' stato declassato da A a C dopo
// averlo finalmente aperto. `la-regola-dell-amico` non ha perso una fonte:
// **non l'ha mai avuta**, e la tabella diceva il falso. 53 era un numero
// sbagliato, 54 e' quello vero. Un freno tarato su un numero falso non frena
// niente; alzarlo per coprire una scheda nuova invece sarebbe barare, ed e' la
// distinzione da tenere ferma ogni volta che questo numero si tocca.
const SOGLIA = 54;

import { readFileSync } from 'node:fs';

// ---------------------------------------------------------------- tabelle
// Le tre liste vengono dalla sezione 5 della costituzione. Si modificano qui,
// a mano, aggiungendo un dominio alla volta e sapendo perche'.

// Livello A — ufficiali: artista, etichetta, enti, istituzioni, archivi.
const A = new Set([
  'guinnessworldrecords.com', 'osservatoreromano.va', 'treccani.it',
  'zucchero.it', 'whitneyhouston.com', 'centurymedia.bandcamp.com',
  'archivio.astigiani.it',
  // Aggiunto l'8 settembre 2026. Sito ufficiale di Ligabue: la pagina citata da
  // `balliamo-sul-mondo` (via web.archive.org) e' un pezzo redazionale
  // «canzone per canzone» del 2 aprile 2009 in cui Ligabue commenta i propri
  // brani. E' l'artista che parla di se': A per definizione, non per fiducia.
  'ligachannel.com',
  // 8 settembre 2026, sera. Entrate con le biografie degli artisti.
  // Britannica sta accanto a treccani.it, gia' in questa lista dal primo
  // giorno: sono la stessa cosa: opere di riferimento con direzione
  // editoriale e voci firmate. Wembley Stadium e' il sito ufficiale della
  // sede, citato per una data di concerto: e' la fonte primaria di quel fatto.
  'britannica.com', 'wembleystadium.com',
  // 9 settembre 2026, entrati con le biografie. Enti di certificazione e premi:
  // la sezione 5 li nomina per nome (RIAA, Grammy), sono la fonte primaria del
  // fatto che certificano.
  'riaa.com', 'grammy.com',
  // 9 settembre 2026: sito ufficiale dell'artista, accanto a zucchero.it e
  // whitneyhouston.com gia' in lista. Citato per i crediti di un suo disco:
  // e' la fonte primaria di quel fatto.
  'johnlennon.com',
  // 10 settembre 2026, entrati con l'ottavo lotto di biografie. Enti che
  // assegnano i premi di cui si parla (Rock and Roll Hall of Fame, Academy of
  // Motion Picture Arts and Sciences) e un'enciclopedia accademica statale
  // (New Georgia Encyclopedia, Georgia Humanities con la University of Georgia
  // Press). Stessa famiglia di RIAA, Grammy e Treccani gia' in lista;
  // classificati per la natura dell'ente, non aprendo le singole pagine —
  // l'eccezione al metodo resta scritta, come il 9 settembre.
  'rockhall.com', 'oscars.org', 'georgiaencyclopedia.org',
  // 10 settembre 2026, con l'ultimo lotto di biografie. Siti ufficiali di
  // artisti e band, come johnlennon.com e zucchero.it gia' in lista:
  'thedoors.com', 'billwyman.com', 'chriscornell.com',
  // Istituzioni citate per il proprio archivio: la scuola che l'artista ha
  // frequentato (documento suo) e un istituto storico. Anche queste
  // classificate per la natura dell'ente, non aprendo le pagine.
  'woosterschool.org', 'icsaicstoria.it',
  // Opere di riferimento con direzione editoriale, accanto a Treccani e
  // Britannica gia' in lista: l'enciclopedia nazionale canadese, l'Handbook of
  // Texas della Texas State Historical Association e l'Encyclopedia of Arkansas
  // della biblioteca pubblica dell'Arkansas. **Classificate per la natura
  // dell'istituzione, non aprendo le singole pagine**: e' un'eccezione al
  // metodo, e la scrivo invece di lasciarla intendere.
  'thecanadianencyclopedia.ca', 'tshaonline.org', 'encyclopediaofarkansas.net',
  // 10 settembre 2026. Sito ufficiale dell'artista, come johnlennon.com e
  // thedoors.com gia' in lista. E' entrato in catalogo perche' e' la fonte che
  // ha chiuso la divergenza sulla data di "Life on Mars?": due fonti gia'
  // citate nella scheda davano due date diverse, e la questione si e' risolta
  // solo salendo qui. E' il caso che ha fatto scrivere la riga nuova della
  // R2-bis.
  'davidbowie.com',
  // 10 settembre 2026. Sito ufficiale dell'artista, stessa famiglia dei
  // precedenti. Entrato con `your-song`: conferma a cifra la data dell'album
  // ("Released fifty years ago today by DJM Records, on April 10, 1970"), che
  // prima si appoggiava ai soli metadati di Spotify.
  'eltonjohn.com',
  // 11 settembre 2026, con le schede nuove di Battiato. Sito ufficiale
  // dell'artista, stessa famiglia dei precedenti.
  'battiato.it',
]);

// Livello B — testate con firma e data, quotidiani, periodici con redazione.
const B = new Set([
  'americansongwriter.com', 'loudersound.com', 'loudwire.com', 'ultimateclassicrock.com',
  'faroutmagazine.co.uk', 'rollingstone.com', 'rollingstone.it', 'au.rollingstone.com',
  'nme.com', 'billboard.com', 'billboard.it', 'altpress.com', 'blabbermouth.net',
  'guitarplayer.com', 'udiscovermusic.com', 'radiox.co.uk', 'washingtonpost.com',
  'ilfattoquotidiano.it', 'agi.it', 'tg24.sky.it', 'ilrestodelcarlino.it',
  'bergamonews.it', 'rockol.it', 'rockit.it', 'ondarock.it', 'allmusicitalia.it',
  'music.fanpage.it', 'fanpage.it', 'today.com', 'parade.com', 'superdeluxeedition.com',
  'musicomh.com', 'rockcellarmagazine.com', 'theseconddisc.com', 'extrachill.com',
  'radioitalia.it', 'virginradio.it', 'notiziemusica.it', 'eurofestivalnews.com',
  'therockpit.net', 'primordialradio.com', 'electricity-club.co.uk',
  // Aggiunti l'8 settembre dopo che sono stati aperti e guardati uno per uno:
  // firme e date reali su ogni pagina controllata, redazione riconoscibile,
  // e per le riviste di settore lo stesso editore di domini gia' in lista.
  'musicradar.com', 'guitarworld.com', 'npr.org', 'variety.com', 'mtv.com',
  // Aggiunti l'8 settembre 2026: per ognuno e' stata aperta la pagina davvero
  // citata in una scheda, non il dominio in astratto. Quattordici testate
  // riconoscibili, firma e data, nessuna sorpresa:
  'cbsnews.com', 'time.com', 'spin.com', 'spinmagazine.com', 'stereogum.com',
  'gq.com', 'vanityfair.it', 'ilsole24ore.com', 'exclaim.ca', 'gigwise.com',
  'ibtimes.co.uk', 'theringer.com', 'bluegrasstoday.com', 'notreble.com',
  // Due emittenti britanniche, firma e data sulle pagine citate:
  'goldradio.com', 'hellorayo.co.uk',
  // officialcharts.com: **non e' A**, come avevo previsto. Le due pagine
  // davvero citate (`amnesia-5sos`, `not-ok`) non sono classifiche: sono
  // interviste redazionali firmate e datate. Per quelle due la domanda non era
  // mai stata A o B, era B o niente.
  'officialcharts.com',
  // exitwell.com: la pagina citata da `fuori-dall-hype` e' un'intervista
  // originale a Riccardo Zanotti (Riccardo De Stefano, 9 luglio 2019). Per la
  // lettera della sezione 5 un'intervista diretta e' A — ma qui la A andrebbe
  // al **dominio**, cioe' a ogni pagina futura di un blog piccolo, sulla forza
  // di una pagina sola. B: vale la pagina, non l'istituzione che non c'e'.
  'exitwell.com',
  // 9 settembre 2026, entrati con le biografie.
  'ansa.it',           // agenzia di stampa nazionale, come agi.it gia' in lista
  'ilgiornale.it',     // quotidiano nazionale
  'quotidiano.net',    // testata del gruppo QN, come ilrestodelcarlino.it gia' in lista
  'laragione.eu',      // aperta: testata registrata, direttore responsabile, pezzo firmato e datato
  'ilgiorno.it',       // quotidiano del gruppo QN, come quotidiano.net e ilrestodelcarlino.it
  'pbs.org',           // servizio pubblico radiotelevisivo americano: documentari identificabili, sezione 5
  'abcnews.com',       // rete televisiva nazionale americana
  'upi.com',           // agenzia di stampa, come ansa.it e agi.it
  'smithsonianmag.com', // rivista dello Smithsonian, con redazione e firme
  // 10 settembre 2026, gli ultimi domini della coda. Aperti e guardati uno per
  // uno: qui sotto c'e' cosa ho visto, non cosa immaginavo.
  'lisolachenoncera.it', // rivista dell'Ass. Culturale L'Isola della Musica Italiana: il pezzo e' un'intervista a Mogol firmata Massimo Giuliano e datata 12 dicembre 2010. Materiale primario, firmato e datato.
  'lbbonline.com',       // Little Black Book, testata di settore della pubblicita' e della produzione video. Il pezzo e' un Q&A datato 06/07/2015 con il regista, senza firma personale: come per le agenzie gia' in lista (ansa.it, upi.com), la redazione identificabile vale la firma.
  'vistanet.it',         // testata registrata al tribunale di Cagliari (n. 5-2020), pezzo datato e firmato "La Redazione". Locale, ma e' una testata.
  'lopinionista.it',     // testata registrata al tribunale di Pescara (n. 08/08), pezzo datato e firmato "Redazione L'Opinionista".
  // musicologica.it — 10 settembre 2026. **Classificato su testimonianza, non
  // su una mia lettura**: dai miei strumenti la pagina risponde con un errore
  // del server, come commons.wikimedia.org. L'eccezione al metodo la scrivo
  // invece di lasciarla intendere, ed e' la stessa disciplina per cui, sulle
  // presunte pagine-indice di Rolling Stone Italia, aveva ragione chi la
  // pagina l'aveva aperta davvero.
  // Cosa e' stato riferito, verificabile da chiunque riapra la pagina: nessuna
  // registrazione presso un tribunale e nessun direttore responsabile — quindi
  // **non e' una testata**; ma articolo firmato e datato ("3 Febbraio 2020",
  // "Angela Forin", anche nel meta tag `author`), autrice con laurea
  // specialistica in Musicologia e attivita' professionale con partita IVA
  // intestata, e il pezzo citato porta una dichiarazione diretta dell'autore
  // del testo. **B e non C** per lo stesso motivo di exitwell.com: vale la
  // pagina firmata, non l'istituzione che non c'e'. **B e non A** perche' non
  // e' ne' un ente ne' un sito ufficiale.
  'musicologica.it',
  // Sound On Sound, rivista di registrazione e produzione dal 1985: la pagina
  // citata da `go-your-own-way` e' un pezzo della serie «Classic Tracks»
  // firmato Richard Buskin, con dichiarazioni dirette dei protagonisti.
  'soundonsound.com',
  // pangea.news — aperta la pagina citata da `prospettiva-nevski`: «testata
  // giornalistica registrata presso il Tribunale di Roma n. 45/2025», articolo
  // datato 19 maggio 2021, firma redazionale, e dentro ci sono dichiarazioni
  // dirette virgolettate di Sandro Teti, che il viaggio l'ha organizzato.
  // Materiale primario su una testata registrata e datata.
  'pangea.news',
]);

// Livello C — pista di ricerca, mai prova. La costituzione ne nomina due per
// nome (Wikipedia, Songfacts) e due categorie (database collaborativi, siti di
// interpretazione).
const C = new Set([
  'en.wikipedia.org', 'it.wikipedia.org', 'songfacts.com',
  'metal-archives.com', 'discogs.com', 'secondhandsongs.com', 'genius.com',
  'hitparadeitalia.it', 'antiwarsongs.org', 'storyofsong.com',
  // Aperti e guardati uno per uno il 4 settembre 2026, invece di giudicarli dal
  // nome: entrambi hanno data e, il primo, anche una firma e collegamenti a
  // testate vere. Sono siti di interpretazione — livello C — non pagine da
  // buttare. La differenza conta: una fonte C si puo' tenere come pista, una
  // vietata no.
  'songmeaningsandfacts.com',        // firmato Jessica Shelton, datato, con link a Rolling Stone, LA Times, Guardian
  'solobellecanzoni.altervista.org', // datato, senza firma, con una sezione «fonti»; l'analisi resta personale
  // 8 settembre. Hanno firma e data — quindi non sono da buttare — ma non
  // producono informazione propria: compilano, o rilanciano interviste altrui.
  // E' esattamente la definizione di «blog specialistico» della sezione 5.
  'soundsblog.it',      // compilazione: le citazioni dirette vengono da interviste di altri
  'donnaglamour.it',    // firma e data, ma nessuna fonte citata per cio' che afferma
  'musewiki.org',       // wiki di fan; su una scheda relaia un'intervista nominata e datata, e resta un relay
  // ----------------------------------------------------- 8 settembre 2026
  // Cinque RELAY: nessuna redazione propria, ma citano per nome e data la
  // fonte primaria che riportano. Restano C — la prova e' l'originale, non chi
  // lo ripete — ma sono C utili: dicono dove andare a guardare.
  'the-paulmccartney-project.com', // per ogni riga: testata, data, pagina
  'rammwiki.net',                  // «Making Of» ufficiale + XAOC Magazine 07/2001
  'theninhotline.com',             // Details, aprile 1995, intervista di Chris Heath
  'mentisommerse.it',              // Esquire + video Facebook di Pezzali + Famiglia Cristiana
  'iheart.com',                    // nessuna firma, ma nomina l'episodio di podcast da cui prende
  'linkinpedia.com',               // note di copertina di Shinoda (2011) + due interviste del 2000 e 2002
  // Quattro MODERATE: una sola fonte primaria vera dentro un pezzo per il resto
  // interpretativo. Una citazione di sfuggita non fa di una pagina una testata.
  'ilgiunco.net', 'classicrockartists.com', 'houstonseagle.com', 'inliberta.it',
  // Diciannove con FIRMA E DATA MA ZERO FONTI ESTERNE: raccontano
  // un'interpretazione, a volte un aneddoto molto specifico, senza mai dire da
  // dove viene. Si leggono volentieri e spesso hanno ragione; non provano nulla.
  'noidegli8090.com', 'sololibri.net', 'libreriamo.it', 'musicianwages.com',
  'lascimmiapensa.com', 'recensiamomusica.com', 'mbmusic.it', 'wonderchannel.it',
  'archivio.blitzquotidiano.it', 'tag24.it', 'ehabitat.it', 'cromosomimedia.com',
  'rds.it', 'ondamusicale.it', 'oaplus.it', 'tomtomrock.it', 'dropnews.it',
  'agorairc.it', 'romasette.it',
  // ceraunavolta.org — **DECLASSATO da A a C l'11 settembre 2026.** Era fra i
  // primi domini messi in tabella, quando ancora non si scriveva la
  // motivazione accanto alla voce: nessuno ha mai potuto rileggere il perche',
  // perche' il perche' non c'era. Aperta la pagina citata da
  // `la-regola-dell-amico`: e' un pezzo di rievocazione — «motorini, gelati
  // sciolti al sole» — **firmato ma senza data**, che attribuisce l'origine
  // della canzone a «alcune interviste» **senza dire quali**, e non cita
  // nessuna fonte. Non e' un archivio e non e' una testata: e' scritto bene e
  // non prova niente, che e' la definizione stessa del livello C.
  // Conseguenza voluta: `la-regola-dell-amico` — terza scheda del sito per
  // impressioni — resta senza nessuna fonte di livello A o B, che e'
  // esattamente cio' che e'.
  'ceraunavolta.org',
  // Due emittenti radio, aperte l'8 settembre invece che dedotte dal nome:
  'smoothradio.com',      // data ma nessuna firma sulla pagina, classifica redazionale senza fonti
  'radiocremebrulee.com', // web radio americana, recensione a firma collettiva, nessuna fonte
  // 9 settembre 2026, aperta e guardata: scheda di database dei risultati
  // Eurovision, senza firma ne' data, gestita da appassionati con un pulsante
  // «segnala un errore» — cioe' correzione collettiva. E' un database
  // collaborativo, che la sezione 5 mette al livello C.
  'eurovisionworld.com',
  // 9 settembre 2026, aperta e guardata: webzine indipendente nata nel 2017,
  // firma collettiva («InsideMusic») e data, ma nessun direttore ne' redazione
  // dichiarati, e la pagina citata e' un comunicato stampa riproposto. Ha data
  // e una firma, quindi non e' da buttare; non produce informazione propria,
  // quindi non e' B.
  'insidemusic.it',
  // 10 settembre 2026, aperta e guardata: ha firma (Giuliana Macaluso) e data,
  // ma in calce dichiara essa stessa «Ck12.it non e' una testata giornalistica,
  // in quanto viene aggiornato senza alcuna periodicita'», non ha direttore
  // responsabile, e non dice da dove vengano le dichiarazioni che riporta.
  // **Conseguenza da girare a chi cura i dati**: su `rino-gaetano` questa fonte
  // sostiene da sola una smentita — la sorella che nega la storia dei cinque
  // ospedali — cioe' esattamente un «fatto controverso», che la sezione 5
  // vieta di appoggiare al solo livello C. La correzione va nella direzione
  // giusta ma le serve una fonte che la regga.
  'ck12.it',
  // 8 settembre 2026, sera. Entrata con le biografie degli artisti. AllMusic non
  // e' un database collaborativo — ha una redazione — ma le sue schede non
  // citano nulla: aperta quella dei Muse, nessuna firma, nessuna data, nessuna
  // fonte esterna. Altre pagine dello stesso sito sono firmate (Kelvin Hayes,
  // Neil Z. Yeung, Jason Ankeny): e' il solito caso in cui il livello dipende
  // dalla pagina e la tabella puo' dire una cosa sola. Scelgo la piu' prudente:
  // C. Conseguenza voluta: una biografia documentata dalla sola AllMusic
  // risulta senza fonte A/B, che e' esattamente cio' che e'.
  'allmusic.com',
  // 10 settembre 2026. **YouTube non e' un editore**: il dominio non dice chi
  // ha pubblicato, e un livello dato al dominio lo darebbe a ogni video futuro
  // di chiunque. L'unico uso in catalogo e' buono — il canale ufficiale di
  // Radio X, con blink-182 che parlano in prima persona — ma vale quella
  // pagina, non youtube.com. Se un video di un canale ufficiale deve contare
  // come prova, la fonte da citare e' la pagina di chi lo pubblica, non
  // l'indirizzo del video.
  'youtube.com',
]);
const C_SUFFISSI = ['.wikipedia.org', '.fandom.com', '.wikia.com', '.blogspot.com'];

// Da non usare come prova: testi senza autore ne' data, pagine che si copiano
// fra loro, raccolte di citazioni che non dicono da quale intervista vengono.
// Queste NON sono un livello piu' basso: sono un errore, e il controllo esce
// con codice 1 finche' restano in catalogo.
// Ogni voce qui e' stata aperta e guardata prima di essere messa in lista: la
// motivazione dice cosa ho visto, non cosa sospettavo.
const VIETATI = new Map([
  ['songtell.com', 'nessun autore, nessuna data, nessuna fonte citata'],
  ['significatocanzone.it', 'interpretazioni scritte dai visitatori, senza firma e senza fonti'],
  ['le-citazioni.it', 'raccolta di citazioni che non indica da quale intervista vengano'],
  ['ilpitagora.it', 'ne firma ne data: un indice di link a spartiti e vendita, non un articolo'],
]);

// QUATTRO DOMINI RESTANO FUORI DA QUESTE TABELLE, DI PROPOSITO.
//
// `youtube.com` — **la tabella non sa dirlo.** Il video citato da `i-miss-you`
// sta sul canale ufficiale di Radio X, cioe' della stessa emittente gia'
// classificata B (`radiox.co.uk`). Ma youtube.com ospita anche il canale della
// band (sarebbe A) e il canale di chiunque (niente). Il livello dipende dal
// canale, non dal dominio. E' lo stesso limite di web.archive.org, dove pero'
// la soluzione c'era: leggere l'URL **dentro** l'URL. Qui non c'e' un dentro da
// leggere, e finche' non si classifica per canale il dominio resta «da
// classificare» — che e' la risposta onesta, non una svista.
//
// `lbbonline.com`, `vistanet.it` (403), `lopinionista.it` (connessione
// rifiutata) — non raggiunti da nessuno strumento provato l'8 settembre.
// `primarywave.com` — societa' che gestisce il catalogo di Whitney Houston.
// La sezione 5 mette al livello A i canali ufficiali «dell'artista o
// dell'etichetta»: una societa' di gestione dei diritti e' vicina ma non e'
// nessuna delle due, e la pagina e' promozionale. Non classificata: la scheda
// ha gia' whitneyhouston.com (A), quindi nulla dipende da questa decisione, e
// prenderla senza guardare sarebbe stato un azzardo inutile.
//
// `musicologica.it` e `screenrant.com` — stessa sorte il 9 settembre: il
// crawler non riesce a leggere il loro robots.txt. Restano fuori: la prima
// tiene `andrea-bocelli-e-giorgia` fra le biografie senza fonte A/B accertata,
// ed e' giusto cosi' finche' nessuno ha guardato quella pagina.
// Non classificati: «non l'ho visto» non e' un livello, e indovinare dal nome
// e' esattamente l'errore evitato a suo tempo con songmeaningsandfacts.com.

// ---------------------------------------------------------------- misura

// **web.archive.org non e' un dominio: e' un contenitore.**
// Se ne stavano contando otto riferimenti come «da classificare», ma sei di
// quegli otto incapsulano un articolo di una testata gia' classificata B —
// Rolling Stone, Alternative Press, Radio Italia — morto all'indirizzo vivo e
// sopravvissuto solo in archivio. Contare l'hostname letterale significa
// declassare una fonte buona solo perche' l'originale e' caduto, ed e' il
// contrario di cio' che si vuole premiare.
// La forma e' `https://web.archive.org/web/<data>/<indirizzo originale>`: si
// prende l'indirizzo interno e si classifica quello.
function dominio(url) {
  try {
    let u = new URL(url);
    let host = u.hostname.replace(/^www\./, '');
    if (host === 'web.archive.org' || host === 'archive.org') {
      const dentro = url.match(/https?:\/\/web\.archive\.org\/web\/[^/]*\/(https?:\/\/.+)$/i);
      if (dentro) return new URL(dentro[1]).hostname.replace(/^www\./, '');
    }
    return host;
  } catch { return null; }
}

function livello(d) {
  if (d === null) return 'url-non-valido';
  if (VIETATI.has(d)) return 'vietato';
  if (A.has(d)) return 'A';
  if (B.has(d)) return 'B';
  if (C.has(d) || C_SUFFISSI.some((s) => d.endsWith(s))) return 'C';
  return 'ignoto';
}

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const elenco = process.argv.includes('--elenco');

const conteggi = { A: 0, B: 0, C: 0, vietato: 0, ignoto: 0, 'url-non-valido': 0 };
const ignoti = new Map();
const senzaAB = [];       // nessuna fonte A o B, e nessun dominio ignoto: pavimento certo
const soloIgnoti = [];    // nessuna A/B accertata, ma qualche dominio da classificare
const conVietati = [];

for (const c of canzoni) {
  const fonti = (c.fonti || []).filter((f) => f.ruolo !== 'ascolti');
  const livelli = fonti.map((f) => {
    const d = dominio(f.url);
    const l = livello(d);
    conteggi[l]++;
    if (l === 'ignoto') ignoti.set(d, (ignoti.get(d) || 0) + 1);
    return { d, l };
  });

  const vietate = livelli.filter((x) => x.l === 'vietato');
  if (vietate.length) conVietati.push({ slug: c.slug, domini: vietate.map((x) => x.d) });

  const haAB = livelli.some((x) => x.l === 'A' || x.l === 'B');
  const haIgnoti = livelli.some((x) => x.l === 'ignoto');
  if (!haAB && !haIgnoti) senzaAB.push(c.slug);
  else if (!haAB && haIgnoti) soloIgnoti.push(c.slug);
}

const tot = Object.values(conteggi).reduce((a, b) => a + b, 0);
const pc = (n) => `${n} (${Math.round((n / canzoni.length) * 100)}%)`;

console.log(`\nFonti narrative: ${tot} su ${canzoni.length} schede\n`);
console.log(`  livello A (ufficiali)      ${conteggi.A}`);
console.log(`  livello B (testate)        ${conteggi.B}`);
console.log(`  livello C (pista)          ${conteggi.C}`);
console.log(`  da non usare               ${conteggi.vietato}`);
console.log(`  da classificare            ${conteggi.ignoto}`);
if (conteggi['url-non-valido']) console.log(`  url non validi             ${conteggi['url-non-valido']}`);

console.log(`\nSchede senza NESSUNA fonte di livello A o B: ${pc(senzaAB.length)}`);
console.log('  Sono schede che, se qualcuno contestasse un’affermazione, non');
console.log('  avrebbero niente da mostrare: la sezione 5 esclude il livello C');
console.log('  come prova per intenzioni, cifre e fatti controversi.');
if (soloIgnoti.length) {
  console.log(`\nAltre ${soloIgnoti.length} schede dipendono da domini ancora da classificare:`);
  console.log('  potrebbero salire o restare dove sono. Il numero sopra e’ il pavimento.');
}

if (ignoti.size) {
  console.log(`\nDomini da classificare (${ignoti.size}), dal piu’ usato:`);
  for (const [d, n] of [...ignoti.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}  ${d}`);
  }
}

if (conVietati.length) {
  console.log(`\nFONTI DA NON USARE, in ${conVietati.length} schede:`);
  for (const v of conVietati) {
    console.log(`  ${v.slug}  —  ${v.domini.map((d) => `${d}: ${VIETATI.get(d)}`).join('; ')}`);
  }
  console.log('\n  Vanno sostituite, non integrate: una fonte che non dice chi l’ha');
  console.log('  scritta non diventa valida perche’ accanto ce n’e’ un’altra.');
}

if (elenco && senzaAB.length) {
  console.log('\nElenco delle schede senza fonti A/B:');
  for (const s of senzaAB) console.log(`  ${s}`);
}

// ------------------------------------------------- biografie degli artisti
//
// Aggiunto l'8 settembre 2026, il giorno in cui le biografie hanno avuto per la
// prima volta un campo `fonti`. Fino a quel momento questo script leggeva solo
// `canzoni.json`: **il freno proteggeva le schede e non le pagine artista**, che
// nel frattempo pubblicavano 48.000 caratteri senza una fonte. La verifica
// indipendente ci ha poi misurato il tasso peggiore del sito.
//
// Qui NON c'e' un freno, e non e' una dimenticanza: una soglia messa oggi
// sarebbe finta, perche' la maggioranza delle biografie non ha ancora nessuna
// fonte e il numero e' destinato a muoversi di molto a ogni lotto. Il freno si
// mette quando la coda e' chiusa, come si e' fatto per le schede.

const artisti = JSON.parse(readFileSync('dati/artisti.json', 'utf8'));
const conStoria = artisti.filter((a) => a.storia);
const senzaFonti = conStoria.filter((a) => !(Array.isArray(a.fonti) && a.fonti.length));
const conFonti = conStoria.filter((a) => Array.isArray(a.fonti) && a.fonti.length);
const bioSenzaAB = conFonti.filter(
  (a) => !a.fonti.some((f) => ['A', 'B'].includes(livello(dominio(f.url))))
);

console.log('\n' + '—'.repeat(64));
console.log(`BIOGRAFIE  ${conStoria.length} artisti con una storia pubblicata`);
console.log(`  senza nessuna fonte        ${senzaFonti.length}  (la pagina lo dichiara al lettore)`);
console.log(`  con fonti ma nessuna A/B   ${bioSenzaAB.length}${bioSenzaAB.length ? '  → ' + bioSenzaAB.map((a) => a.slug).join(', ') : ''}`);
console.log(`  documentate con A o B      ${conFonti.length - bioSenzaAB.length}`);

// IL FRENO DELLE BIOGRAFIE, messo il 10 settembre 2026 — il giorno in cui la
// coda si e' chiusa, e non prima.
// Quando questa sezione e' nata, l'8 settembre, non aveva soglia, e la ragione
// era scritta li': con 79 biografie su 104 senza nessuna fonte, una soglia
// sarebbe stata finta. Ora ne restano **una**, e il numero puo' essere
// congelato: da qui in avanti una biografia nuova o riscritta senza una fonte
// di livello A o B fa fallire il controllo, esattamente come per le schede.
// Si abbassa a mano, mai da sola.
// Due fonti diverse con lo STESSO nome visibile: per chi legge sono
// indistinguibili — «01 Ultimate Classic Rock — Corey Irwin» e «02 Ultimate
// Classic Rock — Corey Irwin», uno sotto l'altro, sembrano un errore anche
// quando sono due articoli veri e diversi. Trovato guardando la pagina degli
// White Stripes pubblicata. Il rimedio e' una riga: aggiungere al nome cio'
// che distingue i due pezzi (l'argomento, o la data).
const nomiDoppi = [];
for (const a of conStoria) {
  const conteggio = new Map();
  for (const f of a.fonti || []) {
    const n = String(f.nome || '').trim();
    conteggio.set(n, (conteggio.get(n) || 0) + 1);
  }
  const doppi = [...conteggio.entries()].filter(([, n]) => n > 1);
  if (doppi.length) nomiDoppi.push(`${a.slug}: ${doppi.map(([n, q]) => `"${n}" ×${q}`).join(', ')}`);
}
if (nomiDoppi.length) {
  console.log(`\n  Fonti diverse con lo stesso nome visibile, in ${nomiDoppi.length} biografie:`);
  for (const r of nomiDoppi) console.log(`    ${r}`);
  console.log('    Non e’ un errore di fatto: e’ una riga che il lettore non sa distinguere.');
}

const SOGLIA_BIO = 0;
const bioScoperte = senzaFonti.length + bioSenzaAB.length;
const bioSforato = bioScoperte > SOGLIA_BIO;
console.log(`  FRENO                      ${bioScoperte} scoperte, soglia ${SOGLIA_BIO}${bioSforato ? '  ← SFORATA' : bioScoperte < SOGLIA_BIO ? `  ← abbassa SOGLIA_BIO a ${bioScoperte}` : ''}`);

// ------------------------------------------------------------------ freno

const senzaABAccertata = senzaAB.length + soloIgnoti.length;
const sforato = senzaABAccertata > SOGLIA;

console.log('\n' + '—'.repeat(64));
console.log(`FRENO  ${senzaABAccertata} schede senza fonte A/B accertata, soglia ${SOGLIA}`);
if (sforato) {
  console.log(`\n  ATTIVO: sono ${senzaABAccertata - SOGLIA} sopra la soglia.`);
  console.log('  Una scheda nuova documentata solo da fonti di livello C fa salire');
  console.log('  questo numero. Finche’ e’ sopra la soglia non si aggiungono schede:');
  console.log('  si lavora la coda, oppure si aggiunge una fonte A/B alla scheda');
  console.log('  appena scritta. La soglia si abbassa a mano quando un lotto e’ chiuso.');
} else if (senzaABAccertata < SOGLIA) {
  console.log(`\n  Libero, e ${SOGLIA - senzaABAccertata} sotto la soglia:`);
  console.log(`  aggiorna SOGLIA a ${senzaABAccertata} in questo file, cosi’ il terreno`);
  console.log('  guadagnato non si puo’ perdere di nuovo in silenzio.');
} else {
  console.log('\n  Libero, esattamente in pari con la soglia.');
}

console.log('');
process.exit(conVietati.length || sforato || bioSforato ? 1 : 0);
