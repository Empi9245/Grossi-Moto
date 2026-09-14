# Project Memory

Ultimo aggiornamento operativo: 2026-09-14.

## Homepage Conversion Update 2026-09-14

- Hero copy updated to immediately communicate: Grossi Moto, Rome, KYMCO + Voge, physical showroom, in-house workshop, contact options, scooter range. [cite:1]
- Primary CTAs: `/scooters` (Confronta la gamma) and WhatsApp (`https://wa.me/393289185029`) with pre-filled message. [cite:1]
- Bottom-left panel: 27 MODELLI KYMCO + VOGE, subcopy "125cc, ruote alte, GT e maxi scooter." [cite:1]
- New `HomeTrustSection` added between ShowcaseCoverCta and GrossimotoExperienceSection with six factual trust points: Rivenditore ufficiale KYMCO, Gamma KYMCO e Voge, Showroom fisico a Roma, Officina, Accessori, Assistenza. [cite:1]
- ShowcaseCoverCta copy refined to encourage in-person visit: "Uno scooter va provato dal vivo." CTAs: "Confronta i modelli" and "Parla con Grossi Moto" (WhatsApp). [cite:1]
- Navbar subtitle changed to "Scooter a Roma" for consistency. [cite:1]
- HeroBadge updated to "Rivenditore ufficiale KYMCO a Roma". [cite:1]
- All changes preserve the existing premium editorial visual direction; no new sections beyond the trust block, no new routes, no new dependencies. [cite:1]
- Verified contact number: +39 328 918 5029 (used for tel: and WhatsApp links). [cite:1]

## Stato Corrente

Il progetto Grossi Moto contiene una home Next.js App Router funzionante con:

- Hero video premium;
- transizione Hero -> showcase trigger-based;
- showcase scooter pinned a step;
- catalogo `/scooters` collegato alla home;
- CTA `ShowcaseCoverCta`;
- sezione `GrossimotoExperienceSection` con componente obbligatorio `ZoomParallax`;
- sezione `AccessoriesSection`;
- sezione `WorkshopSection` in Home;
- blocco contatto breve e footer minimale.

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

## Regole Operative

- Usare `C:\Program Files\nodejs\npm.cmd`; `pnpm` non e disponibile e `npm.ps1` e bloccato.
- Per build:
  - `& 'C:\Program Files\nodejs\npm.cmd' run lint`
  - `& 'C:\Program Files\nodejs\npm.cmd' run build`
- A fine lavoro aggiornare sempre la documentazione quando sono cambiate implementazioni, pattern, decisioni operative o comportamenti rilevanti.
