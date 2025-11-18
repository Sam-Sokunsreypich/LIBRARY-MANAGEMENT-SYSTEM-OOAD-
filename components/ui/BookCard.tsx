// components/ui/BookCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Define a more specific interface for the props this component needs.
interface BookCardProps {
  book_id: string;
  book_title: string;
  author_name: string;
  book_image: string;
  book_total: number;
  publication_year: number;
  book_description?: string;
  publisher?: string;
  pages?: number;
}

export default function BookCard({ book }: { book: BookCardProps }) {
  const handleBorrow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Borrowing book with ID: ${book.book_id}`);
    // Implement borrow functionality here
  };

  return (
    <Link href={`/books/${book.book_id}`} className="block">
      <div className="group flex flex-col w-full max-w-[160px] h-full">
        {/* Book Cover */}
        <div className="relative w-full overflow-hidden rounded-md shadow-md bg-white transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
          <div className="relative w-full h-0 pb-[150%]">
            <Image
              src={book.book_image || "/placeholder-book.png"}
              alt={`${book.book_title} cover`}
              fill
              className="object-cover"
              sizes="(max-width: 160px) 100vw, 160px"
            />
          </div>
        </div>

        {/* Book Info */}
        <div className="mt-3 text-center flex-grow">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {book.book_title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 truncate">{book.author_name}</p>
          <p className="text-xs text-gray-400 mt-1">{book.publication_year}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3 justify-center">
          <button
            onClick={handleBorrow}
            className={`w-full px-3 py-2 text-xs font-medium rounded-full transition-colors ${
              book.book_total > 0
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={book.book_total <= 0}
          >
            {book.book_total > 0 ? "Borrow" : "Unavailable"}
          </button>
        </div>
      </div>
    </Link>
  );
}