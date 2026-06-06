"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const sampleTypes = [
  { value: "soil", label: "Soil Sample" },
  { value: "water", label: "Water Sample" },
  { value: "plant", label: "Plant Tissue" },
  { value: "food", label: "Food Safety" },
  { value: "fertilizer", label: "Fertilizer" },
  { value: "feed", label: "Animal Feed" },
];

export default function SubmitSamplePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const data: Record<string, any> = Object.fromEntries(fd);

    try {
      const res = await fetch("/api/test-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", data }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Failed to submit sample");
        return;
      }

      const result = await res.json();
      setSuccess(`Sample submitted! Your reference ID is: ${result.sampleId}`);
      form.reset();
      setTimeout(() => router.push("/dashboard/test-results"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/dashboard" className="text-sm text-emerald-600 hover:underline">← Back to Dashboard</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h1 className="text-2xl font-bold mb-6">Submit a Sample for Testing</h1>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type</label>
              <select name="sampleType" required className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="">Select type...</option>
                {sampleTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
              <input name="farmName" type="text" placeholder="Your farm or business name" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" type="text" placeholder="City, State" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type (if applicable)</label>
              <input name="cropType" type="text" placeholder="e.g. Maize, Rice, Barley" className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea name="notes" rows={3} placeholder="Any special instructions or details about your sample..." className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50">
              {loading ? "Submitting..." : "Submit Sample"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
