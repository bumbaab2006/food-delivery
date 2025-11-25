"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login"); // login хийгээгүй бол redirect
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Main Page!</h1>
    </div>
  );
}
