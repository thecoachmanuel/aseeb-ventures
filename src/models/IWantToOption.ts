import mongoose, { Schema, Document } from "mongoose";

export interface IIWantToOptionDoc extends Document {
  label: string;
  href: string;
  description?: string;
  order: number;
  isActive: boolean;
}

const IWantToOptionSchema = new Schema<IIWantToOptionDoc>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const IWantToOption = mongoose.models.IWantToOption || mongoose.model<IIWantToOptionDoc>("IWantToOption", IWantToOptionSchema);
