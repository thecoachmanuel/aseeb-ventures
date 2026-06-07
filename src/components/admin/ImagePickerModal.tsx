"use client";

import { useState, useEffect, useCallback } from "react";

interface ImageItem {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
}

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  onDelete?: (id: string) => void;
}

export function ImagePickerModal({ isOpen, onClose, onSelect }: ImagePickerModalProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/upload");
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch { setImages([]); }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchImages();
    }
  }, [isOpen, fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        await fetchImages();
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed");
      }
    } catch { alert("Upload failed"); }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await fetch(`/api/upload?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages(images.filter((img) => img.id !== id));
      }
    } catch { alert("Delete failed"); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Image Library</h2>
            <p className="text-sm text-gray-500">{images.length} images</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              {uploading ? "Uploading..." : "Upload"}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
            </label>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-lg aspect-square" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm">No images in library</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {images.map((img) => (
                <div key={img.id} className="group relative">
                  <button
                    onClick={() => { onSelect(img.url); onClose(); }}
                    className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border hover:border-emerald-500 hover:ring-2 hover:ring-emerald-200 transition-all block"
                  >
                    <img
                      src={img.url}
                      alt={img.filename}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                    title="Delete image"
                  >
                    ×
                  </button>
                  <p className="text-[10px] text-gray-500 truncate mt-1">{img.filename}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
