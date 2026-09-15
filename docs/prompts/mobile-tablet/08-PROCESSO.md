# Prompt 08: “Dal contatto alla riconsegna” da sfogliare

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e STATO.md in docs/prompts/mobile-tablet.

## Risultato e perimetro
Trasforma soltanto “Come funziona / Dal contatto alla riconsegna.” in /servizi, oggi quattro box verticali mobile.
File: src/app/servizi/page.tsx contiene processSteps e il render della sezione. Estrai un nuovo componente client ServiceProcess.tsx in src/components/sections; mantieni la pagina Server Component e i metadata. Conserva hero, servizi, immagine di stacco e CTA finale.

## Composizione
Quattro passaggi: Contatto, Diagnosi, Intervento, Riconsegna. Mantieni la copy attuale accorciando ripetizioni, senza inventare tempi di lavorazione.
Fondo scuro, una linea sottile di navigazione con quattro nomi sempre riconoscibili; pannello con numero corrente, titolo grande e poche righe. Indice “1 di 4”.
La direzione è una sequenza tipografica: niente quattro grandi card fotografiche uguali agli Accessori. Su tablet usa lo spazio laterale per titolo e descrizione, senza estendere il pannello all'altezza di un viewport intero.

## Animazione e gesture
Usa un rail nativo a pannelli larghi quanto l'area utile con snap. Durante swipe il pannello segue il dito; il testo non parte con un'animazione autonoma in direzione opposta.
L'indicatore della linea riflette il passaggio corrente con transform/opacity in ~200ms dopo l'allineamento. Il tratto rappresenta la posizione nella spiegazione, non lavori realmente completati.
Pulsanti nominati dei passaggi e precedente/successivo muovono solo il rail. Nessun autoplay, looping dall'ultima alla prima o blocco dello scroll verticale.
Il nuovo contenuto deve poter essere letto subito, senza attesa di una reveal. Reduced motion rende immediato lo scroll comandato. Usa semantica di navigazione con aria-current per il passaggio, non checkbox di completamento.

## Accettazione
Quattro tap e swipe equivalenti, testo non tagliato al 200%, focus corretto, contatore sincronizzato con scroll e resize. Nessun rallentamento prima di raggiungere la CTA sotto la sezione.
QA locale 375, 820, 1440px, tastiera e movimento ridotto. Controlli finali e stato 08 come da contesto.
