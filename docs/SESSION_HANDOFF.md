# Session Handoff - Grossi Moto KYMCO

Ultimo aggiornamento: 2026-06-06.

## Stato Corrente

La home implementata non e piu solo `<Hero />`: ora renderizza una sequenza completa con reveal e showcase.

Implementato:

- `src/app/page.tsx`: renderizza `<HeroRevealStage />` e `<ShowcaseCoverCta />`.
- `src/components/hero/Hero.tsx`: Hero card video con supporto a `cardMotion`/`cardAriaHidden` per animare la card interna.
- `src/components/hero/BottomRightCorner.tsx`: faux-cutout showroom/officina scuro, senza route nuove.
- `src/components/sections/HeroRevealStage.tsx`: state machine Framer Motion per trigger scroll Hero -> showcase e reverse.
- `src/components/sections/ScooterShowcase.tsx`: pinned showcase a step con cambio modello imperativo, lock durante transizione, theming per modello e shadow per scooter.
- `src/components/sections/ShowcaseCoverCta.tsx`: CTA/finale home in flusso pagina.
- `src/data/showcase-scooters.ts`: contenuti, toni, shadow metrics e offset immagine per 4 modelli.

Non implementato:

- pagina `/scooters`;
- dataset catalogo route-level separato;
- form contatto;
- integrazioni backend.

## Problema Aperto Prioritario

La chiusura della Hero verso il basso non e ancora risolta in modo definitivo.

Difetto da tenere in mente:

- in forward la card video puo ancora leggere come una sparizione con linea netta in basso;
- gli angoli inferiori arrotondati devono restare visibili e salire verso l'alto mentre la card si restringe verticalmente;
- in reverse il comportamento e migliore ma non ancora perfettamente continuo.

La Hero va trattata come una card fisica:

- animare solo la card interna con video, contenuto e bottom-right cutout;
- non animare il background chiaro esterno;
- mantenere continuita ottica con il primo background della showcase.

## Showcase Corrente

- Primo modello: stesso background della Hero esterna `var(--page-background)`.
- Cambi cromatici dal secondo modello in poi.
- Nessuno scrub continuo: ogni piccolo scroll avvia una transizione completa verso il modello successivo o precedente.
- Ultimo modello lascia uscire naturalmente verso la CTA/footer.
- Primo modello permette reverse verso la Hero.

## Dati Azienda Confermati

- Nome: Grossi Moto di Angelo Grossi.
- Settore: vendita scooter KYMCO, assistenza/officina, accessori, finanziamenti.
- Indirizzo pubblico confermato: Via Festo Porzio, 22, 00174 Roma RM.
- Telefono: +39 328 918 5029.
- Orari:
  - lunedi-venerdi: 08:30-13:00, 14:30-19:00;
  - sabato: 08:30-13:00;
  - domenica: chiuso.
- Google/Business link: https://share.google/ppfR023TdQcVrYya3

## Asset Correnti

- Hero video: `public/video hero/videoplayback.mp4`, source `/video%20hero/videoplayback.mp4`.
- Showcase scooter: usare solo PNG trasparenti da `public/foto sezione show/`.
- Asset editoriali/catalogo KYMCO: `public/kymco-all/manifest.json` e raccolta `public/kymco-all/`, con categorie Scooter e Sport.

## Avvio Locale Corretto

Leggere `docs/LOCAL_RUNBOOK.md`.

Sequenza minima:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Poi avvio production con `node.exe` + binario locale Next oppure `Invoke-CimMethod Win32_Process.Create` come da runbook.

## Note Tecniche

- Usare `C:\Program Files\nodejs\npm.cmd`.
- `pnpm` non disponibile.
- `npm.ps1` bloccato dalla execution policy.
- Non usare `Start-Process` con `npm.cmd` per tenere vivo Next in background.
- Se la porta 3000 e gia occupata, verificare PID e processo prima di fermarlo.
