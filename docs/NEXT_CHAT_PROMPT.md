# Prompt Pronto Per La Prossima Chat

Copia e incolla questo prompt nella prossima chat dentro il workspace `C:\Progetti Exeva\Grossi Moto`.

```text
Continua nel workspace C:\Progetti Exeva\Grossi Moto.

Prima di modificare file leggi:
- AGENTS.md
- PROJECT_MEMORY.md
- docs/README.md
- docs/SESSION_HANDOFF.md
- docs/LOCAL_RUNBOOK.md
- docs/KYMCO_DATASET.md
- docs/DESIGN_DIRECTION.md
- docs/SUPERDESIGN_REUSE.md

Stato attuale:
- La home usa `<HeroRevealStage />` e `<ShowcaseCoverCta />`.
- Esistono gia Hero premium, showcase scooter pinned e CTA finale.
- Non ricreare lo scaffold da zero.
- Non sostituire il video Hero locale.
- Non creare `/scooters` se non richiesto esplicitamente.
- Per la showcase usare solo i PNG trasparenti di `public/foto sezione show/`.
- Il primo background showcase deve restare uguale a `var(--page-background)`.

Problema aperto principale:
- La Hero non deve sparire con una linea netta in basso.
- Va trattata come una card fisica interna, non come background pieno.
- Solo la card video arrotondata, con contenuto e pulsante/faux-cutout in basso a destra, deve chiudersi dal basso verso l'alto.
- Gli angoli arrotondati inferiori devono restare visibili e salire verso l'alto durante la chiusura.
- Anche il reverse deve essere continuo, senza perdita temporanea dei bordi inferiori.

Vincoli operativi:
- Usa C:\Program Files\nodejs\npm.cmd per lint/build.
- Non usare pnpm.
- Non usare npm.ps1.
- Per avviare il sito in background segui docs/LOCAL_RUNBOOK.md.
- Non usare Start-Process con npm.cmd per tenere vivo Next.
- Se devi aprire Chrome o usare Win32_Process.Create in Codex, chiedi/esegui con approvazione fuori sandbox.

Verifica minima prima della consegna:
- npm.cmd run lint
- npm.cmd run build
- browser desktop 1440px
- browser mobile 375px
- nessun overflow orizzontale
- testo non sovrapposto
- reduced motion rispettato

Quando completi il task, aggiorna PROJECT_MEMORY.md e i documenti in docs/ se cambia lo stato reale.
```
