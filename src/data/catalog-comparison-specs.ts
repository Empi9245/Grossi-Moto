// Deliberately bounded research: these three versions only. Do not inherit
// measurements from a similarly named model or a newer homologation.
export type ComparisonSpecs = {
  version: string;
  source: string;
  checked: string;
  seatHeight: string;
  runningMass: string;
  braking: string;
  storage: string;
};

export const comparisonSpecs: Partial<Record<string, ComparisonSpecs>> = {
  "people-s-125-abs": {
    version: "People S 125i ABS Euro 5",
    source:
      "https://kymco.it/media/schede/allegati/PEOPLE%20S%20125i%20ABS%20E5/scheda.pdf",
    checked: "2026-10-21",
    seatHeight: "800 mm",
    runningMass: "130 kg",
    braking: "ABS a doppio canale",
    storage: "1 casco integrale",
  },
  "agility-s-125": {
    version: "Agility S 125 Euro 5",
    source:
      "https://kymco.it/media/schede/allegati/AGILITY%20S%20125i%20E5/scheda.pdf",
    checked: "2026-10-21",
    seatHeight: "805 mm",
    runningMass: "134 kg",
    braking: "Frenata combinata CBS",
    storage: "1 casco jet",
  },
  "downtown-350-gt": {
    version: "Downtown 350i GT Euro 5+",
    source:
      "https://kymco.it/media/schede/allegati/DOWNTOWN%20350i%20GT/scheda.pdf",
    checked: "2026-10-21",
    seatHeight: "780 mm",
    runningMass: "185 kg",
    braking: "ABS a doppio canale",
    storage: "2 caschi integrali",
  },
};

// Editorial prompts for a physical check, kept separate from measured specs.
export const comparisonAdvice: Partial<Record<string, string>> = {
  "people-s-125-abs":
    "Prova il tuo casco integrale nel vano e controlla l'appoggio dei piedi: la sola altezza sella non descrive tutta la seduta.",
  "agility-s-125":
    "Prova il vano con il tuo casco jet. Se usi un integrale, verifica in sede dove riporlo.",
  "downtown-350-gt":
    "Prova le manovre da fermo e il vano con entrambi i caschi che usi, soprattutto se viaggi spesso in due.",
};
