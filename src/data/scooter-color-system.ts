import type { CatalogScooter } from "./catalog-scooters";

type ShowroomSurfaceTone = {
  backgroundSurface: string;
  textTone: string;
  mutedTone: string;
  inactiveTone: string;
  watermarkTone: string;
  ruleTone: string;
  accentTone: string;
  chipSurface: string;
  shadowTone: string;
};

export type ShowroomSurfaceToneId =
  | "heroWarmIvory"
  | "mineralBlueGrey"
  | "dryChampagne"
  | "mutedSage"
  | "lightClay"
  | "paleStone"
  | "smokedLavender";

export type ProductCardToneId =
  | "warmIvory"
  | "softSand"
  | "paleStone"
  | "dustyBlush"
  | "mutedSage"
  | "mineralBlueGrey"
  | "dryChampagne"
  | "lightClay"
  | "smokedLavender"
  | "mistTeal"
  | "powderPeriwinkle"
  | "roseMauve";

type ProductCardToneFamily =
  | "warmNeutral"
  | "warmTint"
  | "coolMineral"
  | "coolBotanical"
  | "stone";

type ProductCardSurfaceTone = {
  id: ProductCardToneId;
  family: ProductCardToneFamily;
  featureSurface: string;
  cardSurface: string;
  accentTone: string;
  textTone: string;
  mutedTone: string;
  shadowTone: string;
};

export type ProductCardToneAssignment = {
  toneId: ProductCardToneId;
  cardSurface: string;
};

export const showroomSurfaceTones = {
  heroWarmIvory: {
    backgroundSurface: "var(--page-background)",
    textTone: "oklch(18% 0.014 56)",
    mutedTone: "oklch(24% 0.014 56 / 0.66)",
    inactiveTone: "oklch(20% 0.014 56 / 0.3)",
    watermarkTone: "oklch(20% 0.014 56 / 0.058)",
    ruleTone: "oklch(20% 0.014 56 / 0.15)",
    accentTone: "oklch(37% 0.08 28)",
    chipSurface: "oklch(96% 0.008 82 / 0.3)",
    shadowTone: "oklch(16% 0.014 56 / 0.9)",
  },
  mineralBlueGrey: {
    backgroundSurface:
      "linear-gradient(138deg in oklch, oklch(86% 0.022 220) 0%, oklch(78% 0.028 236) 52%, oklch(70% 0.023 250) 100%)",
    textTone: "oklch(19% 0.023 238)",
    mutedTone: "oklch(27% 0.023 238 / 0.68)",
    inactiveTone: "oklch(27% 0.022 238 / 0.32)",
    watermarkTone: "oklch(18% 0.022 238 / 0.074)",
    ruleTone: "oklch(25% 0.022 238 / 0.17)",
    accentTone: "oklch(36% 0.058 236)",
    chipSurface: "oklch(94% 0.012 226 / 0.34)",
    shadowTone: "oklch(16% 0.022 238 / 0.88)",
  },
  dryChampagne: {
    backgroundSurface:
      "linear-gradient(138deg in oklch, oklch(90% 0.019 82) 0%, oklch(82% 0.025 70) 52%, oklch(74% 0.02 58) 100%)",
    textTone: "oklch(20% 0.021 64)",
    mutedTone: "oklch(29% 0.021 64 / 0.67)",
    inactiveTone: "oklch(28% 0.02 64 / 0.31)",
    watermarkTone: "oklch(19% 0.02 64 / 0.07)",
    ruleTone: "oklch(26% 0.02 64 / 0.16)",
    accentTone: "oklch(38% 0.064 48)",
    chipSurface: "oklch(95% 0.014 74 / 0.34)",
    shadowTone: "oklch(17% 0.02 64 / 0.86)",
  },
  mutedSage: {
    backgroundSurface:
      "linear-gradient(138deg in oklch, oklch(89% 0.02 145) 0%, oklch(81% 0.027 158) 52%, oklch(73% 0.022 170) 100%)",
    textTone: "oklch(19% 0.024 158)",
    mutedTone: "oklch(28% 0.024 158 / 0.67)",
    inactiveTone: "oklch(28% 0.023 158 / 0.31)",
    watermarkTone: "oklch(18% 0.022 158 / 0.071)",
    ruleTone: "oklch(25% 0.022 158 / 0.17)",
    accentTone: "oklch(38% 0.064 150)",
    chipSurface: "oklch(94% 0.016 150 / 0.34)",
    shadowTone: "oklch(15% 0.022 158 / 0.88)",
  },
  lightClay: {
    backgroundSurface:
      "linear-gradient(138deg in oklch, oklch(87% 0.022 44) 0%, oklch(79% 0.03 35) 52%, oklch(71% 0.024 28) 100%)",
    textTone: "oklch(20% 0.026 32)",
    mutedTone: "oklch(28% 0.026 32 / 0.68)",
    inactiveTone: "oklch(27% 0.024 32 / 0.32)",
    watermarkTone: "oklch(18% 0.024 32 / 0.076)",
    ruleTone: "oklch(25% 0.024 32 / 0.18)",
    accentTone: "oklch(38% 0.072 28)",
    chipSurface: "oklch(93% 0.016 42 / 0.32)",
    shadowTone: "oklch(16% 0.024 32 / 0.88)",
  },
  paleStone: {
    backgroundSurface:
      "linear-gradient(135deg in oklch, oklch(90% 0.012 108) 0%, oklch(82% 0.018 122) 50%, oklch(74% 0.014 142) 100%)",
    textTone: "oklch(19% 0.018 132)",
    mutedTone: "oklch(28% 0.018 132 / 0.68)",
    inactiveTone: "oklch(28% 0.017 132 / 0.31)",
    watermarkTone: "oklch(18% 0.017 132 / 0.07)",
    ruleTone: "oklch(25% 0.017 132 / 0.16)",
    accentTone: "oklch(37% 0.056 136)",
    chipSurface: "oklch(95% 0.01 124 / 0.34)",
    shadowTone: "oklch(16% 0.018 132 / 0.86)",
  },
  smokedLavender: {
    backgroundSurface:
      "linear-gradient(138deg in oklch, oklch(89% 0.016 300) 0%, oklch(81% 0.022 295) 52%, oklch(73% 0.018 285) 100%)",
    textTone: "oklch(19% 0.018 292)",
    mutedTone: "oklch(28% 0.018 292 / 0.68)",
    inactiveTone: "oklch(27% 0.018 292 / 0.31)",
    watermarkTone: "oklch(18% 0.018 292 / 0.07)",
    ruleTone: "oklch(25% 0.018 292 / 0.16)",
    accentTone: "oklch(38% 0.05 300)",
    chipSurface: "oklch(95% 0.012 296 / 0.34)",
    shadowTone: "oklch(16% 0.018 292 / 0.86)",
  },
} as const satisfies Record<ShowroomSurfaceToneId, ShowroomSurfaceTone>;

export const productCardSurfaceTones = {
  warmIvory: {
    id: "warmIvory",
    family: "warmNeutral",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(89% 0.018 76) 0%, oklch(83% 0.022 68) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(92% 0.013 76) 0%, oklch(86% 0.016 68) 100%)",
    accentTone: "oklch(37% 0.08 28)",
    textTone: "oklch(18% 0.014 56)",
    mutedTone: "oklch(30% 0.014 56 / 0.62)",
    shadowTone: "oklch(16% 0.014 56 / 0.18)",
  },
  softSand: {
    id: "softSand",
    family: "warmNeutral",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(89% 0.018 88) 0%, oklch(82% 0.024 96) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(92% 0.012 88) 0%, oklch(86% 0.017 98) 100%)",
    accentTone: "oklch(36% 0.068 84)",
    textTone: "oklch(19% 0.018 82)",
    mutedTone: "oklch(29% 0.018 82 / 0.62)",
    shadowTone: "oklch(17% 0.018 82 / 0.17)",
  },
  paleStone: {
    id: "paleStone",
    family: "stone",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(90% 0.012 114) 0%, oklch(83% 0.018 128) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(93% 0.009 112) 0%, oklch(86% 0.014 130) 100%)",
    accentTone: "oklch(38% 0.056 126)",
    textTone: "oklch(19% 0.018 126)",
    mutedTone: "oklch(29% 0.018 126 / 0.62)",
    shadowTone: "oklch(17% 0.018 126 / 0.16)",
  },
  dustyBlush: {
    id: "dustyBlush",
    family: "warmTint",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(89% 0.02 34) 0%, oklch(81% 0.03 26) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(92% 0.012 34) 0%, oklch(85% 0.02 24) 100%)",
    accentTone: "oklch(38% 0.07 28)",
    textTone: "oklch(20% 0.02 30)",
    mutedTone: "oklch(30% 0.02 30 / 0.62)",
    shadowTone: "oklch(17% 0.02 30 / 0.17)",
  },
  mutedSage: {
    id: "mutedSage",
    family: "coolBotanical",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(88% 0.018 160) 0%, oklch(80% 0.026 178) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(91% 0.012 160) 0%, oklch(84% 0.02 178) 100%)",
    accentTone: "oklch(37% 0.06 170)",
    textTone: "oklch(19% 0.022 170)",
    mutedTone: "oklch(29% 0.022 170 / 0.62)",
    shadowTone: "oklch(17% 0.022 170 / 0.17)",
  },
  mineralBlueGrey: {
    id: "mineralBlueGrey",
    family: "coolMineral",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(87% 0.018 222) 0%, oklch(78% 0.026 238) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(91% 0.012 222) 0%, oklch(84% 0.02 238) 100%)",
    accentTone: "oklch(36% 0.06 238)",
    textTone: "oklch(18% 0.022 232)",
    mutedTone: "oklch(29% 0.022 232 / 0.62)",
    shadowTone: "oklch(17% 0.022 232 / 0.17)",
  },
  dryChampagne: {
    id: "dryChampagne",
    family: "warmNeutral",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(90% 0.018 70) 0%, oklch(83% 0.024 58) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(93% 0.01 70) 0%, oklch(86% 0.016 58) 100%)",
    accentTone: "oklch(38% 0.064 58)",
    textTone: "oklch(20% 0.018 58)",
    mutedTone: "oklch(30% 0.018 58 / 0.62)",
    shadowTone: "oklch(17% 0.018 58 / 0.16)",
  },
  lightClay: {
    id: "lightClay",
    family: "warmTint",
    featureSurface:
      "linear-gradient(135deg in oklch, oklch(88% 0.022 42) 0%, oklch(79% 0.034 34) 100%)",
    cardSurface:
      "linear-gradient(135deg in oklch, oklch(91% 0.014 48) 0%, oklch(84% 0.024 36) 100%)",
    accentTone: "oklch(38% 0.07 31)",
    textTone: "oklch(21% 0.024 34)",
    mutedTone: "oklch(31% 0.024 34 / 0.62)",
    shadowTone: "oklch(17% 0.024 34 / 0.18)",
  },
  smokedLavender: {
    id: "smokedLavender",
    family: "stone",
    featureSurface:
      "linear-gradient(145deg in oklch, oklch(91% 0.014 300) 0%, oklch(83% 0.022 292) 100%)",
    cardSurface:
      "linear-gradient(145deg in oklch, oklch(93% 0.01 300) 0%, oklch(86% 0.017 292) 100%)",
    accentTone: "oklch(38% 0.052 300)",
    textTone: "oklch(19% 0.018 292)",
    mutedTone: "oklch(29% 0.018 292 / 0.62)",
    shadowTone: "oklch(17% 0.018 292 / 0.16)",
  },
  mistTeal: {
    id: "mistTeal",
    family: "coolMineral",
    featureSurface:
      "linear-gradient(145deg in oklch, oklch(90% 0.015 198) 0%, oklch(82% 0.025 205) 100%)",
    cardSurface:
      "linear-gradient(145deg in oklch, oklch(93% 0.01 198) 0%, oklch(86% 0.018 205) 100%)",
    accentTone: "oklch(37% 0.052 205)",
    textTone: "oklch(19% 0.02 204)",
    mutedTone: "oklch(29% 0.02 204 / 0.62)",
    shadowTone: "oklch(17% 0.02 204 / 0.16)",
  },
  powderPeriwinkle: {
    id: "powderPeriwinkle",
    family: "stone",
    featureSurface:
      "linear-gradient(145deg in oklch, oklch(90% 0.02 274) 0%, oklch(81% 0.032 284) 100%)",
    cardSurface:
      "linear-gradient(145deg in oklch, oklch(93% 0.013 274) 0%, oklch(86% 0.023 284) 100%)",
    accentTone: "oklch(38% 0.06 278)",
    textTone: "oklch(19% 0.02 278)",
    mutedTone: "oklch(29% 0.02 278 / 0.62)",
    shadowTone: "oklch(17% 0.02 278 / 0.16)",
  },
  roseMauve: {
    id: "roseMauve",
    family: "warmTint",
    featureSurface:
      "linear-gradient(145deg in oklch, oklch(90% 0.022 342) 0%, oklch(81% 0.032 330) 100%)",
    cardSurface:
      "linear-gradient(145deg in oklch, oklch(93% 0.013 342) 0%, oklch(85% 0.022 330) 100%)",
    accentTone: "oklch(38% 0.062 334)",
    textTone: "oklch(20% 0.02 334)",
    mutedTone: "oklch(30% 0.02 334 / 0.62)",
    shadowTone: "oklch(17% 0.02 334 / 0.17)",
  },
} as const satisfies Record<ProductCardToneId, ProductCardSurfaceTone>;

const productCardToneOrder: ProductCardToneId[] = [
  "warmIvory",
  "mineralBlueGrey",
  "dustyBlush",
  "mutedSage",
  "powderPeriwinkle",
  "dryChampagne",
  "roseMauve",
  "mistTeal",
  "softSand",
  "smokedLavender",
  "lightClay",
  "paleStone",
];

const nearProductCardToneIds: Record<ProductCardToneId, ProductCardToneId[]> = {
  warmIvory: ["softSand", "dryChampagne", "paleStone"],
  softSand: ["warmIvory", "dryChampagne", "paleStone"],
  paleStone: ["warmIvory", "softSand", "mutedSage"],
  dustyBlush: ["lightClay", "roseMauve"],
  mutedSage: ["paleStone", "mineralBlueGrey", "mistTeal"],
  mineralBlueGrey: ["mutedSage", "mistTeal", "powderPeriwinkle"],
  dryChampagne: ["warmIvory", "softSand", "lightClay"],
  lightClay: ["dustyBlush", "dryChampagne", "roseMauve"],
  smokedLavender: ["powderPeriwinkle", "roseMauve"],
  mistTeal: ["mutedSage", "mineralBlueGrey"],
  powderPeriwinkle: ["mineralBlueGrey", "smokedLavender"],
  roseMauve: ["dustyBlush", "lightClay", "smokedLavender"],
};

const showroomCatalogToneMap: Record<
  string,
  {
    toneId: ProductCardToneId;
    showroomToneId: ShowroomSurfaceToneId;
  }
> = {
  "people-s-125-abs": {
    toneId: "warmIvory",
    showroomToneId: "heroWarmIvory",
  },
  "agility-s-125": {
    toneId: "mineralBlueGrey",
    showroomToneId: "mineralBlueGrey",
  },
  "downtown-350-gt": {
    toneId: "dryChampagne",
    showroomToneId: "dryChampagne",
  },
  "agility-350": {
    toneId: "mutedSage",
    showroomToneId: "mutedSage",
  },
  "x-town-250st": {
    toneId: "lightClay",
    showroomToneId: "lightClay",
  },
  "ak575-premium": {
    toneId: "smokedLavender",
    showroomToneId: "smokedLavender",
  },
};

function getShowroomCatalogToneAssignment(
  scooter: CatalogScooter,
): ProductCardToneAssignment | null {
  const mappedTone = showroomCatalogToneMap[scooter.id];

  if (!mappedTone) {
    return null;
  }

  return {
    toneId: mappedTone.toneId,
    cardSurface:
      showroomSurfaceTones[mappedTone.showroomToneId].backgroundSurface,
  };
}

export function showroomSurfaceTone(toneId: ShowroomSurfaceToneId) {
  return showroomSurfaceTones[toneId];
}

export function catalogSurfaceTone(toneId: ProductCardToneId) {
  const tone = productCardSurfaceTones[toneId];

  return {
    cardToneId: tone.id,
    featureSurface: tone.featureSurface,
    cardSurface: tone.cardSurface,
    accentTone: tone.accentTone,
    textTone: tone.textTone,
    mutedTone: tone.mutedTone,
    shadowTone: tone.shadowTone,
  };
}

function hashToneSource(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function getToneCandidates(
  scooter: CatalogScooter,
  visibleIndex: number,
): ProductCardToneId[] {
  const seed = hashToneSource(
    `${scooter.id}:${scooter.family}:${scooter.filterCategory}`,
  );
  const start = seed % productCardToneOrder.length;
  const stride = seed % 2 === 0 ? 3 : 5;
  const showroomToneAssignment = getShowroomCatalogToneAssignment(scooter);
  const candidates = new Set<ProductCardToneId>([
    showroomToneAssignment?.toneId ?? scooter.cardToneId,
    scooter.cardToneId,
  ]);

  for (let offset = 0; offset < productCardToneOrder.length; offset += 1) {
    const toneIndex =
      (start + offset * stride + visibleIndex) % productCardToneOrder.length;

    candidates.add(productCardToneOrder[toneIndex]);
  }

  return [...candidates];
}

function blockToneAndNeighbors(
  blockedToneIds: Set<ProductCardToneId>,
  toneId?: ProductCardToneId,
) {
  if (!toneId) {
    return;
  }

  blockedToneIds.add(toneId);
  nearProductCardToneIds[toneId].forEach((nearToneId) =>
    blockedToneIds.add(nearToneId),
  );
}

function selectCatalogTone(
  candidates: ProductCardToneId[],
  blockedToneIds: Set<ProductCardToneId>,
  previousToneId?: ProductCardToneId,
) {
  const firstOpenCandidate = candidates.find(
    (candidate) => !blockedToneIds.has(candidate),
  );

  if (firstOpenCandidate) {
    return firstOpenCandidate;
  }

  const previousToneConflicts = previousToneId
    ? new Set<ProductCardToneId>([
        previousToneId,
        ...nearProductCardToneIds[previousToneId],
      ])
    : new Set<ProductCardToneId>();

  return (
    candidates.find((candidate) => !previousToneConflicts.has(candidate)) ??
    candidates.find((candidate) => candidate !== previousToneId) ??
    candidates[0] ??
    "warmIvory"
  );
}

export function getCatalogCardToneAssignments(
  scooters: CatalogScooter[],
  columnCount: number,
) {
  const safeColumnCount = Math.max(1, columnCount);
  const assignedToneIds: ProductCardToneId[] = [];

  return scooters.reduce<Record<string, ProductCardToneAssignment>>(
    (assignments, scooter, visibleIndex) => {
      const showroomToneAssignment = getShowroomCatalogToneAssignment(scooter);
      const columnIndex = visibleIndex % safeColumnCount;
      const previousToneId = assignedToneIds[visibleIndex - 1];
      const previousTwoToneId = assignedToneIds[visibleIndex - 2];
      const rowLeftToneId =
        columnIndex > 0 ? assignedToneIds[visibleIndex - 1] : undefined;
      const rowUpToneId = assignedToneIds[visibleIndex - safeColumnCount];
      const blockedToneIds = new Set<ProductCardToneId>();

      blockToneAndNeighbors(blockedToneIds, previousToneId);
      blockToneAndNeighbors(blockedToneIds, rowLeftToneId);
      blockToneAndNeighbors(blockedToneIds, rowUpToneId);

      if (previousTwoToneId) {
        blockedToneIds.add(previousTwoToneId);
      }

      const toneId = selectCatalogTone(
        getToneCandidates(scooter, visibleIndex),
        blockedToneIds,
        previousToneId,
      );

      assignedToneIds.push(toneId);

      assignments[scooter.id] = {
        toneId,
        cardSurface:
          showroomToneAssignment?.toneId === toneId
            ? showroomToneAssignment.cardSurface
            : productCardSurfaceTones[toneId].cardSurface,
      };

      return assignments;
    },
    {},
  );
}
