import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const iWantPages: Record<string, { title: string; desc: string; cta?: { label: string; href: string } }> = {
  "soil-testing": { title: "Which crop can I grow on my soil?", desc: "Our comprehensive soil testing service analyzes your soil's physical and chemical properties to determine which crops will thrive. We provide detailed fertilizer recommendations tailored to your specific soil conditions and crop requirements.", cta: { label: "Request Soil Testing", href: "/services/soil-testing" } },
  "do-a-water-test": { title: "Is my water safe to drink?", desc: "Water quality testing for drinking water, irrigation, and industrial use. We test for chemical, physical, and microbiological parameters to ensure your water meets safety standards.", cta: { label: "Request Water Testing", href: "/services/do-a-water-test" } },
  "do-food-test": { title: "Is this food safe to eat?", desc: "Comprehensive food safety testing including aflatoxin analysis, pesticide residues, heavy metals, and microbiological contamination. Protect your consumers and meet regulatory requirements.", cta: { label: "Request Food Testing", href: "/services/do-food-test" } },
  "do-land-suitability-survey": { title: "Should I buy this land to farm?", desc: "Test before you invest. Our land suitability surveys assess soil quality, topography, drainage, and climate factors to determine whether land is suitable for your intended agricultural use.", cta: { label: "Request Land Survey", href: "/services/do-land-suitability-survey" } },
  "do-palnt-test": { title: "What is wrong with my crop?", desc: "Our plant tissue analysis and disease diagnosis services help identify nutrient deficiencies, toxicities, and diseases affecting your crops. Get accurate diagnosis and treatment recommendations.", cta: { label: "Request Plant Testing", href: "/services/do-palnt-test" } },
  "talk-to-an-agronomist": { title: "Talk to an agronomist", desc: "Get expert advice from our certified agronomists. Whether you need help with soil management, crop selection, pest control, or farm planning, our team is here to help you succeed.", cta: { label: "Contact an Agronomist", href: "/contact" } },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = iWantPages[slug];
  if (!page) return { title: "Page Not Found" };
  return { title: page.title };
}

export default async function IWantToPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = iWantPages[slug];
  if (!page) notFound();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-gray-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white text-center px-4">{page.title}</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-600 leading-relaxed mb-8">{page.desc}</p>
          {page.cta && (
            <Link href={page.cta.href} className="banner_cta">
              {page.cta.label}
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
