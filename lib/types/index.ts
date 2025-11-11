export type Member = {
    memberId: string;
    name: string;
    email: string;
    created_at: string;
}

export type Permission = {
    permissionId: string;
    role: "user" | "staff" | "admin";
    status: "active" | "resigned";
    member: Member;
}
