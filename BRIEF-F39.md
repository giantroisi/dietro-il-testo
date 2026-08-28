# Brief operativo — F39

Scritto il 28 agosto 2026. F39 è nato da una domanda diretta dell'autore ("perché tutte le altre non hanno il player Spotify?") durante F34: non sono canzoni assenti da Spotify — sono 82 brani notissimi — ma nessuno ha ancora verificato l'ID giusto per ciascuno. L'autore ha chiesto esplicitamente lo stesso standard di rigore di F20 prima di partire.

---

## 0. Prima di iniziare

**Leggi `COSTITUZIONE.md`.** Se questo brief contraddice un principio, **prevale il principio**: segnalalo invece di eseguirlo alla lettera. Qui è rilevante soprattutto **P1** ("la verità viene prima della quantità"): un ID sbagliato è peggio di nessun ID, perché mostra all'utente il player di una canzone diversa presentandolo come corretto.

**Aggiorna `ROADMAP.md`** a ogni lotto completato, non solo alla fine: quante canzoni su 82 restano, quali sono state fatte in questo passaggio, quali criticità sono emerse.

### Come funziona il sito adesso

- **Fonte di verità:** `dati/canzoni.json`. Il campo è `spotifyId`: la sola stringa alfanumerica dopo `/track/` nell'URL di Spotify (es. `7tFiyTwD0nx5a1eklYtX2J` per Bohemian Rhapsody), non l'URL intero.
- **Effetto in pagina:** quando `spotifyId` esiste, `paginaCanzone` (in `scripts/genera/pagine.mjs`) mostra il player Spotify in testata al posto del riquadro segnaposto, e la sezione più sotto diventa "Continua" invece di "Ascolta" (F34).
- **Pubblicazione:** `node scripts/genera-sito.mjs`, poi copia di `sito/` sulla radice, commit, push. Vercel distribuisce su `dietroiltesto.it`.

### Le 82 canzoni

Elenco completo con slug, titolo, artista, anno e album dichiarati in `dati/canzoni.json` — usali per la ricerca, non fidarti della sola memoria:

```
caruso — Caruso — Lucio Dalla — 1986 — DallAmeriCaruso
iron-man — Iron Man — Black Sabbath — 1970 — Paranoid
should-i-stay — Should I Stay or Should I Go — The Clash — 1982 — Combat Rock
rimmel — Rimmel — Francesco De Gregori — 1975 — Rimmel
vivo-per-lei — Vivo per lei — Andrea Bocelli e Giorgia — 1995 — Bocelli (album)
purple-rain — Purple Rain — Prince — 1984 — Purple Rain (colonna sonora)
wish-you-were-here — Wish You Were Here — Pink Floyd — 1975 — Wish You Were Here
hurt — Hurt — Nine Inch Nails — 1994 — The Downward Spiral
take-on-me — Take On Me — a-ha — 1985 — Hunting High and Low
dreams — Dreams — Fleetwood Mac — 1977 — Rumours
heroes — Heroes — David Bowie — 1977 — "Heroes"
senza-una-donna — Senza una donna — Zucchero — 1987/1991 — Blue's
under-the-bridge — Under the Bridge — Red Hot Chili Peppers — 1991 — Blood Sugar Sex Magik
every-breath-you-take — Every Breath You Take — The Police — 1983 — Synchronicity
fast-car — Fast Car — Tracy Chapman — 1988 — Tracy Chapman
losing-my-religion — Losing My Religion — R.E.M. — 1991 — Out of Time
i-will-always-love-you — I Will Always Love You — Whitney Houston — 1992 — The Bodyguard
yes-i-know-my-way — Yes I Know My Way — Pino Daniele — 1981 — Vai mo'
the-sound-of-silence — The Sound of Silence — Simon & Garfunkel — 1964/1965 — Wednesday Morning, 3 A.M. / Sounds of Silence
paint-it-black — Paint It Black — The Rolling Stones — 1966 — Aftermath
piu-bella-cosa — Più bella cosa — Eros Ramazzotti — 1996 — Dove c'è musica
rocket-man — Rocket Man — Elton John — 1972 — Honky Château
yellow — Yellow — Coldplay — 2000 — Parachutes
il-carrozzone — Il carrozzone — Renato Zero — 1979 — EroZero
can-you-feel-my-heart — Can You Feel My Heart — Bring Me the Horizon — 2013 — Sempiternal
drown — Drown — Bring Me the Horizon — 2014/2015 — That's the Spirit
throne — Throne — Bring Me the Horizon — 2015 — That's the Spirit
mantra — MANTRA — Bring Me the Horizon — 2018/2019 — amo
sleepwalking — Sleepwalking — Bring Me the Horizon — 2013 — Sempiternal
antivist — Antivist — Bring Me the Horizon — 2013 — Sempiternal
chelsea-smile — Chelsea Smile — Bring Me the Horizon — 2008 — Suicide Season
doomed — Doomed — Bring Me the Horizon — 2015 — That's the Spirit
follow-you — Follow You — Bring Me the Horizon — 2015/2016 — That's the Spirit
parasite-eve — Parasite Eve — Bring Me the Horizon — 2020 — POST HUMAN: Survival Horror
lost — LosT — Bring Me the Horizon — 2023/2024 — POST HUMAN: NeX GEn
die4u — DiE4u — Bring Me the Horizon — 2021/2024 — POST HUMAN: NeX GEn
riders-on-the-storm — Riders on the Storm — The Doors — 1971 — L.A. Woman
personal-jesus — Personal Jesus — Depeche Mode — 1989 — Violator
sono-solo-canzonette — Sono solo canzonette — Edoardo Bennato — 1980 — Sono solo canzonette
shadow-moses — Shadow Moses — Bring Me the Horizon — 2013 — Sempiternal
wonderful-life — wonderful life — Bring Me the Horizon — 2018/2019 — amo
nihilist-blues — nihilist blues — Bring Me the Horizon — 2019 — amo
one — One — Metallica — 1988 — ...And Justice for All
ace-of-spades — Ace of Spades — Motörhead — 1980 — Ace of Spades
psychosocial — Psychosocial — Slipknot — 2008 — All Hope Is Gone
symphony-of-destruction — Symphony of Destruction — Megadeth — 1992 — Countdown to Extinction
sober — Sober — Tool — 1993 — Undertow
square-hammer — Square Hammer — Ghost — 2016 — Popestar
american-idiot — American Idiot — Green Day — 2004 — American Idiot
boulevard-of-broken-dreams — Boulevard of Broken Dreams — Green Day — 2004 — American Idiot
fat-lip — Fat Lip — Sum 41 — 2001 — All Killer No Filler
in-too-deep — In Too Deep — Sum 41 — 2001 — All Killer No Filler
crawling — Crawling — Linkin Park — 2000/2001 — Hybrid Theory
one-step-closer — One Step Closer — Linkin Park — 2000 — Hybrid Theory
uprising — Uprising — Muse — 2009 — The Resistance
starlight — Starlight — Muse — 2006 — Black Holes and Revelations
all-the-small-things — All the Small Things — Blink-182 — 1999 — Enema of the State
i-miss-you — I Miss You — Blink-182 — 2003 — blink-182
she-looks-so-perfect — She Looks So Perfect — 5 Seconds of Summer — 2014 — 5 Seconds of Summer
still-waiting — Still Waiting — Sum 41 — 2002 — Does This Look Infected?
whats-my-age-again — What's My Age Again? — Blink-182 — 1999 — Enema of the State
happy-song — Happy Song — Bring Me the Horizon — 2015 — That's the Spirit
ho-messo-via — Ho messo via — Ligabue — 1993 — Sopravvissuti e sopravviventi
hanno-ucciso-luomo-ragno — Hanno ucciso l'Uomo Ragno — 883 — 1992 — Hanno ucciso l'Uomo Ragno
wake-me-up — Wake Me Up — Avicii — 2013 — True
hypa-hypa — Hypa Hypa — Electric Callboy — 2020 — MMXX
diventerai-una-star — Diventerai una star — Finley — 2007 — Tutto è possibile
vieni-a-ballare-in-puglia — Vieni a ballare in Puglia — Caparezza — 2008 — Le dimensioni del mio caos
marmellata-25 — Marmellata #25 — Cesare Cremonini — 2005 — Maggese
get-lucky — Get Lucky — Daft Punk — 2013 — Random Access Memories
shape-of-you — Shape of You — Ed Sheeran — 2017 — ÷ (Divide)
sugar-were-goin-down — Sugar, We're Goin Down — Fall Out Boy — 2005 — From Under the Cork Tree
ragu — Ragù — Fulminacci — 2023 — Infinito +1
21-guns — 21 Guns — Green Day — 2009 — 21st Century Breakdown
mr-brightside — Mr. Brightside — The Killers — 2003 — Hot Fuss
cattiva — Cattiva — Naska — 2023 — La mia stanza
break-stuff — Break Stuff — Limp Bizkit — 2000 — Significant Other
my-exs-best-friend — my ex's best friend — Machine Gun Kelly — 2020 — Tickets to My Downfall
welcome-to-the-black-parade — Welcome to the Black Parade — My Chemical Romance — 2006 — The Black Parade
supermassive-black-hole — Supermassive Black Hole — Muse — 2006 — Black Holes and Revelations
dont-look-back-in-anger — Don't Look Back in Anger — Oasis — 1995 — (What's the Story) Morning Glory?
ringo-starr — Ringo Starr — Pinguini Tattici Nucleari — 2020 — Sanremo 2020 / Fuori dall'hype
```

---

## Standard di rigore (stesso di F20)

1. **Cerca, non ricordare.** Non scrivere mai un ID a memoria o "quasi sicuro": va trovato ora, sulla pagina Spotify reale del brano.
2. **Conferma titolo, artista e versione prima di prendere l'ID.** Molti titoli in questa lista sono ambigui o ricorrenti:
   - *"One"* esiste di U2, Metallica, Three Dog Night... qui serve **Metallica, ...And Justice for All, 1988**.
   - *"Heroes"* di Bowie ha una versione singolo più corta e la versione album più lunga: verificare quale compare sull'album `"Heroes"` del 1977 e preferire quella, a meno che l'unica disponibile con quel nome esatto sul profilo ufficiale dell'artista sia un'altra — in tal caso annotarlo.
   - *"The Sound of Silence"* ha la versione acustica del 1964 (Wednesday Morning, 3 A.M.) e quella elettrica del 1965 (Sounds of Silence): i dati citano entrambi gli anni. Cercare quella con più ascolti/più nota sul profilo ufficiale di Simon & Garfunkel e annotare quale delle due si è scelta.
   - I titoli tutti minuscoli o in stile particolare di Bring Me the Horizon (`MANTRA`, `LosT`, `DiE4u`, `wonderful life`, `nihilist blues`) vanno cercati esattamente come compaiono su Spotify, che potrebbe differire dalla capitalizzazione nei nostri dati — non è un errore dei nostri dati, è la grafica scelta dall'artista.
   - *"Ringo Starr"* di Pinguini Tattici Nucleari ha una versione Sanremo 2020 e una su "Fuori dall'hype": scegliere quella ufficiale più diffusa sul profilo dell'artista e annotare quale.
   - *"Vivo per lei"* deve essere specificamente il duetto **Bocelli e Giorgia**, non le altre versioni che Bocelli o Giorgia hanno inciso separatamente o con altri artisti nel tempo.
3. **Prendi l'ID solo dall'URL della pagina traccia ufficiale** (`open.spotify.com/track/<ID>`), mai da un aggregatore terzo, mai da un embed trovato altrove senza aver verificato che porti alla pagina giusta.
4. **Se dopo una ricerca onesta resta un dubbio ragionevole** (due versioni ugualmente plausibili, un artista con più profili, un remaster che potrebbe non essere quello "canonico"), **non indovinare**: lascia il campo vuoto per quella canzone e segnalalo nel registro invece di forzare un ID incerto. Un player assente è onesto (P1); un player sbagliato mostra una canzone diversa spacciandola per quella giusta.
5. **Un lotto per commit**, non tutte le 82 insieme: più facile verificare, più facile tornare indietro su un singolo errore senza toccare il resto.

## Cosa fare, per ogni canzone

1. Cerca `<titolo> <artista> spotify` (o naviga direttamente su open.spotify.com) e apri la pagina traccia.
2. Verifica: nome traccia = titolo esatto (a meno della stilizzazione dell'artista), artista = quello giusto, album = coerente con quanto già in `dati/canzoni.json` (stesso titolo o comunque compatibile con l'anno dichiarato).
3. Copia solo l'ID (22 caratteri alfanumerici dopo `/track/`, prima di un eventuale `?`).
4. Scrivi il valore nel campo `spotifyId` della canzone corrispondente in `dati/canzoni.json`.
5. A fine lotto: `node scripts/genera-sito.mjs`, i quattro controlli automatici, verifica nel browser che il player carichi davvero (non solo che l'iframe sia presente — vedi il falso allarme già capitato in F34: un iframe vuoto al primo caricamento non è per forza un ID sbagliato, verificare con un secondo caricamento pulito prima di correggere).

## Criterio di accettazione

- Ogni `spotifyId` aggiunto è stato verificato sulla pagina Spotify reale, non copiato da un'altra fonte.
- Nessun ID aggiunto "quasi sicuro": in caso di dubbio, il campo resta vuoto e la canzone resta nell'elenco delle mancanti, con una nota sul perché.
- Il registro di `ROADMAP.md` riporta, lotto per lotto, quante canzoni sono state fatte, quali restano, e quali sono state lasciate vuote apposta con il motivo.
- F39 passa a `completato` solo quando le 82 sono tutte verificate (con ID trovato) o dichiarate esplicitamente irrisolvibili con motivo — non quando "la maggior parte" è fatta.

## Rituale di pubblicazione

```
node scripts/genera-sito.mjs
node scripts/check-link.mjs
node scripts/check-coerenza.mjs
node scripts/check-testi.mjs
node scripts/check-contrasto-v2.mjs
```

Poi: verifica nel browser che il player carichi davvero (non solo che l'iframe esista), copia `sito/` sulla radice, aggiorna `ROADMAP.md`, committa con `F39: verificati N/82 ID Spotify (lotto X)`, push, conferma che il dominio serva la nuova versione.

## Cosa non rompere

- `dati/canzoni.json` come unica fonte di verità: l'ID vive lì, non va scritto altrove.
- Le 75 schede che già hanno un `spotifyId` verificato (F34): non ritoccarle.
- Il comportamento a due rami di F34 ("Continua" quando il player c'è, "Ascolta" con dichiarazione di assenza quando non c'è): resta automatico in base alla presenza del campo, nessuna modifica al template necessaria.
