import { AccessoryRail } from "./AccessoryRail";

export function AccessoriesSection() {
  return (
    <section
      aria-labelledby="accessories-heading"
      data-call-cta-theme="black"
      className="relative bg-white text-[#111111]"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-[var(--home-accessories-surface)] px-5 py-20 sm:rounded-[40px] sm:px-7 sm:py-28 md:px-10 lg:rounded-[56px] lg:px-14 lg:py-32 xl:px-20">
        <div className="mx-auto max-w-[80rem]">
          <div className="mb-14 max-w-[42rem] sm:mb-20">
            <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#111111]/55 sm:text-xs">
              Accessori
            </p>
            <h2
              id="accessories-heading"
              className="font-display mt-4 text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.9] tracking-tight"
            >
              Accessori che fanno
              <br />
              la differenza.
            </h2>
          </div>

          <AccessoryRail />
        </div>
      </div>
    </section>
  );
}
