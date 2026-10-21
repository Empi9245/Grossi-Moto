# Grossi Moto: audit Scrollcraft e Taste

Data: 20 ottobre 2026. Sito esaminato: https://grossi-moto.vercel.app/.

La direzione proposta conserva showroom, cambi di modello, passaggio al catalogo, schede espandibili, confronto e modulo conversazionale. Questo documento descrive interventi da valutare; il codice dell'app non è stato modificato durante l'audit.

## Esito principale

Lo showroom è la parte da cui prendere il linguaggio del resto del sito. L'intervento utile è rendere più coerenti le pagine successive e più diretto il percorso di scelta, mantenendo il suo carattere.

Le tre priorità sono:

1. Correggere i difetti riprodotti su tablet e nei controlli del carosello.
2. Rendere immediati accesso alla gamma e lettura del prodotto su telefono.
3. Usare lo showroom come momento centrale della Home, con una parte successiva più compatta e immagini reali della sede e dell'officina.

## Showroom ripristinato: causa e azione eseguita

All'inizio della verifica, Windows restituiva `SPI_GETCLIENTAREAANIMATION = false` e il browser `prefers-reduced-motion: reduce = true`. Il sito sceglieva quindi `StaticShowcase` al posto dello showroom desktop animato.

Il codice dello showroom era presente. La condizione si trova in `HeroRevealStage.tsx:547` e `ScooterShowcase.tsx:318`. Non risultava una sua rimozione nell'ultimo aggiornamento remoto.

Dopo l'autorizzazione esplicita dell'utente è stata riattivata soltanto la preferenza Windows relativa agli effetti di animazione. Verifica successiva: impostazione Windows attiva, media query del browser falsa, `data-showcase-mode="pinned"` presente, reveal e cambi di modello nuovamente visibili.

- Riscontro: `qa-screenshots/showroom-restored-desktop-1440-2026-10-20.png`.
- Registro prima/dopo: `qa-screenshots/motion-system-change-2026-10-20.json`.
- Ripristino dell'impostazione precedente: Impostazioni Windows → Accessibilità → Effetti visivi → Effetti di animazione → Disattivato.
- API utilizzata: [documentazione Microsoft di SystemParametersInfoW](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-systemparametersinfow).

Non è stato accertato quando o da chi fosse stata disattivata la preferenza. Non sono state cambiate altre impostazioni di Windows.

Miglioramento futuro: mantenere l'art direction dello showroom anche con movimento ridotto. Scooter grande, dati e comandi manuali possono rimanere; movimento, pinning e autoplay possono essere ridotti senza trasformare l'esperienza in una griglia dall'aspetto diverso.

## GitHub e verifiche del progetto

| Elemento | Stato verificato |
| --- | --- |
| Repository | `Empi9245/Grossi-Moto`, ramo predefinito `master` |
| Commit locale | `dba95f1e946e71d838386ffcb90de42e742db244` |
| Commit remoto | `b6917d7adae795b9757b4691b5aede0c9123e625`, 14 ottobre 2026 |
| Allineamento | La copia locale è indietro di un commit; il confronto remoto non mostra divergenze di commit locali |
| Correzione mancante in locale | Allineamento al modello scelto dallo showroom dopo l'assestamento della griglia compatta, in `CatalogPage.tsx` |
| Prova pubblica della correzione | `/scooters?focus=agility-s-125` a 375 px porta al capitolo 125 cc, con titolo a circa 84 px dall'alto e scheda Agility S aperta |
| Pubblicazione Vercel | Stato `success` sul commit remoto |
| GitHub Actions | Controllo `Lint, typecheck and build` fallito |
| Lint locale | Fallisce su due errori `react-hooks/set-state-in-effect`, in `AccessoryRail.tsx:35` e `zoom-parallax.tsx:376` |
| Build locale | Completata, TypeScript e generazione di 38 pagine inclusi |

La prima build non poteva scaricare Instrument Sans nell'ambiente con rete limitata; la ripetizione con accesso alla rete è riuscita. Questo errore iniziale non dimostra un difetto del sito.

Erano già presenti modifiche locali a `PROJECT_MEMORY.md` e `MobileAppNav.tsx`. Sono state preservate. La modifica della navigazione mobile è descritta nella memoria di progetto, ma non è pubblicata nel commit remoto verificato. Nessun pull, merge, commit, push o deploy è stato eseguito nell'audit.

Riferimenti: [commit remoto](https://github.com/Empi9245/Grossi-Moto/commit/b6917d7adae795b9757b4691b5aede0c9123e625), [confronto locale/remoto](https://github.com/Empi9245/Grossi-Moto/compare/dba95f1e946e71d838386ffcb90de42e742db244...b6917d7adae795b9757b4691b5aede0c9123e625), [controllo automatico GitHub](https://github.com/Empi9245/Grossi-Moto/actions/runs/38604464581).

## Riscontri e interventi proposti

### 1. Servizi su iPad verticale: titolo coperto dalla foto

**Difetto riprodotto.** A 768 × 1024 il titolo occupa una colonna larga circa 281 px, mentre il contenuto arriva a circa 391 px. La foto sulla destra copre la parte finale di alcune parole. L'assenza di overflow globale non intercetta questo difetto interno.

La colonna usa metà larghezza, padding di 48 px e un titolo con minimo di 70,4 px. In basso telefono, indirizzo e dominio vengono compressi; la barra inferiore copre parte di queste informazioni. La composizione a 820 px resta molto allungata, con ampio spazio vuoto sotto la CTA.

**Cosa farei:** una composizione tablet dedicata, con titolo dimensionato sulla sua colonna, foto meno stretta e contatti su righe leggibili. In verticale valuterei testo e foto in successione; in orizzontale una divisione più equilibrata. Una sola CTA di pagina ben riconoscibile.

Fonte: `src/components/ui/services-hero.tsx:186`, `:192`, `:241`. Screenshot: `qa-screenshots/audit-services-tablet-768-2026-10-20.png`.

### 2. Carosello Servizi compatto: click intercettato dal trascinamento

**Difetto riprodotto con mouse a 375 px.** Il pulsante «Apri i dettagli di Officina moto e scooter» resta chiuso dopo il click. La sua attivazione con Invio apre correttamente i dettagli. Il contenitore acquisisce la cattura del puntatore mouse anche quando la pressione nasce sul pulsante.

**Cosa farei:** escludere i controlli interattivi dalla cattura del trascinamento e distinguere il click dal drag dopo una soglia di movimento. Preservare swipe, frecce, tastiera ed espansione della card. Il comportamento touch su telefono fisico resta da provare.

Fonte: `src/components/sections/ServiceSwipe.tsx:470`, in particolare la cattura a `:481`.

### 3. Home mobile: rendere disponibile la gamma dall'inizio

**Osservazione di esperienza.** A 375 × 812 l'apertura è una scena video con «Roma, ogni giorno» e «Scorri per entrare». Il pulsante «Scopri la gamma» diventa disponibile alla fine dello zoom. Il nome del luogo è evidente; il tipo di attività e la scelta successiva potrebbero esserlo di più.

**Cosa farei:** conservare video e zoom, aggiungere una frase chiara su moto, scooter e officina e un accesso compatto alla gamma già nel primo schermo. Chi vuole esplorare continua lo scorrimento. Il titolo mobile deve avere anche una struttura semantica corretta: il titolo `h1` desktop risulta nascosto, mentre le due righe mobile sono `h2`.

### 4. Schede prodotto mobile: il mezzo deve vedersi prima

**Osservazione riprodotta sulla Voge Valico 900DSX a 390 × 844.** Header, ritorno al catalogo, breadcrumb, nome, descrizione e due CTA occupano quasi il primo schermo. La moto arriva in basso, parzialmente sotto la navigazione.

**Cosa farei:** titolo e immagine del mezzo prima, poi sintesi e azione principale. La seconda azione può avere meno peso. Conservare i consigli editoriali e le alternative, che aiutano già a scegliere. Rendere più compatta anche la scheda espansa nel catalogo.

Screenshot: `qa-screenshots/audit-product-mobile-390-2026-10-20.png`.

### 5. Ricerca: distinguere 50 da 350

**Ambiguità riprodotta.** La ricerca «Agility 50» restituisce Agility 50 R16 Plus e Agility 350. I token vengono cercati come sottostringhe: «50» corrisponde anche a «350».

**Cosa farei:** trattare la cilindrata come valore distinto e dare precedenza alle corrispondenze del nome. Il filtro per cilindrata funziona; è la ricerca libera che richiede una lettura più precisa dei numeri.

Fonte: `src/components/catalog/CatalogPage.tsx:154` nella copia locale.

### 6. Confronto e nomi delle azioni

**Cosa funziona:** selezione esplicita, confronto di due modelli, conservazione della selezione cambiando ricerca, stato vuoto e filtri combinati. Il collegamento dallo showroom arriva alla scheda attesa nella versione pubblica.

**Cosa migliorerei:** il comando «Confronta modelli» dello showroom apre la scheda del singolo modello. Userei un'etichetta coerente con questa destinazione oppure un ingresso che selezioni davvero quel mezzo per il confronto.

Il confronto offre cilindrata, impostazione, utilizzo e consigli editoriali. Lo arricchirei con pochi dati verificati che distinguano davvero i modelli, per esempio peso, altezza sella, vano e dotazioni della versione corretta, quando disponibili. Nessun dato va inventato. Su mobile compatterei i controlli sopra la tabella, per raggiungere prima le differenze.

Screenshot: `qa-screenshots/audit-comparison-mobile-390-2026-10-20.png`.

### 7. Ritmo e art direction dopo lo showroom

Lo showroom ha scala, movimento e identità. Dopo compaiono una grande dichiarazione sulla taglia, il collage con zoom, più dichiarazioni editoriali, accessori, officina e contatti. Diverse frasi ripetono il messaggio «ti aiutiamo a scegliere e ti seguiamo dopo».

**Cosa farei:** showroom come momento centrale; collage conservato ma più breve; una prova concreta dell'assistenza dopo la scelta; accessori e contatto in una sequenza più compatta. Ridurre la competizione tra titoli enormi, contatori e pannelli decorativi. Il colore associato ai modelli può rimanere: ha un ruolo nell'esperienza.

Per Officina e Contatti userei immagini reali della sede, del lavoro e delle persone, quando disponibili. La grande scritta decorativa «Officina» e i numerosi riquadri secondari comunicano meno di una buona foto specifica del posto. Gli asset illustrativi attuali non devono essere presentati come prova fotografica del lavoro reale.

Uniformerei soprattutto azioni, margini, piccoli testi e chiusure delle sezioni. Il risultato dovrebbe sembrare un'unica app curata anche fuori dallo showroom.

### 8. Movimento utile e caricamento

Gli accessori e le fasi del servizio cambiano automaticamente ogni sei secondi. Il processo può avanzare anche dopo una selezione manuale; non è presente una pausa legata al focus o alla lettura. Per `ServiceProcess` il timer è attivo anche fuori schermo, mentre AccessoryRail dispone di un controllo di prossimità.

**Cosa farei:** fermare l'avanzamento durante l'interazione e quando il contenuto è fuori schermo; valutare il cambio manuale per testi che richiedono lettura. Preservare le transizioni dello showroom, che hanno uno scopo chiaro.

Il file `public/hero-video.mp4` misura 15.718.037 byte, circa 15,7 MB. È la dimensione del file, non una misura del trasferimento iniziale effettivo. Verificherei preload, varianti responsive e decoder attivi prima di cambiare qualità. La resa del filmato deve rimanere buona. Non sono stati misurati FPS, Core Web Vitals o prestazioni su iPhone/iPad fisico.

### 9. Contatti, contenuti e pagine informative

Il modulo conversazionale funziona nei passaggi provati. Il modello arriva precompilato dal catalogo, il nome mancante produce un errore leggibile e l'anteprima WhatsApp include il modello corretto. Nessun messaggio è stato inviato e nessuna ricezione dal servizio esterno è stata verificata.

**Cosa farei:** mantenere questo flusso, alleggerire le introduzioni ripetute e rendere evidente il contatto rapido. Su tablet eviterei che il layout sembri soltanto una colonna mobile ingrandita.

La Privacy pubblica contiene ancora «Dati da confermare con il cliente» e descrive il vecchio flusso generale Formspree, mentre ora WhatsApp/email e richiamata seguono percorsi diversi. La Cookie Policy usa formule rivolte a chi sviluppa il sito, come «Nel codice attuale del progetto». Completerei e allineerei questi testi al comportamento reale prima di considerarli definitivi.

In Servizi esistono inoltre elementi `main` annidati nelle varianti della hero: una pulizia della struttura semantica deve accompagnare la correzione responsive.

## Copertura effettiva

| Area | Verifica eseguita |
| --- | --- |
| Home desktop | Hero, reveal, showroom e cambi di modello; collage; accessori, officina, contatti e footer |
| Gamma | Card e apertura dettagli; ricerca; zero risultati; filtri combinati; selezione e confronto desktop/mobile; conservazione dei modelli al cambio ricerca |
| Collegamenti showroom | Arrivo diretto ad Agility S 125 e posizione nel gruppo corretto nella versione pubblica |
| Schede modello | Template KYMCO DTX 360 350 e Voge Valico 900DSX, gallery, consigli, alternative e CTA |
| Servizi | Hero desktop/mobile/tablet, selezione servizio, apertura con mouse/tastiera, tab delle fasi e CTA |
| Contatti | Pagina generica, ingresso da modello, richiesta officina, scelta canale, validazione nome e anteprima WhatsApp |
| Informative | Privacy e Cookie Policy pubbliche, contenuto e impaginazione mobile |
| Dimensioni | Desktop 1280, 1440 e 1920 px; telefono 375 e 390 px; tablet verticale 768 e 820 px; controlli delle dimensioni orizzontali 1024 e 1180 px |

Non è stato rilevato overflow orizzontale globale nei campioni misurati; il difetto del titolo Servizi è un overflow interno coperto dalla foto. Le immagini della gallery campione si caricano durante lo scorrimento: i riquadri ancora vuoti nelle prime catture non sono stati classificati come immagini mancanti.

Questi controlli sono stati eseguiti nel browser integrato Chromium e mediante lettura del codice. Non equivalgono a un test su Safari o dispositivo touch fisico. Il codice sceglie comportamenti diversi anche in base al puntatore, quindi ridimensionare una finestra con mouse non riproduce ogni comportamento di un iPad orizzontale. Non sono state visitate manualmente tutte le 27 schede: sono stati verificati due esempi del template comune e la build completa.

## Applicazione delle skill

Scrollcraft è stato applicato alla sequenza, al momento centrale, al costo dello scorrimento, alla composizione per dispositivo e alla conservazione dell'identità con movimento ridotto. Taste è stato applicato a gerarchia, tipografia, margini, immagini, densità, ripetizioni e stati dei controlli.

Il lint statico Taste è stato eseguito sui 63 file di `src`: segnala 138 FAIL e 35 WARN, prevalentemente ombre, gradienti, divisori e numerazioni. Sono regole stilistiche, non 138 difetti funzionali. Alcuni riscontri riguardano controlli e componenti che non appaiono in ogni pagina. La valutazione è stata fatta sulle schermate reali rispettando il vincolo di conservare lo showroom. L'inspector visuale automatico della skill non è stato eseguito; le verifiche visuali sono state condotte con il browser integrato. Non viene dichiarato uno stato «zero FAIL».

Critica secondo la traccia Taste, prima di qualsiasi redesign:

```text
ROUND 1
Seen in one second: la moto nello showroom; sul telefono l'apertura è soprattutto un filmato su Roma.
Idea (one sentence): entrare nello showroom Grossi Moto e scegliere il mezzo per i propri tragitti.
Live thing: cambio dei modelli, catalogo filtrabile e confronto esplicito.
Layout words by section: hero=video / showroom=product-stage / invito=statement / collage=zoom / accessori=tabs / officina=split / contatti=split.
Scores: design 7.5 · usability 6 · creativity 7 · content 7 → arithmetic 6.9; Taste cap 6.5.
Caps applied: titoli su più di due righe e collisione del titolo tablet. Valutazione editoriale soggettiva, non un punteggio tecnico di performance.
Top three problems:
1. Servizi iPad: titolo coperto dalla foto. Correggere composizione e misura del titolo.
2. Mobile: accesso iniziale alla gamma e prodotto nel primo schermo. Conservare il motion con azioni immediate.
3. Home dopo lo showroom: argomenti ripetuti e molti grandi momenti. Compattare e aggiungere prove specifiche della sede e dell'officina.
```

## Ordine operativo consigliato

1. Riallineare con cautela la copia locale al commit remoto, preservando le modifiche presenti. Correggere i due errori di lint e i difetti di titolo tablet, click del carosello e ricerca numerica.
2. Curare hero e scheda prodotto mobile, etichette delle azioni, confronto e versione a movimento ridotto.
3. Rifinire il ritmo della Home e le pagine secondarie con il linguaggio dello showroom; integrare foto reali e completare i testi informativi.
4. Verificare il risultato su iPhone/iPad Safari e dispositivi con touch e mouse, oltre a ripetere lint, build e controlli browser pertinenti alle modifiche.

Nessuno degli interventi proposti richiede di sostituire il concept dello showroom o migrare lo stack.
