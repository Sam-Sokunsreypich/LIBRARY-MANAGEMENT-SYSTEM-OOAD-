"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOut from "./SignOut";

export default function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/staff/dashboard", label: "Dashboard" },
    { href: "/staff/borrow_requests", label: "Borrow Requests" },
    { href: "/staff/book_return", label: " Book Return" },
    { href: "/staff/overdue", label: " Overdue" },
    { href: "/staff/fine_payment", label: " Fine & Payment" },
    { href: "/staff/profile", label: " Profile" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm ">
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
        <div className="mt-80">
          <SignOut />
        </div>
      </nav>
    </aside>
  );
}
