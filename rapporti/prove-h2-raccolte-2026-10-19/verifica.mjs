import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const root=process.cwd(),base='79253acd2b436cc2d9777ba733c424fe09171271',dir='rapporti/prove-h2-raccolte-2026-10-19';
const selected=['genere/rock/','genere/pop/','genere/metal/','genere/punk/',...['1970','1980','1990','2000','2010'].map(a=>`anni/${a}/`)];
const old=n=>execFileSync('git',['show',`${base}:${n}`],{encoding:'utf8',maxBuffer:8000000});
const files=execFileSync('git',['ls-files'],{encoding:'utf8'}).trim().split('\n');
const changed=execFileSync('git',['diff',base,'--name-only'],{encoding:'utf8'}).trim().split('\n').filter(n=>!n.startsWith('rapporti/')&&n!=='ROADMAP.md');
assert.deepEqual(changed.toSorted(),[...selected.map(p=>p+'index.html'),'scripts/genera/pagine.mjs'].toSorted());
const changes=[];for(const route of selected){const n=route+'index.html',a=old(n),b=fs.readFileSync(n,'utf8'),h1=a.match(/<h1>(.*?)<\/h1>/)[1],h2=`Brani ${h1.replace(/^Canzoni /,'')} raccontati`;assert.equal(b,a.replace(`<h2>${h1}</h2>`,`<h2>${h2}</h2>`));changes.push({file:n,riga:b.slice(0,b.indexOf(`<h2>${h2}</h2>`)).split('\n').length,h1,h2});}
const sitemaps=files.filter(n=>/^sitemap.*\.xml$/.test(n));for(const n of sitemaps)assert.equal(fs.readFileSync(n,'utf8'),old(n));
const source=fs.readFileSync('scripts/genera-sito.mjs','utf8');assert.equal(source,old('scripts/genera-sito.mjs'));
function absoluteImports(src,folder){return src.replace(/from '(\.\/[^']+)'/g,(_,p)=>`from '${pathToFileURL(path.resolve(folder,p)).href}'`);}
let init=source.split('// ------------------------------------------------------------- scrittura')[0];assert.equal((init.match(/^writeFileSync\(.*$/gm)||[]).length,2);
init=init.replace(/^writeFileSync\(.*$/gm,'').replace('const __dirname = dirname(fileURLToPath(import.meta.url));',`const __dirname = ${JSON.stringify(path.join(root,'scripts'))};`);
init=absoluteImports(init,path.join(root,'scripts'))+'\nexport {ctx,raccolte};';
const {ctx,raccolte}=await import('data:text/javascript;base64,'+Buffer.from(init).toString('base64'));
const current=await import(pathToFileURL(path.join(root,'scripts/genera/pagine.mjs')));
const previous=await import('data:text/javascript;base64,'+Buffer.from(absoluteImports(old('scripts/genera/pagine.mjs'),path.join(root,'scripts/genera'))).toString('base64'));
assert.deepEqual(raccolte.map(r=>r.percorso).sort(),selected.toSorted());
const guard=source.slice(source.indexOf('const oggi ='),source.indexOf('// F59: la pagina viene generata'));
const sandbox={ROOT:root,SITO:{base:'https://www.dietroiltesto.it'},join:path.join,existsSync:fs.existsSync,readdirSync:fs.readdirSync,readFileSync:fs.readFileSync};vm.createContext(sandbox);vm.runInContext(guard+'\nglobalThis.checkDate=lastmodDi;globalThis.norm=normalizza;globalThis.changed=canzoniCambiate;',sandbox);
let renders=0;const passes=[];
for(let pass=1;pass<=2;pass++){const dates={};for(const r of raccolte){const a=previous.paginaRaccolta(r,ctx),b=current.paginaRaccolta(r,ctx),h2=`Brani ${r.titoloH1.replace(/^Canzoni /,'')} raccontati`;assert.equal(b,a.replace(`<h2>${r.titoloH1}</h2>`,`<h2>${h2}</h2>`));const n=r.percorso+'index.html',published=fs.readFileSync(n,'utf8'),date=published.match(/"dateModified":"([^"]*)"/)[1];assert.equal(sandbox.norm(published),sandbox.norm(b),r.percorso+': F40 diverso dopo rendering mirato');dates[r.percorso]=sandbox.checkDate(n,r.percorso,b);assert.equal(dates[r.percorso],date);renders++;}passes.push(dates);}
assert.deepEqual(passes[0],passes[1]);assert.equal(sandbox.changed.length,0);
const mass=source.slice(source.indexOf('if (canzoniCambiate.length > canzoni.length / 2)'),source.indexOf('const lastmodArtisti ='));
const massCtx={canzoni:Array(321),canzoniCambiate:Array.from({length:160},()=>({percorsoUrl:'canzone/prova/',differenza:'test'})),console:{error:()=>{}}};vm.createContext(massCtx);vm.runInContext(mass,massCtx);massCtx.canzoniCambiate.push({percorsoUrl:'canzone/prova/',differenza:'test'});assert.throws(()=>vm.runInContext(mass,massCtx),/Variazione massiva dei lastmod/);
const urls=[];for(const n of sitemaps){const s=fs.readFileSync(n,'utf8');if(s.includes('<urlset'))for(const m of s.matchAll(/<loc>([^<]+)<\/loc>/g))urls.push(m[1]);}
const h1s=[];let duplicates=0;for(const u of urls){const n=u.replace('https://www.dietroiltesto.it/','')+'index.html',s=fs.readFileSync(n,'utf8'),clean=x=>x.replace(/<[^>]+>/g,'').trim(),h1=[...s.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>clean(m[1])),h2=[...s.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>clean(m[1]));assert.equal(h1.length,1,n);assert(h2.length,n);assert.equal(new Set(h2).size,h2.length,n);duplicates+=h2.filter(x=>h1.includes(x)).length;h1s.push(h1[0]);}
assert.equal(new Set(h1s).size,h1s.length);assert.equal(duplicates,0);
const result={base,htmlTracciati:files.filter(n=>n.endsWith('.html')).length,htmlModificati:9,modifiche:changes,altriHTMLIdentici:files.filter(n=>n.endsWith('.html')).length-9,metadatiEDatePreservati:true,sitemapIdentiche:sitemaps.length,guardrailOriginaleInvariato:true,renderMirati:renders,dateDuePassaggiIdentiche:passes[0],guardiaMassiva:'160/321 non bloccate; 161/321 bloccate',URLInSitemap:urls.length,H1Uniche:h1s.length,H1RipetuteComeH2:0,nessunBuildGenerale:true};
fs.writeFileSync(dir+'/risultati.json',JSON.stringify(result,null,2)+'\n');fs.writeFileSync(dir+'/diff.patch',execFileSync('git',['diff',base,'--',...changed],{encoding:'utf8'}));console.log(JSON.stringify(result,null,2));
