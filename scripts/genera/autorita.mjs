// Questa libreria va eseguita dalla copia fidata installata dal proprietario,
// non caricata dal ramo che deve verificare. Nessuna chiave privata nel repo.
import fs from 'node:fs';
import path from 'node:path';
import { userInfo, tmpdir } from 'node:os';
import { createHash, verify } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
export const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const jbytes = x => JSON.stringify(x, null, 2) + '\n';
const uguali = (a,b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
const valido = p => typeof p === 'string' && p && !path.isAbsolute(p) && !p.split('/').some(s=>!s||s==='.'||s==='..'||s==='.git');
const prefisso = (p, v) => v.some(s=>s.endsWith('/')?p.startsWith(s):p===s);
const lettura = p => fs.existsSync(p) ? fs.readFileSync(p) : null;
const digest = p => {const b=lettura(p);return b===null?null:sha(b);};
const ordina = o => Object.fromEntries(Object.entries(o).sort());
function fileSicuro(root,p) {
  if(!valido(p))throw new Error('Percorso lotto non valido');
  const f=path.join(root,p);let q=f;
  while(!fs.existsSync(q))q=path.dirname(q);
  const reale=fs.realpathSync(q);
  if(reale!==root&&!reale.startsWith(root+path.sep))throw new Error('Symlink fuori dal repository');
  return f;
}
export function leggiAncoraInstallata() {
  // userInfo legge il profilo del sistema: HOME e variabili del manifesto non
  // scelgono né il percorso né la chiave dell'autorità.
  const file=path.join(userInfo().homedir,'.config','dietro-il-testo','autorita.json');
  if(!fs.existsSync(file))throw new Error('Autorità non installata dal proprietario: nessuna operazione autorizzata');
  return JSON.parse(fs.readFileSync(file,'utf8'));
}
export function creaAutorita({root,ancora}) {
  root=fs.realpathSync(root);
  const gitEnv={PATH:'/usr/bin:/bin:/usr/sbin:/sbin',LANG:'C.UTF-8',TZ:'UTC',GIT_NO_REPLACE_OBJECTS:'1',GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_GLOBAL:'/dev/null'};
  const gitBytes=(...a)=>execFileSync('/usr/bin/git',['--no-replace-objects','-C',root,...a],{env:gitEnv,stdio:['ignore','pipe','pipe']});
  const git=(...a)=>gitBytes(...a).toString().trim();
  const blob=(ref,p)=>{try{return gitBytes('show',`${ref}:${p}`);}catch{return null;}};
  const parent=c=>git('rev-parse',`${c}^`);
  const ancestor=(a,b)=>{try{git('merge-base','--is-ancestor',a,b);return true;}catch{return false;}};
  if(ancora?.versione!==1||!/^[a-f0-9]{40}$/.test(ancora.commit||'')||!ancora.chiavePubblica)throw new Error('Ancora di fiducia non valida');
  if(!ancestor(ancora.commit,git('rev-parse','HEAD')))throw new Error('Checkout fuori dalla storia fidata');
  const policyBlob=blob(ancora.commit,'dati/policy-lotti.json');if(!policyBlob)throw new Error('Policy assente nel commit fidato');
  const policy=JSON.parse(policyBlob);const protetto=p=>prefisso(p,policy.protetti);
  const documentazione=p=>!protetto(p)&&prefisso(p,policy.documentazione);
  const files=(a,b)=>git('diff','--no-ext-diff','--no-textconv','--name-only','-z',a,...(b?[b]:[])).split('\0').filter(Boolean);
  const checkFirma=record=>{
    if(!record?.firma||!record.payload||!verify(null,Buffer.from(JSON.stringify(record.payload)),ancora.chiavePubblica,Buffer.from(record.firma,'base64')))throw new Error('Firma del proprietario assente o non valida');
    return record.payload;
  };
  const caricaApprovazione=(base,manifesto)=>{
    if(!/^lotti\/[a-f0-9]{64}\.json$/.test(manifesto))throw new Error('Manifesto del gate non valido');
    const raw=blob(base,manifesto);if(!raw)throw new Error('Manifesto assente nel commit-base');
    const id=sha(raw);if(manifesto!==`lotti/${id}.json`)throw new Error('Digest del manifesto discordante');
    const approval=`approvazioni-lotti/${id}.json`;const bytes=blob(base,approval);
    if(!bytes)throw new Error('Approvazione non presente nel commit-base');
    const record=JSON.parse(bytes);const p=checkFirma(record);
    const introdotta=git('log','--diff-filter=A','--format=%H',base,'--',approval).split('\n')[0];
    if(!introdotta||!ancestor(introdotta,base)||parent(introdotta)!==p.parent||p.versione!==1||p.manifesto!==id||!Array.isArray(p.azioni))throw new Error('Approvazione non legata alla base e al manifesto');
    if(!blob(introdotta,approval)?.equals(bytes)||!blob(introdotta,manifesto)?.equals(raw))throw new Error('Approvazione o manifesto riscritti');
    const aggiunte=files(p.parent,introdotta).filter(p=>!documentazione(p)).sort();
    if(JSON.stringify(aggiunte)!==JSON.stringify([approval,manifesto].sort()))throw new Error('Il medesimo lotto non può creare la propria approvazione');
    const m=JSON.parse(raw);
    if(m.versione!==2||!m.contenuti||m.contenuti.versione!==1||!m.files||!m.strutturali||Object.keys(m).some(k=>!['versione','id','contenuti','files','strutturali','promozione'].includes(k)))throw new Error('Schema manifesto firmato non valido');
    if(!Array.isArray(m.contenuti.pagine)||!Array.isArray(m.contenuti.cartoline)||new Set(m.contenuti.pagine).size!==m.contenuti.pagine.length||m.contenuti.pagine.length>50||m.contenuti.pagine.some(p=>typeof p!=='string'||!(p==='/404.html'||/^\/(?:[a-z0-9-]+\/)*$/.test(p))))throw new Error('URL del manifesto firmato non validi');
    for(const [n,h] of Object.entries({...m.files,...m.strutturali,...m.promozione?.files}))if(!valido(n)||h!==null&&!/^[a-f0-9]{64}$/.test(h))throw new Error('Impronta o percorso non valido nel manifesto');
    return {m,id,manifesto,record,commitApprovazione:introdotta,base};
  };
  const richiedi=(a,azione)=>{if(!a.record.payload.azioni.includes(azione))throw new Error(`Consenso ${azione} assente`);};
  function verificaStoria(ref) {
    if(!ancestor(ancora.commit,ref))throw new Error('Base non discendente dall’ancora fidata');
    const commits=git('rev-list','--reverse',`${ancora.commit}..${ref}`).split('\n').filter(Boolean);
    for(const c of commits){
      if(git('rev-list','--parents','-n','1',c).split(' ').length!==2)throw new Error('Merge strutturale da revisionare separatamente');
      const prev=parent(c), changed=files(prev,c).filter(n=>!documentazione(n));if(!changed.length)continue;
      const approvals=changed.filter(n=>n.startsWith('approvazioni-lotti/'));
      if(approvals.length){for(const n of approvals)caricaApprovazione(c,`lotti/${n.split('/').pop()}`);continue;}
      const invii=changed.filter(n=>n.startsWith('consensi-indexnow/'));
      if(invii.length){if(changed.length!==1)throw new Error('Il consenso IndexNow deve precedere ed essere distinto dall’invio');verificaConsenso(c,invii[0]);continue;}
      const receipts=changed.filter(n=>/^stato-lotti\/(preparato|promosso)-[a-f0-9]{64}\.json$/.test(n));
      if(receipts.length!==1)throw new Error(`Modifica non autorizzata a baseline/gate/policy o contenuti: ${c}`);
      const receipt=JSON.parse(blob(c,receipts[0]));const a=caricaApprovazione(prev,receipt.manifesto);
      if(receipt.digest!==a.id)throw new Error('Ricevuta di lotto discordante');
      const promossa=receipts[0].includes('/promosso-');richiedi(a,promossa?'promuovi':'build');
      const expected=promossa?a.m.promozione?.files:a.m.files;
      if(!expected)throw new Error('Promozione non approvata');
      const actual=Object.fromEntries(changed.filter(n=>n!==receipts[0]).map(n=>[n,blob(c,n)?sha(blob(c,n)):null]));
      if(!uguali(actual,expected))throw new Error('Commit fuori dal manifesto approvato');
      if(!promossa)for(const n of Object.keys(actual))if(protetto(n)&&(!a.record.payload.azioni.includes('struttura')||a.m.strutturali[n]!==actual[n]))throw new Error('Modifica strutturale senza consenso precedente');
    }
  }
  function modificheAttuali(base) {
    // Il contenuto è confrontato con gli oggetti Git, non con lo status:
    // assume-unchanged, skip-worktree o un indice alternativo non sono consenso.
    const entries=gitBytes('ls-tree','-r','-z','--full-tree',base).toString().split('\0').filter(Boolean);
    const expected=new Map(entries.map(s=>{const i=s.indexOf('\t'),[mode,type,oid]=s.slice(0,i).split(' ');return[s.slice(i+1),{mode,type,oid}];}));
    const names=new Set([...expected.keys(),...gitBytes('ls-files','--cached','--others','--exclude-standard','-z').toString().split('\0').filter(Boolean)]);
    const scan=d=>{if(!fs.existsSync(d))return;if(fs.lstatSync(d).isSymbolicLink())throw new Error('Symlink nella policy del gate non ammesso');for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())scan(f);else names.add(path.relative(root,f));}};
    for(const p of policy.protetti)if(p.endsWith('/'))scan(path.join(root,p));else names.add(p);
    const changes=[];
    for(const n of names){
      if(documentazione(n))continue;
      const file=path.join(root,n);let data=null,mode=null;
      {
        let stat;try{stat=fs.lstatSync(file);}catch{}
        if(stat){if(stat.isSymbolicLink()){if(protetto(n))throw new Error('Symlink nel gate non ammesso');mode='120000';data=Buffer.from(fs.readlinkSync(file));}else if(stat.isFile()){mode=(stat.mode&0o111)?'100755':'100644';data=fs.readFileSync(file);}else continue;}
      }
      const object=data===null?null:createHash('sha1').update(Buffer.from(`blob ${data.length}\0`)).update(data).digest('hex');
      const e=expected.get(n);if(!e&&data===null)continue;if(!e||e.oid!==object||e.mode!==mode)changes.push(n);
    }
    return changes;
  }
  function verifica(base,manifesto,azione='build') {
    if(!/^[a-f0-9]{40}$/.test(base||''))throw new Error('Serve il digest completo del commit-base');
    const head=git('rev-parse','HEAD');verificaStoria(head);
    if(!ancestor(base,head))throw new Error('Commit-base non precedente al lotto');
    const changes=modificheAttuali(base);
    if(!manifesto){if(changes.length)throw new Error('Modifiche senza manifesto approvato');return null;}
    const a=caricaApprovazione(base,manifesto);richiedi(a,azione);
    if(!blob(base,manifesto)?.equals(lettura(fileSicuro(root,manifesto))))throw new Error('Manifesto modificato rispetto al commit-base');
    const prep=`stato-lotti/preparato-${a.id}.json`;
    const current=Object.fromEntries(changes.filter(n=>n!==prep).map(n=>[n,digest(fileSicuro(root,n))]));
    if(!uguali(current,a.m.files))throw new Error('File del lotto diversi dalle impronte approvate');
    for(const [n,h]of Object.entries(current))if(protetto(n)&&(!a.record.payload.azioni.includes('struttura')||a.m.strutturali[n]!==h))throw new Error('Gate/baseline/policy richiedono approvazione strutturale nel commit-base');
    return a;
  }
  function build({base,manifesto,out}) {
    const a=verifica(base,manifesto);
    const target=path.join(fs.realpathSync(path.dirname(path.resolve(out))),path.basename(out));
    if(fs.existsSync(target))throw new Error('Output già esistente: usare una cartella temporanea nuova');
    if(target===root||target.startsWith(root+path.sep))throw new Error('Il runner fidato genera soltanto fuori dal checkout');
    // Esegue soltanto una fotografia immutabile della base e dei bytes
    // approvati: il renderer non viene caricato dal checkout modificabile.
    const scratch=fs.mkdtempSync(path.join(tmpdir(),'dit-build-fidato-'));
    const snapshot=path.join(scratch,'base');fs.mkdirSync(snapshot);const sourceRoot=fs.realpathSync(snapshot);
    try{
      const tree=gitBytes('ls-tree','-r','-z','--full-tree',base).toString().split('\0').filter(Boolean);
      const selected=[];
      for(const item of tree){const i=item.indexOf('\t'),[mode,type]=item.slice(0,i).split(' '),n=item.slice(i+1);
        if(!/^(scripts|dati|pillole|og|ritratti)\//.test(n)&&!n.endsWith('.html')&&!/^sitemap.*\.xml$/.test(n)&&n!=='ricerca.js'&&!/^[^/]+\.(png|ico|txt)$/.test(n))continue;
        if(!valido(n)||type!=='blob'||mode==='120000')throw new Error('Input di build non regolare nella base fidata');selected.push(n);
      }
      const archive=execFileSync('/usr/bin/git',['--no-replace-objects','-C',root,'archive','--format=tar',base,'--',...selected],{env:gitEnv,maxBuffer:256*1024*1024,stdio:['ignore','pipe','pipe']});
      const unpack=spawnSync('/usr/bin/tar',['-xf','-','-C',snapshot],{input:archive,encoding:'utf8'});if(unpack.status!==0)throw new Error('Snapshot fidato non disponibile');
      for(const [n,h]of Object.entries(a?.m.files||{})){
        const content=lettura(fileSicuro(root,n));if((content===null?null:sha(content))!==h)throw new Error('Input cambiato dopo la verifica');
        const dest=path.join(snapshot,n);if(content===null)fs.rmSync(dest,{force:true});else{fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,content);}
      }
      const manifestTemp=path.join(scratch,'lotto.json');if(a)fs.writeFileSync(manifestTemp,jbytes(a.m.contenuti),{flag:'wx',mode:0o600});
      const env={PATH:'/usr/bin:/bin:/usr/sbin:/sbin',LANG:'C.UTF-8',TZ:'UTC'};
      const child=spawnSync(process.execPath,['scripts/genera-sito.mjs','--out',path.relative(sourceRoot,target),...(a?['--lotto',manifestTemp]:[])],{cwd:sourceRoot,encoding:'utf8',env,maxBuffer:16*1024*1024});
      if(child.status!==0)throw new Error(`Build bloccato: ${child.stderr||child.stdout}`);
      return {approvazione:a,stdout:child.stdout};
    }finally{fs.rmSync(scratch,{recursive:true,force:true});}
  }
  function sigillaPreparazione({base,manifesto,out}) {
    const a=verifica(base,manifesto);const candidate=propostaPromozione({root,out,contenuti:a.m.contenuti});
    if(!uguali(candidate.files,a.m.promozione?.files||{}))throw new Error('Promozione generata diversa da quella approvata');
    const name=`stato-lotti/preparato-${a.id}.json`;fs.mkdirSync(path.join(root,'stato-lotti'),{recursive:true});fs.writeFileSync(path.join(root,name),jbytes({versione:1,manifesto,digest:a.id}));return name;
  }
  function promuovi({base,manifesto,out}) {
    const a=verifica(base,manifesto,'promuovi');
    if(!fs.existsSync(path.join(root,`stato-lotti/preparato-${a.id}.json`)))throw new Error('Preparazione verificata assente');
    const candidate=propostaPromozione({root,out,contenuti:a.m.contenuti});
    if(!uguali(candidate.files,a.m.promozione?.files||{}))throw new Error('Promozione fuori dalle impronte approvate');
    // Tutto validato prima della prima scrittura; nessuna baseline da un errore.
    for(const [n,h]of Object.entries(candidate.files)){
      const bytes=n==='dati/baseline-generatore.json'?Buffer.from(candidate.baseline):fs.readFileSync(path.join(out,n));
      if(sha(bytes)!==h)throw new Error('Output cambiato durante la promozione');
    }
    for(const n of Object.keys(candidate.files)){
      const dest=fileSicuro(root,n);fs.mkdirSync(path.dirname(dest),{recursive:true});
      if(n==='dati/baseline-generatore.json')fs.writeFileSync(dest,candidate.baseline);else fs.copyFileSync(path.join(out,n),dest);
    }
    const receipt=`stato-lotti/promosso-${a.id}.json`;fs.writeFileSync(path.join(root,receipt),jbytes({versione:1,manifesto,digest:a.id}));return receipt;
  }
  function verificaConsenso(base,nome) {
    if(!/^consensi-indexnow\/[a-z0-9-]+\.json$/.test(nome))throw new Error('Consenso IndexNow non valido');
    const bytes=blob(base,nome);if(!bytes)throw new Error('Consenso IndexNow assente nel commit-base');const p=checkFirma(JSON.parse(bytes));
    if(p.versione!==1||p.azione!=='indexnow'||p.host!=='www.dietroiltesto.it'||!/^[a-z0-9-]{12,80}$/.test(p.nonce||'')||!ancestor(p.commitPubblicato,parent(base)))throw new Error('Pubblicazione o consenso IndexNow non valido');
    const a=caricaApprovazione(p.commitPubblicato,p.manifesto);const receipt=blob(p.commitPubblicato,`stato-lotti/promosso-${a.id}.json`);
    if(!receipt||JSON.parse(receipt).digest!==a.id||p.digest!==a.id)throw new Error('Lotto non promosso/pubblicato');
    const urls=a.m.contenuti.pagine.map(p=>'https://www.dietroiltesto.it'+p).sort();
    if(p.urlDigest!==sha(JSON.stringify(urls))||!urls.length||urls.length>50)throw new Error('URL diversi dal lotto approvato');
    return {payload:p,urls};
  }
  return {root,verifica,verificaStoria,build,sigillaPreparazione,promuovi,verificaConsenso,caricaApprovazione};
}
export function propostaPromozione({root,out,contenuti}) {
  // Funzione pura: produce una proposta da un output completo, non scrive la
  // baseline e non costituisce approvazione. Le 34 coppie non cambiano.
  root=fs.realpathSync(root);out=fs.realpathSync(out);
  const baseline=JSON.parse(fs.readFileSync(path.join(root,'dati/baseline-generatore.json')));
  const oldEred=JSON.stringify(baseline.ereditate);const registry=JSON.parse(fs.readFileSync(path.join(root,'dati/pillole.json')));
  for(const c of contenuti.cartoline){baseline.cartoline[c.slug]=sha(JSON.stringify(registry[c.slug]));baseline.immagini[c.immagine]=sha(fs.readFileSync(fileSicuro(root,c.immagine)));}
  if(JSON.stringify(baseline.ereditate)!==oldEred)throw new Error('Sigillo storico alterato');
  const baselineText=jbytes(baseline),files={};
  const routes=JSON.parse(fs.readFileSync(path.join(root,'dati/pagine-seo.json'))).map(x=>x.percorso.endsWith('.html')?x.percorso:x.percorso+'index.html');
  const maps=fs.readdirSync(root).filter(n=>/^sitemap.*\.xml$/.test(n));
  if(maps.length!==6)throw new Error('Sitemap incomplete');
  const actualPages=[];
  for(const n of [...routes,...maps,'ricerca.js']){
    const before=fs.readFileSync(fileSicuro(root,n)),after=fs.readFileSync(path.join(out,n));
    if(before.equals(after))continue;files[n]=sha(after);
    if(routes.includes(n)){
      const a=before.toString(),b=after.toString();
      for(const re of [/"datePublished":"[^"]*"/g,/<link rel="canonical"[^>]*>/g])if(JSON.stringify(a.match(re))!==JSON.stringify(b.match(re)))throw new Error('datePublished/canonical non modificabili');
      actualPages.push('/'+n.replace(/index.html$/,''));
    }else if(n.startsWith('sitemap')){
      const a=[...before.toString().matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)],b=[...after.toString().matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)];
      if(JSON.stringify(a.map(x=>x[1]))!==JSON.stringify(b.map(x=>x[1])))throw new Error('Inventario sitemap modificato');
      for(let i=0;i<a.length;i++)if(a[i][2]!==b[i][2]&&!contenuti.pagine.includes(new URL(a[i][1]).pathname))throw new Error('lastmod fuori dal lotto');
    }
  }
  if(JSON.stringify(actualPages.sort())!==JSON.stringify([...contenuti.pagine].sort()))throw new Error('Pagine da promuovere diverse dal lotto');
  if(sha(baselineText)!==digest(path.join(root,'dati/baseline-generatore.json')))files['dati/baseline-generatore.json']=sha(baselineText);
  return {files:ordina(files),baseline:baselineText};
}
export async function inviaIndexNow({autorita,base,consenso,invia=false,stato,fetchImpl=globalThis.fetch}) {
  if(!invia)return {rete:false,stato:'disabilitato'};
  if(!autorita||!base||!consenso)throw new Error('Invio richiede consenso del proprietario già committato e pubblicazione attestata');
  autorita.verifica(base,null);const a=autorita.verificaConsenso(base,consenso);
  const dir=stato||path.join(userInfo().homedir,'.local','state','dietro-il-testo','indexnow');fs.mkdirSync(dir,{recursive:true});
  const claim=path.join(dir,a.payload.nonce);const fd=fs.openSync(claim,'wx',0o600);fs.closeSync(fd);
  const config=JSON.parse(fs.readFileSync(path.join(autorita.root,'dati/indexnow.json')));const key=config.indexnow;
  if(!key||!fs.existsSync(path.join(autorita.root,`${key}.txt`)))throw new Error('Chiave IndexNow o prova proprietà assente');
  const response=await fetchImpl('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:'www.dietroiltesto.it',key,keyLocation:`https://www.dietroiltesto.it/${key}.txt`,urlList:a.urls})});
  if(![200,202].includes(response.status))throw new Error(`IndexNow HTTP ${response.status}: consenso consumato, nessun retry automatico`);
  return {rete:true,urls:a.urls,status:response.status};
}
