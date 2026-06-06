import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/login?redirect=/dashboard");

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session.name}</h1>
        <p className="text-gray-500 mb-8">Manage your account and view your results.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {session.role === "admin" ? (
            <Link
              href="/admin"
              className="block p-6 rounded-xl border bg-crop-green text-white hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-1">Admin Panel</h3>
              <p className="text-sm opacity-90">Manage services, blog posts, and content</p>
            </Link>
          ) : null}
          {[
            { title: "My Test Results", desc: "View your laboratory test results", href: "/dashboard/test-results", color: "bg-blue-50 text-blue-700 border-blue-200" },
            { title: "Submit Sample", desc: "Request a new laboratory test", href: "/dashboard/submit-sample", color: "bg-green-50 text-green-700 border-green-200" },
            { title: "Account Settings", desc: "Manage your profile and preferences", href: "/account-settings", color: "bg-gray-50 text-gray-700 border-gray-200" },
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
