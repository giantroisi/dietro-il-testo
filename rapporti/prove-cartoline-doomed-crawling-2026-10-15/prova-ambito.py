from pathlib import Path
import subprocess,json,re
r=Path.cwd();base='4c899a2be';sel=['doomed','crawling']
def old(n):return subprocess.check_output(['git','show',base+':'+n])
p=json.loads((r/'dati/pillole.json').read_text());q=json.loads(old('dati/pillole.json'));assert set(p)-set(q)==set(sel);assert all(p[s]==q[s] for s in q)
for slug in sel:
 n=f'canzone/{slug}/index.html';a=old(n).decode();b=(r/n).read_text()
 b=re.sub(r'<figure class="pillola-editoriale">[\s\S]*?</figure>','',b)
 b=re.sub(r'\n\.pillola-editoriale \{[\s\S]*?@media print \{ \.pillola-editoriale \{ display: none; \} \}\n','',b)
 b=re.sub(r'\n          data-cartolina-storia="[^"]+"','',b)
 b=re.sub(r'(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+(">)',lambda m: re.search(re.escape(m[1])+r'[^\"]+\">',a)[0],b)
 b=b.replace('<meta property="og:image:width" content="1080">','<meta property="og:image:width" content="1200">').replace('<meta property="og:image:height" content="1920">','<meta property="og:image:height" content="630">')
 def whitespace(t):return re.sub(r'\s+',' ',t)
 assert whitespace(a)==whitespace(b),slug
for n in ['dati/canzoni.json','ricerca.js','scripts/pillole/editoriale.cjs']+[x.name for x in r.glob('sitemap*.xml')]:assert old(n)==(r/n).read_bytes(),n
for slug in q:
 for n in [f'canzone/{slug}/index.html',f"pillole/{q[slug]['file']}"]:assert old(n)==(r/n).read_bytes(),n
Path('rapporti/prove-cartoline-doomed-crawling-2026-10-15/ambito.json').write_text(json.dumps(dict(base=base,nuoveCartoline=sel,altreCartolinePreservate=17,datePreservate=True,seiSitemapIdentiche=True,corpoCanonicoInvariato=True),indent=2));print('OK2: solo inserimenti e metadati immagini; 17cartoline, renderer, dati, date e sitemap identici.')
