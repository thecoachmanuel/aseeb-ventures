export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { BlogPost } from "@/models/BlogPost";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    await connectDB();

    const regex = new RegExp(q, "i");

    const [services, posts] = await Promise.all([
      Service.find({
        isActive: true,
        $or: [{ name: regex }, { shortDescription: regex }, { description: regex }],
      })
        .select("name slug shortDescription category")
        .limit(5)
        .lean(),
      BlogPost.find({
        isPublished: true,
        $or: [{ title: regex }, { excerpt: regex }, { content: regex }, { categories: regex }],
      })
        .select("title slug excerpt categories")
        .limit(5)
        .lean(),
    ]);

    const results = [
      ...services.map((s: any) => ({
        type: "service" as const,
        title: s.name,
        slug: s.slug,
        excerpt: s.shortDescription,
        category: s.category,
        url: `/services/${s.slug}`,
      })),
      ...posts.map((p: any) => ({
        type: "blog" as const,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        url: `/blog/${p.slug}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
