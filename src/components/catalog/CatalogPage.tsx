"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgeCheck, Gauge, Layers2 } from "lucide-react";

import { CatalogFilterBar } from "@/components/catalog/CatalogFilterBar";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { CatalogNavbar } from "@/components/catalog/CatalogNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { usePageTransition } from "@/components/transitions/PageTransitionProvider";
import {
  catalogBrandCount,
  catalogScooters,
  type CatalogFilter,
  getCatalogScooterById,
} from "@/data/catalog-scooters";

function filterScooters(activeFilter: CatalogFilter) {
  if (activeFilter === "all") {
    return catalogScooters;
  }

  return catalogScooters.filter(
    (scooter) => scooter.filterCategory === activeFilter,
  );
}

function useCompactViewport() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isCompact;
}

export function CatalogPage({ initialFocusId }: { initialFocusId?: string }) {
  const { activeScooterId, shouldReduceMotion, source } = usePageTransition();
  const initialExpandedId = getCatalogScooterById(initialFocusId)?.id ?? null;
  const [activeFilter, setActiveFilter] = useState<CatalogFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    () => initialExpandedId,
  );
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
      const card = document.querySelector<HTMLElement>(
        `[data-scooter-id="${CSS.escape(initialExpandedId)}"]`,
      );

      card?.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [initialExpandedId, shouldReduceMotion]);

  const visibleScooters = useMemo(
    () => filterScooters(activeFilter),
    [activeFilter],
  );

  const handleFilterChange = useCallback((nextFilter: CatalogFilter) => {
    const nextVisibleScooters = filterScooters(nextFilter);

    setActiveFilter(nextFilter);
    setExpandedId((currentExpandedId) =>
      currentExpandedId &&
      nextVisibleScooters.some((scooter) => scooter.id === currentExpandedId)
        ? currentExpandedId
        : null,
    );
  }, []);

  const handleCollapseScooter = useCallback(() => {
    setExpandedId(null);
  }, []);

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
                <h1 className="font-display mt-3 max-w-[10ch] text-[clamp(2.85rem,11vw,6.8rem)] font-bold leading-[0.88] tracking-normal text-black sm:max-w-[12ch]">
                  Tutta la gamma
                </h1>
                <p className="mt-5 max-w-[39rem] text-sm leading-6 text-black/65 sm:text-base">
                  Esplora KYMCO e Voge e apri le schede per confrontare i
                  modelli. Per prezzo, disponibilità e consigli sulla scelta,
                  chiamaci.
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
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <section
            aria-label="Moto e scooter Grossimoto"
            className="px-5 pb-8 pt-6 sm:px-7 sm:pb-10 lg:px-10"
          >
            <CatalogGrid
              scooters={visibleScooters}
              expandedId={expandedId}
              isCompactViewport={isCompactViewport}
              shouldReduceMotion={shouldReduceMotion || isCompactViewport}
              transitionImageId={transitionImageId}
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
