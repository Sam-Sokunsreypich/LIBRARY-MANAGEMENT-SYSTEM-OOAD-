"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/staff/dashboard", label: "📊 Dashboard" },
    { href: "/staff/borrow_requests", label: "📘 Borrow Requests" },
    { href: "/staff/book_return", label: "📦 Book Return" },
    { href: "/staff/overdue", label: "⏰ Overdue" },
    { href: "/staff/fine_payment", label: "💰 Fine & Payment" },
    { href: "/staff/profile", label: "👤 Profile" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">📚 Staff Panel</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded transition ${
              pathname === item.href
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
