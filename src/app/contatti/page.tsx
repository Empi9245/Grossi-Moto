import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Contatti | Grossimoto KYMCO Roma",
  description:
    "Contatti Grossi Moto di Angelo Grossi, rivenditore e officina KYMCO a Roma.",
};

export default function ContattiPage() {
  return (
    <main className="min-h-[100dvh] bg-[oklch(88%_0.015_78)] px-4 py-6 text-[oklch(17%_0.014_50)] sm:px-6 lg:px-10">
      <section className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-[92rem] flex-col justify-between rounded-[1.4rem] bg-[oklch(94.5%_0.011_78)] p-6 shadow-[0_0_0_1px_oklch(18%_0.014_56/0.045),0_28px_70px_oklch(18%_0.014_56/0.1)] sm:p-8 lg:p-10">
        <Link
          href="/"
          className="font-ui inline-flex w-fit items-center gap-2 rounded-full text-sm font-bold uppercase tracking-[0.08em] text-[oklch(18%_0.014_56)] transition-colors duration-200 hover:text-[oklch(36%_0.09_28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94.5%_0.011_78)]"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          Torna alla Home
        </Link>

        <div className="py-16">
          <p className="font-ui text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[oklch(36%_0.09_28)]">
            Contatti
          </p>
          <h1 className="font-display mt-4 max-w-[10ch] text-[clamp(3.4rem,11vw,8rem)] font-bold leading-[0.88] tracking-normal">
            Parla con Grossi Moto.
          </h1>
          <p className="mt-6 max-w-[42rem] text-base leading-7 text-[oklch(29%_0.014_56/0.72)] sm:text-lg">
            La pagina contatti completa e in preparazione. Per informazioni su
            scooter KYMCO, disponibilit&agrave;, accessori e officina puoi
            chiamare la sede di Roma.
          </p>
          <a
            href="tel:+393289185029"
            className="font-ui mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[oklch(16%_0.014_48)] px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[oklch(94%_0.01_78)] transition-[background,transform] duration-200 hover:bg-[oklch(22%_0.016_50)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(38%_0.08_28)] focus-visible:ring-offset-4 focus-visible:ring-offset-[oklch(94.5%_0.011_78)]"
          >
            Chiama ora
            <PhoneCall aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </a>
        </div>

        <p className="font-ui text-sm font-bold uppercase tracking-[0.12em] text-[oklch(30%_0.014_56/0.58)]">
          Grossi Moto di Angelo Grossi
        </p>
      </section>
    </main>
  );
}
