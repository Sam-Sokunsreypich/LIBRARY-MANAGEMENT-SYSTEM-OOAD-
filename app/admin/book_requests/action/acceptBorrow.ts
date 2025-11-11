"use server"

import { createSupabaseAdmin } from "@/lib/supabase"

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

export async function approveRequest(id: number) {
  const supabase = await createSupabaseAdmin()

  const { error } = await supabase
    .from("book_request")
    .update({
      request_status_id: 2,
      took_book: "false",
    })
    .eq("id", id)

  if (error) {
    console.error("Error approving request:", error.message)
    throw new Error("Failed to approve request")
  }

  // ✅ Return plain JSON
  return { message: "Approved successfully!" }
}
