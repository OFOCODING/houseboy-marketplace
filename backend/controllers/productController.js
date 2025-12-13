const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isActive: true };
        
        if (category) query.category = category;
        if (search) query.name = { $regex: search, $options: 'i' };
        
        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json({ success: true, count: products.length, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create product (vendors only)
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            vendor: req.user.id,
            vendorName: req.user.fullName
        });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        
        // Check if user is the vendor
        if (product.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        
        if (product.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
        
        await product.deleteOne();
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
