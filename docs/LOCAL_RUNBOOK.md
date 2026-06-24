# Local Build And Browser Runbook

Ultimo aggiornamento: 2026-06-06.

Questo e il modo corretto per buildare, avviare, verificare tecnicamente e riavviare il sito Grossimoto in questo workspace Windows/Codex.

## Regola Base

Usare sempre il workspace:

```powershell
Set-Location -LiteralPath 'C:\Progetti Exeva\Grossi Moto'
```

In questo progetto:

- `pnpm` non e disponibile;
- `npm.ps1` e bloccato dalla execution policy;
- usare `C:\Program Files\nodejs\npm.cmd` per script npm;
- per tenere vivo il server in background, usare `node.exe` + binario locale Next, non `Start-Process` con `npm.cmd`.

## Build Corretta

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

La build production valida genera `.next/` e deve terminare con route `/` prerenderizzata.

## Avvio Production In Foreground

```powershell
& 'C:\Program Files\nodejs\node.exe' 'node_modules\next\dist\bin\next' start --hostname 127.0.0.1 --port 3000
```

Aprire poi:

```text
http://127.0.0.1:3000/
```

## Avvio Production In Background

```powershell
$commandLine = '"C:\Program Files\nodejs\node.exe" "C:\Progetti Exeva\Grossi Moto\node_modules\next\dist\bin\next" start --hostname 127.0.0.1 --port 3000'
Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
  CommandLine = $commandLine
  CurrentDirectory = 'C:\Progetti Exeva\Grossi Moto'
}
```

Nota Codex: `Invoke-CimMethod -ClassName Win32_Process -MethodName Create` puo richiedere approvazione fuori sandbox.

## Verifica Server

Controllare che la porta sia in ascolto:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object LocalAddress,LocalPort,OwningProcess
```

Controllare che la home risponda:

```powershell
Invoke-WebRequest -Uri 'http://127.0.0.1:3000/' -UseBasicParsing | Select-Object -ExpandProperty StatusCode
```

Risultato atteso:

```text
200
```

## Fermare Il Server

1. Verificare il PID sulla porta 3000:

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object LocalAddress,LocalPort,OwningProcess
```

2. Verificare che il PID sia davvero il server locale:

```powershell
Get-Process -Id <OwningProcess> | Select-Object Id,ProcessName,Path
```

3. Solo poi fermarlo:

```powershell
Stop-Process -Id <OwningProcess>
```

Nota Codex: `Stop-Process` puo richiedere approvazione fuori sandbox anche su PID gia verificati.

## Chrome E Screenshot

Usare Chrome, screenshot o Browser in-app solo quando l'utente richiede esplicitamente un controllo visuale. Per default, dopo una modifica limitarsi a lint, build, eventuale riavvio server e verifica HTTP.

Chrome headless con screenshot puo richiedere approvazione fuori sandbox.

Esempio desktop:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=5000 --window-size=1440,1200 --screenshot='C:\Progetti Exeva\Grossi Moto\qa-screenshots\home-desktop-1440.png' http://127.0.0.1:3000/
```

Esempio mobile:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=5000 --window-size=375,812 --screenshot='C:\Progetti Exeva\Grossi Moto\qa-screenshots\home-mobile-375.png' http://127.0.0.1:3000/
```

Gli screenshot statici sono utili per controllare layout, overflow, pulsanti e testo. Per verificare motion reali di scroll puo servire browser interattivo o automazione CDP con approvazione.

## Documentazione

A fine lavoro aggiornare sempre la documentazione quando sono cambiate implementazioni, pattern, decisioni operative o comportamenti rilevanti:

- `PROJECT_MEMORY.md` per stato reale, decisioni UI, dati, stack e regole operative del progetto;
- `AGENTS.md` quando cambiano regole generali o workflow agentico;
- `docs/LOCAL_RUNBOOK.md` quando cambiano procedure di build, avvio, riavvio, verifica o gestione server.

## Errori Gia Visti Da Non Ripetere

- Non usare `pnpm`.
- Non usare `npm` via `npm.ps1`.
- Non usare `Start-Process` con `npm.cmd` per tenere vivo `next dev` o `next start`.
- Non fermare processi sulla porta 3000 senza verificare prima il PID.
- Non assumere che un vecchio server serva l'ultima build: dopo `npm.cmd run build`, se esiste un server gia avviato, fermarlo e riavviarlo.
- Chrome headless via Node REPL/MCP puo fallire per limiti sandbox; usare Chrome locale con approvazione quando serve QA reale.

## Dev Server

Per sviluppo locale foreground:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'node_modules\next\dist\bin\next' dev --hostname 127.0.0.1 --port 3000
```

Per validazione finale, preferire sempre la sequenza production:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run build
& 'C:\Program Files\nodejs\node.exe' 'node_modules\next\dist\bin\next' start --hostname 127.0.0.1 --port 3000
```
