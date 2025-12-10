import { useState } from "react";
import Logo from "../_icons/logo";
import LocationIcon from "../_icons/LocationIcon";
import ShoppingIcon from "../_icons/ShoppingIcon";
import UserIcon from "../_icons/UserIcon";
import AddresRightChevronIcon from "../_icons/AddresRightChevronIcon";
import CartModal from "@/components/CardModal";
import axios from "axios";

export default function Header({ cart, setCart }) {
  const [showCart, setShowCart] = useState(false);

  // Increase quantity
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Confirm Order + Delivery Location → DB
  const confirmOrder = async (deliveryLocation) => {
    try {
      const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await axios.post("http://localhost:999/order-foods", {
        foodItems: cart.map((i) => ({
          foodId: i._id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        totalPrice,
        deliveryLocation,
      });

      alert("Order saved successfully!");
      setCart([]);
      setShowCart(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save order");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex items-center justify-between w-full h-16 px-20 bg-black">
        <Logo />

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-white">
            <LocationIcon />
            <p className="text-red-500 text-xs font-medium leading-4">
              Delivery address:
            </p>
            <p className="text-gray-500 text-xs font-normal leading-4">
              Add Location
            </p>
            <AddresRightChevronIcon />
          </button>

          {/* CART BUTTON */}
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setShowCart(true)}
          >
            <ShoppingIcon className="w-5 h-5" />
          </button>

          {/* USER BUTTON */}
          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 transition">
            <UserIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div
        className="w-full h-[900px] bg-cover bg-center"
        style={{ backgroundImage: "url('/mainPageHeaderImage.png')" }}
      ></div>

      <CartModal
        open={showCart}
        onOpenChange={setShowCart}
        cart={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
        onCheckout={confirmOrder}
      />
    </div>
  );
}
