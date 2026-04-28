import { getDictionary } from "@/lib/getDictionary";
import BlogClient from "./BlogClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en" };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}/blog`,
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

  return <BlogClient dict={dict} locale={locale} />;
}
