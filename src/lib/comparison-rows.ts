import {
  comparisonSpecs,
  type ComparisonSpecs,
} from "../data/catalog-comparison-specs";

const definitions: {
  key: keyof Pick<
    ComparisonSpecs,
    "seatHeight" | "runningMass" | "braking" | "storage"
  >;
  label: string;
}[] = [
  { key: "seatHeight", label: "Altezza sella" },
  { key: "runningMass", label: "Massa in ordine di marcia" },
  { key: "braking", label: "Frenata" },
  { key: "storage", label: "Sottosella" },
];

export function getComparisonRows(ids: string[]) {
  return definitions
    .map(({ key, label }) => {
      const values = ids.map((id) => comparisonSpecs[id]?.[key] ?? null);
      // A missing value is not a technical difference or a disadvantage.
      const differs =
        new Set(values.filter((value) => value !== null)).size > 1;
      return { key, label, values, differs };
    })
    .sort((a, b) => Number(b.differs) - Number(a.differs));
}
