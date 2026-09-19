# Project Memory

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
