import fs from 'node:fs';

const file = new URL('../index.html', import.meta.url);
let html = fs.readFileSync(file, 'utf8');
let count = 0;

html = html.replace(/<a class="card" href="#([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (block, id, attributes, body) => {
  const updatedBody = body.replace(
    /<span class="card-title">([^<]+)<\/span>/,
    `<a class="card-title" href="#${id}">$1</a>`
  );
  if (updatedBody === body) throw new Error(`Titolo non trovato nella card ${id}`);
  count++;
  return `<article class="card"${attributes}>${updatedBody}</article>`;
});

if (count !== 157) throw new Error(`Attese 157 card, convertite ${count}`);
fs.writeFileSync(file, html);
console.log(`Convertite ${count} card in strutture con azioni separate.`);
