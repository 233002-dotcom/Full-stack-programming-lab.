const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lab 10 — Air University</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          padding: 50px 20px;
          color: white;
        }

        /* ── NAVBAR ── */
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 900px;
          margin: 0 auto 60px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50px;
          padding: 14px 28px;
          backdrop-filter: blur(10px);
        }

        .nav-logo {
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
        }

        .nav-logo span {
          color: #e94560;
        }

        .nav-links {
          display: flex;
          gap: 8px;
        }

        .nav-links a {
          text-decoration: none;
          color: #a0aec0;
          padding: 7px 18px;
          border-radius: 30px;
          font-size: 0.88rem;
          transition: all 0.3s;
        }

        .nav-links a:hover {
          background: #e94560;
          color: white;
        }

        /* ── HERO ── */
        .hero {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 70px;
          animation: fadeDown 0.6s ease;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0);     }
        }

        .hero .badge {
          display: inline-block;
          background: rgba(233,69,96,0.2);
          border: 1px solid #e94560;
          color: #e94560;
          padding: 6px 18px;
          border-radius: 30px;
          font-size: 0.82rem;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .hero h1 span {
          color: #e94560;
        }

        .hero p {
          color: #a0aec0;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .hero-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          text-decoration: none;
          background: #e94560;
          color: white;
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 0.95rem;
          font-weight: bold;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          background: #c73652;
          transform: translateY(-2px);
        }

        .btn-secondary {
          text-decoration: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          padding: 12px 28px;
          border-radius: 30px;
          font-size: 0.95rem;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }

        /* ── SECTION TITLE ── */
        .section {
          max-width: 900px;
          margin: 0 auto 50px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .section-title h2 {
          font-size: 1.7rem;
          margin-bottom: 8px;
        }

        .section-title p {
          color: #a0aec0;
          font-size: 0.9rem;
        }

        .section-title .line {
          width: 50px;
          height: 3px;
          background: #e94560;
          margin: 12px auto 0;
          border-radius: 10px;
        }

        /* ── TOPICS LIST ── */
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }

        .topic-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 18px 20px;
          transition: all 0.3s;
          animation: fadeUp 0.5s ease both;
        }

        .topic-item:hover {
          background: rgba(233,69,96,0.1);
          border-color: rgba(233,69,96,0.3);
          transform: translateX(4px);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .topic-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .topic-text h4 {
          color: white;
          font-size: 0.95rem;
          margin-bottom: 3px;
        }

        .topic-text p {
          color: #4a5568;
          font-size: 0.78rem;
        }

        /* ── TEAM ── */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .team-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 28px 20px;
          text-align: center;
          transition: all 0.3s;
          animation: fadeUp 0.5s ease both;
        }

        .team-card:hover {
          transform: translateY(-5px);
          border-color: rgba(233,69,96,0.4);
          box-shadow: 0 10px 30px rgba(233,69,96,0.15);
        }

        .team-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e94560, #0f3460);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          margin: 0 auto 14px;
        }

        .team-card h4 {
          color: white;
          font-size: 0.95rem;
          margin-bottom: 5px;
        }

        .team-card p {
          color: #a0aec0;
          font-size: 0.78rem;
        }

        .team-card .tag {
          display: inline-block;
          background: rgba(233,69,96,0.2);
          color: #e94560;
          border-radius: 20px;
          padding: 3px 12px;
          font-size: 0.72rem;
          margin-top: 8px;
        }

        /* ── INFO BOX ── */
        .info-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
        }

        .info-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .info-item .ii {
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .info-item h4 {
          color: white;
          font-size: 0.92rem;
          margin-bottom: 4px;
        }

        .info-item p {
          color: #a0aec0;
          font-size: 0.82rem;
          line-height: 1.5;
        }

        /* ── FOOTER ── */
        footer {
          text-align: center;
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: #4a5568;
          font-size: 0.82rem;
        }

        footer span {
          color: #e94560;
        }
      </style>
    </head>
    <body>

      <!-- NAVBAR -->
      <nav>
        <div class="nav-logo">Air<span>University</span></div>
        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/students">Students</a>
          <a href="/home">Pages</a>
          <a href="/user/Aman">Profile</a>
        </div>
      </nav>

      <!-- HERO SECTION -->
      <div class="hero">
        <div class="badge">🎓 BSSE-VI — Lab 10</div>
        <h1>Node.js + <span>Express.js</span> Full Stack Lab</h1>
        <p>
          Learn how to build powerful backend servers using Node.js and Express.js.
          This lab covers routing, REST APIs, dynamic pages, and serving HTML from the server.
        </p>
        <div class="hero-btns">
          <a class="btn-primary"  href="/students">View Students</a>
          <a class="btn-secondary" href="/home">Explore Pages</a>
        </div>
      </div>

      <!-- TOPICS COVERED -->
      <div class="section">
        <div class="section-title">
          <h2>📚 Topics Covered</h2>
          <p>Everything we learned in this lab</p>
          <div class="line"></div>
        </div>
        <div class="topics-grid">
          <div class="topic-item">
            <div class="topic-icon">⚙️</div>
            <div class="topic-text">
              <h4>Node.js Runtime</h4>
              <p>Server-side JavaScript environment</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">🌐</div>
            <div class="topic-text">
              <h4>Web Server</h4>
              <p>HTTP module to create servers</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">📦</div>
            <div class="topic-text">
              <h4>NPM & Modules</h4>
              <p>Installing and importing packages</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">🔄</div>
            <div class="topic-text">
              <h4>Async I/O</h4>
              <p>Non-blocking callbacks and events</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">📋</div>
            <div class="topic-text">
              <h4>JSON Data</h4>
              <p>Reading and sending structured data</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">🚀</div>
            <div class="topic-text">
              <h4>Express.js</h4>
              <p>Fast and minimal web framework</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">🔗</div>
            <div class="topic-text">
              <h4>REST API</h4>
              <p>GET, POST, PUT, DELETE methods</p>
            </div>
          </div>
          <div class="topic-item">
            <div class="topic-icon">🎯</div>
            <div class="topic-text">
              <h4>Dynamic Routes</h4>
              <p>URL parameters and routing</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TEAM SECTION -->
      <div class="section">
        <div class="section-title">
          <h2>👨‍💻 Our Team</h2>
          <p>Students who completed this lab</p>
          <div class="line"></div>
        </div>
        <div class="team-grid">
          <div class="team-card">
            <div class="team-avatar">🚀</div>
            <h4>Aman Mir</h4>
            <p>Full Stack Dev</p>
            <div class="tag">A+</div>
          </div>
          <div class="team-card">
            <div class="team-avatar">💻</div>
            <h4>Abdullah Fawad</h4>
            <p>Web Engineering</p>
            <div class="tag">A</div>
          </div>
          <div class="team-card">
            <div class="team-avatar">🎯</div>
            <h4>Eitsham Amjad</h4>
            <p>Data Science</p>
            <div class="tag">B+</div>
          </div>
          <div class="team-card">
            <div class="team-avatar">🛡️</div>
            <h4>Hamza Abbas</h4>
            <p>Cyber Security</p>
            <div class="tag">A</div>
          </div>
        </div>
      </div>

      <!-- LAB INFO -->
      <div class="section">
        <div class="section-title">
          <h2>📌 Lab Information</h2>
          <div class="line"></div>
        </div>
        <div class="info-box">
          <div class="info-item">
            <div class="ii">🏫</div>
            <div>
              <h4>University</h4>
              <p>Air University, PAF Complex, Islamabad</p>
            </div>
          </div>
          <div class="info-item">
            <div class="ii">👨‍🏫</div>
            <div>
              <h4>Instructor</h4>
              <p>Mr. Sharif Hussain</p>
            </div>
          </div>
          <div class="info-item">
            <div class="ii">📖</div>
            <div>
              <h4>Subject</h4>
              <p>Full Stack Programming — Lab 10</p>
            </div>
          </div>
          <div class="info-item">
            <div class="ii">🛠️</div>
            <div>
              <h4>Tools Used</h4>
              <p>Node.js, Express.js, VS Code</p>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <p>© 2024 Air University &nbsp;|&nbsp; BSSE-VI &nbsp;|&nbsp; Instructor: <span>Mr. Sharif Hussain</span></p>
      </footer>

    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});