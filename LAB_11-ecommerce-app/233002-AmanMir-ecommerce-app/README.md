# 🛒 ShopEase — Ecommerce App (MERN Stack)
> Lab 11 — Full Stack Programming | BSSE-VI | Instructor: Mr. Sharif Hussain

## Tech Stack
| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 14 + Tailwind CSS           |
| Backend  | Node.js + Express.js                |
| Database | MongoDB + Mongoose                  |

---

## Project Structure
```
ecommerce-app/
├── backend/
│   ├── config/
│   │   └── db.js              ← MongoDB connection
│   ├── models/
│   │   └── Product.js         ← Product schema/model
│   ├── routes/
│   │   └── productRoutes.js   ← API routes (CRUD)
│   ├── server.js              ← Express server entry point
│   └── package.json
│
└── frontend/
    ├── components/
    │   ├── Header.js           ← Site header/navbar
    │   ├── Footer.js           ← Site footer
    │   └── ProductCard.js      ← Product display card
    ├── pages/
    │   ├── _app.js             ← Next.js app wrapper
    │   ├── index.js            ← Home page
    │   └── products.js         ← Products listing page
    ├── styles/
    │   └── globals.css         ← Global styles + Tailwind
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Setup Instructions

### Step 1 — Prerequisites
- Install [Node.js LTS](https://nodejs.org)
- Install [MongoDB Community](https://www.mongodb.com/try/download/community)
- Start MongoDB: Run `mongod` in terminal

### Step 2 — Backend Setup
```bash
cd backend
npm install
node server.js
```
Backend runs at: http://localhost:5000

### Step 3 — Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

---

## API Endpoints

| Method | URL                        | Description             |
|--------|----------------------------|-------------------------|
| GET    | /                          | API health check        |
| GET    | /api/products              | Get all products        |
| GET    | /api/products/:id          | Get single product      |
| POST   | /api/products              | Create a product        |
| DELETE | /api/products/:id          | Delete a product        |
| POST   | /api/products/seed         | Seed sample data        |

---

## Testing the API

1. Open browser → http://localhost:5000 → should show `{"message":"🛒 Ecommerce API is running!"}`
2. Go to frontend → http://localhost:3000/products
3. Click **"Seed Sample Products"** button to populate MongoDB
4. Products will appear on the page!
