// Il taglio in frasi, in un posto solo.
//
// PERCHE' STA QUI E NON DENTRO CHI LO USA. La sezione 4 della costituzione
// chiede che ogni affermazione dichiari la propria natura — fatto documentato,
// dichiarazione dell'artista, interpretazione accreditata. Perche' il dato che
// la dichiara possa stare accanto al testo senza riscriverlo, i due devono
// contare le frasi **allo stesso modo**: chi scrive i dati e chi genera la
// pagina. Due tagli diversi non danno un difetto vistoso, danno **etichette
// spostate di una frase**, che e' peggio: sembrano giuste.
//
// Quindi: una sola funzione, usata dal generatore e dal controllo, e un modo
// per stampare la numerazione (`check-nature.mjs --frasi <slug>`) cosi' che
// nessuno debba contare a occhio.

// Abbreviazioni dopo le quali il punto NON chiude una frase. Sono quelle che
// compaiono davvero nelle schede: numeri, sigle, iniziali puntate.
const ABBREVIAZIONI = /(?:\b(?:n|nn|es|sig|sigg|dott|prof|ing|avv|ecc|cfr|pag|pp|vol|fig|art|cap|op|cit|sec|ca|a\.C|d\.C|Mr|Mrs|Dr|St|Jr|Sr|vs|feat)|\b[A-ZÀ-Þ])\.$/;

/**
 * Taglia un paragrafo in frasi.
 * Il taglio avviene dopo `.`, `!`, `?` (anche seguiti da virgolette o parentesi
 * di chiusura) quando dopo c'e' uno spazio e poi qualcosa che apre una frase.
 * Non taglia dopo un'abbreviazione nota o dopo una singola iniziale puntata.
 */
export function inFrasi(paragrafo) {
  const t = String(paragrafo || '').trim();
  if (!t) return [];
  const frasi = [];
  let inizio = 0;
  for (let i = 0; i < t.length; i++) {
    if (!'.!?'.includes(t[i])) continue;
    // Porta dentro le chiusure che appartengono alla frase.
    let j = i + 1;
    while (j < t.length && '"»”)’\''.includes(t[j])) j++;
    if (j >= t.length) break;
    if (!/\s/.test(t[j])) continue;
    let k = j;
    while (k < t.length && /\s/.test(t[k])) k++;
    if (k >= t.length) break;
    // Dopo lo spazio deve cominciare qualcosa che sembra una frase nuova.
    if (!/[«"“(A-ZÀ-Þ0-9]/.test(t[k])) continue;
    const finora = t.slice(inizio, j);
    if (ABBREVIAZIONI.test(finora)) continue;
    frasi.push(finora.trim());
    inizio = k;
    i = k - 1;
  }
  const coda = t.slice(inizio).trim();
  if (coda) frasi.push(coda);
  return frasi;
}

/** Quante frasi ha ogni paragrafo di un corpo. */
export function conteggioFrasi(corpo) {
  return (corpo || []).map((p) => inFrasi(p).length);
}

/** Le tre nature previste dalla sezione 4, e come si scrivono al lettore. */
export const NATURE = {
  F: { nome: 'Fatto documentato', segno: null },
  D: { nome: "Dichiarato dall'artista", segno: 'dichiarazione' },
  I: { nome: 'Interpretazione accreditata', segno: 'interpretazione' },
};

/**
 * `naturaCorpo` e' valida quando esiste, ha un elenco per paragrafo, e ogni
 * elenco ha esattamente tante voci quante sono le frasi di quel paragrafo.
 * Restituisce il motivo del rifiuto invece di un semplice `false`: un dato
 * scartato in silenzio e' un dato che nessuno correggera' mai.
 */
export function verificaNatura(corpo, natura) {
  if (natura == null) return { ok: false, motivo: 'assente' };
  if (!Array.isArray(natura)) return { ok: false, motivo: 'non e\' un elenco' };
  const atteso = conteggioFrasi(corpo);
  if (natura.length !== atteso.length) {
    return { ok: false, motivo: `${natura.length} paragrafi dichiarati, ${atteso.length} nel testo` };
  }
  for (let i = 0; i < atteso.length; i++) {
    const riga = natura[i];
    if (!Array.isArray(riga)) return { ok: false, motivo: `paragrafo ${i + 1}: non e' un elenco` };
    if (riga.length !== atteso[i]) {
      return { ok: false, motivo: `paragrafo ${i + 1}: ${riga.length} etichette per ${atteso[i]} frasi` };
    }
    for (let j = 0; j < riga.length; j++) {
      if (riga[j] !== null && !NATURE[riga[j]]) {
        return { ok: false, motivo: `paragrafo ${i + 1}, frase ${j + 1}: "${riga[j]}" non e' F, D o I` };
      }
    }
  }
  return { ok: true };
}
