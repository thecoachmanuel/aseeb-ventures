import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

export const metadata: Metadata = { title: "Blog" };

async function getPosts() {
  try {
    await connectDB();
    return await BlogPost.find({ isPublished: true })
      .select("title slug author publishedAt excerpt featuredImage categories tags")
      .sort({ publishedAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/blog-banner.jpg')" }}>
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
            {["Agronomy Articles", "How to Videos", "Library", "News", "Nutritional Knowledge"].map((cat) => (
              <Link key={cat} href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-crop-green/10 hover:text-crop-green transition-colors">
                {cat}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post: any) => (
                <article key={post._id.toString()} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: post.featuredImage ? `url(${post.featuredImage})` : undefined }} />
                  </Link>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(post.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                    <h3 className="font-bold mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-crop-green transition-colors">{post.title}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="text-crop-green text-sm font-medium hover:underline">Read More</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
