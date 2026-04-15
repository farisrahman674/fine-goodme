import { getDictionary } from "@/lib/getDictionary";
import BlogClient from "./BlogClient";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "id" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <BlogClient dict={dict} locale={locale} />;
}
