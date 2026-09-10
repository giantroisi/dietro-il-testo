// F97 — controlla le etichette di natura, e stampa la numerazione delle frasi
// perche' nessuno debba contarle a occhio.
//
// Uso, dalla radice del progetto:
//   node scripts/check-nature.mjs                 (stato di tutto il catalogo)
//   node scripts/check-nature.mjs --frasi <slug>  (le frasi numerate di una scheda)
//   node scripts/check-nature.mjs --da-fare       (le schede ancora senza etichette)
//
// Nessuna rete: lo lancia chiunque, in un secondo.
//
// PERCHE' ESISTE. Il generatore rifiuta in silenzio un `naturaCorpo` che non
// combacia con le frasi del testo — deve farlo, perche' un'etichetta spostata
// di una frase e' peggio di nessuna etichetta: sembra giusta. Ma un dato
// scartato in silenzio e' un dato che nessuno correggera' mai. Questo controllo
// e' la voce di quel silenzio: dice quali schede sono state scartate e perche'.

import { readFileSync } from 'node:fs';
import { inFrasi, verificaNatura, NATURE } from './genera/frasi.mjs';

const canzoni = JSON.parse(readFileSync('dati/canzoni.json', 'utf8'));
const args = process.argv.slice(2);

const iFrasi = args.indexOf('--frasi');
if (iFrasi > -1) {
  const slug = args[iFrasi + 1];
  const c = canzoni.find((x) => x.slug === slug);
  if (!c) { console.error(`Nessuna scheda con slug "${slug}".`); process.exit(1); }
  console.log(`${c.titolo} — ${c.artista}\n`);
  (c.corpo || []).forEach((par, i) => {
    const frasi = inFrasi(par);
    console.log(`Paragrafo ${i + 1} — ${frasi.length} frasi:`);
    frasi.forEach((f, j) => console.log(`  ${j + 1}. ${f}`));
    const attuale = (c.naturaCorpo || [])[i];
    console.log(`  naturaCorpo[${i}] deve avere ${frasi.length} voci` + (attuale ? ` (ora ne ha ${attuale.length}: ${JSON.stringify(attuale)})` : ' (ora manca)'));
    console.log('');
  });
  console.log('Valori ammessi: "F" fatto documentato, "D" dichiarato dall\'artista, "I" interpretazione accreditata, null se non decisa.');
  console.log('Solo D e I portano un segno visibile al lettore: F e\' la linea di base.');
  process.exit(0);
}

let conNatura = 0, rotte = 0, senza = 0;
const problemi = [];
const daFare = [];
for (const c of canzoni) {
  const v = verificaNatura(c.corpo, c.naturaCorpo);
  if (v.ok) { conNatura++; continue; }
  if (v.motivo === 'assente') { senza++; daFare.push(c.slug); continue; }
  rotte++;
  problemi.push({ slug: c.slug, motivo: v.motivo });
}

if (args.includes('--da-fare')) {
  console.log(daFare.join('\n'));
  process.exit(0);
}

console.log(`\nSchede: ${canzoni.length}`);
console.log(`  con etichette valide     ${conNatura}`);
console.log(`  senza etichette          ${senza}  (la pagina esce come prima: e' voluto)`);
console.log(`  con etichette RIFIUTATE  ${rotte}`);

if (rotte) {
  console.log('\nRifiutate dal generatore, e percio\' invisibili al lettore:');
  for (const p of problemi) console.log(`  ${p.slug}: ${p.motivo}`);
  console.log('\nPer rimetterle in riga: node scripts/check-nature.mjs --frasi <slug>');
}

// Un conto utile a chi scrive: quante frasi porterebbero un segno.
let segnate = 0, totali = 0;
for (const c of canzoni) {
  if (!verificaNatura(c.corpo, c.naturaCorpo).ok) continue;
  for (const riga of c.naturaCorpo) for (const k of riga) {
    totali++;
    if (k && NATURE[k] && NATURE[k].segno) segnate++;
  }
}
if (totali) {
  const perc = Math.round((segnate / totali) * 100);
  console.log(`\nFrasi etichettate: ${totali}. Con segno visibile (D o I): ${segnate} (${perc}%).`);
  console.log('Se questa percentuale sfiora il 100% qualcosa non va: vorrebbe dire che');
  console.log('il sito non afferma quasi nessun fatto documentato, e non e\' cosi\'.');
}

process.exit(rotte ? 1 : 0);
