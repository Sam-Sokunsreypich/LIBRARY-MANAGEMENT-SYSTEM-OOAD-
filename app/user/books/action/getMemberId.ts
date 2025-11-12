// utils/getMemberId.ts

import { createSupabaseServerClient } from "@/lib/supabase";

export async function getMemberId() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null; // Not logged in
  }

  return session.user.id;
}


