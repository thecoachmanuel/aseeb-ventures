import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { WhatsAppBuyButton } from "@/components/product/WhatsAppBuyButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug, isPublished: true }).lean();

  if (!product) notFound();

  const productData = product as any;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#009050] mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="bg-white rounded-xl overflow-hidden border">
              {productData.images?.[0] ? (
                <img src={productData.images[0]} alt={productData.name} className="w-full h-80 lg:h-96 object-cover" />
              ) : (
                <div className="w-full h-80 lg:h-96 bg-gray-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
            </div>
            {productData.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productData.images.slice(1).map((img: string, i: number) => (
                  <div key={i} className="bg-white rounded-lg border overflow-hidden aspect-square">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="text-sm font-medium text-[#009050] uppercase capitalize">{productData.category}</span>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{productData.name}</h1>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-3xl font-bold text-gray-900">₦{productData.price.toLocaleString()}</span>
              {productData.unit && <span className="text-gray-500">{productData.unit}</span>}
            </div>

            <div className="mt-2">
              {productData.inStock ? (
                <span className="inline-flex items-center gap-1 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In Stock {productData.stockQuantity > 0 && `(${productData.stockQuantity} available)`}
                </span>
              ) : (
                <span className="text-sm text-red-500">Out of Stock</span>
              )}
            </div>

            <div className="mt-8">
              <WhatsAppBuyButton
                name={productData.name}
                price={productData.price}
                unit={productData.unit}
                phone={productData.whatsappNumber}
                className="w-full justify-center text-lg"
              />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{productData.description}</p>
            </div>

            {productData.specifications?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h2>
                <div className="bg-white rounded-xl border overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {productData.specifications.map((spec: any, i: number) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">{spec.key}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
