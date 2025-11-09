// File: app/book/components/BookCatalog.tsx
"use client";
import { useState, useTransition } from "react";
import { Books } from "@/lib/types/booktype"; 
import { filterBooks } from "../actions/bookfilter"; 
import BookFilter from "./BookFilter";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";


const BookCard = ({ book }: { book: Books }) => (
    <div className="w-50 h-90 p-4 border border-gray-500 rounded-md bg-white hover:shadow-lg transition-shadow">
        <Image 
        src={book.book_image}
        alt={book.book_title || "Book image"}
        className=""
        width={165}
        height={0}
        />
        <h3 className="font-bold text-lg text-indigo-700">{book.book_title}</h3>
        <p className="text-sm text-gray-500">Book ID: {book.book_id}</p>
        {book.author && (
            <p className="text-sm mt-2 font-medium text-gray-800">
                Author: {book.author.author_first_name} {book.author.author_last_name}
            </p>
        )}
    </div>
);


interface FilterData {
    categoryId?: string;
    subcategoryId?: string;
}

export default function BookCatalog() {
    // Stores the list of books fetched after filtering. Null initially.
    const [filteredBooks, setFilteredBooks] = useState<Books[] | null>(null);
    // Manages the pending state for the Server Action call
    const [isPending, startTransition] = useTransition();

    const handleFilter = (data: FilterData) => {
        // Start the transition to update the state after the async server action completes
        startTransition(async () => {
            const category = data.categoryId || "";
            const subcategory = data.subcategoryId || "";
            const { books, error } = await filterBooks(category, subcategory);
            
            if (error) {
                const errorMessage = error.message || "Unknown error during filtering.";
                console.error("Filter failed:", errorMessage);
                
                // You might also want to display this error message to the user:
                // toast.error(`Error: ${errorMessage}`); 
                
                setFilteredBooks([]);
            } else {
                // Update the state with the received books (or empty array if null)
                setFilteredBooks(books || []);
            }
        });
    };

    return (
        <div className="w-full">
            <div className="flex justify-between gap-5 mb-6">
                {/* Pass the handler function and loading state to BookFilter */}
                <BookFilter 
                    onFilterSubmit={handleFilter} 
                />
            </div>

            {/* Display Results */}
            <div className="border-t pt-6">
                {/* Loading Indicator */}
                {isPending && (
                    <div className="flex items-center justify-center p-8 text-blue-500">
                        <AiOutlineLoading3Quarters className="animate-spin text-2xl mr-3" />
                        <p className="text-lg">Searching for books...</p>
                    </div>
                )}
                
                {/* Initial State Message */}
                {filteredBooks === null && !isPending && (
                    <p className="text-center p-12 text-gray-500 border border-dashed rounded-lg">
                        Use the filters above and click 'Apply Filter' to see results.
                    </p>
                )}
                
                {/* Books Found */}
                {filteredBooks && filteredBooks.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredBooks.map((book,index) => (
                            <BookCard 
                            key={String(book.book_id || `${book.category_id}=${index}`)}
                            book={book} />
                        ))}
                    </div>
                )}
                
                {/* No Books Found */}
                {filteredBooks && filteredBooks.length === 0 && !isPending && (
                    <div className="text-center p-12 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 font-semibold">No books found.</p>
                        <p className="text-sm text-red-600">Try adjusting your category or subcategory filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}