import Link from 'next/link'

export const metadata = {
  title: 'About - Task 1 | Lab 8',
}

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">About</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          Project Overview &<br />Architecture
        </h1>
        <p className="text-gray-500 text-sm max-w-2xl mb-6">
          This project is built with Next.js 14 using the App Router. It demonstrates a multi-page
          architecture with shared Header and Footer components, Tailwind CSS for styling, and
          dynamic routing for product detail pages.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">Tech Stack</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Next.js 14 (App Router)</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>React 18</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Tailwind CSS</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Dynamic Routing</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-800 mb-3">Quality Standards</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Reusable component architecture</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Global layout with layout.js</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Consistent navigation & footer</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-800 inline-block"></span>Production-ready visual system</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/task1/home" className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Back to Home
        </Link>
        <Link href="/task1/contact" className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
          Go to Contact
        </Link>
      </div>

    </div>
  )
}
