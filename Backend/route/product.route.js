const express = require('express');
const {createProduct,getProducts} = require('../controller/productController');
const multer = require('multer');

const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.array('image', 10), createProduct);
router.get("/getproduct", getProducts)
module.exports = router;
