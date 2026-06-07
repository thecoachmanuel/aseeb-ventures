import mongoose, { Schema, Document } from "mongoose";

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  category: "agrochemical" | "equipment" | "seed" | "tool" | "other";
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  unit?: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  specifications: { key: string; value: string }[];
  whatsappNumber?: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["agrochemical", "equipment", "seed", "tool", "other"],
      required: true,
    },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "NGN" },
    unit: { type: String },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0 },
    specifications: [
      {
        key: { type: String },
        value: { type: String },
        _id: false,
      },
    ],
    whatsappNumber: { type: String },
    isPublished: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model<IProductDoc>("Product", ProductSchema);
