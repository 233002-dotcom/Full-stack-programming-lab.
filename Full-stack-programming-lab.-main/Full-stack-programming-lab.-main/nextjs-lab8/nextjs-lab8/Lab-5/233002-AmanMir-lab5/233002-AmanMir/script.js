// ============================================
// Task 1 - Student Information Card App
// Objective: Practice creating components and props
// ============================================

// ── Student data (3 students with props) ──
const students = [
  {
    name: "Ali Hassan",
    rollNo: "BSSE-2021-001",
    department: "Software Engineering",
    university: "Air University",
    color: "#1a1a2e",          // Bonus: color prop for card background
  },
  {
    name: "Musharaf Khan",
    rollNo: "BSSE-2021-042",
    department: "AI & Machine Learning",
    university: "Air University",
    color: "#16213e",
  },
  {
    name: "Sara Malik",
    rollNo: "BSSE-2021-078",
    department: "Cybersecurity",
    university: "Air University",
    color: "#0f3460",
  },
];

// ── StudentCard component ──
// Props: name, rollNo, department, university, color
function StudentCard({ name, rollNo, department, university, color }) {
  const card = document.createElement("div");
  card.className = "student-card";
  card.style.background = color;   // Bonus: apply color prop

  card.innerHTML = `
    <div class="card-orb"></div>
    <div class="card-avatar">${name[0]}</div>
    <div class="card-roll">${rollNo}</div>
    <div class="card-name">${name}</div>
    <div class="card-divider"></div>
    <div class="card-dept">📚 ${department}</div>
    <div class="card-uni">🏛 ${university}</div>
  `;

  return card;
}

// ── Render all 3 StudentCard components ──
const container = document.getElementById("cardsContainer");

students.forEach(function (student) {
  const card = StudentCard(student);
  container.appendChild(card);
});
