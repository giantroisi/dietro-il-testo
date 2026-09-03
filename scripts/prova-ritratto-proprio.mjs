// Controlla che il generatore pubblichi una foto propria solo se ha concerto e
// data, e che il riquadro grafico resti in tutti gli altri casi.
import { ritrattoArtista } from './genera/pagine.mjs';
const a = { slug: 'prova', nome: 'Gruppo di Prova' };
const casi = [
  ['completa',        { file: 'x.jpg', propria: true, concerto: 'Arena di Verona', data: '12 luglio 2024' }, true],
  ['senza data',      { file: 'x.jpg', propria: true, concerto: 'Arena di Verona' },                        false],
  ['senza concerto',  { file: 'x.jpg', propria: true, data: '12 luglio 2024' },                             false],
  ['senza file',      { propria: true, concerto: 'Arena di Verona', data: '12 luglio 2024' },               false],
  ['commons ok',      { file: 'x.jpg', autore: 'A', licenza: 'CC BY 2.0', licenzaUrl: 'u', fonte: 'f' },    true],
  ['commons monca',   { file: 'x.jpg', autore: 'A', licenza: 'CC BY 2.0' },                                 false],
];
let ko = 0;
for (const [nome, rt, atteso] of casi) {
  const r = ritrattoArtista({ ...a, ritratto: rt });
  const ok = r.pubblicata === atteso;
  if (!ok) ko++;
  console.log(`${ok ? 'ok  ' : 'KO  '} ${nome.padEnd(16)} pubblicata=${r.pubblicata}${r.motivo ? ' — ' + r.motivo : ''}`);
}
const buona = ritrattoArtista({ ...a, ritratto: { file: 'x.jpg', propria: true, concerto: 'Arena di Verona', data: '12 luglio 2024' } });
const attesa = 'Foto di Dietro il testo';
if (!buona.html.includes(attesa) || !buona.html.includes('Arena di Verona, 12 luglio 2024')) { ko++; console.log('KO   didascalia sbagliata'); }
else console.log('ok   didascalia: contiene credito, concerto e data, e nessun nome di persona');
if (/licenz/i.test(buona.html)) { ko++; console.log('KO   la foto propria non deve dichiarare una licenza'); }
console.log(ko === 0 ? '\nTutti i controlli passati.' : `\n${ko} controlli falliti.`);
process.exit(ko ? 1 : 0);
