// Sorteggio riproducibile di N schede canzone per la verifica indipendente.
// Ordina le candidate per sha256(SEME + ':' + slug) e prende le prime N.
// Stesso seme + stessi dati = stesso campione, su qualsiasi macchina.
// Escluse: schede con ultimaVerifica, schede nel registro verifiche/indipendenti.json.
import fs from 'node:fs';
import crypto from 'node:crypto';
const SEME = process.argv[2] || '2026-09-22-campione-dieci';
const N = Number(process.argv[3] || 10);
const j = JSON.parse(fs.readFileSync('dati/canzoni.json', 'utf8'));
const tutte = Array.isArray(j) ? j : j.canzoni;
const reg = JSON.parse(fs.readFileSync('verifiche/indipendenti.json', 'utf8'));
const nelRegistro = new Set(Object.keys(reg.canzoni || {}));
const escluse = tutte.filter(x => x.ultimaVerifica || nelRegistro.has(x.slug));
const cand = tutte.filter(x => !x.ultimaVerifica && !nelRegistro.has(x.slug));
const h = s => crypto.createHash('sha256').update(SEME + ':' + s).digest('hex');
const scelte = cand.map(x => ({ x, k: h(x.slug) })).sort((a, b) => a.k < b.k ? -1 : 1).slice(0, N);
console.log(`seme: ${SEME}`);
console.log(`schede totali: ${tutte.length} · escluse: ${escluse.length} · candidate: ${cand.length}`);
scelte.forEach((s, i) => console.log(`${String(i + 1).padStart(2)}. ${s.x.slug} — «${s.x.titolo}», ${s.x.artista} · ${s.k.slice(0, 12)}`));
