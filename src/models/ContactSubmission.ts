import mongoose, { Schema, Document } from "mongoose";

export interface IContactSubmissionDoc extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  service?: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmissionDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    message: { type: String, required: true },
    service: { type: String },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model<IContactSubmissionDoc>("ContactSubmission", ContactSubmissionSchema);
