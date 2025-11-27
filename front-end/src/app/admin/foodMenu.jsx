"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";

export default function MainPage() {
  return <div className="flex justify-center items-center min-h-screen"></div>;
}

// const router = useRouter();

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!tokeen) router.push("/login"); // login хийгээгүй бол redirect
// }, [router]);
