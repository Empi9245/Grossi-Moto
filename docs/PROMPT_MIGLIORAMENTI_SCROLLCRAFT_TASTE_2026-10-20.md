# Grossi Moto — prompt per i miglioramenti

Quindici prompt pronti da copiare, nell'ordine consigliato. Ogni sezione è un incarico distinto: incollala in una chat aperta sul progetto Grossi Moto.

Aggiornamento: per proseguire dal numero 8 con meno ripetizioni, usa i quattro blocchi di `docs/PROMPT_ACCORPATI_DALL_08_2026-10-20.md`, che sostituiscono i prompt 8–15. Questa versione rimane come riferimento dei singoli obiettivi.

I problemi descritti provengono dall'audit del 20 ottobre 2026, disponibile in `docs/AUDIT_SCROLLCRAFT_TASTE_2026-10-20.md`. Sono una fotografia di quella verifica: prima di intervenire va controllato se il problema è ancora presente. Ogni prompt richiede solo le modifiche necessarie al proprio obiettivo.

La direzione generale resta quella attuale: uno showroom riconoscibile, moto e scooter grandi, movimento curato e un'app che aiuta a scegliere e contattare Grossi Moto. I prompt riguardano interventi sul progetto; la pubblicazione resta un passaggio separato da richiedere espressamente.

## 01 — Allineare il progetto con GitHub e risolvere i controlli bloccanti

Voglio partire da una copia affidabile del progetto Grossi Moto. Nell'audit del 20 ottobre la copia locale era indietro di un commit rispetto a GitHub: mancava la correzione che porta al modello giusto quando si arriva dallo showroom al catalogo. Erano presenti anche modifiche locali alla navigazione mobile e alla documentazione. La build riusciva, mentre il controllo del codice segnalava due errori negli effetti di AccessoryRail e zoom-parallax.

Leggi AGENTS.md, PROJECT_MEMORY.md e l'audit, verifica la situazione attuale e integra gli aggiornamenti pertinenti di GitHub preservando tutte le modifiche locali. Voglio mantenere il comportamento corretto dei collegamenti dallo showroom e la navigazione mobile che compare dopo l'uscita dalla hero. Risolvi gli errori ancora presenti senza cambiare grafica, immagini o animazioni. Se una parte risulta già corretta, conservala.

Il risultato deve essere una base coerente con GitHub, con lint e build superati e senza regressioni nei passaggi Home–Gamma. Verifica nel browser il collegamento diretto a un modello su desktop e telefono. Aggiorna la documentazione e spiega chiaramente quali aggiornamenti sono stati integrati, quali modifiche locali sono state conservate e cosa resta da pubblicare. Questo incarico termina con il progetto verificato in locale.

## 02 — Correggere la pagina Servizi su tablet e iPad

La pagina Servizi ha un difetto reale su tablet verticale: a 768 × 1024 il titolo è troppo largo per la sua colonna e la fotografia copre la parte finale delle parole. A 820 px la composizione lascia molto spazio vuoto; i contatti in basso risultano compressi e possono finire sotto la navigazione inferiore.

Voglio una composizione tablet curata, usando Scrollcraft e Taste e rispettando il carattere attuale della pagina. Titolo, foto e azione principale devono avere spazio sufficiente e una gerarchia chiara. Scegli la disposizione in base allo spazio disponibile: in verticale può funzionare una successione di testo e foto, in orizzontale una divisione equilibrata. La soluzione deve conservare la forza del titolo e un buon taglio della foto, con telefono e indirizzo leggibili e raggiungibili.

Preserva le versioni desktop e telefono che già funzionano. Sistema anche la struttura semantica della hero, mantenendo un solo contenitore principale di pagina e titoli coerenti. Leggi prima la memoria di progetto e verifica nel browser 768 e 820 px in verticale, 1024 e 1180 px in orizzontale, più un controllo a 375 e 1440 px. Controlla sovrapposizioni interne, spazio della barra inferiore, tastiera e orientamento; concludi con lint, build e documentazione aggiornata.

## 03 — Far funzionare bene click, tocco e trascinamento nei Servizi

Nel carosello compatto dei Servizi il pulsante per aprire i dettagli può ignorare il click del mouse. Durante l'audit a 375 px il click lasciava la scheda chiusa, mentre Invio la apriva. Il contenitore iniziava a gestire il trascinamento anche quando la pressione partiva dal pulsante. Il difetto è stato riprodotto con il mouse; il comportamento su touch fisico va verificato separatamente.

Voglio che premere un pulsante apra sempre il dettaglio e che trascinare la scheda continui a scorrere il carosello. Distingui chiaramente un click o un tocco da un vero trascinamento. Mantieni swipe, frecce, tastiera, chiusura dei dettagli e scorrimento verticale naturale della pagina. Le copie decorative delle schede devono restare escluse dalle interazioni e dalla lettura assistita.

Leggi la memoria di progetto e correggi il comportamento mantenendo l'aspetto e il modello di interazione attuali. Verifica nel browser click senza movimento, trascinamento breve e lungo, scorrimento verticale, frecce, Invio, Spazio, Escape e focus. Controlla telefono e tablet con le modalità di input disponibili, distinguendo emulazione e dispositivo fisico. Aggiungi un controllo di regressione utile per il conflitto tra click e drag, poi esegui lint e build e aggiorna la documentazione.

## 04 — Rendere chiaro e utilizzabile il primo schermo della Home mobile

Mi piace l'apertura cinematografica della Home, con video, zoom e ingresso nello showroom. Sul telefono, però, il primo schermo comunica soprattutto “Roma, ogni giorno” e invita a scorrere; l'accesso alla gamma diventa evidente solo alla fine dell'animazione. Chi arriva per cercare uno scooter dovrebbe capire subito cosa offre Grossi Moto e poter iniziare la scelta.

Usa Scrollcraft e Taste per migliorare questa apertura conservando video, qualità delle immagini, zoom, reveal e arrivo allo showroom. Voglio una breve indicazione chiara su moto, scooter e officina a Roma e un accesso riconoscibile alla gamma già nel primo schermo. Integra questi elementi nella composizione esistente, lasciando spazio al filmato e mantenendo leggibile la scena. L'azione finale dello zoom può rimanere.

Leggi le decisioni già approvate nella memoria di progetto. Cura anche il titolo principale della pagina nella versione mobile, con una struttura accessibile e senza doppioni visibili. Preserva la comparsa della navigazione inferiore dopo l'uscita dalla hero. Verifica nel browser a 375 e 390 px, su un tablet verticale e a 1440 px: caricamento iniziale, video, CTA, scorrimento completo, ritorno in alto e movimento ridotto. Esegui lint e build e documenta le modifiche.

## 05 — Mostrare prima la moto nelle pagine dei modelli su mobile

Nelle pagine dei singoli modelli, sul telefono, la moto arriva troppo in basso. Nel campione Voge Valico 900DSX a 390 × 844, intestazione, navigazione, nome, descrizione e due pulsanti occupavano quasi tutto il primo schermo. Voglio riconoscere subito il mezzo che sto guardando.

Usa Taste e Scrollcraft per riorganizzare il template comune: nome chiaro e una foto grande, completa e ben proporzionata devono guidare l'apertura. Seguono le informazioni essenziali e un'azione principale evidente; l'azione secondaria deve avere un peso minore. Mantieni descrizioni, galleria, consigli per la scelta, alternative e contatto con il modello già selezionato. La navigazione inferiore deve lasciare utilizzabili foto e comandi.

Leggi la memoria di progetto e applica una soluzione che funzioni con scooter piccoli, moto grandi e nomi lunghi. Conserva tutte le pagine modello, i loro indirizzi e i dati utili ai motori di ricerca. Usa solo informazioni verificate; gestisci il caricamento delle immagini senza caricare subito tutte le gallerie. Verifica nel browser almeno un KYMCO e una Voge a 375/390 px, su tablet e desktop, includendo galleria, ritorno al catalogo e contatto precompilato. Concludi con lint, build e documentazione aggiornata.

## 06 — Rendere più leggibile la scheda espansa nel catalogo mobile

Mi piace che nel catalogo mobile la scheda si apra direttamente al suo posto, mantenendo lo scooter, il colore del modello e il contesto del carosello. Una volta aperta, però, può diventare molto alta: dati e pulsanti si allontanano e per capire cosa fare bisogna scorrere troppo.

Voglio conservare questa espansione e renderla più essenziale. Usa Taste per dare priorità a immagine, nome, poche informazioni che aiutano davvero e un'azione principale. Il passaggio alla pagina completa e l'ingresso nel confronto devono restare chiari e distinti. Mantieni il modello di interazione attuale, con scheda attiva, anteprime laterali e selezione esplicita per il confronto.

Leggi prima le decisioni nella memoria di progetto. La nuova composizione deve adattarsi a nomi lunghi e contenuti diversi, mantenendo corretti altezza del carosello, scorrimento, cambio modello e chiusura dei dettagli. Verifica nel browser a 375, 390, 768 e 820 px apertura, chiusura, swipe, frecce, tastiera, cambio orientamento e arrivo diretto a un modello dallo showroom. Controlla anche che le copie laterali rimangano compatte e non interattive e che la griglia desktop conservi il proprio comportamento. Esegui lint e build e aggiorna la documentazione.

## 07 — Correggere la ricerca dei modelli con numeri e cilindrate

La ricerca libera del catalogo confonde alcuni numeri. Durante l'audit “Agility 50” restituiva anche Agility 350, perché il numero veniva trovato come parte di un altro numero. Il filtro dedicato alla cilindrata, invece, funzionava.

Voglio una ricerca naturale e prevedibile: chi scrive “Agility 50” deve ottenere i modelli pertinenti a quel nome e numero, senza corrispondenze casuali con 350. Mantieni la flessibilità su maiuscole, accenti e parole del nome. Gestisci anche le sigle alfanumeriche realmente presenti nella gamma, evitando che una regola sui numeri renda introvabili modelli validi. La ricerca deve continuare a combinarsi con filtri, reset e stato senza risultati.

Leggi la memoria di progetto e intervieni sulla logica necessaria, preservando grafica, apertura delle schede e selezione del confronto. Verifica i casi reali “Agility 50”, “Agility 350”, le ricerche per 125 e almeno una sigla alfanumerica presente nei dati. Aggiungi test mirati sui risultati attesi e sulle combinazioni con i filtri, poi controlla l'uso nel browser su telefono e desktop. Concludi con lint, build e una breve documentazione del criterio adottato.

## 08 — Rendere più utile il confronto e più precise le etichette

Il confronto ha già un'impostazione che mi piace: scelgo esplicitamente due o tre modelli e poi guardo le differenze. Voglio mantenerla. Ci sono due punti da migliorare: nello showroom “Confronta modelli” porta al dettaglio di un singolo mezzo, e la tabella contiene diversi consigli generali ma pochi dati che distinguano concretamente i prodotti. Sul telefono i controlli sopra la tabella occupano molto spazio.

Rendi coerente l'etichetta dello showroom con l'apertura del modello, preservando l'attuale selezione manuale per il confronto. Usa Taste per compattare intestazione e controlli mobile e permettere di vedere prima i mezzi e le differenze. Mantieni aggiunta e rimozione, svuotamento, conservazione della selezione durante la ricerca e navigazione accessibile della tabella.

Arricchisci il confronto con pochi dati realmente utili e verificabili per le versioni corrette, come peso, altezza sella, vano o dotazioni. Controlla le fonti ufficiali, conserva i riferimenti e lascia riconoscibili le informazioni mancanti. Tieni distinti dati tecnici e consigli editoriali. Leggi la memoria di progetto e verifica nel browser confronto a due e tre modelli, rimozione, reset, filtri, tastiera e scorrimento della tabella a 375/390 px, su tablet e desktop. Concludi con lint, build e documentazione delle fonti e delle modifiche.

## 09 — Migliorare il ritmo della Home mantenendo showroom e collage

Lo showroom grande e animato è il centro dell'esperienza Grossi Moto e voglio conservarlo. Mi piace anche il collage fotografico con il suo zoom. Dopo lo showroom, però, la Home accumula titoli importanti, inviti e frasi che ripetono più volte che Grossi Moto aiuta a scegliere e segue il cliente dopo l'acquisto. Questo rende lungo il percorso verso le informazioni pratiche.

Usa Scrollcraft e Taste per dare una funzione chiara a ciascun passaggio dopo lo showroom. Voglio un percorso più fluido: scelta del mezzo, prova concreta dell'assistenza, accessori e contatto. Conserva lo showroom con i suoi modelli, colori e transizioni, e il collage con le sette fotografie e l'effetto cinematografico approvato. Lavora sulle ripetizioni, sulle attese e sugli spazi attorno a questi momenti, mantenendo il carattere dell'esperienza.

Leggi nella memoria di progetto le decisioni già approvate su collage e motion. Definisci brevemente la nuova sequenza e applicala entro questi vincoli. Verifica nel browser la Home completa a 375/390 px, su tablet verticale e orizzontale e a 1440/1920 px, controllando passaggi tra sezioni, leggibilità, CTA, navigazione e movimento ridotto. Valuta la chiarezza del percorso e la facilità di raggiungere le informazioni, evitando obiettivi arbitrari sulla lunghezza. Concludi con lint, build e documentazione aggiornata.

## 10 — Dare a Officina e Contatti la stessa cura dello showroom

Lo showroom ha un'identità forte; alcune parti dedicate all'officina e ai contatti sembrano meno specifiche di Grossi Moto, con grandi scritte decorative, riquadri ripetuti e introduzioni simili. Voglio che anche queste parti sembrino parte della stessa app curata e facciano capire meglio chi c'è dietro l'attività.

Usa Taste e Scrollcraft per migliorare gerarchia, margini, piccoli testi, pulsanti e passaggi verso il contatto. Parti dal linguaggio già approvato: conserva marchio, palette delle pagine, controlli e informazioni corrette dell'attività. Mantieni il modulo conversazionale e il contatto con modello precompilato; rendi immediatamente riconoscibili telefono, indicazioni per arrivare e richiesta di assistenza. Su tablet voglio una composizione adatta allo spazio disponibile.

Verifica gli asset esistenti e usa fotografie autentiche della sede, delle persone o del lavoro quando effettivamente disponibili. Se mancano, migliora comunque la composizione con gli asset utilizzabili e prepara una breve lista delle foto da richiedere; le immagini illustrative devono restare riconoscibili come tali. Leggi la memoria di progetto e controlla nel browser Home, Servizi e Contatti a 375 px, su tablet e desktop, inclusi focus e percorso del modulo senza inviare richieste reali. Esegui lint e build e documenta il risultato.

## 11 — Conservare l'identità dello showroom con movimento ridotto

Lo showroom desktop sembrava scomparso perché Windows comunicava al browser la preferenza per il movimento ridotto e il sito mostrava una griglia alternativa. La preferenza di sistema è già stata riattivata con autorizzazione e lo showroom animato è tornato. Il punto da migliorare nell'app è la versione per chi sceglie legittimamente meno movimento: deve conservare l'identità di Grossi Moto.

Voglio uno showroom accessibile anche in questa modalità, con un mezzo grande, informazioni leggibili e comandi manuali per esplorare tutti i modelli. Usa Scrollcraft e Taste per mantenere la stessa cura visiva adattando il movimento: niente scorrimento obbligato, avanzamento automatico o grandi spostamenti della scena. Le azioni devono portare al modello corretto ed essere utilizzabili da tastiera. Mantieni integralmente la versione animata quando il movimento è consentito e i comportamenti responsive già approvati.

Leggi la memoria di progetto e lavora soltanto sul sito. Per verificare la preferenza usa l'emulazione del browser, lasciando inalterate le impostazioni di Windows. Controlla entrambe le modalità a 1440 px e su telefono e tablet, anche cambiando preferenza durante la visita: tutti i modelli devono restare raggiungibili, senza contenuti nascosti o spazi vuoti residui. Concludi con lint, build e documentazione del comportamento.

## 12 — Lasciare all'utente il tempo di leggere Accessori e fasi del servizio

Le sezioni Accessori e fasi del servizio possono cambiare automaticamente contenuto ogni sei secondi. Se scelgo una voce e sto leggendo, il passaggio successivo può sostituirla; il processo dei Servizi può avanzare anche quando è fuori schermo. Voglio che la selezione rimanga stabile durante l'uso.

Rendi manuale l'avanzamento delle fasi del servizio, perché sono contenuti da leggere con attenzione. Per Accessori mantieni l'avanzamento automatico solo se resta utile e controllabile: deve fermarsi quando interagisco, quando il focus è nella sezione, quando la sezione è fuori schermo o la scheda del browser è nascosta. Una scelta manuale deve restare selezionata finché decido di cambiarla o riattivo esplicitamente l'avanzamento. Rispetta sempre la preferenza di movimento ridotto.

Leggi la memoria di progetto e conserva immagini, testi, pulsanti, grafica e uso della tastiera. Mantieni coerenti selezione, pannello visibile e informazioni per le tecnologie assistive. Verifica nel browser lettura prolungata, scelta manuale, focus, frecce della tastiera, passaggio ad altre sezioni e ritorno alla scheda, su telefono e desktop. Controlla che non restino timer inutili fuori schermo e che lo showroom continui a funzionare. Esegui lint e build e aggiorna la documentazione.

## 13 — Migliorare il caricamento del video preservando la qualità

Il video della hero pesa circa 15,7 MB nella versione esaminata. Questa dimensione non dimostra quanti dati vengano scaricati all'apertura né che il filmato venga scaricato due volte. In passato la qualità era stata ripristinata appositamente e voglio conservarla, insieme a video, zoom e showroom.

Misura prima il comportamento reale su desktop, telefono e tablet: richieste video, quantità trasferita, avvio, priorità di caricamento e attività quando il video non è visibile. Poi correggi gli sprechi effettivamente riscontrati. Voglio un'apertura pronta e stabile, con una buona immagine e con le risorse adatte alla schermata e alla preferenza di movimento. Valuta caricamento anticipato, riproduzione fuori schermo ed eventuali varianti del filmato soltanto quando i dati mostrano un beneficio e la resa visiva resta adeguata.

Leggi la memoria di progetto e conserva gli asset originali e le decisioni sulla qualità. Confronta prima e dopo nelle stesse condizioni, distinguendo misure, stime e limiti. Verifica nel browser ingresso, avvio, scorrimento, ritorno in alto, cambio orientamento e movimento ridotto; controlla che il risparmio non crei attese, fotogrammi neri o salti di layout. Concludi con lint, build e documentazione delle misure. Le impostazioni del computer restano fuori dall'intervento.

## 14 — Allineare Privacy e Cookie Policy al funzionamento reale

La Privacy pubblica contiene ancora la frase “Dati da confermare con il cliente” e descrive un flusso precedente del modulo. Oggi WhatsApp ed email aprono l'app esterna con un messaggio preparato, mentre il canale Telefono raccoglie il numero per la richiamata tramite Formspree. La Cookie Policy contiene anche frasi rivolte a chi sviluppa il sito. Voglio testi comprensibili per chi visita Grossi Moto e aderenti a ciò che accade davvero.

Leggi la memoria di progetto e verifica il comportamento attuale del modulo, i servizi esterni e gli eventuali strumenti di tracciamento. Aggiorna le informazioni che puoi documentare usando i dati reali dell'attività. Mantieni coerenti i passaggi di consenso e le spiegazioni dei diversi canali. Raccogli a parte, in una nota interna, le informazioni che richiedono conferma del titolare, come tempi di conservazione o altri dettagli non disponibili: devono restare esplicite le parti ancora da validare prima della pubblicazione definitiva.

Il risultato deve separare chiaramente testo pronto, dati verificati e decisioni mancanti, senza inventare informazioni o dichiarare una validazione legale non eseguita. Preserva il modulo conversazionale e verifica i collegamenti e la leggibilità delle informative su mobile, tablet e desktop. Controlla i percorsi del modulo senza inviare messaggi o richieste reali. Esegui lint e build per le modifiche al sito e documenta fonti e punti da confermare.

## 15 — Verificare l'intera esperienza e preparare il risultato finale

Voglio una verifica finale dell'intero sito dopo i miglioramenti, mantenendo come riferimento il concept approvato: apertura cinematografica, showroom grande e animato, collage, catalogo con dettagli sul posto, confronto esplicito e modulo conversazionale. Leggi AGENTS.md, PROJECT_MEMORY.md e l'audit e valuta il risultato attuale con Scrollcraft e Taste. Correggi i difetti riproducibili introdotti o ancora presenti entro questo perimetro.

Controlla nel browser Home, Gamma, Servizi, Contatti e informative. Per le pagine modello verifica almeno uno scooter compatto, una moto grande e un nome lungo, e controlla tecnicamente tutte le route del template. Usa 375/390 px, tablet verticali 768/820 px, tablet orizzontali 1024/1180 px e desktop 1440/1920 px. Prova navigazione, collegamenti dallo showroom, ricerca numerica, filtri, dettagli, confronto a due e tre modelli, gallerie e contatto precompilato senza inviare richieste reali. Controlla testo, immagini, sovrapposizioni, scorrimento orizzontale, caricamento, stati vuoti ed errori, tastiera e movimento ridotto.

Verifica anche touch e Safari su dispositivi reali se disponibili, distinguendo chiaramente questi riscontri dall'emulazione. Esegui lint e build e ricontrolla GitHub e il sito pubblico: voglio sapere quali modifiche sono ancora locali e a quale versione corrisponde la pubblicazione. Aggiorna la documentazione e consegna un riepilogo con verifiche riuscite, limiti e problemi residui concreti. Questo incarico prepara il progetto verificato e il resoconto; un eventuale rilascio sarà richiesto separatamente.
