import { getDictionary } from "@/lib/getDictionary";
import About from "./About";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en" };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}/about`,
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

  return <About dict={dict} locale={locale} />;
}
