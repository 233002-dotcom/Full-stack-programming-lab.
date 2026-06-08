'use client';
import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api';

const CATEGORIES = ['Planters', 'Care', 'Decor', 'Furniture', 'Hanging'];

const EMPTY_FORM = {
  name: '',
  category: 'Planters',
  price: '',
  oldPrice: '',
  stock: '10',
  rating: '4.8',
  image: '',
  description: '',
  gallery: '',
  details: { material: '', dimensions: '', care: '' },
  tags: '',
  featured: false,
};

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('details.')) {
      const key = name.split('.')[1];
      setForm((f) => ({ ...f, details: { ...f.details, [key]: value } }));
    } else {
      setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        stock: Number(form.stock),
        rating: Number(form.rating),
        gallery: form.gallery ? form.gallery.split('\n').filter(Boolean) : [],
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      };
      if (editId) {
        await updateProduct(editId, payload);
        setMsg('✅ Product updated');
      } else {
        await createProduct(payload);
        setMsg('✅ Product created');
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      await fetchProducts();
    } catch {
      setMsg('❌ Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      oldPrice: p.oldPrice ? String(p.oldPrice) : '',
      stock: String(p.stock),
      rating: String(p.rating),
      image: p.image,
      description: p.description,
      gallery: (p.gallery || []).join('\n'),
      details: { material: p.details?.material || '', dimensions: p.details?.dimensions || '', care: p.details?.care || '' },
      tags: (p.tags || []).join(', '),
      featured: p.featured || false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setMsg('🗑 Product deleted');
      await fetchProducts();
    } catch {
      setMsg('❌ Error deleting product');
    }
  };

  const inputCls = 'w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#1A1A18] transition-colors bg-white';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="label-tag mb-1">Admin CRUD</p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A18]">Product studio.</h1>
          <p className="text-sm text-[#8C8070] mt-1">
            Manage the live <span className="font-mono">'lab12_dynamic_ecommerce.products'</span>{' '}
            collection from one clean dashboard.
          </p>
        </div>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-1.5 text-sm border border-[#E8E2DA] px-3 py-2 hover:border-[#1A1A18] transition-colors"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* DB stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 mb-8">
        {[
          { label: 'Database', val: 'lab12_dynamic_ecommerce' },
          { label: 'Collection', val: 'products' },
          { label: 'Records', val: loading ? '...' : products.length },
        ].map((s) => (
          <div key={s.label} className="border border-[#E8E2DA] px-4 py-3">
            <p className="label-tag mb-1">{s.label}</p>
            <p className="text-sm font-medium text-[#1A1A18] font-mono">{s.val}</p>
          </div>
        ))}
      </div>

      {msg && (
        <div className="mb-6 text-sm border border-[#E8E2DA] px-4 py-3 bg-[#F5F2ED]">{msg}</div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 border border-[#E8E2DA] p-6 bg-white">
          <h2 className="text-sm font-semibold text-[#1A1A18]">
            {editId ? 'Edit product' : 'Create product'}
          </h2>

          <div>
            <label className="label-tag block mb-1">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-tag block mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label-tag block mb-1">Price</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label-tag block mb-1">Old price</label>
              <input name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="label-tag block mb-1">Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="label-tag block mb-1">Rating</label>
              <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="label-tag block mb-1">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} required className={inputCls} />
          </div>

          <div>
            <label className="label-tag block mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={`${inputCls} resize-none`} />
          </div>

          <div>
            <label className="label-tag block mb-1">Gallery URLs (one per line)</label>
            <textarea name="gallery" value={form.gallery} onChange={handleChange} rows={2} className={`${inputCls} resize-none`} />
          </div>

          <div>
            <label className="label-tag block mb-2">Details</label>
            <div className="grid grid-cols-3 gap-2">
              {['material', 'dimensions', 'care'].map((k) => (
                <input
                  key={k}
                  name={`details.${k}`}
                  placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
                  value={form.details[k]}
                  onChange={handleChange}
                  className={inputCls}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="label-tag block mb-1">Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} className={inputCls} />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="accent-[#1A1A18]"
            />
            <span className="text-[#8C8070]">Featured product</span>
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#1A1A18] text-[#F5F2ED] py-2.5 text-sm font-medium hover:bg-[#5C5C3D] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : editId ? '✎ Update product' : '+ Create product'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => { setForm(EMPTY_FORM); setEditId(null); }}
                className="border border-[#E8E2DA] px-4 text-sm text-[#8C8070] hover:border-[#1A1A18]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Product list */}
        <div className="space-y-2">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-[#F5F2ED] animate-pulse" />
            ))
          ) : products.length === 0 ? (
            <p className="text-sm text-[#8C8070] p-4">No products yet. Create one!</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="flex items-center gap-3 border border-[#E8E2DA] p-3 bg-white">
                <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-[#F5F2ED]">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="label-tag">{p.category}</p>
                  <p className="text-sm font-medium text-[#1A1A18] truncate">{p.name}</p>
                  <p className="text-xs text-[#8C8070]">
                    ${p.price} · Stock {p.stock}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-[#8C8070] hover:text-[#1A1A18] transition-colors"
                    title="Edit"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-[#8C8070] hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
