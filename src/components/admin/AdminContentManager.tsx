"use client";

import { useState, useEffect } from "react";

type ResourceName =
  | "services" | "blog" | "contacts" | "testimonials" | "stories" | "subscribers"
  | "users" | "siteconfig" | "navigation" | "locations" | "heroslides"
  | "pillars" | "stats" | "nutrients" | "resources" | "legalpages" | "iwantto"
  | "testresults";

interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "url";
  rows?: number;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: string;
}

const formFields: Record<ResourceName, FormField[]> = {
  services: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { value: "laboratory", label: "Laboratory" },
      { value: "advisory", label: "Advisory" },
      { value: "agtech", label: "AgTech" },
      { value: "i-want-to", label: "I Want To" },
    ]},
    { name: "shortDescription", label: "Short Description", type: "textarea", rows: 2, required: true },
    { name: "description", label: "Full Description", type: "textarea", rows: 4, required: true },
    { name: "price", label: "Price", type: "text" },
    { name: "icon", label: "Icon", type: "text" },
    { name: "image", label: "Image URL", type: "url" },
  ],
  blog: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "author", label: "Author", type: "text", required: true, defaultValue: "Aseeb Ventures Team" },
    { name: "categories", label: "Categories (comma separated)", type: "text" },
    { name: "tags", label: "Tags (comma separated)", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2, required: true },
    { name: "content", label: "Content", type: "textarea", rows: 10, required: true },
    { name: "featuredImage", label: "Featured Image URL", type: "url" },
  ],
  stories: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "farmerName", label: "Farmer Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "crop", label: "Crop", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2, required: true },
    { name: "content", label: "Content", type: "textarea", rows: 10, required: true },
    { name: "image", label: "Image URL", type: "url", required: true },
    { name: "videoUrl", label: "Video URL", type: "url" },
  ],
  testimonials: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "company", label: "Company", type: "text", required: true },
    { name: "role", label: "Role", type: "text" },
    { name: "quote", label: "Quote", type: "textarea", rows: 3, required: true },
    { name: "rating", label: "Rating (1-5)", type: "text" },
    { name: "image", label: "Image URL", type: "url" },
  ],
  heroslides: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 2, required: true },
    { name: "image", label: "Image URL", type: "url" },
    { name: "ctaLabel", label: "CTA Label", type: "text", defaultValue: "READ MORE" },
    { name: "ctaHref", label: "CTA Link", type: "text", defaultValue: "#" },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  pillars: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 2, required: true },
    { name: "image", label: "Image URL", type: "url" },
    { name: "href", label: "Link", type: "text", required: true },
    { name: "icon", label: "Icon", type: "text" },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  stats: [
    { name: "value", label: "Value (e.g. 12,390)", type: "text", required: true },
    { name: "label", label: "Label (e.g. Corporate Clients)", type: "text", required: true },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  nutrients: [
    { name: "name", label: "Nutrient Name", type: "text", required: true },
    { name: "role", label: "Role", type: "textarea", rows: 2, required: true },
    { name: "deficiency", label: "Deficiency", type: "textarea", rows: 2, required: true },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  resources: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 2 },
    { name: "fileUrl", label: "File/Link URL", type: "url", defaultValue: "#" },
    { name: "fileType", label: "Type", type: "select", options: [
      { value: "pdf", label: "PDF" }, { value: "image", label: "Image" }, { value: "video", label: "Video" }, { value: "link", label: "Link" },
    ]},
    { name: "category", label: "Category", type: "text" },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  legalpages: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "content", label: "Content (HTML)", type: "textarea", rows: 15, required: true },
  ],
  iwantto: [
    { name: "label", label: "Label", type: "text", required: true },
    { name: "href", label: "Link", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 2 },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  navigation: [
    { name: "label", label: "Label", type: "text", required: true },
    { name: "href", label: "Link", type: "text", required: true },
    { name: "icon", label: "Icon Path", type: "text" },
    { name: "description", label: "Description", type: "textarea", rows: 2 },
    { name: "hasMega", label: "Has Mega Menu", type: "select", options: [
      { value: "false", label: "No" }, { value: "true", label: "Yes" },
    ]},
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  locations: [
    { name: "country", label: "Country", type: "text", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "address", label: "Address", type: "textarea", rows: 2 },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "email", label: "Email", type: "text", required: true },
    { name: "isMainOffice", label: "Main Office", type: "select", options: [
      { value: "false", label: "No" }, { value: "true", label: "Yes" },
    ]},
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  siteconfig: [
    { name: "siteName", label: "Site Name", type: "text", required: true },
    { name: "logo", label: "Logo Path", type: "text", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "email", label: "Email", type: "text", required: true },
    { name: "address", label: "Address", type: "textarea", rows: 2 },
    { name: "copyright", label: "Copyright Text", type: "text", required: true },
    { name: "metaTitle", label: "Meta Title", type: "text" },
    { name: "metaDescription", label: "Meta Description", type: "textarea", rows: 3 },
  ],
  users: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "text", required: true },
    { name: "password", label: "Password (leave blank to keep)", type: "text" },
    { name: "role", label: "Role", type: "select", options: [
      { value: "client", label: "Client" }, { value: "admin", label: "Admin" }, { value: "viewer", label: "Viewer" },
    ]},
    { name: "phone", label: "Phone", type: "text" },
    { name: "company", label: "Company", type: "text" },
  ],
  contacts: [],
  subscribers: [],
  testresults: [
    { name: "sampleId", label: "Sample ID", type: "text", required: true },
    { name: "sampleType", label: "Sample Type", type: "select", options: [
      { value: "soil", label: "Soil" }, { value: "water", label: "Water" }, { value: "plant", label: "Plant Tissue" },
      { value: "food", label: "Food Safety" }, { value: "fertilizer", label: "Fertilizer" }, { value: "feed", label: "Animal Feed" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "submitted", label: "Submitted" }, { value: "in_progress", label: "In Progress" }, { value: "completed", label: "Completed" }, { value: "cancelled", label: "Cancelled" },
    ]},
    { name: "farmName", label: "Farm Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "cropType", label: "Crop Type", type: "text" },
    { name: "notes", label: "Notes", type: "textarea", rows: 2 },
  ],
};

interface Props {
  resource: ResourceName;
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
      .then((d) => { setData(Array.isArray(d) ? d : d ? [d] : []); setLoading(false); })
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

    if (resource === "users" && !formData.password) {
      delete formData.password;
    }

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
      const json = await updated.json();
      setData(Array.isArray(json) ? json : json ? [json] : []);
    } else {
      alert("Failed to save");
    }
  };

  const getItemTitle = (item: any) => {
    if (resource === "contacts") return item.name || item.email || "Message";
    if (resource === "subscribers") return item.email || "Subscriber";
    if (resource === "users") return `${item.name} (${item.email})`;
    if (resource === "siteconfig") return item.siteName || "Site Config";
    if (resource === "navigation") return item.label || "Nav Item";
    if (resource === "locations") return `${item.country} — ${item.city}`;
    if (resource === "iwantto") return item.label || "Option";
    if (resource === "testresults") return `${item.sampleId} — ${item.sampleType}`;
    return item.title || item.name || item.label || item._id;
  };

  const getItemSubtitle = (item: any) => {
    if (resource === "contacts") return item.message?.substring(0, 80) || "";
    if (resource === "blog") return item.excerpt?.substring(0, 80) || "";
    if (resource === "stories") return item.excerpt?.substring(0, 80) || "";
    if (resource === "services") return item.shortDescription?.substring(0, 80) || "";
    if (resource === "heroslides") return item.description?.substring(0, 80) || "";
    if (resource === "pillars") return item.description?.substring(0, 80) || "";
    if (resource === "nutrients") return item.role?.substring(0, 80) || "";
    if (resource === "resources") return item.description?.substring(0, 80) || "";
    if (resource === "testimonials") return item.quote?.substring(0, 80) || "";
    if (resource === "users") return item.role ? `Role: ${item.role}` : "";
    if (resource === "navigation") return item.href || "";
    if (resource === "locations") return item.address?.substring(0, 80) || "";
    if (resource === "siteconfig") return item.email || "";
    if (resource === "subscribers") return item.createdAt ? `Subscribed ${new Date(item.createdAt).toLocaleDateString()}` : "";
    if (resource === "testresults") return `Status: ${item.status?.replace("_", " ")} • ${item.farmName || ""}`;
    return "";
  };

  const fields = formFields[resource] || [];
  const addLabel = resource === "blog" ? "Post" : resource === "stories" ? "Story" : resource === "users" ? "User" : "Item";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{data.length} {data.length === 1 ? "item" : "items"}</p>
        </div>
        {canCreate && fields.length > 0 && (
          <button
            onClick={() => { setEditing(null); setShowForm(!showForm); }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            {showForm ? "Cancel" : `Add ${addLabel}`}
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h3 className="font-semibold mb-4">{editing ? "Edit" : "New"} {addLabel}</h3>
          <form onSubmit={handleSave} className="space-y-4">
            {fields.map((field) => {
              const val = editing?.[field.name] ?? field.defaultValue ?? "";
              const displayVal = Array.isArray(val) ? val.join(", ") : val;
              const inputClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500";
              if (field.type === "textarea") {
                return <textarea key={field.name} name={field.name} placeholder={field.placeholder || field.label} required={field.required} defaultValue={String(displayVal)} className={inputClass} rows={field.rows || 3} />;
              }
              if (field.type === "select" && field.options) {
                return (
                  <select key={field.name} name={field.name} defaultValue={String(displayVal)} className={inputClass}>
                    {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                );
              }
              return <input key={field.name} name={field.name} type="text" placeholder={field.placeholder || field.label} required={field.required} defaultValue={String(displayVal)} className={inputClass} />;
            })}
            <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">Save</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-xl" />)}
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
                  {resource !== "contacts" && resource !== "subscribers" && fields.length > 0 && (
                    <button onClick={() => { setEditing(item); setShowForm(true); }} className="text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                  )}
                  <button onClick={() => handleDelete(item._id)} className="text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
