import { catalogScooters, type CatalogScooter } from "./catalog-scooters";

export type CatalogUseCase = "city" | "commute" | "touring";

export const catalogUseCases: {
  id: CatalogUseCase;
  label: string;
  description: string;
}[] = [
  {
    id: "city",
    label: "Città ogni giorno",
    description: "Traffico, quartieri e spostamenti urbani.",
  },
  {
    id: "commute",
    label: "Casa e lavoro",
    description: "Percorsi quotidiani estesi e attenzione al comfort.",
  },
  {
    id: "touring",
    label: "Gite e viaggi",
    description: "Weekend fuori città e modelli con vocazione touring.",
  },
];

export type CatalogGuidance = {
  useCases: CatalogUseCase[];
  whyChoose: string;
  tradeoff: string;
  checkInStore: string;
};

type ModelGuidance = CatalogGuidance & {
  alternatives: { id: string; reason: string }[];
};

// Editorial guidance derives only from each model's positioning, idealUse,
// family and specs in catalog-scooters.ts. These are usage suggestions,
// not verified technical measurements or statements of legal eligibility.
const guidanceById: Record<string, ModelGuidance> = {
  "dtx-360-350": {
    useCases: ["city", "commute", "touring"],
    whyChoose:
      "Se alterni Roma, raccordo e gite fuori porta, abbina un'impostazione crossover a posizione alta e protezione.",
    tradeoff:
      "La posizione alta è parte della sua impostazione: prima di sceglierlo valuta come ti trovi nelle soste e nelle manovre da fermo.",
    checkInStore:
      "Prova l'appoggio dei piedi e la posizione al manubrio; confrontali con quelli di un GT.",
    alternatives: [
      {
        id: "voge-sfida-sr2-adv",
        reason:
          "Resta nel mondo crossover con una cilindrata di 250cc e un orientamento a città e raccordo.",
      },
      {
        id: "downtown-350-gt",
        reason:
          "Mantiene i 350cc, ma passa dall'assetto crossover a un GT compatto per i trasferimenti lunghi.",
      },
    ],
  },
  "downtown-350-gt": {
    useCases: ["commute", "touring"],
    whyChoose:
      "Se il tragitto quotidiano comprende trasferimenti lunghi, offre un'impostazione GT compatta orientata al comfort.",
    tradeoff:
      "La sua vocazione è il lungo raggio urbano: se fai soprattutto brevi spostamenti, confronta anche un modello dedicato alla città.",
    checkInStore:
      "Siediti in posizione di guida e valuta lo spazio per le gambe rispetto al tuo tragitto abituale.",
    alternatives: [
      {
        id: "voge-sfida-sr3",
        reason:
          "Un altro GT compatto da commuting, nella cilindrata di 300cc anziché 350cc.",
      },
      {
        id: "agility-350",
        reason:
          "Stessa cilindrata di catalogo, ma impostazione a ruote alte per città e pendolarismo.",
      },
    ],
  },
  "agility-350": {
    useCases: ["city", "commute"],
    whyChoose:
      "Se i tuoi percorsi urbani cambiano spesso, unisce ruote alte e cilindrata di 350cc con un orientamento al pendolarismo.",
    tradeoff:
      "Punta sull'uso urbano; se cerchi soprattutto protezione e postura da viaggio, vale la pena confrontarlo con un GT.",
    checkInStore:
      "Valuta la posizione di guida e le manovre da fermo, poi confronta la seduta con Downtown 350 GT.",
    alternatives: [
      {
        id: "voge-sfida-sr16-200",
        reason:
          "Conserva le ruote alte e l'uso da commuting, con cilindrata intermedia di 200cc.",
      },
      {
        id: "downtown-350-gt",
        reason:
          "A parità di 350cc, sposta l'attenzione dalle ruote alte al comfort di un GT compatto.",
      },
    ],
  },
  "x-town-300": {
    useCases: ["commute", "touring"],
    whyChoose:
      "Se cerchi un mezzo per lavoro e weekend, mette al centro spazio, protezione e una posizione rilassata.",
    tradeoff:
      "La priorità è il comfort: confronta la sua impostazione touring con un urbano compatto se percorri solo brevi tratti nel traffico.",
    checkInStore:
      "Verifica lo spazio per gambe e oggetti che porti ogni giorno, senza dare per scontata la capacità dei vani.",
    alternatives: [
      {
        id: "x-town-250st",
        reason:
          "Stessa famiglia touring, con 250cc e una vocazione più concentrata sul comfort quotidiano.",
      },
      {
        id: "voge-sfida-sr4-max",
        reason:
          "Una proposta da 350cc orientata a comfort e protezione per tangenziale e weekend.",
      },
    ],
  },
  "skytown-125": {
    useCases: ["city"],
    whyChoose:
      "Se vuoi un 125 per muoverti ogni giorno in città, la sua proposta mette al centro semplicità di gestione e concretezza.",
    tradeoff:
      "È orientato alla città; per tragitti quotidiani lunghi confronta anche modelli con una vocazione esplicita al commuting.",
    checkInStore:
      "Controlla appoggio dei piedi, accesso alla seduta e facilità delle manovre da fermo.",
    alternatives: [
      {
        id: "voge-sfida-sr1",
        reason:
          "Stessa cilindrata e uso urbano, con una proposta compatta dal carattere più maturo.",
      },
      {
        id: "people-s-125-abs",
        reason:
          "Resta sui 125cc ma introduce l'impostazione a ruote alte per città e pavé.",
      },
    ],
  },
  "ak575-premium": {
    useCases: ["touring"],
    whyChoose:
      "Se cerchi uno scooter con vocazione da lungo raggio e carattere sportivo, è la proposta maxi da 575cc del catalogo.",
    tradeoff:
      "Il suo orientamento è il touring sportivo; se prevalgono casa e lavoro, valuta anche un GT compatto.",
    checkInStore:
      "Valuta la postura di guida e la gestione da fermo in relazione ai tuoi spostamenti abituali.",
    alternatives: [
      {
        id: "xciting-vs-400",
        reason:
          "Mantiene la vocazione sport touring con 400cc e un uso che comprende raccordo e weekend.",
      },
      {
        id: "voge-sfida-sr4-max",
        reason:
          "Sposta l'attenzione dal carattere sportivo al comfort di un maxi scooter da 350cc.",
      },
    ],
  },
  "xciting-vs-400": {
    useCases: ["commute", "touring"],
    whyChoose:
      "Se percorri tangenziale o raccordo e vuoi partire anche nel weekend, abbina protezione e impostazione sport touring.",
    tradeoff:
      "Il carattere sport-tourer è centrale: confronta la posizione con un GT se il comfort quotidiano è la tua prima priorità.",
    checkInStore:
      "Confronta seduta e posizione al manubrio con Downtown 350 GT, pensando alla durata dei tuoi tragitti.",
    alternatives: [
      {
        id: "ak575-premium",
        reason:
          "Resta nella famiglia Sport, salendo a 575cc con un orientamento più esplicito al lungo raggio.",
      },
      {
        id: "downtown-350-gt",
        reason:
          "Un'alternativa GT da 350cc per privilegiare il comfort nei trasferimenti quotidiani lunghi.",
      },
    ],
  },
  "voge-valico-800rally": {
    useCases: ["touring"],
    whyChoose:
      "Se ai viaggi fuori porta affianchi sterrati leggeri, la sua impostazione adventure rally è coerente con questo uso.",
    tradeoff:
      "La vocazione rally va valutata sul percorso reale: se resti sempre su strada, confrontala con le altre Valico da viaggio.",
    checkInStore:
      "Verifica postura, appoggio a terra e gestione da fermo; descrivi i fondi che intendi affrontare.",
    alternatives: [
      {
        id: "voge-valico-900dsx",
        reason:
          "Una maxi adventure da 900cc con orientamento al touring a lungo raggio.",
      },
      {
        id: "voge-valico-625dsx",
        reason:
          "Un'adventure media da 625cc che affianca ai weekend gli spostamenti quotidiani.",
      },
    ],
  },
  "voge-valico-625dsx": {
    useCases: ["commute", "touring"],
    whyChoose:
      "Se vuoi una moto da usare sia ogni giorno sia nei weekend, propone taglia media e protezione per percorrenze lunghe.",
    tradeoff:
      "È un'adventure da uso misto quotidiano e viaggio; se cerchi soprattutto lungo raggio, confronta anche la proposta maxi.",
    checkInStore:
      "Valuta posizione di guida e manovre da fermo in rapporto al parcheggio e ai percorsi di tutti i giorni.",
    alternatives: [
      {
        id: "voge-valico-900dsx",
        reason:
          "Porta l'impostazione adventure verso la taglia maxi e il touring a lungo raggio.",
      },
      {
        id: "voge-valico-800rally",
        reason:
          "Aggiunge una vocazione rally per chi prevede anche sterrato leggero.",
      },
    ],
  },
  "voge-valico-900dsx": {
    useCases: ["touring"],
    whyChoose:
      "Se il viaggio è al centro della scelta, è la maxi adventure da 900cc con postura protettiva e vocazione da lungo raggio.",
    tradeoff:
      "La taglia maxi richiede una valutazione personale della gestione da fermo, soprattutto se alterni il viaggio a soste frequenti.",
    checkInStore:
      "Verifica appoggio a terra, posizione al manubrio e facilità delle manovre prima di scegliere la taglia maxi.",
    alternatives: [
      {
        id: "voge-valico-625dsx",
        reason:
          "Un'adventure di taglia media, pensata anche per commuting esteso e weekend.",
      },
      {
        id: "voge-valico-800rally",
        reason:
          "L'alternativa da 800cc con impostazione rally e uso dichiarato anche su sterrato leggero.",
      },
    ],
  },
  "voge-sfida-sr1": {
    useCases: ["city"],
    whyChoose:
      "Se cerchi un 125 compatto per la città quotidiana, abbina una taglia accessibile a una presenza più matura.",
    tradeoff:
      "L'uso di riferimento è urbano; per pavimentazioni irregolari valuta anche una proposta a ruote alte.",
    checkInStore:
      "Confronta la seduta e l'accesso a bordo con Skytown 125 e Sfida SR16 125.",
    alternatives: [
      {
        id: "skytown-125",
        reason:
          "Un 125 urbano KYMCO che mette al centro semplicità e uso quotidiano.",
      },
      {
        id: "voge-sfida-sr1-adv",
        reason:
          "Mantiene i 125cc e porta la proposta SR1 verso una postura orientata ai fondi misti.",
      },
    ],
  },
  "voge-sfida-sr1-adv": {
    useCases: ["city"],
    whyChoose:
      "Se in città incontri fondi diversi, offre la variante Urban ADV dello SR1 con una postura pensata per questo impiego.",
    tradeoff:
      "Resta un 125 urbano: la sigla ADV non equivale, da sola, a una raccomandazione per viaggi o fuoristrada impegnativo.",
    checkInStore:
      "Valuta appoggio a terra e posizione di guida rispetto allo SR1, descrivendo le strade che percorri.",
    alternatives: [
      {
        id: "voge-sfida-sr1",
        reason:
          "Stessa cilindrata, con un'impostazione compatta dedicata alla città quotidiana.",
      },
      {
        id: "voge-sfida-sr16-125",
        reason:
          "Un'altra proposta urbana da 125cc, a ruote alte e orientata alle pavimentazioni irregolari.",
      },
    ],
  },
  "voge-sfida-sr2-adv": {
    useCases: ["city", "commute"],
    whyChoose:
      "Se alterni città e tragitti estesi, propone posizione alta e protezione in una cilindrata intermedia di 250cc.",
    tradeoff:
      "La posizione alta merita una prova di ergonomia; confrontala con una seduta touring se cerchi soprattutto una postura rilassata.",
    checkInStore:
      "Verifica appoggio dei piedi e comodità della posizione, poi confrontali con X-Town 250ST.",
    alternatives: [
      {
        id: "dtx-360-350",
        reason:
          "Resta crossover, con 350cc e un uso che comprende anche le gite fuori porta.",
      },
      {
        id: "x-town-250st",
        reason:
          "Mantiene i 250cc ma sceglie un'impostazione touring orientata al comfort quotidiano.",
      },
    ],
  },
  "voge-sfida-sr16-125": {
    useCases: ["city"],
    whyChoose:
      "Se cerchi un 125 per città e pavimentazioni irregolari, la proposta a ruote alte mette al centro praticità e mobilità urbana.",
    tradeoff:
      "Il suo orientamento è urbano; nella stessa famiglia, il 200 è descritto per città estesa e commuting.",
    checkInStore:
      "Confronta la posizione di guida con il 200 e valuta quale proposta corrisponde ai tuoi tragitti reali.",
    alternatives: [
      {
        id: "people-s-125-abs",
        reason:
          "Stessa cilindrata e ruote alte, con una proposta KYMCO per città e pavé.",
      },
      {
        id: "voge-sfida-sr16-200",
        reason:
          "Conserva le ruote alte con 200cc e un orientamento alla città estesa.",
      },
    ],
  },
  "voge-sfida-sr16-200": {
    useCases: ["city", "commute"],
    whyChoose:
      "Se i tuoi spostamenti attraversano una città estesa, combina ruote alte e cilindrata intermedia di 200cc.",
    tradeoff:
      "È orientato alla mobilità urbana e al commuting; per privilegiare la protezione confronta anche un GT.",
    checkInStore:
      "Valuta seduta e posizione al manubrio, poi confrontale con un modello GT per il tuo percorso casa-lavoro.",
    alternatives: [
      {
        id: "people-s-200",
        reason:
          "Un'alternativa KYMCO con la stessa cilindrata e impostazione a ruote alte.",
      },
      {
        id: "voge-sfida-sr3",
        reason:
          "Passa a un GT compatto da 300cc orientato alla protezione sui percorsi quotidiani lunghi.",
      },
    ],
  },
  "voge-sfida-sr3": {
    useCases: ["commute"],
    whyChoose:
      "Se il tragitto casa-lavoro è lungo, il GT compatto da 300cc è descritto per commuting e protezione.",
    tradeoff:
      "La sua priorità è il percorso quotidiano; se prevedi spesso weekend fuori città, confronta anche SR4 MAX.",
    checkInStore:
      "Valuta la posizione delle gambe e la seduta pensando al tempo che passi ogni giorno alla guida.",
    alternatives: [
      {
        id: "downtown-350-gt",
        reason:
          "Un altro GT compatto per trasferimenti lunghi, con cilindrata di 350cc.",
      },
      {
        id: "voge-sfida-sr4-max",
        reason:
          "Passa da GT compatto a maxi scooter da 350cc, orientato a comfort e weekend.",
      },
    ],
  },
  "voge-sfida-sr4-max": {
    useCases: ["commute", "touring"],
    whyChoose:
      "Se alterni tangenziale e weekend, mette al centro comfort, protezione e percorrenze lunghe in una proposta maxi scooter.",
    tradeoff:
      "L'impostazione maxi privilegia questi usi: confronta un GT compatto se il tuo riferimento è soprattutto il tragitto quotidiano.",
    checkInStore:
      "Confronta seduta e gestione da fermo con SR3, valutando anche lo spazio che ti serve ogni giorno.",
    alternatives: [
      {
        id: "x-town-300",
        reason:
          "Una proposta touring da 300cc per casa, lavoro e weekend, con posizione rilassata.",
      },
      {
        id: "voge-sfida-sr3",
        reason:
          "Un GT compatto da 300cc con una vocazione più concentrata sul commuting.",
      },
    ],
  },
  "agility-50-r16-plus": {
    useCases: ["city"],
    whyChoose:
      "Se cerchi un ciclomotore per i primi spostamenti in città, propone semplicità di gestione e impostazione a ruote alte.",
    tradeoff:
      "È pensato per i primi tragitti urbani: se le tue esigenze comprendono percorsi estesi, parti dal tragitto prima di scegliere la cilindrata.",
    checkInStore:
      "Prova accesso alla seduta, appoggio a terra e manovre da fermo confrontandolo con Filly 50.",
    alternatives: [
      {
        id: "filly-50",
        reason: "Resta sui 50cc, con una proposta compatta per tragitti brevi.",
      },
      {
        id: "super-8-50-r",
        reason:
          "Stessa cilindrata per i primi spostamenti, con un carattere estetico sportivo.",
      },
    ],
  },
  "agility-s-125": {
    useCases: ["city"],
    whyChoose:
      "Se ti muovi spesso nel traffico, la sua proposta da 125cc punta su taglia compatta e praticità quotidiana.",
    tradeoff:
      "L'uso urbano è il suo riferimento; per pavé e strade irregolari confronta anche una proposta esplicitamente a ruote alte.",
    checkInStore:
      "Controlla accesso alla seduta e gestione nelle soste frequenti, pensando al parcheggio che usi ogni giorno.",
    alternatives: [
      {
        id: "voge-sfida-sr1",
        reason:
          "Un'altra proposta compatta da 125cc per la città quotidiana, nel marchio Voge.",
      },
      {
        id: "people-s-125-abs",
        reason:
          "Stessa cilindrata, con impostazione a ruote alte per città e pavé.",
      },
    ],
  },
  "dink-x-125": {
    useCases: ["city"],
    whyChoose:
      "Se vuoi un 125 per il traffico di tutti i giorni e dai peso al carattere del mezzo, propone uno stile deciso e un profilo Urban tecnico.",
    tradeoff:
      "Il carattere tecnico descrive il suo posizionamento: fai confermare le dotazioni dell'allestimento prima di basare la scelta su un accessorio.",
    checkInStore:
      "Verifica dotazioni effettive e posizione di guida, confrontandole con ciò che ti serve nel traffico quotidiano.",
    alternatives: [
      {
        id: "agility-s-125",
        reason:
          "Resta sul 125 urbano con una proposta centrata su compattezza e praticità.",
      },
      {
        id: "voge-sfida-sr1-adv",
        reason:
          "Stessa cilindrata, ma impostazione Urban ADV orientata alla città e ai fondi misti.",
      },
    ],
  },
  "filly-50": {
    useCases: ["city"],
    whyChoose:
      "Se fai tragitti brevi, mette al centro compattezza e gestione semplice in una proposta da 50cc.",
    tradeoff:
      "È descritto per spostamenti brevi: valuta il percorso completo prima di sceglierlo per un uso quotidiano più esteso.",
    checkInStore:
      "Verifica appoggio a terra e facilità di spostamento da fermo, anche rispetto agli spazi del tuo parcheggio.",
    alternatives: [
      {
        id: "agility-50-r16-plus",
        reason:
          "Un altro 50cc per i primi tragitti, con impostazione a ruote alte.",
      },
      {
        id: "super-8-50-r",
        reason:
          "Mantiene i 50cc e l'uso urbano iniziale, con uno stile sportivo.",
      },
    ],
  },
  "like-125": {
    useCases: ["city"],
    whyChoose:
      "Se ti muovi tra centro e quartieri, abbina uso quotidiano e linee morbide in uno scooter da 125cc.",
    tradeoff:
      "Il suo orientamento è la città: se la scelta dipende soprattutto da ruote alte o commuting esteso, confronta una proposta dedicata.",
    checkInStore:
      "Valuta la seduta e lo spazio per ciò che porti con te, oltre al carattere estetico.",
    alternatives: [
      {
        id: "micare-125",
        reason:
          "Stessa cilindrata urbana, con un posizionamento centrato su taglia leggera e maneggevolezza.",
      },
      {
        id: "voge-sfida-sr1",
        reason:
          "Un'altra proposta da 125cc per la città, con taglia compatta e presenza più matura.",
      },
    ],
  },
  "micare-125": {
    useCases: ["city"],
    whyChoose:
      "Se privilegi spostamenti urbani rapidi, il suo profilo Urban light mette al centro taglia leggera e maneggevolezza.",
    tradeoff:
      "È orientato alla facilità negli spostamenti; per percorsi quotidiani lunghi confronta anche modelli dedicati al comfort.",
    checkInStore:
      "Prova appoggio dei piedi e manovre da fermo, verificando come si adatta alla tua corporatura.",
    alternatives: [
      {
        id: "skytown-125",
        reason:
          "Resta sui 125cc con una proposta semplice e concreta per l'uso urbano quotidiano.",
      },
      {
        id: "like-125",
        reason:
          "Stessa cilindrata, con linee morbide e un uso dichiarato tra centro e quartieri.",
      },
    ],
  },
  "people-s-125-abs": {
    useCases: ["city"],
    whyChoose:
      "Se percorri città e pavé, propone ruote alte in una taglia da 125cc per gli spostamenti quotidiani.",
    tradeoff:
      "L'ABS compare nel nome e nel profilo del modello: verifica comunque le dotazioni dell'allestimento che stai valutando.",
    checkInStore:
      "Confronta seduta e appoggio a terra con Sfida SR16 125 e chiedi conferma delle dotazioni.",
    alternatives: [
      {
        id: "voge-sfida-sr16-125",
        reason:
          "Stessa cilindrata e ruote alte, con uso dichiarato su pavimentazioni urbane irregolari.",
      },
      {
        id: "people-s-200",
        reason:
          "Mantiene l'impostazione a ruote alte, con 200cc e un orientamento alla città estesa.",
      },
    ],
  },
  "people-s-200": {
    useCases: ["city", "commute"],
    whyChoose:
      "Se cerchi una cilindrata intermedia per la città estesa, offre ruote alte e 200cc senza passare alla famiglia maxi scooter.",
    tradeoff:
      "Le dotazioni di sicurezza sono da verificare: non dedurle dal People S 125 o da altre versioni della famiglia.",
    checkInStore:
      "Chiedi conferma delle dotazioni della versione disponibile e confronta la seduta con un GT se fai tragitti lunghi.",
    alternatives: [
      {
        id: "voge-sfida-sr16-200",
        reason:
          "Stessa cilindrata e ruote alte, con un profilo esplicitamente da commuting.",
      },
      {
        id: "x-town-250st",
        reason:
          "Passa a 250cc e a un'impostazione touring orientata a spazio e protezione.",
      },
    ],
  },
  "super-8-50-r": {
    useCases: ["city"],
    whyChoose:
      "Se cerchi un 50cc per i primi spostamenti e vuoi uno stile sportivo, è la proposta dedicata a questo carattere.",
    tradeoff:
      "Lo stile sportivo non è un dato sulle prestazioni: scegli in funzione dei tuoi tragitti e della facilità di gestione.",
    checkInStore:
      "Prova posizione di guida e manovre da fermo, confrontandole con gli altri 50cc.",
    alternatives: [
      {
        id: "agility-50-r16-plus",
        reason:
          "Stessa cilindrata per i primi spostamenti, con una proposta a ruote alte.",
      },
      {
        id: "filly-50",
        reason:
          "Un 50cc dal profilo compatto, orientato ai tragitti brevi e alla semplicità.",
      },
    ],
  },
  "x-town-250st": {
    useCases: ["commute"],
    whyChoose:
      "Se il comfort casa-lavoro viene prima, abbina spazio e protezione in una cilindrata intermedia da 250cc.",
    tradeoff:
      "Il riferimento è il commuting comodo: per affiancare spesso i weekend, confronta anche X-Town 300.",
    checkInStore:
      "Valuta la posizione delle gambe e gli spazi a bordo in base agli oggetti che porti al lavoro.",
    alternatives: [
      {
        id: "x-town-300",
        reason:
          "Stessa famiglia touring, con 300cc e un uso che comprende esplicitamente i weekend.",
      },
      {
        id: "voge-sfida-sr2-adv",
        reason:
          "Mantiene i 250cc ma passa a una posizione alta e a un'impostazione crossover.",
      },
    ],
  },
};

export function getCatalogGuidance(scooter: CatalogScooter): CatalogGuidance {
  const guidance = guidanceById[scooter.id];

  if (!guidance) {
    return {
      useCases: [],
      whyChoose: scooter.positioning,
      tradeoff: "Confronta l'uso indicato con i tuoi percorsi abituali.",
      checkInStore:
        "Verifica posizione di guida, dotazioni e allestimento con Grossi Moto.",
    };
  }

  const { useCases, whyChoose, tradeoff, checkInStore } = guidance;
  return { useCases, whyChoose, tradeoff, checkInStore };
}

export function getModelAlternatives(scooter: CatalogScooter): {
  scooter: CatalogScooter;
  reason: string;
}[] {
  return (guidanceById[scooter.id]?.alternatives ?? [])
    .flatMap((alternative) => {
      const model = catalogScooters.find((item) => item.id === alternative.id);
      return model && model.id !== scooter.id
        ? [{ scooter: model, reason: alternative.reason }]
        : [];
    })
    .slice(0, 3);
}
