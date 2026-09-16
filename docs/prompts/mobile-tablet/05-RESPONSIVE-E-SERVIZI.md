# Prompt 05: responsive, hero Servizi, selettore e processo

Esegui soltanto questo prompt in `C:/Progetti Exeva/Grossi Moto`. Leggi `CONTESTO.md`, `STATO.md` e, se serve un dettaglio misurato, `docs/AUDIT_MOBILE_TABLET_2026-09-15.md`. Preserva i lavori 02, 03 e 04. Questo prompt unisce le vecchie fasi input/navigazione, hero Servizi, selettore dei servizi e processo.

## Risultato
La pagina `/servizi` e il comportamento tablet/touch devono diventare coerenti:

- su telefoni e tablet touch la consultazione è naturale, senza pin o blocchi improvvisi;
- su desktop fine/hover resta la regia immersiva dove già esiste;
- i sei servizi diventano consultabili con selettore e pannello, invece di sei blocchi lunghi;
- “Dal contatto alla riconsegna” diventa una sequenza sfogliabile chiara e breve.

## File pertinenti
- `src/hooks/useMediaQuery.ts`
- eventuale nuovo `src/lib/responsive-policy.ts`
- `src/components/sections/HeroRevealStage.tsx`
- `src/components/ui/zoom-parallax.tsx`
- `src/components/layout/MobileAppNav.tsx`
- `src/components/hero/Navbar.tsx`
- `src/components/hero/BottomLeftCard.tsx`
- `src/components/hero/BottomRightCorner.tsx`
- `src/components/catalog/CatalogNavbar.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/ui/services-hero.tsx`
- `src/components/sections/StickyScrollShowcase.tsx`
- eventuali nuovi `src/components/sections/ServicesExplorer.tsx`, `src/components/sections/ServiceProcess.tsx`, `src/data/services.ts`
- `src/app/servizi/page.tsx`

Tocca solo questi file salvo necessità concreta emersa dal codice. Non creare nuove route, servizi, claim, canali di contatto o dipendenze.

## Contratto responsive
Separa tre decisioni:

- geometria: dipende dalla larghezza;
- navigazione compatta: larghezza `<1024px` oppure presenza di puntatore coarse;
- motion immersivo con pin/intercettazione: larghezza `>=1024px`, puntatore fine, hover disponibile e nessun puntatore coarse.

Reduced motion disabilita il motion immersivo senza cambiare navigazione. Un tablet largo mantiene una composizione larga, ma non deve ricevere scroll bloccati pensati per mouse/trackpad.

Sincronizza CSS, hook e padding per tab bar e safe area. Quando appare la tab bar, l'ultimo contenuto e le CTA devono restare raggiungibili; quando sparisce, non deve restare una banda vuota. Allinea anche le card assolute della Home: il padding globale non le sposta. Non duplicare due navigazioni primarie.

Cambio modalità: libera listener, pin spacer, lock, overflow modificati e posizioni artificiali senza riportare l'utente arbitrariamente a inizio pagina. SSR/hydration non devono accendere prima la versione immersiva su telefono.

Registra in `STATO.md` i nomi delle query/helper esportati.

## Hero Servizi
In `services-hero.tsx` conserva la composizione attuale: intro “Assistenza. Officina. Esperienza.” e board “Tutto in sede” con link `#service-01`...`#service-06` solo dove il motion immersivo è ammesso.

Usa `gsap.context()`, `matchMedia` o un lifecycle equivalente verificabile. Ogni ricostruzione deve eliminare soltanto timeline/trigger di questo componente e ripristinare gli stili che possiede. Non usare `killAll` o reset globali.

Sui viewport/input compatti la hero resta in flusso normale: intro e CTA leggibili, nessun pin residuo, board non focalizzabile quando nascosta. Se reduced motion cambia durante un pin, il contenuto resta raggiungibile e il body non resta bloccato.

## Sei servizi consultabili
In `StickyScrollShowcase` sostituisci i sei lunghi blocchi sui dispositivi con consultazione naturale con un selettore e un pannello corrente. Mantieni il comportamento sticky editoriale del desktop immersivo.

Usa i sei contenuti e foto esistenti: Officina, Tagliandi, Ricambi e accessori, Finanziamenti, Permute, Consulenza. Il selettore deve essere leggibile anche con nomi lunghi, senza etichette tagliate o sole cifre.

Pannello attivo: foto, titolo, descrizione breve, tre caratteristiche e CTA pertinente. Telefono impilato; tablet foto/contenuto affiancati se leggibili.

Tap: stato del tab immediato, foto in crossfade circa 260ms, testo opacity/y 8px circa 180ms. L'ultima selezione prevale sui tap rapidi. Nessuna animazione di height o salto in alto. Reduced motion e tastiera seguono il contesto comune.

Preserva `#service-01`...`#service-06`:

- caricamento diretto con hash seleziona il servizio corretto;
- i link dalla hero funzionano anche se il pannello era nascosto;
- una selezione esplicita aggiorna la cronologia, e Indietro/Avanti ripristinano il servizio;
- desktop e compatto non duplicano ID né copie focalizzabili.

Usa `tablist/tab/tabpanel` e tastiera corretti. Il contenuto deve restare disponibile nell'HTML, senza affidare SEO a fetch client.

## Processo
Trasforma soltanto “Come funziona / Dal contatto alla riconsegna.” in `/servizi`. Mantieni `page.tsx` come Server Component e i metadata; estrai un client component solo per la sezione interattiva.

Quattro passaggi: Contatto, Diagnosi, Intervento, Riconsegna. Mantieni la copy attuale accorciando ripetizioni, senza inventare tempi. Fondo scuro, linea sottile con i quattro nomi, pannello con numero corrente, titolo grande, poche righe e indice “1 di 4”.

Usa un rail nativo a pannelli larghi quanto l'area utile con snap. Durante swipe il pannello segue il dito; pulsanti nominati e precedente/successivo muovono solo il rail. Niente autoplay, loop o blocco dello scroll verticale. L'indicatore rappresenta la posizione nella spiegazione, non lavori realmente completati. Semantica di navigazione con `aria-current`, non checkbox.

## Accettazione
QA locale richiesto: 375, 820, 1024 landscape e 1440; portrait→landscape→portrait; ingresso diretto landscape; desktop mouse; coarse/ibrido quando emulabile; reduced motion dinamico.

Flussi `/servizi`: hero senza pin residui, sei tab, hash diretto `#service-04`, link dalla hero, Indietro/Avanti, quattro passaggi, CTA finale raggiungibile, tap rapidi e tastiera. Dichiara ciò che gli strumenti non possono provare.

Nessun overflow globale, duplicazione nav, headline sovrapposta alla board, pin spacer duplicato, ID duplicato o pannello inattivo focalizzabile. Esegui i controlli finali indicati in `CONTESTO.md`, aggiorna `PROJECT_MEMORY.md` e voce 05 in `STATO.md`. Fermati qui.
