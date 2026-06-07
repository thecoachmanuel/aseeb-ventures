export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { TestResult } from "@/models/TestResult";

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const result = await TestResult.findById(id).lean();
    if (!result) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (session.role !== "admin" && result.user.toString() !== session.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(result);
  }

  const filter = session.role === "admin" ? {} : { user: session.id };
  const results = await TestResult.find(filter).sort({ createdAt: -1 }).lean();
  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();
  const { action, id, data } = body;

  if (action === "submit") {
    const sampleId = `AV-${Date.now().toString(36).toUpperCase()}`;
    const result = await TestResult.create({
      ...data,
      user: session.id,
      sampleId,
      status: "submitted",
      submittedAt: new Date(),
    });
    return NextResponse.json(result);
  }

  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (action === "update" && id) {
    const update: any = { ...data };
    if (data.status === "completed" && !data.completedAt) {
      update.completedAt = new Date();
    }
    const result = await TestResult.findByIdAndUpdate(id, update, { new: true }).lean();
    return NextResponse.json(result);
  }

  if (action === "delete" && id) {
    await TestResult.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
