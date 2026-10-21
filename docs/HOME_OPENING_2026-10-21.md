# Home: apertura cinematografica e accesso alla gamma

Intervento iniziato il 20 ottobre, conclusione e verifica il 21 ottobre 2026.

## Direzione e perimetro

Il brief conserva la regia approvata: fotografia di Roma come fondo, filmato nel riquadro, espansione del video, reveal e arrivo allo showroom. La modifica riguarda l'orientamento nel primo schermo, soprattutto sul telefono. Nessun nuovo asset, dato commerciale, libreria o effetto di ingresso.

Scrollcraft: riconoscimento di Grossi Moto e dell'offerta → scelta immediata della gamma oppure esplorazione del filmato → zoom completo → showroom. Il momento centrale resta l'ingresso nello showroom. Taste: titolo in due righe, frase concreta leggibile, una sola CTA e centro dell'inquadratura libero. Essendo un intervento su una composizione approvata, nessuna estrazione casuale di nuove direzioni, palette o font.

## Comportamento

- Mobile: «Roma, ogni giorno.» è un unico H1 con due span per la coreografia già esistente. Il prefisso accessibile «Grossi Moto» chiarisce il soggetto senza aggiungere un secondo titolo visibile. Le due varianti responsive espongono un solo H1 alla volta; il titolo desktop rimane invariato.
- «Moto, scooter e officina a Roma.» compare dal primo render, subito sotto al titolo. Eliminata la piccola etichetta dei marchi sopra il titolo mobile.
- «Scopri la gamma» è un solo link `/scooters`, disponibile dall'apertura fino alla fine dello zoom. Altezza minima 48px, stato focus visibile, nessuna comparsa ritardata. Il link non è più dentro un overlay inizialmente trasparente.
- Titolo e descrizione occupano la parte alta; il pulsante quella bassa. Il centro resta al video. Il riquadro iniziale è alto `min(400px, 48svh)`; l'espansione continua ad arrivare a 100lvh. Pulsante e invito allo scorrimento compensano `lvh - svh`, rimanendo nella regione minima del viewport quando le barre del browser sono aperte.
- Il testo finale Grossi Moto rimane, con la stessa CTA persistente. Scrim neutri localizzati sostengono la leggibilità; nessuna ricodifica del video né sostituzione delle fotografie. Il video mobile ha il poster esistente anche durante il caricamento.
- Durate, easing, settle di 280ms, nuovo gesto dopo lo zoom e uscita verso lo showroom da almeno 0,58s conservati. Navigazione inferiore invariata: nascosta e inerte dentro la hero, disponibile dopo l'uscita secondo la direzione di scroll; nascosta al ritorno.
- Le animazioni imperative mobile vengono fermate quando si lascia la Home, cambia breakpoint o si attiva il movimento ridotto. Anche l'eventuale timer di uscita viene cancellato.
- Con movimento ridotto: poster, titolo, descrizione e CTA immediati; niente zoom obbligato o doppio testo finale. La preferenza viene emulata nel browser, senza cambiare Windows.

## Correzione emersa durante le verifiche

Il collage usava `useReducedMotion` per scegliere due alberi HTML differenti già durante l'idratazione. In modalità ridotta si riproducevano React #418 e, su tablet/desktop, l'errore Framer sul riferimento di `useScroll` non montato. Il problema era preesistente.

`ZoomParallax` ora usa la media query SSR-safe del progetto e monta la parte animata in un componente separato. Il fallback statico non inizializza `useScroll`. Foto, testi e regia della variante animata restano gli stessi. Anche HeroRevealStage e ScooterShowcase leggono la preferenza con lo stesso hook, così rispondono ai cambiamenti durante la visita.

## Verifica

I primi controlli sulla cartella `.next` condivisa sono stati invalidati da ricostruzioni contemporanee: chunk mancanti e manifest sostituiti. Questi risultati sono conservati come diagnosi, non considerati una verifica riuscita. La verifica finale usa una copia di produzione isolata dei sorgenti e le stesse librerie e risorse locali.

Riscontri e script in `qa-screenshots/hero-opening-2026-10-20/`. Prima/dopo dell'apertura acquisiti a 375, 390, 768 e 1440px. Nessun test su iPhone/iPad o Safari fisico; l'emulazione non verifica le barre del browser di un telefono reale.

Verifica finale riuscita:

- Chrome produzione, 375×812, 390×844, 768×1024 e 1440×900, normale e ridotta: 8/8 scenari. Video in riproduzione quando consentito, poster nella variante ridotta, CTA dal primo schermo con focus/Invio e destinazione reale; Back, intero scorrimento al footer, ritorno in alto e visibilità/inert della navigazione inferiore corretti. Nessun errore JavaScript o overflow nei controlli.
- 4 controlli aggiuntivi passati: cambio live della preferenza su telefono e desktop durante le animazioni, apertura della gamma durante lo zoom senza scroll residuo sulla nuova pagina, video non disponibile con poster e CTA utilizzabile, link alla gamma senza JavaScript. Registro `edge-verification.json`.
- CTA mobile alta 48px, a y696–744 su375×812 e y728–776 su390×844; H1 in due righe a43,8/45,6px. Nessun contenuto aggiunto sopra il filmato centrale.
- Master video: oggetto Git `51019069cb2ff599878249c56182bfc2257749d2` identico a HEAD. Non è una misura dei byte trasferiti o delle prestazioni di rete.
- Lint generale e build produzione integrata completati, TypeScript e38pagine inclusi. La copia isolata contiene gli stessi sorgenti dei tre interventi; hash di confronto in `qa-screenshots/ui-final-2026-10-21/source-hashes.json`.

I report Taste finali e tutte le relative immagini sono stati letti. Il gate globale non è a zero FAIL: segnala soprattutto convenzioni esistenti nelle sezioni conservate. Inoltre `late-title` a768/1440 è una limitazione del suo selettore sul primo H1, che appartiene alla variante mobile nascosta: l'altro H1 è visibile e l'albero accessibile espone un solo titolo. `covered-text` include titoli di slide inattive nello stack approvato, mentre il conteggio delle immagini cambia con lo stato della scena. I controlli dedicati e gli screenshot verificano il contenuto attivo; non sono stati nascosti elementi per aggirare l'ispettore.

## Critica Taste

ROUND 1

Seen in one second: filmato e messaggio Roma; l'offerta e l'ingresso alla gamma richiedono la fine dello zoom.

Idea (one sentence): la strada di Roma diventa l'ingresso allo showroom Grossi Moto.

Live thing: espansione reversibile del filmato e scelta dei mezzi nello showroom.

Layout words by section: hero=video incorniciato / showroom=palcoscenico prodotto; altre sezioni conservate.

Scores: design 7.5 · usability 6 · creativity 7 · content 6.5 → overall 6.0 dopo cap dell'ispettore globale.

Caps applied: gate globale segnala anche convenzioni preesistenti nelle sezioni fuori perimetro; non è un audit globale a zero FAIL.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `before-375.png`: nessuna CTA percepibile all'apertura → un link persistente, accessibile subito.
2. `before-390.png`: claim non spiega l'offerta → frase concreta su moto, scooter e officina a Roma.
3. Titolo mobile frammentato in due H2 e H1 desktop nascosto → H1 mobile unico con due span, una variante esposta per breakpoint.

ROUND 2

Seen in one second: Grossi Moto, moto/scooter/officina a Roma e un ingresso alla gamma; il filmato rimane leggibile.

Idea (one sentence): il visitatore può scegliere subito oppure seguire la strada fino allo showroom.

Live thing: lo stesso zoom approvato, con accesso diretto alla gamma sempre disponibile.

Layout words by section: hero=titolo alto, filmato libero, azione bassa / showroom=palcoscenico prodotto.

Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 6.0 con il medesimo cap globale; valutazioni di merito soggettive, non misure di performance.

Caps applied: l'ispettore dell'intera Home continua a segnalare titoli, numerazioni, ombre e trattamenti già presenti fuori dall'intervento o vincolati alla composizione approvata. Nessuna dichiarazione di zero FAIL globale.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. CTA oltre il primo schermo con differenza tra svh e lvh → compensazione esplicita, controllo geometrico e focus nel browser.
2. Riduzione del movimento durante lo zoom → stop delle animazioni attive e fallback statico completo.
3. Errore di idratazione del collage ridotto → scelta SSR-safe e ciclo di vita separato dell'animazione.

Media: riutilizzati soltanto asset del progetto. Nessuna immagine trovata sul web, generata o sostitutiva da accreditare; nessun contenuto campione aggiunto. Nessun punteggio Core Web Vitals o promessa di prestazioni su dispositivo fisico.
