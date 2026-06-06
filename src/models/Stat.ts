import mongoose, { Schema, Document } from "mongoose";

export interface IStatDoc extends Document {
  value: string;
  label: string;
  order: number;
  isActive: boolean;
}

const StatSchema = new Schema<IStatDoc>(
  {
    value: { type: String, required: true },
    label: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Stat = mongoose.models.Stat || mongoose.model<IStatDoc>("Stat", StatSchema);
