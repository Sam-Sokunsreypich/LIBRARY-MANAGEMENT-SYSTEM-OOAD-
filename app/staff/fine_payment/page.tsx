"use client";
import { useEffect, useState } from "react";
import { BookRequestType } from "@/types/BookRequestType";
import { getMonitoring } from "@/app/admin/system_monitoring/action/monitoring";
import TableBookReturn from "@/components/book_return/TableBookReturn";

export default function ReturnBookPage() {

  const [requestpaid, setRequestpaid] = useState<BookRequestType[]>([]);
  const [requestNotPaid, setRequestNotPaid] = useState<BookRequestType[]>([]);
  const [loading, setLoading] = useState(true)
  
  useEffect( ()=>{
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
        console.log('res', res)
        const resData = res.filter((r)=> r.book_issue === true)
        setRequestNotPaid(resData.filter((r)=>r.pay_fine === false || r.pay_fine === null));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  useEffect( ()=>{
    async function fetchRequests() {
      try {
        const res = await getMonitoring();
        
        setRequestpaid(res.filter((r)=>r.pay_fine === true));
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
          <div>
          <h2 className='text-gray-800 font-bold text-3xl '>Fine haven't paid</h2> 
          <TableBookReturn requests={requestNotPaid}/>
          </div>
          <div>
          <h2 className='text-gray-800 font-bold text-3xl '>Fine already paid</h2> 
          <TableBookReturn requests={requestpaid}/>
          </div>
        </div>
  );
}
