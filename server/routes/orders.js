const express = require("express");
const { getOrderHistory, createNewOrder } = require("../models/orders");
const { getAll, updateProducts } = require("../models/products");
const router = express.Router();

// Retrieve user’s order history
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const orders = await getOrderHistory(userId);
    res.status(201).json(orders);
});

// Create new order
router.post("/", async (req, res) => {
    const { userId, items, shippingAddress } = req.body;
    if (!userId || !items || !shippingAddress) {
      return res.status(400).json({ message: "Please, provide all fields" });
    }
  
    const products = await getAll();
  
    let total = 0;
    const validatedItems = [];
  
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.productId}` });
      }
  
      const subtotal = product.price * item.quantity;
      total += subtotal;
      product.quantity -= item.quantity;
  
      validatedItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price 
      });
    }

    await updateProducts(products);
  
    const payload = {
      userId,
      items: validatedItems,
      shippingAddress,
      totalAmount: Number(total.toFixed(2))
    };
  
    try {
      await createNewOrder(payload);
      res.status(200).json({ message: "Order placed successfully", order: payload });
    } catch (err) {
      res.status(500).json({ message: "Failed to place order" });
    }
});
  
module.exports = router;