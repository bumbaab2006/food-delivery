const express = require("express");
const router = express.Router();
const orderedFoodsController = require("../controllers/OrderedFoodsController");

router.post("/", orderedFoodsController.createOrder);
router.get("/:id", orderedFoodsController.getOrderById);
router.get("/user/:userId", orderedFoodsController.getOrdersByUserId);
router.put("/:id/status", orderedFoodsController.updateOrderStatus);
router.delete("/:id", orderedFoodsController.deleteOrder);

module.exports = router;
