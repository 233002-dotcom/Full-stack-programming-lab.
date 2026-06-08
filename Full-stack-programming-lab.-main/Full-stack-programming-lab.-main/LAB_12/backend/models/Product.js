const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Planters', 'Care', 'Decor', 'Furniture', 'Hanging'],
      default: 'Decor',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    oldPrice: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    details: {
      type: {
        material: String,
        dimensions: String,
        care: String,
      },
      default: {},
    },
    tags: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 10,
      min: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
