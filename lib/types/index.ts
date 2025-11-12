// types.ts

export type Member = {
    id: string;
    identity: string; 
    profile_image: string;
    name: string;
    email: string;
    password: string;
    faculty_id: string;
    department_id: string;
    description: string;
}

export type Permission = {
    permission_id: string;
    role: "user" | "staff" | "admin";
    status: "active" | "resigned";
    member_id: string;
    member: Member;
}