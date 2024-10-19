const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    SKU: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    // image: { type: String, required: true }, 
    image: [], 
    gender: { type: String, required: true },
    age: { type: String },
    size: { type: String, required: true },
    color: { type: String, required: true },
    vaccinated: { type: Boolean, default: false },
    dewormed: { type: Boolean, default: false },
    phoneNumber: { type: String },
    location: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    additionalInfo: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
