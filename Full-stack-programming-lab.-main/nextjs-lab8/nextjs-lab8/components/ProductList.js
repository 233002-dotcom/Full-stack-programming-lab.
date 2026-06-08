import Link from 'next/link'
import { products } from '../app/data/products'

export default function ProductList() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-5">
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
  )
}
