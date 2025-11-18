import { createSupabaseAdmin } from "@/lib/supabase";

export interface MemberProfile{
    id: string;
    profile_image:string;
}

export async function getMemberProfile(): Promise<MemberProfile[]> {
    const supabase = await createSupabaseAdmin();
  
    const { data, error } = await supabase
      .from("books")
      .select(`
        id,
        profile_image
      `);
  
    if (error) {
      console.error("Error fetching id data:", error);
      throw error;
    }
    return data || [];
  }