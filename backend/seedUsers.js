const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for users seeding'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

const seedUsers = async () => {
  try {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@houseboy.com',
        password: 'admin123',
        isAdmin: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        isAdmin: false
      }
    ];

    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error.message);
    process.exit(1);
  }
};

seedUsers();
