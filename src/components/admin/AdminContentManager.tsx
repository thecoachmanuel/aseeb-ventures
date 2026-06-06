"use client";

import { useState, useEffect } from "react";

interface Props {
  resource: "services" | "blog" | "contacts" | "testimonials" | "stories" | "subscribers";
  title: string;
  canCreate?: boolean;
}

export function AdminContentManager({ resource, title, canCreate = true }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin?resource=${resource}`)
      .then((r) => r.json())
      .then((d) => { setData(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { setData([]); setLoading(false); });
  }, [resource]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resource, action: "delete", id }),
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
        resource,
        action: editing ? "update" : "create",
        id: editing?._id,
        data: formData,
      }),
    });

    if (res.ok) {
      setShowForm(false);
      setEditing(null);
      const updated = await fetch(`/api/admin?resource=${resource}`);
      setData(await updated.json());
    } else {
      alert("Failed to save");
    }
  };

  const getItemTitle = (item: any) => {
    if (resource === "contacts") return item.email || item.name || "Message";
    if (resource === "blog") return item.title;
    if (resource === "testimonials") return item.name;
    if (resource === "stories") return item.title;
    if (resource === "subscribers") return item.email;
    return item.name || item.title || item._id;
  };

  const getItemSubtitle = (item: any) => {
    if (resource === "contacts") return item.message?.substring(0, 80) || "";
    if (resource === "blog") return item.excerpt?.substring(0, 80) || "";
    if (resource === "testimonials") return item.quote?.substring(0, 80) || "";
    if (resource === "stories") return item.excerpt?.substring(0, 80) || "";
    if (resource === "subscribers") return item.createdAt ? `Subscribed ${new Date(item.createdAt).toLocaleDateString()}` : "";
    return item.shortDescription?.substring(0, 80) || "";
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{data.length} {data.length === 1 ? "item" : "items"}</p>
        </div>
        {canCreate && (
          <button
            onClick={() => { setEditing(null); setShowForm(!showForm); }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            {showForm ? "Cancel" : `Add ${resource === "blog" ? "Post" : resource === "stories" ? "Story" : "Item"}`}
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="font-semibold mb-4">
            {editing ? "Edit" : "New"} {resource === "blog" ? "Blog Post" : resource === "stories" ? "Success Story" : resource === "services" ? "Service" : "Item"}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            {resource === "services" && (
              <>
                <input name="name" placeholder="Name" required defaultValue={editing?.name || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="slug" placeholder="slug" required defaultValue={editing?.slug || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <select name="category" defaultValue={editing?.category || "laboratory"} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="laboratory">Laboratory</option>
                  <option value="advisory">Advisory</option>
                  <option value="agtech">AgTech</option>
                  <option value="i-want-to">I Want To</option>
                </select>
                <textarea name="shortDescription" placeholder="Short description" required defaultValue={editing?.shortDescription || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={2} />
                <textarea name="description" placeholder="Full description" required defaultValue={editing?.description || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={4} />
                <div className="flex gap-4">
                  <input name="price" placeholder="Price (optional)" defaultValue={editing?.price || ""} className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input name="icon" placeholder="Icon path (optional)" defaultValue={editing?.icon || ""} className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </>
            )}
            {resource === "blog" && (
              <>
                <input name="title" placeholder="Title" required defaultValue={editing?.title || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="slug" placeholder="slug" required defaultValue={editing?.slug || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="author" placeholder="Author" required defaultValue={editing?.author || "Aseeb Ventures Team"} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="categories" placeholder="Categories (comma separated)" defaultValue={editing?.categories?.join(", ") || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <textarea name="excerpt" placeholder="Excerpt" required defaultValue={editing?.excerpt || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={2} />
                <textarea name="content" placeholder="Content" required defaultValue={editing?.content || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={8} />
                <input name="featuredImage" placeholder="Featured image URL" defaultValue={editing?.featuredImage || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </>
            )}
            {resource === "testimonials" && (
              <>
                <input name="name" placeholder="Name" required defaultValue={editing?.name || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="company" placeholder="Company" required defaultValue={editing?.company || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <textarea name="quote" placeholder="Quote" required defaultValue={editing?.quote || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} />
                <input name="role" placeholder="Role (optional)" defaultValue={editing?.role || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </>
            )}
            {resource === "stories" && (
              <>
                <input name="title" placeholder="Title" required defaultValue={editing?.title || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="slug" placeholder="slug" required defaultValue={editing?.slug || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="location" placeholder="Location" defaultValue={editing?.location || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <input name="crop" placeholder="Crop" defaultValue={editing?.crop || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <textarea name="excerpt" placeholder="Excerpt" required defaultValue={editing?.excerpt || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={2} />
                <textarea name="content" placeholder="Content" required defaultValue={editing?.content || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={8} />
                <input name="image" placeholder="Image URL" defaultValue={editing?.image || ""} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </>
            )}
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              Save
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500">No {resource} found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="divide-y">
            {data.map((item: any) => (
              <div key={item._id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 truncate">{getItemTitle(item)}</h4>
                  <p className="text-sm text-gray-500 truncate">{getItemSubtitle(item)}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {resource !== "contacts" && resource !== "subscribers" && (
                    <button
                      onClick={() => { setEditing(item); setShowForm(true); }}
                      className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
