import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Gamma", href: "/scooters" },
  { label: "Servizi", href: "/servizi" },
  { label: "Contatti", href: "/contatti" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(12%_0.014_42)] px-4 py-10 text-[oklch(88%_0.01_80)] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[92rem] gap-8 border-t border-[oklch(94%_0.01_80/0.14)] pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <p className="font-ui text-lg font-bold tracking-normal">Grossimoto</p>
          <p className="mt-1 text-sm text-[oklch(76%_0.012_74)]">
            Grossi Moto di Angelo Grossi
          </p>
          <p className="mt-4 text-sm font-medium text-[oklch(86%_0.01_78)]">
            Scooter e assistenza a Roma
          </p>
          <p className="mt-2 max-w-[28rem] text-sm leading-6 text-[oklch(76%_0.012_74)]">
            Via Festo Porzio, 22, 00174 Roma RM
            <br />
            <a href="tel:+393289185029" className="hover:text-[oklch(96%_0.008_80)]">
              +39 328 918 5029
            </a>
            <br />
            <a href="mailto:info@grossimoto.it" className="hover:text-[oklch(96%_0.008_80)]">info@grossimoto.it</a>
            <br />
            <a href="https://share.google/ppfR023TdQcVrYya3" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(96%_0.008_80)]">Google Maps</a>
          </p>
        </div>

        <nav
          aria-label="Link footer Grossimoto"
          className="font-ui flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(86%_0.01_78)] md:justify-end"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-[oklch(76%_0.06_32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(12%_0.014_42)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
