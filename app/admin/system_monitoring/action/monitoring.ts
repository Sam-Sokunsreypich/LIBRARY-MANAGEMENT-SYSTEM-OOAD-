"use server";

import { createSupabaseAdmin } from "@/lib/supabase";
import { BookRequestType } from "@/types/BookRequestType";

export async function getMonitoring(): Promise<BookRequestType[]> {
  const supabase = await createSupabaseAdmin();

  const { data, error } = await supabase
    .from("book_request")
    .select(`
      id,
      created_at,
      took_book,
      book_issue,
      fine,
      member:member_id (
        id,
        email,
        name
      ),
      books:book_id (
        id,
        book_title
      ),
      request_status:request_status_id (
        id,
        status_name
      )
    `);

  if (error) {
    console.error("Error fetching monitoring data:", error);
    throw error;
  }

  const formatted: BookRequestType[] = (data ?? []).map((item: any) => ({
    ...item,
    request_status: Array.isArray(item.request_status)
      ? item.request_status[0] || null
      : item.request_status,
  }));

  return formatted;
}
