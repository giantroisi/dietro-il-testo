#!/usr/bin/env node
// F96 — trova le schede che attribuiscono qualcosa a una testata che NON citano.
//
// Perche' esiste. E' l'errore che i campioni di F71 hanno trovato quattro volte
// in due giorni, sempre uguale:
//
//   `antivist`   — un racconto messo in bocca a Oli Sykes; la fonte lo attribuisce
//                  al bassista Matt Kean.
//   `in-the-end` — «Billboard ha indicato questo passaggio come il motivo per cui…»;
//                  Billboard, nella fonte citata, dice un'altra cosa.
//   `crawling`   — «in un'intervista del 2009 a Noisecreep»; la fonte citata
//                  attribuisce quella dichiarazione a SPIN.
//   `paranoid`   — «Butler ha raccontato a Mojo (2013)»; Mojo non compare in
//                  nessuna delle due fonti della scheda.
//
// In tutti e quattro i casi il fatto raccontato era vero o quasi. Quello che era
// falso e' **da chi viene**. Ed e' un errore particolarmente insidioso, perche'
// il nome di una testata dentro una frase la fa sembrare gia' verificata: fa da
// prova al posto della prova.
//
// Cosa fa: cerca nel testo della scheda i nomi di testate note e li confronta con
// le fonti che la scheda cita davvero. Se una scheda nomina il Mojo ma fra le sue
// fonti il Mojo non c'e', lo segnala.
//
// Cosa NON fa: non dice che l'affermazione sia falsa. Una scheda puo' benissimo
// citare correttamente una testata di seconda mano («Rolling Stone lo definì…»,
// riportato da Wikipedia che invece e' fra le fonti). Il controllo dice soltanto
// che **quel nome non e' verificabile da qui**, e va o aggiunta la fonte vera, o
// tolto il nome, o attribuito a chi lo riporta («secondo Wikipedia, che cita
// Mojo…»). Sono tre uscite legittime; quella che non lo e' e' lasciarlo com'e'.
//
// Come si chiude una segnalazione: si apre la fonte e si sceglie una delle tre.
//
// **Quanto aspettarsi, misurato il 4 settembre 2026 sulle prime 17 segnalazioni.**
// Nove erano legittime: la fonte citata **nomina essa stessa** la testata («In
// 2006, he told Rolling Stone…»), quindi la catena c'e' e semmai va resa
// visibile. Otto no. Fra queste otto, **tre nominavano la testata sbagliata** —
// `wonderwall` dice NME mentre la fonte dice Select, `crawling` dice Noisecreep
// mentre la fonte dice SPIN, `someone-like-you` dice Rolling Stone che nella
// fonte non compare. **Questo e' il motivo per cui il controllo non giudica**: da
// qui non si distingue una catena buona da una rotta, si distingue solo che
// nessuno l'ha ancora aperta. Circa meta' delle segnalazioni si chiude senza
// modificare niente: e' il prezzo giusto per trovare l'altra meta'.
//
// Uso:  node scripts/check-attribuzioni.mjs [--tutte]
// Non serve rete.

import { readFileSync } from 'node:fs';

// Testate e programmi che compaiono come garanti nelle schede. La lista si
// allunga a mano: meglio corta e sicura che lunga e piena di falsi positivi.
// Ogni voce ha le forme con cui puo' comparire nel testo e i pezzi di dominio
// o di nome-fonte che la rendono «citata davvero».
const TESTATE = [
  ['Mojo', ['mojo']],
  ['Kerrang', ['kerrang']],
  ['NME', ['nme']],
  ['Rolling Stone', ['rollingstone', 'rolling stone']],
  ['Billboard', ['billboard']],
  ['Songfacts', ['songfacts']],
  ['Wikipedia', ['wikipedia']],
  ['Noisecreep', ['noisecreep']],
  ['SPIN', ['spin.com', 'spin']],
  ['Guitar World', ['guitarworld', 'guitar world']],
  ['Louder', ['loudersound', 'louder']],
  ['Metal Hammer', ['metalhammer', 'metal hammer', 'loudersound']],
  ['Alternative Press', ['altpress', 'alternative press']],
  ['AltPress', ['altpress', 'alternative press']],
  ['Revolver', ['revolvermag', 'revolver']],
  ['Loudwire', ['loudwire']],
  ['Ultimate Classic Rock', ['ultimateclassicrock', 'ultimate classic rock']],
  ['Far Out', ['faroutmagazine', 'far out']],
  ['Pitchfork', ['pitchfork']],
  ['Blabbermouth', ['blabbermouth']],
  ['MTV', ['mtv']],
  ['BBC', ['bbc']],
  ['NPR', ['npr']],
  ['The Guardian', ['theguardian', 'guardian']],
  ['Vanity Fair', ['vanityfair', 'vanity fair']],
  ['Elle', ['elle.com', 'elle']],
  ['Rockol', ['rockol']],
  ['Rockit', ['rockit']],
  ['OndaRock', ['ondarock']],
  ['Fanpage', ['fanpage']],
  ['Corriere della Sera', ['corriere']],
  ['Repubblica', ['repubblica']],
  ['Vogue', ['vogue']],
  ['GQ', ['gq.com', 'gq']],
  ['Q Magazine', ['qthemusic', 'q magazine']],
  ['Melody Maker', ['melody maker']],
  ['Uncut', ['uncut']],
  ['Metal Injection', ['metalinjection', 'metal injection']],
  ['Consequence of Sound', ['consequence']],
  ['Stereogum', ['stereogum']],
  ['Variety', ['variety']],
  ['Forbes', ['forbes']],
  ['Time', ['time.com']],
  ['Parade', ['parade']],
  ['Songtell', ['songtell']],
];

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const tutte = process.argv.includes('--tutte');

function testoDi(c) {
  const pezzi = [...(c.corpo || []), c.fraseIconica || ''];
  for (const s of c.sezioniExtra || []) {
    if (typeof s === 'string') pezzi.push(s);
    else pezzi.push(s.titolo || '', ...(Array.isArray(s.corpo) ? s.corpo : [s.corpo || '']));
  }
  return pezzi.join('\n');
}

function citata(c, indizi) {
  const dove = (c.fonti || [])
    .map((f) => `${f.nome || ''} ${f.url || ''}`.toLowerCase())
    .join(' | ');
  return indizi.some((i) => dove.includes(i));
}

// **Il punto delicato del controllo: nominare non e' attribuire.**
// «raggiunse il numero 1 della Billboard Hot 100» nomina Billboard ma non le
// attribuisce niente: e' il nome di una classifica. «Billboard ha indicato quel
// passaggio come il motivo per cui…» invece la mette a garanzia di un'analisi.
// Solo il secondo caso e' un'attribuzione, e solo quello va segnalato: un
// controllo che grida al lupo su ogni classifica viene ignorato in una settimana,
// ed e' il modo piu' sicuro di rendere inutile un controllo giusto.

// Cose che seguono il nome e lo rendono un titolo, non una fonte.
const CODE_INNOCUE = /^\s*(Hot\s*100|200|Global\s*200|Mainstream|Music\s*Award|Video\s*Music|Unplugged|Awards?|Chart|Charts|Than\s+Love|Records?|Studios?)/i;

// Forme in cui una testata viene messa a garanzia di un'affermazione.
// **Si applica alla singola frase, non a tutta la scheda**: altrimenti un «a
// Kerrang» in fondo alla pagina fa scattare il controllo su un «MTV» che sta
// dieci righe sopra e non c'entra niente.
function attribuzione(frase, nome) {
  const n = nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const dire = '(?:dichiar|dis|dic|raccont|spieg|confid|ammis|ammes|intervist|parl|rivel)\\w*';
  const forme = [
    // «secondo Mojo», «per Rolling Stone»
    `(?:secondo|per)\\s+(?:la\\s+rivista\\s+|il\\s+|la\\s+)?${n}\\b`,
    // «disse alla rivista NME», «in un'intervista del 2009 a Noisecreep»
    // Serve un verbo del dire vicino: senza, «al primo posto della classifica
    // Billboard» verrebbe scambiato per un'attribuzione.
    `${dire}[^.;]{0,60}?\\b(?:a|al|alla|su|sul|sulla)\\s+(?:rivista\\s+|testata\\s+)?${n}\\b`,
    // «Billboard ha indicato», «NME scrisse», «inserito da Guitar World»
    `${n}\\s+(?:ha|hanno|aveva|avevano)?\\s*(?:detto|dichiarato|raccontato|scritto|scrisse|indicato|indica|definito|definì|riportato|riporta|riportò|eletto|inserito|descritto|descrive|spiegato|spiega|sostiene|sostenuto|nominato|nomina)`,
    `(?:inserito|eletto|indicato|scelto|classificato|definito|nominato)\\s+[^.;]{0,60}?\\bda\\s+${n}\\b`,
  ];
  return forme.some((f) => new RegExp(f, 'iu').test(frase));
}

const segnalazioni = [];

for (const c of canzoni) {
  const frasi = testoDi(c).split(/(?<=[.;!?])\s+/);
  const contesti = [];
  for (const [nome, indizi] of TESTATE) {
    if (citata(c, indizi)) continue;
    const re = new RegExp(`(^|[^\\p{L}\\p{N}])${nome.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^\\p{L}\\p{N}]|$)`, 'u');
    for (const frase of frasi) {
      const m = re.exec(frase);
      if (!m) continue;
      // se subito dopo il nome c'e' una coda che ne fa un titolo, non e' una fonte
      if (CODE_INNOCUE.test(frase.slice(m.index + m[0].length - 1))) continue;
      if (!attribuzione(frase, nome)) continue;
      if (contesti.some((x) => x.nome === nome)) break;
      contesti.push({ nome, frase: frase.trim().slice(0, 220) });
      break;
    }
  }
  if (contesti.length) {
    segnalazioni.push({ slug: c.slug, artista: c.artista, contesti, fonti: (c.fonti || []).map((f) => f.nome).join(', ') });
  }
}

console.log(`\nSchede esaminate: ${canzoni.length}`);
console.log(`Schede che nominano una testata non citata fra le proprie fonti: ${segnalazioni.length}\n`);

const daMostrare = tutte ? segnalazioni : segnalazioni.slice(0, 40);
for (const s of daMostrare) {
  console.log(`${s.slug}  (${s.artista})`);
  console.log(`  fonti citate: ${s.fonti || '—'}`);
  for (const c of s.contesti) console.log(`  » ${c.nome}: «${c.frase}»`);
  console.log('');
}
if (!tutte && segnalazioni.length > daMostrare.length) {
  console.log(`… e altre ${segnalazioni.length - daMostrare.length}. Usa --tutte per vederle.\n`);
}

console.log('Tre uscite legittime per ogni segnalazione, una sola non lo e’:');
console.log('  1. si aggiunge la fonte vera fra le fonti della scheda;');
console.log('  2. si toglie il nome della testata dalla frase;');
console.log('  3. si attribuisce a chi lo riporta («secondo Wikipedia, che cita Mojo…»).');
console.log('Lasciarlo com’è non è una di quelle tre.\n');

process.exit(segnalazioni.length ? 1 : 0);
