# Prompt 07: i sei Servizi consultabili a scelta

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e voci 05–06 di STATO.md in docs/prompts/mobile-tablet.

## Risultato e file
Sui dispositivi con consultazione naturale sostituisci i sei lunghi blocchi di /servizi con un selettore e un pannello corrente. L'audit misurava 5636px a 375px; un singolo servizio su tablet arrivava a 1140–1260px.
Responsabilità: src/components/sections/StickyScrollShowcase.tsx, eventuale nuovo ServicesExplorer.tsx e src/data/services.ts per estrarre il dataset esistente. Conserva il comportamento sticky editoriale del desktop immersivo.
Riutilizza i sei contenuti/foto presenti. Non inventare servizi, claim o disponibilità.

## Composizione e motion
Titolo più compatto, sei voci nominative: Officina, Tagliandi, Ricambi e accessori, Finanziamenti, Permute, Consulenza. Selettore leggibile anche con nomi lunghi: può andare a capo, niente etichette tagliate o sole cifre.
Un servizio selezionato: foto, titolo, descrizione breve, tre caratteristiche e CTA pertinente. Telefono impilato; tablet foto/contenuto affiancati se leggibili.
Tap: stato del tab immediato, foto crossfade ~260ms, testo opacity/y 8px per ~180ms. L'ultima selezione prevale sui tap rapidi. Nessuna animazione di altezza o salto in alto della pagina. Qui usa i tab: non aggiungere un secondo carosello da mantenere.
CTA telefono sempre presente nel pannello attivo. Reduced motion e tastiera come nel contesto.

## Contratto URL e accessibilità
Preserva #service-01…#service-06:
1. Caricamento diretto con hash seleziona il servizio corretto e lo rende raggiungibile.
2. I link dalla hero funzionano anche se quel pannello era nascosto.
3. Una selezione esplicita aggiorna la cronologia in modo che Indietro/Avanti ripristinino il servizio; gestisci popstate/hashchange senza loop o scroll duplicati.
4. Desktop/compatto non duplicano ID né copie focalizzabili.
Usa tablist/tab/tabpanel e tastiera corretti. Contenuti disponibili nell'HTML, fallback leggibile senza JS; non affidare SEO a una fetch solo client. Conserva metadata e route.

## Accettazione
QA locale 375/820/1440: tutti i sei tab, hash diretto, link dalla hero, Indietro/Avanti, resize, tap rapidi e CTA non coperte dalla nav.
Test mirato per sincronizzazione hash/selezione se l'infrastruttura lo consente; niente nuova suite enorme. Controlli finali e stato 07.
