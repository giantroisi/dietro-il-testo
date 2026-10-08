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

const configPath=root+'dati/affiliazioni.json', savedConfig=readFileSync(configPath,'utf8');
try {
 writeFileSync(configPath,JSON.stringify({trackingId:''}));
 const result=spawnSync(process.execPath,['--input-type=module','-e',`import assert from 'node:assert/strict'; import { TRACKING_ID_AMAZON, amazonPerScheda } from './scripts/genera/affiliazioni.mjs'; assert.equal(TRACKING_ID_AMAZON,''); assert.equal(amazonPerScheda('${slug}'),'');`],{cwd:root,encoding:'utf8'});
 assert.equal(result.status,0,result.stderr); console.log('OK: ID vuoto disattiva il prodotto configurato');
}finally{writeFileSync(configPath,savedConfig);}
