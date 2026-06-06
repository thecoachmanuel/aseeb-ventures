import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const serviceData: Record<string, { title: string; desc: string; category: string }> = {
  "laboratory-services": { title: "Laboratory Services", category: "laboratory", desc: "We offer a wide range of state-of-the-art tests in agricultural, environmental, and food safety analysis. Our laboratory is ISO accredited and provides testing for soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease, and nematode analysis." },
  "farm-advisory-services": { title: "Farm Advisory Services", category: "advisory", desc: "Our farm advisory service equips farmers with data, tools, and skills for efficient and profitable farm management. We provide technical off-farm and on-farm advice on soil management, crop nutrition, pest and disease management, and precision agriculture." },
  "agtech-solutions": { title: "AgTech Solutions", category: "agtech", desc: "We offer a wide range of technologies and techniques to scale our testing and advisory services across Africa. Featuring mobile soil testing labs, data-driven agronomic recommendations, smart IoT sensors, satellite imagery analysis, and GIS applications for soil mapping." },
  "soil-testing": { title: "Soil Testing & Analysis", category: "i-want-to", desc: "Working with you to achieve healthy, sustainable soils. Our comprehensive soil testing services analyze key parameters including pH, organic matter, macro and micronutrients, CEC, and soil texture to provide tailored fertilizer recommendations." },
  "do-a-water-test": { title: "Water Quality Testing", category: "i-want-to", desc: "Water quality and industrial effluent analysis for agriculture, drinking water, and environmental monitoring. We test for chemical, physical, and microbiological parameters." },
  "do-food-test": { title: "Food Safety Testing", category: "i-want-to", desc: "All the latest food safety tests, including aflatoxins, pesticide residues, heavy metals, and microbiological analysis. Ensuring your food meets safety standards." },
  "do-land-suitability-survey": { title: "Land Suitability Surveys", category: "i-want-to", desc: "Test before you invest. Let our experts assess land suitability for your intended agricultural use. Comprehensive soil surveys and land capability assessments." },
  "do-palnt-test": { title: "Plant Tissue Analysis & Disease Diagnosis", category: "i-want-to", desc: "Identify diseases and detect nutrient deficiencies in plants and seeds. Our plant tissue analysis helps you understand what your crops need for optimal health and yield." },
  "talk-to-an-agronomist": { title: "Agronomy Training & Advisory", category: "advisory", desc: "Expert hands-on training from people with over 20 years of experience. Get personalized advice from our certified agronomists." },
  "soil-mapping": { title: "Soil Mapping for Smart Fertilizer Blending", category: "agtech", desc: "Fertilisers designed for local soils. Our soil mapping service uses advanced GIS and satellite technology to create detailed soil nutrient maps for precision fertilizer blending." },
  "soil-baseline-carbon-mapping": { title: "Soil Carbon Services", category: "agtech", desc: "Calculate your soil carbon stocks. Baseline carbon mapping is essential for carbon credit programs and sustainable farming initiatives." },
  "agronomy-training": { title: "Agronomy Training", category: "advisory", desc: "Bringing talent to life. Sign up today and get hands-on technical training from our agronomy experts with over 20 years of field experience." },
  "product-trials": { title: "Independent Product Trials", category: "advisory", desc: "Independent testing and validation of agricultural products including fertilizers, crop protection products, and soil amendments." },
  "agrochemicals-equipment-sales": { title: "Agrochemicals & Equipment Sales", category: "advisory", desc: "We supply high-quality agrochemicals, fertilizers, crop protection products, and modern farming equipment. From drip irrigation systems to precision sprayers, we help you access the tools and inputs needed for maximum farm productivity." },
  "techno-consult": { title: "Techno Consult", category: "advisory", desc: "Our technical consulting service provides expert guidance for agricultural projects of all sizes. We offer farm setup consultation, precision farming implementation, irrigation design, greenhouse planning, and comprehensive agribusiness advisory to help you build profitable and sustainable farming operations." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = serviceData[slug];
  if (!svc) return { title: "Service Not Found" };
  return { title: svc.title };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = serviceData[slug];
  if (!svc) notFound();

  return (
    <>
      <section className="relative h-64 lg:h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banners/services-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-crop-green text-sm font-medium uppercase tracking-wider mb-2">
              {svc.category === "laboratory" ? "Laboratory Services" : svc.category === "advisory" ? "Farm Advisory" : svc.category === "agtech" ? "AgTech Solutions" : "I Want To"}
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold text-white">{svc.title}</h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed text-lg">{svc.desc}</p>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Get Started</h2>
              <p className="text-gray-600">Contact us today to learn more about this service and how it can benefit your farm or business.</p>
              <Link href="/contact" className="banner_cta mt-4">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
