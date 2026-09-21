import { Bike, ClipboardCheck, Search, Settings2, ShieldCheck, Wrench } from "lucide-react";

const workshopItems = [
  "Tagliandi",
  "Manutenzione ordinaria",
  "Diagnosi",
  "Controlli prima della consegna",
  "Montaggio accessori",
  "Assistenza moto e scooter",
];

const workshopItemIcons = [
  ClipboardCheck,
  Settings2,
  Search,
  ShieldCheck,
  Wrench,
  Bike,
] as const;

export function WorkshopSection() {
  return (
    <section data-call-cta-theme="black" className="relative bg-white text-[var(--gm-ink)]">
      <div className="relative overflow-hidden rounded-[32px] bg-[var(--home-workshop-surface)] px-4 py-20 sm:rounded-[40px] sm:px-6 sm:py-24 lg:rounded-[56px] lg:px-10 lg:py-14">
        <div
          aria-hidden="true"
          className="font-display pointer-events-none absolute -bottom-[0.18em] left-0 hidden text-[clamp(8rem,19vw,24rem)] font-bold uppercase leading-none text-black/[0.035] lg:block"
        >
          Officina
        </div>

        <div className="relative mx-auto grid max-w-[92rem] gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,0.5fr)] lg:items-start lg:gap-10">
          <div className="pt-8 lg:pt-0">
            <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black/60">
              Officina in sede
            </p>
            <h2 className="font-display font-editorial mt-5 max-w-[12ch] text-[clamp(4rem,10vw,10rem)] font-bold uppercase leading-[0.8] lg:mt-4 lg:text-[clamp(4rem,7.2vw,7.25rem)] lg:leading-[0.9]">
              Il tuo mezzo, seguito nel tempo.
            </h2>
            <p className="mt-8 max-w-[44rem] text-[clamp(1.45rem,2.4vw,2.9rem)] font-semibold leading-[1] text-black/76 lg:mt-6 lg:text-[clamp(1.35rem,1.8vw,2.1rem)] lg:leading-[1.08]">
              Un tagliando da fare, un rumore da capire, un accessorio da montare. Raccontaci cosa serve al tuo mezzo: partiamo da lì.
            </p>
            <a
              href="tel:+393289185029"
              className="font-ui mt-8 inline-flex min-h-12 lg:mt-6 items-center justify-center gap-2 rounded-[0.9rem] bg-[var(--gm-black)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-200 hover:opacity-88 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-workshop-surface)]"
            >
              Chiama l’officina
              
            </a>
          </div>

          <div>
            <div className="grid gap-4 sm:gap-5 lg:hidden">
              <article className="rounded-[1.5rem] bg-white/88 px-5 py-5 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.055)] sm:px-6 sm:py-6">
                <div className="flex items-start justify-between gap-5">
                  <span
                    aria-hidden="true"
                    className="font-ui text-[0.68rem] font-bold tracking-[0.18em] text-black/50"
                  >
                    01
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-[0.9rem] bg-black/[0.035] text-black/60 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.035)]"
                  >
                    <ClipboardCheck className="h-[1.4rem] w-[1.4rem]" strokeWidth={1.6} />
                  </span>
                </div>
                <h3 className="font-display mt-3 max-w-[14ch] text-[clamp(1.85rem,7vw,2.7rem)] font-bold uppercase leading-[0.9]">
                  Prima consegna e controlli
                </h3>
                <p className="mt-3 max-w-[38rem] text-[0.98rem] leading-6 text-black/68">
                  Prima di partire, controlliamo il mezzo e ti spieghiamo come usarlo.
                </p>
              </article>

              <article className="rounded-[1.5rem] bg-white/88 px-5 py-5 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.055)] sm:px-6 sm:py-6">
                <div className="flex items-start justify-between gap-5">
                  <span
                    aria-hidden="true"
                    className="font-ui text-[0.68rem] font-bold tracking-[0.18em] text-black/50"
                  >
                    02
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-[0.9rem] bg-black/[0.035] text-black/60 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.035)]"
                  >
                    <Settings2 className="h-[1.4rem] w-[1.4rem]" strokeWidth={1.6} />
                  </span>
                </div>
                <h3 className="font-display mt-3 max-w-[14ch] text-[clamp(1.85rem,7vw,2.7rem)] font-bold uppercase leading-[0.9]">
                  Manutenzione e diagnosi
                </h3>
                <p className="mt-3 max-w-[38rem] text-[0.98rem] leading-6 text-black/68">
                  Dal tagliando al controllo di un problema: valutiamo il lavoro in base al mezzo e al suo utilizzo.
                </p>
              </article>

              <article className="pt-3">
                <span
                  aria-hidden="true"
                  className="font-ui text-[0.68rem] font-bold tracking-[0.18em] text-black/50"
                >
                  03
                </span>
                <h3 className="font-display mt-3 text-[clamp(1.9rem,7vw,2.8rem)] font-bold uppercase leading-[0.9]">
                  Lavori disponibili
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:gap-3">
                  {workshopItems.map((item, index) => {
                    const Icon = workshopItemIcons[index];

                    return (
                      <li
                        key={item}
                        className="font-ui flex min-h-[4.75rem] min-w-0 items-center gap-3 rounded-[1.05rem] bg-white/82 px-3.5 py-3 text-[0.68rem] font-bold uppercase leading-[1.28] tracking-[0.08em] text-black/82 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.05)] sm:px-4"
                      >
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-black/72"
                          strokeWidth={1.65}
                        />
                        <span className="min-w-0">{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </div>

            <div className="hidden lg:grid lg:gap-4">
              <article className="grid gap-5 py-7 sm:grid-cols-[2.6rem_minmax(0,1fr)] lg:max-w-[28rem] lg:py-2">
                <ClipboardCheck aria-hidden="true" className="h-6 w-6 text-black/60 lg:h-10 lg:w-10 lg:rounded-full lg:bg-white/70 lg:p-2" strokeWidth={1.6} />
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] font-bold uppercase leading-[0.9] lg:text-[clamp(1.8rem,2.1vw,2.5rem)] lg:leading-[0.95]">
                    Prima consegna e controlli
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-black/70 lg:mt-3">
                    Prima di partire, controlliamo il mezzo e ti spieghiamo come usarlo.
                  </p>
                </div>
              </article>

              <article className="grid gap-5 py-7 sm:grid-cols-[2.6rem_minmax(0,1fr)] lg:ml-10 lg:max-w-[27rem] lg:py-2">
                <Settings2 aria-hidden="true" className="h-6 w-6 text-black/60 lg:h-10 lg:w-10 lg:rounded-full lg:bg-white/70 lg:p-2" strokeWidth={1.6} />
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] font-bold uppercase leading-[0.9] lg:text-[clamp(1.8rem,2.1vw,2.5rem)] lg:leading-[0.95]">
                    Manutenzione e diagnosi
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-black/70 lg:mt-3">
                    Dal tagliando al controllo di un problema: valutiamo il lavoro in base al mezzo e al suo utilizzo.
                  </p>
                </div>
              </article>

              <article className="grid gap-5 py-7 sm:grid-cols-[2.6rem_minmax(0,1fr)] lg:mt-1 lg:py-2">
                <Wrench aria-hidden="true" className="h-6 w-6 text-black/60 lg:h-10 lg:w-10 lg:rounded-full lg:bg-white/70 lg:p-2" strokeWidth={1.6} />
                <div>
                  <h3 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] font-bold uppercase leading-[0.9] lg:text-[clamp(1.8rem,2.1vw,2.5rem)] lg:leading-[0.95]">
                    Lavori disponibili
                  </h3>
                  <ul className="font-ui mt-6 grid gap-x-5 gap-y-3 text-xs font-bold uppercase tracking-[0.12em] text-black/82 sm:grid-cols-2 lg:mt-3 lg:gap-2">
                    {workshopItems.map((item) => (
                      <li key={item} className="pt-2 lg:rounded-full lg:bg-white/58 lg:px-3 lg:py-2">
                        <span aria-hidden="true" className="sr-only" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
