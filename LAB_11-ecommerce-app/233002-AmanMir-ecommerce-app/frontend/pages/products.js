import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  // ── Fetch products from backend API ──────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError('Failed to load products.');
        }
      } catch (err) {
        setError('Cannot connect to server. Make sure backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ── Filter products ───────────────────────────────────────────────
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // ── Seed data handler ─────────────────────────────────────────────
  const handleSeed = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products/seed', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        alert('✅ Sample products seeded!');
        window.location.reload();
      }
    } catch {
      alert('❌ Could not seed. Is the backend running?');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Our Products</h2>
          <button
            onClick={handleSeed}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition"
          >
            🌱 Seed Sample Products
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="text-center py-20 text-gray-500 text-lg">⏳ Loading products...</div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg font-semibold">{error}</p>
            <p className="text-gray-400 text-sm mt-2">
              Run <code className="bg-gray-100 px-2 py-1 rounded">node server.js</code> in the backend folder.
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found. Try seeding the database using the button above.
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
