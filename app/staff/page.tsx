"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type CountData = {
  pending: number;
  borrowed: number;
  returned: number;
  overdue: number;
};

export default function DashboardPage() {
  const [counts, setCounts] = useState<CountData>({
    pending: 0,
    borrowed: 0,
    returned: 0,
    overdue: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const { data, error } = await supabase
        .from("book_request")
        .select("request_status_id, created_at");

      // 🔍 Better error message
      if (error) {
        console.error("❌ Supabase fetch error:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        return;
      }

      // ⚠️ No data case
      if (!data) {
        console.warn("⚠️ No data returned from Supabase query.");
        return;
      }

      // ✅ Count categories
      const pending = data.filter((r) => r.request_status_id === 1).length;
      const borrowed = data.filter((r) => r.request_status_id === 2).length;
      const returned = data.filter((r) => r.request_status_id === 3).length;
      const overdue = data.filter((r) => {
        const due = new Date(r.created_at);
        due.setDate(due.getDate() + 7);
        return due < new Date() && r.request_status_id === 2;
      }).length;

      setCounts({ pending, borrowed, returned, overdue });
    } catch (err) {
      console.error("💥 Unexpected runtime error:", err);
    }
  };

  // 📊 Static chart data (simple Tailwind bar chart)
  const chartData = [
    { label: "Pending", color: "bg-yellow-400", value: counts.pending },
    { label: "Borrowed", color: "bg-green-500", value: counts.borrowed },
    { label: "Returned", color: "bg-blue-500", value: counts.returned },
    { label: "Overdue", color: "bg-red-500", value: counts.overdue },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard Overview</h1>

      {/* 📦 Statistic cards */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600 font-medium">Pending</p>
          <h2 className="text-2xl font-semibold text-yellow-600 mt-1">{counts.pending}</h2>
        </div>
        <div className="bg-green-800 text-white p-4 rounded shadow text-center">
          <p>Borrowed Books</p>
          <h2 className="text-2xl font-semibold mt-1">{counts.borrowed}</h2>
        </div>
        <div className="bg-blue-800 text-white p-4 rounded shadow text-center">
          <p>Returned Books</p>
          <h2 className="text-2xl font-semibold mt-1">{counts.returned}</h2>
        </div>
        <div className="bg-red-700 text-white p-4 rounded shadow text-center">
          <p>Overdue</p>
          <h2 className="text-2xl font-semibold mt-1">{counts.overdue}</h2>
        </div>
      </div>

      {/* 📈 Static Bar Diagram */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">📈 Check-out Statistics</h2>

        <div className="flex items-end h-60 gap-6 justify-around">
          {chartData.map((item) => (
            <div key={item.label} className="flex flex-col items-center w-20">
              <div
                className={`w-full ${item.color} rounded-t-md transition-all duration-300`}
                style={{
                  height: `${(item.value || 0) * 20}px`,
                  minHeight: "10px",
                }}
              ></div>
              <p className="mt-2 text-sm font-medium text-gray-600">{item.label}</p>
              <p className="text-xs text-gray-500">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
