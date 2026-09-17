"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { clsx } from "clsx";

import { catalogFilters, type CatalogFilter } from "@/data/catalog-scooters";

type CatalogFilterBarProps = {
  activeFilter: CatalogFilter;
  searchQuery: string;
  resultCount: number;
  totalCount: number;
  activePosition: number;
  activeBrand?: string;
  onFilterChange: (filter: CatalogFilter) => void;
  onSearchChange: (query: string) => void;
};

function getResultLabel(resultCount: number, hasSearchQuery: boolean) {
  if (hasSearchQuery) {
    return `${resultCount} ${resultCount === 1 ? "risultato" : "risultati"}`;
  }

  return `${resultCount} ${resultCount === 1 ? "modello" : "modelli"}`;
}

export function CatalogFilterBar({
  activeFilter,
  searchQuery,
  resultCount,
  totalCount,
  activePosition,
  activeBrand,
  onFilterChange,
  onSearchChange,
}: CatalogFilterBarProps) {
  const controlsRef = useRef<HTMLDivElement>(null);
  const filterDialogRef = useRef<HTMLDialogElement>(null);
  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const [showCompactToolbar, setShowCompactToolbar] = useState(false);
  const [compactSearchOpen, setCompactSearchOpen] = useState(false);
  const hasSearchQuery = searchQuery.trim().length > 0;
  const resultLabel = getResultLabel(resultCount, hasSearchQuery);
  const hasActiveFilter = activeFilter !== "all";

  useEffect(() => {
    const controls = controlsRef.current;

    if (!controls || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;

        setShowCompactToolbar(shouldShow);
        if (!shouldShow) {
          setCompactSearchOpen(false);
        }
      },
      {
        rootMargin: "-8px 0px 0px 0px",
        threshold: 0.08,
      },
    );

    observer.observe(controls);
    return () => observer.disconnect();
  }, []);

  const openFilterDialog = () => {
    filterDialogRef.current?.showModal();
  };

  const selectMobileFilter = (filter: CatalogFilter) => {
    onFilterChange(filter);
    filterDialogRef.current?.close();
  };

  return (
    <>
      <div
        ref={controlsRef}
        className="catalog-filter-bar relative z-30 bg-white px-5 pb-3 pt-5 sm:px-7 sm:pt-7 lg:sticky lg:top-0 lg:px-10"
      >
        <div className="grid gap-3 lg:grid-cols-[minmax(17rem,0.62fr)_minmax(0,1fr)_auto] lg:items-center">
          <div className="relative min-w-0 sm:max-w-[30rem] lg:max-w-none">
            <label htmlFor="catalog-search" className="sr-only">
              Cerca nella gamma
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45"
              strokeWidth={1.8}
            />
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cerca modello, marca o cilindrata"
              autoComplete="off"
              className="font-ui min-h-14 w-full rounded-full border border-black/10 bg-[#F7F7F7] py-3 pl-11 pr-12 text-sm font-medium text-black outline-none transition-[border-color,box-shadow,background] duration-200 placeholder:text-black/42 focus:border-black/30 focus:bg-white focus:ring-2 focus:ring-black/10"
            />
            {hasSearchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Cancella ricerca"
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-black/55 outline-none transition-colors duration-200 hover:bg-black/[0.06] hover:text-black focus-visible:ring-2 focus-visible:ring-black/35"
              >
                <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </button>
            ) : null}
          </div>

          <div
            aria-label="Filtra i modelli per cilindrata"
            className="hide-scrollbar flex min-h-14 w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain rounded-full bg-[#F3F3F3] p-1.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
            role="group"
          >
            {catalogFilters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onFilterChange(filter.id)}
                  className={clsx(
                    "font-ui inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-[0.74rem] font-bold tracking-[0.02em] outline-none transition-[background,color,box-shadow,transform] duration-200 active:translate-y-px focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    isActive
                      ? "bg-black text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)]"
                      : "text-black/65 hover:bg-black/[0.06] hover:text-black",
                  )}
                >
                  {filter.label}
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="font-ui flex min-h-11 items-center justify-between gap-3 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-black/55 lg:justify-end lg:whitespace-nowrap"
          >
            <span>{resultLabel}</span>
            {resultCount !== totalCount ? (
              <span className="text-black/35">su {totalCount}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div
        aria-hidden={!showCompactToolbar}
        inert={!showCompactToolbar}
        className="sticky z-40 h-0 px-3 lg:hidden"
        style={{ top: "max(0.5rem, env(safe-area-inset-top))" }}
      >
        <div
          className={clsx(
            "mx-auto max-w-xl rounded-[1.1rem] border border-black/10 bg-white p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.10)] transition-[opacity,transform] duration-200 motion-reduce:transition-none",
            showCompactToolbar
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          {compactSearchOpen ? (
            <div
              id="compact-catalog-search"
              className="flex min-h-12 items-center gap-1.5"
            >
              <div className="relative min-w-0 flex-1">
                <label htmlFor="catalog-search-compact" className="sr-only">
                  Cerca nella gamma
                </label>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45"
                  strokeWidth={1.8}
                />
                <input
                  id="catalog-search-compact"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Cerca modello, marca o cilindrata"
                  autoComplete="off"
                  autoFocus
                  className="font-ui min-h-11 w-full rounded-[0.85rem] bg-[#F3F3F3] py-2.5 pl-10 pr-10 text-sm font-medium text-black outline-none ring-1 ring-inset ring-black/10 placeholder:text-black/42 focus:bg-white focus:ring-2 focus:ring-black/20"
                />
                {hasSearchQuery ? (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    aria-label="Cancella ricerca"
                    className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-black/55 outline-none hover:bg-black/[0.06] focus-visible:ring-2 focus-visible:ring-black/35"
                  >
                    <X
                      aria-hidden="true"
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setCompactSearchOpen(false)}
                className="font-ui min-h-11 shrink-0 rounded-[0.85rem] px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-black/60 outline-none hover:bg-black/[0.05] focus-visible:ring-2 focus-visible:ring-black/35"
              >
                Chiudi
              </button>
            </div>
          ) : (
            <div className="flex min-h-12 items-center gap-1">
              <button
                type="button"
                aria-expanded={false}
                aria-controls="compact-catalog-search"
                onClick={() => setCompactSearchOpen(true)}
                className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] px-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-black outline-none transition-colors hover:bg-black/[0.05] focus-visible:ring-2 focus-visible:ring-black/35"
              >
                <Search
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                Cerca
              </button>
              <button
                ref={filterTriggerRef}
                type="button"
                aria-haspopup="dialog"
                aria-pressed={hasActiveFilter}
                onClick={openFilterDialog}
                className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.85rem] px-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-black outline-none transition-colors hover:bg-black/[0.05] focus-visible:ring-2 focus-visible:ring-black/35"
              >
                <SlidersHorizontal
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />
                Filtri
              </button>

              <div
                className="ml-auto min-w-0 px-2 text-right"
                aria-label="Posizione nel catalogo"
              >
                <span className="font-ui block truncate text-[0.55rem] font-bold uppercase tracking-[0.12em] text-black/45">
                  {activeBrand ?? "Gamma"}
                </span>
                <span className="font-ui mt-0.5 block whitespace-nowrap text-[0.72rem] font-bold text-black">
                  {resultCount > 0 && activePosition > 0
                    ? `${activePosition} di ${resultCount}`
                    : resultLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <dialog
        ref={filterDialogRef}
        aria-labelledby="catalog-filter-dialog-title"
        onClose={() => filterTriggerRef.current?.focus()}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[78dvh] w-full max-w-none rounded-t-[1.5rem] bg-white p-0 text-black shadow-[0_-20px_60px_rgba(0,0,0,0.16)] backdrop:bg-black/25 lg:hidden"
      >
        <div
          style={{
            paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div>
              <p className="font-ui text-[0.58rem] font-bold uppercase tracking-[0.15em] text-black/45">
                Gamma
              </p>
              <h2
                id="catalog-filter-dialog-title"
                className="font-display mt-1 text-xl font-bold"
              >
                Filtra i modelli
              </h2>
            </div>
            <form method="dialog">
              <button
                type="submit"
                aria-label="Chiudi filtri"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#F3F3F3] outline-none hover:bg-black/[0.08] focus-visible:ring-2 focus-visible:ring-black/35"
              >
                <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </form>
          </div>

          <div
            className="grid gap-2 px-5 py-5"
            role="group"
            aria-label="Filtra i modelli per cilindrata"
          >
            {catalogFilters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectMobileFilter(filter.id)}
                  className={clsx(
                    "font-ui flex min-h-12 w-full items-center justify-between rounded-[0.95rem] border px-4 text-left text-sm font-bold outline-none transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-black/35",
                    isActive
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-black hover:bg-[#F5F5F5]",
                  )}
                >
                  <span>{filter.label}</span>
                  <span className="text-[0.62rem] uppercase tracking-[0.1em] opacity-65">
                    {isActive ? "Attivo" : "Seleziona"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </dialog>
    </>
  );
}
