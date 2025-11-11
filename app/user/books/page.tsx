// app/search/page.tsx
"use client";

import BookCard from "@/components/books/BookCard";
import SearchBar from "@/components/ui/SearchBar";
import { useState, useMemo } from "react";

// The new, updated Book interface (for reference)
interface Book {
  book_id: string;
  book_title: string;
  author_id: string;
  book_image: string;
  book_total: number;
  publication_year: number;
  subCategory_id: string;
  book_description?: string;
  publisher?: string;
  pages?: number;
}

// Mock data for authors to simulate a database join
const authors = {
  "author_1": "Henry David Thoreau",
  "author_2": "H. G. Wells",
  "author_3": "W. Somerset Maugham",
  "author_4": "Gabriel José García Márquez",
  "author_5": "Jane Austen",
  "author_6": "Khaled Hosseini",
};

// Updated mock book data to match the new Book interface
const allBooks: Book[] = [
  {
    book_id: "1",
    book_title: "LIFE IN THE WOODS",
    author_id: "author_1",
    book_image: "/book-covers/life-in-the-woods.jpg",
    book_total: 2,
    publication_year: 1854,
    subCategory_id: "sub_1",
    book_description: "Walden is a book by transcendentalist Henry David Thoreau. The text is a reflection upon simple living in natural surroundings.",
    publisher: "Ticknor and Fields",
    pages: 427,
  },
  {
    book_id: "2",
    book_title: "The Time Machine",
    author_id: "author_2",
    book_image: "/book-covers/the-time-machine.jpg",
    book_total: 5,
    publication_year: 1895,
    subCategory_id: "sub_1",
    book_description: "The Time Machine is a science fiction novella by H. G. Wells, published in 1895 and written as a frame narrative.",
    publisher: "William Heinemann",
    pages: 118,
  },
  {
    book_id: "3",
    book_title: "THE MOON AND SIXPENCE",
    author_id: "author_3",
    book_image: "/book-covers/moon-and-sixpence.jpg",
    book_total: 1,
    publication_year: 1919,
    subCategory_id: "sub_2",
    book_description: "The Moon and Sixpence is a novel by W. Somerset Maugham, told in episodic form by a first-person narrator.",
    publisher: "Heinemann",
    pages: 264,
  },
  {
    book_id: "5",
    book_title: "ONE HUNDRED YEARS OF SOLITUDE",
    author_id: "author_4",
    book_image: "/book-covers/hundred-years-solitude.jpg",
    book_total: 3,
    publication_year: 1967,
    subCategory_id: "sub_2",
    book_description: "One Hundred Years of Solitude tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel explores themes of solitude, time, and the cyclical nature of history through magical realism.",
    publisher: "Sudamericana",
    pages: 422,
  },
  {
    book_id: "6",
    book_title: "PRIDE AND PREJUDICE",
    author_id: "author_5",
    book_image: "/book-covers/pride-prejudice.jpg",
    book_total: 4,
    publication_year: 1813,
    subCategory_id: "sub_3",
    book_description: "Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel charts the emotional development of the protagonist Elizabeth Bennet.",
    publisher: "T. Egerton",
    pages: 432,
  },
  {
    book_id: "7",
    book_title: "KITE RUNNER",
    author_id: "author_6",
    book_image: "/book-covers/kite-runner-alt.jpg",
    book_total: 1,
    publication_year: 2003,
    subCategory_id: "sub_1",
    book_description: "The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003, it tells the story of Amir, a young boy from Kabul.",
    publisher: "Riverhead Books",
    pages: 371,
  },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books and then enrich the data with author names for the BookCard
  const booksToDisplay = useMemo(() => {
    if (!searchTerm) return allBooks;

    return allBooks.filter(
      (book) =>
        book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        authors[book.author_id as keyof typeof authors].toLowerCase().includes(searchTerm.toLowerCase()) // Search by author name too
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Search Bar Section */}
        <div className="flex justify-end mb-6">
          <SearchBar
            placeholder="Search for books or authors..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Results Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Result</h1>
          <p className="text-gray-600">Found {booksToDisplay.length} books</p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {booksToDisplay.map((book) => (
            <BookCard
              key={book.book_id}
              book={{
                // Transform the data to match BookCard's expected props
                book_id: book.book_id,
                book_title: book.book_title,
                author_id: authors[book.author_id as keyof typeof authors], // Fetch author name
                book_image: book.book_image,
                book_total: book.book_total,
                publication_year: book.publication_year,
                book_description: book.book_description,
                // publisher: book.publisher,
                // pages: book.pages,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}