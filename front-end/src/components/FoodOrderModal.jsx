"use client";

import React from "react";
import axios from "axios";

export default function FoodOrderModal({ product, onClose, onSuccess }) {
  const handleOrder = async () => {
    try {
      await axios.post("http://localhost:999/OrderedFoods", {
        productId: product._id,
        quantity: 1,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "Order failed:",
        error.response?.data?.message || error.message
      );
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Order {product.name}</h2>
        <p className="mb-4">Price: ${product.price.toFixed(2)}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            type="button"
            onClick={handleOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
