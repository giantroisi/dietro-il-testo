# Bootstrap reale della protezione tecnica — 20 ottobre 2026

## Mandato e ambito

Autorizzazione diretta del proprietario in questa chat: generare e conservare esclusivamente sul suo Mac la chiave privata, fuori dal repository; usarla per il bootstrap e per firmare il manifesto esatto della sola protezione derivata da `0f4bd0dec`; installare controller, integrare, fare push e pubblicare dopo i controlli. Nessun consenso generico a firmare altri lotti. Nessun IndexNow o GSC.

Base ufficiale ricontrollata: `ad9091a5101f1b50228583217aa3b90257a9d966`. Copia pulita `/Users/gianmicheletroisi/.codex/worktrees/bootstrap-protezione-2026-10-20/dietro-il-testo`, ramo `codex/bootstrap-protezione-2026-10-20`. Main sporco e tutte le copie/proposte precedenti conservati. Il checkout principale resta alla sua revisione originaria: il rilascio viene eseguito dalla copia separata senza sovrascrivere i due script e la documentazione concorrenti.

## Bootstrap separato, poi firma e integrazione

1. B `7ca2a36671836dbe8466a4f3adb456baa23d290f`: bootstrap manuale specificamente autorizzato, aggiunge soltanto la policy iniziale di fiducia. Non aggiunge il codice che deve controllare. Questo commit iniziale è il confine di fiducia, non un lotto autoapprovato.
2. Installazione esterna immutabile del controller originale `0f4bd0dec`, chiave pubblica e B nell’ancora fissa.
3. A `15f73c8fcc5547d62aa4a948df7db84e897c11b7`: aggiunge soltanto manifesto e approvazione Ed25519 verificata, legata a B. Firma precedente alle modifiche operative.
4. C `7b3df62fb6fe19d7932dd739aa68e14289f5214f`: gli undici file tecnici esatti, più ricevuta di preparazione del controller esterno, dopo tutti i controlli.
5. P `be473085522d773cd312d53d348bcfae246919ea`: sola ricevuta di promozione; **zero file pubblici promossi**, baseline storica invariata.

Manifesto `lotti/238d744606f26100d946b2ab7f53991b8d78c0d96f41710094f6b620a0653a28.json`, digest SHA256 `238d744606f26100d946b2ab7f53991b8d78c0d96f41710094f6b620a0653a28`. Azioni firmate build/promuovi/struttura, esclusivamente per queste impronte. Elenco completo nel manifesto: renderer e perimetro, autorità/entrypoint, IndexNow disabilitato, test, baseline/evidenza deterministica e istruzioni operative AGENTS. Policy iniziale nel distinto bootstrap B. La modifica client della homepage presente in 0f4 è stata esclusa: `scripts/genera/ricerca.mjs` e `ricerca.js` restano quelli della base pubblicata, senza varianti visibili o comportamentali.

## Custodia locale — nessun segreto nel rapporto

- Impronta SHA256 della chiave pubblica SPKI/DER: `0451b1b4adc20ded5e726419e36709676d81dbd2b2b7d6804fee3d824822e176`.
- **Solo percorso** della chiave privata: `/Users/gianmicheletroisi/.local/share/dietro-il-testo/proprietario/ed25519-privata.pem`. PKCS8 Ed25519, file 0400 e cartella 0500, flag macOS uchg; mai copiata nel repository/output/log/chat, GitHub, Vercel o variabili di build.
- Ancora pubblica: `/Users/gianmicheletroisi/.config/dietro-il-testo/autorita.json`, file 0400/cartella 0500, uchg.
- Controller: `/Users/gianmicheletroisi/.local/lib/dietro-il-testo/controller/0f4bd0dec29273845723a6cfc91ebdc9a3a3b17b`, file 0400, launcher/cartelle 0500, uchg. Copie originali dell’entrypoint/autorità/IndexNow con impronte nel verbale pubblico di installazione.
- Launcher `lotto-sicuro`: ambiente ridotto, runtime `/usr/local/bin/node` verificato con SHA256 `c583851fc85e4618b2374cda13399d59d373ad7cebfc4b55160820b88dcce67b` prima di ogni esecuzione. Il runtime è di proprietà root.
- Stato IndexNow esterno: `/Users/gianmicheletroisi/.local/state/dietro-il-testo/indexnow/`, 0700; nessun consenso reale né nonce creato. Il percorso resta fuori dai permessi ordinari di scrittura del lotto.

Il lotto non può sostituire controller/ancora/policy con una propria approvazione. Prove reali di apertura in scrittura negata EPERM per controller e ancora; nessun flag rimosso. Un amministratore o codice arbitrario con i pieni privilegi del proprietario potrebbe rimuovere uchg: questa installazione non pretende isolamento da tale soggetto. AGENTS prescrive il percorso operativo esterno per build/promozione e verifica prima del rilascio; non sono state cambiate credenziali, impostazioni remote o le altre copie.

## Verifiche effettive

- Controller esterno: firma/base/file/storia/snapshot validi, build completo e sigillo, promozione vuota; nuovo clone pulito su P e generazione vuota riuscita.
- 20/20 E2E ripetuti, incluse cartolina → promozione → clone pulito → successivo lotto ordinario di link; autoapprovazione, chiave falsa, manomissioni baseline/gate/test/policy, assume-unchanged, consenso strutturale precedente e nonce monouso. Firme e pubblicazioni dei test esclusivamente di fixture effimere; **rete IndexNow reale zero**.
- 14/14 regressioni ripetute: 1124 file deterministici con orologi 2026/2030; 696 HTML inventariati e sei sitemap byte-identici; 571 URL/date/canonical invariati, 34 sigilli storici esatti. Tutti i 696 HTML tracciati del sito intatti nel diff Git, non solo il campione.
- Basi errate/non approvate rifiutate prima di creare output, anche usando il controller installato.
- SEO 696 pagine/zero problemi; 1065 link Amazon e avvisi/rel intatti; 7 percorsi contestuali/10 link corretti.
- Confronto HTTP prima del rilascio: 17/17 file pubblici identici, comprese sei sitemap, robots e ricerca.
- Prima del push, diff limitato ai file tecnici dichiarati e documentazione; nessuna chiave privata rilevata nei file pubblicabili.

## Pubblicazione

Autorizzata dal mandato diretto, da eseguire solo dopo il controllo finale della storia dal controller esterno. Vercel: team `team_5wnLmRfxPsCd8aEmcZUsfRKG`, progetto `prj_wpklj5eOzmkjNB97wQMvoaTV2Uvm`, preset Other/statico, radice `.`, nessuna rigenerazione di pagine come build di rilascio. Connettore elenco deployment nega accesso; CLI già autenticata funziona e viene usata sul medesimo progetto. Deployment prima del rilascio `dpl_9qzTzekgdpnpxdkxuHMYTKYKJS8s`, Ready/production, commit ad9091a51.

Esito definitivo, commit pubblicato e riscontri desktop/mobile verranno aggiunti dopo il rilascio. Nessun IndexNow/GSC, modifica editoriale, homepage/date/sitemap o nuovo prodotto Amazon autorizzati da questo lotto.
