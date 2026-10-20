#!/usr/bin/env node
// E2E in repository effimeri: firme e pubblicazioni sono SOLO fixture.
// Il controller è importato da fuori il checkout attaccabile.
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import assert from 'node:assert/strict';import {execFileSync,spawnSync} from 'node:child_process';
import {generateKeyPairSync,sign} from 'node:crypto';import {fileURLToPath} from 'node:url';
import {creaAutorita,propostaPromozione,inviaIndexNow,sha} from './genera/autorita.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'dit-fiducia-'));
let repo=path.join(temp,'repo');fs.mkdirSync(repo);const evidence=process.argv.includes('--prove')?path.resolve(process.argv[process.argv.indexOf('--prove')+1]):null;
if(evidence)fs.mkdirSync(evidence,{recursive:true});const report={casi:[],firme:'solo chiavi effimere di test',reteReale:0};
const json=x=>JSON.stringify(x,null,2)+'\n';const bytes=n=>fs.readFileSync(path.join(repo,n));const read=n=>bytes(n).toString();const write=(n,b)=>{const f=path.join(repo,n);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,b);};
const git=(...a)=>execFileSync('git',['-C',repo,...a],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const commit=message=>{git('add','-A');git('-c','user.name=Fixture','-c','user.email=fixture@example.invalid','commit','-m',message);return git('rev-parse','HEAD');};
const {publicKey,privateKey}=generateKeyPairSync('ed25519');const pem=publicKey.export({type:'spki',format:'pem'});let anchor;
const authority=()=>creaAutorita({root:repo,ancora:anchor});
const ok=(nome,detail={})=>report.casi.push({nome,esito:'passato',...detail});
const checked=(fn,pattern)=>assert.throws(fn,pattern);
const routeFiles=()=>JSON.parse(read('dati/pagine-seo.json')).map(x=>x.percorso.endsWith('.html')?x.percorso:x.percorso+'index.html');
const emptyContents=()=>({versione:1,pagine:[],cartoline:[]});
function rawBuild(contents,tag){
 const f=path.join(temp,'draft-'+tag+'.json'),out=path.join(temp,'output-'+tag);fs.writeFileSync(f,json(contents));
 const child=spawnSync(process.execPath,['scripts/genera-sito.mjs','--out',path.relative(repo,out),'--lotto',f],{cwd:repo,encoding:'utf8',maxBuffer:16*1024*1024});assert.equal(child.status,0,child.stderr||child.stdout);return out;
}
function approve(m,{sameCommit=false,mutate=null,key=privateKey,actions=['build','promuovi']}={}){
 const prev=git('rev-parse','HEAD'),raw=json(m),id=sha(raw),file=`lotti/${id}.json`;
 const payload={versione:1,parent:prev,manifesto:id,azioni:actions};const record={payload,firma:sign(null,Buffer.from(JSON.stringify(payload)),key).toString('base64')};
 write(file,raw);write(`approvazioni-lotti/${id}.json`,json(record));if(mutate)mutate();const base=commit(sameCommit?'fixture self approval':'fixture approvazione precedente');return{base,file,id};
}
function prepareDraft(contents,inputNames,tag){
 const out=rawBuild(contents,tag),proposal=propostaPromozione({root:repo,out,contenuti:contents});
 const data=Object.fromEntries(inputNames.map(n=>[n,bytes(n)]));
 const m={versione:2,id:tag,contenuti:contents,files:Object.fromEntries(inputNames.map(n=>[n,sha(data[n])])),strutturali:{},promozione:{files:proposal.files}};
 return {out,m,data};
}
function restore(names,base){for(const n of names){let old;try{old=execFileSync('git',['-C',repo,'show',`${base}:${n}`],{stdio:['ignore','pipe','pipe']});}catch{}if(old)write(n,old);else fs.rmSync(path.join(repo,n),{force:true});}}
function cycle(draft,approval,tag){
 for(const[n,b]of Object.entries(draft.data))write(n,b);
 const out=path.join(temp,'trusted-'+tag);const a=authority();a.build({base:approval.base,manifesto:approval.file,out});a.sigillaPreparazione({base:approval.base,manifesto:approval.file,out});
 const prepared=commit('fixture lotto preparato '+tag);a.promuovi({base:approval.base,manifesto:approval.file,out});const promoted=commit('fixture promozione autorizzata '+tag);
 assert.equal(git('status','--porcelain'),'');return{prepared,promoted,out};
}
function emptyBuild(base,tag){const out=path.join(temp,'empty-'+tag);authority().build({base,out});for(const n of [...routeFiles(),...fs.readdirSync(repo).filter(n=>/^sitemap.*\.xml$/.test(n))])assert.deepEqual(fs.readFileSync(path.join(out,n)),bytes(n));assert.equal(git('status','--porcelain'),'');return out;}
try{
 for(const d of ['scripts','dati','pillole'])fs.cpSync(path.join(root,d),path.join(repo,d),{recursive:true});
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'dati/pagine-seo.json')));
 for(const n of [...manifest.map(x=>x.percorso.endsWith('.html')?x.percorso:x.percorso+'index.html'),...fs.readdirSync(root).filter(n=>/^sitemap.*\.xml$/.test(n)),'ricerca.js'])write(n,fs.readFileSync(path.join(root,n)));
 for(const d of ['og','ritratti'])fs.cpSync(path.join(root,d),path.join(repo,d),{recursive:true});
 write('.gitignore','/sito\n');write('dati/indexnow.json',json({indexnow:'fixture-public-key'}));write('fixture-public-key.txt','fixture-public-key');
 const initialOut=rawBuild(emptyContents(),'bootstrap');write('ricerca.js',fs.readFileSync(path.join(initialOut,'ricerca.js')));
 git('init');const trusted=commit('fixture installazione proprietario');anchor={versione:1,commit:trusted,chiavePubblica:pem};
 emptyBuild(trusted,'iniziale');ok('base fidata pulita');
 // Cartolina solo per il test: bytes riusati, nessuna creazione editoriale.
 const songs=JSON.parse(read('dati/canzoni.json')),c=songs.find(x=>x.slug==='21-guns'),reg=JSON.parse(read('dati/pillole.json'));
 const image=bytes('pillole/'+Object.values(reg)[0].file);write('pillole/21-guns-storia.jpg',image);reg['21-guns']={artistaSlug:c.artistaSlug,testo:c.fraseIconica,dopoParagrafo:0,fonte:c.fonti[0].url,file:'21-guns-storia.jpg',sha256:sha(image),testoGrafica:'Fixture di promozione'};write('dati/pillole.json',json(reg));
 const contents={versione:1,pagine:['/canzone/21-guns/'],cartoline:[{slug:'21-guns',dato:'dati/pillole.json#21-guns',immagine:'pillole/21-guns-storia.jpg'}]};
 const d1=prepareDraft(contents,['dati/pillole.json','pillole/21-guns-storia.jpg'],'cartolina');restore(Object.keys(d1.data),trusted);
 // Nessun errore trasforma da solo questa proposta in approvazione.
 checked(()=>authority().promuovi({base:trusted,manifesto:'lotti/'+sha(json(d1.m))+'.json',out:d1.out}),/Manifesto assente/);ok('promozione senza approvazione bloccata');
 const a1=approve(d1.m),p1=cycle(d1,a1,'cartolina');ok('cartolina approvata e baseline promossa',{commitPreparato:p1.prepared,commitPromosso:p1.promoted});
 const clone=path.join(temp,'checkout-pulito');execFileSync('git',['clone','--quiet','--no-local',repo,clone],{stdio:['ignore','pipe','pipe']});repo=clone;
 emptyBuild(p1.promoted,'clone');ok('checkout pulito dopo promozione: lotto vuoto riuscito');
 // Nuovo lotto ordinario di soli link, nessuna approvazione strutturale globale.
 const links=JSON.parse(read('dati/collegamenti-contestuali.json'));links['basket-case']={artistaSlug:'green-day',destinazioni:['21-guns'],prima:'Fixture: ',dopo:'.',dopoParagrafo:0};write('dati/collegamenti-contestuali.json',json(links));
 const inner={versione:1,pagine:['/canzone/basket-case/'],cartoline:[]};const d2=prepareDraft(inner,['dati/collegamenti-contestuali.json'],'link');restore(Object.keys(d2.data),p1.promoted);const a2=approve(d2.m);assert.deepEqual(a2&&d2.m.strutturali,{});const p2=cycle(d2,a2,'link');emptyBuild(p2.promoted,'secondo');ok('nuovo link dopo commit pulito, nessun residuo cartolina o consenso globale');
 for(const n of ['dati/baseline-generatore.json','scripts/genera/perimetro.mjs','scripts/genera-sito.mjs','scripts/test-generatore-perimetro.mjs','dati/policy-lotti.json']){
  const old=bytes(n);write(n,Buffer.concat([old,Buffer.from('\nfixture manomissione\n')]));const out=path.join(temp,'vietato-'+sha(n));checked(()=>authority().build({base:p2.promoted,out}),/Modifiche senza manifesto/);assert(!fs.existsSync(out));write(n,old);ok('manomissione non autorizzata bloccata: '+n);
 }
 const hidden='scripts/genera/perimetro.mjs',hiddenBytes=bytes(hidden);git('update-index','--assume-unchanged',hidden);write(hidden,Buffer.concat([hiddenBytes,Buffer.from('\n// nascosto\n')]));checked(()=>authority().build({base:p2.promoted,out:path.join(temp,'hidden')}),/Modifiche senza manifesto/);write(hidden,hiddenBytes);git('update-index','--no-assume-unchanged',hidden);ok('assume-unchanged non nasconde una modifica al gate');
 const mfile=a2.file,oldManifest=bytes(mfile);write(mfile,Buffer.concat([oldManifest,Buffer.from(' ')]));checked(()=>authority().verifica(p2.promoted,mfile),/Manifesto modificato/);write(mfile,oldManifest);ok('digest esatto del manifesto protetto');
 const victim='scripts/test-generatore-perimetro.mjs',newCode=Buffer.concat([bytes(victim),Buffer.from('\n// fixture struttura\n')]);
 const structural={versione:2,id:'self',contenuti:emptyContents(),files:{[victim]:sha(newCode)},strutturali:{[victim]:sha(newCode)},promozione:{files:{}}};
 const same=approve(structural,{sameCommit:true,mutate:()=>write(victim,newCode),actions:['build','promuovi','struttura']});checked(()=>authority().build({base:same.base,manifesto:same.file,out:path.join(temp,'self')}),/medesimo lotto/);ok('approvazione nel medesimo lotto bloccata anche con firma di fixture valida');git('checkout','--detach',p2.promoted);
 const stranger=generateKeyPairSync('ed25519');const wrong=approve({...structural,id:'chiave-falsa'},{key:stranger.privateKey,actions:['build','promuovi','struttura']});checked(()=>authority().build({base:wrong.base,manifesto:wrong.file,out:path.join(temp,'fake')}),/Firma del proprietario/);ok('chiave sostituita o consenso inventato nel manifesto non sufficienti');git('checkout','--detach',p2.promoted);
 const noStructure=approve({...structural,id:'senza-consenso-strutturale',strutturali:{}},{actions:['build','promuovi']});write(victim,newCode);checked(()=>authority().build({base:noStructure.base,manifesto:noStructure.file,out:path.join(temp,'no-structure')}),/approvazione strutturale/);restore([victim],noStructure.base);git('checkout','--detach',p2.promoted);ok('consenso editoriale non autorizza modifiche strutturali anche se il file è dichiarato');
 const validStructure=approve({...structural,id:'struttura-preapprovata'},{actions:['build','promuovi','struttura']});write(victim,newCode);const so=path.join(temp,'structure-ok');authority().build({base:validStructure.base,manifesto:validStructure.file,out:so});authority().sigillaPreparazione({base:validStructure.base,manifesto:validStructure.file,out:so});const sc=commit('fixture modifica strutturale con approvazione precedente');emptyBuild(sc,'struttura');ok('struttura con firma precedente valida, poi checkout pulito');git('checkout','--detach',p2.promoted);
 // Anche una promozione già approvata non autorizza rete.
 let calls=0,payload;const fakeFetch=async(url,request)=>{calls++;payload=JSON.parse(request.body);return{status:200};};
 assert.deepEqual(await inviaIndexNow({invia:false,fetchImpl:fakeFetch}),{rete:false,stato:'disabilitato'});
 await assert.rejects(inviaIndexNow({autorita:authority(),base:p2.promoted,invia:true,fetchImpl:fakeFetch}),/consenso/);assert.equal(calls,0);
 const cli=spawnSync(process.execPath,['scripts/indexnow.mjs'],{cwd:repo,encoding:'utf8'});assert.equal(cli.status,0);assert(cli.stdout.includes('nessuna rete'));assert(!cli.stdout.includes('fixture-public-key'));
 const all=spawnSync(process.execPath,['scripts/indexnow.mjs','--tutti'],{cwd:repo,encoding:'utf8'});assert.notEqual(all.status,0);ok('IndexNow default e senza consenso: zero rete e nessuna chiave mostrata');
 const urls=['https://www.dietroiltesto.it/canzone/basket-case/'],nonce='fixture-invio-approvato-0001';
 const consentPayload={versione:1,azione:'indexnow',manifesto:a2.file,digest:a2.id,commitPubblicato:p2.promoted,host:'www.dietroiltesto.it',urlDigest:sha(JSON.stringify(urls)),nonce};
 const consent={payload:consentPayload,firma:sign(null,Buffer.from(JSON.stringify(consentPayload)),privateKey).toString('base64')};const consentFile=`consensi-indexnow/${nonce}.json`;write(consentFile,json(consent));const withConsent=commit('fixture proprietario attesta pubblicazione e autorizza invio');
 await inviaIndexNow({autorita:authority(),base:withConsent,consenso:consentFile,invia:true,stato:path.join(temp,'stato'),fetchImpl:fakeFetch});assert.equal(calls,1);assert.deepEqual(payload.urlList,urls);assert(!payload.urlList.includes('https://www.dietroiltesto.it/canzone/21-guns/'));ok('invio simulato solo URL del secondo lotto, non tutti i lastmod odierni',{urlList:payload.urlList});
 await assert.rejects(inviaIndexNow({autorita:authority(),base:withConsent,consenso:consentFile,invia:true,stato:path.join(temp,'stato'),fetchImpl:fakeFetch}),/EEXIST/);assert.equal(calls,1);ok('consenso monouso, nessun reinvio autonomo');
 const protectedFile='dati/policy-lotti.json',before=bytes(protectedFile);write(protectedFile,Buffer.concat([before,Buffer.from(' ')]));await assert.rejects(inviaIndexNow({autorita:authority(),base:withConsent,consenso:consentFile,invia:true,stato:path.join(temp,'stato2'),fetchImpl:fakeFetch}),/Modifiche senza manifesto/);write(protectedFile,before);assert.equal(calls,1);ok('rete bloccata anche con consenso se checkout manomesso');
 report.controller='modulo fidato esterno al checkout della fixture';report.checkoutFinalePulito=git('status','--porcelain')==='';assert(report.checkoutFinalePulito);console.log(JSON.stringify(report,null,2));
}catch(e){report.errore=e.stack;throw e;}finally{fs.rmSync(temp,{recursive:true,force:true});report.fixtureRimosse=!fs.existsSync(temp);if(evidence)fs.writeFileSync(path.join(evidence,'risultati-autorita.json'),json(report));}
