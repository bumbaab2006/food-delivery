const express = require("express");
const connectToDB = require("./db");
const app = express();

// Middleware
app.use(express.json());

// MongoDB холболт
connectToDB();

// Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/products", productRoutes);
app.use("/users", userRoutes);

// Сервер эхлүүлэх
app.listen(999, () => console.log("Server running on port 999"));
