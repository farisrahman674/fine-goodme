import "@/app/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "BCTI | Bestone Cold Technology Indonesia",
  description: "Bestone Cold Technology Indonesia",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "BCTI | Bestone Cold Technology Indonesia",
                alternateName: "BCTI",
                url: "https://bcti.co.id",
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "BCTI | Bestone Cold Technology Indonesia",
                url: "https://bcti.co.id",
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
