"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ✅ Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface OverdueRecord {
  id: number;
  user: string;
  bookTitle: string;
  dueDate: string;
  daysOverdue: number;
  amount: number;
}

export default function OverdueBookPage() {
  const [overdueData, setOverdueData] = useState<OverdueRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverdueBooks();
  }, []);

  // 🧩 Fetch overdue book data
  const fetchOverdueBooks = async () => {
    setLoading(true);

    // Query from book_request + join books + member
    const { data, error } = await supabase
      .from("book_request")
      .select(`
        id,
        created_at,
        request_status_id,
        took_book,
        member:member_id(name),
        book:book_id(book_title),
        fine: fine (fine)
      `);

    if (error) {
      console.error("Error fetching overdue books:", error);
      setLoading(false);
      return;
    }

    // ✅ Calculate overdue books only (assuming due = created_at + 7 days)
    const now = new Date();
    const transformed = data
      .filter((r) => {
        const dueDate = new Date(r.created_at);
        dueDate.setDate(dueDate.getDate() + 7);
        const isOverdue = dueDate < now && r.request_status_id === 2; // borrowed but not returned
        return isOverdue;
      })
      .map((r: any) => {
        const due = new Date(r.created_at);
        due.setDate(due.getDate() + 7);
        const daysOverdue = Math.max(
          0,
          Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
        );
        const fineAmount = r.fine?.fine || 0.5 * daysOverdue; // default $0.5 per day

        return {
          id: r.id,
          user: r.member?.name || "Unknown",
          bookTitle: r.book?.book_title || "Untitled",
          dueDate: due.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          daysOverdue,
          amount: fineAmount,
        };
      });

    setOverdueData(transformed);
    setLoading(false);
  };

  if (loading) {
    return <p className="text-gray-500">Loading overdue books...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overdue Books</h1>

      <div className="bg-white border rounded-md shadow-sm p-4">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b text-gray-700">
              <th className="py-2 px-3">ID</th>
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Book Title</th>
              <th className="py-2 px-3">Due Date</th>
              <th className="py-2 px-3">Days Overdue</th>
              <th className="py-2 px-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {overdueData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{item.id}</td>
                <td className="py-2 px-3">{item.user}</td>
                <td className="py-2 px-3">{item.bookTitle}</td>
                <td className="py-2 px-3">{item.dueDate}</td>
                <td className="py-2 px-3 text-red-600 font-medium">
                  {item.daysOverdue} days
                </td>
                <td className="py-2 px-3 text-gray-800 font-medium">
                  ${item.amount.toFixed(2)}
                </td>
              </tr>
            ))}

            {overdueData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-3 text-gray-400">
                  No overdue books at the moment 
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
