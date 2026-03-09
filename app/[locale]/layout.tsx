import "@/app/globals.css";
import type { Metadata } from "next";
import Navbar from "./component/Navbar";
import Footer from "./component/MainFooter";
import { getDictionary } from "@/lib/getDictionary";
export const metadata: Metadata = {
  title: "Bestone Cold Technology Indonesia",
  description: "Bestone Cold Technology Indonesia",
};
export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "id" | "en" }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <html lang={locale}>
      <body>
        {/* NAVBAR */}
        <Navbar locale={locale} dict={dict} />
        {children}

        {/* MAIN FOOTER */}
        <Footer dict={dict} locale={locale} />

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white p-6 text-center">
          © 2026 BCTI
        </footer>
      </body>
    </html>
  );
}
