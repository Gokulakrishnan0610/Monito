const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product'); // Product model
const dbConnection=require("./config/db")
const path = require('path');
const app = express();
const PORT = 5000;
const productRoutes = require('./route/product.route');
const addAnimalRoute = require('./route/addAnimal.route');

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images
dbConnection()



app.use('/api/products',productRoutes );
app.use('/api/animal',addAnimalRoute );






// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
