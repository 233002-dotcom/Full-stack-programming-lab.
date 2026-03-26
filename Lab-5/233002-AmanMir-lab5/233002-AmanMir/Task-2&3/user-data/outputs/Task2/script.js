// ============================================
// Task 2 - Course List App
// Objective: Render lists using props
// ============================================

// ── Array of 5 courses (props for each CourseItem) ──
const courses = [
  {
    courseName: "Full Stack Programming",
    instructor: "Mr. Sharif Hussain",
    duration: "16 Weeks",
    type: "Offline",            // Bonus: type prop (Online / Offline)
  },
  {
    courseName: "Machine Learning Fundamentals",
    instructor: "Dr. Ayesha Noor",
    duration: "12 Weeks",
    type: "Online",
  },
  {
    courseName: "Database Systems",
    instructor: "Prof. Usman Ali",
    duration: "14 Weeks",
    type: "Offline",
  },
  {
    courseName: "Computer Networks",
    instructor: "Mr. Bilal Tariq",
    duration: "10 Weeks",
    type: "Online",
  },
  {
    courseName: "Software Engineering",
    instructor: "Dr. Fatima Zahra",
    duration: "18 Weeks",
    type: "Offline",
  },
];

// ── CourseItem component ──
// Props: courseName, instructor, duration, type
function CourseItem({ courseName, instructor, duration, type }, index) {
  const isOnline = type === "Online";

  const item = document.createElement("div");
  item.className = `course-item ${isOnline ? "online" : "offline"}`;
  item.style.animationDelay = `${index * 0.08}s`;   // stagger animation

  item.innerHTML = `
    <div class="course-icon">${isOnline ? "🌐" : "🏫"}</div>
    <div>
      <div class="course-name">${courseName}</div>
      <div class="course-meta">👤 ${instructor} &nbsp;·&nbsp; ⏱ ${duration}</div>
    </div>
    <div class="course-badge">${type}</div>
  `;

  return item;
}

// ── Render meta summary ──
const onlineCount  = courses.filter(function (c) { return c.type === "Online";  }).length;
const offlineCount = courses.filter(function (c) { return c.type === "Offline"; }).length;

document.getElementById("meta").textContent =
  `${courses.length} courses · ${onlineCount} online, ${offlineCount} offline`;

// ── Map over courses array and render each CourseItem ──
const list = document.getElementById("courseList");

courses.forEach(function (course, index) {
  const item = CourseItem(course, index);
  list.appendChild(item);
});
