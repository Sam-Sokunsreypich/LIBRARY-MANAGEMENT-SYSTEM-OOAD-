"use client";
import { useEffect, useState } from "react";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";
import BookRequestCard from "@/components/book_request/BookRequestCard";
import BookTookCard from "@/components/book_request/BookTookCard";

export default function BorrowRequestsPage() {
  const [requests, setRequests] = useState<BookRequestType[]>([]);
  const [took_book, setTookBooks] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
                // 🟡 Separate by status
         const pending = res.filter(
          (r) => r?.request_status?.status_name === "PENDING"
        );
        const approved = res.filter(
          (r) => r?.request_status?.status_name === "APPROVED"
        );
        setRequests(pending);
        setTookBooks(approved);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-10">
      {/* 🟡 Borrow Requests (Pending) */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Borrow Requests</h1>
        <hr className="my-4" />
        {!requests || requests.length === 0 ? (
          <p className="text-gray-500">No borrow requests found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {requests
                .filter((r) => r && r.id)
                .map((request) => (
                  <BookRequestCard key={request.id} borrowRequest={request} />
                ))
              }
          </div>
        )}
      </section>

      {/* 🟢 Took Books (Approved) */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Took Books</h1>
        <hr className="my-4" />
        {took_book.length === 0 ? (
          <p className="text-gray-500">No took books found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {took_book.map((book) => (
              <BookTookCard
                key={book.id}
                request={book}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
