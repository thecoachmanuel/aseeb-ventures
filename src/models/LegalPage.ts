import mongoose, { Schema, Document } from "mongoose";

export interface ILegalPageDoc extends Document {
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
}

const LegalPageSchema = new Schema<ILegalPageDoc>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const LegalPage = mongoose.models.LegalPage || mongoose.model<ILegalPageDoc>("LegalPage", LegalPageSchema);
