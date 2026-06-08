import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: This demo simulates React Router using useState.
// In a real Create React App project, replace the routing logic with:
//   import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// ─────────────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: #0f0f13;
    color: #e8e8f0;
    min-height: 100vh;
  }

  /* ── Layout ── */
  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── Navbar ── */
  .navbar {
    background: #1a1a24;
    border-bottom: 1px solid #2e2e42;
    padding: 0 32px;
    display: flex;
    align-items: center;
    gap: 4px;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .nav-brand {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #38bdf8;
    margin-right: 24px;
    letter-spacing: 1px;
  }

  .nav-link {
    padding: 7px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    color: #888899;
    transition: all 0.15s;
    border: 1px solid transparent;
    background: none;
    font-family: 'Space Grotesk', sans-serif;
  }

  .nav-link:hover { color: #e8e8f0; background: #22222f; }

  .nav-link.active {
    color: #38bdf8;
    background: rgba(56,189,248,0.12);
    border-color: rgba(56,189,248,0.3);
  }

  .nav-cart {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(56,189,248,0.1);
    border: 1px solid rgba(56,189,248,0.25);
    color: #38bdf8;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s;
  }

  .nav-cart:hover { background: rgba(56,189,248,0.2); }

  /* ── Main Content ── */
  .main { flex: 1; max-width: 900px; margin: 0 auto; width: 100%; padding: 40px 24px; }

  /* ── Animation ── */
  .page { animation: fadeIn 0.25s ease; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Card ── */
  .card {
    background: #1a1a24;
    border: 1px solid #2e2e42;
    border-radius: 14px;
    padding: 28px;
    margin-bottom: 20px;
  }

  .card-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 14px;
  }

  /* ── Buttons ── */
  .btn {
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
  }

  .btn-primary { background: #38bdf8; color: #0f0f13; }
  .btn-primary:hover { background: #60cbff; transform: translateY(-1px); }

  .btn-ghost { background: #22222f; color: #e8e8f0; border: 1px solid #2e2e42; }
  .btn-ghost:hover { background: #2e2e42; }

  .btn-row { display: flex; gap: 12px; flex-wrap: wrap; }

  /* ── Input ── */
  .label {
    font-size: 11px;
    font-weight: 600;
    color: #888899;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
    display: block;
  }

  .input {
    width: 100%;
    padding: 11px 16px;
    background: #22222f;
    border: 1px solid #2e2e42;
    border-radius: 10px;
    color: #e8e8f0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 14px;
    resize: vertical;
  }

  .input:focus { border-color: #38bdf8; }
  .input::placeholder { color: #555566; }

  /* ── Home ── */
  .hero {
    text-align: center;
    padding: 48px 20px 36px;
  }

  .hero-emoji { font-size: 60px; margin-bottom: 16px; }

  .hero-title { font-size: 32px; font-weight: 700; margin-bottom: 12px; }

  .hero-sub {
    color: #888899;
    max-width: 440px;
    margin: 0 auto 28px;
    line-height: 1.7;
    font-size: 15px;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 8px;
  }

  .feature-card {
    background: #1a1a24;
    border: 1px solid #2e2e42;
    border-radius: 14px;
    padding: 22px;
    text-align: center;
  }

  .feature-icon { font-size: 28px; margin-bottom: 10px; }
  .feature-title { font-weight: 700; font-size: 14px; margin-bottom: 6px; }
  .feature-desc { font-size: 12px; color: #888899; line-height: 1.5; }

  /* ── About ── */
  .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  .stat-card {
    background: #22222f;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .stat-number {
    font-family: 'JetBrains Mono', monospace;
    font-size: 26px;
    font-weight: 700;
    color: #38bdf8;
  }

  .stat-label { font-size: 12px; color: #888899; margin-top: 4px; }

  /* ── Products ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }

  .product-card {
    background: #1a1a24;
    border: 1px solid #2e2e42;
    border-radius: 14px;
    padding: 22px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .product-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.3); }

  .product-emoji { font-size: 36px; margin-bottom: 12px; }
  .product-name { font-weight: 700; font-size: 14px; margin-bottom: 6px; }
  .product-desc { font-size: 12px; color: #888899; line-height: 1.5; margin-bottom: 14px; }

  .product-price {
    font-family: 'JetBrains Mono', monospace;
    color: #43e97b;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 14px;
  }

  .btn-add {
    width: 100%;
    padding: 9px;
    border-radius: 9px;
    border: none;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
    background: #38bdf8;
    color: #0f0f13;
  }

  .btn-add:hover { background: #60cbff; }
  .btn-add.added { background: rgba(67,233,123,0.15); color: #43e97b; border: 1px solid rgba(67,233,123,0.3); cursor: default; }

  /* ── Contact ── */
  .success-box {
    text-align: center;
    padding: 40px 20px;
    animation: fadeIn 0.3s ease;
  }

  .success-icon { font-size: 56px; margin-bottom: 14px; }
  .success-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  .success-sub { color: #888899; font-size: 14px; margin-bottom: 24px; }

  /* ── 404 ── */
  .not-found {
    text-align: center;
    padding: 80px 20px;
  }

  .error-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 120px;
    font-weight: 700;
    color: #ff6b6b;
    opacity: 0.2;
    line-height: 1;
  }

  .error-msg { font-size: 22px; font-weight: 600; color: #888899; margin-top: 12px; }
  .error-sub { color: #555566; font-size: 14px; margin-top: 8px; margin-bottom: 28px; }
`;

// ── Products Data ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", desc: "Premium noise-cancelling audio, 30hr battery life.", price: "$89.99",  emoji: "🎧" },
  { id: 2, name: "Mechanical Keyboard", desc: "TKL layout with RGB backlighting & tactile switches.", price: "$129.99", emoji: "⌨️" },
  { id: 3, name: "4K Webcam",           desc: "Crystal clear video with built-in ring light.",       price: "$74.99",  emoji: "📷" },
  { id: 4, name: "USB-C Hub 7-in-1",   desc: "HDMI, USB 3.0, SD card, and PD charging.",            price: "$39.99",  emoji: "🔌" },
  { id: 5, name: "LED Desk Lamp",       desc: "Adjustable brightness with wireless charging base.",  price: "$54.99",  emoji: "💡" },
  { id: 6, name: "Laptop Stand",        desc: "Ergonomic aluminium stand, foldable & portable.",     price: "$34.99",  emoji: "💻" },
];

// ── Page Components ───────────────────────────────────────────────────────────
function Home({ navigate }) {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero-emoji">🚀</div>
        <div className="hero-title">Welcome to TechStore</div>
        <div className="hero-sub">
          Your one-stop destination for cutting-edge tech accessories.
          Quality products, unbeatable prices, lightning-fast delivery.
        </div>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <button className="btn btn-primary" onClick={() => navigate("products")}>Browse Products →</button>
          <button className="btn btn-ghost" onClick={() => navigate("about")}>Learn More</button>
        </div>
      </div>
      <div className="features">
        {[
          ["⚡", "Fast Delivery",  "Same-day dispatch on all orders"],
          ["🔒", "Secure Payment", "256-bit encrypted checkout"],
          ["🔄", "Easy Returns",   "30-day no-hassle return policy"],
        ].map(([icon, title, desc]) => (
          <div key={title} className="feature-card">
            <div className="feature-icon">{icon}</div>
            <div className="feature-title">{title}</div>
            <div className="feature-desc">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <div className="card">
        <div className="card-title">🏢 About TechStore</div>
        <p style={{ color: "#888899", lineHeight: 1.8, fontSize: 14 }}>
          Founded in 2020, TechStore has grown from a small startup to a leading tech accessories
          retailer serving customers worldwide. We're passionate about bringing innovative,
          high-quality technology products that enhance your daily life and productivity.
        </p>
      </div>
      <div className="card">
        <div className="card-title">🎯 Our Mission</div>
        <p style={{ color: "#888899", lineHeight: 1.8, fontSize: 14 }}>
          To democratize access to premium technology by offering competitive prices without
          compromising on quality. We believe everyone deserves the best tools to do their best work,
          regardless of their budget.
        </p>
      </div>
      <div className="stat-grid">
        {[["50K+", "Happy Customers"], ["500+", "Products Listed"], ["4.9★", "Average Rating"]].map(([n, l]) => (
          <div key={l} className="stat-card">
            <div className="stat-number">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const ready  = form.name && form.email && form.message;

  const handleSubmit = () => {
    if (ready) setSent(true);
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-title">✉️ Get In Touch</div>
        {sent ? (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <div className="success-title">Message Sent!</div>
            <div className="success-sub">We'll get back to you within 24 hours.</div>
            <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
              Send Another
            </button>
          </div>
        ) : (
          <>
            <label className="label">Name</label>
            <input className="input" placeholder="Your full name" value={form.name} onChange={update("name")} />

            <label className="label">Email</label>
            <input className="input" type="email" placeholder="your@email.com" value={form.email} onChange={update("email")} />

            <label className="label">Message</label>
            <textarea className="input" rows={4} placeholder="How can we help you?" value={form.message} onChange={update("message")} />

            <button className="btn btn-primary" onClick={handleSubmit} style={{ opacity: ready ? 1 : 0.45 }}>
              Send Message →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Products({ cart, setCart }) {
  const addToCart = (id) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 18 }}>All Products</div>
        <div style={{ fontSize: 13, color: "#888899" }}>{cart.length} item(s) in cart</div>
      </div>
      <div className="products-grid">
        {PRODUCTS.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-emoji">{p.emoji}</div>
            <div className="product-name">{p.name}</div>
            <div className="product-desc">{p.desc}</div>
            <div className="product-price">{p.price}</div>
            <button
              className={`btn-add${cart.includes(p.id) ? " added" : ""}`}
              onClick={() => addToCart(p.id)}
              disabled={cart.includes(p.id)}
            >
              {cart.includes(p.id) ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotFound({ navigate }) {
  return (
    <div className="page not-found">
      <div className="error-code">404</div>
      <div className="error-msg">Page Not Found</div>
      <div className="error-sub">The route you navigated to doesn't exist.</div>
      <button className="btn btn-primary" onClick={() => navigate("home")}>← Go Home</button>
    </div>
  );
}

// ── Root App (Router) ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "contact",  label: "Contact Us" },
  { id: "products", label: "Products" },
  { id: "404",      label: "404 Page" },
];

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const renderPage = () => {
    switch (page) {
      case "home":     return <Home navigate={setPage} />;
      case "about":    return <About />;
      case "contact":  return <Contact />;
      case "products": return <Products cart={cart} setCart={setCart} />;
      default:         return <NotFound navigate={setPage} />;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* ── Navbar (simulates <Link> from react-router-dom) ── */}
        <nav className="navbar">
          <span className="nav-brand">⚛ TechStore</span>
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-link${page === id ? " active" : ""}`}
              onClick={() => setPage(id)}
            >
              {label}
            </button>
          ))}
          <div className="nav-cart" onClick={() => setPage("products")}>
            🛒 Cart ({cart.length})
          </div>
        </nav>

        {/* ── Routes ── */}
        <main className="main">
          {renderPage()}
        </main>
      </div>
    </>
  );
}

export default App;
