"use server"

import { createSupabaseAdmin } from "@/lib/supabase"
import { BookRequestType } from "@/types/BookRequestType"

export async function rejectRequest(
  id: number,
  data: { reject_reason: string }
) {
  const supabase = await createSupabaseAdmin()

  const { error } = await supabase
    .from("book_request")
    .update({
      reject_reason: data.reject_reason,
      request_status_id: 3,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating reason:", error.message)
    throw new Error("Failed to reject request")
  }

  // ✅ Return plain JSON
  return { message: "Reject updated successfully!" }
}

export async function approveRequest(id: number,
  data:{
    start_date: string,
    end_date: string,
  }) {
  const supabase = await createSupabaseAdmin()

  const { error } = await supabase
    .from("book_request")
    .update({
      request_status_id: 2,
      took_book: "false",
      start_date: data.start_date,
      end_date: data.end_date
    })
    .eq("id",id)

  if (error) {
    console.error("Error approving request:", error.message)
    throw new Error("Failed to approve request")
  }

  // ✅ Return plain JSON
  return { message: "Approved successfully!" }
}
