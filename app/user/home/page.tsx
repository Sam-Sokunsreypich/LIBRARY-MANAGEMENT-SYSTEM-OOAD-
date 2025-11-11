import React from "react";
// import {
//   BookOpenIcon,
//   ClockIcon,
//   InboxArrowDownIcon,
//   ReceiptRefundIcon,
// }from "@heroicons/react/24/outline";
import { Book } from "@/types/Book";


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
