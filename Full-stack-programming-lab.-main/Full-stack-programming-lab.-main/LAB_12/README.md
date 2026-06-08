# Rustik Studio — Lab 12 | Full Stack Programming (B)
**Student:** Aman Mir — 233002  
**Course:** Full Stack Programming (B)  
**Semester:** Spring 2026  
**University:** Air University, Islamabad

---

## Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | Next.js 14, Tailwind CSS          |
| Backend   | Node.js, Express.js               |
| Database  | MongoDB (lab12_dynamic_ecommerce) |
| ODM       | Mongoose                          |
| HTTP      | Axios                             |

---

## Project Structure

```
rustik-studio/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js    # CRUD endpoints
│   │   └── orders.js      # Order placement
│   ├── server.js
│   ├── seed.js            # Seeds 8 products
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.js          # Home
    │   │   ├── shop/
    │   │   │   ├── page.js      # Product catalog
    │   │   │   └── [id]/page.js # Product detail
    │   │   ├── cart/page.js
    │   │   ├── checkout/page.js
    │   │   ├── about/page.js
    │   │   ├── contact/page.js
    │   │   ├── admin/page.js    # CRUD dashboard
    │   │   ├── layout.js
    │   │   └── globals.css
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Footer.js
    │   │   └── ProductCard.js
    │   ├── context/
    │   │   └── CartContext.js   # Global cart state
    │   └── lib/
    │       └── api.js           # Axios API helpers
    ├── .env.local.example
    └── package.json
```

---

## Setup & Run

### Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017

---

### 1. Backend

```bash
cd backend
npm install

# Copy and configure env
cp .env.example .env
# Edit .env: MONGO_URI=mongodb://localhost:27017/lab12_dynamic_ecommerce

# Seed the database with 8 products
npm run seed

# Start the server
npm run dev
# → Running at http://localhost:5000
```

---

### 2. Frontend

```bash
cd frontend
npm install

# Copy env
cp .env.local.example .env.local

# Start dev server
npm run dev
# → Running at http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint                  | Description            |
|--------|---------------------------|------------------------|
| GET    | /api/products             | Get all products       |
| GET    | /api/products?category=X  | Filter by category     |
| GET    | /api/products?search=X    | Search by name         |
| GET    | /api/products?featured=true | Get featured only    |
| GET    | /api/products/:id         | Get single product     |
| POST   | /api/products             | Create product         |
| PUT    | /api/products/:id         | Update product         |
| DELETE | /api/products/:id         | Delete product         |
| POST   | /api/orders               | Place an order         |
| GET    | /api/orders               | Get all orders         |

---

## Pages

| Route        | Description                              |
|-------------|------------------------------------------|
| /            | Home — hero, featured products, stack info |
| /shop        | Product catalog with search + filters    |
| /shop/[id]   | Product detail with gallery + add to cart|
| /cart        | Cart with quantity controls + summary    |
| /checkout    | Order form + payment method + MongoDB save |
| /about       | About the store                          |
| /contact     | Contact form                             |
| /admin       | Full CRUD dashboard for products         |

---

## Database

- **DB:** `lab12_dynamic_ecommerce`  
- **Collection:** `products`  
- **Seed command:** `npm run seed` (run from `/backend`)

---

Spring 2026 | Department of Creative Technologies - FCAI
