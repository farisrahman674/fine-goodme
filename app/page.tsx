import { getDictionary } from "@/lib/getDictionary";
import HomeClient from "./[locale]/HomeClient";

export default async function Page() {
  const locale = "id";
  const dict = await getDictionary(locale);

  return <HomeClient dict={dict} locale={locale} />;
}
