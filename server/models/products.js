const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const productPath = path.resolve(__dirname, "..", "db", "products.json");
const categoryPath = path.resolve(__dirname, "..", "db", "categories.json");

async function getAll({ category, search, page = 1, limit = 0 } = {}) {
    let books = await readFile(productPath, "utf-8");
    if (!books) { return { books: [], total: 0 }; }
    books = JSON.parse(books);
    const regex = search ? new RegExp(search, "i") : null;
    
    books = books.filter(book => {
        let res = true;
        if (category && category !== "All") {
            res = book.category === category;
        }
        if (regex) {
            res = res && regex.test(book.name)
        }
        return res; 
    });
    
    const total = books.length;
    if (limit > 0) {
        const maxPage = Math.ceil(total / limit);
        const safePage = Math.min(maxPage, page);
        const start = (safePage - 1) * limit;
        const end = start + limit;
        books = books.slice(start, end);
    }
    
    return { books, total };
}
async function getProductById(id) {
    const { books } = await getAll();
    return books.find(book => book.id === id);
}
async function updateProducts(products) {
    await writeFile(productPath, JSON.stringify(products, null, 2), "utf-8");
}
async function getCategories() {
    const categories = await readFile(categoryPath, "utf-8");
    return categories ? JSON.parse(categories) : [];
}
module.exports = { getAll, getProductById, updateProducts, getCategories };
