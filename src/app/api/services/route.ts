import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    if (slug) {
      const service = await Service.findOne({ slug, isActive: true }).lean();
      if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(service);
    }

    const query: any = { isActive: true };
    if (category) query.category = category;

    const services = await Service.find(query).sort({ order: 1, name: 1 }).lean();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
