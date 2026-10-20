from pathlib import Path
import json,re,difflib,collections,xml.etree.ElementTree as ET
b=Path('/private/tmp/dit-diagnosi-2026-10-20');w=b/'workspace';pages=json.loads((b/'confronto-iniziale.json').read_text());groups=collections.defaultdict(list);stats=collections.Counter();inventory=[]
for p in pages:
 n=p['file'];a=(w/n).read_text();z=(w/'output'/n).read_text();na=(b/'normalizzati/prima'/n).read_text() if p['changed'] else '';nz=(b/'normalizzati/dopo'/n).read_text() if p['changed'] else ''
 if p['changed']:
  group=p['type'] if p['onlyWhitespace'] else 'homepage';groups[group].append(n)
  if p['onlyWhitespace']:assert [x for x in na.splitlines() if x.strip()]==[x for x in nz.splitlines() if x.strip()]
  linesA=na.splitlines();linesZ=nz.splitlines();idx=next(i for i,(aa,zz) in enumerate(zip(linesA,linesZ)) if aa!=zz)
  inventory.append({'url':'https://www.dietroiltesto.it/'+('' if n=='index.html' else n.removesuffix('index.html')),'file':n,'group':group,'firstDifference':{'line':idx+1,'before':linesA[idx],'after':linesZ[idx]},'diff':list(difflib.unified_diff(linesA,linesZ,fromfile='prima',tofile='dopo',n=2)),'dateModifiedBefore':p['dateModifiedOld'],'dateModifiedAfter':p['dateModifiedNew']})
 for key,rx in [('style',r'<style>([\s\S]*?)</style>'),('footer',r'<footer class="piede">[\s\S]*?</footer>'),('href',r'\bhref="[^"]*"'),('img',r'<img\b[^>]*>'),('schema',r'<script type="application/ld\+json">(.*?)</script>'),('ganci',r'<span class="gancio">[\s\S]*?</span>'),('title',r'<title>.*?</title>'),('description',r'<meta name="description"[^>]*>')]:
  aa=re.findall(rx,a,re.S);zz=re.findall(rx,z,re.S)
  if key=='schema':aa=[re.sub(r',?"dateModified":"[^"]*"','',x) for x in aa];zz=[re.sub(r',?"dateModified":"[^"]*"','',x) for x in zz]
  if aa!=zz:stats[key+'Changed']+=1;groups[key+'Changed'].append(n)
 if 'minmax(300px, 1fr)' in a and 'minmax(min(300px, 100%), 1fr)' in z:stats['gridMobile']+=1;groups['gridMobile'].append(n)
 oldStyles=re.findall(r'<style>([\s\S]*?)</style>',a);newStyles=re.findall(r'<style>([\s\S]*?)</style>',z)
 cssa='\n'.join(oldStyles).replace('minmax(300px, 1fr)','minmax(min(300px, 100%), 1fr)');cssz='\n'.join(newStyles)
 # Compare declarations as lines to distinguish relocation from actual added/removed rules.
 if oldStyles!=newStyles and sorted(x.strip() for x in cssa.splitlines() if x.strip())!=sorted(x.strip() for x in cssz.splitlines() if x.strip()):stats['cssAdditionalChanged']+=1;groups['cssAdditionalChanged'].append(n)
 if oldStyles!=newStyles and 'pillola-editoriale' in cssa and cssa.split('.pillola-editoriale',1)[0]!=cssz.split('.pillola-editoriale',1)[0]:stats['pillolaStyleRelocation']+=1;groups['pillolaStyleRelocation'].append(n)
for field in ['datePublished','dateModified','canonical']:
 stats[field+'Changed']=sum(x.get(field+'Old')!=x.get(field+'New') for x in pages)
artistChoices=json.loads((w/'dati/affiliazioni-artisti.json').read_text())
assert all(n.split('/')[1] not in artistChoices for n in groups['artista'])
# Independently derive eligible URL inventory from unchanged data and actual generator criteria.
urls={'','archivio/','metodo/','chi-siamo/','privacy/','affiliazioni/','note-legali/'}
songs=json.loads((w/'dati/canzoni.json').read_text());artists=json.loads((w/'dati/artisti.json').read_text());albums=json.loads((w/'dati/album-computati.json').read_text());rac=json.loads((w/'dati/raccolte.json').read_text())
urls|={'canzone/'+c['slug']+'/' for c in songs};urls|={'artista/'+a['slug']+'/' for a in artists if a.get('storia') or len(a['canzoni'])>=3};urls|={'album/'+a['artistaSlug']+'/'+a['slug']+'/' for a in albums if a['esiste'] and a['indicizzabile']}
gen=collections.Counter(g for c in songs for g in c.get('generi',[]));dec=collections.Counter(str(int(re.search(r'\d{4}',str(c['anno'])).group())//10*10) for c in songs if re.search(r'\d{4}',str(c['anno'])))
urls|={'genere/'+g+'/' for g,n in gen.items() if n>=12 and rac['generi'].get(g)};urls|={'anni/'+d+'/' for d,n in dec.items() if n>=12 and rac['decenni'].get(d)}
dates=json.loads((b/'date-candidate.json').read_text());before={x['route'] for x in dates if x['old'] is not None};assert urls==before
stats['sitemapUrlCount']=len(urls);stats['sitemapUrlsAdded']=len(urls-before);stats['sitemapUrlsRemoved']=len(before-urls);stats['candidateLastmodChanged']=sum(x['route'] in urls and x['old']!=x['proposed'] for x in dates)
result={'counts':dict(stats),'groups':dict(groups),'inventory':inventory,'candidateSitemapDates':dates,'notes':['Sitemap generation stopped by unmodified gate; candidate dates computed read-only with existing F40 functions, not written sitemap files.']}
(b/'diagnosi.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'counts':stats,'groups':{k:len(v) for k,v in groups.items()}},indent=2))
