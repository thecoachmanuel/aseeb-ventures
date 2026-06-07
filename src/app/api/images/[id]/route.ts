export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Image } from "@/models/Image";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectDB();
    const doc = await Image.findById(id);
    if (!doc) return new NextResponse("Not found", { status: 404 });

    const accept = _request.headers.get("accept") || "";
    const serveWebP = accept.includes("image/webp") && doc.mimeType !== "image/webp";

    return new NextResponse(serveWebP ? doc.webpData : doc.data, {
      headers: {
        "Content-Type": serveWebP ? "image/webp" : doc.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(serveWebP ? doc.webpData.length : doc.data.length),
      },
    });
  } catch {
    return new NextResponse("Error", { status: 500 });
  }
}
