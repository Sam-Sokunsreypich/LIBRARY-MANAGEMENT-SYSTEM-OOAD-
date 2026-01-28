"use client"; 

import React, { useEffect, useState } from "react";
import {
  BookOpenIcon,
  ClockIcon,
  InboxArrowDownIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/components/nav/Navbar";
import BookCard from "@/components/books/BookCard";
import { Book } from "@/types/Book";
import { getAllBook } from "@/app/user/books/action/book";

const Home: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBook(); 
        setAllBooks(books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {/*  Section */}
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
            
              {book_title === "Currently Reading" && (
                <BookOpenIcon className="h-6 w-6 text-orange-500" />
              )}
              {book_title === "Overdue Books" && (
                <ClockIcon className="h-6 w-6 text-orange-500" />
              )}
              <h1>{book_title}</h1>
            </div>
          ))}
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
        {/* <div className="flex space-x-6 justify-center">
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
        </div> */}
        {/*  Section */}
        <div className="px-35">
          <h1 className="text-2xl font-semibold mb-6 ">Recommended for you</h1>
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