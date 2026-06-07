import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { IWantToOption } from "@/models/IWantToOption";

async function getOption(slug: string) {
  try {
    await connectDB();
    return await IWantToOption.findOne({ href: `/i-want-to/${slug}`, isActive: true }).lean();
  } catch {
    return null;
  }
}

// Fallback titles for existing routes
const fallbackTitles: Record<string, string> = {
  "soil-testing": "Which crop can I grow on my soil?",
  "do-a-water-test": "Is my water safe to drink?",
  "do-food-test": "Is this food safe to eat?",
  "do-land-suitability-survey": "Should I buy this land to farm?",
  "do-palnt-test": "What is wrong with my crop?",
  "talk-to-an-agronomist": "Talk to an agronomist",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getOption(slug);
  return { title: page?.label || fallbackTitles[slug] || "Page Not Found" };
}

export default async function IWantToPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getOption(slug);
  const title = page?.label || fallbackTitles[slug];
  if (!title) notFound();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/i-want-to-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white text-center px-4">{title}</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{page?.description || "Contact us today to learn more about this service and how it can benefit your farm or business."}</p>
          <Link href="/contact" className="banner_cta">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
