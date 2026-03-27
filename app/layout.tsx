import "@/app/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "BCTI | Bestone Cold Technology Indonesia",
  description: "BCTI | Bestone Cold Technology Indonesia",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
