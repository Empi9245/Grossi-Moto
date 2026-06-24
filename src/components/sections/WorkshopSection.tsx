import { ArrowUpRight, ClipboardCheck, Settings2, Wrench } from "lucide-react";

const workshopItems = [
  "Tagliandi",
  "Manutenzione ordinaria",
  "Diagnosi",
  "Controlli prima della consegna",
  "Montaggio accessori",
  "Assistenza scooter KYMCO",
];

export function WorkshopSection() {
  return (
    <section className="bg-[oklch(14%_0.014_42)] px-4 py-16 text-[oklch(94%_0.01_80)] sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(24rem,0.55fr)] lg:items-start">
        <div>
          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(75%_0.036_68)]">
            Officina in sede
          </p>
          <h2 className="font-display mt-4 max-w-[11ch] text-[clamp(2.8rem,8vw,6.6rem)] font-bold leading-[0.9] tracking-normal">
            Assistenza concreta dopo l&apos;acquisto.
          </h2>
          <p className="mt-6 max-w-[38rem] text-base leading-7 text-[oklch(82%_0.012_74)] sm:text-lg">
            L&rsquo;officina Grossi Moto segue il tuo scooter anche dopo
            l&rsquo;acquisto: tagliandi, manutenzione, diagnosi e montaggio
            accessori in sede a Roma.
          </p>
          <a
            href="tel:+393289185029"
            className="font-ui mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(91%_0.014_76)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(13%_0.014_42)] transition-[opacity,transform] duration-200 hover:opacity-88 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(14%_0.014_42)]"
          >
            Prenota un controllo
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border-t border-[oklch(94%_0.01_80/0.18)] pt-5">
            <ClipboardCheck
              aria-hidden="true"
              className="h-6 w-6 text-[oklch(76%_0.06_32)]"
              strokeWidth={1.6}
            />
            <h3 className="font-ui mt-5 text-xl font-bold tracking-normal">
              Prima consegna e controlli
            </h3>
            <p className="mt-3 text-sm leading-6 text-[oklch(82%_0.012_74)]">
              Preparazione, verifica e spiegazione pratica prima di portare lo
              scooter su strada.
            </p>
          </div>
          <div className="border-t border-[oklch(94%_0.01_80/0.18)] pt-5">
            <Settings2
              aria-hidden="true"
              className="h-6 w-6 text-[oklch(76%_0.06_32)]"
              strokeWidth={1.6}
            />
            <h3 className="font-ui mt-5 text-xl font-bold tracking-normal">
              Manutenzione e diagnosi
            </h3>
            <p className="mt-3 text-sm leading-6 text-[oklch(82%_0.012_74)]">
              Interventi ordinari e controlli tecnici per mantenere affidabile
              lo scooter nel tempo.
            </p>
          </div>
          <div className="border-t border-[oklch(94%_0.01_80/0.18)] pt-5 sm:col-span-2 lg:col-span-1">
            <Wrench
              aria-hidden="true"
              className="h-6 w-6 text-[oklch(76%_0.06_32)]"
              strokeWidth={1.6}
            />
            <h3 className="font-ui mt-5 text-xl font-bold tracking-normal">
              Lavori disponibili
            </h3>
            <ul className="mt-5 grid gap-2 text-sm font-medium text-[oklch(90%_0.01_80)] sm:grid-cols-2">
              {workshopItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[oklch(76%_0.06_32)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
