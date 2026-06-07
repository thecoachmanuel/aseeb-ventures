const { connectDB } = require("../src/lib/db");
const { HeroSlide } = require("../src/models/HeroSlide");
const { Pillar } = require("../src/models/Pillar");
const { Stat } = require("../src/models/Stat");
const { Nutrient } = require("../src/models/Nutrient");
const { Resource } = require("../src/models/Resource");
const { LegalPage } = require("../src/models/LegalPage");
const { IWantToOption } = require("../src/models/IWantToOption");
const { Location: LocationModel } = require("../src/models/Location");
const { NavItem } = require("../src/models/NavItem");
const { SiteConfig } = require("../src/models/SiteConfig");
const { Service } = require("../src/models/Service");
const { BlogPost } = require("../src/models/BlogPost");
const { SuccessStory } = require("../src/models/SuccessStory");

const heroSlides = [
  { title: "Welcome to Aseeb Ventures", description: "Advising farmers across Africa on how to grow the best with less.", image: "/images/hero/hero-banner-1.jpg", ctaLabel: "READ MORE", ctaHref: "/services/laboratory-services", order: 0, isActive: true },
  { title: "Grow more with less.", description: "Get lab tests for your farm's soil, water, plants and other inputs.", image: "/images/hero/soil-homepage.jpg", ctaLabel: "READ MORE", ctaHref: "/services/laboratory-services", order: 1, isActive: true },
  { title: "Internationally Accredited Laboratory Services", description: "20 years of delivering high quality laboratory & advisory services for agriculture, environmental monitoring and food safety sectors in Africa.", image: "/images/hero/hero-banner-3.jpg", ctaLabel: "READ MORE", ctaHref: "/services/laboratory-services", order: 2, isActive: true },
  { title: "Expert hands-on training from people with over 20 years of experience", description: "Sign up today and get hands-on technical training from our agronomy expert.", image: "/images/hero/hero-banner-4.jpg", ctaLabel: "READ MORE", ctaHref: "/services/agronomy-training", order: 3, isActive: true },
  { title: "Breaking yield records with precision farming", description: "Tap into our large-scale precision agronomy service to achieve internationally record-breaking yields.", image: "/images/hero/hero-banner-5.jpg", ctaLabel: "READ MORE", ctaHref: "#", order: 4, isActive: true },
];

const stats = [
  { value: "12,390", label: "Corporate Clients", order: 0, isActive: true },
  { value: "75,835", label: "Smallholder Farmers", order: 1, isActive: true },
  { value: "13", label: "Mobile Laboratories", order: 2, isActive: true },
  { value: "944", label: "Field Trials Conducted", order: 3, isActive: true },
];

const pillars = [
  { title: "Laboratory Services", description: "Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease, nematode laboratory analysis among others.", image: "/images/pillars/lab-pillar.png", href: "/services/laboratory-services", order: 0, isActive: true },
  { title: "Farm Advisory & Agronomy Training Services", description: "Farm advisory service equips farmers with data, tools & skills for efficient & profitable farm management.", image: "/images/pillars/advisory-pillar.png", href: "/services/farm-advisory-services", order: 1, isActive: true },
  { title: "AgTech Solutions", description: "We have developed a unique AgTech platform to scale our testing and advisory services across Africa. Featuring mobile soil testing labs, data driven agronomic recommendations and smart IoT sensors.", image: "/images/pillars/agtech-pillar.png", href: "/services/agtech-solutions", order: 2, isActive: true },
];

const services = [
  { name: "Laboratory Services", slug: "laboratory-services", category: "laboratory", shortDescription: "Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease & nematode laboratory analysis.", description: "We offer a wide range of state-of-the-art tests in agricultural, environmental, and food safety analysis. Our laboratory is ISO accredited and provides testing for soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease, and nematode analysis.", icon: "/icons/lab_services.svg", image: "/images/pillars/lab-pillar.png", isActive: true, order: 0 },
  { name: "Farm Advisory Services", slug: "farm-advisory-services", category: "advisory", shortDescription: "Farm advisory service equips farmers with data, tools & skills for efficient & profitable farm management.", description: "Our farm advisory service equips farmers with data, tools, and skills for efficient and profitable farm management. We provide technical off-farm and on-farm advice on soil management, crop nutrition, pest and disease management, and precision agriculture.", icon: "/icons/advisory_services.svg", image: "/images/pillars/advisory-pillar.png", isActive: true, order: 1 },
  { name: "AgTech Solutions", slug: "agtech-solutions", category: "agtech", shortDescription: "We have developed a unique AgTech platform to scale our testing and advisory services across Africa.", description: "We offer a wide range of technologies and techniques to scale our testing and advisory services across Africa. Featuring mobile soil testing labs, data-driven agronomic recommendations, smart IoT sensors, satellite imagery analysis, and GIS applications for soil mapping.", icon: "/icons/agTech_services.svg", image: "/images/pillars/agtech-pillar.png", isActive: true, order: 2 },
  { name: "Agrochemicals & Equipment Sales", slug: "agrochemicals-equipment-sales", category: "advisory", shortDescription: "Quality agrochemicals, fertilizers, and modern farming equipment to boost your agricultural productivity.", description: "We supply high-quality agrochemicals, fertilizers, crop protection products, and modern farming equipment. From drip irrigation systems to precision sprayers, we help you access the tools and inputs needed for maximum farm productivity.", icon: "/icons/advisory_services.svg", isActive: true, order: 3 },
  { name: "Techno Consult", slug: "techno-consult", category: "advisory", shortDescription: "Expert technical consulting services for agricultural projects, farm setup, and precision farming operations.", description: "Our technical consulting service provides expert guidance for agricultural projects of all sizes. We offer farm setup consultation, precision farming implementation, irrigation design, greenhouse planning, and comprehensive agribusiness advisory.", icon: "/icons/advisory_services.svg", isActive: true, order: 4 },
];

const blogPosts = [
  { title: "Improving the Availability of Plant Nutrients", slug: "improving-the-availability-of-plant-nutrients", author: "Aseeb Ventures Team", publishedAt: new Date("2025-04-24"), excerpt: "Even when fertilizers are applied, plants don't always get the nutrients they need. Nutrient availability depends on several soil and environmental factors, and optimizing these factors can significantly boost plant uptake and improve crop performance.", content: "Full article content about plant nutrients...", featuredImage: "/images/blog/nutrients.jpg", categories: ["Agronomy Articles"], tags: ["Soil health", "Crop Nutrition", "Crop Production", "Soil Testing"], isPublished: true },
  { title: "Understanding Soil Cation Exchange Capacity (CEC)", slug: "soil-cation-exchange-capacity-cec", author: "Aseeb Ventures Team", publishedAt: new Date("2025-04-21"), excerpt: "Cation Exchange Capacity (CEC) is a fundamental soil property that influences how well soils retain and supply essential nutrients to crops.", content: "Full article content about CEC...", featuredImage: "/images/blog/cec.jpg", categories: ["Agronomy Articles"], tags: ["Soil health", "Crop Nutrition", "Crop Production", "Soil Testing"], isPublished: true },
  { title: "Factors Affecting Nutrient Availability to Plants", slug: "factors-affecting-nutrient-availability-to-plants", author: "Aseeb Ventures Team", publishedAt: new Date("2025-03-31"), excerpt: "Even when fertilizers are generously applied, plants don't always get the nutrients they need. Several key soil and environmental factors influence how effectively plants can access and absorb nutrients.", content: "Full article content about nutrient availability factors...", featuredImage: "/images/blog/factors.jpg", categories: ["Agronomy Articles"], tags: ["Soil health", "Crop Nutrition", "Crop Production"], isPublished: true },
];

const successStories = [
  { title: "How We Achieved Massive 11.84 ton/ha Barley Yield", slug: "barley-farming-in-kenya", excerpt: "Barley farming in Nigeria is setting new yield records as witnessed in various barley trials conducted in Jos, Plateau State.", content: "Barley farming in Nigeria is setting new yield records...", farmerName: "Various Farmers", location: "Jos, Plateau State", crop: "Barley", image: "/images/success/barley.jpg", isPublished: true },
  { title: "Soil Testing For Smallscale Farmers In Malawi", slug: "soil-testing-for-smallscale-farmers-in-malawi", excerpt: "Our on-site AI based soil testing platform has already reached 90,000 smallholder farmers across Africa.", content: "Our on-site AI based soil testing platform...", farmerName: "Smallscale Farmers", location: "Malawi", crop: "Various", image: "/images/success/malawi.jpg", isPublished: true },
];

const nutrients = [
  { name: "Nitrogen (N)", role: "Essential for vegetative growth and protein synthesis. Key component of chlorophyll.", deficiency: "Yellowing of older leaves, stunted growth.", order: 0, isActive: true },
  { name: "Phosphorus (P)", role: "Critical for root development, flowering, and energy transfer (ATP).", deficiency: "Purple discoloration of leaves, poor root growth.", order: 1, isActive: true },
  { name: "Potassium (K)", role: "Regulates water balance, enzyme activation, and disease resistance.", deficiency: "Leaf margin burn, weak stems, poor fruit quality.", order: 2, isActive: true },
  { name: "Calcium (Ca)", role: "Cell wall structure, root tip development, and enzyme activation.", deficiency: "Blossom end rot in tomatoes, tip burn in lettuce.", order: 3, isActive: true },
  { name: "Magnesium (Mg)", role: "Central component of chlorophyll, essential for photosynthesis.", deficiency: "Interveinal chlorosis on older leaves.", order: 4, isActive: true },
  { name: "Sulfur (S)", role: "Component of amino acids and proteins, essential for oil synthesis.", deficiency: "Overall yellowing, similar to nitrogen deficiency but on younger leaves.", order: 5, isActive: true },
  { name: "Iron (Fe)", role: "Chlorophyll synthesis, electron transport in photosynthesis.", deficiency: "Interveinal chlorosis on young leaves.", order: 6, isActive: true },
  { name: "Zinc (Zn)", role: "Auxin synthesis, enzyme activation, protein synthesis.", deficiency: "Small leaves, shortened internodes (rosetting).", order: 7, isActive: true },
  { name: "Boron (B)", role: "Cell wall formation, pollen tube growth, sugar transport.", deficiency: "Death of growing points, hollow stems, poor fruit set.", order: 8, isActive: true },
];

const resourcesData = [
  { title: "Soil Sampling Guide", description: "Learn how to properly collect soil samples for accurate lab analysis.", fileUrl: "#", fileType: "pdf", category: "Guides", order: 0, isPublished: true },
  { title: "Fertilizer Recommendation Charts", description: "Comprehensive fertilizer recommendation charts for major crops.", fileUrl: "#", fileType: "pdf", category: "Charts", order: 1, isPublished: true },
  { title: "Crop Nutrition Handbook", description: "Essential guide to crop nutrition and fertilizer management.", fileUrl: "#", fileType: "pdf", category: "Guides", order: 2, isPublished: true },
  { title: "Water Quality Standards", description: "Water quality standards for agricultural and drinking water use.", fileUrl: "#", fileType: "pdf", category: "Standards", order: 3, isPublished: true },
  { title: "Food Safety Guidelines", description: "Guidelines for food safety testing and compliance.", fileUrl: "#", fileType: "pdf", category: "Guidelines", order: 4, isPublished: true },
  { title: "Carbon Farming Overview", description: "Introduction to carbon farming and soil carbon sequestration.", fileUrl: "#", fileType: "pdf", category: "Guides", order: 5, isPublished: true },
];

const legalPages = [
  { title: "Privacy Policy", slug: "privacy-policy", content: "<h2>1. Information We Collect</h2><p>We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, request a service quote, or create an account. This may include your name, email address, phone number, company name, and farm location.</p><h2>2. How We Use Your Information</h2><p>We use the information we collect to provide, maintain, and improve our services and to communicate with you about inquiries, quotes, test results, and services.</p><h2>3. Information Sharing</h2><p>We do not sell, trade, or rent your personal information to third parties.</p><h2>4. Data Security</h2><p>We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.</p><h2>5. Contact Us</h2><p>If you have questions about this Privacy Policy, please contact us at aseebventure1@gmail.com.</p>", isPublished: true },
  { title: "Terms & Conditions", slug: "terms-and-conditions", content: "<h2>1. Acceptance of Terms</h2><p>By accessing and using this website, you accept and agree to be bound by these terms and conditions.</p><h2>2. Use of Services</h2><p>Our laboratory testing and advisory services are provided subject to the terms outlined herein. All sample submissions are subject to our testing protocols and turnaround times.</p><h2>3. Intellectual Property</h2><p>All content, trademarks, logos, and intellectual property on this website are owned by or licensed to Aseeb Ventures. Reproduction is prohibited without express written permission.</p><h2>4. Limitation of Liability</h2><p>Aseeb Ventures shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website.</p><h2>5. Governing Law</h2><p>These terms and conditions are governed by and construed in accordance with the laws of Nigeria.</p>", isPublished: true },
];

const iwanttoOptions = [
  { label: "Which crop can I grow on my soil?", href: "/i-want-to/soil-testing", order: 0, isActive: true },
  { label: "Is my water safe to drink?", href: "/i-want-to/do-a-water-test", order: 1, isActive: true },
  { label: "Is this food safe to eat?", href: "/i-want-to/do-food-test", order: 2, isActive: true },
  { label: "Should I buy this land to farm?", href: "/i-want-to/do-land-suitability-survey", order: 3, isActive: true },
  { label: "What is wrong with my crop?", href: "/i-want-to/do-palnt-test", order: 4, isActive: true },
  { label: "Talk to an agronomist and get advice", href: "/i-want-to/talk-to-an-agronomist", order: 5, isActive: true },
];

const locations = [
  { country: "Nigeria", city: "Ibadan", address: "Shop 21 Lagelu Shopping Complex, Opposite Dizengoff, Monatan", phone: "+234 805 616 5347", email: "aseebventure1@gmail.com", isMainOffice: true, order: 0 },
];

const navItems = [
  { label: "Home", href: "/", hasMega: false, order: 0, isActive: true },
  { label: "About Us", href: "/about", hasMega: false, order: 1, isActive: true },
  { label: "Services", href: "#", hasMega: true, order: 2, isActive: true },
  { label: "Articles", href: "#", hasMega: true, order: 3, isActive: true },
  { label: "Resources", href: "/resources", hasMega: false, order: 4, isActive: true },
  { label: "Contact Us", href: "/contact", hasMega: false, order: 5, isActive: true },
];

const siteConfig = {
  siteName: "Aseeb Ventures",
  logo: "/images/logo-1.png",
  phone: "+234 805 616 5347",
  email: "aseebventure1@gmail.com",
  address: "Shop 21 Lagelu Shopping Complex, Opposite Dizengoff, Monatan, Ibadan",
  copyright: "© Copyright {year} - Aseeb Ventures Ltd.",
  metaTitle: "Aseeb Ventures",
  metaDescription: "Aseeb Ventures is Africa's leading agricultural testing laboratory & agronomy advisory services company.",
  socialLinks: { facebook: "https://facebook.com/", twitter: "https://twitter.com/", instagram: "https://www.instagram.com/" },
};

async function seed() {
  await connectDB();
  console.log("Connected to MongoDB");

  await Promise.all([
    HeroSlide.deleteMany({}),
    Pillar.deleteMany({}),
    Stat.deleteMany({}),
    Nutrient.deleteMany({}),
    Resource.deleteMany({}),
    LegalPage.deleteMany({}),
    IWantToOption.deleteMany({}),
    LocationModel.deleteMany({}),
    NavItem.deleteMany({}),
    SiteConfig.deleteMany({}),
    Service.deleteMany({}),
    BlogPost.deleteMany({}),
    SuccessStory.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  await HeroSlide.insertMany(heroSlides);
  await Stat.insertMany(stats);
  await Pillar.insertMany(pillars);
  await Service.insertMany(services);
  await BlogPost.insertMany(blogPosts);
  await SuccessStory.insertMany(successStories);
  await Nutrient.insertMany(nutrients);
  await Resource.insertMany(resourcesData);
  await LegalPage.insertMany(legalPages);
  await IWantToOption.insertMany(iwanttoOptions);
  await LocationModel.insertMany(locations);
  await SiteConfig.create(siteConfig);

  const servicesNav = await NavItem.findOne({ label: "Services" });
  const articlesNav = await NavItem.findOne({ label: "Articles" });

  const serviceChildren = [
    { label: "Laboratory Services", href: "/services/laboratory-services", icon: "/icons/lab_services.svg", description: "We offer wide range, state of the art tests in Agricultural…", order: 0, hasMega: false, parentId: servicesNav._id },
    { label: "Farm Advisory Services", href: "/services/farm-advisory-services", icon: "/icons/advisory_services.svg", description: "Best Technical off Farm and On Farm Advice on soil…", order: 1, hasMega: false, parentId: servicesNav._id },
    { label: "AgTech Solutions", href: "/services/agtech-solutions", icon: "/icons/agTech_services.svg", description: "We offer wide range of technologies and techniques…", order: 2, hasMega: false, parentId: servicesNav._id },
  ];

  const articleChildren = [
    { label: "Agronomy Articles", href: "/blog/category/agronomy-articles", icon: "/icons/agrnonomy_articles.svg", description: "Articles on crop disease, protection, soil science…", order: 0, hasMega: false, parentId: articlesNav._id },
    { label: "Nutritional Knowledge", href: "/nutritional-knowledge", icon: "/icons/nutrition_knowledge.svg", description: "Plants balance nutrition with a healthy dose of macronutrients…", order: 1, hasMega: false, parentId: articlesNav._id },
    { label: "How to Videos", href: "/blog/category/how-to-videos", icon: "/icons/how_to_videos.svg", description: "Handy videos about crop trials, crop protection and best farming…", order: 2, hasMega: false, parentId: articlesNav._id },
    { label: "Success Stories", href: "/success-stories", icon: "/icons/success_stories.svg", description: "Real stories, real farmers success with a little help from Aseeb Ventures…", order: 3, hasMega: false, parentId: articlesNav._id },
    { label: "FAQs", href: "https://aseeb-ventures.vercel.app", icon: "/icons/faqs.svg", description: "Aseeb Ventures help desk. Search the knowledge base…", order: 4, hasMega: false, parentId: articlesNav._id },
    { label: "News & Events", href: "/blog/category/news", icon: "/icons/news_events.svg", description: "Latest news about Aseeb Ventures, learn of upcoming events, trainings…", order: 5, hasMega: false, parentId: articlesNav._id },
  ];

  await NavItem.insertMany([...serviceChildren, ...articleChildren]);

  console.log("Seeded:");
  console.log(`  ${heroSlides.length} hero slides`);
  console.log(`  ${stats.length} stats`);
  console.log(`  ${pillars.length} pillars`);
  console.log(`  ${services.length} services`);
  console.log(`  ${blogPosts.length} blog posts`);
  console.log(`  ${successStories.length} success stories`);
  console.log(`  ${nutrients.length} nutrients`);
  console.log(`  ${resourcesData.length} resources`);
  console.log(`  ${legalPages.length} legal pages`);
  console.log(`  ${iwanttoOptions.length} i-want-to options`);
  console.log(`  ${locations.length} locations`);
  console.log(`  ${navItems.length} nav items + ${serviceChildren.length + articleChildren.length} children`);
  console.log("  1 site config");
  console.log("Done!");

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
