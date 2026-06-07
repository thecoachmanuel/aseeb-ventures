import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";

export const metadata: Metadata = { title: "Our Services" };

async function getServices() {
  try {
    await connectDB();
    return await Service.find({ isActive: true })
      .select("name slug category shortDescription icon image")
      .sort({ order: 1 })
      .lean();
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/services-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">Our Services</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Comprehensive Laboratory & Advisory Services</h2>
            <p className="text-gray-600">
              From soil testing to precision agriculture, we provide end-to-end solutions for farmers, agribusinesses, and environmental monitoring across Africa.
            </p>
          </div>

          {services.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No services available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(services as any[]).map((svc) => (
                <Link
                  key={svc._id.toString()}
                  href={`/services/${svc.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-crop-green hover:shadow-lg transition-all"
                >
                  {svc.icon && <img src={svc.icon} alt="" className="w-12 h-12 mb-4" />}
                  <h3 className="font-bold text-lg mb-2 group-hover:text-crop-green transition-colors">{svc.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{svc.shortDescription}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
