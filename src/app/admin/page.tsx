"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "services", label: "Services" },
  { id: "blog", label: "Blog Posts" },
  { id: "contacts", label: "Messages" },
  { id: "testimonials", label: "Testimonials" },
];

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("services");
  const [data, setData] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({ services: 0, blogPosts: 0, contacts: 0 });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (!d.user) { router.push("/login?redirect=/admin"); return; }
        if (d.user.role !== "admin") { router.push("/dashboard"); return; }
        setSession(d.user);
        setLoading(false);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  useEffect(() => {
    if (!session) return;
    setDataLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin?resource=${activeTab}`);
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } catch { setData([]); }
      setDataLoading(false);
    };
    fetchData();

    fetch("/api/admin?resource=stats")
      .then((r) => r.json())
      .then((s) => setStats(s))
      .catch(() => {});
  }, [activeTab, session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resource: activeTab, action: "delete", id }),
    });
    if (res.ok) setData(data.filter((item) => item._id !== id));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const formData: Record<string, any> = Object.fromEntries(fd);

    if (editing) formData.id = editing._id;

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resource: activeTab,
        action: editing ? "update" : "create",
        id: editing?._id,
        data: formData,
      }),
    });

    if (res.ok) {
      setShowForm(false);
      setEditing(null);
      const updated = await fetch(`/api/admin?resource=${activeTab}`);
      setData(await updated.json());
    } else {
      alert("Failed to save");
    }
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-8" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome, {session?.name}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-white rounded-xl shadow-sm border px-4 py-2 text-center">
              <span className="block text-2xl font-bold text-crop-green">{stats.services}</span>
              <span className="text-gray-500">Services</span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border px-4 py-2 text-center">
              <span className="block text-2xl font-bold text-crop-green">{stats.blogPosts}</span>
              <span className="text-gray-500">Posts</span>
            </div>
            <div className="bg-white rounded-xl shadow-sm border px-4 py-2 text-center">
              <span className="block text-2xl font-bold text-crop-green">{stats.contacts}</span>
              <span className="text-gray-500">Messages</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setEditing(null); setShowForm(false); }}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-crop-green text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold capitalize">{activeTab}</h2>
          {(activeTab === "services" || activeTab === "blog" || activeTab === "testimonials") && (
            <button
              onClick={() => { setEditing(null); setShowForm(!showForm); }}
              className="bg-crop-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-crop-green-dark transition-colors"
            >
              {showForm ? "Cancel" : `Add ${activeTab === "blog" ? "Post" : "Item"}`}
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="font-semibold mb-4">
              {editing ? "Edit" : "New"} {activeTab === "blog" ? "Blog Post" : activeTab === "services" ? "Service" : "Item"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              {activeTab === "services" && (
                <>
                  <input name="name" placeholder="Name" required defaultValue={editing?.name || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <input name="slug" placeholder="slug" required defaultValue={editing?.slug || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <select name="category" defaultValue={editing?.category || "laboratory"} className="w-full px-4 py-2 border rounded-lg">
                    <option value="laboratory">Laboratory</option>
                    <option value="advisory">Advisory</option>
                    <option value="agtech">AgTech</option>
                    <option value="i-want-to">I Want To</option>
                  </select>
                  <textarea name="shortDescription" placeholder="Short description" required defaultValue={editing?.shortDescription || ""} className="w-full px-4 py-2 border rounded-lg" rows={2} />
                  <textarea name="description" placeholder="Full description" required defaultValue={editing?.description || ""} className="w-full px-4 py-2 border rounded-lg" rows={4} />
                  <div className="flex gap-4">
                    <input name="price" placeholder="Price (optional)" defaultValue={editing?.price || ""} className="flex-1 px-4 py-2 border rounded-lg" />
                    <input name="icon" placeholder="Icon path (optional)" defaultValue={editing?.icon || ""} className="flex-1 px-4 py-2 border rounded-lg" />
                  </div>
                </>
              )}
              {activeTab === "blog" && (
                <>
                  <input name="title" placeholder="Title" required defaultValue={editing?.title || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <input name="slug" placeholder="slug" required defaultValue={editing?.slug || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <input name="author" placeholder="Author" required defaultValue={editing?.author || "Aseeb Ventures Team"} className="w-full px-4 py-2 border rounded-lg" />
                  <input name="categories" placeholder="Categories (comma separated)" defaultValue={editing?.categories?.join(", ") || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea name="excerpt" placeholder="Excerpt" required defaultValue={editing?.excerpt || ""} className="w-full px-4 py-2 border rounded-lg" rows={2} />
                  <textarea name="content" placeholder="Content" required defaultValue={editing?.content || ""} className="w-full px-4 py-2 border rounded-lg" rows={8} />
                  <input name="featuredImage" placeholder="Featured image URL" defaultValue={editing?.featuredImage || ""} className="w-full px-4 py-2 border rounded-lg" />
                </>
              )}
              {activeTab === "testimonials" && (
                <>
                  <input name="name" placeholder="Name" required defaultValue={editing?.name || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <input name="company" placeholder="Company" required defaultValue={editing?.company || ""} className="w-full px-4 py-2 border rounded-lg" />
                  <textarea name="quote" placeholder="Quote" required defaultValue={editing?.quote || ""} className="w-full px-4 py-2 border rounded-lg" rows={3} />
                  <input name="role" placeholder="Role (optional)" defaultValue={editing?.role || ""} className="w-full px-4 py-2 border rounded-lg" />
                </>
              )}
              <button type="submit" className="bg-crop-green text-white px-6 py-2 rounded-lg font-medium hover:bg-crop-green-dark transition-colors">
                Save
              </button>
            </form>
          </div>
        )}

        {dataLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-20 bg-gray-100 rounded-xl" />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-gray-500 py-8 text-center">No {activeTab} found.</p>
        ) : (
          <div className="space-y-3">
            {data.map((item: any) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">
                    {item.name || item.title || item.email || item._id}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">
                    {activeTab === "contacts"
                      ? item.message?.substring(0, 80) || ""
                      : activeTab === "blog"
                      ? item.excerpt?.substring(0, 80) || ""
                      : activeTab === "testimonials"
                      ? item.quote?.substring(0, 80) || ""
                      : item.shortDescription?.substring(0, 80) || ""}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {activeTab !== "contacts" && (
                    <button
                      onClick={() => { setEditing(item); setShowForm(true); }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
