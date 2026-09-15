# Prompt 04: Officina con tre esigenze interattive

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md, STATO.md e righe Officina di ASSET-MANIFEST.md in docs/prompts/mobile-tablet. Prerequisito: 01 con i tre utilizzi Officina pronti, anche tramite riuso pertinente. Se una risorsa necessaria manca, registra il blocco e non dichiarare completata una sezione con foto mancanti. Preserva Accessori già completata.

## Risultato e file
Rifai “Officina in sede / Dopo l'acquisto resta il banco.” nella Home, oggi circa 1544px a 375px e solo testo.
src/components/sections/WorkshopSection.tsx; eventuale nuovo figlio client WorkshopExplorer.tsx. Nessuna route /officina, form o dipendenza nuova.

## Composizione
Fondo scuro. Titolo “Il tuo scooter, seguito nel tempo.”, una frase introduttiva.
Tre scelte nominative sempre visibili: Manutenzione, Diagnosi, Montaggio accessori.
Telefono: titolo, selettore, foto compatta, dettaglio. Tablet: foto circa 55% e contenuto circa 45% dove il testo respira. Non forzare due colonne troppo strette.
Manutenzione iniziale. Conserva informazioni su tagliandi, controlli e lavori concordati; CTA pertinente a tel:+393289185029 e link agli altri servizi. Nessuna promessa nuova.

## Animazione
Il selettore risponde subito al tap. Due immagini della stessa dimensione si sovrappongono: nuova foto in opacity per circa 280ms, precedente sotto fino alla fine, senza frame vuoti. Nuova foto eventualmente da scale 1.025 a 1 in 320ms, solo se pronta e movimento ridotto disattivo.
Dettaglio: opacity e y 8px→0 in 180ms; uscita breve senza bloccare l'entrata. Titolo generale e selettore non ripartono.
Cinque tap rapidi portano all'ultima scelta senza code o testi doppi. Mantieni selezione al resize. Foto stabile; testo adattabile senza tagli né animazione di height. Tastiera/reduced motion: immediato o opacity <=100ms.

## Accettazione
Tablist/tab/tabpanel corretti, roving focus e contenuti inattivi senza link focalizzabili. Primo contenuto leggibile nell'HTML iniziale; fallback comprensibile senza JS.
Foto, etichetta e CTA sempre coerenti; nulla richiede di guardare l'animazione per capire. Nessuna falsa attribuzione alla sede delle foto illustrative.
QA locale 375, 820, 1440px, tastiera e tap rapidi. Controlli finali e stato 04 come nel contesto.
