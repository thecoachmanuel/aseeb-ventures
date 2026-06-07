import { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { Nutrient } from "@/models/Nutrient";

export const metadata: Metadata = { title: "Nutritional Knowledge" };

async function getNutrients() {
  try {
    await connectDB();
    return await Nutrient.find({ isActive: true }).sort({ order: 1 }).lean();
  } catch {
    return [];
  }
}

export default async function NutritionalKnowledgePage() {
  const nutrients = await getNutrients();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/nutrition-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">Nutritional Knowledge</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-gray-600">
              Get to know nutrition requirements of plants and find out how various chemical elements in your soil affect your plant growth.
            </p>
          </div>
          {nutrients.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No nutrient data available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(nutrients as any[]).map((n) => (
                <div key={n._id.toString()} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-crop-green mb-3">{n.name}</h3>
                  <p className="text-sm text-gray-600 mb-2"><strong className="text-gray-800">Role:</strong> {n.role}</p>
                  <p className="text-sm text-gray-600"><strong className="text-gray-800">Deficiency:</strong> {n.deficiency}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
