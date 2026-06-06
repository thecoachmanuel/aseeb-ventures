import mongoose, { Schema, Document } from "mongoose";

export interface ITestResultDoc extends Document {
  user: mongoose.Types.ObjectId;
  sampleId: string;
  sampleType: "soil" | "water" | "plant" | "food" | "fertilizer" | "feed";
  farmName?: string;
  location?: string;
  cropType?: string;
  status: "submitted" | "in_progress" | "completed" | "cancelled";
  submittedAt: Date;
  completedAt?: Date;
  notes?: string;
  results?: {
    parameters: { name: string; value: string; unit: string; range?: string }[];
    summary?: string;
    recommendations?: string;
    reportUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TestResultSchema = new Schema<ITestResultDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sampleId: { type: String, required: true, unique: true },
    sampleType: { type: String, enum: ["soil", "water", "plant", "food", "fertilizer", "feed"], required: true },
    farmName: { type: String },
    location: { type: String },
    cropType: { type: String },
    status: { type: String, enum: ["submitted", "in_progress", "completed", "cancelled"], default: "submitted" },
    submittedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    notes: { type: String },
    results: {
      parameters: [{
        name: String,
        value: String,
        unit: String,
        range: String,
      }],
      summary: String,
      recommendations: String,
      reportUrl: String,
    },
  },
  { timestamps: true }
);

TestResultSchema.index({ user: 1, status: 1 });
TestResultSchema.index({ sampleId: 1 });

export const TestResult = mongoose.models.TestResult || mongoose.model<ITestResultDoc>("TestResult", TestResultSchema);
