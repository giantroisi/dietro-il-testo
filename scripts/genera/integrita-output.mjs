// Controlli offline dell'output pubblico: nessuna rete o modifica dei file.
import { readdirSync, readFileSync } from 'node:fs';
import { relative, join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ORIGINE = 'https://www.dietroiltesto.it';
export const HOST_INTERNI = new Set(['dietroiltesto.it', 'www.dietroiltesto.it']);

export function decodificaHTML(value) {
  return value.replace(/&(?:#(x[0-9a-f]+|[0-9]+)|amp|quot|apos|lt|gt);/gi, (entity, number) => {
    if (number) {
      const n = number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number);
      return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : entity;
    }
    return { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' }[entity.toLowerCase()];
  });
}

export function attributi(tag) {
  const values = {};
  const re = /([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const m of tag.matchAll(re)) values[m[1].toLowerCase()] = decodificaHTML(m[2] ?? m[3] ?? m[4]);
  return values;
}

export function leggiHTML(out) {
  const root = resolve(out);
  const pages = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = join(dir, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlink non ammesso nell'output: ${relative(root, file)}`);
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        pages.push({ file, percorso: relative(root, file), html: readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '') });
      }
    }
  }
  walk(root);
  if (!pages.length) throw new Error('Nessuna pagina HTML nell’output da verificare');
  return pages;
}

export function fallisci(titolo, problemi) {
  if (!problemi.length) return;
  const error = new Error(`${titolo}: ${problemi.length} problemi\n${problemi.join('\n')}`);
  error.problemi = problemi;
  throw error;
}

export function eseguiCLI(moduleUrl, check) {
  if (!process.argv[1] || resolve(process.argv[1]) !== fileURLToPath(moduleUrl)) return;
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== '--out')) throw new Error('Uso: --out <cartella pubblica>');
    const out = args[1] || join(dirname(fileURLToPath(moduleUrl)), '..', 'sito');
    console.log(JSON.stringify(check(out)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
