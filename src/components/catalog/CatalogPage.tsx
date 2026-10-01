"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  CatalogFilterBar,
  type CatalogBrandFilter,
  type CatalogDisplacementFilter,
  type CatalogFilterCounts,
  type CatalogFilterGroup,
  type CatalogFilterState,
  type CatalogFilterValue,
  type CatalogVehicleFilter,
} from "@/components/catalog/CatalogFilterBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import {
  CatalogComparison,
  CatalogComparisonProvider,
} from "@/components/catalog/CatalogComparison";
import {
  catalogUseCases,
  getCatalogGuidance,
  type CatalogUseCase,
} from "@/data/catalog-guidance";
import { CatalogNavbar } from "@/components/catalog/CatalogNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { usePageTransition } from "@/components/transitions/PageTransitionProvider";
import {
  catalogScooters,
  type CatalogScooter,
  getCatalogScooterBrand,
  getCatalogScooterById,
} from "@/data/catalog-scooters";

const defaultCatalogFilters: CatalogFilterState = {
  vehicleType: "all",
  brand: "all",
  displacement: "all",
};

function normalizeSearchValue(value: string) {
  return value
    .toLocaleLowerCase("it-IT")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[-_/]+/g, " ")
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

const catalogSearchIndex = new Map(
  catalogScooters.map((scooter) => [
    scooter.id,
    normalizeSearchValue(
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

function getVisibleScooters(
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

    const searchableText = catalogSearchIndex.get(scooter.id) ?? "";
    return queryTokens.every((token) => searchableText.includes(token));
  });
}

function getFilterCounts(
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

function getNextCatalogFilters(
  activeFilters: CatalogFilterState,
  group: CatalogFilterGroup,
  value: CatalogFilterValue,
): CatalogFilterState {
  if (group === "vehicleType") {
    return {
      ...activeFilters,
      vehicleType: value as CatalogVehicleFilter,
    };
  }

  if (group === "brand") {
    return {
      ...activeFilters,
      brand: value as CatalogBrandFilter,
    };
  }

  return {
    ...activeFilters,
    displacement: value as CatalogDisplacementFilter,
  };
}

function hasActiveCatalogFilters(activeFilters: CatalogFilterState) {
  return Object.values(activeFilters).some((value) => value !== "all");
}

function keepVisibleExpansion(
  currentExpandedId: string | null,
  nextVisibleScooters: CatalogScooter[],
) {
  if (!currentExpandedId) {
    return null;
  }

  return nextVisibleScooters.some((scooter) => scooter.id === currentExpandedId)
    ? currentExpandedId
    : null;
}

function useCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const widthMedia = window.matchMedia("(max-width: 1023px)");
    const coarseMedia = window.matchMedia("(any-pointer: coarse)");
    const update = () =>
      setIsCompact(widthMedia.matches || coarseMedia.matches);

    update();
    widthMedia.addEventListener("change", update);
    coarseMedia.addEventListener("change", update);

    return () => {
      widthMedia.removeEventListener("change", update);
      coarseMedia.removeEventListener("change", update);
    };
  }, []);

  return isCompact;
}

export function CatalogPage({ initialFocusId }: { initialFocusId?: string }) {
  const { activeScooterId, shouldReduceMotion, source } = usePageTransition();
  const initialExpandedId = getCatalogScooterById(initialFocusId)?.id ?? null;
  const [activeFilters, setActiveFilters] = useState<CatalogFilterState>(
    () => ({ ...defaultCatalogFilters }),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUseCase, setActiveUseCase] = useState<CatalogUseCase | "all">(
    "all",
  );
  const [expandedId, setExpandedId] = useState<string | null>(
    () => initialExpandedId,
  );
  const [activeVisibleScooterId, setActiveVisibleScooterId] = useState<
    string | null
  >(initialExpandedId);
  const isCompactViewport = useCompactViewport();
  const transitionImageId =
    source === "showroom" && activeScooterId === expandedId
      ? activeScooterId
      : null;

  useEffect(() => {
    if (!initialExpandedId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      const escapedId = CSS.escape(initialExpandedId);
      const target =
        document.querySelector<HTMLElement>(
          `[data-scooter-detail-id="${escapedId}"]`,
        ) ??
        document.querySelector<HTMLElement>(`[data-scooter-id="${escapedId}"]`);

      target?.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [initialExpandedId, shouldReduceMotion]);

  const visibleScooters = useMemo(
    () => getVisibleScooters(activeFilters, searchQuery, activeUseCase),
    [activeFilters, searchQuery, activeUseCase],
  );

  const filterCounts = useMemo(
    () => getFilterCounts(activeFilters, searchQuery, activeUseCase),
    [activeFilters, searchQuery, activeUseCase],
  );

  const hasActiveFilters =
    hasActiveCatalogFilters(activeFilters) || activeUseCase !== "all";
  const effectiveActiveScooter =
    visibleScooters.find((scooter) => scooter.id === activeVisibleScooterId) ??
    visibleScooters[0];
  const activePosition = effectiveActiveScooter
    ? visibleScooters.findIndex(
        (scooter) => scooter.id === effectiveActiveScooter.id,
      ) + 1
    : 0;

  const handleFilterChange = useCallback(
    (group: CatalogFilterGroup, value: CatalogFilterValue) => {
      const nextFilters = getNextCatalogFilters(activeFilters, group, value);
      const nextVisibleScooters = getVisibleScooters(
        nextFilters,
        searchQuery,
        activeUseCase,
      );

      setActiveFilters(nextFilters);
      setExpandedId((currentExpandedId) =>
        keepVisibleExpansion(currentExpandedId, nextVisibleScooters),
      );
    },
    [activeFilters, searchQuery, activeUseCase],
  );

  const handleSearchChange = useCallback(
    (nextQuery: string) => {
      const nextVisibleScooters = getVisibleScooters(
        activeFilters,
        nextQuery,
        activeUseCase,
      );

      setSearchQuery(nextQuery);
      setExpandedId((currentExpandedId) =>
        keepVisibleExpansion(currentExpandedId, nextVisibleScooters),
      );
    },
    [activeFilters, activeUseCase],
  );

  const handleCollapseScooter = useCallback(() => {
    setExpandedId(null);
  }, []);

  const handleClearSearch = useCallback(() => {
    handleSearchChange("");
  }, [handleSearchChange]);

  const handleResetFilters = useCallback(() => {
    const nextFilters = { ...defaultCatalogFilters };
    const nextVisibleScooters = getVisibleScooters(nextFilters, searchQuery);

    setActiveFilters(nextFilters);
    setActiveUseCase("all");
    setExpandedId((currentExpandedId) =>
      keepVisibleExpansion(currentExpandedId, nextVisibleScooters),
    );
  }, [searchQuery]);

  const handleUseCaseChange = (nextUseCase: CatalogUseCase | "all") => {
    const nextVisibleScooters = getVisibleScooters(
      activeFilters,
      searchQuery,
      nextUseCase,
    );
    setActiveUseCase(nextUseCase);
    setExpandedId((current) =>
      keepVisibleExpansion(current, nextVisibleScooters),
    );
  };

  return (
    <CatalogComparisonProvider>
      <main
        id="main-content"
        className="min-h-[100dvh] bg-white p-2.5 text-[#171717] sm:p-4 lg:p-5"
      >
        <div className="mx-auto max-w-[122rem] overflow-clip rounded-[1.55rem] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_28px_70px_rgba(0,0,0,0.08)]">
          <CatalogNavbar />

          <section className="px-5 pt-6 sm:px-7 sm:pt-8 lg:px-10 lg:pt-9">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
              <h1 className="font-display font-editorial text-[clamp(2.3rem,9.5vw,5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-[#171717]">
                Tutta la gamma
              </h1>
              <div className="lg:max-w-sm lg:pb-1">
                <p className="font-ui text-sm font-semibold text-black/75">
                  {catalogScooters.length} modelli · KYMCO e Voge · 50–900 cc
                </p>
                <p className="mt-1.5 text-sm leading-6 text-black/65">
                  Trova il mezzo per i tuoi tragitti.
                </p>
              </div>
            </div>
          </section>

          <CatalogFilterBar
            activeUseCase={activeUseCase}
            onUseCaseChange={handleUseCaseChange}
            activeUseCaseLabel={
              catalogUseCases.find((item) => item.id === activeUseCase)?.label
            }
            onClearUseCase={() => handleUseCaseChange("all")}
            activeFilters={activeFilters}
            filterCounts={filterCounts}
            searchQuery={searchQuery}
            resultCount={visibleScooters.length}
            totalCount={catalogScooters.length}
            activePosition={activePosition}
            activeBrand={
              effectiveActiveScooter
                ? getCatalogScooterBrand(effectiveActiveScooter)
                : undefined
            }
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onSearchChange={handleSearchChange}
          />

          <CatalogComparison />

          <section
            aria-label="Moto e scooter Grossimoto"
            className="px-5 pb-8 pt-4 sm:px-7 sm:pb-10 lg:px-10 lg:pt-5"
          >
            <CatalogGrid
              scooters={visibleScooters}
              toneSourceScooters={catalogScooters}
              expandedId={expandedId}
              isCompactViewport={isCompactViewport}
              shouldReduceMotion={shouldReduceMotion}
              transitionImageId={transitionImageId}
              hasSearchQuery={normalizeSearchValue(searchQuery).length > 0}
              hasActiveFilter={hasActiveFilters}
              onActiveScooterChange={setActiveVisibleScooterId}
              onClearSearch={handleClearSearch}
              onResetFilter={handleResetFilters}
              onExpandScooter={setExpandedId}
              onCollapseScooter={handleCollapseScooter}
            />
          </section>
        </div>
      </main>
      <SiteFooter />
    </CatalogComparisonProvider>
  );
}
