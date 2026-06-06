import mongoose, { Schema, Document } from "mongoose";

export interface IPillarDoc extends Document {
  title: string;
  description: string;
  image: string;
  href: string;
  icon?: string;
  isActive: boolean;
  order: number;
}

const PillarSchema = new Schema<IPillarDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    href: { type: String, required: true },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Pillar = mongoose.models.Pillar || mongoose.model<IPillarDoc>("Pillar", PillarSchema);
