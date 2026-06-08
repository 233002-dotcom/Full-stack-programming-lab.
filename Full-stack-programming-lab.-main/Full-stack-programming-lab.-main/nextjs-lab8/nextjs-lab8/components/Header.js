'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/task1/home', label: 'Task 1' },
    { href: '/task2/products', label: 'Task 2' },
    { href: '/task1/about', label: 'About' },
    { href: '/task1/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900 text-lg tracking-tight">
          Lab 8 <span className="text-gray-400 font-normal text-sm ml-1">Aman Mir · 233002</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
