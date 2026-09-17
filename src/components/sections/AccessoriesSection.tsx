import { AccessoryRail } from "./AccessoryRail";

export function AccessoriesSection() {
  return (
    <section
      aria-labelledby="accessories-heading"
      className="my-10 rounded-[32px] bg-[#F7F6F2] bg-[url('/grossimoto/accessori/accessories-editorial-bg.webp')] bg-cover bg-center bg-no-repeat px-4 py-12 text-[var(--gm-ink)] sm:my-14 sm:rounded-[40px] sm:px-6 sm:py-14 lg:my-24 lg:rounded-[56px] lg:px-10 lg:py-16"
    >
      <div className="mx-auto min-w-0 max-w-[92rem]">
        <div className="grid gap-5 border-t border-black/15 pt-5 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12">
          <div>
            <p className="font-ui text-xs font-bold uppercase tracking-[0.18em] text-black/60">
              Accessori
            </p>
            <h2
              id="accessories-heading"
              className="font-display mt-3 max-w-[19ch] text-[clamp(2.25rem,4.5vw,4.5rem)] font-bold uppercase leading-[0.94]"
            >
              Accessori che fanno la differenza.
            </h2>
          </div>
          <p className="max-w-[42ch] text-[0.95rem] leading-relaxed text-black/68 lg:pb-0.5 lg:text-base">
            Verifichiamo insieme disponibilità, compatibilità e montaggio in
            base al tuo scooter e all’uso che ne fai.
          </p>
        </div>
        <AccessoryRail />
      </div>
    </section>
  );
}
