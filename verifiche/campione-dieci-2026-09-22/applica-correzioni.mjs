// Applica alle 10 schede del campione SOLO le correzioni sostenute dalle fonti
// riaperte il 22/09/2026 (dettaglio voce per voce nei file 01-…10-).
// Non tocca ultimaVerifica. Uso, dalla radice della copia:
//   node verifiche/campione-dieci-2026-09-22/applica-correzioni.mjs
import fs from 'node:fs';
import { verificaNatura, conteggioFrasi } from '../../scripts/genera/frasi.mjs';

const FILE = 'dati/canzoni.json';
const tutte = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const trova = (s) => { const x = tutte.find((y) => y.slug === s); if (!x) throw new Error(s); return x; };
const KWORB = 'https://kworb.net/spotify/';
const viaKworbIndice = (x) => { x.fonti = x.fonti.filter((f) => f.url !== KWORB); };
const aggiungiFonte = (x, f) => { if (!x.fonti.some((g) => g.url === f.url)) x.fonti.push(f); };

// 01 stairway-to-heaven
{ const x = trova('stairway-to-heaven');
  x.corpo = [
    `Uscita l'8 novembre 1971 nel quarto album della band, senza titolo e noto come "Led Zeppelin IV", ha musica di Jimmy Page e testo di Robert Plant. Secondo American Songwriter il testo racconta la parabola di una vecchia donna avara e devota, ma il suo significato resta volutamente vago.`,
    `Lunga circa otto minuti (8:02 secondo Wikipedia, 7:55 secondo American Songwriter), negli Stati Uniti non fu mai pubblicata come singolo: il manager Peter Grant rifiutò di farla uscire sia nel 1972 sia nel 1973. Eppure all'epoca divenne il brano più richiesto dalle radio FM statunitensi.`,
  ];
  x.fraseIconica = `Il brano è costruito come una lunga accelerazione: parte lento, con chitarra acustica e flauti dolci, e cresce di sezione in sezione, sempre più veloce e più forte, fino all'assolo di Jimmy Page e alla parte hard rock, per poi chiudersi con la sola voce di Plant.`;
  x.spotifyId = '5CQ30WqJwcep0pYcV4AMNc';
  x.ascolti = 1375551831; x.ascoltiTesto = '1,38 mld ascolti';
  viaKworbIndice(x);
  aggiungiFonte(x, { url: 'https://kworb.net/spotify/artist/36QJpDe2go2KgaRleHCDTp_songs.html', nome: 'kworb.net — Led Zeppelin (ascolti Spotify)', ruolo: 'ascolti' });
}

// 02 bocca-di-rosa
{ const x = trova('bocca-di-rosa');
  x.corpo[1] = `Secondo Rockol, che riprende il libro "Tutto De André" di Federico Pistone, De André garantì di aver descritto una vicenda realmente accaduta nel 1962 alla stazione di Nervi, non al fittizio paese di Sant'Ilario della canzone; sempre secondo Rockol la donna che ispirò il personaggio potrebbe chiamarsi Liliana Tassio, morta a Sampierdarena nel giugno 2010 a 88 anni, e agiva — precisò lo stesso De André — per passione, non per denaro. De André ha indicato "Bocca di rosa", insieme ad "Amico fragile" e "Jamin-a", come la canzone che più di ogni altra lo rappresenta. Nel febbraio 2018 la Rai trasmise la sua versione dal vivo, tratta dall'ultimo concerto di De André, all'interno dello sceneggiato "Il principe libero": la regia interruppe l'esecuzione per dare la linea a un'intervista in studio, scatenando polemiche sui social a cui la Rai rispose scusandosi pubblicamente su Twitter.`;
  x.fraseIconica = `Il brano racconta l'arrivo in un piccolo paese di una donna libera nei costumi, che le comari bigotte riescono a far allontanare; eppure alla sua partenza il paese intero, autorità comprese, la saluta commosso, in un rovesciamento ironico del perbenismo di provincia.`;
  x.ascolti = 52149105;
}

// 03 my-immortal
{ const x = trova('my-immortal');
  x.genereTesto = 'Rock / Power ballad';
  x.corpo = [
    `Il testo, una storia di fantasia sulla perdita di una persona cara e non un episodio autobiografico, è del co-fondatore Ben Moody, che lo scrisse quando andava ancora al liceo. Amy Lee scrisse la parte di pianoforte, partendo da un'idea che Moody aveva suonato al piano — lo ha raccontato lei stessa a Kerrang! nel 2023, come riporta Louder — e aggiunse il ponte. Il brano fu registrato per il primo EP della band, nel 1998, ma tolto all'ultimo momento; nel 2000 finì in "Origin", una raccolta usata come demo, e poi su "Fallen".`,
    `La versione diventata celebre, quella con il pianoforte più semplice e la voce diciannovenne di Amy Lee, non era quella che la band avrebbe voluto pubblicare: l'etichetta Wind-Up Records impose il demo grezzo al posto della versione più curata che Lee e Moody preferivano. Secondo Louder, Lee raccontò a MTV nel 2003: "L'etichetta era fissata sul demo e non ci ha lasciato usare la versione che volevamo davvero. Abbiamo discusso a lungo, alla fine abbiamo ceduto, ma eravamo tutti furiosi." E a Music Feeds, nel 2018, ammise di aver sempre odiato quella registrazione: "Sembro una bambina, il piano fa schifo."`,
  ];
  x.fraseIconica = `Amy Lee ha finito per fare pace con il brano: all'inizio si sentiva distante da parole che non erano sue, ma col tempo, vedendo il pubblico cantarlo a squarciagola, ha detto che la canzone è diventata per lei il simbolo del legame con i fan.`;
  x.ascolti = 685980008; x.ascoltiTesto = '686 mln ascolti';
  viaKworbIndice(x);
  aggiungiFonte(x, { url: 'https://kworb.net/spotify/artist/5nGIFgo0shDenQYSE0Sn7c_songs.html', nome: 'kworb.net — Evanescence (ascolti Spotify)', ruolo: 'ascolti' });
}

// 04 ragu
{ const x = trova('ragu');
  x.corpo = [
    `Uscita come singolo il 26 maggio 2023 e poi inclusa, come quarta traccia, nell'album "Infinito +1" (12 gennaio 2024), "Ragù" è prodotta da okgiorgio e pubblicata da Maciste Dischi/Artist First. Presentandola, Fulminacci ha detto che il brano "parla di illusioni" e di averlo scritto in modo istintivo, senza pensare in anticipo a uno stile o a una forma.`,
    `Per All Music Italia il videoclip, diretto da bendo, ne esaspera il significato: "una triste e grottesca condanna alla perdita di pudore ed identità artistica, a qualsiasi costo e con qualsiasi mezzo".`,
  ];
  x.fraseIconica = `Il titolo viene dal ritornello, dove il cantautore diventa una ricetta pronta da servire a comando: il ritratto ironico di chi è disposto a tutto pur di piacere, che lo stesso Fulminacci ha presentato con una battuta, dicendosi certo di vincerci un Grammy.`;
  for (const f of x.fonti) if (f.url.includes('allmusicitalia')) f.nome = 'All Music Italia — Redazione, 6 giugno 2023';
  for (const f of x.fonti) if (f.url.includes('soundsblog')) f.nome = 'Soundsblog — Alberto Graziola, 26 maggio 2023';
  aggiungiFonte(x, { url: 'https://open.spotify.com/album/25xh26FmCXPFgnCXLvTS5Q', nome: 'Spotify — album "Infinito +1" (tracklist e data di uscita)', ruolo: 'storia' });
}

// 05 overkill
{ const x = trova('overkill');
  x.corpo[0] = x.corpo[0]
    .replace('Il riff nacque quasi per caso', 'Il brano nacque quasi per caso')
    .replace('perché lui ed Eddie non volevano', 'perché lui e Lemmy non volevano');
  x.corpo[1] = x.corpo[1]
    .replace(`Il ritmo a doppia cassa di Taylor lasciò un segno duraturo: un quindicenne Lars Ulrich`, `Un quindicenne Lars Ulrich`)
    .replace(` — decidendo lì per lì che avrebbe voluto suonare così anche lui.`, ` — e che da allora avrebbe voluto suonare così anche lui.`)
    .replace(`Il brano fu anche l'ultimo mai suonato dal vivo dalla band, a chiusura dell'ultimo tour prima della morte di Lemmy nel 2015.`, `Secondo Wikipedia, che però non cita una fonte, fu anche il brano di chiusura dell'ultimo tour della band, e quindi l'ultimo che i Motörhead abbiano mai suonato dal vivo.`);
  x.fraseIconica = `Il segno più profondo lo lasciò la doppia cassa di Phil Taylor: secondo Mick Wall divenne l'ingrediente che diede alla generazione successiva di gruppi thrash e speed metal la loro intensità martellante.`;
  x.spotifyId = '6Sk38NceXDQldWpunSua6h';
  x.ascolti = 91230709; x.ascoltiTesto = '91 mln ascolti';
  viaKworbIndice(x);
  aggiungiFonte(x, { url: 'https://open.spotify.com/track/6Sk38NceXDQldWpunSua6h', nome: 'Spotify (conteggio ascolti del brano)', ruolo: 'ascolti' });
}

// 06 cielo-stanza
{ const x = trova('cielo-stanza');
  x.corpo = [
    `Scritta da Gino Paoli, fu ispirata, come raccontò lo stesso Paoli, dall'incontro con una prostituta di cui si era innamorato, in un bordello di Genova riconoscibile dal soffitto viola: un soffitto che, per Rockol, "l'amore trasforma in un cielo immenso".`,
    `La prima a interpretarla fu Mina, che la pubblicò nel 1960: con questo singolo restò per 14 settimane al primo posto delle vendite, e fu il 45 giri più venduto dell'anno, sfiorando nel tempo i 2 milioni di copie (Wikipedia).`,
  ];
  x.fraseIconica = `Per Francesco Guccini, citato da Wikipedia, "la canzone d'autore comincia con Il cielo in una stanza": una svolta, perché è scritta senza rima e senza ritornello.`;
  x.ascolti = 6368587; x.ascoltiTesto = '6,4 mln ascolti';
  viaKworbIndice(x);
  aggiungiFonte(x, { url: 'https://open.spotify.com/track/5XFAC3gilSY0NJpKbxjBjJ', nome: 'Spotify (conteggio ascolti del brano)', ruolo: 'ascolti' });
}

// 07 paint-it-black
{ const x = trova('paint-it-black');
  x.corpo = [
    `Scritta da Mick Jagger e Keith Richards a partire da alcune melodie improvvisate al sitar da Brian Jones, fu registrata il 6 e il 9 marzo 1966 ai RCA Studios di Los Angeles e inclusa come brano d'apertura nell'edizione americana di "Aftermath", non in quella britannica. Fu tra i primi grandi successi rock a includere il sitar indiano in un arrangiamento occidentale.`,
    `Il testo esprime, con metafore legate ai colori, il dolore di chi ha perso all'improvviso la compagna; nel corso degli anni è stato letto anche come una critica alla guerra del Vietnam o come il racconto di un'esperienza allucinogena, letture che secondo Wikipedia gli studiosi ritengono meno probabili, e nessuno dei Rolling Stones ha mai detto direttamente di cosa parli. Keith Richards ha descritto l'atmosfera del periodo in cui fu scritta come "cinica, cattiva, scettica, insolente".`,
  ];
  x.fraseIconica = `Secondo Songfacts non ci fu un'ispirazione precisa: il brano parla di una persona depressa che vorrebbe veder diventare tutto nero come il proprio umore. Mick Jagger, a chi gli chiedeva perché avesse scritto una canzone sulla morte, rispose che l'idea non era affatto originale: "dipende da come lo si fa".`;
}

// 08 creep
{ const x = trova('creep');
  x.corpo = [
    `Uscito come singolo il 21 settembre 1992, cinque mesi prima dell'album d'esordio "Pablo Honey" (22 febbraio 1993). Thom Yorke lo scrisse nel 1987, da studente all'Università di Exeter; secondo Louder, a ispirarlo sarebbe stata una cotta non ricambiata per una ragazza che seguiva per la città in modo eccessivo. Sempre secondo Louder, il chitarrista Jonny Greenwood raccontò al Chicago Sun-Times nel 1993 che Yorke rimase "mortificato" quando quella stessa ragazza si presentò anni dopo a un concerto della band, ignara del ruolo che le era stato attribuito nella canzone: "Ne fu molto scosso", disse Greenwood.`,
    `La registrazione fu quasi un caso: la band stava provando altri due brani che riteneva più promettenti come primo singolo. Il celebre "crunch" di chitarra prima del ritornello nacque come un tentativo di sabotaggio da parte di Jonny Greenwood, che inizialmente non amava il pezzo — un gesto che, come raccontò lo stesso Yorke al fanzine The Scene nel 1992 (riportato da Louder), finì per rafforzare il senso della canzone, descritta da lui come un brano che "si autodistrugge a metà, il che è tutto il punto". La melodia riprende inoltre da vicino "The Air That I Breathe" (1972), resa celebre dagli Hollies nel 1974: dopo un'azione legale, gli autori Albert Hammond e Mike Hazlewood ottennero il credito di coautori nelle ristampe successive. Alla sua uscita il brano fu escluso dalle playlist di BBC Radio 1 perché giudicato "troppo deprimente", arrivò al 78º posto nel Regno Unito e vendette appena 6.000 copie; già alla fine del 1992 divenne però un successo in Israele, poi in Nuova Zelanda, Spagna e Scandinavia, e ristampato nel 1993 diventò un successo internazionale.`,
  ];
  x.fraseIconica = `Negli Stati Uniti fu accolta come uno "slacker anthem", accanto a "Smells Like Teen Spirit" dei Nirvana e "Loser" di Beck. Per anni la band si rifiutò di suonarla dal vivo: secondo Louder, Yorke disse alla Denver Post nel 1995 che era frustrante essere giudicati per quel solo brano quando sentivano di dover andare avanti.`;
  x.spotifyId = '70LcF31zb1H0PyJoS1Sx1r';
  x.ascolti = 3142679429; x.ascoltiTesto = '3,14 mld ascolti';
  viaKworbIndice(x);
  aggiungiFonte(x, { url: 'https://kworb.net/spotify/artist/4Z8W4fKeB5YxbusRsdQVPb_songs.html', nome: 'kworb.net — Radiohead (ascolti Spotify)', ruolo: 'ascolti' });
}

// 09 marinella
{ const x = trova('marinella');
  x.corpo = [
    `Ispirata a un fatto di cronaca nera letto da De André da ragazzo — l'omicidio di una giovane costretta a prostituirsi e poi uccisa — il brano trasforma quella tragedia in una fiaba d'amore: quella che don Luigi Ciotti, citato da Wikipedia, ha chiamato "una storia senza tempo, che parlava di persone senza storia".`,
    `Pubblicata nel 1964 senza particolare successo, la canzone conquistò il grande pubblico solo grazie alla versione di Mina, uscita nel dicembre 1967 nell'album "Dedicato a mio padre" e come singolo il 1° febbraio 1968, che aprì a De André la strada della popolarità.`,
  ];
  x.descrizioneSeo = `Ispirata a un fatto di cronaca nera letto da De André da ragazzo, trasforma un omicidio in una fiaba d'amore.`;
  x.fraseIconica = `"Non potendo fare niente per restituirle la vita, ho cercato di cambiarle la morte": così De André, a Luciano Lanza nel 1993, spiegò la nascita del brano, ispirato alla storia di una ragazza di campagna dei dintorni di Asti gettata nel Tanaro (nel 1997, a Vincenzo Mollica, disse «nel Tanaro o nella Bormida»). Nel 2012 lo psicologo astigiano Roberto Argenta ha proposto come possibile fonte reale il caso irrisolto di Maria Boccuzzi, trovata morta nell'Olona nel 1953, anche se De André parlava di una sedicenne e Boccuzzi aveva 33 anni.`;
  x.spotifyId = '5HU5zuyBMUYqIC2wPV3aq7';
  x.ascolti = 15087363; x.ascoltiTesto = '15,1 mln ascolti';
  viaKworbIndice(x);
  aggiungiFonte(x, { url: 'https://kworb.net/spotify/artist/19HiWVd2g0XyJstBsbW2Qm_songs.html', nome: 'kworb.net — Fabrizio De André (ascolti Spotify)', ruolo: 'ascolti' });
  for (const f of x.fonti) if (f.url.startsWith('https://www.lastampa.it/2012/12/31/')) f.url = 'https://web.archive.org/web/2013/' + f.url;
}

// 10 bandiera-bianca
{ const x = trova('bandiera-bianca');
  x.corpo[1] = x.corpo[1].replace(`Nelle settimane successive Battiato portò il brano in diversi programmi Rai, fra cui una comparsa a "Discoring"`, `Nelle settimane successive Battiato portò il brano in varie trasmissioni televisive, fra cui una comparsa a "Discoring", sul primo canale Rai,`);
  x.fraseIconica = x.fraseIconica.replace(`in un collage satirico più vicino alla lotta che alla rassegnazione.`, `in un collage satirico che, secondo Rolling Stone Italia, si chiude in una resa dichiarata: davanti a un mondo che non si può cambiare, non resta che alzare bandiera bianca.`);
  for (const f of x.fonti) if (f.url.includes('discogs.com')) f.nome = `Discogs — crediti dell'LP (stampa olandese EMI, 1981)`;
  x.ascolti = 17629191;
}

// nature: ricalcolo delle schede che le dichiarano
const nature = {
  'bocca-di-rosa': null,       // riallineate sotto
  'bandiera-bianca': null,
};
for (const s of Object.keys(nature)) {
  const x = trova(s);
  const v = verificaNatura(x.corpo, x.naturaCorpo);
  if (!v.ok) throw new Error(`${s}: naturaCorpo non valida dopo la correzione (${v.motivo}); frasi: ${JSON.stringify(conteggioFrasi(x.corpo))}`);
}

fs.writeFileSync(FILE, JSON.stringify(tutte, null, 2) + '\n');
console.log('applicate');

// --- seconda passata (22/09): tre controlli automatici hanno segnalato forme,
// non contenuti. Stesso senso, stesse fonti; cambia solo come è detto.
{
  const t = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const g = (s) => t.find((y) => y.slug === s);
  // check-attribuzioni: Kerrang! non è fra le fonti → si attribuisce a chi lo riporta senza nominare la testata
  g('my-immortal').corpo[0] = g('my-immortal').corpo[0].replace(`— lo ha raccontato lei stessa a Kerrang! nel 2023, come riporta Louder —`, `— lo ha raccontato lei stessa nel 2023, in un'intervista riportata da Louder —`);
  // nome della fonte senza promesse
  for (const f of g('ragu').fonti) if (f.url.includes('open.spotify.com/album/')) f.nome = 'Spotify — album "Infinito +1"';
  // check-citazioni-nude: chi parla prima delle virgolette
  g('marinella').fraseIconica = g('marinella').fraseIconica.replace(`"Non potendo fare niente per restituirle la vita, ho cercato di cambiarle la morte": così De André, a Luciano Lanza nel 1993, spiegò la nascita del brano,`, `A Luciano Lanza, nel 1993, De André spiegò così la nascita del brano: "Non potendo fare niente per restituirle la vita, ho cercato di cambiarle la morte". Lo aveva ispirato la storia`).replace(`Lo aveva ispirato la storia ispirato alla storia di una ragazza`, `Lo aveva ispirato la storia di una ragazza`);
  g('cielo-stanza').fraseIconica = `Come disse Francesco Guccini, citato da Wikipedia, "la canzone d'autore comincia con Il cielo in una stanza": una svolta, perché è scritta senza rima e senza ritornello.`;
  g('creep').fraseIconica = g('creep').fraseIconica.replace(`Negli Stati Uniti fu accolta come uno "slacker anthem"`, `Negli Stati Uniti fu accolta come quello che Wikipedia chiama uno "slacker anthem"`);
  fs.writeFileSync(FILE, JSON.stringify(t, null, 2) + '\n');
  console.log('seconda passata applicata');
}

// --- terza passata: «da allora» non è nella fonte (Ulrich: «then I wanted to play like that too»)
{
  const t = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const x = t.find((y) => y.slug === 'overkill');
  x.corpo[1] = x.corpo[1].replace('e che da allora avrebbe voluto suonare così anche lui', 'e che poi aveva voluto suonare così anche lui');
  fs.writeFileSync(FILE, JSON.stringify(t, null, 2) + '\n');
}
