'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

const CATEGORIES = ['All', 'Decor', 'Furniture', 'Planters', 'Hanging'];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;
      const res = await getProducts(params);
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
        <div>
          <p className="label-tag mb-2">Live catalog</p>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A18] leading-tight">
            Shop the Rustik edit.
          </h1>
          <p className="text-sm text-[#8C8070] mt-3 leading-relaxed">
            Filter the live MongoDB catalog, inspect details, and add pieces to the cart from a
            responsive product grid.
          </p>
        </div>
        <div className="hidden md:block h-48 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop"
            alt="Shop hero"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Search & Refresh */}
      <div className="flex gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C8070]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-[#E8E2DA] bg-white focus:outline-none focus:border-[#1A1A18] transition-colors"
            />
          </div>
          <button type="submit" className="text-sm border border-[#E8E2DA] px-4 py-2 hover:border-[#1A1A18] transition-colors flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </form>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 text-sm border transition-colors ${
              category === cat
                ? 'bg-[#1A1A18] text-[#F5F2ED] border-[#1A1A18]'
                : 'border-[#E8E2DA] text-[#8C8070] hover:border-[#1A1A18] hover:text-[#1A1A18]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 bg-[#F5F2ED] animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#8C8070]">
          <p className="text-sm">No products found.</p>
          <p className="text-xs mt-1">Make sure your backend is running and seeded.</p>
        </div>
      )}
    </div>
  );
}
