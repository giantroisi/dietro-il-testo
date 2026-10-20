#!/usr/bin/env node
// Integrazione offline: tutte le modifiche editoriali e le immagini sono fixture
// in una cartella temporanea, mai proposte né artefatti pubblicabili.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dit-perimetro-'));
const work = path.join(temp, 'workspace');fs.mkdirSync(work);
const hash = b => createHash('sha256').update(b).digest('hex');
const report = { casi: [], dateSimulate: ['2026-10-20T12:00:00Z', '2030-01-01T12:00:00Z'] };
const arg = process.argv.indexOf('--prove');
const evidence = arg >= 0 ? path.resolve(process.argv[arg + 1]) : null;
if (evidence) fs.mkdirSync(evidence, { recursive: true });
const json = (n, v) => fs.writeFileSync(path.join(work, n), JSON.stringify(v, null, 2) + '\n');
const read = n => fs.readFileSync(path.join(work, n), 'utf8');
const source = n => fs.readFileSync(path.join(root, n), 'utf8');
const routes = [...new Set(JSON.parse(source('dati/pagine-seo.json')).map(x => x.percorso.endsWith('.html') ? x.percorso : x.percorso + 'index.html'))];
const clock = path.join(temp, 'clock.mjs');
fs.writeFileSync(clock, `const D=Date;const e=D.parse(process.env.DIT_TEST_DATE);globalThis.Date=class extends D{constructor(...a){super(...(a.length?a:[e]));}static now(){return e;}};`);
function inventory(dir) {
  const entries = [];
  function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const n = path.join(d, e.name);if (e.isDirectory()) walk(n);else entries.push([path.relative(dir, n), hash(fs.readFileSync(n))]);
  }}walk(dir);return entries.sort((a,b) => a[0].localeCompare(b[0]));
}
function reset() {
  for (const n of ['canzoni.json','pillole.json','collegamenti-contestuali.json']) fs.copyFileSync(path.join(root,'dati',n),path.join(work,'dati',n));
  fs.rmSync(path.join(work,'pillole'),{recursive:true,force:true});fs.cpSync(path.join(root,'pillole'),path.join(work,'pillole'),{recursive:true});
}
function run(name, { pages=[], cards=[], fail=null, targeted=false, noManifest=false, extra=[], date=report.dateSimulate[1] } = {}) {
  json('lotto-test.json', {versione:1,pagine:pages,cartoline:cards});
  const args=['--import',clock,'scripts/genera-sito.mjs','--out','sito'];
  if(!noManifest) args.push('--lotto',path.join(work,'lotto-test.json'));
  if(targeted) args.push('--solo-canzoni','21-guns');
  args.push(...extra);
  // Elimina soltanto l'output della fixture, così nessun residuo può simulare
  // sitemap riuscite dopo un caso che deve essere bloccato.
  fs.rmSync(path.join(work,'sito'),{recursive:true,force:true});
  const result=spawnSync(process.execPath,args,{cwd:work,encoding:'utf8',env:{...process.env,DIT_TEST_DATE:date},maxBuffer:8*1024*1024});
  const output=(result.stdout||'')+(result.stderr||'');
  if(evidence) fs.writeFileSync(path.join(evidence,name+'.log'),output);
  if(fail){assert.notEqual(result.status,0,name+': fallimento atteso');assert.match(output,fail,name);assert(!fs.existsSync(path.join(work,'sito/sitemap-canzoni.xml')),name+': sitemap scritta prima del blocco');}
  else assert.equal(result.status,0,name+'\n'+output);
  report.casi.push({nome:name,esito:'passato',uscita:result.status,bloccato:!!fail});
  return output;
}
function changedPages() { return routes.filter(n => read('sito/'+n)!==source(n)); }
function modifiedDates() { return routes.filter(n => JSON.stringify([...read('sito/'+n).matchAll(/"dateModified":"([^"]+)"/g)].map(x=>x[1]))!==JSON.stringify([...source(n).matchAll(/"dateModified":"([^"]+)"/g)].map(x=>x[1]))); }
function lastmods(xml) {return [...xml.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(x=>[x[1],x[2]]);}
const maps=fs.readdirSync(root).filter(n=>/^sitemap.*\.xml$/.test(n));
function assertOnlySong(slug) {
  const file='canzone/'+slug+'/index.html';assert.deepEqual(changedPages(),[file]);assert.deepEqual(modifiedDates(),[file]);
  for(const n of routes){assert.deepEqual([...read('sito/'+n).matchAll(/"datePublished":"([^"]+)"/g)].map(x=>x[1]),[...source(n).matchAll(/"datePublished":"([^"]+)"/g)].map(x=>x[1]));assert.equal(read('sito/'+n).match(/<link rel="canonical"[^>]*>/)?.[0],source(n).match(/<link rel="canonical"[^>]*>/)?.[0]);}
  for(const n of maps){const a=lastmods(source(n)),b=lastmods(read('sito/'+n));assert.deepEqual(a.map(x=>x[0]),b.map(x=>x[0]));const delta=a.filter((x,i)=>x[1]!==b[i][1]);assert.equal(delta.length,n==='sitemap-canzoni.xml'?1:0);if(delta.length)assert.equal(delta[0][0],'https://www.dietroiltesto.it/canzone/'+slug+'/');}
}
try {
  for(const n of ['scripts','dati','pillole']) fs.cpSync(path.join(root,n),path.join(work,n),{recursive:true});
  for(const n of [...routes,...maps]){const q=path.join(work,n);fs.mkdirSync(path.dirname(q),{recursive:true});fs.copyFileSync(path.join(root,n),q);}
  for(const n of ['og','ritratti']) fs.symlinkSync(path.join(root,n),path.join(work,n),'dir');
  run('01-generazione-invariata',{date:report.dateSimulate[0]});assert.deepEqual(changedPages(),[]);for(const n of maps) assert.equal(read('sito/'+n),source(n));const first=inventory(path.join(work,'sito'));
  run('02-generazione-giorno-diverso');assert.deepEqual(changedPages(),[]);for(const n of maps) assert.equal(read('sito/'+n),source(n));assert.deepEqual(inventory(path.join(work,'sito')),first);
  report.determinismo={file:first.length,html:routes.length,htmlModificati:0,datePublished:0,dateModified:0,lastmod:0,canonical:0,urlSitemap:0,sitemapByteIdentiche:maps.length};
  // Una cartolina sintetica: riusa bytes di una JPEG esistente esclusivamente
  // per provare il perimetro. Non è un'immagine nuova né un contenuto approvato.
  const songs=JSON.parse(read('dati/canzoni.json')),song=songs.find(c=>c.slug==='21-guns');
  const makeCard=()=>{const registry=JSON.parse(read('dati/pillole.json'));const bytes=fs.readFileSync(path.join(work,'pillole',Object.values(registry)[0].file));fs.writeFileSync(path.join(work,'pillole/21-guns-storia.jpg'),bytes);registry['21-guns']={artistaSlug:song.artistaSlug,testo:song.fraseIconica,dopoParagrafo:0,fonte:song.fonti[0].url,file:'21-guns-storia.jpg',sha256:hash(bytes),testoGrafica:'Fixture tecnica temporanea'};json('dati/pillole.json',registry);};
  const card={slug:'21-guns',dato:'dati/pillole.json#21-guns',immagine:'pillole/21-guns-storia.jpg'};
  makeCard();run('03-cartolina-prevista',{pages:['/canzone/21-guns/'],cards:[card]});assertOnlySong('21-guns');
  run('04-cartolina-senza-mandato',{fail:/Dato cartolina fuori lotto/});
  fs.appendFileSync(path.join(work,'pillole/mantra-storia.jpg'),'fixture');run('05-immagine-estranea-anche-mirato',{pages:['/canzone/21-guns/'],cards:[card],targeted:true,fail:/Immagine cartolina fuori lotto/});reset();
  makeCard();const registry=JSON.parse(read('dati/pillole.json'));registry.mantra.testoGrafica+=' fixture';json('dati/pillole.json',registry);run('06-dato-cartolina-estraneo',{pages:['/canzone/21-guns/'],cards:[card],fail:/Dato cartolina fuori lotto: mantra/});reset();
  const links=JSON.parse(read('dati/collegamenti-contestuali.json'));links['21-guns']={artistaSlug:song.artistaSlug,destinazioni:['basket-case'],prima:'Fixture di collegamento: ',dopo:'.',dopoParagrafo:0};json('dati/collegamenti-contestuali.json',links);
  run('07-collegamento-previsto',{pages:['/canzone/21-guns/']});assertOnlySong('21-guns');assert(read('sito/canzone/21-guns/index.html').includes('href="../../canzone/basket-case/"'));
  run('08-collegamento-senza-perimetro',{noManifest:true,fail:/Pagina fuori lotto: \/canzone\/21-guns\//});
  links['billie-jean']={artistaSlug:'michael-jackson',destinazioni:['beat-it'],prima:'Fixture di collegamento: ',dopo:'.',dopoParagrafo:0};json('dati/collegamenti-contestuali.json',links);run('09-seconda-sorgente-non-dichiarata',{pages:['/canzone/21-guns/'],fail:/Pagina fuori lotto: \/canzone\/billie-jean\//});reset();
  const changed=JSON.parse(read('dati/canzoni.json'));changed.find(c=>c.slug==='youngblood').corpo[0]='Fixture tecnica diversa. '+changed.find(c=>c.slug==='youngblood').corpo[0];json('dati/canzoni.json',changed);run('10-effetto-derivato-non-dichiarato',{pages:['/canzone/youngblood/'],fail:/Pagina fuori lotto: \/(?!canzone\/youngblood\/)/});reset();
  run('11-perimetro-sovradichiarato',{pages:['/canzone/21-guns/'],fail:/Perimetro lotto non esatto/});
  const many=JSON.parse(read('dati/canzoni.json'));const selected=many.filter(c=>c.fraseIconica).slice(0,51);for(const c of selected)c.corpo[c.corpo.length-1]+=' Fixture tecnica del limite.';json('dati/canzoni.json',many);run('12-limite-51-anche-con-lista-esatta',{pages:selected.map(c=>'/canzone/'+c.slug+'/'),fail:/Variazione massiva del catalogo: 51 pagine, limite 50/});reset();
  run('13-deroga-numerica-rifiutata',{extra:['--impatto-atteso=353'],fail:/Deroga quantitativa non ammessa/});
  // Esegue solo i due frammenti puri delle guardie, mai lo script IndexNow,
  // né le parti che leggono chiave, inviano richieste o aggiornano registri.
  const ix=source('scripts/indexnow.mjs');const logs=[];const box={process:{argv:['node','fixture','--tutti'],exit:n=>{throw new Error('EXIT:'+n);}},console:{error:s=>logs.push(s)}};vm.createContext(box);
  assert.throws(()=>vm.runInContext(ix.slice(ix.indexOf('const tutti'),ix.indexOf('// La chiave sta')),box),/EXIT:1/);assert(logs.some(s=>s.includes('disabilitato')));
  const box2={indirizzi:Array(51).fill('fixture'),process:{exit:n=>{throw new Error('EXIT:'+n);}},console:{error:s=>logs.push(s)}};vm.createContext(box2);assert.throws(()=>vm.runInContext(ix.slice(ix.indexOf('const LIMITE_URL'),ix.indexOf('console.log(`Indirizzi')),box2),/EXIT:1/);
  report.casi.push({nome:'14-guardie-indexnow-isolate',esito:'passato',nessunaEsecuzioneIndexNow:true,nessunaRete:true});
  console.log(JSON.stringify(report,null,2));
} finally {
  fs.rmSync(temp,{recursive:true,force:true});report.outputTemporaneiRimossi=!fs.existsSync(temp);
  if(evidence)fs.writeFileSync(path.join(evidence,'risultati.json'),JSON.stringify(report,null,2)+'\n');
}
