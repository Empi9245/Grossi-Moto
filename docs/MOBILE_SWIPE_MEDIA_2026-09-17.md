# Mobile swipe e media — 17 settembre 2026

## Integrazione

Stack esistente: Next.js App Router 16, React 19, TypeScript, Tailwind 4, Framer Motion 12, alias `@/` su `src/`. Nessuna dipendenza aggiunta; `src/components/ui` è la directory riutilizzabile già adottata dal progetto. Non serve inizializzare o sovrascrivere configurazioni shadcn.

`SwipeUpCardStack` in `src/components/ui/image-stack.tsx` accetta le props richieste (cards, soglie, callback, controls, loop), più `direction`, `renderCard`, `className`, `label`. `renderCard` conserva la grafica delle card esistenti. I parent montano il componente solo sotto 768px; home e Servizi sono le integrazioni effettive, senza route demo pubblica aggiuntiva.

- Home: swipe verso l’alto, `touch-action: none` solo nell’area della card. Il resto della pagina scorre normalmente.
- Servizi: swipe verso sinistra, `touch-action: pan-y`; pagina e contenuto lungo della scheda mantengono lo scroll verticale.
- Tre card al massimo, ID stabili, una sola trascinabile. Progresso con MotionValue; posizione, rotazione, scala e opacità. Soglie di default: oltre 100px, oppure oltre 14px con velocità verso l’uscita superiore a 500px/s.
- Uscita completata prima del riordino, loop e storia Annulla. Nessun riordino per array vuoto/singolo. Spring di ritorno e avvicinamento delle schede sottostanti.
- Tastiera: freccia su/sinistra secondo direzione; Escape annulla il drag; controlli accessibili; focus mantenuto quando la scheda attiva cambia da tastiera. Livelli inferiori inert/aria-hidden. Reduced motion elimina rotazione, zoom accessorio e transizione di uscita.
- Nessun listener globale che blocchi lo scroll. Animazioni fermate allo smontaggio, guardia sugli aggiornamenti asincroni. Remote src sono supportati da next/image ma richiedono remotePatterns per gli host effettivamente usati; qui tutti i media sono locali.

## Media e zoom

36 nuove copie WebP, larghezza massima 1600px e qualità 78, originali conservati: 27.138.335 → 3.433.314 byte complessivi (-87%). Riferimenti aggiornati per showroom, catalogo KYMCO, collage e servizi. Il totale è la somma dei file sorgente interessati, non il trasferimento di una singola visita; Next Image continua a produrre le dimensioni responsive.

Video desktop: 15.718.037 → 10.846.660 byte. Variante smartphone: 5.819.141 byte, selezionata con `<source media>`. Entrambe mantengono la sequenza, H.264 yuv420p, 24 fps e faststart. Originale di produzione conservato. Eccezione git per il nuovo MP4 mobile.

Zoom mobile: scala applicata alla foto (76vw × 44svh) anziché a un layer grande come la viewport; rimosse ombra ampia e prospettiva 3D del testo su mobile. Desktop preservato. Titoli finali leggermente maggiorati e in Anton locale WOFF2 (18.612 byte), licenza OFL inclusa, display swap.

## Verifiche

- Test logica gesture: `node --experimental-strip-types --test tests/swipe-stack.test.mjs` (4 test: tocchi accidentali, soglie/direzione, ciclo senza duplicati, array vuoto/singolo/non-loop).
- Lint e build production.
- 39 WebP totali nelle cartelle interessate decodificati correttamente (36 nuovi e 3 preesistenti).
- Nessun test visuale automatizzato, prova touch reale o misurazione FPS/CWV. Nessun deploy eseguito.
