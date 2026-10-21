import type {
  CatalogDisplacementFilter,
  CatalogFilterCounts,
  CatalogFilterState,
  CatalogVehicleFilter,
} from "../components/catalog/CatalogFilterBar";
import { getCatalogGuidance, type CatalogUseCase } from "../data/catalog-guidance";
import {
  catalogScooters,
  getCatalogScooterBrand,
  type CatalogScooter,
} from "../data/catalog-scooters";

export const defaultCatalogFilters: CatalogFilterState = {
  vehicleType: "all",
  brand: "all",
  displacement: "all",
};

export function normalizeSearchValue(value: string) {
  return value
    .toLocaleLowerCase("it-IT")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getCatalogVehicleType(
  scooter: CatalogScooter,
): Exclude<CatalogVehicleFilter, "all"> {
  return scooter.id.startsWith("voge-valico-") ? "moto" : "scooter";
}

function getCatalogDisplacementFilter(
  scooter: CatalogScooter,
): Exclude<CatalogDisplacementFilter, "all"> {
  const displacement = Number.parseInt(scooter.displacement, 10);

  if (displacement <= 50) {
    return "50cc";
  }

  if (displacement <= 125) {
    return "125cc";
  }

  if (displacement <= 250) {
    return "150-250cc";
  }

  if (displacement <= 499) {
    return "300-499cc";
  }

  return "500cc+";
}

function createSearchEntry(value: string, identityValue: string) {
  const text = normalizeSearchValue(value);
  // Editorial copy can mention a different displacement (e.g. People S 200
  // compared with a 125). Numbers and codes identify the model itself.
  const identity = normalizeSearchValue(identityValue);
  return {
    text,
    terms: new Set(identity.split(" ")),
    numbers: new Set(identity.match(/\p{N}+/gu) ?? []),
  };
}

const catalogSearchIndex = new Map(
  catalogScooters.map((scooter) => [
    scooter.id,
    createSearchEntry(
      [
        scooter.name,
        scooter.shortName,
        getCatalogScooterBrand(scooter),
        getCatalogVehicleType(scooter),
        scooter.family,
        scooter.displacement,
        scooter.filterCategory,
        scooter.subtitle,
        scooter.positioning,
        scooter.idealUse,
        ...scooter.specs.flatMap((spec) => [spec.label, spec.value]),
      ].join(" "),
      [scooter.name, scooter.shortName, scooter.displacement].join(" "),
    ),
  ]),
);

function matchesCatalogFilters(
  scooter: CatalogScooter,
  activeFilters: CatalogFilterState,
) {
  if (
    activeFilters.vehicleType !== "all" &&
    getCatalogVehicleType(scooter) !== activeFilters.vehicleType
  ) {
    return false;
  }

  if (
    activeFilters.brand !== "all" &&
    getCatalogScooterBrand(scooter) !== activeFilters.brand
  ) {
    return false;
  }

  if (
    activeFilters.displacement !== "all" &&
    getCatalogDisplacementFilter(scooter) !== activeFilters.displacement
  ) {
    return false;
  }

  return true;
}

export function getVisibleScooters(
  activeFilters: CatalogFilterState,
  searchQuery: string,
  activeUseCase: CatalogUseCase | "all" = "all",
) {
  const normalizedQuery = normalizeSearchValue(searchQuery);
  const queryTokens = normalizedQuery ? normalizedQuery.split(" ") : [];

  return catalogScooters.filter((scooter) => {
    if (
      activeUseCase !== "all" &&
      !getCatalogGuidance(scooter).useCases.includes(activeUseCase)
    ) {
      return false;
    }
    if (!matchesCatalogFilters(scooter, activeFilters)) {
      return false;
    }

    if (queryTokens.length === 0) {
      return true;
    }

    const entry = catalogSearchIndex.get(scooter.id)!;
    return queryTokens.every((token) => {
      // Whole digit runs can also occur inside model codes (AK575, 900DSX).
      if (/^\p{N}+$/u.test(token)) return entry.numbers.has(token);
      // Keep model codes whole: SR1 must not match SR16, nor R16 match SR16.
      if (/\p{N}/u.test(token)) return entry.terms.has(token);
      return entry.text.includes(token);
    });
  });
}

export function getFilterCounts(
  activeFilters: CatalogFilterState,
  searchQuery: string,
  activeUseCase: CatalogUseCase | "all",
): CatalogFilterCounts {
  const countWith = (nextFilters: CatalogFilterState) =>
    getVisibleScooters(nextFilters, searchQuery, activeUseCase).length;

  return {
    vehicleType: {
      all: countWith({ ...activeFilters, vehicleType: "all" }),
      scooter: countWith({ ...activeFilters, vehicleType: "scooter" }),
      moto: countWith({ ...activeFilters, vehicleType: "moto" }),
    },
    brand: {
      all: countWith({ ...activeFilters, brand: "all" }),
      KYMCO: countWith({ ...activeFilters, brand: "KYMCO" }),
      Voge: countWith({ ...activeFilters, brand: "Voge" }),
    },
    displacement: {
      all: countWith({ ...activeFilters, displacement: "all" }),
      "50cc": countWith({ ...activeFilters, displacement: "50cc" }),
      "125cc": countWith({ ...activeFilters, displacement: "125cc" }),
      "150-250cc": countWith({
        ...activeFilters,
        displacement: "150-250cc",
      }),
      "300-499cc": countWith({
        ...activeFilters,
        displacement: "300-499cc",
      }),
      "500cc+": countWith({ ...activeFilters, displacement: "500cc+" }),
    },
  };
}

