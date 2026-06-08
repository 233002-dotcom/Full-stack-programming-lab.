import Link from 'next/link'
import { products } from '../../data/products'

export const metadata = {
  title: 'ProductList - Task 2 | Lab 8',
}

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      {/* Task 2 Hero Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Task 2</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          Dynamic Product Components
        </h1>
        <p className="text-gray-500 text-sm max-w-xl">
          The product experience includes reusable data-driven rendering, navigation from Home to
          ProductList, and dynamic product detail routes for each item.
        </p>
      </div>

      {/* Nav breadcrumb */}
      <div className="bg-white rounded-xl border border-gray-200 px-5 py-3 flex items-center gap-3 text-sm">
        <Link href="/task1/home" className="text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
        <span className="text-gray-300">|</span>
        <Link href="/task2/products" className="text-gray-700 font-medium">ProductList</Link>
        {products.map((p) => (
          <span key={p.id} className="flex items-center gap-3">
            <span className="text-gray-300">|</span>
            <Link href={`/task2/products/${p.id}`} className="text-gray-500 hover:text-gray-900 transition-colors">{p.title}</Link>
          </span>
        ))}
      </div>

      {/* ProductList component section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Task 2 | ProductList</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Product listing driven by reusable component logic.
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          This ProductList renders data from a typed product source and links each card to a dedicated
          dynamic product page using route parameters.
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-xl p-5">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">{product.category}</p>
              <h3 className="text-base font-bold text-gray-900 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800">${product.price}</span>
                <Link
                  href={`/task2/products/${product.id}`}
                  className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Back to Dashboard
        </Link>
        <Link href="/task2/products" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          Open ProductList Page
        </Link>
      </div>

    </div>
  )
}
