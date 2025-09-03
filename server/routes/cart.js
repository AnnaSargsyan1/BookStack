const express = require("express");
const { getCartById, clearCartById, addItemToCart, updateItemQuantity, deleteProduct } = require("../models/cart");
const { getProductById, getAll } = require("../models/products");
const router = express.Router();

// Retrieve user’s cart
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID required" });
    }

    try {
        const cart = await getCartById(userId);
        const { books: products } = await getAll();

        const detailedItems = cart.items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                productId: item.productId,
                name: product?.name || "Unknown",
                imageUrl: product?.imageUrl || "",
                category: product?.category || "",
                price: item.price,
                quantity: item.quantity,
            };  
        });

        const totalAmount = detailedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

        res.json({
            userId: cart.userId,
            items: detailedItems,
            totalAmount,
            createdAt: cart.createdAt,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cart" });
    } 
});

// Add item to cart
router.post("/:userId", async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: "User ID required" });
    }
    const { productId, quantity } = req.body;
    const product = await getProductById(productId);
    if (!productId || !quantity || !product) {
        return res.status(400).json({ message: "Missing product ID or quantity"});
    }
    const result = await addItemToCart(userId, {productId, quantity, price: product.price });
    if (result) {
        res.status(201).json({ message: `${product.name} added to cart successfully`});
    }
    res.status(400).json({ message: "You've hit the maximum quantity of this book in stock"})
});

// Update item quantity
router.put("/:userId/update", async (req, res) => {
    const userId = req.params.userId;

    if (!req.body.productId || !req.body.quantity) {
        return res.status(400).json({ message: "Missing product ID or quantity"});
    }

    const result = await updateItemQuantity(userId, Number(req.body.productId), Number(req.body.quantity));
    if (result.response) {
        return res.status(201).json({ message: result.message });
    }
    return res.status(400).json({ message: result.message })
});

//Remove item from cart
router.delete("/:userId/remove/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;
        await deleteProduct(userId, Number(productId));
        res.status(200).json({ message: "Book removed from cart successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to remove book from cart" });
    }
});

// Clear entire cart
router.delete("/:userId/clear", async (req, res) => {
    const result = await clearCartById(req.params.userId);
    if (!result) {
        return res.status(404).json({ message: "Cart with that ID don't exist "});
    }
    res.status(200).json({ message: "Cart cleared successfully "});
})

module.exports = router;