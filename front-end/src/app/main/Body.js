"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import FoodModal from "@/components/FoodModal";
import AddToCardIcon from "../_icons/AddToCardIcon";
import FoodOrderModal from "@/components/FoodOrderModal";
export default function MainPageBody() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // See More state
  const [expandedCategories, setExpandedCategories] = useState({});

  // Desktop checks
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  const toggleExpand = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const fetchCategories = () => {
    axios.get("http://localhost:999/food-menu").then((res) => {
      setCategories(res.data);
    });
  };

  const fetchProducts = () => {
    axios.get("http://localhost:999/products").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // GROUPING + Desktop hide empty categories
  const grouped = categories
    .map((cat) => ({
      ...cat,
      products: products.filter((p) => p.category === cat._id),
    }))
    .filter((cat) => (isDesktop ? cat.products.length > 0 : true));
  console.log("Grouped Categories:", grouped);
  console.log("All Products:", products);
  console.log("categories:", categories);
  return (
    <div className="min-h-screen w-full bg-[#3C3C3C] p-12">
      <div className="max-w-[1600px] mx-auto space-y-20">
        {grouped.map((cat) => (
          <div key={cat._id} className="space-y-8">
            {/* CATEGORY TITLE */}
            <h2 className="text-white text-3xl font-semibold tracking-wide">
              {cat.categoryName}
            </h2>

            {/* PRODUCT GRID */}
            <div
              className="
                grid 
                grid-cols-1
                sm:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                gap-20
              "
            >
              {(expandedCategories[cat._id]
                ? cat.products
                : cat.products.slice(0, 8)
              ).map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col p-6 gap-3 bg-white rounded-3xl border border-gray-200 shadow-lg relative"
                >
                  {/* IMAGE */}
                  <div className="relative w-full">
                    <img
                      src={item.image || "/food_placeholder.png"}
                      alt={item.name}
                      className="w-full h-[220px] object-cover rounded-t-3xl"
                    />

                    {/* FLOATING BUTTON */}
                    <button
                      onClick={() => {
                        setSelectedCategory(cat._id);
                        setShowModal(true);
                      }}
                      className="absolute bottom-5 right-5 w-[33px] h-[33px] bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition"
                    >
                      <AddToCardIcon />
                    </button>
                  </div>

                  {/* TEXT */}
                  <div className="flex flex-col gap-1 px-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-red-500 text-[26px] font-bold">
                        {item.name}
                      </h3>

                      <span className="text-[22px] font-semibold text-gray-900">
                        ${item.price}
                      </span>
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SEE MORE BUTTON */}
            {cat.products.length > 8 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => toggleExpand(cat._id)}
                  className="px-6 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition"
                >
                  {expandedCategories[cat._id] ? "See less" : "See more"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD FOOD MODAL */}
      {showModal && (
        <FoodOrderModal
          product={products.find((p) => p.category === selectedCategory) || {}}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            alert("Order placed successfully!");
          }}
        />
      )}
    </div>
  );
}
