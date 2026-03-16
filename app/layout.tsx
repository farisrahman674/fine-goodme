import "@/app/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "BCTI",
  description: "Bestone Cold Technology Indonesia",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
