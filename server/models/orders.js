const { randomUUID } = require("crypto");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const { clearCartById } = require("./cart");

const pathname = path.resolve(__dirname, "..", "db", "orders.json");

async function getOrderHistories() {
    const histories = await readFile(pathname, "utf-8");
    if (!histories) {
        return [];
    }
    return JSON.parse(histories);
}
async function getOrderHistory(userId) {
    const histories = await getOrderHistories();
    const orders = histories.filter(history => history.userId === userId);
    return orders;
}

async function createNewOrder(payload) {
    const histories = await getOrderHistories();
    const id = randomUUID();
    histories.push({
        id,
        ...payload,
        "status": "pending",
        "orderDate": new Date().toISOString(),
    });
    await writeFile(pathname, JSON.stringify(histories, null, 2), "utf-8");
    await clearCartById(payload.userId);
}
module.exports = { getOrderHistory, createNewOrder };