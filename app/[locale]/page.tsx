import { getDictionary } from "@/lib/getDictionary";
import HomeClient from "./HomeClient";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "id" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <HomeClient dict={dict} locale={locale} />;
}
