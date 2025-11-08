"use server";
import { UserLists, AdminLists, StaffLists } from "./members";

export async function fetchMembersByRole(role: string){
    switch(role){
        case "user":
            return await UserLists();
        case "staff":
            return await StaffLists();
        case "admin":
            return await AdminLists();
        default:
            return[];
    }
}