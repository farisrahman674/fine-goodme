import { getDictionary } from "@/lib/getDictionary";
import ProductDetail from "./ProductDetail";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en"; slug: string };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}/product/packaging/${params.slug}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { locale: "id" | "en"; slug: string };
}) {
  const { locale, slug } = await params;
  const exists = await prisma.product.findUnique({
    where: { slug },
    select: { slug: true },
  });
  if (!exists) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return <ProductDetail dict={dict} locale={locale} />;
}
