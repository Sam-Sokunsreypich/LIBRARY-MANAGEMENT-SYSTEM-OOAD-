"use client";
import { fetchMembersByRole } from "./fetchMembersByRole";
export async function getMembers(role: string){
    return await fetchMembersByRole(role);
}