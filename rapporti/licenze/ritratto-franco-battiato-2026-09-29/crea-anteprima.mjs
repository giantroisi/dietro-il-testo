// Candidatura isolata: nessuna scrittura nei registri o nei dati editoriali.
// Eseguire prima node scripts/genera-sito.mjs; l'output di sito/ è ignorato.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { ritrattoArtista } from '../../../scripts/genera/pagine.mjs';
const folder = dirname(fileURLToPath(import.meta.url));
const root = resolve(folder, '../../..');
const candidato = JSON.parse(readFileSync(join(folder, 'candidatura.json'), 'utf8'));
const rt = candidato.registroProposto;
const bytes = readFileSync(join(folder, rt.file));
if (createHash('sha256').update(bytes).digest('hex') !== candidato.sha256) throw new Error('Integrità immagine non confermata');
const artisti = JSON.parse(readFileSync(join(root, 'dati/artisti.json'), 'utf8'));
const artista = artisti.find(a => a.slug === candidato.artistaSlug);
if (!artista) throw new Error('Artista assente dal catalogo');
const precedente = ritrattoArtista(artista);
if (precedente.pubblicata) throw new Error('Un ritratto è già selezionato: riesaminare la candidatura');
const ritratto = ritrattoArtista({ ...artista, ritratto: rt });
if (!ritratto.pubblicata) throw new Error(ritratto.motivo || 'Attribuzione rifiutata');
const pagina = join(root, 'sito/artista', artista.slug, 'index.html');
const originale = readFileSync(pagina, 'utf8');
if (originale.split(precedente.html).length !== 2) throw new Error('Punto di sostituzione ambiguo');
const anteprima = originale.replace(precedente.html, ritratto.html)
  .replace('</head>', '<meta name="robots" content="noindex,nofollow">\n</head>');
writeFileSync(pagina, anteprima);
mkdirSync(join(root, 'sito/ritratti'), { recursive: true });
copyFileSync(join(folder, rt.file), join(root, 'sito/ritratti', rt.file));
console.log('Anteprima isolata creata: sito/artista/franco-battiato/index.html');
console.log('Registri e dati editoriali invariati. Rigenerare il sito ripristina la grafica originale.');
