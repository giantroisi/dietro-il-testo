from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse
import subprocess,json,re,csv,hashlib
r=Path.cwd();base='e97f3d673';d=r/'rapporti/prove-consolidamento-link-2026-10-15';d.mkdir(exist_ok=True,parents=True);sel={'one-step-closer':'killing-in-the-name','sound-of-silence-disturbed':'the-sound-of-silence'};O='https://www.dietroiltesto.it'
def old(n):return subprocess.check_output(['git','show',base+':'+n])
class H(HTMLParser):
 def __init__(self):super().__init__();self.href=[]
 def handle_starttag(self,t,a):
  if t=='a':self.href.extend(v for k,v in a if k=='href')
files=[n for n in subprocess.check_output(['git','ls-files'],text=True).splitlines()if n.endswith('.html')];before={};after={};allb=0;alla=0
for n in files:
 a=old(n).decode();b=(r/n).read_text();u=O+'/'+(n[:-10] if n.endswith('index.html') else n)
 for text,graph,key in [(a,before,'prima'),(b,after,'dopo')]:
  h=H();h.feed(text);ls=[urljoin(u,l).split('#')[0]for l in h.href if not l.startswith(('mailto:','tel:','javascript:'))];ls=[l for l in ls if urlparse(l).netloc=='www.dietroiltesto.it'];graph[n]=set(ls)
  if key=='prima':allb+=len(ls)
  else:alla+=len(ls)
 if n in [f'canzone/{s}/index.html'for s in sel]:
  s=n.split('/')[1];t=sel[s];b,k=re.subn(r'<a href="../../canzone/'+t+r'/">([^<]+)</a>',r'\1',b);assert k==1
  if s=='sound-of-silence-disturbed':b=b.replace('"dateModified":"2026-10-15"','"dateModified":"2026-10-12"')
 assert a==b,n
added={(n,u)for n in files for u in after[n]-before[n]};removed={(n,u)for n in files for u in before[n]-after[n]};assert added=={(f'canzone/{s}/index.html',O+'/canzone/'+t+'/')for s,t in sel.items()};assert not removed
metrics={t:dict(prima=sum(O+'/canzone/'+t+'/'in v for v in before.values()),dopo=sum(O+'/canzone/'+t+'/'in v for v in after.values()))for t in sel.values()}
for n in ['dati/canzoni.json','dati/pillole.json','ricerca.js']+[p.name for p in r.glob('sitemap*.xml')if p.name!='sitemap-canzoni.xml']:assert old(n)==(r/n).read_bytes(),n
s=(r/'sitemap-canzoni.xml').read_text();s,k=re.subn(r'(<loc>'+O+r'/canzone/sound-of-silence-disturbed/</loc>\s*<lastmod>)2026-10-15(</lastmod>)',r'\g<1>2026-10-12\2',s);assert k==1;assert s==old('sitemap-canzoni.xml').decode()
q=json.loads(old('dati/collegamenti-contestuali.json'));p=json.loads((r/'dati/collegamenti-contestuali.json').read_text());assert set(p)-set(q)==set(sel);assert all(p[k]==q[k]for k in q)
G=Path('/Users/gianmicheletroisi/Documents/Codex/2026-10-08/quali-sono-le-pagine-piu-cliccate/gsc-scansioni-2026-10-12');sources={}
for f in ['indicizzazione/dietroiltesto-pagine-indicizzate.csv','indicizzazione/dietroiltesto-rilevata-non-indicizzata.csv','indicizzazione/dietroiltesto-scansionata-non-indicizzata.csv','registro-indicizzazione-3siti.csv']:
 p=G/f;rows=list(csv.DictReader(p.open(encoding='utf-8-sig')));sources[f]=dict(file=str(p),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),righe=len(rows));
 if 'pagine-indicizzate'in f:idx={x['URL']for x in rows}
 elif 'rilevata'in f:pending={x['URL']for x in rows}
 elif 'scansionata'in f:scanned={x['URL']for x in rows}
 else:recent={x['url']for x in rows if x['sito']=='dietroiltesto'and x['data_richiesta']>='2026-10-01'}
for s,t in sel.items():assert O+'/canzone/'+s+'/'in idx;assert O+'/canzone/'+t+'/'in pending-scanned-recent-idx
out=dict(base=base,pagineHTML=len(files),sorgenti=sel,linkEntranti=metrics,linkDOMPrima=allb,linkDOMDopo=alla,nuoveCoppie=sorted(added),rimossi=0,datePublishedPreservate=True,unicoDateModifiedLastmod='sound-of-silence-disturbed: 2026-10-12 → 2026-10-15',altreCinqueSitemapIdentiche=True,paroleCorpoInvariate=True,cartolineInvariate=True,datiGSC=sources,datoIndicizzazioneAggiornatoAl='2026-10-04',nessunAccessoLive=True,nessunaRichiesta=True)
(d/'ambito-grafo-gsc.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');(d/'diff-html.patch').write_bytes(subprocess.check_output(['git','diff','--','canzone/one-step-closer/index.html','canzone/sound-of-silence-disturbed/index.html']));print(json.dumps({k:v for k,v in out.items()if k in ['pagineHTML','linkEntranti','linkDOMPrima','linkDOMDopo','nuoveCoppie']},indent=2))
