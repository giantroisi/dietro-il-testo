#!/usr/bin/env node
// Entrypoint della copia fidata, installata fuori dal checkout modificabile.
import path from 'node:path';
import { creaAutorita,leggiAncoraInstallata } from './genera/autorita.mjs';
const args=process.argv.slice(2);const take=n=>{const i=args.indexOf(n);return i<0?null:args[i+1];};
try{
  const root=take('--repo'),base=take('--base'),out=take('--out'),manifesto=take('--lotto');
  if(!root||!base)throw new Error('Servono --repo e --base; nessuna autorità dal manifesto o dall’ambiente');
  const authority=creaAutorita({root:path.resolve(root),ancora:leggiAncoraInstallata()});
  if(args.includes('--promuovi')){if(!out||!manifesto)throw new Error('Promozione richiede output e manifesto');console.log(authority.promuovi({base,manifesto,out:path.resolve(out)}));}
  else{if(!out)throw new Error('Serve output temporaneo esterno');console.log(authority.build({base,manifesto,out:path.resolve(out)}).stdout);if(args.includes('--sigilla'))console.log(authority.sigillaPreparazione({base,manifesto,out:path.resolve(out)}));}
}catch(e){console.error(e.message);process.exitCode=1;}
