'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white border border-[#E8E2DA] card-hover overflow-hidden">
      {/* Featured badge */}
      {product.featured && (
        <span className="absolute top-3 left-3 z-10 bg-[#FAFAF8] text-[#1A1A18] text-[10px] uppercase tracking-widest px-2 py-1 border border-[#E8E2DA]">
          Featured
        </span>
      )}

      {/* Quick link arrow */}
      <Link
        href={`/shop/${product._id}`}
        className="absolute top-3 right-3 z-10 w-7 h-7 bg-white border border-[#E8E2DA] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="View product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17L17 7M17 7H7M17 7v10"
          />
        </svg>
      </Link>

      {/* Image */}
      <Link href={`/shop/${product._id}`}>
        <div className="relative h-56 bg-[#F5F2ED] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="label-tag mb-1">{product.category}</p>
        <Link href={`/shop/${product._id}`}>
          <h3 className="text-sm font-medium text-[#1A1A18] hover:text-[#5C5C3D] transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[#8C8070] leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#1A1A18]">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-[#8C8070] line-through">${product.oldPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#8C8070]">
            <span>★</span>
            <span>{product.rating}</span>
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full text-xs border border-[#1A1A18] text-[#1A1A18] py-2 hover:bg-[#1A1A18] hover:text-[#F5F2ED] transition-colors duration-200"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
