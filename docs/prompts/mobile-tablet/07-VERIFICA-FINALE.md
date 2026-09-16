# Prompt 07: verifica integrata e ultime correzioni

Esegui soltanto questo prompt in `C:/Progetti Exeva/Grossi Moto`. Leggi `CONTESTO.md`, `STATO.md` e `docs/AUDIT_MOBILE_TABLET_2026-09-15.md`. Verifica solo i passaggi effettivamente completati: non assumere che un prompt scritto sia già eseguito.

## Obiettivo
Confermare che l'esperienza completa sia coerente e priva di regressioni dopo gli interventi. Correggi difetti riproducibili nelle aree modificate, senza inventare un nuovo redesign o nuove funzionalità.

Avvia una preview locale production secondo `docs/LOCAL_RUNBOOK.md`. Il sito pubblico è un riferimento precedente, non prova del nuovo codice locale.

## Matrice essenziale
- Home, `/servizi`, `/scooters`, `/contatti` a 375x812, 820x1180, 1440x900.
- Home e `/servizi` a 1024x768 e rotazione da/verso portrait.
- Controllo mirato a 320px per testi/selettori nuovi e zoom testo 200%.
- Distingui emulazione viewport, media coarse/fine e dispositivo fisico: riporta esattamente cosa puoi provare.

## Flussi
Home: CTA hero libera; Accessori già completata; tre scelte Officina se 04 completato; sei scooter e link corretto al modello se 06 completato.

Servizi: hero senza pin residui, sei tab, hash diretto `#service-04`, link dalla hero, Indietro/Avanti, quattro passaggi e CTA finale raggiungibile se 05 completato.

Gamma: filtro, apertura/chiusura, deep link e specifiche leggibili se 06 completato.

Contatti: dati, focus e validazione senza invio reale se 06 completato.

Per tutte le interazioni nuove: tap rapido ripetuto, interruzione, resize a metà gesto, tastiera, reduced motion dinamico, immagini lente/mancanti quando simulabile.

## Qualità
Nessun overflow globale, sovrapposizione, focus nascosto, ID duplicato, pannello inattivo focalizzabile, testo tagliato o falso stato completato.

Controlla contrasto dei testi e degli stati con criteri WCAG pertinenti; target progetto 48px. Lo swipe non deve essere l'unico comando.

Osserva la fluidità con strumenti disponibili: cerca layout ripetuto per frame, blur pesanti, troppe immagini eager e listener rimasti. Non inventare FPS, Core Web Vitals o punteggi. Senza misurazione descrivi solo l'evidenza disponibile.

Verifica heading, metadata, link e disponibilità del contenuto nell'HTML, soprattutto nei pannelli Servizi.

## Consegna
Esegui lint/build dopo le ultime correzioni:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```

Ripeti solo i flussi invalidati dai fix. Crea `docs/QA-MOBILE-TABLET-IMPLEMENTAZIONE.md` con matrice breve passato/fallito/non verificabile, ambiente, prove e limiti; aggiorna `PROJECT_MEMORY.md` e voce 07.

Se restano problemi, indica file e riproduzione senza segnare il pacchetto completamente verificato. Non distribuire online.
