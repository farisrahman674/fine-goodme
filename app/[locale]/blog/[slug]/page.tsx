import { getDictionary } from "@/lib/getDictionary";
import BlogDetail from "./BlogDetail";
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
      canonical: `/${params.locale}/blog/${params.slug}`,
    },
  };
}
export default async function Page({
  params,
}: {
  params: { locale: "id" | "en"; slug: string };
}) {
  const { locale, slug } = await params;
  const exists = await prisma.article.findUnique({
    where: { slug },
    select: { slug: true },
  });
  if (!exists) {
    notFound();
  }
  const dict = await getDictionary(locale);

  return <BlogDetail dict={dict} locale={locale} />;
}
