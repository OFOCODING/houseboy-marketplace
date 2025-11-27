const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const products = await Product.find({});
        console.log(`Found ${products.length} products:`);
        products.forEach(p => console.log(`- ${p.name} (${p.category})`));
        process.exit();
    })
    .catch(err => {
        console.log('Error:', err);
        process.exit(1);
    });
