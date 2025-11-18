"use client";
import { FaTriangleExclamation } from "react-icons/fa6";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <FaTriangleExclamation className="text-6xl text-red-600 mb-4" />
      <h1 className="text-3xl font-bold">Page Not Found</h1>
    </div>
  );
}
