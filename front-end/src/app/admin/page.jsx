"use client";
import FoodMenu from "./foodMenu";
import MainLogo from "../_icons/mainLogo";
export default function AdminPage() {
  return (
    <div className="flex flex-col w-[205px] h-full px-5 py-9 items-start gap-10 bg-amber-100">
      <div className="flex items-center gap-2 self-stretch">
        <MainLogo />
        <div className="flex flex-col justify-center items-start">
          <p></p>
        </div>
      </div>
    </div>
  );
}
