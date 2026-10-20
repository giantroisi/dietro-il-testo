// Il manifesto del lotto dichiara il perimetro; non autorizza la pubblicazione.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
export const impronta = value => createHash('sha256').update(value).digest('hex');
const stessoInsieme = (a, b) => a.size === b.size && [...a].every(x => b.has(x));

export function creaPerimetro({ root, normalizza, manifesto }) {
  const baseline = JSON.parse(readFileSync(join(root, 'dati', 'baseline-generatore.json'), 'utf8'));
  const lotto = manifesto ? JSON.parse(readFileSync(manifesto, 'utf8')) : { versione: 1, pagine: [], cartoline: [] };
  if (lotto.versione !== 1 || !Array.isArray(lotto.pagine) || !Array.isArray(lotto.cartoline) ||
      Object.keys(lotto).some(k => !['versione', 'pagine', 'cartoline'].includes(k))) {
    throw new Error('Manifesto lotto non valido: servono versione, pagine e cartoline');
  }
  const attese = new Set(lotto.pagine);
  if (attese.size !== lotto.pagine.length || lotto.pagine.some(p => typeof p !== 'string' ||
      !(p === '/404.html' || /^\/(?:[a-z0-9-]+\/)*$/.test(p)) || !existsSync(p === '/404.html' ? join(root, '404.html') : join(root, p.slice(1), 'index.html')))) {
    throw new Error('Il lotto richiede URL canonici esistenti, distinti e con slash finale');
  }
  const modificate = new Set();
  const conservate = [];

  // Controlla ogni voce del registro e ogni immagine, anche se un rendering
  // mirato non arriverebbe a leggere la cartolina fuori dal perimetro.
  const dati = JSON.parse(readFileSync(join(root, 'dati', 'pillole.json'), 'utf8'));
  const immagini = Object.fromEntries(readdirSync(join(root, 'pillole')).map(n => [
    'pillole/' + n, impronta(readFileSync(join(root, 'pillole', n)))
  ]));
  const dichiarate = new Map();
  for (const c of lotto.cartoline) {
    if (!c || !/^[a-z0-9-]+$/.test(c.slug || '') || dichiarate.has(c.slug) ||
        c.dato !== `dati/pillole.json#${c.slug}` || c.immagine !== `pillole/${c.slug}-storia.jpg` ||
        !attese.has(`/canzone/${c.slug}/`) || Object.keys(c).some(k => !['slug','dato','immagine'].includes(k))) {
      throw new Error('Cartolina senza canzone, dato e immagine coerenti nel lotto');
    }
    dichiarate.set(c.slug, c);
  }
  const cambiDati = new Set([...new Set([...Object.keys(baseline.cartoline), ...Object.keys(dati)])]
    .filter(s => baseline.cartoline[s] !== (dati[s] ? impronta(JSON.stringify(dati[s])) : undefined)));
  const cambiImmagini = new Set([...new Set([...Object.keys(baseline.immagini), ...Object.keys(immagini)])]
    .filter(n => baseline.immagini[n] !== immagini[n]));
  for (const s of cambiDati) if (!dichiarate.has(s)) throw new Error(`Dato cartolina fuori lotto: ${s}`);
  for (const n of cambiImmagini) if (![...dichiarate.values()].some(c => c.immagine === n)) throw new Error(`Immagine cartolina fuori lotto: ${n}`);
  for (const c of dichiarate.values()) if (!dati[c.slug] || dati[c.slug].file !== `${c.slug}-storia.jpg` ||
      !cambiDati.has(c.slug) && !cambiImmagini.has(c.immagine)) throw new Error(`Cartolina dichiarata ma non modificata: ${c.slug}`);

  return {
    prepara(percorso, vecchio, nuovo) {
      const url = '/' + percorso;
      if (vecchio === null) throw new Error(`Pagina nuova fuori dal catalogo autorizzato: ${url}`);
      const a = normalizza(vecchio), b = normalizza(nuovo);
      // Conserva integralmente l'artefatto se cambia soltanto la parte tecnica.
      if (a === b) return vecchio;
      // Compatibilità puntuale e chiusa con gli scarti ereditati censiti:
      // non ignora nuovi scarti e non permette di pubblicare i vecchi derivati.
      const ereditato = baseline.ereditate[url];
      if (ereditato && impronta(a) === ereditato.pubblicata && impronta(b) === ereditato.generata) {
        conservate.push(url);
        return vecchio;
      }
      modificate.add(url);
      if (!attese.has(url)) throw new Error(`Pagina fuori lotto: ${url}`);
      return nuovo;
    },
    verifica() {
      if (!stessoInsieme(modificate, attese)) {
        throw new Error(`Perimetro lotto non esatto; attese non modificate: ${[...attese].filter(x => !modificate.has(x)).join(', ')}`);
      }
      return { pagine: [...modificate].sort(), ereditateConservate: conservate.sort(),
        datiCartoline: [...cambiDati].sort(), immaginiCartoline: [...cambiImmagini].sort() };
    }
  };
}
