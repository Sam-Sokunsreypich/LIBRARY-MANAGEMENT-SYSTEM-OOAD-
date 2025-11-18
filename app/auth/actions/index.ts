"use server";

import { createSupabaseServerClient, createSupbaseServerClientReadOnly } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function loginWithEmailAndPassword(data: {
    email: string;
    password: string;
}){
    const supabase = await createSupabaseServerClient();

    const result = await supabase.auth.signInWithPassword(data);
    return JSON.stringify(result);
}

export async function getUserLoggedInInfo(){
    const supabase = await createSupbaseServerClientReadOnly();

    const {data: {user}, error} = await supabase.auth.getUser();

    if(error){
        console.error("Error fetching user: ", error.message);
        return null;
    }

    if(!user) return null;

    console.log("Auth User: ", user);

    return {
        id: user.id,
        profile_image: user.user_metadata?.profile_image,
        name: user.user_metadata?.display_name,
        email: user.user_metadata?.email,
    };
}
export async function logout(){
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    redirect("/auth");
}