const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors()); // Allow cross-origin requests from Next.js frontend
app.use(express.json()); // Parse incoming JSON request bodies

// ─────────────────────────────────────────────
// Connect to MongoDB
// ─────────────────────────────────────────────
connectDB();

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🛒 Ecommerce API is running!' });
});

app.use('/api/products', productRoutes);

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
