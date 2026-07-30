# Project Memory

Ultimo aggiornamento operativo: 2026-06-24.

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
- Motion hero servizi: ScrollTrigger pinned con `end: +=120%`, `scrub: 0.45`, immagine con zoom leggero `scale: 1.12`, overlay finale `opacity: 0.72`, senza lasciare headline e sei servizi visibili nello stesso momento.
- Reduced motion hero servizi: non viene creato ScrollTrigger; resta la composizione statica iniziale e la board finale resta nascosta, evitando sovrapposizioni.
- Dopo la hero, `/servizi` usa `StickyScrollShowcase`: su desktop la foto rimane sticky a sinistra e il copy scrolla a destra con titoli e statement oversized per riempire lo spazio, senza card grid strette; su mobile torna a layout stacked con immagine sopra e copy grande sotto.
- Fix sticky servizi del 2026-06-24: il pannello immagine non deve essere direttamente lo sticky grid item, perche la CSS Grid puo stirarlo all'altezza della colonna destra e neutralizzare `position: sticky`. Usare un wrapper di colonna e un figlio `sticky top-0 h-[100svh]`.
- Direzione UI aggiornata 2026-06-24: usare trattamento premium brutalist/editorial dove serve a evitare sezioni generiche o troppo vuote. Applicato a `StickyScrollShowcase`, `AccessoriesSection` e `WorkshopSection` con titoli oversized, numeri fantasma, hairline rules e layout piu sparsi. Non applicarlo indiscriminatamente a Hero, showcase scooter o ZoomParallax, che hanno gia una regia specifica.
- Redesign servizi 2026-06-26: la hero `/servizi` mantiene il comportamento a due stati con GSAP ScrollTrigger. Prima mostra l'intro `Assistenza. Officina. Esperienza.`, poi allo scroll entra la board finale `Tutto / in / sede.` con navigatore 2x3 verso `#service-01`...`#service-06`.
- Materiale servizi 2026-06-26: `.liquid-glass` e utility globale per le card vetrose. Nella pagina servizi e usato su navigator hero, foto sticky, rail numerico 01-06, chip numerici e box descrizione. I pannelli liquid e la pagina servizi devono restare quasi interamente su neutri crema/ink: non usare verde, e usare il rosso solo come accento tipografico strettamente necessario. Stato corrente: unico rosso intenzionale su `sede.` nella seconda fase hero.
- Sticky servizi 2026-07-30: non usare piu caption o pannelli di copy dentro la foto sticky. Il contenuto del servizio deve restare nella colonna editoriale, per evitare duplicazioni e tagli del pannello interno.
- Fix leggibilita sticky servizi 2026-06-26: nella colonna destra i titoli lunghi devono usare scala massima contenuta e `overflow-wrap` per non uscire dal viewport. Il blocco statement + card liquid descrittiva deve restare stacked fino a viewport molto larghi (`2xl`) per evitare che la card copra o comprima il testo.
- Fix card immagine sticky servizi 2026-07-30: rimosso il `figcaption` sovrapposto dentro le foto desktop, che duplicava il contenuto del servizio e risultava tagliato in alto. Il titolo `Finanziamenti` usa ora una larghezza libera nei viewport desktop ampi per restare su una sola riga senza forzare overflow su laptop stretti.

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

- pattern zoom-parallax stile demo con `h-[300vh]`, sticky `100svh`, massimo 7 immagini e scale progressive `[4,5,6,5,6,8,9]`;
- la prima immagine parte come tile centrale `25vh / 25vw`, scala fino a coprire tutta la sticky section e resta sopra le altre immagini;
- il progress dello zoom e separato dal progress totale: lo zoom completa circa al 74% della sezione, poi mantiene una fase finale full-screen per evitare il taglio/scomparsa al termine del pin;
- il copy `Dallo showroom all'officina / Un punto di riferimento KYMCO a Roma` non sta piu sopra la sezione prima della gallery: compare come overlay solo dopo che la prima foto ha gia raggiunto il full-screen;
- `GrossimotoExperienceSection` non deve avere `overflow-hidden`: il clipping va tenuto dentro il viewport sticky di `ZoomParallax`, altrimenti la sticky puo essere tagliata o comportarsi come se la sezione sparisse;
- fallback statico su mobile e `prefers-reduced-motion`, con prima immagine full-screen e testo subito visibile;
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
- Badge matte: `Dealer KYMCO autorizzato a Roma`.
- Headline: `L'eccellenza KYMCO, su misura per Roma`.
- CTA: `Esplora la gamma` e `Prenota consulenza`.
- Bottom-left panel con `21` modelli scooter.
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

## Skill/Agenti Utili

- Design/build: `impeccable`, `design-taste-frontend`, `next-best-practices`.
- Motion: `design-motion-principles`; `gsap-react` e `gsap-scrolltrigger` solo se servono davvero.
- Verifica: `web-quality-audit`, Browser in-app, `reviewer`, `performance-engineer`, `accessibility-tester`.
