# Prompt 09: showroom touch coerente e link al modello

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e voce 05 di STATO.md in docs/prompts/mobile-tablet. Prerequisito: policy responsive 05.

## Risultato e fonti
La Home deve offrire lo stesso modo di sfogliare i sei scooter su telefono e tablet, con accesso alla scheda del modello scelto.
File: src/components/sections/ScooterShowcase.tsx, fallback statico oggi verso fine file; src/data/showcase-scooters.ts. Leggi HeroRevealStage.tsx solo per l'integrazione della modalità, senza riscriverne la regia.
Oggi mode=static usa rail sotto 768px e griglia tablet; gli articoli non linkano il modello. Esiste già /scooters?focus=<id>.

## Design e movimento
Mantieni immagini, nomi, sei modelli e colori. Nel fallback naturale estendi il rail ai tablet: una scheda con anticipo sul telefono; due con anticipo quando lo spazio lo consente. Conserva la showcase pinned desktop dove ammessa dalla policy.
Rendi ogni scheda chiaramente azionabile con “Scopri il modello”, URL costruito dall'ID reale nel dataset. Nessun ID inventato o parametro che apre la scheda sbagliata.
Controlli precedente/successivo e “1 di 6”, con stato coerente alla scheda vicina all'inizio del rail. Riserva spazio finale interno sufficiente ad allineare anche l'ultimo scooter all'inizio utile, senza falsa card o overflow globale: verifica che il sesto sia selezionabile anche con due schede visibili. Mantieni “Apri tutta la gamma”.
Scroll-snap nativo, risposta solidale al dito, nessun auto-avanzamento. Non aggiungere rotazioni/scale agli scooter mentre scorrono. Eventuale mouse drag deve riusare una soluzione esistente e non impedire click/scroll naturale; non è necessario svilupparlo se frecce e trackpad già coprono il desktop.

## Accettazione
Apertura di ciascuno dei sei link nella scheda corretta; filtro/query del catalogo preservati. Rail senza overflow della pagina, immagine non tagliata, focus e controlli da 48px. Niente click accidentale durante drag.
Reduced motion: consultazione identica, scroll comandato immediato.
QA locale 375/820/1024 landscape/1440: percorso naturale touch e pinned desktop, cambio modalità, ultimo scooter e ritorno al primo senza loop automatico.
Non modificare la griglia Gamma. Controlli finali e stato 09.
