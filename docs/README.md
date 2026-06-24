# Grossi Moto Documentation Index

Ultimo aggiornamento: 2026-06-06.

Il progetto Grossimoto contiene una home Next.js App Router funzionante con Hero premium, reveal trigger-based e showcase scooter pinned gia implementati. La documentazione deve riflettere sia cio che e consegnato sia i difetti ancora aperti.

## File Principali

- `README.md`: quick start root del repository.
- `PROJECT_MEMORY.md`: stato reale del progetto, pattern implementati, problema aperto prioritario sulla chiusura della Hero.
- `docs/LOCAL_RUNBOOK.md`: comandi corretti per lint, build, `next start`, verifica porta, stop/restart server e screenshot Chrome headless.
- `docs/SESSION_HANDOFF.md`: handoff operativo sintetico per la prossima sessione.
- `docs/IMPLEMENTATION_PLAN.md`: cosa e stato gia consegnato e cosa resta da fare.
- `docs/DESIGN_DIRECTION.md`: direzione creativa e regole visuali/motion attuali.
- `docs/KYMCO_DATASET.md`: dati modelli/prezzi/fonti e nota sulla libreria asset `public/kymco-all/`.
- `docs/NEXT_CHAT_PROMPT.md`: prompt aggiornato per ripartire senza perdere contesto.
- `docs/SUPERDESIGN_REUSE.md`: regola Superdesign, solo memoria locale, nessuna generazione esterna.

## Stato Workspace

- `src/app/` contiene `layout.tsx`, `page.tsx` e `globals.css`.
- `src/components/hero/` contiene la Hero e i componenti `Navbar`, `HeroBadge`, `BottomLeftCard`, `BottomRightCorner`.
- `src/components/sections/` contiene `HeroRevealStage`, `ScooterShowcase` e `ShowcaseCoverCta`.
- `src/data/showcase-scooters.ts` governa contenuti e parametri visuali dello showcase.
- Il video Hero locale richiesto e `public/video hero/videoplayback.mp4`; nel markup va usato `/video%20hero/videoplayback.mp4`.
- `public/foto sezione show/` resta la sorgente immagini valida per la showcase scooter.
- `public/kymco-all/manifest.json` resta la fonte asset primaria per future sezioni o catalogo KYMCO.

## Comandi Da Ricordare

Build:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Background start stabile:

```powershell
$commandLine = '"C:\Program Files\nodejs\node.exe" "C:\Progetti Exeva\Grossi Moto\node_modules\next\dist\bin\next" start --hostname 127.0.0.1 --port 3000'
Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
  CommandLine = $commandLine
  CurrentDirectory = 'C:\Progetti Exeva\Grossi Moto'
}
```

Dettagli e troubleshooting: `docs/LOCAL_RUNBOOK.md`.
