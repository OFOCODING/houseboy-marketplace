const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productName: String,
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        vendorName: String,
        quantity: Number,
        price: Number,
        total: Number,
        image: String
    }],
    
    deliveryInfo: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: String,
        deliveryNote: String
    },
    
    payment: {
        method: { 
            type: String, 
            enum: ['card', 'bank', 'wallet', 'cash'], 
            required: true 
        },
        status: { 
            type: String, 
            enum: ['pending', 'completed', 'failed'], 
            default: 'pending' 
        },
        transactionId: String,
        paidAt: Date
    },
    
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 1500 },
    serviceCharge: { type: Number, default: 500 },
    total: { type: Number, required: true },
    
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    
    statusHistory: [{
        status: String,
        note: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

// Generate order number before saving
orderSchema.pre('save', async function(next) {
    if (!this.orderNumber) {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.orderNumber = `HM${timestamp}${random}`;
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
