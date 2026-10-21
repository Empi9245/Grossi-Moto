# Allineamento locale e verifica Home–Gamma — 20 ottobre 2026

## Stato e integrazione

- Letti AGENTS.md, PROJECT_MEMORY.md, runbook e audit del 20 ottobre.
- `git fetch origin` conferma un solo commit mancante: `b6917d7adae795b9757b4691b5aede0c9123e625`, `fix(catalog): align focused showroom model after grid settles`.
- Integrato con `git merge --ff-only origin/master`, senza stash, reset, commit nuovi o conflitti. HEAD e origin/master coincidono (0 commit avanti / 0 indietro al controllo).
- CatalogPage è quello remoto: attende variante responsive, dimensioni stabili e altezza dello stack prima di posizionare il modello aperto; l'input dell'utente interrompe l'allineamento automatico.

## Modifiche locali conservate e correzioni

- MobileAppNav conservato identico al file presente all'inizio (verifica SHA-256): misura solo le hero renderizzate e tiene la barra nascosta e inerte finché la hero non è uscita interamente. Conservata la visibilità secondo direzione di scroll.
- Conservati integralmente i contenuti preesistenti di PROJECT_MEMORY.md e LOCAL_RUNBOOK.md e i due documenti audit/prompt. Copie iniziali e hash in `qa-screenshots/baseline-sync-2026-10-20/` (ignorati da Git).
- AccessoryRail e zoom-parallax: nel solo fallback senza IntersectionObserver l'attivazione viene programmata con requestAnimationFrame e cancellata nel cleanup. Il controllo `typeof window.IntersectionObserver !== "function"` evita il narrowing a `never` di TypeScript. Nessuna disattivazione delle regole lint.
- Nessuna modifica da questo incarico a classi grafiche, immagini, asset, durate/easing, animazioni normali, dipendenze o impostazioni Windows.
- Durante la verifica sono comparsi altri interventi contemporanei in Servizi (ServiceSwipe, gestione gesture, hero e pagina). Sono stati lasciati intatti; non sono correzioni effettuate da questo incarico e non rientrano nella sua QA funzionale.

## Verifiche

- `npm.cmd run lint`: superato, exit 0.
- `npm.cmd run build`: superato con Turbopack, TypeScript e 38 pagine. Richiesto accesso rete al font Google Instrument Sans già configurato. Il primo tentativo senza rete non poteva scaricarlo.
- Test esistenti eseguiti prima degli interventi concorrenti: 27/27 passati (confronto, guida, contatti, swipe).
- Un altro processo build/dev ha sostituito `.next` dopo la build riuscita. Per evitare interferenze, la QA browser è stata eseguita su una copia temporanea del sorgente con dipendenze/asset esistenti, compilata con `npm.cmd run build -- --webpack`: TypeScript e 38 pagine superati. Server di verifica `http://127.0.0.1:3200`. Il percorso temporaneo è registrato in `qa-screenshots/baseline-sync-2026-10-20/isolated-path.txt`.
- Confronto SHA-256 tra copia verificata e workspace: le differenze successive riguardano Servizi; i file del percorso Home–Gamma e i due fallback corretti coincidono.
- Browser in-app desktop **1440 × 1000**, movimento attivo: link diretto `/scooters?focus=agility-s-125` con Agility S aperta, bordo superiore a circa **104 px**; click reale su People S nello showroom apre `/scooters?focus=people-s-125-abs`, card corretta a circa **104 px**; ritorno alla Home riuscito.
- Browser in-app mobile **375 × 812**, movimento attivo: link diretto Agility S e click reale `Scopri di più su Agility S 125` nello showroom aprono la card corretta. Capitolo 125 cc a **83,64 px**, card a **172,61 px**.
- Home mobile: barra nascosta e inerte nella hero; fuori hero, risalendo, barra visibile e attiva; tornando nella hero torna nascosta e inerte. Conservata l'assenza durante lo scroll verso il basso secondo il comportamento preesistente.
- Nessun overflow orizzontale globale nei casi provati; nessun warning/errore JavaScript nei log browser consultati. Screenshot `model-desktop.jpg` e `model-mobile.jpg` nella cartella delle evidenze. Verifica responsive in browser, non prova su telefono fisico o Safari; nessuna nuova certificazione reduced-motion.

## Cosa resta da pubblicare

La correzione showroom è già su GitHub ed è ora integrata localmente. Restano locali la navigazione mobile, le due correzioni lint e la documentazione (inclusi audit/prompt); gli interventi contemporanei a Servizi richiedono il proprio riepilogo e controllo. Questo incarico non crea commit, non esegue push e non pubblica deploy. La CI remota non è stata rieseguita: il passaggio dei controlli locali non ne modifica lo stato storico.

## Controllo conclusivo dopo le modifiche concorrenti

Sono comparsi anche interventi concorrenti a `src/components/hero/Hero.tsx` e `src/components/ui/scroll-expansion-hero.tsx`. Anche questi file sono stati preservati senza editarli. La copia temporanea è stata aggiornata ai sorgenti più recenti e ricompilata con successo (webpack, TypeScript, 38 pagine); il server QA è stato riavviato. Ripetuti deep link desktop 1440 e mobile 375, assenza di overflow, gating della barra dentro/fuori hero e log browser: risultati confermati. Gli screenshot finali provengono da quest'ultima build. Le modifiche visive della hero appartengono all'altro lavoro, non alle correzioni di questo incarico. La verifica di un workspace condiviso fotografa i sorgenti copiati: eventuali ulteriori modifiche successive richiedono una nuova validazione.
`Al controllo finale dopo la QA`, il lavoro concorrente aveva già modificato nuovamente `src/app/servizi/page.tsx`, `src/components/ui/scroll-expansion-hero.tsx`, `src/components/ui/services-hero.module.css` e `src/components/ui/services-hero.tsx` rispetto alla copia testata. Queste revisioni successive sono preservate ma non certificate dalla QA precedente. CatalogPage, MobileAppNav e i due fallback corretti coincidono ancora con la copia verificata.
