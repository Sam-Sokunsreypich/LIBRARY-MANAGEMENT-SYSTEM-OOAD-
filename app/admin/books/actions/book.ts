"use server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { Books } from "@/lib/types/booktype";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export async function createBooks({book}: {book: Books}){
    const supabase = await createSupabaseAdmin();

    //1. Insert Author Info
    const { data: authorData, error: authorError} = await supabase
    .from("author")
    .insert({
        first_name: book.author.author_first_name,
        last_name: book.author.author_last_name,
    })
    .select("author_id")
    .single();

    if(authorError){
        console.error("Failed to insert author", authorError);
        return JSON.stringify(authorError);
    }

    const authorId = authorData?.author_id;

    if(!authorId){
        console.error("Author ID not returned");
        return JSON.stringify({ error: "Author ID not returned"});
    }

    //2. Insert the book with the returned author_id
    const { data: bookData, error: bookError} = await supabase
    .from("books")
    .insert({
        book_id: book.book_id,
        book_title: book.book_title,
        book_image: book.book_image,
        publication_year: book.publication_year,
        book_total: book.book_total,
        book_location: book.book_location,
        book_description: book.book_description,
        category_id: book.category_id,
        subcategory_id: book.subcategory_id,
        author_id: authorId,
    });

    if(bookError){
        console.error("Failed to insert book: ", bookError);
        return JSON.stringify(bookError);
    }

    console.log("Uploaded Successfully");
    return JSON.stringify(bookData);
}


//Fetch Book Info
export async function fetchBookInfo(){
  const supabase = await createSupabaseAdmin();

  const {data: bookData, error: bookError} = await supabase
  .from("books")
  .select("*");

  if(bookError){
    console.error("Failed to fetch Books", bookError);
    return JSON.stringify(bookError);
  }
  
  const {data: authorData, error: authorError} = await supabase
  .from("author")
  .select("*");

  if(authorError){
    console.error("Failed to fetch author Info", authorError);
    return JSON.stringify(authorError);
  }

  return {bookData, authorData};
}

//Update Book Info
export async function updateBookInfo(
  book_id: string,
  data: {
    book_id: string;
    book_title: string,
    book_image: string,
    publication_year: string,
    book_total: number,
    book_location: string,
    book_description: string,
    category_id: string,
    subcategory_id: string,
  }
){
  const supabase = await createSupabaseAdmin();


    const parsedData = {
    ...data,
    category_id: isNaN(Number(data.category_id)) ? data.category_id : Number(data.category_id),
    subcategory_id: isNaN(Number(data.subcategory_id)) ? data.subcategory_id : Number(data.subcategory_id),
  };

  const { error } = await supabase
  .from("books")
  .update({
    book_id: data.book_id,
    book_title: data.book_title,
    book_image: data.book_image,
    publication_year: data.publication_year,
    book_total: data.book_total,
    book_location: data.book_location,
    book_description: data.book_description,
    category_id: data.category_id,
    subcategory_id: data.subcategory_id,
  })
  .eq("book_id", book_id);

  if(error){
    console.error("Failed to upload book info", error.message);
    return JSON.stringify({error});
  }

  revalidatePath("/admin/books");
  return JSON.stringify({success: true});
}

// Delete Books
export async function deleteBookInfo({book}: {book: Books}){
    const supabase = await createSupabaseAdmin();

    if (!book?.book_id) {
    console.error("❌ Missing book_id — cannot delete.");
    return JSON.stringify({ error: "Missing book_id — cannot delete record" });
    }

    const {data: deleteBook, error: bookError} = await supabase
    .from("books")
    .delete()
    .eq("book_id", book.book_id)
    .select()
    .single();

    if(bookError){
        console.log("Failed to delete book: ", bookError);
        return JSON.stringify(bookError);
    }

    console.log("Book deleted successfully");
    revalidatePath("/admin/books")
    return JSON.stringify(deleteBook);
}
