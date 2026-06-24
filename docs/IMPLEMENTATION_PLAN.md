# Implementation Plan

Ultimo aggiornamento: 2026-06-06.

## Stato Attuale

Il progetto non e piu fermo alla sola Hero. Oggi esistono:

- Hero premium con video locale;
- `HeroRevealStage` trigger-based;
- `ScooterShowcase` pinned a step;
- `ShowcaseCoverCta`.

La stack reale in uso:

- Next.js App Router;
- React;
- TypeScript;
- Tailwind CSS v4;
- Framer Motion;
- `lucide-react`.

## Scope Gia Consegnato

- Hero full-screen rounded video theatre.
- Navbar minimale Grossimoto/KYMCO Roma.
- Copy centrale e CTA primarie.
- Bottom-left matte card con `21` modelli scooter.
- Bottom-right faux-cutout CTA showroom/officina.
- Trigger scroll Hero -> showcase con reverse.
- Showcase scooter con quattro modelli, rail, statistiche, CTA e background per modello.
- Shadow per scooter e dataset visuale dedicato.
- Motion ridotta con `useReducedMotion()`.

## Lavoro Ancora Aperto

1. Rifinire la chiusura della Hero.
2. Eliminare la lettura di linea netta sul bordo inferiore durante il reveal.
3. Rendere il reverse della card perfettamente continuo con i bordi inferiori arrotondati.
4. Solo dopo questo polish, fare eventuale audit visuale completo della home.
5. `/scooters` resta fuori scope finche non richiesta.

## Non Fare

- Non creare `/scooters` in anticipo.
- Non aggiungere form, API o backend.
- Non cambiare il video Hero con asset remoti.
- Non sostituire la showcase con una lista tradizionale.
- Non usare asset diversi dai PNG trasparenti presenti in `public/foto sezione show/` per la sezione showcase.

## Verifica Prima Di Consegnare

Usare sempre:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Per vedere il sito e aprire il browser senza rifare errori, seguire `docs/LOCAL_RUNBOOK.md`.
