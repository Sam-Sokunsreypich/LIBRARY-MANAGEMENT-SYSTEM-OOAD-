import React from "react";
import {
  BookOpenIcon,
  ClockIcon,
  InboxArrowDownIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/solid";
import { Book } from "@/types/book";
import Navbar from "@/components/nav/Navbar";
import BookCard from "@/components/books/BookCard";

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
    title: "MODERN JAVASCRIPT",
    author: "Jane Smith",
    coverImage: "/book-covers/modern-js.jpg",
    copiesAvailable: 4,
    createdAt: "2024-10-30",
  },
  {
    id: "3",
    title: "DESIGN THINKING",
    author: "Emily Clark",
    coverImage: "/book-covers/design-thinking.jpg",
    copiesAvailable: 1,
    createdAt: "2024-11-01",
  },
  {
    id: "4",
    title: "LIFE IN THE WOODS",
    author: "Henry David Thoreau",
    coverImage: "/book-covers/life-in-the-woods.jpg",
    copiesAvailable: 2,
    createdAt: "2024-11-07",
  },
  {
    id: "5",
    title: "MODERN JAVASCRIPT",
    author: "Jane Smith",
    coverImage: "/book-covers/modern-js.jpg",
    copiesAvailable: 4,
    createdAt: "2024-10-30",
  },
  {
    id: "6",
    title: "DESIGN THINKING",
    author: "Emily Clark",
    coverImage: "/book-covers/design-thinking.jpg",
    copiesAvailable: 1,
    createdAt: "2024-11-01",
  },
  {
    id: "7",
    title: "MODERN JAVASCRIPT",
    author: "Jane Smith",
    coverImage: "/book-covers/modern-js.jpg",
    copiesAvailable: 4,
    createdAt: "2024-10-30",
  },
  {
    id: "8",
    title: "DESIGN THINKING",
    author: "Emily Clark",
    coverImage: "/book-covers/design-thinking.jpg",
    copiesAvailable: 1,
    createdAt: "2024-11-01",
  },
  {
    id: "9",
    title: "MODERN JAVASCRIPT",
    author: "Jane Smith",
    coverImage: "/book-covers/modern-js.jpg",
    copiesAvailable: 4,
    createdAt: "2024-10-30",
  },
  {
    id: "10",
    title: "DESIGN THINKING",
    author: "Emily Clark",
    coverImage: "/book-covers/design-thinking.jpg",
    copiesAvailable: 1,
    createdAt: "2024-11-01",
  },
];
const Home: React.FC = () => {
  return (
    <div>
      {/* Summary Section */}
      <div className="mt-10 space-y-4">
        {/* First row */}
        <div className="flex space-x-6 justify-center">
          {["Currently Reading", "Overdue Books"].map((title) => (
            <div
              key={title}
              className="border-2 w-72 h-20 text-2xl rounded-md border-orange-500
                   hover:bg-orange-100 hover:scale-105 hover:shadow-lg transition-transform duration-200
                   flex items-center justify-center space-x-2 cursor-pointer"
            >
              {/* Show correct icon next to text */}
              {title === "Currently Reading" && (
                <BookOpenIcon className="h-6 w-6 text-orange-500" />
              )}
              {title === "Overdue Books" && (
                <ClockIcon className="h-6 w-6 text-orange-500" />
              )}
              <h1>{title}</h1>
            </div>
          ))}
        </div>
        <div className="flex space-x-6 justify-center">
          {["Borrowed Books", "Returned Books"].map((title) => (
            <div
              key={title}
              className="border-2 w-72 h-20 text-2xl rounded-md border-orange-500
                   hover:bg-orange-100 hover:scale-105 hover:shadow-lg transition-transform duration-200
                   flex items-center justify-center space-x-2 cursor-pointer"
            >
              {title === "Borrowed Books" && (
                <InboxArrowDownIcon className="h-6 w-6 text-orange-500" />
              )}
              {title === "Returned Books" && (
                <ReceiptRefundIcon className="h-6 w-6 text-orange-500" />
              )}
              <h1>{title}</h1>
            </div>
          ))}
        </div>
        {/* Recommended Section */}
        <div className="px-35">
          <h1 className="text-2xl font-semibold mb-6 ">Recommended for you</h1>
          {/* Centered Books Grid */}
          <div className="grid grid-cols-5 gap-8 place-items-center">
            {allBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
