const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'Bank'],
      default: 'Cash',
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 12 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
