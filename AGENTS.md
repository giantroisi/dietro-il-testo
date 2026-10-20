# Dietro il Testo — protezione dei lotti

Leggere COSTITUZIONE.md e ROADMAP.md. Preservare modifiche concorrenti e lotti in revisione.

## Percorso fidato sul Mac

Build e promozione dei lotti operativi devono passare dal controller installato fuori dal repository:

/Users/gianmicheletroisi/.local/lib/dietro-il-testo/controller/0f4bd0dec29273845723a6cfc91ebdc9a3a3b17b/lotto-sicuro

Argomenti: --repo <copia separata pulita> --base <SHA completo> --out <nuova cartella esterna>; per un lotto usare --lotto lotti/<digest>.json e --sigilla, poi --promuovi soltanto con approvazione precedente specifica. Le anteprime dirette non autorizzano un rilascio. Prima di push/pubblicazione verificare la storia con il controller installato e l'esatto diff.

Non installare o sostituire controller, ancora, runtime o stato dalla copia del lotto. Non rimuovere permessi/flag immutabili esterni e non scegliere una nuova base di fiducia. Un loro aggiornamento richiede un bootstrap distinto autorizzato dal proprietario.

La chiave privata resta esclusivamente sul Mac, fuori dal repository. Non leggerla, copiarla o usarla per altri lotti senza nuova autorizzazione esplicita del proprietario; il mandato del 20 ottobre vale soltanto per il manifesto tecnico dichiarato nel rapporto di bootstrap. Non inserire segreti in log, chat, variabili di build, GitHub o Vercel.

Nessun IndexNow o GSC dal ciclo di build/pubblicazione. IndexNow è disabilitato di default: per un eventuale invio futuro serve consenso firmato separato, successivo alla pubblicazione, con URL esatti e nonce monouso. Mai selezionare tutti i lastmod odierni.

Nel lotto tecnico iniziale contenuti, tutti gli HTML pubblicati, homepage/client, immagini, prodotti/CTA Amazon, date e sei sitemap restano byte-identici. Le 34 coppie storiche della baseline non si ricalcolano per fare passare un errore. Un nuovo lotto deve avere un proprio manifesto e approvazione precedenti; niente autoapprovazione e niente merge non revisionate.

## Limite della protezione

Il controller e l'ancora sono esterni con permessi minimi e flag macOS uchg; il launcher usa ambiente ridotto e verifica l'impronta del runtime. Questo separa i lotti dalla radice di fiducia. Non è isolamento da un amministratore o da codice arbitrario eseguito con i pieni privilegi del proprietario: i percorsi esterni e le credenziali di pubblicazione restano sotto il suo controllo.
