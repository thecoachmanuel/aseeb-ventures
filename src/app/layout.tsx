import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { connectDB } from "@/lib/db";
import { NavItem } from "@/models/NavItem";
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

async function getNavItems() {
  try {
    await connectDB();
    const [items, children] = await Promise.all([
      NavItem.find({ isActive: true, parentId: null }).sort({ order: 1 }).lean(),
      NavItem.find({ isActive: true, parentId: { $ne: null } }).sort({ order: 1 }).lean(),
    ]);
    return items.map((item: any) => {
      const itemChildren = children.filter(
        (c: any) => c.parentId?.toString() === item._id.toString()
      );
      return {
        ...item,
        _id: item._id.toString(),
        megaContent: itemChildren.length > 0
          ? itemChildren.map((c: any) => ({
              icon: c.icon,
              title: c.label,
              description: c.description,
              href: c.href,
            }))
          : undefined,
      };
    });
  } catch {
    return [];
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const navItems = await getNavItems();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <LayoutShell navItems={navItems}>{children}</LayoutShell>
      </body>
    </html>
  );
}
