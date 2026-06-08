import Link from 'next/link'
import { products } from '../../../data/products'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }) {
  const product = products.find((p) => p.id === params.id)
  return { title: `${product?.title ?? 'Product'} | Lab 8` }
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === params.id)
  if (!product) notFound()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-400 flex items-center gap-1.5">
        <Link href="/" className="hover:text-gray-700 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/task2/products" className="hover:text-gray-700 transition-colors">Task 2</Link>
        <span>/</span>
        <Link href="/task2/products" className="hover:text-gray-700 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-600">{product.title}</span>
      </div>

      {/* Product Hero */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">{product.category}</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">{product.title}</h1>
        <p className="text-sm text-gray-500 max-w-xl mb-5">{product.fullDescription}</p>
        <p className="text-2xl font-bold text-gray-900">${product.price}</p>
      </div>

      {/* Key Highlights */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-base font-bold text-gray-800 mb-4">Key highlights</h2>
        <div className="divide-y divide-gray-100">
          {product.highlights.map((highlight) => (
            <div key={highlight} className="py-3 text-sm text-gray-700">
              {highlight}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Link href="/task2/products" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          ← Back to ProductList
        </Link>
        <Link href="/task1/home" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Home
        </Link>
        <Link href="/task1/contact" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          Contact
        </Link>
      </div>

    </div>
  )
}
