'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({ featured: true })
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch(() => {});
  }, []);

  const categories = [
    { num: '01', title: 'Planters', sub: 'Matte ceramic forms' },
    { num: '02', title: 'Care', sub: 'Daily plant rituals' },
    { num: '03', title: 'Decor', sub: 'Shelf-ready objects' },
    { num: '04', title: 'Admin', sub: 'Live MongoDB CRUD' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-[#1A1A18] text-[#F5F2ED] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="label-tag text-[#8C8070] mb-4">✦ Rustik Studio 2026</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05] mb-6">
              Sculptural plant goods for lived-in spaces.
            </h1>
            <p className="text-sm text-[#8C8070] max-w-sm leading-relaxed mb-8">
              Curated planters, care tools, and tactile home objects, powered by a fresh MongoDB
              product catalog and a complete MERN storefront.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/shop"
                className="border border-[#F5F2ED] text-[#F5F2ED] px-5 py-2.5 text-sm hover:bg-[#F5F2ED] hover:text-[#1A1A18] transition-colors"
              >
                Shop collection →
              </Link>
              <Link
                href="/admin"
                className="border border-[#5C5C3D] text-[#8C8070] px-5 py-2.5 text-sm hover:border-[#8C8070] transition-colors"
              >
                Manage products
              </Link>
            </div>
          </div>
          {/* Hero image placeholder */}
          <div className="hidden md:block relative h-80 rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&fit=crop"
              alt="Hero plant"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>

        {/* Category strips */}
        <div className="border-t border-[#2E2E2C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#2E2E2C]">
              {categories.map((c) => (
                <div key={c.num} className="px-6 py-5">
                  <p className="text-[10px] text-[#5C5C3D] mb-1">{c.num}</p>
                  <p className="text-sm font-medium text-[#F5F2ED]">{c.title}</p>
                  <p className="text-xs text-[#8C8070]">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-tag text-[#8C8070] mb-2">✦ Featured pieces</p>
            <h2 className="section-title">The objects that make the room.</h2>
          </div>
          <Link href="/shop" className="text-sm text-[#8C8070] hover:text-[#1A1A18] transition-colors">
            View all →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#8C8070]">
            <p className="text-sm">Start your backend to load products from MongoDB.</p>
            <p className="text-xs mt-2 font-mono">GET http://localhost:5000/api/products</p>
          </div>
        )}
      </section>

      {/* Stack info banner */}
      <section className="bg-[#F5F2ED] border-t border-b border-[#E8E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs text-[#8C8070] mb-3">Built by Aman Mir</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A18] leading-tight">
              Complete store flow, not a static mockup.
            </h2>
            <p className="text-sm text-[#8C8070] mt-4 leading-relaxed max-w-sm">
              The interface connects to a dedicated Express API, pulls products from MongoDB, and
              keeps shopping actions smooth across desktop, tablet, and mobile screens.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: 'API', val: 'http://localhost:5000/api/products' },
              { label: 'Database', val: 'lab12_dynamic_ecommerce' },
              { label: 'Collection', val: 'products' },
              { label: 'Frontend', val: 'http://localhost:3000' },
            ].map((item) => (
              <div key={item.label} className="border border-[#E8E2DA] p-4 bg-white">
                <p className="text-[10px] uppercase tracking-widest text-[#8C8070] mb-1">
                  {item.label}
                </p>
                <p className="text-xs font-mono text-[#1A1A18] break-all">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
