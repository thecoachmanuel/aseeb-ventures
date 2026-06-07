import { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { Resource } from "@/models/Resource";

export const metadata: Metadata = { title: "Resources" };

async function getResources() {
  try {
    await connectDB();
    return await Resource.find({ isPublished: true }).sort({ order: 1 }).lean();
  } catch {
    return [];
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/resources-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">Resources</h1>
            <p className="text-white/70">Data to help derive decisions</p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Please feel free to download. If you wish to republish any of these, express permission must be obtained from Aseeb Ventures.
          </p>
          {resources.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No resources available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(resources as any[]).map((r) => (
                <div key={r._id.toString()} className="bg-crop-gray p-6 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="text-sm text-gray-500">{r.description || r.fileType?.toUpperCase() + " Document"}</p>
                  </div>
                  <a href={r.fileUrl || "#"} className="bg-crop-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crop-green-dark transition-colors">Download</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
