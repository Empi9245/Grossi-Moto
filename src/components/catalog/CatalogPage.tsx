"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  CatalogFilterBar,
  type CatalogBrandFilter,
  type CatalogDisplacementFilter,
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

import {
  defaultCatalogFilters,
  getVisibleScooters,
  getFilterCounts,
  normalizeSearchValue,
} from "@/lib/catalog-search";

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

  const initialFocusAppliedRef = useRef(false);

  useEffect(() => {
    if (!initialExpandedId || initialFocusAppliedRef.current) {
      return;
    }

    // The compact grid is selected after mount; wait for the correct variant.
    const compactViewport =
      window.matchMedia("(max-width: 1023px)").matches ||
      window.matchMedia("(any-pointer: coarse)").matches;
    if (compactViewport !== isCompactViewport) {
      return;
    }

    const escapedId = CSS.escape(initialExpandedId);
    let frame = 0;
    let attempts = 0;
    let stableFrames = 0;
    let previousTop = Number.NaN;
    let previousHeight = Number.NaN;
    let previousListHeight = Number.NaN;
    let interrupted = false;

    const cancelOnUserInput = () => {
      interrupted = true;
      window.cancelAnimationFrame(frame);
    };

    const alignFocusedCard = () => {
      if (interrupted) {
        return;
      }

      const list = document.getElementById("catalog-list");
      const card = list?.querySelector<HTMLElement>(
        `[data-scooter-detail-id="${escapedId}"]`,
      );
      // GSAP positions compact cards absolutely; their chapter is the stable
      // vertical anchor and includes the heading above the selected model.
      const chapter =
        isCompactViewport && !shouldReduceMotion
          ? card?.closest<HTMLElement>("[data-catalog-chapter]")
          : null;
      const target = chapter ?? card;
      const stack = chapter?.querySelector<HTMLElement>(
        "[data-product-stack-card]",
      )?.parentElement;

      if (target) {
        const rect = target.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const listHeight = list?.offsetHeight ?? 0;
        const stable =
          Math.abs(top - previousTop) < 1 &&
          Math.abs(rect.height - previousHeight) < 1 &&
          Math.abs(listHeight - previousListHeight) < 1;

        stableFrames = stable ? stableFrames + 1 : 0;
        previousTop = top;
        previousHeight = rect.height;
        previousListHeight = listHeight;

        if (
          (stableFrames >= 4 && (!chapter || Boolean(stack?.style.height))) ||
          attempts >= 90
        ) {
          const stickyOffset = window.matchMedia("(min-width: 1024px)").matches
            ? (document.querySelector<HTMLElement>(".catalog-filter-bar")
                ?.offsetHeight ?? 0) + 20
            : 84;

          window.scrollTo({
            top: Math.max(0, top - stickyOffset),
            left: 0,
            behavior: "auto",
          });
          initialFocusAppliedRef.current = true;
          return;
        }
      }

      attempts += 1;
      if (attempts <= 90) {
        frame = window.requestAnimationFrame(alignFocusedCard);
      }
    };

    window.addEventListener("wheel", cancelOnUserInput, { passive: true });
    window.addEventListener("touchstart", cancelOnUserInput, { passive: true });
    window.addEventListener("keydown", cancelOnUserInput);
    frame = window.requestAnimationFrame(alignFocusedCard);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", cancelOnUserInput);
      window.removeEventListener("touchstart", cancelOnUserInput);
      window.removeEventListener("keydown", cancelOnUserInput);
    };
  }, [initialExpandedId, isCompactViewport, shouldReduceMotion]);

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
