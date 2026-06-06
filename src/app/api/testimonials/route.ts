import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ order: 1 })
      .lean();
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
