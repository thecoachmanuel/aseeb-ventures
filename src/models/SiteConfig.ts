import mongoose, { Schema, Document } from "mongoose";

export interface ISiteConfigDoc extends Document {
  siteName: string;
  logo: string;
  favicon?: string;
  phone: string;
  email: string;
  address?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  copyright: string;
  metaDescription: string;
  metaTitle: string;
}

const SiteConfigSchema = new Schema<ISiteConfigDoc>({
  siteName: { type: String, required: true, default: "Aseeb Ventures" },
  logo: { type: String, default: "/images/logo-1.png" },
  favicon: { type: String },
  phone: { type: String, default: "+234 805 616 5347" },
  email: { type: String, default: "info@aseeb-ventures.vercel.app" },
  address: { type: String },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    whatsapp: { type: String },
  },
  copyright: { type: String, default: "© Copyright {year} - Aseeb Ventures Ltd." },
  metaDescription: { type: String, default: "Aseeb Ventures is Africa's leading agricultural testing laboratory & agronomy advisory services company." },
  metaTitle: { type: String, default: "Aseeb Ventures" },
});

export const SiteConfig = mongoose.models.SiteConfig || mongoose.model<ISiteConfigDoc>("SiteConfig", SiteConfigSchema);
