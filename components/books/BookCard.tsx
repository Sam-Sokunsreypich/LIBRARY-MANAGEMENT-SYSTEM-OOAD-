// components/ui/BookCard.tsx
"use client";

import { useState } from "react"; // Import useState
import Image from "next/image";
import { requestBorrow } from "@/app/user/books/action/borrowing";
import { createSupabaseAdmin } from "@/lib/supabase";
import { toast } from "sonner";
import { Book } from "@/types/Book";
import { useRouter } from "next/navigation"; 

interface Prop {
  book:Book;
}
export default function BookCard({ book  }: Prop) {
  // State to manage if the book is favorited
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);

  const router = useRouter();
  const detailPage = (book_id:number)=>{
    router.push(`books/${book_id}`);
  } 

  // Function to toggle the favorite state
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const onBorrowing = async () => {
    const supabase = await createSupabaseAdmin();
    try {

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        alert("Please login first");
        return;
      }
    setIsBorrowing(true)
      const memberId = session.user.id;
      const status = 1;
      await requestBorrow(book.book_id,memberId,status);
      toast.success("Your Borrow Request is sending...")
    } catch (error) {
      toast.error("You can't borrow this book.")
      console.error("Failed to borrow:", error);
    }
  };
  

  return (
    <div className="group flex flex-col w-full max-w-160">
      {/* Book Cover with Hover Effect */}
      <button onClick={()=>detailPage(book.book_id)}>
      <div className="relative w-full overflow-hidden rounded-md shadow-md bg-white transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
        <div className="relative w-full h-0 pb-[150%]">
          <Image
            src={book.book_image || "/placeholder-book.png"}
            alt={`${book.book_title} cover`}
            fill
            className="object-cover"
            sizes="(max-width: 160px) 100vw, 160px"
          />
        </div>
      </div>

      {/* Book Info */}
      <div className="mt-3 text-center">
        <h3 className="text-sm font-semibold text-gray-900 truncate">
          {book.book_title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate">{book.author.first_name} {book.author.last_name}</p>
      </div>
      </button>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 justify-center">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            isFavorited
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {isFavorited ? "Favorited ❤️" : "Favorite 🤍"}
        </button>

        {/* Borrow Button */}
        <button
      onClick={onBorrowing}
      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
        book.book_total > 0
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={book.book_total <= 0 || isBorrowing}
    >
      {isBorrowing
        ? "Borrowing Request..."
        : book.book_total > 0
        ? "Borrow"
        : "Unavailable"}
    </button>
      </div>
    </div>
  );
}