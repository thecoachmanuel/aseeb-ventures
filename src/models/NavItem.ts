import mongoose, { Schema, Document } from "mongoose";

export interface INavItemDoc {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  parentId?: mongoose.Types.ObjectId | null;
  order: number;
  isActive: boolean;
  hasMega: boolean;
}

const NavItemSchema = new Schema<INavItemDoc & Document>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    icon: { type: String },
    description: { type: String },
    parentId: { type: Schema.Types.ObjectId, ref: "NavItem", default: null },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    hasMega: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const NavItem = mongoose.models.NavItem || mongoose.model<INavItemDoc & Document>("NavItem", NavItemSchema);
