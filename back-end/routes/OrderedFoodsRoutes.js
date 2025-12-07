const express = require("express");
const router = express.Router();
const orderedFoodsController = require("../controllers/OrderedFoodsController");

// CREATE ORDER
router.post("/", orderedFoodsController.createOrderedFood);

// GET ALL
router.get("/", orderedFoodsController.getOrderedFoods);

// GET BY ID
router.get("/:id", orderedFoodsController.getOrderedFoodById);

// UPDATE ORDER
router.put("/:id", orderedFoodsController.updateOrderedFood);

// DELETE ORDER
router.delete("/:id", orderedFoodsController.deleteOrderedFood);

module.exports = router;
