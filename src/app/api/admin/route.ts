import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Service";
import { BlogPost } from "@/models/BlogPost";
import { ContactSubmission } from "@/models/ContactSubmission";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get("resource");
    const id = searchParams.get("id");

    switch (resource) {
      case "services": {
        if (id) {
          const service = await Service.findById(id).lean();
          return NextResponse.json(service || null);
        }
        const services = await Service.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(services);
      }
      case "blog": {
        if (id) {
          const post = await BlogPost.findById(id).lean();
          return NextResponse.json(post || null);
        }
        const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(posts);
      }
      case "contacts": {
        const contacts = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(contacts);
      }
      case "stats": {
        const [serviceCount, blogCount, contactCount] = await Promise.all([
          Service.countDocuments(),
          BlogPost.countDocuments(),
          ContactSubmission.countDocuments(),
        ]);
        return NextResponse.json({ services: serviceCount, blogPosts: blogCount, contacts: contactCount });
      }
      default:
        return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { resource, action, data, id } = body;

    if (action === "delete") {
      switch (resource) {
        case "services": await Service.findByIdAndDelete(id); break;
        case "blog": await BlogPost.findByIdAndDelete(id); break;
        case "contacts": await ContactSubmission.findByIdAndDelete(id); break;
        default: return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === "update" || action === "create") {
      switch (resource) {
        case "services": {
          if (id) {
            await Service.findByIdAndUpdate(id, data);
          } else {
            await Service.create(data);
          }
          break;
        }
        case "blog": {
          if (id) {
            await BlogPost.findByIdAndUpdate(id, data);
          } else {
            await BlogPost.create(data);
          }
          break;
        }
        default:
          return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to perform action" }, { status: 500 });
  }
}
