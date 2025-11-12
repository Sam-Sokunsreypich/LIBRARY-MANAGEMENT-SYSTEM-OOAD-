"use client";
import { ReactNode, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import NotificationBell from "./components/NotificationBell";
import SideNav from "./components/SideNav";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function StaffLayout({ children }: { children: ReactNode }) {
  const [staffName, setStaffName] = useState("Staff");
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    fetchStaffName();
    fetchNotifications();
  }, []);

  const fetchStaffName = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("member")
      .select("name")
      .eq("id", user.id)
      .single();
    if (data?.name) setStaffName(data.name);
  };

  const fetchNotifications = async () => {
    const { count } = await supabase
      .from("book_request")
      .select("*", { count: "exact", head: true })
      .eq("request_status_id", 1);
    setNotifications(count || 0);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SideNav />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        {/* <header className="flex justify-between items-center bg-orange-500 px-6 py-3 border-b">
          <h1 className="text-xl font-bold text-white">
            Welcome , {staffName}
          </h1>
          <div className="flex items-center gap-4">
            <NotificationBell count={notifications} />
            <Link
              href="/staff/profile"
              className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
            >
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {staffName.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">Profile</span>
            </Link>
          </div>
        </header> */}

        {/* Page Content */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
