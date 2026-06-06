import { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>Your privacy is important to us. This privacy statement explains the personal data Cropnuts collects, how we process it, and for what purposes.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, request a service quote, or create an account. This may include your name, email address, phone number, company name, and farm location.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services; to send you technical notices and support messages; to communicate with you about products, services, and events offered by Cropnuts; and to monitor and analyze trends and usage.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">3. Data Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">4. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>

          <h2 className="text-xl font-bold text-crop-dark mt-8">5. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at support@cropnuts.com.</p>
        </div>
      </div>
    </section>
  );
}
