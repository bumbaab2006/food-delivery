"use client";
import { useEffect } from "react";
import MainPageBody from "./Body";
import Header from "./Header";
export default function MainPage() {
  return (
    <div className="flex w-full flex-col items-center  bg-[#404040]">
      <Header />
      <MainPageBody />
      {/* <Footer /> */}
    </div>
  );
}

// const router = useRouter();

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!tokeen) router.push("/login"); // login хийгээгүй бол redirect
// }, [router]);
