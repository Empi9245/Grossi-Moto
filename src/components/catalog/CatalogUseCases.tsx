"use client";

import { catalogUseCases, type CatalogUseCase } from "@/data/catalog-guidance";

export function CatalogUseCases({
  activeUseCase,
  onChange,
  inFilterDialog = false,
}: {
  activeUseCase: CatalogUseCase | "all";
  onChange: (value: CatalogUseCase | "all") => void;
  inFilterDialog?: boolean;
}) {
  const description = catalogUseCases.find(
    (item) => item.id === activeUseCase,
  )?.description;

  return (
    <fieldset
      className={
        inFilterDialog ? "min-w-0" : "min-w-0 border-b border-black/10 pb-4"
      }
    >
      <legend
        className={
          inFilterDialog
            ? "font-ui mb-2.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-black/45"
            : "sr-only"
        }
      >
        Come lo userai?
      </legend>
      <div className={inFilterDialog ? "" : "flex items-center gap-5"}>
        {!inFilterDialog ? (
          <p
            aria-hidden="true"
            className="shrink-0 text-sm font-semibold text-black/65"
          >
            Per i tuoi tragitti
          </p>
        ) : null}
        <div
          className={
            inFilterDialog ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"
          }
          role="group"
          aria-label="Scegli il tuo utilizzo"
        >
          {[
            { id: "all" as const, label: "Tutti gli utilizzi" },
            ...catalogUseCases,
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeUseCase === item.id}
              onClick={() => onChange(item.id)}
              className={`font-ui min-h-12 rounded-[0.9rem] border px-3.5 py-2.5 text-left text-sm font-semibold outline-none hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 ${activeUseCase === item.id ? "border-[#171717] bg-[#171717] text-white hover:bg-[#333]" : "border-black/15 bg-white text-[#171717]"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <p
        className={
          inFilterDialog && description
            ? "mt-3 text-sm leading-6 text-black/65"
            : "sr-only"
        }
      >
        {description ?? "Tutta la gamma, senza preferenze d’uso."}
      </p>
    </fieldset>
  );
}
