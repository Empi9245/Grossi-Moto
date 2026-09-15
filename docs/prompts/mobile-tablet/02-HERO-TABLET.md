# Prompt 02: libera la CTA della hero su tablet

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e STATO.md in docs/prompts/mobile-tablet. Non dipende da 01.

## Risultato ed evidenza
A 1024x768 la card “27 modelli” non deve coprire “Confronta la gamma”. Composizione leggibile anche con altezza ridotta e testo ingrandito.
Audit live: card x48/y481, 292x239; CTA x267/y460, 217x48; intersezione circa 73x27px.

## File e intervento
src/components/hero/BottomLeftCard.tsx e Hero.tsx. Da lg la card diventa larga 18.25rem e mostra dettagli/link aggiuntivi. Leggi BottomRightCorner.tsx solo se interferisce.
Adatta la card allo spazio disponibile: variante compatta nei viewport intermedi/bassi, numero ed etichetta; dettagli secondari fuori dalla disposizione flottante. Riserva spazio alle CTA, senza risolvere con il solo z-index.
Preserva messaggio principale e due azioni. Mantieni composizione desktop ampia dove non collide. Con testo ingrandito il layout può crescere: niente tagli di contenuto essenziale.
Nessuna nuova animazione. Conserva entrate esistenti se compatibili. Questo intervento non modifica pinning, showroom o navigazione globale.

## Accettazione
QA browser locale richiesta: 375x812, 768x1024, 1024x768, 1180x820 e 1440x900; focus sulla CTA e testo al 200%.
Verifica visivamente e tramite rettangoli DOM che card/CTA non si intersechino. Link raggiungibili e cliccabili, nessun overflow.
Controlli finali e stato 02 come nel contesto. Fermati al risultato.
