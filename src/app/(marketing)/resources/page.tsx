import { Metadata } from "next";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Soil Sampling Guide", "Fertilizer Recommendation Charts", "Crop Nutrition Handbook", "Water Quality Standards", "Food Safety Guidelines", "Carbon Farming Overview"].map((title) => (
              <div key={title} className="bg-crop-gray p-6 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-gray-500">PDF Document</p>
                </div>
                <button className="bg-crop-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crop-green-dark transition-colors">Download</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
