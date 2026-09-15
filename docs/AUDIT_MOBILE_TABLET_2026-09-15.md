# Audit mobile e tablet, 15 settembre 2026

## Ambito e metodo

- Richiesta: controllare il sito online e proporre sostituzioni delle sezioni statiche con interazioni utili. Nessun redesign implementato.
- Sito osservato: https://grossi-moto.vercel.app.
- Browser in-app con viewport responsive, non dispositivi fisici: 375x812, 768x1024, 820x1180, 1024x768.
- Mobile 375px: Home, Servizi, Gamma e Contatti. Tablet: Home a 768px; Servizi, Gamma e Contatti a 820px; Home e Servizi a 1024px landscape.
- Verificati scorrimento, rail orizzontale showroom mobile, navigazione inferiore, filtro 125cc, apertura/chiusura scheda Skytown su mobile e apertura Downtown su tablet.
- Verificati layout del form e dimensioni dei campi. Nessuna richiesta inviata, chiamata o email avviata.
- Nessun overflow orizzontale del documento nelle combinazioni misurate. Le rail interne possono scorrere intenzionalmente.
- Lint e build locali completati con esito positivo. Non equivalgono a un audit prestazionale del deployment.
- Non eseguiti test hardware touch/iOS, simulazione rete lenta, audit completo di contrasto o prova browser di reduced motion.

## Difetto prioritario osservato

### Home, 1024x768: card modelli sovrapposta alla CTA

La card flottante `27 modelli` copre parte del pulsante `Confronta la gamma`.
Misure DOM nello stato iniziale stabile:

- Card: x=48, y=481.16, larghezza=292, altezza=238.84.
- CTA: x=267.39, y=459.66, larghezza=217.11, altezza=48.
- Intersezione di circa 73x27px, confermata visivamente.

Raccomandazione: mantenere la card compatta o riposizionarla secondo altezza disponibile e input touch; non passare integralmente alla composizione desktop per la sola soglia di 1024px.

## Sezioni da riprogettare, proposte non ancora approvate

### 1. Accessori, Home

Ora: quattro articoli numerati con titolo, testo ed elenco, senza immagini. Altezza complessiva a 375px: 2129px, circa 2.6 viewport. A 768px resta una sequenza di righe e occupa 1743px.

Proposta: quattro schede fotografiche sfogliabili, ognuna con categoria, descrizione breve e due esempi. Una porzione della scheda successiva rende evidente il gesto. Selettore nominato e controlli alternativi allo swipe. Su tablet foto e contenuto affiancati oppure due schede visibili. Usare foto reali degli accessori pertinenti.

Fonte locale: `src/components/sections/AccessoriesSection.tsx:89`.

### 2. I nostri servizi, /servizi

Ora: sei blocchi sequenziali; ogni blocco ripete foto, numero, titolo, statement, testo e tre punti. La sezione occupa 5636px a 375px, circa sette viewport. Su tablet 820px ogni singolo servizio occupa circa 1140-1260px. Sotto 1024px non sono presenti il navigatore desktop e le CTA del singolo servizio.

Proposta: selettore con nomi Officina, Tagliandi, Ricambi, Finanziamenti, Permute e Consulenza; un pannello immagine/contenuto aggiornato al tap, swipe opzionale e CTA pertinente. Su tablet utilizzare due colonne all'interno del pannello. Conservare link diretti ai servizi e accessibilita dei contenuti.

Fonte locale: `src/components/sections/StickyScrollShowcase.tsx:212`, `:263`, `:349`.

### 3. Dal contatto alla riconsegna, /servizi

Ora: quattro box verticali su telefono, griglia 2x2 da 640px. L'intera sezione occupa 1160px a 375px.

Proposta: sequenza interattiva con quattro passaggi nominati e sempre riconoscibili, un pannello corrente, indicatore 01/04 e swipe avanti/indietro. Breve transizione del contenuto, senza autoplay. E' il candidato piu diretto per trasformare gli elenchi numerati richiesti dall'utente.

Fonte locale: `src/app/servizi/page.tsx:102`.

### 4. Officina, Home

Ora: titolo molto grande, descrizione, due blocchi informativi e sei lavori elencati; nessuna foto. Altezza a 375px: 1544px. Prosegue il trattamento prevalentemente testuale degli Accessori.

Proposta: foto reale del banco/officina e tre scelte: Manutenzione, Un problema da controllare, Montare un accessorio. Al tap, breve dettaglio e contatto pertinente. Evitare di ripetere un altro carosello identico agli Accessori. Rivedere anche il claim `Dopo l'acquisto resta il banco`, meno immediato del servizio concreto.

Fonte locale: `src/components/sections/WorkshopSection.tsx:45`, `:89`.

## Rifiniture di componenti esistenti

- Showroom: lo swipe mobile e gia funzionante. Le schede contengono immagine e testo ma nessun link al singolo modello; aggiungere `Scopri il modello` verso `/scooters?focus=<id>` e un indicatore/frecce. Da 768px il rail diventa griglia 2 colonne; valutare un rail coerente anche sui tablet.
- Gamma: filtro e schede espandibili funzionanti. Su mobile la scheda Skytown aperta misura circa 915px; i tre dati essenziali sono impilati in box molto alti. Compattarli per avvicinare la CTA al contenuto principale.
- Contatti: campi leggibili a 16px e alti circa 50px. Su telefono le tre grandi card iniziali allungano il percorso al form e agli orari; ridurne l'altezza. Nessuna animazione aggiuntiva necessaria.
- Tablet landscape: a 1024px scompare la tab bar e si attivano layout desktop. La hero Servizi decide il pinning al mount; la sola rotazione da portrait non ricrea necessariamente la stessa esperienza di un caricamento landscape. Quest'ultimo punto deriva dal codice e dall'osservazione del cambio viewport, non da un test fisico iPad.

## Direzione motion proposta

Fotografie piu presenti, meno ripetizioni tipografiche, interazioni differenziate per funzione. Swipe per sfogliare accessori e passaggi; selettore per consultare i servizi; aperture brevi per le esigenze di officina.

- Scroll verticale libero anche all'interno delle sezioni interattive.
- Nessun autoplay e nessun obbligo di sfogliare tutti gli elementi prima di continuare.
- Nomi e pulsanti sempre disponibili come alternativa al gesto.
- Transizioni brevi e comportamento adatto a `prefers-reduced-motion`.
- Gestione reattiva delle rotazioni e distinzione fra spazio disponibile e tipo di input.

## Chiarimento sullo stato corrente

Il codice e il sito osservato usano showroom statico sotto 1024px (rail sotto 768px, griglia tablet) e una singola immagine al posto di ZoomParallax sotto 1024px. Le precedenti note di PROJECT_MEMORY che descrivono zoom attivo su mobile/tablet rappresentano uno stato storico.
