const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { getProductById } = require("./products");

const pathname = path.resolve(__dirname, "..", "db", "carts.json");
async function getCarts() {
    const carts = await readFile(pathname, "utf-8");
    return carts ? JSON.parse(carts) : [];
}
async function createCart(userId) {
    const carts = await getCarts();
    const cart = {
        userId,
        items: [],
        totalAmount: 0,
        createdAt: new Date().toISOString()
    };
    carts.push(cart);
    await writeFile(pathname, JSON.stringify(carts, null, 2), "utf-8");
    return cart;
}
async function getCartById(userId) {
    const carts = await getCarts();
    let cart = carts.find(cart => cart.userId === userId);
    if (!cart) {
        cart = await createCart(userId);
    }
    return cart;
}
async function addItemToCart(userId, product) {
    const carts = await getCarts();
    let cart = carts.find(cart => cart.userId === userId);
    if (!cart) {
        cart = await createCart(userId);
    }

    const original = await getProductById(product.productId);
    const maxQuantity = original.quantity;

    const existingItem = cart.items.find(item => item.productId == product.productId);
    if (existingItem) {
        if (existingItem.quantity + product.quantity > maxQuantity) {
            return false;
        }
        existingItem.quantity += product.quantity;
    } else {
        if (product.quantity > maxQuantity) {
            return false;
        }
        cart.items.push(product);
    }
    
    cart.totalAmount = cart.items.reduce((sum, curr) => sum + curr.price * curr.quantity, 0).toFixed(2);
    
    await writeFile(pathname, JSON.stringify(carts, null, 2), "utf-8");
    return true;

}
async function updateItemQuantity(userId, productId, quantity) {
    const carts = await getCarts();
    const cart = carts.find(c => c.userId === userId);

    if (!cart)  { return { response: false, message: "Cart not found" } }
    const original = await getProductById(productId);
    const maxQuantity = original.quantity;
    if (quantity > maxQuantity) {
        return { response: false, message: "You've hit the maximum quantity of this book in stock"};
    }

    const product = cart.items.find(item => item.productId === productId);
    if (product) {
        product.quantity = quantity;
        await writeFile(pathname, JSON.stringify(carts, null, 2), "utf-8");
        return { response: true, message: "Updated successfully" };
    }

    return { response: false, message: "Book not found in the cart" };
}

async function deleteProduct(userId, productId) {
    const carts = await getCarts();
    let cart = carts.find(c => c.userId === userId);
    if (!cart) {
        return false;
    }

    cart.items = cart.items.filter(item => item.productId !== productId);

    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    await writeFile(pathname, JSON.stringify(carts, null, 2), "utf-8");
    return true;
}

async function clearCartById(userId) {
    const carts = await getCarts();
    const cart = carts.find(c => c.userId === userId);
    if (!cart) { return false; }
    cart.items.length = 0;
    await writeFile(pathname, JSON.stringify(carts, null, 2), "utf-8");
    return true;
}
module.exports = { getCartById, addItemToCart, updateItemQuantity, deleteProduct, clearCartById };