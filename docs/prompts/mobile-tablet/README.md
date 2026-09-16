# Grossi Moto: prompt compatti per mobile, tablet e nuove interazioni

Pacchetto operativo ridotto dopo il completamento dei primi tre passaggi. Scritto sulla base dell'audit live del 15 settembre 2026, del codice locale e dello stato aggiornato in `STATO.md`.

## Come usarlo
Apri un prompt e copia il contenuto in una chat del progetto Grossi Moto, oppure chiedi direttamente di eseguire quel file. Procedi uno alla volta, nell'ordine indicato. Ogni prompt è più ampio della versione iniziale, ma resta abbastanza separato da poter essere gestito bene.

Esempio, pronto da copiare:
> Esegui esclusivamente il prompt C:/Progetti Exeva/Grossi Moto/docs/prompts/mobile-tablet/04-OFFICINA.md. Usa il contesto comune e lo stato richiamati nel file. Completa il suo risultato e le verifiche previste, poi fermati senza avviare altri prompt.

Per il passaggio successivo cambia solo il nome del file. Non serve avviare automaticamente nuovi task. Puoi continuare nella stessa chat finché il contesto resta chiaro, oppure usare una nuova chat nello stesso progetto: i file salvati trasmettono il contesto essenziale.

## Ordine
| Prompt | Unico risultato principale | Dipendenze |
|---|---|---|
| [01 · Asset](01-ASSET.md) | Foto pertinenti e manifest riutilizzabile | Completato |
| [02 · Hero tablet](02-HERO-TABLET.md) | Card modelli senza coprire la CTA | Già fatto dall'utente |
| [03 · Accessori](03-ACCESSORI.md) | Selezione fotografica da sfogliare nella Home | Già fatto dall'utente |
| [04 · Officina](04-OFFICINA.md) | Home Officina fotografica con tre esigenze selezionabili | 01, preservare 02–03 |
| [05 · Responsive e Servizi](05-RESPONSIVE-E-SERVIZI.md) | Policy input, hero Servizi, sei servizi e processo | Preservare 02–04 |
| [06 · Showroom, Catalogo, Contatti](06-SHOWROOM-CATALOGO-CONTATTI.md) | Tre rifiniture compatte senza redesign | 05 consigliato |
| [07 · Verifica finale](07-VERIFICA-FINALE.md) | Audit integrato dei lavori realmente completati | Passaggi eseguiti |

Il lavoro essenziale rimasto è 04 e 05. Il prompt 06 contiene rifiniture utili emerse dall'audit, ma può essere saltato se vuoi fermarti dopo Home e Servizi. Il controllo finale può verificare anche un gruppo parziale, dichiarandone chiaramente l'ambito.

## Come sono specificate le animazioni
- Accessori: foto e testo seguono il dito in un rail nativo; anticipo della scheda seguente, frecce e indicatore sincronizzato.
- Officina: selezione immediata; fotografia in dissolvenza sovrapposta, piccolo assestamento dell'immagine e testo breve. Ultimo tap sempre prevalente.
- Servizi: selettore nominativo e pannello coerente con il link diretto, senza attraversare sei blocchi lunghi.
- Processo: pagina tipografica sfogliabile, quattro tap nominati e linea che mostra la posizione nella spiegazione.
Tempi, trigger, elementi, interruzioni, immagini in caricamento e reduced motion sono dettagliati nei singoli prompt. La qualità deriva dalla regia e dalla verifica, non dal numero di effetti.

## Contesto senza ripetizioni
[CONTESTO.md](CONTESTO.md) contiene stack, identità, contratti e verifiche condivise.
[STATO.md](STATO.md) passa solo risultati e blocchi da una fase alla successiva.
[ASSET-MANIFEST.md](ASSET-MANIFEST.md) è stato prodotto da 01 e va usato per Accessori e Officina.

I prompt contengono il risultato, i file pertinenti e l'accettazione; evitano esplorazione generale e risposte lunghe. Leggere più testo costa comunque token: il beneficio cercato è ridurre ricerche, decisioni ripetute e rifacimenti. Nessuna percentuale di risparmio è garantita.

## Metodo e fonti consultate
La struttura obiettivo / contesto / vincoli / risultato verificabile segue le [best practice ufficiali di Codex](https://learn.chatgpt.com/guides/best-practices). Le [indicazioni OpenAI sui prompt orientati al risultato](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.5) supportano un ambito chiaro e condizioni di completamento, lasciando libertà sull'implementazione. Il pacchetto non richiede quel modello specifico.

La separazione del contesto e delle istruzioni usa sezioni Markdown leggibili, come descritto nella [guida al prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering). Non sono necessari ruoli teatrali, richieste di ragionamento esposto o ripetizioni enfatiche.

Per gli aspetti tecnici sono state consultate [CSS Scroll Snap, MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap), [drag in Motion](https://motion.dev/docs/react-drag) e [Tabs Pattern, W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). I tempi e le composizioni sono scelte progettuali specifiche per Grossi Moto, non regole universali tratte da quelle fonti.
