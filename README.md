# Grossimoto KYMCO

Sito Next.js App Router per Grossimoto, dealer e officina autorizzata KYMCO a Roma.

## Stato

La home non contiene piu solo la Hero:

- Hero premium con video locale;
- transizione Hero -> showcase trigger-based;
- scooter showcase pinned a step;
- CTA finale `ShowcaseCoverCta`.

La pagina `/scooters` non e implementata e non va creata in anticipo.

Documentazione operativa:

- `docs/README.md`: indice documentazione.
- `docs/LOCAL_RUNBOOK.md`: build, start, porta 3000, QA screenshot e troubleshooting Windows/Codex.
- `PROJECT_MEMORY.md`: stato corrente del progetto e problemi aperti reali.

## Quick Start Corretto

```powershell
Set-Location -LiteralPath 'C:\Progetti Exeva\Grossi Moto'
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Avvio production in foreground:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'node_modules\next\dist\bin\next' start --hostname 127.0.0.1 --port 3000
```

Aprire:

```text
http://127.0.0.1:3000/
```

Per avvio background stabile, verifica server, screenshot e troubleshooting, seguire `docs/LOCAL_RUNBOOK.md`.
