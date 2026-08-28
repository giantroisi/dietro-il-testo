#!/usr/bin/env node
// F65: il motore della routine di completamento (ROADMAP.md, sezione 12).
// Legge dati/*.json e produce dati/lacune.json: la coda di ciò che manca
// nelle pagine che già esistono, ordinata per classi — non per punteggio,
// che sulla sezione 11 si è già dimostrato inaffidabile su questi stessi dati.
//
// Uso: node scripts/lacune.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { dettagliCompletezza } from './genera/pagine.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const canzoni = JSON.parse(readFileSync(join(ROOT, 'dati', 'canzoni.json'), 'utf8'));
const artisti = JSON.parse(readFileSync(join(ROOT, 'dati', 'artisti.json'), 'utf8'));
// Scritto da genera-sito.mjs: le voci album già disambiguate (F51/F53), con
// `nCanzoni` e `sintetico` già calcolati — questo script non reimplementa
// quella logica, la legge.
const percorsoAlbumComputati = join(ROOT, 'dati', 'album-computati.json');
if (!existsSync(percorsoAlbumComputati)) {
  console.error('Manca dati/album-computati.json: esegui prima node scripts/genera-sito.mjs');
  process.exit(1);
}
const albumComputati = JSON.parse(readFileSync(percorsoAlbumComputati, 'utf8'));

const artistiPerSlug = new Map(artisti.map((a) => [a.slug, a]));

// -------------------------------------------------------------- C1: struttura

const voci = [];

// C1a: le copertine già scritte, senza un campo fonte proprio (P2).
for (const al of albumComputati) {
  if (!al.copertina) continue;
  voci.push({
    id: `album:${al.artistaSlug}:${al.slug}:fonte-copertina`,
    classe: 'C1',
    tipo: 'fonte-copertina-mancante',
    soggetto: `${al.artistaSlug}/${al.slug}`,
    raccoglie: al.nCanzoni,
  });
}

// C1b: voci nell'array `album` di un artista che non sono album (solo `nota`,
// senza `slug` né `titolo`) — vanno spostate in un campo proprio dell'artista.
for (const a of artisti) {
  let indice = 0;
  for (const d of a.album || []) {
    if (d.slug || d.titolo) continue;
    voci.push({
      id: `artista:${a.slug}:nota-carriera:${indice}`,
      classe: 'C1',
      tipo: 'nota-da-separare',
      soggetto: a.slug,
      raccoglie: 0,
    });
    indice++;
  }
}

// C1c: una fonte con ruolo "ascolti" ma senza il valore numerico corrispondente.
for (const c of canzoni) {
  const haFonteAscolti = (c.fonti || []).some((f) => f.ruolo === 'ascolti');
  if (haFonteAscolti && !c.ascolti) {
    voci.push({
      id: `canzone:${c.slug}:fonte-ascolti-orfana`,
      classe: 'C1',
      tipo: 'fonte-ascolti-orfana',
      soggetto: c.slug,
      raccoglie: 1,
    });
  }
}

// C1d: le schede canzone ancora sotto lo standard 4A (residuo di F5/F39).
for (const c of canzoni) {
  const d = dettagliCompletezza(c);
  if (!d.completa) {
    voci.push({
      id: `canzone:${c.slug}:completezza`,
      classe: 'C1',
      tipo: 'scheda-incompleta',
      soggetto: c.slug,
      raccoglie: 1,
      // non è editoriale, ma vale la pena portarsi dietro cosa manca
      manca: d.manca,
    });
  }
}

// ------------------------------------------------------- C2: storie d'artista

for (const a of artisti) {
  if (a.storia) continue;
  voci.push({
    id: `artista:${a.slug}:storia`,
    classe: 'C2',
    tipo: 'storia-artista',
    soggetto: a.slug,
    raccoglie: a.canzoni.length,
  });
}

// --------------------------------------------------------- C3: discografie

for (const a of artisti) {
  const haDiscografiaReale = (a.album || []).some((d) => d.slug);
  if (haDiscografiaReale) continue;
  voci.push({
    id: `artista:${a.slug}:discografia`,
    classe: 'C3',
    tipo: 'discografia-artista',
    soggetto: a.slug,
    raccoglie: a.canzoni.length,
  });
}

// ------------------------------------------------- C4/C5: copertine di album

// C4: album REALI (non sintetici — cioè non nati solo perché una canzone
// citava un album assente dalla discografia dichiarata, F51) con almeno una
// canzone raccontata e senza copertina: la copertina qui fa entrare la
// pagina nell'indice (secondo gradino di F50), o arricchisce una pagina già
// indicizzabile. Verificato sui dati reali: 46, non i 46 "a occhio" del
// testo — coincidono, ma solo escludendo esplicitamente le voci sintetiche.
for (const al of albumComputati) {
  if (al.copertina || al.sintetico || al.nCanzoni < 1) continue;
  voci.push({
    id: `album:${al.artistaSlug}:${al.slug}:copertina`,
    classe: 'C4',
    tipo: 'copertina-album',
    soggetto: `${al.artistaSlug}/${al.slug}`,
    raccoglie: al.nCanzoni,
  });
}

// C5: le restanti — nessuna canzone raccontata (per costruzione le voci
// sintetiche hanno sempre almeno una canzone, quindi non compaiono qui: sono
// escluse anche da C5, in attesa che C3 dia loro un'identità reale). Qui la
// copertina fa *esistere* la pagina, non la fa entrare nell'indice.
for (const al of albumComputati) {
  if (al.copertina || al.nCanzoni !== 0) continue;
  voci.push({
    id: `album:${al.artistaSlug}:${al.slug}:copertina`,
    classe: 'C5',
    tipo: 'copertina-album',
    soggetto: `${al.artistaSlug}/${al.slug}`,
    raccoglie: al.nCanzoni,
  });
}

// -------------------------------------------------------- C6: dati secondari

for (const c of canzoni) {
  if (c.ascolti) continue;
  voci.push({
    id: `canzone:${c.slug}:ascolti`,
    classe: 'C6',
    tipo: 'ascolti-canzone',
    soggetto: c.slug,
    raccoglie: 1,
  });
}

for (const c of canzoni) {
  if (c.spotifyId) continue;
  voci.push({
    id: `canzone:${c.slug}:spotify-id`,
    classe: 'C6',
    tipo: 'spotify-id-canzone',
    soggetto: c.slug,
    raccoglie: 1,
  });
}

// Le voci già dichiarate irrisolvibili nascono `accertato-assente`, non
// `da-cercare`: farle ripartire da capo rifarebbe una ricerca già fatta e
// già dichiarata (F39, 25 agosto 2026) — esattamente ciò che questo stato
// esiste per impedire. Seminato qui, non nel file precedente, perché al
// primo avvio di questo script non esiste ancora nessun file da cui ereditarlo.
const MOTIVO_SOUND_OF_SILENCE =
  "due registrazioni esistono (acustica 1964, elettrica 1965); le uniche versioni trovate su Spotify provengono da raccolte diverse con lo stesso identico numero di ascolti, nessuna dall'album originale — dubbio reale non risolto per non indovinare (P1, F39 chiuso il 25 agosto 2026)";
const SEMI_ACCERTATO_ASSENTE = {
  // Lo stesso fatto (spotifyId assente) genera due voci in due classi
  // diverse (C1 dallo standard 4A, C6 dal controllo dedicato): entrambe
  // vanno seminate, altrimenti una delle due tornerebbe `da-cercare` e
  // rifarebbe una ricerca già fatta e già dichiarata.
  'canzone:the-sound-of-silence:completezza': MOTIVO_SOUND_OF_SILENCE,
  'canzone:the-sound-of-silence:spotify-id': MOTIVO_SOUND_OF_SILENCE,
};

// --------------------------------------------------- ordinamento per classi

const ORDINE_CLASSI = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
function slugDi(v) {
  // per l'ordinamento a parità di `raccoglie`: id è già deterministico.
  return v.id;
}
voci.sort((a, b) => {
  const ca = ORDINE_CLASSI.indexOf(a.classe);
  const cb = ORDINE_CLASSI.indexOf(b.classe);
  if (ca !== cb) return ca - cb;
  if (b.raccoglie !== a.raccoglie) return b.raccoglie - a.raccoglie;
  return slugDi(a).localeCompare(slugDi(b), 'it');
});

// ------------------------------------------------- fusione con lo stato precedente

// F65: la coda è ripetibile, non circolare. Una voce già `fatto`,
// `accertato-assente` o `sospeso` non torna `da-cercare` solo perché lo
// script è stato rilanciato — lo stato si porta dietro dal file precedente,
// identificato dallo stesso `id`. Solo le voci mai viste prima nascono
// `da-cercare`.
const percorsoLacune = join(ROOT, 'dati', 'lacune.json');
const precedenti = existsSync(percorsoLacune) ? JSON.parse(readFileSync(percorsoLacune, 'utf8')) : [];
const precedentiPerId = new Map(precedenti.map((v) => [v.id, v]));

const coda = voci.map((v) => {
  // Il seme ha priorità sul file precedente: rappresenta un fatto già
  // accertato una volta per tutte, non va lasciato `da-cercare` solo perché
  // la voce esisteva già nella coda prima che il seme fosse aggiunto qui.
  if (SEMI_ACCERTATO_ASSENTE[v.id]) {
    return { ...v, stato: 'accertato-assente', ultimoTentativo: '2026-08-25', motivo: SEMI_ACCERTATO_ASSENTE[v.id] };
  }
  const prima = precedentiPerId.get(v.id);
  if (prima) {
    return { ...v, stato: prima.stato, ultimoTentativo: prima.ultimoTentativo, motivo: prima.motivo };
  }
  return { ...v, stato: 'da-cercare', ultimoTentativo: null, motivo: null };
});

writeFileSync(percorsoLacune, JSON.stringify(coda, null, 2) + '\n', 'utf8');

// -------------------------------------------------------------- riepilogo

// F67: il debito aperto conta solo le voci mai tentate (ultimoTentativo
// null) delle classi C1-C4 — non C5 né C6, che esploderanno quando C3 si
// completa e non sono la priorità.
const debitoAperto = coda.filter((v) => ['C1', 'C2', 'C3', 'C4'].includes(v.classe) && v.ultimoTentativo === null).length;

console.log(`Debito aperto (C1-C4, mai tentate): ${debitoAperto}`);
console.log(debitoAperto > 50 ? '  -> sopra soglia 50: niente contenuti nuovi (F67)' : '  -> sotto soglia 50: si può aggiungere contenuto già conforme');
console.log('');
for (const classe of ORDINE_CLASSI) {
  const delleClasse = coda.filter((v) => v.classe === classe);
  const daCercare = delleClasse.filter((v) => v.stato === 'da-cercare').length;
  const fatto = delleClasse.filter((v) => v.stato === 'fatto').length;
  const assente = delleClasse.filter((v) => v.stato === 'accertato-assente').length;
  const sospeso = delleClasse.filter((v) => v.stato === 'sospeso').length;
  console.log(`${classe}: ${delleClasse.length} totali — ${daCercare} da cercare, ${fatto} fatte, ${assente} accertate assenti, ${sospeso} sospese`);
}
console.log('');
console.log(`Voci totali in coda: ${coda.length}`);
console.log(`Scritto: ${percorsoLacune.replace(ROOT + '/', '')}`);
