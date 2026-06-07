import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/models/SuccessStory";

async function getStory(slug: string) {
  try {
    await connectDB();
    return await SuccessStory.findOne({ slug, isPublished: true }).lean();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story Not Found" };
  return { title: story.title };
}

export default async function SuccessStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-3 mb-4 text-sm">
          {story.location && <span className="text-crop-green font-medium">{story.location}</span>}
          {story.crop && <span className="text-gray-400">• {story.crop}</span>}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">{story.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {story.content}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/success-stories" className="text-crop-green font-medium hover:underline">← Back to Success Stories</Link>
        </div>
      </div>
    </article>
  );
}
