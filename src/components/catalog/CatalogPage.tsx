"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeCheck, Gauge, Layers2 } from "lucide-react";

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
import { CatalogNavbar } from "@/components/catalog/CatalogNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { usePageTransition } from "@/components/transitions/PageTransitionProvider";
import {
  catalogBrandCount,
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
) {
  const normalizedQuery = normalizeSearchValue(searchQuery);
  const queryTokens = normalizedQuery ? normalizedQuery.split(" ") : [];

  return catalogScooters.filter((scooter) => {
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
): CatalogFilterCounts {
  const countWith = (nextFilters: CatalogFilterState) =>
    getVisibleScooters(nextFilters, searchQuery).length;

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

  return nextVisibleScooters.some(
    (scooter) => scooter.id === currentExpandedId,
  )
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
        document.querySelector<HTMLElement>(
          `[data-scooter-id="${escapedId}"]`,
        );

      target?.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [initialExpandedId, shouldReduceMotion]);

  const visibleScooters = useMemo(
    () => getVisibleScooters(activeFilters, searchQuery),
    [activeFilters, searchQuery],
  );

  const filterCounts = useMemo(
    () => getFilterCounts(activeFilters, searchQuery),
    [activeFilters, searchQuery],
  );

  const hasActiveFilters = hasActiveCatalogFilters(activeFilters);
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
      const nextFilters = getNextCatalogFilters(
        activeFilters,
        group,
        value,
      );
      const nextVisibleScooters = getVisibleScooters(
        nextFilters,
        searchQuery,
      );

      setActiveFilters(nextFilters);
      setExpandedId((currentExpandedId) =>
        keepVisibleExpansion(currentExpandedId, nextVisibleScooters),
      );
    },
    [activeFilters, searchQuery],
  );

  const handleSearchChange = useCallback(
    (nextQuery: string) => {
      const nextVisibleScooters = getVisibleScooters(
        activeFilters,
        nextQuery,
      );

      setSearchQuery(nextQuery);
      setExpandedId((currentExpandedId) =>
        keepVisibleExpansion(currentExpandedId, nextVisibleScooters),
      );
    },
    [activeFilters],
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
    setExpandedId((currentExpandedId) =>
      keepVisibleExpansion(currentExpandedId, nextVisibleScooters),
    );
  }, [searchQuery]);

  return (
    <>
      <main
        id="main-content"
        className="min-h-[100dvh] bg-white p-2.5 text-[#171717] sm:p-4 lg:p-5"
      >
        <div className="mx-auto max-w-[122rem] overflow-clip rounded-[1.55rem] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_28px_70px_rgba(0,0,0,0.08)]">
          <CatalogNavbar />

          <section className="px-5 pt-8 sm:px-7 sm:pt-10 lg:px-10 lg:pt-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(34rem,0.92fr)] lg:items-end">
              <div>
                <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black/55">
                  Moto e scooter
                </p>
                <h1 className="font-display font-editorial mt-3 max-w-[10ch] text-[clamp(2.85rem,11vw,6.8rem)] font-bold leading-[0.88] tracking-normal text-black sm:max-w-[12ch]">
                  Tutta la gamma
                </h1>
                <p className="mt-5 max-w-[39rem] text-sm leading-6 text-black/65 sm:text-base">
                  Esplora KYMCO e Voge e apri le schede per confrontare i modelli.
                  Per prezzo, disponibilità e consigli sulla scelta, chiamaci.
                </p>
              </div>

              <dl className="grid grid-cols-3 gap-2 sm:gap-3 lg:justify-self-end">
                <div className="flex min-w-0 flex-col items-start gap-2 rounded-[0.95rem] bg-[#F3F3F3] p-3 sm:flex-row sm:items-center sm:gap-3 sm:rounded-none sm:border-l sm:border-black/10 sm:bg-transparent sm:p-0 sm:pl-5">
                  <BadgeCheck
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-black/55 sm:h-6 sm:w-6"
                    strokeWidth={1.6}
                  />
                  <div className="min-w-0">
                    <dt className="font-ui truncate text-[0.54rem] font-bold uppercase tracking-[0.12em] text-black/50 sm:text-[0.62rem] sm:tracking-[0.16em]">
                      Modelli
                    </dt>
                    <dd className="font-display -mt-0.5 text-2xl font-bold leading-none text-black sm:text-3xl">
                      {catalogScooters.length}
                    </dd>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-2 rounded-[0.95rem] bg-[#F3F3F3] p-3 sm:flex-row sm:items-center sm:gap-3 sm:rounded-none sm:border-l sm:border-black/10 sm:bg-transparent sm:p-0 sm:pl-5">
                  <Layers2
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-black/55 sm:h-6 sm:w-6"
                    strokeWidth={1.6}
                  />
                  <div className="min-w-0">
                    <dt className="font-ui truncate text-[0.54rem] font-bold uppercase tracking-[0.12em] text-black/50 sm:text-[0.62rem] sm:tracking-[0.16em]">
                      Marchi
                    </dt>
                    <dd className="font-display -mt-0.5 text-2xl font-bold leading-none text-black sm:text-3xl">
                      {catalogBrandCount}
                    </dd>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-2 rounded-[0.95rem] bg-[#F3F3F3] p-3 sm:flex-row sm:items-center sm:gap-3 sm:rounded-none sm:border-l sm:border-black/10 sm:bg-transparent sm:p-0 sm:pl-5">
                  <Gauge
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-black/55 sm:h-6 sm:w-6"
                    strokeWidth={1.6}
                  />
                  <div className="min-w-0">
                    <dt className="font-ui truncate text-[0.54rem] font-bold uppercase tracking-[0.12em] text-black/50 sm:text-[0.62rem] sm:tracking-[0.16em]">
                      Cilindrata
                    </dt>
                    <dd className="font-display -mt-0.5 whitespace-nowrap text-[1.05rem] font-bold leading-none text-black sm:text-3xl">
                      <span className="sm:hidden">50–900cc</span>
                      <span className="hidden sm:inline">50cc - 900cc</span>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </section>

          <CatalogFilterBar
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

          <section
            aria-label="Moto e scooter Grossimoto"
            className="px-5 pb-8 pt-6 sm:px-7 sm:pb-10 lg:px-10"
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
    </>
  );
}
