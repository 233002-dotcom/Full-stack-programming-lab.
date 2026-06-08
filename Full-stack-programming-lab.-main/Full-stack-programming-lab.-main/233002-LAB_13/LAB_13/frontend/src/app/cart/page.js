'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const SHIPPING = 12;

export default function CartPage() {
  const { cart, removeFromCart, updateQty, subtotal } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="label-tag mb-4">Cart</p>
        <h1 className="text-4xl font-serif text-[#1A1A18] mb-4">Your cart is empty.</h1>
        <p className="text-sm text-[#8C8070] mb-8">Add some pieces from the shop.</p>
        <Link href="/shop" className="btn-primary inline-block">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-tag mb-1">Cart</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A18]">Your selected pieces.</h1>
        </div>
        <Link href="/shop" className="text-sm text-[#8C8070] border border-[#E8E2DA] px-4 py-2 hover:border-[#1A1A18] transition-colors">
          Continue shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="md:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border border-[#E8E2DA] p-4 bg-white">
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-[#F5F2ED]">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[#8C8070]">{item.category}</p>
                <p className="text-sm font-medium text-[#1A1A18] truncate">{item.name}</p>
                <p className="text-sm text-[#1A1A18]">${item.price}</p>
              </div>
              {/* Qty controls */}
              <div className="flex items-center border border-[#E8E2DA]">
                <button
                  onClick={() => updateQty(item._id, item.quantity - 1)}
                  className="px-2.5 py-1.5 text-sm text-[#8C8070] hover:text-[#1A1A18]"
                >
                  −
                </button>
                <span className="px-3 py-1.5 text-sm border-x border-[#E8E2DA]">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item._id, item.quantity + 1)}
                  className="px-2.5 py-1.5 text-sm text-[#8C8070] hover:text-[#1A1A18]"
                >
                  +
                </button>
              </div>
              {/* Delete */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-[#8C8070] hover:text-red-500 transition-colors ml-2"
                aria-label="Remove"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="border border-[#E8E2DA] p-6 bg-white">
            <h3 className="text-sm font-semibold text-[#1A1A18] mb-4">Order summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#8C8070]">Subtotal</span>
                <span className="text-[#1A1A18]">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8C8070]">Shipping</span>
                <span className="text-[#1A1A18]">${SHIPPING}</span>
              </div>
              <div className="border-t border-[#E8E2DA] pt-2 flex justify-between text-sm font-semibold">
                <span className="text-[#1A1A18]">Total</span>
                <span className="text-[#1A1A18]">${subtotal + SHIPPING}</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-[#1A1A18] text-[#F5F2ED] py-3 text-sm font-medium hover:bg-[#5C5C3D] transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
