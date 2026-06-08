export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
          {product.category}
        </span>
        <h3 className="mt-1 text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">PKR {product.price.toLocaleString()}</span>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
