const express = require('express');
const app = express();

function renderPage(icon, title, message, active) {
  const navLinks = [
    { path: '/home',    label: 'Home',    icon: '🏠' },
    { path: '/about',   label: 'About',   icon: '👤' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  const navHTML = navLinks.map(link => `
    <a href="${link.path}" class="${link.label === active ? 'active' : ''}">
      ${link.icon} ${link.label}
    </a>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }

        /* ── NAVBAR ── */
        nav {
          display: flex;
          gap: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 24px;
          border-radius: 50px;
          margin-bottom: 60px;
          backdrop-filter: blur(10px);
        }

        nav a {
          text-decoration: none;
          color: #a0aec0;
          padding: 8px 22px;
          border-radius: 30px;
          font-size: 0.95rem;
          transition: all 0.3s;
        }

        nav a:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        nav a.active {
          background: #e94560;
          color: white;
          font-weight: bold;
        }

        /* ── CARD ── */
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 50px 60px;
          text-align: center;
          backdrop-filter: blur(10px);
          max-width: 600px;
          width: 100%;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        h1 {
          color: #ffffff;
          font-size: 2rem;
          margin-bottom: 16px;
        }

        .message {
          color: #a0aec0;
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .divider {
          width: 60px;
          height: 3px;
          background: #e94560;
          margin: 20px auto;
          border-radius: 10px;
        }

        /* ── TEAM SECTION (about page) ── */
        .team {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 24px;
        }

        .member {
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 20px;
          color: white;
          font-size: 0.9rem;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .member span {
          display: block;
          font-size: 1.6rem;
          margin-bottom: 6px;
        }

        /* ── CONTACT CARDS ── */
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 24px;
          text-align: left;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 14px 20px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .contact-item .ci {
          font-size: 1.6rem;
        }

        .contact-item p {
          color: #a0aec0;
          font-size: 0.88rem;
        }

        .contact-item h4 {
          color: white;
          font-size: 0.95rem;
        }

        /* ── FOOTER ── */
        footer {
          margin-top: 40px;
          color: #4a5568;
          font-size: 0.82rem;
          text-align: center;
        }
      </style>
    </head>
    <body>

      <nav>${navHTML}</nav>

      ${message}

      <footer>
        Lab 10 — Node.js + Express.js &nbsp;|&nbsp; Instructor: Mr. Sharif Hussain
      </footer>

    </body>
    </html>
  `;
}

// ── HOME ROUTE ──
app.get('/home', (req, res) => {
  const content = `
    <div class="card">
      <div class="icon">🏠</div>
      <h1>Welcome Home!</h1>
      <div class="divider"></div>
      <p class="message">
        Hello <strong style="color:white">Aman, Ali, Ahmed & Fawad!</strong><br>
        Welcome to our Full Stack Programming Lab.<br>
        Built with Node.js + Express.js at Air University.
      </p>
    </div>
  `;
  res.send(renderPage('🏠', 'Home', content, 'Home'));
});

// ── ABOUT ROUTE ──
app.get('/about', (req, res) => {
  const members = [
    { name: 'Aman Mir',       emoji: '👨‍💻' },
    { name: 'Ali Khan',       emoji: '👨‍🎓' },
    { name: 'Ahmed Raza',     emoji: '👨‍💻' },
    { name: 'Abdullah Fawad', emoji: '👨‍🎓' },
  ];

  const teamHTML = members.map(m => `
    <div class="member">
      <span>${m.emoji}</span>
      ${m.name}
    </div>
  `).join('');

  const content = `
    <div class="card">
      <div class="icon">👤</div>
      <h1>About Us</h1>
      <div class="divider"></div>
      <p class="message">
        We are <strong style="color:white">BSSE-VI</strong> students at Air University,
        Islamabad. Currently learning Full Stack Development with
        Node.js, Express.js, and React.
      </p>
      <div class="team">${teamHTML}</div>
    </div>
  `;
  res.send(renderPage('👤', 'About', content, 'About'));
});

// ── CONTACT ROUTE ──
app.get('/contact', (req, res) => {
  const content = `
    <div class="card">
      <div class="icon">📞</div>
      <h1>Contact Us</h1>
      <div class="divider"></div>
      <p class="message">We would love to hear from you!</p>

      <div class="contact-grid">
        <div class="contact-item">
          <div class="ci">📧</div>
          <div>
            <h4>Email</h4>
            <p>info@airuniversity.edu.pk</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="ci">📍</div>
          <div>
            <h4>Address</h4>
            <p>Air University, PAF Complex, Islamabad</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="ci">📱</div>
          <div>
            <h4>Phone</h4>
            <p>+92-51-9262557</p>
          </div>
        </div>
        <div class="contact-item">
          <div class="ci">👨‍🏫</div>
          <div>
            <h4>Instructor</h4>
            <p>Mr. Sharif Hussain — sharifali.aulecturer@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  `;
  res.send(renderPage('📞', 'Contact', content, 'Contact'));
});

app.listen(3000, () => {
  console.log("Server running!");
  console.log("Home    → http://localhost:3000/home");
  console.log("About   → http://localhost:3000/about");
  console.log("Contact → http://localhost:3000/contact");
});