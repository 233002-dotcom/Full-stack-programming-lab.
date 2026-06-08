'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAF8] border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full border-2 border-[#1A1A18] flex items-center justify-center">
              <span className="w-2 h-2 bg-[#1A1A18] rounded-full" />
            </span>
            <div className="leading-none">
              <div className="text-sm font-semibold text-[#1A1A18]">Aman Mir</div>
              <div className="text-[10px] text-[#8C8070]">Rustik Studio</div>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-[#1A1A18] font-medium'
                    : 'text-[#8C8070] hover:text-[#1A1A18]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm text-[#1A1A18] border border-[#D4C5B0] px-3 py-1.5 hover:border-[#1A1A18] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6a1 1 0 001 1.4H19M10 21a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="bg-[#1A1A18] text-[#F5F2ED] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
