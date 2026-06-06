import mongoose, { Schema, Document } from "mongoose";

export interface INewsletterSubscriberDoc extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  subscribedAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriberDoc>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || mongoose.model<INewsletterSubscriberDoc>("NewsletterSubscriber", NewsletterSubscriberSchema);
