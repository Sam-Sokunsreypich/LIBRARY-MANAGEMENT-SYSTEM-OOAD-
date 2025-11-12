import React from "react";
import {
  BookOpenIcon,
  ClockIcon,
  InboxArrowDownIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/solid";
// import { Book } from "@/types/book";
import Navbar from "@/components/nav/Navbar";
import BookCard from "@/components/books/BookCard";
import { Book } from "@/types/Book";

const allBooks: Book[] = [
  // {
  //   book_id: "1",
  //   book_title: "LIFE IN THE WOODS",
  //   author_id: "Henry David Thoreau",
  //   book_image: "/book-covers/life-in-the-woods.jpg",
  //   book_total: 2,
  //   createdAt: "2024-11-07",
  // },
  // {
  //   book_id: "2",
  //   book_title: "MODERN JAVASCRIPT",
  //   author_id: "Jane Smith",
  //   book_image: "/book-covers/modern-js.jpg",
  //   book_total: 4,
  //   createdAt: "2024-10-30",
  // },
  // {
  //   book_id: "3",
  //   book_title: "DESIGN THINKING",
  //   author_id: "Emily Clark",
  //   book_image: "/book-covers/design-thinking.jpg",
  //   book_total: 1,
  //   createdAt: "2024-11-01",
  // },
  // {
  //   book_id: "4",
  //   book_title: "LIFE IN THE WOODS",
  //   author_id: "Henry David Thoreau",
  //   book_image: "/book-covers/life-in-the-woods.jpg",
  //   book_total: 2,
  //   createdAt: "2024-11-07",
  // },
  // {
  //   book_id: "5",
  //   book_title: "MODERN JAVASCRIPT",
  //   author_id: "Jane Smith",
  //   book_image: "/book-covers/modern-js.jpg",
  //   book_total: 4,
  //   createdAt: "2024-10-30",
  // },
  // {
  //   book_id: "6",
  //   book_title: "DESIGN THINKING",
  //   author_id: "Emily Clark",
  //   book_image: "/book-covers/design-thinking.jpg",
  //   book_total: 1,
  //   createdAt: "2024-11-01",
  // },
  // {
  //   book_id: "7",
  //   book_title: "MODERN JAVASCRIPT",
  //   author_id: "Jane Smith",
  //   book_image: "/book-covers/modern-js.jpg",
  //   book_total: 4,
  //   createdAt: "2024-10-30",
  // },
  // {
  //   book_id: "8",
  //   book_title: "DESIGN THINKING",
  //   author_id: "Emily Clark",
  //   book_image: "/book-covers/design-thinking.jpg",
  //   book_total: 1,
  //   createdAt: "2024-11-01",
  // },
  // {
  //   book_id: "9",
  //   book_title: "MODERN JAVASCRIPT",
  //   author_id: "Jane Smith",
  //   book_image: "/book-covers/modern-js.jpg",
  //   book_total: 4,
  //   createdAt: "2024-10-30",
  // },
  // {
  //   book_id: "10",
  //   book_title: "DESIGN THINKING",
  //   author_id: "Emily Clark",
  //   book_image: "/book-covers/design-thinking.jpg",
  //   book_total: 1,
  //   createdAt: "2024-11-01",
  // },
];
const Home: React.FC = () => {
  return (
    <div>
      {/* Summary Section */}
      <div className="mt-10 space-y-4">
        {/* First row */}
        <div className="flex space-x-6 justify-center">
          {["Currently Reading", "Overdue Books"].map((book_title) => (
            <div
              key={book_title}
              className="border-2 w-72 h-20 text-2xl rounded-md border-orange-500
                   hover:bg-orange-100 hover:scale-105 hover:shadow-lg transition-transform duration-200
                   flex items-center justify-center space-x-2 cursor-pointer"
            >
              {/* Show correct icon next to text */}
              {book_title === "Currently Reading" && (
                <BookOpenIcon className="h-6 w-6 text-orange-500" />
              )}
              {book_title === "Overdue Books" && (
                <ClockIcon className="h-6 w-6 text-orange-500" />
              )}
              <h1>{book_title}</h1>
            </div>
          ))}
        </div>
        <div className="flex space-x-6 justify-center">
          {["Borrowed Books", "Returned Books"].map((book_title) => (
            <div
              key={book_title}
              className="border-2 w-72 h-20 text-2xl rounded-md border-orange-500
                   hover:bg-orange-100 hover:scale-105 hover:shadow-lg transition-transform duration-200
                   flex items-center justify-center space-x-2 cursor-pointer"
            >
              {book_title === "Borrowed Books" && (
                <InboxArrowDownIcon className="h-6 w-6 text-orange-500" />
              )}
              {book_title === "Returned Books" && (
                <ReceiptRefundIcon className="h-6 w-6 text-orange-500" />
              )}
              <h1>{book_title}</h1>
            </div>
          ))}
        </div>
        {/* Recommended Section */}
        <div className="px-35">
          <h1 className="text-2xl font-semibold mb-6 ">Recommended for you</h1>
          {/* Centered Books Grid */}
          <div className="grid grid-cols-5 gap-8 place-items-center">
            {allBooks.map((book) => (
              <BookCard key={book.book_id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
