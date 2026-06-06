import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPostDoc extends Document {
  title: string;
  slug: string;
  author: string;
  publishedAt: Date;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  isPublished: boolean;
  seoMetadata?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPostDoc>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    categories: [{ type: String }],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    seoMetadata: {
      title: { type: String },
      description: { type: String },
      ogImage: { type: String },
    },
  },
  { timestamps: true }
);

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPostDoc>("BlogPost", BlogPostSchema);
