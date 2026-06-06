import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Success Stories" };

const stories = [
  { title: "How We Achieved Massive 11.84 ton/ha Barley Yield", slug: "barley-farming-in-kenya", excerpt: "Barley farming in Nigeria is setting new yield records as witnessed in various barley trials conducted in Jos, Plateau State. Trials are a huge part of making progress in farming, and back in September 2018 we harvested something truly special.", location: "Jos, Plateau State", crop: "Barley" },
  { title: "Soil Testing For Smallscale Farmers In Malawi", slug: "soil-testing-for-smallscale-farmers-in-malawi", excerpt: "Our on-site AI based soil testing platform has already reached 90,000 smallholder farmers across Africa, bringing affordable and accessible soil analysis to those who need it most.", location: "Malawi", crop: "Various" },
];

export default function SuccessStoriesPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <Link key={story.slug} href={`/success-stories/${story.slug}`} className="group bg-crop-gray rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/images/cards/success-card.jpg')" }} />
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
        </div>
      </section>
    </>
  );
}
