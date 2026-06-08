export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ShopEase. Built with Next.js, Node.js &amp; MongoDB.
        </p>
      </div>
    </footer>
  );
}
