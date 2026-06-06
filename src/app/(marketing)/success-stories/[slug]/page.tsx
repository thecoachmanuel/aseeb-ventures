import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const stories: Record<string, { title: string; content: string; farmerName?: string; location?: string; crop?: string }> = {
  "barley-farming-in-kenya": {
    title: "How We Achieved Massive 11.84 ton/ha Barley Yield",
    farmerName: "Various Farmers",
    location: "Timau, Meru County",
    crop: "Barley",
    content: `Barley farming in Kenya is setting new yield records as witnessed in various barley trials conducted in Timau, Meru County. Trials are a huge part of making progress in farming, and back in September 2018 we harvested something truly special. A plot of barley — 10 metres long by 2 metres in length — that achieved an incredible 11.84 tons per hectare.

How Did We Achieve This?
The remarkable yield was achieved through a combination of factors:
- Comprehensive soil testing and analysis before planting
- Customized fertilizer blending based on soil nutrient maps
- Precision planting with optimal seed rates
- Timely pest and disease monitoring and management
- Proper irrigation scheduling
- Regular plant tissue analysis to fine-tune nutrition

The Cropnuts team worked closely with the farmers throughout the season, providing technical advice based on real-time data from soil and plant analysis. This is a perfect example of what can be achieved when science meets practical farming.

If you're interested in improving your barley yields, contact Cropnuts for comprehensive soil testing and tailored agronomic advice.`,
  },
  "soil-testing-for-smallscale-farmers-in-malawi": {
    title: "Soil Testing For Smallscale Farmers In Malawi",
    farmerName: "Smallscale Farmers",
    location: "Malawi",
    crop: "Various",
    content: `Our on-site AI based soil testing platform has already reached 90,000 smallholder farmers across Africa, bringing affordable and accessible soil analysis to those who need it most.

The Malawi project demonstrated that smallscale farmers can benefit enormously from soil testing. By understanding their soil's nutrient status, farmers were able to:
- Apply the right type and amount of fertilizer
- Save money by avoiding unnecessary fertilizer application
- Increase yields by 30-50% in many cases
- Improve soil health through balanced nutrition

The mobile soil testing platform uses advanced spectroscopy and AI algorithms to provide instant soil analysis results. Farmers receive personalized fertilizer recommendations via SMS, making the information accessible even in remote areas without internet connectivity.

This project shows that technology can bridge the gap between large-scale commercial farming and smallholder agriculture. Cropnuts is committed to continuing this work and reaching even more farmers across Africa.`,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = stories[slug];
  if (!story) return { title: "Story Not Found" };
  return { title: story.title };
}

export default async function SuccessStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories[slug];
  if (!story) notFound();

  return (
    <article className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-3 mb-4 text-sm">
          {story.location && <span className="text-crop-green font-medium">{story.location}</span>}
          {story.crop && <span className="text-gray-400">• {story.crop}</span>}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">{story.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {story.content}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/success-stories" className="text-crop-green font-medium hover:underline">← Back to Success Stories</Link>
        </div>
      </div>
    </article>
  );
}
