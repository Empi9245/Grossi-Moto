# Home, Officina e Contatti — 21 ottobre 2026

## Direzione e perimetro

Rifinitura coordinata con Taste e Scrollcraft, a partire dall'identità approvata. Un solo agente; nessuna dipendenza aggiunta. Conservati marchio, palette, informazioni dell'attività, modelli/colori dello showroom, hero Home, schede, confronto, navigazione mobile e correzioni input di `ServiceSwipe`.

La sequenza comunicata prima delle modifiche è: **showroom → scelta dal vivo → collage/consegna → accessori → officina → contatto**. Ogni passaggio ha una funzione distinta: orientare, accompagnare alla consegna, completare il mezzo, spiegare l'assistenza, raggiungere l'attività.

La richiesta successiva ha esteso il blocco alla hero Officina e ha chiesto di cambiare/rimuovere il pulsante Accessori. La soluzione finale supera quindi la proposta iniziale di rotazione controllata: Accessori interamente manuali, senza comando Pausa/Riprendi e senza CTA telefonica ripetuta. La logica provvisoria di rotazione e i relativi test sono stati rimossi.

## Risultato

- Home: ponte dopo lo showroom più breve, senza dichiarazione gigante; titoli, spazi e azioni comuni nelle sezioni successive. Officina riunisce consegna/controlli, manutenzione/diagnosi e montaggio accessori in tre descrizioni, senza la scritta decorativa di fondo, numeri o griglie di riquadri ripetuti.
- Collage: sette fotografie nei sette slot approvati. Il componente trovato nel checkout rendeva nove immagini; i due elementi aggiuntivi non vengono più montati, i file restano presenti. Foto principali, crop dei sette slot, scale dello zoom e regia reversibile conservati. Testi finali ridotti a due contenuti concreti: consegna e prossimo tagliando; eliminato l'invito al contatto duplicato sotto il collage.
- Ritmo del collage: altezza da 300 a 260svh su compact e da 400 a 320svh su desktop; ingresso dei credits da 2,04 a 1,55s, uscita da 0,92 a 0,72s. Movimento ridotto mantiene una composizione statica leggibile. Nessun intervento sul filmato o sui tempi della hero Home.
- Accessori: quattro categorie manuali, senza avanzamento automatico e senza pulsante secondario di contatto. Le immagini si mostrano intere, compresi casco e supporto smartphone. Pannelli sovrapposti nella stessa cella di griglia riservano l'altezza del contenuto più lungo; quelli inattivi sono invisibili, `inert` e `aria-hidden`.
- Officina `/servizi`: una sola hero con H1 visibile «Officina moto e scooter.», descrizione specifica di Grossi Moto di Angelo Grossi, richiesta assistenza, numero e indicazioni. Eliminati le tre composizioni duplicate, il ritaglio a tacca, gli overlay, i pannellini numerati e l'entrata ritardata. Testo e immagine sono separati; colonne affiancate da 768px, composizione in flusso su telefono. Header nel flusso anche su desktop, stessi controlli di navigazione.
- Selettore servizi desktop e fasi del servizio: entrambi manuali, così una scelta resta leggibile dopo l'uscita da hover/focus. Preservati scelte e transizioni del selettore, comportamento compatto di `ServiceSwipe`, ordine e contenuti delle quattro fasi. Corrette le attribuzioni degli alt dei sei servizi e aggiunta la nota sulle immagini illustrative.
- Contatti: apertura compatta con titolare, telefono, email, indicazioni e accesso alla richiesta; rimossi i tre riquadri dei canali e l'ulteriore chiusura «Chiedi pure». Sede e orari conservano tutti i dati. Modulo conversazionale, controller, messaggi, privacy, recapiti e modello precompilato conservati.

`journey.module.css` condivide cornice, gerarchia e azioni nelle parti coinvolte: contenuti fino a 80rem, margini 20/28/40/56/80px e pulsanti di almeno 48px. I pannelli con cornice esterna compensano l'inset, mantenendo allineati i titoli. Su tablet i dettagli degli Accessori e del processo sono affiancati alla foto; Contatti usa una colonna introduttiva più stretta e una colonna dedicata al modulo.

## Asset e fotografie da richiedere

Verificati gli asset pertinenti e il manifest già esistente `docs/prompts/mobile-tablet/ASSET-MANIFEST.md`. Nessun file trovato documenta con certezza sede, persone o lavoro reale di Grossi Moto: i nomi dei file non sono una prova di provenienza.

La nuova hero usa il dettaglio tecnico già disponibile `/grossimoto/servizi/manutenzione-dettaglio.webp`, con alt prudente e didascalia **Immagine illustrativa**. File da 54.054 byte, ratio 4:3 conservato, un solo elemento Image prioritario. Le quattro immagini Accessori sono le illustrazioni già presenti; non sono prodotti dichiarati disponibili. Nessuna immagine generata, scaricata, ricodificata o cancellata in questo blocco.

Foto utili da richiedere al titolare, con autorizzazione all'uso:

1. Esterno con insegna, ingresso e numero civico riconoscibili; una vista orizzontale e una verticale.
2. Angelo Grossi e le persone che seguono i clienti, nel loro ambiente reale.
3. Officina durante un intervento effettivo: inquadratura dell'ambiente e dettaglio delle mani al lavoro.
4. Accoglienza o consegna del mezzo, con showroom/officina riconoscibili e consenso delle persone ritratte.

Queste fotografie permetteranno di raccontare chi c'è dietro l'attività senza attribuire luoghi o persone alle illustrazioni.

## Verifiche sul risultato

| Controllo | Esito |
| --- | --- |
| `npm.cmd run lint` nel workspace | Passato sul risultato finale |
| `npm.cmd run build -- --webpack` sulla copia isolata | Passato: TypeScript e 38 pagine |
| Test esistenti `contact-flow.test.mjs` | 9 passati |
| Nuova regressione `manual-panels.browser.mjs` | Accessori e processo alle tre larghezze; lettura reale di 11s per ciascun pannello scelto |
| Home, Servizi, Contatti | Chrome a 375×812, 820×1180, 1440×900 |
| Overflow e runtime | Nessun overflow globale o errore JavaScript nei casi finali |
| Tastiera | Frecce, Home/End, Tab al pannello attivo, focus visibile e un solo pannello accessibile |
| Stabilità | Selezione dopo blur, uscita/ritorno nella sezione e evento di visibilità del documento simulato; altezza stabile |
| Movimento ridotto | Cambio live della preferenza, Accessori/processo usabili e collage statico; hero Officina già statica |
| Servizi compatti | Apertura/chiusura a 375px; rail tablet da tastiera a 820px |
| Selettore servizi desktop | Scelta conservata dopo blur e 9,5s di lettura |
| Modulo modello | Agility S 125 precompilato, errore nome/privacy, anteprima modificabile e WhatsApp intercettato |
| Modulo officina | Ingresso reale dalla nuova hero mobile al form con argomento officina; precompilazione tablet |
| Richiamata | Risposte Formspree 500→200 simulate localmente: errore recuperabile e ripetizione riuscita |
| Parità sorgenti | 80 file sotto `src` identici alla copia verificata, SHA-256 |

Screenshot e report finali in `qa-screenshots/journey-2026-10-21/`: `final-results.json`, `source-hashes.json`, `final-*.png`. Script `verify-final.mjs`, conferme mirate `confirm-mobile-contact.mjs` e `confirm-images.mjs`. Le prove precedenti sulla rotazione e i tentativi interrotti dell'automazione non certificano la soluzione finale. Le ripetizioni finali sono circoscritte alla nuova richiesta sulla hero, ai margini/indicazioni e al crop degli Accessori.

La build è isolata con la procedura già presente nel runbook: sorgenti copiati, asset pubblici condivisi in lettura, dipendenze del workspace e porta 3232. Nessuna modifica alle procedure o alle impostazioni Windows. Nessun messaggio reale inviato e nessuna ricezione esterna verificata.

## Limiti

Chrome desktop con viewport/touch e preferenza di movimento emulati: non è una prova su Safari, iPhone o iPad fisico. Nessuna nuova misura di Core Web Vitals, FPS o prestazioni su hardware mobile. Verifica visiva circoscritta alle aree richieste, senza nuovo audit generale del sito o dichiarazione di conformità totale al misuratore Taste. QA generale e informative restano al blocco finale.

Nessun commit, push o deploy. Modifiche locali precedenti conservate.
