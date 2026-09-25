import { BrandLogo } from "@/components/layout/BrandLogo";
import Link from "next/link";
import { Phone } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
];

export function CatalogNavbar() {
  return (
    <header className="border-b border-[oklch(18%_0.014_56/0.1)]">
      <nav
        aria-label="Navigazione catalogo Grossimoto"
        className="flex min-h-[4.8rem] flex-wrap items-center justify-between gap-3 px-4 py-3 text-[oklch(18%_0.014_56)] sm:px-6 lg:min-h-[5.6rem] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-7"
      >
        <Link
          href="/"
          aria-label="Torna alla home Grossimoto"
          className="font-ui group flex min-w-0 flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94%_0.01_78)]"
        >
          <BrandLogo tone="black" priority />
        </Link>

        <div className="font-ui hidden min-h-11 items-center gap-1 rounded-full bg-[#0A0A0A] p-1 text-sm font-bold text-white/72 lg:flex">
          {navItems.map((item) => {
            const current = item.href === "/scooters";

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={[
                  "rounded-full px-6 py-2.5 transition-[background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none",
                  current
                    ? "bg-white text-[#0A0A0A]"
                    : "text-white/72 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="order-2 flex shrink-0 items-center justify-end gap-2 lg:order-none">
          <a
            href="tel:+393289185029"
            className="font-ui inline-flex min-h-11 items-center gap-2 rounded-[0.9rem] bg-[oklch(16%_0.014_48)] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[oklch(94%_0.01_78)] shadow-[0_12px_30px_oklch(18%_0.014_56/0.18)] outline-none transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94%_0.01_78)] sm:px-4 lg:bg-[#0A0A0A] lg:text-white lg:shadow-none lg:transition-[opacity,transform] lg:duration-150 lg:hover:bg-[#0A0A0A] lg:hover:opacity-[0.84] lg:active:translate-y-0 lg:active:scale-[0.98] lg:focus-visible:ring-black/35 lg:focus-visible:ring-offset-white"
          >
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Chiama ora</span>
            <span className="sm:hidden">Chiama</span>
            
          </a>
        </div>
      </nav>
    </header>
  );
}
