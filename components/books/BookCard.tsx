// components/ui/BookCard.tsx
"use client";

import { useState } from "react"; // Import useState
import Image from "next/image";
import { Book } from "@/types/Book";

export default function BookCard({ book }: { book: Book }) {
  // State to manage if the book is favorited
  const [isFavorited, setIsFavorited] = useState(false);

  // Function to toggle the favorite state
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="group flex flex-col w-full max-w-160">
      {/* Book Cover with Hover Effect */}
      <div className="relative w-full overflow-hidden rounded-md shadow-md bg-white transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
        <div className="relative w-full h-0 pb-[150%]">
          <Image
            src={book.coverImage || "/placeholder-book.png"}
            alt={`${book.title} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 160px) 100vw, 160px"
          />
        </div>
      </div>

      {/* Book Info */}
      <div className="mt-3 text-center">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate">{book.author}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 justify-center">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            isFavorited
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {isFavorited ? "Favorited ❤️" : "Favorite 🤍"}
        </button>

        {/* Borrow Button */}
        <button
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            book.copiesAvailable > 0
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={book.copiesAvailable <= 0}
        >
          {book.copiesAvailable > 0 ? "Borrow" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}