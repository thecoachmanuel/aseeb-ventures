import { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { LegalPage } from "@/models/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

async function getPage() {
  try {
    await connectDB();
    return await LegalPage.findOne({ slug: "privacy-policy", isPublished: true }).lean();
  } catch {
    return null;
  }
}

export default async function PrivacyPolicyPage() {
  const page = await getPage();

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">{page?.title || "Privacy Policy"}</h1>
        {page ? (
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
            <p>Your privacy is important to us. This privacy statement explains the personal data Aseeb Ventures collects, how we process it, and for what purposes.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, request a service quote, or create an account.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">3. Data Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">4. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information.</p>
            <h2 className="text-xl font-bold text-crop-dark mt-8">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at aseebventure1@gmail.com.</p>
          </div>
        )}
      </div>
    </section>
  );
}
