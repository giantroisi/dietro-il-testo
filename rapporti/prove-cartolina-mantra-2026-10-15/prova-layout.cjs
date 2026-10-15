'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {loadImage,GlobalFonts}=require('@napi-rs/canvas');
(async()=>{
 for(const [f,n] of [['/System/Library/Fonts/Supplemental/Iowan Old Style.ttc','Iowan Old Style'],['/System/Library/Fonts/Helvetica.ttc','Helvetica'],['/System/Library/Fonts/Menlo.ttc','Menlo']])assert(GlobalFonts.registerFromPath(f,n));
 const r=process.cwd(),c=JSON.parse(fs.readFileSync('dati/canzoni.json')).find(c=>c.slug==='mantra'),p=JSON.parse(fs.readFileSync('dati/pillole.json'))[c.slug];
 const logo=await loadImage(fs.readFileSync('logo.png')),render=require(r+'/scripts/pillole/editoriale.cjs').renderEditoriale;
 const result=render(c,p.cartolina,logo);assert.equal(crypto.createHash('sha256').update(result.canvas.toBuffer('image/jpeg',92)).digest('hex'),p.sha256);
 assert.throws(()=>render({...c,titolo:'Titolo troppo lungo '.repeat(20)},p.cartolina,logo),/Titolo/);
 const lungo=structuredClone(p.cartolina);lungo.sezioni[0].testo+=' '+lungo.sezioni[0].testo.repeat(12);assert.throws(()=>render(c,lungo,logo),/Sintesi|A capo/);
 let overlaps=[];for(let i=0;i<result.testi.length;i++)for(let j=i+1;j<result.testi.length;j++){const a=result.testi[i],b=result.testi[j];if(a.sinistra<b.destra&&a.destra>b.sinistra&&a.alto<b.basso&&a.basso>b.alto)overlaps.push([a,b]);}assert.equal(overlaps.length,0);
 function luminanza(h){let c=h.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
 const contrasti=Object.fromEntries(['#F8F4EB','#C7D6CD','#B7D7C4'].map(x=>[x,(luminanza(x)+.05)/(luminanza('#193E33')+.05)]));assert(Object.values(contrasti).every(x=>x>=4.5));
 fs.writeFileSync('rapporti/prove-cartolina-mantra-2026-10-15/layout.json',JSON.stringify({deterministico:true,testiSenzaSovrapposizione:true,titolo:result.titolo,testiLunghiRifiutati:true,contrastiMinimi:contrasti},null,2)+'\n');console.log('OK: file deterministico, titolo una riga, nessuna sovrapposizione, testi troppo lunghi rifiutati e contrasto AA.');
})().catch(e=>{console.error(e);process.exitCode=1});
