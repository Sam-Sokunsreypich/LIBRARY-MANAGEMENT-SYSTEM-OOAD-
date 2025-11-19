"use client";
import { useEffect, useState } from "react";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";
import TableBookReturn from "@/components/book_return/TableBookReturn";

export default function ReturnBookPage() {

  const [request, setRequest] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  
  useEffect( ()=>{
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
        setRequest(res.filter((r)=>r.request_status.status_name === "RETURNED"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  console.log('request', request)
  return (
      <div className=' mb-20 w-full '>
          <h2 className='text-gray-800 font-bold text-3xl '>System Monitoring</h2> 
          <TableBookReturn requests={request}/>
        </div>
  );
}
