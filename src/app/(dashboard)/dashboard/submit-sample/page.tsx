import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";

export default async function SubmitSamplePage() {
  const session = await getServerSession();
  if (!session) redirect("/login?redirect=/dashboard/submit-sample");

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Submit Sample for Testing</h1>
        <div className="bg-crop-gray rounded-2xl p-12 text-center">
          <p className="text-gray-500 mb-4">Sample submission form coming soon.</p>
          <p className="text-gray-400 text-sm">
            In the meantime, please contact us at{" "}
            <a href="mailto:support@aseeb-ventures.com" className="text-crop-green hover:underline">
              support@aseeb-ventures.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
