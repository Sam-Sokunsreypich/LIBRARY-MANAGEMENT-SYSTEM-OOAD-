// app/search/page.tsx
"use client";

import { useState, useMemo } from "react";
import BookCard from "../../components/ui/BookCard";
import { Book } from "../../types/book";
import { Search } from 'lucide-react';

// Updated book data to match the picture
const allBooks: Book[] = [
  {
    id: "1",
    title: "LIFE IN THE WOODS",
    author: "Henry David Thoreau",
    coverImage: "/book-covers/life-in-the-woods.jpg",
    copiesAvailable: 2,
    createdAt: "2024-11-07",
  },
  {
    id: "2",
    title: "The Time Machine",
    author: "H. G. Wells",
    coverImage: "/book-covers/the-time-machine.jpg",
    copiesAvailable: 5,
    createdAt: "2024-11-07",
  },
  {
    id: "3",
    title: "THE MOON AND SIXPENCE",
    author: "W. Somerset Maugham",
    coverImage: "/book-covers/moon-and-sixpence.jpg",
    copiesAvailable: 1,
    createdAt: "2024-11-07",
  },
  {
    id: "5",
    title: "ONE HUNDRED YEARS OF SOLITUDE",
    author: "Gabriel García Márquez",
    coverImage: "/book-covers/hundred-years-solitude.jpg",
    copiesAvailable: 3,
    createdAt: "2024-11-07",
  },
  {
    id: "6",
    title: "PRIDE AND PREJUDICE",
    author: "Jane Austen",
    coverImage: "/book-covers/pride-prejudice.jpg",
    copiesAvailable: 4,
    createdAt: "2024-11-07",
  },
  {
    id: "7",
    title: "KITE RUNNER", // Duplicate as seen in the image
    author: "Khaled Hosseini",
    coverImage: "/book-covers/kite-runner-alt.jpg",
    copiesAvailable: 1,
    createdAt: "2024-11-07",
  },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks = useMemo(() => {
    if (!searchTerm) return allBooks;
    return allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="max-w-2xs mx-auto mb-6">   
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for books..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Results Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Result</h1>
          <p className="text-gray-600">Found {filteredBooks.length} books</p>
        </div>

        {/* Books Grid - matching the screenshot layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}