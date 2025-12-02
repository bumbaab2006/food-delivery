"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FoodModal from "@/components/FoodModal";
import CategoryModal from "@/components/CategoryModal";
import { Pencil, Trash, Plus } from "lucide-react";
import RedAddIcon from "../_icons/redAddIcon";

export default function FoodMenu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categoryRefs = useRef({});

  // Fetch Categories
  const fetchCategories = () => {
    axios
      .get("http://localhost:999/food-menu")
      .then((res) => setCategories(res.data))
      .catch(console.log);
  };

  // Fetch Products
  const fetchProducts = () => {
    axios
      .get("http://localhost:999/products")
      .then((res) => setProducts(res.data))
      .catch(console.log);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Products grouped by category
  const grouped = categories.map((cat) => ({
    ...cat,
    products: products.filter((p) => p.category === cat._id),
  }));

  // Scroll to section when category clicked
  const scrollToCategory = (id) => {
    const section = categoryRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDelete = (id) => setDeleteConfirm(id);

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:999/products/${deleteConfirm}`)
      .then(() => {
        fetchProducts();
        setDeleteConfirm(null);
      })
      .catch(console.log);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-6">
      <div className="max-w-7xl mx-auto">
        {/* CATEGORY BUTTONS */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h1 className="text-xl font-semibold mb-4">Dishes category</h1>

          <div className="flex flex-wrap gap-3">
            {grouped.map((cat) => (
              <button
                key={cat._id}
                onClick={() => scrollToCategory(cat._id)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-gray-500 transition text-sm"
              >
                {cat.categoryName}
                <span className="px-2 py-1 bg-black text-white text-xs rounded-full">
                  {cat.products.length}
                </span>
              </button>
            ))}

            {/* Add Category */}
            <RedAddIcon
              className="w-9 h-9 cursor-pointer"
              onClick={() => setShowCategoryModal(true)}
            />
          </div>
        </div>

        {/* ALL CATEGORIES WITH THEIR PRODUCTS */}
        {grouped.map((cat) => (
          <div
            key={cat._id}
            ref={(el) => (categoryRefs.current[cat._id] = el)}
            className="bg-white p-6 rounded-xl shadow mb-12"
          >
            <h2 className="text-xl font-semibold mb-6">
              {cat.categoryName} ({cat.products.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Add New Product Box */}
              <div
                className="flex flex-col justify-center items-center p-6 border-2 border-dashed border-red-400 rounded-xl cursor-pointer hover:bg-red-50"
                onClick={() => {
                  setEditProduct(null);
                  setShowProductModal(true);
                }}
              >
                <RedAddIcon className="w-10 h-10" />
                <p className="text-sm text-gray-600 mt-2">
                  Add new Dish to {cat.categoryName}
                </p>
              </div>

              {/* Product cards */}
              {cat.products.map((product) => (
                <div
                  key={product._id}
                  className="rounded-xl border bg-white shadow hover:shadow-lg transition relative"
                >
                  <img
                    src={product.image || "/food_placeholder.png"}
                    className="w-full h-40  object-cover rounded-t-xl"
                  />

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                      onClick={() => {
                        setEditProduct(product);
                        setShowProductModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4 text-red-500" />
                    </button>

                    <button
                      className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{product.name}</h3>
                      <span className="font-semibold">${product.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
      {showProductModal && (
        <FoodModal
          categories={categories}
          onClose={() => setShowProductModal(false)}
          onSuccess={fetchProducts}
          editProduct={editProduct}
        />
      )}

      {showCategoryModal && (
        <CategoryModal
          onClose={() => setShowCategoryModal(false)}
          onSuccess={fetchCategories}
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h3 className="font-bold text-lg">Delete Product?</h3>
            <p className="text-gray-600 mt-3">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
