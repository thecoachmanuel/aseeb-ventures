export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getServerSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { Service } from "@/models/Service";
import { BlogPost } from "@/models/BlogPost";
import { ContactSubmission } from "@/models/ContactSubmission";
import { Testimonial } from "@/models/Testimonial";
import { SuccessStory } from "@/models/SuccessStory";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";
import { User } from "@/models/User";
import { SiteConfig } from "@/models/SiteConfig";
import { NavItem } from "@/models/NavItem";
import { Location } from "@/models/Location";
import { HeroSlide } from "@/models/HeroSlide";
import { Pillar } from "@/models/Pillar";
import { Stat } from "@/models/Stat";
import { Nutrient } from "@/models/Nutrient";
import { Resource } from "@/models/Resource";
import { LegalPage } from "@/models/LegalPage";
import { IWantToOption } from "@/models/IWantToOption";
import { TestResult } from "@/models/TestResult";

const resourceMap: Record<string, { model: any; sortField: string; sortDir: 1 | -1 }> = {
  services: { model: Service, sortField: "createdAt", sortDir: -1 },
  blog: { model: BlogPost, sortField: "publishedAt", sortDir: -1 },
  contacts: { model: ContactSubmission, sortField: "createdAt", sortDir: -1 },
  testimonials: { model: Testimonial, sortField: "order", sortDir: 1 },
  stories: { model: SuccessStory, sortField: "createdAt", sortDir: -1 },
  subscribers: { model: NewsletterSubscriber, sortField: "createdAt", sortDir: -1 },
  users: { model: User, sortField: "createdAt", sortDir: -1 },
  siteconfig: { model: SiteConfig, sortField: "createdAt", sortDir: -1 },
  navigation: { model: NavItem, sortField: "order", sortDir: 1 },
  locations: { model: Location, sortField: "order", sortDir: 1 },
  heroslides: { model: HeroSlide, sortField: "order", sortDir: 1 },
  pillars: { model: Pillar, sortField: "order", sortDir: 1 },
  stats: { model: Stat, sortField: "order", sortDir: 1 },
  nutrients: { model: Nutrient, sortField: "order", sortDir: 1 },
  resources: { model: Resource, sortField: "order", sortDir: 1 },
  legalpages: { model: LegalPage, sortField: "createdAt", sortDir: -1 },
  iwantto: { model: IWantToOption, sortField: "order", sortDir: 1 },
  testresults: { model: TestResult, sortField: "createdAt", sortDir: -1 },
};

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

    if (resource === "stats") {
      const counts = await Promise.all(
        Object.entries(resourceMap).map(async ([key, { model }]) => ({
          key,
          count: await model.countDocuments(),
        }))
      );
      const out: Record<string, number> = {};
      counts.forEach(({ key, count }) => { out[key] = count; });
      return NextResponse.json(out);
    }

    const entry = resourceMap[resource || ""];
    if (!entry) return NextResponse.json({ error: "Invalid resource" }, { status: 400 });

    if (id) {
      const doc = resource === "siteconfig"
        ? await entry.model.findOne().lean()
        : await entry.model.findById(id).lean();
      return NextResponse.json(doc || null);
    }

    const docs = await entry.model.find().sort({ [entry.sortField]: entry.sortDir }).lean();
    return NextResponse.json(docs);
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

    const entry = resourceMap[resource];
    if (!entry) return NextResponse.json({ error: "Invalid resource" }, { status: 400 });

    if (action === "delete") {
      await entry.model.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }

    if (action === "update" || action === "create") {
      const cleanData = { ...data };

      if (resource === "blog" && typeof cleanData.categories === "string") {
        cleanData.categories = cleanData.categories.split(",").map((c: string) => c.trim()).filter(Boolean);
      }
      if (resource === "blog" && typeof cleanData.tags === "string") {
        cleanData.tags = cleanData.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
      }
      if (resource === "blog" && !cleanData.publishedAt) {
        cleanData.publishedAt = new Date();
      }
      if (cleanData.isPublished === undefined && resource !== "contacts" && resource !== "subscribers" && resource !== "siteconfig") {
        cleanData.isPublished = true;
      }
      if (resource === "navigation" && typeof cleanData.hasMega === "string") {
        cleanData.hasMega = cleanData.hasMega === "true";
      }
      if (resource === "locations" && typeof cleanData.isMainOffice === "string") {
        cleanData.isMainOffice = cleanData.isMainOffice === "true";
      }
      if (resource === "users" && cleanData.password) {
        cleanData.password = await bcrypt.hash(cleanData.password, 12);
      }
      if (resource === "users" && !cleanData.password) {
        delete cleanData.password;
      }

      if (resource === "siteconfig") {
        const existing = await entry.model.findOne();
        if (existing) {
          await entry.model.findByIdAndUpdate(existing._id, cleanData);
        } else {
          await entry.model.create(cleanData);
        }
      } else if (id) {
        await entry.model.findByIdAndUpdate(id, cleanData);
      } else {
        await entry.model.create(cleanData);
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
