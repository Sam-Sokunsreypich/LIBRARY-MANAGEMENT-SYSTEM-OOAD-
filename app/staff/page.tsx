"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { CountData } from "@/types/CountData";
import { getCount } from "../admin/book_requests/action/getCount";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [counts, setCounts] = useState<CountData>({
    pending: 0,
    borrowed: 0,
    returned: 0,
    overdue: 0,
  });

  useEffect(() => {
    async function loadCounts() {
      const res = await getCount();
      const data = await res.json();
      setCounts(data);
    }
    loadCounts();
  }, []);
  
  // useEffect(() => {
  //   async function fetchCounts() {
  //     try {
  //       const { data, error } = await supabase
  //         .from("book_request")
  //         .select("request_status_id, end_date");

  //       if (error) throw error;

  //       const today = new Date();

  //       const pending = data.filter(r => r.request_status_id === 1).length;
  //       const borrowed = data.filter(r => r.request_status_id === 2).length;
  //       const returned = data.filter(r => r.request_status_id === 4).length;
  //       const overdue = data.filter(r =>
  //         r.end_date ? new Date(r.end_date) < today : false
  //       ).length;

  //       setCounts({ pending, borrowed, returned, overdue });
  //     } catch (err) {
  //       console.error("❌ Error fetching counts:", err);
  //     }
  //   }

  //   fetchCounts();
  // }, []);
  console.log('counts', counts)

  const chartData = [
    { label: "Pending", color: "bg-yellow-400", value: counts.pending },
    { label: "Borrowed", color: "bg-green-500", value: counts.borrowed },
    { label: "Returned", color: "bg-blue-500", value: counts.returned },
    { label: "Overdue", color: "bg-red-500", value: counts.overdue },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Statistic cards */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <p className="text-gray-600 font-medium">Pending</p>
          <h2 className="text-2xl font-semibold text-yellow-600 mt-1">{counts.pending}</h2>
        </div>
        <div className="bg-green-800 text-white p-4 rounded-xl shadow text-center">
          <p>Borrowed Books</p>
          <h2 className="text-2xl font-semibold mt-1">{counts.borrowed}</h2>
        </div>
        <div className="bg-blue-800 text-white p-4 rounded-xl shadow text-center">
          <p>Returned Books</p>
          <h2 className="text-2xl font-semibold mt-1">{counts.returned}</h2>
        </div>
        <div className="bg-red-700 text-white p-4 rounded-xl shadow text-center">
          <p>Overdue</p>
          <h2 className="text-2xl font-semibold mt-1">{counts.overdue}</h2>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow mt-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Check-out Statistics</h2>
        <div className="flex items-end h-60 gap-6 justify-around">
          {chartData.map((item) => (
            <div key={item.label} className="flex flex-col items-center w-20">
              <div
                className={`w-full ${item.color} rounded-xl-t-md transition-all duration-300`}
                style={{
                  height: `${(item.value || 0) * 18}px`,
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
