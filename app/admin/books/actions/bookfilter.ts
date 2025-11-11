"use server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function filterBooks(categoryId: string, subcategoryId: string) {
    const supabase = await createSupabaseAdmin();
    
    let query = supabase
        .from("books")
        .select("*");

    if (categoryId && categoryId !== "") {
        query = query.eq("category_id", categoryId);
    }

    if (subcategoryId && subcategoryId !== "") {
        query = query.eq("subcategory_id", subcategoryId);
    }
    
    const { data: books, error } = await query;

    if (error) {
        console.error("Supabase Error:", error);
        return { 
            books: null, 
            error: { 
                message: error.message || "An unknown database error occurred.",
            } 
        }; 
    }

    return { books, error: null };
}