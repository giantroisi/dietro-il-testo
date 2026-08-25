#!/usr/bin/env python3
"""F23 — genera l'immagine di anteprima (og:image) di ogni canzone.

Ogni immagine contiene solo dati reali della scheda: titolo, artista, il
"momento iconico" già parafrasato nei nostri dati (mai un verso originale,
Costituzione P3), il colore identitario e il logo. Si esegue una sola volta
in locale quando i dati cambiano; il risultato (og/<slug>.png) viene
committato come le altre risorse statiche (logo.png, favicon...) e copiato
in sito/ da genera-sito.mjs. Nessuna dipendenza aggiunta al sito pubblicato:
Pillow/numpy servono solo a questo script di build, mai al browser.

Uso: python3 scripts/genera-og.py [--slug <slug>]
"""

import argparse
import json
import re
import textwrap
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630

FONT_TITOLO = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_CORSIVO = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
FONT_TESTO = "/System/Library/Fonts/SFNS.ttf"
FONT_MONO = "/System/Library/Fonts/SFNSMono.ttf"


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def _lin(v):
    v = v / 255
    return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4


def luminanza(hex_colore):
    r, g, b = hex_to_rgb(hex_colore)
    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)


def gradiente_diagonale(w, h, c1, c2):
    """Sfondo con transizione diagonale dal colore identitario al secondario."""
    r1, g1, b1 = hex_to_rgb(c1)
    r2, g2, b2 = hex_to_rgb(c2)
    x = np.linspace(0, 1, w)
    y = np.linspace(0, 1, h)
    t = (x[None, :] + y[:, None]) / 2
    r = (r1 + (r2 - r1) * t).astype(np.uint8)
    g = (g1 + (g2 - g1) * t).astype(np.uint8)
    b = (b1 + (b2 - b1) * t).astype(np.uint8)
    return Image.fromarray(np.dstack([r, g, b]), "RGB")


def scrim_verticale(w, h, alfa_max=170):
    """Velatura scura crescente verso il basso, per leggibilità del testo
    indipendentemente dalla tonalità del colore identitario."""
    y = np.linspace(0, 1, h)
    curva = np.clip((y - 0.28) / 0.72, 0, 1) ** 1.3
    alfa = (curva * alfa_max).astype(np.uint8)
    alfa = np.repeat(alfa[:, None], w, axis=1)
    strato = np.zeros((h, w, 4), dtype=np.uint8)
    strato[..., 3] = alfa
    return Image.fromarray(strato, "RGBA")


def logo_tinto(colore_rgba="#FFFFFF", larghezza=252):
    logo = Image.open(ROOT / "logo.png").convert("RGBA")
    rapporto = logo.height / logo.width
    logo = logo.resize((larghezza, round(larghezza * rapporto)), Image.LANCZOS)
    alfa = logo.split()[3]
    tinta = Image.new("RGBA", logo.size, colore_rgba)
    tinta.putalpha(alfa)
    return tinta


def avvolgi(draw, testo, font, larghezza_max):
    righe = []
    for paragrafo in testo.split("\n"):
        parole = paragrafo.split()
        riga = ""
        for parola in parole:
            prova = f"{riga} {parola}".strip()
            if draw.textlength(prova, font=font) <= larghezza_max:
                riga = prova
            else:
                if riga:
                    righe.append(riga)
                riga = parola
        righe.append(riga)
    return righe


def adatta_titolo(draw, testo, larghezza_max, max_righe=2, dim_max=76, dim_min=42):
    for dim in range(dim_max, dim_min - 1, -2):
        font = ImageFont.truetype(FONT_TITOLO, dim)
        righe = avvolgi(draw, testo, font, larghezza_max)
        if len(righe) <= max_righe:
            return font, righe
    font = ImageFont.truetype(FONT_TITOLO, dim_min)
    righe = avvolgi(draw, testo, font, larghezza_max)
    return font, righe[:max_righe]


def tronca_righe(righe, max_righe):
    """Se il testo va oltre max_righe, lo segnala con "…" invece di sparire in silenzio."""
    if len(righe) <= max_righe:
        return righe
    righe = righe[:max_righe]
    righe[-1] = righe[-1].rstrip(" .,;:…") + "…"
    return righe


def frase_di_anteprima(c):
    """Non riproduce mai il testo della canzone (P3): usa la frase iconica
    già parafrasata, o in mancanza un estratto della storia, anch'essa
    scritta con parole nostre."""
    if c.get("fraseIconica"):
        return c["fraseIconica"]
    storia = (c.get("corpo") or [""])[0]
    if len(storia) <= 230:
        return storia
    tagliata = storia[:230]
    ultimo_spazio = tagliata.rfind(" ")
    return tagliata[: ultimo_spazio if ultimo_spazio > 150 else 230].rstrip(",;: ") + "…"


def anno_breve(c):
    m = re.search(r"\d{4}", str(c.get("anno") or ""))
    return m.group(0) if m else ""


def genera_immagine(c, destinazione):
    colore = c.get("colore") or "#333333"
    colore2 = c.get("colore2") or colore

    base = gradiente_diagonale(W, H, colore, colore2).convert("RGBA")
    base.alpha_composite(scrim_verticale(W, H))
    draw = ImageDraw.Draw(base)

    testo_col = "#FFFFFF"
    marg = 72

    # marchio, in alto a sinistra
    logo = logo_tinto(testo_col, larghezza=228)
    base.alpha_composite(logo, (marg, 54))

    # sopratitolo: artista · anno
    eyebrow = " · ".join(filter(None, [c.get("artista", "").upper(), anno_breve(c)]))
    font_mono = ImageFont.truetype(FONT_MONO, 24)
    draw.text((marg, 150), eyebrow, font=font_mono, fill=(255, 255, 255, 235))

    # titolo, adattato per stare in due righe
    larghezza_max = W - marg * 2
    font_titolo, righe_titolo = adatta_titolo(draw, c["titolo"], larghezza_max)
    y = 196
    interlinea = int(font_titolo.size * 1.14)
    for riga in righe_titolo:
        draw.text((marg, y), riga, font=font_titolo, fill=testo_col)
        y += interlinea
    y += 14

    # piccolo separatore, richiama il motivo delle note musicali del logo
    draw.text((marg, y), "♪", font=ImageFont.truetype(FONT_CORSIVO, 30), fill=(255, 255, 255, 190))
    y += 46

    # momento iconico (o estratto della storia), mai il testo originale
    font_frase = ImageFont.truetype(FONT_CORSIVO, 30)
    righe_frase = tronca_righe(avvolgi(draw, frase_di_anteprima(c), font_frase, larghezza_max), 3)
    for riga in righe_frase:
        draw.text((marg, y), riga, font=font_frase, fill=(255, 255, 255, 235))
        y += 40

    # dominio, in basso a destra
    dominio = "dietroiltesto.it"
    font_piede = ImageFont.truetype(FONT_MONO, 18)
    larghezza_piede = draw.textlength(dominio, font=font_piede)
    draw.text((W - marg - larghezza_piede, H - 46), dominio, font=font_piede, fill=(255, 255, 255, 200))

    destinazione.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(destinazione, "PNG", optimize=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", default=None)
    args = ap.parse_args()

    canzoni = json.loads((ROOT / "dati" / "canzoni.json").read_text(encoding="utf-8"))
    if args.slug:
        canzoni = [c for c in canzoni if c["slug"] == args.slug]
        if not canzoni:
            raise SystemExit(f"Nessuna canzone con slug '{args.slug}'")

    out_dir = ROOT / "og"
    for c in canzoni:
        genera_immagine(c, out_dir / f"{c['slug']}.png")

    print(f"Immagini generate: {len(canzoni)} in {out_dir}")


if __name__ == "__main__":
    main()
