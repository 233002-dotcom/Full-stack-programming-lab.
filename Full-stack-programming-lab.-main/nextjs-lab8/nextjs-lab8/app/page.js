import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      {/* Hero Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Dashboard</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Professional Next.js<br />Lab Workspace
          </h1>
          <p className="text-gray-500 text-sm max-w-md mb-6">
            Start from this landing page, then navigate into Task 1 and Task 2. The project is structured
            with reusable components, App Router best practices, and production-ready styling consistency.
          </p>
          <div className="flex gap-3">
            <Link
              href="/task1/home"
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Go to Task 1
            </Link>
            <Link
              href="/task2/products"
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Task 2
            </Link>
          </div>
        </div>
        <div className="ml-8 bg-white border-2 border-gray-300 rounded-lg p-5 min-w-[180px]">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Student Information</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">NAME</p>
          <div className="border border-gray-300 rounded p-3 text-sm text-gray-800 font-medium">
            <p>Aman</p>
            <p className="mt-1">233002</p>
          </div>
        </div>
      </div>

      {/* Lab Tasks Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Lab Tasks</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Task 1</p>
            <p className="text-sm text-gray-600 mb-4">
              Multi-page application with dedicated Home, About, and Contact pages, shared navigation, and global footer via layout.
            </p>
            <Link
              href="/task1/home"
              className="inline-block px-4 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Open Task 1
            </Link>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Task 2</p>
            <p className="text-sm text-gray-600 mb-4">
              Dynamic component architecture with ProductList, dynamic product routes, and direct navigation between home, list, and detail pages.
            </p>
            <Link
              href="/task2/products"
              className="inline-block px-4 py-1.5 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Open Task 2
            </Link>
          </div>
        </div>
      </div>

      {/* Task 1 Overview Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Task 1</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Multi-page App Structure</h2>
        <p className="text-sm text-gray-500 max-w-xl mb-8">
          This task delivers the required three pages with shared Header and Footer, accessible navigation, and a professional visual system.
        </p>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Home',
              desc: 'Primary home page for Task 1 with key links into product and contact flows.',
              href: '/task1/home'
            },
            {
              title: 'About',
              desc: 'Project overview, architecture approach, and quality standards used in the build.',
              href: '/task1/about'
            },
            {
              title: 'Contact',
              desc: 'Professional contact form and direct communication details for the project.',
              href: '/task1/contact'
            }
          ].map(({ title, desc, href }) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-xs text-gray-500 mb-3">{desc}</p>
              <Link
                href={href}
                className="inline-block px-3 py-1 border border-gray-300 text-xs text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
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
            Continue to Task 2
          </Link>
        </div>
      </div>

    </div>
  )
}
