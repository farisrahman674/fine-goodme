import { getDictionary } from "@/lib/getDictionary";
import BlogDetail from "./BlogDetail";
import type { Metadata } from "next";

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
  params: { locale: "id" | "en" };
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <BlogDetail dict={dict} locale={locale} />;
}
