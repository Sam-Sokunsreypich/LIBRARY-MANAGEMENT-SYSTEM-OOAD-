import { getCategoriesAndSubcategories } from "@/app/admin/books/actions/getCategoriesandSubCategories";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const { categories, subcategories } = await getCategoriesAndSubcategories();
        return NextResponse.json({categories, subcategories});
    }catch(error: any){
        console.error(error);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}