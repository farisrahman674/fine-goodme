import { getDictionary } from "@/lib/getDictionary";
import About from "./About";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: "id" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <About dict={dict} />;
}
