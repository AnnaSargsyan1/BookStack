const express = require("express");
const router = express.Router();
const { getAll, getProductById, getProductByCategory, getCategories } = require("../models/products.js");

// Get all products
router.get("/", async (req, res) => {
    const books = await getAll();
    res.status(200).json(books); 
});

// Get all categories
router.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.status(200).json(categories);
});

// Get products by category
router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    const books = await getProductByCategory(category);
    if (!books.length) {
        return res.status(404).json({ message: "No such category" });
    }
    res.status(200).json(books);
});

// Get product by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;         
    const book = await getProductById(Number(id));   
    if (!book) {
        return res.status(404).json({ message: "Product with that ID not found" });
    }
    res.status(200).json(book);
});

module.exports = router;
