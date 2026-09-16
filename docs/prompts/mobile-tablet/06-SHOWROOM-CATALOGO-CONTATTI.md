# Prompt 06: Showroom, Catalogo e Contatti compatti

Esegui soltanto questo prompt in `C:/Progetti Exeva/Grossi Moto`. Leggi `CONTESTO.md` e `STATO.md`. Se il prompt 05 è completato, usa la policy responsive prodotta lì; se non lo è, applica il contratto responsive del contesto senza riscrivere la policy globale. Preserva 02, 03, 04 e 05 se già eseguiti.

## Risultato
Rifinisci tre punti secondari dell'audit senza redesign:

- Home: showroom touch coerente su telefono e tablet, con link al modello scelto;
- Gamma: scheda prodotto mobile più compatta;
- Contatti: azioni e dati più rapidi da raggiungere su mobile.

## Showroom Home
File: `src/components/sections/ScooterShowcase.tsx`, `src/data/showcase-scooters.ts`. Leggi `HeroRevealStage.tsx` solo per capire la modalità, senza riscriverne la regia.

Mantieni immagini, nomi, sei modelli e colori. Nel fallback naturale estendi il rail ai tablet: una scheda con anticipo su telefono; due con anticipo dove lo spazio lo consente. Conserva la showcase pinned desktop dove ammessa.

Ogni scheda deve avere “Scopri il modello” verso `/scooters?focus=<id reale>`. Nessun ID inventato. Mantieni “Apri tutta la gamma”.

Aggiungi controlli precedente/successivo e “1 di 6”, sincronizzati alla scheda vicina all'inizio del rail. Riserva spazio finale interno sufficiente ad allineare anche l'ultimo scooter all'inizio utile, senza falsa card o overflow globale. Scroll snap nativo, nessun auto-avanzamento, nessuna rotazione/scala dello scooter durante lo scroll.

## Catalogo
File: `src/components/catalog/CatalogProductCard.tsx`. Leggi `CatalogGrid.tsx` solo per rispettarne il contratto. Non cambiare dataset, filtri, algoritmo di packing, URL o espansione in-place.

A 375px la scheda aperta deve avvicinare CTA e dati essenziali. Mantieni immagine prodotto ampia ma proporzionata, nome, descrizione breve e CTA. Presenta Cilindrata, Categoria e Uso ideale in modo più compatto: dati affiancati dove leggibili, testo lungo su riga dedicata. Riduci padding e involucri ripetuti senza troncare valori.

Il wrapper esterno anima già la posizione: non usare `layout=true` sul contenuto o sull'immagine e non accoppiare scale con row-span. Apertura/chiusura devono lasciare focus valido. CTA e chiusura restano raggiungibili sotto i filtri sticky e sopra la tab bar.

## Contatti
File: `src/app/contatti/page.tsx`. Leggi `src/components/contact/ContactForm.tsx` per preservarne il contratto; modificalo soltanto per un problema di layout dimostrato.

Su mobile trasforma Telefono, Email e Dove siamo in righe compatte con icona, dato e azione. Indirizzo e orari devono essere facili da trovare senza accordion o swipe. Mantieni un unico form, tutti i campi e i dati business attuali. Nessun nuovo WhatsApp, prenotazione, mappa esterna o endpoint.

Qui non serve una nuova animazione. Mantieni feedback pressione/focus coerenti, campi almeno 16px e target principali almeno 48px. Preserva validazione, privacy, honeypot, stati loading/success/error e conservazione dati in errore. Non simulare successo senza invio.

## Accettazione
QA locale richiesto:

- Home 375, 820, 1024 landscape, 1440: ultimo scooter selezionabile, sei link corretti, nessun overflow, pinned desktop preservato.
- Gamma 375, 820, 1440: apri/chiudi Skytown, Downtown e un modello con uso lungo; cambia filtro con scheda aperta; apri `/scooters?focus=agility-s-125`; verifica 200% e reduced motion.
- Contatti 375, 820, 1440: dati leggibili, focus, campi, validazione senza invio reale, footer e tab bar.

Non modificare la griglia Gamma, non inviare form reali e non introdurre una nuova suite grande. Esegui i controlli finali indicati in `CONTESTO.md`, aggiorna `PROJECT_MEMORY.md` e voce 06 in `STATO.md`. Fermati qui.
