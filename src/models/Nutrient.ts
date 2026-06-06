import mongoose, { Schema, Document } from "mongoose";

export interface INutrientDoc extends Document {
  name: string;
  role: string;
  deficiency: string;
  order: number;
  isActive: boolean;
}

const NutrientSchema = new Schema<INutrientDoc>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    deficiency: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Nutrient = mongoose.models.Nutrient || mongoose.model<INutrientDoc>("Nutrient", NutrientSchema);
