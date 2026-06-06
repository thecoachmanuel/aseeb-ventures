import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";

export default async function TestResultsPage() {
  const session = await getServerSession();
  if (!session) redirect("/login?redirect=/dashboard/test-results");

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">My Test Results</h1>
        <p className="text-gray-500 mb-8">View your laboratory test results and reports.</p>
        <div className="bg-crop-gray rounded-2xl p-12 text-center">
          <p className="text-gray-500">No test results yet. Submit a sample to get started.</p>
        </div>
      </div>
    </section>
  );
}
