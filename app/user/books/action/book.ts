"use server";

import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";
import { Book } from "@/types/Book";


export async function getAllBook(): Promise<Book[]> {
  const supabase = await createSupabaseAdmin();

  const { data, error } = await supabase
    .from("books")
    .select(`
      book_id,
        book_title,
        author:author_id(
            author_id,
            first_name,
            last_name
        ),
        book_image,
        book_total,
        book_description,
        publication_year,
        subcategory_id,
        category_id, 
        created_at,
        user_id,
        book_location
    `);

  if (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
  return data || [];
}