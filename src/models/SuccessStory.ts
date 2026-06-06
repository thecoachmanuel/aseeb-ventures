import mongoose, { Schema, Document } from "mongoose";

export interface ISuccessStoryDoc extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  farmerName?: string;
  location?: string;
  crop?: string;
  image: string;
  videoUrl?: string;
  isPublished: boolean;
  createdAt: Date;
}

const SuccessStorySchema = new Schema<ISuccessStoryDoc>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    farmerName: { type: String },
    location: { type: String },
    crop: { type: String },
    image: { type: String },
    videoUrl: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const SuccessStory = mongoose.models.SuccessStory || mongoose.model<ISuccessStoryDoc>("SuccessStory", SuccessStorySchema);
