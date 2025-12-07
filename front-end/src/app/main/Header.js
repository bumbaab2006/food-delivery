import { useState } from "react";
import Logo from "../_icons/logo";
import LocationIcon from "../_icons/LocationIcon";
import ShoppingIcon from "../_icons/ShoppingIcon";
import UserIcon from "../_icons/UserIcon";
import AddresRightChevronIcon from "../_icons/AddresRightChevronIcon";
import CartModal from "@/components/CardModal";

export default function Header({ cart, setCart }) {
  const [showCart, setShowCart] = useState(false);

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

          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setShowCart(true)}
          >
            <ShoppingIcon className="w-5 h-5" />
          </button>

          <button className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 transition">
            <UserIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      <div
        className="w-full h-[900px] bg-cover bg-center"
        style={{ backgroundImage: "url('/mainPageHeaderImage.png')" }}
      ></div>

      {showCart && (
        <CartModal
          cart={cart}
          setCart={setCart}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
}
