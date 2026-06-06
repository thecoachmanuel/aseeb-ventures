import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSlideDoc extends Document {
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  isActive: boolean;
  order: number;
}

const HeroSlideSchema = new Schema<IHeroSlideDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    ctaLabel: { type: String, default: "READ MORE" },
    ctaHref: { type: String, default: "#" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HeroSlide = mongoose.models.HeroSlide || mongoose.model<IHeroSlideDoc>("HeroSlide", HeroSlideSchema);
