import "@/app/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "BCTI",
  description: "BCTI",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
