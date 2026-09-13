// Le virgolette sono la promessa piu' forte che un testo possa fare.
//
// Dicono: **queste parole esistono, e sono esattamente queste.** E' la promessa
// che questo sito mantiene meno. In tre giorni di verifica sulla coda ne sono
// cadute quattro, tutte su pagine fra le piu' viste:
//   - `aerials`: «di niente» messo in bocca a Daron Malakian — due volte nella
//     stessa scheda — e assente sia da Songfacts sia da Wikipedia;
//   - `yes-i-know-my-way`: «anglonapoletano», virgolettato come se fosse un
//     termine citato, assente da entrambe le fonti;
//   - `fuori-dal-tunnel`: parodia delle hit «da discoteca», dove la fonte
//     scrive «da festa»;
//   - `dont-look-back-in-anger`: un verso della canzone riprodotto fra
//     virgolette, che la sezione 3 vieta «neppure parziale».
//
// **Nessuno dei sei controlli automatici poteva vederli**, perche' nessuno
// guarda dentro le virgolette. Questo non le verifica — per farlo servirebbe
// riaprire ogni fonte, e quello resta lavoro di chi verifica — ma **le elenca**,
// e le divide fra quelle che promettono poco e quelle che promettono molto.
// E' lo stesso mestiere di `check-attribuzioni`: non dimostra, nomina.
//
// Uso, dalla radice del progetto (nessuna rete):
//   node scripts/check-virgolette.mjs                 (il quadro)
//   node scripts/check-virgolette.mjs --scheda <slug>  (una scheda, tutte le sue)
//   node scripts/check-virgolette.mjs --tutte          (l'elenco completo)
//   node scripts/check-virgolette.mjs --versi          (i sospetti di sezione 3)

import { readFileSync } from 'node:fs';
import { inFrasi } from './genera/frasi.mjs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const args = process.argv.slice(2);

// Le virgolette che il sito usa davvero, nelle tre forme che compaiono nei dati.
const VIRGOLETTE = /[“«"]([^”»"]{2,120})[”»"]/g;

// Un verbo di dire NELLA STESSA FRASE trasforma la citazione in una PROMESSA
// FORTE: non «si e' scritto cosi'», ma «qualcuno ha detto esattamente questo».
//
// La prima versione cercava il verbo nei quaranta caratteri prima delle
// virgolette e **non ne trovava nessuno dei quattro casi veri**: in «ha risposto
// piu' volte che parla "di niente"» fra il verbo e la citazione ci sono venti
// lettere, e il modello ammetteva solo spazi e punteggiatura. Un controllo che
// non trova i casi per cui e' stato scritto non e' prudente, e' rotto — e se ne
// e' accorto solo provandolo su quei quattro, non rileggendolo.
// Adesso il contesto e' **la frase intera**, tagliata con lo stesso `inFrasi`
// che usa il generatore.
// Un verso di canzone fra virgolette e' una violazione della SEZIONE 3, che
// vieta di riprodurre il testo «neppure parzialmente». Non e' un'imprecisione:
// e' la sola regola del sito che non ammette eccezioni, e **nessun controllo la
// guardava**. `check-testi` non fa questo: apre `testoUrl` e verifica che porti
// alla canzone giusta — non ha mai letto dentro le schede. Per questo
// `dont-look-back-in-anger` e' rimasto pubblicato, ed e' stato trovato a mano.
//
// Il segnale forte e' la parola che presenta il verso — «il verso piu' citato»,
// «il ritornello dice», «si apre con». Cercata nei 120 caratteri PRIMA della
// citazione, per lo stesso motivo per cui DIRE non guarda tutta la frase.
const VERSO = /(vers[oi]|ritornell|strof[ae]|incipit|refrain|inciso|il testo (dice|recita|fa|suona|va)|recita|cant(a|ato|ano)|vocalizzo|(si )?(apre|chiude) con)[^.!?]{0,60}$/i;

const DIRE = /(raccont|dichiar|spieg|ammett|ammise|ammesso|ha detto|disse|afferm|ricord|defin|descri|precis|confess|rivel|comment|rispos|chiese|domand|scherz|secondo |parole di|intervista|ha risposto|lo ha chiamato|la chiamo|neg(a|o|\u00f2|ato)|(?<!pi\u00f9 )cit(a|\u00f2|ato)|sostien|sosten|insist|osserv|aggiun|conclud|replic|obiett|:\s*$)/i;

// I titoli in catalogo: un album o una canzone fra virgolette non promette
// nulla su chi ha parlato, e sarebbe rumore elencarlo.
const TITOLI = new Set();
for (const c of canzoni) {
  if (c.titolo) TITOLI.add(c.titolo.toLowerCase());
  if (c.album) TITOLI.add(String(c.album).toLowerCase());
  if (c.artista) TITOLI.add(String(c.artista).toLowerCase());
}

// Un titolo di opera non promette niente su chi ha parlato. Quelli in catalogo
// sono gia' esclusi; questo prende gli altri — dischi, film, libri — dalla forma
// che hanno: poche parole, quasi tutte con l'iniziale maiuscola.
function sembraTitolo(testo) {
  const parole = testo.split(/\s+/).filter(Boolean);
  if (parole.length > 7) return false;
  const grandi = parole.filter((p) => /^[A-ZÀ-Þ0-9(]/.test(p)).length;
  return grandi / parole.length >= 0.6;
}

// Un titolo che il testo introduce con «la versione italiana di», «un remix di»,
// «la cover di», «dal romanzo» non e' un verso: e' un'opera nominata. Erano
// cinque falsi positivi su diciannove alla prima esecuzione di --versi
// (`postmortem`, `un-albero-di-trenta-piani`, `povera-patria`,
// `la-guerra-di-piero`, `losing-my-religion`), tutti con la stessa forma.
const OPERA = /(versione|edizione|remix|cover|riedizione|adattamento|colonna sonora|dal (romanzo|libro|film|poema|racconto)|rilettura|traduzione)[^.!?]{0,30}$/i;

function analizza(c) {
  const pezzi = [
    ...(c.corpo || []).map((p, i) => ({ dove: `corpo ${i + 1}`, testo: p })),
    ...(c.fraseIconica ? [{ dove: 'frase iconica', testo: c.fraseIconica }] : []),
  ];
  const trovate = [];
  for (const { dove, testo } of pezzi) {
    for (const frase of inFrasi(testo)) {
      for (const m of frase.matchAll(VIRGOLETTE)) {
        const dentro = m[1].trim();
        if (!dentro) continue;
        if (TITOLI.has(dentro.toLowerCase())) continue;
        if (sembraTitolo(dentro)) continue;
        // Il verbo deve stare PRIMA della citazione, non solo nella stessa
        // frase: in «"Funeral For A Friend" che apre "Goodbye Yellow Brick
        // Road"… e Rose lo avrebbe definito la sua piu' grande ispirazione» il
        // verbo arriva in fondo e non riguarda quei due titoli. Col contesto di
        // frase intera le segnalazioni erano 488 su 794 — cioe' gridare al
        // lupo, lo stesso errore che `check-attribuzioni` fece alla prima
        // stesura e che porto' da 60 a 16.
        const prima = frase.slice(0, m.index);
        const dichiarata = DIRE.test(prima);
        const verso = VERSO.test(prima.slice(-120)) && !OPERA.test(prima.slice(-60));
        trovate.push({ dove, testo: dentro, dichiarata, verso, parole: dentro.split(/\s+/).length });
      }
    }
  }
  return trovate;
}

if (args.includes('--versi')) {
  // Sospetti di sezione 3. Una citazione e' sospetta quando NON e' attribuita a
  // nessuno (un verso non lo dice qualcuno: sta nella canzone) e non e' un
  // titolo. Il rumore c'e' ed e' onesto dirlo: i titoli tutti in minuscolo —
  // «Un disco per l'estate» — passano il filtro delle maiuscole e finiscono qui.
  // Il controllo non decide, mette in fila due colonne: CERTO quando una parola
  // annuncia il verso, DA GUARDARE quando manca.
  const certi = [], altri = [];
  for (const c of canzoni) {
    for (const x of analizza(c)) {
      if (x.dichiarata) continue;
      if (x.parole < 3) continue;
      (x.verso ? certi : altri).push({ slug: c.slug, ver: !!c.ultimaVerifica, ...x });
    }
  }
  console.log('\nSezione 3: «non riproduciamo versi, ritornelli o traduzioni, nemmeno parziali».');
  console.log('Questo elenco NON dimostra che siano versi. Dice dove guardare.\n');
  console.log(`CERTI — una parola annuncia il verso subito prima delle virgolette: ${certi.length}`);
  for (const x of certi) console.log(`   ${x.ver ? '[bollino] ' : '          '}${x.slug}  [${x.dove}]  ${x.parole} parole`);
  console.log(`\nDA GUARDARE — citazione non attribuita a nessuno: ${altri.length}`);
  for (const x of altri.filter((y) => y.dove === 'frase iconica')) {
    console.log(`   ${x.ver ? '[bollino] ' : '          '}${x.slug}  [frase iconica]  ${x.parole} parole`);
  }
  console.log('\n[bollino] = la scheda dichiara al lettore di essere stata verificata frase per frase.');
  process.exit(0);
}

const iScheda = args.indexOf('--scheda');
if (iScheda > -1) {
  const slug = args[iScheda + 1];
  const c = canzoni.find((x) => x.slug === slug);
  if (!c) { console.error(`Nessuna scheda con slug "${slug}".`); process.exit(1); }
  const v = analizza(c);
  console.log(`${c.titolo} — ${c.artista}\n`);
  if (!v.length) { console.log('Nessuna citazione da controllare: solo titoli, o niente virgolette.'); process.exit(0); }
  for (const x of v) {
    console.log(`  ${x.dichiarata ? 'DICHIARATA' : 'altro     '} [${x.dove}]  «${x.testo}»`);
  }
  console.log('\nDICHIARATA = nella stessa frase c\'e\' un verbo di dire: la scheda afferma che');
  console.log('qualcuno ha pronunciato ESATTAMENTE quelle parole. Vanno ritrovate alla');
  console.log('lettera in una fonte citata, non parafrasate a memoria.');
  process.exit(0);
}

let totale = 0, dichiarate = 0, inFrase = 0;
const perScheda = [];
for (const c of canzoni) {
  const v = analizza(c);
  if (!v.length) continue;
  const d = v.filter((x) => x.dichiarata);
  totale += v.length;
  dichiarate += d.length;
  inFrase += v.filter((x) => x.dove === 'frase iconica').length;
  if (d.length) perScheda.push({ slug: c.slug, n: d.length, ver: !!c.ultimaVerifica });
}
perScheda.sort((a, b) => b.n - a.n);

console.log(`\nCitazioni fra virgolette (esclusi i titoli in catalogo): ${totale}`);
console.log(`  di cui DICHIARATE, cioe' in una frase con un verbo di dire: ${dichiarate}`);
console.log(`  di cui nella frase iconica, la riga piu' esposta del sito: ${inFrase}`);
console.log(`\nSono ${dichiarate} promesse che qualcuno ha pronunciato esattamente quelle parole.`);
console.log(`Questo controllo non le verifica — per farlo bisogna riaprire le fonti —`);
console.log(`ma dice dove sono, che e' cio' che finora non sapeva nessuno.\n`);

const daVedere = perScheda.filter((x) => !x.ver);
console.log(`Schede con citazioni dichiarate e NON ancora verificate: ${daVedere.length}`);
console.log('Le prime venti, dalla piu' + '’' + ' carica:');
for (const x of daVedere.slice(0, 20)) console.log(`  ${String(x.n).padStart(2)}  ${x.slug}`);

if (args.includes('--tutte')) {
  console.log('\n———————————— elenco completo ————————————');
  for (const c of canzoni) {
    const v = analizza(c).filter((x) => x.dichiarata);
    if (!v.length) continue;
    console.log(`\n${c.slug}${c.ultimaVerifica ? ' (verificata)' : ''}`);
    for (const x of v) console.log(`   [${x.dove}] «${x.testo}»`);
  }
}
