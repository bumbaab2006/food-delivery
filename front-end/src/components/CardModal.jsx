"use client";
import React from "react";

export default function CartModal({ cart, onClose, onConfirmOrder }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={onConfirmOrder}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
