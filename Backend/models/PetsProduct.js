const mongoose = require('mongoose');

const petsProductSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: true }, // Array of image URLs
}, { timestamps: true });

const PetsProduct = mongoose.model('PetsProduct', petsProductSchema);
module.exports = PetsProduct;
