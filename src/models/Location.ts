import mongoose, { Schema, Document } from "mongoose";

export interface ILocationDoc extends Document {
  name: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  isMainOffice: boolean;
  order: number;
}

const LocationSchema = new Schema<ILocationDoc>(
  {
    name: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, default: "" },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    isMainOffice: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Location = mongoose.models.Location || mongoose.model<ILocationDoc>("Location", LocationSchema);
