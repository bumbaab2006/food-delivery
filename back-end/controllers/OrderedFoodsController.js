const OrderedFoods = require("../models/OrderedFoods");

const OrderedFoodsController = {
  // CREATE ORDER
  createOrderedFood: async (req, res) => {
    try {
      const order = new OrderedFoods(req.body);
      const saved = await order.save();
      res.status(201).json(saved);
    } catch (error) {
      console.log("Order Save Error:", error);
      res.status(500).json({ message: error.message });
    }
  },

  // GET ONE ORDER
  getOrderedFoodById: async (req, res) => {
    try {
      const order = await OrderedFoods.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET ALL ORDERS
  getAllOrderedFoods: async (req, res) => {
    try {
      const orders = await OrderedFoods.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // UPDATE ORDER STATUS
  updateOrderedFoodStatus: async (req, res) => {
    try {
      const updated = await OrderedFoods.findByIdAndUpdate(
        req.params.id,
        { orderStatus: req.body.status },
        { new: true }
      );

      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE ORDER
  deleteOrderedFood: async (req, res) => {
    try {
      await OrderedFoods.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Order deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = OrderedFoodsController;
