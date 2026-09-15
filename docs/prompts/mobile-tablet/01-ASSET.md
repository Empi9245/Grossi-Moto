# Prompt 01: immagini pronte per Accessori e Officina

Esegui soltanto questo prompt nel progetto C:/Progetti Exeva/Grossi Moto. Leggi docs/prompts/mobile-tablet/CONTESTO.md e STATO.md. Obiettivo: un set piccolo di immagini pertinenti, ispezionate e mappate, per evitare ricerche durante il build. Non modificare UI.

## Contesto e fonti
Accessori: Protezione personale (caschi/guanti), Comfort urbano (bauletti/parabrezza), Sicurezza e sosta (antifurti), Uso quotidiano (supporti smartphone).
Officina: Manutenzione, Diagnosi, Montaggio accessori.
Leggi src/components/sections/AccessoriesSection.tsx e WorkshopSection.tsx.
Candidati da ispezionare, non da giudicare dal nome:
- public/grossimoto/servizi/tagliandi.png
- public/grossimoto/servizi/officina-autorizzata.png
- public/grossimoto/servizi/ricambi-originali.png
- public/grossimoto/servizi/consulenza.png
Manifest KYMCO: public/kymco-all/manifest.json. Evita scansioni indiscriminate.

## Direzione
Accessori: quattro dettagli fotografici, soggetto leggibile a 300px, luce coerente e sfondo sobrio. Il prodotto deve corrispondere alla categoria. Crop 4:5, alternativa 4:3 dove utile.
Officina: lavoro/manualità e dettaglio tecnico, crop 4:3 o 3:2; soggetti distinguibili per le tre esigenze. Non attribuire alla sede foto di provenienza incerta.
Se manca un'immagine pertinente, creane una illustrativa tramite imagegen seguendo la relativa skill: oggetti generici, nessun logo/modello inventato, nessuna falsa prova di sede o disponibilità. Se il tool manca, registra la risorsa necessaria; non rappresentare un casco con una foto scooter.

## Output e accettazione
Crea public/grossimoto/accessori/ solo per asset nuovi. Riutilizza originali esistenti senza copie inutili.
Crea docs/prompts/mobile-tablet/ASSET-MANIFEST.md: sette utilizzi, percorso/URL pubblico, soggetto osservato, origine verificata/ignota/generata, dimensioni, ratio, object-position, alt prudente, stato pronto/mancante.
Puoi riutilizzare una foto con crop pertinente. Download esterni solo con fonte e diritto d'uso noti.
Ogni asset pronto deve esistere ed essere stato visto. Ottimizza copie con strumenti già disponibili; conserva originali. Verifica qualità del crop e peso reale.
Aggiorna la voce 01. Non avviare gli altri prompt. Passaggio solo asset/documentazione: verifica file e immagini; niente build ripetuta finché non cambia codice.
