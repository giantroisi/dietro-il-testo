#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { TRACKING_ID_AMAZON, DICHIARAZIONE_AMAZON, AVVISO_AFFILIATO, PRODOTTI_AMAZON, collegamentoAmazon } from './genera/affiliazioni.mjs';
const out = new URL('../sito/', import.meta.url).pathname;
const errors = [];
const fail = m => errors.push(m);
const decode = s => s.replaceAll('&amp;', '&');
const attr = (s,n) => s.match(new RegExp(`\\b${n}="([^"]*)"`))?.[1] || '';
if (TRACKING_ID_AMAZON && !/^[a-z0-9-]+-21$/.test(TRACKING_ID_AMAZON)) fail('Tracking ID Italia non valido');
const info = readFileSync(join(out,'affiliazioni/index.html'),'utf8');
if (TRACKING_ID_AMAZON && !info.includes(DICHIARAZIONE_AMAZON)) fail('Dichiarazione obbligatoria assente');
if (!TRACKING_ID_AMAZON && info.includes(DICHIARAZIONE_AMAZON)) fail('Dichiarazione attiva senza ID');
if (Object.keys(PRODOTTI_AMAZON).length > 3) fail('Oltre tre prodotti iniziali');
let count=0;
function walk(dir) {
 for (const entry of readdirSync(dir)) {
  const path=join(dir,entry); if(statSync(path).isDirectory()){walk(path);continue;} if(!path.endsWith('.html'))continue;
  const html=readFileSync(path,'utf8'), rel=path.slice(out.length);
  const blocks=[...html.matchAll(/<aside class="acquisto-affiliato"[\s\S]*?<\/aside>/g)].map(m=>m[0]);
  if(blocks.length>1)fail(`${rel}: più di un prodotto`);
  if(blocks.length && !rel.startsWith('canzone/'))fail(`${rel}: prodotto fuori da una scheda canzone`);
  for(const block of blocks){
   count++; if(!TRACKING_ID_AMAZON)fail(`${rel}: link attivo senza ID`);
   if(!block.includes('· link affiliato</a>'))fail(`${rel}: indicazione affiliata assente`);
   const text=block.replace(/<[^>]*>/g,''); if(/€|\bEUR\b|\bPrime\b|stelle|disponibil/i.test(text))fail(`${rel}: dati commerciali nel blocco`);
  }
  for(const m of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)){
   const href=decode(attr(m[0],'href'));let u;try{u=new URL(href)}catch{continue;}
   if(!/(^|\.)amazon\./i.test(u.hostname))continue;
   // Unico collegamento informativo non commerciale: privacy ufficiale Amazon.
   if(u.hostname==='www.amazon.it' && u.pathname==='/gp/help/customer/display.html' && u.searchParams.get('nodeId')==='200545460' && !u.searchParams.has('tag'))continue;
   if(u.protocol!=='https:'||u.hostname!=='www.amazon.it'||u.username||u.password||u.port||u.searchParams.getAll('tag').length!==1||u.searchParams.get('tag')!==TRACKING_ID_AMAZON)fail(`${rel}: destinazione o tag errato`);
   if(!blocks.some(b=>b.includes(m[0])))fail(`${rel}: link Amazon non dichiarato`);
   if(!['sponsored','nofollow','noopener'].every(t=>attr(m[0],'rel').split(/\s+/).includes(t)))fail(`${rel}: rel incompleto`);
   if(!Object.values(PRODOTTI_AMAZON).some(p=>p.href===href))fail(`${rel}: URL non presente nei prodotti verificati`);
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
  for(const [slug,p] of Object.entries(PRODOTTI_AMAZON))if(!p.dataVerifica||!p.prodotto||!p.prova)fail(`${slug}: provenienza della verifica incompleta`);
 }
}
const expected=TRACKING_ID_AMAZON?Object.keys(PRODOTTI_AMAZON).length:0;
if(count!==expected)fail(`Prodotti renderizzati ${count}, attesi ${expected}`);
for(const file of ['index.html','privacy/index.html','note-legali/index.html','canzone/aerials/index.html'])if(!/href="(?:\.\.\/)*affiliazioni\/"/.test(readFileSync(join(out,file),'utf8')))fail(`${file}: footer assente`);
if(errors.length){errors.forEach(e=>console.error(e));process.exit(1);}
console.log(`OK: configurazione, dichiarazione, ${count} link verificati, avvisi, rel e nessuna risorsa Amazon.`);
