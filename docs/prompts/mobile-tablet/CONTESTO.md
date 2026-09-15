# Contesto comune: Grossi Moto, mobile e tablet

Leggi una volta per sessione; rileggi solo se cambia. Questi sono brief per lavori futuri: la scrittura dei prompt non equivale a implementazione.

## Progetto e obiettivo
Workspace: C:/Progetti Exeva/Grossi Moto. Next.js App Router 16, React 19, TypeScript, Tailwind 4, framer-motion 12, GSAP 3 con @gsap/react già installati. Importa Motion da framer-motion, senza migrare pacchetti. Segui AGENTS.md, PROJECT_MEMORY.md e, per avvio locale, docs/LOCAL_RUNBOOK.md.

Sito: https://grossi-moto.vercel.app. Rivenditore scooter e officina a Roma, KYMCO e Voge. Telefono confermato tel:+393289185029; sede Via Festo Porzio 22. Conserva dati, modelli, specifiche, URL e claim verificati. Non creare /officina. Audit già svolto: docs/AUDIT_MOBILE_TABLET_2026-09-15.md; consulta solo la parte pertinente se manca un dettaglio.

Obiettivo: Home e Servizi fotografici, tattili e più rapidi da consultare. Accessori = sfogliare; Officina = scegliere un'esigenza; Servizi = consultare; processo = seguire quattro passaggi. Il loro movimento deve avere identità distinta.

## Identità visiva
Preserva font-display/font-ui/font-body e palette: --page-background #e7e3dc, --panel #ece8e1, --ink #1b0e0d, testi chiari #f4f0e8. Accessori chiaro, Officina scura. Foto con soggetto/crop intenzionali, titoli grandi ma proporzionati, gerarchia leggibile. No nuovi font, gradienti decorativi, 3D ornamentale, glass card annidate, cursori speciali o card identiche in ogni sezione.
“Livello dei migliori siti” significa composizione, fotografia, feedback immediato, movimento continuo e assenza di scatti; non aggiungere effetti a ogni elemento.

## Contratto motion
- Il contenuto segue il dito durante il gesto. L'utente può interrompere un movimento e continuare verticalmente.
- Rail: preferisci overflow-x nativo + scroll-snap. Lascia consentiti entrambi gli assi e il pinch zoom: touch-action: pan-y disabiliterebbe il pan orizzontale nativo. Non convertire wheel verticale in orizzontale, non sommare due sistemi drag.
- Drag custom solo se necessario: soglia iniziale ~10px e discriminazione dell'asse, pointercancel gestito, niente click involontari dopo trascinamento.
- Selezione immediata; foto in dissolvenza sovrapposta 220–320ms, testo opacity + spostamento massimo 8–12px in 160–220ms. Curva iniziale [0.22,1,0.36,1]. Sono valori iniziali da rifinire, non vincoli assoluti.
- Niente coda ai tap rapidi, controlli bloccati, fotogrammi vuoti, blur sul testo, bounce decorativo o autoplay.
- Anima principalmente transform/opacity. Riserva aspect-ratio/dimensioni; evita layout animation su immagini e animazioni continue di height.
- Reduced motion: funzionalità conservate, niente slide/parallax/zoom programmati; cambio immediato o opacity <=100ms. Preferenza reattiva senza reload. Da tastiera focus e selezione immediati.
- Caricamento: dimensioni stabili; foto precedente visibile finché la successiva è pronta. Non caricare tutte le immagini grandi con priority.
- Swipe con alternativa visibile a pulsante, target >=48px e focus evidente. Tab WAI-ARIA con frecce, Home/End, Enter/Spazio e contenuti inattivi fuori dal percorso di tabulazione.

## Contratto responsive da implementare nel prompt 05
Geometria e input sono distinti: un tablet largo mantiene una composizione larga.
- Navigazione compatta: larghezza <1024px oppure presenza di un puntatore coarse.
- Motion immersivo con pin/intercettazione: larghezza >=1024px, puntatore fine, hover e assenza di puntatori coarse. Reduced motion lo disabilita senza cambiare navigazione.
- Dispositivi ibridi: consultazione naturale, geometria adatta alla larghezza.
Condizioni CSS/JS equivalenti e reattive; nessun pin, body lock o vuoto artificiale dopo rotazione. Il prompt 06 applica il contratto alla hero Servizi.

## Esecuzione e risparmio di contesto
Un prompt alla volta, in ordine. Leggi STATO.md per i prerequisiti e solo i file indicati. Controlla il codice attuale: adatta l'integrazione senza annullare modifiche altrui. Un percorso “nuovo” è un output previsto.
Quando l'utente avvia un prompt, le decisioni qui definite costituiscono il brief: procedi sulle scelte ordinarie, chiedi solo informazioni indispensabili. Non riaprire discovery già risolta. Skill pertinenti: impeccable per composizione, design-motion-principles in Create, responsive-craft; gsap-react/gsap-scrolltrigger solo nel prompt 06. Non caricare tutte le skill. Nessun nuovo task o subagent salvo richiesta per quel passaggio.
Non leggere tutti i prompt né riscrivere il contesto nella risposta. Ricerche solo per fatti/API mancanti. In una nuova chat nello stesso progetto bastano questo file, il prompt corrente e STATO.md.

## Verifica e consegna
I prompt UI richiedono esplicitamente QA browser locale della sola area modificata: mobile 375, tablet pertinente, desktop 1440, interazione, tastiera, reduced motion e overflow. Non ri-auditare tutto il sito a ogni passaggio. Segui LOCAL_RUNBOOK; niente Start-Process npm.cmd.

Dopo le ultime modifiche esegui una volta:
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
Dopo una correzione ripeti i controlli invalidati. Test automatici soltanto per logiche a rischio reale (hash, selezione, cleanup), non per fotografare classi CSS. Registra eventuali limiti dei tool senza dichiarare verificato ciò che non hai provato.
Controlla diff iniziale/finale, preservando anche modifiche preesistenti ai file generati. Nessun deploy, push o invio di form reale.
Aggiorna PROJECT_MEMORY.md e la sola voce corrente in STATO.md: file, contratto pubblico, verifiche, blocchi. Non cambiare AGENTS.md/runbook salvo nuova procedura reale.
Risposta breve: risultato, controlli, limite eventuale. Fermati all'accettazione: non avviare il prompt successivo.
