from pathlib import Path
import subprocess,shutil,json,hashlib
r=Path('/Users/gianmicheletroisi/Claude/dietro-il-testo');t=Path('/private/tmp/dit-diagnosi-2026-10-20');w=t/'workspace';w.mkdir(exist_ok=False)
files=subprocess.check_output(['git','ls-files','-z'],cwd=r).decode().split('\0');files=[n for n in files if n]
hashes={}
for n in files+['SEO-AFFILIAZIONE-FASE2.md','SEO-LASTMOD-2026-09-21.md']:
 p=r/n
 if p.is_file():hashes[n]=hashlib.sha256(p.read_bytes()).hexdigest()
for n in files:
 p=r/n
 if n.startswith(('scripts/','dati/')) or (n.endswith('.html') and not n.startswith('rapporti/')) or ('/' not in n and n.startswith('sitemap') and n.endswith('.xml')):
  q=w/n;q.parent.mkdir(exist_ok=True,parents=True);shutil.copy2(p,q)
for n in ['og','pillole','ritratti']:
 if (r/n).exists():(w/n).symlink_to(r/n,target_is_directory=True)
(t/'stato-iniziale.json').write_text(json.dumps({'repo':str(r),'head':subprocess.check_output(['git','rev-parse','HEAD'],cwd=r,text=True).strip(),'gitStatus':subprocess.check_output(['git','status','--short'],cwd=r,text=True),'sha256':hashes},indent=2)+'\n')
print('Snapshot temporaneo pronto; sorgenti concorrenti copiati senza modificarli.')
