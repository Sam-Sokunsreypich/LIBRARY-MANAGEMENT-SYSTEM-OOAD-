// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
// import StatCard from "@/components/StatCard";
import RecentActivityTable from "../components/RecentActivityTable";
import StatCard from "../components/StatCard";
// import BorrowingChart from "@/components/BorrowingChart";
// import TopBooksChart from "@/components/TopBooksChart";
// import RecentActivityTable from "@/components/RecentActivityTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    booksIssued: 0,
    members: 0,
    overdue: 0,
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Example: adjust to your real Supabase table names
      const { count: totalBooks } = await supabase
        .from("books")
        .select("*", { count: "exact", head: true });
      const { count: members } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true });
      const { count: booksIssued } = await supabase
        .from("issued_books")
        .select("*", { count: "exact", head: true });
      const { count: overdue } = await supabase
        .from("issued_books")
        .eq("status", "overdue")
        .select("*", { count: "exact", head: true });

      // Fetch recent activity (example: from transactions or logs table)
      const { data: activity } = await supabase
        .from("activity_log")
        .select("user, action, date")
        .order("date", { ascending: false })
        .limit(5);

      setStats({
        totalBooks: totalBooks ?? 0,
        booksIssued: booksIssued ?? 0,
        members: members ?? 0,
        overdue: overdue ?? 0,
      });
      setRecentActivity(activity ?? []);
    }

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-700" />
          <div>
            <h2 className="text-xl font-semibold">Welcome Back!</h2>
            <p className="text-sm text-gray-500">Library Admin Dashboard</p>
          </div>
        </div>

        <div className="w-1/3">
          <input
            placeholder="Search..."
            className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Books" value={stats.totalBooks.toString()} />
        <StatCard title="Books issued" value={stats.booksIssued.toString()} />
        <StatCard title="Members" value={stats.members.toString()} />
        <StatCard title="Overdue" value={stats.overdue.toString()} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-4">Borrowing Trends</h3>
          <BorrowingChart />
        </div>

        <div className="bg-white border rounded p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold mb-4">Top Borrowed Books</h3>
            <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded">
              + Add Book
            </button>
          </div>
          <TopBooksChart />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border rounded p-6">
        <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
        <RecentActivityTable rows={recentActivity} />
      </div>
    </div>
  );
}
