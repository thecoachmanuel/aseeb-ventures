"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/contact-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-gray-600">
              We&apos;ve crafted farming solutions for farmers around the world. Our clients come in all shapes and sizes — from small-scale farmers to large agribusinesses. Get in touch and let us help you grow more with less.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const fd = new FormData(form);
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(Object.fromEntries(fd)),
                  });
                  if (res.ok) {
                    form.reset();
                    alert("Thank you! Your message has been sent. We will get back to you shortly.");
                  } else {
                    alert("Something went wrong. Please try again.");
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder="Full Name *" required className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
                  <input name="email" type="email" placeholder="Email Address *" required className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="phone" type="tel" placeholder="Phone Number" className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
                  <input name="company" type="text" placeholder="Company / Farm Name" className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
                </div>
                <select name="service" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" defaultValue="">
                  <option value="" disabled>Select Service (Optional)</option>
                  <option value="soil-testing">Soil Testing</option>
                  <option value="water-testing">Water Quality Testing</option>
                  <option value="food-safety">Food Safety Testing</option>
                  <option value="plant-testing">Plant Tissue Analysis</option>
                  <option value="land-survey">Land Suitability Survey</option>
                  <option value="advisory">Farm Advisory</option>
                  <option value="agtech">AgTech Solutions</option>
                  <option value="training">Agronomy Training</option>
                </select>
                <textarea name="message" rows={5} placeholder="Your Message *" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crop-green focus:border-transparent" />
                <button type="submit" className="bg-crop-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-crop-green-dark transition-colors">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              {[
                { country: "Nigeria", city: "Ibadan", address: "Plot 12, Oluyole Industrial Estate", phone: "+234 803 978 4205", email: "info@aseeb-ventures.vercel.app" },
                { country: "Zambia", city: "Lusaka", address: "Plot 45, Lusaka South MFEZ", phone: "+260 97 742 2250", email: "info@aseeb-ventures.vercel.app" },
              ].map((loc) => (
                <div key={loc.country} className="bg-crop-gray p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-crop-green">{loc.country} — {loc.city}</h3>
                  {loc.address && <p className="text-sm text-gray-600 mt-1">{loc.address}</p>}
                  <p className="text-sm text-gray-600">
                    <a href={`tel:${loc.phone}`} className="hover:text-crop-green">{loc.phone}</a>
                  </p>
                  <p className="text-sm text-gray-600">
                    <a href={`mailto:${loc.email}`} className="hover:text-crop-green">{loc.email}</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
