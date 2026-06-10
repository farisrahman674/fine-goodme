import { getDictionary } from "@/lib/getDictionary";
import NotFound from "./not-found";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en" };
}): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}`,
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

  return <NotFound dict={dict} locale={locale} />;
}
