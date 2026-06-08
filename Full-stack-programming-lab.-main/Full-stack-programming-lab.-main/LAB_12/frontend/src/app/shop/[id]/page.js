'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProduct } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProduct(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div className="h-96 bg-[#F5F2ED] animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 bg-[#F5F2ED] animate-pulse w-20" />
          <div className="h-10 bg-[#F5F2ED] animate-pulse" />
          <div className="h-6 bg-[#F5F2ED] animate-pulse w-24" />
        </div>
      </div>
    );
  }

  if (!product)
    return (
      <div className="text-center py-20 text-[#8C8070]">
        <p>Product not found.</p>
        <button onClick={() => router.push('/shop')} className="mt-4 text-sm underline">
          Back to shop
        </button>
      </div>
    );

  const allImages = [product.image, ...(product.gallery || [])];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="h-96 bg-[#F5F2ED] overflow-hidden mb-3">
            <img
              src={allImages[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-16 overflow-hidden border-2 transition-colors ${
                    activeImg === i ? 'border-[#1A1A18]' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="label-tag mb-2">{product.category}</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A18] leading-tight mb-3">
            {product.name}
          </h1>
          <p className="text-sm text-[#8C8070] leading-relaxed mb-4">{product.description}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold text-[#1A1A18]">${product.price}</span>
            {product.oldPrice && (
              <span className="text-base text-[#8C8070] line-through">${product.oldPrice}</span>
            )}
            <span className="text-sm text-[#8C8070]">★ {product.rating}</span>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-[#E8E2DA]">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-[#8C8070] hover:text-[#1A1A18]"
              >
                −
              </button>
              <span className="px-4 py-2 text-sm border-x border-[#E8E2DA]">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 text-[#8C8070] hover:text-[#1A1A18]"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                added
                  ? 'bg-[#5C5C3D] text-white'
                  : 'bg-[#1A1A18] text-[#F5F2ED] hover:bg-[#5C5C3D]'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5.6a1 1 0 001 1.4H19" />
              </svg>
              {added ? 'Added!' : 'Add to cart'}
            </button>
          </div>

          {/* Details grid */}
          {product.details && (
            <div className="grid grid-cols-3 gap-3 border border-[#E8E2DA] p-4 mb-6">
              {product.details.material && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8C8070] mb-1">Material</p>
                  <p className="text-xs text-[#1A1A18]">{product.details.material}</p>
                </div>
              )}
              {product.details.dimensions && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8C8070] mb-1">Size</p>
                  <p className="text-xs text-[#1A1A18]">{product.details.dimensions}</p>
                </div>
              )}
              {product.details.care && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8C8070] mb-1">Care</p>
                  <p className="text-xs text-[#1A1A18]">{product.details.care}</p>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-[#1A1A18] mb-2 uppercase tracking-widest">Product details</p>
              <ul className="space-y-1">
                {product.tags.map((tag) => (
                  <li key={tag} className="text-xs text-[#8C8070] flex items-center gap-2">
                    <span>✦</span> {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
