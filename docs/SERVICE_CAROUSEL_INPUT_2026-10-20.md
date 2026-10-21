# Servizi: click, swipe e focus — 20 ottobre 2026

## Comportamento

Corretto `ServiceSwipe.tsx` mantenendo layout, colori, immagini, stack infinito,
transizioni, frecce e rail nativo esistenti. Il pulsante sovrapposto alla scheda
semantica continua ad aprire e chiudere i dettagli.

- Pressione senza movimento: nessuna cattura esplicita del contenitore; il click
  raggiunge il pulsante. La cattura implicita touch del browser rimane disponibile.
- Movimento fino a 10 CSS px: tolleranza del tap, senza cattura esplicita.
- Oltre 10 px: il gesto non può più aprire i dettagli, nemmeno tornando al punto
  iniziale. La prima direzione intenzionale viene conservata.
- Drag orizzontale (X > Y × 1,15): il contenitore acquisisce la cattura; al rilascio
  da 36 px cambia scheda. Un drag breve non cambia scheda e non apre i dettagli.
- Gesto verticale: niente cattura esplicita o `preventDefault`; `touch-action:
  pan-y` conserva lo scroll naturale della pagina. Un gesto partito verticale non
  diventa uno swipe del carosello.
- `pointercancel`, perdita della cattura e uscita mouse senza cattura azzerano il
  gesto. La perdita di cattura che risale dal pulsante durante il trasferimento
  touch al contenitore non cancella lo swipe in corso.
- Dopo un drag, il click/tap successivo funziona subito. Invio e Spazio conservano
  l'attivazione nativa del pulsante; Escape chiude mantenendo il focus. Quando una
  navigazione rende inerte la vecchia scheda, il focus passa al carosello con
  `preventScroll`, quindi Tab raggiunge il nuovo pulsante.

Le 17 copie non semantiche dello stack a sei servizi restano `inert`,
`aria-hidden`, senza pulsanti e con alt vuoto. Un solo pulsante dettagli è
interattivo e presente nella lettura assistita.

La preferenza reduced motion usa ora `useMediaQuery`, già presente nel progetto:
server e primo render client coincidono; successivamente viene scelto il rail
statico. Questo elimina l'errore di hydration rilevato aprendo la pagina con
movimento ridotto attivo, senza cambiare la variante prevista.

## Regressione

- `tests/service-gesture.test.mjs`: quattro casi sulla classificazione del gesto,
  comprese escursione con ritorno e direzione verticale bloccata.
- `tests/service-carousel.browser.mjs`: eventi mouse reali di Chromium, tastiera e
  input touch emulato tramite Chromium. Il primo controllo usa il click del
  browser sul pulsante, quindi rileva anche il retargeting da cattura anticipata;
  non usa `element.click()` o eventi sintetici JavaScript del DOM.

Il controllo browser verifica apertura/chiusura, jitter, drag breve/lungo,
ritorno all'origine, primo click dopo drag, swipe con dettagli aperti, frecce,
Invio, Spazio, Escape, Home/End, Tab e focus, copie decorative, cancellazione
touch, scroll verticale, overflow e risorse/JavaScript in errore.

## Matrice di verifica locale

| Viewport | Input | Variante e copertura |
| --- | --- | --- |
| 375 × 812 | Mouse e tastiera automatizzati | Stack, disclosure, drag, scroll, focus e copie |
| 375 × 812 | Touch Chromium emulato, anche mouse/tastiera | Tap, drag breve/lungo, cancellazione, scroll verticale |
| 768 × 1024 | Mouse e tastiera automatizzati | Rail nativo, drag oltre lo snap, frecce e scroll pagina |
| 768 × 1024 | Touch Chromium emulato | Scroll orizzontale nativo e verticale della pagina |
| 375 × 812, reduced motion all'apertura | Touch emulato, mouse e tastiera | Rail statico, caricamento, frecce e scroll |
| 1440 × 1000 | Chromium desktop | Carosello compatto nascosto, layout desktop e overflow |

Sul rail tablet/reduced motion i dettagli sono già nel contenuto: non esiste un
pulsante di apertura/chiusura. La sua assenza è parte del modello precedente.

Le prove emulano dimensioni e input in Chrome su Windows: nessun telefono,
tablet, Safari o iPad fisico è stato collegato o verificato. Le prove non
certificano il comportamento dei browser su quei dispositivi. Ancora da fare su
hardware: tap, swipe orizzontale, gesto verticale iniziato sulla scheda, gesture
interrotta e uso di mouse/tastiera collegati al tablet.

Screenshot e risultati dettagliati sono in `qa-screenshots/service-carousel-*`
(ignorati da Git). Per isolare la verifica dalle build contemporanee di altre
chat, la matrice finale usa una copia temporanea dei sorgenti in
`qa-screenshots/service-fixture`, compilata separatamente; i file del carosello
corrispondono alla correzione nel workspace. Nessuna pubblicazione o dipendenza
aggiunta.

Esito conclusivo: 47 verifiche browser superate; lint generale e build production
(TypeScript, 38 pagine) riusciti. Suite unitaria corrente: 39 test superati,
inclusi i quattro nuovi casi gesto e i test concorrenti già presenti alla verifica.
