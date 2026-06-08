# Lab 8 - Full Stack Programming (B)
**Student:** Aman Mir — 233002  
**Course:** Full Stack Programming (B)  
**Semester:** Spring 2026 | Air University, Islamabad  

---

## Project Structure

```
nextjs-lab8/
├── app/
│   ├── layout.js               # Root layout — Header + Footer applied globally
│   ├── page.js                 # Dashboard (landing page)
│   ├── globals.css
│   ├── data/
│   │   └── products.js         # Shared product data
│   ├── task1/
│   │   ├── home/page.js        # Task 1 - Home page
│   │   ├── about/page.js       # Task 1 - About page
│   │   └── contact/page.js     # Task 1 - Contact page
│   └── task2/
│       └── products/
│           ├── page.js         # Task 2 - ProductList page
│           └── [id]/page.js    # Task 2 - Dynamic product detail
├── components/
│   ├── Header.js               # Global header with nav links
│   ├── Footer.js               # Global footer via layout.js
│   └── ProductList.js          # Reusable ProductList component
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## Setup & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

---

## Task Checklist

### Task 1: Multi-Page Next.js App ✅
- [x] 3 pages: Home (`/task1/home`), About (`/task1/about`), Contact (`/task1/contact`)
- [x] Header component with navigation links on all pages
- [x] Footer component globally via `layout.js`
- [x] Styled with Tailwind CSS

### Task 2: Dynamic Components ✅
- [x] ProductList component displaying 3 products (title, description, price)
- [x] Dynamic product detail page via `/task2/products/[id]`
- [x] Footer on all pages (via layout.js)
- [x] Navigation links between Home, ProductList, and individual Product pages

---

## Products

| Product | Category | Price |
|---|---|---|
| Aether Desk Lamp | Workspace | $149 |
| Atlas Weekender Bag | Travel | $199 |
| Solstice Wireless Speaker | Audio | $239 |
