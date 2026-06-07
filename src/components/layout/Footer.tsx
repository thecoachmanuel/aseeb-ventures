"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Footer() {
  const [locations, setLocations] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/content?resource=locations").then(r => r.json()),
      fetch("/api/content?resource=siteconfig").then(r => r.json()),
    ]).then(([l, c]) => {
      setLocations(Array.isArray(l) ? l : []);
      setConfig(c && c.siteName ? c : null);
    }).catch(() => {});
  }, []);

  const defaultLinks = {
    wantToKnow: [
      { label: "Which crop can I grow on my soil?", href: "/i-want-to/soil-testing" },
      { label: "Is my water safe to drink?", href: "/i-want-to/do-a-water-test" },
      { label: "Is this food safe to eat?", href: "/i-want-to/do-food-test" },
      { label: "What is wrong with my crop?", href: "/i-want-to/do-palnt-test" },
    ],
    solutions: [
      { label: "Soil Mapping for Smart Fertilizer Blending", href: "/services/soil-mapping" },
      { label: "Land Suitability Surveys", href: "/i-want-to/do-land-suitability-survey" },
      { label: "Independent Product Trials", href: "/services/product-trials" },
      { label: "Agronomy Training", href: "/i-want-to/talk-to-an-agronomist" },
    ],
    quickLinks: [
      { label: "About Us", href: "/about" },
      { label: "Library", href: "/blog/category/library" },
      { label: "Resources", href: "/resources" },
      { label: "Contact Us", href: "/contact" },
    ],
  };

  const socialLinks = config?.socialLinks || { facebook: "https://facebook.com/", twitter: "https://twitter.com/", instagram: "https://www.instagram.com/" };
  const phone = config?.phone || "+234 805 616 5347";
  const address = config?.address || "Shop 21 Lagelu Shopping Complex, Opposite Dizengoff, Monatan, Ibadan";
  const copyright = (config?.copyright || "© Copyright {year} - Aseeb Ventures Ltd.").replace("{year}", String(new Date().getFullYear()));

  return (
    <>
      {/* Newsletter */}
      <section className="bg-[#009050] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img src="/icons/newsletter_icon.svg" alt="" className="w-12 h-12" />
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Subscribe to our Newsletter</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            Get the latest news from Aseeb Ventures and don&apos;t miss out on the latest in independent agronomy,
            including articles, alerts, case studies and training opportunities plus much more. All sent directly to your inbox.
          </p>
          <form
            id="frm_newsletter"
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const fd = new FormData(form);
              try {
                const res = await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(Object.fromEntries(fd)),
                });
                if (res.ok) { form.reset(); alert("Thank you for subscribing!"); }
                else { alert("Something went wrong. Please try again."); }
              } catch { alert("Something went wrong. Please try again."); }
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" type="text" placeholder="First Name" required className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
              <input name="lastName" type="text" placeholder="Last Name" required className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="phone" type="tel" placeholder="Phone Number" required className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
              <input name="email" type="email" placeholder="Enter your email" required className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50" />
            </div>
            <button type="submit" className="px-8 py-3 bg-white text-[#009050] rounded-lg font-semibold hover:bg-white/90 transition-colors">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-1">
              <h4 className="font-semibold text-lg mb-4">About Aseeb Ventures</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Aseeb Ventures is a private company that offers laboratory analytics and expert agricultural advice in Africa. We started out as a small analytical laboratory, offering services for agriculture and food safety...
              </p>
              <Link href="/about" className="text-[#009050] text-sm font-medium hover:underline">Read More</Link>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">I would like to know...</h4>
              <ul className="space-y-3">
                {defaultLinks.wantToKnow.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-gray-400 text-sm hover:text-[#009050] transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Solutions</h4>
              <ul className="space-y-3">
                {defaultLinks.solutions.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-gray-400 text-sm hover:text-[#009050] transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {defaultLinks.quickLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-gray-400 text-sm hover:text-[#009050] transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Details</h4>
              <p className="text-gray-400 text-sm mb-4">{address}</p>
              <div className="space-y-4 text-sm text-gray-400">
                {locations.length === 0 ? (
                  <p className="text-gray-400">{phone}</p>
                ) : (
                  locations.map((loc: any) => (
                    <div key={loc._id}>
                      <span className="font-medium text-white">{loc.country}</span>, {loc.city}<br />
                      <a href={`tel:${loc.phone}`} className="hover:text-[#009050] transition-colors">{loc.phone}</a><br />
                      <a href={`mailto:${loc.email}`} className="hover:text-[#009050] transition-colors">{loc.email}</a>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-3 mt-4">
                {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener" title="Facebook"><img src="/icons/facebook_icon.svg" alt="Facebook" className="w-6 h-6" /></a>}
                {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener" title="Twitter"><img src="/icons/twitter_icon.svg" alt="Twitter" className="w-6 h-6" /></a>}
                {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener" title="Instagram"><img src="/icons/instagram_icon.svg" alt="Instagram" className="w-6 h-6" /></a>}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
          {copyright}
          <Link href="/terms-and-conditions" className="mx-2 hover:text-[#009050] transition-colors">Terms & Conditions</Link> |
          <Link href="/privacy-policy" className="mx-2 hover:text-[#009050] transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </>
  );
}
