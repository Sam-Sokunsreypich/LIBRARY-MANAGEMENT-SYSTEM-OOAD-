// components/ui/BookDetailModal.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, Share2 } from "lucide-react";

// Define the interface for the book detail modal props
interface BookDetailModalProps {
  book: {
    book_id: string;
    book_title: string;
    author_name: string;
    book_image: string;
    book_total: number;
    publication_year: number;
    book_description?: string;
    publisher?: string;
    pages?: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onBorrow: (bookId: string) => void;
  onFavorite: (bookId: string) => void;
  onShare: (bookId: string) => void;
}

export default function BookDetailModal({
  book,
  isOpen,
  onClose,
  onBorrow,
  onFavorite,
  onShare,
}: BookDetailModalProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleBorrow = () => {
    onBorrow(book.book_id);
    onClose();
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite(book.book_id);
  };

  const handleShare = () => {
    onShare(book.book_id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
      >
        <X size={32} />
      </button>

      <div>
        <h3>Information</h3>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Book Cover Section */}
          <div className="flex-shrink-0">
            <div className="relative w-[280px] h-[420px] mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={book.book_image || "/placeholder-book.png"}
                alt={`${book.book_title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 280px, 280px"
              />
            </div>
          </div>
          
          {/* Book Details Section */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {book.book_title}
            </h1>
            
            <div className="mb-8">
              <p className="text-xl text-gray-700 mb-2">
                {book.author_name}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {book.publisher && (
                  <span>{book.publisher}</span>
                )}
                <span>{book.publication_year}</span>
                {book.pages && (
                  <span>{book.pages} pages</span>
                )}
              </div>
            </div>
            
            {book.book_description && (
              <div className="mb-12">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">About this book</h2>
                <p className="text-gray-600 leading-relaxed">
                  {book.book_description}
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleBorrow}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  book.book_total > 0
                    ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={book.book_total <= 0}
              >
                Borrow Now
              </button>
              
              {/* <button
                onClick={handleFavorite}
                className={`px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  isFavorited
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
                Favorites
              </button> */}
              
              <button
                onClick={handleShare}
                className="px-8 py-3 rounded-full font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}