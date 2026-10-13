// Stesso renderer della condivisione Instagram, senza un secondo modello grafico.
'use strict';
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm'), crypto=require('node:crypto');
const {createCanvas,loadImage,GlobalFonts}=require('@napi-rs/canvas');
async function main(){
 const root=path.resolve(__dirname,'../..');
 const {generaRicerca}=await import('../genera/ricerca.mjs');
 const js=generaRicerca({canzoni:[],artisti:[],album:[],artistiPerSlug:new Map()});
 const start=js.indexOf('    var FORMATI = {'), end=js.indexOf('    /* Il file si costruisce senza attese:');
 if(start<0||end<=start)throw Error('Renderer Instagram non individuato');
 const model=js.slice(start,end);
 for(const [file,name] of [['Iowan Old Style.ttc','Iowan Old Style'],['Georgia.ttf','Georgia'],['Times New Roman.ttf','Times New Roman'],['Menlo.ttc','Menlo']]){
  const candidates=['/System/Library/Fonts/Supplemental/'+file,'/System/Library/Fonts/'+file];
  const f=candidates.find(x=>fs.existsSync(x));if(!f||!GlobalFonts.registerFromPath(f,name))throw Error('Font mancante: '+file);
 }
 const logo=await loadImage(fs.readFileSync(path.join(root,'logo.png')));
 const registry=JSON.parse(fs.readFileSync(path.join(root,'dati/pillole.json')));const proof=[];
 for(const [slug,p] of Object.entries(registry)){
  const html=fs.readFileSync(path.join(root,'canzone',slug,'index.html'),'utf8');
  const tag=html.match(/<div class="condividi"[\s\S]*?data-sito="[^"]*">/)[0];
  const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
  const attrs=Object.fromEntries([...tag.matchAll(/(data-[a-z0-9-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
  const text=[];
  function canvas(){const c=createCanvas(1,1),get=c.getContext.bind(c);c.getContext=kind=>{const ctx=get(kind),draw=ctx.drawImage.bind(ctx),fill=ctx.fillText.bind(ctx);ctx.drawImage=(img,...a)=>draw(img._image||img,...a);ctx.fillText=(t,x,y,...a)=>{const m=ctx.measureText(t);text.push({text:t,font:ctx.font,left:x,right:x+m.width,top:y-m.actualBoundingBoxAscent,bottom:y+m.actualBoundingBoxDescent});return fill(t,x,y,...a)};return ctx};return c}
  const image={naturalWidth:logo.width,naturalHeight:logo.height,_image:logo,set src(v){this.onload()}};
  const sandbox={cartolina:{getAttribute:k=>attrs[k],querySelector:()=>null},Image:function(){return image},document:{createElement:canvas}};
  vm.runInNewContext(model+';logoPronto=true;ritaglio=misuraRitaglio();var risultato=disegna("storia");',sandbox,{timeout:10000});
  const result=sandbox.risultato,bytes=result.toBuffer('image/jpeg',92),file=slug+'-storia.jpg';
  fs.writeFileSync(path.join(root,'pillole',file),bytes);
  p.file=file;p.sha256=crypto.createHash('sha256').update(bytes).digest('hex');p.testo=attrs['data-frase'];p.testoGrafica=text.filter(t=>t.font.startsWith('italic ')).map(t=>t.text).join(' ');p.formato='storia';p.modello='scripts/genera/ricerca.mjs';delete p.varianti;
  proof.push({slug,file,bytes:bytes.length,sha256:p.sha256,dimensioni:[result.width,result.height],testi:text,rendererSha256:crypto.createHash('sha256').update(model).digest('hex')});
 }
 fs.writeFileSync(path.join(root,'dati/pillole.json'),JSON.stringify(registry,null,2)+'\n');
 const out=path.join(root,'rapporti/prove-cartoline-uniche-2026-10-13');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'render.json'),JSON.stringify(proof,null,2)+'\n');
}
main().catch(e=>{console.error(e);process.exitCode=1});
