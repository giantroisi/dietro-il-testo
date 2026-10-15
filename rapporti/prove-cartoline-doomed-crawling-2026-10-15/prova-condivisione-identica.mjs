import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import crypto from 'node:crypto';
const root=new URL('../../',import.meta.url).pathname.replace(/\/$/,'');
const js=fs.readFileSync(root+'/sito/ricerca.js','utf8');const start=js.indexOf("  var cartolina = document.querySelector('[data-cartolina]');"),end=js.indexOf('  /* ------------------------------------------------------ filtri archivio */');assert(start>0&&end>start);const code=js.slice(start,end);const registry=JSON.parse(fs.readFileSync(root+'/dati/pillole.json'));let proofs=[];
const selected=JSON.parse(fs.readFileSync(root+'/rapporti/prove-cartoline-doomed-crawling-2026-10-15/slugs.json'));assert.equal(selected.length,2);
for(const slug of selected){const p=registry[slug];
 const bytes=fs.readFileSync(root+'/pillole/'+p.file),url='../../pillole/'+p.file+'?v='+p.sha256.slice(0,12);
 for(const scenario of ['share','download','cancel','fetch-error','loading']){
  const handlers={},notes={textContent:''};let shared=null,download=null,fetches=0;
  const buttons=['storia','reel','post'].map(k=>({getAttribute:()=>k,addEventListener:(event,fn)=>handlers[k]=fn}));
  const attrs={'data-cartolina-storia':url,'data-slug':slug,'data-titolo':slug};
  const cartolina={getAttribute:k=>attrs[k],querySelector:s=>s==='[data-cartolina-nota]'?notes:null,querySelectorAll:()=>buttons};
  const sandbox={URL,File,Blob,Uint8Array,document:{querySelector:()=>cartolina,body:{appendChild:()=>{},removeChild:()=>{}},createElement:t=>{assert.equal(t,'a');return {click(){download={url:this.href,name:this.download}}}}},Image:function(){},location:{href:'http://127.0.0.1:8935/canzone/'+slug+'/',origin:'http://127.0.0.1:8935'},navigator:{canShare:()=>scenario==='share'||scenario==='cancel',share:async payload=>{shared=payload.files[0];if(scenario==='cancel')throw Error('annullata')}},fetch:async u=>{fetches++;assert.equal(u,'http://127.0.0.1:8935/pillole/'+p.file+'?v='+p.sha256.slice(0,12));if(scenario==='loading')return new Promise(()=>{});if(scenario==='fetch-error')throw Error('offline');return {ok:true,blob:async()=>new Blob([bytes],{type:'image/jpeg'})}}};
  vm.runInNewContext(code,sandbox);await new Promise(r=>setImmediate(r));handlers.storia();await new Promise(r=>setImmediate(r));
  if(scenario==='share'||scenario==='cancel'){assert(shared);assert.equal(crypto.createHash('sha256').update(Buffer.from(await shared.arrayBuffer())).digest('hex'),p.sha256);assert.equal(shared.type,'image/jpeg');assert.equal(shared.name,p.file);assert.equal(download,null);if(scenario==='cancel')assert.equal(notes.textContent,'Condivisione annullata.');}
  else if(scenario==='loading'){assert.equal(download,null);assert.match(notes.textContent,/Sto ancora caricando/);}
  else{assert.deepEqual(download,{url,name:p.file});assert.equal(shared,null);}
  assert.equal(fetches,1);proofs.push({slug,scenario,ok:true});
 }
}
fs.writeFileSync(new URL('./condivisione.json',import.meta.url),JSON.stringify(proofs,null,2));console.log('OK: 5 percorsi, file condiviso identico byte per byte, download stesso URL, attesa caricamento, fallback offline e annullamento rispettati.');
