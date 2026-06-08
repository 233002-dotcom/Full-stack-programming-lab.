import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-blue-600 text-white py-20 px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Welcome to ShopEase 🛍️</h2>
          <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
            Discover the best products at unbeatable prices. Built with the MERN stack.
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 hover:text-blue-800 transition"
          >
            Shop Now →
          </Link>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-500">Get your orders delivered at lightning speed across Pakistan.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
            <p className="text-gray-500">Your transactions are protected with 256-bit SSL encryption.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-500">Our support team is always ready to help you anytime.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
