import { getDictionary } from "@/lib/getDictionary";
import ProdukClient from "./ProdukClient";
import type { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en" };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}/product`,
    },
  };
}
export default async function Page({
  params,
}: {
  params: { locale: "id" | "en" };
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <Suspense fallback={null}>
      <ProdukClient dict={dict} locale={locale} />
    </Suspense>
  );
}
