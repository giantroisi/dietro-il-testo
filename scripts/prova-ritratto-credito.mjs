#!/usr/bin/env node
// I crediti personalizzati devono conservare autore, fonte e licenza.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { ritrattoArtista } from './genera/pagine.mjs';

const base = {
  file: 'prova.jpg', autore: 'Autore Prova', licenza: 'CC BY 2.0',
  licenzaUrl: 'https://creativecommons.org/licenses/by/2.0/',
  fonte: 'https://example.org/foto', alt: 'Palco con strumenti',
  dimensioni: { larghezza: 960, altezza: 540 },
  creditoParti: [
    { testo: 'Titolo della foto', url: 'https://example.org/foto' },
    ' · Foto di Autore Prova · ',
    { testo: 'CC BY 2.0', url: 'https://creativecommons.org/licenses/by/2.0/' },
    ' · ridimensionata',
  ],
};
const rendi = (ritratto) => ritrattoArtista({ slug: 'prova', nome: 'Prova', ritratto });
const valido = rendi(base);
assert.equal(valido.pubblicata, true);
assert.match(valido.html, /alt="Palco con strumenti" width="960" height="540"/);
assert.match(valido.html, /rel="license nofollow noopener"/);

for (const campo of ['autore', 'licenza', 'licenzaUrl', 'fonte']) {
  assert.equal(rendi({ ...base, [campo]: undefined }).pubblicata, false, campo);
}
for (const [nome, parti] of [
  ['credito senza autore', base.creditoParti.filter((p) => typeof p !== 'string')],
  ['credito senza fonte', base.creditoParti.slice(1)],
  ['credito senza licenza', base.creditoParti.filter((p) => p.url !== base.licenzaUrl)],
  ['URL eseguibile', [...base.creditoParti, { testo: 'Link', url: 'javascript:alert(1)' }]],
  ['parte malformata', [...base.creditoParti, null]],
]) {
  const r = rendi({ ...base, creditoParti: parti });
  assert.equal(r.pubblicata, false, nome);
  assert.match(r.html, /class="visivo"/);
}
const escaped = rendi({ ...base, alt: '" onerror="errore',
  creditoParti: [...base.creditoParti, '<script>errore</script>'] });
assert.equal(escaped.pubblicata, true);
assert.ok(!escaped.html.includes('<script>'));
assert.ok(!escaped.html.includes('alt="" onerror='));
assert.ok(!rendi({ ...base, dimensioni: { larghezza: -1, altezza: 540 } }).html.includes('width='));

const ritratti = JSON.parse(readFileSync(new URL('../dati/ritratti.json', import.meta.url)));
for (const [slug, rt] of Object.entries(ritratti).filter(([, rt]) => rt.creditoParti)) {
  const risultato = ritrattoArtista({ slug, nome: slug });
  assert.equal(risultato.pubblicata, true, slug);
  const credito = rt.creditoParti.map((p) => typeof p === 'string' ? p : p.testo).join('');
  assert.equal(credito, rt.creditoVisibile, slug + ': credito approvato');
  if (rt.licenza === 'CC BY 2.0') assert.ok(credito.includes(rt.titoloOriginale), slug + ': titolo originale');
  if (rt.creditoRichiesto) assert.ok(credito.includes(rt.creditoRichiesto), slug + ': attribuzione richiesta');
  const bytes = readFileSync(new URL('../ritratti/' + rt.file, import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), rt.sha256, slug + ': file verificato');
}
console.log('OK: crediti approvati, file identici, alt e dimensioni; esclusione dei crediti incompleti e dei link eseguibili.');
