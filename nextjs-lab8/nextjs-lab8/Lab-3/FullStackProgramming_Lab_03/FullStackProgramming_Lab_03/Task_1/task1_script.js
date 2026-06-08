// ================================================
// Task 1 - Student Management System
// script.js
// ================================================

// ES6 Class Definition
class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses; // array
  }

  // Method to get summary using template literal
  getSummary() {
    return `${this.name} is in Semester ${this.semester} and is enrolled in ${this.courses.length} course(s).`;
  }
}

// Creating student objects using const & let
const students = [
  new Student('STU-001', 'Aman Mir',   4, ['JavaScript', 'HTML/CSS', 'Node.js']),
  new Student('STU-002', 'Ali Mir', 6, ['React', 'MongoDB', 'Express', 'REST APIs']),
  new Student('STU-003', 'Faiq Mir',  2, ['Python', 'Data Structures', 'OOP']),
];

// Stats bar
const statsBar = document.getElementById('statsBar');
statsBar.innerHTML = `
  <div class="stat-item">
    <div class="stat-num">${students.length}</div>
    <div class="stat-label">Students</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">${[...new Set(students.flatMap(s => s.courses))].length}</div>
    <div class="stat-label">Unique Courses</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">${Math.max(...students.map(s => s.semester))}</div>
    <div class="stat-label">Max Semester</div>
  </div>
`;

// Display students dynamically using innerHTML & template literals
const grid = document.getElementById('studentGrid');

students.forEach(student => {
  let courseTagsHTML = student.courses
    .map(c => `<span class="course-tag">${c}</span>`)
    .join('');

  grid.innerHTML += `
    <div class="card">
      <div class="card-id">ID: ${student.id}</div>
      <div class="card-name">${student.name}</div>
      <div class="card-semester">Semester ${student.semester}</div>
      <div class="label">Enrolled Courses</div>
      <div class="courses">${courseTagsHTML}</div>
    </div>
  `;
});
