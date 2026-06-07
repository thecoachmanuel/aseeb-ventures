import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";

async function getService(slug: string) {
  try {
    await connectDB();
    return await Service.findOne({ slug, isActive: true }).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = await getService(slug);
  if (!svc) return { title: "Service Not Found" };
  return { title: svc.name };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = await getService(slug);
  if (!svc) notFound();

  const categoryLabels: Record<string, string> = {
    laboratory: "Laboratory Services",
    advisory: "Farm Advisory",
    agtech: "AgTech Solutions",
    "i-want-to": "I Want To",
  };

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/services-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-crop-green text-sm font-medium uppercase tracking-wider mb-2">
              {categoryLabels[svc.category] || svc.category}
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold text-white">{svc.name}</h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed text-lg">{svc.description}</p>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Get Started</h2>
              <p className="text-gray-600">Contact us today to learn more about this service and how it can benefit your farm or business.</p>
              <Link href="/contact" className="banner_cta mt-4">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
