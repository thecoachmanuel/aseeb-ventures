import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = { title: "Who We Are" };

export default function AboutPage() {
  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/about-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">Who We Are</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-headings:text-crop-dark max-w-none">
            <h2 className="text-2xl lg:text-3xl font-bold">Center of Analytical & Agronomy Excellence</h2>
            <p className="text-gray-600 leading-relaxed mt-4">
              Aseeb Ventures is Africa&apos;s leading agricultural testing laboratory & agronomy advisory services company. We are leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease & nematode laboratory analysis.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              We are leading farm management consultants offering farm advisory services with advanced tools such as satellite imagery for precision farming, GIS applications for soil mapping & land suitability surveys.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold mt-12">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide world-class laboratory analytical services and expert agricultural advice that empowers farmers across Africa to grow more with less, ensuring food security and environmental sustainability.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold mt-12">Our Presence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {[{ country: "Kenya", city: "Limuru", phone: "+254 711 094 444" }, { country: "Nigeria", city: "Ibadan", phone: "+234 803 978 4205" }, { country: "Zambia", city: "Lusaka", phone: "+260 97 742 2250" }].map((loc) => (
                <div key={loc.country} className="bg-crop-gray p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-crop-green">{loc.country}</h3>
                  <p className="text-sm text-gray-600">{loc.city}</p>
                  <p className="text-sm text-gray-600">{loc.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
