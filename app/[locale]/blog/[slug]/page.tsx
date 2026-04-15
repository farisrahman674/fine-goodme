import { getDictionary } from "@/lib/getDictionary";
import BlogDetail from "./BlogDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "id" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <BlogDetail dict={dict} locale={locale} />;
}
