"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import FineTable from "../components/FineTable";

// ✅ Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface FineRecord {
  id: number;
  user: string;
  bookTitle: string;
  issue: string;
  amount: number;
  isPaid: boolean;
}

export default function FinePaymentPage() {
  const [fines, setFines] = useState<FineRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all fines on mount
  useEffect(() => {
    fetchFines();
  }, []);

  // 🧩 Fetch fines from Supabase
  const fetchFines = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("book_request")
      .select(`
        id,
        fine: fine (fine, title),
        member: member_id (name),
        book: book_id (book_title),
        request_status_id,
        book_issue,
        took_book
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error("❌ Error fetching fines:", error);
      setLoading(false);
      return;
    }

    // 🧠 Transform data to frontend-friendly format
    const formatted = data.map((r: any) => {
      const isPaid = r.request_status_id === 4 || r.took_book === true; // Example condition (you can adjust)
      return {
        id: r.id,
        user: r.member?.name || "Unknown",
        bookTitle: r.book?.book_title || "Untitled",
        issue: r.book_issue ? "Book Damage" : r.fine?.title || "Overdue",
        amount: r.fine?.fine || 0,
        isPaid,
      };
    });

    setFines(formatted);
    setLoading(false);
  };

  // 💳 Handle Payment (update isPaid)
  const handlePayment = async (id: number) => {
    const { error } = await supabase
      .from("book_request")
      .update({ request_status_id: 4 }) // Example: 4 = Paid
      .eq("id", id);

    if (error) {
      console.error("❌ Error updating payment:", error);
      return;
    }

    // Update local state for instant feedback
    setFines((prev) =>
      prev.map((f) => (f.id === id ? { ...f, isPaid: true } : f))
    );
  };

  if (loading) return <p className="text-gray-500">Loading fine data...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Fine & Payment Management</h1>
      <FineTable fines={fines} onPay={handlePayment} />
    </div>
  );
}
