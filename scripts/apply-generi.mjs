import fs from 'node:fs';

const file = new URL('../index.html', import.meta.url);
let html = fs.readFileSync(file, 'utf8');

const italianArtists = new Set([
  '883', 'Adriano Celentano', 'Al Bano e Romina Power',
  'Andrea Bocelli e Giorgia', 'Caparezza', 'Cesare Cremonini',
  'Claudio Baglioni', 'Domenico Modugno', 'Edoardo Bennato',
  'Eros Ramazzotti', 'Fabrizio De André', 'Finley',
  'Francesco De Gregori', 'Franco Battiato', 'Fulminacci',
  'Gianna Nannini', 'Laura Pausini', 'Ligabue', 'Lucio Battisti',
  'Lucio Dalla', 'Mina', 'Naska', 'Pinguini Tattici Nucleari',
  'Pino Daniele', 'Renato Zero', 'Rino Gaetano', 'Toto Cutugno',
  'Vasco Rossi', 'Zucchero'
]);

function decode(value) {
  return value.replaceAll('&amp;', '&');
}

function categoriesFor(label) {
  const genre = decode(label).toLowerCase();
  const categories = [];
  if (/rock|grunge|britpop|psichedelia/.test(genre)) categories.push('rock');
  if (/metal|metalcore|deathcore|electronicore|industrial/.test(genre)) categories.push('metal');
  if (/pop|canzone italiana|musica leggera|musica melodica|cantautorato|soul|r&b|dance|synth|blues|funk/.test(genre)) categories.push('pop');
  if (/punk/.test(genre)) categories.push('punk');
  if (/rap|hip-hop|hip hop/.test(genre)) categories.push('rap');
  if (/electronic|elettronic|dance|disco|synth|house|new wave/.test(genre)) categories.push('elettronica');
  return categories;
}

const records = new Map();
const cardPattern = /<article class="card"([^>]*)>([\s\S]*?)<\/article>/g;
html = html.replace(cardPattern, (block, attributes, body) => {
  const idMatch = body.match(/class="card-title" href="#([^"]+)"/);
  const artistMatch = body.match(/class="card-artist" data-artist="([^"]+)"/);
  const genreMatch = body.match(/<span class="card-genre">([^<]+)<\/span>/);
  if (!idMatch) throw new Error('Card senza destinazione canzone');
  const id = idMatch[1];
  if (!artistMatch || !genreMatch) throw new Error(`Card incompleta: ${id}`);
  const artist = decode(artistMatch[1]);
  const categories = categoriesFor(genreMatch[1]);
  if (!categories.length) throw new Error(`Nessuna categoria per ${id}: ${genreMatch[1]}`);
  const country = italianArtists.has(artist) ? ' data-paese="it"' : '';
  records.set(id, { categories, country: country ? 'it' : '', artist });
  const cleanAttributes = attributes
    .replace(/\sdata-generi="[^"]*"/g, '')
    .replace(/\sdata-paese="[^"]*"/g, '');
  return `<article class="card"${cleanAttributes} data-generi="${categories.join(' ')}"${country}>${body}</article>`;
});

const sectionPattern = /<section class="song" id="([^"]+)"([^>]*)>/g;
html = html.replace(sectionPattern, (tag, id, attributes) => {
  const record = records.get(id);
  if (!record) throw new Error(`Section senza card: ${id}`);
  const cleanAttributes = attributes
    .replace(/\sdata-generi="[^"]*"/g, '')
    .replace(/\sdata-paese="[^"]*"/g, '');
  const country = record.country ? ` data-paese="${record.country}"` : '';
  return `<section class="song" id="${id}"${cleanAttributes} data-generi="${record.categories.join(' ')}"${country}>`;
});

if (records.size !== 157) throw new Error(`Attese 157 card, trovate ${records.size}`);
fs.writeFileSync(file, html);
console.log(`Aggiornati generi e provenienza per ${records.size} brani.`);
