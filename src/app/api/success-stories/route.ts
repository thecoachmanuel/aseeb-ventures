export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/models/SuccessStory";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const story = await SuccessStory.findOne({ slug, isPublished: true }).lean();
      if (!story) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(story);
    }

    const stories = await SuccessStory.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
