import Link from 'next/link'

export const metadata = {
  title: 'Home - Task 1 | Lab 8',
}

export default function Task1Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      {/* Home Hero Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Home</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Welcome to the Multi-Page<br />Experience
          </h1>
          <p className="text-gray-500 text-sm max-w-md mb-6">
            This Home page is part of Task 1 and connects directly to About, Contact, ProductList,
            and dynamic product detail routes.
          </p>
          <div className="flex gap-3">
            <Link
              href="/task1/about"
              className="px-4 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/task1/contact"
              className="px-4 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/task2/products"
              className="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              ProductList
            </Link>
          </div>
        </div>
        <div className="ml-8 bg-white border-2 border-gray-300 rounded-lg p-5 min-w-[180px]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Project Owner</p>
          <div className="border border-gray-300 rounded p-3 text-sm text-gray-800 font-medium text-center">
            <p>Aman Mir</p>
            <p className="mt-2">233002</p>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { title: 'About', desc: 'Learn about the project architecture and approach.', href: '/task1/about' },
          { title: 'Contact', desc: 'Get in touch with direct communication details.', href: '/task1/contact' },
          { title: 'Products', desc: 'Browse the product list with dynamic routing.', href: '/task2/products' },
        ].map(({ title, desc, href }) => (
          <div key={title} className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-xs text-gray-500 mb-4">{desc}</p>
            <Link href={href} className="inline-block px-3 py-1 border border-gray-300 text-xs text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Open page
            </Link>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link href="/" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Back to Dashboard
        </Link>
        <Link href="/task2/products" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          Go to Task 2
        </Link>
      </div>

    </div>
  )
}
