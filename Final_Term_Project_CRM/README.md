# CRM Pro — Full Stack CRM System

A complete Customer Relationship Management system built with the MERN stack + Next.js.

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Vanilla CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| PDF | jsPDF (client-side) |
| Notifications | React Hot Toast |
| Icons | Lucide React |

## 📁 Project Structure

```
FSP-Final/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   └── invoiceController.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Customer.js
│   │   └── Invoice.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── customers.js
│   │   └── invoices.js
│   ├── seed.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── app/
    │   ├── layout.jsx
    │   ├── page.jsx
    │   ├── globals.css
    │   ├── login/page.jsx
    │   ├── register/page.jsx
    │   ├── dashboard/page.jsx
    │   ├── customers/
    │   │   ├── page.jsx
    │   │   ├── new/page.jsx
    │   │   ├── [id]/page.jsx
    │   │   └── [id]/edit/page.jsx
    │   └── invoices/
    │       ├── page.jsx
    │       ├── new/page.jsx
    │       └── [id]/page.jsx
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Navbar.jsx
    │   ├── DashboardLayout.jsx
    │   ├── StatCard.jsx
    │   ├── CustomerTable.jsx
    │   ├── SearchFilter.jsx
    │   ├── Modal.jsx
    │   └── Chatbot.jsx
    ├── context/AuthContext.jsx
    ├── lib/axios.js
    ├── middleware.js
    └── .env.local
```

## ⚙️ Setup & Running

### Prerequisites
- Node.js 18+
- MongoDB running locally (default: `mongodb://localhost:27017`)

### 1. Backend Setup

```bash
cd backend
npm install
npm run seed       # Seeds 15 customers + admin user
npm run dev        # Starts on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:3000
```

### 3. Open in Browser

Navigate to: **http://localhost:3000**

**Demo login credentials:**
- Email: `admin@crm.com`
- Password: `admin123`

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Authentication | JWT login/register with bcrypt password hashing |
| 👥 Customer CRUD | Add, view, edit, delete with validation |
| 🔍 Search & Filter | Real-time search + status filter (Lead/Active/Inactive) |
| 🧾 Invoice Generation | Create invoices with line items, tax, PDF download |
| 🔔 Notifications | Toast alerts for all actions |
| 🤖 Chatbot | Rule-based assistant with navigation commands |
| 📊 Dashboard | Stats cards, recent customers & invoices |
| 📱 Responsive | Works on mobile and desktop |

## 🤖 Chatbot Commands

Type these in the chat widget:
- `help` — Show available commands
- `list customers` — Go to customers page
- `add customer` — Open add customer form
- `invoices` — Open invoices page
- `dashboard` — Go to main dashboard
- `logout` — Sign out

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user
- `GET  /api/auth/me` — Get current user

### Customers
- `GET    /api/customers` — List all (supports `?search=` & `?status=`)
- `POST   /api/customers` — Create customer
- `GET    /api/customers/:id` — Get single customer
- `PUT    /api/customers/:id` — Update customer
- `DELETE /api/customers/:id` — Delete customer
- `GET    /api/customers/stats` — Get customer statistics

### Invoices
- `GET    /api/invoices` — List all invoices
- `POST   /api/invoices` — Create invoice
- `GET    /api/invoices/:id` — Get invoice
- `PUT    /api/invoices/:id` — Update invoice status
- `DELETE /api/invoices/:id` — Delete invoice
- `GET    /api/invoices/stats` — Get invoice statistics
