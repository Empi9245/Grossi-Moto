# Confronto e showroom con movimento ridotto

> Rettifica successiva del 21 ottobre: l'utente ha rifiutato `ManualShowcase`. Il componente non è più montato; con movimento ridotto si usano le grandi card originali in scorrimento naturale. Confronto e dati tecnici di questo blocco restano invariati. La decisione corrente e le verifiche sono documentate in apertura di `HOME_OFFICINA_CONTATTI_2026-10-21.md`; le descrizioni di `ManualShowcase` sotto sono storiche.

Risultato locale del 21 ottobre 2026. Un solo agente. Perimetro: confronto, etichette dello showroom e composizione con movimento ridotto. Preservate le modifiche locali precedenti a hero, schede, navigazione e Servizi. Nessun commit, push o deploy.

## Comportamento consegnato

- Confronto con selezione esplicita di 2–3 modelli: reducer, conservazione degli ID nei filtri, aggiunta, rimozione, chiusura e reset conservati. Nessuna selezione automatica dallo showroom.
- Testata mobile su due righe di controlli: titolo/conteggio e Modifica; selettore del terzo modello e Svuota. La toolbar compatta dei filtri non copre la tabella aperta. Foto più contenute, nomi completi, tabella a due colonne modello entro la larghezza del telefono; tre modelli in una regione a scorrimento orizzontale con intestazioni di riga fisse.
- Quattro dati tecnici: altezza sella, massa in ordine di marcia, frenata e sottosella. Le righe con almeno due valori verificati diversi precedono le righe condivise; un dato mancante non viene interpretato come differenza, zero o dotazione assente. Nessuna graduatoria di sicurezza o di qualità.
- La classe commerciale già presente nel catalogo rimane nelle intestazioni, esplicitamente come «Classe». Non viene presentata come misura della cilindrata effettiva: per esempio la denominazione Downtown 350 non autorizza a sostituire i 321 cc della scheda ufficiale con 350 cc tecnici.
- Versione e PDF ufficiale sono riportati per colonna. «Non verificato» resta visibile per le altre versioni. Dati tecnici separati dal gruppo «Consigli editoriali»: impostazione/tragitti già presenti e un solo suggerimento pratico. Per i tre modelli documentati il consiglio è specifico al casco o alle manovre, senza inventare prove su strada.
- «Confronta modelli» nello showroom desktop diventa «Scopri il modello», conservando `/scooters?focus=<id>` e la transizione esistente. Stessa etichetta sulla card mobile. L'ingresso nel confronto rimane esclusivamente nel catalogo.
- `ManualShowcase` viene montato solo quando il browser richiede movimento ridotto. Foto grande originale, superficie e colori del modello, titolo, dati e comandi manuali per tutti i sei mezzi. Pulsanti con nome completo accessibile e stato `aria-pressed`, annuncio del nome attivo, Precedente/Successivo e collegamento al modello.
- Nessun timer, pinning, listener wheel/touch o morph nella nuova composizione. Altezza riservata a immagine, nome, descrizione e statistiche: cambiare modello non sposta i comandi. Il titolo mobile lascia spazio a Chiama; focus nero visibile anche sul pulsante selezionato.
- In modalità normale sono conservati showroom desktop pinned, stack animato del telefono e composizione tablet esistente. Rimangono asset, transizioni, modelli, colori e handoff della hero già approvati.

## Fonti e limite della ricerca

Ricerca limitata a tre modelli già presenti, senza estenderla alla gamma. Consultati il testo delle schede ufficiali KYMCO e le corrispondenti pagine prodotto il 21 ottobre 2026. Nessun dato trasferito da versioni omonime, altri mercati o nuove omologazioni. Le versioni documentate non attestano l'allestimento effettivamente disponibile in sede.

| Versione della fonte | Sella | Massa in ordine di marcia | Frenata | Sottosella dichiarato |
| --- | --- | --- | --- | --- |
| People S 125i ABS Euro 5 | 800 mm | 130 kg | ABS a doppio canale | 1 casco integrale |
| Agility S 125 Euro 5 | 805 mm | 134 kg | CBS | 1 casco jet |
| Downtown 350i GT Euro 5+ | 780 mm | 185 kg | ABS a doppio canale | 2 caschi integrali |

- People S: [scheda tecnica ufficiale PDF](https://kymco.it/media/schede/allegati/PEOPLE%20S%20125i%20ABS%20E5/scheda.pdf), [pagina prodotto](https://kymco.it/Prodotti/_p125-s-p/).
- Agility S: [scheda tecnica ufficiale PDF](https://kymco.it/media/schede/allegati/AGILITY%20S%20125i%20E5/scheda.pdf), [pagina prodotto](https://kymco.it/Prodotti/_a125sp/).
- Downtown GT: [scheda tecnica ufficiale PDF](https://kymco.it/media/schede/allegati/DOWNTOWN%20350i%20GT/scheda.pdf), [pagina prodotto](https://kymco.it/Prodotti/_dt350gt/).

URL, versione e data di verifica sono in `src/data/catalog-comparison-specs.ts`, insieme a un registro editoriale distinto. La massa è sempre in ordine di marcia, mai mescolata a peso a secco. La capienza dichiarata richiede una prova con il proprio casco. Prezzo, disponibilità e altre dotazioni non sono stati aggiunti. Le restanti 24 schede non hanno ricevuto nuove misure: sono vuoti intenzionalmente riconoscibili.

## Verifiche

- **17 test pertinenti superati**: 8 selezione/confronto esistenti, 6 guida esistenti, 3 nuove regressioni per ordinamento delle differenze, conservazione dell'ordine delle colonne, dati mancanti e ricalcolo aggiungendo il terzo modello. Nessun nuovo test per semplici testi o stile.
- **Lint finale superato** nel workspace. **Build finale superata** sulla copia isolata dei sorgenti, con TypeScript e 38 pagine; ID `7aqXJD-Wru2fAJZXtqwkf`. Il primo tentativo senza accesso al font e alle junction è stato invalidato; non era un errore applicativo. Nessuna dipendenza o configurazione applicativa cambiata.
- Copia e server dedicati in `qa-screenshots/comparison-showroom-2026-10-21/production`, porta 3212, secondo il runbook già presente. Confronto SHA-256 dei **79 file sorgente: zero differenze** rispetto al workspace finale (`source-hashes.json`).
- **Sei scenari Chrome superati**, a 375×812, 820×1180 e 1440×900, ciascuno normale/ridotto: ingresso e selezione da tastiera, due e tre modelli, limite di tre, ricerca, zero risultati, filtro marca e reset filtri con ID conservati, aggiunta, rimozione 3→2 e 2→1, focus ripristinato, modifica e svuotamento.
- Verificati regione/tabella semantiche, scorrimento orizzontale anche da tastiera, assenza di overflow globale, valori mancanti, link alle fonti e separazione editoriale. I nomi non sono troncati. Confronto mobile finale People S/Agility S: prima riga tecnica a circa **386 px dall'inizio del pannello**. L'audit precedente a 390 px non è un benchmark alla stessa larghezza.
- Showroom: tutti i sei pulsanti e Precedente/Successivo da tastiera, altezza stabile a ogni cambio, nessun salto applicativo di scroll, assenza di avanzamento dopo oltre sei secondi di attesa, wheel libero. I collegamenti arrivano alla card corretta e non selezionano mezzi per il confronto. Controllato il cambio live della preferenza e il ritorno alla composizione originale.
- Corrette durante QA l'altezza variabile delle statistiche, il colore di hover della selezione e la collisione mobile del titolo con Chiama. Ripetuti lint/build e i controlli pertinenti dopo le correzioni. Verifica finale dedicata di caricamento delle **sei foto**, focus e altezze a tre larghezze; dopo il solo aggiustamento del titolo mobile ripetuto il telefono, conservati tablet e desktop invariati.
- Dopo l'aggiunta della dicitura Classe, controllo mirato finale delle intestazioni a tutte e tre le larghezze con People S e Filly 50, attesa del caricamento delle foto e conferma che il dato non verificato non diventa una differenza. Conservati gli altri esiti funzionali rimasti applicabili.
- Nessun errore JavaScript o di risorse Next nei sei scenari. Windows non è stato modificato: entrambe le preferenze sono emulate dal browser.

Prove e script locali nella cartella `qa-screenshots/comparison-showroom-2026-10-21/`: `results.json`, `final-manual.json`, `final-header.json`, `verify.mjs`, `final-manual.mjs`, `final-header.mjs` e screenshot nominati per dimensione/modo. Le immagini `*-failure.png` sono tentativi precedenti, non gli esiti finali.

## Taste e Scrollcraft

Taste applicato come intervento su superfici esistenti: nessun nuovo draw o rifacimento della direzione; priorità al mezzo, dati ravvicinati, azioni meno ripetitive, stato mancante onesto, controlli leggibili. Lint Taste mirato su `ManualShowcase` e sul confronto in modalità app: **nessun finding**. Verifica visuale con screenshot mirati; non è stato ripetuto l'inspector globale su pagine estranee al blocco e non si dichiara l'intero sito privo di segnalazioni Taste. Superfici cromatiche preesistenti conservate.

Scrollcraft applicato alla continuità del momento showroom: lo stesso mezzo resta il protagonista anche senza movimento; il percorso ridotto non richiede di consumare sei schermate pinned per vedere la gamma. Nessun nuovo asset, scena o effetto aggiunto.

```text
ROUND finale, sole superfici modificate
Seen in one second: il mezzo grande; nel confronto i dati prima dei consigli.
Idea (one sentence): scegliere in Grossi Moto guardando il mezzo e verificando differenze concrete.
Live thing: selezione esplicita nel confronto; scelta manuale dei sei modelli con movimento ridotto.
Layout words by section: confronto=tabella compatta / showroom=product stage stabile.
Scores: design 7.5 · usability 8 · creativity 7 · content 7.5 → overall 7.6.
Caps applied: nessuno sulle superfici finali; valutazione editoriale soggettiva, non metrica tecnica.
Top three observations:
1. Tre colonne modello su telefono richiedono scorrimento laterale intenzionale; regione focalizzabile e intestazione fissa conservate.
2. Il nome completo della massa occupa più righe nel telefono; resta leggibile senza abbreviazioni ambigue.
3. I campi non verificati restano espliciti; estenderli richiede un futuro incarico di ricerca, non stime.
```

## Limiti e risultati conservati

Queste sono prove di Chrome con viewport, touch e movimento emulati, non prove su telefono/tablet fisico o Safari. Nessun test con screen reader fisico, nessuna misura nuova di Core Web Vitals/FPS e nessuna verifica pubblica o di disponibilità in concessionaria. Conservati gli esiti già documentati per hero, schede compatte, pagine modello, Servizi e ricerca: le relative implementazioni non sono state modificate in questo blocco. Non vengono rivendicati nuovi controlli completi su quelle aree.
