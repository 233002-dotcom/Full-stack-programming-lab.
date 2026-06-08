// ================================================
// Task 2 - Online Shopping Cart
// script.js
// ================================================

// --- Products data ---
const products = [
  { id: 1, name: 'Wireless Headphones', price: 4999 },
  { id: 2, name: 'Mechanical Keyboard',  price: 7500 },
  { id: 3, name: 'USB-C Hub',            price: 2800 },
  { id: 4, name: 'Laptop Stand',         price: 1999 },
  { id: 5, name: 'Webcam HD',            price: 5500 },
];

// Cart stored as array
let cart = [];

// --- Rest Operator: addToCart receives multiple items ---
function addToCart(...items) {
  // Spread: clone current cart then add new items
  cart = [...cart, ...items];
  renderCart();
}

// Render products list
const productList = document.getElementById('productList');
products.forEach(prod => {
  const div = document.createElement('div');
  div.className = 'product-item';
  div.id = `prod-${prod.id}`;
  div.innerHTML = `
    <div>
      <div class="prod-name">${prod.name}</div>
      <div class="prod-price">Rs. ${prod.price.toLocaleString()}</div>
    </div>
    <button class="add-btn" onclick="handleAdd(${prod.id})">+ Add</button>
  `;
  productList.appendChild(div);
});

function handleAdd(id) {
  const prod = products.find(p => p.id === id);
  addToCart(prod); // using rest operator inside addToCart
  const row = document.getElementById(`prod-${id}`);
  row.classList.add('in-cart');
  row.querySelector('.add-btn').textContent = '✓ Added';
  row.querySelector('.add-btn').classList.add('added');
}

// Render cart summary
function renderCart() {
  const summary = document.getElementById('cartSummary');
  if (cart.length === 0) {
    summary.innerHTML = '<p style="color:var(--muted);font-size:0.85rem;">Cart is empty.</p>';
    return;
  }

  // Destructuring: extract first product and remaining
  const [firstItem, ...remaining] = cart;

  const remainingHTML = remaining.length
    ? remaining.map(i => `<li><span>${i.name}</span><span>Rs. ${i.price.toLocaleString()}</span></li>`).join('')
    : '<li style="color:var(--muted)">None</li>';

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  summary.innerHTML = `
    <div class="info-block">
      <div class="info-label">Total Items</div>
      <div class="total-count">${cart.length}</div>
    </div>

    <div class="info-block">
      <div class="info-label">First Item (Destructured)</div>
      <div class="tag">const [firstItem, ...remaining] = cart</div>
      <div class="first-item-name">${firstItem.name}</div>
      <div style="font-size:0.8rem;color:var(--muted)">Rs. ${firstItem.price.toLocaleString()}</div>
    </div>

    <div class="info-block">
      <div class="info-label">Remaining Items</div>
      <ul class="remaining-list">${remainingHTML}</ul>
    </div>

    <div class="info-block">
      <div class="info-label">Cart Total</div>
      <div style="font-size:1.3rem;font-weight:700;color:var(--accent)">Rs. ${total.toLocaleString()}</div>
    </div>

    <button class="reset-btn" onclick="resetCart()">Clear Cart</button>
  `;
}

function resetCart() {
  cart = [];
  document.querySelectorAll('.product-item').forEach(row => {
    row.classList.remove('in-cart');
    row.querySelector('.add-btn').textContent = '+ Add';
    row.querySelector('.add-btn').classList.remove('added');
  });
  renderCart();
}
