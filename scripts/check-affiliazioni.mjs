#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { TRACKING_ID_AMAZON, DICHIARAZIONE_AMAZON, AVVISO_AFFILIATO, PRODOTTI_AMAZON, SCELTE_AMAZON_ARTISTI, POSIZIONI_AMAZON_ARTISTA, prodottiAmazonPerArtista, prodottoAmazonPerScheda, collegamentoAmazon } from './genera/affiliazioni.mjs';
const out = new URL('../sito/', import.meta.url).pathname;
const errors = [];
const fail = m => errors.push(m);
const decode = s => s.replaceAll('&amp;', '&');
const attr = (s,n) => s.match(new RegExp(`\\b${n}="([^"]*)"`))?.[1] || '';
if (TRACKING_ID_AMAZON && !/^[a-z0-9-]+-21$/.test(TRACKING_ID_AMAZON)) fail('Tracking ID Italia non valido');
const info = readFileSync(join(out,'affiliazioni/index.html'),'utf8');
if (TRACKING_ID_AMAZON && !info.includes(DICHIARAZIONE_AMAZON)) fail('Dichiarazione obbligatoria assente');
if (!TRACKING_ID_AMAZON && info.includes(DICHIARAZIONE_AMAZON)) fail('Dichiarazione attiva senza ID');
// Il catalogo cresce solo con prodotti verificati, uno per album.
const songs=JSON.parse(readFileSync(new URL('../dati/canzoni.json',import.meta.url),'utf8'));
const albums=JSON.parse(readFileSync(new URL('../dati/album-computati.json',import.meta.url),'utf8'));
const albumsByRoute=new Map(albums.map(a=>[`album/${a.artistaSlug}/${a.slug}`,a]));
const expectedPages=new Map();
if (TRACKING_ID_AMAZON) {
 for (const [route,p] of Object.entries(PRODOTTI_AMAZON)) {
  if (!/^album\/[^/]+\/[^/]+$/.test(route)) fail(`${route}: chiave prodotto non riferita a un album`);
  const album=albumsByRoute.get(route);
  if(!album)fail(`${route}: album non presente nella discografia`);
  if(album?.esiste){
   if(p.soloArtista)fail(`${route}: scheda album esistente esclusa dal prodotto`);
   expectedPages.set(route+'/index.html', {products:[p],count:3});
  }else if(!p.soloArtista || !SCELTE_AMAZON_ARTISTI[album?.artistaSlug]?.includes(route)){
   fail(`${route}: prodotto senza scheda album deve essere dichiarato e utilizzato nell’artista`);
  }
  if (!['Vinile','CD'].includes(p.formato)) fail(`${route}: formato non ammesso`);
  if (p.formato==='CD' && (!p.provaRicercaVinile || !p.fonteRicercaVinile)) fail(`${route}: ricerca del vinile prima del CD non documentata`);
  if (!p.primeVerificato || !p.provaPrime) fail(`${route}: verifica Prime assente`);
  const asin=p.prodotto?.match(/\bASIN ([A-Z0-9]{10})\b/)?.[1];
  try {
   if(!asin || new URL(p.href).pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1]!==asin || new URL(p.fonte).pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1]!==asin)fail(`${route}: ASIN non coerente tra prodotto, fonte e link ufficiale`);
  } catch { fail(`${route}: fonte o link non validi`); }
 }
 for(const c of songs){const p=prodottoAmazonPerScheda(c);if(p)expectedPages.set(`canzone/${c.slug}/index.html`,{products:[p],count:c.spotifyId?4:3});}
 const artisti=JSON.parse(readFileSync(new URL('../dati/artisti.json',import.meta.url),'utf8'));
 for(const slug of Object.keys(SCELTE_AMAZON_ARTISTI)){
  if(!artisti.some(a=>a.slug===slug))fail(`${slug}: artista configurato inesistente`);
  expectedPages.set(`artista/${slug}/index.html`,{products:prodottiAmazonPerArtista(slug),count:POSIZIONI_AMAZON_ARTISTA.length,artist:true});
 }
}
const foundPages=new Set();
let count=0;
function walk(dir) {
 for (const entry of readdirSync(dir)) {
  const path=join(dir,entry); if(statSync(path).isDirectory()){walk(path);continue;} if(!path.endsWith('.html'))continue;
  const html=readFileSync(path,'utf8'), rel=path.slice(out.length);
  const blocks=[...html.matchAll(/<aside class="acquisto-affiliato(?: acquisto-(?:mobile|desktop))?"[\s\S]*?<\/aside>/g)].map(m=>m[0]);
  if(blocks.length>4)fail(`${rel}: oltre quattro blocchi per le due disposizioni`);
  const expectedPage=expectedPages.get(rel);
  if(blocks.length && !expectedPage)fail(`${rel}: prodotto fuori dalle pagine configurate`);
  if(expectedPage){foundPages.add(rel);if(blocks.length!==expectedPage.count)fail(`${rel}: riquadri ${blocks.length}, attesi ${expectedPage.count}`);}
  if(expectedPage?.artist){
   for(const [i,posizione]of POSIZIONI_AMAZON_ARTISTA.entries()){
    const matching=blocks.filter(b=>attr(b,'data-acquisto-posizione')===posizione);
    if(matching.length!==1)fail(`${rel}: posizione ${posizione} mancante o duplicata`);
    else if(decode(attr(matching[0].match(/<a\b[^>]*>/)?.[0]||'','href'))!==expectedPage.products[i].href)fail(`${rel}: prodotto errato in posizione ${posizione}`);
   }
  }
  for(const block of blocks){
   count++; if(!TRACKING_ID_AMAZON)fail(`${rel}: link attivo senza ID`);
   if(!html.includes(AVVISO_AFFILIATO)||!html.includes(DICHIARAZIONE_AMAZON))fail(`${rel}: indicazione affiliata assente`);
   const text=block.replace(/<[^>]*>/g,''); if(/€|\bEUR\b|\bPrime\b|stelle|disponibil/i.test(text))fail(`${rel}: dati commerciali nel blocco`);
   const renderedHref=decode(attr(block.match(/<a\b[^>]*>/)?.[0]||'','href'));
   const renderedProduct=expectedPage?.products.find(p=>p.href===renderedHref);
   if(renderedProduct&&!text.includes(`· ${renderedProduct.formato}`))fail(`${rel}: formato mostrato diverso dal prodotto`);
  }
  for(const m of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)){
   // Tutti i partner: la dichiarazione deve essere dentro il pulsante e nel nome accessibile.
   if(attr(m[0],'rel').split(/\s+/).includes('sponsored') && attr(m[0],'class').split(/\s+/).includes('bottone')){
    if(!/<span class="pulsante-affiliato-avviso">link affiliato<\/span>/.test(m[0]))fail(`${rel}: dicitura nel pulsante affiliato assente`);
    if(!/\blink affiliato\b/i.test(attr(m[0],'aria-label')))fail(`${rel}: nome accessibile del pulsante non dichiara affiliazione`);
   }
   const href=decode(attr(m[0],'href'));let u;try{u=new URL(href)}catch{continue;}
   if(!/(^|\.)amazon\./i.test(u.hostname))continue;
   // Unico collegamento informativo non commerciale: privacy ufficiale Amazon.
   if(u.hostname==='www.amazon.it' && u.pathname==='/gp/help/customer/display.html' && u.searchParams.get('nodeId')==='200545460' && !u.searchParams.has('tag'))continue;
   if(u.protocol!=='https:'||u.hostname!=='www.amazon.it'||u.username||u.password||u.port||u.searchParams.getAll('tag').length!==1||u.searchParams.get('tag')!==TRACKING_ID_AMAZON)fail(`${rel}: destinazione o tag errato`);
   if(!blocks.some(b=>b.includes(m[0])))fail(`${rel}: link Amazon non dichiarato`);
   if(!['sponsored','nofollow','noopener'].every(t=>attr(m[0],'rel').split(/\s+/).includes(t)))fail(`${rel}: rel incompleto`);
   if(!expectedPage?.products.some(p=>p.href===href))fail(`${rel}: URL diverso dai prodotti della propria pagina`);
  }
  for(const m of html.matchAll(/<(?:script|img|iframe|link)\b[^>]*>/g))if(/(?:src|href)="[^"]*(?:amazon\.|amazonaws|amzn\.|images-amazon|media-amazon)/i.test(m[0]))fail(`${rel}: risorsa Amazon caricata`);
 }
}
walk(out);
if(TRACKING_ID_AMAZON){
 const known=Object.values(PRODOTTI_AMAZON)[0];
 if(known){
  assert.throws(()=>collegamentoAmazon({...known,href:known.href.replace(TRACKING_ID_AMAZON,'tag-errato-21')}));
  assert.throws(()=>collegamentoAmazon({...known,origine:'non-verificata'}));
  const documented=Object.values(PRODOTTI_AMAZON).find(p=>p.origine==='formato-documentato-amazon');
  if(documented){
   assert.doesNotThrow(()=>collegamentoAmazon(documented));
   assert.throws(()=>collegamentoAmazon({...documented,esitoControlloLink:''}));
   assert.throws(()=>collegamentoAmazon({...documented,documentazioneLink:''}));
   assert.throws(()=>collegamentoAmazon({...documented,href:documented.href+'&extra=1'}));
  }
  for(const [slug,p] of Object.entries(PRODOTTI_AMAZON))if(!p.dataVerifica||!p.prodotto||!p.prova)fail(`${slug}: provenienza della verifica incompleta`);
 }
}
for(const path of expectedPages.keys())if(!foundPages.has(path))fail(`${path}: pagina del prodotto assente`);
const expected=[...expectedPages.values()].reduce((n,x)=>n+x.count,0);
if(count!==expected)fail(`Prodotti renderizzati ${count}, attesi ${expected}`);
for(const file of ['index.html','privacy/index.html','note-legali/index.html','canzone/aerials/index.html'])if(!/href="(?:\.\.\/)*affiliazioni\/"/.test(readFileSync(join(out,file),'utf8')))fail(`${file}: footer assente`);
if(errors.length){errors.forEach(e=>console.error(e));process.exit(1);}
console.log(`OK: configurazione, dichiarazione, ${count} link verificati, avvisi, rel e nessuna risorsa Amazon.`);
