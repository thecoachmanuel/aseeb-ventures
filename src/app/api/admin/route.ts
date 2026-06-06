import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import { Service } from "@/models/Service";
import { BlogPost } from "@/models/BlogPost";
import { ContactSubmission } from "@/models/ContactSubmission";
import { Testimonial } from "@/models/Testimonial";
import { SuccessStory } from "@/models/SuccessStory";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

async function requireAdmin() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");
  if (session.role !== "admin") throw new Error("Forbidden");
  return session;
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
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
        const posts = await BlogPost.find().sort({ publishedAt: -1 }).lean();
        return NextResponse.json(posts);
      }
      case "contacts": {
        const contacts = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(contacts);
      }
      case "testimonials": {
        const testimonials = await Testimonial.find().sort({ order: 1 }).lean();
        return NextResponse.json(testimonials);
      }
      case "stories": {
        const stories = await SuccessStory.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(stories);
      }
      case "subscribers": {
        const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(subscribers);
      }
      case "stats": {
        const [serviceCount, blogCount, contactCount, testimonialCount, storyCount, subscriberCount] = await Promise.all([
          Service.countDocuments(),
          BlogPost.countDocuments(),
          ContactSubmission.countDocuments(),
          Testimonial.countDocuments(),
          SuccessStory.countDocuments(),
          NewsletterSubscriber.countDocuments(),
        ]);
        return NextResponse.json({ services: serviceCount, blogPosts: blogCount, contacts: contactCount, testimonials: testimonialCount, stories: storyCount, subscribers: subscriberCount });
      }
      default:
        return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "Forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    await connectDB();
    const body = await request.json();
    const { resource, action, data, id } = body;

    if (action === "delete") {
      switch (resource) {
        case "services": await Service.findByIdAndDelete(id); break;
        case "blog": await BlogPost.findByIdAndDelete(id); break;
        case "contacts": await ContactSubmission.findByIdAndDelete(id); break;
        case "testimonials": await Testimonial.findByIdAndDelete(id); break;
        case "stories": await SuccessStory.findByIdAndDelete(id); break;
        case "subscribers": await NewsletterSubscriber.findByIdAndDelete(id); break;
        default: return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === "update" || action === "create") {
      const cleanData = { ...data };
      if (resource === "blog" && typeof cleanData.categories === "string") {
        cleanData.categories = cleanData.categories
          .split(",")
          .map((c: string) => c.trim())
          .filter(Boolean);
      }
      if (resource === "blog" && typeof cleanData.tags === "string") {
        cleanData.tags = cleanData.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);
      }
      if (resource === "blog" && !cleanData.publishedAt) {
        cleanData.publishedAt = new Date();
      }
      if (!cleanData.isPublished && cleanData.isPublished !== false) {
        cleanData.isPublished = true;
      }

      switch (resource) {
        case "services": {
          if (id) await Service.findByIdAndUpdate(id, cleanData);
          else await Service.create(cleanData);
          break;
        }
        case "blog": {
          if (id) await BlogPost.findByIdAndUpdate(id, cleanData);
          else await BlogPost.create(cleanData);
          break;
        }
        case "testimonials": {
          if (id) await Testimonial.findByIdAndUpdate(id, cleanData);
          else await Testimonial.create(cleanData);
          break;
        }
        case "stories": {
          if (id) await SuccessStory.findByIdAndUpdate(id, cleanData);
          else await SuccessStory.create(cleanData);
          break;
        }
        default:
          return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    if (error.message === "Unauthorized") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (error.message === "Forbidden") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json({ error: "Failed to perform action" }, { status: 500 });
  }
}
