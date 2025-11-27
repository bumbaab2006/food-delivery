const mongoose = require("mongoose");

// 1) Schema тодорхойлно
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // category: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
