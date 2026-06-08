export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">🛒 ShopEase</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
          <a href="/products" className="hover:text-yellow-300 transition">Products</a>
        </nav>
      </div>
    </header>
  );
}
