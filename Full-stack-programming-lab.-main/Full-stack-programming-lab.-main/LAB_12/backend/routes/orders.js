const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders — place a new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({ message: 'Order placed successfully', order: saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders — get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
