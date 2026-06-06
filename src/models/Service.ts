import mongoose, { Schema, Document } from "mongoose";

export interface IServiceDoc extends Document {
  name: string;
  slug: string;
  category: "laboratory" | "advisory" | "agtech" | "i-want-to";
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  price?: string;
  turnaroundTime?: string;
  accreditation?: string[];
  isActive: boolean;
  order: number;
  metadata?: {
    title?: string;
    description?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["laboratory", "advisory", "agtech", "i-want-to"],
      required: true,
    },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    price: { type: String },
    turnaroundTime: { type: String },
    accreditation: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    metadata: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model<IServiceDoc>("Service", ServiceSchema);
