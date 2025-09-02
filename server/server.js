require("dotenv").config();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = "http://localhost:3000"; 
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({origin: CLIENT_URL}));
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/products", require("./routes/products.js"));
app.use("/api/cart", require("./routes/cart.js"));
app.use("/api/orders", require("./routes/orders.js"));

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));