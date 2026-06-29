import { redirect, notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
export default async function LegacyProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { slug: true },
  });

  if (!product) {
    notFound();
  }
  redirect(`/${locale}/product/machine/${slug}`);
}
