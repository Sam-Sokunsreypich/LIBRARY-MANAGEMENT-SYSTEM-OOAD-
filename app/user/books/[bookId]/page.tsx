// app/books/[bookId]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock data for authors to simulate a database join
const authors = {
  "author_1": "Henry David Thoreau",
  "author_2": "H. G. Wells",
  "author_3": "W. Somerset Maugham",
  "author_4": "Gabriel José García Márquez",
  "author_5": "Jane Austen",
  "author_6": "Khaled Hosseini",
};

// Mock book data
const allBooks = [
  {
    book_id: "1",
    book_title: "LIFE IN THE WOODS",
    author_id: "author_1",
    book_image: "/book-covers/life-in-the-woods.jpg",
    book_total: 2,
    publication_year: 1854,
    subCategory_id: "sub_1",
    book_description: "Walden is a book by transcendentalist Henry David Thoreau. The text is a reflection upon simple living in natural surroundings. The work is part personal declaration of independence, social experiment, voyage of spiritual discovery, satire, and—to some degree—a manual for self-reliance.",
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
    book_description: "The Time Machine is a science fiction novella by H. G. Wells, published in 1895 and written as a frame narrative. The work is generally credited with the popularization of the concept of time travel by using a vehicle that allows an operator to travel purposely and selectively forwards or backwards in time.",
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
    book_description: "The Moon and Sixpence is a novel by W. Somerset Maugham, told in episodic form by a first-person narrator. The story is based on the life of the painter Paul Gauguin. The novel explores the nature of art and the conflict between artistic expression and conventional life.",
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
    book_description: "One Hundred Years of Solitude tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel explores themes of solitude, time, and the cyclical nature of history through magical realism. It is widely considered one of the greatest achievements in literature.",
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
    book_description: "Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. The novel charts the emotional development of the protagonist Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.",
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
    book_description: "The Kite Runner is the first novel by Afghan-American author Khaled Hosseini. Published in 2003, it tells the story of Amir, a young boy from Kabul, and his journey to redemption after betraying his servant's son. The story is set against a backdrop of tumultuous events in Afghanistan.",
    publisher: "Riverhead Books",
    pages: 371,
  },
];

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;
  const [isFavorited, setIsFavorited] = useState(false);

  // Find the book by ID
  const book = allBooks.find(b => b.book_id === bookId);

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book not found</h1>
          <Link href="/search" className="text-blue-500 hover:text-blue-700">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const authorName = authors[book.author_id as keyof typeof authors];

  const handleBorrow = () => {
    console.log(`Borrowing book with ID: ${bookId}`);
    // Implement borrow functionality here
    // You might want to show a success message or redirect to a confirmation page
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    console.log(`${isFavorited ? 'Removing from' : 'Adding to'} favorites: ${bookId}`);
    // Implement favorite functionality here
  };

  const handleShare = () => {
    console.log(`Sharing book with ID: ${bookId}`);
    // Implement share functionality here
    // You might want to open a share dialog or copy the link to clipboard
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container mx-auto px-6 py-6 text-xl">
        <h2><b>Information</b></h2>
         <div className="w-full h-0.5 bg-gray-400 "></div>
      </div>
     
      
      <div className="container mx-auto px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Book Cover Section */}
          <div >
            <div className="relative w-[180px] h-[250px] mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl">
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
                author : {authorName}
              </p>
              <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-2 text-sm">
                <div className="text-gray-500">publisher :</div>
                <div className="text-gray-900">{book.publisher}</div>
                
                <div className="text-gray-500">publication year :</div>
                <div className="text-gray-900">{book.publication_year}</div>
                
                <div className="text-gray-500">pages :</div>
                <div className="text-gray-900">{book.pages}</div>
              </div>

             
              {/* <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {book.publisher && (
                  <span>{book.publisher}</span>
                )}
                <span>{book.publication_year}</span>
                {book.pages && (
                  <span>{book.pages} pages</span>
                )}
              </div> */}
              
            </div>
            
            
            
           
          </div>
        </div>
      </div>
      <div className="container mt-1 m-auto">
          <div className="w-full h-0.5 bg-gray-400 "></div>


          {book.book_description && (
              <div className="mb-12">
                <div className="mt-1"></div>
                <p className="text-gray-600 leading-relaxed">
                  {book.book_description}
                </p>
              </div>

  )}
   {/* Action Buttons */}
            <div className="flex  gap-4 mb-12 mr-0 justify-end">
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
              </button>
               */}
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
  );
}