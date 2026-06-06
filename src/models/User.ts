import mongoose, { Schema, Document } from "mongoose";

export interface IUserDoc extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "admin" | "client" | "viewer";
  company?: string;
  phone?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ["admin", "client", "viewer"], default: "client" },
    company: { type: String },
    phone: { type: String },
    emailVerified: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);
