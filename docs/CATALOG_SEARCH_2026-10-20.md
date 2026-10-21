# Ricerca catalogo — 20 ottobre 2026

La logica condivisa di ricerca, filtri e conteggi è in `src/lib/catalog-search.ts`, usata da CatalogPage e dai test sul dataset reale. Non sono cambiati grafica, asset, animazioni, ordine dei risultati, gestione delle schede o stato del confronto.

## Criterio

- La query viene normalizzata senza distinzione tra maiuscole e minuscole o accenti. Punteggiatura, trattini, slash e spazi separano i termini; l'ordine dei termini è libero e tutti devono trovare corrispondenza.
- Le parole senza numeri mantengono la ricerca per sottostringa nei campi già indicizzati, comprese le descrizioni: `agil` trova i tre Agility e `città` equivale a `citta`.
- Numeri e sigle vengono cercati solo in nome, nome breve e cilindrata. I numeri richiedono una sequenza numerica intera: `50` non trova `350`, `12` non trova `125`. Un numero può appartenere a una sigla reale, per esempio `575` in `AK575`.
- Le sigle alfanumeriche richiedono un termine completo: `SR1` trova Sfida SR1 e SR1 ADV, senza SR16; `R16` trova Agility 50 R16 Plus, senza SR16. Restano validi `AK575`, `900DSX`, `800DSX`, `250ST` e le forme separate `AK 575` / `900 DSX`.
- I riferimenti editoriali ad altri numeri non identificano il prodotto: People S 200 cita «125» nella descrizione, ma non compare cercando `125`. La ricerca numerica non interpreta intervalli o categorie come cilindrata esatta; il filtro dedicato conserva le fasce esistenti.
- Ricerca, marca, tipo, fascia di cilindrata e utilizzo si combinano in AND. Risultati e conteggi delle opzioni usano la stessa funzione. Azzerare i filtri conserva la query; cancellare la ricerca conserva i filtri. Query vuota o composta solo da separatori non restringe i risultati.

## Risultati attesi verificati

| Query | Risultati |
| --- | --- |
| Agility 50 | Agility 50 R16 Plus |
| Agility 350 | Agility 350 |
| 125 / 125cc / 125 cc | I 9 modelli 125 cc |
| 125 + marca Voge | Sfida SR1, Sfida SR1 ADV, Sfida SR16 125 |
| SR1 | Sfida SR1, Sfida SR1 ADV |
| AK575 / AK 575 | AK575 Premium |
| 900DSX / 900 DSX | Valico 900DSX |
| Agility 50 + marca Voge | Nessun risultato; azzerare i filtri recupera Agility 50 |

## Verifica

- Aggiunti 8 test mirati in `tests/catalog-search.test.mjs`: risultati espliciti, normalizzazione, sigle, recuperabilità di tutti i 27 nomi e nomi brevi, combinazioni con filtri/utilizzo, conteggi, query vuota e recupero dallo stato senza risultati.
- Suite locale: 39/39 test superati. Comando: `node --test tests/*.test.mjs` con il Node installato in questo workspace.
- Lint e build production eseguiti con `C:\Program Files\nodejs\npm.cmd`: superati; build con TypeScript e 38 pagine. Nessuna dipendenza aggiunta.
- QA browser in-app sulla build production locale, porta 3300, desktop 1440×1000 e mobile 375×812: Agility 50, Agility 350, 125 e sigle reali; apertura scheda, filtri, stato vuoto, reset e cancellazione query. Selezionati Agility 50 e Agility 350 per il confronto, poi cambiata la ricerca fino a zero risultati: entrambe le selezioni conservate su desktop e mobile; tabella aperta correttamente su desktop. Cancellando la query mobile tornano 27 modelli e il confronto conserva i due scelti.
- Nessun overflow globale alle dimensioni provate; nessun warning/errore JavaScript rilevato nei log consultati. Nessuna modifica o nuova verifica specifica delle animazioni reduced-motion; nessun dispositivo fisico o Safari verificato.
- Evidenze locali ignorate da Git: `qa-screenshots/catalog-search-2026-10-20/` (risultati JSON e screenshot desktop/mobile) e `qa-screenshots/catalog-search-tests-2026-10-20.log`.

Intervento locale: nessun commit, push o deploy. Modifiche preesistenti e lavori contemporanei preservati.
