import type { Metadata } from "next";

import { CatalogPage } from "@/components/catalog/CatalogPage";

export const metadata: Metadata = {
  title: "Gamma scooter KYMCO e Voge",
  description:
    "Confronta la gamma Grossimoto: scooter KYMCO e Voge da 50cc a 900cc, con schede per cilindrata, categoria e uso.",
  alternates: { canonical: "/scooters" },
};

type ScootersPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getFocusParam(searchParams: Record<string, string | string[] | undefined>) {
  const focus = searchParams.focus;

  if (Array.isArray(focus)) {
    return focus[0];
  }

  return focus;
}

export default async function ScootersPage({ searchParams }: ScootersPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const focusParam = getFocusParam(resolvedSearchParams);

  return (
    <CatalogPage
      key={focusParam ?? "no-focus"}
      initialFocusId={focusParam}
    />
  );
}
