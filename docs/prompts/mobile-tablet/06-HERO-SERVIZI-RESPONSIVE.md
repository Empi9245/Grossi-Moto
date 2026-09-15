# Prompt 06: lifecycle responsive della hero Servizi

Esegui soltanto questo prompt in C:/Progetti Exeva/Grossi Moto. Leggi CONTESTO.md e voce 05 di STATO.md in docs/prompts/mobile-tablet. Prerequisito: policy 05 disponibile.

## Risultato e ambito
Rendi la hero di /servizi coerente alla prima apertura, dopo rotazione e dopo cambi di reduced motion. Mantieni la composizione attuale: intro “Assistenza. Officina. Esperienza.”, quindi board “Tutto in sede” solo dove il motion immersivo è ammesso.
File: src/components/ui/services-hero.tsx. Fonte del problema: compactViewport e reducedMotion sono letti al mount, quindi la sola rotazione non necessariamente ricrea la modalità giusta.
Leggi la policy prodotta da 05. Usa gsap-react/gsap-scrolltrigger per il cleanup. Non cambiare la sezione dei sei servizi, il processo o la copy della hero.

## Contratto
Quando il contesto abilita il motion immersivo, conserva la timeline a due stati e i link #service-01…#service-06. Sui viewport/input compatti la hero resta nel flusso normale, intro e CTA leggibili senza pin.
Gestisci media query con matchMedia/context o un lifecycle equivalente verificabile. Ogni ricostruzione deve eliminare soltanto timeline/trigger di questo componente e ripristinare gli stili che possiede. Non usare killAll o ripristini globali.
Ripulisci pin spacer, transform, opacity e listener quando passi a layout naturale; la board nascosta non deve avere elementi focalizzabili. Tornando desktop ricrea una sola timeline, senza perdere la posizione di scroll inutilmente.
Se la preferenza reduced motion cambia durante un pin, il contenuto deve restare raggiungibile e il body non bloccato.

## Accettazione
QA locale: apertura diretta 375/820/1024 landscape/1440; rotazioni avanti e indietro; navigazione fuori e rientro; reduced motion attivato/disattivato.
Nessuna headline sovrapposta alla board, CTA sempre accessibili, nessun pin spacer duplicato o warning di hydration.
Controlli finali e voce 06 come nel contesto. Non iniziare il selettore Servizi.
