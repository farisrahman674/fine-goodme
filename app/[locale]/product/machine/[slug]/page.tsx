import { getDictionary } from "@/lib/getDictionary";
import ProductDetail from "./ProductDetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import { cache } from "react";

const getProductSlug = cache(async (slug: string) => {
  return await prisma.product.findUnique({
    where: { slug },
    select: { id: true },
  });
});
export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en"; slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const exists = await getProductSlug(slug);
  if (!exists) {
    notFound();
  }
  return {
    alternates: {
      canonical: `/${params.locale}/product/machine/${params.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { locale: "id" | "en"; slug: string };
}) {
  const { locale, slug } = await params;
  const exists = await getProductSlug(slug);
  if (!exists) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return <ProductDetail dict={dict} locale={locale} />;
}
