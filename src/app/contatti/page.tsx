import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Contatti, orari e dove siamo",
  description:
    "Contatta Grossi Moto a Roma: telefono, email, orari, showroom e officina per scooter KYMCO e Voge.",
  alternates: { canonical: "/contatti" },
};

const hours = [
  { days: "Lun – Ven", time: "08:30 – 13:00 / 14:30 – 19:00" },
  { days: "Sabato", time: "08:30 – 13:00" },
  { days: "Domenica", time: "Chiuso" },
];

const channels = [
  { icon: Phone, label: "Telefono", value: "+39 328 918 5029", href: "tel:+393289185029", cta: "Chiama ora", note: "Parla direttamente con il punto vendita" },
  { icon: Mail, label: "Email", value: "info@grossimoto.it", href: "mailto:info@grossimoto.it", cta: "Scrivi un’email", note: "Modelli, servizi e accessori" },
  { icon: MapPin, label: "Dove siamo", value: "Via Festo Porzio, 22 · Roma 00174", href: "https://share.google/ppfR023TdQcVrYya3", cta: "Apri su Google Maps", note: "Showroom e officina in sede" },
];

export default function ContattiPage() {
  return (
    <>
      <main id="main-content" className="min-h-[100dvh] bg-[oklch(88%_0.015_78)] px-4 py-6 text-[oklch(17%_0.014_50)] sm:px-6 lg:px-10">
        <Link href="/" className="font-ui inline-flex min-h-10 w-fit items-center gap-2 rounded-full text-sm font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] transition-colors duration-200 hover:text-[oklch(36%_0.09_28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} /> Torna alla Home
        </Link>

        <div className="mx-auto mt-10 max-w-[92rem]">
          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">Contatti</p>
          <h1 className="font-display mt-4 max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.88]">Parla con Grossi Moto.</h1>
          <p className="mt-5 max-w-[44rem] text-base leading-7 text-[oklch(29%_0.014_56/0.72)] sm:text-lg">
            Siamo a Roma, in Via Festo Porzio 22. Grossi Moto è rivenditore ufficiale KYMCO e propone anche modelli Voge. Puoi chiedere orientamento, verificare disponibilità e organizzare l’assistenza nello stesso posto.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-[92rem]">
          <div className="grid gap-4 sm:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, href, cta, note }) => (
              <div key={label} className="flex flex-col justify-between rounded-[1.1rem] bg-[oklch(94.5%_0.011_78)] p-6 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.045),0_4px_24px_oklch(18%_0.014_56/0.07)]">
                <div>
                  <Icon aria-hidden="true" className="h-5 w-5 text-[oklch(36%_0.09_28)]" strokeWidth={1.7} />
                  <p className="font-ui mt-4 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[oklch(36%_0.09_28)]">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-6">{value}</p>
                  <p className="mt-1 text-xs text-[oklch(29%_0.014_56/0.54)]">{note}</p>
                </div>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-ui mt-6 inline-flex min-h-11 items-center justify-center gap-1.5 self-start rounded-full bg-[oklch(18%_0.014_56/0.07)] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-[background,transform] duration-200 hover:bg-[oklch(18%_0.014_56/0.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)]">
                  {cta}{href.startsWith("http") && <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-[92rem]">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.44fr)]">
            <div className="rounded-[1.1rem] bg-[oklch(94.5%_0.011_78)] p-6 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.045),0_4px_24px_oklch(18%_0.014_56/0.07)] sm:p-8">
              <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[oklch(36%_0.09_28)]">Invia la tua richiesta</p>
              <p className="mt-1 text-sm text-[oklch(29%_0.014_56/0.6)]">Indica il modello, l’uso che ne fai o il lavoro da richiedere: partiamo da quello che ti serve.</p>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-[1.1rem] bg-[oklch(94.5%_0.011_78)] p-6 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.045),0_4px_24px_oklch(18%_0.014_56/0.07)]">
                <div className="flex items-center gap-2"><Clock aria-hidden="true" className="h-4 w-4 text-[oklch(36%_0.09_28)]" strokeWidth={1.7} /><p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[oklch(36%_0.09_28)]">Orari di apertura</p></div>
                <ul className="mt-5 space-y-3 border-t border-[oklch(18%_0.014_56/0.08)] pt-5">{hours.map(({ days, time }) => <li key={days} className="grid grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)] gap-3 text-sm"><span className="font-medium">{days}</span><span className="break-words text-right text-[oklch(29%_0.014_56/0.68)]">{time}</span></li>)}</ul>
              </div>
              <div className="rounded-[1.1rem] bg-[oklch(14%_0.014_42)] p-6 text-[oklch(94%_0.01_80)] shadow-[0_4px_24px_oklch(18%_0.014_56/0.18)]">
                <p className="font-ui text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[oklch(75%_0.036_68)]">Dove siamo</p>
                <p className="font-display mt-4 text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-[1]">Via Festo Porzio, 22</p>
                <p className="mt-1 text-sm text-[oklch(76%_0.012_74)]">00174 Roma RM, accanto all’officina</p>
                <a href="https://share.google/ppfR023TdQcVrYya3" target="_blank" rel="noopener noreferrer" className="font-ui mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[oklch(91%_0.014_76)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-[oklch(13%_0.014_42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(72%_0.06_32)]">Apri su Google Maps <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} /></a>
              </div>
              <a href="tel:+393289185029" className="font-ui inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[1.1rem] bg-[oklch(36%_0.09_28)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(96%_0.008_80)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)]"><Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} /> Chiama +39 328 918 5029</a>
            </div>
          </div>
        </div>
        <p className="font-ui mx-auto mt-14 max-w-[92rem] text-sm font-bold uppercase tracking-[0.12em] text-[oklch(30%_0.014_56/0.48)]">Grossi Moto di Angelo Grossi</p>
      </main>
      <SiteFooter />
    </>
  );
}
