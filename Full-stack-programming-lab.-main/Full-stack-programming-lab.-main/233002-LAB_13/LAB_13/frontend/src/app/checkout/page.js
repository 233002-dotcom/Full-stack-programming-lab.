'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { placeOrder } from '@/lib/api';
import { useRouter } from 'next/navigation';

const SHIPPING = 12;

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'Cash',
  });
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlacing(true);
    setError('');
    try {
      const items = cart.map((i) => ({
        productId: i._id,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      }));
      await placeOrder({
        ...form,
        items,
        subtotal,
        shipping: SHIPPING,
        total: subtotal + SHIPPING,
      });
      clearCart();
      setSuccess(true);
    } catch {
      setError('Failed to place order. Make sure the backend is running.');
    } finally {
      setPlacing(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 bg-[#5C5C3D] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif text-[#1A1A18] mb-3">Order placed.</h2>
        <p className="text-sm text-[#8C8070] mb-8">Thank you. Your order has been saved to MongoDB.</p>
        <button onClick={() => router.push('/shop')} className="btn-primary">
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="label-tag mb-2">Checkout</p>
      <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A18] mb-8">Finish with a clean flow.</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-tag block mb-1">Full name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Aman Mir"
                required
                className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors"
              />
            </div>
            <div>
              <label className="label-tag block mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="amanmir@example.com"
                required
                className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-tag block mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 300 0000000"
                required
                className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors"
              />
            </div>
            <div>
              <label className="label-tag block mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Islamabad"
                required
                className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="label-tag block mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House, street, sector, delivery note"
              required
              rows={3}
              className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors resize-none"
            />
          </div>

          {/* Payment */}
          <div className="border border-[#E8E2DA] p-4">
            <p className="text-xs font-semibold text-[#1A1A18] mb-3 flex items-center gap-2">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment method
            </p>
            <div className="flex gap-6">
              {['Cash', 'Card', 'Bank'].map((method) => (
                <label key={method} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={form.paymentMethod === method}
                    onChange={handleChange}
                    className="accent-[#1A1A18]"
                  />
                  <span className={form.paymentMethod === method ? 'text-[#1A1A18] font-medium' : 'text-[#8C8070]'}>
                    {method}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={placing || cart.length === 0}
            className="w-full bg-[#1A1A18] text-[#F5F2ED] py-3 text-sm font-medium hover:bg-[#5C5C3D] transition-colors disabled:opacity-50"
          >
            {placing ? 'Placing order...' : 'Place order'}
          </button>
        </form>

        {/* Summary */}
        <div>
          <div className="border border-[#E8E2DA] p-5 bg-white">
            <h3 className="text-sm font-semibold text-[#1A1A18] mb-4">Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-xs">
                  <span className="text-[#8C8070] truncate mr-2">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="text-[#1A1A18] flex-shrink-0">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8E2DA] pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[#8C8070]">Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8C8070]">Shipping</span>
                <span>${SHIPPING}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold pt-1 border-t border-[#E8E2DA]">
                <span>Total</span>
                <span>${subtotal + SHIPPING}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
