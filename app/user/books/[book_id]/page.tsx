"use client";
import { Book } from "@/types/Book";
import React, { useEffect, useState } from "react";
import { getAllBook } from "../action/book";
import { useParams } from "next/navigation";
import Image from "next/image";



const DetailPage: React.FC = () => {

  const { book_id } = useParams();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAllBook();
        setAllBooks(books || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const book = allBooks.find((b) => String(b.book_id) === String(book_id));
  console.log('book', book)
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10 font-sans">
      {/* Header Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-lg font-semibold border-b pb-2 mb-6">Information</h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Book Cover */}
          <div className="shadow-lg rounded-lg overflow-hidden w-[180px] h-[240px] flex items-center justify-center bg-gray-100">
          <Image
            src={book?.book_image || "/placeholder-book.png"}
            alt={`${book?.book_title} cover`}
            width={150}
            height={200}
            // fill
            className="object-cover"
          
          />
          </div>

          {/* Book Info */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {book?.book_title.toUpperCase()}
            </h1>
            <p className="text-gray-700">
              <span className="font-semibold">author :</span> {book?.author.first_name} {book?.author.last_name}
            </p>
            {/* <p className="text-gray-700">
              <span className="font-semibold">publisher :</span>{" "}
              {book?.publisher}
            </p> */}
            <p className="text-gray-700">
              <span className="font-semibold">publication year :</span>{" "}
              {book?.publication_year}
            </p>
            {/* <p className="text-gray-700">
              <span className="font-semibold">pages :</span> {book.pages}
            </p> */}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 border-t pt-4 text-gray-700 leading-relaxed">
          {book?.book_description}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all">
            Borrow Now
          </button>
          <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-5 py-2 rounded-full shadow-sm transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12v.01M12 12v.01M20 12v.01M4 12a8 8 0 0016 0"
              />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
