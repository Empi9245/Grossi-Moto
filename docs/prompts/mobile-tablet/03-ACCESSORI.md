# Prompt 03: Accessori fotografici da sfogliare

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md, STATO.md e righe Accessori di ASSET-MANIFEST.md in docs/prompts/mobile-tablet. Prerequisito: 01 con quattro immagini pronte.

## Risultato e file
Sostituisci nella Home “Accessori / Scelti sul mezzo, non solo a catalogo.”: oggi quattro articoli numerati e circa 2129px di altezza a 375px.
Responsabilità: src/components/sections/AccessoriesSection.tsx; eventuali nuovi AccessoryRail.tsx nella stessa cartella e src/data/accessories.ts. Mantieni export e ordine Home. Nessun nuovo catalogo accessori.

## Composizione
Fondo chiaro esistente. Titolo proposto “Accessori che fanno la differenza.”, una frase sulla compatibilità.
Quattro schede: Protezione personale, Comfort urbano, Sicurezza e sosta, Uso quotidiano. Foto dominante, titolo, due esempi, descrizione breve e “Chiedi compatibilità” verso il telefono confermato.
A 375px una scheda larga circa 84–88% dell'area utile, gap 16px e anticipo della successiva. A 768–1023px due schede più anticipo; desktop 2–3 foto generose nel rail. Nessuna card annidata. Il testo cresce liberamente a zoom elevato.

## Regia dello swipe
Scroll orizzontale nativo, snap a inizio scheda. Foto e copy seguono il dito insieme; al rilascio il browser gestisce inerzia/allineamento. Nessun easing JS aggiuntivo sul gesto nativo.
Precedente/successiva, categorie selezionabili e indicatore “1 di 4” sincronizzati con la posizione reale, anche dopo resize. Definisci come attiva la scheda più vicina all'inizio utile; evita oscillazioni fra due schede. Riserva spazio finale interno al rail sufficiente ad allineare anche l'ultima scheda all'inizio, senza aggiungere una falsa card o creare overflow globale. Così ogni categoria, incluso l'ultimo elemento su tablet, ha una destinazione effettivamente raggiungibile.
Le frecce scorrono solo il rail. Usa pulsanti nominati con aria-current per la scheda corrente, non falsi tab se più schede restano visibili. L'hover desktop può muovere soltanto la freccia del link di 3px in 160ms.
Niente zoom durante drag, autoplay, rotazioni o entrate ripetute di ogni articolo.

## Accettazione
Swipe continuo, scroll verticale libero, estremi corretti, controlli equivalenti, focus stabile e nessun click involontario. Reduced motion elimina scroll smooth programmato. Niente salti al caricamento; immagini sotto la piega non tutte priority.
QA locale 375, 820, 1440px; controlli finali e stato 03 come da contesto. Se mancano foto non dichiarare completata la sezione.
