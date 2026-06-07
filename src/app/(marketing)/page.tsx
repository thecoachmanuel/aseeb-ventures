"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SearchResultsSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => { setResults(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  if (!query) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Search results for &ldquo;{query}&rdquo;
        </h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-[#009050] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : results.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No results found.</p>
        ) : (
          <div className="space-y-4">
            {results.map((r, i) => (
              <Link
                key={i}
                href={r.url}
                className="block bg-white rounded-xl p-6 shadow-sm border hover:border-[#009050] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${r.type === "service" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {r.type === "service" ? "Service" : "Article"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{r.excerpt?.substring(0, 200)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <SearchResultsSection />
      <HomePageContent />
    </Suspense>
  );
}

function HomePageContent() {
  const [slides, setSlides] = useState<any[]>([]);
  const [pillars, setPillars] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [iwantto, setIwantto] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("/api/content?resource=heroslides").then(r => r.json()),
      fetch("/api/content?resource=pillars").then(r => r.json()),
      fetch("/api/content?resource=stats").then(r => r.json()),
      fetch("/api/content?resource=stories").then(r => r.json()),
      fetch("/api/content?resource=blog").then(r => r.json()),
      fetch("/api/content?resource=iwantto").then(r => r.json()),
    ])
      .then(([s, p, st, ss, b, it]) => {
        setSlides(Array.isArray(s) ? s : []);
        setPillars(Array.isArray(p) ? p : []);
        setStats(Array.isArray(st) ? st : []);
        setStories(Array.isArray(ss) ? ss : []);
        setBlogPosts(Array.isArray(b) ? b : []);
        setIwantto(Array.isArray(it) ? it : []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const slideCount = slides.length || 1;

  const goToSlide = useCallback((index: number) => setCurrentSlide(index), []);
  const nextSlide = useCallback(() => setCurrentSlide(p => (p + 1) % slideCount), [slideCount]);
  const prevSlide = useCallback(() => setCurrentSlide(p => (p - 1 + slideCount) % slideCount), [slideCount]);

  const touchStartRef = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) nextSlide(); else prevSlide(); }
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#009050] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentSlideData = slides[currentSlide] || {};

  return (
    <>
      {/* Hero Slider */}
      <section
        className="relative h-[500px] lg:h-[600px] bg-gray-900 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={slide._id || i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: slide.image ? `url(${slide.image})` : undefined }}
          />
        ))}
        {!currentSlideData.image && <div className="absolute inset-0 bg-crop-dark" />}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl text-white transition-all duration-500" key={currentSlide}>
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">{currentSlideData.title}</h1>
              <p className="text-lg lg:text-xl text-white/90 mb-8">{currentSlideData.description}</p>
              <Link href={currentSlideData.ctaHref || "#"} className="banner_cta">{currentSlideData.ctaLabel || "READ MORE"}</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={prevSlide} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white items-center justify-center transition-colors backdrop-blur-sm" aria-label="Previous slide">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white items-center justify-center transition-colors backdrop-blur-sm" aria-label="Next slide">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </section>

      {/* I want to know */}
      <section className="py-8 bg-crop-gray">
        <div className="max-w-4xl mx-auto px-4">
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => { e.preventDefault(); }}>
            <select
              className="flex-1 px-4 py-3.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent"
              onChange={(e) => { if (e.target.value) window.location.href = e.target.value; }}
              defaultValue=""
            >
              <option value="" disabled>I would like to know...</option>
              {iwantto.map((o: any) => (
                <option key={o._id} value={o.href}>{o.label}</option>
              ))}
            </select>
            <button type="submit" className="bg-crop-green text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-crop-green-dark transition-colors">Get Advice</button>
          </form>
        </div>
      </section>

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
            {pillars.map((pillar) => (
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
            {stats.map((stat) => (
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
            {stories.map((story) => (
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
            {blogPosts.map((post) => (
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
