import { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>Welcome to Aseeb Ventures. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">1. Services</h2>
          <p>Aseeb Ventures provides agricultural laboratory testing, agronomy advisory services, and AgTech solutions. All services are subject to availability and our standard terms of engagement.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">2. Use of Website</h2>
          <p>The content of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">3. Intellectual Property</h2>
          <p>All content, trademarks, logos, and intellectual property on this website are owned by or licensed to Aseeb Ventures. Reproduction is prohibited without express written permission.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">4. Limitation of Liability</h2>
          <p>Aseeb Ventures shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">5. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Nigeria.</p>
        </div>
      </div>
    </section>
  );
}
