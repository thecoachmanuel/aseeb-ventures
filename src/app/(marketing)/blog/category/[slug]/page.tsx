import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

const categoryLabels: Record<string, string> = {
  "agronomy-articles": "Agronomy Articles",
  "how-to-videos": "How to Videos",
  library: "Library",
  news: "News",
  "nutritional-knowledge": "Nutritional Knowledge",
};

async function getPosts(category: string) {
  try {
    await connectDB();
    return await BlogPost.find({ isPublished: true, categories: categoryLabels[category] || category })
      .select("title slug publishedAt excerpt featuredImage categories tags")
      .sort({ publishedAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: categoryLabels[slug] || "Category" };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = categoryLabels[slug];
  const posts = await getPosts(slug);

  if (!title) return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">Category not found</h1>
      <Link href="/blog" className="text-crop-green hover:underline">Back to Blog</Link>
    </section>
  );

  const banners: Record<string, string> = {
    "how-to-videos": "/images/banners/news-banner.jpg",
    news: "/images/banners/news-banner.jpg",
  };

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: `url('${banners[slug] || "/images/banners/blog-banner.jpg"}')` }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">{title}</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(posts as any[]).map((post) => (
                <article key={post._id.toString()} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: post.featuredImage ? `url(${post.featuredImage})` : undefined }} />
                  </Link>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(post.tags || []).slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
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
