import "@/app/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./component/Navbar";
import Footer from "./component/MainFooter";
import { getDictionary } from "@/lib/getDictionary";
import { prisma } from "@/src/lib/prisma";
import { Analytics } from "@vercel/analytics/react";
export async function generateMetadata({
  params,
}: {
  params: { locale: "id" | "en" };
}): Promise<Metadata> {
  const baseUrl = "https://bcti.co.id";

  return {
    metadataBase: new URL(baseUrl),
    title: "BCTI",
    description: "BCTI",
    alternates: {
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
  const isProduction = process.env.VERCEL_ENV === "production";

  const categories = await prisma.category.findMany({
    where: isProduction
      ? {
          status: "ACTIVE",
        }
      : {},
  });

  const parents = categories.filter((c) => !c.parentId);

  const categoryTree = parents.map((parent) => ({
    ...parent,
    children: categories.filter((c) => c.parentId === parent.id),
  }));
  return (
    <html lang={locale}>
      <body>
        {/* NAVBAR */}
        <Navbar locale={locale} dict={dict} categories={categoryTree} />
        {children}

        {/* MAIN FOOTER */}
        <Footer dict={dict} locale={locale} />

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white px-6 py-4">
          <div className="relative flex flex-col items-center md:block">
            <div className="text-center font-medium">© 2026 BCTI</div>

            <div className="mt-1 text-[11px] text-gray-500 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:mt-0">
              Developed by Faris Rahman Shalih
            </div>
          </div>
        </footer>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
        </Script>
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
        <Analytics />
      </body>
    </html>
  );
}
