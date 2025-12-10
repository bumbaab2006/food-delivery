"use client";
import FoodMenu from "./foodMenu";
import MainLogo from "../_icons/mainLogo";
import FoodMenuDashboardIcon from "../_icons/FoodMenuDashboardIcon";
import OrderTruckIcon from "../_icons/Order-TruckIcon";
import { useRouter } from "next/navigation";
export default function AdminPage() {
  const role = localStorage.getItem("role");
  const router = useRouter();

  if (role !== "admin") {
    router.push("/main");
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-lg font-medium">
          You do not have permission to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full h-full bg-[#F5F5F5]">
      <div className="flex flex-col w-[205px] h-display px-5 py-9 items-start gap-10 bg-white">
        <div className="flex items-center gap-2 self-stretch">
          <MainLogo />
          <div className="flex flex-col justify-center items-start">
            <p className="text-[#09090B] font-inter text-lg font-semibold leading-7">
              NomNom
            </p>
            <p className="text-[#71717A] font-inter text-xs font-normal leading-4">
              Swift delivery
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 self-stretch">
          <div className="flex h-10 px-6 py-2 items-center gap-2.5 self-stretch">
            <FoodMenuDashboardIcon />
            <p className="text-[#09090B] font-inter text-sm font-medium leading-5">
              Food menu
            </p>
          </div>
          <div className="flex h-10 px-6 py-2 items-center gap-2.5 self-stretch rounded-full bg-[#18181B]">
            <OrderTruckIcon />
            <p className="text-[#FAFAFA] font-inter text-sm font-medium leading-5">
              Orders
            </p>
          </div>
        </div>
      </div>
      <FoodMenu />
    </div>
  );
}
