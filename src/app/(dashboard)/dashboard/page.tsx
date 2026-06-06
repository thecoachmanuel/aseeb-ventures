import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Client Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "My Test Results", desc: "View your laboratory test results", href: "#", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { title: "Submit Sample", desc: "Request a new laboratory test", href: "#", color: "bg-green-50 text-green-700 border-green-200" },
            { title: "Account Settings", desc: "Manage your profile and preferences", href: "#", color: "bg-gray-50 text-gray-700 border-gray-200" },
          ].map((card) => (
            <Link key={card.title} href={card.href} className={`block p-6 rounded-xl border ${card.color} hover:shadow-md transition-shadow`}>
              <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
              <p className="text-sm opacity-75">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
