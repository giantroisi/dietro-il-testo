#!/usr/bin/env node
// Verifica che il controllo blocchi regressioni reali nell'HTML generato.
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url).pathname;
const config=JSON.parse(readFileSync(root+'dati/affiliazioni.json','utf8'));
const products=JSON.parse(readFileSync(root+'dati/affiliazioni-prodotti.json','utf8'));
const slug=Object.keys(products)[0];
if(!config.trackingId||!slug){console.log('Nessun prodotto attivo: verifica negativa non applicabile.');process.exit(0);}
const page=root+`sito/${slug}/index.html`,original=readFileSync(page,'utf8');
const check=()=>spawnSync(process.execPath,[root+'scripts/check-affiliazioni.mjs'],{encoding:'utf8'});
assert.equal(check().status,0,'Il sito di partenza deve essere conforme');
const mutations=[
 ['tag errato',s=>s.replaceAll(`tag=${config.trackingId}`,'tag=errato-21')],
 ['tag assente',s=>s.replaceAll(`tag=${config.trackingId}`,'altro=senza-tag')],
 ['rel incompleto',s=>s.replace('rel="sponsored nofollow noopener"','rel="noopener"')],
 ['avviso assente',s=>s.replace('Link affiliato: potremmo ricevere una commissione senza costi aggiuntivi per te','')],
 ...(Object.values(products).length>1 ? [['altro album verificato ma non pertinente',s=>s.replaceAll(Object.values(products)[0].href.replaceAll('&','&amp;'),Object.values(products)[1].href.replaceAll('&','&amp;'))]] : []),
 ['link non dichiarato',s=>s.replace('class="acquisto-affiliato"','class="altro"')],
];
try {
 for(const [name,mutate]of mutations){const changed=mutate(original);assert.notEqual(changed,original);writeFileSync(page,changed);assert.notEqual(check().status,0,`Controllo non blocca ${name}`);console.log(`OK: bloccato ${name}`);}
}finally{writeFileSync(page,original);}
assert.equal(check().status,0,'HTML ripristinato deve passare');

// La pagina artista può mostrare più album: devono restare nelle posizioni
// scelte e appartenere al gruppo corretto, anche se un altro URL è verificato.
const artistChoices=JSON.parse(readFileSync(root+'dati/affiliazioni-artisti.json','utf8'));
const artistEntry=Object.entries(artistChoices).find(([,keys])=>new Set(keys).size>1);
if(artistEntry){
 const [artist,keys]=artistEntry;
 const artistPage=root+`sito/artista/${artist}/index.html`,saved=readFileSync(artistPage,'utf8');
 const escapeHref=s=>s.replaceAll('&','&amp;');
 const foreign=Object.entries(products).find(([key])=>!key.startsWith(`album/${artist}/`))[1];
 const artistMutations=[
  ['vinile di un altro artista',s=>s.replace(escapeHref(products[keys[0]].href),escapeHref(foreign.href))],
  ['album corretto nella posizione sbagliata',s=>s.replace(escapeHref(products[keys[0]].href),escapeHref(products[keys[1]].href))],
  ['posizione artista duplicata',s=>s.replace('data-acquisto-posizione="immagine"','data-acquisto-posizione="storia"')],
 ];
 try{
  for(const [name,mutate]of artistMutations){const changed=mutate(saved);assert.notEqual(changed,saved);writeFileSync(artistPage,changed);assert.notEqual(check().status,0,`Controllo non blocca ${name}`);console.log(`OK: bloccato ${name}`);}
 }finally{writeFileSync(artistPage,saved);}
 assert.equal(check().status,0,'Pagina artista ripristinata deve passare');
}

// Un CD deve restare riconoscibile e avere una ricerca del vinile documentata.
const cdEntry=Object.entries(products).find(([,p])=>p.formato==='CD');
if(cdEntry){
 const [cdKey,cd]=cdEntry;
 const cdPage=root+`sito/${cdKey}/index.html`,savedCdPage=readFileSync(cdPage,'utf8');
 const catalogPath=root+'dati/affiliazioni-prodotti.json',savedCatalog=readFileSync(catalogPath,'utf8');
 try{
  const mislabeled=savedCdPage.replace('·</span> CD</p>','·</span> Vinile</p>');
  assert.notEqual(mislabeled,savedCdPage);writeFileSync(cdPage,mislabeled);
  assert.notEqual(check().status,0,'Controllo non blocca CD etichettato Vinile');
  console.log('OK: bloccato CD etichettato Vinile');writeFileSync(cdPage,savedCdPage);
  for(const [name,change]of [
   ['CD senza ricerca del vinile',p=>({...p,provaRicercaVinile:''})],
   ['formato non autorizzato',p=>({...p,formato:'Audio Cassetta'})],
  ]){
   writeFileSync(catalogPath,JSON.stringify({...products,[cdKey]:change(cd)}));
   assert.notEqual(check().status,0,`Controllo non blocca ${name}`);console.log(`OK: bloccato ${name}`);
  }
 }finally{writeFileSync(cdPage,savedCdPage);writeFileSync(catalogPath,savedCatalog);}
 assert.equal(check().status,0,'CD e catalogo ripristinati devono passare');
}

const configPath=root+'dati/affiliazioni.json', savedConfig=readFileSync(configPath,'utf8');
try {
 writeFileSync(configPath,JSON.stringify({trackingId:''}));
 const result=spawnSync(process.execPath,['--input-type=module','-e',`import assert from 'node:assert/strict'; import { TRACKING_ID_AMAZON, amazonPerScheda, amazonPerArtista, informativaAmazonPerScheda } from './scripts/genera/affiliazioni.mjs'; assert.equal(TRACKING_ID_AMAZON,''); assert.equal(amazonPerScheda('${slug}'),''); for(const posizione of ['immagine','storia','album','canzoni'])assert.equal(amazonPerArtista('blink-182',posizione),''); assert.equal(informativaAmazonPerScheda('artista/blink-182'),'');`],{cwd:root,encoding:'utf8'});
 assert.equal(result.status,0,result.stderr); console.log('OK: ID vuoto disattiva il prodotto configurato');
}finally{writeFileSync(configPath,savedConfig);}
