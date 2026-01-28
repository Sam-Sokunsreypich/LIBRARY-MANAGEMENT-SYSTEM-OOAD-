"use server";

import { createSupabaseAdmin } from "@/lib/supabase";

export async function getCategoriesAndSubcategories(){
    const supabase = await createSupabaseAdmin();

    //Fetch all categories
    const { data: categories, error: categyError } = await supabase
    .from("category")
    .select("*");

    if(categyError){
        throw new Error("Failed to fetch categories");
    }

    //Fetch all subcategories
    const { data: subcategories, error: subcatagoryError } = await supabase
    .from("subcategory")
    .select("*");

    if(subcatagoryError){
        throw new Error("Failed to fetch subcategories");
    }

    return { categories, subcategories};
}