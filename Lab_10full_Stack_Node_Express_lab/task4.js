const express = require('express');
const app = express();

const students = [
  { id: 1, name: "Aman Mir",       age: 20, grade: "A+", course: "Full Stack Dev",  emoji: "🚀" },
  { id: 2, name: "Abdullah Fawad", age: 21, grade: "A",  course: "Web Engineering", emoji: "💻" },
  { id: 3, name: "Eitsham Amjad",  age: 20, grade: "B+", course: "Data Science",    emoji: "🎯" },
  { id: 4, name: "Hamza Abbas",    age: 22, grade: "A",  course: "Cyber Security",  emoji: "🛡️" },
  { id: 5, name: "Ali Khan",       age: 21, grade: "A+", course: "AI & ML",         emoji: "🤖" },
  { id: 6, name: "Ahmed Raza",     age: 21, grade: "B+", course: "Web Engineering", emoji: "⚡" },
];

app.get('/students', (req, res) => {

  const cards = students.map((s, i) => `
    <div class="card" style="animation-delay: ${i * 0.1}s">
      <div class="card-top">
        <div class="avatar">${s.emoji}</div>
        <div class="id-badge">#${String(s.id).padStart(2, '0')}</div>
      </div>
      <div class="card-body">
        <h3>${s.name}</h3>
        <p class="course">📚 ${s.course}</p>
        <div class="details">
          <div class="detail">
            <span class="detail-label">Age</span>
            <span class="detail-value">🎂 ${s.age}</span>
          </div>
          <div class="detail">
            <span class="detail-label">Grade</span>
            <span class="detail-value grade">${s.grade}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student List — Air University</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          padding: 50px 20px;
        }

        /* ── HEADER ── */
        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .header .logo {
          font-size: 3.5rem;
          margin-bottom: 14px;
        }

        .header h1 {
          color: #ffffff;
          font-size: 2.4rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .header p {
          color: #a0aec0;
          font-size: 1rem;
        }

        .header .divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #e94560, #0f3460);
          margin: 16px auto;
          border-radius: 10px;
        }

        /* ── STATS BAR ── */
        .stats-bar {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 16px 30px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .stat-item h2 {
          color: #e94560;
          font-size: 1.8rem;
        }

        .stat-item p {
          color: #a0aec0;
          font-size: 0.82rem;
          margin-top: 4px;
        }

        /* ── GRID ── */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── CARD ── */
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          animation: fadeUp 0.5s ease both;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(233,69,96,0.2);
          border-color: rgba(233,69,96,0.4);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* ── CARD TOP ── */
        .card-top {
          background: linear-gradient(135deg, rgba(233,69,96,0.3), rgba(15,52,96,0.5));
          padding: 28px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .avatar {
          width: 65px;
          height: 65px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          border: 2px solid rgba(255,255,255,0.2);
        }

        .id-badge {
          background: rgba(233,69,96,0.3);
          border: 1px solid #e94560;
          color: #e94560;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: bold;
          font-family: monospace;
        }

        /* ── CARD BODY ── */
        .card-body {
          padding: 20px;
        }

        .card-body h3 {
          color: #ffffff;
          font-size: 1.15rem;
          margin-bottom: 6px;
        }

        .course {
          color: #a0aec0;
          font-size: 0.85rem;
          margin-bottom: 16px;
        }

        .details {
          display: flex;
          gap: 10px;
        }

        .detail {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .detail-label {
          display: block;
          color: #4a5568;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .detail-value {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .grade {
          color: #68d391 !important;
        }

        /* ── FOOTER ── */
        footer {
          text-align: center;
          margin-top: 50px;
          color: #4a5568;
          font-size: 0.82rem;
        }

        footer span {
          color: #e94560;
        }
      </style>
    </head>
    <body>

      <div class="header">
        <div class="logo">🎓</div>
        <h1>Student List</h1>
        <p>Air University — BSSE-VI | Full Stack Programming Lab</p>
        <div class="divider"></div>
      </div>

      <div class="stats-bar">
        <div class="stat-item">
          <h2>${students.length}</h2>
          <p>Total Students</p>
        </div>
        <div class="stat-item">
          <h2>${students.filter(s => s.grade === 'A+').length}</h2>
          <p>A+ Students</p>
        </div>
        <div class="stat-item">
          <h2>VI</h2>
          <p>Semester</p>
        </div>
      </div>

      <div class="grid">
        ${cards}
      </div>

      <footer>
        <p>Lab 10 — Node.js + Express.js &nbsp;|&nbsp; Instructor: <span>Mr. Sharif Hussain</span></p>
      </footer>

    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/students");
});