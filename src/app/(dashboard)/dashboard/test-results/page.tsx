"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  submitted: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const sampleTypeLabels: Record<string, string> = {
  soil: "Soil", water: "Water", plant: "Plant Tissue", food: "Food Safety", fertilizer: "Fertilizer", feed: "Animal Feed",
};

export default function TestResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test-results")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { setResults(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Test Results</h1>
            <p className="text-gray-500 mt-1">View your laboratory test results and reports</p>
          </div>
          <Link href="/dashboard/submit-sample" className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
            Submit New Sample
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-xl" />)}
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p className="text-gray-500 mb-4">No test results yet.</p>
            <Link href="/dashboard/submit-sample" className="text-emerald-600 font-medium hover:underline">Submit a sample to get started</Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border overflow-hidden">
            <div className="divide-y">
              {results.map((r) => (
                <div key={r._id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-gray-500">{r.sampleId}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>
                          {r.status.replace("_", " ")}
                        </span>
                      </div>
                      <h3 className="font-semibold">{sampleTypeLabels[r.sampleType] || r.sampleType}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Submitted {new Date(r.submittedAt).toLocaleDateString()}
                        {r.farmName && ` • ${r.farmName}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {r.status === "completed" && r.results?.reportUrl && (
                        <a href={r.results.reportUrl} target="_blank" className="text-sm bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-emerald-700">View Report</a>
                      )}
                      {r.results?.summary && (
                        <details className="relative group">
                          <summary className="text-sm text-emerald-600 font-medium cursor-pointer hover:underline list-none px-2 py-1.5">Details</summary>
                          <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl shadow-lg border p-4 z-10">
                            <p className="text-sm text-gray-700 mb-2"><strong>Summary:</strong> {r.results.summary}</p>
                            {r.results.recommendations && <p className="text-sm text-gray-700"><strong>Recommendations:</strong> {r.results.recommendations}</p>}
                            {r.results.parameters?.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs font-medium text-gray-500 mb-1">Parameters</p>
                                {r.results.parameters.map((p: any, i: number) => (
                                  <div key={i} className="text-xs text-gray-600 flex justify-between">
                                    <span>{p.name}: {p.value} {p.unit}</span>
                                    {p.range && <span className="text-gray-400">({p.range})</span>}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
