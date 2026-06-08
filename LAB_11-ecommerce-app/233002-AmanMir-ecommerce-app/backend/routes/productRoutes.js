const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// ─────────────────────────────────────────────
// GET /api/products  → Fetch all products
// ─────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// GET /api/products/:id  → Fetch single product
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// POST /api/products  → Create a new product
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/products/:id  → Delete a product
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// POST /api/products/seed  → Seed sample data
// ─────────────────────────────────────────────
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany(); // clear existing
    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        description: 'High quality noise-cancelling wireless headphones',
        price: 4999,
        category: 'Electronics',
        stock: 50,
        image: 'https://via.placeholder.com/300x200?text=Headphones',
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight and comfortable running shoes for all terrains',
        price: 2999,
        category: 'Sports',
        stock: 30,
        image: 'https://via.placeholder.com/300x200?text=Shoes',
      },
      {
        name: 'JavaScript Book',
        description: 'Complete guide to modern JavaScript and ES6+',
        price: 899,
        category: 'Books',
        stock: 100,
        image: 'https://via.placeholder.com/300x200?text=JS+Book',
      },
      {
        name: 'Laptop Stand',
        description: 'Adjustable aluminium laptop stand for ergonomic working',
        price: 1499,
        category: 'Home',
        stock: 20,
        image: 'https://via.placeholder.com/300x200?text=Laptop+Stand',
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Premium 100% cotton t-shirt, available in multiple colors',
        price: 599,
        category: 'Clothing',
        stock: 200,
        image: 'https://via.placeholder.com/300x200?text=T-Shirt',
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking and notifications',
        price: 8999,
        category: 'Electronics',
        stock: 15,
        image: 'https://via.placeholder.com/300x200?text=Smart+Watch',
      },
    ];
    const inserted = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      message: `${inserted.length} products seeded successfully`,
      data: inserted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
