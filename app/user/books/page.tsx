"use client";

import BookCard from "@/components/books/BookCard";
import SearchBar from "@/components/ui/SearchBar";
import { Book } from "@/types/Book";
import { useState, useMemo, useEffect } from "react";
import { getAllBook } from "./action/book";
import BookCatalog from "@/app/admin/books/components/BookCatalog";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([])

 

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

  

  console.log('allBooks', allBooks)

  // Filter books and then enrich the data with author names for the BookCard
  const booksToDisplay = useMemo(() => {
    if (!searchTerm) return allBooks;
  
    return allBooks.filter((book) => {
      const titleMatch = book.book_title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
  
      const authorFullName = `${book.author?.first_name ?? ""} ${book.author?.last_name ?? ""}`.toLowerCase();
      const authorMatch = authorFullName.includes(searchTerm.toLowerCase());
  
      return titleMatch || authorMatch;
    });
  }, [searchTerm, allBooks]);

  return (
    <div className="min-h-screen bg-gray-100 px-16 gap-4">


      <div className="container px-4 py-6">
        {/* Search Bar Section */}
        <div className="flex justify-end mb-6">
          <SearchBar
            placeholder="Search for books or authors..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>


        {/* Results Title */}
        <div className="mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800">Result</h1>
          <p className="text-gray-600">Found {booksToDisplay.length} books</p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
         
          {booksToDisplay.map((book) => (
            
            <BookCard
              key={book.book_id}
              book={
                book
              }
            />
           
          ))}
          
        </div>
      </div>
    </div>
  );
}