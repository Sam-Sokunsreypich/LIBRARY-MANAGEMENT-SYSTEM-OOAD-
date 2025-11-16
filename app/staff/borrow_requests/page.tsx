"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "@/lib/supabase";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";
import BookRequestCard from "@/components/book_request/BookRequestCard";


export default function BorrowRequestsPage() {
 
  const [requests, setRequest] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  // const [took, setTook] = useState<BookRequestType[]>([])
  
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

  // useEffect( ()=>{
  //   async function fetchRequests() {
  //     try {
  //       const res = await getMonitoring();
        
  //       setRequest(res.filter((r)=>r.request_status.status_name === "APPROVE" && r.took_book === false));
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchRequests();
  // }, []);

console.log('requests', requests)
  return (
    <div>
      <h1 className="text-2xl font-bold">Borrow Requests</h1>

      {requests.length === 0 && (
        <p className="text-gray-500">No borrow requests found.</p>
      )}

<div className='mt-10 w-full grid grid-cols-1 gap-3'>
        {requests.map((request) => (
        <BookRequestCard
          key={request.id}
          borrowRequest={request}
        />
      ))}
      </div>
    </div>
  );
}
