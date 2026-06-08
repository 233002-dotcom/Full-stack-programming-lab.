// ============================================
// Task 3 - Dynamic Greeting App
// Objective: Use props with conditional rendering
// ============================================

// ── Greeting data ──
// Props: name, timeOfDay, bgColor (Bonus)
const greetings = [
  { name: "Ali",      timeOfDay: "morning",   bgColor: "#fff9e6" },
  { name: "Sara",     timeOfDay: "afternoon", bgColor: "#e6f4ff" },
  { name: "Musharaf", timeOfDay: "evening",   bgColor: "#f0e6ff" },
  { name: "Fatima",   timeOfDay: "night",     bgColor: "#1a1a2e" },
];

// ── Conditional config per timeOfDay ──
// This drives the conditional rendering based on the timeOfDay prop
const config = {
  morning: {
    emoji:     "☀️",
    message:   "Good Morning",
    sub:       "Hope your day is bright!",
    textColor: "#92400e",
    accent:    "#f59e0b",
    nameColor: "#111111",
    subColor:  "#6b7280",
  },
  afternoon: {
    emoji:     "🌤️",
    message:   "Good Afternoon",
    sub:       "Hope you're having a great day!",
    textColor: "#1e40af",
    accent:    "#3b82f6",
    nameColor: "#111111",
    subColor:  "#6b7280",
  },
  evening: {
    emoji:     "🌇",
    message:   "Good Evening",
    sub:       "Time to wind down a bit!",
    textColor: "#5b21b6",
    accent:    "#8b5cf6",
    nameColor: "#111111",
    subColor:  "#6b7280",
  },
  night: {
    emoji:     "🌙",
    message:   "Good Night",
    sub:       "Rest well and dream big!",
    textColor: "#e2e8f0",
    accent:    "#818cf8",
    nameColor: "#ffffff",
    subColor:  "rgba(255, 255, 255, 0.55)",
  },
};

// ── Greeting component ──
// Props: name, timeOfDay, bgColor
function Greeting({ name, timeOfDay, bgColor }, index) {
  // Conditional rendering: pick config based on timeOfDay prop
  const cfg = config[timeOfDay] || config.morning;

  const card = document.createElement("div");
  card.className = "greeting-card";
  card.style.background = bgColor;                      // Bonus: bgColor prop
  card.style.animationDelay = `${index * 0.1}s`;        // stagger animation

  card.innerHTML = `
    <span class="card-bg-emoji">${cfg.emoji}</span>
    <span class="card-emoji">${cfg.emoji}</span>
    <div class="card-time"     style="color: ${cfg.accent};"    >${timeOfDay}</div>
    <div class="card-greeting" style="color: ${cfg.textColor};" >${cfg.message},</div>
    <div class="card-name"     style="color: ${cfg.nameColor};" >${name}!</div>
    <div class="card-divider"  style="background: ${cfg.accent};"></div>
    <div class="card-sub"      style="color: ${cfg.subColor};"  >${cfg.sub}</div>
  `;

  return card;
}

// ── Render at least 3 Greeting components with different props ──
const container = document.getElementById("greetingsContainer");

greetings.forEach(function (g, index) {
  const card = Greeting(g, index);
  container.appendChild(card);
});
