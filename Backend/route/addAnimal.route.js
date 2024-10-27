const express = require('express');
const multer = require('multer');
const  {addProduct,getAnimals}= require('../controller/addAnimal.controler');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Add a new product
router.post('/add', upload.array('image',10), addProduct);
router.get('/getanimals',getAnimals);

module.exports = router;
