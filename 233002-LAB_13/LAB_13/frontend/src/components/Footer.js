import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF8] border-t border-[#E8E2DA] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full border-2 border-[#1A1A18] flex items-center justify-center">
                <span className="w-2 h-2 bg-[#1A1A18] rounded-full" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[#1A1A18]">Rustik Studio</div>
                <div className="text-[10px] text-[#8C8070]">Lab 12 by Aman Mir</div>
              </div>
            </div>
            <p className="text-xs text-[#8C8070] leading-relaxed max-w-xs">
              A dynamic MERN ecommerce storefront using Next.js, Tailwind CSS, Express, MongoDB, and
              a fresh Lab 12 product database.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs font-semibold text-[#1A1A18] mb-3 uppercase tracking-widest">
              Pages
            </p>
            <div className="space-y-2">
              {['shop', 'about', 'contact', 'admin'].map((p) => (
                <div key={p}>
                  <Link
                    href={`/${p}`}
                    className="text-sm text-[#8C8070] hover:text-[#1A1A18] capitalize transition-colors"
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Database info */}
          <div>
            <p className="text-xs font-semibold text-[#1A1A18] mb-3 uppercase tracking-widest">
              Database
            </p>
            <p className="text-sm text-[#8C8070]">lab12_dynamic_ecommerce</p>
            <p className="text-sm text-[#8C8070]">products</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
