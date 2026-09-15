# Asset Accessori e Officina — prompt 01

Data: 15 settembre 2026. **Set pronto: sette utilizzi, sette WebP**, cinque immagini generate e due crop di originali esistenti. Nessuna modifica alla UI. Nessun download esterno. I percorsi pubblici qui sotto sono definitivi per i successivi prompt 03 e 04: anteporre `public` per ottenere il percorso nel repository.

## Contratto per l'integrazione successiva

- Le immagini generate sono illustrazioni fotografiche di oggetti generici: non documentano prodotti in vendita, marchi, modelli, certificazioni o compatibilità. La foto Comfort rappresenta un bauletto; non mostra anche un parabrezza.
- Le due immagini Officina di origine ignota non provano sede, personale, attrezzature o interventi realmente eseguiti da Grossi Moto. Il trasferimento precedente da `public/da usare/` è documentato in `PROJECT_MEMORY.md`, ma non identifica autore, luogo dello scatto o licenza. Nessuna attribuzione inventata.
- Nel futuro utilizzo mantenere una nota visibile «Immagini illustrative» nelle rispettive sezioni, oltre agli alt prudenti. Non presentare questi media come foto della sede o prova di disponibilità. Questa nota è un requisito documentato per il build futuro, non una UI già implementata.
- Usare `object-fit: cover` e dimensioni/ratio riservati. `object-position` è riferito ai WebP finali, già ritagliati. Nessun ulteriore zoom: su casco e supporto smartphone mantenere il 4:5; per i tre dettagli Officina mantenere il 4:3.
- I PNG in `asset-sources/` sono master di archivio fuori da `public`, non URL da caricare nel sito. Gli originali Servizi restano nei loro percorsi: non ne sono state create copie integrali.

## Sette utilizzi pronti

| ID / utilizzo | URL pubblico | Soggetto osservato | Origine | Dimensioni / ratio | Object-position | Alt prudente | Stato |
|---|---|---|---|---|---|---|---|
| A1 · Protezione personale | `/grossimoto/accessori/protezione-personale-illustrativo.webp` | Casco integrale antracite con visiera trasparente abbassata e guanti neri in primo piano; fondo grigio caldo | Generata · imagegen, sessione corrente | 800 × 1000 · 4:5 | `50% 50%` | `Immagine illustrativa di un casco integrale e guanti da moto.` | pronto |
| A2 · Comfort urbano | `/grossimoto/accessori/comfort-urbano-illustrativo.webp` | Bauletto nero chiuso, serratura frontale e inserto rosso, visto a tre quarti | Generata · imagegen, sessione corrente | 800 × 1000 · 4:5; alternativa 4:3 | `50% 50%` anche in 4:3 | `Immagine illustrativa di un bauletto per scooter.` | pronto |
| A3 · Sicurezza e sosta | `/grossimoto/accessori/sicurezza-sosta-illustrativo.webp` | Bloccadisco scuro con perno visibile, chiave e cavo promemoria arancione a spirale | Generata · imagegen, sessione corrente | 800 × 1000 · 4:5; alternativa 4:3 | `50% 50%` anche in 4:3 | `Immagine illustrativa di un bloccadisco con chiave e cavo promemoria.` | pronto |
| A4 · Uso quotidiano | `/grossimoto/accessori/uso-quotidiano-illustrativo.webp` | Supporto con quattro appoggi, smartphone a schermo spento e morsetto su un tubo di manubrio | Generata · imagegen, sessione corrente | 800 × 1000 · 4:5 | `50% 50%` | `Immagine illustrativa di un supporto smartphone fissato a un manubrio.` | pronto |
| O1 · Manutenzione | `/grossimoto/servizi/manutenzione-dettaglio.webp` | Mani guantate con utensili presso ruota e disco freno; attrezzi e componenti sul banco | Ignota · crop di `tagliandi.png` già nel progetto | 768 × 576 · 4:3 | `50% 50%` | `Dettaglio illustrativo di un intervento sulla ruota di uno scooter.` | pronto |
| O2 · Diagnosi | `/grossimoto/servizi/diagnosi-dettaglio.webp` | Mani guantate che utilizzano uno strumento diagnostico cablato davanti ai comandi dello scooter | Ignota · crop di `officina-autorizzata.png` già nel progetto | 768 × 576 · 4:3 | `50% 50%` | `Dettaglio illustrativo di uno strumento diagnostico usato su uno scooter.` | pronto |
| O3 · Montaggio accessori | `/grossimoto/servizi/montaggio-accessori-illustrativo.webp` | Due mani guantate: una sostiene un supporto smartphone vuoto, l'altra impugna una chiave esagonale inserita nella vite di fissaggio | Generata · imagegen, sessione corrente | 1200 × 900 · 4:3 | `50% 50%` | `Immagine illustrativa del fissaggio di un supporto smartphone al manubrio.` | pronto |

## Originali, trasformazioni e peso misurato

Tutti i percorsi in questa tabella sono relativi alla radice del repository. Compressione con **Sharp già installato**, WebP qualità 82, effort 6; nessuna dipendenza aggiunta, nessun ingrandimento. I master generati sono stati copiati senza modifiche dall'output del tool; gli originali del tool sono conservati anche nella directory Codex.

| ID | Originale conservato | Dimensioni originali | Byte originale | Trasformazione applicata | Byte WebP | KiB WebP |
|---|---|---|---:|---|---:|---:|
| A1 | `docs/prompts/mobile-tablet/asset-sources/protezione-personale.png` | 1122 × 1402 | 1 949 181 | Resize cover centrato a 800 × 1000 | 40 846 | 39,9 |
| A2 | `docs/prompts/mobile-tablet/asset-sources/comfort-urbano.png` | 1122 × 1402 | 1 893 087 | Resize cover centrato a 800 × 1000 | 32 642 | 31,9 |
| A3 | `docs/prompts/mobile-tablet/asset-sources/sicurezza-sosta.png` | 1122 × 1402 | 1 864 560 | Resize cover centrato a 800 × 1000 | 48 492 | 47,4 |
| A4 | `docs/prompts/mobile-tablet/asset-sources/uso-quotidiano.png` | 1122 × 1402 | 1 743 971 | Resize cover centrato a 800 × 1000 | 39 762 | 38,8 |
| O1 | `public/grossimoto/servizi/tagliandi.png` | 928 × 1152 | 1 691 583 | Extract x=150, y=470, w=768, h=576, senza resize | 54 054 | 52,8 |
| O2 | `public/grossimoto/servizi/officina-autorizzata.png` | 928 × 1152 | 1 505 373 | Extract x=120, y=325, w=768, h=576, senza resize | 43 030 | 42,0 |
| O3 | `docs/prompts/mobile-tablet/asset-sources/montaggio-accessori.png` | 1448 × 1086 | 2 200 716 | Resize a 1200 × 900 | 92 806 | 90,6 |

Peso complessivo dei sette asset pubblici: **351 632 byte / 343,4 KiB**. Quattro Accessori: 161 742 byte; tre Officina: 189 890 byte. I due derivati da originali esistenti evitano di caricare PNG da circa 1,5–1,7 MB e fissano il crop: non sono duplicati integrali inutili.

### Crop alternativi verificati

- A2 e A3: stesso file, contenitore 4:3 e `object-position: 50% 50%`. Equivale al rettangolo x=0, y=200, w=800, h=600 sul WebP. Bauletto intero; bloccadisco, chiave e cavo interi. Nessun file pubblico aggiuntivo.
- A1 e A4: mantenere 4:5 per conservare casco/guanti e l'intero gruppo telefono/morsetto. Nessuna variante 4:3 dichiarata pronta.
- O1 e O2: 4:3 verificato con volto escluso, gesto e dettaglio tecnico leggibili. Lo strumento distingue Diagnosi dalla ruota di Manutenzione. Non usare questi crop come istruzioni tecniche o certificazione del lavoro rappresentato.
- O3: 4:3 conserva supporto, guanti e chiave. Nessuna variante 3:2 necessaria: rischierebbe di tagliare gli appoggi superiori del supporto.

## Candidati esaminati e decisioni

| Candidato | Osservazione diretta / evidenza | Esito |
|---|---|---|
| `public/grossimoto/servizi/tagliandi.png` | 928 × 1152; persona con utensili sulla ruota anteriore di uno scooter, ambiente officina; origine fotografica non verificata | Riutilizzato per O1 con crop del gesto, senza attribuzione alla sede |
| `public/grossimoto/servizi/officina-autorizzata.png` | 928 × 1152; persona con strumento diagnostico e cavo presso i comandi di uno scooter; origine fotografica non verificata | Riutilizzato per O2 con crop dello strumento, senza dedurre autorizzazioni dal nome del file |
| `public/grossimoto/servizi/ricambi-originali.png` | 928 × 1152, 1 695 516 byte; filtri, cinghia, pastiglie e altri componenti su un vassoio, mano che indica una pastiglia, scooter sul fondo | Non selezionato: non mostra il montaggio di un accessorio; non dimostra originalità dei ricambi |
| `public/grossimoto/servizi/consulenza.png` | 928 × 1152, 1 484 279 byte; due persone accanto/sopra uno scooter in un ambiente espositivo | Non selezionato: non mostra casco, bauletto, antifurto, supporto smartphone o un montaggio |
| `public/kymco-all/sections/skytown-125-inline-img-logo-parabrezza-incluso-e1599486552185.jpg` | 1336 × 1618, 854 830 byte; visto: sagoma grafica grigia di parabrezza con testo «PARABREZZA INCLUSO», non una fotografia di dettaglio | Non selezionato. Origine URL KYMCO tracciata nel manifest locale; il claim incluso non va trasferito a questa sezione |
| Riferimenti `Bauletto-Incluso.png` nel manifest KYMCO | Il manifest li elenca tra gli scarti per dimensioni 193 × 264, senza asset locale pronto; non ispezionati visivamente e non giudicati dal nome | Nessun download o uso. Creato un bauletto illustrativo pertinente |

Ricerca limitata ai quattro candidati espliciti e ai riferimenti semantici pertinenti di `public/kymco-all/manifest.json`; nessuna scansione indiscriminata delle 500 immagini. Per il bollino parabrezza, il manifest registra `originalImageUrl` e `sourcePageUrl`: non è stata svolta una nuova verifica online dei diritti e il file non entra nel set.

## Verifiche e tracciabilità

- Visti tutti e quattro i candidati Servizi, il bollino KYMCO, i cinque output imagegen e tutti i sette WebP finali nella tavola a 300 px; i due crop da originali esistenti sono stati ispezionati anche a dimensione nativa.
- [Tavola 300 px](asset-sources/qa-300px.webp): riga alta A1, A2, A3, A4 a 300 × 375; riga bassa O3, O1, O2 a 300 × 225. Soggetti distinguibili, dettagli funzionali leggibili e sfondi Accessori coerenti; nessun artefatto di compressione evidente a questa dimensione.
- [Alternative 4:3](asset-sources/qa-alternative-4x3.webp): A2 e A3 a 300 × 225, ispezionate. Le tavole sono prove di crop degli asset, non screenshot o test della UI.
- [Report dei file](asset-sources/verification.json): dimensioni, byte reali, crop e SHA-256 di master e derivati. Decodifica completa riuscita per tutti e sette i WebP; percorsi esistenti e ratio verificati.
- [Prompt esatti di generazione](asset-sources/generation-prompts.json): cinque chiamate indipendenti al tool integrato `image_gen.imagegen`, modalità generate, senza immagini di riferimento e senza fallback CLI.
- Limite noto: origine delle due immagini Servizi ignota; utilizzabili solo come media illustrativi, non prova della sede. Non sono rimaste risorse mancanti per questi sette utilizzi.
- Nessun codice o UI cambiato, nessun browser, build, lint, deploy o prompt successivo avviato: passaggio limitato ad asset e documentazione, come richiesto.
