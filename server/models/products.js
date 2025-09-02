const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const productPath = path.resolve(__dirname, "..", "db", "products.json");
const categoryPath = path.resolve(__dirname, "..", "db", "categories.json");

async function getAll() {
    const books = await readFile(productPath, "utf-8");
    if (!books) {
        return [];
    }
    return JSON.parse(books);
}
async function getProductById(id) {
    const books = await getAll();
    return books.find(book => book.id === id);
}
async function getProductByCategory(category) {
    const books = await getAll();
    if (category === "All") {
        return books;
    }
    return books.filter(book => book.category === category);
}
async function updateProducts(products) {
    await writeFile(productPath, JSON.stringify(products, null, 2), "utf-8");
}
async function getCategories() {
    const categories = await readFile(categoryPath, "utf-8");
    return categories ? JSON.parse(categories) : [];
}
module.exports = { getAll, getProductById, getProductByCategory, updateProducts, getCategories };