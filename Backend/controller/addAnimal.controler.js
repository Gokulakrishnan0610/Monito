const animalModel = require('../models/addAnimal.model');

// Add a new product
const addProduct = async (req, res) => {
  
    try {
        const images = req.files.map(file => file.path);
        const productData = { ...req.body, images };
        console.log(productData)
        const product = new animalModel(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const fs = require('fs');
const path = require('path');

const getAnimals = async (req, res) => {
    try {
        const allPets = await animalModel.find();
        
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










module.exports ={addProduct,getAnimals}
