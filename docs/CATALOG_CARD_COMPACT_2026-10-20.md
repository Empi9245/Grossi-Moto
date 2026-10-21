# Catalogo — anteprima mobile essenziale

Intervento iniziato il 20 ottobre 2026, conclusione e verifica il 21 ottobre 2026.

## Composizione

La scheda continua ad aprirsi nel proprio posto nel carosello. Restano il modello attivo, il colore assegnato, l'immagine completa e le anteprime laterali. La nuova composizione compatta mette in sequenza marca e nome, una foto grande, cilindrata e utilizzo già presenti nel catalogo, quindi un solo pulsante principale: **Scopri il modello**. Il link secondario **Chiedi disponibilità** apre il contatto con il modello preselezionato.

L'anteprima non ripete più il link alla pagina nella testata, il sottotitolo, l'intero testo di posizionamento o tre riquadri di specifiche. Questi contenuti rimangono disponibili nella pagina completa del modello. La foto non si riduce più all'apertura: usa `object-contain`, con la stessa altezza del compatto sul telefono e un'altezza maggiore sul tablet. Nomi lunghi possono andare a capo senza troncamento del titolo.

L'accesso al confronto rimane quello approvato nella memoria di progetto: ingresso esplicito dalla barra del catalogo, poi pulsanti di selezione sulle schede. Nessuna selezione o apertura automatica della tabella, nessun comando di confronto duplicato fra i link del modello.

## Interazione e ambito

- `CatalogProductCard.tsx`: composizione solo per la variante compatta; l'apertura porta il focus al comando Chiudi con `preventScroll`, prima che il vecchio comando diventi inerte. Chiusura con pulsante o Escape, ripristinando il focus al comando Dettagli. Le copie decorative non ricevono il pannello con i link attivi.
- `CatalogGrid.tsx`: quando si cambia modello con il focus ancora nella scheda uscente, il focus passa prima al rail. La scheda uscente può così diventare inerte senza lasciare il focus in un controllo non più utilizzabile. La soppressione del click residuo dopo uno swipe lascia passare i click da tastiera (`detail === 0`): uno swipe senza click sintetico non può più consumare l'Invio successivo sul comando Dettagli.
- Il `ResizeObserver` esistente continua a misurare le schede e a riservare l'altezza del carosello. Swipe, frecce, Home/End, copie laterali e fallback con movimento ridotto conservano la struttura già presente.
- Griglia desktop, specifiche e azioni della scheda desktop, dati, route, confronto e filtri non sono stati riprogettati. Nessuna nuova dipendenza, immagine o animazione.

Taste è stato applicato come intervento su un componente esistente: gerarchia, rimozione delle ripetizioni, dati essenziali e un'unica azione piena, mantenendo palette e identità approvate. La verifica automatica delle regole Taste segnala cinque ombre/bordi inset già presenti nel componente, prevalentemente nella variante desktop; non sono introdotti da questo intervento. Il loro rifacimento completo non rientra nel perimetro richiesto di conservare la griglia desktop.

## Verifiche

- ESLint mirato sui due componenti: superato.
- Diff check sui due componenti: superato; sorgenti UTF-8 senza BOM e LF.
- QA browser completata sulla copia production isolata in `qa-screenshots/ui-final-2026-10-21/production`: 6 scenari superati, a 375, 390, 768 e 820 px, più movimento ridotto a 390 px e griglia desktop a 1440 px. Nessun errore JavaScript o overflow rilevato.
- Superati apertura/chiusura, focus, Escape, swipe, frecce, Home/End, cambio orientamento e arrivo diretto a tre modelli di dimensioni e nomi diversi. Verificati selezione esplicita per il confronto, copie laterali compatte e inerti, pagina completa, ritorno e contatto precompilato senza invio.
- Entrambi i link diventano interamente visibili sopra la navigazione inferiore con Tab/scorrimento; hit test reale verificato in alto, al centro e in basso. La sequenza swipe → orientamento → Invio include la correzione del click da tastiera consumato dalla soppressione residua.
- Script ripetibile: `qa-screenshots/catalog-card-compact-qa.cjs <baseURL>`, con Playwright fornito dal runtime Codex e Chrome headless; non installa pacchetti e non invia moduli.
- Evidenze e misure salvate in `qa-screenshots/catalog-card-compact-2026-10-21/`; `results.json` conferma tutti i sei scenari superati.
- Lint generale e build integrata: superati nell'ultima ricostruzione del 21 ottobre, comprensiva delle correzioni del focus e del click da tastiera dopo swipe. La copia isolata evita ricostruzioni concorrenti della stessa `.next`.

La QA usa Chromium su Windows con touch emulato; non equivale a una prova su telefono o tablet fisici o Safari.
