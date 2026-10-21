# Project Memory

## Ripristino showroom e hero Servizi — 2026-10-21

- Su richiesta esplicita dell'utente, ripristinata la hero Servizi precedente: foto, tacca desktop, titolo, composizione mobile e layout tablet dedicato. Recuperati componente e CSS dalla copia `comparison-showroom-2026-10-21/production`, con alt corretto che identifica l'immagine come illustrativa. Ripristinato anche il posizionamento desktop del suo header. Il CSS ha poi ricevuto la correzione del menu centrale descritta sotto. Questa decisione sostituisce la hero descritta nel blocco Home/Officina/Contatti sotto.
- L'utente intende per showroom le grandi card arrotondate che scorrono a tutto schermo. `ManualShowcase` non viene più montato. Con movimento ridotto si riusano le card originali in scorrimento naturale, con tutti i sei modelli e colori, senza pinning o morph. Corretto il ramo statico di `ShowcaseFrame`, che ignorava l'indice e mostrava sempre il primo mezzo. Showroom animato ordinario e stack conservati; nessuna impostazione Windows modificata.
- Restano valide le altre rifiniture del blocco precedente, inclusi Accessori senza pulsante né autoplay, fasi manuali, collage, Contatti e modulo precompilato. Nessun nuovo asset o dipendenza.
- Lint e build webpack finali passati, TypeScript e 38 pagine. Browser in-app a 375×812, 820×1180 e 1440×900: hero ripristinata, card grandi, sei immagini/modelli desktop, focus, nessun overflow o errore console. La preferenza reale del browser di prova è `reduce`; il ramo animato ordinario è conservato nel codice e non certificato da questa prova. CTA mobile della hero verificata fino al modulo con argomento officina, senza invii.
- Riscontri in `qa-screenshots/restored-showroom-services-2026-10-21/`; dettagli e limiti in apertura di `docs/HOME_OFFICINA_CONTATTI_2026-10-21.md`. Prova su browser desktop ridimensionato, non dispositivi fisici/Safari; nessun nuovo audit generale, commit, push o deploy.
- Contorni di logo/moto nei precedenti screenshot: erano i ring `focus-visible` lasciati dal test da tastiera, già presenti nel codice originale. Con puntatore/a riposo entrambi hanno bordo zero e nessuna ombra/ring; indicatori da tastiera conservati. Le immagini desktop di consegna sono state sostituite con catture a riposo. Riscontri in `services-restore-confirmation-2026-10-21/`.
- Chiarimento finale dell'utente: la foto dietro «Chiama ora» va bene; il difetto era la foto dietro il menu centrale, vicino a «Contatti». Corretto il fondo bianco della navigazione a partire da 1280px: pseudo-elemento nella stessa griglia, esteso sulle colonne logo/menu con bordo inferiore destro curvo. La superficie segue la larghezza effettiva del menu; foto e ritaglio SVG originali conservati, azione telefonica ancora sulla foto. Nessun JS o nuova dipendenza. Lint/build finali passati (TypeScript, 38 pagine); browser a 375/820/1440 e al primo desktop 1280px, focus visibile da tastiera, zero overflow o errori console. Mobile/tablet invariati. Screenshot e report in `services-central-nav-2026-10-21/`; preferenza browser `reduce`, nessuna prova fisica/Safari o audit generale.
- Chiusura superiore destra della foto: aggiunto il margine superiore mancante alla sola cornice desktop (`p-2`, prima solo lati/fondo). Misurati 8px su tutti e quattro i lati a 1280 e 1440px; curva SVG destra visibile e foto contenuta nella cornice. Menu sul bianco e telefono sulla foto conservati. Lint/build ripetuti e passati, nessun overflow o errore console nei due casi. Evidenze in `services-closed-corner-2026-10-21/`; mobile/tablet non modificati.
- Uniformati successivamente i quattro angoli esterni desktop a 56px, come showroom e grandi cornici: il vecchio SVG usava raggi percentuali piccoli e deformabili. `roundedHeroClip` genera archi circolari sulle misure reali della cornice; un `ResizeObserver` su cornice/menu/nav aggiorna il ritaglio e si disconnette allo smontaggio. Raccordo doppio vicino al menu circolare e continuo (raggio limitato a metà della sua altezza), fondo della nav con curva da 56px. Menu sul bianco, foto dietro il telefono e margini 8px conservati. Verificato il passaggio desktop → 375 → 820 → 1280 → 1440: tutti e quattro i raggi esterni misurano 56px a entrambe le larghezze desktop, zero overflow o errori console. Lint/build finali passati (38 pagine). Riscontri in `services-consistent-corners-2026-10-21/`; preferenza browser `reduce`, senza nuova prova fisica/Safari o audit generale.

## Home, Officina e Contatti — ritmo e lettura manuale 2026-10-21

- Sequenza Home: showroom → scelta dal vivo → collage/consegna → accessori → officina → contatto. Titoli secondari ridotti, meno introduzioni ripetute e riquadri; mantenuti marchio, palette, dati, modelli/colori/showroom e hero Home. Il collage rende i sette slot approvati: il checkout ne montava nove; file conservati, due slot aggiuntivi non montati. Zoom/scales conservati, tratto più breve e due contenuti finali su consegna/tagliando.
- Richiesta successiva dell'utente: rimosso il pulsante Accessori. Soluzione finale interamente manuale, senza Pausa/Riprendi né CTA telefonica ripetuta. Anche selettore servizi desktop e fasi del servizio manuali; niente cambi durante la lettura. Tastiera e un solo pannello accessibile, altri `inert`/`aria-hidden`; griglia che riserva il testo più lungo e immagini Accessori intere.
- Hero Officina rivista su richiesta esplicita: unico H1 visibile, testo e foto separati, richiesta assistenza/telefono/indicazioni immediati, composizione affiancata da tablet e header nel flusso. Eliminati tacca, overlay, pannellini numerati e tre varianti duplicate. Stessi controlli di navigazione e correzioni input `ServiceSwipe`; nessuna modifica alla loro logica.
- `journey.module.css` allinea margini, scala e CTA di Home/Officina/Contatti. Tablet: pannelli e foto affiancati, modulo con colonna dedicata. Contatti conserva nome attività, recapiti, indirizzo/orari e modulo conversazionale con modello/argomento officina precompilati; eliminati canali in riquadri e chiusura ripetuta, indicazioni presenti anche in apertura.
- Nessuna fotografia autentica verificabile della sede/personale trovata negli asset pertinenti. Hero con dettaglio tecnico esistente, esplicitamente illustrativo, senza attribuzione al titolare. Alt dei servizi corretti; elenco delle quattro foto da richiedere nel documento dedicato. Nessun nuovo asset o dipendenza.
- Lint e build finale passati (webpack isolato, TypeScript, 38 pagine); 9 test del form passati e nuova regressione browser per i pannelli manuali. Home, Servizi, Contatti a 375/820/1440px: lettura reale prolungata, focus/tastiera, ritorno nella sezione, visibilità documento simulata, movimento ridotto, CTA, modello precompilato e invii intercettati. Errore/ripresa Formspree simulati; nessun invio reale. Nessun overflow o errore JavaScript nei casi finali; 80 hash sorgente uguali alla copia verificata.
- Evidenze, decisioni, foto richieste e limiti in `docs/HOME_OFFICINA_CONTATTI_2026-10-21.md` e `qa-screenshots/journey-2026-10-21/`. QA Chrome emulata, non dispositivi fisici/Safari o audit generale. Nessun commit/push/deploy; modifiche locali precedenti conservate. Documentazione del blocco aggiornata insieme a fine lavoro.

## Confronto e showroom con movimento ridotto — 2026-10-21

- Confronto 2–3 mezzi sempre esplicito: testata mobile compatta, toolbar filtri compatta nascosta durante la tabella, immagini più contenute e classe di gamma conservata nell'intestazione. Prima le righe tecniche con differenze verificate; un dato mancante non è una differenza o una dotazione assente. Consigli editoriali in un gruppo distinto, con un solo controllo pratico per modello.
- Ricerca circoscritta a People S 125i ABS Euro 5, Agility S 125 Euro 5 e Downtown 350i GT Euro 5+: sella, massa in ordine di marcia, frenata e sottosella, con versione/PDF/data in `catalog-comparison-specs.ts`. Le altre 24 schede mantengono i nuovi campi «Non verificato». Nessuna inferenza tra omologazioni né nuova promessa su prezzo/disponibilità; riferimenti completi nel documento dedicato.
- Solo con movimento ridotto viene montato `ManualShowcase`: mezzo grande, superfici originali, sei scelte manuali, Precedente/Successivo, nome annunciato e collegamento al catalogo. Altezza stabile, foto integre e focus leggibile; nessun pinning, timer, intercettazione dello scroll o morph. Showroom desktop animato, stack mobile e composizione tablet normali conservati. Etichetta del link singolo allineata a «Scopri il modello» su desktop e card mobile; nessuna preselezione per il confronto.
- Lint e build finali superati (38 pagine, copia isolata); 17 test pertinenti, inclusi 3 nuovi test sulla logica delle righe. Sei scenari Chrome a 375/820/1440 px normale/ridotta superati: due/tre mezzi, filtri e zero risultati con selezione conservata, aggiunta/rimozione/reset/focus, link showroom e cambio live preferenza. Controlli finali mirati su immagini, focus, altezze e intestazioni dopo le correzioni; 79 hash sorgente uguali alla copia verificata.
- Windows invariato. Prove emulatore, non Safari/dispositivi fisici. Nessun commit/push/deploy. Modifiche locali precedenti e relativi esiti validi conservati. Fonti, limiti, decisioni Taste/Scrollcraft ed evidenze in `docs/COMPARISON_REDUCED_SHOWROOM_2026-10-21.md` e `qa-screenshots/comparison-showroom-2026-10-21/`.

## Home — offerta e gamma dal primo schermo 2026-10-21

- Conservata la regia approvata: stesso master video e fotografie, zoom completo, settle e nuovo gesto prima dell'ingresso nello showroom, reveal desktop e navigazione inferiore dopo l'uscita dalla hero.
- Mobile: unico titolo accessibile per la variante renderizzata, «Roma, ogni giorno.» in due span dello stesso H1, con Grossi Moto nel nome accessibile; descrizione immediata «Moto, scooter e officina a Roma.». Il titolo desktop resta invariato e le due varianti non sono esposte contemporaneamente.
- Una sola CTA `Scopri la gamma` verso `/scooters`, presente dal primo render fino al finale dello zoom. Filmato libero al centro, titolo e descrizione in alto, azione in basso dentro la regione `svh`; compensata la differenza `lvh - svh`. Nessun nuovo asset o dato, nessuna ricodifica: hash Git del master invariato.
- Cleanup di zoom/uscita al click CTA, cambio preferenza, cambio breakpoint e smontaggio; sul reveal desktop le continuazioni async vengono invalidate quando interrotte. Durate/easing e comportamento ordinario preservati.
- Corretti gli errori preesistenti del collage con movimento ridotto: media query SSR-safe e componente animato separato, così il fallback non inizializza `useScroll` su un elemento assente. HeroRevealStage/ScooterShowcase rispondono anche al cambio live della preferenza, senza cambiare le impostazioni Windows.
- QA produzione isolata Chrome a 375×812, 390×844, 768×1024 e 1440×900, normale/ridotta: 8 scenari passati; ulteriori controlli su preferenza durante zoom/reveal, navigazione mentre si anima, video non disponibile e CTA senza JavaScript passati. Video, primo schermo, tastiera, scorrimento completo al footer, ritorno e gating nav controllati. Lint/build integrati passati. Dettagli, limiti dell'ispettore globale e prove in `docs/HOME_OPENING_2026-10-21.md`; screenshot/script in `qa-screenshots/hero-opening-2026-10-20/`. Verifiche emulatore, non dispositivi fisici.

## Modelli — foto nel primo viewport 2026-10-21

- Template comune `/scooters/[slug]`: sotto 1024px ordine nome → foto completa → dati/descrizione → azioni. Cornice stabile con `object-contain`, foto principale prioritaria e `sizes` responsive. Desktop conserva testo a sinistra e foto a destra.
- Primaria `Chiedi informazioni` al contatto con `modello=<id>`; `Chiama` secondaria testuale. Ritorno compatto al catalogo con `?focus=<id>`, breadcrumb esteso solo desktop ma dati strutturati sempre presenti. Nomi completi senza ellissi; nessun nuovo dato commerciale.
- Galleria server-side: prima foto lazy, altre dentro un `details` nativo, lazy e raggiungibili anche senza JavaScript. Descrizioni, specifiche, consigli, alternative, 27 route, metadata, canonical, ProductModel e BreadcrumbList conservati. Meta usa la Categoria già presente nelle specifiche, evitando ripetizioni come 50cc·50cc.
- Matrice browser e misure in `docs/MODEL_OPENING_2026-10-20.md`; riscontri in `qa-screenshots/model-opening-final/`. Valico 900DSX a 390×844: cornice foto circa 217–482px, primaria fino a 662px e barra inferiore da 772px.
- Conferma sul codice finale: 17 scenari e 27 route superati (`qa-screenshots/model-opening-final-confirmation/results.json`), inclusi hit test primaria e H1 dopo navigazione. Controllo aggiuntivo Xciting VS 400 con due foto e dicitura singolare superato. Lint/build finali passati.

## Gamma — scheda compact essenziale 2026-10-21

- Espansione in-place conservata, con modello, superficie, foto completa e anteprime laterali. Scheda aperta compatta: marca/nome, immagine, cilindrata/uso, primaria `Scopri il modello` e contatto precompilato secondario. Descrizione estesa e specifiche complete restano nella pagina modello; eliminati i duplicati interni della card compatta.
- Confronto invariato: ingresso esplicito della toolbar e toggle solo in selezione; nessuna selezione automatica aprendo dettagli o pagina completa. Griglia e dettagli desktop preservati.
- Apertura compact mantiene focus sul comando Chiudi senza scroll forzato; Escape chiude e ripristina il focus. Cambiando modello con tastiera il focus passa al rail prima che la card uscente diventi inerte. Copie decorative compatte e non interattive, sizing/ResizeObserver/loop/orientamento conservati.
- La soppressione del click dopo swipe lascia passare l'Invio da tastiera. QA finale: sei scenari superati a 375/390/768/820 px, movimento ridotto a 390 px e desktop a 1440 px; verificati orientamento, deep link, confronto esplicito e accessibilità dei link sopra la barra inferiore. Lint/build finali passati.
- Verifiche, misure e limiti in `docs/CATALOG_CARD_COMPACT_2026-10-20.md`; script e screenshot in `qa-screenshots/catalog-card-compact-2026-10-21/`. Tutto verificato su copia di produzione isolata per evitare interferenze delle ricostruzioni `.next` contemporanee; procedura nel runbook locale.

## Gamma — confronto con selezione esplicita 2026-10-01

- Il confronto segue tre fasi nel reducer: consultazione, selezione, tabella. Un solo ingresso `Confronta modelli` nella barra filtri (ripreso dalla toolbar mobile fuori schermo); durante la normale consultazione le card non mostrano comandi di confronto. In selezione, ciascuna card mostra in alto un toggle `Seleziona` / `Selezionato`, senza aperture o contatori ripetuti sotto la scheda.
- Riepilogo centrale con nomi, rimozione, `Svuota` e CTA `Confronta (n)` abilitata da due modelli. Altezza riservata per mantenere stabili le card durante la selezione; nomi scorrono orizzontalmente sui telefoni, con svuotamento sempre visibile. Toolbar compatta mantiene accessibili conteggio e apertura durante la selezione, senza aggiungere navigazione inferiore.
- Nessuna apertura automatica: la tabella richiede un'azione esplicita e 2–3 modelli. Chiudere torna alla selezione; `Esci` conserva gli ID e permette di riprendere. Ricerca, filtri combinati e zero risultati preservano la selezione. Svuotare o scendere sotto due modelli chiude la tabella mantenendo la modalità di selezione.
- Tabella semantica con nomi, immagini, rimozione dentro ciascuna colonna, aggiunta del terzo modello e link a dettaglio/contatto. Su mobile la colonna descrittiva rimane fissa durante lo scorrimento orizzontale. Apertura focalizza il titolo; chiusura, rimozione, svuotamento e uscita dalla toolbar resa inerte ripristinano un controllo usabile. Copie del carosello conservano ingombro coerente, `inert`, `aria-hidden` e assenza di handler interattivi.
- Verifica Chrome sulla build di produzione a 320, 375, 768, 1024 e 1440px, più reduced motion a 375 e 1440px: nessun overflow globale o errore JavaScript; controllati stabilità di scroll/focus, ingresso/uscita/ripresa, filtri, stato vuoto, aggiunta/rimozione 2–3, scorrimento della tabella e deep link modello. Riscontri in `qa-screenshots/comparison-mode-verification-2026-10-01.json` (ignorati da Git). Revisione statica dedicata completata. Nessun test su dispositivo fisico.
- Build completata (TypeScript e 38 pagine), 14 test confronto/guida superati, lint dei file modificati e diff check passati. Lint generale ancora bloccato dai due errori preesistenti `set-state-in-effect` in `AccessoryRail.tsx` e `zoom-parallax.tsx`. Nessuna dipendenza, nuova animazione, dato o route modificata; intervento separato dalle modifiche locali precedenti a `MobileAppNav.tsx`.
- Pubblicato su `origin/master` nel commit `dba95f1e946e71d838386ffcb90de42e742db244`, dopo allineamento con il remoto (nessun aggiornamento ulteriore). Vercel conferma `Deployment has completed`; verifica pubblica a 375 e 1440px riuscita per ingresso esplicito, assenza dei vecchi comandi sotto le card, confronto di due modelli e conservazione della selezione, senza overflow o errori JavaScript. Riscontri in `qa-screenshots/comparison-public-verification-2026-10-01.json`. Modifiche locali precedenti alla navigazione mobile preservate.

## Gamma — modelli nel primo viewport 2026-10-01

- Intervento limitato all'accesso alla gamma `/scooters`: titolo compatto, informazioni su numero modelli/marchi/cilindrate in una riga, eliminati i tre riquadri statistici e l'introduzione estesa. Preservati identità visiva, 27 modelli, schede, caroselli per cilindrata, dati, route e metadata.
- `CatalogUseCases.tsx` è ora un fieldset compatto: riga di utilizzi su desktop, scelta e descrizione nel pannello Filtri esistente su mobile/tablet. Ricerca e pulsante Filtri condividono una riga mobile; chip, conteggi, combinazioni e reset continuano a includere l'utilizzo.
- Il confronto non occupa spazio all'apertura della pagina. Dopo la prima selezione compare un comando con conteggio nella barra filtri e nella toolbar compatta; le card offrono un'apertura con icona e numero per mantenere stabile il loro ingombro. Il pannello inline viene aperto esplicitamente e permette aggiunta, rimozione e confronto di 2–3 modelli; la selezione sopravvive ai filtri. Nessuna nuova barra inferiore o animazione.
- Apertura del confronto: focus sul titolo. Chiusura: ritorno al comando invocante se ancora visibile e attivo; svuotamento o rimozione dell'ultimo modello: fallback alla ricerca quando il comando scompare. La selezione da card mantiene focus e scroll. Toolbar verificata anche a 320px con due filtri attivi e due modelli selezionati.
- Misurazioni Chrome: primo prodotto a 375px da 1.364px a 432px; a 1440px da 965px a 418px. Verifica reale sulla build di produzione a 320, 375, 768, 1024 e 1440px, più reduced motion a 375 e 1440px: nessun overflow globale o errore JavaScript; controllati tastiera, focus, confronto 2–3, conservazione selezione, filtri combinati, stato vuoto, reset e deep link `?focus=agility-s-125`. Riscontri locali in `qa-screenshots/gamma-discovery-verification-2026-10-01.json` (directory ignorata da Git); non sostituiscono un test su dispositivo fisico.
- Build produzione completata (TypeScript e 38 pagine), 9 test guida/confronto superati, lint dei quattro componenti modificati e diff check passati. Lint generale ancora bloccato dai due errori preesistenti `set-state-in-effect` in `AccessoryRail.tsx` e `zoom-parallax.tsx`. Nessuna modifica alle dipendenze, nessun deploy.
- Pubblicazione successiva del 2026-10-01: commit Gamma `29b36cb`, pull con merge `0a4661a`, poi push su `origin/master` richiesto per vedere le modifiche sul sito pubblico. Vercel conferma `Deployment has completed` per `0a4661a0c781074484deb2a34950320a5239f245`; verificata `https://grossi-moto.vercel.app/scooters` in Chrome a 375 e 1440px (nuova introduzione, modelli nel primo viewport, confronto 2 modelli, nessun overflow o errore JavaScript). Riscontri locali in `qa-screenshots/gamma-public-verification-2026-10-01.json`. La CI GitHub #344 si ferma al lint, mentre il deploy Vercel risulta riuscito. Le modifiche precedenti alla navigazione mobile rimangono locali, separate e preservate.

## Home mobile — barra inferiore dopo la hero 2026-09-30

- `MobileAppNav.tsx` mantiene nascosta e inerte la navigazione inferiore finché la hero Home non è interamente sopra il viewport, compreso lo zoom completo con CTA `Scopri la gamma`. Tornando alla hero la barra si nasconde nuovamente.
- Sostituito il gating via IntersectionObserver con misurazione del bordo inferiore delle varianti hero effettivamente renderizzate, ignorando quelle `display:none`. Aggiornamenti accorpati in requestAnimationFrame su scroll, resize, pageshow e ResizeObserver; stato aggiornato solo quando cambia. Preservati comportamento secondo direzione di scroll, altre route, stile e reduced motion.
- Build produzione completata (TypeScript e 38 pagine), lint del componente e diff check passati. Lint generale ancora bloccato dai due errori preesistenti `set-state-in-effect` in `AccessoryRail.tsx` e `zoom-parallax.tsx`. Nessuna QA visuale/browser richiesta o eseguita, nessun deploy.

## Identità visiva — logo Grossi Moto 2026-09-24

- Integrato il logo fornito dall'utente come brand mark nelle navigazioni Home, Gamma, Servizi, Contatti e nel footer.
- Asset ottimizzato in `public/grossimoto/brand/grossi-moto-logo.webp` e componente condiviso `src/components/layout/BrandLogo.tsx`; sui fondi scuri il logo usa una superficie bianca per mantenere leggibile il wordmark nero.
- Preservati menu, CTA, telefono, routing, motion, responsive, copy, SEO e dati.

## Navigazione — cleanup transizioni pagina 2026-09-24

- Il mantenimento temporaneo della pagina uscente per la morph showroom → Gamma è ora limitato alla Home (`pathname === "/"`). La pagina `/scooters` appena montata e tutte le altre route usano cleanup immediato, quindi cambi pagina rapidi e back/forward non possono ereditare la finestra di sovrapposizione da 420ms.
- Preservati `LayoutGroup`, shared `layoutId` dell'immagine scooter, query `focus`, reset su `popstate`/`pageshow`, reduced motion e durata della morph Home → Gamma. Nessuna modifica a layout, card, dati, SEO o animazioni interne.


## Gamma: scelta per utilizzo, confronto e consigli modello — 2026-09-24

- `/scooters` aggiunge tre percorsi editoriali (Città ogni giorno, Casa e lavoro, Gite e viaggi), combinabili con ricerca, tipo, marca e cilindrata. Conteggi, indicatore filtri, chip di rimozione, pannello mobile e azzeramento tengono conto dell'utilizzo; le schede non più visibili vengono richiuse.
- Confronto inline di 2–3 modelli, selezionabili dalle card o dal menu con tutta la gamma. La selezione rimane durante ricerca e filtri, ma è locale alla pagina (nessuna persistenza tra navigazioni). Tabella semantica con cilindrata, impostazione, uso, motivi di scelta e aspetti da valutare; link a scheda e contatto con modello preselezionato. Limite, rimozione, azzeramento e annunci accessibili gestiti dal reducer; nessun overlay o nuovo motion.
- Nuovo `src/data/catalog-guidance.ts`: 27 profili espliciti, classificazione d'uso, motivo di scelta, compromesso da valutare, verifica in sede e due alternative motivate per modello, anche tra marchi. Sono interpretazioni editoriali del dataset esistente, non nuove misurazioni o dichiarazioni su patente, omologazione, stock o prezzo. Aggiornare la guida quando cambiano i dati modello.
- `/scooters/[slug]` mostra consigli e alternative nel contenuto server-side; preservati gallery, metadata, ProductModel, BreadcrumbList, parametri statici e CTA precompilate. Il passeggero è un'esigenza da valutare fisicamente in sede, non un filtro non supportato dai dati.
- Card desktop espansa con spazio dedicato al confronto; copie dello stack mobile restano inerti e mantengono lo stesso ingombro. La cattura mouse del rail esclude pulsanti/link per non intercettarne i click; swipe e protezione dai click dopo trascinamento conservati.
- Verifiche: build produzione completata, 22 test superati (confronto, guida, contatti e swipe), lint mirato superato; tutti i 27 HTML statici includono consigli, alternative, JSON-LD e link modello precompilato. Lint generale segnala due errori esterni a questo intervento (`set-state-in-effect` nei fallback IntersectionObserver di `AccessoryRail.tsx` e `zoom-parallax.tsx`). Build eseguita con accesso rete per il font Google Instrument Sans. Nessuna QA visuale/browser o pubblicazione eseguita.


## Home — performance/motion gating 2026-09-24

- `src/components/ui/zoom-parallax.tsx`: le animazioni idle infinite e i listener/interazioni della Zoom Parallax vengono attivati solo quando la sezione si trova entro circa un viewport dalla finestra, tramite `IntersectionObserver`. Quando è lontana le immagini restano ferme e non vengono eseguite misurazioni globali di scroll della sezione; entrando nell'area di pre-attivazione, step, lock, easing, durate e comportamento visibile restano invariati.
- `src/components/sections/AccessoryRail.tsx`: l'auto-advance da 6 secondi viene sospeso quando il rail è lontano dal viewport e riparte nella fascia di pre-attivazione. Navigazione manuale, tastiera, reduced motion, immagini, CTA e stile non sono stati modificati.
- Nessuna dipendenza, dato, asset, SEO, copy o comportamento responsive è stato modificato. L'obiettivo è ridurre lavoro JavaScript/animazioni fuori schermo, soprattutto sulla Home lunga e su dispositivi mobili.

## Pagine modello SEO /scooters/[slug] — audit copy e gallery 2026-09-21

- Le 27 pagine modello restano generate staticamente da `catalogScooters` con `generateStaticParams()` e `dynamicParams = false`; `/scooters?focus=<id>` resta il deep link alla quick preview e non viene rediretto.
- Metadata modello resi più naturali e coerenti con l'intento locale: title breve `<brand> <modello> a Roma`, description specifica con profilo/uso del modello e CTA prudente a prezzo/disponibilità; robots esplicito `index, follow`.
- Structured data mantiene `ProductModel` + `BreadcrumbList` senza inventare prezzi, `InStock`, rating o recensioni di prodotto.
- Aggiunta gallery server-side usando solo asset già presenti: Voge legge il manifest `index.json` del modello e preferisce `gallery` con fallback limitato a `spin360`; KYMCO usa `public/kymco-all/manifest.json`, filtrando per `modelSlug` e immagini gallery, con fallback colori.
- Related products ordinati per pertinenza: stessa famiglia, poi stessa fascia filtro/cilindrata, sempre all'interno dello stesso brand; massimo quattro.
- Le card catalogo aperte mantengono quick preview, CTA telefono/contatto e ora aggiungono `Scopri tutti i dettagli` verso `/scooters/<id>`.
- `src/app/sitemap.ts` non è stato modificato perché includeva già automaticamente tutte le route modello dal dataset.


## Hero Home mobile — handoff zoom/showroom 2026-09-19

- Le scritte finali dell'overlay mobile (`Roma · Scooter · Moto · Officina` e `Grossi Moto`) sono state alzate di 3rem senza spostare la CTA `Scopri la gamma`.
- `scroll-expansion-hero.tsx` ora separa esplicitamente la fine dello zoom dall'uscita verso lo showroom: il gesto che porta il progresso a 1 viene consumato e non può più avviare nello stesso frame/gesture la transizione alla sezione successiva.
- A zoom completo viene applicato un breve settle di 280ms. Su touch serve un nuovo gesto iniziato a hero già espansa; su wheel l'uscita è accettata solo dopo il settle. La transizione verso lo showroom conserva easing premium `[0.22,1,0.36,1]` ma non scende più sotto 0.58s, evitando il salto percepito sui gesti veloci.
- Modifica limitata alla hero mobile; il reveal desktop di `HeroRevealStage` non è stato toccato.
- Verifica statica del codice completata sul master. Lint/build locale non eseguibili in questo runtime perché il container non riesce a risolvere `github.com`; usare CI/Vercel come verifica build quando disponibile.


## Home — Officina desktop compattata 2026-09-18

- `src/components/sections/WorkshopSection.tsx`: corretto il titolo desktop “Il tuo mezzo, seguito nel tempo.” aumentando l'interlinea solo da `lg`, così la virgola non invade più la riga successiva.
- Ridotto l'ingombro verticale desktop con padding esterno più contenuto, titolo e descrizione leggermente più piccoli, spazi tra blocchi/CTA ridotti e colonna destra più compatta. Struttura, copy, CTA, icone e decorazione restano invariati.
- Mobile e tablet non sono stati modificati: tutti i nuovi aggiustamenti sono applicati tramite classi `lg:`.

## Home — focus ZoomParallax desktop stabilizzato 2026-09-18

- `src/components/ui/zoom-parallax.tsx`: reso più robusto l'aggancio iniziale desktop della sezione. Durante l'animazione di focus il target viene ricalcolato dalla posizione reale del contenitore, così eventuali piccoli shift di layout non lasciano il viewport fuori asse.
- A fine aggancio il lock resta attivo per due `requestAnimationFrame` consecutivi e corregge solo scostamenti superiori a 0,75 px prima di riabilitare lo scroll a step. Gli input wheel restano quindi bloccati anche durante l'assestamento, evitando scatti dovuti a inerzia residua.
- Mobile/tablet, progressi degli step, durata/easing dello zoom, copy, immagini, CTA e reduced-motion non sono stati modificati.

## Servizi — redesign white / black / red 2026-09-17

- `/servizi` è stata ricostruita come esperienza coerente con Home/Gamma: canvas bianco, Hero nera fotografica arrotondata, showcase servizi bianco, Process nero, CTA finale `#C72A09`, Footer nero. Rimossi lo stacco fotografico standalone e le superfici beige/cream/brown dalla pagina.
- `services-hero.tsx` non usa più GSAP ScrollTrigger, pin/scrub o seconda service board. Resta una sola entrata Framer Motion con opacity/scale/translate controllati, easing `[0.22, 1, 0.36, 1]`, nessun blur/bounce e reduced motion immediato. `ServiceOverview` non è più importato dalla Hero ma il file è stato preservato perché non era autorizzata la cancellazione.
- `StickyScrollShowcase` mantiene su desktop il concetto utile foto sticky + contenuto editoriale, ma elimina `liquid-glass`, numeri 01–06 decorativi, giant numbers, beige, shadow pesanti e blur. Lo stato attivo viene sincronizzato con `IntersectionObserver`; cambio foto a 220ms con opacity + scale 1.015→1. Palette strutturale limitata a bianco, `#0A0A0A` e `#C72A09`.
- Sotto 1024px `ServiceSwipe` è ora un rail orizzontale nativo derivato dal pattern Accessori: 84% telefono, 46% tablet, prossimo elemento visibile, scroll snap, `ResizeObserver`, frecce, Home/End, tastiera e reduced-motion. Eliminati stack smartphone, paging verticale, scroll annidato e dipendenza della pagina Servizi da `SwipeUpCardStack`; `image-stack.tsx` resta intatto per gli altri utilizzi.
- `ServiceProcess` conserva la sequenza semantica Contatto → Diagnosi → Intervento → Riconsegna e usa qui soltanto la numerazione 01–04. Pannello nero, stato/progresso rosso, tab keyboard-accessible, immagini/copy esistenti, transizione di stato opacity-only 200ms, nessun autoplay o segmented SaaS container.
- Navigazione Servizi allineata alla grammatica Gamma/Home senza glassmorphism: brand a sinistra, pill desktop nera con stato Servizi esplicito, CTA telefono; su compact resta il chrome globale mobile. CTA finali e numero `+393289185029` invariati. Metadata/SEO, dati prodotto, asset, Home, Gamma, `globals.css`, dipendenze e `package.json` non modificati.
- Diff dal commit base `2fcf58d4a86012698e87e4135d51df5623562d54`: solo `src/app/servizi/page.tsx`, `services-hero.tsx`, `StickyScrollShowcase.tsx`, `ServiceSwipe.tsx`, `ServiceProcess.tsx` più questa memoria. La CI GitHub completa è bloccata da un errore ESLint fuori scope già presente in `src/components/sections/ScooterShowcase.tsx` (`@next/next/no-html-link-for-pages` su link `/scooters/`); typecheck/build vengono quindi saltati da quel workflow. Il deploy Vercel viene usato come ulteriore verifica build; QA visuale browser/dispositivo non è disponibile in questa esecuzione e va ancora verificata alle larghezze richieste.

## Servizi — swipe verticale mobile/tablet 2026-09-16

- `StickyScrollShowcase` usa ora `ServiceSwipe` sotto 1024px: sei servizi in un pannello verticale con scroll nativo, snap-start e snap-always. Foto e testo salgono insieme; titolo introduttivo ridimensionato. Desktop conserva il layout precedente.
- Pannello alto min(760px,78svh), minimo 420px; schede con min-height anziché altezza bloccata per consentire lettura di contenuti lunghi. Scroll chaining nativo agli estremi, nessun listener touch/wheel che blocca la pagina. `data-lenis-prevent` isola lo scroll interno da Lenis.
- Contatore sincronizzato con scroll/resize, frecce da 48px e tastiera (frecce, PageUp/PageDown, Home/End). Comandi tastiera istantanei; reduced motion elimina snap e smooth, con ascolto dei cambi di preferenza. CTA esterna al pannello e nota immagini illustrative.
- Lint, build produzione e diff check completati. Swipe su dispositivo fisico e QA visuale della nuova sequenza non eseguiti; nessun deploy.

## Accessori Home — prompt 03 implementato 2026-09-16

- Sostituita la sezione numerata con `AccessoriesSection.tsx`, rail client `AccessoryRail.tsx` e dataset `src/data/accessories.ts`. Export e ordine Home conservati; nessuna nuova route/catalogo. Quattro WebP del manifest, alt prudenti, nota «Immagini illustrative», CTA `tel:+393289185029`.
- Rail nativo con snap iniziale: scheda 86% mobile, 44% tablet, 38% desktop, gap 16px. Coda interna tramite pseudo-elemento, senza falsa scheda: anche l'ultima si allinea all'inizio. Categoria attiva più vicina al bordo iniziale, con banda di 2px contro oscillazioni; sincronizzazione su scroll e ResizeObserver. Categorie con aria-current, contatore, frecce da 48px che mantengono focus anche agli estremi.
- Tastiera e reduced motion usano scroll istantaneo; la preferenza viene riletta a ogni comando e il listener interrompe smooth in corso. Nessun drag custom, intercettazione wheel, autoplay o animazione sulle foto. Protezione click dopo movimento >10px/pointercancel. Immagini lazy con dimensioni e ratio 4:5 riservati; testo senza altezza fissa; solo freccia link traslata 3px/160ms in hover.
- QA locale in-app a 375, 820, 1440px: foto caricate, nessun overflow globale, due schede più anticipo tablet; ultimo allineamento entro 0,3px. Altezza sezione mobile circa 1239px nel browser Windows con scrollbar. Verificati categorie, frecce, Enter/Tab, focus sui link, contatore, resize e scroll nativo orizzontale/verticale; frecce con scrollY invariato. Nessuna chiamata telefonica eseguita.
- Build production e lint dei tre file riusciti. Lint generale bloccato da tre errori require negli script preesistenti `qa-screenshots/prompt02-qa.cjs` e `prompt02-text-only.cjs`, lasciati intatti. QA parziale: browser senza emulazione touch/reduced-motion; swipe fisico, click dopo swipe, cambio live preferenza e zoom elevato non certificati. Shortcut zoom non ha modificato il viewport. Conservare questi controlli per QA integrata; nessun deploy o prompt successivo eseguito.

## Asset mobile/tablet — prompt 01 completato 2026-09-15

- Creato `docs/prompts/mobile-tablet/ASSET-MANIFEST.md`: sette utilizzi pronti per Accessori e Officina, URL, soggetti osservati, provenienza, dimensioni, crop, object-position e alt prudenti. Voce 01 di `STATO.md` completata; nessun altro prompt avviato.
- Quattro nuove immagini illustrative imagegen in `public/grossimoto/accessori/` (casco/guanti, bauletto, bloccadisco, supporto smartphone); in `public/grossimoto/servizi/` aggiunti montaggio accessori illustrativo e due WebP di dettaglio ricavati dagli originali tagliandi/diagnosi, conservati senza modifiche.
- Le immagini esistenti hanno origine ignota: non attribuire foto, persone o attrezzature alla sede. Per l'integrazione futura mantenere nota visibile «Immagini illustrative» e alt del manifest; nessuna prova di disponibilità, compatibilità o certificazione del prodotto.
- Master generati, prompt esatti, report con SHA-256 e tavole di verifica conservati in `docs/prompts/mobile-tablet/asset-sources/`, fuori da `public`. Tutti i sette WebP visti a 300 px; alternative 4:3 approvate solo per bauletto e bloccadisco. Peso complessivo 351 632 byte (343,4 KiB), decodifica e ratio verificati con Sharp già disponibile.
- Passaggio solo asset/documentazione: nessuna UI o codice modificato, nessun browser, lint/build o deploy eseguito.

## Prompt mobile/tablet compattati 2026-09-16

- Su richiesta dell'utente, il pacchetto in `docs/prompts/mobile-tablet/` e stato ridotto da 12 a 7 prompt operativi: 01 asset, 02 hero tablet, 03 accessori, 04 officina, 05 responsive+servizi, 06 showroom+catalogo+contatti, 07 QA finale.
- L'utente ha indicato che i primi tre prompt sono gia stati eseguiti; `STATO.md` li marca come completati/da riverificare nel QA finale anche se i dettagli tecnici di 02 e 03 non sono stati registrati in questa chat.
- I vecchi prompt 05-12 separati sono stati rimossi dall'indice operativo e sostituiti con `05-RESPONSIVE-E-SERVIZI.md`, `06-SHOWROOM-CATALOGO-CONTATTI.md` e `07-VERIFICA-FINALE.md`.

## Pacchetto prompt mobile/tablet 2026-09-15

- Preparati prompt di implementazione separati in `docs/prompts/mobile-tablet/`, con indice `README.md`, contesto comune `CONTESTO.md` e registro `STATO.md`.
- Il pacchetto copre asset, fix hero tablet, Accessori e Officina Home, policy input/navigazione, lifecycle hero Servizi, selettore Servizi, processo, showroom, catalogo, contatti e QA integrata; dal 2026-09-16 alcune fasi sono raggruppate per ridurre il numero di prompt.
- Questa fase ha prodotto soltanto documentazione e prompt: nessun redesign eseguito o deploy. Lo stato di ciascuna futura implementazione va registrato in `STATO.md`.

## Audit live mobile e tablet 2026-09-15

- Eseguito audit richiesto dall'utente su `grossi-moto.vercel.app` con browser responsive a 375, 768, 820 e 1024px; dettaglio in `docs/AUDIT_MOBILE_TABLET_2026-09-15.md`.
- Difetto da correggere: a 1024x768 la card Home `27 modelli` copre parte della CTA `Confronta la gamma`.
- Proposte, non implementate: Accessori fotografici sfogliabili, selettore dei sei Servizi, sequenza interattiva `Dal contatto alla riconsegna`, Officina con foto e scelte per esigenza. Nessuna modifica al sito/deploy durante l'audit.
- Stato corrente confermato da codice e live: sotto 1024px Home usa showroom statico (rail sotto 768px, griglia a due colonne da 768px) e ZoomParallax diventa un'immagine statica. Le indicazioni storiche seguenti sullo zoom attivo mobile/tablet sono superate.
- Navigazione mobile, filtro 125cc e apertura schede catalogo verificati; nessun overflow orizzontale nelle combinazioni misurate. Lint e build locali completati. Verifica in browser responsive, senza dispositivi fisici o invio del form.

Ultimo aggiornamento operativo: 2026-07-30.

## Stato Corrente

Il progetto Grossi Moto KYMCO contiene una home Next.js App Router funzionante con:

- Hero video premium;
- transizione Hero -> showcase trigger-based;
- showcase scooter pinned a step;
- catalogo `/scooters` collegato alla home;
- CTA `ShowcaseCoverCta`;
- sezione `GrossimotoExperienceSection` con componente obbligatorio `ZoomParallax`;
- sezione `AccessoriesSection`;
- sezione `WorkshopSection` in Home;
- blocco contatto breve e footer minimale.

Implementato il 2026-06-05:

- `src/app/layout.tsx`;
- `src/app/page.tsx`;
- `src/app/globals.css`;
- `src/components/hero/Hero.tsx`;
- `src/components/hero/Navbar.tsx`;
- `src/components/hero/HeroBadge.tsx`;
- `src/components/hero/BottomLeftCard.tsx`;
- `src/components/hero/BottomRightCorner.tsx`;
- `src/components/hero/motion.ts`;
- configurazione minima: `.gitignore`, `eslint.config.mjs`, `postcss.config.mjs`, `tsconfig.json`, `next-env.d.ts`.

Implementato il 2026-06-06:

- `src/components/sections/HeroRevealStage.tsx`;
- `src/components/sections/ScooterShowcase.tsx`;
- `src/components/sections/ShowcaseCoverCta.tsx`;
- `src/data/showcase-scooters.ts`;
- `src/app/scooters/page.tsx`;
- `src/components/catalog/CatalogPage.tsx`;
- `src/components/catalog/CatalogFilterBar.tsx`;
- `src/components/catalog/CatalogNavbar.tsx`;
- `src/components/catalog/CatalogFeaturedCard.tsx`;
- `src/components/catalog/CatalogProductCard.tsx`;
- `src/components/catalog/CatalogGrid.tsx`;
- `src/components/transitions/PageTransitionProvider.tsx`;
- `src/components/transitions/TransitionLink.tsx`;
- `src/data/catalog-scooters.ts`.
- `src/data/scooter-color-system.ts`.

La home compone:

```tsx
<HeroRevealStage />
<ShowcaseCoverCta />
<GrossimotoExperienceSection />
<AccessoriesSection />
<WorkshopSection />
<ContactBriefSection />
<SiteFooter />
```

Il layout globale ora monta anche:

```tsx
<PageTransitionProvider>{children}</PageTransitionProvider>
```

La Hero usa il video locale richiesto:

```text
public/video hero/videoplayback.mp4
```

Nel markup il source e:

```text
/video%20hero/videoplayback.mp4
```

Non implementati:

- form contatto;
- backend/API.
- pagina `/officina`, da non creare.

Route attuali:

- `/`;
- `/scooters`;
- `/servizi`;
- `/contatti` placeholder premium minimo.

La navbar e il footer linkano solo Home, Gamma, Servizi e Contatti. Il link Officina e stato rimosso: l'officina viene raccontata nella Home tramite `WorkshopSection`, senza route dedicata.

Server production e screenshot QA possono esistere localmente da sessioni precedenti. Prima di assumere che un server sia vivo, verificare sempre la porta con `docs/LOCAL_RUNBOOK.md`.

## Stato UI Reale

### Hero

- La Hero e una card video arrotondata su sfondo chiaro `--page-background`.
- Il target di motion non deve essere il background chiaro esterno: la parte che deve animare e la card interna con video, contenuto e faux-cutout in basso a destra.
- `BottomRightCorner` deve restare scuro come CTA interna, ma senza alone/ombra esterna indesiderata.
- `HeroRevealStage` usa Framer Motion in modalita imperative con `useAnimationControls()` e trigger via `wheel`/touch.
- L'apertura della Hero verso lo showroom e stata semplificata il 2026-06-09: la card interna anima solo `clip-path` e un leggero `y`, senza opacity fade, scale, rotateX o box-shadow animata.
- Durate correnti Hero: reveal `0.86s`, reverse `0.76s`, easing `[0.22, 1, 0.36, 1]`, nessun bounce.
- Delay/handoff verso showcase: rimosso. Non esiste piu un `showcaseHandoffInputDelay` post-animazione; durante la transizione basta `isHeroAnimatingRef` con prevent scroll temporaneo, poi il primo scroll dello showcase puo rispondere subito.
- Al mount, prima del paint browser quando possibile, al `requestAnimationFrame` successivo, su resize e su `pageshow`, `HeroRevealStage` sincronizza lo stato visuale della card con `window.scrollY`: in alto card aperta, nello showroom card chiusa.
- Fix stabilita motion del 2026-06-15: `HeroRevealStage` traccia intenti recenti wheel/touch forward e reverse per 260ms. Se lo scroll nativo supera di pochi frame il boundary Hero/showroom, il sync non fa piu un `set()` immediato della card ma avvia la reveal/restore motion coerente. Su `pageshow` vengono azzerati lock e touch refs prima del sync forzato; a fine reveal/restore il target scroll viene ricalcolato per assorbire resize o ripristini browser.
- Reduced motion: niente scroll lock invasivo, Hero e showcase resi in modo statico/minimo.

### Showcase

- `ScooterShowcase` e implementata come pinned step showcase, non come scrub continuo.
- Cambio modello gestito da stato (`activeIndex`) e da un solo lock locale `isAnimatingRef`, senza input lock esterno da Hero.
- Durata cambio step scooter: `0.62s`, easing `[0.22, 1, 0.36, 1]`, niente bounce. Il copy/statistiche usa `AnimatePresence mode="sync"` e timing breve per evitare pause percepite.
- Fix copy/spec del 2026-06-15: il blocco statement/statistiche usa `AnimatePresence mode="popLayout"` con entrata/uscita solo opacity + blur (`0.24s`, stessa curva premium), senza translate, scale o spring. L'uscita viene tolta dal normale flow per evitare il doppio contenuto temporaneo che poteva causare bounce o posizione iniziale sbagliata.
- Lo showroom ora usa 6 modelli: People S 125 ABS, Agility S 125, Downtown 350 GT, Agility 350, X-Town 250ST, AK575 Premium.
- Il primo modello deve usare lo stesso background della Hero esterna, cioe `var(--page-background)`.
- I cambi cromatici di background iniziano dal secondo modello.
- I background showroom sono centralizzati in `src/data/scooter-color-system.ts` come toni semantici. La sequenza corrente e intenzionale: `heroWarmIvory`, `mineralBlueGrey`, `dryChampagne`, `mutedSage`, `lightClay`, `paleStone`, cosi ogni slide resta distinta dalla precedente e dalla successiva senza uscire dalla palette premium.
- Le immagini showroom possono usare sia PNG trasparenti da `public/foto sezione show/` sia asset ufficiali KYMCO da `public/kymco-all/models/` quando il modello richiesto non ha un PNG showroom dedicato.
- Ogni modello ha metriche visuali dedicate nel dataset: toni, shadow, offset immagine.
- Le statistiche visibili nello showcase non usano piu etichette electric-only: sono state sostituite con specifiche catalogo neutre.

### Pagina `/servizi`

- La route `/servizi` usa `src/components/ui/services-hero.tsx` come hero client component con GSAP ScrollTrigger.
- Il media hero corrente e `/kymco-all/sections/ak575-premium-dsc3316-b-scaled-dsc3316-b-scaled.jpg`, usato come dettaglio tecnico scuro per raccontare assistenza/officina.
- Fix hero servizi del 2026-06-24: il finale dello scroll non usa piu sei label libere sovrapposte all'headline. La hero separa due stati: intro testuale (`Assistenza. Officina. Esperienza.`) che esce con opacity/translate/blur, poi service board finale con sei moduli numerati.
- Ritocco UI hero servizi del 2026-06-24: quando entra la service board, la parte sinistra non resta piu vuota; compare un claim tipografico grande (`Tutto / in sede`) animato con line reveal e blur/translate leggero, mentre la tabella resta sulla destra.
- La service board e decorativa (`aria-hidden`) per evitare heading duplicati: la sezione servizi sottostante mantiene la gerarchia accessibile e il contenuto esteso.
- Motion hero servizi: ScrollTrigger pinned con `end: +=120%`, `scrub: 0.45`, immagine con zoom leggero `scale: 1.12`, overlay finale `opacity: 0.72`, senza lasciare headline e sei servizi visibili nello stesso momento. I wrapper delle righe headline usano padding verticale compensato da margine negativo per evitare il taglio ottico della display font durante la reveal.
- Reduced motion hero servizi: non viene creato ScrollTrigger; resta la composizione statica iniziale e la board finale resta nascosta, evitando sovrapposizioni.
- Dopo la hero, `/servizi` usa `StickyScrollShowcase`: su desktop la foto rimane sticky a sinistra e il copy scrolla a destra con titoli e statement oversized per riempire lo spazio, senza card grid strette; su mobile torna a layout stacked con immagine sopra e copy grande sotto.
- Fix sticky servizi del 2026-06-24: il pannello immagine non deve essere direttamente lo sticky grid item, perche la CSS Grid puo stirarlo all'altezza della colonna destra e neutralizzare `position: sticky`. Usare un wrapper di colonna e un figlio `sticky top-0 h-[100svh]`.
- Direzione UI aggiornata 2026-06-24: usare trattamento premium brutalist/editorial dove serve a evitare sezioni generiche o troppo vuote. Applicato a `StickyScrollShowcase`, `AccessoriesSection` e `WorkshopSection` con titoli oversized, numeri fantasma, hairline rules e layout piu sparsi. Non applicarlo indiscriminatamente a Hero, showcase scooter o ZoomParallax, che hanno gia una regia specifica.
- Redesign servizi 2026-06-26: la hero `/servizi` mantiene il comportamento a due stati con GSAP ScrollTrigger. Prima mostra l'intro `Assistenza. Officina. Esperienza.`, poi allo scroll entra la board finale `Tutto / in / sede.` con navigatore 2x3 verso `#service-01`...`#service-06`.
- Materiale servizi 2026-06-26: `.liquid-glass` e utility globale per le card vetrose. Nella pagina servizi e usato su navigator hero, foto sticky, rail numerico 01-06, chip numerici e box descrizione. I pannelli liquid e la pagina servizi devono restare quasi interamente su neutri crema/ink: non usare verde, e usare il rosso solo come accento tipografico strettamente necessario. Stato corrente: unico rosso intenzionale su `sede.` nella seconda fase hero.
- Sticky servizi 2026-07-30: non usare piu caption o pannelli di copy dentro la foto sticky. Il contenuto del servizio deve restare nella colonna editoriale, per evitare duplicazioni e tagli del pannello interno.
- Fix leggibilita sticky servizi 2026-06-26: nella colonna destra i titoli lunghi devono usare scala massima contenuta e `overflow-wrap` per non uscire dal viewport. Il blocco statement + card liquid descrittiva deve restare stacked fino a viewport molto larghi (`2xl`) per evitare che la card copra o comprima il testo.
- Fix card immagine sticky servizi 2026-07-30: rimosso il `figcaption` sovrapposto dentro le foto desktop, che duplicava il contenuto del servizio e risultava tagliato in alto. Il titolo `Finanziamenti` usa ora una larghezza libera nei viewport desktop ampi per restare su una sola riga senza forzare overflow su laptop stretti.
- Asset servizi 2026-07-30: le nuove foto operative sono state copiate da `public/da usare/` a URL puliti sotto `public/grossimoto/`. La hero servizi usa `public/grossimoto/servizi-hero/agility-s-125-consulenza.jpg`, lo stacco immagine usa `public/grossimoto/servizi-hero/agility-s-125-showroom.jpg`, e `StickyScrollShowcase` usa i sei asset verticali in `public/grossimoto/servizi/`. Non usare per ora i due asset sciolti di garanzia presenti in `public/da usare/`.

### Catalogo `/scooters`

- Pagina prodotto/catalogo implementata come continuazione naturale della home, non come sito separato.
- `CatalogPage` e una client page con pannello catalogo unico, navbar integrata in alto, headline `Tutta la gamma`, metriche `Modelli / Marchi / Cilindrata` e filtro segmentato `Tutti / 50cc / 125cc / 150-250cc / 300cc+`.
- La pagina e un catalogo grid, non una detail page: non esiste piu un featured slot permanente a sinistra.
- `CatalogGrid` usa una sola CSS grid responsive, con ordine naturale left-to-right e top-to-bottom.
- Desktop: grid 12 colonne con 4 colonne compatte (`lg:col-span-3`); card aperta `lg:col-span-6`, quindi resta dentro il catalogo con card compatte ai lati quando lo spazio lo consente.
- Tablet/mobile: layout 2 colonne o 1 colonna; da tablet la card aperta occupa 2 colonne, su mobile resta a colonna singola, sempre senza promozione a hero separata.
- `CatalogGrid` applica un packing responsive a slot quando una card e aperta: la card larga viene clampata all'ultimo slot valido della riga corrente, occupa due righe compatte da tablet in su, e la prima fila sotto viene riordinata per portare negli spazi liberi solo le card fuori dall'impronta della card aperta.
- `CatalogProductCard` gestisce espansione in-place tramite `expandedId: string | null`.
- `CatalogProductCard` mostra un badge brand per distinguere `KYMCO` e `Voge`; i modelli KYMCO storici senza campo `brand` usano fallback `KYMCO`, mentre i Voge hanno `brand: "Voge"` nel dataset.
- I background delle card catalogo sono centralizzati in `src/data/scooter-color-system.ts` con toni semantici (`warmIvory`, `softSand`, `paleStone`, `dustyBlush`, `mutedSage`, `mineralBlueGrey`, `dryChampagne`, `lightClay`).
- `CatalogGrid` assegna i background compatti con `getCatalogCardToneAssignments()` dopo il packing responsive, usando il tono base del modello piu una protezione deterministica contro duplicati o toni quasi identici su vicini immediati, stessa riga e stessa colonna visibile.
- La card espansa continua a usare il proprio `featureSurface`; la variazione adjacency-safe si applica alle card compatte attorno.
- Click su una card compatta apre quella card nella sua posizione; se un'altra era aperta, viene chiusa automaticamente.
- La card aperta ha un pulsante `Minimize2` per chiuderla; il click sulla card gia aperta non la chiude accidentalmente.
- Dataset tipizzato in `src/data/catalog-scooters.ts` con 27 schede catalogo visibili: 17 KYMCO e 10 Voge.
- Rimossi dal catalogo pubblico KYMCO: Agility 125 R16 Power Up, DINK 125 Flat, DINK R 125 Tunnel, DINK 150 Flat, DINK R 150 Tunnel e KRV 200.
- KRV 200 non e piu nel catalogo pubblico ne nella showcase home.
- I modelli showroom KYMCO visibili nel catalogo riusano i PNG trasparenti di `public/foto sezione show/`; gli altri KYMCO usano asset ufficiali da `public/kymco-all/models/`.
- I modelli KYMCO Sport visibili nel catalogo sono `AK575 Premium` e `Xciting VS 400`, entrambi filtrati in `300cc+`, con famiglia `Sport` e immagini colore da `public/kymco-all/models/ak575-premium/...` e `public/kymco-all/models/xciting-vs-400/...`.
- I 10 Voge usano asset da `public/voge/models/valico/...` e `public/voge/models/sfida/...`, preferendo i PNG prodotto in `main/` indicati dai manifest `index.json`; gallery e 360 non sono usati nelle card catalogo.
- Il focus iniziale puo arrivare da query string `?focus=<id>` e apre quella card in-place.
- Se non c'e `focus`, `expandedId` parte da `null`: tutte le card iniziano compresse.
- Il link `Gamma` della navbar catalogo punta a `/scooters` senza `focus`, quindi non persiste il vecchio stato espanso.
- Se un filtro rimuove la card espansa, `expandedId` viene azzerato.
- La parte superiore di `/scooters` segue una composizione simile a un catalogo premium: brand a sinistra, nav pill centrale su desktop, CTA telefono a destra, headline ampia, metriche in linea e filtri integrati sopra la griglia, non come barra sticky pesante.
- Motion catalogo: niente spring percepito o bounce sulla grid; layout transition con curva `cubic-bezier(0.22,1,0.36,1)`, durata controllata intorno a `0.32s`, e card prodotto con Framer `layout="position"` applicato solo al wrapper esterno della card. La grid usa righe logiche stabili e `row-span` solo sulla card aperta per evitare che una singola riga alta generi vuoti sotto le compatte.
- Non usare `layout=true` sulla card prodotto aperta: quando coincide con cambio `row-span`/dimensioni CSS Grid puo produrre un piccolo scatto verticale o una percezione di stretch. La dimensione della card aperta resta gestita da CSS; Framer anima solo la posizione.
- Per evitare stretch/deformazione quando le card compatte si riposizionano, la grid non deve usare `items-stretch` su tutti gli item e le card compatte non devono avere `h-full`: le compatte restano `self-start`, mentre solo la card aperta usa `self-stretch`/`h-full` per riempire la sua impronta a due righe.
- Motion filtri: evitare `AnimatePresence` sulla lista prodotti durante i cambi `50cc / 125cc / 150-250cc / 300cc+`; niente stagger o enter/exit sulle card prodotto, e reflow leggero solo quando serve chiudere una card filtrata.
- Non usare `grid-auto-flow: dense`: puo creare riordino visuale confuso durante l'espansione.
- Fix micro-deformazione card catalogo del 2026-06-06: la causa reale era l'accoppiamento tra il nodo visuale `motion.article` e il grid item che cambiava `col-span`/`row-span`, `h-full`/`min-h`, struttura `grid`/`flex`, contenuti `AnimatePresence` compact/expanded e immagine con `h-full w-full`/`max-h`/hover scale nello stesso commit. Framer misurava il layout mentre il contenuto interno cambiava e poteva produrre una scale-correction percepita come stretch/rimbalzo.
- Strategia corretta per la griglia `/scooters`: `CatalogProductCard` deve tenere un wrapper esterno `motion.div` che anima solo la posizione e porta gli span della CSS Grid; l'`article` interno e statico e gestisce surface, shadow e contenuti. Il contenuto compatto non usa motion ne `AnimatePresence`; solo il dettaglio espanso ha un enter breve opacity/translate/filter. L'immagine usa dimensioni intrinseche stabili, altezza compatta fissa e nessun `transition-transform`/`group-hover:scale` durante expand/collapse. Il contenitore `CatalogGrid` resta un `div` normale, non un nodo motion.
- Ritocco timing del 2026-06-06: il wrapper esterno usa una durata layout uniforme per card aperta e card compatte, cosi il cambio posto non risulta piu affrettato o disallineato; il dettaglio espanso entra leggermente piu lento ma resta secondario.

### Transizione Home -> Catalogo

- Esiste un `PageTransitionProvider` persistente nel layout con `LayoutGroup` e `AnimatePresence mode="sync"`.
- Causa blank risolta il 2026-06-09: `AnimatePresence mode="wait"` piu fade pagina su wrapper keyato per `pathname` poteva lasciare una finestra vuota tra exit e enter, soprattutto con stato morph ancora vivo al ritorno Home.
- Il provider non usa piu un fade pagina come animazione principale: `initial={false}`, `exit` resta a `opacity: 1`, e le pagine sono sovrapposte nella stessa cella grid per evitare stacking verticale durante la presenza simultanea.
- `TransitionLink` salva lo scooter attivo e naviga verso `/scooters?focus=<id>`.
- Il provider ripulisce lo stato showroom quando si arriva a `/scooters` dopo `420ms`, quando si lascia `/scooters`, e su `popstate`/`pageshow` per browser back/forward.
- Stato attuale: la continuita funzionale Home -> Catalogo passa da query `focus`, che apre la card corrispondente in-place.
- Regola layoutId/morph: il layout morph e opt-in e vale solo se `source === "showroom"` e `activeScooterId` corrisponde allo scooter cliccato.
- Non assegnare `layoutId` alla sezione pinned intera o a `ShowcaseFrame`: il source consentito e solo l'immagine attiva dello showroom (`scooter-image-<id>`), e il target e solo l'immagine della card catalogo espansa corrispondente.
- `CatalogFeaturedCard` e codice legacy/non usato nella composizione attuale; i suoi `layoutId` sono opt-in tramite `enableSharedLayout`.
- La vecchia idea di morph verso featured card separata non e piu il modello corretto per `/scooters`.
- Non reintrodurre una featured card promossa a sinistra per supportare la transizione: il requisito UX corrente e catalog grid con espansione in-place.

## Fix Motion E Ritorno Home 2026-06-09

- Blank al ritorno Home: trattato nel provider eliminando fade a zero, `mode="wait"` e stato showroom persistente oltre la transizione reale.
- Hero -> Showcase: trattato riducendo il reveal a una sola progressione percepita, con card che si chiude dal basso verso l'alto tramite `clip-path`.
- Pausa di circa mezzo secondo: rimossa eliminando `showcaseHandoffInputDelay = 520`; valore finale post-handoff: `0ms`.
- Browser back/forward: provider e Hero ascoltano rispettivamente `popstate`/`pageshow` e `pageshow` per ripulire stato morph e sincronizzare stato visuale con lo scroll restaurato.

## Asset KYMCO

La libreria immagini KYMCO usata nel checkout corrente e in `public/kymco-all/` con sezioni editoriali in `public/kymco-all/sections/` e modelli in `public/kymco-all/models/`.

Nota storica: `public/kymco-new/` era indicata da documentazione precedente, ma non e presente nel checkout corrente. Per media editoriali e `ZoomParallax`, usare asset locali coerenti da `public/kymco-all/sections/`.

Aggiornamento 2026-06-15:

- `scripts/scrape-kymco-assets.mjs` rigenera `public/kymco-all/manifest.json`;
- lo scraper processa le categorie ufficiali `Scooter` e `Sport`;
- fonti:
  - `https://kymco.it/prodotti_categorie/scooter/`;
  - `https://kymco.it/prodotti_categorie/sport/`;
- manifest corrente: 23 modelli KYMCO totali, 500 immagini uniche;
- categoria Scooter: 21 modelli, 449 immagini;
- categoria Sport: 2 modelli, 51 immagini;
- modelli Sport scaricati: `AK575 Premium`, `Xciting VS 400`;
- ogni immagine nel manifest ha `category`, `modelName`, `modelSlug`, `colorName`, `colorSlug`, `imageType`, sorgenti, dimensioni, peso e hash;
- struttura modello: `public/kymco-all/models/<model-slug>/<color-slug-o-color-unknown>/...`.

Workbench asset KYMCO creato il 2026-06-15:

- `public/kymco-workbench/catalog-products-originals/` contiene 17 copie delle immagini KYMCO usate nelle card catalogo/prodotti, con `asset-map.json`;
- `public/kymco-workbench/home-showroom-originals/` contiene 6 copie delle immagini usate nello showroom home, con `asset-map.json`;
- `public/kymco-workbench/README.md` descrive lo scopo delle cartelle;
- le 17 immagini `catalog-products-originals/*_no_bg.png` sono ora collegate al catalogo prodotti tramite `src/data/catalog-scooters.ts`;
- `src/data/showcase-scooters.ts` usa path showroom espliciti per non ereditare automaticamente le immagini catalogo prodotti;
- le 6 immagini PNG trasparenti in `home-showroom-originals/` sono ora collegate allo showroom home tramite `src/data/showcase-scooters.ts` e tracciate in `asset-map.json`.

`ZoomParallax` e implementato in `src/components/ui/zoom-parallax.tsx`:

- pattern zoom-parallax stile demo con `h-[480vh]`, sticky `100svh`, massimo 7 immagini e scale progressive `[4,5,6,5,6,8,9]`;
- Asset home scroll 2026-07-30: i sette media default di `ZoomParallax` puntano a `public/grossimoto/home-scroll/`, copiati dalla sottocartella `public/da usare/home (scroll con 7 foto e quella centrale si ingrandisce)/`;
- la prima immagine parte come tile centrale `25vh / 25vw`, scala fino a coprire tutta la sticky section e resta sopra le altre immagini;
- il progress dello zoom e separato dal progress totale: lo zoom mantiene una durata percepita simile pur completando circa al 43% della sezione; il copy entra tra 48% e 58% e resta full-screen per una fase finale molto piu lunga. Un velo ink progressivo e una lieve text-shadow accompagnano il copy, cosi resta leggibile anche sugli asset fotografici chiari;
- il copy `Dallo showroom all'officina / La scelta continua dopo la consegna.` non sta piu sopra la sezione prima della gallery: compare come overlay solo dopo che la prima foto ha gia raggiunto il full-screen;
- `GrossimotoExperienceSection` non deve avere `overflow-hidden`: il clipping va tenuto dentro il viewport sticky di `ZoomParallax`, altrimenti la sticky puo essere tagliata o comportarsi come se la sezione sparisse;
- fallback statico solo con `prefers-reduced-motion`, con prima immagine full-screen e testo subito visibile; su mobile/tablet il percorso zoom resta attivo con altezza responsive per mantenere l'effetto senza una sezione eccessiva;
- rispetto di `prefers-reduced-motion`.

Nota critica:

- le immagini gia presenti in `public/kymco/` non sono adatte come media principali del nuovo sito;
- mantenerle solo come archivio storico o riferimento.

## Asset Voge

Implementato il 2026-06-15:

- nuova libreria immagini Voge in `public/voge/`, separata dagli asset KYMCO;
- scraper riproducibile in `scripts/scrape-voge-assets.mjs`;
- manifest generale in `public/voge/manifest.json`;
- manifest per modello in `public/voge/models/<famiglia>/<modello>/index.json`.

Struttura asset Voge:

```text
public/voge/models/sfida/voge-sfida-.../
public/voge/models/valico/voge-valico-.../
```

Ogni modello e organizzato in:

- `colors/<color-slug>/` per immagini colore con nome colore ufficiale quando presente;
- `main/` per hero e immagine prodotto principale;
- `spin-360/` per sequenze a 360 gradi;
- `gallery/` per foto dettaglio/editoriali.

Modelli scaricati da Voge Italy:

- Valico 800DSX Rally;
- Valico 625DSX;
- Valico 900DSX;
- Sfida SR1;
- Sfida SR1 ADV;
- Sfida SR2 ADV;
- Sfida SR16 125;
- Sfida SR16 200;
- Sfida SR3;
- Sfida SR4 MAX.

La libreria contiene 270 immagini Voge tracciate nel manifest. Tutti i file e le directory modello usano prefisso `voge-` per evitare ambiguita con `public/kymco-all/`. Lo scraper ripulisce solo le cartelle generate dei dieci modelli Voge richiesti prima di rigenerarle.

Integrazione catalogo implementata il 2026-06-15:

- `src/data/catalog-scooters.ts` contiene i 10 modelli Voge con `brand: "Voge"`, copy dedicato e alt text Voge;
- le card catalogo usano immagini prodotto da `main/` quando disponibili, evitando `gallery/` e `spin-360/`;
- Valico 800DSX Rally, Valico 625DSX e Valico 900DSX sono filtrati in `300cc+`;
- Sfida SR1, SR1 ADV e SR16 125 sono filtrati in `125cc`;
- Sfida SR2 ADV e SR16 200 sono filtrati in `150-250cc`;
- Sfida SR3 e SR4 MAX sono filtrati in `300cc+`.

## Architettura Base Sito Grossimoto

### Stack E Direzione Visuale

- Framework: React / Next.js App Router.
- Styling: Tailwind CSS.
- Motion: Framer Motion obbligatorio per Hero reveal e showcase pinned.
- Stile: premium, organico ma professionale, senza AI-slop visuale.
- Palette: dark/charcoal/beige tecnico con toni opachi e accenti molto controllati.

### Home Page: Esperienza In 3 Fasi

Fase 1: Hero Video Theatre + reveal.

- Wrapper full viewport con padding esterno e theatre interno arrotondato.
- Navbar minimale con logo/testo Grossimoto a sinistra, menu desktop e CTA telefono.
- Background cinematico dark con video locale in loop.
- Badge matte: `Rivenditore ufficiale KYMCO a Roma`.
- Headline: `Trova lo scooter giusto per Roma`.
- CTA: `Vedi la gamma` e `Prenota una consulenza`.
- Bottom-left panel con `27` modelli in gamma.
- Bottom-right faux-cutout showroom/officina.
- Reveal: trigger-based, non scrubbed.
- Intento corretto del reveal: la card Hero si chiude verticalmente dal basso verso l'alto e lascia emergere la showcase sottostante senza linea di distacco netta.

Fase 2: Showcase Scooter Di Punta.

- Sei modelli nel pinned scroll: People S 125 ABS, Agility S 125, Downtown 350 GT, Agility 350, X-Town 250ST, AK575 Premium.
- Scroll a step: un piccolo scroll avvia una transizione completa verso il modello successivo o precedente.
- Nessuno scrub continuo di immagini o copy.
- Rail laterale, watermark, specifiche e CTA tematizzati dal modello attivo.
- Background uguale alla Hero sul primo modello, poi variazioni cromatiche premium sui modelli successivi.

Fase 3: CTA Tutti Gli Scooter E Footer.

- `ShowcaseCoverCta` in flusso normale pagina.
- Chiude la sequenza home senza creare una route catalogo separata.

### Pagina Catalogo `/scooters`

Implementata.

- Route: `src/app/scooters/page.tsx`.
- La pagina e ora catalogo multi-brand KYMCO + Voge; la home e la showcase restano editorialmente KYMCO.
- La pagina legge `searchParams.focus` e inizializza `expandedId` con quel modello se valido.
- Se `focus` manca o non corrisponde a un id del catalogo, `expandedId` parte da `null`.
- Il comportamento corretto e espansione in-place della card, non promozione a una featured card separata.
- La route non sostituisce la home: e una continuazione della showroom experience.

## Aggiornamento Copy E SEO 2026-07-30

- Eseguita una revisione editoriale delle route `/`, `/scooters`, `/servizi` e `/contatti`, includendo hero, navbar, showcase, catalogo, accessori, officina, contatti, footer, CTA, microcopy, alt text e aria-label.
- Il posizionamento ora presenta Grossi Moto come punto vendita e centro assistenza scooter a Roma, mantiene il riferimento ufficiale KYMCO in Home e Contatti e introduce Voge in modo naturale nella Home, nel catalogo e nei servizi pertinenti.
- Aggiornati title e meta description con il Metadata API template globale `%s | Grossimoto`, senza aggiungere canonical o URL non verificati.
- Rimossi o ammorbiditi claim non documentati nella pagina Servizi, tra cui servizi ufficiali Voge, tecnici certificati, ricambi originali e garanzia preservata.
- Non sono stati modificati layout, motion, routing, asset, dati di contatto, chiavi dei dataset o comportamento delle card.

## Aggiornamento Marketing E CRO 2026-07-30

- Aggiunto `.agents/product-marketing.md` come contesto condiviso v1 per posizionamento, pubblico, obiezioni, proof point da validare e conversioni.
- Rafforzato il percorso marketing discovery -> confronto -> contatto: Hero con CTA `Confronta la gamma` e `Parla con un consulente`, card catalogo con `Apri la scheda` e maggiore evidenza del catalogo multi-brand KYMCO + Voge.
- Ridotta la frizione del form contatti con argomenti più vicini alle intenzioni reali (`Scelta di uno scooter`, `Disponibilità e acquisto`), placeholder orientato a modello/uso/lavoro e CTA `Invia la richiesta`.
- Non sono stati introdotti sconti, urgenze, recensioni, numeri di performance o promesse di risposta non verificati; non sono stati modificati campi, endpoint o comportamento del form.

## Responsive Tablet E Mobile 2026-07-30

- Hero mobile/tablet: copy, titolo e CTA hanno larghezze vincolate per evitare testo tagliato; il pannello modelli diventa compatto sotto `sm`, cosi non copre la maggior parte dell'hero, mentre il link mappa resta compatto su viewport molto piccoli e torna completo da `sm`.
- Navigazione: Home, Gamma, Servizi e Contatti sono nuovamente disponibili in una barra compatta sotto `lg`, sia nell'hero della Home sia nella navbar del catalogo; il menu desktop resta invariato.
- Showcase home: sotto `lg` il blocco laterale mostra solo il modello attivo invece dell'elenco completo dei sei modelli, gia rappresentato dalla rail orizzontale; le larghezze delle slide sono ridotte su `sm`/`md` per evitare che le immagini prodotto escano dal viewport o vengano tagliate.
- Pagina servizi: i titoli dei singoli servizi ora possono andare a capo su mobile/tablet, evitando che `Officina per scooter` e `Ricambi e accessori` escano dal viewport.
- ZoomParallax: il percorso zoom resta attivo anche su mobile/tablet, con sezione piu corta sui viewport compatti; il fallback statico viene usato solo con `prefers-reduced-motion`, cosi l'effetto non sparisce senza motivo.
- Contatti e CTA: orari in griglia responsiva per evitare righe compresse su telefoni stretti; le CTA principali della chiusura showcase diventano full-width su mobile e tornano a larghezza contenuto da `sm`.
- Stabilita: corretto il narrowing TypeScript del form contatti per mantenere `lint` e `build` puliti.
- Verifica: `C:\Program Files\nodejs\npm.cmd run lint` e `C:\Program Files\nodejs\npm.cmd run build` completati senza errori.

## Dati Business Confermati

- Nome: Grossi Moto di Angelo Grossi.
- Settore: rivenditore/officina autorizzata KYMCO a Roma.
- Indirizzo pubblico confermato: Via Festo Porzio, 22, 00174 Roma RM.
- Telefono: +39 328 918 5029.
- Orari:
  - lun-ven 08:30-13:00 e 14:30-19:00;
  - sab 08:30-13:00;
  - dom chiuso.
- Google/Business link: https://share.google/ppfR023TdQcVrYya3
- Nota sede: showroom/ufficio in spostamento accanto all'officina. Non inventare nuovo indirizzo.

## Regole Operative

## Aggiornamento Contatti, Privacy E SEO 2026-07-30

- Il modulo `/contatti` usa `src/components/contact/ContactForm.tsx`, invia via `fetch` a `https://formspree.io/f/grossimoto`, include email obbligatoria, `_subject`, honeypot `_gotcha`, validazione nativa/accessibile, stati live e mantiene i dati in caso di errore.
- Aggiunte le route `/privacy` e `/cookie-policy`; la privacy contiene TODO espliciti per base giuridica, conservazione, destinatari e ruolo legale definitivo di Formspree.
- `SiteFooter` è condiviso su Home, `/scooters`, `/servizi`, `/contatti` e include contatti, Maps, navigazione, Privacy e Cookie Policy.
- Aggiunti skip link, `main#main-content`, `robots.ts`, `sitemap.ts`, `icon.svg` e metadata configurabile tramite `NEXT_PUBLIC_SITE_URL`; senza variabile non vengono emessi URL assoluti falsi.

- Usare `C:\Program Files\nodejs\npm.cmd`; `pnpm` non e disponibile e `npm.ps1` e bloccato.
- MCP 21st.dev Magic configurato nella config utente Codex: `C:\Users\empi0\.codex\config.toml`, server `magic`, comando `C:\Program Files\nodejs\npx.cmd -y @21st-dev/magic@latest`, chiave solo in `env.API_KEY` e non documentata nel repo.
- Quando si verifica il server MCP da shell sandbox, forzare `CODEX_HOME=C:\Users\empi0\.codex`; altrimenti il CLI legge `C:\Users\CodexSandboxOffline\.codex` e puo mostrare zero server.
- Per build:
  - `& 'C:\Program Files\nodejs\npm.cmd' run lint`
  - `& 'C:\Program Files\nodejs\npm.cmd' run build`
- Per vedere il sito in production seguire `docs/LOCAL_RUNBOOK.md`.
- Metodo background stabile trovato:
  - `Invoke-CimMethod Win32_Process.Create`;
  - command line con `C:\Program Files\nodejs\node.exe`;
  - binario locale `node_modules\next\dist\bin\next`;
  - `start --hostname 127.0.0.1 --port 3000`.
- Non usare `Start-Process` con `npm.cmd` per mantenere vivo Next.
- Non usare redirect stdout/stderr con `Start-Process` in questo ambiente.
- Non installare pacchetti sospetti o non ufficiali legati a finti tool Codex.
- Per ricostruire UI o future sezioni editoriali, usare `public/kymco-all/manifest.json` come dataset asset primario quando servono asset KYMCO.
- Per catalogo e listing attuale, il dataset operativo usato nel codice combina `public/kymco-all/` e `public/voge/` con mapping tipizzato in `src/data/catalog-scooters.ts`; per Voge usare `public/voge/manifest.json` e i manifest modello `index.json`.
- A fine lavoro aggiornare sempre la documentazione quando sono cambiate implementazioni, pattern, decisioni operative o comportamenti rilevanti. `PROJECT_MEMORY.md` va tenuto allineato allo stato reale; `AGENTS.md` e `docs/LOCAL_RUNBOOK.md` vanno aggiornati quando cambiano regole o procedure.
- Il controllo visuale tramite browser, screenshot, Chrome headless o Browser in-app va fatto solo se richiesto esplicitamente dall'utente. In assenza di richiesta esplicita, limitarsi a lint/build, verifiche HTTP o controlli tecnici concordati.

## Audit Responsive E Browser 2026-09-10

- Corretto l'overflow min-content delle route mobile causato dal grid wrapper di `PageTransitionProvider`: il provider e la pagina animata ora usano `min-w-0`, con `w-full` sul layer di pagina. `body.scrollWidth` coincide con la viewport utile sulle route verificate.
- L'hero `/servizi` usa un wrapper `relative` corretto per l'immagine `next/image` con `fill`; il titolo hero usa una scala realmente mobile-first e non supera il bordo a 320px.
- Le immagini catalogo sopra la piega ora possono essere marcate `priority` per il primo modello visibile, evitando il warning LCP di Next.js.
- Il deep link `/scooters?focus=<id>` apre la scheda corretta e porta subito la card espansa in viewport con scroll `auto`, senza animazione lunga su distanze estese.
- QA production completato su `/`, `/scooters`, `/servizi`, `/contatti` e `/scooters?focus=agility-s-125` a 320, 360, 375, 390, 414, 768, 820, 1024 landscape e 1440px: 45/45 combinazioni senza overflow o immagini rotte.
- Verificati su browser: apertura/chiusura card, filtri con rail interno, deep link, form contatti a 320px, scroll rapido avanti/indietro, footer raggiungibile e console pulita.
- `C:\Program Files\nodejs\npm.cmd run lint` e `C:\Program Files\nodejs\npm.cmd run build` completati senza errori.

## Skill/Agenti Utili

- Design/build: `impeccable`, `design-taste-frontend`, `next-best-practices`.
- Motion: `design-motion-principles`; `gsap-react` e `gsap-scrolltrigger` solo se servono davvero.
- Verifica: `web-quality-audit`, Browser in-app, `reviewer`, `performance-engineer`, `accessibility-tester`.

## Esperienza App Mobile E Tablet 2026-09-10

- Applicata la skill Apple Design per rendere i viewport compatti piu diretti e tattili: navigazione persistente, target touch da almeno 48px, safe-area iOS, feedback active e meno chrome duplicata.
- Aggiunto `src/components/layout/MobileAppNav.tsx`: tab bar inferiore Home, Gamma, Servizi e Contatti, attiva sotto `lg`, con stato `aria-current`, icone Lucide e barra leggibile su fondi chiari e scuri.
- Il layout globale riserva spazio alla tab bar e usa `scroll-padding-bottom` per evitare che ancore e contenuti focalizzati finiscano sotto la barra; la top navigation mobile resta limitata a brand e azione primaria.
- La Gamma ora usa statistiche compatte a tre colonne su mobile, filtro a rail orizzontale sticky e card con densita ridotta e feedback touch; il layout desktop resta invariato da `lg`.
- La hero Servizi usa scroll naturale su mobile/tablet fino a 1023px, senza pinning GSAP da desktop; le CTA restano sopra la tab bar con padding safe-area.
- Le card flottanti della Home sono state riposizionate sopra la tab bar sui viewport compatti e il link mappa resta una affordance desktop per non sovrapporsi al chrome mobile.
- QA browser in-app: `/`, `/scooters`, `/servizi`, `/contatti` a 320, 390, 768 e 820px; 16/16 senza overflow orizzontale. Verificato anche il passaggio touch Home -> Gamma e target da 48px.
- Sessione browser pulita sulla Home senza warning/errori console; `C:\Program Files\nodejs\npm.cmd run lint` e `C:\Program Files\nodejs\npm.cmd run build` completati senza errori.

## Ritocchi mirati fiducia e processo — 2026-09-16

- Perimetro confermato dall’utente: **Hero + Come funziona**. La precedente revisione estesa è stata annullata dall’utente. Preservare composizione, sezioni, scroll, showcase, catalogo e animazioni esistenti; non riprendere l’accorpamento delle sezioni.
- `BottomLeftCard.tsx`: stessa card e stesso posizionamento, sostituito `27 modelli` con valutazione Google **4,9/5 e 230 recensioni**, verificata il 16 settembre 2026 sulla scheda https://share.google/vSyE7QS9KoLI6wZOa. La card intera apre la fonte in una nuova scheda. Dati statici: ricontrollarli prima di futuri aggiornamenti, non dichiararli sincronizzati automaticamente o recensioni verificate.
- `ServiceProcess.tsx`, montato soltanto al posto dei quattro paragrafi di “Come funziona” in `/servizi`: quattro fasi selezionabili, fotografie illustrative già presenti nel progetto, spiegazioni originali preservate, CTA telefono contestuale. Nessun autoplay, libreria o immagine aggiunta.
- Applicata Apple Design a feedback immediato, comandi da almeno 48px, navigazione tastiera delle tab (frecce, Home/End), contrasto e transizione fotografica breve senza spostamenti, disattivata con reduced motion. Il resto della pagina Servizi resta invariato.
- Build production e TypeScript passati; ESLint dei tre file interessati passato. `npm run lint` completo resta bloccato da tre errori preesistenti `no-require-imports` in `qa-screenshots/prompt02-qa.cjs` e `prompt02-text-only.cjs`. Nessuna modifica a quei file o alla configurazione ESLint.
- Nessun test visuale automatico eseguito in questa correzione. Le modifiche Accessori e al pacchetto prompt trovate nel checkout appartengono ad altro lavoro e sono state preservate.

## Revisione copy fiducia e conversione — 2026-09-16

- Su richiesta successiva dell’utente, rivisti i testi di Home, Gamma, Servizi e Contatti preservando layout, motion e comportamenti. Applicate le skill Copywriting e Copy Editing.
- Resi concreti i vantaggi della consulenza e della continuità con l’officina; CTA più esplicite rispetto a chiamata, disponibilità o modulo. Rimossi assoluti e promesse non documentate, senza aggiungere condizioni commerciali, garanzie o tempi di risposta.
- Migliorati istruzioni del modulo, messaggi di invio/errore e stato vuoto dei filtri; il catalogo distingue assenza di risultati da indisponibilità del mezzo. L’etichetta accessibile della CTA disponibilità include testo visibile, modello e azione telefonica.
- Registro prima/dopo in `docs/COPY_REVIEW_2026-09-16.json`. Specifiche tecniche dei mezzi e funzionamento del modulo invariati.
- Verifica conclusiva: `npm.cmd run lint` e `npm.cmd run build` passati, inclusa compilazione TypeScript. Nessuna QA visuale automatica eseguita perché non richiesta. Nessun deploy eseguito da questa revisione; l’effetto sulle conversioni non è stato misurato.

## Audit SEO e conversione — 2026-09-16

- Corrette sitemap vuota e base dei canonical in assenza di configurazione: `src/lib/seo.ts` usa il dominio live fornito dall’utente `https://grossi-moto.vercel.app`, sovrascrivibile tramite `NEXT_PUBLIC_SITE_URL`. Usare il dominio definitivo quando disponibile.
- Titoli e descrizioni delle pagine principali specifici per intento locale (Roma), marchi e officina. Open Graph e Twitter specifici per tutte le sei pagine; brand uniforme Grossi Moto. Nessuna nuova promessa commerciale o dato strutturato inventato.
- Catalogo: CTA telefonica esplicita e link secondario al modulo con modello già compilato. Officina: argomento precompilato. Accettati solo ID presenti nel catalogo; parametri sconosciuti o ripetuti producono il modulo generico. Canonical Contatti resta privo dei parametri.
- Modulo: protezione sincrona dai doppi invii, timeout 20 secondi, stato di invio mantenuto durante modifiche, telefono cliccabile in caso di errore. Endpoint configurabile con `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, mantenendo quello preesistente come fallback.
- Lint e build passati. Verifica HTTP locale production: 6 pagine con status 200, un H1 e canonical corretto; 5 casi del modulo (modello valido, officina, ID sconosciuto, parametro ripetuto, nessun parametro); sitemap con 6 URL e riferimento robots corretto. Nessuna QA visuale o invio reale a Formspree.
- Limiti: accesso live fallito dall’ambiente; nessun dato Search Console/analytics/CWV sul campo disponibile. Ricezione Formspree non confermata. Informativa privacy preesistente contiene ancora dati e testo da validare con il titolare; non inventare condizioni legali. Nessun deploy effettuato.

## Correzione doppia scrollbar hero — 2026-09-16

- Rimossi `overflow-y-auto`, altezza massima e intercettazione wheel/touch dal wrapper Hero: la pagina è l’unico contenitore di scorrimento verticale.
- `HeroRevealStage` mantiene il reveal quando la hero entra nella viewport. Un ResizeObserver sull’altezza reale del wrapper seleziona il flusso naturale se il contenuto è più alto dello schermo, evitando clipping di CTA e testi a viewport basse o con testo ingrandito. Observer e listener vengono puliti allo smontaggio.
- Lint e build production completati senza errori. Nessuna QA visuale automatica richiesta o eseguita.

## Video hero assente nel deploy — 2026-09-16

- Il percorso originale `public/video hero/videoplayback.mp4` era escluso da Git dalla regola globale `*.mp4`; i deploy dal repository non potevano includerlo.
- Creata copia distribuibile `public/hero-video.mp4` con FFmpeg già installato: H.264, yuv420p, 1280x720, 25 fps, faststart, senza audio, durata 116,52 secondi. File ridotto da 76.270.334 a 15.718.037 byte; originale preservato.
- Aggiornato il source nella hero e aggiunta eccezione mirata `!/public/hero-video.mp4` in `.gitignore`. Il nuovo file deve essere incluso nel prossimo commit/deploy. Restano rispettati reduced motion e fallback per errori/autoplay bloccato.
- FFprobe conferma formato e durata; lint e build passati. Nessun deploy eseguito in questa correzione.

## Ripristino animazione hero e showroom — 2026-09-16

- Annullato il fallback introdotto per la doppia scrollbar: l’altezza della hero non deve disabilitare la chiusura animata e lo showroom sequenziale, elementi fondamentali del sito confermati dall’utente.
- Rimossi `heroOverflows`, callback e ResizeObserver. `HeroRevealStage` torna a scegliere la sequenza animata con la condizione originale desktop/reduced motion; handler wheel/touch, chiusura e riapertura e `ScooterShowcase` interattivo preservati.
- Il wrapper Hero resta senza scroll interno. Video distribuibile e correzioni SEO/copy preservati. Nessuna QA visuale automatica eseguita.

## Showroom e collage fotografico — 2026-09-16

- Verificate le sei immagini showroom: file PNG validi e non trasparenti integralmente. La prima immagine e relativo endpoint Next Image sul sito pubblico rispondono 200. Nessuna sostituzione dei modelli o delle fotografie.
- Resa esplicita la geometria del track animato: contenitore immagini desktop e singole slide da 100svh, track da 6 × 100svh; eliminata la catena di altezze percentuali. Preservati avanzamento uno alla volta, controlli, easing e chiusura hero. Verificato matematicamente l’allineamento dei sei offset; visibilità effettiva in browser non verificata perché QA visuale non richiesta.
- Collage “Dallo showroom all’officina”: riattivate tutte le sette fotografie già presenti (il codice ne limitava la resa a tre). Angoli arrotondati da 1,25rem e clipping sul contenitore di ogni foto, mantenendo zoom e posizioni esistenti.
- Lint, build e diff check passati; validità dei tredici asset controllata con il decoder immagini. Nessun deploy eseguito.

## Finale zoom cinematografico — 2026-09-16

- Su richiesta esplicita, sostituito il breve testo finale del collage con tre grandi titoli che salgono davanti alla fotografia: “Le tue strade. La tua scelta.”, “Un riferimento. Anche dopo.”, “Parliamone. Di persona.” Descrizioni basate su consulenza, officina e indirizzo già documentati.
- `ZoomParallax`: sezione desktop 600svh; zoom conservato a 86svh effettivi (0–0,172 del progresso su 500svh). Credits tra 0,20 e 0,84, prospettiva 1400px e inclinazione 8 gradi; ultima frase ferma per gli ultimi 80svh di scroll. Nessuna dissolvenza finale o autoplay, movimento reversibile con lo scroll.
- CTA telefono e modulo in flusso normale subito dopo il segmento sticky, sempre accessibili da tastiera senza link invisibili nei layer animati. Mobile e reduced motion ricevono tutti e tre i messaggi in sequenza statica e le stesse CTA.
- Preservati sette scatti, angoli arrotondati, chiusura hero e showroom sequenziale. Nessuna dipendenza aggiunta; animazione tramite transform e opacity. Lint e build superati; QA visuale non eseguita perché non richiesta. Modifiche non pubblicate da questo task.

## Introduzione al collage — 2026-09-16

- Aggiunte parole introduttive negli spazi del collage desktop: “Grossi Moto · Roma / La tua prossima strada.” in alto a sinistra e “Parte da qui. / Dalla scelta del mezzo, a ogni nuovo viaggio.” in basso a destra.
- Tipografia scura sul fondo esistente; layer senza interazioni. Testo visibile a zoom minimo, dissolvenza e lieve salita legate al progresso iniziale, conclusa prima del finale cinematografico. Nessuna modifica alle foto, allo showroom o alla sequenza finale. Fallback mobile/reduced motion preservato.
- Lint e build verificati; nessuna QA visuale automatica richiesta.

## Zoom e credits anche su mobile — 2026-09-16

- Rimossa la condizione che sostituiva l’intera sezione con una foto statica sotto 1024px. Solo `prefers-reduced-motion` mantiene il fallback statico completo.
- Mobile/tablet: una foto centrale da 76vw × 44svh si ingrandisce a 2,4× con lo scroll, coprendo la viewport. Durata complessiva 520svh, prima fase circa 86svh come desktop; il collage desktop a sette foto resta invariato.
- Credits attivi su mobile con testo fluido legato a larghezza e altezza dello schermo, padding ridotto, prospettiva da 3 gradi e arresto finale più alto per lasciare spazio alla navigazione inferiore. Introduzione riposizionata con safe-area; CTA in flusso normale preservate.
- Lint e build passati. Verifica solo tecnica, nessuna QA visuale automatica o deploy. Le modifiche contemporanee a StickyScrollShowcase appartengono ad altro lavoro e sono state preservate.

## Elenco interattivo servizi desktop — 2026-09-16

- Sostituite le sei card della seconda fase hero Servizi con `ServiceOverview`: sei righe separate da bordi sottili, Officina inizialmente aperta, voce attiva arancione, un dettaglio per volta con foto, descrizione e link all’approfondimento `#service-01`–`#service-06`.
- Scritta “Tutto in sede.” e sua descrizione a sinistra preservate testualmente e nello stile. Conservata timeline di ingresso della seconda fase; rimosso il vecchio inseguimento del puntatore sulle card. Nessuna modifica al comportamento mobile o allo showcase sottostante.
- Pulsanti nativi con `aria-expanded`, `aria-controls` e pannelli etichettati; Tab/Invio/Spazio standard, frecce/Home/End per spostare il focus. Dettagli inattivi nascosti; dissolvenza di 180ms disattivata con reduced motion. Foto prese dagli asset servizi esistenti.
- Lint e build passati. Verificati i sei asset, i target delle ancore e la conservazione del blocco sinistro. Nessuna verifica visuale automatica richiesta, nessun deploy eseguito. Modifiche concorrenti ad altri componenti preservate.

## Swipe smartphone e ottimizzazione media — 2026-09-17

- Introdotto `SwipeUpCardStack` generico in `src/components/ui/image-stack.tsx`, con render personalizzato per preservare colori/forme. Home sotto 768px: swipe verticale verso l’alto; Servizi sotto 768px: swipe orizzontale a sinistra. Tablet e desktop conservano i rispettivi layout. Massimo tre livelli, solo top draggable, loop, Annulla, tastiera, reduced motion, nessun blocco globale dello scroll.
- 36 immagini operative convertite in WebP e collegate ai componenti: 27,1 → 3,4 MB complessivi (-87%), originali conservati. Video desktop 15,7 → 10,8 MB; variante mobile 5,8 MB con source media e faststart, senza tagliare la sequenza.
- Zoom mobile alleggerito animando la superficie della foto anziché l’intera viewport; rimosse grandi ombre e prospettiva 3D mobile. Titoli credits più grandi e Anton locale WOFF2 con licenza OFL, 18,6 KB.
- Test unitari della logica swipe (4 casi) passati; asset WebP decodificati. Dettagli API, metriche, limiti e comandi in `docs/MOBILE_SWIPE_MEDIA_2026-09-17.md`. Nessuna QA visuale/touch automatica o deploy.


## Control box system — 2026-09-19

- Unificato il linguaggio visivo di CTA e controlli: le azioni non usano più frecce diagonali come firma grafica; le CTA di esplorazione usano un piccolo segnale tipografico `+` o solo testo quando l'azione è già esplicita.
- Previous/next usano chevron corti dentro control box squadrati; le stringhe tastiera `ArrowLeft`/`ArrowRight` restano invariate. Disclosure di card e pannelli usa `+ / −`.
- Home e Gamma restano neutral/pastel senza nuovi accenti rossi. Servizi e Contatti mantengono bianco/nero/rosso con rosso riservato agli stati e alle CTA già previste.
- Preservati layout di sezione, dati, immagini, routing, telefono, SEO, GSAP, snap, sticky, scrolling, drag pointer e logica dei caroselli.

## Ripristino qualità video hero — 2026-09-19

- Ripristinato `public/hero-video.mp4` alla versione precedente all'ottimizzazione del 17 settembre (circa 15,7 MB invece della ricodifica da circa 10,8 MB).
- La hero home mobile usa ora lo stesso master video di qualità superiore del desktop; la variante `hero-video-mobile.mp4` resta nel repository ma non viene più selezionata dalla hero.
- Preservati poster, autoplay muted, loop, playsInline, reduced motion, cover, animazioni, scroll handoff, CTA e layout responsive.


## Gamma mobile: espansione in-place della card — 2026-09-21

- Su mobile/tablet la card semantica attiva della Gamma si espande direttamente nello stack: mantiene header, modello e tone pastel, riduce leggermente la moto e rivela positioning, prime tre specifiche e CTA all'interno della stessa superficie.
- Le copie laterali GSAP restano sempre compatte e non interattive. Triple-copy, infinite swipe, peeks, profondita, virtual indexes, ResizeObserver, recenter e controlli restano invariati; il ResizeObserver adegua l'altezza dello stack alla card centrale aperta.
- L'espansione usa Framer Motion solo per size/layout e contenuto interno, senza bounce; con reduced motion il cambio e immediato. Swipe, tastiera e previous/next chiudono i dettagli del modello precedente.
- Desktop continua a usare l'espansione originale della griglia. Il deep link `/scooters?focus=<id>` resta compatibile tramite `data-scooter-detail-id` sulla card aperta.

## Form contatti conversazionale — 2026-09-24

- Implementati percorsi condizionali acquisto, officina, ricambi e altra domanda, una domanda per schermata; dalla scheda prodotto tre schermate con modello già selezionato.
- Nome e solo recapito necessario, anteprima modificabile, WhatsApp/mailto e invio Formspree. Conservati privacy, honeypot, timeout, errori recuperabili e protezione doppio invio.
- Logica pura in contact-flow.ts, UI in ContactFormUI.tsx e controller in ContactForm.tsx. Note iniziali modificabili anche dopo cancellazione completa; nessuna nuova dipendenza.
- Reintegrato il controller dopo la fusione che aveva ripristinato il form precedente, preservando la nuova grafica della pagina. Lint/build e 13 test passati; QA responsive, tastiera e invio simulato. Nessuna verifica della ricezione email reale.
- Dettagli: docs/CONTACT_FORM_2026-09-24.md.

### Canali diretti del form — 2026-09-24
- Rimossa la frase sui recapiti alla fine. WhatsApp ed email non richiedono più numero o indirizzo del cliente: il pulsante finale apre rispettivamente la chat +39 328 918 5029 o una mail a info@grossimoto.it, con testo preparato.
- Il solo canale Telefono richiede un numero e invia la richiesta di richiamata tramite Formspree. Invio da tastiera coerente con il canale scelto; nessun invio Formspree privo di recapito nei canali esterni. Preservati nome, anteprima modificabile e privacy.

## Loghi ufficiali e posizione mobile — 2026-09-25

- Nuovo componente `BrandLogo`: usa i due PNG originali in `public/logo`, già dotati di trasparenza, tramite Next Image con proporzioni intrinseche e dimensioni responsive. Nessuna modifica ai file originali, nessuno sfondo o filtro sul marchio.
- Versione bianca nella hero Home e nel footer scuro; versione nera nelle intestazioni chiare di Gamma, Servizi e Contatti. Header Servizi visibile anche su mobile, nel flusso della pagina.
- Il logo Home mobile passa da `fixed` ad `absolute` rispetto alla hero: resta nella propria sezione e non segue lo scroll sopra gli altri contenuti. CTA telefono e navigazione inferiore conservate.
- Lint dei sette file modificati e diff check superati. Lint generale bloccato dai due errori preesistenti `set-state-in-effect` in AccessoryRail e zoom-parallax. Nessuna QA visuale/browser richiesta o eseguita.
- Build produzione completata con successo, incluse TypeScript e generazione delle 38 pagine, consentendo il download del font Google già configurato.

## Audit Scrollcraft e Taste e ripristino motion — 2026-10-20

- Audit richiesto dall'utente sulla versione pubblica: Home, Gamma, Servizi, Contatti, Privacy/Cookie e schede campione KYMCO/Voge, con controlli desktop, mobile e dimensioni tablet. Proposte e limiti di verifica in `docs/AUDIT_SCROLLCRAFT_TASTE_2026-10-20.md`; codice dell'app non modificato.
- Showroom desktop ancora presente. Windows aveva gli effetti di animazione disattivati (`SPI_GETCLIENTAREAANIMATION=false`) e il browser comunicava `prefers-reduced-motion: reduce=true`, attivando la griglia statica. Dopo autorizzazione esplicita dell'utente, riattivata soltanto questa preferenza Windows; verificati stato true, media query false e showroom `pinned` con reveal/cambi di modello. Registro e screenshot in `qa-screenshots/`.
- GitHub verificato tramite connettore: remoto `master` a `b6917d7adae795b9757b4691b5aede0c9123e625` (14 ottobre), locale a `dba95f1e946e71d838386ffcb90de42e742db244`, indietro di un commit per l'allineamento al modello scelto dallo showroom. Vercel success; GitHub Actions fallito. Nessun pull, merge, push o deploy eseguito; modifiche locali precedenti preservate.
- Riscontri riprodotti: titolo Servizi coperto dalla foto a 768px; click mouse sui dettagli Servizi compatto intercettato dalla cattura del puntatore (Invio funziona); ricerca `Agility 50` include Agility 350; foto prodotto molto bassa nel primo viewport mobile. Nessuna correzione UI applicata nell'audit.
- Lint: due errori preesistenti `set-state-in-effect` in AccessoryRail:35 e zoom-parallax:376. Build produzione completata, TypeScript e 38 pagine inclusi, dopo ripetizione con rete per il font Google. Nessun invio del modulo o messaggio esterno; nessun test su Safari/iPad fisico.

## Prompt operativi dai risultati dell'audit — 2026-10-20

- Su richiesta dell'utente, raccolti 15 prompt in linguaggio naturale in `docs/PROMPT_MIGLIORAMENTI_SCROLLCRAFT_TASTE_2026-10-20.md`: allineamento GitHub e controlli, bug responsive/interazione/ricerca, Home e prodotti mobile, confronto, ritmo e coerenza, showroom con movimento ridotto, autoplay, video, informative e QA finale.
- Ogni prompt descrive problema, risultato atteso e verifiche pertinenti; preserva le decisioni approvate su showroom, collage, catalogo e modulo. Pubblicazione separata, dati tecnici verificati, impostazioni Windows fuori dal perimetro e limiti delle prove su dispositivi espliciti.
- Questa consegna aggiunge solo documentazione: nessuna implementazione dei miglioramenti, sincronizzazione Git o pubblicazione eseguita.
- Revisione successiva richiesta dall'utente, arrivato al prompt 8: gli originali 8–15 sono sostituiti da quattro incarichi in `docs/PROMPT_ACCORPATI_DALL_08_2026-10-20.md`. A = 8+11; B = 9+10+12; C = 13; D = 14+15. Letture e QA pertinenti condivise per blocco, lint/build conclusivi e ripetizioni solo dopo modifiche/errori, verifica generale concentrata nell'ultimo incarico. Un solo agente per incarico e blocchi sequenziali. Nessun intervento al codice da questa revisione dei prompt.

## Base locale allineata a GitHub — 2026-10-20

- Integrato con fast-forward il solo commit remoto mancante `b6917d7` (allineamento del modello showroom dopo l'assestamento del catalogo). HEAD e origin/master coincidono; nessun nuovo commit, push o deploy.
- MobileAppNav preesistente conservato identico (hash): barra nascosta/inerte fino all'uscita completa dalla hero, poi visibilità secondo direzione di scroll; ritorno nella hero la nasconde. Audit, prompt e documentazione locale preservati.
- Risolti i due errori `set-state-in-effect` nei fallback senza IntersectionObserver di AccessoryRail e zoom-parallax con callback requestAnimationFrame cancellabile; controllo typeof compatibile con TypeScript. Nessuna modifica grafica, asset o parametri motion da questo incarico.
- Lint e build production Turbopack superati (TypeScript, 38 pagine), 27 test esistenti passati. Font Google scaricato con accesso rete. Build concorrente su Servizi ha sostituito `.next`: QA browser su copia production isolata compilata con webpack, Home–Gamma identica al workspace. Interventi contemporanei Servizi preservati e fuori da questa QA.
- Browser desktop 1440×1000 e mobile 375×812: deep link Agility S, click showroom verso People S desktop / Agility S mobile, ritorno Home e gating barra mobile verificati. Capitolo 125 cc mobile a circa 84 px; nessun overflow globale o errore JavaScript nei casi provati. Nessun dispositivo fisico o Safari verificato.
- Dettagli, evidenze e stato da pubblicare in `docs/LOCAL_BASELINE_2026-10-20.md`; screenshot e backup in `qa-screenshots/baseline-sync-2026-10-20/`. Restano da committare/pubblicare navigazione mobile, fallback e documentazione, separatamente dagli altri lavori contemporanei.
- Controllo conclusivo: preservati anche interventi concorrenti a Hero.tsx e scroll-expansion-hero.tsx, aggiornata la copia QA e ripetuti build (TypeScript, 38 pagine), deep link desktop/mobile e gating della barra con esito positivo. Le modifiche visive concorrenti non appartengono a questo incarico.

## Servizi — click e drag nel carosello compatto 2026-10-20

- Corretto `ServiceSwipe.tsx`: nessuna cattura esplicita alla pressione; il click raggiunge il pulsante. Oltre 10 px il gesto resta un drag anche tornando all'origine; cattura soltanto dopo intenzione orizzontale, cambio scheda da 36 px. Direzione verticale conservata, `touch-action: pan-y` e scroll pagina naturali. Cancellazione/perdita cattura gestite senza annullare il trasferimento implicito touch pulsante → contenitore.
- Focus sul carosello prima che il vecchio pulsante diventi inerte; Tab raggiunge quello nuovo. Invio, Spazio, Escape, frecce, Home/End e chiusura dettagli conservati. Copie decorative sempre inert/aria-hidden e senza pulsanti. Nessuna modifica a stile, asset, dati o transizioni.
- Reduced motion letto con `useMediaQuery` per mantenere identici server e primo render client: risolto l'errore di hydration emerso nel controllo con preferenza già attiva. Tablet e reduced motion conservano il rail con dettagli già visibili.
- Aggiunti quattro test unitari del gesto e regressione browser con eventi mouse/touch Chromium, non click DOM sintetici. Matrice finale: 375×812 mouse/touch emulato, 768×1024 mouse/touch emulato, 375×812 reduced motion e controllo desktop 1440×1000; 47 verifiche passate, nessun overflow globale o errore JavaScript/risorsa statica nei casi provati. Focus e apertura controllati anche tramite albero accessibile del browser; nessuna prova su hardware touch/Safari/iPad fisico.
- QA finale su snapshot production separato in `qa-screenshots/service-fixture` per evitare sostituzioni di `.next` da altre chat. Esclusa `qa-screenshots` da TypeScript, coerentemente con Git/ESLint, perché i tipi generati delle build di prova venivano inclusi nella build dell'app. Documentazione e istruzioni in `docs/SERVICE_CAROUSEL_INPUT_2026-10-20.md` e `docs/LOCAL_RUNBOOK.md`; evidenze `qa-screenshots/service-carousel-*`. Modifiche concorrenti preservate; nessun commit, push o deploy da questo intervento.

- Verifica conclusiva di questo intervento: lint generale riuscito, suite corrente di 39 test superata (inclusi i quattro nuovi casi gesto e i test aggiunti nel frattempo da altri lavori), build production del workspace riuscita con TypeScript e 38 pagine. Regressione browser: tutte le 47 verifiche della matrice superate.

## Servizi — hero tablet e semantica 2026-10-20

- Applicate Scrollcraft e Taste alla hero esistente di `/servizi`, conservando foto, tipografia, palette e composizioni telefono/desktop. Nuovo `services-hero.module.css`: da 768 a 1279 px testo, foto 16:9 e contatti in successione in verticale; griglia 1.1:1 con fotografia alta almeno 400 px e contatti a tutta larghezza in orizzontale. Nessuna altezza hero forzata al viewport, nuovo motion o dipendenza.
- Titolo leggibile senza invasione della foto: misura da 288 a 704 px a 768×1024 e da 314 a 756 px a 820×1180. CTA piena, telefono e mappa su link da almeno 48 px e testo da 16 px; contatti senza troncamento. Spazio inferiore `6.5rem + safe-area` sotto 1024; da 1024 navigazione superiore completa e padding finale 40 px. Header assoluto soltanto da 1280.
- Un solo `main` focalizzabile dallo skip link e un solo `h1` accessibile condiviso; varianti tipografiche visuali decorative escluse dall'albero accessibile. Rimossi main annidati e section interna desktop superflua. `sizes` identico per tutte le varianti fotografiche: misurata una richiesta anziché due a 375/768/1024/1440.
- Chrome sulla build di produzione a 768×1024, 820×1180, 1024×768, 1180×820, 375×812 e 1440×900: zero overflow, errori JavaScript e sovrapposizioni titolo/foto sui tablet; telefono e indirizzo sopra la barra e raggiungibili da tastiera. Skip link, focus visibile, CTA con Invio, rotazione senza ricaricamento e reduced motion verificati. Geometria titolo a 375/1440 identica alla baseline. Riscontri `qa-screenshots/services-tablet-final/`; nessun dispositivo fisico.
- Lint generale e build (TypeScript, 38 pagine) superati; review statica completata. Ispezione Taste generale eseguita prima/dopo ma non verde per stile preservato, sezioni fuori ambito e segnalazioni sul titolo accessibile condiviso: dettagli e critica in `docs/SERVIZI_TABLET_2026-10-20.md`. Nessun claim di audit generale superato.
- Altri lavori modificavano contemporaneamente sorgenti e `.next`: verifica conclusiva su copia isolata dei sorgenti/build, con risultati intermedi non allineati scartati. Modifiche degli altri preservate. Nessun commit, push o deploy.

## Catalogo — ricerca numerica e sigle prevedibili 2026-10-20

- Estratta la logica pura di ricerca/filtri/conteggi da CatalogPage in `src/lib/catalog-search.ts`, senza modificare UI, ordine, asset, motion, apertura schede, deep link o gestione del confronto.
- Parole ricercabili come sottostringhe, senza distinzione di maiuscole/accenti; separatori normalizzati, termini in AND e ordine libero. Numeri e sigle indicizzati solo da nome, nome breve e cilindrata: numeri interi (`50` non trova `350`), sigle complete (`SR1` non trova `SR16`), riconosciuti anche AK575, 900DSX e forme separate AK 575 / 900 DSX. Escluso People S 200 da `125` nonostante il riferimento editoriale nella descrizione.
- `Agility 50` trova solo Agility 50 R16 Plus; `Agility 350` solo Agility 350; `125`, `125cc`, `125 cc` trovano 9 modelli; con Voge ne rimangono 3. Filtri dedicati, utilizzo, conteggi, reset e cancellazione ricerca conservano il comportamento esistente.
- Aggiunti 8 test sui dati reali, incluse tutte le 27 denominazioni e nomi brevi; suite 39/39 passata. Lint e build production (TypeScript, 38 pagine) superati. Browser production locale :3300 a 1440×1000 e 375×812: ricerca, sigle, filtri/zero risultati/reset, apertura schede e selezione confronto conservata; nessun overflow o errore JS rilevato. Nessun telefono fisico verificato.
- Criterio e prove in `docs/CATALOG_SEARCH_2026-10-20.md`, evidenze in `qa-screenshots/catalog-search-2026-10-20/`. Nessun commit, push o deploy; preservati gli altri lavori locali.
