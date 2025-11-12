import { createSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const supabase = await createSupabaseAdmin();

  const { data: members, error } = await supabase.from("member").select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(members), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
