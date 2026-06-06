import { Metadata } from "next";

export const metadata: Metadata = { title: "Nutritional Knowledge" };

const nutrients = [
  { name: "Nitrogen (N)", role: "Essential for vegetative growth and protein synthesis. Key component of chlorophyll.", deficiency: "Yellowing of older leaves, stunted growth." },
  { name: "Phosphorus (P)", role: "Critical for root development, flowering, and energy transfer (ATP).", deficiency: "Purple discoloration of leaves, poor root growth." },
  { name: "Potassium (K)", role: "Regulates water balance, enzyme activation, and disease resistance.", deficiency: "Leaf margin burn, weak stems, poor fruit quality." },
  { name: "Calcium (Ca)", role: "Cell wall structure, root tip development, and enzyme activation.", deficiency: "Blossom end rot in tomatoes, tip burn in lettuce." },
  { name: "Magnesium (Mg)", role: "Central component of chlorophyll, essential for photosynthesis.", deficiency: "Interveinal chlorosis on older leaves." },
  { name: "Sulfur (S)", role: "Component of amino acids and proteins, essential for oil synthesis.", deficiency: "Overall yellowing, similar to nitrogen deficiency but on younger leaves." },
  { name: "Iron (Fe)", role: "Chlorophyll synthesis, electron transport in photosynthesis.", deficiency: "Interveinal chlorosis on young leaves." },
  { name: "Zinc (Zn)", role: "Auxin synthesis, enzyme activation, protein synthesis.", deficiency: "Small leaves, shortened internodes (rosetting)." },
  { name: "Boron (B)", role: "Cell wall formation, pollen tube growth, sugar transport.", deficiency: "Death of growing points, hollow stems, poor fruit set." },
];

export default function NutritionalKnowledgePage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nutrients.map((n) => (
              <div key={n.name} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-crop-green mb-3">{n.name}</h3>
                <p className="text-sm text-gray-600 mb-2"><strong className="text-gray-800">Role:</strong> {n.role}</p>
                <p className="text-sm text-gray-600"><strong className="text-gray-800">Deficiency:</strong> {n.deficiency}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
