import { getDictionary } from "@/lib/getDictionary";
import HomeClient from "./[locale]/HomeClient";
import Navbar from "./[locale]/component/Navbar";
import Footer from "./[locale]/component/MainFooter";

export default async function Page() {
  const locale = "id";
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} />

      <HomeClient locale={locale} dict={dict} />

      <Footer locale={locale} dict={dict} />

      <footer className="bg-gray-900 text-white p-6 text-center">
        © 2026 BCTI
      </footer>
    </>
  );
}
