# Design Direction - Grossimoto KYMCO

Ultimo aggiornamento: 2026-06-06.

## Stato Attuale

La home non e piu limitata alla Hero. La direzione implementata oggi e:

- Hero video theatre dark/premium su sfondo chiaro tecnico;
- showcase scooter pinned con art direction piu editoriale;
- CTA finale di chiusura.

La reference iniziale serve ancora come tono, ma la UI corrente ha gia pattern propri e non va reimpostata come landing generica.

## Concept

Nome operativo: `Grossimoto KYMCO Theatre`.

L'idea e presentare Grossimoto come dealer/officina KYMCO a Roma con un impatto cinematografico ma concreto. La Hero apre la scena; la showcase porta i modelli al centro; la UI deve restare leggibile, sobria e convertente.

## Hero Corrente

Elementi fissi:

- card video full-screen arrotondata;
- video locale `/video%20hero/videoplayback.mp4`;
- overlay charcoal per leggibilita;
- accento rosso scuro molto contenuto;
- navbar con logo Grossimoto, subtitle KYMCO Roma, menu desktop e CTA telefono;
- badge matte `Dealer KYMCO autorizzato a Roma`;
- headline `L'eccellenza KYMCO, su misura per Roma`;
- CTA primarie `Esplora la gamma` e `Prenota consulenza`;
- card bottom-left con `21` modelli scooter;
- faux-cutout bottom-right con showroom/officina e Via Festo Porzio, 22.

Regola di motion fondamentale:

- la Hero va trattata come una card interna fisica;
- il background chiaro esterno non deve essere il target dell'animazione;
- la chiusura corretta e dal basso verso l'alto, preservando la lettura degli angoli inferiori arrotondati.

## Showcase Scooter Pinned

Pattern corrente:

- usare solo i PNG trasparenti da `public/foto sezione show/`;
- scooter protagonista, non card grid generica;
- quattro modelli in sequenza verticale;
- step transition imperativa, non scrub;
- rail, watermark, testo e statistiche tematizzati dal modello attivo;
- primo modello su `var(--page-background)` per continuita con la Hero;
- dal secondo modello in poi sfondi cromatici premium, spenti e leggibili.

## Palette

- Base pagina: `--page-background`, beige tecnico chiaro.
- Theatre: charcoal profondo `oklch(14% 0.012 40)`.
- Text Hero: off-white caldo `oklch(94-95% 0.01 80)`.
- Panel chiari: beige tecnico opaco.
- Accent Hero: rosso scuro profondo controllato.
- Showcase: toni dedicati per modello, sempre desaturati e premium.

Evitare rosso acceso, neon, viola/blu AI, beige pesante, blob, orb, bokeh, griglie e glassmorphism decorativo.

## Motion

Usare motion solo dove sostiene la comprensione:

- Hero: trigger scroll, non scrub timeline.
- Chiusura Hero: card che si restringe verticalmente dal basso verso l'alto.
- Reverse Hero: stessa forma in rientro, senza flash o perdita di bordo.
- Showcase: una moto alla volta, transizione completa e lock input durante l'animazione.
- Reduced motion sempre rispettato.

GSAP ScrollTrigger non e necessario allo stato attuale: il progetto usa Framer Motion con state machine e controlli imperativi.
