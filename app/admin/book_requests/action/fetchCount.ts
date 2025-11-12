"use server";

import { createSupabaseAdmin } from "@/lib/supabase";

export async function fetchCounts() {
  const supabase = await createSupabaseAdmin();


  const { data, error } = await supabase
    .from("book_request")
    .select("request_status_id, end_date");

  if (error) throw error;

    if (!data || data.length === 0) {
      console.warn("⚠️ No data returned from Supabase query.");
      return { pending: 0, borrowed: 0, returned: 0, overdue: 0 };
    }

    const today = new Date();

    const pending = data.filter(r => r.request_status_id === 1).length;
    const borrowed = data.filter(r => r.request_status_id === 2).length;
    const returned = data.filter(r => r.request_status_id === 4).length;
    const overdue = data.filter(r =>
      r.end_date ? new Date(r.end_date) < today : false
    ).length;

    // ✅ Return counts (not setCounts)
    return { pending, borrowed, returned, overdue };
}

export async function getDate() {
    const supabase = await createSupabaseAdmin();
  
    const { data, error } = await supabase
      .from("book_request")
      .select("start_date");
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  
    return new Response(JSON.stringify(data));
  }
