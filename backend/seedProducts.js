const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error:', err));

const seedProducts = async () => {
    try {
        // Find or create a vendor
        let vendor = await User.findOne({ email: 'vendor@test.com' });
        
        if (!vendor) {
            vendor = await User.create({
                fullName: 'Test Vendor',
                email: 'vendor@test.com',
                password: 'password123',
                phone: '08012345678',
                role: 'vendor'
            });
            console.log('✅ Vendor created');
        }

        // Sample products
        const products = [
            {
                name: 'Fresh Tomatoes (1kg)',
                description: 'Fresh organic tomatoes from our farm',
                price: 1500,
                category: 'farm',
                image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
                stock: 50,
                vendor: vendor._id,
                vendorName: vendor.fullName
            },
            {
                name: 'Premium Hotel Room',
                description: 'Luxury hotel room with city view',
                price: 25000,
                category: 'hotel',
                image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
                stock: 10,
                vendor: vendor._id,
                vendorName: vendor.fullName
            },
            {
                name: 'Ride to Airport',
                description: 'Comfortable ride service to the airport',
                price: 5000,
                category: 'ride',
                image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
                stock: 100,
                vendor: vendor._id,
                vendorName: vendor.fullName
            },
            {
                name: 'Rice (50kg Bag)',
                description: 'Premium quality rice from local farmers',
                price: 38000,
                category: 'farm',
                image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
                stock: 30,
                vendor: vendor._id,
                vendorName: vendor.fullName
            },
            {
                name: 'Short-let Apartment',
                description: 'Furnished 2-bedroom apartment for short stays',
                price: 15000,
                category: 'apartment',
                image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
                stock: 5,
                vendor: vendor._id,
                vendorName: vendor.fullName
            },
            {
                name: 'Dispatch Service',
                description: 'Fast and reliable package delivery',
                price: 2000,
                category: 'dispatch',
                image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400',
                stock: 1000,
                vendor: vendor._id,
                vendorName: vendor.fullName
            }
        ];

        // Clear existing products
        await Product.deleteMany({});
        
        // Insert products
        await Product.insertMany(products);
        
        console.log('✅ Products seeded successfully!');
        console.log(`📦 ${products.length} products added`);
        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
