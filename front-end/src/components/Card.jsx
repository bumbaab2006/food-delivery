"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

export default function CartDrawer({ children }) {
  return (
    <Sheet>
      {/* Button to open drawer */}
      <SheetTrigger className="p-2 rounded-full bg-red-500 text-white flex items-center gap-2">
        <ShoppingCart size={20} />
        Cart
      </SheetTrigger>

      {/* Drawer content */}
      <SheetContent
        side="right"
        className="w-[420px] bg-[#2f2f2f] text-white border-l border-gray-700 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-white text-xl font-semibold">
            Order detail
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
