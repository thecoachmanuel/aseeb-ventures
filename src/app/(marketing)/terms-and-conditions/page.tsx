import { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { LegalPage } from "@/models/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

async function getPage() {
  try {
    await connectDB();
    return await LegalPage.findOne({ slug: "terms-and-conditions", isPublished: true }).lean();
  } catch {
    return null;
  }
}

export default async function TermsPage() {
  const page = await getPage();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">{page?.title || "Terms & Conditions"}</h1>
        {page ? (
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
            <p>Welcome to Aseeb Ventures. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">1. Services</h2>
            <p>Aseeb Ventures provides agricultural laboratory testing, agronomy advisory services, and AgTech solutions.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">2. Use of Website</h2>
            <p>The content of this website is for your general information and use only.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">3. Intellectual Property</h2>
            <p>All content, trademarks, logos, and intellectual property on this website are owned by or licensed to Aseeb Ventures.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">4. Limitation of Liability</h2>
            <p>Aseeb Ventures shall not be liable for any indirect, incidental, special, or consequential damages.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">5. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of Nigeria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
