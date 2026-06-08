const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x200',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
