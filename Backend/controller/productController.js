const Product = require('../models/product.model');
createProduct = async (req, res) => {
    try {
        const { name, price, seller, stock, description, quantity } = req.body;

        // Extract paths of uploaded images
        const imagePaths = req.files.map(file => file.path);

        // Create a new product with the image paths
        const newProduct = new Product({
            name,
            price,
            seller,
            stock,
            description,
            quantity,
            images: imagePaths, // Save the array of image paths in the database
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'Error saving product' });
    }
};
const fs = require('fs');
const path = require('path');

const getProducts = async (req, res) => {
    try {
        const allPets = await Product.find();
        
        // Map over allPets to transform image paths to Base64 strings
        const allProducts = await Promise.all(
            allPets.map(async (pet) => {
                // Convert each image path in `images` to a Base64 string
                const images = await Promise.all(
                    pet.images.map((imgPath) => {
                        const imagePath = path.join(__dirname, '..', imgPath); // Adjust the path as needed
                        return fs.promises.readFile(imagePath)
                            .then((data) => data.toString('base64'))
                            .catch((error) => {
                                console.error('Error reading image file:', error);
                                return null; // Handle missing files gracefully
                            });
                    })
                );
                
                // Filter out any null images (e.g., if a file read failed)
                return {
                    ...pet._doc,
                    images: images.filter((img) => img !== null),
                };
            })
        );

        res.status(201).json({ success: true, allPets: allProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = { createProduct, getProducts }
