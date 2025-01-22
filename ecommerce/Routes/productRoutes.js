const express = require('express');
const router = express.Router();
const { createProducts, getProducts, getProduct, updateProduct, deletingProduct } = require('../Controllers/productController');

router.post('/api/product/create', createProducts);  // <-- Line 10 (where error occurs)
router.get('/api/all', getProducts);
router.get('/api/:productId', getProduct);
router.put('/api/:productId', updateProduct);
router.delete('/api/:productId', deletingProduct);

module.exports = router;
