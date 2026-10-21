# Apertura delle pagine modello

Intervento avviato il 20 ottobre 2026, verifiche il 21 ottobre. Perimetro: template comune `/scooters/[slug]` e galleria del modello.

## Decisioni e implementazione

- Applicate Taste e Scrollcraft come rifinitura di una composizione esistente: riconoscere il modello al primo sguardo, poi orientarsi e chiedere informazioni. Conservati identità, superfici del modello, fotografie e contenuti già approvati. Nessuna nuova animazione, libreria o informazione commerciale.
- Su telefono e tablet, il nome precede immediatamente la foto. Descrizione e azioni seguono il mezzo nel DOM e nella composizione. Da desktop il testo occupa la colonna sinistra e la foto quella destra.
- Un solo `h1`, con marca inclusa nel nome accessibile e denominazione completa visibile. Dimensione fluida, misura ampia e bilanciamento delle righe gestiscono i nomi lunghi senza ellissi.
- La foto principale occupa una cornice riservata prima del caricamento; `fill` e `object-contain` mantengono proporzioni e silhouette completa anche per una maxi adventure. Solo questa foto ha priorità; `sizes` distingue telefono, tablet e desktop.
- Ritorno al catalogo da almeno 48 px, diretto a `?focus=<id>`. Il breadcrumb esteso resta sul desktop; sotto 1024 px evita di ripetere nome e percorso sopra il mezzo. Il `BreadcrumbList` strutturato è sempre presente.
- `Chiedi informazioni` è l'unica azione piena e apre il contatto con il modello selezionato. `Chiama` resta un link sottolineato separato, con nome accessibile contestuale. Entrambi mantengono target da 48 px e margine di scorrimento per la navigazione inferiore.
- Le informazioni iniziali usano marca, cilindrata e la `Categoria` già presente nelle specifiche, con fallback alla famiglia: evita ripetizioni come `50cc · 50cc`, senza introdurre classificazioni nuove.
- Galleria server-side con prima foto lazy e foto rimanenti dentro `details` nativo, apribile anche da tastiera e senza JavaScript. Tutte le immagini originarie restano disponibili e lazy; la galleria chiusa evita il caricamento immediato delle foto aggiuntive.
- Descrizione, specifiche, consigli, alternative, collegamenti di contatto, 27 parametri statici, metadata, canonical, `ProductModel` e `BreadcrumbList` conservati. Nessuna modifica a dataset, route, header condiviso o navigazione inferiore.

## Verifiche eseguite

- ESLint mirato sui due file modificati: superato.
- Sintassi dello script browser: verificata con Node.
- Script riproducibile locale: `qa-screenshots/model-opening-qa.cjs <URL-base>`. Usa Playwright già presente nel runtime Codex, Chrome headless e disabilita pointer lock/capture in ogni contesto. Non invia moduli.
- Prima matrice sulla build integrata isolata `http://127.0.0.1:3154`: 17/17 scenari superati. Tre modelli (KYMCO Filly 50 compatto, Voge Valico 900DSX grande, KYMCO Agility 50 R16 Plus con nome lungo) a 375×812, 390×844, 768×1024, 820×1180 e 1440×1000, più Valico con movimento ridotto a 390 e 1440 px.
- Apertura, galleria con tutte le sei foto, apertura/chiusura con Invio/Spazio, ritorno in alto, focus della primaria, orientamento senza ricaricamento, contatto precompilato e ritorno al catalogo sul modello corretto superati. Nessun invio di contatto, errore JavaScript, richiesta fallita o overflow rilevato.
- Tutte le 27 route rispondono 200 e conservano un `h1`, `ProductModel`, `BreadcrumbList`, consigli e collegamento con modello precompilato.
- Caricamento iniziale misurato: nessuna foto della galleria sui telefoni; una su tablet/desktop. Le altre cinque restano scariche a galleria chiusa e si caricano dopo l'apertura e lo scorrimento. Solo l'immagine principale è prioritaria.
- Ispezionati gli screenshot delle aperture dei tre modelli a tutte le cinque larghezze, oltre a galleria, contatto e movimento ridotto. Nome e silhouette sono riconoscibili, le due azioni hanno pesi distinti e la navigazione lascia libere foto e primaria.

Misure della cornice fotografica e della CTA per Valico 900DSX (px CSS, primo schermo):

| Viewport | Foto, alto–basso | Larghezza × altezza cornice | Fine primaria | Inizio barra inferiore |
| --- | --- | --- | --- | --- |
| 375×812 | 215,2–470,2 | 315 × 255 | 650,2 | 740 |
| 390×844 | 216,5–481,7 | 330 × 265,2 | 661,7 | 772 |
| 768×1024 | 256,4–625 | 632 × 368,6 | 793 | 952 |
| 820×1180 | 259,7–653,3 | 684 × 393,6 | 821,3 | 1108 |
| 1440×1000 | 262,9–781,3 | 703,3 × 518,4 | 514,6 | non presente |

Il contenuto dell'immagine rimane proporzionato dentro la cornice grazie a `object-contain`; le misure non sono un ritaglio della silhouette. Filly e Agility condividono la cornice nei viewport compatti; il loro pulsante termina a 626,2 px (375) e 637,7 px (390). Il nome lungo resta su una riga sui telefoni e su due nel layout a colonne desktop.

Il primo tentativo di automazione ha evidenziato un selettore ambiguo durante i 10 ms della transizione fra route, non un doppione persistente nell'apertura. Conservato in `qa-screenshots/model-opening-final/first-run-selector-results.json`; il run successivo attende l'assestamento prima di verificare le destinazioni. Risultati e screenshot della matrice riuscita in `qa-screenshots/model-opening-final/`.

## Conferma finale del 21 ottobre

- Matrice ripetuta sul template finale, inclusa la categoria derivata dalle specifiche verificate: 17/17 scenari superati e 27/27 route valide. Risultati in `qa-screenshots/model-opening-final-confirmation/results.json`.
- Hit test reale tramite `elementFromPoint` della primaria superato al caricamento e dopo focus/scorrimento. Un solo `h1` presente anche dopo i cambi di pagina; nessun errore JavaScript, richiesta fallita o overflow rilevato.
- Verificato anche KYMCO Xciting VS 400 a 375 px: due foto complessive, dicitura singolare «Un’altra immagine», caricamento progressivo e apertura/chiusura della galleria con tastiera. Risultato superato in `qa-screenshots/model-opening-gallery-singular/results.json`.
- Lint generale e build integrata superati dopo le ultime modifiche. I nove sorgenti dell'intervento coincidono con quelli della copia production isolata usata per la verifica finale; hash in `qa-screenshots/ui-final-2026-10-21/source-hashes.json`.

Questa è una QA mirata del template: superfici, header e sezioni precedenti sono conservati, non si dichiara un audit Taste globale superato. Una verifica Chrome emulata non costituisce una prova su telefono/tablet fisico o Safari.
