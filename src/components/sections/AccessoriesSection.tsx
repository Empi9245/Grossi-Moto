import { AccessoryRail } from "./AccessoryRail";

export function AccessoriesSection() {
  return (
    <section
      aria-labelledby="accessories-heading"
      className="bg-[oklch(91%_0.014_78)] px-4 py-16 text-[var(--ink)] sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto min-w-0 max-w-[92rem]">
        <div className="grid gap-6 border-t border-current/20 pt-6 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-ui text-xs font-bold uppercase tracking-[0.18em]">
              Accessori
            </p>
            <h2
              id="accessories-heading"
              className="font-display mt-4 max-w-[17ch] text-[clamp(2.75rem,6vw,6rem)] font-black uppercase leading-[0.95] [overflow-wrap:anywhere]"
            >
              Accessori che fanno la differenza.
            </h2>
          </div>
          <p className="max-w-[42ch] text-base leading-relaxed lg:pb-1 lg:text-lg">
            Verifichiamo insieme disponibilità, compatibilità e montaggio in
            base al tuo scooter e all’uso che ne fai.
          </p>
        </div>
        <AccessoryRail />
      </div>
    </section>
  );
}
