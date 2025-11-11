"use server";

import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";
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
      rules: fine_id(
        id,
        title,
        fine
      ),
      member:member_id (
        id,
        email,
        name
      ),
      books:book_id (
        book_id,
        book_title,
        book_image
      ),
      request_status:request_status_id (
        id,
        status_name
      ),
      start_date,
      end_date,
      pay_fine
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

// export async function getStaffMonitoring(): Promise<BookRequestType[]> {
//   const supabase = await createSupabaseServerClient();
  
//   // Verify authentication
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) {
//     throw new Error("Not authenticated");
//   }

//   // FIXED: Check user role properly
//   // Option 1: Check user metadata for role
//   const userRole = session.user?.user_metadata?.role;
//   if (userRole !== 'staff') {
//     throw new Error("Access denied. Staff role required.");
//   }

//   // Option 2: Check permission table (more secure)
//   const { data: permission } = await supabase
//     .from('permission')
//     .select('role')
//     .eq('member_id', session.user.id)
//     .single();

//   if (!permission || permission.role !== 'staff') {
//     throw new Error("Access denied. Staff role required.");
//   }

//   const { data, error } = await supabase
//     .from("book_request")
//     .select(`
//       id,
//       created_at,
//       took_book,
//       book_issue,
//       rules:fine_id (
//         id,
//         title
//         fine 
//       ),
//       member:member_id (
//         id,
//         email,
//         name
//       ),
//       books:book_id (
//         book_id,
//         book_title,
//         book_image
//       ),
//       request_status:request_status_id (
//         id,
//         status_name
//       )
//     `)
//     .eq('request_status_id', 1);

//   if (error) {
//     console.error("Error fetching staff monitoring data:", error);
//     throw error;
//   }

//   const formatted: BookRequestType[] = (data ?? []).map((item: any) => ({
//     ...item,
//     request_status: Array.isArray(item.request_status)
//       ? item.request_status[0] || null
//       : item.request_status,
//   }));

//   return formatted;
// }