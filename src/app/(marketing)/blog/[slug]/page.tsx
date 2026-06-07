import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";

async function getPost(slug: string) {
  try {
    await connectDB();
    return await BlogPost.findOne({ slug, isPublished: true }).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt?.substring(0, 160) || post.title };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        {(post.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-400 mb-2">
          {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
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
