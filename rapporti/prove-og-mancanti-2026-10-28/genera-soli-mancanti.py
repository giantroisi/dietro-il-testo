"""Ripristino limitato ai 39 file mancanti; non richiama main/versioni OG."""
import importlib.util
import json
from pathlib import Path

state = json.loads(Path('/private/tmp/dit-og-assets-stato-2026-10-28.json').read_text())
root = Path(state['preview'])
evidence = Path(state['evidence'])
spec = importlib.util.spec_from_file_location('og', root / 'scripts/genera-og.py')
og = importlib.util.module_from_spec(spec)
spec.loader.exec_module(og)
songs = json.loads((root / 'dati/canzoni.json').read_text())
expected = set(json.loads((evidence / '39-slug.json').read_text()))
missing = {c['slug'] for c in songs if not (root / 'og' / (c['slug'] + '.png')).exists()}
assert missing == expected and len(missing) == 39
# P3: nei soli nuovi PNG omettiamo tre incisi letterali ridondanti,
# senza modificare dati, testi HTML o aggiungere affermazioni editoriali.
omissions = {
    'stop-crying-your-heart-out': ' — "stop crying your heart out" —',
    'je-so-pazzo': ' — "je so\' pazzo", sono pazzo —',
    'fell-in-love-with-a-girl': ' — ah-ah-ah-ah, cantate insieme da Jack e Meg dopo ogni strofa —',
}
inputs = []
for source in songs:
    if source['slug'] not in missing:
        continue
    song = dict(source)
    if song['slug'] in omissions:
        incision = omissions[song['slug']]
        assert incision in song['fraseIconica'], song['slug']
        song['fraseIconica'] = song['fraseIconica'].replace(incision, '', 1)
    dest = root / 'og' / (song['slug'] + '.png')
    assert not dest.exists()
    og.genera_immagine(song, dest)
    inputs.append({'slug': song['slug'], 'titolo': song['titolo'], 'artista': song['artista'],
                   'fraseRenderizzata': song['fraseIconica'],
                   'incisoLetteraleOmessoPerP3': song['slug'] in omissions})
(evidence / 'input-render-39.json').write_text(json.dumps(inputs, ensure_ascii=False, indent=2) + '\n')
print('Generati soltanto 39 PNG; registro og-versioni e dati originali non modificati.')
