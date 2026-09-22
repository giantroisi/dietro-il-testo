// Conta gli esiti dalle tabelle 01-…10-. Una riga = una voce.
// Righe «= voce N» (descrizioni generate dal corpo) e righe senza esito non si contano.
import fs from 'node:fs';
const dir = new URL('.', import.meta.url).pathname;
const file = fs.readdirSync(dir).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
const tot = { C: 0, R: 0, N: 0, X: 0, P3: 0, dati: 0, voci: 0 };
const righe = [];
let dup = 0; const desc = [];
for (const f of file) {
  const c = { C: 0, R: 0, N: 0, X: 0, P3: 0, dati: 0, voci: 0 };
  for (const l of fs.readFileSync(dir + f, 'utf8').split('\n')) {
    const m = l.match(/^\| (\d+) \| (.*?) \| (.*?) \|/);
    if (!m) continue;
    const e = m[3].trim().replace(/\*\*/g, "");
    if (/^Descrizione/.test(m[2])) { desc.push(f.slice(0, 2) + ":" + e.split(" (")[0]); continue; }
    if (e === "—" || /= voc/.test(e) || /^\(/.test(e)) { if (/= voc/.test(e)) dup++; continue; }
    c.voci++;
    if (/VIOLAZIONE P3/.test(e)) c.P3++;
    if (/^ERRATO/.test(e)) { c.X++; c.dati++; continue; }
    if (/^FONTE NON RAGGIUNGIBILE/.test(e)) { c.R++; continue; }
    if (/^CONFERMAT[AO] CON RISERVA/.test(e)) c.R++;
    else if (/^CONFERMAT[AO]/.test(e)) c.C++;
    else if (/^CONTRADDETTA/.test(e)) c.X++;
    else if (/NON CONFERMATA/.test(e)) c.N++;
    else if (/^VIOLAZIONE P3/.test(e)) c.N++;
    else throw new Error(f + ': esito non riconosciuto: ' + e);
  }
  for (const k in tot) tot[k] += c[k];
  righe.push(`| ${f.replace(/\.md$/, '')} | ${c.voci} | ${c.C} | ${c.R} | ${c.N} | ${c.X} | ${c.P3} |`);
}
console.log('| Scheda | Voci | Confermate | Con riserva | Non confermate | Contraddette / dato errato | Violazioni P3 |');
console.log('|---|--:|--:|--:|--:|--:|--:|');
console.log(righe.join('\n'));
console.log(`| **Totale** | **${tot.voci}** | **${tot.C}** | **${tot.R}** | **${tot.N}** | **${tot.X}** | **${tot.P3}** |`);
console.log(JSON.stringify(tot), "altre righe = voce N:", dup, "\nDescrizioni (contate a parte, ripetono la prima frase del corpo):", desc.join(" · "));
