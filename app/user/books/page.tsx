// "use client";

// import BookCard from "@/components/books/BookCard";
// import SearchBar from "@/components/ui/SearchBar";
// import { Book } from "@/types/Book";
// import { useState, useMemo, useEffect } from "react";
// import { getAllBook } from "./action/book";
// import BookCatalog from "@/app/admin/books/components/BookCatalog";
// import { useSearch } from "@/app/hooks/useSearch";

// export default function SearchPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [allBooks, setAllBooks] = useState<Book[]>([])

 

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const books = await getAllBook(); 
//         setAllBooks(books || []);
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks();
//   }, []);

  
  

//   console.log('allBooks', allBooks)

//   // Filter books and then enrich the data with author names for the BookCard
//   const booksToDisplay = useMemo(() => {
//     if (!searchTerm) return allBooks;
  
//     return allBooks.filter((book) => {
//       const titleMatch = book.book_title
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase());
  
//       const authorFullName = `${book.author?.first_name ?? ""} ${book.author?.last_name ?? ""}`.toLowerCase();
//       const authorMatch = authorFullName.includes(searchTerm.toLowerCase());
  
//       return titleMatch || authorMatch;
//     });
//   }, [searchTerm, allBooks]);

//   return (
//     <div className="min-h-screen bg-gray-100 px-16 gap-4">


//       <div className="container px-4 py-6">
//         {/* Search Bar Section */}
//         <div className="flex justify-end mb-6">
//           <SearchBar
//             placeholder="Search for books or authors..."
//             value={searchTerm}
//             onChange={setSearchTerm}
//           />
//         </div>


//         {/* Results Title */}
//         <div className="mb-6 ">
//           <h1 className="text-2xl font-bold text-gray-800">Result</h1>
//           <p className="text-gray-600">Found {booksToDisplay.length} books</p>
//         </div>

//         {/* Books Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
         
//           {booksToDisplay.map((book) => (
            
//             <BookCard
//               key={book.book_id}
//               book={
//                 book
//               }
//             />
           
//           ))}
          
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import BookCard from "@/components/books/BookCard";
import SearchBar from "@/components/ui/SearchBar";
import { Book } from "@/types/Book";
import { useState, useEffect } from "react";
import { getAllBook } from "./action/book";
// 1. Import the generic useSearch hook
import { useSearch } from "@/app/hooks/useSearch";

export default function SearchPage() {
  // You still need to fetch all the books from the server
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

  // 2. Define how to get the author's full name for searching
  const getAuthorFullName = (book: Book, _keyPath: string) => {
    return `${book.author?.first_name ?? ""} ${book.author?.last_name ?? ""}`;
  };

  // 3. Call the generic useSearch hook with your books and configuration
  const { searchTerm, setSearchTerm, filteredItems } = useSearch<Book>(allBooks, {
    // Search in the 'book_title' property
    keys: ['book_title'],
    // For the 'author' property, use our special function to get the full name
    nestedKeys: {
      author: getAuthorFullName,
    },
  });

  // 4. (Optional but recommended) Rename filteredItems to booksToDisplay for clarity
  const booksToDisplay = filteredItems;

  return (
    <div className="min-h-screen bg-gray-100 px-16 gap-4">
      <div className="container px-4 py-6">
        {/* Search Bar Section */}
        <div className="flex justify-end mb-6">
          <SearchBar
            placeholder="Search for books or authors..."
            // 5. Use searchTerm and setSearchTerm from the hook
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Results Title */}
        <div className="mb-6 ">
          <h1 className="text-2xl font-bold text-gray-800">Result</h1>
          {/* 6. Use booksToDisplay which comes from the hook */}
          <p className="text-gray-600">Found {booksToDisplay.length} books</p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* 7. Map over booksToDisplay from the hook */}
          {booksToDisplay.map((book) => (
            <BookCard
              key={book.book_id}
              book={book}
            />
          ))}
        </div>
      </div>
    </div>
  );
}