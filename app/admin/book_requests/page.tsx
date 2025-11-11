"use client"
import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { getMonitoring } from "../system_monitoring/action/monitoring";
import { BookRequestType } from "@/types/BookRequestType";
import BookRequestCard from "@/components/book_request/BookRequestCard";


export default function page() {

  const [request, setRequest] = useState<BookRequestType[]>([]);
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


  return (
    <div className=' min-h-screen w-full'>
        <div className='ml-64 mb-20 mr-10'>
        <div >
          <h2 className='text-gray-800 font-bold text-3xl '>Management Book Request</h2> 

        </div>
        <div className='mt-20 w-full grid grid-cols-2 gap-3'>
        {request.map((request) => (
        <BookRequestCard
          key={request.id}
          borrowRequest={request}
        />
      ))}
      </div>
        </div>

    </div>
  )
}
