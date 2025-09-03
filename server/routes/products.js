const express = require("express");
const router = express.Router();
const { getAll, getProductById, getCategories } = require("../models/products.js");

// Get all products
router.get("/", async (req, res) => {
    try {

        const {category, search, page, limit} = req.query;
        
        const query = {
            ...(category && { category }),
            ...(search && { search }),
            page: Number(page) > 0 ? Number(page) : 1,
            limit: Number(limit) > 0 ? Number(limit) : 12
        };
        
        const { books, total } = await getAll(query);
        
        res.status(200).json({ books , total}); 
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
});

// Get all categories
router.get("/categories", async (req, res) => {
    const categories = await getCategories();
    res.status(200).json(categories);
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
