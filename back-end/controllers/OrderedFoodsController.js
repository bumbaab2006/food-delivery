const OrderedFoods = require("../models/OrderedFoods"); // ← ШИНЭ МӨР

const OrderedFoodsController = {
  createOrderedFood: async (req, res) => {
    try {
      const orderedFood = new OrderedFoods(req.body);
      const savedOrderedFood = await orderedFood.save();
      res.status(201).json(savedOrderedFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderedFoods: async (req, res) => {
    try {
      const orderedFoods = await OrderedFoods.find();
      res.status(200).json(orderedFoods);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderedFoodById: async (req, res) => {
    try {
      const orderedFood = await OrderedFoods.findById(req.params.id);
      if (!orderedFood) {
        return res.status(404).json({ message: "Ordered food not found" });
      }
      res.status(200).json(orderedFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateOrderedFood: async (req, res) => {
    try {
      const updatedOrderedFood = await OrderedFoods.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedOrderedFood);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteOrderedFood: async (req, res) => {
    try {
      await OrderedFoods.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Ordered food deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = OrderedFoodsController;
