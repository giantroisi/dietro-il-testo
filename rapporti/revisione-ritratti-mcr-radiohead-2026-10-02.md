# Revisione congiunta dei ritratti MCR e Radiohead — 2 ottobre 2026

## Ambito e stato

Questa copia riunisce due proposte precedentemente isolate, senza cambiare le loro copie originali né la cartella principale. Sostituisce il riquadro grafico soltanto nelle pagine artista dei My Chemical Romance e dei Radiohead. Catalogo e testi editoriali invariati. **Proposta locale in attesa di revisione del proprietario; nessun trasferimento, push o pubblicazione.**

## Provenienza e controllo dei file

| Pagina | Fonte originale, aperta il 2 ottobre | Autore e licenza dichiarati | File locale e impronta SHA-256 | Limite visivo |
| --- | --- | --- | --- | --- |
| `/artista/my-chemical-romance/` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:My_Chemical_Romance_@_Wembley_Stadium,_11_July_2026_B-Stage_15.jpg) | Hullian111, CC BY-SA 4.0 | `ritratti/my-chemical-romance-wembley-2026.jpg`, `c50cf7016891c8ad8d8ae81f51b542d88b57f4ca46b818939656b336cf5363da` | Scena di concerto; i volti sono piccoli. |
| `/artista/radiohead/` | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:RadioheadO2211125_composite.jpg) | Fotografie di Raph_PH; montaggio pubblicato e ampliato da Miklogfeather; CC BY 4.0 | `ritratti/radiohead-o2-2025-composite.jpg`, `ccbb7db382e0c3f47ebe4fa06d8b2010f11969167b20b18d18bd6054774abc06` | Montaggio di cinque immagini, non uno scatto collettivo. |

Gli originali sono stati confrontati visivamente con i soggetti dichiarati. Le due pagine espongono credito, collegamento alla fonte e alla licenza, più testo alternativo. `dati/ritratti.json` conserva data della verifica, pagina d'uso, titolare dichiarato, dimensioni e modifiche. I cinque link Flickr indicati dal dossier Radiohead non sono stati riaperti con successo durante questa revisione: la licenza e la composizione sono state ricontrollate sulla pagina Commons.

## Correzione emersa nella revisione

Nel primo lotto Radiohead, a 390 px il montaggio era visualizzato a 280 × 103 px. La pagina ora riconosce i ritratti panoramici dai metadati delle dimensioni e applica solo alla relativa pagina una regola mobile che porta l'immagine a 342 × 126 px senza ritaglio. Il credito usa la stessa larghezza. Le altre pagine conservano lo stile precedente.

## Prove e limiti

- A 390 × 844 px entrambe le immagini si caricano. MCR: 280 × 211 px; Radiohead: 342 × 126 px. Nessuna fuoriuscita orizzontale, errori console o credito nascosto.
- `prova-ritratto-credito`, `check-seo` (688 pagine), `check-coerenza` (317 canzoni e 104 artisti), `check-link` e `git diff --check` passano.
- I controlli dei link esterni verificano la forma degli URL, non la disponibilità HTTP futura. La qualità fotografica di MCR resta una scena ampia; Radiohead resta un montaggio. Non è stata riesaminata la biografia delle due band.
