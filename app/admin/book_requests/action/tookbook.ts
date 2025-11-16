"use server"

import { createSupabaseAdmin } from "@/lib/supabase";

export async function took_book(
  id: number,
  data: {
    start_date: string;
    end_date: string;
  }
) {
  const supabase = await createSupabaseAdmin();

  const { error } = await supabase
    .from("book_request")  // ✅ correct table
    .update({
      request_status_id: 2,   // APPROVED / TOOK
      took_book: true,        // boolean NOT string
      start_date: data.start_date,
      end_date: data.end_date,
    })
    .eq("id", id);

  if (error) {
    console.error("Error Took books:", error.message);
    throw new Error("Failed to took books");
  }

  return { message: "Book marked as taken" };
}
