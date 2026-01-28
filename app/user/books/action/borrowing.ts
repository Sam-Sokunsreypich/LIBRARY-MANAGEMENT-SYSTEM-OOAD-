
"use server"
import { createSupabaseAdmin } from "@/lib/supabase";
import { getMemberId } from "./getMemberId";

export async function requestBorrow(book_id: number, request_status_id: number) {
  const supabaseAdmin = await createSupabaseAdmin();
  const memberId = await getMemberId();
console.log('memberId', memberId)
  if (!memberId) {
    return { success: false, message: "Not logged in" };
  }

  const { data, error } = await supabaseAdmin
    .from("book_request")
    .insert([{ book_id, member_id: memberId, request_status_id }])
    .select();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

