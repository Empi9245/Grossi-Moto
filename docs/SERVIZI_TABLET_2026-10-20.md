# Servizi: composizione tablet e verifica

Intervento del 20 ottobre 2026. Ambito: hero e navigazione superiore di `/servizi`.

## Direzione

Brief già definito dall'utente: conservare il carattere della pagina e le versioni telefono/desktop, dare spazio a titolo, foto e azione principale, rendere telefono e indirizzo leggibili e raggiungibili. Disposizione scelta su delega esplicita in base allo spazio disponibile.

Applicate Scrollcraft e Taste alla singola hero esistente: composizione editoriale, gerarchia tipografica, fotografia dominante e ordine di lettura naturale. Nessun nuovo concept di sito, asset generato, effetto di scroll, pinning o dipendenza. Restano font Instrument Sans, accento `#A34A3E` e fotografia `public/kymco-all/sections/new/hero servizi.jpg` già presenti nel progetto.

- Da 768 a 1279 px in verticale: titolo su due righe, descrizione e CTA, fotografia 16:9, contatti in flusso. Il taglio fotografico conserva meccanico e scooter.
- Nella stessa fascia in orizzontale: griglia 1.1:1, titolo su tre righe nella propria colonna, foto alta almeno 400 px e contatti sotto entrambe le colonne. Nessuna altezza della hero bloccata al viewport.
- Sotto 1024 px: fondo riservato di `6.5rem + safe-area-inset-bottom` per la barra inferiore. Da 1024 px: navigazione superiore completa visibile, barra inferiore globale nascosta e padding finale di 40 px.
- Telefono e mappa: link reali, testo da 16 px, target da almeno 48 px, ritorno a capo naturale senza troncamenti. Rimossa la ripetizione del dominio dai contatti della hero tablet.
- Sotto 768 e da 1280 px: composizioni visive precedenti conservate. L'intestazione desktop torna assoluta da 1280 px; tra 1024 e 1279 rimane nel flusso senza perdere i link di navigazione.

## Semantica e caricamento

La pagina contiene un solo `main`, ora focalizzabile dal link «Vai al contenuto principale». La hero è una singola sezione etichettata con un unico `h1` accessibile, «Assistenza, officina ed esperienza per moto e scooter a Roma». Le tre rappresentazioni visive responsive sono paragrafi decorativi con `aria-hidden`, evitando titoli duplicati nell'albero accessibile. I titoli delle sezioni successive restano `h2`; rimossi i `main` annidati e la sezione interna desktop non etichettata.

Le tre immagini responsive condividono lo stesso `sizes`, così anche le varianti nascoste selezionano la stessa risorsa. In Chrome a DPR 1, misurate due richieste della fotografia prima dell'allineamento e una sola dopo a 375, 768, 1024 e 1440 px. Nessun nuovo listener, calcolo JavaScript di layout o animazione continua nel ramo tablet. Riduzione del movimento rispettata dalle varianti esistenti.

## Riscontri browser

Chrome locale, build di produzione; dimensioni in CSS px, DPR 1. Verificati tutti gli screenshot di apertura indicati sotto, il passaggio alla sezione successiva, focus e modalità reduced motion.

| Viewport | Risultato |
| --- | --- |
| 768 × 1024 | Titolo in una misura di 704 px, contro 288 px iniziali; nessun testo oltre la colonna né foto sopra le parole. Contatti terminano a y=876, barra inferiore inizia a y=952. |
| 820 × 1180 | Misura del titolo 756 px, contro 314 px iniziali. Foto orizzontale e contatti subito dopo; eliminata la grande zona vuota interna tra CTA e contatti. |
| 1024 × 768 | Due colonne, navigazione superiore completa, CTA visibile e contatti su fascia dedicata. |
| 1180 × 820 | Due colonne e fotografia con soggetto leggibile; nessuna sovrapposizione interna. |
| 375 × 812 | Composizione telefono conservata; geometria del titolo identica alla baseline. |
| 1440 × 900 | Composizione desktop conservata; geometria del titolo identica alla baseline. |

Su tutte le sei dimensioni: overflow orizzontale 0, un solo `main`, un solo `h1`, nessun errore JavaScript. Nei quattro tablet: nessuna intersezione tra rettangoli del testo del titolo e fotografia. Il solo controllo dell'overflow globale non rilevava il difetto iniziale, quindi sono stati misurati anche i rettangoli interni.

Tastiera: skip link con focus effettivo su `main-content`, ordine naturale dei link, focus visibile su CTA/telefono/mappa e nessun controllo focalizzato coperto dalla navigazione inferiore. CTA attivata con Invio e arrivo confermato a `/contatti?argomento=officina#richiesta`; telefono e mappa verificati come link azionabili, senza chiamate né invio di moduli. Rotazione senza ricaricare: 768×1024 → 1024×768 → 820×1180 → 1180×820 → 768×1024, sempre una sola variante visibile e nessun overflow.

Riscontri locali, ignorati da Git:

- `qa-screenshots/services-tablet-before/`: baseline delle sei dimensioni.
- `qa-screenshots/services-tablet-final/`: aperture, focus indirizzo, scorrimento, reduced motion, `results.json`, `orientation.json` e `actions.json`.
- `qa-screenshots/services-tablet-before-taste/report.json` e `services-tablet-final-taste/report.json`: ispezione dell'intera pagina a 1440, 768 e 390 px.

## Critica Taste della hero

ROUND 1

Seen in one second: officina fotografica con titolo tablet troppo largo e contatti compressi.

Idea (one sentence): il titolo presenta il servizio, la fotografia mostra il lavoro e i contatti danno un seguito immediato.

Live thing: CTA verso la richiesta officina, telefono e posizione.

Layout words by section: hero=colonna troppo stretta / resto pagina=conservato.

Scores: design 6 · usability 5 · creativity 7 · content 8 → overall 6.0.

Caps applied: parole coperte dalla fotografia, contatti sotto la navigazione.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `services-tablet-before/768x1024.png`: le parole superano la colonna; allargare la misura con composizione verticale.
2. `services-tablet-before/820x1180.png`: vuoto interno tra CTA e contatti; rimuovere la distribuzione verticale forzata all'altezza del viewport.
3. `services-tablet-before/768x1024.png`: telefono e indirizzo compressi e coperti; fascia in flusso con target ampi e spazio per la barra.

ROUND 2

Seen in one second: titolo forte, azione evidente e fotografia completa del lavoro in officina.

Idea (one sentence): la stessa identità dispone testo e fotografia secondo l'orientamento del tablet.

Live thing: CTA funzionante da tastiera e contatti raggiungibili.

Layout words by section: hero=sequenza verticale o divisione equilibrata / resto pagina=conservato.

Scores: design 8 · usability 8.5 · creativity 7 · content 8 → overall 8.0.

Caps applied: valutazione limitata alla hero corretta; nessun voto complessivo al sito.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Nessun difetto residuo della composizione tablet richiesto dal brief.
2. `services-tablet-final/375x812.png`: stile telefono precedente conservato su richiesta, incluse numerazioni e ombre.
3. `services-tablet-final/1440x900.png`: trattamento fotografico desktop precedente conservato su richiesta.

L'ispettore Taste generale non è verde: 10 categorie FAIL nella baseline e 11 nel risultato. Include regole su palette, numerazione, ombre, microtesti, card e sezioni esterne alla hero che non sono state ridisegnate. Inoltre segnala `no-title` e `late-title` perché richiede un `h1` visibile, mentre questa implementazione usa un solo titolo accessibile condiviso e rappresentazioni visuali responsive decorative. È una scelta semantica deliberata, verificata con la review statica, non un'assenza del titolo dalla pagina. I tre gradienti segnalati dal lint Taste sono i veli fotografici preesistenti; il ramo tablet non ne aggiunge. Il report generale non costituisce quindi una certificazione dell'intera pagina.

## Verifiche tecniche e limiti

`npm.cmd run lint` superato. `npm.cmd run build` superato: TypeScript e 38 pagine generate. Review statica dedicata senza finding bloccanti; il possibile doppio caricamento fotografico è stato misurato e corretto. Diff dei file di implementazione senza errori di whitespace.

Altre lavorazioni modificavano contemporaneamente sorgenti e build condivisa: i primi controlli con file di build non allineati sono stati scartati. La verifica conclusiva è stata eseguita su una copia dei sorgenti con build e server propri, senza modificare né ripristinare il lavoro degli altri. La copia temporanea viene rimossa dopo la verifica; screenshot e misure restano disponibili.

Non eseguiti test su tablet fisico, Safari o tastiera virtuale del sistema operativo. Nessun commit, push o deploy in questo intervento.
