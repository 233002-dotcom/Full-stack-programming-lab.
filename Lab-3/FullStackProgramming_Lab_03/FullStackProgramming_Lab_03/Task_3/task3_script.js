// ================================================
// Task 3 - Asynchronous Data Loader
// script.js
// ================================================

// Toggle label update
const toggle = document.getElementById('successToggle');
const toggleLabel = document.getElementById('toggleLabel');

toggle.addEventListener('change', () => {
  toggleLabel.textContent = toggle.checked ? 'SUCCESS' : 'FAIL';
  toggleLabel.style.color = toggle.checked ? 'var(--success)' : 'var(--danger)';
});

// Initialize label on page load
toggleLabel.textContent = 'SUCCESS';
toggleLabel.style.color = 'var(--success)';

// --- User data to be resolved by Promise ---
const usersData = [
  { id: 1, name: 'Ali Hassan',   role: 'Developer', email: 'ali@example.com',    dept: 'Engineering' },
  { id: 2, name: 'Ayesha Malik', role: 'Designer',  email: 'ayesha@example.com', dept: 'UI/UX' },
  { id: 3, name: 'Bilal Ahmed',  role: 'Manager',   email: 'bilal@example.com',  dept: 'Operations' },
  { id: 4, name: 'Sara Khan',    role: 'Analyst',   email: 'sara@example.com',   dept: 'Data Science' },
  { id: 5, name: 'Usman Tariq',  role: 'DevOps',    email: 'usman@example.com',  dept: 'Infrastructure' },
];

// --- Promise-based fetchUsers function ---
function fetchUsers() {
  const success = document.getElementById('successToggle').checked; // boolean flag

  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (success) {
        resolve(usersData);                               // .then() will be called
      } else {
        reject('Server Error 500: Failed to fetch user data.'); // .catch() will be called
      }
    }, 3000); // 3 second delay
  });
}

// --- UI helper: show loading status ---
function showStatus(msg) {
  const area = document.getElementById('statusArea');
  document.getElementById('statusMsg').textContent = msg;
  area.classList.add('visible');

  // Reset and replay progress bar animation
  const fill = document.getElementById('progressFill');
  fill.style.animation = 'none';
  fill.offsetHeight; // trigger reflow
  fill.style.animation = 'progress 3s linear forwards';
}

// --- UI helper: hide loading status ---
function hideStatus() {
  document.getElementById('statusArea').classList.remove('visible');
}

// --- UI helper: display user cards ---
function displayUsers(users) {
  document.getElementById('resultsSection').style.display = 'block';
  document.getElementById('userCount').textContent = `${users.length} users`;

  const grid = document.getElementById('userGrid');
  grid.innerHTML = '';

  users.forEach((user, i) => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <div class="user-role">${user.role}</div>
      <div class="user-name">${user.name}</div>
      <div class="user-email">${user.email}</div>
      <span class="user-dept">${user.dept}</span>
    `;
    grid.appendChild(card);
    // Staggered reveal animation
    setTimeout(() => card.classList.add('shown'), i * 80);
  });
}

// --- UI helper: show error message ---
function showError(msg) {
  const box = document.getElementById('errorBox');
  box.textContent = `✗ Error: ${msg}`;
  box.classList.add('visible');
}

// --- Main trigger: called on button click ---
function startFetch() {
  const btn = document.getElementById('fetchBtn');
  btn.disabled = true;
  btn.textContent = 'Loading...';

  // Reset previous state
  document.getElementById('errorBox').classList.remove('visible');
  document.getElementById('resultsSection').style.display = 'none';

  showStatus('Connecting to server...');

  fetchUsers()
    .then(function(users) {       // Resolved: show users
      hideStatus();
      displayUsers(users);
    })
    .catch(function(error) {      // Rejected: show error
      hideStatus();
      showError(error);
    })
    .finally(function() {         // Always: re-enable button
      btn.disabled = false;
      btn.textContent = '⟳ Fetch Users';
    });
}
