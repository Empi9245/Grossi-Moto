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

## Configurazione SEO e contatti (2026-09-16)

- `NEXT_PUBLIC_SITE_URL`: URL assoluto del dominio pubblico, letto in build. Default: https://grossi-moto.vercel.app (dominio fornito dal cliente). Aggiornare prima di un cambio dominio e ricostruire. Canonical, sitemap, robots e Open Graph condividono `src/lib/seo.ts`.
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`: endpoint pubblico Formspree. In assenza viene mantenuto https://formspree.io/f/grossimoto. Confermare la configurazione nell’account Formspree e verificare la ricezione con il titolare prima di considerare validato il canale; non inviare messaggi di prova senza autorizzazione.
- Verificare anche l’informativa privacy definitiva: i dati legali mancanti sono ancora esplicitati nella pagina esistente.
- Per controlli HTTP usare una porta libera e non riutilizzare `.next` mentre un altro task sta ricostruendo: riavviare il server di test dopo la build conclusa se i manifest vengono sostituiti.

## Diagnosi dello showroom statico — 2026-10-20

Se su desktop appare una griglia invece dello showroom grande, verificare prima `prefers-reduced-motion`, larghezza e capacità del puntatore. `HeroRevealStage` e `ScooterShowcase` prevedono una variante statica: non è automaticamente una rimozione del codice animato.

Nel caso verificato il 20 ottobre, gli effetti di animazione di Windows erano disattivati. La loro riattivazione, autorizzata esplicitamente dall'utente, ha ripristinato il comportamento nel browser dopo il ricaricamento. La preferenza Windows è globale: non forzarla come passaggio automatico di una QA. Per annullare la modifica di quel caso: Impostazioni Windows → Accessibilità → Effetti visivi → Effetti di animazione → Disattivato. Riscontri in `qa-screenshots/motion-system-change-2026-10-20.json` e nel documento di audit.

## QA con lavorazioni contemporanee — 2026-10-21

Non eseguire prove browser su un `next start` mentre un'altra lavorazione ricostruisce la stessa `.next`: manifest e chunk possono essere sostituiti durante la visita, producendo falsi errori o mescolando versioni. Una build riuscita non rende valido un server avviato prima di una ricostruzione successiva.

Quando serve isolamento, creare una cartella nuova dentro `qa-screenshots/`, copiarvi `src`, `package.json`, `package-lock.json`, `tsconfig.json`, `postcss.config.mjs` e `next-env.d.ts`. Le librerie e gli asset possono essere condivisi attraverso junction locali a `node_modules` e `public`: usarle soltanto per leggere le risorse, senza eseguire installazioni, cancellazioni o ricodifiche nella copia. Build e avvio vanno eseguiti con quella cartella come directory di lavoro e una porta dedicata. Conservare gli hash dei sorgenti verificati e controllare che coincidano con i file consegnati.

La QA del 21 ottobre usa Chrome headless con pointer lock e pointer capture nativi disabilitati in ogni contesto. `prefers-reduced-motion` viene emulato per contesto/browser, senza modificare le impostazioni di Windows. Conservare separatamente i tentativi invalidati da una build concorrente e i risultati della copia isolata.

## Build concorrenti e QA isolata — 2026-10-20

Prima di usare `next start`, accertarsi che `.next/BUILD_ID` esista e che nessun altro processo stia ricostruendo la stessa directory. Una build riuscita può essere sostituita da un altro lavoro: l'errore “Could not find a production build” non implica necessariamente una build fallita. Non fermare processi di altri incarichi.

Per una QA stabile durante lavori concorrenti si può copiare il sorgente e i file di configurazione in una cartella temporanea esterna al workspace, riusare tramite junction `node_modules` e `public` e compilare lì con `npm.cmd run build -- --webpack` (nessuna modifica allo script del progetto). Avviare con node + Next locale su una porta libera dedicata. Annotare percorso, sorgenti verificati e differenze successive: la QA della copia non certifica modifiche apportate nel frattempo al workspace. Nel controllo Home–Gamma del 20 ottobre è stata usata la porta 3200; dettagli in `docs/LOCAL_BASELINE_2026-10-20.md`.

## Regressione input Servizi — 2026-10-20

Il controllo unitario non richiede dipendenze aggiuntive:

```powershell
& 'C:\Program Files\nodejs\node.exe' --test tests/service-gesture.test.mjs
```

Per la regressione browser, usare Chrome installato e Playwright già disponibile nel runtime Codex (individuare il bundle corrente con `load_workspace_dependencies`; non aggiungere pacchetti al progetto). Impostare `PLAYWRIGHT_MODULE` al suo `playwright/index.mjs` e `SERVICE_TEST_URL` al server production di prova già avviato. Esempio del bundle verificato in questa sessione:

```powershell
$env:PLAYWRIGHT_MODULE = 'C:\Users\empi0\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\playwright\index.mjs'
$env:SERVICE_TEST_URL = 'http://127.0.0.1:3110'
& 'C:\Program Files\nodejs\node.exe' tests/service-carousel.browser.mjs
```

Il test apre Chrome headless e verifica mouse, tastiera, touch emulato, movimento ridotto, focus, copie inerti, scroll e assenza di errori. Salva screenshot e risultati JSON in `qa-screenshots/`. Non sostituisce telefono/tablet fisico o Safari. Dettagli in `docs/SERVICE_CAROUSEL_INPUT_2026-10-20.md`.

Se una build di prova risiede dentro `qa-screenshots/`, TypeScript deve continuare a escludere questa directory (`tsconfig.json`): i suoi validator generati non sono sorgenti dell'app. Per isolare la QA durante build concorrenti si può copiare `src`, `package.json`, `package-lock.json`, `tsconfig.json` e `postcss.config.mjs` in una sottocartella dedicata di `qa-screenshots/`, collegare `public` con una junction, e usare il Next locale con `build <cartella>` e `start <cartella> --hostname 127.0.0.1 --port <porta-libera>`. I moduli vengono risolti dal `node_modules` del workspace. Riavviare soltanto il proprio server dopo ogni nuova build; verificare che i file sotto test nella copia coincidano con quelli del workspace. Nell'intervento input Servizi la copia era `qa-screenshots/service-fixture`, porta 3110. Preservare le evidenze; non eliminare cartelle/junction di altri lavori.

## QA con lavorazioni contemporanee — 2026-10-20

- Due server di produzione che leggono la stessa `.next` non sono isolati: una ricostruzione può sostituire CSS, chunk e manifest mentre un server tiene ancora i precedenti in memoria. Errori di idratazione o pagina senza stile in queste condizioni richiedono prima il riallineamento del server/build.
- Per una QA stabile durante altri lavori, usare una copia temporanea dei sorgenti con build e server propri su porta libera. Copiare soltanto la cartella `.next` a build già contese non dà una garanzia di coerenza. Non modificare la configurazione applicativa o fermare server di altri lavori per ottenere l'isolamento.
- Nel caso Servizi del 20 ottobre: build isolata e Chrome su `127.0.0.1:3101`, poi rimozione della sola copia temporanea dopo arresto del proprio server. Screenshot e misure finali restano in `qa-screenshots/services-tablet-final/`. Se si usano junction per leggere gli asset condivisi, rimuovere prima il solo collegamento verificato, senza ricorsione, e verificare i percorsi prima di eliminare la copia temporanea.
