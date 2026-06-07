import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find({ isPublished: true })
    .select("name slug category shortDescription price unit images")
    .sort({ order: 1, createdAt: -1 })
    .lean();

  const categories = [...new Set(products.map((p: any) => p.category))] as string[];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#009050] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Agrochemicals & Equipment</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Browse our range of quality agrochemicals, farming equipment, seeds, and tools. 
            All products include WhatsApp checkout for fast ordering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-xl text-gray-500">No products available yet</p>
            <p className="text-gray-400 mt-2">Check back soon for new arrivals</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <span className="px-4 py-2 rounded-full bg-[#009050] text-white text-sm font-medium">All</span>
              {categories.map((cat) => (
                <span key={cat} className="px-4 py-2 rounded-full bg-white border text-gray-600 text-sm font-medium capitalize">
                  {cat}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link
                  key={product._id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-[#009050] uppercase capitalize">{product.category}</span>
                    <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-[#009050] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</span>
                      {product.unit && <span className="text-xs text-gray-400">{product.unit}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
