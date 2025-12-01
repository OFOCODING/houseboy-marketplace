#  Houseboy Marketplace

A full-stack multi-service marketplace platform built with the MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features

###  Authentication & Authorization
- User registration and login with JWT
- Role-based access control (Customer, Vendor, Admin)
- Secure password hashing with bcrypt

###  Product Management
- Browse products by category (Hotel, Apartment, Farm, Dispatch, Ride)
- Search and filter functionality
- Product details with images and pricing

###  Shopping Cart
- Add/remove items from cart
- Update quantities
- Real-time cart calculations (subtotal, delivery fee, total)

###  Checkout & Orders
- Complete checkout process with delivery information
- Multiple payment methods (Cash on delivery, Card, Bank transfer)
- Order history and tracking
- Order status management

##  Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap** - CSS framework
- **Bootstrap Icons** - Icon library

##  Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/OFOCODING/houseboy-marketplace.git
cd houseboy-marketplace

# Install backend dependencies
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB connection string

# Seed sample products
node seedProducts.js

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

Frontend will run on `http://localhost:3000`

##  Project Structure
```
houseboy-marketplace/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── server.js        # Entry point
│   └── .env             # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── utils/       # Utilities (API, Context)
    │   └── App.js       # Main app component
    └── public/
```

##  Environment Variables

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/houseboy-marketplace
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Vendor only)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/item/:itemId` - Update cart item
- `DELETE /api/cart/item/:itemId` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/:id/cancel` - Cancel order

##  Default Test Accounts

### Vendor Account
- Email: `vendor@test.com`
- Password: `password123`

##  Future Features

- [ ] Payment integration (Paystack/Flutterwave)
- [ ] Vendor dashboard for product management
- [ ] Admin dashboard with analytics
- [ ] Product reviews and ratings
- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Real-time chat between buyers and vendors
- [ ] Advanced search and filters
- [ ] Order tracking with maps

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

This project is licensed under the MIT License.

##  Author

**OFOCODING**
- GitHub: [@OFOCODING](https://github.com/OFOCODING)

##  Acknowledgments

- Built as a learning project to master the MERN stack
- Inspired by modern e-commerce platforms

---

 Star this repo if you found it helpful!
