"use client";

import { useState, useEffect } from "react";

type ResourceName =
  | "services" | "blog" | "contacts" | "testimonials" | "stories" | "subscribers"
  | "users" | "siteconfig" | "navigation" | "locations" | "heroslides"
  | "pillars" | "stats" | "nutrients" | "resources" | "legalpages" | "iwantto"
  | "testresults" | "products";

interface FormField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "url" | "image" | "multi-image";
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
    { name: "image", label: "Image", type: "image" },
  ],
  blog: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "author", label: "Author", type: "text", required: true, defaultValue: "Aseeb Ventures Team" },
    { name: "categories", label: "Categories (comma separated)", type: "text" },
    { name: "tags", label: "Tags (comma separated)", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2, required: true },
    { name: "content", label: "Content", type: "textarea", rows: 10, required: true },
    { name: "featuredImage", label: "Featured Image", type: "image" },
  ],
  stories: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "farmerName", label: "Farmer Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "crop", label: "Crop", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea", rows: 2, required: true },
    { name: "content", label: "Content", type: "textarea", rows: 10, required: true },
    { name: "image", label: "Image", type: "image", required: true },
    { name: "videoUrl", label: "Video URL", type: "url" },
  ],
  testimonials: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "company", label: "Company", type: "text", required: true },
    { name: "role", label: "Role", type: "text" },
    { name: "quote", label: "Quote", type: "textarea", rows: 3, required: true },
    { name: "rating", label: "Rating (1-5)", type: "text" },
    { name: "image", label: "Image", type: "image" },
  ],
  heroslides: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 2, required: true },
    { name: "image", label: "Image", type: "image" },
    { name: "ctaLabel", label: "CTA Label", type: "text", defaultValue: "READ MORE" },
    { name: "ctaHref", label: "CTA Link", type: "text", defaultValue: "#" },
    { name: "order", label: "Order", type: "text", defaultValue: "0" },
  ],
  pillars: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", rows: 2, required: true },
    { name: "image", label: "Image", type: "image" },
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
    { name: "logo", label: "Logo", type: "image", required: true },
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
    { name: "userEmail", label: "Client Email", type: "text" },
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
    { name: "notes", label: "Client Notes", type: "textarea", rows: 2 },
    { name: "summary", label: "Results Summary", type: "textarea", rows: 3 },
    { name: "recommendations", label: "Recommendations", type: "textarea", rows: 3 },
    { name: "reportUrl", label: "Report URL", type: "url" },
    { name: "parameters", label: "Parameters (JSON: [{\"name\":\"\",\"value\":\"\",\"unit\":\"\",\"range\":\"\"}])", type: "textarea", rows: 4 },
  ],
  products: [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { value: "agrochemical", label: "Agrochemical" },
      { value: "equipment", label: "Equipment" },
      { value: "seed", label: "Seed" },
      { value: "tool", label: "Tool" },
      { value: "other", label: "Other" },
    ]},
    { name: "shortDescription", label: "Short Description", type: "textarea", rows: 2, required: true },
    { name: "description", label: "Full Description", type: "textarea", rows: 4, required: true },
    { name: "price", label: "Price (NGN)", type: "text", required: true },
    { name: "unit", label: "Unit (e.g. per liter, per bag)", type: "text" },
    { name: "images", label: "Product Images", type: "multi-image" },
    { name: "whatsappNumber", label: "WhatsApp Number", type: "text", placeholder: "+2348056165347" },
    { name: "order", label: "Display Order", type: "text", defaultValue: "0" },
  ],
};

interface Props {
  resource: ResourceName;
  title: string;
  canCreate?: boolean;
}

function ImageField({ field, editing, uploadingField, handleImageUpload, onBrowse }: {
  field: FormField;
  editing: any;
  uploadingField: string | null;
  handleImageUpload: (fieldName: string, file: File) => void;
  onBrowse: (fieldName: string) => void;
}) {
  const val = editing?.[field.name] ?? field.defaultValue ?? "";
  const imgUrl = String(val);
  const inputClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
      {imgUrl && (
        <div className="relative inline-block mb-2">
          <img src={imgUrl} alt="" className="w-32 h-32 object-cover rounded-lg border" />
          <button
            type="button"
            onClick={() => {
              const input = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
              if (input) input.value = "";
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <input type="file" accept="image/*"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(field.name, f); }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
        />
        <button
          type="button"
          onClick={() => onBrowse(field.name)}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          Browse Library
        </button>
      </div>
      <input key={`url-${field.name}`} name={field.name} type="text" placeholder={field.placeholder || "Or paste image URL"} defaultValue={imgUrl} className={`${inputClass} mt-2`} />
      {uploadingField === field.name && <span className="text-xs text-emerald-600 mt-1">Uploading...</span>}
    </div>
  );
}

function MultiImageField({ field, editing, onBrowse }: {
  field: FormField;
  editing: any;
  onBrowse: (fieldName: string) => void;
}) {
  const val = editing?.[field.name] ?? [];
  const images: string[] = Array.isArray(val) ? val : typeof val === "string" ? val.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const inputClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm";

  const addImage = (url: string) => {
    const current = getCurrentImages();
    if (!current.includes(url)) {
      setHiddenValue([...current, url].join(","));
    }
  };

  const removeImage = (index: number) => {
    const current = getCurrentImages();
    current.splice(index, 1);
    setHiddenValue(current.join(","));
  };

  const getCurrentImages = (): string[] => {
    const input = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
    if (!input || !input.value) return [];
    return input.value.split(",").map((s: string) => s.trim()).filter(Boolean);
  };

  const setHiddenValue = (val: string) => {
    const input = document.querySelector(`[name="${field.name}"]`) as HTMLInputElement;
    if (input) {
      const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      if (nativeSetter) nativeSetter.call(input, val);
      else input.value = val;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const [localImages, setLocalImages] = useState<string[]>(images);
  const [uploading, setUploading] = useState(false);

  const handleLocalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("File must be under 5MB"); return; }
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        const updated = [...localImages, data.url];
        setLocalImages(updated);
        setHiddenValue(updated.join(","));
      } else { alert("Upload failed"); }
    } catch { alert("Upload failed"); }
    setUploading(false);
  };

  const handleBrowse = () => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.fieldName === `_multi_${field.name}`) {
        window.removeEventListener("multi-image-selected", handler);
        const updated = [...localImages, detail.url];
        setLocalImages(updated);
        setHiddenValue(updated.join(","));
      }
    };
    window.addEventListener("multi-image-selected", handler);
    onBrowse(`_multi_${field.name}`);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
      {localImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {localImages.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg border" />
              <button
                type="button"
                onClick={() => {
                  const updated = localImages.filter((_, idx) => idx !== i);
                  setLocalImages(updated);
                  setHiddenValue(updated.join(","));
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className={`cursor-pointer text-sm font-medium px-3 py-1.5 rounded-lg file:bg-emerald-50 file:text-emerald-700 transition-colors flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}>
          {uploading ? "Uploading..." : "Upload Image"}
          <input type="file" accept="image/*" onChange={handleLocalUpload} className="hidden" disabled={uploading} />
        </label>
        <button
          type="button"
          onClick={handleBrowse}
          className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Browse Library
        </button>
      </div>
      <input type="hidden" name={field.name} value={localImages.join(",")} />
    </div>
  );
}

function InlineForm({ fields, editing, uploadingField, handleImageUpload, onBrowse, onSave, onCancel, addLabel }: {
  fields: FormField[];
  editing: any;
  uploadingField: string | null;
  handleImageUpload: (fieldName: string, file: File) => void;
  onBrowse: (fieldName: string) => void;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  addLabel: string;
}) {
  return (
    <div className="bg-emerald-50/50 rounded-b-xl border-t border-emerald-100 p-5">
      <h4 className="font-semibold text-sm text-emerald-800 mb-4">{editing?._id ? "Edit" : "New"} {addLabel}</h4>
      <form onSubmit={onSave} className="space-y-4">
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
          if (field.type === "image") {
            return <ImageField key={field.name} field={field} editing={editing} uploadingField={uploadingField} handleImageUpload={handleImageUpload} onBrowse={onBrowse} />;
          }
          if (field.type === "multi-image") {
            return <MultiImageField key={field.name} field={field} editing={editing} onBrowse={onBrowse} />;
          }
          return <input key={field.name} name={field.name} type="text" placeholder={field.placeholder || field.label} required={field.required} defaultValue={String(displayVal)} className={inputClass} />;
        })}
        <div className="flex gap-3">
          <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">Save</button>
          <button type="button" onClick={onCancel} className="bg-white text-gray-600 px-4 py-2 rounded-lg border font-medium hover:bg-gray-50 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export function AdminContentManager({ resource, title, canCreate = true }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleImageUpload = async (fieldName: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) { alert("File must be under 5MB"); return; }
    setUploadingField(fieldName);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        const input = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
        if (input) input.value = data.url;
      } else {
        alert("Upload failed");
      }
    } catch { alert("Upload failed"); }
    setUploadingField(null);
  };

  const handleBrowse = (fieldName: string) => {
    const event = new CustomEvent("open-image-picker", { detail: { fieldName } });
    window.dispatchEvent(event);
  };

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
    if (res.ok) {
      setData(data.filter((item) => item._id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const formData: Record<string, any> = Object.fromEntries(fd);

    if (resource === "users" && !formData.password) {
      delete formData.password;
    }

    const isUpdate = !!editingId;

    if (isUpdate) formData.id = editingId;

    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resource,
        action: isUpdate ? "update" : "create",
        id: isUpdate ? editingId : undefined,
        data: formData,
      }),
    });

    if (res.ok) {
      setEditingId(null);
      setCreating(false);
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
    if (resource === "testresults") {
      const status = item.status?.replace("_", " ");
      const userInfo = item.user?.email ? `${item.user.email}` : "";
      return `Status: ${status} • ${item.farmName || ""}${userInfo ? ` • ${userInfo}` : ""}`;
    }
    if (resource === "products") return `₦${item.price} — ${item.category || ""}`;
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
            onClick={() => { setEditingId(null); setCreating(!creating); }}
            className="w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            {creating ? "Cancel" : `Add ${addLabel}`}
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-xl" />)}
        </div>
      ) : data.length === 0 && !creating ? (
        <div className="text-center py-16">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500">No {resource} found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {creating && fields.length > 0 && (
            <InlineForm
              fields={fields}
              editing={null}
              uploadingField={uploadingField}
              handleImageUpload={handleImageUpload}
              onBrowse={handleBrowse}
              onSave={handleSave}
              onCancel={() => setCreating(false)}
              addLabel={addLabel}
            />
          )}
          <div className="divide-y">
            {data.map((item: any) => (
              <div key={item._id}>
                <div className={`p-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-colors ${editingId === item._id ? "bg-emerald-50" : "hover:bg-gray-50"}`}>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-gray-900 truncate">{getItemTitle(item)}</h4>
                    <p className="text-sm text-gray-500 truncate">{getItemSubtitle(item)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    {resource !== "contacts" && resource !== "subscribers" && fields.length > 0 && (
                      <button
                        onClick={() => setEditingId(editingId === item._id ? null : item._id)}
                        className={`flex-1 sm:flex-none text-center text-sm px-3 py-1.5 rounded-lg transition-colors ${editingId === item._id ? "bg-emerald-100 text-emerald-700" : "text-blue-600 hover:bg-blue-50"}`}
                      >
                        {editingId === item._id ? "Close" : "Edit"}
                      </button>
                    )}
                    <button onClick={() => handleDelete(item._id)} className="flex-1 sm:flex-none text-center text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                  </div>
                </div>
                {editingId === item._id && fields.length > 0 && (
                  <InlineForm
                    fields={fields}
                    editing={item}
                    uploadingField={uploadingField}
                    handleImageUpload={handleImageUpload}
                    onBrowse={handleBrowse}
                    onSave={handleSave}
                    onCancel={() => setEditingId(null)}
                    addLabel={addLabel}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
