"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface HeroSlideData {
  _id: string;
  title: string;
  description: string;
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function HeroSlider({ slides }: { slides: HeroSlideData[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const currentSlideData = slides[currentSlide] || {};

  return (
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
  );
}
