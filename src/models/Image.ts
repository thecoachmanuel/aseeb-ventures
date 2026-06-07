import mongoose, { Schema, Document } from "mongoose";

export interface IImageDoc extends Document {
  filename: string;
  data: Buffer;
  webpData: Buffer;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

const ImageSchema = new Schema<IImageDoc>({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  webpData: { type: Buffer, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

ImageSchema.index({ uploadedAt: -1 });

export const Image = mongoose.models.Image || mongoose.model<IImageDoc>("Image", ImageSchema);
