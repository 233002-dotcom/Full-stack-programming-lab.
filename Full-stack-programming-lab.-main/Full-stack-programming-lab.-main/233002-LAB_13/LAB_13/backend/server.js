const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lab12_dynamic_ecommerce')
  .then(() => console.log('✅ MongoDB connected → lab12_dynamic_ecommerce'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Rustik Studio API — Lab 12',
    status: 'running',
    database: 'lab12_dynamic_ecommerce',
    collection: 'products',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
