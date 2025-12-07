const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
connectToDB();

// Routes
const userRoutes = require("./routes/userRoutes");
const foodCategoryRoutes = require("./routes/foodCategoryRoutes");
const productRoutes = require("./routes/productRoutes"); // ✔ ШИНЭ
const orderedFoodsRoutes = require("./routes/OrderedFoodsRoutes"); // ✔ ШИНЭ

app.use("/users", userRoutes);
app.use("/food-menu", foodCategoryRoutes);
app.use("/products", productRoutes); // ✔ ҮНЭН ГОЛ НЬ ЭНЭ МӨР
app.use("/order-foods", orderedFoodsRoutes); // ✔ ШИНЭ
// Server
app.listen(999, () => console.log("Server running on port 999"));
