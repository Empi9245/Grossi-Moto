import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { AccessoriesSection } from "@/components/sections/AccessoriesSection";
import { ContactBriefSection } from "@/components/sections/ContactBriefSection";
import { GrossimotoExperienceSection } from "@/components/sections/GrossimotoExperienceSection";
import { HeroRevealStage } from "@/components/sections/HeroRevealStage";
import { ShowcaseCoverCta } from "@/components/sections/ShowcaseCoverCta";
import { WorkshopSection } from "@/components/sections/WorkshopSection";

export const metadata: Metadata = {
  title: "Grossimoto KYMCO Roma | Scooter, accessori e officina",
  description:
    "Grossi Moto di Angelo Grossi a Roma: dealer KYMCO, scelta scooter, accessori dedicati e officina in Via Festo Porzio 22.",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MotorcycleDealer", "AutoRepair"],
  name: "Grossi Moto di Angelo Grossi",
  alternateName: "Grossimoto",
  description:
    "Rivenditore e officina KYMCO a Roma con consulenza scooter, accessori e assistenza.",
  telephone: "+393289185029",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Festo Porzio, 22",
    postalCode: "00174",
    addressLocality: "Roma",
    addressRegion: "RM",
    addressCountry: "IT",
  },
  areaServed: "Roma",
  hasMap: "https://share.google/ppfR023TdQcVrYya3",
  openingHours: [
    "Mo-Fr 08:30-13:00",
    "Mo-Fr 14:30-19:00",
    "Sa 08:30-13:00",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "14:30",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "13:00",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--page-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroRevealStage />
      <ShowcaseCoverCta />
      <GrossimotoExperienceSection />
      <AccessoriesSection />
      <WorkshopSection />
      <ContactBriefSection />
      <SiteFooter />
    </main>
  );
}
