"use server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { Books } from "@/lib/types/booktype";

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
        id: book.book_id,
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