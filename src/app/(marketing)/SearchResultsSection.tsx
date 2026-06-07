"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function SearchResultsSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => { setResults(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  if (!query) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Search results for &ldquo;{query}&rdquo;
        </h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-[#009050] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : results.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No results found.</p>
        ) : (
          <div className="space-y-4">
            {results.map((r, i) => (
              <Link
                key={i}
                href={r.url}
                className="block bg-white rounded-xl p-6 shadow-sm border hover:border-[#009050] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${r.type === "service" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {r.type === "service" ? "Service" : "Article"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{r.excerpt?.substring(0, 200)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
