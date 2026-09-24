# Form contatti conversazionale — 24 settembre 2026

## Implementazione

- `src/components/contact/ContactForm.tsx`: stato del percorso, navigazione, invio e gestione errori.
- `src/components/contact/ContactFormUI.tsx`: domande, scelte, campi accessibili, avanzamento e anteprima.
- `src/components/contact/contact-flow.ts`: percorsi condizionali, validazione, composizione messaggio e payload.
- `src/app/contatti/page.tsx`: passa al form solo ID, nome e marca dei modelli; conserva i parametri esistenti.
- `tests/contact-flow.test.mjs`: nove test del form, oltre ai quattro test swipe esistenti.

## Percorsi

Acquisto: argomento, modello noto oppure utilizzo, interessi se modello noto, recapito, anteprima. Officina: servizio, mezzo, sintomi solo quando necessari, recapito, anteprima. Ricambi: categoria, dettaglio, recapito, anteprima. Altro: domanda, recapito, anteprima. Dalla scheda prodotto bastano tre schermate: interessi, recapito, messaggio.

Il recapito richiede nome e solo email oppure telefono in base al canale scelto. Indietro conserva le risposte; il messaggio esclude i dati dei percorsi abbandonati. Il testo generato è modificabile e una successiva modifica alle risposte richiede di scegliere se rigenerarlo o conservare la revisione manuale.

Preservati endpoint Formspree configurabile, honeypot, consenso privacy, timeout, errore recuperabile e protezione dal doppio invio. WhatsApp e mailto aprono un messaggio preparato; l'utente completa l'invio nell'app scelta. Nessun servizio AI o nuova dipendenza.

## Verifica

Lint, TypeScript tramite build, 13 test e build di produzione completati. Il download del font esistente richiede rete disponibile durante la build.

Verificati desktop, tablet e mobile, larghezze 320–1440, navigazione indietro, rami condizionali, tastiera, focus, reduced motion, privacy, errori e retry, doppio invio e reset. Richieste Formspree intercettate con risposte simulate: non è stata verificata la consegna reale alla casella e non sono stati inviati messaggi di prova.

La fusione successiva al commit `790ca47` aveva ripristinato il vecchio controller: reintegrato il nuovo form conservando le modifiche grafiche della pagina nel frattempo ricevute. Corretta la visibilità delle note iniziali affinché svuotarle non smonti il campo durante la modifica. Nessun push o deploy eseguito in questa chiusura.

## Aggiornamento canali diretti
WhatsApp ed email non raccolgono più recapiti del cliente. Dopo anteprima e consenso, il pulsante finale apre la chat del numero esistente (+39 328 918 5029) oppure il compositore email indirizzato a info@grossimoto.it. Anche Invio da tastiera usa il canale selezionato. Solo Telefono raccoglie il numero per una richiamata tramite Formspree. Rimossa la frase «I tuoi recapiti, solo alla fine.» e rinominata la fase centrale in Canale. Test aggiornato per verificare l'assenza di recapiti obbligatori o residui nei canali esterni.
