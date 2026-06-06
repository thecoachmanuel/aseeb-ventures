import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonialDoc extends Document {
  name: string;
  company: string;
  role?: string;
  quote: string;
  rating?: number;
  avatar?: string;
  image?: string;
  videoUrl?: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonialDoc>(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    avatar: { type: String },
    image: { type: String },
    videoUrl: { type: String },
    isPublished: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonialDoc>("Testimonial", TestimonialSchema);
