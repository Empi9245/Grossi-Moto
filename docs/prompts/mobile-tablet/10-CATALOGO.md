# Prompt 10: scheda catalogo mobile più compatta

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e STATO.md in docs/prompts/mobile-tablet.

## Risultato e perimetro
A 375px la scheda Skytown aperta misurava circa 915px: Cilindrata, Categoria e Uso ideale sono tre box impilati molto alti. Avvicina il contatto alle informazioni essenziali.
Responsabilità: src/components/catalog/CatalogProductCard.tsx. Leggi CatalogGrid.tsx solo per comprenderne il contratto. Non cambiare dataset, filtri, algoritmo di packing, URL o espansione in-place.

## Design
Mantieni immagine prodotto ampia ma con altezza mobile proporzionata, nome, descrizione breve e CTA. Presenta le tre specifiche con etichette chiare in una composizione compatta: dati affiancati dove leggibili, testo lungo su riga dedicata. Riduci padding e involucri ripetuti, senza troncare valori o ridurre il corpo sotto una lettura comoda.
La scheda può superare il viewport quando necessario; non tagliare contenuti per farla entrare in un'altezza fissa. Su tablet/desktop preserva il layout attuale salvo correzioni strettamente necessarie.

## Motion da preservare
Il wrapper esterno già anima solo la posizione; l'article interno gestisce dimensioni. Non usare layout=true sul contenuto o sull'immagine, e non accoppiare scale con row-span. Mantieni il cambio sobrio senza elasticità.
Apertura/chiusura devono avere una destinazione di focus valida; il pulsante non deve sparire lasciando la tastiera senza riferimento. CTA e chiusura restano raggiungibili sotto i filtri sticky e sopra la tab bar.

## Accettazione
QA locale 375/820/1440: apri/chiudi Skytown, Downtown e un modello con uso lungo; cambia filtro mentre una scheda è aperta; apri /scooters?focus=agility-s-125.
Niente deformazione, salti imprevedibili, valori nascosti o doppie schede. Verifica al 200% e con reduced motion.
Controlli finali e voce 10. Nessun nuovo filtro o confronto multiplo.
