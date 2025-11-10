"use server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";


interface Member{
    id: string;
    name: string;
    email: string;
    created_at: string;
}

interface Permissions{
    member_id: string;
    role: "admin" | "user" | "staff" | "unknown";
    status: "active" | "resigned" | "unknown";
}

interface CombinedMember extends Member{
    role: string;
    status: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); 
}


async function fetchData(){
    const supabase = await createSupabaseAdmin();

    // 1. Fetch all Members
    const { data: members, error: memberError } = await supabase
    .from("member")
    .select("id, name, created_at, email");

    if(memberError){
        console.error("Error fetching members: ", memberError.message);
        throw new Error("Failed to fetch members");
    }

    // 2. Fetch all Permissions
    const { data: permissions, error: permissionError } = await supabase
    .from("permission")
    .select("member_id, role, status");

    if(permissionError){
        console.error("Error fetching permissions: ", permissionError.message);
        throw new Error("Failed to fetch permissions");
    }
    return {members, permissions};
}

function combineByRole(
    members: Member[], 
    permissions: Permissions[], 
    roleFilter:string){
    return members
    .map(member => {
        const permission = permissions.find(
            p => p.member_id === member.id && p.role === roleFilter
        );

        return {
            ...member,
            created_at: formatDate(member.created_at),
            role: permission?.role || "unknown",
            status: permission?.status || "unknown",

        };
    })
    .filter(member => member.role === roleFilter);
}


// User List
export async function UserLists(): Promise<CombinedMember[]>{
    const {members, permissions} = await fetchData();
    return combineByRole(members, permissions, "user");
}

//Admin List
export async function AdminLists(): Promise<CombinedMember[]> {
    const { members, permissions } = await fetchData();
    return combineByRole(members, permissions, "admin");
}

//Staff List
export async function StaffLists(): Promise<CombinedMember[]> {
    const { members, permissions } = await fetchData();
    return combineByRole(members, permissions, "staff");
}