from pathlib import Path
import subprocess,json,re,hashlib
r=Path.cwd();sel=json.loads(Path('/private/tmp/cartoline-iconico-2026-10-15/slugs.json').read_text());base='376c1ee3a'
def old(n):return subprocess.check_output(['git','show',base+':'+n])
p=json.loads((r/'dati/pillole.json').read_text());q=json.loads(old('dati/pillole.json'))
assert set(p)==set(q)
assert {s for s in p if p[s]!=q[s]}==set(sel)
for slug in sel:
 n=f'canzone/{slug}/index.html';a=old(n).decode();b=(r/n).read_text()
 def norm(t):return re.sub(r'-storia.jpg\?v=[0-9a-f]{12}','-storia.jpg?v=HASH',re.sub(r'<figure class="pillola-editoriale">[\s\S]*?</figure>','FIGURA',t))
 assert norm(a)==norm(b),slug
for n in ['dati/canzoni.json','ricerca.js']+[x.name for x in r.glob('sitemap*.xml')]+[f'{d}/{s}/{n}'for d,s,n in [('canzone','mantra','index.html'),('canzone','in-the-end','index.html')]]:assert old(n)==(r/n).read_bytes(),n
for slug in ['mantra','in-the-end']:assert old('pillole/'+p[slug]['file'])==(r/'pillole'/p[slug]['file']).read_bytes()
Path('rapporti/prove-cartoline-iconico-2026-10-15/ambito.json').write_text(json.dumps(dict(base=base,pagine=sel,datePreservate=True,sitemapPreservate=6,contenutoCanonicoInvariato=True,mantraInTheEndPreservati=True),indent=2))
print('OK15: sole figure e URLversione. Date, 6sitemap, dati e MANTRA/InTheEnd identici.')
