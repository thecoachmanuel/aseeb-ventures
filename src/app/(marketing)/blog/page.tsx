import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  { title: "Improving the Availability of Plant Nutrients", slug: "improving-the-availability-of-plant-nutrients", date: "April 24, 2025", excerpt: "Even when fertilizers are applied, plants don't always get the nutrients they need. Nutrient availability depends on several soil and environmental factors, and optimizing these factors can significantly boost plant uptake and improve crop performance.", tags: ["Soil health", "Crop Nutrition", "Crop Production", "Soil Testing"] },
  { title: "Understanding Soil Cation Exchange Capacity (CEC)", slug: "soil-cation-exchange-capacity-cec", date: "April 21, 2025", excerpt: "Cation Exchange Capacity (CEC) is a fundamental soil property that influences how well soils retain and supply essential nutrients to crops.", tags: ["Soil health", "Crop Nutrition", "Crop Production", "Soil Testing"] },
  { title: "Factors Affecting Nutrient Availability to Plants", slug: "factors-affecting-nutrient-availability-to-plants", date: "March 31, 2025", excerpt: "Even when fertilizers are generously applied, plants don't always get the nutrients they need. Several key soil and environmental factors influence how effectively plants can access and absorb nutrients.", tags: ["Soil health", "Crop Nutrition", "Crop Production"] },
];

const categories = ["Agronomy Articles", "How to Videos", "Library", "News", "Nutritional Knowledge"];

export default function BlogPage() {
  return (
    <>
      <section className="relative h-64 lg:h-80 bg-gray-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-2">Articles & Resources</h1>
            <p className="text-white/70">Expert insights from our agronomy team</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            <Link href="/blog" className="px-4 py-2 bg-crop-green text-white rounded-full text-sm font-medium">All</Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-crop-green/10 hover:text-crop-green transition-colors">
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 bg-gray-200 bg-cover bg-center" />
                </Link>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                  <h3 className="font-bold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-crop-green transition-colors">{post.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-crop-green text-sm font-medium hover:underline">Read More</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
