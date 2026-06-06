import mongoose, { Schema, Document } from "mongoose";

export interface IResourceDoc extends Document {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: "pdf" | "image" | "video" | "link";
  category?: string;
  isPublished: boolean;
  order: number;
}

const ResourceSchema = new Schema<IResourceDoc>(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, default: "#" },
    fileType: { type: String, enum: ["pdf", "image", "video", "link"], default: "link" },
    category: { type: String },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Resource = mongoose.models.Resource || mongoose.model<IResourceDoc>("Resource", ResourceSchema);
