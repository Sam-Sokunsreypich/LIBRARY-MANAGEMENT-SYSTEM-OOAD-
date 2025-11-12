"use server";
import { createSupabaseAdmin } from "@/lib/supabase";

export async function getFacultyAndDepartment(){
    const supabase = await createSupabaseAdmin();

    const { data: faculties, error: facultyError } = await supabase
    .from("faculty")
    .select("*");

    if(facultyError)
    {
        throw new Error("Failed to fetch Faculty", facultyError);
    }

    const { data: departments, error: departmentError} = await supabase
    .from("department")
    .select("*");

    if(departmentError)
    {
        throw new Error("Failed to fetch departments", departmentError);
    }

    return { faculties, departments};
}