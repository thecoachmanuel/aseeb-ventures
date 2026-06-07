import { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/models/SuccessStory";

export const metadata: Metadata = { title: "Success Stories" };

async function getStories() {
  try {
    await connectDB();
    return await SuccessStory.find({ isPublished: true })
      .select("title slug excerpt image farmerName location crop")
      .sort({ createdAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export default async function SuccessStoriesPage() {
  const stories = await getStories();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/success-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">Success Stories</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {stories.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No success stories yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.map((story: any) => (
                <Link key={story._id.toString()} href={`/success-stories/${story.slug}`} className="group bg-crop-gray rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${story.image || "/images/cards/success-card.jpg"})` }} />
                  <div className="p-6">
                    <div className="flex gap-3 text-xs text-crop-green font-medium mb-2">
                      {story.location && <span>{story.location}</span>}
                      {story.crop && <span>• {story.crop}</span>}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-crop-green transition-colors">{story.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{story.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
