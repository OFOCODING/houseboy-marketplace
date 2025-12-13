const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['hotel', 'apartment', 'farm', 'dispatch', 'ride', 'general'],
    required: true 
  },
  image: { type: String, default: 'https://via.placeholder.com/300' },
  stock: { type: Number, default: 0 },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendorName: String,
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
