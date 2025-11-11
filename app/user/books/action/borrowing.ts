"use server"
import { createSupabaseAdmin } from "@/lib/supabase";


export async function requestBorrow(book_id: number,member_id:string,request_status_id:number) {
    const supabase = await createSupabaseAdmin()

    try{
        const res = supabase
        .from("book_request")
        .insert([{
            book_id: book_id,
            member_id: member_id,
            request_status_id: request_status_id,
        }])
        .select(); 
       
        return res;
    }catch(error){
        console.log('error:', error)
    }
}