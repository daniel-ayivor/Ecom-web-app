const Product = require("../Models/productModel");

// Create Product
const createProducts = async (req, res) => {
    const { image,title, price, rating, category, text, size } = req.body;
    try {
        const product = await Product.create({image, title, price, rating, category, text, size });
        res.status(201).json({ product, message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Error creating product" });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ products, message: "Products retrieved successfully" });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ error: "Error retrieving products" });
    }
};

// Get Single Product
const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product, message: "Product retrieved successfully" });
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).json({ error: "Error retrieving product" });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.update(req.body);
        res.status(200).json({ product, message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Error updating product" });
    }
};

// Delete Product
const deletingProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Error deleting product" });
    }
};

// Rate Product
const rateProduct = async (req, res) => {
    const { rating } = req.body;
    try {
        const [updated] = await Product.update(
            { rating },
            { where: { id: req.params.id } }
        );
        if (updated) {
            res.status(200).send('Rating submitted successfully!');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error("Error updating rating:", error);
        res.status(500).json({ error: "Error updating rating" });
    }
};

module.exports = {
    deletingProduct,
    createProducts,
    getProduct,
    getProducts,
    rateProduct,
    updateProduct,
};
