import { Suspense } from "react";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/models/HeroSlide";
import { Pillar } from "@/models/Pillar";
import { Stat } from "@/models/Stat";
import { SuccessStory } from "@/models/SuccessStory";
import { BlogPost } from "@/models/BlogPost";
import { IWantToOption } from "@/models/IWantToOption";
import { HeroSlider } from "./HeroSlider";
import { IWantToKnow } from "./IWantToKnow";
import { SearchResultsSection } from "./SearchResultsSection";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <SearchResultsSection />
      </Suspense>
      <HomePageContent />
    </>
  );
}

async function HomePageContent() {
  await connectDB();
  const [slides, pillars, stats, stories, posts, iwantto] = await Promise.all([
    HeroSlide.find({ isActive: true }).sort({ order: 1 }).lean(),
    Pillar.find({ isActive: true }).sort({ order: 1 }).lean(),
    Stat.find({ isActive: true }).sort({ order: 1 }).lean(),
    SuccessStory.find({ isPublished: true }).select("title slug excerpt image farmerName location crop").sort({ createdAt: -1 }).lean(),
    BlogPost.find({ isPublished: true }).select("title slug author publishedAt excerpt featuredImage categories tags").sort({ publishedAt: -1 }).limit(3).lean(),
    IWantToOption.find({ isActive: true }).sort({ order: 1 }).lean(),
  ]);

  return (
    <>
      <HeroSlider slides={JSON.parse(JSON.stringify(slides))} />

      <IWantToKnow options={JSON.parse(JSON.stringify(iwantto))} />

      {/* Center of Excellence */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Center of Analytical & Agronomy Excellence</h2>
            <p className="text-gray-600 leading-relaxed">
              Aseeb Ventures is Africa&apos;s leading agricultural equipment, agrochemicals, testing laboratory & agronomy advisory services company. Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease & nematode <Link href="/services/laboratory-services" className="text-crop-green hover:underline">laboratory analysis.</Link>
            </p>
            <p className="text-gray-600 mt-3 leading-relaxed">
              Leading farm management consultants offering <Link href="/services/farm-advisory-services" className="text-crop-green hover:underline">farm advisory services</Link> with advanced tools such as satellite imagery for precision farming, GIS applications for soil mapping & land suitability surveys.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((pillar: any) => (
              <Link key={pillar._id} href={pillar.href} className="group relative rounded-2xl overflow-hidden h-[400px] bg-cover bg-center" style={{ backgroundImage: pillar.image ? `url(${pillar.image})` : undefined }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">{pillar.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold bg-white/20 px-4 py-2 rounded-lg group-hover:bg-white/30 transition-colors">VIEW SERVICES</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#009050] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat: any) => (
              <div key={stat._id}>
                <p className="text-3xl lg:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="relative bg-crop-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 max-w-4xl mx-auto text-center lg:text-left">
            <div className="flex-shrink-0">
              <img src="/icons/accreditation_icon.svg" alt="" className="w-16 h-16" />
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Our Laboratory is Internationally Accredited</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Aseeb Ventures is accredited and fulfills the general competence requirements for testing and calibration laboratories and demonstrates our ability to carry out laboratory testing and calibration to an international standard.
              </p>
              <Link href="/services/laboratory-services" className="banner_cta_outline">READ MORE</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <img src="/icons/champion_icon.svg" alt="" className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Real Farmers, Real Success Stories</h2>
            <p className="text-gray-600">Find out more about how we are working with farmers to improve their yields</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((story: any) => (
              <div key={story._id} className="flex flex-col lg:flex-row bg-crop-gray rounded-2xl overflow-hidden">
                <div className="lg:w-2/5 h-48 lg:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${story.image})` }} />
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">{story.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{story.excerpt}</p>
                  <Link href={`/success-stories/${story.slug}`} className="banner_cta text-sm w-fit">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / News */}
      <section className="section bg-crop-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <img src="/icons/news_icon.svg" alt="" className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Stay Informed, Be Inspired</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get the latest news from Aseeb Ventures and don&apos;t miss out on the latest in independent agronomy, including articles, alerts, case studies and training opportunities plus much more.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`}>
                  <div className="h-48 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: post.featuredImage ? `url(${post.featuredImage})` : undefined }} />
                </Link>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(post.tags || []).slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-xs bg-crop-green/10 text-crop-green px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                  <h4 className="font-bold mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-crop-green transition-colors">{post.title}</Link>
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-crop-green text-sm font-medium hover:underline">Read More</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog/category/agronomy-articles" className="banner_cta">
              VIEW ALL NEWS
              <svg className="w-3 h-3" viewBox="0 0 10 10" fill="currentColor"><rect x="4" y="0" width="2" height="10" rx="1" /><rect x="4" y="0" width="2" height="10" rx="1" transform="rotate(90 5 5)" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
