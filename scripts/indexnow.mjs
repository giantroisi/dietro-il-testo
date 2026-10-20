#!/usr/bin/env node
// Eseguire la copia fidata installata dal proprietario. Nessun invio di default.
import path from 'node:path';
import { creaAutorita,leggiAncoraInstallata,inviaIndexNow } from './genera/autorita.mjs';
const args=process.argv.slice(2);const take=n=>{const i=args.indexOf(n);return i<0?null:args[i+1];};
try{
  if(args.includes('--prova')&&args.includes('--invia'))throw new Error('--prova e --invia sono incompatibili: nessuna rete');
  if(args.includes('--tutti'))throw new Error('--tutti è vietato');
  if(!args.includes('--invia')){console.log('IndexNow disabilitato: nessuna rete, nessuna chiave letta.');}
  else{
    const root=take('--repo'),base=take('--base'),consenso=take('--consenso');
    if(!root||!base||!consenso)throw new Error('Invio richiede repository, base e consenso firmato del proprietario');
    const authority=creaAutorita({root:path.resolve(root),ancora:leggiAncoraInstallata()});
    const result=await inviaIndexNow({autorita:authority,base,consenso,invia:true});console.log(`IndexNow: ${result.urls.length} URL esatti, HTTP ${result.status}`);
  }
}catch(e){console.error(e.message);process.exitCode=1;}
