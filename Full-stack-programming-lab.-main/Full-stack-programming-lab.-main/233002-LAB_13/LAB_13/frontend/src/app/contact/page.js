'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <p className="label-tag mb-4">Contact</p>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A18] leading-tight mb-6">
            Simple support for a modern storefront.
          </h1>
          <p className="text-sm text-[#8C8070] leading-relaxed mb-10">
            The contact page is styled as part of the production interface and keeps the lab
            submission complete across main and sub-pages.
          </p>

          <div className="space-y-3">
            {[
              { icon: '✉', val: 'support@rustik.local' },
              { icon: '✆', val: '+92 300 0000000' },
              { icon: '◎', val: 'Air University Islamabad' },
            ].map((item) => (
              <div
                key={item.val}
                className="flex items-center gap-3 border border-[#E8E2DA] px-4 py-3 text-sm text-[#8C8070]"
              >
                <span>{item.icon}</span>
                <span>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          {sent ? (
            <div className="border border-[#E8E2DA] p-8 text-center">
              <p className="text-2xl font-serif text-[#1A1A18] mb-2">Message sent.</p>
              <p className="text-sm text-[#8C8070]">We'll get back to you shortly.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-[#8C8070] underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-tag block mb-1">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Aman Mir"
                    required
                    className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>
                <div>
                  <label className="label-tag block mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="amanmir@example.com"
                    required
                    className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="label-tag block mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you are looking for"
                  required
                  rows={5}
                  className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#1A1A18] text-[#F5F2ED] px-6 py-2.5 text-sm hover:bg-[#5C5C3D] transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
