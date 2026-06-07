export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { Image } from "@/models/Image";
import sharp from "sharp";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

async function requireAdmin() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");
  if (session.role !== "admin") throw new Error("Forbidden");
  return session;
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File must be under 5MB" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let webpBuffer: Buffer;
    try {
      webpBuffer = await sharp(buffer)
        .webp({ quality: 80 })
        .toBuffer();
    } catch {
      webpBuffer = buffer;
    }

    const doc = await Image.create({
      filename: file.name,
      data: buffer,
      webpData: webpBuffer,
      mimeType: file.type,
      size: file.size,
    });

    return NextResponse.json({ id: doc._id.toString(), url: `/api/images/${doc._id}` });
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "Forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const images = await Image.find()
      .select("filename mimeType size uploadedAt")
      .sort({ uploadedAt: -1 })
      .lean();

    return NextResponse.json(images.map((img: any) => ({
      id: img._id.toString(),
      filename: img.filename,
      mimeType: img.mimeType,
      size: img.size,
      uploadedAt: img.uploadedAt,
      url: `/api/images/${img._id}`,
    })));
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "Forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await Image.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "Forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
