import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; date: string; content: string; tags: string[] }> = {
  "improving-the-availability-of-plant-nutrients": {
    title: "Improving the Availability of Plant Nutrients",
    date: "April 24, 2025",
    tags: ["Soil health", "Crop Nutrition", "Crop Production", "Soil Testing"],
    content: `Even when fertilizers are applied, plants don't always get the nutrients they need. Nutrient availability depends on several soil and environmental factors, and optimizing these factors can significantly boost plant uptake and improve crop performance.

1. Nitrogen (N) — Apply nitrogen in split doses to reduce leaching losses, especially in sandy soils. Organic matter additions improve nitrogen retention and slow release.

2. Phosphorus (P) — Phosphorus availability is highly pH-dependent. Maintain soil pH between 6.0–7.0 for optimal phosphorus uptake. Mycorrhizal fungi can enhance phosphorus absorption.

3. Potassium (K) — Potassium availability decreases in sandy soils with low CEC. Regular soil testing helps maintain adequate potassium levels.

4. Calcium (Ca) — Calcium is essential for cell wall strength and root development. Apply lime to acidic soils to increase calcium availability.

5. Magnesium (Mg) — Magnesium is the central element in chlorophyll. Foliar applications of magnesium sulfate can quickly correct deficiencies.

6. Micronutrients — Iron, zinc, manganese, copper, and boron availability is strongly influenced by soil pH. Chelated micronutrient formulations improve plant uptake in high pH soils.

Key Takeaway: Regular soil testing is essential for understanding nutrient availability in your soils. Contact Cropnuts for comprehensive soil analysis and tailored fertilizer recommendations.`,
  },
  "soil-cation-exchange-capacity-cec": {
    title: "Understanding Soil Cation Exchange Capacity (CEC)",
    date: "April 21, 2025",
    tags: ["Soil health", "Crop Nutrition", "Crop Production", "Soil Testing"],
    content: `Cation Exchange Capacity (CEC) is a fundamental soil property that influences how well soils retain and supply essential nutrients to crops. Knowing and managing your soil's CEC enables growers to reduce fertilizer waste, optimize input costs, and improve long-term soil health.

What is CEC?
CEC measures the soil's ability to hold and exchange positively charged nutrient ions (cations) such as calcium (Ca²⁺), magnesium (Mg²⁺), potassium (K⁺), ammonium (NH₄⁺), and sodium (Na⁺). Soils with higher CEC can hold more nutrients and are generally more fertile.

Factors Affecting CEC:
- Clay content and type — Soils with higher clay content typically have higher CEC. Smectite and vermiculite clays have much higher CEC than kaolinite.
- Organic matter — Humus has a very high CEC, so increasing soil organic matter is one of the best ways to improve CEC.
- Soil pH — CEC increases with pH as more exchange sites become available.

Why CEC Matters:
- Nutrient retention — High CEC soils hold nutrients better, reducing leaching losses.
- Fertilizer management — Understanding CEC helps determine appropriate fertilizer application rates and timing.
- Lime requirement — CEC is used to calculate lime requirements for acidic soils.

Contact Cropnuts for soil CEC analysis as part of our comprehensive soil testing package.`,
  },
  "factors-affecting-nutrient-availability-to-plants": {
    title: "Factors Affecting Nutrient Availability to Plants",
    date: "March 31, 2025",
    tags: ["Soil health", "Crop Nutrition", "Crop Production"],
    content: `Even when fertilizers are generously applied, plants don't always get the nutrients they need. Why? Several key soil and environmental factors influence how effectively plants can access and absorb nutrients.

1. Soil pH — Soil pH determines how easily plants can take up nutrients. Most crops thrive in a pH range of 5.5–7.0, where most nutrients are maximally available.

2. Soil Texture — Sandy soils have low nutrient holding capacity. Clay soils retain nutrients better but may have drainage issues that affect root health.

3. Organic Matter — Organic matter improves soil structure, water holding capacity, and provides slow-release nutrients. It also supports beneficial soil microorganisms.

4. Soil Moisture — Both drought and waterlogging reduce nutrient uptake. Adequate and consistent moisture is essential for nutrient dissolution and root absorption.

5. Soil Temperature — Cold soils slow down root activity and microbial processes, reducing nutrient availability. Warm soils promote faster nutrient cycling.

6. Nutrient Interactions — Some nutrients compete for uptake. For example, high potassium can reduce magnesium uptake, and high phosphorus can reduce zinc availability.

Recommendation: Regular comprehensive soil testing through Cropnuts can identify these limiting factors and help you develop effective nutrient management strategies.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.content.substring(0, 160) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-sm text-gray-400 mb-2">{post.date}</p>
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="text-crop-green font-medium hover:underline">← Back to Articles</Link>
        </div>
      </div>
    </article>
  );
}
