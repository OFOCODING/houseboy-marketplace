const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for products seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const seedProducts = async () => {
  try {
    const vendor = await User.findOne();
    if (!vendor) {
      console.log('No users found. Seed users first!');
      process.exit(1);
    }

    const products = [
      {
        name: 'Hotel Cleaning Service',
        price: 5000,
        category: 'hotel',
        description: 'Professional hotel cleaning service',
        vendor: vendor._id,
        vendorName: vendor.name,
        stock: 10
      },
      {
        name: 'Apartment Moving Service',
        price: 3000,
        category: 'apartment',
        description: 'Safe and fast apartment moving service',
        vendor: vendor._id,
        vendorName: vendor.name,
        stock: 5
      },
      {
        name: 'Farm Produce Delivery',
        price: 2000,
        category: 'farm',
        description: 'Fresh farm produce delivered to your door',
        vendor: vendor._id,
        vendorName: vendor.name,
        stock: 20
      }
    ];

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

seedProducts();
