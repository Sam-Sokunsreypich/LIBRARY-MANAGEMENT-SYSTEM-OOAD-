"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "@/lib/supabase";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";

// ✅ Supabase client setup
// const supabase = await createSupabaseAdmin()

// interface BorrowRequest {
//   id: number;
//   user: string;
//   book: string;
//   date: string;
//   status: string;
// }

export default function BorrowRequestsPage() {
  // const [requests, setRequests] = useState<BookRequestType[]>([]);
  // const [loading, setLoading] = useState(true);

  // // 🔄 Fetch data from Supabase when page loads
  // useEffect(() => {
  //   fetchBorrowRequests();
  // }, []);

  // const fetchBorrowRequests = async () => {
  //   setLoading(true);

  //   const { data, error } = await supabase
  //     .from("book_request")
  //     .select(`
  //       id,
  //       created_at,
  //       member:member_id(name),
  //       book:book_id(book_title),
  //       request_status:request_status_id(status_name)
  //     `)
  //     .order("created_at", { ascending: false });

  //   if (error) {
  //     console.error("❌ Error fetching borrow requests:", error);
  //     setLoading(false);
  //     return;
  //   }

  //   // 🧠 Transform raw data into frontend-friendly format
  //   const transformed = data.map((r: any) => ({
  //     id: r.id,
  //     user: r.member?.name || "Unknown",
  //     book: r.book?.book_title || "Untitled",
  //     date: new Date(r.created_at).toLocaleDateString("en-US", {
  //       month: "short",
  //       day: "numeric",
  //     }),
  //     status: r.request_status?.status_name || "Pending",
  //   }));

  //   setRequests(transformed);
  //   setLoading(false);
  // };

  const [requests, setRequest] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  
  useEffect( ()=>{
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
        
        setRequest(res.filter((r)=>r.request_status.status_name === "PENDING"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  // ✅ Handle Approve/Reject Actions
  // const handleApprove = async (id: number) => {
  //   const { error } = await supabase
  //     .from("book_request")
  //     .update({ request_status_id: 2 }) // assuming 2 = approved
  //     .eq("id", id);
  //   if (error) console.error("Error approving request:", error);
  //   else fetchBorrowRequests(); // refresh data
  // };

  // const handleReject = async (id: number) => {
  //   const { error } = await supabase
  //     .from("book_request")
  //     .update({ request_status_id: 3 }) // assuming 3 = rejected
  //     .eq("id", id);
  //   if (error) console.error("Error rejecting request:", error);
  //   else fetchBorrowRequests();
  // };

  if (loading) return <p className="text-gray-500">Loading borrow requests...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Borrow Requests</h1>

      {requests.length === 0 && (
        <p className="text-gray-500">No borrow requests found.</p>
      )}

      {requests.map((r) => (
        <div
          key={r.id}
          className="bg-white border rounded-lg p-4 flex justify-between mb-4 shadow-sm hover:shadow-md transition"
        >
          <div>
            <h2 className="font-semibold">{r.book}</h2>
            <p className="text-sm text-gray-500">Requested by {r.user}</p>
            <p className="text-sm text-gray-500">Requested on {r.date}</p>
          </div>

          <div className="flex gap-2 items-center">
            <p
              className={`text-sm font-semibold ${
                r.status === "Pending"
                  ? "text-yellow-600"
                  : r.status === "Approved"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {r.status}
            </p>

            {r.status === "Pending" && (
              <>
                <button
                  onClick={() => handleApprove(r.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(r.id)}
                  className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-200"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
