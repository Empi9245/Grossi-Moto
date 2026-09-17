import { clsx } from "clsx";

import { catalogFilters, type CatalogFilter } from "@/data/catalog-scooters";

type CatalogFilterBarProps = {
  activeFilter: CatalogFilter;
  onFilterChange: (filter: CatalogFilter) => void;
};

export function CatalogFilterBar({
  activeFilter,
  onFilterChange,
}: CatalogFilterBarProps) {
  return (
    <div className="catalog-filter-bar sticky top-0 z-30 bg-white/90 px-5 pb-3 pt-5 backdrop-blur-xl sm:px-7 sm:pt-7 lg:px-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          aria-label="Filtra i modelli per cilindrata"
          className="hide-scrollbar flex min-h-14 w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain rounded-full bg-[#F3F3F3] p-1.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] sm:max-w-[34rem]"
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
      </div>
    </div>
  );
}
