import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { HeroSlide } from "@/models/HeroSlide";
import { Pillar } from "@/models/Pillar";
import { Stat } from "@/models/Stat";
import { Service } from "@/models/Service";
import { BlogPost } from "@/models/BlogPost";
import { SuccessStory } from "@/models/SuccessStory";
import { Testimonial } from "@/models/Testimonial";
import { Nutrient } from "@/models/Nutrient";
import { Resource } from "@/models/Resource";
import { LegalPage } from "@/models/LegalPage";
import { IWantToOption } from "@/models/IWantToOption";
import { Location } from "@/models/Location";
import { NavItem } from "@/models/NavItem";
import { SiteConfig } from "@/models/SiteConfig";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  const slug = searchParams.get("slug");

  try {
    await connectDB();

    switch (resource) {
      case "heroslides": {
        const docs = await HeroSlide.find({ isActive: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "pillars": {
        const docs = await Pillar.find({ isActive: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "stats": {
        const docs = await Stat.find({ isActive: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "services": {
        if (slug) {
          const doc = await Service.findOne({ slug, isActive: true }).lean();
          return NextResponse.json(doc || null);
        }
        const docs = await Service.find({ isActive: true })
          .select("name slug category shortDescription icon image price")
          .sort({ order: 1 })
          .lean();
        return NextResponse.json(docs);
      }
      case "blog": {
        if (slug) {
          const doc = await BlogPost.findOne({ slug, isPublished: true }).lean();
          return NextResponse.json(doc || null);
        }
        const docs = await BlogPost.find({ isPublished: true })
          .select("title slug author publishedAt excerpt featuredImage categories tags")
          .sort({ publishedAt: -1 })
          .limit(20)
          .lean();
        return NextResponse.json(docs);
      }
      case "stories": {
        if (slug) {
          const doc = await SuccessStory.findOne({ slug, isPublished: true }).lean();
          return NextResponse.json(doc || null);
        }
        const docs = await SuccessStory.find({ isPublished: true })
          .select("title slug excerpt image farmerName location crop")
          .sort({ createdAt: -1 })
          .lean();
        return NextResponse.json(docs);
      }
      case "testimonials": {
        const docs = await Testimonial.find({ isPublished: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "nutrients": {
        const docs = await Nutrient.find({ isActive: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "resources": {
        const docs = await Resource.find({ isPublished: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "legalpage": {
        if (slug) {
          const doc = await LegalPage.findOne({ slug, isPublished: true }).lean();
          return NextResponse.json(doc || null);
        }
        const docs = await LegalPage.find({ isPublished: true }).lean();
        return NextResponse.json(docs);
      }
      case "iwantto": {
        const docs = await IWantToOption.find({ isActive: true }).sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "locations": {
        const docs = await Location.find().sort({ order: 1 }).lean();
        return NextResponse.json(docs);
      }
      case "navigation": {
        const items = await NavItem.find({ isActive: true, parentId: null })
          .sort({ order: 1 })
          .lean();
        const children = await NavItem.find({ isActive: true, parentId: { $ne: null } })
          .sort({ order: 1 })
          .lean();

        const nav = items.map((item: any) => {
          const itemChildren = children.filter(
            (c: any) => c.parentId?.toString() === item._id.toString()
          );
          return {
            ...item,
            megaContent: itemChildren.length > 0
              ? itemChildren.map((c: any) => ({
                  icon: c.icon,
                  title: c.label,
                  description: c.description,
                  href: c.href,
                }))
              : undefined,
          };
        });
        return NextResponse.json(nav);
      }
      case "siteconfig": {
        const doc = await SiteConfig.findOne().lean();
        return NextResponse.json(doc || {});
      }
      default:
        return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
