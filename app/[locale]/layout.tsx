import "@/app/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./component/Navbar";
import Footer from "./component/MainFooter";
import { getDictionary } from "@/lib/getDictionary";
export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en" };
}): Promise<Metadata> {
  const { locale } = params;

  const baseUrl = "https://bcti.co.id";

  return {
    metadataBase: new URL(baseUrl),
    title: "BCTI",
    description: "BCTI",
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "id-ID": `${baseUrl}/id`,
        "en-US": `${baseUrl}/en`,
      },
    },
  };
}
export function generateStaticParams() {
  return [{ locale: "id" }, { locale: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: "id" | "en" };
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
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "BCTI | Bestone Cold Technology Indonesia",
                alternateName: "BCTI",
                url: `https://bcti.co.id/${locale}`, // 🔥 dynamic sekalian
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "BCTI | Bestone Cold Technology Indonesia",
                url: `https://bcti.co.id/${locale}`,
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
