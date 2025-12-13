const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Houseboy Marketplace API',
    status: 'Running',
    version: '1.0.0'
  });
});

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Products routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Cart routes 
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

// Oder routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
