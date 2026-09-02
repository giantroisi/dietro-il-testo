#!/usr/bin/env node
// F18 — prova della regola che nega la foto. Non richiede rete.
//
// La regola vale quanto vale il caso in cui NEGA, non quello in cui concede:
// se un giorno qualcuno aggiunge un ritratto dimenticando il nome dell'autore,
// il sito deve tornare al riquadro grafico da solo, senza che nessuno se ne
// accorga in tempo. Questa prova verifica proprio quello.
//
// Uso, dalla radice del progetto: node scripts/prova-ritratto.mjs

import { ritrattoArtista } from './genera/pagine.mjs';

const casi = [
  {
    nome: 'nessun ritratto nei dati',
    artista: { nome: 'Prova Band', slug: 'prova' },
    attesa: { pubblicata: false, contiene: 'class="visivo"' },
  },
  {
    nome: 'ritratto completo',
    artista: { nome: 'Prova Band', slug: 'prova', ritratto: {
      file: 'prova.jpg', autore: 'Tizio Fotografo', licenza: 'CC BY-SA 4.0',
      licenzaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      fonte: 'https://commons.wikimedia.org/wiki/File:Prova.jpg' } },
    attesa: { pubblicata: true, contiene: 'Tizio Fotografo' },
  },
  { nome: "manca l'autore",        manca: 'autore' },
  { nome: 'manca la licenza',        manca: 'licenza' },
  { nome: 'manca il link licenza',   manca: 'licenzaUrl' },
  { nome: 'manca la pagina fonte',   manca: 'fonte' },
  { nome: 'manca il file',           manca: 'file' },
];

const completo = {
  file: 'prova.jpg', autore: 'Tizio Fotografo', licenza: 'CC BY-SA 4.0',
  licenzaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  fonte: 'https://commons.wikimedia.org/wiki/File:Prova.jpg',
};

let falliti = 0;
for (const c of casi) {
  const artista = c.artista || { nome: 'Prova Band', slug: 'prova', ritratto: { ...completo, [c.manca]: undefined } };
  const attesa = c.attesa || { pubblicata: false, contiene: 'class="visivo"' };
  const esito = ritrattoArtista(artista);
  const ok = esito.pubblicata === attesa.pubblicata && esito.html.includes(attesa.contiene);
  if (!ok) falliti++;
  console.log(`${ok ? 'ok       ' : 'FALLITO  '} ${c.nome}  →  ${esito.pubblicata ? 'foto pubblicata' : 'riquadro grafico'}`);
}

// il credito deve esserci per intero, non a metà
const pieno = ritrattoArtista({ nome: 'Prova Band', slug: 'prova', ritratto: completo }).html;
for (const pezzo of ['Tizio Fotografo', 'CC BY-SA 4.0', 'creativecommons.org', 'commons.wikimedia.org', '<figcaption>']) {
  const c = pieno.includes(pezzo);
  if (!c) falliti++;
  console.log(`${c ? 'ok       ' : 'FALLITO  '} il credito contiene: ${pezzo}`);
}

console.log(falliti
  ? `\n${falliti} controlli falliti: la regola non protegge quello che dice di proteggere.`
  : '\nTutti i controlli passano: senza attribuzione completa la foto non viene pubblicata,\ne quando viene pubblicata il credito e per intero in pagina.');
process.exit(falliti ? 1 : 0);
