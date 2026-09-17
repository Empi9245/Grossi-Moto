import { ArrowUpRight, ClipboardCheck, Settings2, Wrench } from "lucide-react";

const workshopItems = [
  "Tagliandi",
  "Manutenzione ordinaria",
  "Diagnosi",
  "Controlli prima della consegna",
  "Montaggio accessori",
  "Assistenza scooter",
];

export function WorkshopSection() {
  return (
    <section className="relative bg-white text-[var(--gm-ink)]">
      <div className="relative overflow-hidden rounded-t-[32px] bg-[var(--home-workshop-surface)] px-4 py-20 sm:rounded-t-[40px] sm:px-6 sm:py-24 lg:rounded-t-[56px] lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="font-display pointer-events-none absolute -bottom-[0.18em] left-0 hidden text-[clamp(8rem,19vw,24rem)] font-[900] uppercase leading-none text-black/[0.035] lg:block"
        >
          Officina
        </div>

        <div className="relative mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,0.5fr)] lg:items-start">
          <div className="border-t border-black/16 pt-8">
            <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black/60">
              Officina in sede
            </p>
            <h2 className="font-display mt-5 max-w-[12ch] text-[clamp(4rem,10vw,10rem)] font-[900] uppercase leading-[0.8]">
              Il tuo scooter, seguito nel tempo.
            </h2>
            <p className="mt-8 max-w-[44rem] text-[clamp(1.45rem,2.4vw,2.9rem)] font-semibold leading-[1] text-black/76">
              Un tagliando da fare, un rumore da capire, un accessorio da montare. Raccontaci cosa serve al tuo scooter: partiamo da lì.
            </p>
            <a
              href="tel:+393289185029"
              className="font-ui mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--gm-black)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-[opacity,transform] duration-200 hover:opacity-88 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--home-workshop-surface)]"
            >
              Chiama l’officina
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>

          <div className="border-y border-black/16">
            <article className="grid gap-5 border-b border-black/14 py-7 sm:grid-cols-[2.6rem_minmax(0,1fr)]">
              <ClipboardCheck aria-hidden="true" className="h-6 w-6 text-black/60" strokeWidth={1.6} />
              <div>
                <h3 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] font-[900] uppercase leading-[0.9]">
                  Prima consegna e controlli
                </h3>
                <p className="mt-4 text-sm leading-6 text-black/70">
                  Prima di partire, controlliamo il mezzo e ti spieghiamo come usarlo.
                </p>
              </div>
            </article>

            <article className="grid gap-5 border-b border-black/14 py-7 sm:grid-cols-[2.6rem_minmax(0,1fr)]">
              <Settings2 aria-hidden="true" className="h-6 w-6 text-black/60" strokeWidth={1.6} />
              <div>
                <h3 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] font-[900] uppercase leading-[0.9]">
                  Manutenzione e diagnosi
                </h3>
                <p className="mt-4 text-sm leading-6 text-black/70">
                  Dal tagliando al controllo di un problema: valutiamo il lavoro in base al mezzo e al suo utilizzo.
                </p>
              </div>
            </article>

            <article className="grid gap-5 py-7 sm:grid-cols-[2.6rem_minmax(0,1fr)]">
              <Wrench aria-hidden="true" className="h-6 w-6 text-black/60" strokeWidth={1.6} />
              <div>
                <h3 className="font-display text-[clamp(1.9rem,3vw,3.2rem)] font-[900] uppercase leading-[0.9]">
                  Lavori disponibili
                </h3>
                <ul className="font-ui mt-6 grid gap-x-5 gap-y-3 text-xs font-bold uppercase tracking-[0.12em] text-black/82 sm:grid-cols-2">
                  {workshopItems.map((item) => (
                    <li key={item} className="border-t border-black/20 pt-2">
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
    </section>
  );
}
