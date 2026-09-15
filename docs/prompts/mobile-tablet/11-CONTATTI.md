# Prompt 11: Contatti mobile più diretto

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e STATO.md in docs/prompts/mobile-tablet.

## Risultato e file
Accorcia la parte iniziale di /contatti su telefono: le tre grandi card Telefono, Email e Dove siamo ritardano modulo e orari.
Responsabilità: src/app/contatti/page.tsx. Leggi src/components/contact/ContactForm.tsx per preservarne il contratto; modificalo soltanto per un problema di layout dimostrato.

## Composizione
Telefono, email e mappa devono essere azioni dirette, visibili e nominate. Su mobile trasformale in righe compatte con icona, dato e azione, senza enormi spazi vuoti. Mantieni identità cromatica e testo introduttivo breve.
Indirizzo e orari devono essere facili da trovare, riducendo ripetizioni interne alla pagina. Non nasconderli dietro accordion o swipe. Mantieni la composizione tablet/desktop dove già leggibile.
Preserva un unico form, tutti i campi e i dati business attuali; nessun nuovo canale WhatsApp o prenotazione inventata, nessuna mappa esterna incorporata.

## Interazione
Qui non serve una nuova animazione di sezione. Solo feedback di pressione e focus già coerenti col sito. Campi >=16px per evitare zoom automatico iOS, target >=48px per le azioni principali.
Mantieni validazione, privacy, honeypot, stati loading/success/error e conservazione dati in errore. Non cambiare endpoint né simulare un successo senza invio.

## Accettazione
QA locale 375/820/1440: leggibilità dati, focus, campi, scroll fino a invio e footer con tab bar. Testa validazione senza inviare dati reali.
Se verifichi success/error usa solo mock locale controllato e rimuovilo dalla produzione; non è necessario introdurre una nuova infrastruttura.
Nessun messaggio, chiamata o richiesta esterna reale durante QA. Controlli finali e voce 11 come da contesto.
