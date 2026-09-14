import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

type AccessoryBlock = {
  title: string;
  copy: string;
  items: string[];
  icon: LucideIcon;
};

const accessoryBlocks: AccessoryBlock[] = [
  {
    title: "Protezione personale",
    copy: "Scelta guidata per accessori da usare ogni giorno, con taglie e compatibilità da verificare in sede.",
    items: ["Caschi", "Guanti e abbigliamento tecnico"],
    icon: ShieldCheck,
  },
  {
    title: "Comfort urbano",
    copy: "Soluzioni pratiche per rendere lo scooter più adatto a lavoro, commissioni e tragitti lunghi.",
    items: ["Bauletti", "Parabrezza"],
    icon: PackageCheck,
  },
  {
    title: "Sicurezza e sosta",
    copy: "Dispositivi e montaggi pensati per lasciare lo scooter con più tranquillità nei quartieri di Roma.",
    items: ["Antifurti", "Accessori scooter e compatibili"],
    icon: Wrench,
  },
  {
    title: "Uso quotidiano",
    copy: "Dettagli piccoli, ma decisivi quando lo scooter diventa il mezzo principale della giornata.",
    items: ["Supporti smartphone", "Accessori scooter e compatibili"],
    icon: Smartphone,
  },
];

export function AccessoriesSection() {
  return (
    <section className="relative overflow-hidden bg-[oklch(91%_0.014_78)] px-4 py-20 text-[oklch(17%_0.014_50)] sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <div
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-[0.08em] top-8 hidden text-[clamp(8rem,18vw,22rem)] font-[900] uppercase leading-none text-[oklch(17%_0.014_50/0.045)] lg:block"
      >
        Accessori
      </div>

      <div className="relative mx-auto max-w-[92rem]">
        <div className="grid gap-12 border-t border-[oklch(18%_0.014_56/0.18)] pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(25rem,0.46fr)] lg:items-start">
          <div className="min-w-0">
            <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[oklch(36%_0.09_28)]">
              Accessori
            </p>
            <h2 className="font-display mt-5 max-w-[13ch] text-[clamp(3.8rem,10vw,9.5rem)] font-[900] uppercase leading-[0.82]">
              Scelti sul mezzo, non solo a catalogo.
            </h2>
          </div>
          <div className="lg:pt-[18svh]">
            <p className="max-w-[34rem] text-[clamp(1.45rem,2.2vw,2.55rem)] font-semibold leading-[1] text-[oklch(24%_0.018_50)]">
              Valutiamo disponibilità, compatibilità e montaggio in base al tuo
              scooter e all’uso che ne fai ogni giorno.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a
                href="tel:+393289185029"
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(16%_0.014_48)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_78)] transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(91%_0.014_78)]"
              >
                Chiedi compatibilità e disponibilità
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <Link
                href="/servizi"
                className="font-ui inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(18%_0.014_56/0.06)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] shadow-[inset_0_0_0_1px_oklch(18%_0.014_56/0.12)] transition-[background,transform] duration-200 hover:bg-[oklch(18%_0.014_56/0.09)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(91%_0.014_78)]"
              >
                Scopri i servizi
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-t border-[oklch(18%_0.014_56/0.16)] lg:mt-24 lg:grid-cols-2 lg:gap-x-14">
          {accessoryBlocks.map((block, index) => {
            const Icon = block.icon;

            return (
              <article
                key={block.title}
                className="grid gap-5 border-b border-[oklch(18%_0.014_56/0.16)] py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-7 lg:py-10"
              >
                <div className="flex items-center justify-between gap-4 sm:block">
                  <span className="font-display text-3xl font-[900] leading-none text-[oklch(17%_0.014_50/0.2)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-[oklch(36%_0.09_28)] sm:mt-8"
                    strokeWidth={1.6}
                  />
                </div>
                <div>
                  <h3 className="font-display max-w-[12ch] text-[clamp(1.9rem,3vw,3.4rem)] font-[900] uppercase leading-[0.9] text-[oklch(16%_0.014_50)]">
                    {block.title}
                  </h3>
                  <p className="mt-5 max-w-[34rem] text-base leading-7 text-[oklch(29%_0.014_56/0.68)]">
                    {block.copy}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-[oklch(22%_0.014_56)]">
                    {block.items.map((item) => (
                      <li key={item} className="border-t border-[oklch(36%_0.09_28/0.42)] pt-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
