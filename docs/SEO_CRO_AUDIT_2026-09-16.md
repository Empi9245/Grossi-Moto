# Audit SEO e conversione — 16 settembre 2026

## Corretto

| Problema | Intervento |
| --- | --- |
| Sitemap vuota senza variabile del dominio | URL pubblico centralizzato e fallback al dominio fornito |
| Anteprime interne ereditate dalla Home | Metadati e URL social specifici per pagina |
| Titoli poco specifici per ricerca locale | Roma, marchi e servizi distinti nei titoli e nelle descrizioni |
| Catalogo con solo contatto telefonico | Richiesta scritta con modello precompilato e modificabile |
| Contatto officina privo di contesto | Argomento officina già selezionato |
| Invio che può restare in attesa o duplicarsi | Timeout, blocco sincrono, recupero con telefono cliccabile |

## Verifiche

Lint e build senza errori. HTTP su production locale: sei pagine 200, un H1 ciascuna, canonical corretti; sitemap di sei URL e robots coerente. Prefill verificato per modello valido, officina, modello sconosciuto, parametro ripetuto e accesso generico. I parametri non diventano URL canonical separati.

## Ancora da verificare

- **Ricezione richieste:** endpoint Formspree preesistente mantenuto e configurabile; nessun invio reale o prova di consegna. Accesso remoto non riuscito dall’ambiente.
- **Privacy:** testo preesistente con dettagli giuridici ancora da confermare al titolare. Nessuna clausola inventata durante l’audit.
- **Risultati:** non disponibili Search Console, analytics o misurazioni CWV sul campo. Non è possibile affermare un aumento misurato di ranking o conversioni.
- **Anteprime:** corretti testi e URL; resta possibile aggiungere in seguito una fotografia di condivisione dedicata.

Design preservato, nessuna QA visuale automatica, nessun deploy eseguito.

## Riferimenti tecnici

- [Google: canonicalizzazione](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Next.js: ereditarietà dei metadati](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
