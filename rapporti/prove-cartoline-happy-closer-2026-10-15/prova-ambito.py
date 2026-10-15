from pathlib import Path
import subprocess,json,re
r=Path.cwd();base='6efa89907';sel=['happy-song','one-step-closer']
def old(n):return subprocess.check_output(['git','show',base+':'+n])
p=json.loads((r/'dati/pillole.json').read_text());q=json.loads(old('dati/pillole.json'));assert set(p)-set(q)==set(sel) and all(p[s]==q[s] for s in q)
a=json.loads(old('dati/canzoni.json'));b=json.loads((r/'dati/canzoni.json').read_text());ch=[(x,y)for x,y in zip(a,b)if x!=y];assert len(ch)==1 and ch[0][0]['slug']=='happy-song';assert [k for k in ch[0][0]if ch[0][0][k]!=ch[0][1][k]]==['fonti'];f0=ch[0][0]['fonti'];f1=ch[0][1]['fonti'];assert f0[1:]==f1[1:-1] and 'wikipedia.org/wiki/Happy_Song_'in f1[-1]['url'];assert f0[0]['ruolo']==f1[0]['ruolo']
for slug in sel:
 n=f'canzone/{slug}/index.html';a=old(n).decode();b=(r/n).read_text()
 b=re.sub(r'<figure class="pillola-editoriale">[\s\S]*?</figure>','',b);b=re.sub(r'\n\.pillola-editoriale \{[\s\S]*?@media print \{ \.pillola-editoriale \{ display: none; \} \}\n','',b);b=re.sub(r'\n          data-cartolina-storia="[^"]+"','',b)
 b=re.sub(r'(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+(">)',lambda m:re.search(re.escape(m[1])+r'[^\"]+\">',a)[0],b);b=b.replace('<meta property="og:image:width" content="1080">','<meta property="og:image:width" content="1200">').replace('<meta property="og:image:height" content="1920">','<meta property="og:image:height" content="630">')
 if slug=='happy-song':
  b=b.replace(f1[0]['url'],f0[0]['url']).replace(f1[0]['nome'],f0[0]['nome']);b=b.replace('<li><span class="num">03</span><a href="'+f1[-1]['url']+'" target="_blank" rel="noopener">Wikipedia — anagrafica di Happy Song</a></li>','');b=b.replace('"dateModified":"2026-10-15"','"dateModified":"2026-10-11"')
 assert re.sub(r'\s+',' ',a)==re.sub(r'\s+',' ',b),slug
for n in ['ricerca.js','scripts/pillole/editoriale.cjs']+[x.name for x in r.glob('sitemap*.xml')if x.name!='sitemap-canzoni.xml']:assert old(n)==(r/n).read_bytes(),n
s=(r/'sitemap-canzoni.xml').read_text();s=s.replace('<loc>https://www.dietroiltesto.it/canzone/happy-song/</loc><lastmod>2026-10-15','<loc>https://www.dietroiltesto.it/canzone/happy-song/</loc><lastmod>2026-10-11');assert s==old('sitemap-canzoni.xml').decode()
for slug in q:
 for n in [f'canzone/{slug}/index.html','pillole/'+q[slug]['file']]:assert old(n)==(r/n).read_bytes(),n
Path('rapporti/prove-cartoline-happy-closer-2026-10-15/ambito.json').write_text(json.dumps(dict(base=base,nuoveCartoline=sel,altreCartolineIntatte=19,datePublishedPreservate=True,unicoLastmodDelLotto='happy-song:11→15ottobre per fonti',correzioneSeparata='one-step-closer:11→15ottobre in6efa89907',nessunBuildGenerale=True),indent=2));print('OK: due figure, sole fontiHappySong, 19cartoline intatte, un solo lastmod oltre alla correzione separata.')
