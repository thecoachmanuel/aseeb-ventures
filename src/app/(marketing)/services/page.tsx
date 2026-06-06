import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Our Services" };

const services = [
  { title: "Laboratory Services", slug: "laboratory-services", category: "laboratory", desc: "Leaders in soil fertility, water quality, food safety, pesticide residues, fertilizer quality, animal feed, plant disease & nematode laboratory analysis.", icon: "/icons/lab_services.svg", image: "/images/pillars/lab-pillar.png" },
  { title: "Farm Advisory Services", slug: "farm-advisory-services", category: "advisory", desc: "Farm advisory service equips farmers with data, tools & skills for efficient & profitable farm management. Best technical off-farm and on-farm advice on soil.", icon: "/icons/advisory_services.svg", image: "/images/pillars/advisory-pillar.png" },
  { title: "AgTech Solutions", slug: "agtech-solutions", category: "agtech", desc: "We have developed a unique AgTech platform to scale our testing and advisory services across Africa. Featuring mobile soil testing labs, data driven agronomic recommendations.", icon: "/icons/agTech_services.svg", image: "/images/pillars/agtech-pillar.png" },
  { title: "Soil Testing", slug: "soil-testing", category: "i-want-to", desc: "Working with you to achieve healthy, sustainable soils. Comprehensive soil analysis for better farming decisions.", icon: "/icons/lab_services.svg" },
  { title: "Water Quality Testing", slug: "do-a-water-test", category: "i-want-to", desc: "Water quality and industrial effluent analysis for agriculture, drinking water, and environmental monitoring.", icon: "/icons/lab_services.svg" },
  { title: "Food Safety Testing", slug: "do-food-test", category: "i-want-to", desc: "All the latest food safety tests, including aflatoxins, pesticide residues, and microbiological analysis.", icon: "/icons/lab_services.svg" },
  { title: "Land Suitability Surveys", slug: "do-land-suitability-survey", category: "i-want-to", desc: "Test before you invest. Let the experts check for you. Excellent land suitability surveys for farming investments.", icon: "/icons/advisory_services.svg" },
  { title: "Plant Tissue Analysis & Disease Diagnosis", slug: "do-palnt-test", category: "i-want-to", desc: "Identify diseases and detect nutrient deficiencies in plants and seeds.", icon: "/icons/lab_services.svg" },
  { title: "Agronomy Training", slug: "talk-to-an-agronomist", category: "advisory", desc: "Bringing talent to life. Expert hands-on training from people with over 20 years of experience.", icon: "/icons/advisory_services.svg" },
  { title: "Soil Mapping for Smart Fertilizer Blending", slug: "soil-mapping", category: "agtech", desc: "Fertilisers designed for local soils. Smart fertilizer blending based on comprehensive soil mapping.", icon: "/icons/agTech_services.svg" },
  { title: "Soil Carbon Services", slug: "soil-baseline-carbon-mapping", category: "agtech", desc: "Calculate your soil carbon stocks. Baseline carbon mapping for carbon credit programs.", icon: "/icons/agTech_services.svg" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative h-64 lg:h-80 bg-gray-800">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-white">Our Services</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Comprehensive Laboratory & Advisory Services</h2>
            <p className="text-gray-600">
              From soil testing to precision agriculture, we provide end-to-end solutions for farmers, agribusinesses, and environmental monitoring across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-crop-green hover:shadow-lg transition-all"
              >
                <img src={svc.icon} alt="" className="w-12 h-12 mb-4" />
                <h3 className="font-bold text-lg mb-2 group-hover:text-crop-green transition-colors">{svc.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
