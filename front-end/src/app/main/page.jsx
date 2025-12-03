"use client";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function MainPage() {
  return (
    <div className="flex w-full flex-col items-center gap-[88px] bg-[#404040]">
      <Header />
      <Footer />
    </div>
  );
}

// const router = useRouter();

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!tokeen) router.push("/login"); // login хийгээгүй бол redirect
// }, [router]);
