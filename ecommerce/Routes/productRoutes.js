const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname); // Use original file name
    }
});

// Initialize multer with custom storage
const upload = multer({ storage });

// Import your controllers
const { 
    createProducts, 
    getProducts, 
    getProduct, 
    updateProduct, 
    deletingProduct 
} = require('../Controllers/productController');

// Routes
router.post('/api/product/create', upload.single('image'), createProducts);
router.get('/api/all', getProducts);
router.get('/api/:productId', getProduct);
router.put('/api/:productId', updateProduct);
router.delete('/api/:productId', deletingProduct);

module.exports = router;
