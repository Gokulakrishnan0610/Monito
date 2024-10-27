const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product'); // Product model
const PetsProduct = require('./models/PetsProduct');
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








app.post('/PetsProduct', async (req, res) => {
    try {
        const newProduct = new PetsProduct(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error adding pet product', error });
    }
});

// Get all pet products
app.get('/PetsProduct', async (req, res) => {
    try {
        const products = await PetsProduct.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Update a pet product
app.put('/PetsProduct/:id', async (req, res) => {
    try {
        const updatedProduct = await PetsProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
});

// Delete a pet product
app.delete('/PetsProduct/:id', async (req, res) => {
    try {
        await PetsProduct.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
