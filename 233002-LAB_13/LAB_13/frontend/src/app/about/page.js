export default function AboutPage() {
  const features = [
    {
      icon: '✦',
      title: 'Rustik theme',
      desc: 'Plant goods, ceramic forms, wood textures, and restrained color.',
    },
    {
      icon: '✓',
      title: 'Clean stack',
      desc: 'Next.js frontend, Express API, Mongoose validation, and MongoDB.',
    },
    {
      icon: '◎',
      title: 'Submission ready',
      desc: 'Documented commands, screenshots, CRUD flow, and responsive pages.',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="label-tag mb-4">About the store</p>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A18] leading-tight mb-6">
            Rustik Studio keeps plant retail calm, useful, and beautiful.
          </h1>
          <p className="text-sm text-[#8C8070] leading-relaxed max-w-sm">
            The project combines a polished ecommerce interface with a dynamic MERN backend.
            Products, images, inventory, and featured states come from MongoDB instead of
            hard-coded page content.
          </p>
        </div>
        <div className="h-80 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&auto=format&fit=crop"
            alt="About Rustik Studio"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-t border-[#E8E2DA] bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border border-[#E8E2DA] p-6 bg-white">
                <span className="text-2xl mb-4 block text-[#8C8070]">{f.icon}</span>
                <h3 className="text-sm font-semibold text-[#1A1A18] mb-2">{f.title}</h3>
                <p className="text-xs text-[#8C8070] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-sm text-[#8C8070] leading-relaxed max-w-2xl">
          The application integrates a sophisticated e-commerce interface with a robust MERN
          backend. All product details, including images, inventory, and featured statuses, are
          dynamically sourced from a MongoDB database, eliminating the need for hard-coded content
          within the pages.
        </p>
        <p className="text-xs text-[#8C8070] mt-4">
          Spring 2026 | Department of Creative Technologies - FCAI
        </p>
      </section>
    </div>
  );
}
