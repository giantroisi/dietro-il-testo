from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json,hashlib,subprocess,sys,datetime
r=Path('/Users/gianmicheletroisi/Claude/dietro-il-testo');d=Path('/private/tmp/h2-pubblicazione-2026-10-19');stage=sys.argv[1]
ref='79253acd2b436cc2d9777ba733c424fe09171271' if stage=='prima' else 'c21c74ffdbaef01232d4cc6005b9c45c606b752b'
routes=[f'genere/{g}/index.html' for g in ['rock','pop','metal','punk']]+[f'anni/{a}/index.html' for a in ['1970','1980','1990','2000','2010']]
files=routes+[p.name for p in r.glob('sitemap*.xml')]
def check(n):
 u='https://www.dietroiltesto.it/'+(n[:-10] if n.endswith('index.html') else n)
 b=subprocess.check_output(['/usr/bin/curl','--fail','--silent','--show-error','--location','--max-time','30',u]);a=subprocess.check_output(['git','show',ref+':'+n],cwd=r);assert a==b,n+' differisce dalla versione attesa'
 return {'file':n,'url':u,'byteIdenticiAlCommit':True,'sha256':hashlib.sha256(b).hexdigest()}
with ThreadPoolExecutor(max_workers=5) as e:res=list(e.map(check,files))
(d/(stage+'.json')).write_text(json.dumps({'fase':stage,'commit':ref,'verificaUTC':datetime.datetime.now(datetime.timezone.utc).isoformat(),'file':res},indent=2)+'\n');print(f'{stage}: {len(res)} file pubblici identici al commit atteso.')
