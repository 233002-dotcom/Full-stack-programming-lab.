const express = require('express');
const app = express();

app.get('/user/:name', (req, res) => {
  const name = req.params.name;
  const formatted = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  // unique color theme for each name
  const themes = {
    aman:    { color: '#e94560', emoji: '🚀', role: 'Full Stack Developer' },
    ali:     { color: '#00b4d8', emoji: '💻', role: 'Web Engineer'         },
    ahmed:   { color: '#06d6a0', emoji: '🎯', role: 'Data Scientist'       },
    fawad:   { color: '#f4a261', emoji: '🌟', role: 'Cyber Security Expert'},
    hamza:   { color: '#9b5de5', emoji: '⚡', role: 'AI & ML Engineer'     },
    eitsham: { color: '#ff6b9d', emoji: '🎨', role: 'UI/UX Designer'       },
  };

  const theme = themes[name.toLowerCase()] || {
    color: '#e94560',
    emoji: '👤',
    role: 'BSSE-VI Student'
  };

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hello ${formatted}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        /* ── CARD ── */
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 28px;
          padding: 50px 60px;
          text-align: center;
          backdrop-filter: blur(10px);
          max-width: 500px;
          width: 100%;
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1);   }
        }

        /* ── AVATAR ── */
        .avatar-ring {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 3px solid ${theme.color};
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 0 30px ${theme.color}55;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%   { box-shadow: 0 0 20px ${theme.color}55; }
          50%  { box-shadow: 0 0 40px ${theme.color}99; }
          100% { box-shadow: 0 0 20px ${theme.color}55; }
        }

        .avatar-inner {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${theme.color}44, ${theme.color}22);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
        }

        /* ── TEXT ── */
        .greeting {
          color: #a0aec0;
          font-size: 1rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        h1 {
          color: #ffffff;
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 6px;
        }

        h1 span {
          color: ${theme.color};
        }

        .role {
          color: #a0aec0;
          font-size: 0.95rem;
          margin-bottom: 28px;
        }

        .divider {
          width: 60px;
          height: 3px;
          background: ${theme.color};
          margin: 0 auto 28px;
          border-radius: 10px;
        }

        /* ── STATS ── */
        .stats {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 22px;
        }

        .stat h3 {
          color: ${theme.color};
          font-size: 1.3rem;
        }

        .stat p {
          color: #a0aec0;
          font-size: 0.78rem;
          margin-top: 4px;
        }

        /* ── URL TAG ── */
        .url-tag {
          display: inline-block;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 30px;
          padding: 8px 20px;
          color: #a0aec0;
          font-size: 0.82rem;
          margin-bottom: 28px;
          font-family: monospace;
        }

        .url-tag span {
          color: ${theme.color};
        }

        /* ── TRY OTHERS ── */
        .try-section p {
          color: #4a5568;
          font-size: 0.82rem;
          margin-bottom: 12px;
        }

        .try-links {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .try-links a {
          text-decoration: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #a0aec0;
          padding: 7px 18px;
          border-radius: 30px;
          font-size: 0.85rem;
          transition: all 0.3s;
        }

        .try-links a:hover {
          background: ${theme.color};
          color: white;
          border-color: ${theme.color};
        }

        /* ── FOOTER ── */
        footer {
          margin-top: 36px;
          color: #4a5568;
          font-size: 0.8rem;
        }
      </style>
    </head>
    <body>

      <div class="card">

        <div class="avatar-ring">
          <div class="avatar-inner">${theme.emoji}</div>
        </div>

        <p class="greeting">Welcome Back</p>
        <h1>Hello, <span>${formatted}!</span></h1>
        <p class="role">${theme.role} — Air University</p>

        <div class="divider"></div>

        <div class="stats">
          <div class="stat">
            <h3>BSSE</h3>
            <p>Program</p>
          </div>
          <div class="stat">
            <h3>VI</h3>
            <p>Semester</p>
          </div>
          <div class="stat">
            <h3>ISB</h3>
            <p>Campus</p>
          </div>
        </div>

        <div class="url-tag">
          /user/<span>${name}</span>
        </div>

        <div class="try-section">
          <p>Try other profiles:</p>
          <div class="try-links">
            <a href="/user/Aman">Aman</a>
            <a href="/user/Ali">Ali</a>
            <a href="/user/Ahmed">Ahmed</a>
            <a href="/user/Fawad">Fawad</a>
            <a href="/user/Hamza">Hamza</a>
            <a href="/user/Eitsham">Eitsham</a>
          </div>
        </div>

      </div>

      <footer>
        Lab 10 — Node.js + Express.js &nbsp;|&nbsp; Instructor: Mr. Sharif Hussain
      </footer>

    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running!");
  console.log("Try → http://localhost:3000/user/Aman");
  console.log("Try → http://localhost:3000/user/Ali");
  console.log("Try → http://localhost:3000/user/Ahmed");
  console.log("Try → http://localhost:3000/user/Fawad");
});