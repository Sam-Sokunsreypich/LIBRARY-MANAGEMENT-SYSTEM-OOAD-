"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "./SignOut";
import ProfileDialog from "@/app/admin/user/components/create/LogFrom";
import { cn } from "@/lib/utils";

export default function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/staff/", label: "Dashboard" },
    { href: "/staff/borrow_requests", label: "Borrow Requests" },
    { href: "/staff/book_return", label: " Book Return" },
    { href: "/staff/overdue", label: " Overdue" },
    { href: "/staff/fine_payment", label: " Fine & Payment" },
    { href: "/staff/profile", label: " Profile" },
  ];

  return (
    <aside className={cn(
              "h-screen border-r w-64 bg-background transition-all duration-0 fixed top-0 left-0 z-20")}>
      <h2 className="text-xl font-bold mb-6 p-2  text-white bg-orange-500 text-center h-12" > Staff Panel</h2>
      <nav className="space-y-2 ">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded transition ${
              pathname === item.href
                ? "bg-yellow-300 text-black font-semibold"
                : "hover:bg-yellow-100 text-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div className=" flex mt-80 justify-end">
         <ProfileDialog/>
        </div>
      </nav>
    </aside>
  );
}
