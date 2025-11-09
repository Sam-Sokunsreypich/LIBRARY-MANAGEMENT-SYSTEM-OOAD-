"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Role {
    id: string;
    label: string;
}

interface RoleSelectorProps {
    roles: Role[];
    currentRole: string;
}

export default function RoleSelector({ roles, currentRole }: RoleSelectorProps) {
    const pathname = usePathname();

    return (
        <>
            {roles.map((role) => (
                <Link
                    key={role.id}
                    // Construct the new URL with the selected role as a search parameter
                    href={`${pathname}?role=${role.id}`}
                    scroll={false} // Prevent scroll to top on navigation
                    className={`cursor-pointer rounded-lg px-6 py-4 shadow-md transition-all duration-200
                        ${role.id === currentRole ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                >
                    {role.label}
                </Link>
            ))}
        </>
    );
}