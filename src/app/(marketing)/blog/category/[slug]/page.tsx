import { Metadata } from "next";
import Link from "next/link";

const categoryData: Record<string, { title: string; posts: { title: string; slug: string; date: string; excerpt: string; tags: string[] }[] }> = {
  "agronomy-articles": {
    title: "Agronomy Articles",
    posts: [
      { title: "Improving the Availability of Plant Nutrients", slug: "improving-the-availability-of-plant-nutrients", date: "April 24, 2025", excerpt: "Even when fertilizers are applied, plants don't always get the nutrients they need.", tags: ["Soil health", "Crop Nutrition"] },
      { title: "Understanding Soil Cation Exchange Capacity (CEC)", slug: "soil-cation-exchange-capacity-cec", date: "April 21, 2025", excerpt: "CEC is a fundamental soil property that influences how well soils retain nutrients.", tags: ["Soil health", "Crop Nutrition"] },
      { title: "Factors Affecting Nutrient Availability to Plants", slug: "factors-affecting-nutrient-availability-to-plants", date: "March 31, 2025", excerpt: "Several key soil and environmental factors influence nutrient availability.", tags: ["Soil health", "Crop Production"] },
    ],
  },
  "library": { title: "Library", posts: [] },
  "news": { title: "News", posts: [] },
  "how-to-videos": { title: "How to Videos", posts: [] },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryData[slug];
  return { title: cat?.title || "Category" };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryData[slug];
  if (!cat) return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">Category not found</h1>
      <Link href="/blog" className="text-crop-green hover:underline">Back to Blog</Link>
    </section>
  );

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/blog-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">{cat.title}</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {cat.posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/blog/${post.slug}`}><div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/images/cards/blog-card.jpg')" }} /></Link>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                    <h3 className="font-bold mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-crop-green transition-colors">{post.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="text-crop-green text-sm font-medium hover:underline">Read More</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No posts in this category yet.</p>
              <Link href="/blog" className="text-crop-green font-medium hover:underline">← Back to Blog</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
