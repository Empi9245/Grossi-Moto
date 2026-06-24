# Superdesign Reuse Policy

Ultimo aggiornamento: 2026-06-05.

## Regola Utente

Superdesign va usato solo come libreria di contesto, componenti previsti, pagine e prompt riusabili. Non usare Superdesign per generare il sito, non creare draft esterni e non spostare il lavoro fuori dal repository.

In pratica:

- leggere `.superdesign/design-system.md`;
- leggere `.superdesign/init/*.md`;
- usare `.superdesign/prompts/*.md` come prompt interni per progettare componenti e sezioni;
- implementare tutto nel repo con Next.js, React, TypeScript e Tailwind;
- non chiamare `superdesign create-design-draft`;
- non chiamare `superdesign iterate-design-draft`;
- non chiamare `superdesign execute-flow-pages`;
- non dipendere da login/canvas Superdesign per avanzare.

## Uso Consentito

E' consentito usare il formato Superdesign per:

- mantenere una mappa componenti;
- descrivere pagine e sezioni;
- preparare prompt di componentizzazione;
- ragionare su varianti UI prima di scrivere codice;
- creare una mini design library locale.

## Uso Non Consentito In Questo Progetto

- Generare pagine nel canvas Superdesign.
- Delegare la UI a draft Superdesign.
- Bloccare il build se la CLI non e loggata.
- Sostituire Browser QA, lint e build con output Superdesign.
- Sostituire il runbook locale `docs/LOCAL_RUNBOOK.md` con comandi Superdesign o canvas esterni.

## File Da Considerare Come Fonte

- `.superdesign/design-system.md`
- `.superdesign/init/components.md`
- `.superdesign/init/layouts.md`
- `.superdesign/init/routes.md`
- `.superdesign/init/theme.md`
- `.superdesign/init/pages.md`
- `.superdesign/init/extractable-components.md`
- `.superdesign/prompts/component-prompts.md`
- `.superdesign/prompts/page-prompts.md`
