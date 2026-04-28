import { getDictionary } from "@/lib/getDictionary";
import ProductDetail from "./ProductDetail";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en"; slug: string };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}/product/${params.slug}`,
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

  return <ProductDetail dict={dict} locale={locale} />;
}
