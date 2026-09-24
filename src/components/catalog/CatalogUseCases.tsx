"use client";

import { catalogUseCases, type CatalogUseCase } from "@/data/catalog-guidance";

export function CatalogUseCases({
  activeUseCase,
  onChange,
}: {
  activeUseCase: CatalogUseCase | "all";
  onChange: (value: CatalogUseCase | "all") => void;
}) {
  const description = catalogUseCases.find(
    (item) => item.id === activeUseCase,
  )?.description;

  return (
    <section
      aria-labelledby="catalog-use-title"
      className="px-5 pt-9 sm:px-7 lg:px-10 lg:pt-12"
    >
      <div className="border-t border-black/10 pt-6 lg:flex lg:items-start lg:justify-between lg:gap-10">
        <div className="shrink-0">
          <h2
            id="catalog-use-title"
            className="font-display text-2xl font-bold text-[#171717] sm:text-3xl"
          >
            Come lo userai?
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-black/65">
            Parti dai tuoi tragitti, poi affina per marca e cilindrata.
          </p>
        </div>
        <div className="mt-5 min-w-0 lg:mt-0 lg:max-w-2xl">
          <div
            className="flex flex-wrap gap-2"
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
                className={`font-ui min-h-12 rounded-full border px-4 py-3 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 ${activeUseCase === item.id ? "border-[#171717] bg-[#171717] text-white" : "border-black/20 bg-white text-[#171717] hover:bg-black/5"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p
            className="mt-3 max-w-xl text-sm leading-6 text-black/65"
            aria-live="polite"
            aria-atomic="true"
          >
            {description ??
              "Tutta la gamma, senza preferenze d’uso. Scegli un percorso per restringere la selezione."}
          </p>
        </div>
      </div>
    </section>
  );
}
