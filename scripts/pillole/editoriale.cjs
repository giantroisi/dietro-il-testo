'use strict';
// La cartolina viene composta una volta: pagina e condivisione usano quel JPEG.
const { createCanvas } = require('@napi-rs/canvas');
const SERIF = '"Iowan Old Style", Georgia, serif';
const SANS = '"Helvetica", Arial, sans-serif';
const MONO = 'Menlo, monospace';
const COLORI = { testo: '#F8F4EB', secondario: '#CBD7CE', accento: '#B1D8BD' };
function righe(ctx, testo, larghezza) {
  const result = []; let current = '';
  for (const word of testo.split(/\s+/)) {
    if (ctx.measureText(word).width > larghezza) throw Error('Parola fuori margine: '+word);
    const next = current ? current+' '+word : word;
    if (ctx.measureText(next).width > larghezza) { result.push(current); current=word; }
    else current=next;
  }
  if (current) result.push(current);
  return result;
}
function renderEditoriale(canzone, contenuto, logo) {
  if (contenuto.versione!==2 || contenuto.sezioni.length!==2) throw Error('Cartolina richiede due sezioni curate');
  const cv=createCanvas(1080,1920),ctx=cv.getContext('2d');
  const audit=[]; let gruppo='';
  const margine=88,larghezza=904;
  const grad=ctx.createLinearGradient(0,0,0,1920);
  const colore=canzone.colore;
  if(!/^#[a-f0-9]{6}$/i.test(colore))throw Error('Colore artista non valido');
  const rgb=[1,3,5].map(i=>parseInt(colore.slice(i,i+2),16));
  const tinta=fattori=>'rgb('+rgb.map((v,i)=>Math.round(v*fattori[i])).join(',')+')';
  grad.addColorStop(0,tinta([.74,.57,.66]));grad.addColorStop(.55,tinta([.52,.38,.46]));grad.addColorStop(1,'#101819');
  ctx.fillStyle=grad;ctx.fillRect(0,0,1080,1920);
  // Un filetto allinea marchio, anagrafica e testo sulla stessa colonna.
  ctx.fillStyle='#B1D8BD';ctx.fillRect(margine,330,70,4);
  function testo(t,x,y,font,colore=COLORI.testo) {
    ctx.font=font;ctx.fillStyle=colore;
    const m=ctx.measureText(t);
    const box={gruppo,testo:t,font,sinistra:x,destra:x+m.width,alto:y-m.actualBoundingBoxAscent,basso:y+m.actualBoundingBoxDescent};
    if (box.sinistra<80 || box.destra>1000 || box.alto<330 || box.basso>1590) throw Error('Testo fuori zona sicura: '+JSON.stringify(box));
    audit.push(box);ctx.fillText(t,x,y);
  }
  // Logo originale, ritagliato solo sulla trasparenza esterna, senza ispessirlo.
  const lc=createCanvas(logo.width,logo.height),lx=lc.getContext('2d');lx.drawImage(logo,0,0);
  const rgba=lx.getImageData(0,0,logo.width,logo.height).data;
  let sx=logo.width,sy=logo.height,dx=0,dy=0;
  for(let y=0;y<logo.height;y++)for(let x=0;x<logo.width;x++)if(rgba[(y*logo.width+x)*4+3]>8){sx=Math.min(sx,x);sy=Math.min(sy,y);dx=Math.max(dx,x);dy=Math.max(dy,y);}
  const w=300,h= Math.round(w*(dy-sy+1)/(dx-sx+1));
  const mark=createCanvas(w,h),mx=mark.getContext('2d');mx.drawImage(logo,sx,sy,dx-sx+1,dy-sy+1,0,0,w,h);mx.globalCompositeOperation='source-in';mx.fillStyle=COLORI.testo;mx.fillRect(0,0,w,h);
  ctx.drawImage(mark,margine,350);
  gruppo='anno';ctx.font='38px '+MONO;testo(canzone.anno,992-ctx.measureText(canzone.anno).width,394,'38px '+MONO,COLORI.secondario);
  gruppo='artista';testo(canzone.artista,margine,456,'44px '+SANS,COLORI.accento);
  gruppo='titolo';
  let title;let size;
  for(size=88;size>=68;size-=2){ctx.font='700 '+size+'px '+SERIF;title=righe(ctx,canzone.titolo,larghezza);if(title.length===1)break;}
  if(title.length!==1) {size=80;ctx.font='700 '+size+'px '+SERIF;title=righe(ctx,canzone.titolo,larghezza);if(title.length>2)throw Error('Titolo da impaginare manualmente');}
  let y=456+86;
  for(const line of title){testo(line,margine,y,'700 '+size+'px '+SERIF);y+=size*0.82;}
  y+=4;
  gruppo='album';ctx.font='38px '+SANS;
  const album=righe(ctx,'Album · '+canzone.album,larghezza);
  if(album.length>2)throw Error('Album da impaginare manualmente');
  for(const line of album){testo(line,margine,y,'38px '+SANS,COLORI.secondario);y+=49;}
  ctx.fillStyle='rgba(177,216,189,.4)';ctx.fillRect(margine,y-28,larghezza,2);y+=36;
  const sezioneProve=[];
  for(const [i,sezione] of contenuto.sezioni.entries()) {
    gruppo='sezione-'+i+'-titolo';ctx.font='700 54px '+SERIF;
    const titoli=righe(ctx,sezione.titolo,larghezza);
    if(titoli.length>1)throw Error('Titolo sezione troppo lungo');
    testo(titoli[0],margine,y,'700 54px '+SERIF);y+=75;
    gruppo='sezione-'+i+'-testo';ctx.font='56px '+SANS;
    const greedy=righe(ctx,sezione.testo,larghezza);
    // Bilancia le righe senza ridurre il carattere: niente ultima riga con una sola parola.
    let low=larghezza*0.5,high=larghezza;
    for(let n=0;n<20;n++){const mid=(low+high)/2;if(righe(ctx,sezione.testo,mid).length>greedy.length)low=mid;else high=mid;}
    const body=righe(ctx,sezione.testo,Math.min(larghezza,high+8));
    if(body.length!==greedy.length || body.at(-1).split(/\s+/).length<2)throw Error('A capo da rifinire manualmente');
    for(const line of body){testo(line,margine,y,'56px '+SANS);y+=72;}
    if(body.join(' ')!==sezione.testo)throw Error('Contenuto incompleto');
    sezioneProve.push({titolo:sezione.titolo,righe:body.length,testoCompleto:body.join(' ')});
    if(i===0){ctx.fillStyle='rgba(177,216,189,.25)';ctx.fillRect(margine,y-15,larghezza,1);y+=55;}
  }
  if(y>1488)throw Error('Sintesi troppo lunga: serve cura editoriale, non ellissi o caratteri minuscoli. '+y);
  gruppo='fonti';testo('Fonti · '+contenuto.sezioni.map(s=>s.nomeFonte).concat(contenuto.nomiFontiAnagrafica).join(' / '),margine,1495,'30px '+SANS,COLORI.secondario);
  gruppo='sito';testo('dietroiltesto.it',margine,1562,'34px '+MONO,COLORI.accento);
  return {canvas:cv,testi:audit,sezioni:sezioneProve,titolo:{dimensione:size,righe:title.length},modello:'scripts/pillole/editoriale.cjs'};
}
module.exports={renderEditoriale};
