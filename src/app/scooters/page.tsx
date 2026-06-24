import type { Metadata } from "next";

import { CatalogPage } from "@/components/catalog/CatalogPage";

export const metadata: Metadata = {
  title: "Gamma KYMCO e Voge | Grossimoto Roma",
  description:
    "Catalogo Grossimoto a Roma con scooter KYMCO, modelli KYMCO Sport e gamma Voge, filtrabili per cilindrata e distinti per brand.",
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
