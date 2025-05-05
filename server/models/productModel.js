const mongoose = require('mongoose');
const category = require('./categoryModel');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  oPrice: {
    type: Number,
    required: true,
  },
  dPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  dealUrl: {
    type: String,
    required: true,
  },
  dealEndTime: {
    type: Date, // ISO timestamp when the deal ends
    required: false, // Only required if the deal has a countdown
  }
}, { timestamps: true });

const product = mongoose.model('Products', productSchema);

module.exports = product;
