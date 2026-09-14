import type { Metadata } from "next";

import { AccessoriesSection } from "@/components/sections/AccessoriesSection";
import { ContactBriefSection } from "@/components/sections/ContactBriefSection";
import { GrossimotoExperienceSection } from "@/components/sections/GrossimotoExperienceSection";
import { HeroRevealStage } from "@/components/sections/HeroRevealStage";
import { HomeTrustSection } from "@/components/sections/HomeTrustSection";
import { ShowcaseCoverCta } from "@/components/sections/ShowcaseCoverCta";
import { WorkshopSection } from "@/components/sections/WorkshopSection";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Scooter, accessori e officina a Roma",
  description:
    "Scooter KYMCO e Voge a Roma, consulenza in showroom, accessori e assistenza in officina. Grossi Moto, Via Festo Porzio 22.",
  alternates: { canonical: "/" },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Grossi Moto di Angelo Grossi",
  alternateName: "Grossimoto",
  description:
    "Punto vendita e officina scooter a Roma con gamma KYMCO e Voge, consulenza, accessori e assistenza.",
  telephone: "+393289185029",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Festo Porzio, 22",
    addressLocality: "Roma",
    postalCode: "00174",
    addressCountry: "IT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:30",
      closes: "13:00",
    },
  ],
  url: "https://grossi-moto.vercel.app/",
  sameAs: [
    "https://share.google/ppfR023TdQcVrYya3",
  ],
  priceRange: "€€",
} as const;

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--page-background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <HeroRevealStage />
      <ShowcaseCoverCta />
      <HomeTrustSection />
      <GrossimotoExperienceSection />
      <AccessoriesSection />
      <WorkshopSection />
      <ContactBriefSection />
      <SiteFooter />
    </main>
  );
}
