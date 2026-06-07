import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

let seeded = false;

async function seedAll() {
  if (seeded) return;
  try {
    // Check if services already seeded
    const ServiceModel = mongoose.models.Service;
    if (ServiceModel) {
      const count = await ServiceModel.countDocuments();
      if (count > 0) { seeded = true; return; }
    }

    console.log("[seed] First connect — seeding all content...");

    // Dynamic require of all models
    const HeroSlide = mongoose.models.HeroSlide;
    const Pillar = mongoose.models.Pillar;
    const Stat = mongoose.models.Stat;
    const Nutrient = mongoose.models.Nutrient;
    const Resource = mongoose.models.Resource;
    const LegalPage = mongoose.models.LegalPage;
    const IWantToOption = mongoose.models.IWantToOption;
    const Location = mongoose.models.Location;
    const NavItem = mongoose.models.NavItem;
    const SiteConfig = mongoose.models.SiteConfig;
    const BlogPost = mongoose.models.BlogPost;
    const SuccessStory = mongoose.models.SuccessStory;

    if (!ServiceModel || !HeroSlide) { seeded = true; return; }

    await HeroSlide.insertMany([
      { title: "Welcome to Aseeb Ventures", description: "Advising farmers across Africa on how to grow the best with less.", image: "/images/hero/hero-banner-1.jpg", ctaLabel: "READ MORE", ctaHref: "/services/laboratory-services", order: 0 },
      { title: "Grow more with less.", description: "Get lab tests for your farm's soil, water, plants and other inputs.", image: "/images/hero/soil-homepage.jpg", ctaLabel: "READ MORE", ctaHref: "/services/laboratory-services", order: 1 },
      { title: "Internationally Accredited Laboratory Services", description: "20 years of delivering high quality laboratory & advisory services.", image: "/images/hero/hero-banner-3.jpg", ctaLabel: "READ MORE", ctaHref: "/services/laboratory-services", order: 2 },
      { title: "Expert hands-on training", description: "Sign up today and get hands-on technical training from our agronomy expert.", image: "/images/hero/hero-banner-4.jpg", ctaLabel: "READ MORE", ctaHref: "/services/agronomy-training", order: 3 },
      { title: "Breaking yield records with precision farming", description: "Tap into our large-scale precision agronomy service.", image: "/images/hero/hero-banner-5.jpg", ctaLabel: "READ MORE", ctaHref: "#", order: 4 },
    ]);
    await Pillar.insertMany([
      { title: "Laboratory Services", description: "Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease, nematode laboratory analysis.", image: "/images/pillars/lab-pillar.png", href: "/services/laboratory-services", order: 0 },
      { title: "Farm Advisory & Agronomy Training Services", description: "Farm advisory service equips farmers with data, tools & skills for efficient & profitable farm management.", image: "/images/pillars/advisory-pillar.png", href: "/services/farm-advisory-services", order: 1 },
      { title: "AgTech Solutions", description: "We have developed a unique AgTech platform to scale our testing and advisory services across Africa.", image: "/images/pillars/agtech-pillar.png", href: "/services/agtech-solutions", order: 2 },
    ]);
    await Stat.insertMany([
      { value: "12,390", label: "Corporate Clients", order: 0 },
      { value: "75,835", label: "Smallholder Farmers", order: 1 },
      { value: "13", label: "Mobile Laboratories", order: 2 },
      { value: "944", label: "Field Trials Conducted", order: 3 },
    ]);
    await ServiceModel.insertMany([
      { name: "Laboratory Services", slug: "laboratory-services", category: "laboratory", shortDescription: "Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease & nematode laboratory analysis.", description: "We offer a wide range of state-of-the-art tests in agricultural, environmental, and food safety analysis.", icon: "/icons/lab_services.svg", order: 0 },
      { name: "Farm Advisory Services", slug: "farm-advisory-services", category: "advisory", shortDescription: "Farm advisory service equips farmers with data, tools & skills for efficient & profitable farm management.", description: "Our farm advisory service equips farmers with data, tools, and skills.", icon: "/icons/advisory_services.svg", order: 1 },
      { name: "AgTech Solutions", slug: "agtech-solutions", category: "agtech", shortDescription: "Unique AgTech platform to scale our testing and advisory services across Africa.", description: "We offer a wide range of technologies and techniques.", icon: "/icons/agTech_services.svg", order: 2 },
      { name: "Agrochemicals & Equipment Sales", slug: "agrochemicals-equipment-sales", category: "advisory", shortDescription: "Quality agrochemicals, fertilizers, and modern farming equipment.", description: "We supply high-quality agrochemicals and equipment.", icon: "/icons/advisory_services.svg", order: 3 },
      { name: "Techno Consult", slug: "techno-consult", category: "advisory", shortDescription: "Expert technical consulting services for agricultural projects.", description: "Our technical consulting service provides expert guidance.", icon: "/icons/advisory_services.svg", order: 4 },
    ]);
    await BlogPost.insertMany([
      { title: "Improving the Availability of Plant Nutrients", slug: "improving-the-availability-of-plant-nutrients", author: "Aseeb Ventures Team", publishedAt: new Date("2025-04-24"), excerpt: "Even when fertilizers are applied, plants don't always get the nutrients they need.", content: "Full article about plant nutrients...", featuredImage: "/images/blog/nutrients.jpg", categories: ["Agronomy Articles"], tags: ["Soil health", "Crop Nutrition"], isPublished: true },
      { title: "Understanding Soil CEC", slug: "soil-cation-exchange-capacity-cec", author: "Aseeb Ventures Team", publishedAt: new Date("2025-04-21"), excerpt: "CEC is a fundamental soil property that influences nutrient retention.", content: "Full article about CEC...", featuredImage: "/images/blog/cec.jpg", categories: ["Agronomy Articles"], tags: ["Soil health", "Crop Nutrition"], isPublished: true },
      { title: "Factors Affecting Nutrient Availability", slug: "factors-affecting-nutrient-availability-to-plants", author: "Aseeb Ventures Team", publishedAt: new Date("2025-03-31"), excerpt: "Several key soil and environmental factors influence nutrient availability.", content: "Full article about nutrient factors...", featuredImage: "/images/blog/factors.jpg", categories: ["Agronomy Articles"], tags: ["Soil health", "Crop Nutrition"], isPublished: true },
    ]);
    await SuccessStory.insertMany([
      { title: "How We Achieved Massive 11.84 ton/ha Barley Yield", slug: "barley-farming-in-kenya", excerpt: "Barley farming in Nigeria is setting new yield records.", content: "Full story...", farmerName: "Various Farmers", location: "Jos, Plateau State", crop: "Barley", image: "/images/success/barley.jpg", isPublished: true },
      { title: "Soil Testing For Smallscale Farmers In Malawi", slug: "soil-testing-for-smallscale-farmers-in-malawi", excerpt: "Our on-site AI based soil testing platform has already reached 90,000 smallholder farmers.", content: "Full story...", location: "Malawi", crop: "Various", image: "/images/success/malawi.jpg", isPublished: true },
    ]);
    await Nutrient.insertMany([
      { name: "Nitrogen (N)", role: "Essential for vegetative growth and protein synthesis.", deficiency: "Yellowing of older leaves, stunted growth.", order: 0 },
      { name: "Phosphorus (P)", role: "Critical for root development, flowering, and energy transfer.", deficiency: "Purple discoloration of leaves, poor root growth.", order: 1 },
      { name: "Potassium (K)", role: "Regulates water balance, enzyme activation, and disease resistance.", deficiency: "Leaf margin burn, weak stems, poor fruit quality.", order: 2 },
      { name: "Calcium (Ca)", role: "Cell wall structure, root tip development.", deficiency: "Blossom end rot in tomatoes, tip burn in lettuce.", order: 3 },
      { name: "Magnesium (Mg)", role: "Central component of chlorophyll.", deficiency: "Interveinal chlorosis on older leaves.", order: 4 },
      { name: "Sulfur (S)", role: "Component of amino acids and proteins.", deficiency: "Overall yellowing.", order: 5 },
      { name: "Iron (Fe)", role: "Chlorophyll synthesis.", deficiency: "Interveinal chlorosis on young leaves.", order: 6 },
      { name: "Zinc (Zn)", role: "Auxin synthesis, enzyme activation.", deficiency: "Small leaves, shortened internodes.", order: 7 },
      { name: "Boron (B)", role: "Cell wall formation, pollen tube growth.", deficiency: "Death of growing points, hollow stems.", order: 8 },
    ]);
    await Resource.insertMany([
      { title: "Soil Sampling Guide", fileUrl: "#", fileType: "pdf", order: 0 },
      { title: "Fertilizer Recommendation Charts", fileUrl: "#", fileType: "pdf", order: 1 },
      { title: "Crop Nutrition Handbook", fileUrl: "#", fileType: "pdf", order: 2 },
      { title: "Water Quality Standards", fileUrl: "#", fileType: "pdf", order: 3 },
      { title: "Food Safety Guidelines", fileUrl: "#", fileType: "pdf", order: 4 },
      { title: "Carbon Farming Overview", fileUrl: "#", fileType: "pdf", order: 5 },
    ]);
    await LegalPage.insertMany([
      { title: "Privacy Policy", slug: "privacy-policy", content: "<h2>1. Information We Collect</h2><p>We collect information you provide directly to us.</p><h2>2. How We Use Your Information</h2><p>We use the information to provide and improve our services.</p><h2>3. Data Sharing</h2><p>We do not sell your personal information.</p><h2>4. Data Security</h2><p>We implement reasonable security measures.</p><h2>5. Contact Us</h2><p>aseebventure1@gmail.com</p>" },
      { title: "Terms & Conditions", slug: "terms-and-conditions", content: "<h2>1. Acceptance</h2><p>By using this site, you agree to these terms.</p><h2>2. Services</h2><p>All services are subject to availability.</p><h2>3. Intellectual Property</h2><p>All content is owned by Aseeb Ventures.</p><h2>4. Liability</h2><p>Aseeb Ventures shall not be liable for indirect damages.</p><h2>5. Governing Law</h2><p>Laws of Nigeria.</p>" },
    ]);
    await IWantToOption.insertMany([
      { label: "Which crop can I grow on my soil?", href: "/i-want-to/soil-testing", order: 0 },
      { label: "Is my water safe to drink?", href: "/i-want-to/do-a-water-test", order: 1 },
      { label: "Is this food safe to eat?", href: "/i-want-to/do-food-test", order: 2 },
      { label: "Should I buy this land to farm?", href: "/i-want-to/do-land-suitability-survey", order: 3 },
      { label: "What is wrong with my crop?", href: "/i-want-to/do-palnt-test", order: 4 },
      { label: "Talk to an agronomist and get advice", href: "/i-want-to/talk-to-an-agronomist", order: 5 },
    ]);
    await Location.insertMany([
      { country: "Nigeria", city: "Ibadan", address: "Shop 21 Lagelu Shopping Complex, Opposite Dizengoff, Monatan", phone: "+234 805 616 5347", email: "aseebventure1@gmail.com", isMainOffice: true, order: 0 },
    ]);
    await SiteConfig.create({
      siteName: "Aseeb Ventures", logo: "/images/logo-1.png", phone: "+234 805 616 5347", email: "aseebventure1@gmail.com",
      address: "Shop 21 Lagelu Shopping Complex, Opposite Dizengoff, Monatan, Ibadan", copyright: "© Copyright {year} - Aseeb Ventures Ltd.",
      socialLinks: { facebook: "https://facebook.com/", twitter: "https://twitter.com/", instagram: "https://www.instagram.com/" },
    });

    const navRoots = await NavItem.insertMany([
      { label: "Home", href: "/", hasMega: false, order: 0 },
      { label: "About Us", href: "/about", hasMega: false, order: 1 },
      { label: "Services", href: "#", hasMega: true, order: 2 },
      { label: "Articles", href: "#", hasMega: true, order: 3 },
      { label: "Resources", href: "/resources", hasMega: false, order: 4 },
      { label: "Contact Us", href: "/contact", hasMega: false, order: 5 },
    ]);
    const servicesNav = navRoots.find((n: any) => n.label === "Services");
    const articlesNav = navRoots.find((n: any) => n.label === "Articles");
    await NavItem.insertMany([
      { label: "Laboratory Services", href: "/services/laboratory-services", icon: "/icons/lab_services.svg", description: "We offer wide range, state of the art tests", parentId: servicesNav!._id, order: 0, hasMega: false },
      { label: "Farm Advisory Services", href: "/services/farm-advisory-services", icon: "/icons/advisory_services.svg", description: "Best Technical off Farm and On Farm Advice", parentId: servicesNav!._id, order: 1, hasMega: false },
      { label: "AgTech Solutions", href: "/services/agtech-solutions", icon: "/icons/agTech_services.svg", description: "Technologies and techniques to scale our services", parentId: servicesNav!._id, order: 2, hasMega: false },
      { label: "Agronomy Articles", href: "/blog/category/agronomy-articles", icon: "/icons/agrnonomy_articles.svg", description: "Articles on crop disease, protection, soil science", parentId: articlesNav!._id, order: 0, hasMega: false },
      { label: "Nutritional Knowledge", href: "/nutritional-knowledge", icon: "/icons/nutrition_knowledge.svg", description: "Plants balance nutrition with macronutrients", parentId: articlesNav!._id, order: 1, hasMega: false },
      { label: "How to Videos", href: "/blog/category/how-to-videos", icon: "/icons/how_to_videos.svg", description: "Handy videos about crop trials", parentId: articlesNav!._id, order: 2, hasMega: false },
      { label: "Success Stories", href: "/success-stories", icon: "/icons/success_stories.svg", description: "Real stories, real farmers success", parentId: articlesNav!._id, order: 3, hasMega: false },
      { label: "FAQs", href: "https://aseeb-ventures.vercel.app", icon: "/icons/faqs.svg", description: "Aseeb Ventures help desk", parentId: articlesNav!._id, order: 4, hasMega: false },
      { label: "News & Events", href: "/blog/category/news", icon: "/icons/news_events.svg", description: "Latest news about Aseeb Ventures", parentId: articlesNav!._id, order: 5, hasMega: false },
    ]);

    console.log("[seed] All content seeded successfully");
  } catch (e) {
    console.error("[seed] Failed:", (e as Error).message);
  }
  seeded = true;
}

export async function connectDB() {
  if (cached.conn) {
    if (!seeded) await seedAll();
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  try {
    cached.conn = await cached.promise;
    if (!seeded) await seedAll();
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
