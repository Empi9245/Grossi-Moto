# Premium Web Project Rules

Questo ambiente serve per creare siti e app premium, unici, motion-first ma performance-conscious.

## Obiettivo

- Produrre interfacce con art direction chiara, non template generici.
- Usare Next.js App Router, React, TypeScript e Tailwind CSS come default.
- Usare motion, 3D e WebGL solo quando migliorano storytelling, percezione o usabilita.
- Mantenere codice modulare, accessibile, performante e production-ready.

## Regole Di Design

- Non creare layout SaaS generici o sezioni ripetitive senza concept.
- Non creare design che sembri generato da IA.
- Non usare gradienti casuali, blob decorativi, orb, bokeh o glassmorphism decorativo.
- Non usare 3D solo come decorazione.
- Non usare animazioni inutili o lente su azioni frequenti.
- Ogni hero deve avere un'idea forte e leggibile nel primo viewport.
- Ogni sezione deve avere ritmo visivo, gerarchia e una ragione di esistere.
- Tipografia, spacing, responsive e stati interattivi devono essere curati.
- Mobile-first obbligatorio.
- Performance, accessibilita e SEO tecnico vanno controllati prima della consegna.
- Lucide React e' l'icon set predefinito nei nuovi progetti.
- Preferire immagini reali, generate o asset bitmap di qualita quando il sito ha bisogno di media. Evitare immagini stock generiche.

## Stack Predefinito

Regola generale: usare `pnpm` se disponibile, altrimenti `npm`.

Nota specifica per questo workspace: `pnpm` non e disponibile e `npm.ps1` e bloccato. Usare `C:\Program Files\nodejs\npm.cmd`.

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- Lenis
- ESLint
- Prettier
- clsx
- tailwind-merge
- lucide-react

Comandi per nuovo progetto:

```powershell
pnpm create next-app@latest premium-site --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd premium-site
pnpm add gsap framer-motion three @react-three/fiber @react-three/drei lenis clsx tailwind-merge lucide-react
pnpm add -D prettier prettier-plugin-tailwindcss
```

Fallback npm:

```powershell
npm install gsap framer-motion three @react-three/fiber @react-three/drei lenis clsx tailwind-merge lucide-react
npm install -D prettier prettier-plugin-tailwindcss
```

## Configurazione Core

Agenti da usare nel 90% dei progetti:

- `ui-designer`: concept, art direction, layout e decisioni UI.
- `frontend-developer`: implementazione React/Tailwind e bug UI.
- `nextjs-developer`: routing, Server Components, data fetching, metadata, immagini e deploy Next.js.
- `reviewer`: review finale di correttezza, regressioni, sicurezza e test mancanti.
- `performance-engineer`: rendering, bundle, Core Web Vitals, animazioni e hot path.
- `accessibility-tester`: WCAG, tastiera, focus, screen reader e contrasto.

Skill core:

- `impeccable`: shape, polish, audit e anti-AI-slop sulle interfacce.
- `design-taste-frontend`: guardrail di gusto e frontend design per evitare bias visivi generici.
- `next-best-practices`: regole Next.js correnti.
- `design-motion-principles`: motion create/audit, frequenza d'uso, accessibilita e performance.
- `gsap-react`: GSAP in React/Next con cleanup corretto.
- `gsap-scrolltrigger`: scroll animation, pinning, scrub e refresh.
- `web-quality-audit`: audit integrato performance, accessibilita, SEO e best practice.

## Configurazione Premium

Usare quando il progetto punta a qualita tipo Awwwards, agenzie creative o prodotto premium:

- Agenti core.
- `ui-ux-tester`: test funzionale UI/UX in browser e difetti visivi.
- `seo-specialist`: technical SEO, crawlability, metadata, structured data e IA informativa.
- Browser in-app per verifica reale su desktop e mobile.
- Skill `superdesign` solo quando serve esplorazione visuale o varianti prima di implementare.
- Skill `design-motion-principles` in modalita Audit quando il progetto contiene motion importante.

## Configurazione Optional

Usare solo se il progetto lo richiede:

- `security-auditor`: auth, pagamenti, input non trusted, segreti, RLS o dati sensibili.
- `postgres-pro`: schema, query, locking, indici, RLS e performance database.
- `supabase`: qualsiasi task Supabase, Auth, SSR, Storage, Realtime, Edge Functions o CLI.
- `supabase-postgres-best-practices`: query, schema e ottimizzazione Postgres/Supabase.
- `ui-ux-pro-max`: ricerca ampia su pattern, palette e design system, quando `impeccable` non basta.

## Workflow Standard

1. Leggere `PROJECT_MEMORY.md`.
2. Capire se il task e core, premium o optional.
3. Definire concept e art direction prima del layout.
4. Disegnare UX, struttura, contenuti e stati.
5. Implementare Next.js, React e Tailwind.
6. Prima di aggiungere motion, usare `design-motion-principles` per decidere se deve animare e con quale intensita.
7. Aggiungere motion GSAP o Framer solo dove migliora UX o storytelling.
8. Aggiungere 3D/React Three Fiber solo se porta valore reale.
9. Verificare responsive, accessibilita, performance, SEO e reduced motion con controlli tecnici adeguati al task.
10. Fare QA visuale con browser, screenshot o strumenti simili solo quando l'utente lo richiede esplicitamente.
11. Aggiornare sempre la documentazione a fine lavoro quando sono cambiate implementazioni, pattern, decisioni operative o comportamenti rilevanti. In particolare aggiornare `PROJECT_MEMORY.md`, e aggiornare anche `AGENTS.md` o `docs/LOCAL_RUNBOOK.md` quando cambiano regole o procedure.

## Uso Agenti

Codex non deve aprire decine di subagent per default. Usare subagent solo quando il task lo giustifica.

Quando l'utente scrive `Crea un nuovo progetto seguendo la configurazione premium`, interpretarlo come richiesta esplicita di seguire il workflow premium e usare i subagent selezionati quando disponibili. Limitare il fan-out a 2-3 agenti paralleli per fase:

- Fase concept: `ui-designer`.
- Fase build: `nextjs-developer` o `frontend-developer`, non entrambi se il task e piccolo.
- Fase audit: `reviewer`, `performance-engineer`, `accessibility-tester` o `ui-ux-tester` in base al rischio.
- Fase data/auth: `security-auditor` e `postgres-pro` solo se necessario.

Se il runtime richiede conferma esplicita per spawnare subagent, chiedere una conferma breve invece di inventare un workflow automatico.

## Verifica

Per questo workspace, prima della consegna eseguire:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

I comandi generici sotto valgono solo fuori da questo workspace, quando `pnpm` o `npm` shell sono realmente disponibili:

```powershell
pnpm lint
pnpm build
npm run lint
npm run build
```

Per avviare e vedere il sito senza ripetere errori, seguire `docs/LOCAL_RUNBOOK.md`. Non usare `Start-Process` con `npm.cmd` per tenere vivo Next in background in questo ambiente.

Il controllo visuale tramite browser, screenshot o strumenti simili va eseguito solo se richiesto esplicitamente dall'utente. Quando viene richiesto e il task cambia UI, verificare almeno:

- desktop 1440px
- mobile 375px
- nessun overflow orizzontale
- testo non sovrapposto
- stati hover, focus, loading, empty ed error
- reduced motion dove rilevante

Se l'utente chiede di non fare QA visuale automatica o di non controllare tramite browser, limitarsi a lint/build e alle verifiche tecniche richieste.

## Sicurezza

- Non installare pacchetti npm sospetti o non ufficiali legati a finti tool Codex.
- Evitare `codexui`, `codex android`, `openclaw codex` e pacchetti poco mantenuti.
- Prima di aggiungere dipendenze, preferire librerie note e verificare `package.json`.
- Non salvare segreti in `PROJECT_MEMORY.md`, `AGENTS.md`, skill o agenti.
