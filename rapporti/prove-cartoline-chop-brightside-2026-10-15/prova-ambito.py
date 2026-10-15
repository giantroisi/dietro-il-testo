from pathlib import Path
import subprocess,json,re
r=Path.cwd();base='5c87bfbd1';sel=['chop-suey','mr-brightside'];proof=r/'rapporti/prove-cartoline-chop-brightside-2026-10-15'
def old(n):return subprocess.check_output(['git','show',base+':'+n])
p=json.loads((r/'dati/pillole.json').read_text());q=json.loads(old('dati/pillole.json'));assert set(p)-set(q)==set(sel);assert all(p[s]==q[s]for s in q)
a=json.loads(old('dati/canzoni.json'));b=json.loads((r/'dati/canzoni.json').read_text());fs={}
for x,y in zip(a,b):
 assert x['slug']==y['slug']
 if x['slug']in sel:
  k=len(x['fonti']);fs[x['slug']]=y['fonti'][k:];assert len(fs[x['slug']])==(0 if x['slug']=='chop-suey' else 1);y['fonti']=y['fonti'][:k]
 assert x==y,x['slug']
for slug in sel:
 n=f'canzone/{slug}/index.html';a=old(n).decode();b=(r/n).read_text()
 b=re.sub(r'<figure class="pillola-editoriale">[\s\S]*?</figure>','',b)
 b=re.sub(r'\n\.pillola-editoriale \{[\s\S]*?@media print \{ \.pillola-editoriale \{ display: none; \} \}\n','',b)
 b=re.sub(r'\n          data-cartolina-storia="[^"]+"','',b)
 b=re.sub(r'(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+(">)',lambda m:re.search(re.escape(m[1])+r'[^\"]+\">',a)[0],b)
 b=b.replace('<meta property="og:image:width" content="1080">','<meta property="og:image:width" content="1200">').replace('<meta property="og:image:height" content="1920">','<meta property="og:image:height" content="630">')
 for f in fs[slug]:
  import html
  pattern=r'<li><span class="num">\d+</span><a href="'+re.escape(html.escape(f['url'],quote=True))+r'"[^>]*>'+re.escape(html.escape(f['nome']))+r'</a></li>'
  b,k=re.subn(pattern,'',b);assert k==1
 if slug=='mr-brightside':b=b.replace('"dateModified":"2026-10-15"','"dateModified":"2026-10-11"')
 assert re.sub(r'\s+',' ',a)==re.sub(r'\s+',' ',b),slug
for n in ['ricerca.js','scripts/pillole/editoriale.cjs','scripts/pillole/render.cjs']+[x.name for x in r.glob('sitemap*.xml')if x.name!='sitemap-canzoni.xml']:assert old(n)==(r/n).read_bytes(),n
s=(r/'sitemap-canzoni.xml').read_text()
for slug in ['mr-brightside']:
 s,k=re.subn(r'(<loc>https://www.dietroiltesto.it/canzone/'+slug+r'/</loc>\s*<lastmod>)2026-10-15(</lastmod>)',r'\g<1>2026-10-11\2',s);assert k==1
assert s==old('sitemap-canzoni.xml').decode()
for slug in q:
 for n in [f'canzone/{slug}/index.html',f"pillole/{q[slug]['file']}"]:assert old(n)==(r/n).read_bytes(),n
proof.joinpath('ambito.json').write_text(json.dumps(dict(base=base,nuoveCartoline=sel,altreCartolinePreservate=len(q),nuoveFonti=fs,datePublishedPreservate=True,dateModifiedLastmodModificatiSolo=['mr-brightside'],altreCinqueSitemapIdentiche=True,corpoCanonicoInvariato=True,rendererInvariato=True),ensure_ascii=False,indent=2)+'\n');print('OK: solo due anteprime, una fonte e una data pertinente; 21 cartoline precedenti preservate.')
