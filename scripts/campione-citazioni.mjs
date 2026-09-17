import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';
const canzoni = JSON.parse(readFileSync('dati/canzoni.json','utf8'));
const el = Array.isArray(canzoni)?canzoni:(canzoni.canzoni||canzoni.brani);
const VIRG = /[“«"]([^”»"]{2,400})[”»"]/g;
const DIRE = /(raccont|dichiar|spieg|ammett|ammise|ammesso|ha detto|disse|afferm|ricord|defin|descri|precis|confess|rivel|comment|rispos|chiese|domand|scherz|secondo |parole di|intervista|ha risposto|neg(a|o|ò|ato)|cit(a|ò|ato)|sostien|sosten|insist|osserv|aggiun|conclud|replic|obiett)/i;
const tutte=[];
for(const c of el){
  const blocchi=[['corpo',(c.corpo||[]).join(' ')],['fraseIconica',c.fraseIconica||'']];
  for(const [dove,t] of blocchi){
    if(!t) continue;
    VIRG.lastIndex=0; let m;
    while((m=VIRG.exec(t))){
      const dentro=m[1].trim();
      const par=dentro.split(/\s+/).length;
      if(par<4) continue;                    // sotto le 4 parole e' quasi sempre un titolo
      const inizio=t.slice(0,m.index);
      const conf=Math.max(inizio.lastIndexOf('. '),inizio.lastIndexOf('! '),inizio.lastIndexOf('? '));
      const frase=inizio.slice(conf+1).replace(/\s+/g,' ');
      if(!DIRE.test(frase)) continue;
      tutte.push({slug:c.slug,dove,parole:par,fonti:(c.fonti||[]).map(f=>f.nome+' | '+f.url)});
    }
  }
}
// sorteggio deterministico: ordino per hash(slug+indice+seme) e prendo i primi N
const SEME='2026-09-17-citazioni-dichiarate';
const N=12;
const ord=tutte.map((x,i)=>({...x,h:crypto.createHash('sha256').update(SEME+'|'+i+'|'+x.slug).digest('hex')}))
               .sort((a,b)=>a.h<b.h?-1:1);
const visti=new Set(); const campione=[];
for(const x of ord){ if(visti.has(x.slug)) continue; visti.add(x.slug); campione.push(x); if(campione.length>=N) break; }
console.log('citazioni dichiarate di 4+ parole: '+tutte.length+'  su '+new Set(tutte.map(x=>x.slug)).size+' schede');
console.log('seme: '+SEME+'   campione: '+N+' schede diverse\n');
for(const x of campione){ console.log(x.slug+'  ['+x.dove+', '+x.parole+' parole]'); for(const f of x.fonti) console.log('      '+f); }
