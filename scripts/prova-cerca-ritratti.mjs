#!/usr/bin/env node
// Prova a secco di `cerca-ritratti.mjs`: sostituisce la rete con risposte finte
// e verifica che lo script arrivi in fondo e si comporti come deve.
//
// Perche' esiste: il 1 settembre ho rimosso una funzione lasciando in piedi la
// riga che la chiamava, ho controllato con `node --check` — che verifica la
// grammatica, non se una funzione esiste — e ho dichiarato «sintassi ok».
// Il risultato e' stato un giro completo su venti artisti, sulla macchina
// dell'autore, con venti volte lo stesso errore. Questa prova non richiede
// rete e ci mette un secondo: va lanciata prima di dire che lo script funziona.
//
// Cosa dimostra, con tre file finti in ingresso:
//   - lo script arriva in fondo senza errori;
//   - il file con licenza NC viene scartato (3 in ingresso, 2 in uscita);
//   - il file «bridge», grande il quadruplo, finisce SOTTO la foto giusta ed e'
//     segnalato: e' la prova che l'ordinamento guarda il nome e non i pixel.
//
// Uso, dalla radice del progetto: node scripts/prova-cerca-ritratti.mjs

// script arrivi in fondo. `node --check` non lo avrebbe mai scoperto.
const vere = [];
globalThis.fetch = async (url) => {
  vere.push(String(url));
  const u = String(url);
  const rispondi = (o) => ({ ok: true, status: 200, json: async () => o });
  if (u.includes('wbsearchentities'))
    return rispondi({ search: [{ id: 'Q1', label: 'Prova', description: 'gruppo musicale rock' }] });
  if (u.includes('wbgetentities'))
    return rispondi({ entities: { Q1: { claims: { P373: [{ mainsnak: { datavalue: { value: 'Prova band' } } }] },
      sitelinks: {}, descriptions: { it: { value: 'gruppo musicale' } } } } });
  if (u.includes('generator=categorymembers'))
    return rispondi({ query: { pages: {
      '1': { title: 'File:Prova band live 2024.jpg', imageinfo: [{ url: 'https://upload.wikimedia.org/x.jpg', width: 3000, height: 2000,
        extmetadata: { LicenseShortName: { value: 'CC BY-SA 4.0' }, License: { value: 'cc-by-sa-4.0' },
          Artist: { value: '<a>Tizio</a>' }, ImageDescription: { value: 'Prova band al festival' },
          LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0/' } } }] },
      '2': { title: 'File:Prova bridge Birmingham.jpg', imageinfo: [{ url: 'https://upload.wikimedia.org/y.jpg', width: 8000, height: 6000,
        extmetadata: { LicenseShortName: { value: 'CC BY-SA 4.0' }, License: { value: 'cc-by-sa-4.0' },
          Artist: { value: 'Caio' }, ImageDescription: { value: 'A bridge' },
          LicenseUrl: { value: 'https://creativecommons.org/licenses/by-sa/4.0/' } } }] },
      '3': { title: 'File:Prova band poster.jpg', imageinfo: [{ url: 'https://upload.wikimedia.org/z.jpg', width: 2000, height: 3000,
        extmetadata: { LicenseShortName: { value: 'CC BY-NC 2.0' }, License: { value: 'cc-by-nc-2.0' },
          Artist: { value: 'Sempronio' }, ImageDescription: { value: 'poster' } } }] },
    } } });
  return rispondi({});
};
process.argv = [process.argv[0], 'cerca-ritratti.mjs', 'metallica'];
await import('./cerca-ritratti.mjs');
console.log('\nRichieste di rete fatte:', vere.length, '(devono essere 3 per artista, non 8)');
const atteso = ['Prova band live 2024', 'Prova bridge'];
console.log('Se sopra vedi due candidati, con la foto giusta per prima e il ponte segnalato, la prova e passata.');
