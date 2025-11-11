"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "@/lib/supabase";

// ✅ Supabase client setup
const supabase = await createSupabaseAdmin()

interface ReturnRecord {
  id: number;
  user: string;
  book: string;
  due: string;
  returnDate: string | null;
  condition: string | null;
  status: string;
}

export default function ReturnBookPage() {
  const [records, setRecords] = useState<ReturnRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturnRecords();
  }, []);

  // 🧩 Fetch Return Book Data from Supabase
  const fetchReturnRecords = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("book_request")
      .select(`
        id,
        created_at,
        took_book,
        book_issue,
        member:member_id(name),
        book:book_id(book_title)
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error("❌ Error fetching return data:", error);
      setLoading(false);
      return;
    }

    // 🧠 Transform raw data into table-friendly format
    const transformed = data.map((r: any) => {
      const isReturned = r.request_status_id === 3 || r.took_book === true;
      const status = isReturned ? "Returned" : "Not Return";

      return {
        id: r.id,
        user: r.member?.name || "Unknown",
        book: r.book?.book_title || "Unknown",
        due: new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        returnDate: isReturned ? new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "...",
        condition: isReturned ? "Good" : "...",
        status,
      };
    });

    setRecords(transformed);
    setLoading(false);
  };

  if (loading) {
    return <p className="text-gray-500">Loading return records...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Return Management</h1>

      <table className="w-full text-sm bg-white rounded border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Book</th>
            <th className="p-2">Due</th>
            <th className="p-2">Return</th>
            <th className="p-2">Condition</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((d) => (
            <tr key={d.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{d.id}</td>
              <td className="p-2">{d.user}</td>
              <td className="p-2">{d.book}</td>
              <td className="p-2">{d.due}</td>
              <td className="p-2">{d.returnDate}</td>
              <td className="p-2">{d.condition}</td>
              <td
                className={`p-2 font-semibold ${
                  d.status === "Returned" ? "text-green-600" : "text-red-600"
                }`}
              >
                {d.status}
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center p-3 text-gray-400">
                No return records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
