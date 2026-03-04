import { getDictionary } from "@/lib/getDictionary";
import ProdukClient from "./ProdukClient";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "id" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <ProdukClient dict={dict} locale={locale} />;
}
