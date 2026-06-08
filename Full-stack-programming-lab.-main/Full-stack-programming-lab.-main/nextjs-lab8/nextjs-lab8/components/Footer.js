import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">Aman Mir</span> · 233002 · Air University, Islamabad
        </div>
        <nav className="flex items-center gap-3">
          <Link href="/task1/home" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/task2/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ProductList
          </Link>
          <Link href="/task1/contact" className="text-sm text-gray-500 hover:text-gray-900 bg-gray-900 text-white px-3 py-1 rounded-full transition-colors">
            Contact
          </Link>
        </nav>
      </div>
      <div className="border-t border-gray-100 py-3 text-center text-xs text-gray-400">
        Spring 2026 | Department of Creative Technologies - FCAI | Full Stack Programming (B) Lab 8
      </div>
    </footer>
  )
}
