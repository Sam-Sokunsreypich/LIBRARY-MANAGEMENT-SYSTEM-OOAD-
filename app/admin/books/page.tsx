import { Books } from "@/lib/types/booktype";
import SearchBar from "../user/components/component/SearchBar";
import BookCatalog from "./components/BookCatalog";
import CreateBook from "./components/CreateBook";
import Image from "next/image";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";

export default function BookPage(){
    const BookCard = ({ book }: { book: Books }) => (
        <div className="w-50 p-2 border border-gray-500 rounded-md bg-white hover:shadow-lg transition-shadow">
            <div className="h-55 overflow-hidden flex items-center justify-center bg-gray-50">
          <Image
            src={book.book_image}
            alt={book.book_title || "Book image"}
            width={170}
            height={200}
            className="object-contain max-h-full transition-transform duration-200 group-hover:scale-105"
          />
            </div>
            <h3 className="w-30 truncate mt-2 font-bold text-sm text-indigo-700">{book.book_title}</h3>
            <p className="text-sm">Book ID: {book.book_id}</p>
            <p className="text-sm">Location: {book.book_location}</p>
            <div className="flex gap-2 justify-end items-center mt-2">
                <EditButton book={book}/>
                <DeleteButton book={book}/>
            </div>
        </div>
    );
    
    return (
        <>
            <div className="ml-64 w-auto min-h-screen"> 
                <div className="sticky top-0 z-10">
                    <SearchBar/>
                    <div className="border-b border-gray-300"></div>
                </div>
                <div className="mt-5">
                    <div className="flex justify-between gap-5 items-start">
                        <BookCatalog/> 
                        
                    </div>
                </div>
            </div>
        </>
    )
}