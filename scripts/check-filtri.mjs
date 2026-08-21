import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const cards = [...html.matchAll(/<a class="card" href="#([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => {
  const [, id, attributes, body] = match;
  return {
    id,
    artist: (body.match(/data-artist="([^"]+)"/) || [])[1]?.replaceAll('&amp;', '&'),
    title: (body.match(/class="card-title">([^<]+)</) || [])[1]?.replaceAll('&amp;', '&'),
    genres: ((attributes.match(/data-generi="([^"]+)"/) || [])[1] || '').split(/\s+/).filter(Boolean),
    country: (attributes.match(/data-paese="([^"]+)"/) || [])[1] || ''
  };
});

const expected = { rock: 74, metal: 52, pop: 58, punk: 17, rap: 4, elettronica: 9 };
let failed = false;

console.log(`Schede controllate: ${cards.length}`);
for (const [genre, count] of Object.entries(expected)) {
  const actual = cards.filter((card) => card.genres.includes(genre)).length;
  console.log(`${genre}: ${actual}`);
  if (actual !== count) failed = true;
}

const italian = cards.filter((card) => card.country === 'it');
console.log(`provenienza italiana: ${italian.length}`);
if (italian.length !== 33) failed = true;

const rapTitles = cards.filter((card) => card.genres.includes('rap')).map((card) => card.title).sort();
const requiredRap = ['Bulls on Parade', 'Killing in the Name', 'Lose Yourself', 'Vieni a ballare in Puglia'].sort();
if (JSON.stringify(rapTitles) !== JSON.stringify(requiredRap)) {
  console.error(`Filtro rap inatteso: ${rapTitles.join(', ')}`);
  failed = true;
}

const checks = [
  ['Bring Me the Horizon', 'metal', true],
  ['Michael Jackson', 'metal', false],
  ['Blink-182', 'punk', true],
  ['Metallica', 'punk', false],
  ['Vasco Rossi', 'it', true],
  ['Toto', 'it', false]
];

for (const [artist, token, expectedValue] of checks) {
  const artistCards = cards.filter((card) => card.artist === artist);
  const actual = artistCards.some((card) => token === 'it' ? card.country === 'it' : card.genres.includes(token));
  if (actual !== expectedValue) {
    console.error(`Controllo fallito: ${artist} / ${token}`);
    failed = true;
  }
}

const sections = [...html.matchAll(/<section class="song" id="([^"]+)"([^>]*)>/g)];
if (cards.length !== 157 || sections.length !== 157) failed = true;
for (const card of cards) {
  const section = sections.find((item) => item[1] === card.id);
  const sectionGenres = (section?.[2].match(/data-generi="([^"]+)"/) || [])[1] || '';
  const sectionCountry = (section?.[2].match(/data-paese="([^"]+)"/) || [])[1] || '';
  if (sectionGenres !== card.genres.join(' ') || sectionCountry !== card.country) {
    console.error(`Card e scheda non allineate: ${card.id}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Filtri normalizzati: tutti i controlli superati.');
