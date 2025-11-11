"use client";
import { useEffect, useState } from "react";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";
import TableBookReturn from "@/components/book_return/TableBookReturn";

export default function ReturnBookPage() {

  const [request, setRequest] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
        const today = new Date();
  
        const overdueRequests = res.filter(r => {
          if (!r.end_date) return false;
          return new Date(r.end_date) < today;
        });
  
        setRequest(overdueRequests);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchRequests();
  }, []);
  
  
  return (
      <div className=' mb-20 w-full '>
          <h2 className='text-gray-800 font-bold text-3xl '>System Monitoring</h2> 
          <TableBookReturn requests={request}/>
        </div>
  );
}
