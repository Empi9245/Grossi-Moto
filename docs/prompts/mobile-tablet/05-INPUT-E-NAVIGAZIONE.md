# Prompt 05: coerenza fra input, navigazione e Home

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e STATO.md in docs/prompts/mobile-tablet, in particolare il contratto responsive. Preserva il fix 02 e le sezioni 03–04.

## Risultato
Ruotando un tablet la geometria si adatta, ma non compaiono improvvisamente scroll bloccati o una navigazione incompatibile con il touch. Questo è un intervento sul comportamento condiviso, non un redesign.

## File pertinenti
- src/hooks/useMediaQuery.ts
- src/components/sections/HeroRevealStage.tsx
- src/components/ui/zoom-parallax.tsx
- src/components/layout/MobileAppNav.tsx
- src/components/hero/Navbar.tsx
- src/components/hero/BottomLeftCard.tsx e BottomRightCorner.tsx, solo compatibilità con la navigazione
- src/components/catalog/CatalogNavbar.tsx
- src/app/layout.tsx e globals.css, solo regole di navigazione/spazio riservato
Puoi creare src/lib/responsive-policy.ts con query nominate. Non migrare la hero Servizi qui: il prompt 06 consumerà il contratto documentato.

## Comportamento
Separa tre decisioni: geometria per larghezza, visibilità della navigazione, ammissibilità del motion immersivo. Applica esattamente il contratto del contesto; conserva colonne e dimensioni tablet, non equiparare coarse a layout telefono.
Sincronizza CSS, hook e padding per tab bar/safe area. Quando appare la barra, il contenuto deve avere spazio fino all'ultimo pulsante; quando sparisce, niente banda vuota. Evita due navigazioni primarie duplicate. Allinea anche gli offset o la visibilità delle card assolute BottomLeftCard/BottomRightCorner: il padding globale non le sposta. Su tablet largo coarse devono restare sopra la barra o usare la variante compatta, preservando la CTA libera ottenuta in 02.
Home: dispositivi con input coarse usano consultazione naturale di hero/showroom e fallback ZoomParallax; il desktop fine/hover mantiene la regia. L'aggiornamento reduced motion deve fermare gli effetti senza cambiare navigazione.
Cambio modalità: libera listener/lock locali, overflow eventualmente modificato e posizioni artificiali, senza riportare arbitrariamente l'utente a inizio pagina. SSR/hydration non devono accendere prima la versione immersiva sul telefono.
Documenta query e nomi esportati in STATO.md, per 06/07/09.

## Accettazione
QA locale richiesta: portrait→landscape→portrait, ingresso diretto landscape, desktop mouse, modalità coarse/ibrida quando emulabile e reduced motion dinamico.
Viewport resizing da solo non simula un dispositivo touch: dichiara i casi che gli strumenti non possono provare.
Niente duplicazione nav, sovrapposizioni o regressione 02; desktop 1440 preservato. Controlli finali e stato 05.
