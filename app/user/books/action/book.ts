"use server";

import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";
import { Book } from "@/types/Book";
import { getMemberId } from "./getMemberId";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";
import { BookRequestType } from "@/types/BookRequestType";


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


export async function getBorrowById(): Promise<BookRequestType[]> {
  try {
    const memberId = await getMemberId();
    console.log('Member ID:', memberId);

    const allBooks = await getMonitoring();

    // Filter for this member
    const myBooks = allBooks.filter(
      (book: BookRequestType) => book.member.id === memberId
    );

    return myBooks;
  } catch (error) {
    console.error('Error fetching borrow data:', error);
    throw new Error('Failed to get borrow data');
  }
}