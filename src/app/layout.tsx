import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aseeb Ventures",
    template: "%s - Aseeb Ventures",
  },
  description: "Aseeb Ventures is Africa's leading agricultural testing laboratory & agronomy advisory services company. Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease & nematode laboratory analysis.",
  openGraph: {
    title: "Aseeb Ventures",
    description: "Africa's leading agricultural testing laboratory & agronomy advisory services company.",
    url: "https://aseeb-ventures.vercel.app",
    siteName: "Aseeb Ventures",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aseeb Ventures",
    description: "Africa's leading agricultural testing laboratory & agronomy advisory services company.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
