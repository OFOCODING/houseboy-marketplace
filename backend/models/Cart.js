
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        price: { type: Number, required: true }
    }],
    subtotal: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 1500 },
    serviceCharge: { type: Number, default: 500 },
    total: { type: Number, default: 0 }
}, { timestamps: true });

cartSchema.methods.calculateTotals = function() {
    this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total = this.subtotal + this.deliveryFee + this.serviceCharge;
    return this;
};

module.exports = mongoose.model('Cart', cartSchema);
