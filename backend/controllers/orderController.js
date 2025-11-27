const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create order from cart
exports.createOrder = async (req, res) => {
    try {
        const { deliveryInfo, paymentMethod } = req.body;
        
        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Prepare order items
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            productName: item.product.name,
            vendor: item.product.vendor,
            vendorName: item.product.vendorName,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
            image: item.product.image
        }));

        // Create order
        const order = await Order.create({
            customer: req.user.id,
            customerName: req.user.fullName,
            customerEmail: req.user.email,
            customerPhone: req.user.phone,
            items: orderItems,
            deliveryInfo,
            payment: {
                method: paymentMethod,
                status: paymentMethod === 'cash' ? 'pending' : 'pending'
            },
            subtotal: cart.subtotal,
            deliveryFee: cart.deliveryFee,
            serviceCharge: cart.serviceCharge,
            total: cart.total,
            statusHistory: [{ status: 'pending', note: 'Order placed' }]
        });

        // Clear cart after order
        await Cart.findByIdAndUpdate(cart._id, { items: [], subtotal: 0, total: 0 });

        res.status(201).json({ 
            success: true, 
            message: 'Order placed successfully', 
            data: order 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user orders
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if user owns this order or is admin
        if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status (admin/vendor only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, note } = req.body;
        
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        order.statusHistory.push({ status, note: note || `Status changed to ${status}` });
        await order.save();

        res.json({ success: true, message: 'Order status updated', data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.customer.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({ 
                success: false, 
                message: 'Only pending orders can be cancelled' 
            });
        }

        order.status = 'cancelled';
        order.statusHistory.push({ 
            status: 'cancelled', 
            note: 'Cancelled by customer' 
        });
        await order.save();

        res.json({ success: true, message: 'Order cancelled', data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
